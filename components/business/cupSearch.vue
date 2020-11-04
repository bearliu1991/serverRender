<template>
  <div class="cup_search">
    <cup-popup
      :direction="'ttb'"
      :visible="showSearch"
      :size="'100px'"
      :show-close="false"
      :with-header="false"
      @close-popup="closePopup"
    >
      <div class="cup_search_content"></div>
    </cup-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
    }
  methods: {
    closePopup() {
      this.showSearch = false
    },
  },
}
</script>

<style lang="scss">
.cup_search {
  &_content {
    height: 100px;
  }
}
</style>
