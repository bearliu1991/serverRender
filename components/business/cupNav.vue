<template>
  <div class="nav_contain">
    <ul
      v-if="navList.length > 0"
      class="nav_list"
      @mouseleave="currentNav = -1"
    >
      <li
        v-for="(menu, index) in navList"
        :key="index"
        :class="{ active: currentNav === index }"
      >
        <div class="cs_menu_name" @mouseenter="selectNav(index)">
          <span>
            <nuxt-link :to="transferUrl(menu)" v-html="menu.name"></nuxt-link>
          </span>
        </div>
        <transition name="fade">
          <div
            v-show="currentNav === index"
            class="menu"
            @mouseleave="hideMenu"
          >
            <div v-if="menu.children.length > 0" class="submenu">
              <ul class="submenu_list">
                <li
                  v-for="(subMenu, subIndex) in menu.children"
                  :key="subIndex"
                >
                  <p class="submenu_name" v-html="subMenu.name"></p>
                  <ul v-if="subMenu.children.length > 0" class="level3_menu">
                    <li
                      v-for="(level3Menu, level3Index) in subMenu.children"
                      :key="level3Index"
                    >
                      <nuxt-link
                        :to="transferUrl(subMenu)"
                        v-html="level3Menu.name"
                      ></nuxt-link>
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
        </transition>
      </li>
    </ul>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  props: {
    navList: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      currentNav: -1,
    }
  },
  methods: {
    selectNav(index) {
      this.currentNav = index
    },
    hideMenu() {
      this.currentNav = -1
    },
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-active {
  opacity: 0;
}
.nav_list {
  margin: 0 auto;
  height: 109px;
  box-sizing: border-box;
  > li {
    font-size: 14px;
    font-family: $fontSemiBold;
    font-weight: normal;
    color: #666;
    line-height: 20px;
    margin-right: 40px;
    display: inline-block;
    cursor: pointer;
    height: 100%;
    box-sizing: border-box;
    .cs_menu_name {
      height: 100%;
      padding-top: 45px;
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
          transform: scale(0, 1);
          transition: all 0.2s linear;
          transform-origin: left center;
        }
      }
    }
    &:last-child {
      margin-right: 0;
    }
    .menu {
      position: absolute;
      width: 100%;
      height: 315px;
      background-color: #fff;
      left: 0;
      top: 109px;
      border-bottom: 1px solid #f7f7f7;
      box-shadow: 0px 20px 20px 0px rgba(0, 0, 0, 0.12);
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
              @include font($fontMuliBold);
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
                font-family: $fontSemiBold;
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
              font-family: $fontSemiBold;
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
      font-weight: bold;
      .cs_menu_name > span::after {
        transform: scale(1, 1);
      }
      .menu {
        display: block;
      }
    }
  }
}
</style>
