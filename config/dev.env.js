var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
	// NODE_ENV: '"test"',
    // NODE_ENV: '"test2"',
    // NODE_ENV: '"test3"',
    // NODE_ENV: '"pre"',
    NODE_ENV: '"development"',
    apiDomain: '/'
})
