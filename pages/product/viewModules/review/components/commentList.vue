<template>
  <div class="comment-list">
    <div class="tagClass">
      <template v-for="item in tagArray">
        <span class="cup-tag-default" :key="item">{{ item }}</span>
      </template>
    </div>
    <div class="selectBlock">
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Country / Region">
          <cup-option
            v-for="item in Rating"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Country / Region">
          <cup-option
            v-for="item in Rating"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Country / Region">
          <cup-option
            v-for="item in Rating"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Country / Region">
          <cup-option
            v-for="item in Rating"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></cup-option>
        </cup-select>
      </div>
      <div class="cup-select-2">
        <cup-select v-model="form.ratingVal" placeholder="Country / Region">
          <cup-option
            v-for="item in Rating"
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
export default {
  name: 'Comment',
  data() {
    return {
      tagArray: ['Size', 'Fit', 'Coverage', 'Chest', 'Butt', 'Straps'],
      form: {
        ratingVal: '',
      },
      Rating: [
        {
          value: '0',
          label: 'All',
        },
        {
          value: '1',
          label: '1',
        },
        {
          value: '2',
          label: '2',
        },
        {
          value: '3',
          label: '3',
        },
      ],
      image: [
        {
          value: '0',
          label: 'image',
        },
        {
          value: '1',
          label: 'radio',
        },
      ],
      age: [
        {
          value: '0',
          label: 'All',
        },
        {
          value: '1',
          label: '18-24',
        },
        {
          value: '2',
          label: '25-34',
        },
        {
          value: '3',
          label: '35-44',
        },
        {
          value: '4',
          label: '45+',
        },
      ],
    }
  },
}
</script>

<style lang="scss" scoped>
.comment-list {
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
    .cup-tag-active {
      background: #ffffab00;
      color: #ffffab00;
    }
  }
  .caption {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    span {
      font-size: 16px;
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
      /deep/ .cs-select-input {
        background: #d8d8d8;
        border: 1px solid #d8d8d8;
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
          top: 30px;
        }
      }
    }
  }
}
</style>
