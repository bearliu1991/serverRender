<template>
  <div class="tagClass">
    <template v-for="(item, index) in tagArray">
      <span
        class="cup-tag-default"
        :key="index"
        :class="item.isCheck ? 'cupTagActive' : ''"
        @click="liClick(index, item)"
        >{{ item.context }}</span
      >
    </template>
  </div>
</template>
<script>
import reviewsMixin from '../reviewsMixin'
export default {
  mixins: [reviewsMixin],
  data() {
    return {
      currentIndex: -1,
      selarr: [],
    }
  },
  methods: {
    liClick(index, item) {
      // this.currentIndex = this.currentIndex === index ? -1 : index
      const arr = [...this.tagArray]
      const selarr = [...this.selarr]
      if (arr[index].isCheck === false) {
        arr[index].isCheck = true
        selarr.push(item)
      } else {
        arr[index].isCheck = false
        const index11 = selarr.indexOf(index)
        selarr.splice(index11, 1)
      }
      this.tagArray = arr
      this.selarr = selarr
    },
  },
}
</script>
<style lang="scss" scope>
.tagClass {
  span {
    margin-right: 10px;
    display: inline-block;
    &:hover {
      cursor: pointer;
    }
  }
  .cup-tag-default {
    background: #f2f2f2;
    color: #333333;
    font-size: 14px;
    @include font($fontRegular);
    padding: 6px 10px;
    margin-bottom: 12px;
  }
  .cupTagActive {
    background: rgba(255, 171, 0, 0.1);
    // opacity: .1;
    color: #ffab00;
  }
}
</style>
