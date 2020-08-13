const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    output: {
        filename: './dist/bundle.js',
        publicPath: '/'
    },
    entry: './src/index.jsx',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }, {
                test: /\.(png|jpe?g|gif)$/i,
                use: [
                    {
                        loader: 'file-loader',
                    },
                ],
            }
        ]
    },
    resolve: {
        modules: ['node_modules']
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer: {
        historyApiFallback: true
    },
    stats: 'errors-only'
};
