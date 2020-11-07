export default ({ app: { $axios } }, inject) => {
  $axios.defaults.baseURL = process.env.baseUrl
  const apiList = {}
  const methods = ['get', 'post']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    apiList[method] = (base, url, data) => {
      // 用户url
      if ((base + url).includes('customer')) {
        $axios.defaults.baseURL = process.env.customerUrl
      } else if (url.includes('cart')) {
        $axios.defaults.baseURL = process.env.orderUrl
      } else {
        $axios.defaults.baseURL = process.env.baseUrl
      }
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
