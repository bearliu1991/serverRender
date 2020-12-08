import { mapState } from 'vuex'
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
      // 小购物车浮层
      isCartVisible: false,
      // 商品数量
      productNum: 1,

      min: 1,
      checkedSkuInfo: {},
      serviceList: [
        // 详细
        {
          title: 'DESCRIPTION',
          content: ``,
        },
        {
          title: 'SHIPPING',
          content: ``,
        },
        {
          title: 'RETURN & EXCHANGE',
          content: ``,
        },
        {
          title: 'PRODUCT CARE',
          content: ``, // 内容固定在页面上
        },
      ],
      thumbImgs: [],
    }
  },
  computed: {
    ...mapState(['cartData', 'historyProduct']),

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
    this.uploadBrowseProduct()
    // 上传购物车中数据
    this.uploadCartData()
  },
  methods: {
    // 关闭购物车浮层
    close() {
      this.isCartVisible = false
    },
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
    async addCart() {
      const { skuId, skcId, retailPrice, discountPrice } = this.checkedSkuInfo
      // 校验库存
      const passed = await this.checkInventory()
      if (!passed) {
        this.$alert('add cart fail')
        return false
      }

      // 已登录时，将用户数据上传到服务器
      if (this.isLogin) {
        const result = await this.$api.cart
          .addCart({
            skuId,
            spuId: this.product.spuId,
            skcId,
            quantity: this.productNum,
            retailPrice,
            discountPrice,
          })
          .catch((e) => {
            // 加车失败
            this.$alert(e.retInfo)
          })

        if (result) {
          this.isCartVisible = true
        }
      } else {
        this.cookieCart()
        this.isCartVisible = true
      }
    },
    /**
     * 未登录时缓存加入购物车的数据
     */
    cookieCart() {
      // 存放加入购物车的数据
      let cacheCartData = []

      const { skuId, skcId, retailPrice, discountPrice } = this.checkedSkuInfo
      // 当前选中的sku需要加入购物车的数据
      const activeCartData = {
        skuId,
        spuId: this.product.spuId,
        skcId,
        quantity: this.productNum,
        retailPrice,
        discountPrice,
      }
      // 获取浏览器缓存中的购物车数据
      const cookieCartGoods = JSON.parse(JSON.stringify(this.cartData)) || []
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
      // 已加入购物车的需更新购物车数量
      if (findIndex > -1) {
        const cartNum = this.productNum + cacheCartData[findIndex].quantity
        cacheCartData[findIndex].quantity = cartNum
      } else {
        // 将当前的类目加入到数组中
        cacheCartData.push(activeCartData)
      }
      // 更新cookie
      this.$store.commit('SET_CARTDATA', cacheCartData)
    },
    // 校验库存
    async checkInventory() {
      let passed = true
      const checkList = [
        {
          skuId: +this.checkedSkuInfo.skuId,
          quantity: this.productNum,
        },
      ]

      const { list } = await this.$api.cart
        .checkInventory(checkList)
        .catch(() => {
          return false
        })
      if (this.isEmpty(list)) {
        return false
      }
      const result = list.find((item) => {
        return item.passed === false
      })
      if (result) {
        passed = result.passed
        this.checkedSkuInfo.stock = result.quantity
      }
      return passed
    },
    // 若登录，则将cookie中购物车数据上传到服务器上
    async uploadCartData() {
      const isLogin = this.isLogin
      if (isLogin && this.cartData.length) {
        const result = await this.$api.cart.uploadCartData(this.cartData)
        // 上传cookie中的数据到服务器上
        if (result) {
          // 上传后清空缓存数据
          this.$store.commit('SET_CARTDATA', [])
        }
      }
    },
    /**
     * 上传商品的浏览记录
     * 1、未登录时 cookie保存浏览的spuId，最多20个，超过20个，优先去除初始加入的spuId
     * 2、登录时 将当前的spuId上传
     */
    uploadBrowseProduct() {
      const { spuId } = this.product
      const token = this.$cookies.get('token')
      if (!spuId) {
        return false
      }
      if (token) {
        this.$api.product.uploadBrowseRecord([spuId])
      } else {
        const historyProduct = JSON.parse(JSON.stringify(this.historyProduct))
        const cookieSpuIds = historyProduct || []
        // 最新的添加在最前面
        if (!cookieSpuIds.includes(spuId)) {
          cookieSpuIds.unshift(spuId)
        }
        if (cookieSpuIds.length > 20) {
          // 从后往前删除
          cookieSpuIds.pop()
        }
        this.$store.commit('SET_HISTORY_PRODUCT', cookieSpuIds)
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
