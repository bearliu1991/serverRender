<template>
  <div class="cs_home_rich_text" v-if="childObj.enable">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <a :href="transferUrl(childObj.link)">
        <img :src="childObj.pcImage" class="main-img" />
      </a>
    </div>
    <div v-else class="mobile-wrap">
      <a :href="transferUrl(childObj.link)">
        <img :src="childObj.mobileImage" class="main-img" />
      </a>
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
      obj: {
        src:
          'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
        title: 'Trend Forecast',
        content:
          'Stay ahead of the cu,Stay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cuStay ahead of the cu',
        buttonText: 'Shop New Trends',
      },
    }
  },
}
</script>

<style lang="scss" scoped>
.pc-wrap {
  padding-top: 20px;
  padding-bottom: 100px;
  img {
    width: 100%;
    height: 400px;
  }
}
.mobile-wrap {
  margin-bottom: 48px;
  img {
    width: 100%;
    height: 334px;
  }
}
</style>
