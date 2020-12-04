import patt from '@/utils/patterns'

// 规则按照页面表单域顺序填写，如果是隐藏域则填写[]
// 如果表单有不同状态显示不同表单域，确保规则顺序跟表单域顺序一致即可

export const bankcardNoRules = {
  bankCardNo: [
    { required: true, msg: '请输入借记卡号' },
    { patt: patt[7], msg: '请输入15-20位银行卡号' }
  ]
}
// 验证码校验规则
export const validRules = {
  bankCardPhone: [
    { required: true, msg: '请输入预留手机号' },
    { patt: patt[9], msg: '请输入正确的手机号' }
  ],
  depositName: [
    { required: true, msg: '银行名称不允许为空' }
  ]
}
// 确认换卡，表单验证规则
export const BankCardRules = {
  bankCardNo: [
    { required: true, msg: '请输入借记卡号' },
    { patt: patt[7], msg: '请输入15-20位银行卡号' }
  ],
  depositName: [
    { required: true, msg: '银行名称不允许为空' }
  ],
  bankCardPhone: [
    { required: true, msg: '请填写预留手机号' },
    { patt: patt[4], msg: '预留手机号请输入11位数字' }
  ],
  verifycode: [
    { required: true, msg: '请输入验证码' },
    { patt: patt[17], msg: '验证码请输入6位数字' }
  ]
}
