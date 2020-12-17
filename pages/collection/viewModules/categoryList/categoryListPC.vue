<template>
  <div class="list-wrap">
    <ul>
      <li v-for="(item, i) of list" :key="i" class="cs-list-item">
        <cup-product :product="item" is-mouse is-type is-href @click="toDetail">
          <p slot="p-other"></p>
        </cup-product>
      </li>
    </ul>
    <div class="cs-pagination-content">
      <el-pagination
        layout="prev, pager, next"
        :total="totals"
        :current-page.sync="curPages"
        :page-size="24"
        @current-change="handleCurrentChange"
      >
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
  inject: ['searchProduct'],
  props: {
    list: {
      type: Array,
      default: () => {
        return []
      },
    },
    currentPages: {
      type: Number,
      default: 1,
    },
    totals: {
      type: Number,
      default: 1,
    },
    name: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      curPages: this.currentPages,
    }
  },

  methods: {
    handleCurrentChange(value) {
      this.searchProduct({
        pageNo: value,
      })
    },
    toDetail(spuId) {
      const collectionId = this.$route.query.id
      this.$router.push({
        path: `/product/${spuId}`,
        query: {
          collectionId,
          collectionName: this.name,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.list-wrap {
  text-align: center;
  ul {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 25%;
      box-sizing: border-box;
      padding-left: 16px;
      padding-bottom: 55px;
    }
  }
  .cs-pagination-content {
    ::v-deep .number {
      font-size: 14px;
      @include font($fontRegular);
      color: #999999;
    }
    ::v-deep .active {
      color: #333;
    }
  }
}
</style>
