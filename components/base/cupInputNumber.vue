<template>
  <div class="cs-add-minus">
    <i
      v-if="min === '' || inputNumber > min"
      class="icon iconfont iconicon-wap-18-jianmoren"
      @click="minus"
    ></i>
    <i v-else class="icon iconfont iconicon-web-18-jiandisable"></i>
    <input
      v-model="inputNumber"
      type="number"
      name="inputNumber"
      disabled
      @change="change($event)"
    />

    <i
      v-if="max === '' || inputNumber < max"
      class="icon iconfont iconicon-wap-18-jiamoren"
      @click="add"
    ></i>
    <i v-else class="icon iconfont iconicon-web-18-jiadisable"></i>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1,
    },
    min: {
      type: [String, Number],
      default: '',
    },
    max: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      inputNumber: this.value,
    }
  },
  watch: {
    value: {
      handler(val) {
        console.log(val)
        this.inputNumber = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    add() {
      const { max, inputNumber } = this
      if (Number(max) === 0 || inputNumber < Number(max)) {
        this.inputNumber++
        this.emitEvent()
      }
    },
    minus() {
      const { min, inputNumber } = this
      if (inputNumber > min) {
        this.inputNumber--
        this.emitEvent()
      }
    },
    change(event) {
      this.inputNumber = event.target.value
      this.emitEvent()
    },
    emitEvent() {
      this.$emit('input', this.inputNumber)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-add-minus {
  display: flex;
  .icon {
    width: 18px;
    height: 18px;
    line-height: 18px;
  }
  input {
    outline: none;
    width: 39px;
    height: 17px;
    font-size: 13px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #222222;
    line-height: 17px;
    border: none;
    margin-left: 8px;
    margin-right: 8px;
    text-align: center;
    &:disabled {
      background-color: transparent;
    }
  }
}
</style>
