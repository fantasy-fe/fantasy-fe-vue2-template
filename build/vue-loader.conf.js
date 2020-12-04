var utils = require('./utils')
var config = require('../config')
var isProduction = process.env.NODE_ENV !== 'dev'

module.exports = {
  loaders: utils.cssLoaders({
    sourceMap: isProduction
      ? config.build.productionSourceMap
      : config.dev.cssSourceMap,
    extract: isProduction
  }),
  postcss: [require('autoprefixer')({
    browsers: ['last 9 versions']
  })]
}
