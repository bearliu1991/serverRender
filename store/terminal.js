export const state = () => ({
  terminal: 'PC',
})

export const mutations = {
  SET_TERMINAL(state, terminal) {
    state.terminal = terminal
  },
}
