<template>
  <div class="cs_home_popup" :class="[!isPc && 'mobile-div']">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <div class="img-wrap">
        <img :src="src" class="big-img" />
        <div class="ul-list">
          <span
            @click="$emit('hide')"
            class="close-button icon-svg iconsousuo-web-guanbi pointer"
          ></span>
          <div class="top-wrap">
            <img :src="src" class="small-img" />
            <div class="top-part">
              <p class="product-name">werwfwfewfwfeewsfsfsf</p>
              <div class="score-rate">
                <span class="score-number">{{ productInfo.rating }}</span>
                <cup-rate :value="productInfo.rating" :score="4"></cup-rate>
              </div>
              <cup-button>SHOP NOW</cup-button>
            </div>
          </div>
          <div class="second-part">
            <div class="title-wrap">
              <div class="first-wrap">
                <img class="radius-img" />
                <p class="user-name">MAllary B</p>
              </div>
              <span class="time-show">18/04/2020</span>
            </div>
            <div class="description">
              <span>
                I love this swim suiI love this swim suiI love this swim sui I
                love this swim suiI love this swim suiI love this swim sui I
                love this swim sui
              </span>
              <div class="read-more">...Read more</div>
            </div>
          </div>
          <div class="pop-icon-list">
            <div class="first-part">
              <span><i class="icon-share"></i>Share</span>
              <span v-for="(item, key) in socialSoftwareList" :key="key">
                <i :class="[item.icon]"></i>{{ item.name }}
              </span>
            </div>
            <div>
              <span class="icon-svg iconweb-18-zanmoren"></span> {{ 100 }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div v-else class="mobile-wrap">
      <div class="img-wrap">
        <div class="close-button">
          <span
            @click="$emit('hide')"
            class="icon-svg iconsousuo-web-guanbi pointer"
          ></span>
        </div>
        <img :src="src" class="big-img" />
        <div class="ul-list">
          <div class="top-wrap">
            <img :src="src" class="small-img" />
            <div class="top-part">
              <p class="product-name">werwfwfewfwfeewsfsfsf</p>
              <div class="score-rate">
                <span class="score-number">{{ productInfo.rating }}</span>
                <cup-rate :value="productInfo.rating" :score="4"></cup-rate>
              </div>
              <cup-button>SHOP NOW</cup-button>
            </div>
          </div>
          <div class="split-line"></div>
          <div class="second-part">
            <div class="title-wrap">
              <div class="first-wrap">
                <img class="radius-img" />
                <p class="user-name">MAllary B</p>
              </div>
              <span class="time-show">18/04/2020</span>
            </div>
            <div class="description">
              <span>
                I love this swim suiI love this swim suiI love this swim sui I
                love this swim suiI love this swim suiI love this swim sui I
                love this swim sui
              </span>
              <div class="read-more">...Read more</div>
            </div>
          </div>
          <div class="pop-icon-list">
            <div class="first-part">
              <span><i class="icon-share"></i>Share</span>
              <span v-for="(item, key) in socialSoftwareList" :key="key">
                <i :class="[item.icon]"></i>{{ item.name }}
              </span>
            </div>
            <div>
              <span class="icon-svg iconweb-18-zanmoren"></span> {{ 100 }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'

export default {
  name: 'CupProductPop',
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      socialSoftwareList: [
        {
          name: 'Facebook',
          icon: 'icon_facebook',
        },
        {
          name: 'Twitter',
          icon: 'icon_twitter',
        },
      ],
      productInfo: {
        spuId: 384,
        size: 100,
        productName: 'bbbbbhhhh',
        productSpuState: 0,
        rating: 4,
        ratingNum: 100,
        retailPrice: '8.000000',
        discountPrice: null,
        onSaleWatermark: 0,
        colorImageUrl:
          'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/product/20200722/f7f2983b34644bd7ae9d9fb305526610.jpg',
        hoverImageUrl:
          'https://test-cupshe-optimus.oss-cn-hangzhou.aliyuncs.com/product/20200722/10fe64a841104599b13e1dfefc648021.jpg',
      },
      src:
        'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
      lists: [
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
        {
          src:
            'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.cs_home_popup.mobile-div {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 10000;
  background: #fff;
  padding-bottom: 30px;
}
.pc-wrap {
  padding: 40px;
  .img-wrap {
    display: flex;
  }
}
.top-wrap {
  @include setStart();
  padding-bottom: 100px;
}
.small-img {
  width: 120px;
  height: 180px;
  margin-right: 30px;
}
p {
  text-align: center;
}
.second-part {
  padding: 32px 16px 0 16px;
  .title-wrap {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  .first-wrap {
    @include setStart();
  }
  .radius-img {
    border-radius: 50%;
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
  p {
    font-size: 18px;
    font-weight: bold;
  }
  .time-show {
    color: #999;
    font-size: 14px;
  }
}
.description {
  font-family: Muli Regular Light;
  color: #333;
  font-size: 14px;
  font-weight: lighter;
  @include line-clamp(4);
}
.pop-icon-list {
  margin-top: 32px;
  @include setBetween();
  .first-part {
    @include setStart();
    > span {
      &:first-child {
        padding-right: 12px;
        font-weight: bold;
        margin-right: 12px;
        border-right: 1px solid #f7f7f7;
      }
      margin-right: 8px;
      @include setStart();
    }
  }
  i {
    width: 26px;
    height: 26px;
  }
  .icon_facebook {
    @include icon-image('icon_facebook', 'svg');
  }

  .icon_pinterest {
    @include icon-image('icon_pinterest', 'svg');
  }

  .icon_instagram {
    @include icon-image('icon_instagram', 'svg');
  }

  .icon_twitter {
    @include icon-image('icon_twitter', 'svg');
  }

  .icon_youtube {
    @include icon-image('icon_youtube', 'svg');
  }

  .icon_snapchat {
    @include icon-image('icon_snapchat', 'svg');
  }
}
.read-more {
  color: #ffab00;
  margin-top: 10px;
}
.big-img {
  width: 800px;
  height: 800px;
}
.top-part {
  ::v-deep .cs-button {
    width: 180px;
    display: block;
    height: 44px;
    line-height: 44px;
    background-color: #000;
    color: #fff;
  }
}
.product-name {
  color: #333;
  font-family: Muli Regular SemiBold;
  font-weight: bold;
  font-size: 18px;
  line-height: 30px;
  text-align: left;
}
.score-rate {
  display: flex;
  justify-content: flex-start;
  margin-top: 4px;
  margin-bottom: 30px;
  .score-number {
    margin-right: 10px;
    font-weight: bold;
    color: #000;
    font-size: 24px;
  }
}
.vertical-line {
  border-right: 1px solid #f7f7ff;
  height: 80%;
}
.ul-list {
  width: 552px;
  position: relative;
  padding: 80px 0 40px 40px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  .close-button {
    position: absolute;
    top: 20px;
    right: 20px;
  }
  .product-img {
    width: 120px;
    height: 180px;
    margin-right: 30px;
  }
  li {
    margin-left: 0.3%;
    width: 33%;
    float: left;
  }
}
.mobile-wrap {
  height: 100%;
  .img-wrap {
    height: 100%;
    overflow-y: scroll;
    position: relative;
    .close-button {
      position: absolute;
      top: 20px;
      right: 16px;
      width: 32px;
      line-height: 32px;
      text-align: center;
      height: 32px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.8);
    }
  }
  .top-wrap {
    @include setStart();
    padding: 24px 16px 32px 16px;
    padding-bottom: 32px;
  }
  .small-img {
    margin-right: 16px;
    width: 90px;
    height: 135px;
  }
  ::v-deep .cs-rate.mobile {
    .cs-rate-box {
      .el-rate__item {
        .el-rate__icon {
          width: 14px;
          height: 14px;
        }
      }
    }
  }
  .second-part {
    .title-wrap {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 24px;
    }
    .first-wrap {
      @include setStart();
    }
    .radius-img {
      border-radius: 50%;
      width: 40px;
      height: 40px;
      margin-right: 12px;
    }
    p {
      font-size: 18px;
      font-weight: bold;
    }
    .time-show {
      color: #999;
      font-size: 14px;
    }
  }
  .description {
    font-family: Muli Regular Light;
    color: #333;
    font-size: 14px;
    font-weight: lighter;
    @include line-clamp(4);
  }
  .pop-icon-list {
    padding: 0 16px 0 16px;
    margin-top: 32px;
    @include setBetween();
    .first-part {
      @include setStart();
      > span {
        &:first-child {
          padding-right: 12px;
          font-weight: bold;
          margin-right: 12px;
          border-right: 1px solid #f7f7f7;
        }
        margin-right: 8px;
        @include setStart();
      }
    }
    i {
      width: 26px;
      height: 26px;
    }
  }
  .read-more {
    color: #ffab00;
    margin-top: 10px;
  }
  .big-img {
    width: 100%;
    height: 375px;
  }
  .top-part {
    width: 237px;
    ::v-deep .cs-button {
      display: block;
      height: 36px;
      line-height: 34px;
      background-color: #000;
      color: #fff;
    }
  }
  .product-name {
    font-size: 18px;
    line-height: 28px;
  }
  .score-rate {
    display: flex;
    justify-content: flex-start;
    margin-top: 4px;
    margin-bottom: 15px;
    .score-number {
      margin-right: 10px;
      font-weight: bold;
      color: #000;
      font-size: 24px;
    }
  }

  .ul-list {
    width: 100%;
    padding: 0;
    .product-img {
      width: 120px;
      height: 180px;
      margin-right: 30px;
    }
    li {
      margin-left: 0.3%;
      width: 33%;
      float: left;
    }
  }
}
</style>
