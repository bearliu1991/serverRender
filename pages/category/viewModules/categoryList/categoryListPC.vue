
<template>
  <div class="list-wrap">
    <ul>
      <li v-for="(item, i) of list" :key="i">
        <CupItemCard :item="item"></CupItemCard>
      </li>
    </ul>
    <div>
      <el-pagination small layout="prev, pager, next" :total="50">
      </el-pagination>
    </div>
  </div>
</template>

<script>
/**
 * @Doc https://github.surmon.me/vue-awesome-swiper/
 */
export default {
  name: 'CategoryListPC',
  props: {
    list: {
      type: Array,
      default: () => {},
    },
  },
  data(){
    return {}
  },
}
</script>

<style lang="scss" scoped>
.list-wrap {
  text-align: center;
  ul {
    $list-spacing-x: 16px;
    margin-right: -1 * $list-spacing-x;
    overflow: hidden;
    li {
      width: 25%;
      float: left;
      box-sizing: border-box;
      padding-right: $list-spacing-x;
    }
  }
}
</style>