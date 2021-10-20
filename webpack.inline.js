const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const path = require('path')
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = (env) => {
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: path.resolve(appDirectory, 'src/main.ts'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(appDirectory, 'dist'),
            clean: true,
            publicPath: 'auto',
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
                    test: /.glsl$/,
                    use: 'ts-shader-loader',
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
        plugins: [
            new HtmlWebpackPlugin({
                title: 'ACG Homework',
                meta: [
                    {
                        viewport: 'width=device-width, initial-scale=1',
                        name: 'author',
                        content: 'NAME (STUDENT ID)'
                    }
                ],
                inlineSource: '.(glsl|ts|js|css)$',
                minify: false,
            }),
            new HtmlInlineScriptPlugin()
        ]
    }
};