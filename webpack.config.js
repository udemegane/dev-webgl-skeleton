const HtmlWebpackPlugin = require("html-webpack-plugin");
const { type } = require("os");
const path = require('path')

module.exports = (env) => {
    return {
        mode: 'development',
            entry: (typeof env === "undefined")? './' + env.name + '/src/main.ts': './src/main.ts',
                output: {
            filename: 'bundle.js',
                path: path.resolve(__dirname, (typeof env === "undefined")? 'dist-' + env.name : 'dist')
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
                title: 'MyAppTitle',
                meta: [
                    { viewport: 'width=device-width, initial-scale=1' }
                ],
            })
        ]
    }
};