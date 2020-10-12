<template>
  <div class="container">
    这是首页
    <cs-button>default</cs-button>
    <cs-button disabled>disabled</cs-button>
    <cs-button type="primary">primary</cs-button>
    <cs-button type="primary" size="medium">primary</cs-button>
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
