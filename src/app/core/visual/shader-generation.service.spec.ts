import { describe, afterEach, expect, it, vi } from 'vitest';
import { ShaderGenerationError, ShaderGenerationService } from './shader-generation.service';

interface FakeGlOptions {
  readonly vertexCompileOk?: boolean;
  readonly fragmentCompileOk?: boolean;
  readonly linkOk?: boolean;
  readonly fragmentLog?: string;
  readonly linkLog?: string;
  readonly createProgramReturnsNull?: boolean;
  readonly createShaderReturnsNull?: boolean;
}

function createFakeGl(options: FakeGlOptions = {}) {
  const gl = {
    VERTEX_SHADER: 1,
    FRAGMENT_SHADER: 2,
    COMPILE_STATUS: 3,
    LINK_STATUS: 4,
    createShader: vi.fn((type: number) => {
      if (options.createShaderReturnsNull) {
        return null;
      }
      return { kind: type === 1 ? 'vertex' : 'fragment' };
    }),
    shaderSource: vi.fn(),
    compileShader: vi.fn(),
    getShaderParameter: vi.fn((shader: { kind: string }, _name: number) => {
      if (shader.kind === 'vertex') {
        return options.vertexCompileOk ?? true;
      }
      return options.fragmentCompileOk ?? true;
    }),
    getShaderInfoLog: vi.fn((shader: { kind: string }) => {
      if (shader.kind === 'fragment') {
        return options.fragmentLog ?? '';
      }
      return '';
    }),
    createProgram: vi.fn(() => {
      if (options.createProgramReturnsNull) {
        return null;
      }
      return {};
    }),
    attachShader: vi.fn(),
    linkProgram: vi.fn(),
    getProgramParameter: vi.fn((_program: object, _name: number) => options.linkOk ?? true),
    getProgramInfoLog: vi.fn(() => options.linkLog ?? ''),
    deleteProgram: vi.fn(),
    deleteShader: vi.fn(),
  };

  return gl;
}

describe('ShaderGenerationService', () => {
  afterEach(() => {
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it('throws EMPTY_PROMPT for blank prompt', async () => {
    const service = new ShaderGenerationService();
    await expect(service.generateFragment('   ')).rejects.toMatchObject({
      code: 'EMPTY_PROMPT',
    } as Partial<ShaderGenerationError>);
  });

  it('uses API fragment when payload is valid', async () => {
    const service = new ShaderGenerationService();
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      status: 200,
      json: async () => ({
        fragment: '```glsl\nvoid main(){ gl_FragColor = vec4(1.0); }\n```',
      }),
    });
    vi.stubGlobal('fetch', fetchMock);

    const result = await service.generateFragment('  neon pulse  ');
    const [, requestInit] = fetchMock.mock.calls[0] as [string, RequestInit];
    const payload = JSON.parse(requestInit.body as string) as { prompt: string };

    expect(result.source).toBe('api');
    expect(result.fragment).toContain('void main');
    expect(result.fragment).not.toContain('```');
    expect(payload.prompt).toBe('neon pulse');
  });

  it('falls back when API responds with HTTP error', async () => {
    const service = new ShaderGenerationService();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: false,
        status: 503,
        text: async () => 'Service unavailable',
      }),
    );

    const result = await service.generateFragment('storm');

    expect(result.source).toBe('fallback');
    expect(result.fragment).toContain('precision highp float;');
  });

  it('falls back when payload is invalid', async () => {
    const service = new ShaderGenerationService();
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        status: 200,
        json: async () => ({ shader: {} }),
      }),
    );

    const result = await service.generateFragment('fog');

    expect(result.source).toBe('fallback');
    expect(result.fragment).toContain('void main()');
  });

  it('produces deterministic fallback for the same prompt', async () => {
    const service = new ShaderGenerationService();
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network down')));

    const first = await service.generateFragment('night city');
    const second = await service.generateFragment('night city');

    expect(first.source).toBe('fallback');
    expect(second.source).toBe('fallback');
    expect(first.fragment).toBe(second.fragment);
    expect(first.fragment).toContain('uniform float uFlux;');
  });

  it('returns error when WebGL context is unavailable', () => {
    const service = new ShaderGenerationService();
    vi.spyOn(document, 'createElement').mockReturnValue({
      getContext: () => null,
    } as unknown as HTMLCanvasElement);

    const errors = service.validateProgram('void main(){}', 'void main(){}');

    expect(errors).toEqual(['WebGL context is unavailable.']);
  });

  it('returns fragment compile errors from validator', () => {
    const service = new ShaderGenerationService();
    const gl = createFakeGl({
      fragmentCompileOk: false,
      fragmentLog: 'Syntax error near token',
    });
    vi.spyOn(document, 'createElement').mockReturnValue({
      getContext: () => gl,
    } as unknown as HTMLCanvasElement);

    const errors = service.validateProgram('void main(){}', 'broken fragment');

    expect(errors).toEqual(['Fragment compile error: Syntax error near token']);
  });

  it('returns link errors from validator', () => {
    const service = new ShaderGenerationService();
    const gl = createFakeGl({
      vertexCompileOk: true,
      fragmentCompileOk: true,
      linkOk: false,
      linkLog: 'Link failed',
    });
    vi.spyOn(document, 'createElement').mockReturnValue({
      getContext: () => gl,
    } as unknown as HTMLCanvasElement);

    const errors = service.validateProgram('void main(){}', 'void main(){}');

    expect(errors).toEqual(['Program link error: Link failed']);
  });
});
