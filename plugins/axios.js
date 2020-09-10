// 配置基础拦截器
export default function ({ app: { $axios, $cookies } }) {
    $axios.defaults.timeout = 30000
    $axios.interceptors.request.use((config) => {
        config.headers.Token = $cookies.get('token') || ''
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
