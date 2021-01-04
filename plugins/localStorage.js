import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, res, app: { $cookies } }) => {
  createPersistedState({
    storage: window.localStorage,
    reducer(val) {
      return {
        // 只储存state中的assessmentData
        cartData: val.cartData,
        historyProduct: val.historyProduct,
        cookieShipAddress: val.cookieShipAddress,
        checkoutData: val.checkoutData,
        prevPageUrl: val.prevPageUrl,
      }
    },
  })(store)
}
