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
      curPages: 1,
      totals: 1,
      pageNum: 1,
      pageSize: 5,
    }
  },
  mounted() {
    this.getReviews()
    this.getAllComment()
  },
  watch: {
    currentPages(val) {
      this.curPages = val
    },
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
    async getSiteReview() {
      const resp = await this.$api.comment.querySiteReviews({ pageNum: 1 })
      this.scoreAndCount.score = resp.avg
      this.scoreAndCount.count = resp.count
      this.proList = resp.pageInfo.list
    },
    getReviews() {
      // console.log(this.formFilters, 'zhuangze')
      // 商品查询
      const rep = this.$api.comment.queryProReviews({
        pageNum: 1,
        spuId: 11,
        ...this.formFilters,
      })
      rep.then((res) => {
        this.scoreAndCount.score = res.avg
        this.scoreAndCount.count = res.count
        this.proList = res.pageInfo.list
      })
    },
    handleTabs(name) {
      // console.log(this)
      this.tabName = name
      if (name === 'site') {
        this.getSiteReview()
      } else {
        this.getReviews()
      }
    },
    handleCurrentChange(value) {
      this.searchProduct({
        pageNo: value,
      })
    },
    onLiked(id, spuId, pageNum) {
      this.$api.comment.goProLiked({ id, spuId, pageNum }).then((res) => {
        // this.$toast('sss')
        this.getReviews()
        this.$set(this.proList)
        // this.$forceUpdate()
        // console.log(this.proData);
      })
    },
  },
}
