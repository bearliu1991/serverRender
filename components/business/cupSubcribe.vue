<template>
  <div class="cs_subcribe">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <img :src="childObj.pcImageLeft" class="left-img" />
      <div class="ul-list">
        <img :src="childObj.pcImagePcRight" class="right-img" />
        <span
          @click="$emit('showPop')"
          class="pointer close-button icon-svg iconsousuo-web-guanbi"
        ></span>
        <div class="content-wrap">
          <!-- <div class="second-wrap"> -->
          <p class="first-title">{{ childObj.heading }}</p>
          <p class="second-title">{{ childObj.subheading1 }}</p>
          <p class="third-title">{{ childObj.subheading2 }}</p>
          <cup-input
            class="button1"
            :placeholder="childObj.inputText"
          ></cup-input>
          <cup-button class="button2">{{ childObj.buttonText }}</cup-button>
          <p class="policy" v-html="childObj.description"></p>
          <!-- </div> -->
        </div>
      </div>
    </div>
    <div v-else class="mobile-wrap">
      <div class="close-button">
        <span
          @click="$emit('showPop')"
          class="icon-svg iconsousuo-web-guanbi"
        ></span>
      </div>
      <img :src="childObj.mobileImage" class="left-img" />
      <div class="ul-list">
        <div class="content-wrap">
          <!-- <div class="second-wrap"> -->
          <p class="first-title">{{ childObj.heading }}</p>
          <p class="second-title">{{ childObj.subheading1 }}</p>
          <p class="third-title">{{ childObj.subheading2 }}</p>
          <cup-input
            class="button1"
            :placeholder="childObj.inputText"
          ></cup-input>
          <cup-button class="button2">{{ childObj.buttonText }}</cup-button>
          <p class="policy" v-html="childObj.description"></p>
          <!-- </div> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  name: 'CupSubcribe',
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
          name: 'Share',
          icon: 'icon-share',
        },
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
.pc-wrap {
  height: 464px;
  display: inline-block;
  @include setMiddle();
  .ul-list {
    .content-wrap {
      padding: 16px;
    }
  }
}

.left-img {
  width: 456px;
  height: 100%;
}
.right-img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.ul-list {
  width: 480px;
  height: 100%;
  position: relative;
  padding: 80px 0 40px 40px;
  @include setColumn();
  .close-button {
    position: absolute;
    top: 40px;
    right: 40px;
    z-index: 10;
    overflow: visible;
  }
  .content-wrap {
    position: absolute;
    top: 20px;
    bottom: 20px;
    right: 20px;
    left: 20px;
    @include bg();
    @include setColumn();
    .first-child {
      font-family: Muli Bold;
      color: #333;
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 14px;
    }
    .second-title {
      font-family: Muli Regular ExtraBold;
      color: #333;
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 9px;
    }
    .third-title {
      font-family: Muli Regular Light;
      color: #666;
      font-size: 16px;
      font-weight: lighter;
      margin-bottom: 57px;
    }
    .button1 {
      color: #999;
      font-weight: lighter;
      height: 40px;
      line-height: 40px;
      margin-bottom: 24px;
      width: 320px;
    }
    .button2 {
      color: #fff;
      height: 40px;
      line-height: 40px;
      background-color: #000;
      width: 320px;
      margin-bottom: 20px;
    }
    .policy {
      font-family: Muli Regular Light;
      color: #999;
      font-size: 12px;
      font-weight: lighter;
    }
  }
}
.mobile-wrap {
  width: 311px;
  height: 436px;
  display: inline-block;
  @include setColumn();
  padding: 10px;
  position: relative;
  .close-button {
    position: absolute;
    top: 0;
    right: 0;
    width: 32px;
    line-height: 32px;
    text-align: center;
    height: 32px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.8);
  }
  .left-img {
    width: 291px;
    height: 152px;
    padding-bottom: 16px;
  }

  .ul-list {
    width: 100%;
    position: relative;
    @include setColumn();
    .content-wrap {
      @include bg();
      @include setColumn();
      .first-child {
        font-size: 14px;
        margin-bottom: 8px;
      }
      .second-title {
        font-size: 30px;
        margin-bottom: 8px;
      }
      .third-title {
        font-size: 14px;
        margin-bottom: 21px;
      }
      .button1 {
        margin: 0 atuo;
        height: 44px;
        line-height: 44px;
        margin-bottom: 12px;
        width: 279px;
      }
      .button2 {
        margin: 0 atuo;
        height: 44px;
        line-height: 44px;
        width: 279px;
        margin-bottom: 12px;
      }
      .policy {
        font-size: 12px;
        font-weight: lighter;
      }
    }
  }
}
</style>
