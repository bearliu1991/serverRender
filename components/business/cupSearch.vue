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
      <div class="cup_search_content">
        <cup-input></cup-input>
        <div class="search-detail">
          <div class="search-top">
            <p>recently searched</p>
            <span>clear all</span>
          </div>
          <ul class="search-list">
            <li>
              <cup-button>bisdf</cup-button>
            </li>
            <li>
              <cup-button>bisdf</cup-button>
            </li>
            <li>
              <cup-button>bisdf</cup-button>
            </li>
          </ul>
        </div>
        <div class="search-detail">
          <div class="search-top">
            <p>recently searched</p>
            <span>clear all</span>
          </div>
          <ul class="search-list">
            <li>
              <cup-button>bisdf</cup-button>
            </li>
            <li>
              <cup-button>bisdf</cup-button>
            </li>
            <li>
              <cup-button>bisdf</cup-button>
            </li>
          </ul>
        </div>
      </div>
    </cup-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showSearch: false,
    }
  },
  methods: {
    closePopup() {
      this.showSearch = false
    },
  },
}
</script>

<style lang="scss" scoped>
.cup_search_content {
  width: 32%;
  margin: 0 auto;
}
.cup_search {
  &_content {
    height: 100px;
  }
}
</style>
