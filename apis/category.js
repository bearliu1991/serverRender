// 详情页面的api
import { proxy } from '../assets/js/config'
const basePath = proxy() + '/api'

const categoryApi = {
  getproductDetail: {
    url: `${basePath}/PPC1001001`,
    desc: '分类基础信息',
  },
  getproductDetail: {
    url: `${basePath}/PPC1001002`,
    desc: '分类搜索条件',
  },
  getproductDetail: {
    url: `${basePath}/PPC1001003`,
    desc: '分类spu信息',
  },
}
export default categoryApi
