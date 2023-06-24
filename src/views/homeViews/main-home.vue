<!-- /* 
    230511 추가 메인 홈페이지
    
    자식 컴포넌트
    - diningSlide
    - originSlide
*/ -->
<template>
    <div class="main-wrap">
        <!-- 다이닝메뉴 -->
        <diningSlide :menuInfo="menuInfo" :menuList="menuList" :shopInfo="shopInfo" />

        <!-- 주 원재료 -->
        <originSlide
            :mainOriginList="mainOriginList"
            :shopInfo="shopInfo"
            :mainOriginDetailList="mainOriginDetailList"
        />

        <!-- 리뷰 -->
        <div class="review-wrap part-wrap">
            <div class="reviewCom" @click="goReview">
                <div class="reviewContet">
                    <h6 class="reviewComTitle">{{ shopInfo?.companyName }} {{ shopInfo?.branchName }}</h6>
                    <h1>리뷰보기</h1>
                </div>
                <div class="reviewBtn">
                    <img src="/img/mainHome/reviewIcon.png" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { changeImgUrl } from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'
import diningSlide from '@/components/mainHome/dining-slide'
import originSlide from '@/components/mainHome/origin-slide'

export default {
    props: ['menuList', 'mainOriginList', 'menuInfo', 'shopInfo', 'mainOriginDetailList'],
    data() {
        return {
            foodList: [],
            categoryList: [],
            originList: [],
            companyCode: null,
            searchKey: null,
        }
    },
    component: {
        diningSlide,
        originSlide,
    },
    computed: {},
    created() {
        this.companyCode = this.$route.query.companyCode
        this.searchKey = `searchWords_${this.companyCode}`
        this.searchedWords = localStorage.getItem(this.searchKey)
            ? JSON.parse(localStorage.getItem(this.searchKey))
            : []
    },
    mounted() {
        // document.querySelector('header').classList.add('fixed_noshadow');

        this.$emit('setTrigger', '/home')
    },

    methods: {
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // /origin path 로 이동
        goMenuOrigin(menuCode) {
            this.$router
                .push({
                    path: '/origin',
                    name: 'origin',
                    query: {
                        companyCode: this.$route.query.companyCode,
                        menuCode: menuCode,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
        goOrigin(productCode) {
            this.$router
                .push({
                    path: '/origin',
                    name: 'origin',
                    query: {
                        companyCode: this.$route.query.companyCode,
                        productCode: productCode,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
            console.log(`productCode=${productCode}`)
            // console.log(`idx=${idx}`);
        },
        // /menu path 로 이동
        goMenu(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/menu' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
        goReview(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/review' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
