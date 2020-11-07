<template>
  <div style="height: 10000px;">
    <cup-banner :banner-list="bannerList"></cup-banner>
    {{ popup }}
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $api }, query, params }) {
    const homeData = await $api.homePage.homePageData()
    console.log(homeData)
    return {
      popup: homeData.popup,
      // bannerList: homeData.slideshow,
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
}
</script>
