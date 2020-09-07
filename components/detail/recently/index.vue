<template>
    <div>
        <component :is="`${$store.state.terminal}`" v-bind="$attrs"></component>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './recentlyPC.vue'
import wap from './recentlyWap.vue'
export default {
    name: 'Recently',
    components: {
        pc,
        wap,
    },
    inheritAttrs: false,
}
</script>
