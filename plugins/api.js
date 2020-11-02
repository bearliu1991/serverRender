export default ({ store, app: { $http, $cookies } }, inject) => {
  inject('api', {
    // 用户模块
    customer: {
      /**
       * 用户登录接口
       * @param {* email password} params
       */
      login(params) {
        return $http.post('/customer', '/login', params)
      },
      /**
       * 用户注册接口
       * @param {* email password confirmPassword} params
       */
      register(params) {
        return $http.post('/customer', '/register', params)
      },
      /**
       * 用户登出接口
       * @param {* email password confirmPassword} params
       */
      logout(customerId) {
        return $http.post('/customer', '/logout', {
          customerId,
        })
      },
      /**
       * 修改密码
       * @param {*} params
       */
      changePassword(params) {
        return $http.post('/customer', '/change/password', params)
      },
      /**
       * 订阅接口
       * @param {*} email
       */
      subscribe(email) {
        return $http.post('/customer', '/subscribe', {
          email,
        })
      },
      /**
       * 获取用户默认地址
       * @param {*} email
       */
      getCustomerAddress(email) {
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
    },
    // 分类模块
    collection: {
      // 获取分类yBanner图
      getBannerByCollection(collectionId) {
        return $http.post('/api', '/PPC1001001', {
          collectionId,
        })
      },
      /**
       * 根据collectionId获取搜索条件
       * @param {*} collectionId
       */
      searchCondition(collectionId) {
        return $http.post('/api', '/PPC1001002', {
          collectionId,
        })
      },
      /**
       * 根据搜索条件获取product
       * @param {*} params
       */
      productSkusByCollection(params) {
        return $http.post('/api', '/PPC1001003', params)
      },
    },
    // 商品模块
    product: {
      /**
       * 商品详情基础信息查询
       * @param {*} spuId 商品SpuId
       */
      detailBaseInfo(spuId) {
        return $http.post('/api', '/PPB1001001', {
          spuId,
        })
      },
      /**
       * 根据skuIds批量查询商品
       * @param {*} skuIds
       */
      queryBatchProductBySkuId(skuIdList) {
        return $http.post('/api', '/PPI1001001', {
          skuIdList,
        })
      },
      // 1、关联产品信息查询
      queryRelatedPrd(spuId) {
        return $http.post('/api', '/PPR1001001', {
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
        return $http.post('/api', '/PPG1001001', {
          fromId,
          collectionId,
          spuId,
        })
      },
      // 上传浏览记录
      uploadBrowseRecord(spuIds) {
        return $http.post('/api', '/PPS1001001', {
          useId: '',
          spuIds,
        })
      },
      // 2、浏览记录 已登录和未登录
      queryBrowseRecord(isLogin) {
        if (isLogin) {
          // 已登录
          return $http.post('/api', '/PPS1001002', {
            useId: '',
          })
        } else {
          const spuIds = $cookies.get('cookie_product_spuIds')
          // 未登录
          return $http.post('/api', '/PPS1001003', {
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
        const userId = store.state.userInfo.id
        return $http.post('/api', '/v1/cart/CRT1001001', {
          userId,
        })
      },
      /**
       * 加入购物车
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      addCart(params) {
        return $http.post('/api', '/v1/cart/CAR1001002', params)
      },
      /**
       * 已登录用户购物车加/减车操作
       * 前端计算好加车数量提交至后端，后端会做库存校验、SKU聚合等相关操作
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      updateCart(params) {
        return $http.post('/api', '/v1/cart/CRT1001002', params)
      },
      /**
       * 已登录 购物车移除
       * @param {userId，spuId，skcId，skuId} params
       */
      removeCart(params) {
        return $http.post('/api', '/v1/cart/CRT1001004', params)
      },
      /**
       * 将未登录时用户添加的购物车数据转用户
       * @param {*} userId
       * @param {*} email
       * @param {*} goods
       */
      uploadCartData(goods) {
        const userId = store.state.userInfo.id
        const email = store.state.userInfo.email
        return $http.post('/api', '/v1/cart/CRT1001006', {
          userId,
          email,
          goods,
        })
      },
      /**
       * 购物车和checkout界面订单价格更新
       * @param {*} params
       */
      updatePrice(params) {
        let userId = ''
        let email = ''
        if (store.state.userInfo) {
          userId = (store.state.userInfo && store.state.userInfo.id) || ''
          email = store.state.userInfo.email
        }
        return $http.post('', '/v1/cart/CRT1001007', {
          ...{
            userId,
            email,
          },
          ...params,
        })
      },
      /**
       * 校验商品库存
       * @param {} useId 非必须
       * @param {skuId,quantity} checkList
       */
      checkInventory(checkList) {
        const userId = store.state.userInfo.id
        return $http.post('/test', '/api/v1/cart/CRT1001005', {
          userId,
          checkList,
        })
      },
    },
    order: {},
    navigation: {
      /**
       * 导航查询
       * @param {*} terminal 终端。0-PC端，1-M端。
       * @param {*} location 导航位置。0-头部导航，1-尾部导航
       **/
      navigationInfo(terminal, location) {
        return $http.post('/api', '/PNM1001001', {
          terminal,
          location,
        })
      },
    },
  })
}
