precision mediump float;
vec3 coloring_sdf(float sdf) {
    vec3 color = vec3(1.0) - sdf * vec3(0.1, 0.4, 0.7);
    color *= 1.0 - exp(-3.0 * abs(sdf));
    color *= 0.8 + 0.2 * cos(150.0 * sdf);
    color = mix(color, vec3(1.0), 1.0 - smoothstep(0.0, 0.01, abs(sdf)));
    return color;
}

#pragma glslify:export(coloring_sdf)
