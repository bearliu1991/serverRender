<template>
  <div v-if="list.length" class="list-wrap">
    <ul>
      <li v-for="(item, i) of list" :key="i" class="cs-list-item">
        <cup-product :product="item"> </cup-product>
      </li>
    </ul>
    <div class="cs-pagination-content">
      <el-pagination
        small
        layout="prev, pager, next"
        :total="totals"
        :current-page.sync="curPages"
        :page-size="10"
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
    margin-top: 12px;
    margin-bottom: 17px;
    text-align: center;
    .btn-prev {
      padding: 0;
      margin-right: 20px;
      min-width: auto;
    }
    .btn-next {
      padding: 0;
      margin: 0;
      min-width: auto;
    }
    .number {
      padding: 0;
      min-width: auto;
      @include font($fontRegular);
      color: #999999;
      margin-right: 20px;
      &.active {
        font-family: Muli-Bold, Muli;
        font-weight: bold;
        color: #333333;
      }
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
