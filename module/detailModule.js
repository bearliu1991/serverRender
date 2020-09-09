export default {
    props: {
        productData: {
            type: Object,
            default: () => {
                return {}
            },
        },
        detailList: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    data() {
        return {
            buyNumber: 3, // 选择数量
            selectedColor: {}, // 当前选中的颜色对象 --skc对象
            selectedSkcList: [], // 当前选中颜色，对应的型号 sku列表
            selectedSkc: {}, // 选中的型号对象 -- sku对象
        }
    },
    computed: {
        skcList() {
            // 颜色列表
            return this.productData.skcList || []
        },
    },
    watch: {
        productData: {
            immediate: true,
            handler(value) {
                const { skcList = [] } = value
                this.selectedColor = skcList[0] || {}
                this.selectedSkcList = this.selectedColor.skuList || []
                this.selectedSkc = this.selectedSkcList[0] || {}
            },
        },
    },
    beforeCreate() {},
    mounted() {},
    methods: {
        handleSelectSize(item) {
            this.selectedColor = item
            this.selectedSkcList = item.selectedSkcList || []
            this.selectedSkc = this.selectedSkcList[0] || {}
        },
    },
}
