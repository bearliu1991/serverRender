import apis from '../aips/index'

export default ({ app: { $axios } }, inject) => {
  // $axios.defaults.baseURL = process.env.baseUrl
  const apiList = {}
  const methods = ['get', 'post']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    apiList[method] = (url, data) => {
      if (!apis[url]) {
        throw new Error('当前url为配置，请先配置url')
      }
      return $axios({
        url: apis[url].url,
        method,
        [dataKey]: data,
      }).catch((err) => {
        // eslint-disable-next-line
                console.log(err)
      })
    }
  })
  inject('http', apiList)
}
