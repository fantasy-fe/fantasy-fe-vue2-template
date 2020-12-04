import Vue from 'vue'
import axios from 'axios'
import Qs from 'qs'
import storage from './storage'
import DomLoading from '@/components/common/loading/domLoading.js'

// post请求头
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
axios.defaults.headers.post['apiGroupCode'] = 'NewRetailApplet'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  console.info('axios.interceptors.response ' + response)
  // 对响应数据做点什么
  const status = response.data.status
  if (typeof response.data === 'object' && /[5]/.test(`${status}`)) {
    Vue.prototype.$alert({
      type: 'confirm',
      content: `登录超时，请重新登录`,
      callback: () => {
        storage.removeCookies('fcarwap-user-id')
        self.gotoLogin()
      }
    })
  }

  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

var instance = axios.create({
  baseURL: '',
  timeout: 1000,
  headers: {'X-Custom-Header': ''}
})

export default {
  httploading: DomLoading(),
  crossApi (uri, params, opts) {
    if (!uri || (typeof uri !== 'string')) return false
    const conf = {
      cid: '950300'
    }
    let data = params ? Object.assign({}, conf, params) : conf
    let config = {}
    config.data = Qs.stringify({
      data: JSON.stringify(data)
    })
    config.url = '/crossApi' + uri

    return this.postData(config)
  },
  api (uri, params, opts) {
    if (!uri || (typeof uri !== 'string')) return false
    const conf = {
      cid: '950300'
    }
    let data = params ? Object.assign({}, conf, params) : conf
    let config = {}
    config.data = Qs.stringify({
      data: JSON.stringify(data)
    })
    config.url = '/api/gw?uri=' + uri
    config.showErrorMsg = true
    if (opts && opts.hasOwnProperty('showErrorMsg')) {
      config.showErrorMsg = opts.showErrorMsg
    }

    return this.postData(config)
  },

  postData (config) {
    const newConfig = Object.assign(
      {
        method: 'post', // default
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000
      },
      config
    )

    // this.httploading.show()
    const request = instance.request(newConfig)
    const self = this
    return new Promise((resolve, reject) => {
      request.then(async response => {
        // this.httploading.hide()
        // console.info(Vue.prototype.$loading);
        const result = response.data
        if (result.status === 0) { // 此处处理不同状态逻辑 例如 ajax 的登录拦截
          resolve(response.data)
        } else if (result.status === 1) { // 统一错误提示
          if (newConfig.showErrorMsg) {
            Vue.prototype.$dialog.toast(result.msg)
          }
          resolve(response.data)
        } else if (result.status === 5) {
          self.gotoLogin()
        } else {
          resolve(response.data)
        }
      }).catch((err) => {
        // this.httploading.hide()
        Vue.prototype.$loading.hide()
        Vue.prototype.$dialog.toast('服务请求失败, 请稍后再试!')
        console.info('catch ', err)
        // reject(err)
      })
    })
  },
  mockApi (uri, params) {
    if (!uri || (typeof uri !== 'string')) return false
    const data = params || {}
    let config = {}
    config.data = Qs.stringify({
      data: JSON.stringify(data)
    })
    config.url = 'http://10.104.10.38:7001' + uri

    return this.getMockData(config)
  },
  getMockData (config) {
    const newConfig = Object.assign(
      {
        method: 'get', // default
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000
      },
      config
    )
    const request = instance.request(newConfig)
    const self = this
    return new Promise((resolve, reject) => {
      request.then(async response => {
        const result = response.data
        if (result.status === 'SUCCESS') { // 此处处理不同状态逻辑 例如 ajax 的登录拦截
          resolve(response.data)
        } else if (result.status === 5) {
          self.gotoLogin()
        } else {
          reject(response.data)
        }
      }).catch((err) => {
        reject(err)
      })
    })
  },

  post (url, params = {}, options = {}) {
    const data = params || {}
    let config = {}
    config.data = Qs.stringify({
      data: JSON.stringify(data)
    })
    config.url = url
    const newConfig = Object.assign(
      {
        method: 'post', // default
        responseType: 'json',
        responseEncoding: 'utf8',
        timeout: 50000
      },
      config
    )
    const request = instance.request(newConfig)
    const me = this
    return new Promise((resolve, reject) => {
      request.then((response) => {
        me.success(url, response, resolve, reject)
      }).catch(err => {
        // console.log(error);
        reject(err)
      })
    })
  },

  success (url, response, resolve, reject) {
    if (response.status === 200) {
      let data = response.data
      resolve(data)
    } else {
      reject && reject(response)
    }
  },

  gotoLogin (redirectURL) {
    let router = window.$router
    router.replace({
      name: 'login',
      query: {
        redirectURL: redirectURL
      }
    })
  }
}
