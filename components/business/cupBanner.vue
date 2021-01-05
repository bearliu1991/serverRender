<template>
  <div class="cs_home_banner" v-if="childObj.enable && isShow">
    <client-only>
      <cup-swiper-pc
        :list="childObj.slideshowContentList"
        :option="swiperOption"
      >
        <template v-slot:swiper-item="{ item }">
          <div class="cup_home_banner_item">
            <a :href="transferUrl(item.link)">
              <img
                :src="isPc ? item.pcImage : item.mobileImage"
                :class="[!isPc && 'mobile']"
                alt=""
              />
            </a>
          </div>
        </template>
      </cup-swiper-pc>
    </client-only>
  </div>
</template>

<script>
import mixins from '../../pages/indexMixin'
export default {
  mixins: [mixins],
  data() {
    return {
      swiperOption: {
        loop: true,
        slidesPerView: 'auto',
        autoplay: {
          delay: 2000,
          disableOnInteraction: false,
        },
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
        },
        isShow: true,
      },
    }
  },
  watch: {
    childObj(newVal) {
      if (newVal && newVal.id) {
        this.$set(this.swiperOption.autoplay, 'delay', newVal.second * 1000)
        this.$set(this.swiperOption, 'loop', true)
        this.dataList = newVal.slideshowContentList
        this.isShow = false
        this.$nextTick(() => {
          this.isShow = true
        })
        if (this.dataList.length === 1) {
          this.$set(this.swiperOption, 'loop', false)
          this.$set(this.swiperOption, 'autoplay', { delay: null })
        }
      }
    },
  },
}
</script>

<style lang="scss">
.cup_home_banner_item {
  width: 100%;
  img {
    height: 930px;
    &.mobile {
      height: 597px;
    }
  }
}
</style>
