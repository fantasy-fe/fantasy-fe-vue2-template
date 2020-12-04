var path = require('path')
var utils = require('./utils')
var config = require('../config')
var vueLoaderConfig = require('./vue-loader.conf')
var cwd = process.cwd();
function resolve(dir) {
	return path.join(__dirname, '..', dir)
}

module.exports = {
	entry: {
		app: ['babel-polyfill','./src/main.js']
	},
	output: {
		path: config.build.assetsRoot,
		filename: '[name].js',
		publicPath: process.env.NODE_ENV !== 'dev' ? config.build.assetsPublicPath : config.dev.assetsPublicPath
	},
	resolve: {
		extensions: ['.js', '.vue', '.json'],
		alias: {
			'vue$': 'vue/dist/vue.esm.js',
			'@': resolve('src'),
			'images': path.resolve(__dirname, '../src/images'),
			'docs': path.resolve(__dirname, '../src/docs'),
			'components': path.resolve(__dirname, '../src/components'),
			'base': path.resolve(__dirname, '../src/components/base'),
			'customer': path.resolve(__dirname, '../src/components/customer'),
			'utils': path.resolve(__dirname, '../src/utils'),
			'libs': path.resolve(__dirname, '../src/libs'),
			'var': path.resolve(__dirname, '../src/styles/variables.scss'),
			'api': path.resolve(__dirname, '../src/api'),
		}
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				loader: 'vue-loader',
				options: vueLoaderConfig
			},
			{
				test: /\.js$/,
				loader: 'babel-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.less$/,
				loader: 'less-loader',
				include: [resolve('src'), resolve('test')]
			},
			{
				test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 2048,
					name: utils.assetsPath('images/[name].[hash:7].[ext]')
				},
				exclude:  [path.join(cwd, 'src/images/app/')]
			},
			{
				test: /\.pdf$/,
				use: {
				  loader: 'file-loader',
				  options: {
					name: utils.assetsPath('docs/[name].[hash:7].[ext]')
				  }
				}
			},
			{
				test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
				loader: 'url-loader',
				options: {
					limit: 2048,
					name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
				}
			}]
	}
}
