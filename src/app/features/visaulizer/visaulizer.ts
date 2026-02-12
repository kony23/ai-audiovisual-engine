import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
  computed,
  inject,
  signal,
} from '@angular/core';
import { FormControl } from '@angular/forms';
import * as THREE from 'three';
import { AudioEngineService } from '../../core/audio/audio-engine';
import {
  DEFAULT_SHADER_CONTROL_STATE,
  ShaderControlState,
} from '../../core/visual/shader-control.model';
import {
  ShaderGenerationError,
  ShaderGenerationService,
} from '../../core/visual/shader-generation.service';
import { ThreeEngineService } from '../../core/visual/three-engine';
import { ShaderProgram } from '../../core/visual/shader-program.model';
import {
  AudioControllerComponent,
  AudioControllerPreset,
} from './components/audio-controller/audio-controller';
import { ShaderControlPanelComponent } from './components/shader-control-panel/shader-control-panel';
import { ShaderPrompterComponent } from './components/shader-prompter/shader-prompter';

@Component({
  selector: 'app-visualizer',
  imports: [AudioControllerComponent, ShaderPrompterComponent, ShaderControlPanelComponent],
  templateUrl: './visaulizer.html',
  styleUrl: './visaulizer.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ThreeEngineService],
})
export class VisualizerComponent implements AfterViewInit, OnDestroy {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  @ViewChild('audio', { static: true })
  audioElement!: ElementRef<HTMLAudioElement>;

  private readonly three = inject(ThreeEngineService);
  private readonly audio = inject(AudioEngineService);
  private readonly shaderGeneration = inject(ShaderGenerationService);

  readonly urlControl = new FormControl('', { nonNullable: true });
  readonly isPlaying = signal(false);
  readonly selectedTrackName = signal<string | null>(null);
  readonly shaderLoadError = signal<string | null>(null);
  readonly isControllerCollapsed = signal(false);
  readonly selectedPresetId = signal('nebula');
  readonly promptControl = new FormControl('', { nonNullable: true });
  readonly promptStatus = signal('Prompt idle');
  readonly isPromptGenerating = signal(false);
  readonly promptError = signal<string | null>(null);
  readonly isGeneratedShaderActive = signal(false);
  readonly shaderControls = signal<ShaderControlState>({
    ...DEFAULT_SHADER_CONTROL_STATE,
  });

  readonly statusLabel = computed(() => {
    if (this.shaderLoadError()) return 'Shader load error';
    const status = this.audio.status();
    if (status === 'error') return 'Audio error';
    if (status === 'running') return 'Audio ready';
    return 'Waiting for track';
  });

  private audioObjectUrl: string | null = null;
  private audioInitialized = false;
  private vertexShaderSource: string | null = null;

  readonly presets = [
    {
      id: 'nebula',
      label: 'Nebula Drift',
      fragmentPath: '/shaders/fragment.glsl',
    },
    {
      id: 'aurora',
      label: 'Aurora Flux',
      fragmentPath: '/shaders/fragment-aurora.glsl',
    },
    {
      id: 'ion',
      label: 'Ion Bloom',
      fragmentPath: '/shaders/fragment-ion.glsl',
    },
    {
      id: 'new',
      label: 'New',
      fragmentPath: '/shaders/new.glsl',
    },
    {
      id: 'gpt-free',
      label: 'Gpt-free',
      fragmentPath: '/shaders/gpt-free.glsl',
    },
    {
      id: 'gpt-free-soft',
      label: 'Gpt-free Soft',
      fragmentPath: '/shaders/gpt-free-soft.glsl',
    },
    {
      id: 'smooth',
      label: 'Smooth',
      fragmentPath: '/shaders/smooth.glsl',
    },
  ];
  readonly presetOptions: readonly AudioControllerPreset[] = this.presets.map((preset) => ({
    id: preset.id,
    label: preset.label,
  }));

