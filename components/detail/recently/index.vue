<template>
    <div>
        <component :is="`${$store.state.terminal}`" v-bind="$attrs"></component>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './recentlyPC.vue'
import mobile from './recentlyM.vue'
export default {
    name: 'Recently',
    components: {
        pc,
        mobile,
    },
    inheritAttrs: false,
}
</script>
