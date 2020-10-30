<template>
  <div>
    <div v-if="$store.state.terminal === 'pc'">
      <div class="cupshe_header">
        <div class="nav">
          <div class="cupshe_logo icon_cupshe_logo"></div>
          <div class="nav_contain">
            <ul class="nav_list" @mouseleave="unselectNav">
              <li
                v-for="(item, index) in navList"
                :key="index"
                :class="{ active: currentNav === index }"
              >
                <span @mouseenter="selectNav(index)">{{ item.name }}</span>
                <!-- <div class="menu" :class="{ menu_show: currentNav === index }">
                  {{ index }}
                </div> -->
              </li>
            </ul>
          </div>
          <div class="operations">
            <span><i class="icon_language"></i></span>
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
export default {
  data() {
    return {
      navList: [
        {
          name: 'NEW IN',
          menu: [],
        },
        {
          name: 'ONE PIECES',
          menu: [],
        },
        {
          name: 'BIKINIS',
          menu: [],
        },
        {
          name: 'SWIN SEPARATES',
          menu: [],
        },
        {
          name: 'CLOTHING',
          menu: [],
        },
        {
          name: 'PLUS SIZE',
          menu: [],
        },
        {
          name: 'BEST SELLERS',
          menu: [],
        },
        {
          name: 'SALE',
          menu: [],
        },
      ],
      currentNav: -1,
    }
  },
  methods: {
    selectNav(index) {
      this.currentNav = index
    },
    unselectNav() {
      this.currentNav = -1
    },
  },
}
</script>

<style lang="scss">
.cupshe_header {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 99;
}
.nav {
  // display: flex;
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
  }
  .operations {
    position: absolute;
    top: 40px;
    right: 56px;
    > span {
      margin-left: 30px;
      // float: left;
    }
    .shopping_bag {
      position: relative;
      .shopping_count {
        position: absolute;
        top: 9px;
        left: 50%;
        transform: translateX(-50%);
        font-size: 14px;
        font-family: Muli-Regular, Muli;
        font-weight: 400;
        color: #333;
        line-height: 18px;
      }
    }
  }
  .nav_list {
    // display: flex;
    li {
      font-size: 16px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #666;
      line-height: 20px;
      margin-right: 40px;
      padding-bottom: 6px;
      // float: left;
      display: inline-block;
      cursor: pointer;
      position: relative;
      &:last-child {
        margin-right: 0;
      }
      &.active {
        color: #333;
        &::after {
          // opacity: 1;
          transform: scale(1,1);
        }
      }
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 2px solid #333;
        // opacity: 0;
        transform: scale(0,1);
        transition: all .3s linear;
      }
      .menu {
        position: absolute;
        width: 100%;
        height: 340px;
        background-color: #fff;
        opacity: 0;
        left: 0;
        top: 109px;
        border-bottom: 1px solid #f7f7f7;
        transition: opacity 0.2s linear;
        &.menu_show {
          opacity: 1;
        }
      }
    }
  }
  .icon_language {
    // @include icon-image('icon_language');
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
