<template>
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
    <p>----------多选组件---------------</p>
    <cup-checkbox-group v-model="anotherValue" @change="change">
      <cup-checkbox label="这是1">这是1的值</cup-checkbox>
      <cup-checkbox label="这是2">这是2的值</cup-checkbox>
    </cup-checkbox-group>
    <p>----------单选组件---------------</p>
    <cup-radio-group v-model="anotherValue01" @change="change">
      <cup-radio label="这是1">这是1的值</cup-radio>
      <cup-radio label="这是2">这是2的值</cup-radio>
    </cup-radio-group>
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
      anotherValue: ['这是1'],
      anotherValue01: '',
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
    change(value) {
      console.log(val)
    },
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
