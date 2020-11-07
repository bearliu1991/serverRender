<template>
  <div v-if="$store.state.terminal == 'pc'" class="cs-cart">
    <big-cart></big-cart>

    <Recommend
      v-if="recommendData"
      title="YOU MAY ALSO LIKE"
      :list="recommendData"
    />
  </div>
</template>
<script>
export default {
  data() {
    return {
      recommendData: [],
    }
  },
  created() {
    this.queryLikeProduct()
  },
  methods: {
    // 猜你喜欢
    async queryLikeProduct() {
      const result = await this.$api.product.queryLikePrd()
      if (result) {
        this.recommendData = result.list
      }
    },
  },
}
</script>
