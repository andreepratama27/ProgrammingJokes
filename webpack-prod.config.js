const path = require('path')
const webpack = require('webpack')
const htmlWebpack = require('html-webpack-plugin')
const extractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: [
        path.resolve(__dirname, 'index.js')
    ],

    output: {
        path: __dirname + '/build',
        filename: 'bundle.js'
    },

    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
                query: {
                    plugins: ['transform-runtime'],
                    presets: ['react', 'env']
                }
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.scss$/,
                loader: extractTextPlugin.extract('css-loader!sass-loader')
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {}
                    }
                ]
            }
        ]
    },

    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify('production')
            }
        }),

        new webpack.ProvidePlugin({
            'React': 'react',
            'ReactDOM': 'react-dom'
        }),

        new extractTextPlugin('style.css'),

        new htmlWebpack({
            filename: 'index.html',
            template: path.resolve(__dirname, 'src/index.html'),
            inject: 'body' 
        }),

        new webpack.optimize.UglifyJsPlugin({
            minimize: true
        })
    ]
}