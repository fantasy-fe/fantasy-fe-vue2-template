/**
 * Created by Gray on 2018/1/24.
 */

import Env from './env'
import JSBrige from './JsBridge'

/**
 * 核心调用协议封装 js call native
 * @param {String} protocol
 * @param {Object} parameters
 * @param {Function} callBack
 */
const jsCallNative = (protocol, parameters, callback) => {
  try {
    JSBrige.jsCallNative({
      protocol,
      parameters,
      callBack: (data) => {
        if (data) {
          data = JSBrige.handleData(data)
        }
        if (typeof callback === 'function') callback(data)
      }
    })
  } catch (e) {
    console.info(e)
    if (typeof (callback) === 'function') {
      callback()
    }
  }
}

const registerNativeCallJSHandler = (protocol, callBack) => {
  try {
    JSBrige.registerHandler({
      protocol,
      callBack
    })
  } catch (e) {
    console.info(e)
  }
}

const JSBridgeUtil = {
  /**
   * 读取设备信息
   * @returns {{Object}} {isUCar:Boolean,isIOS:Boolean,isAndroid:Boolean}
   */
  getAppEnv: () => {
    const appInfo = Env.getAppInfo()
    const osInfo = Env.getOSInfo()
    return {
      ...appInfo,
      ...osInfo
    }
  },
  /**
   * 读取设备code
   * @returns {Promise}
   * success: { 'status': { 'success': true, 'error': {}, }, 'data': { 'token': '11345687432', } }
   */
  getDeviceId: () => {
    return new Promise((resolve, reject) => {
      jsCallNative('deviceId', {}, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(data)
        }
      })
    })
  },
  /**
   * 开启相机，扫码二维码并解析
   * @returns {Promise}
   * success ：{ 'status': { 'success': true, 'error': {}, }, 'data': { 'qrcode': '11345687432', } }
   */
  getQRCode: () => {
    return new Promise((resolve, reject) => {
      jsCallNative('qrcode', {}, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(data)
        }
      })
    })
  },
  /**
   * 查看大图
   * @param parameters
   * {
        'images': '[//图片url路径全集
                    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg',
                    'http://ww1.sinaimg.cn/mw690/62aad664jw1f2nxvyo52qj20u01hcqeq.jpg']',
        'current':'1'//当前下标
    }
   * @returns {Promise}
   */
  gallery: (parameters) => {
    return new Promise((resolve, reject) => {
      jsCallNative('gallery', parameters, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('gallery error' + data))
        }
      })
    })
  },
  /**
   * 开启相册选择照片，带有裁剪及压缩能力
   * @param {Object} parameters { 'size': { 'width': 512, 'height': 512, 'radius': 0 }}
   * @returns {Promise}
   */
  openAlbum: (parameters) => {
    return new Promise((resolve, reject) => {
      jsCallNative('album', parameters, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('openAlbum error'))
        }
      })
    })
  },
  /**
   * 开启相机，带有裁剪及压缩能力
   * @param {Object} parameters { 'size': { 'width': 512, 'height': 512, 'radius': 0 }}
   * @returns {Promise}
   */
  openCamera: (parameters) => {
    return new Promise((resolve, reject) => {
      jsCallNative('camera', parameters, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('openCamera'))
        }
      })
    })
  },
  /**
   *  监听IOS 设备ID 变动 push消息
   * @param callBackFn 回调函数
   */
  listenPushDeviceId: (callBackFn) => {
    registerNativeCallJSHandler('pushDeviceId', (data) => {
      if (data && typeof callBackFn === 'function') {
        callBackFn(data)
        return JSBrige.succData({})
      }
    })
  },
  /**
   *  监听push消息
   * @param callBackFn 回调函数
   */
  listenPushMsg: (callBackFn) => {
    registerNativeCallJSHandler('push', (data) => {
      if (data && typeof callBackFn === 'function') {
        callBackFn(data)
        return JSBrige.succData({})
      }
    })
  },
  /**
   *  监听push消息
   * @param callBackFn 回调函数
   */
  listenBackMsg: (callBackFn) => {
    registerNativeCallJSHandler('back', (data) => {
      if (data && typeof callBackFn === 'function') {
        callBackFn(data)
        return JSBrige.succData({})
      }
    })
  },
  /**
   * 刷新页面
   * @returns {Promise}
   * success ：{ 'status': { 'success': true, 'error': {}, }, 'data': { } }
   */
  reload: () => {
    return new Promise((resolve, reject) => {
      jsCallNative('reload', {}, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('reload error'))
        }
      })
    })
  },
  /**
   * APP 退出
   * @returns {Promise}
   * success ：{ 'status': { 'success': true, 'error': {}, }, 'data': { } }
   */
  exit: () => {
    return new Promise((resolve, reject) => {
      jsCallNative('appexit', {}, (data) => {
        if (data) {
          resolve(data)
        } else {
          reject(new Error('exit error'))
        }
      })
    })
  }
}

export default JSBridgeUtil
