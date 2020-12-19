// 配置基础拦截器
// import { getTerminal } from '@assets/js/utils.js'
export default function ({ store, req, res, app: { $axios, $cookies } }) {
  let refreshTimes = 0
  // 订阅挂起的接口
  let subscribers = []
  // 标记是否正在刷新 token
  let isRefreshing = false

  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    if (!config.headers.refresh) {
      config.headers.Token = $cookies.get('token') || ''
      config.headers.refreshToken = $cookies.get('refreshToken') || ''
    }
    // 商店ID
    config.headers.shopId = store.getters.getShopId('AU') || 6
    config.headers.brandId = 1
    config.headers.lang = 'en'
    config.headers.requestId = new Date().getTime()
    config.headers.terminal = store.state.terminal
    return config
  })
  $axios.interceptors.response.use((response) => {
    const { success, retInfo = '', data = '', retCode } = response.data || {}
    if (success) {
      return Promise.resolve(data)
    } else {
      console.log(response.config.url, response.data)
      // token异常
      if (retCode === 'CS100002' || retCode === 'CS100003') {
        if (refreshTimes >= 1) {
          $cookies.remove('token')
          $cookies.remove('refreshToken')
          refreshTimes = 0
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            retInfo,
            retCode,
          })
        }
        // 将当前的请求保存到数据中
        if (!isRefreshing) {
          refreshTimes++
          // 刷新token
          isRefreshing = true
          refreshToken(response.config)
        }
        return new Promise((resolve, reject) => {
          pushRequest(function (token, refreshToken) {
            const config = response.config
            config.headers.Token = token
            config.headers.refresh = true
            config.headers.refreshToken = refreshToken
            $axios.request(config).then(
              (res) => {
                resolve(res)
              },
              (res) => {
                const { retInfo, retCode } = res
                // eslint-disable-next-line prefer-promise-reject-errors
                reject({
                  retInfo,
                  retCode,
                })
              }
            )
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

  async function refreshToken(config) {
    const result = await $axios
      .post(`/customer/CL1001006`, {}, { baseURL: process.env.baseUrl })
      .catch((err) => {
        $cookies.remove('token')
        $cookies.remove('refreshToken')
        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
    if (result) {
      $cookies.set('token', result.token, {
        path: '/',
        domain: 'kapeixi.cn',
      })
      $cookies.set('refreshToken', result.refreshToken, {
        path: '/',
        domain: 'kapeixi.cn',
      })
      getRequest(result.token, result.refreshToken)
    }
  }

  const pushRequest = (callback) => {
    subscribers.push(callback)
  }
  const getRequest = (token, refreshToken) => {
    subscribers.forEach((callback) => {
      // 发送请求
      callback(token, refreshToken)
    })
    // 清空
    subscribers = []
  }
}
