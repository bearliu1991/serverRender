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
      // buyNumber: 3, // 选择数量
      // selectedColor: {}, // 当前选中的颜色对象 --skc对象
      // selectedSkuList: [], // 当前选中颜色，对应的型号 sku列表
      // selectedSku: {}, // 选中的型号对象 -- sku对象
    }
  },
  computed: {
    // skcList() {
    //   // 颜色列表
    //   return this.productData.skcList || []
    // },
  },
  watch: {
    product: {
      immediate: true,
      handler(value) {
        // const { skcList = [] } = value
        this.serviceList[1].content = value.shipping || ''
        this.serviceList[2].content = value.returnExchange || ''
        // this.handleSelectSize(skcList[0] || {})
      },
    },
  },
  beforeCreate() {},
  mounted() {},
  created() {
    console.log(2)
  },
  methods: {
    getSkuInfo(skuInfo) {
      this.checkedSkuInfo = skuInfo
    },
  },
}
