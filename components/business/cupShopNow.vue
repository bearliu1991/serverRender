<template>
  <div class="cs_shop_now">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <img :src="src" class="main-img" />
    </div>
    <div v-else class="mobile-wrap">
      <img :src="src" class="main-img" />
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'

export default {
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {
      src:
        'https://cs-oss-release.oss-cn-hangzhou.aliyuncs.com/product/20201230/2075f7a037754f9c8a2e713fd1ab3db5.png',
    }
  },
}
</script>

<style lang="scss" scoped>
.pc-wrap {
  marigin-bottom: 100px;
}

img {
  width: 100%;
  height: 220px;
}

.mobile-wrap {
  marigin-bottom: 48px;
  img {
    height: 140px;
  }
}
</style>
