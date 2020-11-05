import { getTerminalPage } from '../assets/js/utils'

export const state = () => ({
  locales: ['en', 'de', 'fr', 'es', 'au', 'it'],
  locale: 'en',
  terminal: 'pc',
  userInfo: null,
  contentMarginTop: 0,
  // terminal: 'pc',
})

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
    state.userInfo = info
  },
  SET_CONTENT_MARGIN_TOP(state, top) {
    state.contentMarginTop = top
  },
}
