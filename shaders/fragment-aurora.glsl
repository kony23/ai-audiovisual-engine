precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uRms;

float hash(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.5);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

float fbm(vec2 p) {
  float value = 0.0;
  float amp = 0.6;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 1.9;
    amp *= 0.55;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
  float time = uTime * 0.12;

  float energy = clamp(uEnergy, 0.0, 1.0);
  float bass = clamp(uBass, 0.0, 1.0);
  float treble = clamp(uTreble, 0.0, 1.0);
  float rms = clamp(uRms, 0.0, 1.0);

  float gate = smoothstep(0.02, 0.08, rms + energy * 0.5);

  float warp = sin(uv.y * 3.0 + time * (2.0 + treble * 4.0)) * 0.6;
  vec2 flow = vec2(warp, cos(uv.x * 2.0 + time)) * (0.4 + bass);
  float field = fbm(uv * (3.0 + treble * 2.0) + flow + time);

  vec3 base = mix(vec3(0.05, 0.1, 0.2), vec3(0.1, 0.5, 0.7), field);
  vec3 glow = vec3(0.6, 0.9, 0.8) * pow(field, 2.2);
  vec3 color = base + glow;

  color *= (0.8 + bass * 0.8);
  color += vec3(0.4, 0.2, 0.8) * pow(abs(uv.y), 1.6) * treble;

  gl_FragColor = vec4(color * gate, gate);
}
