const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    context: path.resolve(__dirname, 'app'),
    entry: './main.js',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: './dist'
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [{
                loader: "style-loader"
            }, {
                loader: "css-loader",
                options: {
                    modules: true, // 指定启用css modules
                    localIdentName: '[name]__[local]--[hash:base64:5]' // 指定css的类名格式
                }
            }]
        }]
    },
    plugins: [
        new webpack.BannerPlugin('版权所有，翻版必究'),
        new CleanWebpackPlugin(['dist']),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname + "/app/index.tmpl.html") //new 一个这个插件的实例，并传入相关的参数
        })
    ]
};