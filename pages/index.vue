<template>
    <div class="container">
        <!-- 商品卡片 -->
        <div class="product-detail">
            <el-carousel class="product-image-swipe">
                <el-carousel-item v-for="(image, index) in images" :key="index">
                    <img :src="image" class="product-detail-image" />
                </el-carousel-item>
            </el-carousel>
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
                        <i class="font-bold">&#36;12.49</i>
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
                <ul class="model-picker mb-24">
                    <li
                        v-for="(item, index) in colorList"
                        :key="index"
                        class="model-picker-item"
                    >
                        <img :src="item.image" />
                    </li>
                </ul>
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
                <ul class="model-picker box-interval">
                    <li
                        v-for="(item, index) in sizeList"
                        :key="index"
                        class="model-picker-item"
                    >
                        <el-tooltip
                            :content="item.text"
                            placement="top"
                            effect="light"
                        >
                            <span class="content-text">{{ item.text }}</span>
                        </el-tooltip>
                    </li>
                </ul>
                <!-- 数量 -->
                <h5 class="picker-title">{{ $t('detail.count') }}</h5>
                <el-input-number
                    v-model="num"
                    :min="1"
                    class="box-interval"
                ></el-input-number>
                <!-- 加入购物车按钮 -->
                <el-button>add to bag · $23.90</el-button>
                <p class="product-explain color-999 tip-text">
                    Sunchaser member will earn<span class="font-bold color-000">
                        193 points</span
                    >
                </p>
            </div>
        </div>
        <!-- 商品补充说明 -->
        <el-collapse>
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
        <!-- buy it with 模块 -->
        <div
            class="buy-with-container"
            :style="{ 'background-image': `url(${buyItWidth.image})` }"
        >
            <div class="container-mask"></div>
            <div class="container-content">
                <h3 class="model-title">{{ $t('detail.match') }}</h3>
                <div class="product-card-horizon">
                    <img :src="buyItWidth.image" class="left-side" />
                    <div class="right-side">
                        <p class="product-title">{{ buyItWidth.title }}</p>
                        <p class="product-price">
                            &#36; {{ buyItWidth.price }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- you may alse like -->
        <div class="recomand-container">
            <h3 class="model-title">{{ $t('detail.recommand') }}</h3>
            <el-carousel :autoplay="false" type="card" class="recommend-swipe">
                <el-carousel-item
                    v-for="(item, index) in alsoLikeList"
                    :key="index"
                >
                    <div class="product-card-vertical">
                        <img :src="item.imageUrl" class="image-box" />
                        <h6 class="product-name">{{ item.name }}</h6>
                        <p class="product-price">
                            {{ $t('unit') + ' ' + item.price }}
                        </p>
                        <!-- 评分组件 -->
                        <div class="rate-modal">
                            <el-rate
                                v-model="item.grade"
                                class="rate-box"
                                disabled
                                :colors="['#F8AB04', '#F8AB04', '#F8AB04']"
                                disabled-void-color="#F8AB04"
                                disabled-void-icon-class="el-icon-star-off"
                            ></el-rate>
                            <span class="evaluate-count"
                                >({{ item.gradeCount }})</span
                            >
                        </div>
                    </div>
                </el-carousel-item>
            </el-carousel>
        </div>
        <div class="separate-block"></div>
        <!-- 评论模块 -->
        <!-- recently viewed -->
        <div class="recently-viewd-container">
            <h3 class="model-title">{{ $t('detail.recently') }}</h3>
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
        </div>
    </div>
</template>

