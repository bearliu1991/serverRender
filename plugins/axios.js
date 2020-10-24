// 配置基础拦截器
export default function ({ app: { $axios, $cookies } }) {
  const SHOP_IDS = {
    US: 1,
    DE: 2,
    AU: 6,
    FR: 3,
    IT: 5,
    ES: 4,
  }
  $axios.defaults.timeout = 30000
  $axios.interceptors.request.use((config) => {
    config.headers.Token = $cookies.get('token') || ''
    config.headers.shopId = SHOP_IDS.AU
    return config
  })
  $axios.interceptors.response.use((response) => {
    // return response.data
    const { success, data, retInfo = '' } = response.data || {}
    if (success) {
      return Promise.resolve(data)
    } else {
      return Promise.reject(retInfo)
    }
  })
}
