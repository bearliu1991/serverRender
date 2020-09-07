<!-- 型号、颜色选择器，包含无货展示样式 -->
<template>
    <div>
        <ul class="model-picker mb-24">
            <li
                v-for="(item, index) in list"
                :key="index"
                class="model-picker-item"
                :class="{ selected: index === selectedIndex }"
                @click="handleClick(item, index)"
            >
                <slot :item="item"></slot>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'CupSelect',
    props: {
        list: {
            type: Array,
            default: () => {
                return []
            },
        },
        defaultSelectIndex: {
            type: Number,
            default: 0,
        },
    },
    data() {
        return {
            selectedIndex: 0,
        }
    },
    watch: {
        defaultSelectIndex: {
            immediate: true,
            handler(value) {
                this.selectedIndex = value
            },
        },
    },
    methods: {
        handleClick(item, index) {
            this.selectedIndex = index
        },
    },
}
</script>
<style lang="scss" scoped>
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
            border: 1px solid $primary;
            color: #000;
        }
        &.stockout {
            border: 1px dashed $disable;
            // background: linear-gradient(#fff, #fff) padding-box,
            //     repeating-linear-gradient(
            //         -45deg,
            //         $disable 0,
            //         $disable 0.25em,
            //         #fff 0,
            //         #fff 0.75em
            //     );
            background: linear-gradient(#fff, #fff) padding-box,
                repeating-linear-gradient(
                    -45deg,
                    #fff 0,
                    #fff 0.25em,
                    #fff 0,
                    #fff 0.75em
                );
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
</style>
