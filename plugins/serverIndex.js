import { isMobile } from '../assets/js/utils'

export default ({ app: { store, context } }) => {
  const ua = context.req.headers['user-agent']
  const terminal = isMobile(ua) ? 'mobile' : 'pc'
  store.commit('SET_TERMINAL', terminal)
}
