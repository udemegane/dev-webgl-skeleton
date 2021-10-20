const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlInlineScriptPlugin = require('html-inline-script-webpack-plugin');
const path = require('path')

module.exports = () => {
    return {
        mode: 'development',
        devtool: 'inline-source-map',
        entry: './src/main.ts',
        output: {
            filename: 'bundle.js',
            path: path.resolve(__dirname, 'dist')
        },
        module: {
            rules: [
                {
                    test: /\.ts$/,
                    use: 'ts-loader'
                },
                {
                    test: /.glsl$/,
                    use: 'ts-shader-loader'
                }
            ]
        },
        resolve: {
            extensions: [
                '.ts'
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