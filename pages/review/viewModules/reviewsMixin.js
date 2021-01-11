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
    }
  },
  mounted() {
    this.queryCommentList()
  },
  methods: {
    async getAllComment() {
      // const rep1 = this.$api.comment.queryReviews({ pageNum: 1 })
      const getTagList = this.$api.comment.queryTopTags({ spuId: 6 })
      const getfilters = this.$api.comment.queryFilters()
      // 所有媒体图片
      const getAllMedia = await this.$api.comment.queryMediaList({ spuId: 6 })
      this.proAllMedia = getAllMedia.list
      // console.log(getAllMedia)

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
    /**
     * 点赞
     * @param {*} id
     * @param {*} spuId
     * @param {*} pageNum
     */
    onLiked(id, spuId, pageNum) {
      this.$api.comment.goProLiked({ id, spuId, pageNum }).then((res) => {
        // this.$toast('sss')
        this.$set(this.proList)
        // this.$forceUpdate()
        // console.log(this.proData);
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
        result = this.$api.comment.queryProReviews({
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
