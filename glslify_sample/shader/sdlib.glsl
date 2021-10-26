precision mediump float;
float sdCircle(vec2 position, float r) {
    return length(position) - r;
}
#pragma glslify:export(sdCircle)