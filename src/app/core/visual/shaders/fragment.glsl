precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uRms;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
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
  float amp = 0.55;
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p *= 2.1;
    amp *= 0.5;
  }
  return value;
}

vec3 palette(float t) {
  vec3 a = vec3(0.12, 0.14, 0.2);
  vec3 b = vec3(0.35, 0.25, 0.45);
  vec3 c = vec3(0.8, 0.4, 0.7);
  vec3 d = vec3(0.0, 0.15, 0.25);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
  float time = uTime * 0.15;

  float energy = clamp(uEnergy, 0.0, 1.0);
  float bass = clamp(uBass, 0.0, 1.0);
  float mid = clamp(uMid, 0.0, 1.0);
  float treble = clamp(uTreble, 0.0, 1.0);
  float rms = clamp(uRms, 0.0, 1.0);

  float audioGate = smoothstep(0.02, 0.08, rms + energy * 0.6);

  float r = length(uv);
  float a = atan(uv.y, uv.x);
  float swirl = a + time + r * (2.2 + bass * 2.0);

  vec2 flow = vec2(cos(swirl), sin(swirl)) * (0.6 + mid * 0.6);
  float nebula = fbm(uv * (2.5 + treble * 2.0) + flow + time);
  float rings = sin(r * (12.0 + bass * 6.0) - time * (3.0 + treble * 4.0));

  float core = smoothstep(0.45 + bass * 0.1, 0.0, r);
  float glow = (nebula * 0.8 + rings * 0.2) * core;

  vec3 color = palette(nebula + time + mid * 0.5);
  color *= (0.6 + glow * 1.4);
  color += vec3(0.2, 0.35, 0.7) * pow(core, 2.5) * (0.6 + energy);

  color *= audioGate;
  gl_FragColor = vec4(color, audioGate);
}
