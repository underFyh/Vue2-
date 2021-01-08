const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// 注意
module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
    devtool: 'eval‐source‐map',
    resolve: {
        modules: [ path.resolve(__dirname, 'source'), path.resolve(__dirname, 'node_modules') ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'public/index.html')
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        host: 'localhost',
        port: 3300,
        hot: true,
        open: true,
        inline: true,
    }
}
