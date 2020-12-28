import List from './components/mobileAdressList'
export default {
  components: {
    List,
  },
  data() {
    return {
      addOrEditAddress: true, // add true - edit false
      isEdit: false,
      formShow: false,
      formTopAni: false,
      defaultAdress: false,
      adressList: [],
      formData: {
        addressFirst: null,
        addressSecond: null,
        alias: null,
        city: null,
        cityId: null,
        company: null,
        country: null,
        countryId: null,
        customerId: null,
        firstName: null,
        id: null,
        isDefault: 0,
        lastName: null,
        other: null,
        postcode: null,
        stateId: null,
        stateName: null,
        telephone: null,
      },
    }
  },
  watch: {
    defaultAdress(val) {
      this.formData.isDefault = val ? 1 : 0
    },
  },
  mounted() {
    this.getAddressList()
  },
  methods: {
    /**
     * 地址展示与隐藏
     */
    formShowDeal(status = false, addOrEditAddress = true) {
      this.addOrEditAddress = addOrEditAddress
      this.formShow = status
      if (!status) {
        this.formTopAni = status
        this.formData = {
          addressFirst: null,
          addressSecond: null,
          alias: null,
          city: null,
          cityId: null,
          company: null,
          country: null,
          countryId: null,
          customerId: null,
          firstName: null,
          id: null,
          isDefault: null,
          lastName: null,
          other: null,
          postcode: null,
          stateId: null,
          stateName: null,
          telephone: null,
        }
      } else {
        setTimeout(() => {
          this.formTopAni = status
        }, 0)
      }
    },
    /**
     * 默认地址设置
     */
    // defaultAdressChoose() {
    //   this.defaultAdress = !this.defaultAdress
    //   this.formData.isDefault = this.formData.isDefault ? 0 : 1
    // },
    /**
     * 获取当前用户的所有地址
     */
    async getAddressList() {
      const { list } = await this.$api.address.getAddressList()
      this.adressList = list
    },
    /**
     * 打开更新地址窗口
     */
    openUpdateDialog(formData) {
      this.formData = { ...formData }
      this.isEdit = true
      this.formShowDeal(true, false)
      this.defaultAdress = this.formData.isDefault === 1
    },
    /**
     * 新增地址
     * 更新地址
     */
    async newOrUpdateAddress() {
      await (this.addOrEditAddress
        ? this.$api.address.saveAddress({
            ...this.$refs.formData.formData,
            isDefault: this.formData.isDefault,
          })
        : this.$api.address.updateAddress({
            ...this.$refs.formData.formData,
            isDefault: this.formData.isDefault,
          }))
      this.getAddressList()
      this.formShowDeal()
      this.$alert({
        text: 'modify successed',
        isComfirm: true,
      })
    },
    /**
     * 删除地址
     */
    deleteAddress(id) {
      this.$alert({
        text: '是否确认删除？',
        isCancel: true,
        isComfirm: true,
      }).then(async () => {
        await this.$api.address.deleteAddress(id)
        this.getAddressList()
      })
    },
  },
}
