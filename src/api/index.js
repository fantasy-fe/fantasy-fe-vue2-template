import Vue from 'vue'
import { http } from '../utils'

export const $loading = () => {
  return Vue.prototype.$loading
}

export const execAPI = async (options, cb) => {
  let _showLoading = typeof options.showLoading === 'undefined' ? true : options.showLoading
  if (_showLoading) {
    $loading().show(options.loadingTips || '加载中')
  }

  const res = await http.api(options.uri, options.params, options.cusParams || {})
  if (_showLoading) {
    $loading().hide()
  }
  if (cb) {
    cb(res)
  } else {
    if (res && res.status === 0) {
      options.cb(res.re)
    } else {
      options.failCb(res.msg)
    }
  }
}
