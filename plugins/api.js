export default ({ app: { $http } }, inject) => {
  inject('api', {
    /**
     * @param {*} params
     */
    login(params) {
      return $http.post('/v1/login', params)
    },
    musicRankings(params) {
      return $http.get('/api', '/musicRankings', params)
    },
    videoCategory(params) {
      return $http.get('test', '/todayVideo', params)
    },
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
    },
    order: {},
  })
}
