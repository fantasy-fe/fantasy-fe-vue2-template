// https://github.com/michael-ciniawsky/postcss-load-config




module.exports = {
  plugins: [
    require('postcss-pxtorem')({
      rootValue: 32,
      propWhiteList: [],
      // selectorBlackList: [/^\.am-/],
    }),
    // require('postcss-flexbugs-fixes'),
    require('autoprefixer')({
      browsers: [
        '>1%',
        'last 6 versions',
        'Firefox ESR',
        'not ie < 9', // React doesn't support IE8 anyway
      ]
    }),
  ]
}