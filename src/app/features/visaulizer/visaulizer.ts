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
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import * as THREE from 'three';
import { AudioEngineService } from '../../core/audio/audio-engine';
import { ThreeEngineService } from '../../core/visual/three-engine';
import { ShaderProgram } from '../../core/visual/shader-program.model';

@Component({
  selector: 'app-visualizer',
  imports: [ReactiveFormsModule],
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

  readonly urlControl = new FormControl('', { nonNullable: true });
  readonly isPlaying = signal(false);
  readonly selectedTrackName = signal<string | null>(null);
  readonly shaderLoadError = signal<string | null>(null);
  readonly isControllerCollapsed = signal(false);
  readonly selectedPresetId = signal('nebula');

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
  ];

  async ngAfterViewInit(): Promise<void> {
    try {
      this.vertexShaderSource = await this.loadShader('/shaders/vertex.glsl');
      const fragment = await this.loadPresetFragment(this.selectedPresetId());
      this.three.init(this.canvas.nativeElement, this.buildProgram(fragment));
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
  }

  async onSelectPreset(presetId: string): Promise<void> {
    if (presetId === this.selectedPresetId()) return;
    this.selectedPresetId.set(presetId);
    try {
      const fragment = await this.loadPresetFragment(presetId);
      this.three.setProgram(this.buildProgram(fragment));
    } catch (error) {
      this.shaderLoadError.set('Failed to load shader preset');
      console.error(error);
    }
  }

  toggleController(): void {
    this.isControllerCollapsed.update((value) => !value);
  }

  onAudioPlay(): void {
    this.isPlaying.set(true);
  }

  onAudioPause(): void {
    this.isPlaying.set(false);
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
        uMid: { value: 0 },
        uTreble: { value: 0 },
        uRms: { value: 0 },
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
}
