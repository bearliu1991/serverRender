<template>
  <div class="cs-cart">
    <big-cart></big-cart>

    <Recommend
      v-if="recommendData"
      title="RECENTLY REVIEWED"
      :list="recommendData"
      type="history"
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
    this.queryBrowseRecord()
  },
  methods: {
    // 猜你喜欢
    async queryBrowseRecord() {
      const result = await this.$api.product.queryBrowseRecord().catch(() => {})
      if (result && result.list && result.list.length) {
        this.recommendData = result.list
      }
    },
  },
}
</script>
