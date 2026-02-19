precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uBass;
uniform float uMid;
uniform float uHigh;
uniform float uEnergy;

const int MARCH_STEPS = 56;
const float STEP_SIZE = 0.28;
const float TRANSMIT_EPSILON = 0.015;
const float DENSITY_EPSILON = 0.003;

mat2 rot2(float a) {
  float s = sin(a);
  float c = cos(a);
  return mat2(c, -s, s, c);
}

float hash(vec3 p) {
  return fract(sin(dot(p, vec3(127.1, 311.7, 74.7))) * 43758.5453123);
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
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec3(17.0, 31.0, 47.0);
    a *= 0.5;
  }
  return v;
}

float nebulaDensity(vec3 p) {
  float t = uTime * 0.12;
  float warpAmp = 0.25 + 1.10 * clamp(uMid, 0.0, 1.0);

  vec3 q = p;
  vec3 warp = vec3(
    noise(q * 0.55 + vec3(0.0, t, 11.7)),
    noise(q * 0.55 + vec3(8.3, -t * 1.3, 3.1)),
    noise(q * 0.55 + vec3(-4.1, t * 0.7, 19.4))
  );
  q += (warp - 0.5) * warpAmp * 2.0;

  float base = fbm(q * 1.00 + vec3(0.0, 0.0, t * 2.0));
  float detail = fbm(q * 2.20 - vec3(0.0, t * 3.0, 0.0));
  float cloud = base * 0.74 + detail * 0.26;

  float shell = 1.0 - smoothstep(0.9, 3.4, length(p.xy * vec2(0.85, 1.15)));
  float lane = smoothstep(0.2, 0.95, cloud);
  float depthFade = exp(-abs(p.z) * 0.20);
  float bassBoost = 0.65 + 1.8 * clamp(uBass, 0.0, 1.0);

  float density = lane * shell * depthFade * bassBoost;
  return clamp(density, 0.0, 1.0);
}

vec3 computeLight(vec3 p, float density, vec3 rd) {
  vec3 lightDir = normalize(vec3(-0.55, 0.35, -0.75));
  float mu = clamp(dot(rd, -lightDir), 0.0, 1.0);
  float phase = 0.35 + 0.65 * pow(mu, 3.0);

  float flickerAmt = 0.08 + 0.32 * clamp(uHigh, 0.0, 1.0);
  float flicker = 1.0 + flickerAmt * sin(uTime * 12.0 + p.z * 5.0);

  float depth = max(p.z + 6.0, 0.0);
  float depthAtten = exp(-depth * 0.10);

  vec3 cold = vec3(0.13, 0.22, 0.55);
  vec3 warm = vec3(1.00, 0.56, 0.30);
  vec3 hue = mix(cold, warm, smoothstep(0.2, 0.9, density));

  return hue * phase * depthAtten * flicker;
}

vec4 raymarch(vec3 ro, vec3 rd) {
  vec3 accum = vec3(0.0);
  float trans = 1.0;
  float t = 0.0;

  for (int i = 0; i < MARCH_STEPS; i++) {
    if (trans < TRANSMIT_EPSILON) {
      break;
    }

    vec3 p = ro + rd * t;
    float dens = nebulaDensity(p);
    if (dens > DENSITY_EPSILON) {
      float extinction = dens * 1.35;
      float alpha = 1.0 - exp(-extinction * STEP_SIZE);
      vec3 lit = computeLight(p, dens, rd) * dens;

      accum += trans * lit * alpha;
      trans *= exp(-extinction * STEP_SIZE * 1.15);
    }
    t += STEP_SIZE;
  }

  return vec4(accum, trans);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  float amp = clamp(uEnergy, 0.0, 1.5);
  vec3 ro = vec3(0.0, 0.0, -6.0);
  ro.xy += vec2(sin(uTime * 0.23), cos(uTime * 0.19)) * (0.35 * amp);

  vec3 rd = normalize(vec3(uv, 1.85));
  rd.xz = rot2(0.08 * sin(uTime * 0.17) * amp) * rd.xz;
  rd.yz = rot2(0.06 * cos(uTime * 0.13) * amp) * rd.yz;

  vec4 neb = raymarch(ro, rd);

  vec2 st = gl_FragCoord.xy / uResolution.xy;
  vec2 starP = (st - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);
  starP *= 760.0;
  vec2 cell = floor(starP);
  vec2 f = fract(starP) - 0.5;

  float rnd = hash(vec3(cell, 91.7));
  float seed = smoothstep(0.9978, 1.0, rnd);
  float twinkle = 0.75 + 0.25 * sin(uTime * 1.6 + rnd * 40.0 + clamp(uHigh, 0.0, 1.0) * 8.0);
  float star = seed * exp(-32.0 * dot(f, f)) * twinkle;
  star *= 0.7 + 1.2 * clamp(uHigh * 0.5, 0.0, 1.0);

  vec3 bg = vec3(0.004, 0.006, 0.012);
  bg += vec3(0.02, 0.03, 0.06) * (1.0 - exp(-1.7 * length(uv)));

  vec3 color = neb.rgb + neb.a * (bg + vec3(star));
  color = 1.0 - exp(-color * 1.35);
  color = pow(color, vec3(0.95));

  gl_FragColor = vec4(color, 1.0);
}
