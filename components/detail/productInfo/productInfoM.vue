<template>
    <div>
        <!-- 商品下架 -->
        <div
            v-if="Number(productData.productSpuState) === 2"
            class="sold-out-box"
        >
            <div class="sold-out-image"></div>
            <h4>{{ 'Product has been removed'.toUpperCase() }}</h4>
        </div>
        <!-- 商品卡片 -->
        <template v-else>
            <div class="product-detail">
                <BannerM
                    :list="selectedColor.mediaList"
                    :product-type="productData.productType"
                />
                <!-- 基础信息卡片 -->
                <div class="product-detail-info">
                    <h4 class="product-detail-name">
                        {{ productData.productName.toUpperCase() }}
                    </h4>
                    <div class="product-detail-row">
                        <span class="product-price"
                            >{{ selectedSku.currencySign }}
                            <span class="letter-bold">{{
                                selectedSku.discountPrice ||
                                selectedSku.retailPrice
                            }}</span></span
                        ><span
                            v-if="selectedSku.discountPrice"
                            class="original-price"
                            >{{ selectedSku.currencySign }}
                            {{ selectedSku.retailPrice }}</span
                        >
                        <div class="flex-end">
                            <el-rate
                                v-model="productData.rating"
                                class="rate-box"
                                disabled
                                :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
                                disabled-void-color="#F8AB04"
                                disabled-void-icon-class="el-icon-star-off"
                            >
                                ></el-rate
                            >
                            <span
                                v-if="productData.ratingNum"
                                class="evaluate-count"
                                >({{ productData.ratingNum }})</span
                            >
                        </div>
                    </div>
                    <div class="product-explain">
                        <!-- Make 4 interest-free payments of
                        <i class="product-price">&#36; 12.49</i>
                        AUD fortnightly with -->
                        <span v-html="selectedSku.afterpayInfo"> </span>
                        <i class="afterplay-tag"></i>
                        <a class="link-text">More info</a>
                    </div>
                </div>
                <!-- 商品型号选择 -->
                <div class="model-picker-container">
                    <!-- 颜色 -->
                    <h5 class="picker-title">{{ $t('detail.color') }}</h5>
                    <CupSelect
                        :list="skcList"
                        :default-select-index="0"
                        class="mb-24"
                    >
                        <template
                            v-slot="{ item }"
                            @click="selectedSkcList(item)"
                        >
                            <img :src="item.colorImageUrl" />
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
                            <a
                                class="link-text link-text-fit"
                                @click="visibleSizeGuide = true"
                                >Size Guide</a
                            >
                        </p>
                    </div>
                    <CupSelect
                        :list="selectedColor.skuList"
                        :default-select-index="0"
                        class="mb-24"
                    >
                        <template v-slot="{ item }">
                            <!-- 小于阈值 显示提示 -->
                            <template v-if="item.stock <= 20">
                                <el-tooltip
                                    :content="`only left ${item.stock}!`"
                                    placement="top"
                                    effect="light"
                                    popper-class="cupshe-tooltip"
                                >
                                    <span class="content-text">{{
                                        item.size
                                    }}</span>
                                </el-tooltip>
                            </template>
                            <span
                                v-else
                                class="content-text"
                                @click="selectedSku == item"
                                >{{ item.size }}</span
                            >
                        </template>
                    </CupSelect>
                    <!-- 数量 -->
                    <h5 class="picker-title">{{ $t('detail.quantity') }}</h5>
                    <el-input-number
                        v-model="buyNumber"
                        :max="selectedSku.stock"
                        :min="1"
                    ></el-input-number>
                    <p class="box-interval color-error mt-4">
                        <span v-show="buyNumber === selectedSku.stock"
                            >Only {{ selectedSku.stock }} left！</span
                        >
                    </p>
                    <!-- 加入购物车按钮 -->
                    <el-button class="cupshe-button hvr-sweep-to-right">{{
                        `${$t('detail.addTobag')} · ${
                            selectedSku.currencySign
                        } ${
                            selectedSku.discountPrice || selectedSku.retailPrice
                        }`
                    }}</el-button>
                    <p class="product-explain color-999 tip-text">
                        Sunchaser member will earn<span
                            class="font-bold-max color-primary"
                        >
                            {{ selectedSku.points }} points</span
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
                    <ProductCare v-if="index === 3" />
                    <!-- eslint-disable-next-line vue/no-v-html -->
                    <div v-else v-html="item.content"></div>
                </el-collapse-item>
            </el-collapse>

            <!-- 购物车吸底样式 -->
            <div v-show="visibleFixBottom" class="fix-bottom-box">
                <i class="icon-share" @click="visibleShare = true"></i>
                <!-- 加入购物车按钮 -->
                <el-button class="cupshe-button hvr-sweep-to-right">{{
                    `${$t('detail.addTobag')} · ${selectedSku.currencySign} ${
                        selectedSku.discountPrice || selectedSku.retailPrice
                    }`
                }}</el-button>
            </div>
        </template>
        <!-- 分享弹框 -->
        <CupPopup
            :title="$t('detail.shareTitle')"
            :visible="visibleShare"
            @close-popup="visibleShare = false"
        >
            <ul class="share-list">
                <li
                    v-for="(item, index) in shareList"
                    :key="index"
                    class="share-item"
                >
                    <svg class="icon" aria-hidden="true">
                        <use :xlink:href="'#' + item.iconName"></use>
                    </svg>
                    <p>{{ item.text }}</p>
                </li>
            </ul>
        </CupPopup>
        <!-- 尺寸助手弹框 -->
        <CupPopup
            :title="$t('detail.sizeGuideTitle')"
            :visible="visibleSizeGuide"
            @close-popup="visibleSizeGuide = false"
        >
            <SizeGuideTable :table-data="productData.sizeGuide" />
        </CupPopup>
    </div>
