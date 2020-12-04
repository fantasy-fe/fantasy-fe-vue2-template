import LoadingComponent from './loading.vue'
let $vm

const LoadingPlugin = {
  install (Vue, options = {}) {
    if (!$vm) {
      const Loading = Vue.extend(LoadingComponent)
      $vm = new Loading({
        el: document.createElement('div')
      })
      document.querySelector(options.container || 'body').appendChild($vm.$el)
    }
    let loading = {
      show (con) {
        return $vm.show(con)
      },
      hide () {
        return $vm.close()
      }
    }

    Vue.prototype.$loading = loading

    // if (!Vue.$loading) {
    //   Vue.$loading = loading
    // }

    Vue.mixin({
      created () {
        this.$loading = Vue.prototype.$loading
      }
    })
  }
}

export default LoadingPlugin
