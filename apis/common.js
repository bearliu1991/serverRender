import { proxy } from '../assets/js/config'
// 页面公共的api
const basePath = proxy() + '/api'

const commonApi = {
  getNavList: {
    url: `${basePath}/PNM1001001`,
    desc: '商品导航列表页',
  },
}
export default commonApi
