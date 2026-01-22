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
