<template>
  <div v-if="list.length" class="list-wrap">
    <ul>
      <li v-for="(item, i) of list" :key="i" class="cs-list-item">
        <cup-product :product="item" is-type is-href @click="toDetail">
        </cup-product>
      </li>
    </ul>
    <div class="cs-pagination">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="totals"
        :current-page.sync="curPages"
        :page-size="24"
        @current-change="handleCurrentChange"
      >
      </el-pagination>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
/**
 * @Doc https://github.surmon.me/vue-awesome-swiper/
 */
export default {
  name: 'CategoryListM',
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
  watch: {
    currentPages(val) {
      this.curPages = val
    },
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
  ul {
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    li {
      width: calc(50% - 4.5px);
      box-sizing: border-box;
      padding-bottom: 25px;
      &:nth-child(odd) {
        margin-right: 9px;
      }
    }
  }
  /deep/.el-pagination--small {
    margin-top: 13px;
    margin-bottom: 21px;
    text-align: center;
  }
  /deep/ .cup-product {
    .p-name {
      color: #333333;
      font-size: 12px;
      line-height: 18px;
      margin: 6px 0;
    }
    .p-img {
      height: 251px;
      img {
        height: 100%;
      }
    }
    .p-price {
      font-size: 12px;
      strong {
        font-family: Muli-Regular_ExtraBold, Muli;
      }
      margin-bottom: 9px;
    }
    .el-rate__icon {
      width: 10px !important;
      height: 10px !important;
    }
  }
}
</style>
