export default {
  props: {
    // 分类商品
    datas: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 商品总数
    totals: {
      type: Number,
      default: 1,
    },
  },
  provide() {
    return {
      searchProduct: this.searchProduct,
      resetData: this.resetData,
    }
  },
  data() {
    return {
      isEmpty: false,
      keywords: '',
      filterOptions: [
        { key: '1', show: 'Featured' },
        { key: '3', show: 'Best Seller' },
        { key: '2', show: 'Newest' },
        { key: '6', show: 'Price：Low To High' },
        { key: '5', show: 'Price：High To Low' },
        { key: '4', show: 'Best Deal' },
      ],
      sortId: '',
      pageSize: 24,
      pageNo: 1,
    }
  },
  created() {
    if (!process.server) {
      this.keywords = this.$route.query.keyword
      this.searchProduct()
    }
  },
  methods: {
    handleCurrentChange(value) {
      this.searchProduct({
        pageNo: value,
      })
    },
    toDetail(spuId) {
      this.$router.push({
        path: `/product/${spuId}`,
      })
    },
    // 点击排序
    changeSort(value) {
      this.sortId = value
      this.pageNo = 1
      this.searchProduct()
    },
    /**
     * 根据筛选条件搜索商品
     * @param {*} params
     */
    async searchProduct(params = {}) {
      this.isEmpty = false
      if (params.pageNo) {
        this.pageNo = params.pageNo
      }
      const { pageSize, pageNo, sortId } = this
      const option = {
        keywords: this.keywords,
        pageSize,
        pageNum: pageNo,
        sortType: sortId,
      }
      const param = params ? Object.assign(option, params) : option
      delete param.pageNo
      try {
        const result = await this.$api.search
          .querySearchList(param)
          .catch(() => {
            if (pageNo === 1) {
              this.isEmpty = true
            }
          })
        if (result.productVoList) {
          const { productVoList, total } = result
          if (productVoList.length === 0) {
            if (pageNo === 1) {
              this.isEmpty = true
            }
          }
          this.$emit('update', list, total)
        }
      } catch (error) {}
    },
  },
}
