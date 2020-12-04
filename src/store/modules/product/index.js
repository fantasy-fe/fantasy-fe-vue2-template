import { http, util } from '../../../utils'
const state = {
  productInfo: null,
  loanInfo: {},
  storeList: [],
  riskRejectionLoanInfo: {},
  prodList: [],
  count: 0
}

const SET_PRODUCTINFO = 'SET_PRODUCTINFO'
const SET_PRODUCTLAONINFO = 'SET_PRODUCTLAONINFO'
const SET_STORELIST = 'SET_STORELIST'
const SET_RISKLOANINFO = 'SET_RISKLOANINFO'
const SET_PRODLIST = 'SET_PRODLIST'

const mutations = {
  [SET_PRODUCTINFO] (state, productInfo) {
    state.productInfo = productInfo
  },
  [SET_PRODUCTLAONINFO] (state, loanInfo) {
    state.loanInfo = loanInfo
  },
  [SET_STORELIST] (state, storeList) {
    state.storeList = storeList
  },
  [SET_RISKLOANINFO] (state, riskLoanInfo) {
    state.riskRejectionLoanInfo = riskLoanInfo
  },
  [SET_PRODLIST] (state, prodList) {
    console.info('mutations', prodList)
    state.prodList = prodList
  },
  'SET_ADDCOUNT' (state, num) {
    state.count += num
    console.info(state.count)
  }
}

const actions = {
  addCount ({commit}) {
    console.info('actions.addCount')
    commit('SET_ADDCOUNT', 1)
  },
  addAsyncAddCount ({ commit }) {
    setTimeout(() => {
      commit('SET_ADDCOUNT', 1)
    }, 1000)
  },

  /**
     * [setProductInfo 设置产品信息]
     * @param {[type]} options.commit   [description]
     * @param {[type]} options.dispatch [description]
     * @param {[type]} userInfo         [description]
     */
  setProductInfo ({ commit, dispatch }, productInfo) {
    commit(SET_PRODUCTINFO, productInfo)
  },
  setLoanInfo ({ commit, dispatch }, loanInfo) {
    commit(SET_PRODUCTLAONINFO, loanInfo)
  },
  setRiskLoanInfo ({ commit, dispatch }, riskLoanInfo) {
    commit(SET_RISKLOANINFO, riskLoanInfo)
  },
  setStoreList ({ commit, dispatch }, storeList) {
    commit(SET_STORELIST, storeList)
  },
  setProdList ({ commit, dispatch }, prodList) {
    commit(SET_PRODLIST, prodList)
  },
  queryStoreList ({ commit, dispatch }, cityInfo) {
    return new Promise((resolve, reject) => {
      if (!cityInfo || !cityInfo.id) {
        cityInfo = util.getStorage('global_city')
      }
      http.api('/api/basedata/carstore', {
        cityId: cityInfo.id.toString()
      }).then(data => {
        if (data) {
          if (!data.status) {
            if (data.re && data.re.length > 0) {
              commit(SET_STORELIST, data.re)
              resolve(data.re)
            } else {
              commit(SET_STORELIST, [])
              resolve([])
            }
          } else {
            commit(SET_STORELIST, [])
            resolve([])
          }
        }
      })
    })
  },
  /**
   * [getProdList 查询产品列表]
   * @param {} param0
   * @param {*} params
   */
  queryProdList ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      const list = [
        {
          id: '1001',
          name: '男士牛津纺衬衫',
          price: '125'
        }, {
          id: '1002',
          name: '女士雪纺玫瑰花长裙',
          price: '286'
        }, {
          id: '1003',
          name: '儿童汪汪队夏季套装',
          price: '168'
        }, {
          id: '1004',
          name: '小猪佩奇毛绒玩具',
          price: '98'
        }, {
          id: '1005',
          name: '消防车玩具',
          price: '119'
        }
      ]

      setTimeout(() => {
        commit(SET_PRODLIST, list)
        // resolve(list)
      }, 1000)
    })
  },
  /**
     * [getProductInfo 获取产品信息]
     * @param  {[type]} params [description]
     * @return {[type]}        [description]
     */
  getProductInfo ({ commit, dispatch }, params) {
    return new Promise((resolve, reject) => {
      let loanInfo = state.loanInfo
      let req = {
        cityId: loanInfo.cityId,
        cityName: loanInfo.cityName,
        registDate: loanInfo.registDate,
        loanAmount: loanInfo.loanAmount,
        mobile: loanInfo.mobile,
        vehicleModelId: loanInfo.vehicleModelId,
        wishOrderId: loanInfo.wishOrderId
      }
      http.api('/api/loan/getProductList', req).then(data => {
        // this.$indicator.close();
        if (data && !data.status) {
          let prod = data.re
          commit(SET_PRODUCTINFO, prod)
          resolve(prod)
        }
      }, () => {
        reject(params)
      })
    })
  }
}
const getters = {
  getProdInfo: state => state.productInfo,
  getStoreList: state => state.storeList,
  loanInfo: state => state.loanInfo,
  getRiskLoanInfo: state => state.riskRejectionLoanInfo,
  getProdList: state => state.prodList
}

export default {
  state,
  actions,
  getters,
  mutations
}
