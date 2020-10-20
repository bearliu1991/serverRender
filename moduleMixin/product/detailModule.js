export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      // 到货通知是否显示
      dialogVisible: false,
      // 尺码表是否显示
      showSizeGuide: false,
      // 商品数量
      productNum: 1,

      min: 1,
      checkedSkuInfo: {},
      serviceList: [
        // 详细
        {
          title: 'description',
          content: ``,
        },
        {
          title: 'shipping',
          content: ``,
        },
        {
          title: 'return&exchange',
          content: ``,
        },
        {
          title: 'product care',
          content: ``, // 内容固定在页面上
        },
      ],
      thumbImgs: [],
    }
  },
  computed: {
    // 缺货状态   0 全部缺货  1 部分缺货  2 无
    stockStatus() {
      const { productNum } = this
      const { stock } = this.checkedSkuInfo
      if (stock === 0) {
        return 0
      } else if (productNum > stock) {
        return 1
      } else {
        return 2
      }
    },
    mainMedia() {
      let spliceIndex = 0
      const { mediaList = [] } = this.checkedSkuInfo
      if (mediaList.length === 0) {
        return []
      }
      // 偶数
      if (mediaList.length / 2 === 0) {
        spliceIndex = 2
      } else {
        spliceIndex = 1
      }
      this.thumbImgs = mediaList.slice(spliceIndex)
      return mediaList.slice(0, spliceIndex)
    },
  },
  watch: {
    product: {
      immediate: true,
      handler(value) {
        this.serviceList[1].content = value.shipping || ''
        this.serviceList[2].content = value.returnExchange || ''
      },
    },
  },
  beforeCreate() {},
  mounted() {},
  created() {
    console.log(2)
  },
  methods: {
    /**
     *  切换sku 获取选中的sku信息
     * @param {*} skuInfo
     */
    getSkuInfo(skuInfo) {
      this.checkedSkuInfo = skuInfo

      // 缺货状态
      if (skuInfo.stock === 0) {
        this.productNum = 0
        this.min = 0
      } else {
        this.productNum = 1
        this.min = 1
      }
    },
    /**
     * 到货通知
     */
    arrivalNotice() {
      this.dialogVisible = true
    },
    // 添加购物车
    addCart() {
      if (!this.checkInventory()) {
        return false
      }
    },
    // 校验库存
    async checkInventory() {
      let passed = true
      let result = null
      const checkList = [
        {
          skuId: +this.checkedSkuInfo.skuId,
          quantity: 100, // this.productNum,
        },
      ]
      const list = await this.$api.cart.checkInventory(checkList)
      if (list && list.length > 0) {
        result = list.filter((item) => {
          return item.skuId === '520000200203257600'
        })
        if (result) {
          passed = result.passed
          this.checkedSkuInfo.stock = result.quantity
        }
      }
      return passed
    },
    doSizeGuide(value) {
      this.showSizeGuide = value
    },
  },
}
