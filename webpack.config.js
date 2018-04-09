const webpack = require('webpack');
const path = require('path');

module.exports = options => ({
	context: path.resolve(__dirname, 'src'),
	entry: [
		'./app.js',
		'./map.js'
	],
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'bundle.js'
	}
});
