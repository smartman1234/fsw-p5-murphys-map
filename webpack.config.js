const webpack = require('webpack');
const path = require('path');

const config = {
	context: path.resolve(__dirname, 'src'),
	entry: {
		main: './app.js'
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader']
			}
		]
	}
};

module.exports = config;