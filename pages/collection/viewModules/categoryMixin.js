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
    name: {
      type: String,
      default: '',
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
      isFixed: false,
      isEmptyPage: false,
      collectionId: '',
      checkedFilters: {},
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
      // 筛选条件匹配
      conditionName: {
        category: 'category',
        price: 'price',
        color: 'color',
        size: 'size',
        style: 'style',
        thrend: 'trend',
      },
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
      const { conditionName } = this
      try {
        const effective = keys.filter((key) => {
          return this.filterData[key].filterList.length > 0
        })

        effective.forEach((key) => {
          const o = {}
          const filterObj = this.filterData[key]
          // o.filterName = filterObj.filterName
          o.filterName = conditionName[key]

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
      this.collectionId = this.$route.query.id
      this.searchProduct()
    }
  },
  mounted() {
    // const fn = () => {
    //   const top = document.documentElement.scrollTop || document.body.scrollTop
    //   if (top < 457) {
    //     this.isFixed = false
    //   } else {
    //     this.isFixed = true
    //   }
    // }
    // window.addEventListener('scroll', fn)
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
      this.isEmptyPage = false
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
        trendTagIds: checkedFilters.thrend || [],
      }
      const param = params ? Object.assign(option, params) : option
      delete param.pageNo
      try {
        const result = await this.$api.collection
          .productSkusByCollection(param)
          .catch(() => {
            if (pageNo === 1) {
              this.isEmptyPage = true
            }
          })
        if (result.list) {
          const { list, total } = result
          if (list.length === 0) {
            if (pageNo === 1) {
              this.isEmptyPage = true
            }
          }
          this.$emit('update', list, total)
        }
      } catch (error) {}
    },
  },
}
