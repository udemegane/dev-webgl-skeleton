# ACG: Another Minimal WebGL Example
This sample is designed to help you build a project with separate shader code, Javascript or Typescript files.
The original skeleton can be found below.  
https://esslab.jp/~ess/ja/teaching/2021/acg/notes/03_webgl/

## Advanced WebGL skeleton 
This WebGL skeleton is designed to maximize the benefits of the editor and IDE, such as syntax highlighting, auto complete and so on, for efficient development. You can develop your project with separate programs like vert.glsl, frag.glsl, main.ts, and those separate files will be bundled into one html file `index.html` by webpack.  
**This sample uses npm, so if you have never used npm before, please find out about npm and set up your environment.**  
https://nodejs.org/en/  
https://www.npmjs.com  


---
## Setup

Go to the repository root directory and initialize the project with the following command.

```
npm install
```

Pack the source code with the following command.

```
npm run build
```

You can also specify an entry script file and an output directory, as in the following command.

```
\\ dist-sample directory will be created, and bundle.js and index.html will be output there.
npm run build -- --entry ./test_entry/src/main.ts -o test_entry_output
```

You can change the meta-information in the generated html file webpack.config.js.
```
meta: [
    {
        viewport: 'width=device-width, initial-scale=1',
        name: 'author',
        content: 'NAME (STUDENT ID)'
    }
        ],
```
---
## Optional
You can use WebGL frameworks like three.js or babylon.js if you want. These can be installed with npm. Follow the official website for details.

*three.js*
 - 
 - https://threejs.org
 - https://threejs.org/docs/#manual/en/introduction/Installation

*babylon.js*
 -
 - https://www.babylonjs.com
 - https://doc.babylonjs.com/divingDeeper/developWithBjs/npmSupport
  


If you want to import shader files, such as when creating complex shaders, you can use the following system.

*glslify*
 - 
 - https://github.com/glslify/glslify