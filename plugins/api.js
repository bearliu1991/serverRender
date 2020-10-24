export default ({ app: { $http, $cookies } }, inject) => {
  inject('api', {
    /**
     * @param {*} params
     */
    // login(params) {
    //   return $http.post('/v1/login', params)
    // },
    // musicRankings(params) {
    //   return $http.get('/api', '/musicRankings', params)
    // },
    // videoCategory(params) {
    //   return $http.get('test', '/todayVideo', params)
    // },
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
    cart: {
      /**
       * 已登录用户查询购物车
       * @param {*} userId
       */
      queryCart(userId) {
        return $http.post('/api', '/api/v1/cart/CRT1001001', {
          userId,
        })
      },
      /**
       * 加入购物车
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      addCart(params) {
        return $http.post('/api', '/api/v1/cart/CAR1001002', params)
      },
      /**
       * 已登录用户购物车加/减车操作
       * 前端计算好加车数量提交至后端，后端会做库存校验、SKU聚合等相关操作
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      updateCart(params) {
        return $http.post('/api', '/api/v1/cart/CRT1001002', params)
      },
      /**
       * 已登录 购物车移除
       * @param {userId，spuId，skcId，skuId} params
       */
      removeCart(params) {
        return $http.post('/api', '/api/v1/cart/CRT1001004', params)
      },
      /**
       * 将未登录时用户添加的购物车数据转用户
       * @param {*} userId
       * @param {*} email
       * @param {*} goods
       */
      uploadCartData(userId, email, goods) {
        return $http.post('/api', '/api/v1/cart/CRT1001006', {
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
        return $http.post('/api', '/api/v1/cart/CRT1001007', {
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
        return $http.post('/test', '/api/v1/cart/CRT1001005', {
          useId: '',
          checkList,
        })
      },
    },
    order: {},
  })
}
