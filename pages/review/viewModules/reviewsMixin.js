import upload from './components/upload'

export default {
  inject: ['getSku'],
  mixins: [upload],
  data() {
    return {
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

      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        // slidesPerGroup: '2',
        // loop: true,
        autoplay: true,
        loopAdditionalSlides: 1,
        loopFillGroupWithBlank: true,
        navigation: {
          nextEl: '.swiper-button-next1',
          prevEl: '.swiper-button-prev1',
        },
      },

      url: [
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
        'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        'https://fuss10.elemecdn.com/8/27/f01c15bb73e1ef3793e64e6b7bbccjpeg.jpeg',
        'https://fuss10.elemecdn.com/1/8e/aeffeb4de74e2fde4bd74fc7b4486jpeg.jpeg',
      ],

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
      qaList: [],
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
      const getTagList = await this.$api.comment.queryTopTags({
        spuId: productId,
      })
      const getfilters = this.$api.comment.queryFilters()
      // 所有媒体图片
      const getAllMedia = await this.$api.comment.queryMediaList({
        spuId: productId,
      })
      this.proAllMedia1122 = getAllMedia.list
      this.proAllMedia = this.url

      this.tagArray = getTagList.list
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

    onBuyerShow() {},
    /**
     * 点赞
     * @param {*} id
     * @param {*} spuId
     * @param {*} pageNum
     */
    onLiked(proData, pageNum) {
      this.$api.comment
        .goProLiked({ id: proData.id, spuId: proData.spuId, pageNum })
        .then((res) => {
          if (proData.likeStatus === 0) {
            this.$set(proData, 'likeStatus', 1)
            this.$set(proData, 'likeNum', proData.likeNum + 1)
          } else {
            this.$set(proData, 'likeStatus', 0)
            this.$set(proData, 'likeNum', proData.likeNum - 1)
          }
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
