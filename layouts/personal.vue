<template>
  <div class="cs-personal">
    <template v-if="$store.state.terminal == 'mobile'">
      <header class="cs-personal-tab">
        <div v-show="!isOpen" class="tab-checked" @click="openBox">
          <p>{{ tabs[activeIndex].name }}</p>
          <i
            :class="[
              'icon iconfont icon12-jiantou-xiala',
              isOpen ? 'is-reverse' : '',
            ]"
          ></i>
        </div>
        <div v-show="isOpen" class="tab-open">
          <div class="tab-open-checked" @click="openBox">
            <p>{{ tabs[activeIndex].name }}</p>
            <i
              :class="[
                'icon iconfont icon12-jiantou-xiala',
                isOpen ? 'is-reverse' : '',
              ]"
            ></i>
          </div>
          <ul class="tab-wrapper">
            <li
              v-for="(item, index) in tabs"
              :key="index"
              :class="item.id == activeIndex + 1 ? 'active' : ''"
              @click="changeTab(index)"
            >
              <nuxt-link :to="item.to">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
      </header>
      <div class="cs-personal-container">
        <nuxt />
      </div>
    </template>
    <template v-else>
      <div class="cs-personal_container">
        <div class="cs-personal_left">
          <header>MY ACCOUNT</header>
          <ul>
            <li
              v-for="(item, index) in tabs"
              :key="index"
              :class="item.id == activeIndex + 1 ? 'active' : ''"
              @click="changeTab(index)"
            >
              <nuxt-link :to="item.to">
                {{ item.name }}
              </nuxt-link>
            </li>
          </ul>
        </div>
        <div class="cs-personal_right">
          <nuxt v-if="isRouterAlive" />
        </div>
      </div>
      <cup-footer></cup-footer>
    </template>
  </div>
</template>
<script>
export default {
  provide() {
    return {
      reload: this.reload,
    }
  },
  data() {
    return {
      isOpen: false,
      activeIndex: 0,
      isRouterAlive: true,
      tabs: [
        {
          id: 1,
          to: '/personal',
          name: 'account details',
        },
        {
          id: 2,
          to: '/personal/orderList',
          name: 'My Orders',
        },
        {
          id: 3,
          to: '/personal/address',
          name: 'Address Book',
        },
      ],
    }
  },
  mounted() {
    const path = this.$route.path
    const index = this.tabs.findIndex((item) => {
      return item.to === path
    })
    if (index === -1) {
      // 页面拦截
    } else {
      this.activeIndex = index
    }
  },
  methods: {
    openBox() {
      this.isOpen = !this.isOpen
    },
    // 切换tab
    changeTab(index) {
      this.activeIndex = index
      this.openBox()
    },
    reload() {
      this.isRouterAlive = false
      this.$nextTick(function () {
        this.isRouterAlive = true
      })
    },
  },
}
</script>
<style lang="scss" scoped>
.cs-personal {
  background: #fafafa;
  &-tab {
    margin-top: 16px;
    position: relative;
    background: #ffffff;
    padding: 0 16px;
    height: 48px;
    .tab-checked {
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
    }
    .tab-checked,
    .tab-open-checked {
      display: flex;
      align-items: center;
      position: relative;
      height: 48px;
      p {
        flex: 1;
        text-align: center;
        font-size: 14px;
        @include font($fontMuliBold);
        text-shadow: 0px 2px 10px rgba(0, 0, 0, 0.12);
      }
      i {
        font-size: 12px;
        position: absolute;
        top: 50%;
        right: 16px;
        transform: translateY(-50%);
        color: #d8d8d8;
        transition: transform 0.5s;
        -webkit-transition: -webkit-transform 0.5s;
        &.is-reverse {
          transform: translateY(-50%) rotate(180deg);
          color: #333;
        }
      }
    }
    .tab-open {
      box-shadow: 0px 2px 10px 0px rgba(0, 0, 0, 0.12);
      position: absolute;
      top: 0;
      right: 16px;
      left: 16px;
      background-color: #fff;
    }
    .tab-wrapper {
      font-size: 14px;
      padding: 20px;
      border-top: 1px solid #f7f7f7;

      li {
        margin-bottom: 26px;
        text-align: center;
        font-size: 14px;
        a {
          color: #333;
        }
        &:last-child {
          margin-bottom: 0;
        }
        &.active {
          @include font($fontMuliBold);
        }
      }
    }
  }
  &_container {
    background: #fff;
    padding: 0 284px;
    display: flex;
  }
  &_left {
    margin-right: 92px;

    width: 212px;
    header {
      margin-top: 44px;
      font-size: 24px;
      font-family: Muli-Bold, Muli;
      font-weight: bold;
      color: #333333;
      line-height: 30px;
      letter-spacing: 1px;
      padding: 16px 0;
    }
    ul {
      li {
        font-size: 14px;
        padding: 16px 0;
        color: #333333;
        line-height: 18px;
        letter-spacing: 1px;
        &.active {
          font-family: Muli-Bold, Muli;
          font-weight: bold;
        }
        a {
          color: #333;
        }
      }
    }
  }
  &_right {
    flex: 1;
  }
}
</style>
