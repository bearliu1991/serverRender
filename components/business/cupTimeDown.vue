<template>
  <div v-if="isShow" class="cs-cutTimeDown">
    <slot></slot>
    <section>
      <em class="num">{{ mm }}</em>
      <em class="num">{{ mm }}</em>
      <span>:</span>
      <em class="num">{{ mm }}</em>
      <em class="num">{{ ss }}</em>
    </section>
  </div>
</template>
<script>
export default {
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
      ss: '00',
      mm: '00',
      dd: '00',
      hh: '00',
      timer: null,
    }
  },
  mounted() {
    const self = this
    this.date = this.times / 1000
    this.isShow = true
    this.timer = setInterval(() => {
      if (self.data > 0) {
        self.date--
        self.showTime()
      } else {
        this.clearTime()
      }
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    clearTime() {
      clearInterval(this.timer)
      // this.isShow = false
      this.$emit('clear')
    },
    showTime() {
      const { date } = this
      const time = date
      const dd = Math.floor(time / (60 * 60 * 24))
      const hh = Math.floor((time / 60 / 60) % 24)
      const mm = Math.floor((time / 60) % 60) // 计算分钟数
      const ss = Math.floor(time % 60) // 计算秒数

      this.ss = ss.length === 1 ? `0${ss}` : ss
      this.mm = mm.length === 1 ? `0${mm}` : mm
      this.dd = dd
      this.hh = hh
    },
  },
}
</script>
<style lang="scss" scoped>
// 倒计时
.cs-cutTimeDown {
  margin-top: 10px;
  margin-bottom: 16px;
  background: #ffffff;
  text-align: right;
  padding: 9px 16px;
  box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
  section {
    display: inline-block;
    color: #e61717;
  }
  em {
    display: inline-block;
    width: 26px;
    height: 16px;
    line-height: 16px;
    text-align: center;
    background: rgba(230, 23, 23, 0.15);
    font-family: Muli-Bold, Muli;
    font-weight: bold;
  }
  /*黑色三角形   */
  &:before {
    content: '';
    display: block;
    position: absolute;
    top: 42px;
    right: 79px;
    width: 0;
    height: 0;
    border: 8px solid;
    margin-top: -8px;
    border-color: rgba(0, 0, 0, 0.12) transparent transparent transparent;
  }
  /*背景色三角形*/
  &:after {
    content: '';
    display: block;
    position: absolute;
    top: 41px;
    right: 80px;
    width: 0;
    height: 0;
    border: 8px solid;
    margin-top: -8px;
    border-color: #fff transparent transparent transparent;
  }
}
</style>
