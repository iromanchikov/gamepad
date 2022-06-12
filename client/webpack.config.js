const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    entry: './assets/source/js/index',
    output: {
        filename: 'bundle.[contenthash].min.js',
        path: path.resolve(__dirname + '/assets/build')
    },
    mode: 'development',
    plugins: [
        new HTMLWebpackPlugin({
            template: path.resolve(__dirname + '/assets/source/index.html'),
            filename: path.resolve(__dirname + '/index.html'),
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({ filename: 'bundle.[contenthash].min.css' })
    ],
    module: {
        rules: [{
            test: /\.css$/i,
            use: [
                MiniCssExtractPlugin.loader,
                {
                    loader: "css-loader",
                    options: {
                        sourceMap: true,
                        importLoaders: 1
                    }
                },
                {
                    loader: "postcss-loader",
                    options: {
                        sourceMap: true,
                    }
                },
            ],
        }]
    },
    optimization: {
        minimizer: [
            new CssMinimizerPlugin(),
        ],
        minimize: true,
    },
};