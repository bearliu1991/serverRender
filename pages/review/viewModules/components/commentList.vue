<template>
  <div
    class="comment-list"
    :style="$store.state.terminal === 'pc' ? '' : 'margin-top:20px'"
  >
    <template v-if="$store.state.terminal === 'pc'">
      <div class="tagClass">
        <tag-list />
      </div>
      <div class="selectBlock">
        <div class="cup-select-2">
          <cup-select
            v-model="formFilters.rating"
            placeholder="Rating"
            @input="queryCommentList"
          >
            <cup-option
              v-for="item in rating"
              :key="item.value"
              :value="item.value"
            >
              <cup-rate :value="Number(item.label)" :score="-1" />
            </cup-option>
          </cup-select>
        </div>
        <div class="cup-select-2">
          <cup-select
            v-model="formFilters.withMedias"
            placeholder="Images & Videos"
            @input="queryCommentList"
          >
            <cup-option
              v-for="item in reviews"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></cup-option>
          </cup-select>
        </div>
        <template v-for="(v, index) in filtersList">
          <div class="cup-select-2" :key="index">
            <cup-select
              v-model="formFilters.qas[index].answer"
              :placeholder="v.title"
              @input="queryCommentList"
            >
              <cup-option
                v-for="item in v.options"
                :key="item.sortNum"
                :label="item.option"
                :value="item.sortNum"
              ></cup-option>
            </cup-select>
          </div>
        </template>
      </div>
    </template>
    <div class="caption">
      <span
        ><b>{{ scoreAndCount.count }}</b> REVIEWS</span
      >
      <div class="cup-sort">
        <span>SORT:</span>
        <cup-select
          v-model="formFilters.sortType"
          placeholder="Newest"
          @input="queryCommentList"
        >
          <cup-option
            v-for="(item, index) in sortArr"
            :key="index"
            :label="item.label"
            :value="item.val"
          />
        </cup-select>
      </div>
    </div>

    <div class="list">
      <no-data v-if="proList.length == 0" />
      <template v-else>
        <template v-for="item in proList">
          <comment-item
            v-if="$store.state.terminal === 'pc'"
            :key="item.id"
            :pro-data="item"
            @bShow="bShow"
          />
          <comment-item-m v-else :key="item.id" :pro-data="item" />
        </template>
        <!-- 分页 -->
        <div class="cs-pagination">
          <el-pagination
            layout="prev, pager, next"
            :total="totals"
            :current-page.sync="pageNum"
            :page-size="pageSize"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import selectMixin from '../common/selectMixin'
import TagList from '../common/taglist'
import reviewsMixin from '../reviewsMixin'
import NoData from './noData'
export default {
  name: 'Comment',
  components: { TagList, NoData },
  mixins: [selectMixin, reviewsMixin],
  data() {
    return {
      currentIndex: 0,
    }
  },
  mounted() {},
  methods: {
    liClick(index) {
      this.currentIndex = index
    },
    bShow(beal, id) {
      this.$emit('show', beal, id)
    },
  },
}
</script>

<style lang="scss" scoped>
.comment-list {
  margin-top: 50px;
  .tagClass {
    span {
      margin-right: 10px;
      display: inline-block;
    }
    .cup-tag-default {
      background: #f2f2f2;
      color: #333333;
      font-size: 14px;
      @include font($fontRegular);
      padding: 6px 10px;
    }
    .cupTagActive {
      background: rgba(255, 171, 0, 0.1);
      // opacity: .1;
      color: #ffab00;
    }
  }
  .cs-pagination {
    text-align: center;
  }
  .caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    span {
      font-size: 16px;
      b {
        @include font($fontMuliBold);
      }
    }
    .cup-sort {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 200px;
      span {
        color: #999999;
        font-size: 14px;
      }

      /deep/ .cs-select {
        .cs-select-item {
          border: none;
        }
        .cs-select-input {
          .cs-input_inner {
            background: transparent;
            border: none;
            color: #333333;
            font-size: 14;
          }
          .cs-input_suffix {
            border: none;
          }
        }
      }
    }
  }
  .selectBlock {
    margin-top: 20px;
    margin-bottom: 40px;
    .cup-select-2 {
      width: calc(100% / 5 - 32px);
      display: inline-block;
      margin-right: 16px;
      /deep/ .cs-select-dropDown_list {
        background: #ffffff;
        li {
          border-bottom: none;
          line-height: inherit;
        }
      }
      /deep/ .cs-select-item {
        display: flex;
        align-items: center;
        color: #333333;
      }
      /deep/ .cs-select-input {
        background: #f2f2f2;
        border: 1px solid #d8d8d8;
        border: none;
        font-size: 14px;
        input {
          border: none;
          background: transparent;
          height: 30px;
          line-height: 30px;
        }
        span.cs-input_suffix {
          border: none;
          height: 30px;
          line-height: 30px;
          &::-webkit-input-placeholder {
            font-size: 14px;
            @include font($fontRegular);
          }
          i {
            height: auto;
          }
        }
        /deep/ .cs-select-dropDown {
          top: 30px !important; //未生效
        }
      }
    }
  }
}
.review-customer {
  margin-top: 30px;
  margin-bottom: 19px;

  font-size: 14px;
}
</style>
