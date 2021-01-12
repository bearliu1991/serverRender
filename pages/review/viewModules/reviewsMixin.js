import upload from './components/upload'

export default {
  mixins: [upload],
  data() {
    return {
      qaslistArr: '',
      scoreAndCount: {
        score: '',
        count: '',
      },
      tabName: 'product',
      // 筛选
      sortArr: [
        {
          label: 'Newest',
          val: 0,
        },
        {
          label: 'Highest Rating',
          val: 1,
        },

        {
          label: 'Lowest Rating',
          val: 2,
        },
        {
          label: 'Most Votes',
          val: 3,
        },
        {
          label: 'least Votes',
          val: 4,
        },
      ],
      proList: [],
      filtersList: [],
      proAllMedia: [],
      formFilters: {
        rating: '',
        withMedias: '',
        sortType: 0,
        tags: [],
      },
      tagArray: [],
      isSuccess: false,
      totals: 1,
      pageNum: 1,
      pageSize: 5,
      tabIndex: 1,
      tabs: ['SITE REVIEWS', 'PRODUCT REVIEWS'],

      visible: false,
      productInfo: {},
      linkKey: 'id',
      originList: [
        {
          id: 0,
          spuId: 384,
          size: 100,
          productName: 'bbbbbhhhh',
          src:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/1B7A028B842D45BAB8C35A9EA6A3BC80.jpg',
          rating: 4,
        },
        {
          id: 1,
          spuId: 384,
          size: 100,
          productName: 'werwrewr',
          src:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/1B7A028B842D45BAB8C35A9EA6A3BC80.jpg',
          rating: 5,
        },
        {
          id: 2,
          spuId: 384,
          size: 100,
          productName: ';lalsdfsdf',
          src:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/1B7A028B842D45BAB8C35A9EA6A3BC80.jpg',
          rating: 3,
        },
        {
          id: 3,
          spuId: 384,
          size: 100,
          productName: '说了句犯得上反对',
          src:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/1B7A028B842D45BAB8C35A9EA6A3BC80.jpg',
          rating: 1,
        },
        {
          id: 4,
          spuId: 384,
          size: 100,
          productName: '王培荣是否',
          src:
            'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/1B7A028B842D45BAB8C35A9EA6A3BC80.jpg',
          rating: 1,
        },
      ],
    }
  },
  mounted() {
    this.queryCommentList()
    this.init()
  },
  methods: {
    goPre() {
      this.productInfo = this.originList[this.findIndex() - 1]
    },
    goNext() {
      this.productInfo = this.originList[this.findIndex() + 1]
    },
    findIndex() {
      return this.originList.findIndex(
        (item) => item[this.linkKey] === this.productInfo[this.linkKey]
      )
    },
    async init() {
      const productId = this.$route.params.id
      // const rep1 = this.$api.comment.queryReviews({ pageNum: 1 })
      const getTagList = this.$api.comment.queryTopTags({ spuId: productId })
      const getfilters = this.$api.comment.queryFilters()
      // 所有媒体图片
      const getAllMedia = await this.$api.comment.queryMediaList({
        spuId: productId,
      })
      this.proAllMedia = getAllMedia.list

      getTagList.then((res) => {
        this.tagArray = res.list
      })
      getfilters.then((res) => {
        this.filtersList = res.list
        const qas = []
        res.list.map((re) => {
          qas.push({
            answer: '',
            title: re.title,
          })
        })
        this.$set(this.formFilters, `qas`, qas)
      })
      const questionList = await this.$api.comment.queryQAList()
      console.log(questionList)
      this.list = questionList.list
      const qas = []
      questionList.list.map((re) => {
        qas.push({
          answer: '',
          privacy: re.privacy,
          question: re.question,
          sortNum: re.sortNum,
        })
      })
      console.log(this.form)
      this.$set(this.form, 'qas', qas)
    },
    /**
     * 点赞
     * @param {*} id
     * @param {*} spuId
     * @param {*} pageNum
     */
    onLiked(id, spuId, pageNum) {
      this.$api.comment.goProLiked({ id, spuId, pageNum }).then((res) => {
        this.$set(this.proList, this.proList[id].likeStatus, 1)
      })
    },
    // 切换评论标签 site review and pdp review
    changeTabs(index) {
      this.tabIndex = index
      this.pageNum = 1
      this.queryCommentList()
    },
    // 处理分页
    handleCurrentChange(value) {
      this.pageNum = value
      this.queryCommentList()
    },
    // 网站评论列表
    async queryCommentList() {
      const { tabIndex } = this
      const productId = this.$route.params.id
      let result = null
      if (productId) {
        // pdp评论
        result = await this.$api.comment.queryProReviews({
          pageNum: this.pageNum,
          spuId: productId,
          ...this.formFilters,
        })
      } else {
        if (tabIndex === 1) {
          // 网站评论中的商品评论
          result = await this.$api.comment.queryReviews({
            pageNum: this.pageNum,
          })
        } else {
          // 站点评论
          result = await this.$api.comment.querySiteReviews({
            pageNum: this.pageNum,
          })
        }
      }
      if (result) {
        this.scoreAndCount.score = result.avg
        this.scoreAndCount.count = result.count
        this.proList = result.pageInfo.list
        this.totals = result.pageInfo.total
        this.pageSize = result.pageInfo.pageSize
      }
    },
  },
}
