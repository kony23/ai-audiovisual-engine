precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uEnergy;
uniform float uBass;
uniform float uMid;
uniform float uTreble;
uniform float uRms;

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

  float energy = clamp(uEnergy, 0.0, 1.0);
  float bass = clamp(uBass, 0.0, 1.0);
  float mid = clamp(uMid, 0.0, 1.0);
  float treble = clamp(uTreble, 0.0, 1.0);
  float rms = clamp(uRms, 0.0, 1.0);

  float d = length(uv);
  float speed = 4.0 + treble * 6.0;
  float ripple = sin(d * (10.0 + bass * 8.0) - t * speed);
  float pulse = mix(0.6, 2.4, energy);

  vec3 color = palette(d + t + mid * 0.5) * ripple * pulse;
  gl_FragColor = vec4(color, 0.85 + rms * 0.15);
}
