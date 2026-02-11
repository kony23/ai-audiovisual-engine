import { inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import { AudioEngineService } from '../audio/audio-engine';
import { ShaderProgram } from './shader-program.model';

@Injectable({
  providedIn: 'root'
})
export class ThreeEngineService {

  private readonly audio = inject(AudioEngineService);

  private canvas!: HTMLCanvasElement;
  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  private readonly clock = new THREE.Clock();
  private time = 0;
  private isPlaybackActive = false;

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

    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(
      canvas.clientWidth,
      canvas.clientHeight,
      false
    );

    const geometry = new THREE.PlaneGeometry(2, 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: program.vertex,
      fragmentShader: program.fragment,
      uniforms: program.uniforms
    });

    this.mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(this.mesh);

    // Initial resolution.
    this.material.uniforms['uResolution'].value.set(
      canvas.clientWidth,
      canvas.clientHeight
    );

    // Handle resize.
    window.addEventListener('resize', () => {
      this.renderer.setSize(
        canvas.clientWidth,
        canvas.clientHeight,
        false
      );

      this.material.uniforms['uResolution'].value.set(
        canvas.clientWidth,
        canvas.clientHeight
      );
    });
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

    if (this.canvas && this.material.uniforms['uResolution']) {
      this.material.uniforms['uResolution'].value.set(
        this.canvas.clientWidth,
        this.canvas.clientHeight
      );
    }
  }

  setPlaybackActive(active: boolean): void {
    this.isPlaybackActive = active;
  }

  animate = (): void => {
    requestAnimationFrame(this.animate);

    this.audio.update();

    const delta = this.clock.getDelta();
    if (this.isPlaybackActive) {
      this.time += delta;
    }
    const uniforms = this.material.uniforms;

    if (uniforms['uTime']) {
      uniforms['uTime'].value = this.time;
    }

    if (uniforms['uEnergy']) {
      uniforms['uEnergy'].value = this.audio.energy();
    }

    if (uniforms['uBass']) {
      uniforms['uBass'].value = this.audio.bass();
    }

    if (uniforms['uLowMid']) {
      uniforms['uLowMid'].value = this.audio.lowMid();
    }

    if (uniforms['uMid']) {
      uniforms['uMid'].value = this.audio.mid();
    }

    if (uniforms['uPresence']) {
      uniforms['uPresence'].value = this.audio.presence();
    }

    if (uniforms['uTreble']) {
      uniforms['uTreble'].value = this.audio.treble();
    }

    if (uniforms['uHigh']) {
      uniforms['uHigh'].value = this.audio.treble();
    }

    if (uniforms['uRms']) {
      uniforms['uRms'].value = this.audio.rms();
    }

    if (uniforms['uCentroid']) {
      uniforms['uCentroid'].value = this.audio.spectralCentroid();
    }

    if (uniforms['uFlux']) {
      uniforms['uFlux'].value = this.audio.spectralFlux();
    }

    if (uniforms['uZcr']) {
      uniforms['uZcr'].value = this.audio.zcr();
    }

    if (uniforms['uCrest']) {
      uniforms['uCrest'].value = this.audio.crest();
    }

    this.renderer.render(this.scene, this.camera);
  };
}
