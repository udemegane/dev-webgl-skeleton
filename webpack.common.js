const path = require('path')
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = {
    entry: path.resolve(appDirectory, 'src/main.ts'),
    output: {
        filename: 'bundle.js',
        path: path.resolve(appDirectory, 'dist'),
        clean: true,
        publicPath: 'auto',
        hashFunction: "xxhash64",
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /.(glsl|vs|fs)$/,
                use: ['ts-shader-loader', 'glslify-loader'],
                exclude: /node_modules/,
            }
        ]
    },
    resolve: {
        extensions: [
            '.ts',
            '.tsx',
            '.js'
        ]
    },

};