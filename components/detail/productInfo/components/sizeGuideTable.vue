<!-- 尺码表 -->
<template>
    <div class="container">
        <ul class="tab-list">
            <li
                class="tab-list-item"
                :class="{ selected: selectIndex === 0 }"
                @click="selectIndex = 0"
            >
                {{ $t('detail.Swimwear').toUpperCase() }}
            </li>
            <li
                class="tab-list-item"
                :class="{ selected: selectIndex === 1 }"
                @click="selectIndex = 1"
            >
                {{ $t('detail.BikiniTop').toUpperCase() }}
            </li>
        </ul>
        <!-- table 直接展示html -->
        <!-- eslint-disable-next-line vue/no-v-html -->
        <div v-html="content"></div>
        <!-- 具体样式 -->
        <h2 class="title">HOW TO MEASURE</h2>
        <div class="measure-box">
            <img
                class="measure-image"
                src="//cdn.shopify.com/s/files/1/0784/0207/t/106/assets/High-waist.png?v=5584500566586186807"
            />
            <div>
                <ul class="measure-list">
                    <li
                        v-for="(item, index) in measureList"
                        :key="index"
                        class="measure-item"
                    >
                        <h3 class="measure-item-title">
                            <i class="list-icon"></i>
                            {{ item.title }}
                        </h3>
                        <p class="measure-item-content">{{ item.content }}</p>
                    </li>
                </ul>
                <p class="content-text">
                    For more details please click
                    <a class="link-text">SIZE MEASUREMENT</a>. Refer to the
                    table on the suits size to confirm your correct size.
                </p>
            </div>
        </div>
        ··
    </div>
</template>
<script>
export default {
    name: 'SizeGuideTable',
    props: {},
    data() {
        return {
            content: '',
            linkUrl: 'https://www.cupshe.com/pages/size-measurement',
            selectIndex: 0,
            measureList: [
                {
                    title: 'BUST',
                    content: 'Measure around the fullest part of your bust.',
                },
                {
                    title: 'WAIST',
                    content:
                        'Find your natural waistline. Generally, it’s just below your last rib and a couple of inches above your navel.',
                },
                {
                    title: 'HIP',
                    content: 'Measure around the fullest part of your bust.',
                },
            ],
        }
    },
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss" scoped>
.container {
    padding: $padding-4m;
}
.tab-list {
    width: 100%;
    display: flex;
    border: 1px solid #000;
    .tab-list-item {
        height: 36px;
        line-height: 18px;
        padding: 10px 0;
        text-align: center;
        width: 50%;
        cursor: pointer;
        &:first-child {
            border-right: 1px solid #000;
        }
        &.selected {
            color: #fff;
            background: #000;
        }
    }
}
.title {
    color: #222;
    font-size: $font-size-sm;
    font-family: $muli-bold-font-family;
    font-weight: bold;
    letter-spacing: 2px;
    line-height: 18px;
    text-align: right;
    margin-top: $padding-6m;
    margin-bottom: 14px;
    padding-right: $padding-4m;
}
.measure-box {
    display: flex;
    .measure-image {
        width: 155px;
        height: 219px;
        margin-right: $padding-3m;
    }
    .measure-list {
        font-family: $muli-regular-font-family;

        .list-icon {
            display: inline-block;
            width: 8px;
            height: 8px;
            background: #fff;
            border-radius: 50%;
            border: 2px solid #000;
        }
        .measure-item {
            &:not(:last-child) {
                margin-bottom: $padding-4m;
            }
            .measure-item-title {
                line-height: 15px;
                margin-bottom: $padding-base;
            }
            .measure-item-content {
                line-height: 18px;
            }
        }
    }
    .content-text {
        font-family: $muli-regular-font-family;
        line-height: 18px;
        .link-text {
            font-weight: bold;
        }
    }
}
</style>
