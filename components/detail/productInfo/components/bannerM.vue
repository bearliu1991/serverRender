<template>
    <swiper class="swiper product-image-swipe" :options="swiperOption">
        <swiper-slide v-for="(image, index) in list" :key="index">
            <img :src="image" class="product-detail-image" />
        </swiper-slide>
        <div
            slot="pagination"
            class="swiper-pagination swiper-pagination-bullets"
        >
            <div
                v-for="i in list.length"
                :key="i"
                class="swiper-pagination-bullet"
                :class="{
                    'swiper-pagination-bullet-active': i - 1 === activeIndex,
                }"
            ></div>
        </div>
    </swiper>
</template>
<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'

export default {
    name: 'Mobile',
    components: {
        Swiper,
        SwiperSlide,
    },
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            activeIndex: 0,
            swiperOption: {
                pagination: {
                    el: '.swiper-pagination',
                },
                on: {
                    slideChangeTransitionEnd: ({ activeIndex }) => {
                        this.activeIndex = activeIndex // 切换结束时，告诉我现在是第几个slide
                    },
                },
            },
        }
    },
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss" scoped>
.swiper {
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
        background-color: #fff;
    }
    /deep/ .swiper-pagination-bullet {
        $size: 10px;
        width: $size !important;
        height: $size !important;
        line-height: $size !important;
        text-align: center;
        opacity: 0.7;
        background: #000;

        &.swiper-pagination-bullet-active {
            opacity: 1;
            background: #f5a503;
        }
    }
}
.product-image-swipe {
    height: 563px;
    .product-detail-image {
        height: 100%;
    }
}
</style>
