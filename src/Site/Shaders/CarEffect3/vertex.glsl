uniform float amplitude;

attribute vec3 customColor;
attribute vec3 vel;

varying vec3 vNormal;
varying vec3 vColor;

void main(){

  vNormal = normal;
  vColor = customColor;

  vec3 newPosition = position + vel * amplitude * 1.0;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}