#version 300 es
#pragma glslify:sdlib=require('./sdlib.glsl')
#pragma glslify:util=require('./util.glsl')

precision mediump float;
in vec2 coord;
out vec4 color_out;
void main(){
    color_out=vec4(coord.x,.5,coord.y,1.);
}