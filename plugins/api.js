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
    product: {},
    order: {},
  })
}
