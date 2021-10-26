# ACG: Another Minimal WebGL Example
This sample is designed to help you build a project with separate shader code, Javascript or Typescript files.
The original skeleton can be found below.  
https://esslab.jp/~ess/ja/teaching/2021/acg/notes/03_webgl/

## Advanced WebGL skeleton 
This WebGL skeleton is designed to maximize the benefits of the Editor and IDE (e.g. VSCode, Intellij IDEA), such as syntax highlighting, auto complete and so on, for efficient development. You can develop your project with separate programs like vert.glsl, frag.glsl, main.ts, and those separate files will be bundled into one html file `index.html` by webpack.  
**This sample uses npm, so if you have never used npm before, please find out about npm and set up your environment.**  
https://nodejs.org/en/  
https://www.npmjs.com  


---
## Setup
### Clone this repository

```
git clone https://github.com/udemegane/dev-webgl-skeleton.git
```

*NOTE: Advanced samples are in preparation.*  

If you are using advanced samples, please clone them with the recursive option as follows
```
git clone --recursive https://github.com/udemegane/dev-webgl-skeleton.git
```
If you have already cloned the repository and later need the advanced sample, you can modify the repository as follows
```
git submodule update --init --recursive
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
The local server will default to port 8081 and can be accessed at http://localhost:8081.
```
npm run build
npm run start
```
Also, you are free to change the source and output programs as you see fit. For example, if you specify test_entry/src, it will look like this
```
npm run build -- --entry ./test_entry/src/main.ts -o test_entry_output
npm run start -- --entry ./test_entry/src/main.ts -o test_entry_output
```
On the local server by webpack-dev-server, bundle files are placed in memory, so it will **do hot reload for changes** in the source program. For example, when you make any change to frag.glsl, **it will be reflected in real time on localhost:8081.**
This makes development more efficient. Especially if you are using Vim.  
You can shut down the server to press Ctrl+C.  

If you want to change the server port, please change webpack.config.js and package.json.

```package.json
  "scripts": {
    "build": "webpack --config webpack.dev.js",
    "start": "webpack-dev-server --port 8081 --config webpack.dev.js",
    "pack": "webpack --config webpack.inline.js"
  },

```

```webpack.dev.js
        devServer: {
            host: "0.0.0.0",
            port: 8081,
            static: path.resolve(appDirectory, 'dist'),
            hot: true,
            devMiddleware: {
                publicPath: 'auto',
            }
        },
```

### Import and use multiple shader files.
In this template, glslify is enabled, which allows you to load and use multiple .glsl files.  
In the glslify_sample directory, there is an example of a split shader from `https://www.shadertoy.com/view/3ltSW2`.   Separating the files in this way prevents the source code from getting bloated and also helps in development with more than one person.   


In order to use glslify, you need to prepare the following two things.   
 - To import the shaders, add a line like the following As in the sample.
```
#pragma glslify:FUNCTION_NAME=require(FILE_NAME)
```
 - To export the shaders, add the following line to the end of the file As in the sample.
```
#pragma glslify:export(FUNCTION_NAME)
```


You can also use npm to import modules into your project. follow the official website for a detailed explanation of glslify.  
https://github.com/glslify/glslify

---
## Bundling source code for submit
To make all the files into a single html file `index.html` for submitting assignments, use the following command.  
*Note that the html file output by this cannot be hot-reloaded on the local server because all the javascript and shader codes are inline extracted.*


```
npm run pack
```

As in development, the source code and output destination can be set arbitrarily.

```
\\ test_entry_output directory will be created, and index.html will be output there.
npm run pack -- --entry ./test_entry/src/main.ts -o test_entry_output
```

You can change the meta-information in the generated html file webpack.inline.js.  
```webpack.inline.js
meta: [
    {
        viewport: 'width=device-width, initial-scale=1',
        name: 'author',
        content: 'NAME (STUDENT ID)'
    }
        ],
```


## Advanced Samples
Work In Progress.

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
  

---
**References**  
I referred to the following article.  
https://sbfl.net/blog/2016/09/04/webgl2-tutorial-basics/