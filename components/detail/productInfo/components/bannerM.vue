<template>
    <div class="container">
        <el-breadcrumb separator="/" class="breadcrumb-box">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item>Just In New: One Pieces</el-breadcrumb-item>
        </el-breadcrumb>
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
                        'swiper-pagination-bullet-active':
                            i - 1 === activeIndex,
                    }"
                ></div>
            </div>
        </swiper>
    </div>
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
.container {
    position: relative;
}
.breadcrumb-box {
    position: absolute;
    top: 0;
    left: 0;
    height: 36px;
    line-height: 18px;
    width: 100%;
    background: rgba(255, 255, 255, 0.8);
    z-index: 11;
}
.swiper {
    .swiper-slide {
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-weight: bold;
        background-color: #fff;
        align-items: center;
    }
    .swiper-pagination-bullets {
        bottom: 33px;
    }
    /deep/ .swiper-pagination-bullet {
        $size: 5px;
        width: $size !important;
        height: $size !important;
        line-height: $size !important;
        text-align: center;
        background: #fff;
        opacity: 1;
        vertical-align: middle;

        &.swiper-pagination-bullet-active {
            $size: 8px;
            width: $size !important;
            height: $size !important;
            background: #ffab00;
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
