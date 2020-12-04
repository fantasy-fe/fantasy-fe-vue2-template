// import { util } from '../../../utils'
import { storage } from '@/utils'
const cacheCardInfo = storage.getSession('cardInfo')
const state = {
  cardInfo: cacheCardInfo || null
}

const SET_CARDINFO = 'SET_CARDINFO'

const mutations = {
  [SET_CARDINFO] (state, cardInfo) {
    state.cardInfo = cardInfo
  }
}

const actions = {
  /**
     * [setCardInfo 设置更换的银行卡信息]
     * @param {[type]} options.commit   [description]
     * @param {[type]} cardInfo         [description]
     */
  setCardInfo ({ commit }, cardInfo) {
    commit(SET_CARDINFO, cardInfo)
    storage.setSession('cardInfo', cardInfo)
  }

}
const getters = {
  getCardInfo: (state) => {
    let cardInfo = state.cardInfo
    if (!cardInfo) {
      cardInfo = storage.getSession('cardInfo')
    }
    return cardInfo
  }
}

export default {
  state,
  actions,
  getters,
  mutations
}
