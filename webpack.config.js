const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require('path')

module.exports = () => {
    return {
        mode: 'development',
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
                title: 'MyAppTitle',
                meta: [
                    { viewport: 'width=device-width, initial-scale=1' }
                ],
            })
        ]
    }
};