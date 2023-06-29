#define PI 3.1415926535897932384626433832795

uniform vec2 uResolution;
uniform float uTime;
uniform float uDirection;

varying vec2 vUv;

vec2 Hash12(float t){
  float x = fract(sin(t * 674.3) * 453.2);
  float y = fract(sin((t+x) * 714.3) * 263.2);
  return vec2(x, y);
}

vec2 rotate(vec2 uv, float rotation, vec2 mid)
{
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
}

void main(){

  float brightness = 0.02;
  float velocidad = 15.0;
  float strength = 0.0;

  vec2 dir = Hash12(1.0)-0.5;
  vec2 vUv = rotate(vUv, PI * uDirection, vec2(0.5));


  for(float i = 0.1; i < 100.0; i++){
     strength += step(1.0,(brightness *  ( (60.0 - i) * 0.05)) / distance(vUv, vec2(0.0 - (i * 0.008)  , 0.5 ) - vec2(-0.5, 0.0)  * uTime * velocidad  ));
  
   //strength += step(1.0,(brightness *  ( (60.0 - i) * 0.05)) / distance(vec2(vUv.x, vUv.y), vec2(0.0 - (i * 0.008)  , 0.0 ) - vec2(0.0, -0.5)  * uTime * velocidad  ));
  }

 //  strength += step(1.0,(brightness *  ( (60.0 - i) * 0.05)) / distance(vUv, vec2(0.0 - (i * 0.008)  , 0.5 ) - vec2(-0.5, 0.0)  * uTime * velocidad  ));
  
  gl_FragColor= vec4(strength, strength, strength, strength );
} 