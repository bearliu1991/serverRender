export default ({ store, app: { $http, $cookies } }, inject) => {
  inject('api', {
    // 用户模块
    customer: {
      /**
       * 用户登录接口
       * @param {* email password} params
       */
      login(params) {
        return $http.post('/customer', '/CL1001001', params)
      },
      /**
       * 游客登录
       * @param {*} email
       */
      guestLogin(email) {
        return $http.post('/customer', '/CL1001007', { email })
      },
      /**
       * 用户注册接口
       * @param {* email password confirmPassword} params
       */
      register(params) {
        return $http.post('/customer', '/CL1001003', params)
      },
      /**
       * 用户登出接口
       * @param {* email password confirmPassword} params
       */
      logout() {
        return $http.post('/customer', '/CL1001002', {})
      },
      /**
       * 修改密码
       * @param {*} params
       */
      changePassword(params) {
        return $http.post('/customer', '/CL1001005', params)
      },
      // 修改用户名接口
      modifyUserName(customerName) {
        return $http.post('/customer', '/CL1001008', {
          customerName,
        })
      },
      // 查询用户信息
      queryUserInfo() {
        return $http.post('/customer', '/CL1001009', {})
      },
      /**
       * 订阅接口
       * @param {*} email
       */
      subscribe(email) {
        return $http.post('/customer', '/CL1001004', {
          email,
        })
      },
      /**
       * 刷新token
       * @param {*} email
       */
      refreshToken() {
        return $http.post('/customer', '/CL1001006', {})
      },
    },
    // 分类模块
    collection: {
      // 获取分类yBanner图
      getBannerByCollection(collectionId) {
        return $http.post('/product', '/PPC1001001', {
          collectionId,
        })
      },
      /**
       * 根据collectionId获取搜索条件
       * @param {*} collectionId
       */
      searchCondition(collectionId) {
        return $http.post('/product', '/PPC1001002', {
          collectionId,
        })
      },
      /**
       * 根据搜索条件获取product
       * @param {*} params
       */
      productSkusByCollection(params) {
        return $http.post('/product', '/PPC1001003', params)
      },
    },
    // 商品模块
    product: {
      /**
       * 商品详情基础信息查询
       * @param {*} spuId 商品SpuId
       */
      detailBaseInfo(spuId) {
        return $http.post('/product', '/PPB1001001', {
          spuId,
        })
      },
      /**
       * 根据skuIds批量查询商品
       * @param {*} skuIds
       */
      queryBatchProductBySkuId(skuIdList) {
        return $http.post('/product', '/PPI1001001', {
          skuIdList,
        })
      },
      // 到货通知
      queryArrivalNotice(params) {
        return $http.post('/product', '/PPU1001001', params)
      },
      // 1、关联产品信息查询
      queryRelatedPrd(spuId) {
        return $http.post('/product', '/PPR1001001', {
          spuId,
        })
      },
      /**
       * 猜你喜欢
       * @param {*} fromId 1：分类，2：其他
       * @param {*} collectionId 分类id
       * @param {*} spuId
       */
      queryLikePrd(spuId, fromId = 2, collectionId = '') {
        return $http.post('/product', '/PPG1001001', {
          fromId,
          collectionId,
          spuId,
        })
      },
      // 上传浏览记录
      uploadBrowseRecord(spuIds) {
        return $http.post('/product', '/PPS1001001', {
          spuIds,
        })
      },
      // 2、浏览记录 已登录和未登录
      queryBrowseRecord() {
        const token = $cookies.get('token')
        const spuIds = store.state.historyProduct
        if (token) {
          // 已登录
          return $http.post('/product', '/PPS1001002', {})
        } else if (spuIds) {
          // 未登录
          return $http.post('/product', '/PPS1001003', {
            spuIds,
          })
        }
      },
    },
    // 购物车模块
    cart: {
      /**
       * 已登录用户查询购物车
       * @param {*} userId
       */
      queryCart() {
        return $http.post('/order', '/v1/cart/CRT1001001', {})
      },
      /**
       * 已登录用户购物车加车操作
       * 前端计算好加车数量提交至后端，后端会做库存校验、SKU聚合等相关操作
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      addCart(params) {
        return $http.post('/order', '/v1/cart/CRT1001002', params)
      },
      /**
       * 已登录用户购物车加/减车操作
       * 前端计算好加车数量提交至后端，后端会做库存校验、SKU聚合等相关操作
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      updateCart(params) {
        return $http.post('/order', '/v1/cart/CRT1001003', params)
      },
      /**
       * 已登录 购物车移除
       * @param {userId，spuId，skcId，skuId} params
       */
      removeCart(params) {
        return $http.post('/order', '/v1/cart/CRT1001004', params)
      },
      /**
       * 将未登录时用户添加的购物车数据转用户
       * @param {*} userId
       * @param {*} email
       * @param {*} goods
       */
      uploadCartData(goods) {
        return $http.post('/order', '/v1/cart/CRT1001006', {
          ...{
            goods,
          },
          // ...store.state.loginInfo,
        })
      },
      /**
       * 购物车和checkout界面订单价格更新
       * @param {*} params
       */
      updatePrice(params) {
        return $http.post('/order', '/v1/cart/CRT1001007', params)
      },
      /**
       * 校验商品库存
       * @param {} useId 非必须
       * @param {skuId,quantity} checkList
       */
      checkInventory(checkList) {
        return $http.post('/order', '/v1/cart/CRT1001005', {
          checkList,
        })
      },
    },
    order: {
      /**
       * 创建订单
       * @param {*} params
       */
      createOrder(params) {
        return $http.post('/order', '/v1/order/ORD1001001', params)
      },
      /**
       * 查询订单详情
       * @param {*} params
       */
      queryOrderDetail(orderNo) {
        return $http.post('/order', '/v1/order/ORD1001003', {
          orderNo,
        })
      },
      /**
       * 查询订单列表
       * @param {*} params
       */
      queryOrderList(params) {
        return $http.post('/order', '/v1/order/ORD1001002', params)
      },
      /**
       *查询某区域的物流方式以及运费
       * @param {*} params
       */
      queryTradeDelivery(params) {
        return $http.post('/public', '/trade/v1/TC1001001', params)
      },
      /**
       * 查询某区域的支付方式
       * @param {*} params
       */
      queryPaymentMethods(params) {
        return $http.post('/public', '/trade/v1/TC1001003', params)
      },
      /**
       * 计算某物流方式的运费
       * @param {*} shipId 物流方式Id
       */
      queryTraderDeliveryFee(shipId) {
        return $http.post('/public', '/trade/v1/TC1001004', {
          shipId,
        })
      },
      /**
       * 校验折扣码类型
       * @param {*} code
       * @param {*} category
       */
      validCodeType(params) {
        return $http.post('/promotion', '/discount/v1/DIS1001003', params)
      },
      // 订单中商品加入购物车
      addOrderCart(orderNo) {
        return $http.post('/order', '/v1/order/ORD1001008', { orderNo })
      },
      // 查询订单取消原因列表
      queryReasons() {
        return $http.post('/order', '/v1/order/ORD1001005', {})
      },
      // 取消订单
      cancelOrder(orderNo, cancelReason) {
        return $http.post('/order', '/v1/order/ORD1001006', {
          orderNo,
          cancelReason,
        })
      },
    },
    payment: {
      /**
       *
       * @param {*} params
       */
      toPay(params) {
        return $http.post('/order', '/v1/pay/PAY1001001', params, {
          timeout: 5000,
        })
      },
      /**
       * afterPay 支付确认
       */
      paymentConfirm(orderNo) {
        return $http.post(
          '/order',
          '/v1/pay/PAY1001002',
          {
            orderNo,
          },
          {
            timeout: 5000,
          }
        )
      },
      queryPaymentResult(orderNo) {
        return $http.post('/order', '/v1/order/ORD1001004', {
          orderNo,
        })
      },
    },
    // 地址模块
    address: {
      /**
       * 查询地址区域
       * @param {*} category  获取大洲时传continent,获取国家时传country,获取国家下属州时传state,获取城市时传city；
       *                       若国家下不存在省/州state级时，则直接返回城市city的数据
       * @param {*} id  当前层级的id
       */
      queryAddressArea(category, id) {
        return $http.post('/public', '/trade/v1/TC1001002', {
          category,
          id,
        })
      },
      /**
       * 获取用户默认地址
       * @param {*} email
       */
      getDefaultAddress(email) {
        return $http.post('/customer', '/customer/address', {
          email,
        })
      },
      /**
       * 地址保存
       * @param {*firstName lastName telephone country 。。。。} params
       */
      saveAddress(params) {
        return $http.post('customer', '/address/add', params)
      },
      /**
       * 获取地址列表
       */
      getAddressList() {
        return $http.post('customer', '/CA1001001', {})
      },
      /**
       * 删除用户地址信息
       */
      deleteAddress(id) {
        return $http.post('customer', '/CA1001004', {
          id,
        })
      },
      /**
       * 更新地址
       */
      updateAddress(params) {
        return $http.post('customer', '/CA1001003', params)
      },
    },
    homePage: {
      /**
       * 导航查询
       * @param {*} terminal 终端。0-PC端，1-M端。
       * @param {*} location 导航位置。0-头部导航，1-尾部导航
       **/
      navigationInfo(terminal, location) {
        return $http.post('/product', '/PNM1001001', {
          terminal,
          location,
        })
      },
      /**
       * 首页查询
       **/
      homePageData() {
        return $http.post('/product', '/HHP1001001')
      },
    },
    config: {
      /**
       * 购物车配置查询
       **/
      queryCartConfig() {
        return $http.post('/order', '/v1/cart/CRT1001008')
      },
    },
  })
}
