<template>
  <div class="container-grade">
    <div class="grade-top">
      <h1 :style="size">4.9</h1>
      <div class="grade-top-start">
        <cup-rate :value="4" :score="-1" />
        <p :style="mtop">106 reviews</p>
      </div>
    </div>
    <!-- <div class="garde-bottom">
      <i class="icon iconfont iconweb-18-sizefite"></i>
      <span>Size Fit</span>
      <span>Just Right</span>
    </div> -->
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return { fontSize: '60px' }
      },
    },
    mtop: {
      type: Object,
      // 对象或数组默认值必须从一个工厂函数获取
      default() {
        return { marginTop: '10px' }
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.grade-top {
  display: flex;
  justify-content: space-around;
  align-items: center;
  h1 {
    font-size: 60px;
    @include font($fontMuliBold);
    margin-right: 13px;
  }
  &-start {
    p {
      font-size: 14px;
      @include font($fontRegular);
      margin-top: 10px;
      color: #333333;
    }
  }
}
.garde-bottom {
  i {
    width: 18px;
    height: 18px;
  }
  span {
    font-size: 12px;
    @include font($fontMuliBold);
    color: #333333;
    &:nth-of-type(1) {
      margin-right: 20px;
    }
  }
}
</style>
