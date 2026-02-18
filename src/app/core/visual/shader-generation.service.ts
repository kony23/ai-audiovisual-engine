import { Injectable } from '@angular/core';

export type ShaderGenerationFailureCode =
  | 'EMPTY_PROMPT'
  | 'INVALID_RESPONSE'
  | 'NETWORK'
  | 'API'
  | 'COMPILATION';

export class ShaderGenerationError extends Error {
  constructor(
    readonly code: ShaderGenerationFailureCode,
    message: string,
    readonly details: readonly string[] = [],
  ) {
    super(message);
  }
}

export interface ShaderGenerationResult {
  readonly fragment: string;
  readonly source: 'api' | 'fallback';
}

interface ShaderGenerationApiResponse {
  readonly fragment?: unknown;
  readonly shader?: {
    readonly fragment?: unknown;
  };
}

@Injectable({ providedIn: 'root' })
export class ShaderGenerationService {
  // Backend endpoint responsible for generating a fragment shader from a prompt.
  private readonly endpoint = '/api/shaders/generate';

  // Main entry point:
  // 1) validates prompt,
  // 2) tries to generate shader through API,
  // 3) switches to local fallback on API/network/payload issues.
  async generateFragment(prompt: string): Promise<ShaderGenerationResult> {
    const normalizedPrompt = prompt.trim();
    if (!normalizedPrompt) {
      throw new ShaderGenerationError('EMPTY_PROMPT', 'Prompt is empty.');
    }

    try {
      const response = await fetch(this.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: normalizedPrompt,
          target: 'webgl1',
          requiredUniforms: [
            'uTime',
            'uResolution',
            'uEnergy',
            'uBass',
            'uLowMid',
            'uMid',
            'uPresence',
            'uTreble',
            'uHigh',
            'uRms',
            'uCentroid',
            'uFlux',
            'uZcr',
            'uCrest',
          ],
        }),
      });

      // Treat HTTP failure as a remote provider issue.
      if (!response.ok) {
        const bodyPreview = (await response.text()).slice(0, 200);
        throw new ShaderGenerationError(
          'API',
          `Shader API error (${response.status}).`,
          [bodyPreview],
        );
      }

      const data = (await response.json()) as ShaderGenerationApiResponse;
      const fragment = this.extractFragment(data);
      return { fragment, source: 'api' };
    } catch (error) {
      // EMPTY_PROMPT is a user input error, so fallback is not meaningful.
      if (error instanceof ShaderGenerationError && error.code === 'EMPTY_PROMPT') {
        throw error;
      }

      // Any remote generator issue (network/HTTP/invalid payload)
      // is converted to local fallback so the user always gets a working shader.
      const fallbackFragment = this.buildFallbackFragment(normalizedPrompt);
      return { fragment: fallbackFragment, source: 'fallback' };
    }
  }

  // Compile and link WebGL program before applying shader in Three.js.
  // Note: Three.js ShaderMaterial receives extra defines/uniforms automatically,
  // so validation uses a simple, independent test vertex shader.
  validateProgram(vertexSource: string, fragmentSource: string): readonly string[] {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
      return ['WebGL context is unavailable.'];
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!vertexShader || !fragmentShader) {
      return ['Unable to allocate shader objects.'];
    }

    const testVertexSource = `
attribute vec3 position;
void main() {
  gl_Position = vec4(position, 1.0);
}
`.trim();

    gl.shaderSource(vertexShader, testVertexSource);
    gl.compileShader(vertexShader);
    const vertexOk = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    const vertexLog = gl.getShaderInfoLog(vertexShader) ?? '';

    gl.shaderSource(fragmentShader, fragmentSource);
    gl.compileShader(fragmentShader);
    const fragmentOk = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    const fragmentLog = gl.getShaderInfoLog(fragmentShader) ?? '';

    const errors: string[] = [];
    if (!vertexOk && vertexLog.trim()) {
      errors.push(`Vertex compile error: ${vertexLog.trim()}`);
    }
    if (!fragmentOk && fragmentLog.trim()) {
      errors.push(`Fragment compile error: ${fragmentLog.trim()}`);
    }

    if (!errors.length && vertexOk && fragmentOk) {
      const program = gl.createProgram();
      if (!program) {
        return ['Unable to allocate shader program.'];
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      const linkOk = gl.getProgramParameter(program, gl.LINK_STATUS);
      const linkLog = gl.getProgramInfoLog(program) ?? '';
      if (!linkOk && linkLog.trim()) {
        errors.push(`Program link error: ${linkLog.trim()}`);
      }
      gl.deleteProgram(program);
    }

    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);

    return errors;
  }

  // Parse API response and extract fragment shader from two payload formats.
  private extractFragment(data: ShaderGenerationApiResponse): string {
    const candidate =
      typeof data.fragment === 'string'
        ? data.fragment
        : typeof data.shader?.fragment === 'string'
          ? data.shader.fragment
          : null;

    if (!candidate) {
      throw new ShaderGenerationError(
        'INVALID_RESPONSE',
        'Shader API returned invalid payload.',
      );
    }

    const sanitized = candidate
      .replace(/^```(?:glsl)?\s*/i, '')
      .replace(/```$/i, '')
      .trim();

    if (!sanitized.includes('void main')) {
      throw new ShaderGenerationError(
        'INVALID_RESPONSE',
        'Fragment shader has no main() function.',
      );
    }

    return sanitized;
  }

  // Local fallback: deterministic shader based on prompt (hash -> color/motion parameters).
  // This ensures a result even when the API is unavailable.
  private buildFallbackFragment(prompt: string): string {
    const hash = this.hashPrompt(prompt);
    const hueA = (hash % 360).toFixed(1);
    const hueB = ((hash * 7) % 360).toFixed(1);
    const speed = (0.35 + (hash % 40) / 100).toFixed(2);
    const intensity = (0.55 + (hash % 30) / 100).toFixed(2);

    return `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uEnergy;
uniform float uBass;
uniform float uLowMid;
uniform float uMid;
uniform float uPresence;
uniform float uTreble;
uniform float uHigh;
uniform float uRms;
uniform float uCentroid;
uniform float uFlux;
uniform float uZcr;
uniform float uCrest;

vec3 hsl2rgb(vec3 c) {
  vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0, 4.0, 2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
  return c.z + c.y * (rgb - 0.5) * (1.0 - abs(2.0 * c.z - 1.0));
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 5; i++) {
    value += amp * sin(p.x) * cos(p.y);
    p = mat2(1.7, 1.2, -1.2, 1.7) * p;
    amp *= 0.55;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * ${speed};

  float pulse = mix(uEnergy, uBass, 0.65);
  float detail = mix(uMid, uPresence, 0.5) + uFlux * 0.7;
  float noise = fbm(uv * (3.0 + 4.0 * detail) + vec2(t, -t * 0.7));
  float ring = sin(length(uv) * (10.0 + 8.0 * uTreble) - t * 4.0 + noise * 2.0);
  float glow = exp(-3.2 * length(uv)) * (0.5 + pulse * ${intensity});
  float value = 0.5 + 0.5 * ring + glow + noise * 0.25;

  vec3 colA = hsl2rgb(vec3(${hueA} / 360.0, 0.78, 0.48));
  vec3 colB = hsl2rgb(vec3(${hueB} / 360.0, 0.82, 0.58));
  vec3 color = mix(colA, colB, clamp(value + uCentroid * 0.35, 0.0, 1.0));
  color *= 0.55 + 0.95 * clamp(value + uRms * 0.8 + uCrest * 0.25, 0.0, 1.0);

  gl_FragColor = vec4(color, 1.0);
}
`.trim();
  }

  // Simple FNV-1a hash for repeatable fallback parameterization.
  private hashPrompt(input: string): number {
    let hash = 2166136261;
    for (let i = 0; i < input.length; i++) {
      hash ^= input.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return Math.abs(hash >>> 0);
  }
}
