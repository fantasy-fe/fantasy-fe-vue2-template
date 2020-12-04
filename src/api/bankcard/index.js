import { execAPI } from '../index'

export default {

  /**
   * 根据卡号自动获取银行信息 （银行名称、code）
   * @param {bankCardNo} params
   */
  async autoGetBankInfoByCardNo (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/getBankInfoByCardNo',
      params,
      cusParams: {
        showErrorMsg: false
      },
      cb,
      failCb,
      loadingTips: '自动识别银行中'
    })
  },
  /**
     * 获取全量银行列表
     */
  getBankList (params, cb, failCb) {
    let uri
    if (params.type === 'xj') {
      uri = '/resource/mwap/fcar/mmcnew/xiaojin/getAllBankList'
    }
    uri = '/resource/mwap/fcar/mmcnew/getAllBankList'
    execAPI({uri, params}, (res) => {
      if (res.status === 0 && res.mapiStatus === 'SUCCESS') {
        cb(res.re)
      } else {
        failCb(res.msg)
      }
    })
  },
  /**
     * 根据资金来源查询支持托收的银行
     * @param {fundsSource} param
     */
  getAuthorizeBank (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/getBankList',
      params,
      cb,
      failCb
    })
  },

  /**
     * 发送验证码
     * @param {mobile} params
     */
  sendValidateCode (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/sendValidateCode',
      params,
      cb,
      failCb
    })
  },
  /**
     * 发送验证码(19-07-12(新))
     * @param {mobile} params
     */
  bankCardSendValidateCode (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/bankCardSendValidateCode',
      params,
      cb,
      failCb
    })
  },

  /**
   * 查询托收的银行卡（更新托收银行卡页面）
   * @param {参数} params
   * @param {成功回调} cb
   * @param {失败回调} failCb
   */
  queryCollectionBankList (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/queryCollectionBankList',
      params,
      cb,
      failCb
    })
  },

  /**
   *
   * @param {银行卡信息} params
   * @param {成功回调} cb
   * @param {失败回调} failCb
   */
  updateCollectionBankInfo (params, cb, failCb) {
    execAPI({
      uri: '/resource/mwap/fcar/mmcnew/updateCollectionBankInfo',
      params,
      cb,
      failCb
    })
  }
}
