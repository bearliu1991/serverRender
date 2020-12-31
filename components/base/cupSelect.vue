<template>
  <div
    :class="['cs-select', disabled ? 'is-disabled' : '', $store.state.terminal]"
  >
    <div class="cs-select-input">
      <input
        v-model="currentLable"
        type="text"
        :disabled="disabled"
        readonly="readonly"
        autocomplete="off"
        :placeholder="placeholder"
        class="cs-input_inner"
        @blur="blur"
        @click="click"
      />
      <span class="cs-input_suffix">
        <i
          :class="[
            'icon',
            'iconfont',
            'icon12-jiantou-shangla',
            isFocus ? 'is-reverse' : '',
          ]"
        ></i>
      </span>
    </div>
    <div class="cs-select-dropDown">
      <transition name="fade">
        <ul v-show="isFocus" class="cs-select-dropDown_list">
          <slot></slot>
        </ul>
      </transition>
    </div>
  </div>
</template>
<script>
import { findComponentsDownward } from './../../assets/js/utils'
export default {
  name: 'CupSelect',
  props: {
    placeholder: {
      type: String,
      default: '请选择',
    },
    value: {
      type: [String, Number],
      default: '',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isFocus: false,
      // key
      currentValue: '',
      // value
      currentLable: '',
    }
  },
  watch: {
    value: {
      handler(val) {
        this.currentValue = val
        this.updateModel()
      },
      immediate: true,
    },
  },
  methods: {
    blur() {
      this.isFocus = false
    },
    click() {
      if (this.disabled) {
        return false
      }
      this.isFocus = !this.isFocus
    },
    updateModel() {
      this.childrens = findComponentsDownward(this, 'CupOption')
      if (this.childrens && this.currentValue) {
        this.childrens.forEach((element) => {
          element.model = this.currentValue
        })
      } else {
        this.childrens.forEach((element) => {
          element.model = this.currentValue
        })
        this.change('', '')
      }
    },
    change(label, value) {
      this.isFocus = false
      this.currentValue = value
      this.currentLable = label || value
      this.$emit('input', value, label)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-select {
  display: inline-block;
  position: relative;
  width: 100%;
  outline: none;
  cursor: pointer;
  & > &-input {
    display: block;
    font-size: 14px;
    appearance: none;
    outline: none;
    background: transparent;
    .cs-input {
      &_inner {
        appearance: none;
        cursor: pointer;
        border-radius: 0;
        border: 1px solid #d8d8d8;
        height: 44px;
        line-height: 44px;
        outline: none;
        padding: 0 56px 0 12px;
        color: #999;
        width: 100%;
        z-index: 99;
        position: relative;

        @include line-clamp(1);
        &:focus {
          border: 1px solid #000000;
        }
      }
      &_suffix {
        position: absolute;
        top: 0;
        right: 0;
        width: 44px;
        height: 44px;
        display: inline-block;
        border-left: 1px solid #d8d8d8;
        line-height: 44px;
        text-align: center;
        transition: all 0.3s;
        color: #999;
        i {
          display: inline-block;
          height: 44px;
          transition: transform 0.3s, -webkit-transform 0.3s;
          -webkit-transform: rotateZ(180deg);
          transform: rotateZ(180deg);
          font-size: 12px;
          &.is-reverse {
            transform: rotateZ(0);
            color: #333;
          }
        }
      }
    }
  }
  &-dropDown {
    position: absolute;
    right: 0;
    left: 0;
    top: 44px;
    z-index: 2000;
    &_list {
      background: #fafafa;
      max-height: 259px;
      border: 1px solid #d8d8d8;
      overflow-y: auto;
    }
  }
  &.mobile {
    & > .cs-select-input {
      font-size: 12px;
    }
    /deep/ .cs-select-dropDown_list {
      li {
        font-size: 12px;
      }
    }
  }
}
.is-disabled {
  &.cs-select {
    .cs-select-input {
      .cs-input_inner {
        border: 1px solid #f2f2f2;
        background-color: #fff;
        color: #999;
        cursor: not-allowed;
      }
    }
  }
}
</style>
