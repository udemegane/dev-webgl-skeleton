#version 300 es
precision highp float;
in vec3 vertexPosition;
in vec3 vertexNormal;
in vec4 vertexColor;
out vec4 vColor;
out vec3 position;
out vec3 normal;
out vec2 texcoord;
uniform float u_time;

uniform vec3 offset;
uniform vec3 axis;
uniform float angle;

vec4 qConjugate(vec4 q) {
    return vec4(-q.x, -q.y, -q.z, q.w);
}

vec4 qMul(vec4 q1, vec4 q2) {
    vec3 qv1 = vec3(q1.x, q1.y, q1.z);
    vec3 qv2 = vec3(q2.x, q2.y, q2.z);
    return vec4(vec3(cross(qv1, qv2) + q2.w * qv1 + q1.w * qv2), q1.w * q2.w - dot(qv1, qv2));
}

vec3 rotate3d(vec3 v, vec4 q) {
    vec4 vq = vec4(v, 0.0);
    vec4 cq = qConjugate(q);
    vec4 qOut = qMul(qMul(cq, vq), q);
    return vec3(qOut.x, qOut.y, qOut.z);
}

vec4 makeQuatFromAxisAngle(vec3 axis, float angle) {
    vec4 quat = vec4(vec3(axis.x * sin(angle / 2.0), axis.y * sin(angle / 2.0), axis.z * sin(angle / 2.0)), cos(angle / 2.0));
    return normalize(quat);
}

void main() {
    vColor = vertexColor;
    normal = vertexNormal;
    float theta = u_time * 2.0;
    vec4 rotQuat = makeQuatFromAxisAngle(axis, angle);
    vec3 rot = rotate3d(rotate3d(vertexPosition, rotQuat), makeQuatFromAxisAngle(vec3(0.0, 1.0, 0.0), theta));
    mat4 scalemat = mat4(0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 0.5, 0.0, 0.0, 0.0, 0.0, 1.0);
    gl_Position = scalemat * vec4(rot, 1.0);
    position = gl_Position.xyz;
}