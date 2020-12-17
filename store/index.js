import { getTerminalPage } from '../assets/js/utils'
export const state = () => ({
  locales: ['en', 'de', 'fr', 'es', 'au', 'it'],
  locale: 'en',
  terminal: 'pc',
  loginInfo: {
    email: '',
    customerName: '',
    isSubscribe: 1,
  },
  configData: {
    AU: {
      // 币种
      currencyCode: 'AUD',
      countryCode: 'AU',
    },
  },

  // 是否登录
  isLogin: false,
  // 离线的购物车数据
  cartData: [],
  // 记录浏览的商品记录
  historyProduct: [],
  // 下单成功后保存用户使用的地址
  cookieShipAddress: {},
  checkoutData: {},
  SHOP_IDS: {
    US: 1,
    DE: 2,
    AU: 6,
    FR: 3,
    IT: 5,
    ES: 4,
  },
  contentMarginTop: 0,
})
export const getters = {
  // 获取店铺ID
  getShopId: (state) => (shopName) => {
    return state.SHOP_IDS[shopName]
  },
  getCurrencyCode: (state) => {
    const shopId = process.env.shopId
    return state.configData[shopId].currencyCode
  },
}

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_TERMINAL(state, terminal) {
    state.terminal = terminal || getTerminalPage()
  },
  // 保存登录后的用户信息
  SET_USERINFO(state, info) {
    state.loginInfo = info || {
      email: '',
      isSubscribe: 1,
      customerName: '',
    }
    if (!info) {
      state.isLogin = false
    } else {
      state.isLogin = true
    }
  },
  // 保存非登录时加入购物车的数据
  SET_CARTDATA(state, list) {
    state.cartData = list
  },
  // 保存商品的浏览记录
  SET_HISTORY_PRODUCT(state, list) {
    state.historyProduct = list
  },
  SET_CONTENT_MARGIN_TOP(state, top) {
    state.contentMarginTop = top
  },
  // 保存下单时用户填写的bill he ship
  SET_ADDRESS(state, obj) {
    state.cookieShipAddress = obj
  },
  // 保存checkout刷新页面时填写的输入记录
  SET_CHECKOUT_RECORD(state, obj) {
    state.checkoutData = obj
  },
}
export const actions = {
  async nuxtServerInit({ commit, dispatch }, { req, app: { $cookies } }) {
    const token = $cookies.get('token')
    console.log(333, token)
    if (!token) {
      commit('SET_USERINFO', null)
    } else {
      await dispatch('getUserInfo')
    }
  },
  async getUserInfo({ commit, dispatch }) {
    const result = await this.$api.customer.queryUserInfo().catch(() => {
      console.log('查询信息失败')
    })
    if (result) {
      commit('SET_USERINFO', result)
    } else {
      commit('SET_USERINFO', null)
    }
  },
}
