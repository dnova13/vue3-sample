<!-- /* 
    search 페이지 view
*/ -->
<template>
    <div class="search-comp">
        <search :menuList="menuList" />
    </div>
</template>

<script>
import search from '@/components/dining/search'

export default {
    components: {
        search,
    },
    props: ['menuList'],
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {
        this.$emit('setTrigger', '/search')
    },
    methods: {},
}
</script>

<style></style>
