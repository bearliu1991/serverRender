export default ({ app: { $axios } }, inject) => {
  $axios.defaults.baseURL = process.env.baseUrl
  const apiList = {}
  const methods = ['get', 'post']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    apiList[method] = (base, url, data) => {
      return $axios({
        url: base + url,
        method,
        [dataKey]: data,
        withCredentials: true,
      })
    }
  })
  inject('http', apiList)
}
