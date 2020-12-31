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
      const reqError = await this.$refs.formData.validForm()

      if (!reqError) {
      } else {
        const formData = this.$refs.formData.formData
        const params = {
          ...formData,
          isDefault: this.formData.isDefault,
        }
        const result = await (this.addOrEditAddress
          ? this.$api.address.saveAddress(params).catch(() => {})
          : this.$api.address.updateAddress(params).catch(() => {}))
        if (result) {
          this.getAddressList()
          this.formShowDeal()
          this.$toast('modify successed.', 1000)
        } else {
          this.$toast('modify failed.', 1000)
        }
      }
    },
    /**
     * 删除地址
     */
    deleteAddress(id) {
      this.$alert({
        text: 'Are you sure to delete this address？',
        isCancel: true,
        isComfirm: true,
      }).then(async () => {
        await this.$api.address.deleteAddress(id)
        this.getAddressList()
      })
    },
  },
}
