import vertexShaderSource from './shader/verts.glsl';
import fragmentShaderSource from './shader/flag.glsl';
import { Pane } from 'tweakpane';

const cSize = {
  width: 600,
  height: 600,
} as const;

type cSize = typeof cSize[keyof typeof cSize];

export const assertIsDefined: <T>(val: T) => asserts val is NonNullable<T> = <T>(
  val: T
): asserts val is NonNullable<T> => {
  if (val === undefined || val === null) {
    throw new Error(`Expected 'val' to be defined, but received ${val}`);
  }
};

type _AttribHelper = {
  Location: number;
  VBO: WebGLBuffer;
  AttrSize: number;
};
interface VertsAttrib {
  Position: _AttribHelper;
  Color: _AttribHelper;
}
const VERTEX_SIZE = 2;
const COLOR_SIZE = 4;

const setParamUI = () => {
  const Params = {
    speed: 1.0,
  };
  const pane = new Pane();
  pane.addInput(Params, 'speed', { min: -10.0, max: 10.0 });
  return Params;
};

const initialize = (w: number, h: number): WebGL2RenderingContext => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  document.body.appendChild(canvas);

  const mayBeContext = canvas.getContext('webgl2') as WebGL2RenderingContext;
  assertIsDefined(mayBeContext);
  const gl: WebGL2RenderingContext = mayBeContext;
  // Clear screen
  gl.clearColor(0, 0, 0, 0.5);
  //gl.clearDepth(1.0);
  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
  return gl;
};

const getShaderProgram = (
  gl: WebGL2RenderingContext,
  vertexShaderSource: string,
  fragmentShaderSource: string
): WebGLProgram => {
  const vertexShader = gl.createShader(gl.VERTEX_SHADER);
  assertIsDefined(vertexShader);
  gl.shaderSource(vertexShader, vertexShaderSource);
  gl.compileShader(vertexShader);

  if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(vertexShader);
    assertIsDefined(info);
    throw new Error(info);
  }

  const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
  assertIsDefined(fragmentShader);
  gl.shaderSource(fragmentShader, fragmentShaderSource);
  gl.compileShader(fragmentShader);

  if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
    const info = gl.getShaderInfoLog(fragmentShader);
    assertIsDefined(info);
    throw new Error(info);
  }
  const program = gl.createProgram();
  assertIsDefined(program);
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);

  const linkStatus = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (!linkStatus) {
    const info = gl.getProgramInfoLog(program);
    assertIsDefined(info);
    throw new Error(info);
  }
  return program;
};

const main = () => {
  const gl: WebGL2RenderingContext = initialize(cSize.width, cSize.height);
  const program = getShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
  gl.useProgram(program);

  const createVbo = (vertices: Float32Array) => {
    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    return vbo;
  };

  const setVertexAttrib = (attrib: VertsAttrib) => {
    (Object.keys(attrib) as (keyof VertsAttrib)[]).map((key) => {
      gl.bindBuffer(gl.ARRAY_BUFFER, attrib[key].VBO);
      gl.enableVertexAttribArray(attrib[key].Location);
      gl.vertexAttribPointer(attrib[key].Location, attrib[key].AttrSize, gl.FLOAT, false, 0, 0);

      gl.bindBuffer(gl.ARRAY_BUFFER, null);
    });
  };
  const mainVerts = new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]);
  const ramColor = new Float32Array([
    1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0,
  ]);
  const posVbo = createVbo(mainVerts);
  assertIsDefined(posVbo);
  const colorVbo = createVbo(ramColor);
  assertIsDefined(colorVbo);
  const ramVertexAttrib: VertsAttrib = {
    Position: {
      Location: gl.getAttribLocation(program, 'vertexPosition'),
      VBO: posVbo,
      AttrSize: VERTEX_SIZE,
    },
    Color: {
      Location: gl.getAttribLocation(program, 'vertexColor'),
      VBO: colorVbo,
      AttrSize: COLOR_SIZE,
    },
  };

  gl.enable(gl.CULL_FACE);
  gl.enable(gl.DEPTH_TEST);
  gl.depthFunc(gl.LEQUAL);
  const u_time_loc = gl.getUniformLocation(program, 'u_time');

  const Params = setParamUI();
  const render = (ms_since_page_loaded: number) => {
    gl.useProgram(program);
    gl.uniform1f(u_time_loc, ms_since_page_loaded * 0.01 * Params.speed);
    setVertexAttrib(ramVertexAttrib);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    gl.flush();
    requestAnimationFrame(render);
  };
  render(0);
};

window.onload = main;
