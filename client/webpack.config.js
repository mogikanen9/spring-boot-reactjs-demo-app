var webpack = require("webpack");

const path = require('path');

module.exports = {
   entry: "./src/index.js",
   output: {
		path: path.resolve(__dirname, 'dist/assets'),
		filename: "bundle.min.js",
		publicPath: "assets"
	},
    devServer: {
        inline: true,
        contentBase: './dist',
        port: 3000
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules)/,
                loader: 'babel-loader',
                options: {
					presets: ['es2015', 'react', 'stage-0']
				}
            }
        ]
    }
}