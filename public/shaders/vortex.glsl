#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif

uniform float uTime;
uniform vec2 uResolution;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uEnergy;

float hash21(vec2 p) {
  p = fract(p * vec2(127.1, 311.7));
  p += dot(p, p + 34.5);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash21(i);
  float b = hash21(i + vec2(1.0, 0.0));
  float c = hash21(i + vec2(0.0, 1.0));
  float d = hash21(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.0;
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 res = uResolution.xy;
  vec2 uv = gl_FragCoord.xy / res;
  vec2 p = (gl_FragCoord.xy - 0.5 * res) / res.y;

  float t = uTime * 0.7;
  float bass = clamp(uBass * 0.08, 0.0, 1.0);
  float mid = clamp(uMid * 0.06, 0.0, 1.0);
  float treble = clamp(uTreble * 0.06, 0.0, 1.0);
  float energy = clamp(uEnergy * 0.04, 0.0, 1.0);

  // Spin + depth warp
  float r = length(p);
  float ang = atan(p.y, p.x);
  float spin = t * 0.9 + bass * 2.2;
  ang += spin + r * 3.0;
  float depth = 1.0 / (r * 1.6 + 0.35);
  vec2 q = vec2(cos(ang), sin(ang)) * depth;

  // Plasma field
  float n1 = fbm(q * (2.6 + mid * 1.8) + vec2(t * 0.8, -t * 0.6));
  float n2 = fbm(q * (4.2 + treble * 2.2) - vec2(t * 1.2, t * 0.7));
  float plasma = n1 * 0.7 + n2 * 0.3;

  // Tunnel rings
  float rings = smoothstep(0.0, 1.0, sin((depth + t * 2.0) * 6.2831));
  float ringGlow = pow(abs(rings), 3.0) * (0.6 + bass);

  // Electric streaks
  float streaks = smoothstep(0.15, 0.85, sin((ang * 5.0 + t * 6.0) + plasma * 4.0));
  streaks *= (0.25 + treble);

  // Color palette
  vec3 core = mix(vec3(0.05, 0.02, 0.08), vec3(0.2, 0.6, 1.0), plasma);
  vec3 neon = vec3(1.0, 0.25, 0.7) * (0.4 + mid);
  vec3 col = core + ringGlow * vec3(0.2, 0.8, 1.2) + streaks * neon;

  // Energy bloom
  float bloom = smoothstep(0.2, 0.9, plasma + ringGlow) * (0.6 + energy);
  col += bloom * vec3(0.4, 0.9, 1.2);

  // Vignette
  float vig = smoothstep(1.1, 0.25, r);
  col *= vig;

  // Subtle scanline shimmer
  float scan = 0.9 + 0.1 * sin((uv.y + t * 0.5) * res.y * 0.04);
  col *= scan;

  gl_FragColor = vec4(col, 1.0);
}
