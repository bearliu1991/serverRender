import { mapState } from 'vuex'
export default {
  props: {
    product: {
      type: Object,
      default: () => {
        return {}
      },
    },
    relateData: {
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
      isSubmit: false,
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
      ],
      imgIndex: 0,
      productTypes: ['swimsuit'],
    }
  },
  computed: {
    ...mapState(['cartData', 'historyProduct']),

    // 缺货状态   0 全部缺货  1 部分缺货  2 无
    stockStatus() {
      const { productNum } = this
      const { stock } = this.checkedSkuInfo
      if (stock === 0) {
        this.productNum = 0
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
        this.handlerService(value)
        this.setDefaultProduct(value)
      },
    },
  },
  destroyed() {
    // 上传浏览记录
    this.uploadBrowseProduct()
  },
  methods: {
    // 处理服务信息
    handlerService(value) {
      const { productTypes } = this
      this.serviceList[1].content = value.shipping || ''
      this.serviceList[2].content = value.returnExchange || ''
      // 添加care service
      if (productTypes.includes(value.productType)) {
        this.serviceList.push({
          title: 'PRODUCT CARE',
          content: ``, // 内容固定在页面上
        })
      }
    },
    // 设置默认的sku
    setDefaultProduct(value) {
      const { isEmpty, checkedSkuInfo } = this
      if (isEmpty(checkedSkuInfo)) {
        const result = value.skuList.find((item) => {
          return item.stock > 0
        })
        this.checkedSkuInfo = result || value.skuList[0]
      }
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
      const token = this.$cookies.get('token')
      this.isSubmit = true
      // 校验库存
      const passed = await this.checkInventory()
      if (!passed) {
        this.isSubmit = false
        this.$toast('add cart fail')
        return false
      }

      // 已登录时，将用户数据上传到服务器
      if (token) {
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
            this.$toast(e.retInfo, 3000)
            return 'fail'
          })
        this.isSubmit = false
        if (result !== 'fail') {
          this.$refs.smallCart.$children[0].show()
        }
      } else {
        this.cookieCart()
        this.isSubmit = false
        this.$refs.smallCart.$children[0].show()
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
        cacheCartData.unshift(activeCartData)
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
        this.$api.product.uploadBrowseRecord([spuId]).catch(() => {})
      } else {
        const historyProduct = JSON.parse(JSON.stringify(this.historyProduct))
        const cookieSpuIds = historyProduct || []
        // 若包含  则删除，在头部添加  若不包含，直接在头部添加
        const index = cookieSpuIds.findIndex((item) => {
          return item === spuId
        })
        if (index > -1) {
          cookieSpuIds.splice(index, 1)
        }
        cookieSpuIds.unshift(spuId)
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
    // player(index) {
    //   const vdo = document.getElementById(`v${index}`)
    //   if (vdo.paused) {
    //     vdo.play()
    //   } else {
    //     vdo.pause()
    //   }
    // },
  },
}
