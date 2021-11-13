import vertexShaderSource from './shader/vert.glsl'
import fragmentShaderSource from './shader/flag.glsl'
//import { Pane } from 'tweakpane';

const cSize = {
    width: 500,
    height: 500,
} as const;
type cSize = typeof cSize[keyof typeof cSize];


type _AttribHelper = {
    Location: number;
    VBO: WebGLBuffer;
    AttrSize: number;
};

interface VertsAttrib {
    Position: _AttribHelper;
    Color: _AttribHelper;
    Normal: _AttribHelper;
}
const VERTEX_SIZE = 3;
const NORMAL_SIZE = 3;
const COLOR_SIZE = 4;

const Params = {
    axis: { x: 0.5, y: 1.0, z: 0.3 },
    offset: { x: 0.0, y: 0.0, z: 0.8 },
    speed: -0.1,
    angle: 30,
};
/*
const setParamUI = () => {
    const Params = {
        axis: { x: 0.5, y: 1.0, z: 0.3 },
        offset: { x: 0.0, y: 0.0, z: 0.8 },
        speed: 1.0,
        angle: 30,
    };
    const pane = new Pane();
    pane.addInput(Params, 'axis');
    pane.addInput(Params, 'offset');
    pane.addInput(Params, 'speed', { min: -10.0, max: 10.0, });
    pane.addInput(Params, 'angle', { min: -180.0, max: 180.0 });
    return Params;
}
*/
const webglInit = (w: number, h: number): WebGL2RenderingContext => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    document.body.appendChild(canvas);

    const mayBeContext = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (mayBeContext === null) {
        console.warn('could not get context');
        return
    }
    const gl: WebGL2RenderingContext = mayBeContext;
    // Clear screen
    gl.clearColor(0, 0, 0, 0);
    gl.clearDepth(1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    return gl;
}

const getShaderProgram = (gl: WebGL2RenderingContext, vertexShaderSource: string, fragmentShaderSource: string): WebGLProgram => {
    const vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexShaderSource);
    gl.compileShader(vertexShader);

    const vertexShaderCompileStatus = gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS);
    if (!vertexShaderCompileStatus) {
        const info = gl.getShaderInfoLog(vertexShader);
        console.warn(info);
        return
    }

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragmentShader, fragmentShaderSource);
    gl.compileShader(fragmentShader);

    const fragmentShaderCompileStatus = gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS);
    if (!fragmentShaderCompileStatus) {
        const info = gl.getShaderInfoLog(fragmentShader);
        console.warn(info);
        return
    }
    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
    if (!linkStatus) {
        const info = gl.getProgramInfoLog(program);
        console.warn(info);
        return
    }
    return program;
}

const main = () => {
    const gl: WebGL2RenderingContext = webglInit(cSize.width, cSize.height);
    const Program = getShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    gl.useProgram(Program);

    const createVbo = (vertices: Float32Array) => {
        const vbo = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        return vbo;
    };

    const setVertexAttrib = (attrib: VertsAttrib) => {
        (Object.keys(attrib) as (keyof VertsAttrib)[]).map(
            key => {
                gl.bindBuffer(gl.ARRAY_BUFFER, attrib[key].VBO);
                gl.enableVertexAttribArray(attrib[key].Location);
                gl.vertexAttribPointer(attrib[key].Location, attrib[key].AttrSize, gl.FLOAT, false, 0, 0);
                gl.bindBuffer(gl.ARRAY_BUFFER, null);
            }
        );
    };
    const vertices = new Float32Array([
        // Front face
        -1.0, -1.0, 1.0,
        1.0, -1.0, 1.0,
        1.0, 1.0, 1.0,
        -1.0, 1.0, 1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0, 1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0, 1.0, -1.0,
        -1.0, 1.0, 1.0,
        1.0, 1.0, 1.0,
        1.0, 1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0, 1.0,
        -1.0, -1.0, 1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0, 1.0, -1.0,
        1.0, 1.0, 1.0,
        1.0, -1.0, 1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0, 1.0,
        -1.0, 1.0, 1.0,
        -1.0, 1.0, -1.0,
    ]);
    const indices = new Uint16Array([
        0, 1, 2, 0, 2, 3,    // front
        4, 5, 6, 4, 6, 7,    // back
        8, 9, 10, 8, 10, 11,   // top
        12, 13, 14, 12, 14, 15,   // bottom
        16, 17, 18, 16, 18, 19,   // right
        20, 21, 22, 20, 22, 23,   // left
    ]);
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, indices, gl.STATIC_DRAW);

    const normals = new Float32Array([
        // Front face
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,
        0.0, 0.0, 1.0,

        // Back face
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,
        0.0, 0.0, -1.0,

        // Top face
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,
        0.0, 1.0, 0.0,

        // Bottom face
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,
        0.0, -1.0, 0.0,

        // Right face
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,
        1.0, 0.0, 0.0,

        // Left face
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
        -1.0, 0.0, 0.0,
    ]);
    const cubeColor = new Float32Array([
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,

        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,

        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,

        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,

        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
        0.2, 0.6, 0.9, 1.0,
    ]);
    const cubePosVbo = createVbo(vertices);
    const cubeNormalVbo = createVbo(normals);
    const cubeColorVbo = createVbo(cubeColor);
    const cubeVertexAttrib: VertsAttrib = {
        Position: {
            Location: gl.getAttribLocation(Program, 'vertexPosition'),
            VBO: cubePosVbo,
            AttrSize: VERTEX_SIZE
        },
        Color: {
            Location: gl.getAttribLocation(Program, 'vertexColor'),
            VBO: cubeColorVbo,
            AttrSize: COLOR_SIZE
        },

        Normal: {
            Location: gl.getAttribLocation(Program, 'vertexNormal'),
            VBO: cubeNormalVbo,
            AttrSize: NORMAL_SIZE
        }

    }
    //gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    const u_time_loc = gl.getUniformLocation(Program, 'u_time');

    const axisLoc = gl.getUniformLocation(Program, 'axis');
    const angleLoc = gl.getUniformLocation(Program, 'angle');
    const offsetLoc = gl.getUniformLocation(Program, 'offset');
    gl.uniform3f(axisLoc, Params.axis.x, Params.axis.y, Params.axis.z);
    gl.uniform3f(offsetLoc, Params.offset.x, Params.offset.y, Params.offset.z);
    gl.uniform1f(angleLoc, Params.angle);
    const render = (ms_since_page_loaded) => {

        gl.useProgram(Program);

        gl.uniform1f(u_time_loc, ms_since_page_loaded * 0.001 * Params.speed);
        setVertexAttrib(cubeVertexAttrib);
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
        gl.drawElements(gl.TRIANGLES, 36, gl.UNSIGNED_SHORT, 0);

        requestAnimationFrame(render);
    };
    render(0);

}

window.onload = main;