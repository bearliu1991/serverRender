<template>
  <div class="nav_contain">
    <ul v-if="navList" class="nav_list">
      <li
        v-for="(menu, index) in navList"
        :key="index"
        :class="{ active: currentNav === index }"
      >
        <span @mouseenter="selectNav(index)">{{ menu.name }}</span>
        <div
          class="menu"
          :class="{
            menu_show: currentNav === index && menu.children.length > 0,
          }"
          @mouseleave="hideMenu"
        >
          <div v-if="menu.children.length > 0" class="submenu">
            <ul class="submenu_list">
              <li v-for="(subMenu, subIndex) in menu.children" :key="subIndex">
                <p class="submenu_name">{{ subMenu.name }}</p>
                <ul v-if="subMenu.children.length > 0" class="level3_menu">
                  <li
                    v-for="(level3Menu, level3Index) in subMenu.children"
                    :key="level3Index"
                  >
                    {{ level3Menu.name }}
                  </li>
                </ul>
              </li>
            </ul>
            <ul class="menu_img">
              <li v-for="(img, imgIndex) in menu.imageList" :key="imgIndex">
                <img :src="img.imageUrl" alt="" />
                <p class="img_product_name">{{ img.imageMainTitle }}</p>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import mock from '../../mock/ navigation'
export default {
  data() {
    return {
      navList: null,
      currentNav: -1,
    }
  },
  created() {
    this.queryNavData()
  },
  methods: {
    selectNav(index) {
      this.currentNav = index
    },
    hideMenu() {
      this.currentNav = -1
    },
    async queryNavData() {
      const res = await this.$api.navigation.navigationInfo(1, 0)
      console.log(res)
      this.navList = mock.data.list
    },
  },
}
</script>

<style lang="scss" scoped>
.nav_list {
  > li {
    font-size: 14px;
    font-family: Muli-Bold, Muli;
    font-weight: bold;
    color: #666;
    line-height: 20px;
    margin-right: 40px;
    display: inline-block;
    cursor: pointer;
    // position: relative;
    > span {
      display: inline-block;
      padding-bottom: 10px;
      position: relative;
      &::after {
        position: absolute;
        content: '';
        bottom: 0;
        left: 0;
        width: 100%;
        border-bottom: 2px solid #333;
        // opacity: 0;
        transform: scale(0, 1);
        transition: all 0.2s linear;
        transform-origin: left center;
      }
    }
    &:last-child {
      margin-right: 0;
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
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.12);
      &.menu_show {
        opacity: 1;
      }
      .submenu {
        display: flex;
        padding: 40px 0;
        max-width: max-content;
        margin: 0 auto;
        .submenu_list {
          display: flex;
          margin-right: 90px;
          > li {
            width: 190px;
            margin-right: 30px;
            &:last-child {
              margin-right: 0;
            }
            .submenu_name {
              font-size: 14px;
              font-family: Muli-Regular_Bold, Muli;
              font-weight: normal;
              color: #333333;
              line-height: 18px;
              letter-spacing: 1px;
              text-align: left;
              margin-bottom: 16px;
              cursor: pointer;
            }
            .level3_menu {
              li {
                font-size: 14px;
                font-family: Muli-Regular_SemiBold, Muli;
                font-weight: normal;
                color: #333333;
                line-height: 21px;
                text-align: left;
                margin-bottom: 10px;
                cursor: pointer;
              }
            }
          }
        }
        .menu_img {
          display: flex;
          li {
            margin-right: 20px;
            cursor: pointer;
            &:last-child {
              margin-right: 0;
            }
            img {
              width: 314px;
              height: 210px;
            }
            .img_product_name {
              font-size: 12px;
              font-family: Muli-Regular_SemiBold, Muli;
              font-weight: normal;
              color: #333333;
              line-height: 15px;
              margin-top: 10px;
            }
          }
        }
      }
    }
    &.active {
      color: #333;
      & > span::after {
        transform: scale(1, 1);
      }
      .menu {
        display: block;
      }
    }
  }
}
</style>
