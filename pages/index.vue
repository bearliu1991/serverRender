<template>
  <div class="container">
    这是首页
    <p>cupshe 按钮</p>
    <cup-button>default</cup-button>
    <cup-button disabled>disabled</cup-button>
    <cup-button type="primary">primary</cup-button>
    <cup-button type="primary" size="medium">primary</cup-button>
    <p>cupshe 弹出层</p>
    <cup-popup visible> kkkkkkkkkkkkk </cup-popup>
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $http, store } }) {
    const res = await $http.get('musicRankings')
    // eslint-disable-next-line no-console
    // console.log('测试数据', res)
    return {
      res,
    }
  },
  data() {
    return {
      name: '1',
    }
  },
  computed: {},
  beforeCreate() {},
  mounted() {},
  methods: {
    async getVideo() {
      const res = await this.$http.videoCategory()
      // eslint-disable-next-line no-console
      console.log(res)
    },
  },
}
</script>

<style lang="scss"></style>
