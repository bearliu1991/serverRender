<template>
    <div>
        <div class="recently-viewd-container">
            <h3 class="model-title">{{ $t('detail.recently') }}</h3>
            <RecentlyList :recently-list="recentlyList" />
        </div>
    </div>
</template>
<script>
export default {
    name: 'RecentlyM',
    props: {
        recentlyList: {
            type: Array,
            default: () => {
                return []
            },
        },
    },
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss">
.recently-viewd-container {
    padding: 40px $padding-4m 48px $padding-4m;
    .model-title {
        margin-bottom: $padding-6m;
    }
}
</style>
