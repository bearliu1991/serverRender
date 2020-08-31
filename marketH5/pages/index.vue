<template>
  <div>
    <div class="container">
      <Logo />
      <h3 class="title">{{ $t('home.title') }}</h3>
    </div>
    <div>
      <p v-for="(item, index) in singsList" :key="index">
        <span class="titleStyle">{{ item.name }}</span>
        <span>----</span>
        <span>{{ item.comment }}</span>
      </p>
    </div>
    <div>
      {{ name }}
      <!-- <Button @click="getVideo"></Button> -->
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ app: { $api } }) {
    const res = await $api.musicRankings()
    // eslint-disable-next-line no-console
    return {
      singsList: res.result,
      name: 'hello',
    }
  },
  data() {
    return {
      name: '1',
    }
  },
  beforeCreate() {},
  mounted() {},
  methods: {
    async getVideo() {
      const res = await this.$api.videoCategory()
      // eslint-disable-next-line no-console
      console.log(res)
    },
  },
}
</script>

<style lang="stylus">
.titleStyle {
  color: $red;
}

.container {
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  align-items: center;
}
</style>
