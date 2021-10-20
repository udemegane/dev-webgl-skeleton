# ACG: Another Minimal WebGL Example
This sample is designed to help you build a project with separate shader code, Javascript or Typescript files.
The original skeleton can be found below.
https://esslab.jp/~ess/ja/teaching/2021/acg/notes/03_webgl/

## Advanced WebGL skeleton 
This WebGL skeleton is designed to maximize the benefits of the editor and IDE, such as syntax highlighting, auto complete and so on, for efficient development. You can develop your project with separate programs like vert.glsl, frag.glsl, main.ts, and those separate files will be bundled into one html file `index.html` by webpack.
This sample uses node.js, so if you have never used node.js before, I suggest you do some research first.


Go to the project root directory and initialize the project with the following command.

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
npm run build -- --entry ./sample/src/main.ts -o dist-sample
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