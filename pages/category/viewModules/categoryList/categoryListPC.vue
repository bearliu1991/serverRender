<template>
  <div class="list-wrap">
    <ul>
      <li v-for="(item, i) of list" :key="i" class="cs-list-item">
        <cup-product :product="item">
          <p slot="p-other"></p>
        </cup-product>
      </li>
    </ul>
    <div class="cs-pagination-content">
      <el-pagination layout="prev, pager, next" :total="50"> </el-pagination>
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
  data() {
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
      padding-bottom: 40px;
    }
  }
  .cs-pagination-content {
    ::v-deep .number {
      font-size: 14px;
      font-family: Muli-Regular_Light, Muli;
      font-weight: normal;
      color: #999999;
    }
    ::v-deep .active {
      color: #333;
    }
  }
}
</style>
