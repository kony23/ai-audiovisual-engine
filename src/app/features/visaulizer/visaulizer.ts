import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import * as THREE from 'three';
import { ThreeEngineService } from '../../core/visual/three-engine';
import { ShaderProgram } from '../../core/visual/shader-program.model';

@Component({
  selector: 'app-visualizer',
  standalone: true,
  template: `<canvas #canvas></canvas>`,
  styles: [
    `
      canvas {
        width: 100vw;
        height: 100vh;
        display: block;
        background: black;
      }
    `,
  ],
  providers: [ThreeEngineService],
})
export class VisualizerComponent implements AfterViewInit {
  @ViewChild('canvas', { static: true })
  canvas!: ElementRef<HTMLCanvasElement>;

  constructor(private three: ThreeEngineService) {}

  ngAfterViewInit() {
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
    const cosmicShaderProgram: ShaderProgram = {
      vertex: `
    void main() {
      gl_Position = vec4(position, 1.0);
    }
    `,
      fragment: fragmentShader,
      uniforms: {
        uTime: { value: 0 },
        uResolution: { value: new THREE.Vector2(1, 1) },
      },
    };
    this.three.init(this.canvas.nativeElement, cosmicShaderProgram);
    this.three.animate();
  }
}
