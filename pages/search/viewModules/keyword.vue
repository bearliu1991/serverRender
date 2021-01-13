<template>
  <div class="cs-search_wrapper">
    <!-- 搜索关键词 -->
    <div :class="['keyword', word ? 'active' : '']">
      <i
        class="search icontopbar-wap-research-14 icon iconfont"
        @click="search(word)"
      ></i>
      <el-input
        class="cup-input"
        v-model="word"
        placeholder="Start typing here"
        @input="isInput = true"
        @blur="isInput = false"
      ></el-input>
      <!-- pc不展示 -->
      <i
        class="icon-clear"
        @click="clearWord"
        v-if="$store.state.terminal == 'mobile' && word && isInput"
      ></i>
    </div>
    <!-- 最近搜索记录 -->
    <div class="recently cs-box" v-if="historyWord.length">
      <div class="box-tit">
        <p>RECENTLY SEARCHED</p>
        <em @click="clear">Clear all</em>
      </div>
      <p class="box-btns">
        <em
          v-for="(item, index) in historyWord"
          :key="index"
          @click="search(item)"
          >{{ item }}</em
        >
      </p>
    </div>
    <!-- 热词推荐 -->
    <div class="hot cs-box" v-if="hotWords.length">
      <div class="box-tit">
        <p>TRENDING SEARCHES</p>
      </div>
      <p class="box-btns">
        <em v-for="(item, index) in hotWords" :key="index" @click="search(item)"
          >{{ item }}
          <sup class="hot icon-hot" v-if="index < 3"></sup>
        </em>
      </p>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  props: {
    value: {
      type: Boolean,
      default: true,
    },
  },
  inject: ['reload', 'closeSearch'],
  data() {
    return {
      isInput: false,
      word: '',
      hotWords: [],
    }
  },
  computed: mapState([
    // 'cookieDeliveryed',
    'historyWord',
  ]),
  mounted() {
    this.queryHotWords()
    this.queryDefaultWords()
  },
  methods: {
    clear() {
      this.$store.commit('SET_HISTORY_WORD', [])
    },
    clearWord() {
      this.word = ''
    },
    search(word) {
      const { isEmpty } = this
      if (!isEmpty(word)) {
        this.word = word
        this.addHistoryWord()
      }
      this.closeSearch()
      if (this.$route.fullPath.includes('/search?keyword')) {
        this.$router.replace({
          path: '/search',
          query: {
            keyword: this.word,
            t: new Date().getTime(),
          },
        })
        // this.reload()
      } else {
        this.$router.push({
          path: '/search',
          query: {
            keyword: this.word,
          },
        })
      }
    },
    // 查询搜索热词
    async queryHotWords() {
      const result = await this.$api.search.queryHotWord().catch(() => {})
      if (result && result.hotWords) {
        this.hotWords = result.hotWords
      } else {
        this.hotWords = []
      }
    },
    // 查询搜索默认词
    async queryDefaultWords() {
      const result = await this.$api.search.queryDefaultWord().catch(() => {})
      if (result && result.defaultWord) {
        this.word = result.defaultWord
      } else {
        this.word = ''
      }
    },
    // 添加搜索历史记录
    addHistoryWord() {
      const { word, historyWord } = this
      const records = JSON.parse(JSON.stringify(historyWord)) || []

      // 若包含  则删除，在头部添加  若不包含，直接在头部添加
      const index = records.findIndex((item) => {
        return item + '' === word + ''
      })
      if (index > -1) {
        records.splice(index, 1)
      }
      records.unshift(word)
      if (records.length > 10) {
        // 从后往前删除
        records.pop()
      }
      this.$store.commit('SET_HISTORY_WORD', records)
    },
    close() {
      this.$emit('input', false)
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-search {
  &_wrapper {
    padding: 16px;
    .keyword {
      height: 44px;
      display: flex;
      align-items: center;
      margin-bottom: 4px;
      border-bottom: 1px solid #d8d8d8;
      .search {
        font-size: 14px;
        margin-right: 10px;
        color: #999;
      }
      .cup-input {
        flex-shrink: 0;
        flex: 1;
        /deep/.el-input__inner {
          border: 0;
          padding: 0;
        }
      }
      .icon-clear {
        width: 15px;
        height: 15px;
        background-size: contain !important;
      }
      &.active {
        border-bottom: 1px solid #333;
        .search {
          color: #333;
        }
        .icon-clear {
          @include icon-image('icon_clear');
        }
      }
    }
    .cs-box {
      padding-top: 28px;
      .box-tit {
        display: flex;
        justify-content: space-between;
        line-height: 15px;
        margin-bottom: 16px;
        p {
          font-size: 14px;
          font-family: Muli-Bold, Muli;
          font-weight: bold;
          line-height: 18px;
          letter-spacing: 1px;
        }
      }
      .box-btns {
        em {
          background: #f2f2f2;
          font-size: 14px;
          height: 30px;
          padding: 0 10px;
          margin-bottom: 12px;
          line-height: 30px;
          margin-right: 12px;
          border: 0;
          display: inline-block;
          position: relative;
        }
        .icon-hot {
          @include icon-image('icon_hot', 'png');
          width: 22px;
          height: 8px;
        }
      }
    }
  }
}
.pc {
  &.cs-search_wrapper {
    padding: 24px 0 28px 0;
    .keyword {
      height: 62px;
      margin-bottom: 16px;
      .search {
        font-size: 24px;
        margin-right: 20px;
      }
      .cup-input {
        /deep/.el-input__inner {
          font-size: 16px;
        }
      }
    }
  }
}
</style>
