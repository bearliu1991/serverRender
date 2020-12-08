// 配置基础拦截器
// import { getTerminal } from '@assets/js/utils.js'
export default function ({ store, req, res, app: { $axios, $cookies } }) {
  $axios.defaults.timeout = 3000
  $axios.interceptors.request.use((config) => {
    // 用户登录后token
    config.headers.Token = $cookies.get('token') || ''
    config.headers.refreshToken = $cookies.get('refreshToken') || ''
    // 商店ID
    config.headers.shopId = store.getters.getShopId('AU') || 6
    config.headers.brandId = 1
    config.headers.lang = 'en'
    config.headers.terminal = store.state.terminal
    return config
  })
  $axios.interceptors.response.use((response) => {
    const { success, retInfo = '', data = '', retCode } = response.data || {}
    if (success) {
      return Promise.resolve(data || 'success')
    } else {
      console.log(response.config.url, response.data)
      // token异常
      if (retCode === 'CS100002' || retCode === 'CS100003') {
        if (refreshTimes >= 1) {
          // eslint-disable-next-line prefer-promise-reject-errors
          return Promise.reject({
            retInfo,
            retCode,
          })
        }
        // 将当前的请求保存到数据中
        if (!isRefreshing) {
          // 刷新token
          refreshTimes++
          isRefreshing = true
          refreshToken(response.config)
        }
        return new Promise((resolve, reject) => {
          pushRequest(function (token, refreshToken) {
            const config = response.config
            config.headers.Token = token
            config.headers.refreshToken = refreshToken
            if (process.server) {
              const stringObject = req.headers.cookie
              req.headers.cookie = replaceParamVal(stringObject, 'token', token)
              req.headers.cookie = replaceParamVal(
                stringObject,
                'refreshToken',
                refreshToken
              )
              res.setHeader(
                'Set-Cookie',
                `token=${token}&refreshToken=${refreshToken};`
              )
            }
            console.log('config----', config)
            $axios.request(config).then(
              (res) => {
                console.log(222, res)
                resolve(res)
              },
              (res) => {
                console.log(111, res)
                const { retInfo, retCode } = res
                // eslint-disable-next-line prefer-promise-reject-errors
                return Promise.reject({
                  retInfo,
                  retCode,
                })
              }
            )
            $cookies.set('token', token)
            $cookies.set('refreshToken', refreshToken)
            // resolve($axios.request(response.config))
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
  let refreshTimes = 0
  // 订阅挂起的接口
  let subscribers = []
  // 标记是否正在刷新 token
  let isRefreshing = false
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
      getRequest(result.token, result.refreshToken)
    } else {
      $cookies.remove('token')
      $cookies.remove('refreshToken')
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
  // 替换新token
  const replaceParamVal = (stringObject, paramName, replaceWith) => {
    const str = stringObject.replace(/\s/g, '')
    /* eslint-disable */
    const re = eval('/('+ paramName+'=)([^;]*)/gi')
    /* eslint-enable */
    const newParam = str.replace(re, paramName + '=' + replaceWith)
    return newParam
  }
}
