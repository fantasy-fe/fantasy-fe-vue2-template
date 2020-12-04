import Vue from 'vue';
import Router from 'vue-router';
import login from '../pages/login/index.vue';
import RiskManage from '../pages/risk/index.vue';
import JsbridgeDemo from '../pages/demo/jsbridgeDemo/index.vue';
import commonDemo from '../pages/demo/commonDemo/index.vue';
import VueDemo from '../pages/demo/vuexDemo/index.vue';
import VueDemoDetail from '../pages/demo/vuexDemo/detail.vue';
import BankCardList from '../pages/risk/bankCard/bankCardList.vue';
import ChangeBankCard from '../pages/risk/bankCard/changeBankCard.vue';
import BankList from '../pages/risk/bankCard/bankList';
import PdfDemo from '../pages/demo/pdfDemo';
import BankListPage from '../components/common/bankList/bankList.vue';
import ThrottleDemo from '../pages/demo/throttleDemo';


Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Index',
      component: RiskManage,
      meta: {
        pageInfo: {
          title: '风控'
        }
      }
    },
    {
      path: '/login',
      name: 'Login',
      component: login,
      meta: {
        pageInfo: {
          title: '登录'
        }
      }
    },
    {
      path: '/risk',
      name: '风控',
      component: RiskManage,
      meta: {
        auth: 0,
        pageInfo: {
          title: '风控系统'
        }
      }
    },
    {
      path: '/bankCardList',
      name: 'BankCardList',
      component: BankCardList,
      meta: {
        pageInfo: {
          title: '还款银行卡'
        }
      }
    },
    // ChangeBankCard
    {
      path: '/updateBankCard',
      name: 'updateBankCard',
      component: ChangeBankCard,
      meta: {
        pageInfo: {
          title: '更换银行卡'
        }
      }
    },
    {
      path: '/bankList',
      name: 'bankList',
      component: BankList,
      meta: {
        pageInfo: {
          title: '支持的银行卡列表'
        }
      }
    },
    // 根据资金来源显示支持的银行卡列表
    {
      path: '/bankListPage',
      name: 'bankListPage',
      component: BankListPage,
      meta: {
        pageInfo: {
          title: '支持的银行卡列表'
        }
      }
    },
    
    {
      path: '/webankRisk',
      name: 'webankRisk',
      component: WebankRisk,
      meta: {
        pageInfo: {
          title: '补充信息'
        }
      }
    },
    {
      path: '/bridge',
      name: 'APP互调',
      component: JsbridgeDemo
    },
    {
      path: '/demo',
      name: '公共组件Demo',
      component: commonDemo
    },
    {
      path: '/vuedemo',
      name: 'demo',
      component: VueDemo,
      meta: {
        pageInfo: {
          title: 'vuex Demo'
        }
      }
    },
    {
      path: '/vuedemo/detail',
      name: 'vuedetail',
      component: VueDemoDetail
    },
    {
      path: '/pdfdemo',
      name: 'pdfdemo',
      component: PdfDemo
    },
    
    {
      path: '/throttleDemo',
      name: 'throttleDemo',
      component: ThrottleDemo
    }
  ]
});
