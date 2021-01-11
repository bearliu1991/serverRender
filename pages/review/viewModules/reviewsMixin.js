export default {
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
      formFilters: {
        rating: '',
        withMedias: '',
        sortType: 0,
        tags: [],
      },
      tagArray: [],
      isSuccess: false,
      curPages: 1,
      totals: 1,
      pageNum: 1,
      pageSize: 5,
      source: '',
      tabIndex: 1,
      tabs: ['SITE REVIEWS', 'PRODUCT REVIEWS'],
    }
  },
  mounted() {
    this.source = this.$route.query.source
    this.getReviews()
    this.getAllComment()
  },
  watch: {
    currentPages(val) {
      this.curPages = val
    },
  },
  methods: {
    getAllComment() {
      // const rep1 = this.$api.comment.queryReviews({ pageNum: 1 })
      const getTagList = this.$api.comment.queryTopTags({ spuId: 6 })
      const getfilters = this.$api.comment.queryFilters()

      // rep1.then((res) => console.log('站点&商品', res))
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
    },
    // 获取站点评论
    async getSiteReview() {
      const resp = await this.$api.comment.querySiteReviews({
        pageNum: this.pageNum,
      })
      this.scoreAndCount.score = resp.avg
      this.scoreAndCount.count = resp.count
      this.proList = resp.pageInfo.list
    },
    // 获取商品评论
    getReviews() {
      // 商品查询
      const rep = this.$api.comment.queryProReviews({
        pageNum: this.pageNum,
        spuId: 11,
        ...this.formFilters,
      })

      rep.then((res) => {
        this.scoreAndCount.score = res.avg
        this.scoreAndCount.count = res.count
        this.proList = res.pageInfo.list
      })
    },
    // 切换tab
    handleTabs(name) {
      this.tabName = name
      if (name === 'site') {
        this.getSiteReview()
      } else {
        this.getReviews()
      }
    },
    // 切换评论标签 site review and pdp review
    changeTabs(index) {
      this.tabIndex = index
      this.pageNum = 1
      if (index === 0) {
        // 站点评论
        this.getSiteReview()
      } else {
        // pdp评论
        this.getReviews()
      }
    },
    // 处理分页
    handleCurrentChange(value) {
      this.handleTabs(this.tabName, value)
    },
    // 网站评论列表
    async queryCommentList() {
      const { tabIndex } = this
      let result = null
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
