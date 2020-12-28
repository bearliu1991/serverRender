<template>
  <div
    v-if="childObj.enable"
    class="cs_top_bar"
    :class="[barHeight === 40 ? 'height40' : 'height30']"
    :style="{
      'background-color': childObj.bgColor,
      position: childObj.fixed ? 'fixed' : 'relative',
    }"
  >
    <div style="height: 100%;">
      <cup-swiper-pc
        :list="childObj.homepageAnnouncementBarContents"
        :option="swiperOption"
        style="height: 100%;"
      >
        <template v-slot:swiper-item="{ item }">
          <div
            class="cs_top_bar_text"
            :style="{
              color: childObj.textColor,
              'font-size': barHeight === 40 ? '14px' : '12px',
            }"
          >
            <a
              :style="{ color: childObj.textColor }"
              :href="transferUrl(item.link)"
              >{{ item.text }}</a
            >
            <div v-if="item.isInScope && item.timeShow" class="time-wrap">
              <span class="time-red" :style="{ color: childObj.textColor }"
                >{{ item.hour }} H</span
              >
              <span class="time-red" :style="{ color: childObj.textColor }"
                >{{ item.minute }} M</span
              >
              <span class="time-red" :style="{ color: childObj.textColor }"
                >{{ item.second }} S</span
              >
            </div>
          </div>
        </template>
      </cup-swiper-pc>
    </div>
    <div class="cs_top_bar_close">
      <i
        v-if="childObj.closeButtonShow"
        class="icon-svg iconsousuo-web-guanbi pointer"
        :style="{ color: childObj.closeButtonColor }"
        @click="hideTopbar"
      ></i>
    </div>
    <!-- v-if="childObj.closeButtonShow" -->
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  props: {
    barHeight: {
      type: Number,
      default: 40,
    },
  },
  data() {
    return {
      closeStyle: {},
      dataList: [],
      timer: null,
      swiperOption: {
        loop: true,
        direction: 'vertical',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        slidesPerView: 1,
        spaceBetween: 0,
      },
    }
  },
  watch: {
    childObj(newVal) {
      if (newVal && newVal.id) {
        this.$set(this.swiperOption.autoplay, 'delay', newVal.second * 1000)
        this.dataList = newVal.homepageAnnouncementBarContents
        this.timer = setInterval(() => {
          this.changeList()
        }, 1000)
      }
    },
  },
  methods: {
    hideTopbar() {
      clearInterval(this.timer)
      this.$emit('hideBar')
    },
    changeList() {
      this.dataList &&
        this.dataList.length > 1 &&
        this.dataList.forEach((item) => {
          item.timeStart && item.timeEnd && this.timeCompare(item)
        })
    },
    timeCompare(item) {
      const startTime = new Date(item.timeStart).getTime()
      const endTime = new Date(item.timeEnd).getTime()
      const nowTime = new Date().getTime()
      if (nowTime < endTime && nowTime > startTime) {
        this.$set(item, 'isInScope', true)
        const leftMiliSec = endTime - nowTime
        const hour = Math.floor(leftMiliSec / (3600 * 1000))
        const leave2 = leftMiliSec % (3600 * 1000)
        const minute = Math.floor(leave2 / (60 * 1000))
        const leave3 = leave2 % (60 * 1000)
        const second = Math.round(leave3 / 1000)
        this.$set(item, 'hour', hour)
        this.$set(item, 'minute', minute)
        this.$set(item, 'second', second)
      } else {
        this.$set(item, 'isInScope', false)
        this.$set(item, 'hour', '')
        this.$set(item, 'minute', '')
        this.$set(item, 'second', '')
      }
    },
  },
}
</script>

<style lang="scss" scoped>
::v-deep .swiper-container {
  height: 40px;
}
.height40 {
  height: 40px;
  line-height: 40px;
}
.height30 {
  height: 30px;
  line-height: 30px;
}
.cs_top_bar {
  position: relative;
  text-align: center;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 999;
  font-weight: bold;
  &:hover .icon-svg {
    display: block;
  }
  &_text {
    color: #fff !important;
    font-family: $fontSemiBold;
    font-weight: normal;
    @include setMiddle();
    .time-wrap {
      margin-left: 6px;
      span {
        margin: 0 3px;
      }
    }
  }
  &_close {
    position: absolute;
    right: 100px;
    top: 0;
    bottom: 0;
    width: 18px;
    z-index: 2;
    @include setMiddle();
  }
}
.icon-svg {
  width: 18px;
  height: 18px;
  line-height: 18px;
  font-size: 18px;
  display: none;
}
</style>
