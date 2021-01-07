<template>
  <div class="comment-list">
    <div class="tagClass">
      <template v-for="(item, index) in tagArray">
        <span
          class="cup-tag-default"
          :key="item"
          :class="{ cupTagActive: currentIndex === index }"
          @click="liClick(index)"
          >{{ item }}</span
        >
      </template>
    </div>
    <div class="selectBlock">
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Rating">
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
        <cup-select v-model="form.imgAndVideo" placeholder="Images & Videos">
          <cup-option
            v-for="item in reviews"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.ageVal" placeholder="Age">
          <cup-option
            v-for="item in Age"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.bodyTypeVal" placeholder="Body Type">
          <cup-option
            v-for="item in bodyType"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>

      <div class="cup-select-2">
        <cup-select v-model="form.sizeFitVal" placeholder="Size Fit">
          <cup-option
            v-for="item in sizeFit"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
    </div>
    <div class="caption">
      <span><b>106</b> REVIEWS</span>
      <div class="cup-sort">
        <span>SORT</span>
        <ul class="cup-sort-ul">
          <li></li>
        </ul>
      </div>
    </div>
    <div class="list">
      <template v-for="item in [1, 2, 3]">
        <comment-item :key="item"></comment-item>
      </template>
    </div>
  </div>
</template>

<script>
import selectMixin from '../common/selectMixin'
export default {
  name: 'Comment',
  mixins: [selectMixin],
  data() {
    return {
      tagArray: ['Size', 'Fit', 'Coverage', 'Chest', 'Butt', 'Straps'],
      currentIndex: 0,
      form: {
        ratingVal: '',
        imgAndVideo: '',
        ageVal: '',
        bodyTypeVal: '',
        sizeFitVal: '',
      },
    }
  },
  methods: {
    liClick(index) {
      this.currentIndex = index
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
      ul.cup-sort-ul {
        list-style: none;
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
        font-size: 14px;
        input {
          border: none;
          background: transparent;
          height: 30px;
          line-height: 30px;
          &::placeholder {
            color: #333333;
          }
        }
        span.cs-input_suffix {
          border: none;
          height: 30px;
          line-height: 30px;
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
</style>
