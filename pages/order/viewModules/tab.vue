<template>
  <div class="cs-tab">
    <ul>
      <li class="active" @click="change(1)">
        <i class="icon iconfont iconicon-wap-18-buzhou-1ing"></i>
        <span>Delivery</span>
        <i class="icon iconfont icon12-jiantou-shangla"></i>
      </li>
      <li :class="currentStep == 2 ? 'active' : ''" @click="change(2)">
        <i
          v-if="currentStep == 2"
          class="icon iconfont iconicon-wap-18-buzhou-2ing"
        ></i>
        <i v-else class="icon iconfont iconicon-wap-18-buzhou-2moren"></i>
        <span>Payment</span>
      </li>
    </ul>
    <div class="tab-wrap">
      <slot></slot>
    </div>
    <div class="tab-bottom">
      <i class="icon iconfont iconicon-web-14-jiantou-fenyezuojiannormal"></i>
      <p>Return to shopping</p>
      <cup-button type="primary">CONTINUE TO PAYMENT</cup-button>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    step: {
      type: Number,
      default: 1,
    },
  },
  data() {
    return {
      currentStep: 1,
    }
  },
  watch: {
    step(val) {
      this.currentStep = val
    },
  },
  methods: {
    change(step) {
      this.currentStep = step
      this.$emit('onStep', step)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-tab {
  padding: 0 40px;
  ul {
    display: flex;
    margin-bottom: 52px;
    li {
      display: flex;
      align-items: center;
    }
  }
  i {
    font-size: 22px;
    margin-right: 4px;
  }
  span {
    font-size: 18px;
    font-family: Muli-Regular_Light, Muli;
    font-weight: normal;
    color: #999999;
    line-height: 23px;
  }
  .active {
    span {
      color: #333333;
    }
  }
  .icon12-jiantou-shangla {
    transform: rotate(90deg);
    display: inline-block;
    font-size: 14px;
    margin-left: 10px;
  }
  .tab-bottom {
    margin-bottom: 40px;
    display: flex;
    align-items: center;
    i {
      font-size: 12px;
    }
    p {
      flex: 1;

      font-size: 14px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 18px;
      margin-left: 3px;
    }
  }
}
</style>
