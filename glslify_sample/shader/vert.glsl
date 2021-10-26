#version 300 es
in vec4 vertexPosition;
out vec2 coord;
void main(){
    coord=vertexPosition.xy*.5+.5;
    gl_Position=vertexPosition;
}