<template>
  <transition name="fade">
    <div v-show="isShow" class="cs-dropdown-menu" :style="style">
      <div class="cs-dropdown-body">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'CupDropdownMenu',
  data() {
    return {
      style: {},
      isShow: false,
    }
  },
  inject: ['dropdown'],
  mounted() {
    window.addEventListener('click', (event) => {
      if (!this.dropdown.elm.contains(event.target)) {
        if (this.isShow) {
          this.isShow = false
        }
      }
    })
  },
  methods: {
    showDrop(position) {
      const dropdown = this.dropdown.elm
      this.isShow = true
      this.style = {
        top: dropdown.offsetHeight + 11 + 'px',
      }
    },
  },
}
</script>
<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.cs-dropdown {
  &-body {
    z-index: 999;
    position: relative;
  }
  &-menu {
    min-width: 212px;
    position: absolute;
    right: -8px;
    background: #fff;
    box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.2);
    &::before {
      position: absolute;
      top: -5px;
      right: 18px;
      content: '';
      width: 11px;
      height: 11px;
      background: #fff;
      transform: rotate(135deg);
      box-shadow: 0px 3px 6px 0px rgba(0, 0, 0, 0.1);
    }

    &::after {
      position: absolute;
      top: 0px;
      right: 10px;
      content: '';
      width: 52px;
      height: 52px;
      background: #fff;
    }
  }
}
</style>
