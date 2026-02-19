# AiAudiovisualEngine ([Try It!](https://kony23.github.io/ai-audiovisual-engine/))

Audio-reactive 3D/GLSL visualizer with prompt-based shader generation.

## Application Features

- Real-time audio visualization on a canvas (`Three.js` + custom GLSL fragment shaders).
- Audio input sources:
  - local audio file,
  - microphone,
  - system/browser audio (via `getDisplayMedia` with an audio track).
- Playback controls: play/pause/stop, current status, and active source indicator.
- Shader presets (loaded from `public/shaders/*.glsl`) with quick switching.
- Shader Control Panel:
  - manual tuning of shader response (band gains, energy/flux, speed, reactivity).
- Shader Prompter:
  - fragment shader generation from a prompt via `POST /api/shaders/generate`,
  - WebGL compile/link validation before applying a generated shader,
  - fallback to a locally generated shader when API generation fails,
  - fallback to the `smooth` preset when generated shader validation fails.
- Responsive UI with collapsible/minimizable control panels.

## Tech Stack

- Frontend:
  - `Angular 21` (standalone components, signals, reactive forms),
  - `TypeScript 5.9`,
  - `RxJS`,
  - `Three.js`,
  - `Web Audio API` (metrics: RMS, spectral flux, centroid, ZCR, crest),
  - `WebGL1 / GLSL`.
- Local backend (LLM adapter):
  - `Node.js` (`node:http`, no framework),
  - `Ollama` integration (`/api/chat`),
  - endpoint: `POST /api/shaders/generate`.
- Tooling:
  - `Angular CLI` / `@angular/build`,
  - `Vitest` + `jsdom` for unit tests,
  - `npm` as package manager.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. (Optional, for prompt-driven shader generation) start Ollama and pull a model:

```bash
ollama pull qwen2.5-coder:14b
```

3. In terminal A, start the local shader API:

```bash
npm run start:api
```

4. In terminal B, start the Angular UI (with `/api` proxy):

```bash
npm start
```

The app will be available at `http://localhost:4200`.

## Scripts

- `npm start` / `npm run start:ui` - Angular dev server with API proxy
- `npm run start:api` - local shader API server (Ollama adapter)
- `npm run build` - production build
- `npm run watch` - development watch build
- `npm test` - unit tests

## Local Shader API Configuration (Ollama)

Default values:

- `SHADER_API_HOST=127.0.0.1`
- `SHADER_API_PORT=8787`
- `OLLAMA_URL=http://127.0.0.1:11434/api/chat`
- `OLLAMA_MODEL=qwen2.5-coder:14b`
- `SHADER_REQUEST_TIMEOUT_MS=90000`
- `SHADER_LOG_PROMPTS=false` (set `true` to log full prompt text)

## Logs

- Backend request/model logs: terminal running `npm run start:api`
- Angular/UI logs: browser devtools console
- Ollama logs:
  - if running `ollama serve` manually: that terminal,
  - if running as a background service: system service logs.
