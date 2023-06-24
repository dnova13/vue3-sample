<!-- /* 
    메뉴 화면 view 
*/ -->
<template>
    <div>
        <dining-menu :menuList="menuList" />
    </div>
    <!-- <div class="ad-container"><a class="ad" :href="adURL" target="_blank"></a></div> -->
</template>

<script>
import diningMenu from '@/components/dining/dining-menu'

export default {
    components: {
        diningMenu,
    },
    props: ['menuList'],
    mounted() {
        this.$emit('setTrigger', '/menu')
    },
}
</script>

<style></style>
