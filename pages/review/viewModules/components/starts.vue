<template>
  <div class="container-grade">
    <div class="grade-top">
      <h1 :style="size">{{ scoreAndCount.score }}</h1>
      <div class="grade-top-start">
        <cup-rate :value="Number(scoreAndCount.score)" :score="-1" />
        <p :style="mtop">{{ scoreAndCount.count }} reviews</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    size: {
      type: Object,
      default() {
        return { fontSize: '60px' }
      },
    },
    mtop: {
      type: Object,
      default() {
        return { marginTop: '10px' }
      },
    },
    scoreAndCount: {
      type: Object,
      default: () => {},
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
