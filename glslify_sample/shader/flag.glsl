#version 300 es
#pragma glslify:sdCircle=require('./sdlib.glsl')
#pragma glslify:coloring_sdf=require('./util.glsl')

precision mediump float;
in vec2 coord;
out vec4 color_out;
void main() {
    vec2 origin = vec2(coord.x - 0.5, coord.y - 0.5);
    color_out = vec4(coloring_sdf(sdCircle(origin, 0.25)), 1.);
}