  async ngAfterViewInit(): Promise<void> {
    try {
      this.vertexShaderSource = await this.loadShader('/shaders/vertex.glsl');
      const fragment = await this.loadPresetFragment(this.selectedPresetId());
      this.three.init(this.canvas.nativeElement, this.buildProgram(fragment));
      this.three.setShaderControls(this.shaderControls());
      this.three.animate();
    } catch (error) {
      this.shaderLoadError.set('Failed to load shaders');
      console.error(error);
    }
  }

  ngOnDestroy(): void {
    if (this.audioObjectUrl) {
      URL.revokeObjectURL(this.audioObjectUrl);
    }
  }

  async onFileSelected(event: Event): Promise<void> {
    const input = event.target as HTMLInputElement | null;
    const file = input?.files?.[0];
    if (!file) return;

    if (this.audioObjectUrl) {
      URL.revokeObjectURL(this.audioObjectUrl);
    }

    this.audioObjectUrl = URL.createObjectURL(file);
    this.selectedTrackName.set(file.name);
    await this.setAudioSource(this.audioObjectUrl);
  }

  async onLoadUrl(): Promise<void> {
    const url = this.urlControl.value.trim();
    if (!url) return;
    if (this.audioObjectUrl) {
      URL.revokeObjectURL(this.audioObjectUrl);
      this.audioObjectUrl = null;
    }
    this.selectedTrackName.set(url);
    await this.setAudioSource(url);
  }

