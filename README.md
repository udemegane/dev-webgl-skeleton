# ACG: Another Minimal WebGL Example
This sample is designed to help you build a project with separate shader code, Javascript or Typescript files.
The original skeleton can be found below.  
https://esslab.jp/~ess/ja/teaching/2021/acg/notes/03_webgl/

## Advanced WebGL skeleton 
This WebGL skeleton is to get benefits of the Editor or IDE (e.g. VSCode, Intellij IDEA), such as syntax highlighting, auto complete and so on, for efficient development. You can develop your project with separate programs like vert.glsl, frag.glsl, main.ts, and those separate files will be bundled into one html file `index.html` by vite.  
**This sample uses nodejs, so if you have never used nodejs before, please find out about nodejs and set up your environment.**  
https://nodejs.org/en/  
https://www.npmjs.com  


---
## Setup
### Clone this repository

```
git clone https://github.com/udemegane/dev-webgl-skeleton.git
```


### Package install
Go to the repository root directory and initialize the project with the following command.

```
npm install
```

---
## Development
### Scripts for development
You can build the project and also start the local server with the following command.
The local server will default to port 5173 and can be accessed at http://localhost:5173.
```
npm run dev
```
or
```
npx vite dev
```
Also, you can change the source and output programs as you see fit. For example, if you use a different config file for the directory "./another_sample".
Chekc the contents of "vite.config2.js".
```
npx vite --config vite.config2.js
```

---
## Bundling source code for submit
To make all the files into a single html file `index.html` for submitting assignments, use the following command.  
A "dist" will be created in the directory containing index.html.
*Note that the html file output by this cannot be hot-reloaded on the local server because all the javascript and shader codes are inline extracted.*


```
npx vite build
```
As in the previous example, you can choose a config file.
```
npx vite build --config vite.config2.js
```

## Validate your shader
Writing glsl shader code without developer tools will probably create a large number of bugs and cause you a lot of pain.
It is strongly recommended that the following glsl developer tools be installed in your environment.
- https://www.khronos.org/opengles/sdk/tools/Reference-Compiler/
- https://github.com/KhronosGroup/glslang

If you are using vscode, the combination of the following extensions and the development tools above will make you very comfortable.

- https://marketplace.visualstudio.com/items?itemName=mrjjot.vscode-glsl-linter
- https://marketplace.visualstudio.com/items?itemName=dtoplak.vscode-glsllint