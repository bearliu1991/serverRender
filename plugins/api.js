export default ({ app: { $http } }, inject) => {
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
      queryBrowseRecord(isLogin, spuIds) {
        if (isLogin) {
          // 已登录
          return $http.post('/api', '/PPS1001002', {
            useId: '',
          })
        } else {
          // 未登录
          return $http.post('/api', '/PPS1001003', {
            spuIds,
          })
        }
      },
    },
    cart: {
      /**
       * 加入购物车
       * @param {userId,email,spuId,skcId,skuId,quantity,retailPrice,discountPrice} params
       */
      addCart(params) {
        return $http.post('/api', '/api/v1/cart/CAR1001002', params)
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
