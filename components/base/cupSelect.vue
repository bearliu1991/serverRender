<template>
  <div class="cs-select">
    <div class="cs-select-input">
      <input
        v-model="currentLable"
        type="text"
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
      this.isFocus = !this.isFocus
    },
    updateModel() {
      this.childrens = findComponentsDownward(this, 'CupOption')
      if (this.childrens) {
        this.childrens.forEach((element) => {
          element.model = this.currentValue
        })
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
  cursor: pointer;
  & > &-input {
    display: block;
    font-size: 14px;
    .cs-input {
      &_inner {
        cursor: pointer;
        background-image: none;
        border-radius: 0;
        border: 1px solid #d8d8d8;
        height: 44px;
        line-height: 44px;
        outline: none;
        padding: 0 56px 0 12px;
        -webkit-transition: border-color 0.2s
          cubic-bezier(0.645, 0.045, 0.355, 1);
        transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
        color: #999;
        width: 100%;
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
          &.is-reverse {
            transform: rotateZ(0);
            color: #333;
          }
        }

        // .is-reverse {
        //   display: inline-block;
        //   transform: rotate(180deg);
        // }
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
    // li {
    //   height: 44px;
    //   padding: 0 12px;
    //   font-size: 14px;
    //   font-family: Muli-Regular_Light, Muli;
    //   font-weight: normal;
    //   color: #999999;
    //   line-height: 44px;
    //   border-bottom: 1px solid #d8d8d8;
    //   &:hover {
    //     background: rgba(255, 171, 0, 0.1);
    //     color: #333;
    //   }
    // }
  }
}
</style>
