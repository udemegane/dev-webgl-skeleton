import vertexShaderSource from './shader/vert.glsl'
import fragmentShaderSource from './shader/flag.glsl'

const cSize = {
    width: 400,
    height: 400,
} as const;
type cSize = typeof cSize[keyof typeof cSize];

const VERTEX_SIZE = 2; 
const COLOR_SIZE = 4;
const main = () => {
    const canvas = document.createElement('canvas');
    canvas.width = cSize.width;
    canvas.height = cSize.height;
    document.body.appendChild(canvas);

    const mayBeContext = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (mayBeContext === null) {
        console.warn('could not get context');
        return
    }
    const gl: WebGL2RenderingContext = mayBeContext;
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
    gl.useProgram(program);

    // Clear screen
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    /*
    2___3
    |\  |
    | \ |
    |__\|
    0   1
   */
    const vertexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
    const VERTEX_NUMS = 4;
    const vertices = new Float32Array([
        -1, -1,
        1, -1,
        -1, 1,
        1,  1
    ]);

    // create color variable
    const colorBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
    const colors = new Float32Array([
        1.0, 0.0, 0.0, 1.0,
        0.0, 1.0, 0.0, 1.0,
        0.0, 0.0, 1.0, 1.0,
        0.5, 0.5, 0.5, 1.0
    ]);


    // Get and set vertex attribute
    const vertexAttribLocation = gl.getAttribLocation(program, 'vertexPosition'); // get `in` variable in vertex shader
    gl.enableVertexAttribArray(vertexAttribLocation);
    gl.vertexAttribPointer(vertexAttribLocation, VERTEX_SIZE, gl.FLOAT, false, 0, 0);

    const colorAttribLocation = gl.getAttribLocation(program, 'color');
    gl.enableVertexAttribArray(colorAttribLocation);
    gl.vertexAttribPointer(colorAttribLocation, COLOR_SIZE, gl.FLOAT, false, 0, 0);

    // Transfer data
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.bufferData(gl.ARRAY_BUFFER, colors, gl.STATIC_DRAW);


    // Draw triangles
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, VERTEX_NUMS);

    gl.flush();
}

window.onload = main;