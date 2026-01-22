import { inject, Injectable } from '@angular/core';
import * as THREE from 'three';
import { ShaderProgram } from './shader-program.model';
import { AudioEngineService } from '../audio/audio-engine';

const vertexShader = `
void main() {
  gl_Position = projectionMatrix *
                modelViewMatrix *
                vec4(position, 1.0);
}
`;

const fragmentShader = `
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

vec3 palette(float t) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 0.2, 0.4);
  vec3 d = vec3(0.0, 0.1, 0.2);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
  float t = uTime * 0.2;

  float d = length(uv);
  float wave = sin(d * 10.0 - t * 4.0);

  vec3 color = palette(d + t) * wave;
  gl_FragColor = vec4(color, 1.0);
}
`;

@Injectable({
  providedIn: 'root'
})
export class ThreeEngineService {

  private readonly audio = inject(AudioEngineService);

  private scene!: THREE.Scene;
  private camera!: THREE.OrthographicCamera;
  private renderer!: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private mesh!: THREE.Mesh;

  private readonly clock = new THREE.Clock();

  init(canvas: HTMLCanvasElement, program: ShaderProgram): void {
    this.scene = new THREE.Scene();

    // ✅ FULLSCREEN ORTHO CAMERA
    this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    // ✅ RENDERER SIZE = CANVAS SIZE
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

    // ✅ INITIAL RESOLUTION
    this.material.uniforms['uResolution'].value.set(
      canvas.clientWidth,
      canvas.clientHeight
    );

    // ✅ HANDLE RESIZE
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

  animate = (): void => {
    requestAnimationFrame(this.animate);

    this.audio.update();

    this.material.uniforms['uTime'].value =
      this.clock.getElapsedTime();

    this.renderer.render(this.scene, this.camera);
  };
}