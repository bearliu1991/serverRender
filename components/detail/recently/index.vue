<template>
    <div>
        <component :is="$store.state.terminal" v-bind="$attrs"></component>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './pc.vue'
import wap from './wap.vue'
export default {
    name: 'Recently',
    components: {
        pc,
        wap,
    },
    inheritAttrs: false,
}
</script>
