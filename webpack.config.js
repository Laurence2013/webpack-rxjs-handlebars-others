const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
	mode: 'development',
	entry: {
		bundle: path.resolve(__dirname, 'src/index.js')
	},
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: '[name][contenthash].js',
		clean: true
	},
	devServer: {
		static: {
			directory: path.resolve(__dirname, 'dist')
		},
		port: 3000, open: true, hot: true, compress: true, historyApiFallback: true
	},
	resolve: {
		alias: {
			'rxjs': path.resolve(__dirname, 'node_modules/rxjs')
		}
	},
	module: {
		rules: [{test: /\.hbs$/, loader: 'handlebars-loader'}]
	},
	plugins: [
		new Dotenv(),
		new htmlWebpackPlugin({
			title: 'First project setup',
			filename: 'index.html',
			template: 'src/template.html'
		})
	]
}