<script>
export default {
    async asyncData({ app: { $api, store } }) {
        const res = await $api.musicRankings()
        // eslint-disable-next-line no-console
        // console.log('测试数据', res)
        return {
            res,
            productName: 'Retro polka dot and stripe halter one piece swmin',
            images: [
                '/images/size1.jpg',
                '/images/size1.jpg',
                '/images/size1.jpg',
            ],
            value: 4,
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
            buyItWidth: {
                image: '/images/size2.png',
                title: 'Black floral halter high waisted bikini',
                price: '23.9',
            },
            alsoLikeList: [
                {
                    imageUrl: '/images/size1.jpg',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
            ],
            recentlyList: [
                {
                    imageUrl: '/images/size1.jpg',
                    link: '',
                    title:
                        'Black floral halter high waiste red and jfdofjodfjodsfjos',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    link: '',
                    title:
                        'Black floral halter high waiste red and jfdofjodfjodsfjos',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    link: '',
                    title:
                        'Black floral halter high waiste red and jfdofjodfjodsfjos',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.jpg',
                    link: '',
                    title:
                        'Black floral halter high waiste red and jfdofjodfjodsfjos',
                    price: 16.99,
                    originalPrice: 27.99,
                },
            ],
        }
    },
    data() {
        return {
            name: '1',
            num: 3,
            detailList: [
                {
                    title: 'description',
                    content: `Optez pour un style de spectacle sans sacrifier le confort dans le bikini jaune vif festonné. Le débardeur jaune avec bonnets rembourrés offre un soutien et une couverture supplémentaires. Le bas de bikini parfaitement assorti offre une couverture modérée. La bordure festonnée ajoute des détails doux. C’est l’ensemble parfait pour votre prochaine aventure!
Code de produit: ADD2004Y`,
                },
                {
                    title: 'shipping',
                    content: `Optez pour un style de spectacle sans sacrifier le confort dans le bikini jaune vif festonné. Le débardeur jaune avec bonnets rembourrés offre un soutien et une couverture supplémentaires. Le bas de bikini parfaitement assorti offre une couverture modérée. La bordure festonnée ajoute des détails doux. C’est l’ensemble parfait pour votre prochaine aventure!
Code de produit: ADD2004Y`,
                },
                {
                    title: 'return&exchang',
                    content: `Optez pour un style de spectacle sans sacrifier le confort dans le bikini jaune vif festonné. Le débardeur jaune avec bonnets rembourrés offre un soutien et une couverture supplémentaires. Le bas de bikini parfaitement assorti offre une couverture modérée. La bordure festonnée ajoute des détails doux. C’est l’ensemble parfait pour votre prochaine aventure!
Code de produit: ADD2004Y`,
                },
                {
                    title: 'product care',
                    content: `Optez pour un style de spectacle sans sacrifier le confort dans le bikini jaune vif festonné. Le débardeur jaune avec bonnets rembourrés offre un soutien et une couverture supplémentaires. Le bas de bikini parfaitement assorti offre une couverture modérée. La bordure festonnée ajoute des détails doux. C’est l’ensemble parfait pour votre prochaine aventure!
Code de produit: ADD2004Y`,
                },
            ],
        }
    },
    computed: {},
    beforeCreate() {},
    mounted() {},
    methods: {
        async getVideo() {
            const res = await this.$api.videoCategory()
            // eslint-disable-next-line no-console
            console.log(res)
        },
    },
}
</script>

<style lang="scss">
.mb-24 {
    margin-bottom: $padding-4m;
}
// 商品详情卡片
.product-detail {
    .product-image-swipe {
        height: 563px;
        .el-carousel__container {
            height: 100%;
        }
        .product-detail-image {
            height: 100%;
        }
    }
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
    .model-picker {
        display: flex;
        .model-picker-item {
            width: 36px;
            height: 36px;
            border-radius: 50%;
            text-align: center;
            line-height: 28px;
            border: 1px solid #d8d8d8;
            padding: $padding-base;
            cursor: pointer;
            &:not(:last-child) {
                margin-right: $padding-4m;
            }
            &.selected {
                border: 1px solid $black;
                color: #000;
            }
            > img {
                width: 100%;
                height: 100%;
                border-radius: 50%;
            }
            .content-text {
                display: inline-block;
                height: 60%;
            }
        }
    }
}

.tip-text {
    margin-top: $padding-2m;
}

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
}

// you may also like
.recommend-swipe {
    height: 400px;

    .el-carousel__container {
        height: 365px;
        .el-carousel__item {
            width: 200px;
            // margin: 0 $padding-4m;
        }
    }
    .product-card-vertical {
        width: 200px;
        // margin: 0 $padding-4m;
    }
}

// you may also like
.recomand-container {
    padding: 40px 0 33px 0;
    .model-title {
        margin-bottom: 24px;
        text-align: center;
    }
}
// recently viewed
.recently-viewd-container {
    padding: 40px $padding-4m 48px $padding-4m;
    .model-title {
        margin-bottom: $padding-6m;
    }
}

// 横向滚动列表
.srcoll-horizon-container {
    width: 100%;
    overflow-y: auto;
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
.separate-block {
    width: 100%;
    height: 12px;
    background: $gray-1;
}
.model-title {
    font-size: $font-size-lg;
    font-family: $muli-bold-font-family;
    line-height: 23px;
    font-weight: bold;
    letter-spacing: 2px;
}

// 尺码助手
.size-guide-row {
    > p:first-child {
        margin-right: 35px;
    }
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

// 评分
.rate-box {
    display: inline-block;
    vertical-align: middle;

    .el-rate__item {
        .el-rate__icon {
            font-size: $font-size-xs;
            margin-right: 2px;
            &.el-icon-star-on {
                font-size: $font-size-sm;
            }
            &.el-icon-star-off {
                padding-top: 1.2px;
            }
        }
    }
}
.evaluate-count {
    font-size: $font-size-xs;
    font-weight: 300;
    font-family: $pingfang-font-family;
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
            color: #000;
            font-family: $muil-regular-font-family;
            line-height: 18px;
            margin-bottom: $padding-2m;
        }
        .product-price {
            font-weight: bold;
            line-height: 15px;
            color: #000;
        }
    }
}
.product-card-vertical {
    width: 200px;
    .image-box {
        width: 100%;
        height: 300px;
        margin-bottom: $padding-2m;
    }
    .product-name {
        color: $black;
        font-size: $font-size-xs;
        font-family: $muil-regular-font-family;
        line-height: 15px;
        letter-spacing: 1px;
        width: 100%;
        margin-bottom: 6px;
        text-align: center;
        @include ellipsis;
    }
    .product-price {
        color: $black;
        font-size: $font-size-xs;
        font-family: $muli-bold-font-family;
        text-align: center;
        width: 100%;
        letter-spacing: 2px;
        margin-bottom: 6px;
    }
    .rate-modal {
        text-align: center;
    }
}

.product-card-vertical-discount {
    width: 138px;
    .image-box {
        width: 100%;
        height: 207px;
        margin-bottom: $padding-2m;
    }
    .product-name {
        color: $black;
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
