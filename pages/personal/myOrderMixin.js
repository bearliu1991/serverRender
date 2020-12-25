import { getQueryString } from '@assets/js/utils.js'
export default {
  data() {
    return {
      orderList: [],
      pageSize: 15,
      pageNum: 1,
      totals: 0,
      orderInfo: '',
      productList: [],
      reasonList: [],
      isCartVisible: false,
      // 是否编辑地址
      isEditAddress: false,
      // 是否点击取消
      isCancel: false,
    }
  },
  mounted() {
    window.scrollTo(0, 0)
  },
  computed: {
    buttons() {
      const {
        getButtons,
        orderInfo: { state },
      } = this
      return getButtons(state)
    },
  },
  methods: {
    // 订单状态   10：未付款，20：支付处理中，30：已付款，40：已发货，
    // 50：已签收，60：取消订单，70：部分退款，80：全部退款
    getButtons(orderStatus) {
      let btns = []
      switch (orderStatus) {
        case 40:
          btns = [
            {
              btnName: 'Order Tracking',
              event: 'handlerTrack',
            },
          ]
          break
        case 10:
          btns = [
            {
              btnName: 'Cancel',
              event: 'cancelOrder',
            },
            {
              btnName: 'Complete Payment',
              type: 'primary',
            },
          ]
          break
        case 60:
          btns = [
            {
              btnName: 'Repurchase',
              type: 'primary',
              event: 'repurchase',
            },
          ]
          break
        default:
          btns = []
          break
      }
      return btns
    },
    // 订单列表按钮事件入口
    handlerEvent(eventType, orderNo) {
      this[eventType](orderNo)
    },
    // 分页加载
    handleCurrentChange(value) {
      this.pageNum = value
      this.queryOrderList()
    },
    // 查询订单列表
    async queryOrderList() {
      const { pageNum, pageSize } = this
      const { list = [], total } = await this.$api.order
        .queryOrderList({
          pageNum,
          pageSize,
        })
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      this.orderList = list
      this.totals = total
    },
    // 查询订单详情
    async queryOrderInfo() {
      const orderNo = getQueryString('orderNo')
      const result = await this.$api.order.queryOrderDetail(orderNo)
      this.orderInfo = result
      // 拆包商品
      this.handlerProducts(result.packageList)
    },
    // 查询取消原因
    async queryReasons() {
      const result = await this.$api.order.queryReasons().catch(() => {
        return []
      })
      this.reasonList = result || []
      // 拆包商品
    },
    // 合并商品
    handlerProducts(packageList) {
      packageList.forEach((item) => {
        const productList = item.productList
        productList.forEach((subItem) => {
          const { skuId, quantity, discountPrice, price } = subItem
          this.productList.push({
            skuId,
            spuId: '',
            skcId: '',
            quantity,
            retailPrice: price,
            discountPrice,
          })
        })
      })
    },
    // 重新购买
    repurchase() {
      const info =
        'Are you sure you want to add these items from this order to your shopping bag again?'
      this.$alert({
        text: info,
        isCancel: true,
        cancel: 'YES',
        confirm: 'No',
      }).catch(() => {
        // 加入购物车
        this.addCart()
      })
    },
    // 取消订单
    async cancelOrder(orderNo) {
      this.isCancel = true
      const result = await this.$api.order.cancelOrder(orderNo, this.reasonId)
      return result
    },
    // 添加购物车
    async addCart() {
      const token = this.$cookies.get('token')

      // 已登录时，将用户数据上传到服务器
      if (token) {
        const result = await this.$api.cart
          .uploadCartData(this.productList)
          .catch((e) => {
            // 加车失败
            this.$toast(e.retInfo, 3000)
            return 'fail'
          })
        this.isSubmit = false
        if (result !== 'fail') {
          this.isCartVisible = true
        }
      }
    },

    // 打开订单详情页
    toOrderDetail(orderNo) {
      this.$router.push({
        path: '/personal/orderDetail',
        query: {
          orderNo,
        },
      })
    },
    showAddress() {
      this.isEditAddress = true
    },
  },
}
