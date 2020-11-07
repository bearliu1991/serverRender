// 配置基础拦截器
export default function ({ store, app: { $axios, $cookies } }) {
  $axios.defaults.timeout = 30000
  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    config.headers.Token = $cookies.get('token') || ''
    // 商店ID
    config.headers.shopId = store.getters.getShopId('AU')
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
