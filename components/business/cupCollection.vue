<template>
  <div class="cs_home_collection" v-if="childObj.enable">
    <div v-if="$store.state.terminal === 'pc'" class="pc-wrap">
      <ul class="ul-list">
        <li
          v-for="(item, index) in childObj.collectionListContents"
          :key="index"
        >
          <a :href="transferUrl(item.link)">
            <img
              :src="item.pcImage"
              :class="[index % 2 === 1 ? 'order-change' : '']"
            />

            <div class="text-wrap">
              <p>{{ item.heading }}</p>
              <span>{{ item.pcDescription }}</span>
              <CupButton plain>{{ item.buttonText }}</CupButton>
            </div>
          </a>
        </li>
      </ul>
    </div>
    <div v-else class="mobile-wrap">
      <ul class="ul-list">
        <li
          v-for="(item, index) in childObj.collectionListContents"
          :key="index"
        >
          <a :href="transferUrl(item.link)">
            <img
              :src="item.mobileImage"
              :class="[index % 2 === 1 ? 'order-change' : '']"
          /></a>
          <div class="text-wrap">
            <p>{{ item.heading }}</p>
            <span v-html="item.mobileDescription"></span>
            <CupButton plain>{{ item.buttonText }}</CupButton>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'

export default {
  mixins: [mixins],
  props: {
    list: {
      type: Object,
      default: () => {},
    },
  },

  data() {
    return {}
  },
}
</script>

<style lang="scss" scoped>
.cs_home_collection {
}
.pc-wrap {
  padding-top: 100px;
  .ul-list {
    li {
      img {
        &.order-change {
          order: 1;
        }
      }
    }
  }
}

.ul-list {
  li {
    display: flex;
    a {
      display: flex;
      margin-bottom: 80px;
    }
    img {
      width: 1000px;
      height: 600px;
    }
    .text-wrap {
      width: 808px;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      p {
        font-family: Muli Bold;
        font-weight: bold;
        font-size: 40px;
        margin-bottom: 40px;
      }
      span {
        margin-bottom: 60px;
        font-weight: lighter;
        font-family: Muli Light;
        font-size: 18px;
        line-height: 27px;
        max-width: 480px;
      }
      .cs-button {
        width: 300px;
        height: 44px;
      }
    }
  }
}
.mobile-wrap {
  padding-top: 45px;
  .ul-list {
    li {
      @include setColumn();
      margin-bottom: 40px;
      img {
        width: 343px;
        height: 227px;
        margin-bottom: 12px;
      }
      .text-wrap {
        display: flex;
        width: 295px;
        p {
          font-size: 14px;
          margin-bottom: 8px;
        }
        span {
          margin-bottom: 16px;
          font-size: 12px;
          line-height: 16px;
        }
        .cs-button {
          width: 216px;
          height: 36px;
          line-height: 34px;
        }
      }
    }
  }
}
</style>
