class CategoryService {
  constructor($http = {}, params = {}) {
    if (!CategoryService.instance) {
      CategoryService.instance = this
      this.$http = $http
      this.params = params
    } else {
      return CategoryService.instance
    }
  }

  async init() {
    // TODO：首先验证登陆
    const queryList = [this.queryData()]
    const responseData = await Promise.all(queryList)
    return responseData
  }

  queryData() {
    return this.$http.get('musicRankings') // TODO: 接口联调时删除，并解开以下注释
    // const { spuId, fromId, userId, collectionId } = this.params
    // if (!spuId) {
    //     return false; // 没有spuId的处理
    // }
    // return Promise.all([
    //     this.$http.get('getproductDetail', {
    //         spuId,
    //     }),
    //     this.$http.get('getRelateProduct', {
    //         spuId,
    //     }),
    //     this.$http.get('getRecommend', {
    //         fromId,
    //         collectionId,
    //         spuId,
    //     }),
    // ])
  }
}

export default CategoryService
