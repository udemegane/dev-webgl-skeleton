#version 300 es
in vec4 vertexPosition;
in vec4 color;
out vec4 vertColor;
void main(){
    vertColor=color;
    gl_Position=vertexPosition;
}