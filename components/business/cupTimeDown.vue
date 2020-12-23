<template>
  <div class="cs-cutTimeDown">
    <section>
      <em class="num">{{ dd }}</em>
      <em class="num">{{ hh }}</em>
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
    this.timer = setInterval(() => {
      self.date--
      self.showTime()
    }, 1000)
  },
  destroyed() {
    clearInterval(this.timer)
  },
  methods: {
    showTime() {
      const { date } = this
      const time = date
      const dd = Math.floor(time / (60 * 60 * 24))
      const hh = Math.floor((time / 60 / 60) % 24)
      const mm = Math.floor((time / 60) % 60) // 计算分钟数
      const ss = Math.floor(time % 60) // 计算秒数

      this.ss = ss
      this.mm = mm
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
  padding-bottom: 16px;
  background: #ffffff;
  text-align: right;
  section {
    box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
    padding: 9px 16px;
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
}
</style>