  async onTogglePlayback(): Promise<void> {
    const audio = this.audioElement?.nativeElement;
    if (!audio?.src) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch (error) {
        console.error(error);
      }
      return;
    }
    audio.pause();
  }

  async onStop(): Promise<void> {
    const audio = this.audioElement?.nativeElement;
    if (!audio?.src) return;
    audio.pause();
    audio.currentTime = 0;
    this.three.setPlaybackActive(false);
  }

  async onSelectPreset(presetId: string): Promise<void> {
    if (presetId === this.selectedPresetId() && !this.isGeneratedShaderActive()) return;
    this.selectedPresetId.set(presetId);
    try {
      const fragment = await this.loadPresetFragment(presetId);
      this.three.setProgram(this.buildProgram(fragment));
      this.isGeneratedShaderActive.set(false);
      this.promptStatus.set(`Preset applied: ${presetId}`);
      this.promptError.set(null);
    } catch (error) {
      this.shaderLoadError.set('Failed to load shader preset');
      console.error(error);
    }
  }

  toggleController(): void {
    this.isControllerCollapsed.update((value) => !value);
  }

  async onGeneratePrompt(): Promise<void> {
    const prompt = this.promptControl.value.trim();
    if (!prompt) {
      this.promptStatus.set('Prompt is empty');
      this.promptError.set('Wpisz prompt przed uruchomieniem generowania.');
      return;
    }
    if (!this.vertexShaderSource) {
      this.promptStatus.set('Shader engine unavailable');
      this.promptError.set('Brak vertex shadera. Odswiez strone i sproboj ponownie.');
      return;
    }

    this.promptError.set(null);
    this.isPromptGenerating.set(true);
    this.promptStatus.set('Generating shader...');

    try {
      const result = await this.shaderGeneration.generateFragment(prompt);
      if (result.source === 'fallback') {
        throw new ShaderGenerationError(
          'API',
          'Remote shader generator unavailable.',
        );
      }

      const compileErrors = this.shaderGeneration.validateProgram(
        this.vertexShaderSource,
        result.fragment,
      );

      if (compileErrors.length) {
        throw new ShaderGenerationError(
          'COMPILATION',
          'Generated shader failed compilation.',
          [...compileErrors],
        );
      }

      this.three.setProgram(this.buildProgram(result.fragment));
      this.isGeneratedShaderActive.set(true);
      this.promptStatus.set('Generated and applied');
    } catch (error) {
      if (error instanceof ShaderGenerationError) {
        this.promptStatus.set('Generation failed');
        this.promptError.set(this.mapGenerationError(error));
      } else {
        this.promptStatus.set('Generation failed');
        this.promptError.set('Nieoczekiwany blad generowania shadera.');
      }
      await this.applySmoothPresetFallback();
      console.error(error);
    } finally {
      this.isPromptGenerating.set(false);
    }
  }

  onAudioPlay(): void {
    this.isPlaying.set(true);
    this.three.setPlaybackActive(true);
  }

  onAudioPause(): void {
    this.isPlaying.set(false);
    this.three.setPlaybackActive(false);
  }

  onShaderControlsChange(next: ShaderControlState): void {
    this.shaderControls.set(next);
    this.three.setShaderControls(next);
  }

  private async setAudioSource(source: string): Promise<void> {
    const audio = this.audioElement.nativeElement;
    audio.src = source;
    audio.load();
    await this.ensureAudioInitialized();
    try {
      await audio.play();
    } catch (error) {
      console.error(error);
    }
  }

  private async loadPresetFragment(presetId: string): Promise<string> {
    const preset = this.presets.find((item) => item.id === presetId);
    if (!preset) {
      throw new Error(`Unknown preset: ${presetId}`);
    }
    return this.loadShader(preset.fragmentPath);
  }

  private buildProgram(fragment: string): ShaderProgram {
    if (!this.vertexShaderSource) {
      throw new Error('Vertex shader not loaded');
    }

    return {
      vertex: this.vertexShaderSource,
      fragment,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
        uEnergy: { value: 0 },
        uBass: { value: 0 },
        uLowMid: { value: 0 },
        uMid: { value: 0 },
        uPresence: { value: 0 },
        uTreble: { value: 0 },
        uHigh: { value: 0 },
        uRms: { value: 0 },
        uCentroid: { value: 0 },
        uFlux: { value: 0 },
        uZcr: { value: 0 },
        uCrest: { value: 0 },
      },
    };
  }

  private async ensureAudioInitialized(): Promise<void> {
    if (this.audioInitialized) return;
    await this.audio.initFromAudioElement(this.audioElement.nativeElement);
    this.audioInitialized = true;
  }

  private async loadShader(path: string): Promise<string> {
    const url = `${path}?v=${Date.now()}`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Shader load failed: ${response.status} (${response.url})`);
    }
    const text = await response.text();
    const contentType = response.headers.get('content-type') ?? 'unknown';
    if (contentType.includes('text/html') || text.includes('<!doctype html')) {
      console.error('Shader fetch returned HTML', {
        url: response.url,
        status: response.status,
        contentType,
        preview: text.slice(0, 200),
      });
      throw new Error(`Shader load returned HTML (${response.url})`);
    }
    return text;
  }

  private async applySmoothPresetFallback(): Promise<void> {
    try {
      const fragment = await this.loadPresetFragment('smooth');
      this.selectedPresetId.set('smooth');
      this.three.setProgram(this.buildProgram(fragment));
      this.isGeneratedShaderActive.set(false);
      this.promptStatus.set('Generation failed - smooth preset applied');
    } catch (fallbackError) {
      this.promptStatus.set('Generation failed');
      this.promptError.set('Nie udalo sie zaladowac fallbacku smooth.');
      console.error(fallbackError);
    }
  }

  private mapGenerationError(error: ShaderGenerationError): string {
    if (error.code === 'COMPILATION' && error.details.length) {
      return `Blad kompilacji GLSL: ${error.details[0]}`;
    }
    if (error.code === 'API' && error.details.length) {
      return `Blad API: ${error.details[0]}`;
    }
    if (error.code === 'INVALID_RESPONSE') {
      return 'API zwrocilo nieprawidlowy shader.';
    }
    if (error.code === 'EMPTY_PROMPT') {
      return 'Prompt nie moze byc pusty.';
    }
    return error.message;
  }
}
