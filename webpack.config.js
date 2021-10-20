const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const path = require('path')
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = () => {
    return {
        mode: 'development',
        //devtool: 'inline-source-map',
        entry: path.resolve(appDirectory, 'src/main.ts'),
        output: {
            filename: 'bundle.js',
            path: path.resolve(appDirectory, 'dist'),
            clean: true,
            publicPath: '/',
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
        devServer: {
            host: "0.0.0.0",
            port: 8081,
            static: path.resolve(appDirectory, 'dist'),
            hot: true,
            devMiddleware: {
                publicPath: '/',
            }
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
                //inlineSource: '.(glsl|ts|js|css)$',
                minify: false,
            }),
            //new HtmlInlineScriptPlugin()
        ]
    }
};