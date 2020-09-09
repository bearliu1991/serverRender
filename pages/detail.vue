<template>
    <div class="container">
        <!-- <button @click="$store.commit('SET_TERMINAL')">切换终端</button> -->
        <!-- 商品信息 模块-->
        <ProductInfo :detail-list="detailList" :sold-out="soldOut" />
        <!-- 关联商品 -->
        <RelatedModel v-if="!soldOut" :buy-it-width="buyItWidth" />
        <!-- 猜你喜欢模块 -->
        <Recommend :recommend-list="alsoLikeList" />
        <!-- 评论模块 -->
        <!-- recently viewed -->
        <Recently :recently-list="recentlyList" />
    </div>
</template>

<script>
export default {
    async asyncData({ app: { $api, store } }) {
        const res = await $api.get('musicRankings')
        // eslint-disable-next-line no-console
        // console.log('测试数据', res)
        return {
            res,
            buyItWidth: {
                image: '/images/size2.png',
                title: 'Black floral halter high waisted bikini',
                price: '23.9',
            },
            alsoLikeList: [
                {
                    imageUrl: '/images/size1.png',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.png',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.png',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.png',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
                {
                    imageUrl: '/images/size1.png',
                    name: 'Black floral halter high waist fjofjo fdofjodf',
                    price: '16.99',
                    grade: 4,
                    gradeCount: 102,
                },
            ],
            recentlyList: [
                {
                    imageUrl: '/images/size1.png',
                    link: '',
                    title: 'Black floral halter high waiste red and jfdofjod',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.png',
                    link: '',
                    title: 'Black floral halter high waiste red and jfdofjod',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.png',
                    link: '',
                    title: 'Black floral halter high waiste red and jfdofjod',
                    price: 16.99,
                    originalPrice: 27.99,
                },
                {
                    imageUrl: '/images/size1.png',
                    link: '',
                    title: 'Black floral halter high waiste red and jfdofjod',
                    price: 16.99,
                    originalPrice: 27.99,
                },
            ],
        }
    },
    data() {
        return {
            soldOut: false,
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
                    title: 'return&exchange',
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

<style lang="scss" scoped>
.container-fixed {
    padding-bottom: 25px;
}
</style>
