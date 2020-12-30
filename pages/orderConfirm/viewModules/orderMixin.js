// import { emailRule } from '@assets/js/rules.js'
import { mapState } from 'vuex'
import { setAnchorPoint } from '@assets/js/utils.js'
export default {
  data() {
    return {
      step: 1,
      isFocus: false,
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
        isChange: false,
        isSubmit: false,
        outStockNum: 0,
        productList: [],
        cust: {
          subscribeEmail: true,
          saveAddress: true,
          email: '',
        },
        // 物流
        delivery: {
          shipId: '',
        },
        deliverInfo: {},
        // 购物车id
        cartIdList: '',
        shipAddress: {},
        billAddress: {},
        sameShip: 1,
        userRemark: '',
        countryCode: '',
        // 是否含有礼品卡商品
        hasGiftProduct: false,
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
        subTotal: '',
        total: '',
      },
      // 1-礼品卡，2-折扣码
      discounts: {},
      // 订单确认页营销活动
    }
  },
  provide() {
    return {
      orderParams: this.orderParams,
      orderSummary: this.orderSummary,
      payment: this.payment,
      buildOrder: this.buildOrder,
      updatePrice: this.updatePrice,
      discounts: this.discounts,
    }
  },
  inject: ['reload'],
  computed: mapState([
    'cookieDeliveryed',
    'cartData',
    // 映射 this.count 为 store.state.count
    'cookieShipAddress',
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
      const { products, cartIdList, pageType } = this.$route.query
      const { get } = this.$cookies
      this.orderParams = Object.assign(this.orderParams, {
        productList: products ? JSON.parse(products) : [],
        cartIdList: cartIdList || '',
      })
      this.step = +pageType || 1
      if (pageType === 1) {
        this.$store.commit('SET_DELIVERYED_DATA', null)
      }

      // 商品为空，显示空页面
      // // 若已登录，默认邮箱
      this.orderParams.cust.email = this.loginInfo.email
      // 注入国家码
      this.orderParams.countryCode = this.configData.AU.countryCode

      if (!get('token')) {
        // 未登录时默认选中订阅
        this.orderParams.cust.subscribeEmail = true
        // 未登录 默认不勾选，选中后保存到cookie中
        this.orderParams.cust.saveAddress = false
      } else {
        // 登录用户 未订阅展示  已订阅不展示
        this.orderParams.cust.subscribeEmail = this.loginInfo.isSubscribe !== 1
      }
    },
    buildOrder() {
      this.queryProduct()
      // 设置默认页面
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
      if (skuIds.length === 0) {
        // 打开错误页面
        return false
      }
      const { list = [] } = await this.$api.product.queryBatchProductBySkuId(
        skuIds
      )
      if (list && list.length) {
        list.forEach((element, index) => {
          element = { ...element, ...productList[index] }
          // sku状态。0-在售，1-缺货，2-下架
          if (element.skuState !== 0) {
            outStocks.push(element)
          } else {
            if (element.productType === 'GIFT CARD') {
              this.orderParams.hasGiftProduct = true
            }
            stocks.push(element)
            const {
              roughWeight,
              discountPrice,
              quantity,
              retailPrice,
            } = element
            const { totalWeight, totalPrice } = this.orderSummary

            // 计算商品总重量
            this.orderSummary.totalWeight = totalWeight + roughWeight
            this.orderSummary.totalPrice =
              Number(
                parseFloat(discountPrice || retailPrice).toFixed(2) * quantity
              ) + Number(parseFloat(totalPrice).toFixed(2))
          }
        })
        // 无库存商品数量
        this.orderParams.outStockNum = outStocks.length
        this.orderSummary.cartList = outStocks.concat(stocks)
        // 算价
        this.updatePrice()
      }
    },
    /**
     * 算价
     */
    async updatePrice() {
      const { discounts } = this
      const promotions = []
      const {
        productList,
        delivery: { shipId = '' },
        shipAddress: { country = '', countryId = '', state = '', stateId = '' },
      } = this.orderParams
      // 物流 地址信息

      const address = {
        shipId,
        country,
        countryId,
        state,
        stateId,
      }

      // 促销信息
      const flag = this.isEmpty(discounts)
      if (!flag) {
        for (const key in discounts) {
          promotions.push({
            code: discounts[key].code,
            category: discounts[key].category,
            // codeType: discounts[key].codeType,
          })
        }
      }
      const params = {
        goods: productList,
        discounts: promotions,
      }
      if (shipId) {
        params.address = address
      }
      const self = this
      // 算价
      const result = await this.$api.cart
        .updatePrice(params)
        .catch(function (error) {
          // 说明是促销接口的错误
          if (error.retCode && error.retCode.includes('MS')) {
            self.$refs.summary.$children[0].$refs.coupon.showError(error)
          }
        })
      if (result) {
        this.orderSummary.orderPrice = result
        this.updateCouponPrice(result)
      }
    },
    // 更新优惠券价格
    updateCouponPrice(result) {
      const { disGiftCardAmount, disCouponAmount } = result
      if (disGiftCardAmount) {
        this.discounts[1].amount = disGiftCardAmount
      }
      if (disCouponAmount) {
        this.discounts[2].amount = disCouponAmount
      }
    },
    /**
     * 下单按钮 点击payNow
     * @param {*} val
     */
    async onSubmit(val) {
      const {
        cust: { saveAddress },
        sameShip,
        isSubmit,
        shipAddress,
        productList,
      } = this.orderParams
      if (val === 1) {
        // 校验用户信息， 地址 ship method
        const result = await this.validSubmit()
        if (result) {
          // 设置物流是否变更的状态
          this.orderParams.isChange = false
          // 保存选中的物流方式
          this.$store.commit(
            'SET_DELIVERYED_DATA',
            this.orderParams.deliverInfo
          )
          // 点击第一步按钮，保存ship address
          if (saveAddress) {
            this.$store.commit(
              'SET_ADDRESS',
              JSON.parse(JSON.stringify(this.orderParams.shipAddress))
            )
          }
          // 进入下一步的校验
          this.step = val + 1
          // 查询支付方式
          this.$refs.payment.queryPayment()

          // 设置url记录
          this.setHistoryPage()
        }
      } else {
        // 支付方式
        const { paymentType } = this.payment
        // pay now
        if (sameShip === 2) {
          // 与ship不一致时，校验bill address
          const flag = await this.$refs.bill.$refs.address.validForm()
          if (!flag) {
            return false
          }
        } else {
          this.orderParams.billAddress = shipAddress
        }
        if (!paymentType) {
          this.$alert('请选择支付方式')
          return false
        }
        // 校验信用卡支付
        if (paymentType === 1) {
          const result = this.$refs.payment.validPayment()
          if (!result) {
            return false
          }
        }
        // 校验库存
        const list = await this.checkInventory(productList)

        // 库存校验不通过，提示
        if (list.length > 0) {
          // 处理异常
          this.handlerOrderError({
            retCode: 'OS2000003',
          })
          return false
        }
        if (isSubmit) {
          return false
        }
        // 按钮是否提交的标识
        this.orderParams.isSubmit = true
        // 创建订单
        this.createOrder()
      }
    },
    // TODO 创建订单
    async createOrder() {
      // 1、处理提交订单参数
      const createParam = this.handlerSubmitParams()

      const result = await this.$api.order
        .createOrder(createParam)
        .catch((error) => {
          // 按钮是否提交的标识
          this.orderParams.isSubmit = false
          // 处理订单异常
          this.handlerOrderError(error)
        })
      if (result) {
        // 未登录的用户需清除购物车
        this.removeCart(createParam.productList)
        // 创建订单成功，去支付
        this.toPay(result.orderNo)
      }
    },
    // 未登录用户下单删除购物车
    removeCart(productList) {
      const token = this.$cookies.get('token')
      const newData = []
      if (!token) {
        const cookieCartGoods = JSON.parse(JSON.stringify(this.cartData)) || []
        cookieCartGoods.forEach((item) => {
          const index = productList.findIndex((subItem) => {
            return subItem.skuId === item.skuId
          })
          if (index === -1) {
            newData.push(item)
          }
        })
        this.$store.commit('SET_CARTDATA', newData)
      }
    },
    // TODO 去支付
    async toPay(orderNo) {
      const { paymentType } = this.payment
      const returnURL = 'payment/result'

      const baseOptions = {
        orderNo,
      }

      const result = await this.$api.payment.toPay(baseOptions).catch(() => {
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
    /**
     * 合并创建订单参数
     */
    handlerSubmitParams() {
      const promotions = []
      const { orderParams, discounts, payment } = this
      const {
        shipAddress,
        delivery,
        productList,
        cust,
        countryCode,
        billAddress,
        userRemark,
        cartIdList,
      } = orderParams
      const { currencyCode } = this.configData.AU
      const {
        subtotal,
        total,
        disCouponAmount,
        disGiftCardAmount,
      } = this.orderSummary.orderPrice
      if (this.isEmpty(payment.paymentType)) {
        return false
      }

      // 促销信息
      const flag = this.isEmpty(discounts)
      if (!flag) {
        for (const key in discounts) {
          if (discounts[key].category === '1') {
            discounts[key].amount = disGiftCardAmount
          } else {
            discounts[key].amount = disCouponAmount
          }
          promotions.push(discounts[key])
        }
      }
      // 支付参数
      const paymentInfo = {
        ...payment,
        ...{
          subtotal,
          total,
          currencyCode,
        },
      }
      const createParam = {
        cartIdList,
        productList,
        cust,
        countryCode,
        shipAddress,
        billAddress,
        userRemark,
        discounts: promotions,
        delivery,
        payment: paymentInfo,
      }

      return createParam
    },
    /**
     * 移动端处理异常滚动到锚点
     */
    handlerAnchor() {
      // 展开商品
      this.$refs.summary.$children[0].isShow = true
      // 定位到异常商品区域
      setAnchorPoint('#outStockArea')
    },
    /**
     * 处理订单异常
     * @param {*} error
     */
    handlerOrderError(error) {
      // // 创建订单失败，请重新刷新购物车
      if (error.retCode === 'OS2000001' || error.retCode === 'OS2000002') {
        this.reload()
      } else if (error.retCode === 'OS2000003') {
        // 刷新商品
        this.step = 2
        this.buildOrder()
        this.handlerProductError()
      } else {
        this.$toast('create order fail')
      }
    },
    // 商品下架或者库存异常提示
    handlerProductError() {
      const outStockTips =
        'Unfortunately, some items in your shopping bag are understock, please remove before check out.'
      this.$alert({
        text: outStockTips,
        isConfirm: false,
        isCancel: true,
        cancel: 'OK',
      }).catch(() => {
        // 定位到异常商品区
        this.handlerAnchor()
        // 滚动到下架商品区域
        return false
      })
    },
    /**
     * 提交校验
     * 1、校验用户信息
     * 2、校验shipaddress
     */
    async validSubmit() {
      const contractFlag = this.$refs.contract.validForm()
      const shipFlag = await this.$refs.ship.$refs.address.validForm()
      if (contractFlag && !this.isEmpty(shipFlag)) {
        return true
      }
      return false
    },
    // 校验库存
    async checkInventory(checkList) {
      const { list } = await this.$api.cart.checkInventory(checkList)
      if (list && list.length > 0) {
        const result = list.filter((item) => {
          return item.passed === false
        })
        return Promise.resolve(result)
      }
    },
    // 返回前一步
    onPrev(val, moduleId) {
      this.step = val
      this.$nextTick(function () {
        // 定位到地址  contrack  method区域
        setAnchorPoint('#module_' + moduleId)
      })
      // 设置url记录
      this.setHistoryPage()
    },
    // 设置当前页的操作记录
    setHistoryPage() {
      const { productList, cartIdList } = this.orderParams
      const pageType = this.step
      this.$router.replace({
        name: 'orderConfirm',
        query: {
          products: JSON.stringify(productList),
          cartIdList,
          pageType,
        },
      })
    },
  },
}
