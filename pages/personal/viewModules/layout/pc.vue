<template>
  <div class="cs-personal">
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
      <nuxt-child />
    </div>
  </div>
</template>
<script>
import personalMixin from '../../personalMixin'
export default {
  mixins: [personalMixin],
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
      width: 100%;
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
        &:last-child {
          margin-bottom: 0;
        }
        &.active {
          @include font($fontMuliBold);
        }
      }
    }
  }
}
</style>
