var path = require('path')
var utils = require('./utils')
var webpack = require('webpack')
var config = require('../config')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var CopyWebpackPlugin = require('copy-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')

// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})

module.exports = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: '#cheap-module-eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': config.dev.env,
      'process.siteConfig': JSON.stringify(config.dev.siteConfig),
      'API_DOMAIN': JSON.stringify(config.dev.apiDomain),
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
	  favicon: './favicon.ico'
    }),
	new HtmlWebpackPlugin({
		inject: false,
		filename: 'healthCheck.html',
		template: 'healthCheck.html'
  }),
  new HtmlWebpackPlugin({
    inject: false,
    filename: 'IDtS9uU9bx.txt',
    template: 'IDtS9uU9bx.txt'
      }),
      /* new CopyWebpackPlugin([{
        from: appimgpath,
        to: rootimgpath
      }
    ]), */
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../src/components/pdfRead/cmaps'),
      to: path.join(config.build.assetsRoot,'/static/cmaps')
    }
  ]),
    new FriendlyErrorsPlugin()
  ]
})
