<template>
    <div id="wrapper" @click="onClickOutside">
        <div class="wrapper_inner">
            <!-- <home-splash
                v-if="onIntro"
                :on-splash="onSplash"
                :on-guide="onGuide"
                :shop-info="shopInfo"
            ></home-splash> -->
            <!-- <tap-top
                :menu-list="menuList"
                :shop-info="shopInfo"
                @setTrigger="setTrigger"
            ></tap-top> -->
            <!-- 
            <transition name="fade">
                <router-view
                    v-if="onScreen"
                    :menu-list="menuList"
                    :menu-info="menuInfo"
                    :shop-info="shopInfo"
                    :main-origin-list="mainOriginList"
                    @setTrigger="setTrigger"
                >
                </router-view>
            </transition>
            <mainNav
                ref="mainNav"
                :shop-info="shopInfo"
                :hide-category="hideCategory"
                @setTrigger="setTrigger"
                @hide-category="hideCategory = $event"
            /> -->
            <router-view> </router-view>
        </div>
    </div>
</template>

<script>
// import tapTop from '@/components/tap-top'
// import homeSplash from '@/views/homeViews/home-splash'

export default {
    name: 'App',
    components: {
        // homeSplash,
        // tapTop,
    },
    data() {
        return {
            originInfo: null,
            originCnt: 0,
            originDetailListLength: 0,
            menuList: null,
            menuInfo: null,
            mainOriginList: null,
            mainOriginDetailList: null,
            tempList: [],
            shopInfo: null,
            companyCode: null,
            companyInfo: {},
            productCode: '',
            onIntro: true,
            onLoading: true,
            onSplash: false,
            onGuide: true,
            onScreen: false,
            ajaxCnt: 0,
            hideCategory: false,
        }
    },
}
</script>

<style>
/* #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
} */
</style>
