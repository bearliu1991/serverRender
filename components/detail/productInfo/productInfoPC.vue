<template>
    <div class="container">
        <!-- 面包屑 -->
        <el-breadcrumb separator="/" class="breadcrumb-box">
            <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">New in</el-breadcrumb-item>
            <el-breadcrumb-item>Just In New: One Pieces</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 商品详情 -->
    </div>
</template>
<script>
export default {
    name: 'Pc',
    inheritAttrs: false,
    beforeCreate() {},
    mounted() {},
}
</script>
<style lang="scss" scoped>
.container {
    padding: 37px 284px 100px 0;
}
</style>
