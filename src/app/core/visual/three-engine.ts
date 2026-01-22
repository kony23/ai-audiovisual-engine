import { Injectable } from '@angular/core';
import * as THREE from 'three';

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

  private scene!: THREE.Scene;
  private camera!: THREE.PerspectiveCamera;
  private renderer!: THREE.WebGLRenderer;
  private material!: THREE.ShaderMaterial;
  private clock = new THREE.Clock();
  private animationFrameId: number | null = null;
  private geometry: THREE.PlaneGeometry | null = null;

  init(canvas: HTMLCanvasElement) {
    this.scene = new THREE.Scene();

    this.camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    );
    this.camera.position.z = 2;

    this.renderer = new THREE.WebGLRenderer({ canvas });
    this.renderer.setSize(window.innerWidth, window.innerHeight);

    const geometry = new THREE.PlaneGeometry(2, 2);

    this.material = new THREE.ShaderMaterial({
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: {
          value: new THREE.Vector2(
            window.innerWidth,
            window.innerHeight
          )
        }
      }
    });

    const mesh = new THREE.Mesh(geometry, this.material);
    this.scene.add(mesh);
  }

  animate = () => {
    requestAnimationFrame(this.animate);
    this.material.uniforms['uTime'].value = this.clock.getElapsedTime();
    this.renderer.render(this.scene, this.camera);
  };

  dispose() {
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
    }
    this.geometry?.dispose();
    this.material?.dispose();
    this.renderer?.dispose();
  }
}