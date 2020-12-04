import DialogComponent from './dialog.vue'
// https://github.com/TerryZ/v-dialogs
const DialogPlugin = {
  install (Vue) {
    const Dialog = Vue.component('mDialog', DialogComponent)
    const dlg = new Dialog()
    const vm = dlg.$mount()
    document.querySelector('body').appendChild(vm.$el)

    Vue.prototype.$dialog = {
      /**
       * alert 只做文字提示，只有确认按钮
       * @param {string} msg - 提示文字
       * @param {array} params.callback - 0 => 确认按钮回调 1 => 取消按钮回调
       * @param {array} params.btns - 按钮文字 0 => 确认 1 => 取消
       */
      alert (msg, params = {}) {
        if (!msg) return
        return dlg.alert(msg, params)
      },
      /**
       * modal 文字提示，有确认和取消两按钮
       * @param {string} title - 提示标题
       * @param {string} msg - 提示文字
       * @param {boolean} input - 是否显示输入框
       * @param {array} params.callback - 0 => 确认按钮回调 1 => 取消按钮回调
       * @param {array} params.btns - 按钮文字 0 => 确认 1 => 取消
       */
      modal (title = '提示', msg, input, params = {}) {
        if (!msg) return
        return dlg.modal(title, msg, input, params)
      },
      /**
       * 吐司提示
       * @param {string} msg - 提示文字
       * @param {object} params - 配置信息
       * @param {number} params.delay - 多少秒后关闭, 默认 3s, 如果为 0 , 则不关闭
       * @param {function} params.callback - 关闭时执行的回调
       * @param {string} params.transition - transition 组件使用的动画效果
       */
      toast (msg, params = {}) {
        if (!msg) return
        return dlg.toast(msg, params)
      },
      /**
       * snack 底部弹窗提示
       * @param {string} msg - 提示文字
       * @param {object} params - 配置信息
       * @param {number} params.delay - 多少秒后关闭，默认 3s，如果为 0，则不关闭
       * @param {function} params.callback - 关闭时执行的回调
       */
      snack (msg, params = {}) {
        if (!msg) return
        return dlg.snack(msg, params)
      },
      /**
       * @param {string} msg - 提示文字
       * @param {array} items.list - 选项列表
       * @param {function} items.callback - 选项列表点击回调
       * @param {array} params.callback - 0 => 确认按钮回调 1 => 取消按钮回调
       * @param {array} params.btns - 按钮文字 0 => 确认 1 => 取消
       */
      action (msg = '', items = {}, params = {}) {
        if (!msg && !items) return
        return dlg.action(msg, items, params)
      },

      popup (msg = '', items = {}) {
        if (!msg && !items) return
        return dlg.popup(msg, items)
      }
    }
  }
}

export default DialogPlugin
