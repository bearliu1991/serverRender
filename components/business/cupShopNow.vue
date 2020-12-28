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
        'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
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
