<template>
    <div>
        <component :is="$store.state.terminal" v-bind="$attrs"></component>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './recommendPc.vue'
import mobile from './recommendM.vue'
export default {
    name: 'Recommend',
    components: {
        pc,
        mobile,
    },
    inheritAttrs: false,
}
</script>
