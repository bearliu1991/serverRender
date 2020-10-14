<template>
  <div>
    <div class="category">
      <div class="mask"></div>
      <h1>NEW IN</h1>
    </div>

    <div class="sort-wrap">
      <CupDropDownButton v-model="filterOption" :options="filterOptions">
        <span slot="title">{{ $t('category.sort') }}</span>
      </CupDropDownButton>
    </div>

    <!-- 列表内容 -->
    <div class="content-wrap">
      <div class="aside-wrap">
        <aside>
          <el-collapse
            v-model="activeNames"
            class="cup-collapse-pc"
            @change="handleChange"
          >
            <el-collapse-item
              v-for="(filter, key) in filterDataFiltered"
              :key="key"
              :name="key"
            >
              <template slot="title">
                <b class="cup-collapse-title">{{ filter.filterName }}</b>
              </template>
              <div>
                <ul class="filter-list">
                  <li v-for="(item, index) in filter.filterList" :key="index">
                    <el-radio class="cup-radio" :label="item.key"
                      ><span class="radio-label">{{
                        item.show
                      }}</span></el-radio
                    >
                  </li>
                </ul>
              </div>
            </el-collapse-item>
          </el-collapse>
          <div style="margin-top: 34px">
            <CupButton type="primary" size="medium" style="display: block">{{
              $t('category.reset')
            }}</CupButton>
          </div>
        </aside>
      </div>
      <div class="main-wrap">
        <main>
          <div class="list-wrap">
            <ul>
              <li v-for="(item, i) of categoryData.list" :key="i">
                <CupItemCard :item="item"></CupItemCard>
              </li>
            </ul>
            <div>
              <el-pagination small layout="prev, pager, next" :total="50">
              </el-pagination>
            </div>
          </div>
        </main>
      </div>
    </div>
    <!-- /列表内容 -->

    <div class="recently-wrap">
      <h3>{{ $t('category.recently') }}</h3>
      <div class="swiper-wrap">
        <client-only>
          <swiper class="swiper" :options="swiperOption">
            <swiper-slide v-for="(item, i) of categoryData.list" :key="i"
              ><CupItemCard :item="item"></CupItemCard
            ></swiper-slide>
            <div slot="button-prev" class="swiper-button-prev"></div>
            <div slot="button-next" class="swiper-button-next"></div>
          </swiper>
        </client-only>
      </div>
    </div>
  </div>
</template>

<script>
// import qs from 'qs'
import mock from '../../mock/category'
export default {
  name: 'Category',
  asyncData({ app: { $http }, query }) {
    return {
      categoryData: mock.categoryData,
      filterData: mock.filterData,
      // categoryData: responseData.categoryData,
      // filterData: responseData.filterData,
    }
  },
  data() {
    return {
      activeNames: ['1', '2'],
      radio: '1',
      radio2: '3',
      swiperOption: {
        slidesPerView: 4,
        spaceBetween: 16,
      },
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
      filterOption: '1',
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
      const regKey = /Key$/
      const regShow = /Show$/

      keys
        .filter((key) => {
          return this.filterData[key].filterList.length > 0
        })
        .forEach((key) => {
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
            else if (typeof any === 'object') {
              const anyKeys = Object.keys(any)
              const oo = {}
              anyKeys.forEach((k) => {
                if (regKey.test(k)) {
                  oo.key = any[k]
                } else if (regShow.test(k)) {
                  oo.show = any[k]
                } else {
                  // unknown prop
                }
              })
              o.filterList.push(oo)
            } else {
              // unexpected type
            }
          })

          ret[key] = o
        })

      return ret
    },
  },
  watch: {
    '$route.query': (to, from) => {
      window.location.reload()
    },
  },
  created() {
    // if (process.browser) {
    //   this.spuId = this.$route.query.spuId
    //   const categoryModule = new CategoryModule(this.$http)
    // }
  },
  mounted() {},
  methods: {
    handleChange(val) {
      console.log(val)
    },
  },
}
</script>

<style lang="scss" scoped>
.category {
  padding-bottom: 500 / 1920 * 100%;
  position: relative;
  overflow: hidden;

  .mask {
    position: absolute;
    z-index: 0;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background: url(https://cdn.shopifycdn.net/s/files/1/1135/4928/products/cyy21384.jpg?v=1583221490)
      no-repeat center;
    background-size: cover;
  }
  h1 {
    font-size: 48px;
    font-family: Muli-Bold, Muli, sans-serif;
    font-weight: bold;
    color: #ffffff;
    line-height: 60px;
    letter-spacing: 2px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }
}

.content-wrap {
  $aside-width: 258px;
  padding: 40px 56px;
  overflow: hidden;
  .aside-wrap {
    width: $aside-width;
    float: left;
    margin-right: -1 * $aside-width;
    position: relative;
    z-index: 1;
  }
  .main-wrap {
    float: left;
    width: 100%;
    main {
      margin-left: $aside-width + 46px;
    }
  }
  .list-wrap {
    text-align: center;
    ul {
      $list-spacing-x: 16px;
      margin-right: -1 * $list-spacing-x;
      overflow: hidden;
      li {
        width: 25%;
        float: left;
        box-sizing: border-box;
        padding-right: $list-spacing-x;
      }
    }
  }
}

.cup-collapse-title {
  font-size: 14px;
  font-family: Muli-Bold, Muli, sans-serif;
  font-weight: bold;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
.radio-label {
  font-size: 14px;
  font-family: Muli-Regular_Light, Muli, sans-serif;
  font-weight: normal;
  color: #333333;
  line-height: 18px;
  letter-spacing: 2px;
}
.filter-list {
  li {
    padding: 6px 0;
  }
}

.recently-wrap {
  border-top: 1px solid #f7f7f7;
  padding-top: 86px;
  h3 {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
    font-family: Muli-Bold, Muli, sans-serif;
    font-weight: bold;
    color: #000000;
    line-height: 38px;
    letter-spacing: 2px;
  }
  .swiper-wrap {
    $margin-x: 208 / 1920 * 100%;
    margin: 0 $margin-x;
  }
}

.sort-wrap {
  display: flex;
  justify-content: flex-end;
  border-bottom: 1px solid #f7f7f7;
}
</style>
