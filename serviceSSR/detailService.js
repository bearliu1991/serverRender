// import qs from 'qs'
import { jsonParse } from '../assets/js/utils'
class DetailService {
    constructor($http = {}, params = {}) {
        if (!DetailService.instance) {
            DetailService.instance = this
            this.$http = $http
            this.params = params
            this.isLogin = false
        } else {
            return DetailService.instance
        }
    }

    async init() {
        // 首先验证登陆
        // TODO： 缺少获取入参逻辑，以及登陆验证
        const queryList = [this.queryData()]
        this.isLogin && queryList.push(this.getHistory)
        const responseData = await Promise.all(queryList)
        return responseData
    }

    queryData() {
        this.$http.get('musicRankings') // TODO: 接口联调时删除，并解开以下注释
        // const spuId = this.spuId
        // const fromId = 123
        // const userId = 123
        // const collectionId = 84
        // if (!spuId) {
        //     return false; // 没有spuId的处理
        // }
        // return Promise.all([
        //     this.$http.get('getproductDetail', {
        //         spuId,
        //     }),
        //     this.$http.get('getRelateProduct', {
        //         spuId,
        //     }),
        //     this.$http.get('getRecommend', {
        //         fromId,
        //         collectionId,
        //         spuId,
        //     }),
        // ])
    }

    // 登陆的情况下，获取最近浏览
    getHistory() {
        const spuIds = jsonParse(localStorage.getItem('historySpuIds'))
        return this.$http.get('getHistory', {
            userId,
            spuIds,
        })
    }

    // 非登陆的情况下，上传本地存储的spuIds，再通过接口获取最近浏览
    async getHistoryOffLogin() {
        const spuIds = jsonParse(localStorage.getItem('historySpuIds'))
        await this.$http.post('uploadHistory', {
            spuIds,
        })
        return await this.$http.post('getHistoryOffLogin', {
            spuIds,
        })
    }

    // 未登陆情况存储SpuId
    storeSpuIds(spuId = '') {
        if (!spuId) return false
        let spuIdsList = localStorage.getItem('historySpuIds')
        if (!spuIdsList) {
            spuIdsList = []
        } else {
            spuIdsList = jsonParse(spuIdsList)
        }
        spuIdsList.unshift(spuId)
        spuIdsList.length > 20 && (spuIdsList.length = 20) // 保留最近20条
        localStorage.setItem('historySpuIds', jsonStringify(spuIdsList))
    }
}

export default DetailService
