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
uniform float uZcr;
uniform float uCrest;

// -------- utility --------
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

// psychedelic palette driven by mids
vec3 palette(float t){
    vec3 a = vec3(0.2,0.05,0.25);
    vec3 b = vec3(0.8,0.2,0.9);
    vec3 c = vec3(1.0,0.6 + uPresence*0.4,0.2 + uMid*0.6);
    vec3 d = vec3(0.0,0.33 + uMid*0.2 + uCentroid*0.25,0.67);
    return a + b*cos(6.28318*(c*t+d));
}

void main(){
    // normalized fullscreen UV
    vec2 uv = gl_FragCoord.xy / uResolution.xy;
    vec2 p = uv * 2.0 - 1.0;
    p.x *= uResolution.x / uResolution.y;

    float fluxPulse = smoothstep(0.12, 0.55, uFlux);
    float t = uTime * (0.6 + uEnergy*2.0 + uCentroid*0.9);

    // bass zoom + pulse
    float bassPulse = 1.0 + uBass * 0.5 + uLowMid * 0.35;
    p *= bassPulse;

    // organic warp
    float warp = fbm(p*2.0 + t*0.5 + vec2(uCentroid, -uCentroid));
    float warpCenter = fbm(vec2(uCentroid, -uCentroid) + t*0.5);
    vec2 warpVec = vec2(
        sin(p.y*3.0 + t + warp*2.0),
        cos(p.x*3.0 - t + warp*2.0)
    );
    vec2 warpCenterVec = vec2(
        sin(t + warpCenter*2.0),
        cos(-t + warpCenter*2.0)
    );
    p += 0.25 * (warpVec - warpCenterVec);

    float jitter = noise(uv*uResolution*0.18 + t*8.0) - 0.5;
    float jitterCenter = noise(vec2(0.5) * uResolution*0.18 + t*8.0) - 0.5;
    p += (jitter - jitterCenter) * uZcr * 0.22;

    // plasma field
    float r = length(p);
    float a = atan(p.y,p.x);

    float field =
        sin(a*3.0 + t) +
        sin(r*6.0 - t*1.3) +
        sin((p.x+p.y)*4.0 + t*0.7);

    field += sin((a*10.0 + r*14.0) - t*2.1) * uPresence * 0.6;
    field += fbm(p*3.0 - t);
    field *= 0.5;

    // geometry pulses from bass
    float rings = sin(r*(12.0 + uCrest*8.0) - t*2.0 + uBass*4.0);
    field += rings * uBass * 0.8;
    field += fluxPulse * 0.25 * sin((p.x - p.y) * 22.0 + t*7.0);

    float v = field*0.5 + 0.5;

    // color
    vec3 col = palette(v + uMid*0.3 + uCentroid*0.25);

    // liquid contrast
    col *= smoothstep(0.0,1.0,v*(1.2 + uCrest*0.9));

    // neon edges
    float edge = abs(dFdx(v)) + abs(dFdy(v));
    col += edge * (1.0 + uCrest*1.8) * vec3(2.0,0.8,3.0);
    col += fluxPulse * vec3(0.9,0.35,1.2);

    // highs = glow + noise sparkle
    float n = noise(uv*uResolution*0.5 + t*5.0);
    col += (uHigh + uPresence*0.7) * (n*0.6) * vec3(1.2,1.4,2.0);

    // subtle vignette but never black
    float vig = smoothstep(1.25 - uCentroid*0.25,0.3,length(uv-0.5));
    col *= vig + 0.3;

    // final techno punch
    col = pow(col, vec3(0.8));
    col += 0.15; // safety floor: never black

    gl_FragColor = vec4(col,1.0);
}
