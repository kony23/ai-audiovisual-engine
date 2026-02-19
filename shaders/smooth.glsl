precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uBass;
uniform float uLowMid;
uniform float uMid;
uniform float uPresence;
uniform float uHigh;
uniform float uEnergy;
uniform float uCentroid;
uniform float uFlux;
uniform float uCrest;

float hash(vec2 p){
    p = fract(p * vec2(123.34,456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p){
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);

    float a = hash(i);
    float b = hash(i+vec2(1.,0.));
    float c = hash(i+vec2(0.,1.));
    float d = hash(i+vec2(1.,1.));

    return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}

float fbm(vec2 p){
    float v = 0.0;
    float a = 0.5;
    for(int i=0;i<4;i++){
        v += a * noise(p);
        p *= 2.0;
        a *= 0.5;
    }
    return v;
}

vec3 palette(float t){
    vec3 a = vec3(0.12, 0.10, 0.16);
    vec3 b = vec3(0.22, 0.16, 0.34);
    vec3 c = vec3(1.0, 0.45 + uPresence*0.15, 0.28 + uMid*0.2);
    vec3 d = vec3(0.0, 0.18 + uCentroid*0.08, 0.53);
    return a + b * cos(6.28318 * (c * t + d));
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float fluxPulse = smoothstep(0.35, 0.9, uFlux) * 0.15;
    float t = uTime * (0.42 + uEnergy*0.75 + uCentroid*0.20);

    float scalePulse = 1.0 + uBass * 0.14 + uLowMid * 0.08;
    p *= scalePulse;

    float warp = fbm(p*1.15 + t*0.20 + vec2(uCentroid*0.14, -uCentroid*0.14));
    float warpCenter = fbm(vec2(uCentroid*0.14, -uCentroid*0.14) + t*0.20);
    vec2 warpVec = vec2(
        sin(p.y*1.5 + t + warp*0.8),
        cos(p.x*1.5 - t + warp*0.8)
    );
    vec2 warpCenterVec = vec2(
        sin(t + warpCenter*0.8),
        cos(-t + warpCenter*0.8)
    );
    p += 0.06 * (warpVec - warpCenterVec);

    float r = length(p);
    float a = atan(p.y,p.x);

    float field =
        sin(a*1.6 + t*0.55) +
        sin(r*2.8 - t*0.62) +
        sin((p.x+p.y)*1.8 + t*0.35);

    field += sin((a*3.0 + r*4.2) - t*0.8) * uPresence * 0.12;
    field += fbm(p*1.45 - t*0.35) * 0.42;
    field *= 0.33;

    float rings = sin(r*(4.6 + uCrest*1.0) - t*0.7 + uBass*1.0);
    field += rings * uBass * 0.14;
    field += fluxPulse * 0.04 * sin((p.x - p.y) * 6.0 + t*2.0);

    float v = field*0.5 + 0.5;
    vec3 col = palette(v + uMid*0.08 + uCentroid*0.06);

    col *= smoothstep(0.14, 0.92, v*(0.98 + uCrest*0.10));

    float edge = abs(dFdx(v)) + abs(dFdy(v));
    col += edge * (0.12 + uCrest*0.20) * vec3(0.9, 0.55, 1.05);
    col += fluxPulse * vec3(0.12, 0.08, 0.18);

    // Minimal grain for very smooth output.
    float n = noise(uv*uResolution*0.06 + t*0.7);
    col += (uHigh*0.10 + uPresence*0.08) * n * vec3(0.12, 0.18, 0.28);

    float vig = smoothstep(1.30 - uCentroid*0.06, 0.34, length(uv-0.5));
    col *= vig + 0.42;

    col = pow(max(col, 0.0), vec3(0.97));
    col += 0.06;

    gl_FragColor = vec4(col,1.0);
}
