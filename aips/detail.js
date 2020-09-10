// 详情页面的api
const basePath = '/api'

const homeApi = {
    getproductDetail: {
        url: `${basePath}/PPB1001001`,
        desc: '商品详情基础信息查询、补充信息',
    },
    getRelateProduct: {
        url: `${basePath}/PPR1001001`,
        desc: '关联产品模块',
    },
    getRecommend: {
        url: `${basePath}/PPG1001001`,
        desc: '猜你喜欢模块',
    },
    uploadHistory: {
        url: `${basePath}/PPS1001001`,
        desc: '提交浏览记录',
    },
    getHistory: {
        url: `${basePath}/PPS1001002`,
        desc: '登陆情况查询浏览记录',
    },
    getHistoryOffLogin: {
        url: `${basePath}/PPS1001003`,
        desc: '非登陆，查询浏览记录',
    },
}
export default homeApi
