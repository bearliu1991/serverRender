// 邮箱校验
export const emailRule = [
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
]
export const addressRule = {
  firstName: [
    {
      required: true,
      message: 'Enter a first name.',
      trigger: 'blur',
    },
  ],
  lastName: [
    {
      required: true,
      message: 'Enter a last name.',
      trigger: 'blur',
    },
  ],
  addressFirst: [
    {
      required: true,
      message: 'Enter an address.',
      trigger: 'blur',
    },
  ],
  city: [
    {
      required: true,
      message: 'Enter a city.',
      // trigger: 'blur',
    },
  ],
  country: [
    {
      required: true,
      message: 'Select a country / region.',
      trigger: 'change',
    },
  ],
  state: [
    {
      required: true,
      message: 'Enter a state.',
      trigger: 'change',
    },
  ],
  postcode: [
    {
      required: true,
      message: 'Enter a zip code.',
      trigger: 'blur',
    },
  ],
  telephone: [
    {
      required: true,
      message: 'Enter a phone number.',
      trigger: 'blur',
    },
  ],
}
// 密码必填校验
export const passRequired = [
  {
    required: true,
    message: 'Please enter your password.',
    trigger: 'blur',
  },
]
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
