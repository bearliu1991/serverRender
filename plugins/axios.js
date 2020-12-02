// 配置基础拦截器
// import { getTerminal } from '@assets/js/utils.js'
export default function ({ store, app: { $axios, $cookies } }) {
  $axios.defaults.timeout = 30000
  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    config.headers.Token = $cookies.get('token') || ''
    config.headers.refreshToken = $cookies.get('refreshToken') || ''
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
    const { success, retInfo = '', data = '', retCode } = response.data || {}
    if (success) {
      return Promise.resolve(data || 'success')
    } else {
      // token异常
      if (retCode === 'CS100002') {
        // 将当前的请求保存到数据中
        if (!isRefreshing) {
          // 刷新token
          isRefreshing = true
          refreshToken()
        }
        return new Promise((resolve, reject) => {
          pushRequest(function () {
            resolve($axios.request(response.config))
          })
        })
      } else {
        // eslint-disable-next-line prefer-promise-reject-errors
        return Promise.reject({
          retInfo,
          retCode,
        })
      }
    }
  })
  // 订阅挂起的接口
  let subscribers = []
  // 标记是否正在刷新 token
  let isRefreshing = false
  async function refreshToken() {
    const result = await $axios
      .post(`/customer/CL1001006`, {}, { baseURL: process.env.baseUrl })
      .catch((err) => {
        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
    if (result) {
      $cookies.set('token', result.token)
      $cookies.set('refreshToken', result.refreshToken)
      getRequest()
    }
  }

  const pushRequest = (callback) => {
    subscribers.push(callback)
  }
  const getRequest = () => {
    subscribers.forEach((callback) => {
      // 发送请求
      callback()
    })
    // 清空
    subscribers = []
  }
}
