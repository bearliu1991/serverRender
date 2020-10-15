import { getTerminalPage } from '../assets/js/utils'

export const state = () => ({
  locales: ['en', 'de', 'fr'],
  locale: 'en',
  terminal: 'pc',
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
}
