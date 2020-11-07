import { getTerminalPage } from '../assets/js/utils'
export const state = () => ({
  locales: ['en', 'de', 'fr', 'es', 'au', 'it'],
  locale: 'en',
  terminal: 'pc',
  loginInfo: {
    email: '',
    userId: '',
  },
  // 登录cookie
  token: '',
  // 是否登录
  isLogin: false,
  // 离线的购物车数据
  cartData: [],
  // 记录浏览的商品记录
  historyProduct: [],
  SHOP_IDS: {
    US: 1,
    DE: 2,
    AU: 6,
    FR: 3,
    IT: 5,
    ES: 4,
  },
  contentMarginTop: 0,
  // terminal: 'pc',
})
export const getters = {
  // 获取店铺ID
  getShopId: (state) => (shopName) => {
    return state.SHOP_IDS[shopName]
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
    const { id, email, token } = info
    state.loginInfo = {
      userId: id,
      email,
    }
    state.token = token
    state.isLogin = true
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
}
