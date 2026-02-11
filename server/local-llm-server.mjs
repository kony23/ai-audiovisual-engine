import http from 'node:http';
import { randomUUID } from 'node:crypto';

const HOST = process.env.SHADER_API_HOST ?? '127.0.0.1';
const PORT = Number(process.env.SHADER_API_PORT ?? 8787);
const OLLAMA_URL = process.env.OLLAMA_URL ?? 'http://127.0.0.1:11434/api/chat';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL ?? 'qwen2.5-coder:14b';
const REQUEST_TIMEOUT_MS = Number(process.env.SHADER_REQUEST_TIMEOUT_MS ?? 90000);
const LOG_PROMPTS = String(process.env.SHADER_LOG_PROMPTS ?? 'false').toLowerCase() === 'true';

function log(level, event, details = {}) {
  const payload = {
    ts: new Date().toISOString(),
    level,
    event,
    ...details,
  };
  const line = JSON.stringify(payload);
  if (level === 'error') {
    console.error(line);
    return;
  }
  console.log(line);
}

function sendJson(res, statusCode, payload) {
  const body = JSON.stringify(payload);
  res.writeHead(statusCode, {
    'Content-Type': 'application/json; charset=utf-8',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  });
  res.end(body);
}

function readJson(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => {
      try {
        const text = Buffer.concat(chunks).toString('utf8');
        resolve(text ? JSON.parse(text) : {});
      } catch (error) {
        reject(error);
      }
    });
    req.on('error', reject);
  });
}

function buildMessages(prompt, requiredUniforms) {
  const uniforms = Array.isArray(requiredUniforms) ? requiredUniforms.join(', ') : '';
  const strictContract = `
Task: Generate ONE WebGL1 GLSL fragment shader source file.

Output contract:
- Return RAW GLSL code only.
- No markdown, no triple backticks, no JSON, no commentary.
- No vertex shader code.

Hard compatibility rules:
- Must include: precision highp float;
- Must include: void main()
- Must write final color via: gl_FragColor = vec4(...)
- WebGL1 only (no #version 300 es, no out variables, no texture() for WebGL2-only patterns).
- Do not declare/require custom varyings from vertex shader.
- Do not use projectionMatrix, modelViewMatrix, position, uv attributes directly.
- Keep code self-contained and compilable as fragment shader in Three.js ShaderMaterial.

Uniform policy:
- You may use ONLY these uniforms if needed: ${uniforms}.
- Do not invent additional uniforms.
- If a listed uniform is unused, that is acceptable.

Style policy:
- Favor smooth animation and avoid strobing/flicker.
- Keep complexity moderate (roughly <= 120 lines).
`.trim();

  return [
    {
      role: 'system',
      content: strictContract,
    },
    {
      role: 'user',
      content: prompt,
    },
  ];
}

function sanitizeFragment(text) {
  if (typeof text !== 'string') return '';
  return text.replace(/^```(?:glsl)?\s*/i, '').replace(/```$/i, '').trim();
}

async function generateWithOllama(prompt, requiredUniforms, requestId) {
  const startedAt = Date.now();
  log('info', 'ollama.request.start', {
    requestId,
    model: OLLAMA_MODEL,
    promptLength: prompt.length,
    requiredUniformsCount: Array.isArray(requiredUniforms) ? requiredUniforms.length : 0,
  });

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

  try {
    const response = await fetch(OLLAMA_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        messages: buildMessages(prompt, requiredUniforms),
        stream: false,
        options: {
          temperature: 0.2,
        },
      }),
    });

    if (!response.ok) {
      const body = (await response.text()).slice(0, 400);
      log('error', 'ollama.request.http_error', {
        requestId,
        status: response.status,
        durationMs: Date.now() - startedAt,
        bodyPreview: body,
      });
      throw new Error(`Ollama error ${response.status}: ${body}`);
    }

    const data = await response.json();
    const fragment = sanitizeFragment(data?.message?.content ?? '');
    if (!fragment.includes('void main')) {
      log('error', 'ollama.response.invalid_fragment', {
        requestId,
        durationMs: Date.now() - startedAt,
      });
      throw new Error('Model response does not look like fragment shader code.');
    }

    log('info', 'ollama.request.success', {
      requestId,
      durationMs: Date.now() - startedAt,
      fragmentLength: fragment.length,
    });

    return fragment;
  } finally {
    clearTimeout(timeout);
  }
}

const server = http.createServer(async (req, res) => {
  const requestId = req.headers['x-request-id'] || randomUUID();
  const startedAt = Date.now();
  const requestMeta = {
    requestId,
    method: req.method ?? 'UNKNOWN',
    path: req.url ?? '',
  };

  try {
    log('info', 'http.request.start', requestMeta);

    if (req.method === 'OPTIONS') {
      res.writeHead(204, {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type',
      });
      res.end();
      return;
    }

    if (req.url !== '/api/shaders/generate' || req.method !== 'POST') {
      sendJson(res, 404, { error: 'Not found' });
      log('info', 'http.request.end', {
        ...requestMeta,
        statusCode: 404,
        durationMs: Date.now() - startedAt,
      });
      return;
    }

    const body = await readJson(req);
    const prompt = typeof body?.prompt === 'string' ? body.prompt.trim() : '';
    const requiredUniforms = Array.isArray(body?.requiredUniforms) ? body.requiredUniforms : [];

    if (!prompt) {
      sendJson(res, 400, { error: 'Prompt is required.' });
      log('info', 'http.request.end', {
        ...requestMeta,
        statusCode: 400,
        durationMs: Date.now() - startedAt,
        reason: 'missing_prompt',
      });
      return;
    }

    log('info', 'shader.generate.input', {
      requestId,
      promptLength: prompt.length,
      prompt: LOG_PROMPTS ? prompt : undefined,
      requiredUniformsCount: requiredUniforms.length,
    });

    const fragment = await generateWithOllama(prompt, requiredUniforms, requestId);
    sendJson(res, 200, { fragment });
    log('info', 'http.request.end', {
      ...requestMeta,
      statusCode: 200,
      durationMs: Date.now() - startedAt,
      fragmentLength: fragment.length,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    sendJson(res, 500, { error: message });
    log('error', 'http.request.error', {
      ...requestMeta,
      durationMs: Date.now() - startedAt,
      message,
    });
  }
});

server.listen(PORT, HOST, () => {
  log('info', 'server.start', {
    host: HOST,
    port: PORT,
    ollamaUrl: OLLAMA_URL,
    model: OLLAMA_MODEL,
    requestTimeoutMs: REQUEST_TIMEOUT_MS,
    logPrompts: LOG_PROMPTS,
  });
});
