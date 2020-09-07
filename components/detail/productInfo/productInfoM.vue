<template>
    <div>
        <!-- 商品卡片 -->
        <div class="product-detail">
            <BannerM :list="images" />
            <!-- 基础信息卡片 -->
            <div class="product-detail-info">
                <h4 class="product-detail-name">
                    {{ productName.toUpperCase() }}
                </h4>
                <div class="product-detail-row">
                    <span class="product-price">&#36; 23.90</span
                    ><span class="original-price">&#36;53.90</span>
                    <div class="flex-end">
                        <el-rate
                            v-model="value"
                            class="rate-box"
                            disabled
                            :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
                            disabled-void-color="#F8AB04"
                            disabled-void-icon-class="el-icon-star-off"
                        >
                            ></el-rate
                        >
                        <span class="evaluate-count">(102)</span>
                    </div>
                </div>
                <div>
                    <p class="product-explain">
                        Make 4 interest-free payments of
                        <i class="product-price">&#36;12.49</i>
                        AUD fortnightly with
                    </p>
                </div>
                <div class="afterplay-tag"></div>
                <a class="link-text">More info</a>
            </div>
            <!-- 商品型号选择 -->
            <div class="model-picker-container">
                <!-- 颜色 -->
                <h5 class="picker-title">{{ $t('detail.color') }}</h5>
                <CupSelect
                    :list="colorList"
                    :default-select-index="1"
                    class="mb-24"
                >
                    <template v-slot="{ item }">
                        <img :src="item.image" />
                    </template>
                </CupSelect>
                <!-- 型号 -->
                <h5 class="picker-title">{{ $t('detail.size') }}</h5>
                <div class="size-guide-row display-flex box-interval">
                    <p>
                        <i class="size-fit-tag"></i>
                        <a class="link-text">Which Size Fits Me?</a>
                    </p>
                    <p>
                        <span class="iconfont">&#xe63d;</span>
                        <a class="link-text">Size Guide</a>
                    </p>
                </div>
                <CupSelect
                    :list="sizeList"
                    :default-select-index="1"
                    class="mb-24"
                >
                    <template v-slot="{ item }">
                        <el-tooltip
                            :content="item.text"
                            placement="top"
                            effect="light"
                            popper-class="cupshe-tooltip"
                        >
                            <span class="content-text">{{ item.text }}</span>
                        </el-tooltip>
                    </template>
                </CupSelect>
                <!-- 数量 -->
                <h5 class="picker-title">{{ $t('detail.count') }}</h5>
                <el-input-number v-model="num" :min="1"></el-input-number>
                <p class="box-interval color-error">Only 4 left！</p>
                <!-- 加入购物车按钮 -->
                <el-button class="cupshe-button hvr-sweep-to-right">{{
                    $t('detail.addTobag') + ' · ' + $t('unit') + 23.9
                }}</el-button>
                <p class="product-explain color-999 tip-text">
                    Sunchaser member will earn<span class="font-bold color-000">
                        193 points</span
                    >
                </p>
            </div>
        </div>

        <!-- 商品补充说明 -->
        <el-collapse accordion>
            <el-collapse-item
                v-for="(item, index) in detailList"
                :key="index"
                :title="item.title.toUpperCase()"
                :name="index"
            >
                <!-- eslint-disable-next-line vue/no-v-html -->
                <div v-html="item.content"></div>
            </el-collapse-item>
        </el-collapse>
    </div>
</template>
<script>
export default {
    name: 'Mobile',
    props: {
        detailList: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            num: 3,
            value: 4,
            productName: 'Retro polka dot and stripe halter one piece swmin',
            colorList: [
                {
                    code: 1,
                    image: '/images/size2.png',
                },
                {
                    code: 2,
                    image: '/images/size2.png',
                },
                {
                    code: 3,
                    image: '/images/size2.png',
                },
            ],
            sizeList: [
                {
                    code: 1,
                    text: 'XS',
                },
                {
                    code: 2,
                    text: 'S',
                },
                {
                    code: 3,
                    text: 'M',
                },
                {
                    code: 4,
                    text: 'XL',
                },
                {
                    code: 1,
                    text: 'XS',
                },
            ],
            images: [
                '/images/size1.jpg',
                '/images/size1.jpg',
                '/images/size1.jpg',
            ],
        }
    },
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss" scoped>
.mb-24 {
    margin-bottom: $padding-4m;
}
// 商品详情卡片
.product-detail {
    .product-detail-info {
        font-family: $muli-bold-font-family;
        padding: $padding-4m $padding-4m $padding-6m $padding-4m;
        background: $gray-1;
        .product-detail-name {
            font-size: $font-size-lg;
            line-height: 27px;
            letter-spacing: 2px;
            margin-bottom: $padding-4m;
        }
        .product-detail-row {
            display: flex;
            align-items: center;
            margin-bottom: $padding-3m;
            > * {
                flex-shrink: 0;
            }
            .product-price {
                font-size: $font-size-xl;
                font-weight: bold;
                line-height: 25px;
                letter-spacing: 2px;
                padding-right: $padding-2m;
            }
            .flex-end {
                flex-grow: 1;
                text-align: right;
            }
        }
        .product-explain {
            font-family: 'Muli Regular Light';
            font-size: $font-size-xs;
            margin-bottom: $padding-2m;
            .font-bold {
                font-family: 'Muli Bold';
            }
        }
    }
}

// 商品型号选择模块
.model-picker-container {
    padding: 26px $padding-4m;
    .box-interval {
        margin-bottom: $padding-6m;
    }
    .picker-title {
        font-family: $muil-regular-font-family;
        font-size: $font-size-xs;
        font-weight: normal;
        margin-bottom: $padding-3m;
    }
}

.tip-text {
    margin-top: $padding-2m;
}

.size-fit-tag {
    display: inline-block;
    vertical-align: text-bottom;
    width: 14px;
    height: 14px;
    background: url('~assets/images/trueFitSize@2x.png') no-repeat;
    background-size: cover;
    margin-right: $padding-base;
}
// 尺码助手
.size-guide-row {
    > p:first-child {
        margin-right: 35px;
    }
}
</style>
