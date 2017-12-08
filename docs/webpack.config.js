const path = require('path');
const merge = require('webpack-merge');

module.exports = merge(require('../webpack.base'), {
    context: __dirname,

    entry: './app.js',

    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'app.js',
        publicPath: '/build/',
    },

    resolve: {
        alias: {
            vue: 'vue/dist/vue.js',
        },
    },

    devServer: {
        contentBase: __dirname,
        //host: "192.168.0.106",
        port: 2000,
    },
});
