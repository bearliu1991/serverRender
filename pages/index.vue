<template>
  <div style="height: 10000px;"></div>
</template>

<script>
export default {
  async asyncData({ app: { $api }, query, params }) {
    const homeData = await $api.homePage.homePageData()
    console.log(homeData)
    return {
      popup: homeData.popup,
    }
  },
  data() {
    return {}
  },
}
</script>
