#version 300 es
precision highp float;
in vec4 vertexPosition;
in vec4 vertexColor;
out vec4 vColor;
out vec2 coord;
uniform float u_time;
const float PI = 3.14159;
void main() {

    vColor = vec4(vertexColor.x * sin(u_time), vertexColor.y * sin(u_time + 1.0), vertexColor.z * sin(u_time + 2.0), vertexColor.w);
    coord = vertexPosition.xy * .5 + .5;
    gl_Position = vertexPosition;
}