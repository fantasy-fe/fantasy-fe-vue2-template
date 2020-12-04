import ENV from './env'

// 苹果系统需要初始化安装才能注册事件
const setup = (callback) => {
  if (window.WebViewJavascriptBridge) { return callback(window.WebViewJavascriptBridge) }
  if (window.WVJBCallbacks) { return window.WVJBCallbacks.push(callback) }
  window.WVJBCallbacks = [callback]
  var WVJBIframe = document.createElement('iframe')
  WVJBIframe.style.display = 'none'
  WVJBIframe.src = 'https://__bridge_loaded__'
  document.documentElement.appendChild(WVJBIframe)
  setTimeout(function () { document.documentElement.removeChild(WVJBIframe) }, 0)
}

class MMCJSBridge {
  /**
   * JS 触发 Native
   * @param {object} params 配置参数
   * @param {string} params.handlerName - 注册的名称, 默认为 MMCJSCallNative
   * @param {string} params.protocol - 协议名称, 通常当 handlerName === MMCJSCallNative 时使用此参数来分发内容
   * @param {string} params.parameters - 给 Native 的参数
   * @return {promise} 返回一个 Promise
   */
  static jsCallNative (params = {}) {
    let handlerName = 'MMCJSCallNative'
    if (params.handlerName) {
      handlerName = params.handlerName
    }
    try {
      return new Promise((resolve, reject) => {
        if (ENV.isIOS) {
          setup((bridge) => {
            bridge.callHandler(handlerName, {
              protocol: params.protocol,
              parameters: params.parameters
            }, (res) => {
              resolve(JSON.parse(res))
            })
          })
        } else if (window.WebViewJavascriptBridge) {
          window.WebViewJavascriptBridge.callHandler(handlerName, {
            protocol: params.protocol,
            parameters: params.parameters
          }, (res) => {
            resolve(JSON.parse(res))
          })
        } else {
          window.document.addEventListener('WebViewJavascriptBridgeReady', () => {
            window.WebViewJavascriptBridge.callHandler(handlerName, {
              protocol: params.protocol,
              parameters: params.parameters
            }, (res) => {
              resolve(JSON.parse(res))
            })
          }, false)
        }
      })
    } catch (err) {
      console.log(err)
    }
  }

  static nativeCallJs (handlerName = 'MMCNativeCallJS') {
    try {
      if (ENV.isIOS) {
        setup((bridge) => {
          bridge.registerHandler(handlerName, (data, responseCallback) => {
            responseCallback(data)
          })
        })
      } else if (window.WebViewJavascriptBridge) {
        window.WebViewJavascriptBridge.registerHandler(handlerName, (data, responseCallback) => {
          responseCallback(data)
        })
      } else {
        window.document.addEventListener('WebViewJavascriptBridgeReady', () => {
          window.WebViewJavascriptBridge.registerHandler(handlerName, (data, responseCallback) => {
            responseCallback(data)
          })
        }, false)
      }
    } catch (err) {
      console.log(err)
    }
  }
}

export default MMCJSBridge
