import createPersistedState from 'vuex-persistedstate'

export default ({ store, req, res, app: { $cookies } }) => {
  // store.state.token = $cookies.get('token') || ''
  // store.state.loginInfo = {
  //   userId: $cookies.get('userId') || '',
  //   email: $cookies.get('email') || '',
  // }
  createPersistedState({
    // key: 'vuexnuxt',
    storage: window.localStorage,
    // reducer(state) {
    //   return {
    //     // cartData: state.cartData,
    //     // isLogin: state.isLogin,
    //   }
    // },
  })(store)
}
