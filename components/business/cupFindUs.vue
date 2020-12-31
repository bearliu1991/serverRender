<template>
  <div class="cs_home_findus" v-if="childObj.enable">
    <div v-if="isPc" class="pc-wrap">
      <p>{{ childObj.heading }}</p>
      <div class="sub-title">{{ childObj.subheading }}</div>
      <div v-for="(item, idx) in renderList" :key="idx" class="img-wrap">
        <div class="div-wrap li-wrap">
          <a v-if="item[0].src" class="ins-img-wrap">
            <img :src="item[0].src" class="big-img" />
            <div class="hover-wrap">
              <div class="icon-wrap"></div>
              <cup-button @click="showProductDetail(item[0])"
                >SHOP NOW</cup-button
              >
            </div>
          </a>
        </div>

        <ul class="ul-list">
          <li
            v-for="(n, index) in item.slice(1)"
            :key="index"
            :class="[index > 2 ? 'line-two' : '']"
            class="li-wrap"
          >
            <a v-if="n.src" class="ins-img-wrap">
              <img
                @click="showProductDetail(n)"
                :src="n.src"
                class="small-img"
              />
              <div class="hover-wrap">
                <div class="icon-wrap"></div>
                <cup-button @click="showProductDetail(n)">SHOP NOW</cup-button>
              </div>
            </a>
            <div v-if="!n.src" class="lack-wrap">
              <span class="icon-wrap lack-img"></span>
            </div>
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
        <img
          :src="item[0].src"
          class="big-img"
          @click="showProductDetail(item[0])"
        />
        <ul class="ul-list">
          <li
            v-for="(n, index) in item.slice(1)"
            :key="index"
            :class="[index % 2 === 1 ? 'line-two' : '']"
            class="li-wrap"
          >
            <a v-if="n.src" class="ins-img-wrap">
              <img
                @click="showProductDetail(n)"
                :src="n.src"
                class="small-img"
              />
              <!-- <div class="hover-wrap">
                <div class="icon-wrap"></div>
                <cup-button @click="showProductDetail(n)">SHOP NOW</cup-button>
              </div> -->
            </a>
            <div v-if="!n.src" class="lack-wrap">
              <span class="icon-wrap lack-img"></span>
            </div>
          </li>
        </ul>
      </div>
      <div v-if="isHasMore" @click="loadMore" class="load-more">
        <div>LOAD MORE</div>
        <span class="icon_load_more load-icon"></span>
      </div>
    </div>
    <pop-wrap
      :visible.sync="visible"
      :with-btn="true"
      :data-list="originList"
      @goPre="goPre"
      @goNext="goNext"
      :current-obj="productInfo"
      :link-key="linkKey"
      v-if="isPc"
    >
      <cup-product-pop
        :product-info="productInfo"
        @hide="visible = false"
      ></cup-product-pop>
    </pop-wrap>
    <cup-popup
      v-if="!isPc"
      :direction="'ltr'"
      :size="'100%'"
      :show-close="false"
      :modal="false"
      :visible="visible"
      :with-header="false"
      :bottom-show="false"
    >
      <cup-product-pop
        :product-info="productInfo"
        @hide="visible = false"
      ></cup-product-pop>
    </cup-popup>

    <!-- <cup-product-pop
      v-if="visible && !isPc"
      :product-info="productInfo"
      @hide="visible = false"
    ></cup-product-pop> -->
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
      linkKey: 'id',
      isHasMore: false,
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
      const lastLen = this.originList.length % 7
      if (lastLen > 0) {
        const len = 7 - lastLen
        const arrLen = arr.length
        for (let i = 0; i < len; i++) {
          arr[arrLen - 1].push({
            src: '',
            id: null,
          })
        }
      }
      return arr
    },
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
.li-wrap {
  &:hover .hover-wrap {
    visibility: visible;
    transition: all 0.3s ease-in-out;
  }
}
.div-wrap {
  width: 592px;
  height: 592px;
}
.ins-img-wrap {
  position: relative;
  display: block;
  height: 100%;
}
.lack-wrap {
  @include setMiddle();
  height: 100%;
  background: #fafafa;
  .lack-img {
    @include backgroundImage('iconInsGrey');
  }
}
.icon-wrap {
  width: 50px;
  height: 50px;
  @include backgroundImage('iconIns');
  background-size: 100% 100%;
}
.hover-wrap {
  transition: all 0.3s ease-in-out;
  visibility: hidden;
  position: absolute;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background: rgba(255, 255, 255, 0.7);
  @include setColumn();

  .cs-button {
    width: 180px;
    height: 44px;
    margin-top: 20px;
    background: #000;
    color: #fff;
    cursor: pointer;
    ::v-deep span {
      line-height: 44px;
    }
  }
}
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
  width: 100%;
  height: 100%;
}

.ul-list {
  width: 912px;
  height: 592px;
  font-size: 0;
  li {
    display: inline-block;
    width: 288px;
    height: 288px;
    margin-left: 16px;
    vertical-align: middle;
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
    width: 343px;
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
