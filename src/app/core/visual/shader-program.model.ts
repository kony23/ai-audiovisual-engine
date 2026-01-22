import * as THREE from 'three';

export interface ShaderProgram {
  readonly vertex: string;
  readonly fragment: string;
  readonly uniforms: Record<string, THREE.IUniform>;
}