<template>
    <div>
        <component :is="$store.state.terminal" v-bind="$attrs"></component>
    </div>
</template>
<script>
/* eslint-disable no-unused-vars */
import pc from './relatedModelPC.vue'
import mobile from './relatedModelM.vue'
export default {
    relatedModel: 'RelatedModel',
    components: {
        pc,
        mobile,
    },
    inheritAttrs: false,
}
</script>
