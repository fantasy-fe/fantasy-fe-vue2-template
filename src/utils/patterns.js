const patt = {
  0: '^([\u4e00-\u9fa5]|·)+$', // 中文和·；（姓名）
  1: '^[0-9a-zA-Z\u4e00-\u9fa5]+$', // 中文，数字，英文；
  2: '^[0-9a-zA-Z\u4e00-\u9fa5-_]+$', // 中文，数字，英文，-，_；（单位地址，家庭地址）
  3: '^(\\d{2,5}-\\d{7,8})|((1[3456789]\\d{9}))$', // 座机号码
  4: '^(\\d{2,5}-\\d{7,8})|(1[3456789]\\d{9})$', // 座机号码或手机号码
  5: '(?!^\\s+$)(^[a-zA-Z]+$)', // 只允许输入空格跟字母（姓名拼音）
  6: '^[0-9]+$', // 只允许输入两位数字（现职年数）
  7: '^[0-9]{15,20}$', // 银行卡号15-20位数字
  8: '^[\u4e00-\u9fa5]+$', // 只允许输入汉字
  9: '^(1[3456789]\\d{9})$', // 手机号码
  10: '^(13|14|15|16|17|18|19)[0-9]{9}$', // 手机号验证
  11: '^[1-9]([0-9]{14})|[0-9]{17}([0-9]|[A-Za-z])$', // 身份证号码格式
  12: '^[0-9]{12}$', // 驾驶证档案编号校验规则：12位数字
  13: '^[0-9]{17}([0-9]|[A-Za-z])$', // 驾驶证号码
  14: '(^[0-9]{15}$)|(^[0-9]{18}$)|(^[0-9]{17}([0-9]|X|x)$)', // 正确的身份证号规则
  15: '^[0-9a-zA-Z\u4e00-\u9fa5()（）]+$', // 中文，数字，英文,(),（）；
  16: '^[0-9]{1,6}$', // 月收入1-6位数字
  17: '^[0-9]{6}$' // 验证码规则6位数字
}
export default patt
