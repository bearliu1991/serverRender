export default function ({ store, req }) {
  const isMobile = (ua) => {
    return !!ua.match(/AppleWebKit.*Mobile.*/)
  }
  const userAgent = req ? req.headers['user-agent'] : navigator.userAgent || ''
  if (isMobile(userAgent)) {
    store.commit('terminal/SET_TERMINAL', 'Mob')
  } else {
    store.commit('terminal/SET_TERMINAL', 'PC')
  }
  console.log(store.state.terminal.terminal)
}
