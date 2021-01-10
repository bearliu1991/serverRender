// 配置基础拦截器

// import { getTerminal } from '@assets/js/utils.js'
export default function ({
  redirect,
  store,
  req,
  res,
  app: { $axios, $cookies },
}) {
  let refreshTimes = 0
  // 订阅挂起的接口
  let subscribers = []
  // 标记是否正在刷新 token
  let isRefreshing = false

  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    if (!config.headers.refresh) {
      config.headers.Token =
        $cookies.get('token') || $cookies.get('guestToken') || ''
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
      // 登录拦截
      if (retCode === 'CS100001') {
        clearCookie()
        redirect('/customer/login')
      }
      // token异常
      else if (retCode === 'CS100002' || retCode === 'CS100003') {
        if (refreshTimes >= 1) {
          clearCookie()
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
        clearCookie()
        return Promise.reject(err)
      })
      .finally(() => {
        isRefreshing = false
      })
    if (result) {
      getRequest(result.token, result.refreshToken)
    }
  }
  const clearCookie = () => {
    $cookies.remove('token', {
      path: '/',
      domain: 'kapeixi.cn',
    })
    $cookies.remove('refreshToken', {
      path: '/',
      domain: 'kapeixi.cn',
    })
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
