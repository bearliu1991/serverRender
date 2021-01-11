/**
 * @商品评价form表单验证
 */

export const addressRule = {
  Score: [
    {
      required: true,
      message: 'Enter a first name.',
      trigger: 'hover',
    },
  ],
  Title: [
    {
      required: true,
      message: 'Enter a last name.',
      trigger: 'blur',
    },
  ],
  Review: [
    {
      required: true,
      message: 'Enter an address.',
      trigger: 'blur',
    },
  ],
  Name: [
    {
      required: true,
      message: 'Enter a city.',
      // trigger: 'blur',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please enter an email address.',
      trigger: 'blur',
    },
    {
      type: 'email',
      message: 'The email you entered is invalid.',
      trigger: 'blur',
    },
  ],
  size: [
    {
      required: true,
      message: 'Select a state.',
      trigger: 'change',
    },
  ],
  desc: [
    {
      required: true,
      message: 'Enter a zip code.',
      trigger: 'blur',
    },
  ],
  group: [
    {
      required: true,
      message: 'Enter a phone number.',
      trigger: 'blur',
    },
  ],
}
// 正则维护
const passwordReg = /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$)/
// 密码自定义正则校验
export const validatePassRule = () => {
  return (rule, value, callback) => {
    const isTrue = passwordReg.test(value) + ''
    if (value === '') {
      callback(new Error('Please enter your password.'))
    } else if (isTrue === 'false') {
      callback(
        new Error('Please enter at least 8 digits and letter combination.')
      )
    } else {
      callback()
    }
  }
}
