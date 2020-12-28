export default {
  data() {
    return {
      isModify: false,
      // isOpen: false,
      // activeIndex: 0,
      userRule: [
        {
          required: true,
          message: 'Please enter your customerName.',
          trigger: 'blur',
        },
      ],
      accountForm: {
        customerName: '',
      },
      // tabs: [
      //   {
      //     id: 1,
      //     to: '/personal',
      //     name: 'account details',
      //   },
      //   {
      //     id: 2,
      //     to: '/personal/orderList',
      //     name: 'My Orders',
      //   },
      //   {
      //     id: 3,
      //     to: '/personal/address',
      //     name: 'Address Book',
      //   },
      // ],
    }
  },
  // mounted() {
  //   const path = this.$route.path
  //   const index = this.tabs.findIndex((item) => {
  //     return item.to === path
  //   })
  //   if (index === -1) {
  //     // 页面拦截
  //   } else {
  //     this.activeIndex = index
  //   }
  // },
  methods: {
    // openBox() {
    //   this.isOpen = !this.isOpen
    // },
    // // 切换tab
    // changeTab(index) {
    //   this.activeIndex = index
    //   this.openBox()
    // },
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
            this.$store.dispatch('getUserInfo')
            this.isModify = false
            this.reload()
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
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      console.log(result)
    },
    // 查询地址列表
    async queryAddressList() {
      const result = await this.$api.address
        .getAddressList({
          pageNum: 1,
          pageSize: 20,
        })
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      console.log(result)
    },
  },
}
