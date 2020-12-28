<template>
  <div v-if="isShow" :class="['cs-cutTimeDown', $store.state.terminal]">
    <slot></slot>
    <section>
      <em class="num">{{ mm | sliceStr(0) }}</em>
      <em class="num">{{ mm | sliceStr(1) }}</em>
      <span>:</span>
      <em class="num">{{ ss | sliceStr(0) }}</em>
      <em class="num">{{ ss | sliceStr(1) }}</em>
    </section>
  </div>
</template>
<script>
export default {
  filters: {
    sliceStr(value, index) {
      return value.toString().slice(index, index + 1)
    },
  },
  props: {
    times: {
      type: [String, Number],
      default: '',
    },
  },
  data() {
    return {
      isShow: false,
      date: 0,
      ss: '',
      mm: '',
      dd: '',
      hh: '',
      timer: null,
    }
  },
  mounted() {
    const self = this
    this.date = this.times / 1000
    this.isShow = true
    const cb = () => {
      if (self.date > 0) {
        self.date--
        self.showTime()
      } else {
        self.clearTime()
      }
    }
    cb()
    this.timer = setInterval(cb, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    clearTime() {
      clearInterval(this.timer)
      this.isShow = false
      this.$emit('clear')
    },
    showTime() {
      const { date } = this
      const time = date
      const dd = Math.floor(time / (60 * 60 * 24))
      const hh = Math.floor((time / 60 / 60) % 24)
      const mm = Math.floor((time / 60) % 60) // 计算分钟数
      const ss = Math.floor(time % 60) // 计算秒数

      this.ss = ss < 10 ? `0${ss}` : ss
      this.mm = mm < 10 ? `0${mm}` : mm
      this.dd = dd
      this.hh = hh
    },
  },
}
</script>
<style lang="scss" scoped>
.pc {
  &.cs-cutTimeDown {
    em {
      width: 18px;
      height: 18px;
    }
  }
}
// 倒计时
.cs-cutTimeDown {
  margin-top: 10px;
  position: relative;
  margin-bottom: 16px;
  background: #ffffff;
  display: inline-block;
  padding: 12px;
  line-height: normal;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
  section {
    display: inline-block;
    color: #e61717;
  }
  em {
    display: inline-block;
    width: 16px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background: rgba(230, 23, 23, 0.15);
    font-family: Muli-Bold, Muli;
    font-weight: bold;
  }
  &.bottom {
    position: fixed;
    &::before {
      top: 30px;
      right: 79px;
    }
    &::after {
      top: 25px;
      right: 75px;
    }
  }
  &.left {
    &::before {
      top: 50%;
      transform: rotate(45deg) translateY(-50%);
      left: -8px;
    }
    &::after {
      height: 22px;
      width: 8px;
      top: 50%;
      transform: translateY(-50%);
      left: -1px;
    }
  }
  &::before {
    content: '';
    display: block;
    top: -4px;
    position: absolute;
    right: 45px;
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
    width: 8px;
    height: 8px;
    transform: rotate(45deg);
  }
  &::after {
    content: '';
    display: block;
    top: 0;
    position: absolute;
    right: 40px;
    width: 22px;
    height: 8px;
    z-index: 999;
    background: #fff;
  }
  // /*黑色三角形   */
  // &:before {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   top: 42px;
  //   right: 79px;
  //   width: 0;
  //   height: 0;
  //   border: 8px solid;
  //   margin-top: -8px;
  //   border-color: rgba(0, 0, 0, 0.12) transparent transparent transparent;
  // }
  /*背景色三角形*/
  // &:after {
  //   content: '';
  //   display: block;
  //   position: absolute;
  //   top: 41px;
  //   right: 80px;
  //   width: 0;
  //   height: 0;
  //   border: 8px solid;
  //   margin-top: -8px;
  //   border-color: #fff transparent transparent transparent;
  // }
}
</style>
