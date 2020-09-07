<template>
    <div class="srcoll-horizon-container">
        <ul class="srcoll-list-box">
            <li v-for="(item, index) in recentlyList" :key="index">
                <div class="product-card-vertical-discount">
                    <img :src="item.imageUrl" class="image-box" />
                    <h6 class="product-name">{{ item.title }}</h6>
                    <div class="product-price-row">
                        <span class="product-price">{{
                            $t('unit') + ' ' + item.price
                        }}</span
                        ><span class="original-price">{{
                            $t('unit') + ' ' + item.originalPrice
                        }}</span>
                    </div>
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'RecentlyList',
    props: {
        recentlyList: {
            type: Array,
            default: () => {
                return []
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
// 横向滚动列表
.srcoll-horizon-container {
    width: 100%;
    overflow-y: auto;
    // &::-webkit-scrollbar {
    //     display: none;
    // }
    .srcoll-list-box {
        display: flex;
        flex-wrap: nowrap;
    }
    li {
        &:not(:last-child) {
            margin-right: $padding-2m;
        }
    }
}

// 商品打折卡片
.product-card-vertical-discount {
    width: 138px;
    .image-box {
        width: 100%;
        height: 207px;
        margin-bottom: $padding-2m;
    }
    .product-name {
        color: $primary;
        font-size: $font-size-xs;
        font-family: $muil-regular-font-family;
        line-height: 18px;
        letter-spacing: 1px;
        width: 100%;
        margin-bottom: 6px;
        text-align: center;
        @include multi-ellipsis(2);
    }
    .product-price-row {
        span + span {
            padding-left: 4px;
        }
    }
}
</style>
