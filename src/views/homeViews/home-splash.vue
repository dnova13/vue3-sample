<!-- /* 홈 스플래시 화면 view */ -->

<template>
    <div class="splash">
        <div class="inner_container">
            <splash v-if="onSplash && shopInfo" :shopInfo="shopInfo"></splash>
            <guide-dining
                v-if="onGuide && shopInfo"
                :shopInfo="shopInfo"
            ></guide-dining>
        </div>
    </div>
</template>
<script>
import splash from '@/components/splash'
import guideDining from '@/components/guide-dining'

export default {
    components: {
        splash,
        guideDining,
    },
    props: ['onSplash', 'onGuide', 'shopInfo'],
    data() {
        return {}
    },
    created() {},
    methods: {},
}
</script>
