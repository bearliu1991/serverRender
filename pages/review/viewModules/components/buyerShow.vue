<template>
  <div class="cs_home_popup" :class="[!isPc && 'mobile-div']">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <div class="img-wrap">
        <!-- <client-only> -->
        <!-- <cup-swiper-pc :list="productInfo.medias" :option="swiperOption"> -->
        <!-- <template v-for="(m, index) in productInfo.medias">
            <img :src="m.link" :key="index" class="big-img" />
          </template> -->
        <!-- </cup-swiper-pc> -->
        <!-- </client-only> -->

        <swiper
          ref="mySwiper"
          class="swiper"
          style="width: 500px;"
          :options="swiperOption"
        >
          <swiper-slide
            v-for="(item, index) in productInfo.medias"
            :key="index"
          >
            <!-- <el-image :src="item.link" fit="cover"></el-image>
            <template v-if="item === 'video'"
              ><video :src="item.link"></video
            ></template> -->
            <img :src="item.link" :key="index" class="big-img" />
          </swiper-slide>
          <div class="swiper-pagination"></div>
        </swiper>

        <div class="ul-list">
          <span
            @click="$emit('hide')"
            class="close-button icon-svg iconsousuo-web-guanbi pointer"
          ></span>
          <div class="top-wrap">
            <img :src="src" class="small-img" />
            <div class="top-part">
              <p class="product-name">{{ productInfo.name || 'FALL FEST' }}</p>
              <div class="score-rate">
                <span class="score-number">{{ productInfo.rating }}</span>
                <cup-rate
                  :value="productInfo.rating"
                  :score="productInfo.rating"
                ></cup-rate>
              </div>
              <cup-button>SHOP NOW</cup-button>
            </div>
          </div>
          <div class="second-part">
            <div class="c-comment">
              <div class="c-comment-avatar">
                <div class="avatar-img">
                  <span class="nameInitial">
                    {{ productInfo.account | firstChar | toUpperCase }}
                  </span>
                  <span class="mark">
                    <i class="icon iconfont iconweb-24-renzheng"></i>
                  </span>
                </div>
                <div class="avatar-name">
                  <span class="name">
                    {{ productInfo.account }}
                  </span>
                  <span class="descrption"> Verifued Buyer </span>
                  <cup-rate
                    class=""
                    :value="productInfo.rating"
                    :score="-1"
                  ></cup-rate>
                </div>
              </div>
              <div class="time-show">{{ productInfo.gmtCreate }}</div>
            </div>
            <div class="description">
              <span>
                {{ productInfo.content }}
              </span>
              <!-- <div class="read-more">...Read more</div> -->
            </div>
          </div>
          <div class="pop-icon-list">
            <div class="first-part">
              <!-- <span><i class="icon-share"></i>Share</span> -->
              <span v-for="(item, key) in socialSoftwareList" :key="key">
                <i class="icon iconfont" :class="[item.icon]"></i
                >{{ item.name }}
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
        <div class="m-close-button" @click="$emit('hide')">
          <i class="icon iconfont icontopbar-wap-guanbi"></i>
        </div>
        <img :src="src" class="big-img" />
        <div class="ul-list">
          <div class="top-wrap">
            <img :src="src" class="small-img" />
            <div class="top-part">
              <p class="product-name">{{ productInfo.name }}</p>
              <div class="score-rate">
                <span class="score-number">{{ productInfo.rating }}</span>
                <cup-rate :value="productInfo.rating" :score="-1"></cup-rate>
              </div>
              <cup-button>SHOP NOW</cup-button>
            </div>
          </div>
          <div class="split-line"></div>
          <div class="second-part">
            <div class="c-comment">
              <div class="c-comment-avatar">
                <div class="avatar-img">
                  <span class="nameInitial">
                    {{ productInfo.account | firstChar | toUpperCase }}
                    A
                  </span>
                  <span class="mark">
                    <i class="icon iconfont iconweb-24-renzheng"></i>
                  </span>
                </div>
                <div class="avatar-name">
                  <span class="name">
                    {{ productInfo.account }}
                  </span>
                  <span class="descrption"> Verifued Buyer </span>
                </div>
              </div>
              <div class="time-show">{{ productInfo.gmCreate }}</div>
            </div>
            <cup-rate
              class="m-rate"
              :value="productInfo.rating"
              :score="-1"
            ></cup-rate>
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
              <!-- <span><i class="icon-share"></i>Share</span> -->
              <span v-for="(item, key) in socialSoftwareList" :key="key">
                <i class="icon iconfont" :class="[item.icon]"></i
                >{{ item.name }}
              </span>
            </div>
            <div>
              <span class="icon-svg iconweb-18-zanmoren"></span>
              {{ productInfo.linked }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../../indexMixin'
export default {
  name: 'CupProductPop',
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      default: () => {},
    },
    productInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      socialSoftwareList: [
        {
          name: 'Facebook',
          icon: 'iconweb-18-facebook',
        },
        {
          name: 'Twitter',
          icon: 'icontwitter1',
        },
        {
          name: 'LinkedIn',
          icon: 'iconins',
        },
      ],
      swiperOption: {
        slidesPerView: 'auto',
        spaceBetween: 8,
        // autoplay: true,
        loopAdditionalSlides: 1,
        loopFillGroupWithBlank: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
      },
      src:
        'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
    }
  },
}
</script>

<style lang="scss" scoped>
.cs_home_popup.mobile-div {
  height: 100%;
  width: 100%;
  overflow-y: auto;
  .pop-icon-list {
    margin-bottom: 20px;
  }
}
.m-rate {
  margin: 24px 0 8px 0;
}
.pc-wrap {
  padding: 40px;
  .img-wrap {
    display: flex;
  }
}
/deep/ .cs_sub_pop_wrap {
  overflow: auto;
}
.m-close-button {
  position: fixed;
  top: 16px;
  right: 16px;
  background: rgba($color: #fff, $alpha: 0.8);
  border-radius: 50%;
}
.top-wrap {
  @include setStart();
  padding-bottom: 100px;
}
.small-img {
  width: 120px;
  height: 180px;
  margin-right: 30px;
  object-fit: cover;
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
      }
      margin-right: 8px;
      @include setStart();
    }
  }
  i {
    width: 26px;
    height: 26px;
    line-height: 26px;
    text-align: center;
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
    height: 0.2rem;
    width: 0.2rem;
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
.c-comment {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  margin-bottom: 16px;
}
.c-comment-avatar {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  margin-right: 60px;
  flex: 2;
  .avatar-img {
    margin-right: 10px;
    position: relative;
    .nameInitial {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      line-height: 60px;
      text-align: center;
      background: #f2f2f2;
      color: #999999;
      display: inline-block;
      font-size: 36px;
    }
    .mark {
      position: absolute;
      bottom: -2px;
      right: -2px;
      i {
        font-size: 24px;
      }
    }
  }
  .avatar-name {
    display: flex;
    flex-direction: column;
    .name {
      font-size: 18px;
      @include font($fontMuliBold);
    }
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
