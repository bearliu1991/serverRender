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
    // 大图小图处理
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
  created() {
    // 上传浏览记录
    this.uploadBrowseProduct(false)
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
      const isLogin = false
      // 校验库存
      if (!this.checkInventory()) {
        return false
      }
      this.cookieCart()
      const cookieCartGoods = this.$cookies.get('cookie_cart_goods') || []
      // 已登录时，将用户数据上传到服务器
      if (isLogin) {
        this.$api.cart.addCart({
          userId: '',
          email: 'email',
          goods: cookieCartGoods,
        })
      }
      alert('添加购物车成功')
    },
    /**
     * 未登录时缓存加入购物车的数据
     */
    cookieCart() {
      // 存放加入购物车的数据
      let cacheCartData = []

      const { skuId } = this.checkedSkuInfo
      // 当前选中的sku需要加入购物车的数据
      const activeCartData = {
        quantity: this.productNum,
        skuId,
      }
      // 获取浏览器缓存中的购物车数据
      const cookieCartGoods = this.$cookies.get('cookie_cart_goods') || []
      // 获取cookie中的数据
      if (cookieCartGoods.length === 0) {
        cacheCartData = []
      } else {
        cacheCartData = cookieCartGoods
      }
      // 查找当前的sku是否已加入购物车
      const findIndex = cacheCartData.findIndex((item) => {
        return item.skuId === skuId
      })
      if (findIndex > -1) {
        const cartNum = this.productNum + cacheCartData[findIndex].quantity
        cacheCartData[findIndex].quantity = cartNum
      } else {
        // 将当前的类目加入到数组中
        cacheCartData.push(activeCartData)
      }
      // 更新cookie
      this.$cookies.set('cookie_cart_goods', cacheCartData)
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
    /**
     * 上传商品的浏览记录
     * 1、未登录时 cookie保存浏览的spuId，最多20个，超过20个，优先去除初始加入的spuId
     * 2、登录时 将cookie中的spuId上传
     */
    uploadBrowseProduct(isLogin) {
      const { spuId } = this.product
      const cookieSpuIds = this.$cookies.get('cookie_product_spuIds') || []
      if (!cookieSpuIds.includes(spuId)) {
        cookieSpuIds.push(spuId)
      }
      if (cookieSpuIds.length > 20) {
        // 删除第一个
        cookieSpuIds.shift()
      }
      if (isLogin) {
        this.$api.product.uploadBrowseRecord(cookieSpuIds)
      } else {
        this.$cookies.set('cookie_product_spuIds', cookieSpuIds)
      }
    },
    /**
     * 显示sizeGuide
     * @param {*} value
     */
    doSizeGuide(value) {
      this.showSizeGuide = value
    },
  },
}
