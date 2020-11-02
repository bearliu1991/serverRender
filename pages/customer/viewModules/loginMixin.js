import { emailRule, passRequired } from '@assets/js/rules.js'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      const regex = /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$)/
      const ss = regex.test(value) + ''
      if (value === '') {
        callback(new Error('Please enter your password'))
      } else if (ss === 'false') {
        callback(
          new Error('Please enter at least 8 digits and letter combination')
        )
      } else {
        if (this.formData.confirmPassword !== '') {
          this.$refs.form.validateField('confirmPassword')
        }
        callback()
      }
    }
    const validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter your confirm password'))
      } else if (value !== this.formData.password) {
        callback(new Error('Your passwords do not match, please try again.'))
      } else {
        callback()
      }
    }
    return {
      menus: [
        {
          name: 'Exclusive discounts',
          icon: 'icon60-zhengce-zhekouyouhui',
        },
        {
          name: 'Early access to sales',
          icon: 'icon60-zhengce-remaishangpin',
        },
        {
          name: 'Free shipping',
          icon: 'icon60-zhengce-yunfei',
        },
        {
          name: 'Faster checkout',
          icon: 'icon60-zhengce-fastercheckout',
        },
      ],
      formData: {
        password: '',
        confirmPassword: '',
        email: '',
      },
      emailRule,
      passRequired,
      // 页面类型  1 登录  2 注册  3 修改密码发送邮件  4 修改密码
      pageType: 1,
      // 密码校验规则
      passwordRules: {
        password: [{ validator: validatePass, trigger: 'blur' }],
        confirmPassword: [{ validator: validatePass2, trigger: 'blur' }],
      },
      // 注册时是否同意隐私协议
      isCheckedAgree: false,
      msg: {
        success: '',
        fail: '',
      },
    }
  },
  created() {
    const { userPage } = this.$route.params
    // 说明是注册页
    if (userPage === 'register') {
      this.pageType = 2
    } else if (userPage === 'reset') {
      const { source } = this.$route.query
      this.pageType = 3
      delete this.formData.email
      // 忘记密码非邮箱进入
      if (source !== 'email') {
        this.pageType = 4
        this.formData = {
          email: '',
        }
      }
    } else if (userPage === 'login') {
      this.pageType = 1
      delete this.formData.confirmPassword
    }
  },
  methods: {
    // 表单提交
    submitForm(formName) {
      const { pageType } = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          switch (pageType) {
            // 登录
            case 1:
              this.toLogin()
              break
            // 注册
            case 2:
              this.toRegister()
              break
            // 修改密码
            case 3:
              this.changePassword()
              break
            // 发送邮件
            case 4:
              break
            default:
              break
          }
        } else {
          return false
        }
      })
    },
    // 登录
    async toLogin() {
      const { formData } = this
      const result = await this.$api.customer.login(formData)
      if (!result) {
        return false
      }
      if (result.code !== 200) {
        this.msg.fail = result.message || 'Incorrect email or password.'
        return false
      }
      const { id, token, refreshToken } = result
      this.$store.commit('SET_USERINFO', {
        id,
        token,
        refreshToken,
      })
      alert('跳转个人中心')
    },
    // 注册
    async toRegister() {
      const { formData, isCheckedAgree } = this
      if (!isCheckedAgree) {
        alert(`请勾选隐私协议`)
        return false
      }
      const result = await this.$api.customer.register(formData)
      if (result) {
        if (result.code === 400) {
          this.msg.fail =
            'This email address is already associated with an account. If this account is yours, you can reset your password.'
        } else {
          this.msg.fail = 'Registration error, please try again'
        }
      } else {
        alert('注册成功，重定向到个人中心')
      }
    },
    async sendEmail() {},
    /**
     * 修改密码
     */
    async changePassword() {
      const { formData } = this
      const result = await this.$api.customer.changePassword(formData)
      if (result && result.code === 200) {
        this.msg.success = 'Successfully modified'
        this.toSignIn()
      } else if (result) {
        this.msg.fail = result.message
      }
    },
    // 跳转到注册页
    toSignUp() {
      this.$router.push('register')
    },
    toSignIn() {
      this.$router.push('login')
    },
    toReset() {
      this.$router.push('reset')
    },
  },
}
