<!-- 猜你喜欢 -->
<template>
  <div v-if="list.length">
    <div class="cs-recommend">
      <h3 v-if="title" class="cs-recommend-title">{{ title }}</h3>
      <client-only>
        <cup-swiper-pc :list="list" type="fraction" :option="option">
          <template v-slot:swiper-item="{ item }">
            <template v-if="type == 'history'">
              <cup-product
                :product="item"
                is-rate
                is-type
                is-soldout
              ></cup-product>
            </template>
            <template v-else>
              <cup-product :product="item" is-rate></cup-product>
            </template>
          </template>
        </cup-swiper-pc>
      </client-only>
    </div>
  </div>
</template>
<script>
export default {
  name: 'RecommendPC',
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    title: {
      type: String,
      default: '',
    },
    // 区分浏览记录还是猜你喜欢
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      option: {
        loop: true,
        slidesPerView: 4,
        slidesPerGroup: 4,
      },
    }
  },
  beforeCreate() {},
  created() {
    const { type } = this
    if (type === 'history') {
      this.option.loop = false
    }
  },
  mounted() {},
}
</script>
<style lang="scss" scoped>
.cs-recommend {
  background-color: #fff;
  padding: 100px 138px 16px 138px;
  &-title {
    margin-bottom: 40px;
    text-align: center;
    font-size: 30px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #000000;
    line-height: 38px;
    letter-spacing: 2px;
  }
}
</style>
