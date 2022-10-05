#version 300 es
precision mediump float;
in vec2 coord;
in vec4 vColor;
out vec4 color_out;
void main() {
    color_out = mix(vColor, vec4(coord.x, .5, coord.y, 1.), 0.5);
}