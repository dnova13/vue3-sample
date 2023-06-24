<!-- // /* 
//     loading page component
// */ -->
<template>
    <div class="loading-container">
        <div class="dot" />
    </div>
</template>

<script>
import { scrollOff } from '@/utils/function.js'

export default {
    data() {
        return {}
    },
    created() {
        scrollOff()
    },
    mounted() {},
    methods: {},
}
</script>

<style></style>
