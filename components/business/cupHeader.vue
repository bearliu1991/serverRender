<template>
  <div>
    <div v-if="$store.state.terminal === 'pc'">
      <div class="cupshe_header">
        <div class="nav">
          <div class="cupshe_logo icon_cupshe_logo"></div>
          <cup-nav></cup-nav>
          <div class="operations">
            <span>
              <cup-dropdown>
                <i class="icon_language icon_language_cupshe"></i>
                <div>1111</div>
              </cup-dropdown>
            </span>
            <span><i class="icon_search"></i></span>
            <span><i class="icon_account"></i></span>
            <span class="shopping_bag">
              <i class="icon_shopping_bag"></i>
              <b class="shopping_count">21</b>
            </span>
          </div>
        </div>
      </div>
    </div>
    <div v-else></div>
  </div>
</template>

<script>
import cupDropdown from '../base/cupDropdown'
import cupNav from './cupNav'
export default {
  components: {
    cupNav,
    cupDropdown,
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.cupshe_header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
.nav {
  height: 109px;
  padding-top: 45px;
  text-align: center;
  position: relative;
  border-bottom: 1px solid #f7f7f7;
  background-color: #fff;
  .icon_cupshe_logo {
    @include icon-image('icon_cupshe_logo');
    width: 180px;
    height: 49px;
    position: absolute;
    top: 31px;
    left: 56px;
    cursor: pointer;
  }
  .operations {
    position: absolute;
    top: 40px;
    right: 56px;
    > span {
      margin-left: 30px;
      cursor: pointer;
      display: inline-block;
    }
    .shopping_bag {
      position: relative;
      .shopping_count {
        position: absolute;
        top: -10%;
        left: 75%;
        font-size: 14px;
        font-family: Muli-Regular, Muli;
        font-weight: 400;
        color: #fff;
        line-height: 18px;
        background-color: #ffa129;
        padding: 2px 4px;
        border-radius: 50%;
      }
    }
  }
  @function language($type) {
    @return url('~assets/images/icon_language_' + $type + '.png');
  }
  .icon_language {
    background-size: 100% 100%;
    display: inline-block;
    width: 30px;
    height: 30px;
  }
  .icon_language_cupshe {
    background-image: language('cupshe');
  }
  .icon_search {
    @include icon-image('icon_search');
  }
  .icon_account {
    @include icon-image('icon_account');
  }
  .icon_shopping_bag {
    @include icon-image('icon_shopping_bag');
  }
}
</style>
