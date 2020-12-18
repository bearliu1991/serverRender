import { emailRule, passRequired } from '@assets/js/rules.js'
import { encryptDes } from '@assets/js/des.js'
import { mapState } from 'vuex'
export default {
  data() {
    const validatePass = (rule, value, callback) => {
      const regex = /(^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,}$)/
      const ss = regex.test(value) + ''
      if (value === '') {
        callback(new Error('Please enter your password.'))
      } else if (ss === 'false') {
        callback(
          new Error('Please enter at least 8 digits and letter combination.')
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
        callback(new Error('Please enter your confirm password.'))
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
        password: [
          {
            validator: validatePass,
            trigger: 'blur',
          },
        ],
        confirmPassword: [
          {
            validator: validatePass2,
            trigger: 'blur',
          },
        ],
      },
      // 注册时是否同意隐私协议
      isCheckedAgree: false,
      isShowPrivacy: false,
      // 加密key
      desKey: 'MF1#npeonwFQFX0g',
      isBtnProcess: false,
      msg: {
        success: '',
        fail: '',
      },
    }
  },
  computed: {
    ...mapState(['cartData', 'historyProduct']),
  },
  created() {
    const { userPage } = this.$route.params
    // 说明是注册页
    if (userPage === 'register') {
      this.pageType = 2
    } else if (userPage === 'reset') {
      const { source, email } = this.$route.query
      this.pageType = 3
      this.formData.email = email
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
      this.isBtnProcess = true
      const { formData } = this
      const result = await this.$api.customer
        .login({
          email: encryptDes(formData.email, this.desKey),
          password: encryptDes(formData.password, this.desKey),
        })
        .catch((error) => {
          this.msg.fail = error.retCode
            ? 'Incorrect email or password.'
            : 'Login failed, please try again.'
        })
      this.isBtnProcess = false
      if (!result) {
        return false
      }
      this.handlerCallback(result)
    },

    // 注册
    async toRegister() {
      const {
        formData: { email, confirmPassword, password },
        isCheckedAgree,
      } = this
      if (!isCheckedAgree) {
        this.$toast(`Please check the privacy agreement`, 3000)
        return false
      }
      this.isBtnProcess = true
      const result = await this.$api.customer
        .register({
          isSubscribe: 1,
          email: encryptDes(email, this.desKey),
          confirmPassword: encryptDes(confirmPassword, this.desKey),
          password: encryptDes(password, this.desKey),
        })
        .catch((error) => {
          if (error.retCode === 'CS200001') {
            this.msg.fail =
              'This email address is already associated with an account. If this account is yours, you can reset your password.'
          } else {
            this.msg.fail = 'Registration error, please try again.'
          }
        })
      this.isBtnProcess = false
      if (result) {
        this.handlerCallback(result)
      }
    },
    async sendEmail() {},
    /**
     * 修改密码
     */
    async changePassword() {
      const {
        formData: { confirmPassword, password, email },
      } = this
      this.isBtnProcess = true
      const result = await this.$api.customer
        .changePassword({
          email: encryptDes(email, this.desKey),
          confirmPassword: encryptDes(confirmPassword, this.desKey),
          password: encryptDes(password, this.desKey),
        })
        .catch((error) => {
          this.msg.fail = error.retInfo || 'Reset failed, please try again.'
        })
      this.isBtnProcess = false
      if (result) {
        this.msg.success = 'Successfully modified.'
        setTimeout(() => {
          this.toSignIn()
        }, 2000)
      }
    },
    /**
     * 登录注册后成功回调
     * @param {*} result
     */
    handlerCallback(result) {
      const { email, isSubscribe, customerName } = result
      this.$store.commit('SET_USERINFO', {
        isSubscribe,
        email,
        customerName,
      })
      // this.$cookies.set('token', token, {
      //   path: '/',
      //   // domain: 'kapeixi.cn',
      // })
      // this.$cookies.set('refreshToken', refreshToken, {
      //   path: '/',
      //   // domain: 'kapeixi.cn',
      // })
      // 上传浏览记录
      this.uploadBrowseProduct()
      this.uploadCartData()
      this.$router.push('/personal')
    },
    // 上传购物车数据
    async uploadCartData() {
      if (this.cartData.length) {
        const result = await this.$api.cart
          .uploadCartData(this.cartData)
          .catch(() => {
            return 'fail'
          })
        // 上传cookie中的数据到服务器上
        if (result !== 'fail') {
          // 上传后清空缓存数据
          this.$store.commit('SET_CARTDATA', [])
        }
      }
    },
    /**
     * 上传商品的浏览记录
     * 2、登录时 将cookie中的spuId上传
     */
    uploadBrowseProduct() {
      const historyProduct = JSON.parse(JSON.stringify(this.historyProduct))
      this.$api.product.uploadBrowseRecord(historyProduct)
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
    changeInput() {
      this.msg.fail = ''
    },
  },
}
