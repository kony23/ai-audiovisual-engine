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
    vec3 a = vec3(0.14, 0.08, 0.20);
    vec3 b = vec3(0.32, 0.22, 0.45);
    vec3 c = vec3(1.0, 0.55 + uPresence*0.25, 0.32 + uMid*0.3);
    vec3 d = vec3(0.0, 0.22 + uCentroid*0.12, 0.58);
    return a + b*cos(6.28318*(c*t+d));
}

void main(){
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float fluxPulse = smoothstep(0.2, 0.8, uFlux) * 0.35;
    float t = uTime * (0.58 + uEnergy*1.15 + uCentroid*0.35);

    float bassPulse = 1.0 + uBass * 0.25 + uLowMid * 0.14;
    p *= bassPulse;

    float warp = fbm(p*1.65 + t*0.32 + vec2(uCentroid*0.25, -uCentroid*0.25));
    float warpCenter = fbm(vec2(uCentroid*0.25, -uCentroid*0.25) + t*0.32);
    vec2 warpVec = vec2(
        sin(p.y*2.1 + t + warp),
        cos(p.x*2.1 - t + warp)
    );
    vec2 warpCenterVec = vec2(
        sin(t + warpCenter),
        cos(-t + warpCenter)
    );
    p += 0.12 * (warpVec - warpCenterVec);

    float r = length(p);
    float a = atan(p.y,p.x);

    float field =
        sin(a*2.2 + t*0.82) +
        sin(r*4.0 - t*0.9) +
        sin((p.x+p.y)*2.4 + t*0.45);

    field += sin((a*5.0 + r*8.0) - t*1.15) * uPresence * 0.22;
    field += fbm(p*2.0 - t*0.55) * 0.6;
    field *= 0.42;

    float rings = sin(r*(7.0 + uCrest*2.2) - t*1.1 + uBass*2.0);
    field += rings * uBass * 0.26;
    field += fluxPulse * 0.08 * sin((p.x - p.y) * 10.0 + t*3.5);

    float v = field*0.5 + 0.5;
    vec3 col = palette(v + uMid*0.13 + uCentroid*0.1);

    col *= smoothstep(0.08, 0.95, v*(1.02 + uCrest*0.22));

    float edge = abs(dFdx(v)) + abs(dFdy(v));
    col += edge * (0.3 + uCrest*0.45) * vec3(1.0, 0.55, 1.25);
    col += fluxPulse * vec3(0.25, 0.12, 0.35);

    float n = noise(uv*uResolution*0.15 + t*1.8);
    col += (uHigh*0.32 + uPresence*0.22) * n * vec3(0.35, 0.45, 0.7);

    float vig = smoothstep(1.25 - uCentroid*0.1,0.32,length(uv-0.5));
    col *= vig + 0.38;

    col = pow(max(col, 0.0), vec3(0.92));
    col += 0.08;

    gl_FragColor = vec4(col,1.0);
}
