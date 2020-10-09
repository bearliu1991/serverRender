// 首页的api
const basePath = '/api'
const textPrefix = '/test'

const homeApi = {
  musicRankings: {
    url: `${basePath}/musicRankings`,
    desc: '获取列表',
  },
  videoCategory: {
    url: `${textPrefix}/musicRankings`,
    desc: '',
  },
}
export default homeApi
