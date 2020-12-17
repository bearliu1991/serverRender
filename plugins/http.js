export default ({ app: { $axios } }, inject) => {
  $axios.defaults.baseURL = process.env.baseUrl
  $axios.defaults.timeout = 3000
  const apiList = {}
  const methods = ['get', 'post']
  methods.forEach((method) => {
    const dataKey = method === 'get' ? 'params' : 'data'
    apiList[method] = (base, url, data, option = {}) => {
      return $axios({
        ...{
          url: base + url,
          method,
          [dataKey]: data,
          withCredentials: true,
        },
        ...option,
      })
    }
  })
  inject('http', apiList)
}
