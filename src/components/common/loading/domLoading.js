import Vue from 'vue'
import LoadingComponent from './loading.vue'
let $vm

const DomLoading = function () {
  if (!$vm) {
    const Loading = Vue.extend(LoadingComponent)
    $vm = new Loading({
      el: document.createElement('div')
    })
    document.querySelector('body').appendChild($vm.$el)
  }
  let loading = {
    show (con) {
      return $vm.show(con)
    },
    hide () {
      return $vm.close()
    }
  }
  return loading
}
export default DomLoading
