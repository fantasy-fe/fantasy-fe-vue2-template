import { http, authHelper, util } from '../../../utils'
const state = {
  userInfo: {},
  logined: 0
}

const SET_USERINFO = 'SET_USERINFO'
const SET_LOGINED = 'SET_LOGINED'

const mutations = {
  [SET_USERINFO] (state, userInfo) {
    state.userInfo = userInfo
  },
  [SET_LOGINED] (state, logined) {
    state.logined = logined
  }
}

const actions = {
  /**
     * [setUserInfo 设置用户信息]
     * @param {[type]} options.commit   [description]
     * @param {[type]} options.dispatch [description]
     * @param {[type]} userInfo         [description]
     */
  setUserInfo ({ commit, dispatch }, userInfo) {
    commit(SET_USERINFO, userInfo)
  },
  setLogined ({ commit, dispatch }, logined) {
    commit(SET_LOGINED, logined)
  },
  logout ({ commit, dispatch }) {
    var env = process.env.NODE_ENV
    // var ENVMAP = { "production": "product" };
    // var me = this
    return new Promise((resolve, reject) => {
      http.api('/api/doLogout', {}).then((data) => {
        if (data && !data.status) {
          util.cookie('fcarwap-user-id-' + env, null)
          commit(SET_USERINFO, {
            SYSDATE: state.userInfo.sysDate ? new Date(state.userInfo.sysDate) : new Date()
          })
          commit(SET_LOGINED, 0)
          resolve()
        }
      })
    })
  },
  /**
     * [getUserInfo 获取用户信息]
     * @param  {[type]} options.commit   [description]
     * @param  {[type]} options.dispatch [description]
     * @return {[type]}                  [description]
     */
  getUserInfo ({ commit, dispatch }) {
    return new Promise((resolve, reject) => {
      commit(SET_LOGINED, authHelper.isLogin() ? 1 : 0)
      http.api('/resource/mwap/fcar/crm/queryCustomerInfo', {}).then((data) => {
        if (!data.status) {
          let userInfo = data.re
          userInfo.mobile = userInfo.telephone
          userInfo.SYSDATE = new Date(userInfo.sysDate)
          commit(SET_USERINFO, data.re)
          resolve(data)
        }
      })
    })
  }
}

const getters = {
  isLogin (state) {
    return state.logined
  },
  userInfo (state) {
    return state.userInfo
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
