<template>
    <!-- buy it with 模块 -->
    <div
        class="buy-with-container"
        :style="{ 'background-image': `url(${buyItWidth.imageUrl})` }"
    >
        <div class="container-mask"></div>
        <div class="container-content">
            <h3 class="model-title">{{ $t('detail.match') }}</h3>
            <div class="product-card-horizon">
                <img :src="buyItWidth.imageUrl" class="left-side" />
                <div class="right-side">
                    <p class="product-title">{{ buyItWidth.productName }}</p>
                    <p class="product-price">
                        {{ buyItWidth.currencySign }}
                        <span class="letter-bold">{{
                            buyItWidth.discountPrice || buyItWidth.retailPrice
                        }}</span>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Mobile',
    props: {
        buyItWidth: {
            type: Object,
            default: () => {
                return {}
            },
        },
    },
    data() {
        return {}
    },
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss" scoped>
// buy it with
.buy-with-container {
    width: 100%;
    height: 185px;
    background-size: cover;
    position: relative;
    .container-mask {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        background: #fff;
        opacity: 0.8;
    }
    .container-content {
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 1;
        padding: $padding-6m $padding-4m $padding-4m $padding-8m;
        .model-title {
            margin-bottom: $padding-4m;
        }
    }
    .product-card-horizon {
        cursor: pointer;
    }
}
// 商品横向模块
.product-card-horizon {
    display: flex;
    background: rgba(255, 255, 255, 0.7);
    .left-side {
        width: 90px;
        height: 90px;
        flex-shrink: 0;
    }
    .right-side {
        flex-grow: 1;
        padding: 14px $padding-4m $padding-2m $padding-5m;
        .product-title {
            font-family: $muli-regular-font-family;
            line-height: 18px;
            margin-bottom: $padding-2m;
            font-size: 12px;
        }
        .product-price {
            line-height: 15px;
        }
    }
}
</style>
