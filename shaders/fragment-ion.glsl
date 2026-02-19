precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uRms;

float hash(vec2 p) {
  p = fract(p * vec2(41.0, 289.0));
  p += dot(p, p + 19.19);
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
  for (int i = 0; i < 4; i++) {
    value += amp * noise(p);
    p *= 2.2;
    amp *= 0.5;
  }
  return value;
}

void main() {
  vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution) / uResolution.y;
  float time = uTime * 0.18;

  float energy = clamp(uEnergy, 0.0, 1.0);
  float bass = clamp(uBass, 0.0, 1.0);
  float mid = clamp(uMid, 0.0, 1.0);
  float treble = clamp(uTreble, 0.0, 1.0);
  float rms = clamp(uRms, 0.0, 1.0);

  float gate = smoothstep(0.02, 0.08, rms + energy * 0.6);

  float angle = atan(uv.y, uv.x);
  float radius = length(uv);

  float spiral = sin(angle * (4.0 + bass * 3.0) + radius * 12.0 - time * (2.5 + treble * 4.0));
  float mist = fbm(uv * (2.0 + mid * 2.0) + vec2(cos(time), sin(time)) * 0.6);

  vec3 base = mix(vec3(0.08, 0.05, 0.15), vec3(0.7, 0.2, 0.9), mist);
  vec3 sheen = vec3(0.3, 0.7, 1.0) * pow(max(spiral, 0.0), 2.0);
  vec3 color = base + sheen;

  color *= (0.7 + energy * 1.2);
  color += vec3(0.1, 0.4, 0.8) * pow(1.0 - radius, 3.0) * (0.5 + bass);

  gl_FragColor = vec4(color * gate, gate);
}
