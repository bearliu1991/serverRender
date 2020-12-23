export default {
  data() {
    return {
      orderList: [],
      pageSize: 20,
      pageNum: 1,
      totals: 0,
    }
  },
  mounted() {
    this.queryOrderList()
    window.scrollTo(0, 0)
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
              event:"handlerTrack"
            },
          ]
          break
        case 10:
          btns = [
            {
              btnName: 'Cancel',
              event:'handlerCancel'
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
              event:'goRepurchase'
            },
          ]
          break
        default:
          btns = [
            {
              btnName: 'Order Detail',
            },
          ]
          break
      }
      return btns
    },
    // 订单列表按钮事件入口
    handlerEvent(eventType) {
      console.log(eventType)
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
    async queryOrderDetail(orderNo) {
      const { list = [] } = await this.$api.order
        .queryOrderDetail(orderNo)
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      this.orderList = list
    },
    // 打开订单详情页
    toOrderDetail() {
     this.$router.push('/')
    }
  },
}
