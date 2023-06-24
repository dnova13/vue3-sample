<template>
    <!--다이닝맵-->
    <div class="inner_container map-container wrapper_inner">
        <div class="map-wrap">
            <div class="dining-map">
                <div class="map-intro">
                    <div>
                        <p class="map-title">다이닝 맵</p>
                    </div>
                </div>
                <div class="map-comp">
                    <kakaoMap :shopInfo="shopInfo" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import kakaoMap from '@/components/utils/kakao-map'

export default {
    components: {
        kakaoMap,
    },
    props: ['shopInfo'],
    data() {
        return {}
    },
    computed: {},
    created() {},
    mounted() {
        // this.$emit("setTrigger", "/allCategory");
        this.$emit('setTrigger', '/dinigMap')
    },
    methods: {},
}
</script>

<style></style>
