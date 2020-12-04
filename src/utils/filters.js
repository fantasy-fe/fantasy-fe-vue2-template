'use strict'

/**
 * 格式化私人手机
 * @param mobile
 * @returns {string}
 */
exports.privacyMobile = (mobile) => {
  if (mobile && mobile.length === 11) return mobile.substr(0, 3) + '****' + mobile.substr(7, 4)
}

exports.currency = (value, currency, decimals) => {
  value = parseFloat(value)
  if (!isFinite(value) || (!value && value !== 0)) return ''
  currency = currency != null ? currency : '$'
  decimals = decimals != null ? decimals : 2
  var stringified = Math.abs(value).toFixed(decimals)
  var _int = decimals
    ? stringified.slice(0, -1 - decimals)
    : stringified
  var i = _int.length % 3
  var head = i > 0
    ? (_int.slice(0, i) + (_int.length > 3 ? ',' : ''))
    : ''
  var _float = decimals
    ? stringified.slice(-1 - decimals)
    : ''
  var sign = value < 0 ? '-' : ''
  return sign + currency + head +
        _int.slice(i).replace(/(\d{3})(?=\d)/g, '$1,') +
        _float
}
/**
 * 格式化身份证号
 * @param id
 * @returns {string}
 */
exports.privacyId = (id) => {
  if (id && id.length === 15) {
    return id.substr(0, 3) + '***********' + id.substr(11, 4)
  } else if (id && id.length === 18) {
    return id.substr(0, 3) + '***********' + id.substr(14, 4)
  }
}
exports.timeFormat = (value) => {
  return value !== undefined && value.split(' ')[0]
}
/**
 * 格式化日期为YYYY/MM/DD
 * @param value
 * @returns {string}
 */
exports.dateFormat = (value) => {
  return value !== undefined && value.replace(/-/g, '/')
}
/**
 * 格式化日期为YYYY/MM/DD
 * @param value 值
 * @param n 小数点位数
 * @returns {string}
 */
exports.toFixed = (value, n) => {
  return value !== undefined && Number(value).toFixed(n)
}
