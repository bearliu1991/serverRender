export default {
  data() {
    return {
      isModify: false,
      isOpen: false,
      activeIndex: 0,
      accountForm: {
        customerName: '',
      },
      tabs: [
        {
          id: 1,
          to: '/personal',
          name: 'account details',
        },
        {
          id: 2,
          to: '/personal/order',
          name: 'My Orders',
        },
        {
          id: 3,
          to: '/personal/address',
          name: 'Address Book',
        },
      ],
    }
  },
  mounted() {
    // this.queryUserInfo()
  },
  methods: {
    openBox() {
      this.isOpen = !this.isOpen
    },
    // 切换tab
    changeTab(index) {
      this.activeIndex = index
      this.openBox()
    },
    /**
     * 修改用户名
     */
    async toModify() {
      const result = await this.$api.customer
        .modifyUserName(this.accountForm.customerName)
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      if (result) {
        this.$store.commit('SET_USERINFO', '')
        this.isModify = false
      }
    },
  },
}
