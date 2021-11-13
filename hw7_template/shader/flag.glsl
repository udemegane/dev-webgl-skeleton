#version 300 es
precision highp float;
in vec4 vColor;
in vec3 position;
in vec2 texcoord;
in vec3 normal;
out vec4 color_out;
void main() {
    color_out = vec4(normal * 0.5 + 0.5, 1.0);
    //color_out = vColor;
}