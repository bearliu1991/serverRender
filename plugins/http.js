export default ({ app: { $axios } }, inject) => {
  $axios.defaults.baseURL = process.env.baseUrl
  const apiList = {}
  const methods = ['get', 'post']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    apiList[method] = (base, url, data) => {
      // 用户url
      // if (url.includes('trade')) {
      //   url = url.replace('public/', '')
      //   $axios.defaults.baseURL = 'http://192.168.20.14:18106/'
      // } else {
      //   $axios.defaults.baseURL = process.env.baseUrl
      // }
      return $axios({
        url: base + url,
        method,
        [dataKey]: data,
        withCredentials: true,
      }).catch((err) => {
        // eslint-disable-next-line
        console.log(err)
      })
    }
  })
  inject('http', apiList)
}
