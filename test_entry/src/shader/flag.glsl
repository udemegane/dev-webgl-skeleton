#version 300 es
precision mediump float;
in vec2 coord;
out vec4 color_out;
void main(){
    //color_out=vec4(coord.x,.5,coord.y,1.);
    color_out=vec4(.3176,.4784,.2706,1.);
}