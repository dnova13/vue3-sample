<template>
    <!--전체메뉴-->
    <div class="main_menu">
        <!-- 검색창 -->
        <div class="search_container">
            <search :menuList="menuList" @input-change="onInputChange" />
            <div class="main_menu_wrap">
                <ul class="main_menu_list">
                    <template v-for="(item, idx) in menuList" :key="idx">
                        <li>
                            <a class="main_menu_link" @click="goOrigin(item.menuCode)">
                                <div class="img_wrap">
                                    <img :src="changeImgUrl(item.menuImage1)" :alt="item.menuName" />
                                </div>
                                <div class="text_wrap">
                                    <h6 class="main_menu_title">
                                        {{ getOnlyMenuName(item.menuName) }}
                                    </h6>
                                </div>
                            </a>
                        </li>
                    </template>
                    <li v-if="menuList.length % 2 == 1"></li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { changeImgUrl } from '@/utils/function.js'
import search from '@/components/dining/search'

export default {
    components: {
        search,
    },
    props: ['menuList'],
    data() {
        return {
            addr: '/origin',
            categoryList: [],
            companyInfo: [],
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            clickWork: true,
            mouseMoveCnt: 0,
        }
    },

    created() {
        // console.log(this.$route.query);
        // this.$emit('setTrigger', 'home');
        // if (this.$route.query.productCode) {
        //     this.goDetail(this.$route.query.productCode);
        // }
    },

    mounted() {
        // this.$emit("setTrigger", "/search");
        // 텝 메뉴 버튼
        let mainMenu = document.querySelector('.main_menu') // 전체 메뉴
        let menuBtn = document.querySelector('.menu_wrap') // 메뉴 버튼
        let searchMenu = document.querySelector('.search_menu')
        let headerSearchBtn = document.querySelector('.header_search')
        let asideSearchBtn = document.querySelector('.aside_search_btn')
        let searchMenuClose = document.querySelector('.search_menu .close_area')
        let header = document.querySelector('header')
        let html = document.querySelector('html')
        let body = document.querySelector('body')

        mainMenu.classList.add('active')
        // header.classList.add('fixed_noshadow');

        // document.querySelector('.menu_wrap').style.opacity = "0";
        // document.querySelector('.menu_wrap').style.visibility = "hidden";

        // headerSearchBtn.style.opacity = "1";
        // headerSearchBtn.style.visibility = "visible";
        // headerSearchBtn.style.pointerEvents = "auto";
    },
    methods: {
        // 메뉴 이름만 가져오는 함수
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        // 이미지 url 변경
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // /origin path 로 이동
        goOrigin(menuCode) {
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
        // 검색결과가 있거나 혹은 없을 때, menuList 숨기기
        onInputChange(value) {
            const menuWrap = document.querySelector('.main_menu_list')
            if (value.length > 0) {
                console.log('메뉴검색창입력')
                menuWrap.style.display = 'none'
            } else {
                menuWrap.style.display = 'flex'
            }
        },
    },
}
</script>

<style></style>
