// 配置基础拦截器
// import { getTerminal } from '@assets/js/utils.js'
export default function ({ store, app: { $axios, $cookies } }) {
  $axios.defaults.timeout = 30000
  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    config.headers.Token = store.state.token || ''
    // 商店ID
    config.headers.shopId = store.getters.getShopId('AU')
    config.headers.brandId = 1
    config.headers.lang = 'en'
    // config.headers.browser = getTerminal()
    config.headers.terminal = store.state.terminal
    config.headers.ip = '	127.0.0.1'
    return config
  })
  $axios.interceptors.response.use((response) => {
    // return response.data
    const { success, retInfo = '', data = '' } = response.data || {}
    if (success) {
      return Promise.resolve(data || 'success')
    } else {
      return Promise.reject(retInfo)
    }
  })
}
