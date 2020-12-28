<template>
  <div class="cs_home_category" v-if="childObj.enable">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <p>{{ childObj.heading }}</p>
      <ul class="ul-list">
        <li
          v-for="(item, index) in childObj.homepageShopByCategoryContents"
          :key="index"
        >
          <a :href="transferUrl(item.link)"><img :src="item.pcImage" /></a>
          <span class="">{{ item.text }}</span>
        </li>
      </ul>
    </div>
    <div v-else class="mobile-wrap">
      <p>{{ childObj.heading }}</p>
      <ul class="ul-list">
        <li
          v-for="(item, index) in childObj.homepageShopByCategoryContents"
          :key="index"
        >
          <a :href="transferUrl(item.link)"><img :src="item.mobileImage" /></a>
          <span class="">{{ item.text }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'

export default {
  mixins: [mixins],
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.cs_home_category {
  overflow-y: auto;
}
p {
  text-align: center;
  margin-bottom: 40px;
  font-family: Muli Regular;
  font-weight: bold;
  color: #333;
  font-size: 30px;
}
.ul-list {
  display: flex;
  li {
    width: 342px;
    margin-left: 25px;
    &:first-child {
      margin-left: 0;
    }
    img {
      width: 100%;
      height: 456px;
    }
    span {
      font-size: 18px;
      font-weight: lighter;
      text-align: center;
      margin-top: 8px;
      display: block;
      color: #333;
    }
  }
}
.pc-wrap {
  padding: 80px 0 0 0;
}
.mobile-wrap {
  padding: 40px 0 0 0;
  p {
    margin-bottom: 24px;
    font-size: 18px;
  }
  .ul-list {
    display: flex;
    li {
      margin-left: 10px;
      &:first-child {
        margin-left: 0;
      }
      img {
        width: 200px;
        height: 267px;
      }
      span {
        font-size: 14px;
      }
    }
  }
}
</style>
