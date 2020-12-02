<template>
  <div class="cup-drop-down-button">
    <button :class="{ active: isActive }" @click.stop="isActive = !isActive">
      <slot name="title"></slot><i class="iconfont">&#xe664;</i>
    </button>
    <transition name="fade" mode="out-in">
      <div v-show="isActive" class="drop-wrap">
        <ul>
          <li v-for="(item, index) in options" :key="index">
            <a
              href="javascript:;"
              :class="{ active: item.key === value }"
              @click.stop="update(item)"
              >{{ item.show }}</a
            >
          </li>
        </ul>
      </div></transition
    >
  </div>
</template>

<script>
export default {
  name: 'CupDropDownButton',
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    value: {
      required: true,
    },
  },
  data() {
    return {
      isActive: false,
    }
  },
  mounted() {
    const fn = () => {
      if (this.isActive) {
        this.isActive = false
      }
    }
    document.documentElement.addEventListener('click', fn)
    this.$on('hook:beforeDestroy', fn)
  },
  methods: {
    update(item) {
      this.$emit('input', item.key)
      this.isActive = false
    },
  },
}
</script>

<style lang="scss" scoped>
.cup-drop-down-button {
  position: relative;
}
button {
  line-height: 56px;
  height: 56px;
  padding: 0 16px;

  font-size: 14px;
  font-family: Muli-Bold, Muli;
  font-weight: bold;
  color: #333333;
  line-height: 18px;
  letter-spacing: 1px;

  appearance: none;
  border: 0;
  background: none;
  &:focus {
    outline: none;
  }
  &:hover {
    cursor: pointer;
  }

  i {
    display: inline-block;
    transform: rotate(180deg);
    transition: transform 0.3s ease;
    margin-left: 10px;
    color: #999;
  }
  &.active i {
    transform: rotate(0);
    color: #333;
  }
}
.drop-wrap {
  margin: 0 10px;
  position: absolute;
  right: 0;
  z-index: 10;
  background: #ffffff;
  border: 1px solid #d8d8d8;
}
ul {
  min-width: 284px;
  margin: 20px 0;
}
li {
  a {
    font-size: 14px;
    color: #999999;
    line-height: 18px;
    letter-spacing: 2px;

    height: 40px;
    line-height: 40px;
    padding: 0 30px;
    display: block;
    text-align: right;
    text-transform: uppercase;

    &:hover {
      background: #f2f2f2;
    }
    &.active {
      background-color: rgba(255, 171, 0, 0.1);

      font-family: Muli-Bold, Muli, sans-serif;
      font-weight: bold;
    }
  }
}
</style>
