<template>
  <div class="cup-item-card">
    <div class="p-img">
      <a :title="item.productName" href="#">
        <img :src="item.imageUrl" />
      </a>
    </div>

    <div class="p-name">
      <a target="_blank" :title="item.productName" href="#">
        <em>{{ item.productName }}</em>
        <i class="promo-words"></i>
      </a>
    </div>

    <div class="p-attrs">
      <div class="p-price">
        <strong>
          <em>￥</em><i>{{ item.discountPrice || item.retailPrice }}</i>
        </strong>
      </div>

      <div class="p-commit" data-done="1">
        <el-rate v-model="item.rating" disabled class="rate"></el-rate>
        <span>({{ item.ratingNum }})</span>
      </div>
    </div>

    <!-- <div class="p-focus">
      <a
        class="J_focus"
        data-sku="28170642835"
        href="javascript:;"
        onclick="searchlog(1, '28170642833','1','5','','flagsClk=419444')"
        ><i></i>关注</a
      >
    </div> -->

    <!-- <div class="p-icons" id="J_pro_28170642835" data-done="1">
      <i
        class="goods-icons4 J-picon-tips J-picon-fix"
        data-idx="1"
        data-tips="京东物流仓配，商家提供售后服务"
        >京东物流</i
      >
      <i
        class="goods-icons4 J-picon-tips"
        style="border-color: #4d88ff; color: #4d88ff;"
        data-idx="1"
        data-tips="品质服务，放心购物"
        >放心购</i
      >
    </div> -->
  </div>
</template>

<script>
export default {
  name: 'CupItemCard',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      value: 3,
    }
  },
}
</script>

<style lang="scss" scoped>
$pw: 364px;
$ph: 546px;
$padding-ratio: 546 / 364 * 100%;

.cup-item-card {
  overflow: hidden;

  //图片
  .p-img {
    padding-bottom: $padding-ratio;
    margin-bottom: 16px;
    position: relative;
    overflow: hidden;
    a,
    img {
      border: 0;
      vertical-align: middle;
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
    }
  }

  //名称
  .p-name {
    font-size: 14px;
    font-family: Muli-Regular_Light, Muli, sans-serif;
    font-weight: normal;
    color: #333333;
    line-height: 18px;
    letter-spacing: 2px;

    @include ellipsis;
    margin-bottom: 10px;

    a {
      color: inherit;
    }
  }

  //布局容器
  .p-attrs {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 15px;
  }

  //价格
  .p-price * {
    font-style: normal;
    font-size: 12px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 15px;
    letter-spacing: 2px;
  }

  // 星级评价
  .p-commit {
    .rate {
      display: inline-block;
      vertical-align: middle;
      /deep/ .el-rate__icon {
        margin-right: 0;
      }
    }
    span {
      font-size: 12px;
      font-family: PingFangSC-Light, PingFang SC, sans-serif;
      font-weight: 300;
      color: #333333;
      line-height: 17px;
    }
  }
}
</style>
