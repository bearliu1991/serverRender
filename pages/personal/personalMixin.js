export default {
  data() {
    return {
      isModify: false,
      userRule: [
        {
          required: true,
          message: 'Please enter your customerName.',
          trigger: 'blur',
        },
        {
          max: 31,
          message: 'Length of the string exceeds the limit.',
          trigger: ['change', 'blur'],
        },
      ],
      accountForm: {
        customerName: '',
      },
      orderNum: 0,
      addressList: [],
    }
  },
  mounted() {
    this.queryOrderList()
    this.queryAddressList()
  },
  watch: {
    // 初始化modify中的数据
    isModify: {
      handler(val) {
        if (!val) {
          this.accountForm.customerName = this.loginInfo.customerName
        }
      },
      immediate: true,
    },
  },
  methods: {
    /**
     * 修改用户名
     */
    toModify() {
      this.$refs.accountForm.validate(async (valid) => {
        if (valid) {
          const result = await this.$api.customer
            .modifyUserName(this.accountForm.customerName)
            .catch((error) => {
              this.$alert(error.retInfo)
            })
          if (result) {
            this.$toast('Successfully modified', 2000)
            this.$store.dispatch('getUserInfo')
            this.isModify = false
          }
        } else {
          return false
        }
      })
    },

    // 查询订单列表
    async queryOrderList() {
      const result = await this.$api.order
        .queryOrderList({
          pageNum: 1,
          pageSize: 20,
        })
        .catch(() => {
          this.orderNum = 0
        })
      if (result) {
        this.orderNum = result.total
      } else {
        this.orderNum = 0
      }
    },
    // 查询地址列表
    async queryAddressList() {
      const result = await this.$api.address
        .getAddressList({
          pageNum: 1,
          pageSize: 20,
        })
        .catch(() => {})
      this.addressList = []
      if (result && result.list) {
        this.addressList = result.list
      }
    },
  },
}
