import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import modules from './store/index';
import { sync } from 'vuex-router-sync';
import { util, http } from './utils';
import moment from 'moment';
import Toast from './components/global/toast';
import Indicator from './components/global/indicator';
import MessageBox from './components/global/message-box';
import Dialog from './components/common/dialog';
import Loading from './components/common/loading';
import Validate from '@/utils/validate';
// import VueIosPickers from 'vue-ios-pickers/src/index'
import Picker from './components/vue-ios-pickers/picker';
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole()
// export default vConsole

Vue.component(Picker.name, Picker);
Vue.use(Vuex);
Vue.use(Dialog);
Vue.use(Loading);
// Vue.use(VueIosPickers)

Vue.$messagebox = Vue.prototype.$messagebox = MessageBox;
Vue.$toast = Vue.prototype.$toast = Toast;
Vue.$indicator = Vue.prototype.$indicator = Indicator;
Vue.$moment = Vue.prototype.$moment = moment;
Vue.$axios = Vue.prototype.$axios = http;
Vue.$validate = Vue.prototype.$validate = Validate;
Vue.prototype.getRef = function(ref) {
  return this.$refs[ref];
};

Vue.prototype.back = function(name, type = 0, query = {}) {
  if (name) {
    this.$router.replace({
      name: name,
      query: query
    });
  } else {
    if (this.$route.query.from) {
      this.$router.replace({
        path: this.$route.query.from
      });
    } else {
      window.$router.back();
    }
  }
};

// 无车车生活嵌入页面开发专用
Vue.prototype.isIphoneX = function() {
  return util.isIphoneX() && window.webkit;
};
Vue.prototype.notIphoneX = function() {
  return util.getPlatForm() === 'IOS' && !util.isIphoneX() && window.webkit;
};
Vue.prototype.isIphone = function() {
  return util.getPlatForm() === 'IOS';
};

const store = new Vuex.Store({
  strict: process.env.NODE_ENV !== 'prod',
  modules
});

router.beforeEach((to, from, next) => {
  // global router beforeEach
  if (to.meta) {
    if (to.meta.pageInfo && to.meta.pageInfo.title) {
      document.title = to.meta.pageInfo.title;
    }
    next();
    /* if (!authHelper.isLogin()) {
      next({
        name: 'login',
        query: {
          redirectURL: to.fullPath
        }
      })
    } else {
      next()
    } */
  }
  next();
});

router.afterEach((to, from, next) => {
  // global router afterEach
});

window.$router = router; // 暴露到全局
sync(store, router);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
