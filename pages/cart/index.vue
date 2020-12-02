<template>
  <div v-if="terminal == 'pc'" class="cs-cart">
    <big-cart></big-cart>

    <Recommend
      v-if="recommendData"
      title="RECENTLY REVIEWED"
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
      const result = await this.$api.product.queryBrowseRecord()
      if (result) {
        this.recommendData = result.list
      }
    },
  },
}
</script>
