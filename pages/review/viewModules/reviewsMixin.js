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
    // 商品所有评论媒体
    async toModify() {
      const result = await this.$api.customer
        .modifyUserName(this.accountForm.customerName)
        .catch((error) => {
          this.$alert(error.retInfo)
        })
      if (result) {
        this.$toast('Successfully modified', 2000)
        this.$store.dispatch('getUserInfo')
        this.isModify = false
      }
    },

    // 查询订单列表
    async queryOrderList() {
      const result = await this.$api.order
        .queryOrderList({
          pageNum: 1,
          pageSize: 20,
        })
        .catch(() => {
          this.orderNum = 0
        })
      if (result) {
        this.orderNum = result.total
      } else {
        this.orderNum = 0
      }
    },
    // 查询地址列表
    async queryAddressList() {
      const result = await this.$api.address
        .getAddressList({
          pageNum: 1,
          pageSize: 20,
        })
        .catch(() => {})
      this.addressList = []
      if (result && result.list) {
        this.addressList = result.list
      }
    },
  },
}
