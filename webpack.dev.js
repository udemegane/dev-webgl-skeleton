const HtmlWebpackPlugin = require("html-webpack-plugin");
const { merge } = require('webpack-merge');
const common = require('./webpack.common');
const path = require('path')
const fs = require("fs");
const appDirectory = fs.realpathSync(process.cwd());

module.exports = merge(common, {
    mode: 'development',
    devServer: {
        host: "0.0.0.0",
        port: 8081,
        static: path.resolve(appDirectory, 'dist'),
        hot: true,
        devMiddleware: {
            publicPath: 'auto',
        }
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ACG Homework',
            meta: [
                {
                    viewport: 'width=device-width, initial-scale=1',
                }
            ],
            minify: false,
        }),
    ]
})