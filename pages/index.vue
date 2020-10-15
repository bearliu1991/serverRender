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
      <button @click="getVideo">getVideo</button>
    </div>
    {{ $store.state.terminal.terminal }}
=======
  <div class="container">
    这是首页
    <p>cupshe 按钮</p>
    <cup-button>default</cup-button>
    <cup-button disabled>disabled</cup-button>
    <cup-button type="primary">primary</cup-button>
    <cup-button type="primary" size="medium">primary</cup-button>
    <p>cupshe 弹出层</p>
    <!-- <cup-popup visible> kkkkkkkkkkkkk </cup-popup> -->
    <p>-------评分组件------------</p>
    <cup-rate v-model="rate" :score="score"></cup-rate>
    <!-- 商品组件 -->
    <p>----------商品组件---------------</p>
    <cup-product :product="product"></cup-product>
>>>>>>> df823e2b8dcae652127314f8f8456e695abdc8db
  </div>
</template>

<script>
export default {
  data() {
    return {
      product: {
        productName: '111',
        discountPrice: '3433',
        imageUrl: '',
        rating: 4,
        ratingNum: 5,
      },
      rate: 4,
      score: 30,
      name: '1',
    }
  },
  computed: {},
  beforeCreate() {},
  mounted() {},
  methods: {
    // async getVideo() {
    //   const res = await this.$http.videoCategory()
    //   // eslint-disable-next-line no-console
    //   console.log(res)
    // },
  },
}
</script>

<style lang="scss" scoped>
.container {
  margin-left: 30px;
}
p {
  margin-bottom: 20px;
}
</style>
