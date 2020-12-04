/**
 * Created by shuaibin.li on 2019-02-13
 */
module.exports = {
    dev: {

    },
    test: {
        index: 'http://fcaruniontest.10101111.com',
        image_url: '/static/'
    },
    test2: {
        index: 'http://fcaruniontest02.10101111.com',
        image_url: '/static/'
    },
    test3: {
        index: 'http://fcaruniontest03.10101111.com',
        image_url: '/static/'
    },
    pre: {
        index: 'http://fcarunionpre.10101111.com',
        image_url: '/static/'
    },
    prod: {
        index: 'https://union.carbank.cn',
        assetsPublicPath: 'https://fcarunionstatic.10101111cdn.com/',
        image_url: 'https://fcarunionstatic.10101111cdn.com/static/'
    }
}
