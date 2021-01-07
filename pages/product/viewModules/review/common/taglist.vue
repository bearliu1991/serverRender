<template>
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
</template>
<script>
export default {
  data() {
    return {
      tagArray: ['Size', 'Fit', 'Coverage', 'Chest', 'Butt', 'Straps'],
      currentIndex: -1,
    }
  },
  methods: {
    liClick(index) {
      this.currentIndex = this.currentIndex === index ? -1 : index
    },
  },
}
</script>
<style lang="scss" scope>
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
    margin-bottom: 12px;
  }
  .cupTagActive {
    background: rgba(255, 171, 0, 0.1);
    // opacity: .1;
    color: #ffab00;
  }
}
</style>
