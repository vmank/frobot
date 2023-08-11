const path = require('path');
const { ProvidePlugin } = require('webpack');

module.exports = {
    entry: path.resolve(__dirname, 'src', 'index.js'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'bundle.js'
    },
    devServer: {
        contentBase: path.resolve(__dirname, '../build'),
    },
    plugins: [
        new ProvidePlugin({
            process: 'process/browser'
       })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    watch: true,
    resolve: {
        fallback: {
          "util": require.resolve("util/")
        }
    },
}