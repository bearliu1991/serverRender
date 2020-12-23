<template>
  <div class="cs_home_findus">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <p>Find Us On Ins</p>
      <div class="sub-title">@CUPSHE_AU</div>
      <div v-for="(item, idx) in renderList" :key="idx" class="img-wrap">
        <img :src="src" class="big-img" />
        <ul class="ul-list">
          <li
            v-for="(n, index) in item"
            :key="index"
            :class="[index > 2 ? 'line-two' : '']"
          >
            <img @click="showProductDetail(n)" :src="n.src" class="small-img" />
          </li>
        </ul>
      </div>
      <div v-if="isHasMore" @click="loadMore" class="load-more">
        <div>LOAD MORE</div>
        <span class="icon_load_more load-icon"></span>
      </div>
    </div>
    <div v-else class="mobile-wrap">
      <p>Find Us On Ins</p>
      <div class="sub-title">@CUPSHE_AU</div>
      <div v-for="(item, idx) in renderList" :key="idx" class="img-wrap">
        <img :src="src" class="big-img" />
        <ul class="ul-list">
          <li
            v-for="(n, index) in item"
            :key="index"
            :class="[index % 2 === 1 ? 'line-two' : '']"
          >
            <img @click="showProductDetail(n)" :src="n.src" class="small-img" />
          </li>
        </ul>
      </div>
      <div v-if="isHasMore" @click="loadMore" class="load-more">
        <div>LOAD MORE</div>
        <span class="icon_load_more load-icon"></span>
      </div>
    </div>
    <cup-dialog :visible.sync="visible">
      <cup-product-pop :product-info="productInfo"></cup-product-pop>
    </cup-dialog>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'

export default {
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      visible: false,
      src:
        'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
      productInfo: {},
      isHasMore: false,
      originList: [],
    }
  },
  computed: {
    renderList() {
      const arr = []
      this.originList.forEach((item, index) => {
        const objIdx = parseInt(index / 7)
        if (!arr[objIdx]) {
          arr[objIdx] = [item]
        } else {
          arr[objIdx].push(item)
        }
      })
      return arr
    },
  },
  created() {
    this.getInsData()
  },
  methods: {
    showProductDetail(item) {
      this.visible = true
      this.productInfo = item
    },
    async getInsData(pageNum) {
      const res = await this.$api.homePage.fetchInsData({
        currSortNum: pageNum,
      })
      if (res.success) {
        this.isHasMore = res.data.hasLoadMore
        this.originList = res.data.list
      }
    },
    loadMore() {
      const pageNum = parseInt(this.originList.length / 7)
      this.getInsData(pageNum * 7)
    },
  },
}
</script>

<style lang="scss" scoped>
.pc-wrap {
  padding: 100px 0 20px 0;
  .line-two {
    margin-top: 16px;
  }
}
p {
  text-align: center;
  margin-bottom: 10px;
  font-family: Muli Regular;
  font-weight: bold;
  color: #333;
  font-size: 30px;
}
.sub-title {
  margin-top: 10px;
  margin-bottom: 40px;
  font-family: Muli Regular;
  font-weight: lighter;
  font-size: 18px;
  text-align: center;
}
.img-wrap {
  display: flex;
  font-size: 0;
}

.big-img {
  width: 592px;
  height: 592px;
}

.ul-list {
  font-size: 0;
  li {
    float: left;
    width: 288px;
    height: 288px;
    margin-left: 16px;
  }
  .small-img {
    width: 100%;
    height: 100%;
  }
}
.load-more {
  text-align: center;
  div {
    margin-top: 40px;
    font-weight: bold;
    color: #000;
    font-size: 18px;
    font-family: Muli Bold;
  }
  .load-icon {
    margin: 10px 0;
    height: 30px;
    width: 30px;
  }
}
.mobile-wrap {
  padding: 48px 0 24px 0;
  p {
    margin-bottom: 8px;
    font-size: 18px;
  }
  .sub-title {
    margin-bottom: 24px;
    font-size: 12px;
  }
  .img-wrap {
    display: block;
    font-size: 0;
  }
  .big-img {
    width: 100%;
    height: 343px;
  }

  .ul-list {
    overflow: hidden;
    font-size: 0;
    li {
      float: left;
      width: 167px;
      height: 167px;
      margin-left: 0;
      margin-right: 9px;
      margin-top: 9px;
    }
    .line-two {
      margin-right: 0;
    }
  }
  .load-more {
    div {
      margin-top: 24px;
      font-size: 14px;
    }
    .load-icon {
      margin: 4px 0;
      height: 24px;
      width: 24px;
    }
  }
}
</style>
