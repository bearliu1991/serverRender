<template>
  <div class="cs-add-minus">
    <section>
      <i
        v-if="min === '' || inputNumber > min"
        class="icon iconfont iconjiannormal"
        @click="minus"
      ></i>
      <i v-else class="icon iconfont iconjiannormal disabled"></i>
      <input
        v-model="inputNumber"
        type="number"
        name="inputNumber"
        disabled
        @change="change($event)"
      />

      <i
        v-if="max === '' || inputNumber < max"
        class="icon iconfont iconjianormal"
        @click="add"
      ></i>
      <i v-else class="icon iconfont iconjianormal disabled"></i>
    </section>
    <slot></slot>
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
      default: false,
    },
    // 控制数量的加减是否自动
    isAuto: {
      type: String,
      default: 'on',
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
        this.inputNumber = val
      },
      immediate: true,
      deep: true,
    },
  },
  methods: {
    add() {
      const { max, inputNumber, isAuto, disabled } = this
      if (disabled) {
        return false
      }
      if (Number(max) === 0 || inputNumber < Number(max)) {
        if (isAuto === 'on') {
          this.inputNumber++
        }
        this.$emit('add', this.inputNumber)
        this.emitEvent()
      }
    },
    minus() {
      const { min, inputNumber, isAuto, disabled } = this
      if (disabled) {
        return false
      }
      if (inputNumber > min) {
        if (isAuto === 'on') {
          this.inputNumber--
        }
        this.$emit('minus', this.inputNumber)
        this.emitEvent()
      }
    },
    change(event) {
      this.inputNumber = event.target.value
      this.emitEvent()
    },
    emitEvent(type) {
      this.$emit('input', this.inputNumber)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-add-minus {
  display: flex;
  section {
    display: flex;
    align-items: center;
  }
  .icon {
    transform: scale(0.5);
    font-size: 20px;
    display: inline-block;
    &.iconjiannormal {
      margin-left: -5px;
    }
    &.iconjianormal {
      margin-right: -5px;
    }
  }
  .disabled {
    color: #d8d8d8;
  }
  input {
    outline: none;
    width: 40px;
    height: 18px;
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #333333;
    line-height: 18px;
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
