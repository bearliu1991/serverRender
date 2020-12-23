<template>
  <div style="height: 10000px; overflow: hidden;">
    <div v-if="$store.state.terminal === 'pc'" class="pc-index">
      <cup-header :child-obj="homeData"></cup-header>
      <cup-banner :child-obj="homeData.slideshow"></cup-banner>
      <!-- {{ popup }} -->
      <div class="content-wrap">
        <cup-category :child-obj="homeData.shopByCategory"></cup-category>
        <cup-collection :child-obj="homeData.collectionList"></cup-collection>
      </div>
      <cup-rich-text :child-obj="homeData.richTextWithImage"></cup-rich-text>
      <div class="scond-part">
        <cup-shop-now></cup-shop-now>
        <cup-find-us :child-obj="homeData.slideshow"></cup-find-us>
      </div>
      <cup-subcribe :child-obj="homeData.slideshow"></cup-subcribe>
      <cup-footer :child-obj="homeData.footer"></cup-footer>
      <cup-subcribe-pop></cup-subcribe-pop>
    </div>
    <div v-else class="mobile-index">
      <cup-header :child-obj="homeData"></cup-header>
      <cup-banner :child-obj="homeData.slideshow"></cup-banner>
      <!-- {{ popup }} -->
      <div class="content-wrap">
        <cup-category :child-obj="homeData.shopByCategory"></cup-category>
        <cup-collection :child-obj="homeData.slideshow"></cup-collection>
      </div>
      <cup-rich-text :child-obj="homeData.richTextWithImage"></cup-rich-text>
      <div class="scond-part">
        <cup-shop-now></cup-shop-now>
        <cup-find-us :child-obj="homeData.slideshow"></cup-find-us>
      </div>
      <cup-subcribe :child-obj="homeData.slideshow"></cup-subcribe>
      <cup-footer :child-obj="homeData.footer"></cup-footer>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $api }, query, params }) {
    const homeData = (await $api.homePage.homePageData()) || {}
    return {
      homeData,
      shopByCategory: homeData.shopByCategory,
      popup: homeData.popup,
      bannerList: {
        id: 1,
        enable: 1,
        second: 3,
        slideshowContentList: [
          {
            id: 1,
            text: 'text文本',
            pcImage:
              'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_2da94cb7-57d7-46d3-a4fb-ec35c055cf81_1400x.jpg?v=1604031014',
            mobileImage:
              'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/m_750_1020_x1400.jpg?v=1604031029',
            link: {},
          },
          {
            id: 2,
            text: 'text文本',
            pcImage:
              'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/1920_890_1800x.jpg?v=1604030341',
            mobileImage:
              'https://cdn.shopifycdn.net/s/files/1/0784/0207/files/750_1020_x1400.jpg?v=1604030355',
            link: {},
          },
        ],
      },
    }
  },

  data() {
    return {}
  },
  methods: {},
}
</script>
<style lang="scss" scoped>
.pc-index {
  .content-wrap {
    padding: 0 56px;
  }
  .scond-part {
    padding: 0 208px;
  }
}
.mobile-index {
  .content-wrap {
    padding: 0 16px;
  }
  .scond-part {
    padding: 0 16px;
  }
}
</style>
