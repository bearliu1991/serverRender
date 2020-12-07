<template>
  <label :class="['cs-checkbox', $store.state.terminal]">
    <span :class="[{ ['disabled']: parenDisabled }]">
      <i
        :class="[
          currentValue
            ? 'iconweb-14-gouxuanxiang-xuanzhong1'
            : 'iconweb-14-gouxuanxiang-moren1',
          'icon iconfont',
        ]"
      ></i>
    </span>
    <input
      v-if="parent"
      v-model="model"
      type="checkbox"
      :value="label"
      class="cs-Checkbox-input"
      :disabled="parenDisabled"
      hidden
      @change="change"
    />
    <input
      v-else
      type="checkbox"
      class="cs-Checkbox-input"
      :checked="currentValue"
      :disabled="parenDisabled"
      hidden
      @change="change"
    />
    <span
      :class="['cs-checkbox-text', { ['disabled']: parenDisabled }]"
      onselectstart="return false;"
    >
      <slot>{{ label }}</slot>
    </span>
  </label>
</template>
<script>
import { findComponentUpward } from './../../assets/js/utils'
export default {
  name: 'CupCheckbox',
  props: {
    label: {
      type: [String, Number, Boolean],
      default: '',
    },
    value: {
      type: Boolean,
    },
    disabled: {
      type: Boolean,
    },
  },
  data() {
    return {
      parent: '',
      currentValue: this.value,
      model: [],
    }
  },
  computed: {
    parenDisabled() {
      if (this.parent) {
        const { parentFnc } = this
        return parentFnc('disabled')
      }
      return this.disabled
    },
  },
  watch: {
    value(val) {
      this.currentValue = val
    },
    model(val) {
      for (let i = 0; i < val.length; i += 1) {
        if (!this.label) {
          return
        }
        if (val[i] === this.label) {
          this.currentValue = true
          break
        }
        this.currentValue = false
      }
    },
  },
  mounted() {
    const parent = findComponentUpward(this, 'CupCheckboxGroup')
    if (parent) {
      this.parent = parent
      parent.updateModel()
    }
  },
  methods: {
    /**
     * 根据入参判断CheckboxGroup组件是否有指定的的值
     */
    parentFnc(options, value) {
      if (value) {
        return this.parent[options] === value
          ? this[options]
          : this.parent[options]
      }
      return this.parent[options] ? this.parent[options] : this[options]
    },
    change(e) {
      if (this.parenDisabled) {
        return
      }
      // 如果存在父组件的实例，则触发父组件对应的方法
      if (this.parent) {
        this.parent.change(this.model)
        return
      }
      this.currentValue = e.target.checked
      this.$emit('input', this.currentValue)
      this.$emit('on-change', this.currentValue)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-checkbox {
  font-size: 0;
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  cursor: pointer;
  &-text {
    font-size: 14px;
    color: #333333;
    margin-left: 8px;
  }
  i {
    font-size: 14px;
  }
  .iconweb-14-gouxuanxiang-moren1 {
    color: #d8d8d8;
  }
  &.mobile {
    .cs-checkbox-text {
      font-size: 12px;
    }
  }
}
</style>
