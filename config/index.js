// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')
var config = require('./env-config')
var env = process.env.NODE_ENV
var build_assets_path = env === 'prod' ? config[env].assetsPublicPath : '/'
module.exports = {
    build: {
        env: require('./prod.env'),
        index: path.resolve(__dirname, '../target/fcarunionfront/index.html'),
        assetsRoot: path.resolve(__dirname, '../target/fcarunionfront/'),
        assetsSubDirectory: 'static',
        assetsPublicPath: build_assets_path,
        productionSourceMap: env == "dev" ? true : false,
        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],
        siteConfig: config[env],
        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    },
    dev: {
        env: require('./dev.env'),
        port: 8081,
        autoOpenBrowser: false,
        assetsSubDirectory: '',
        assetsPublicPath: '/',
        devtool: 'cheap-module-eval-source-map',
        //assetsPublicPath: 'http://fcarwapfront.10101111.com/',
        siteConfig: {
            image_url: '/'
        },
        /* proxyTable: {
            "/api": {
                // target: 'https://fcarwappre.10101111.com',
                // target: 'http://127.0.0.1:8001/fcarwap/',
                target: 'http://fcarwaptest02.10101111.com',
                // target: 'http://fcarwap.10101111.com',
                // target: 'http://fcarunionpre.10101111.com', 
                // target: 'http://10.104.10.38:7001',
             	//target: 'http://fcarwaptest03.10101111.com',
                secure: false
            },
            "/crossApi": {
                target: 'http://h5pre.maimaiche.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/crossApi/': '/'
                }
            },
            "/pdfMedia": {
                target: 'http://udfstest02.10101111.com',
                changeOrigin: true,
                pathRewrite: {
                    '^/pdfMedia/': '/'
                }
            }
        }, */
        /*测试接口数据：http://fcarwap.10101111.com/api/getSalesInfo?data=%7B%7D*/
        proxyTable: {
             '/api': {
               target: 'http://fcarwap.10101111.com',
               changeOrigin: true,
               pathRewrite: {
                 '^/api/': '/api/'
               }
             }
        },
        // CSS Sourcemaps off by default because relative paths are "buggy"
        // with this option, according to the CSS-Loader README
        // (https://github.com/webpack/css-loader#sourcemaps)
        // In our experience, they generally work as expected,
        // just be aware of this issue when enabling this option.
        cssSourceMap: false
    }
}
