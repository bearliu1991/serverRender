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
      dialogVisible: false,
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
  },
}