</template>
<script>
import detailModel from '@moduleMixin/detailModule'
export default {
    name: 'ProductInfoM',
    mixins: [detailModel], // 接口数据交互逻辑
    data() {
        // 只包含页面交互逻辑
        return {
            visibleShare: false, // 分享弹框
            visibleSizeGuide: false, // 尺码助手
            visibleFixBottom: false, // 加入购物车吸底
            shareList: [
                {
                    iconName: 'iconicon-web-40-fenxiang-disanfang-facebook',
                    link: '',
                    text: 'Facebook',
                },
                {
                    iconName: 'iconicon-web-40-fenxiang-disanfang-pinterest',
                    link: '',
                    text: 'Pinterrest',
                },
                {
                    iconName: 'iconicon-web-40-fenxiang-disanfang-twitter',
                    link: '',
                    text: 'Twitter',
                },
            ],
        }
    },
}
</script>
<style lang="scss" scoped>
.mb-24 {
    margin-bottom: $padding-4m;
}
.mt-4 {
    margin-top: $padding-base;
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
                line-height: 25px;
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
            .afterplay-tag {
                margin-top: 8px;
            }
            .link-text {
                vertical-align: 3px;
            }
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
        font-family: $muli-regular-font-family;
        font-size: $font-size-xs;
        font-weight: normal;
        margin-bottom: $padding-3m;
    }
}

.tip-text {
    margin-top: $padding-2m;
}

.size-fit-tag {
    @include icon-image('true_fit_size');
    vertical-align: text-bottom;
    width: 14px;
    height: 14px;
    margin-right: $padding-base;
}
// 尺码助手
.size-guide-row {
    > p:first-child {
        margin-right: 35px;
    }
    .link-text-fit {
        vertical-align: 2px;
    }
}

// 商品下架样式
.sold-out-box {
    padding: 90px 0 100px 0;
    margin: 0 auto;
    text-align: center;
    .sold-out-image {
        @include icon-image('sold_out');
        width: 108px;
        height: 108px;
    }
    .sold-out-text {
        color: #222;
        font-size: $font-size-sm;
        font-family: $muli-bold-font-family;
    }
}

// 购物车吸底样式
.fix-bottom-box {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 64px;
    background: #fff;
    box-shadow: 0px -2px 20px 0px rgba(0, 0, 0, 0.05);
    padding: 10px $padding-4m;
    border-top: 2px dashed #eee;
    z-index: 100;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .icon-share {
        cursor: pointer;
    }
    .cupshe-button {
        // display: inline-block;
        vertical-align: middle;
        width: 298px;
        margin-left: 15px;
    }
}

// 分享样式
.share-list {
    padding: $padding-6m 59px;
    display: flex;
    justify-content: space-between;
    .share-item {
        text-align: center;
        .icon {
            font-size: 40px;
            margin-bottom: $padding-4m;
        }
    }
}
</style>
