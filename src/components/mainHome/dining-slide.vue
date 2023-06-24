<!-- 230511 추가 메인 홈페이지 -->
<template>
    <!-- 다이닝메뉴 -->
    <div class="dining-wrap part-wrap">
        <div class="main-title">
            <h3>다이닝메뉴</h3>
            <div class="paginationBtn">
                <button class="dining-left left"></button>
                <button class="dining-right right"></button>
            </div>
        </div>
        <!-- 다이닝 메뉴 적용 -->
        <div class="mySwiper dining">
            <div class="swiper-wrapper dining-wrapper">
                <!-- Slides -->
                <div
                    v-for="(item, idx) in getRandomMenuItems(5)"
                    :key="idx"
                    class="swiper-slide dining-slide"
                    @click="goMenuOrigin(item.menuCode)"
                >
                    <img
                        class="slide-img"
                        :src="changeImgUrl(item.menuImage3 ? item.menuImage3 : item.menuImage1)"
                    />
                    <p class="slide-title">{{ getOnlyMenuName(item.menuName) }}</p>
                </div>
                <div class="swiper-slide addBtn" @click="goMenu()"></div>
            </div>
        </div>
    </div>
</template>

<script>
import { changeImgUrl } from '@/utils//function.js'
import { _xurl } from '#/localSettings.js'

export default {
    props: ['menuList', 'menuInfo', 'shopInfo'],
    data() {
        return {
            foodList: [],
            categoryList: [],
            originList: [],
            companyCode: null,
            searchKey: null,
        }
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

        // 다이닝 메뉴
        const swiper = new Swiper('.mySwiper', {
            direction: 'horizontal',
            loop: false,
            navigation: {
                nextEl: '.dining-right',
                prevEl: '.dining-left',
            },
            spaceBetween: 20,
            slidesPerView: 1.7,
            breakpoints: {
                // Galaxy Fold( secreen width >= 280px)
                280: {
                    slidesPerView: 1.2,
                    spaceBetween: 10,
                },
                // iPhoneSe2 (screen width >= 320px)
                320: {
                    slidesPerView: 1.3,
                    spaceBetween: 15,
                },
                360: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                },
                450: {
                    slidesPerView: 1.7,
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
        // 다이닝메뉴
        getRandomMenuItems(count) {
            if (!Array.isArray(this.menuList)) {
                return []
            }

            const shuffleList = this.shuffleArray(this.menuList)
            return shuffleList.slice(0, count)
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
