function validate (form, rules) {
  let msg = ''
  try {
    if (!(form instanceof Object)) {
      throw new Error('the form data must be a object!')
    }
    for (let key in rules) {
      let propRules = rules[key]
      let result = propRules.every((v, i) => {
        if (v.hasOwnProperty('required')) {
          if (!form.hasOwnProperty(key) || form[key] === '' || form[key] === null || (form.key instanceof Array && form[key].length === 0)) {
            msg = v.msg
            return false
          }
        }
        if (v.hasOwnProperty('patt')) {
          let patt = new RegExp(v.patt)
          if (!patt.test(form[key])) {
            msg = v.msg
            return false
          }
        }
        if (v.hasOwnProperty('max')) {
          if (form[key].length > v.max) {
            msg = v.msg
            return false
          }
        }
        return true
      })
      if (!result) {
        break
      }
    }
    return msg
  } catch (error) {
    console.log(error)
  }
}
export default validate
