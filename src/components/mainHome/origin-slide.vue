<!-- 
230511 추가 메인 홈페이지

자식 컴포넌트
- diningSlide
- originSlide -->
<template>
    <!-- 주 원재료 -->
    <div class="origin-wrap part-wrap">
        <div class="main-title">
            <h3>주 원재료</h3>
            <div class="paginationBtn">
                <button class="origin-left left"></button>
                <button class="origin-right right"></button>
            </div>
        </div>
        <div id="origin">
            <div class="swiper-wrapper origin-wrapper">
                <!-- Slides -->
                <div
                    v-for="(item, idx) in getRandomDiningItems(5)"
                    :key="idx"
                    class="origin swiper-slide"
                    @click="goOrigin(item.productCode)"
                >
                    <img class="origin slide-img" :src="changeImgUrl(item.productImage)" />
                    <p class="slide-title">{{ item.productName }}</p>
                </div>
                <div class="swiper-slide addBtn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { changeImgUrl } from '@/utils/function.js'
// import { _xurl } from '#/localSettings.js'

export default {
    props: ['menuList', 'mainOriginList', 'menuInfo', 'shopInfo', 'mainOriginDetailList'],
    data() {
        return {
            foodList: [],
            categoryList: [],
            originList: [],
            companyCode: null,
            searchKey: null,
            swiperOrigin: null,
        }
    },
    component: {},
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

        // this.$emit("setTrigger", "/home");

        // 주 원재료
        const originSwiper = new Swiper('#origin', {
            direction: 'horizontal',
            loop: false,
            spaceBetween: 20,
            slidesPerView: 2,
            navigation: {
                nextEl: '.origin-right',
                prevEl: '.origin-left',
            },
            breakpoints: {
                // Galaxy Fold( secreen width >= 280px)
                280: {
                    slidesPerView: 1.4,
                    spaceBetween: 10,
                },
                // iPhoneSe2 (screen width >= 320px)
                320: {
                    slidesPerView: 1.7,
                    spaceBetween: 15,
                },
                360: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                },
                450: {
                    slidesPerView: 2.4,
                    spaceBetween: 20,
                },
            },
        })
    },
    methods: {
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // /origin path 로 이동
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
        // 230516 랜덤 함수 추가
        // 주원재료
        getRandomDiningItems(count, idx) {
            const shuffleList = this.shuffleArray(this.mainOriginDetailList)

            return shuffleList.slice(0, count, idx)
        },
        shuffleArray(array) {
            const shuffledArray = [...array]
            for (let i = shuffledArray.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1))
                ;[shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]
            }
            return shuffledArray
        },
    },
}
</script>

<style></style>
