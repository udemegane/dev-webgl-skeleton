#version 300 es
precision mediump float;
in vec2 coord;
out vec4 color_out;
void main(){
    //color_out=vec4(coord.x,.5,coord.y,1.);
    color_out=vec4(.1412,.3176,.902,1.);
}