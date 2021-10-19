#version 300 es
precision mediump float;

//uniform vec2 u_resolution;
//uniform float u_time;
out vec4 fragmentColor;

void main(){
    //vec2 st=(gl_FragCoord.xy*2.-u_resolution.xy)/min(u_resolution.x,u_resolution.y);
    fragmentColor=vec4(.6784,.2118,.9451,1.);
}