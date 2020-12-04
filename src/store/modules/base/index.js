import { http, util, storage } from '../../../utils'

const HOTLINE = '10101000'
const LOADINGTEXT = '努力加载中...'
const state = {
  URLPARAMS: null,
  BASEDATA: null,
  cityList: null,
  baseCityList: null
}

const SET_GLOB_CITYLIST = 'SET_GLOB_CITYLIST'
const SET_GLOB_URLPARAMS = 'SET_GLOB_URLPARAMS'
const SET_GLOB_BASEDATA = 'SET_GLOB_BASEDATA'
const SET_GLOB_BASECITYLIST = 'SET_GLOB_BASECITYLIST'

const mutations = {

  [SET_GLOB_CITYLIST] (state, list) {
    state.cityList = list
  },
  [SET_GLOB_URLPARAMS] (state, params) {
    state.URLPARAMS = params
  },
  [SET_GLOB_BASEDATA] (state, baseData) {
    state.BASEDATA = baseData
  },
  [SET_GLOB_BASECITYLIST] (state, cityList) {
    state.baseCityList = cityList
  }
}

const actions = {
  appStart ({ commit, dispatch }) {
    actions.queryBaseData({ commit, dispatch })
    actions.getUrlParams({ commit, dispatch })
  },
  /**
     * [getUrlParams 获取推广过来的地址栏参数]
     * @param  {[type]} options.commit   [description]
     * @param  {[type]} options.dispatch [description]
     * @return {[type]}                  [description]
     */
  getUrlParams ({ commit, dispatch }) {
    // 获取地址栏参数存储为一个本地缓存对象
    let urlParams = util.url.urlToObject()
    if (!util.isEmptyObject(urlParams)) {
      commit(SET_GLOB_URLPARAMS, urlParams)
      storage.setSession('urlParams', urlParams)
    }
  },
  /**
     * [queryCityList 获取城市列表]
     * @return {[type]} [description]
     */
  queryCityList ({ commit, dispatch }) {
    storage.removeStorage('baseCityList')// 删除不用的大缓存数据
    const cityList = storage.getSession('cityList')
    if (!cityList) {
      http.api('/resource/mwap/fcar/mmcnew/queryCityData', {}).then((data) => {
        if (data && data.status === 0) {
          const list = data.re.cityList
          commit(SET_GLOB_CITYLIST, list)
          storage.setSession('cityList', list)
        }
      })
    } else {
      commit(SET_GLOB_CITYLIST, cityList)
    }
  },
  /**
     * [queryBaseData 获取基础配置信息]
     * @param  {[type]} options.commit   [description]
     * @param  {[type]} options.dispatch [description]
     * @return {[type]}                  [description]
     */
  queryBaseData ({ commit, dispatch }) {
    // var loading = new DomLoading()
    console.info('actions.queryBaseData')
    const baseData = storage.getSession('baseData')
    if (!baseData) {
      http.api('/resource/mwap/fcar/mmcnew/queryBaseData').then((data) => {
        // loading.hide()
        if (data && data.status === 0) {
          commit(SET_GLOB_BASEDATA, data.re)
          storage.setSession('baseData', data.re)
        }
      })
    } else {
      commit(SET_GLOB_BASEDATA, baseData)
    }
  },
  /**
   * [queryBaseCityList 精简版城市列表]
   * 幸福消金需求 新增接口
   * @return {[type]} [description]
   */
  queryBaseCityList ({ commit, dispatch }) {
    storage.removeStorage('cityList')// 删除不用的大缓存数据
    return new Promise((resolve, reject) => {
      const baseCityList = storage.getStorage('baseCityList')
      if (baseCityList) {
        resolve(baseCityList)
      } else {
        if (!state.baseCityList || state.baseCityList.length < 1) {
          http.api('/resource/mwap/fcar/mmcnew/xiaojin/getResidentialAddress', {}).then((data) => {
            if (!data.status) {
              const list = data.re
              commit(SET_GLOB_BASECITYLIST, list)
              try {
                storage.setStorage('baseCityList', list)
              } catch (msg) {
                console.info(msg)
              }
              resolve(list)
            } else {
              reject(data.msg)
            }
          })
        } else {
          resolve(state.baseCityList)
        }
      }
    })
  },
  setCityList ({ commit, dispatch }, cityList) {
    commit(SET_GLOB_CITYLIST, cityList)
  },
  setBaseData ({ commit, dispatch }, baseData) {
    commit(SET_GLOB_BASEDATA, baseData)
  }
}

const getters = {
  getUrlParams (state) {
    return state.URLPARAMS
  },
  getHotTel (state) {
    return HOTLINE
  },
  getLoadingText (state) {
    return LOADINGTEXT
  },
  /**
   * 城市基础数据
   * @param {*} state
   */
  getCityList (state) {
    let list = state.cityList
    if (!list) {
      list = storage.getSession('cityList')
    }
    return list
  },
  /**
   * 获取基础数据
   * @param {*} state
   */
  getBaseData (state) {
    let baseData = state.BASEDATA
    if (!baseData) {
      baseData = storage.getSession('baseData')
    }
    return baseData
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
