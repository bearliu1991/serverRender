export default {
  props: {
    productData: {
      type: Object,
      default: () => {
        return {}
      },
    },
  },
  data() {
    return {
      buyNumber: 3, // 选择数量
      selectedColor: {}, // 当前选中的颜色对象 --skc对象
      selectedSkuList: [], // 当前选中颜色，对应的型号 sku列表
      selectedSku: {}, // 选中的型号对象 -- sku对象
      detailList: [
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
    skcList() {
      // 颜色列表
      return this.productData.skcList || []
    },
  },
  watch: {
    productData: {
      immediate: true,
      handler(value) {
        const { skcList = [] } = value
        this.detailList[1].content = value.shipping || ''
        this.detailList[2].content = value.returnExchange || ''
        this.handleSelectSize(skcList[0] || {})
      },
    },
  },
  beforeCreate() {},
  mounted() {},
  methods: {
    handleSelectSize(item) {
      // 当前选中的颜色--skc对象
      this.selectedColor = item
      this.detailList[0].content = item.description
      this.selectedSkuList = item.skuList || []
      this.selectedSku = this.selectedSkuList[0] || {}
    },
  },
}
