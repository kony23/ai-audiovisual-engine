import { inject, Injectable, OnDestroy } from '@angular/core';
import * as THREE from 'three';
import { AudioEngineService } from '../audio/audio-engine';
import {
  DEFAULT_SHADER_CONTROL_STATE,
  ShaderControlState,
} from './shader-control.model';
import { ShaderProgram } from './shader-program.model';

@Injectable({
  providedIn: 'root'
})
export class ThreeEngineService implements OnDestroy {

  private readonly audio = inject(AudioEngineService);

  private canvas!: HTMLCanvasElement;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;
  private readonly drawingBufferSize = new THREE.Vector2();

  private readonly clock = new THREE.Clock();
  private time = 0;
  private isPlaybackActive = false;
  private controls: ShaderControlState = { ...DEFAULT_SHADER_CONTROL_STATE };
  private readonly cappedPixelRatio = Math.min(window.devicePixelRatio || 1, 1.25);
  private resizeHandler: (() => void) | null = null;

  init(canvas: HTMLCanvasElement, program: ShaderProgram): void {
    this.canvas = canvas;
    this.scene = new THREE.Scene();

    // Fullscreen ortho camera.
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // Renderer size = canvas size.
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      powerPreference: 'high-performance'
    });

    this.renderer.setPixelRatio(this.cappedPixelRatio);
    this.resizeRendererToCanvas();

    const geometry = new THREE.PlaneGeometry(2, 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: program.vertex,
      fragmentShader: program.fragment,
      uniforms: program.uniforms
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Initial resolution.
    this.updateResolutionUniform();

    // Handle resize.
    this.resizeHandler = () => {
      this.resizeRendererToCanvas();
      this.updateResolutionUniform();
    };
    window.addEventListener('resize', this.resizeHandler);
  }

  setProgram(program: ShaderProgram): void {
    const nextMaterial = new THREE.ShaderMaterial({
      vertexShader: program.vertex,
      fragmentShader: program.fragment,
      uniforms: program.uniforms
    });

    if (this.material) {
      this.material.dispose();
    }

    this.material = nextMaterial;
    this.mesh.material = nextMaterial;

    this.updateResolutionUniform();
  }

  setPlaybackActive(active: boolean): void {
    this.isPlaybackActive = active;
  }

  setShaderControls(next: ShaderControlState): void {
    this.controls = { ...next };
  }

  ngOnDestroy(): void {
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler);
      this.resizeHandler = null;
    }
  }

  animate = (): void => {
    requestAnimationFrame(this.animate);

    this.audio.update();

    const delta = this.clock.getDelta();
    const controls = this.controls;
    if (this.isPlaybackActive) {
      this.time += delta * controls.timeSpeed;
    }

    const amplify = (value: number, gain = 1): number =>
      Math.max(0, value * controls.reactivity * gain);

    const uniforms = this.material.uniforms;

    if (uniforms['uTime']) {
      uniforms['uTime'].value = this.time;
    }

    if (uniforms['uEnergy']) {
      uniforms['uEnergy'].value = amplify(this.audio.energy(), controls.energyGain);
    }

    if (uniforms['uBass']) {
      uniforms['uBass'].value = amplify(this.audio.bass(), controls.bassGain);
    }

    if (uniforms['uLowMid']) {
      uniforms['uLowMid'].value = amplify(this.audio.lowMid(), controls.midGain);
    }

    if (uniforms['uMid']) {
      uniforms['uMid'].value = amplify(this.audio.mid(), controls.midGain);
    }

    if (uniforms['uPresence']) {
      uniforms['uPresence'].value = amplify(this.audio.presence(), controls.trebleGain);
    }

    if (uniforms['uTreble']) {
      uniforms['uTreble'].value = amplify(this.audio.treble(), controls.trebleGain);
    }

    if (uniforms['uHigh']) {
      uniforms['uHigh'].value = amplify(this.audio.treble(), controls.trebleGain);
    }

    if (uniforms['uRms']) {
      uniforms['uRms'].value = amplify(this.audio.rms(), controls.energyGain);
    }

    if (uniforms['uCentroid']) {
      uniforms['uCentroid'].value = amplify(this.audio.spectralCentroid(), controls.fluxGain);
    }

    if (uniforms['uFlux']) {
      uniforms['uFlux'].value = amplify(this.audio.spectralFlux(), controls.fluxGain);
    }

    if (uniforms['uZcr']) {
      uniforms['uZcr'].value = amplify(this.audio.zcr(), controls.fluxGain);
    }

    if (uniforms['uCrest']) {
      uniforms['uCrest'].value = amplify(this.audio.crest(), controls.energyGain);
    }

    this.renderer.render(this.scene, this.camera);
  };

  private resizeRendererToCanvas(): void {
    if (!this.renderer || !this.canvas) return;
    this.renderer.setSize(
      this.canvas.clientWidth,
      this.canvas.clientHeight,
      false
    );
  }

  private updateResolutionUniform(): void {
    if (!this.renderer || !this.material?.uniforms['uResolution']) return;
    this.renderer.getDrawingBufferSize(this.drawingBufferSize);
    this.material.uniforms['uResolution'].value.set(
      this.drawingBufferSize.x,
      this.drawingBufferSize.y
    );
  }
}
