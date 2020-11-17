// import { emailRule } from '@assets/js/rules.js'
import { mapState } from 'vuex'
import { isEmpty } from '@assets/js/utils.js'
export default {
  data() {
    return {
      step: 1,
      orderSummary: {
        // 购物车商品信息
        cartList: [],
        // 订单价格
        orderPrice: {},
        totalWeight: 0,
        totalPrice: 0,
      },
      // 接口参数
      orderParams: {
        productList: [],
        cust: {
          subscribeEmail: true,
          saveAddress: true,
          email: '',
        },
        // 物流
        delivery: {},
        // 购物车id
        cartIdList: '',
        shipAddress: {},
        billAddress: {},
        sameShip: 1,
        userRemark: '',
        countryCode: '',
      },
      // 支付
      payment: {
        // 支付类型（1-Credit card，2-PayPal，3-afterpay）
        paymentType: '',
        paymentName: '',
        cardNo: '',
        cardName: '',
        expiryMonth: '',
        expiryYear: '',
        securityCode: '',
        currencyCode: '',
        subtotal: '',
        total: '',
      },
      // 订单确认页营销活动
      activity: {
        // 礼品卡 1
        giftCard: {
          // 礼品卡号
          giftCardNo: '',
          // 礼品卡抵扣总金额
          giftCardAmount: '',
        },
        // 优惠券 2
        coupon: {
          // 折扣券号
          couponNo: '',
          // 折扣券抵扣总金额
          couponAmount: '',
        },
      },
    }
  },
  provide() {
    return {
      orderParams: this.orderParams,
      orderSummary: this.orderSummary,
      updateAddress: this.updateAddress,
      payment: this.payment,
      buildOrder: this.buildOrder,
      updatePrice: this.updatePrice,
      activity: this.activity,
    }
  },
  computed: mapState([
    // 映射 this.count 为 store.state.count
    'checkoutData',
  ]),
  created() {
    // 1、合并参数
    this.handlerReqParams()
    // 2、查询商品 算价
    this.buildOrder()
  },
  destroyed() {
    this.$store.commit('SET_CHECKOUT_RECORD', {})
  },
  //  查商品   查地址  查用户信息   折扣券  支付方式   物流   结算
  methods: {
    // 初始化请求参数
    handlerReqParams() {
      const { products, cartIdList } = this.$route.query

      this.orderParams = Object.assign(this.orderParams, {
        productList: products ? JSON.parse(products) : [],
        cartIdList: cartIdList || '',
      })
      // // 若已登录，默认邮箱
      this.orderParams.cust.email = this.loginInfo.email
      // 注入国家码
      this.orderParams.countryCode = this.configData.AU.countryCode
      // 当前页面的历史记录
      if (!isEmpty(this.checkoutData)) {
        const { cust } = this.checkoutData
        const self = this
        this.orderParams.cust = cust
        // 自动提交校验一次
        setTimeout(function () {
          self.validSubmit()
        })
      }
    },
    buildOrder() {
      this.queryProduct()
    },
    // 更新ship he bill 地址
    updateAddress(type, value) {
      this.orderParams[`${type}Address`] = value
    },
    /**
     * 根据skuId查询商品
     */
    async queryProduct() {
      const stocks = []
      const outStocks = []
      const { productList } = this.orderParams
      const skuIds = productList.reduce((skuId, value) => {
        skuId.push(value.skuId)
        return skuId
      }, [])
      const { list = [] } = await this.$api.product.queryBatchProductBySkuId(
        skuIds
      )
      if (list && list.length) {
        list.forEach((element, index) => {
          element = { ...element, ...productList[index] }
          // sku状态。0-在售，1-缺货，2-下架
          if (element.skuState !== 0 || element.quantity > element.stock) {
            outStocks.push(element)
          } else {
            stocks.push(element)
          }
          const { roughWeight, discountPrice, quantity } = element
          const { totalWeight, totalPrice } = this.orderSummary
          // 计算商品总重量
          this.orderSummary.totalWeight = totalWeight + roughWeight
          this.orderSummary.totalPrice =
            Number(parseFloat(discountPrice).toFixed(2) * quantity) +
            Number(parseFloat(totalPrice).toFixed(2))
        })
        this.orderSummary.cartList = stocks.concat(outStocks)
        // 算价
        this.updatePrice()
      }
    },
    /**
     * 算价
     */
    async updatePrice() {
      const { productList } = this.orderParams

      const result = await this.$api.cart.updatePrice({
        goods: productList,
      })
      if (result) {
        const { disGiftCardAmount, disCouponAmount } = result
        this.orderSummary.orderPrice = result
        if (disGiftCardAmount) {
          this.activity.giftCard.giftCardAmount = disGiftCardAmount
        }
        if (disCouponAmount) {
          this.activity.coupon.couponAmount = disCouponAmount
        }
      }
    },
    // 返回前一步
    onPrev(val) {
      this.step = val
      this.$refs.contract.focus()
    },
    /**
     * 下单按钮 点击payNow
     * @param {*} val
     */
    onSubmit(val) {
      if (val === 1) {
        const result = this.validSubmit()
        if (result) {
          // 进入下一步的校验
          this.step = val + 1
          this.$refs.payment.queryPayment()
        } else {
          // 更新cookie
          this.$store.commit(
            'SET_CHECKOUT_RECORD',
            JSON.parse(JSON.stringify(this.orderParams))
          )
        }
      } else {
        const { sameShip, shipAddress } = this.orderParams
        // pay now
        if (sameShip === 2) {
          const flag = this.$refs.bill.$refs.address.validForm()
          if (!flag) {
            return false
          }
        } else {
          this.orderParams.billAddress = shipAddress
        }
        // 创建订单
        this.createOrder()
      }
    },
    /**
     * 合并创建订单参数
     */
    handlerSubmitParams() {
      const { orderParams, activity, payment } = this
      const { shipAddress, delivery } = orderParams
      const { currencyCode } = this.configData.AU
      const { subtotal, total } = this.orderSummary.orderPrice
      const { countryId, country, stateId, state } = shipAddress
      // 物流
      this.orderParams.delivery = {
        countryId,
        country,
        stateId,
        state,
        shipId: delivery.transportId,
      }
      // 支付参数
      this.orderParams.payment = {
        ...payment,
        ...{
          subtotal,
          total,
          currencyCode,
        },
      }
      this.orderParams = {
        ...orderParams,
        ...activity,
      }
    },
    async createOrder() {
      // 1、处理提交订单参数
      this.handlerSubmitParams()
      console.log('创建订单')
      const result = await this.$api.order.createOrder(this.orderParams)
      console.log(result)
    },
    toPay() {},
    /**
     * 提交校验
     */
    validSubmit() {
      const contractFlag = this.$refs.contract.validForm()
      const shipFlag = this.$refs.ship.$refs.address.validForm()

      if (contractFlag && shipFlag) {
        return true
      }
      return false
    },
  },
}
