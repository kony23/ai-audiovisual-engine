precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uRms;

float hash(vec3 p) {
  p = fract(p * 0.3183099 + vec3(0.1, 0.2, 0.3));
  p *= 17.0;
  return fract(p.x * p.y * p.z * (p.x + p.y + p.z));
}

float noise(vec3 p) {
  vec3 i = floor(p);
  vec3 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);

  float n000 = hash(i + vec3(0.0, 0.0, 0.0));
  float n100 = hash(i + vec3(1.0, 0.0, 0.0));
  float n010 = hash(i + vec3(0.0, 1.0, 0.0));
  float n110 = hash(i + vec3(1.0, 1.0, 0.0));
  float n001 = hash(i + vec3(0.0, 0.0, 1.0));
  float n101 = hash(i + vec3(1.0, 0.0, 1.0));
  float n011 = hash(i + vec3(0.0, 1.0, 1.0));
  float n111 = hash(i + vec3(1.0, 1.0, 1.0));

  float nx00 = mix(n000, n100, f.x);
  float nx10 = mix(n010, n110, f.x);
  float nx01 = mix(n001, n101, f.x);
  float nx11 = mix(n011, n111, f.x);

  float nxy0 = mix(nx00, nx10, f.y);
  float nxy1 = mix(nx01, nx11, f.y);

  return mix(nxy0, nxy1, f.z);
}

float fbm(vec3 p) {
  float value = 0.0;
  float amp = 0.55;
  for (int i = 0; i < 5; i++) {
    value += amp * noise(p);
    p *= 2.05;
    amp *= 0.5;
  }
  return value;
}

vec3 palette(float t) {
  vec3 a = vec3(0.06, 0.08, 0.12);
  vec3 b = vec3(0.25, 0.2, 0.45);
  vec3 c = vec3(0.9, 0.4, 0.8);
  vec3 d = vec3(0.0, 0.15, 0.35);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;

  float energy = clamp(uEnergy, 0.0, 1.0);
  float bass = clamp(uBass, 0.0, 1.0);
  float mid = clamp(uMid, 0.0, 1.0);
  float treble = clamp(uTreble, 0.0, 1.0);
  float rms = clamp(uRms, 0.0, 1.0);

  float gate = smoothstep(0.02, 0.08, rms + energy * 0.6);

  vec3 ro = vec3(0.0, 0.0, -4.0);
  vec3 rd = normalize(vec3(uv, 1.35));

  float travel = uTime * 0.35;
  ro.z += travel;

  vec3 color = vec3(0.0);
  float glow = 0.0;

  for (int i = 0; i < 48; i++) {
    float t = float(i) * 0.12;
    vec3 pos = ro + rd * t;

    float field = fbm(pos * 0.75);
    float density = smoothstep(0.45, 0.75, field);

    float starSeed = hash(floor(pos * 1.6));
    float sparkle = noise(pos * 2.3 + vec3(0.0, 0.0, uTime * 0.15));
    float starShape = smoothstep(0.7, 1.0, sparkle);
    float star = smoothstep(0.9 - treble * 0.08, 1.0, starSeed) * starShape;

    float beatPulse = 0.4 + bass * 1.4;
    vec3 nebulaColor = palette(field + mid * 0.4 + uTime * 0.05);
    vec3 starColor = mix(vec3(0.6, 0.8, 1.0), vec3(1.0, 0.6, 0.4), starShape) * beatPulse;

    glow += density * 0.06;
    color += nebulaColor * density * 0.08;
    color += starColor * star * (0.22 + treble);
  }

  color += vec3(0.15, 0.35, 0.7) * pow(glow, 1.3) * (0.4 + energy);
  color *= gate;

  gl_FragColor = vec4(color, gate);
}
