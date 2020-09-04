import { getTerminal } from '../assets/js/utils'

export const state = () => ({
  locales: ['zh', 'en'],
  locale: 'en',
  terminal: 'pc',
})

export const mutations = {
  SET_LANG(state, locale) {
    if (state.locales.includes(locale)) {
      state.locale = locale
    }
  },
  SET_TERMINAL(state, terminal) {
    state.locale = getTerminal()
  },
}
