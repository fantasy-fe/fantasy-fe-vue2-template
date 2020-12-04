import storage from './storage'

export default {
  // ENVMAP: { "production": "product" },
  isLogin: function () {
    var env = process.env.NODE_ENV,
      userId = storage.getCookies('fcarwap-user-id-' + env)
    console.log('env:' + env)
    return userId
  },
  /**
     * [validBadnessUser 验证是否不良用户]
     * @return {[type]} [description]
     */
  validBadnessUser: function () {
    // var self = this
    return new Promise((resolve, reject) => {
      if (this.isLogin()) { // 登录了验证是否不良用户
        this.$axios.api('api/loan/isBadness.do', {}).then((data) => {
          resolve(data)
        }, (data) => {
          reject(data)
        })
      } else {
        // 未登录，默认为非不良用户
        resolve({
          status: 0,
          re: {
            creditStatus: 0
          }
        })
      }
    })
  },
  /**
     * [checkIsLogin 检查用户登录,并跳转]
     * @param  {[type]} router [description]
     * @param  {[type]} path   [description]
     * @return {[type]}        [description]
     */
  checkIsLogin: function (router, pathName, q) {
    var redirectURL = pathName || '',
      query = q || {}
    if (!this.isLogin()) {
      if (!query.redirectURL && redirectURL.indexOf('redirectURL') < 0) {
        query.redirectURL = redirectURL
      }
      router.push({
        name: 'login',
        query: query
      })
    } else {
      router.push({
        path: pathName,
        query: query
      })
    }
  },
  badnessProcess: function (router) {
    var me = this
    this.$messagebox.alert('您的账号已经冻结', {
      callback: function () {
        me.logOut(router)
      }
    })
  }
}
