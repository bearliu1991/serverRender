import { getQueryString, clipBorad } from '@assets/js/utils.js'
export default {
  data() {
    return {
      orderList: [],
      addressForm: {},
      pageSize: 10,
      pageNum: 1,
      totals: 0,
      orderInfo: '',
      reasonList: [],
      reasonId: '',
      reason: '',
      // 是否编辑地址
      isEditAddress: false,
      // 是否点击取消
      isCancel: false,
      // 是否显示信用卡弹框
      isCreditCard: false,
      orderNo: '',
      paymentType: '',
    }
  },
  mounted() {
    this.queryReasons()
    this.orderNo = getQueryString('orderNo')
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
              event: 'toPay',
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
    handlerEvent(eventType, orderNo, paymentType) {
      this.orderNo = orderNo || this.orderNo
      this.paymentType = paymentType || this.paymentType
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
      const result = await this.$api.order.queryOrderDetail(this.orderNo)
      this.orderInfo = result
      this.addressForm = result.shipAddress
    },
    // 查询取消原因
    async queryReasons() {
      const result = await this.$api.order.queryReasons().catch(() => {
        return []
      })
      this.reasonList = result || []
      // 拆包商品
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
    cancelOrder() {
      this.isCancel = true
    },
    // 取消订单
    async toCancelOrder() {
      const { reasonId, orderNo, reason } = this
      let reasonData = reasonId
      if (!reasonId) {
        this.$toast('please select cancel', 2000)
        return false
      }
      if (reasonId === 6) {
        reasonData = reason
      }
      const result = await this.$api.order.cancelOrder(orderNo, reasonData)
      if (!result) {
        location.reload()
        this.isCancel = false
      }
    },
    // 添加购物车
    async addCart() {
      const token = this.$cookies.get('token')

      // 已登录时，将用户数据上传到服务器
      if (token) {
        const result = await this.$api.order
          .addOrderCart(this.orderNo)
          .catch((e) => {
            // 加车失败
            this.$toast(e.retInfo, 3000)
            return 'fail'
          })
        if (result !== 'fail') {
          this.$refs.smallCart.$children[0].show()
        }
      }
    },
    // 去支付
    toPay() {
      const { paymentType } = this
      // 校验信用卡支付
      if (paymentType === 1) {
        const result = this.$refs.payment.validPayment()
        if (!result) {
          return false
        }
      }
      this.payment()
    },
    // TODO 去支付
    async payment() {
      const { paymentType, orderNo } = this
      const returnURL = '/payment/result'

      const result = await this.$api.payment
        .toPay({
          orderNo,
        })
        .catch(() => {
          this.$router // TODO adyen支付 自动跳转到成功或者失败
            .push({
              path: returnURL,
              query: {
                orderNo,
                type: 'cancel',
              },
            })
          return 'fail'
        })
      if (result !== 'fail') {
        if (paymentType !== 1) {
          // 设置afterPay token
          const { redirectUrl } = result
          // 重定向到支付页面
          location.href = redirectUrl
        } else if (paymentType === 1) {
          // 信用卡支付
          this.$router // TODO adyen支付 自动跳转到成功或者失败
            .push({
              path: returnURL,
              query: {
                orderNo,
                type: 'success',
              },
            })
        }
      }
    },
    // 修改地址
    async updateAddress() {
      const isValid = await this.$refs.address.validForm()
      if (!isValid) {
        return false
      }
      const { orderNo, addressForm } = this
      const result = await this.$api.order.updateShipAddress(orderNo, {
        addressFirst: addressForm.addressFirst,
        addressSecond: addressForm.addressSecond,
      })
      if (!result) {
        location.reload()
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
    // 显示编辑地址弹框
    showAddress() {
      this.isEditAddress = true
    },
    // 复制粘贴
    executeClipboard() {
      const text = this.orderInfo.orderNo
      const res = clipBorad(text)
      if (res) {
        this.$toast('Order number has been copied', 2000)
      }
    },
  },
}
