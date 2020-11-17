import CategoryFilter from './categoryFilter'
import CategoryList from './categoryList'
export default {
  props: {
    filterData: {
      type: Object,
      default: () => {},
    },
    // 分类商品
    datas: {
      type: Array,
      default: () => {
        return []
      },
    },
    // 商品总数
    totalNum: {
      type: Number,
      default: 1,
    },
  },
  components: {
    CategoryFilter,
    CategoryList,
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
      collectionId: '',
      checkedFilters: {},
      filterOptions: [
        { key: '1', show: 'feature' },
        { key: '2', show: 'Best Selling' },
        { key: '3', show: 'Price：Low to High' },
        { key: '4', show: 'Price：High to Low' },
        { key: '5', show: 'Newest To Oldest' },
        { key: '6', show: 'Oldest To Newest' },
        { key: '7', show: 'Alphabetically：A-Z' },
        { key: '8', show: 'Alphabetically：Z-A' },
      ],
      sortId: 0,
      pageSize: 12,
      pageNo: 1,
    }
  },
  computed: {
    /**
     * filterList的列表项目有"string" "object"两种，有时filterList是空数组
     * 这里移除空的项目，并把所有数组项目转换为{key,show}形式
     */
    filterDataFiltered() {
      const ret = {}
      const keys = Object.keys(this.filterData)
      try {
        const effective = keys.filter((key) => {
          return this.filterData[key].filterList.length > 0
        })

        effective.forEach((key) => {
          const o = {}
          const filterObj = this.filterData[key]
          o.filterName = filterObj.filterName

          o.filterList = []
          filterObj.filterList.forEach((any, index) => {
            // primitive type
            if (typeof any === 'string') {
              o.filterList.push({
                key: any,
                show: any,
              })
            }
            // rich type
            else if (any && typeof any === 'object') {
              const anyKeys = Object.keys(any)
              let oo = {}
              const key = anyKeys[0]
              const keyV = anyKeys[1]
              oo = {
                key: any[key],
                show: any[keyV],
              }
              o.filterList.push(oo)
            }
          })
          ret[key] = o
        })
      } catch (error) {}
      return ret
    },
  },
  created() {
    if (!process.server) {
      this.collectionId = this.$route.query.collectionId
      this.searchProduct()
    }
  },
  methods: {
    // 点击排序
    changeSort(value) {
      this.sortId = value
      this.resetData()
      this.searchProduct()
    },
    // 重置数据
    resetData() {
      this.pageNo = 1
    },
    clearData() {
      this.checkedFilters = {}
      this.resetData()
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
      const { pageSize, pageNo, sortId, checkedFilters = {} } = this
      const option = {
        collectionId: this.collectionId,
        colors: checkedFilters.color || [],
        pageSize,
        pageNum: pageNo,
        sortId,
        prices: checkedFilters.price || [],
        productTypes: checkedFilters.category || [],
        sizes: checkedFilters.size || [],
        styleTagIds: checkedFilters.style || [],
        trendTagIds: checkedFilters.trend || [],
      }
      const param = params ? Object.assign(option, params) : option
      delete param.pageNo
      try {
        const result = await this.$api.collection.productSkusByCollection(param)
        if (result.list) {
          const { list, total } = result
          if (list.length === 0) {
            this.isEmpty = true
          }
          this.$emit('update', list, total)
        }
      } catch (error) {
        console.log(error)
      }
    },
  },
}
