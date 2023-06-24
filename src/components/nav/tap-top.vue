<template>
    <header>
        <div class="inner_container">
            <div class="menu_wrap" @click="goMenu()">
                <div class="menu_icon_box">
                    <span class="menu_icon"></span>
                </div>
                <span class="menu_text">다이닝 메뉴</span>
            </div>
            <div class="logo_wrap">
                <a @click="goHome()">
                    <img src="@img/header_logo.png" alt="Safeean" />
                </a>
            </div>
            <div class="my_wrap header_my">
                <img src="@img/nav_bar_icon/nav_my_on.svg" alt="myPage" @click="goMypage()" />
            </div>
        </div>
        <!--검색버튼 클릭시 노출 메뉴-->
        <div class="search_menu">
            <div class="search_menu_wrap">
                <div class="inner_search_menu">
                    <div class="close_area">
                        <img src="@img/modal_close_btn.png" alt="" />
                    </div>
                    <div class="search_area">
                        <input
                            type="text"
                            class="search_input"
                            @input="updateInput"
                            @keyup.enter="goSearch()"
                        />
                        <button value="검색" class="search_btn aside_search_btn" @click="goSearch()">
                            <img src="@img/search_icon.png" alt="" />
                        </button>
                    </div>
                    <div class="latest_search">
                        <ul class="latest_search_list">
                            <template v-for="(word, idx) in searchedWords" :key="idx">
                                <li>
                                    <a class="latest_search_item">
                                        <span class="latest_search_title" @click="goSearch('', word)">{{
                                            word
                                        }}</span>
                                        <em class="delete" @click="removeSearchWord(idx)">⨉</em>
                                    </a>
                                </li>
                            </template>
                        </ul>
                    </div>
                    <div class="about_menu_wrap">
                        <ul>
                            <li>
                                <h3 class="about_menu_title">다이닝 소개</h3>
                                <p class="about_menu_sub">
                                    <a @click="goLink('/restaurant')">
                                        - {{ shopInfo?.companyName }}
                                        <span class="text_sm">{{
                                            shopInfo?.branchName ? '[' + shopInfo?.branchName + ']' : ''
                                        }}</span>
                                    </a>
                                </p>
                            </li>
                            <li v-if="shopInfo?.shopInfo?.ceoInfo && shopInfo?.shopInfo?.ceoInfo.name">
                                <h3 class="about_menu_title">
                                    <a @click="goLink('/ceo', shopInfo?.shopInfo?.ceoInfo)"> 대표님 소개 </a>
                                </h3>
                            </li>
                            <li v-if="shopInfo?.shopInfo?.bossInfo && shopInfo?.shopInfo?.bossInfo.name">
                                <h3 class="about_menu_title">
                                    <a @click="goLink('/boss', shopInfo?.shopInfo?.bossInfo)">
                                        점주님 소개
                                    </a>
                                </h3>
                            </li>
                            <li v-if="shopInfo?.chefInfo">
                                <h3 class="about_menu_title">셰프님 소개</h3>
                                <p class="about_menu_sub">
                                    <a @click="goLink('/chef')"> - 메인 셰프 </a>
                                </p>
                            </li>
                        </ul>
                    </div>
                    <div class="search_menu_bottom">
                        <div class="logo_wrap">
                            <a @click="goHome()" target="_blank">
                                <img src="@img/header_logo.png" alt="Safeean" />
                            </a>
                        </div>
                        <ul class="sns_link">
                            <li><a href="https://shop2.safeean.com/" target="_blank">Shop</a></li>
                            <li>
                                <a href="https://www.instagram.com/vadaro_safeean/" target="_blank">SNS</a>
                            </li>
                            <li><a href="https://blog.naver.com/vadapf" target="_blank">Blog</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </header>
    <!-- <p class="about_menu_sub">
        <a @click="goLink('/ceo', shopInfo?.shopInfo?.ceoInfo)">
            - 메인 셰프
        </a>
    </p> -->
</template>

<script>
import { saveSearchWord, removeSearchWord, scrollOn, scrollOff, getCookie } from '@/utils/function.js'

export default {
    props: ['menuList', 'shopInfo'],
    data() {
        return {
            onMenu: true,
            onSearch: true,
            searchWord: '',
            searchedWords: [],
            companyCode: null,
            searchKey: null,
            header_search_icon: false,
        }
    },
    computed: {
        // TODO : 서치기능 리펙토링
        // searchedWords() {
        //     return this.searchedWords;
        // },
    },
    created() {
        this.companyCode = this.$route.query.companyCode

        this.searchKey = `searchWords_${this.companyCode}`
        this.searchedWords = localStorage.getItem(this.searchKey)
            ? JSON.parse(localStorage.getItem(this.searchKey))
            : []
    },

    mounted() {
        // 텝 메뉴 버튼
        let menuBtn = document.querySelector('.menu_wrap')
        let mainMenu = document.querySelector('.main_menu')
        let searchMenu = document.querySelector('.search_menu')
        let headerSearchBtn = document.querySelector('.header_search')
        let asideSearchBtn = document.querySelector('.aside_search_btn')
        let searchMenuClose = document.querySelector('.search_menu .close_area')
        let header = document.querySelector('header')

        /*헤더 검색버튼 클릭 시 노출 메뉴*/
        // 주석처리 YJ230412
        // headerSearchBtn.addEventListener('click', function () {
        //     searchMenu.classList.add('active');
        //     scrollOff();
        // });

        // searchMenuClose.addEventListener('click', function () {
        //     searchMenu.classList.remove('active');
        //     scrollOn();
        // });

        // searchMenu.addEventListener('click', (e) => {
        //     const evTarget = e.target;

        //     if (evTarget.classList.contains('active')) {
        //         searchMenu.classList.remove('active');
        //         scrollOn();
        //     }
        // });

        /* 주석 처리 JHJUN20230226 */
        // body.addEventListener('click', (e) => {
        //     console.log('e.target', e.target);
        //     console.log('e.current', e.currentTarget);
        //     console.log('e.related', e.relatedTarget);
        //     // console.log(e.target.classList);

        //     console.log(e.target.classList.contains('search_menu'));
        // });

        // /*검색 메뉴의 검색버튼 클릭 시 검색 스크린 노출*/
        // asideSearchBtn.addEventListener('click', function () {
        //     location.href = '/search_screen.html';
        // })

        const input = document.querySelector('.search_input')

        input.addEventListener('focus', function (e) {
            // console.log('input ser');
            // e.preventDefault();
            var scrollY = window.pageYOffset
            window.scrollTo(0, scrollY)
            // window.scrollBy(0, 0);
            // input.scrollIntoView();
        })

        /* 주석 처리 JHJUN20230226 */
        // document.addEventListener('focusin', function (e) {
        //     if (e.target.tagName === 'INPUT') {
        //         e.target.scrollIntoView();
        //     }
        // });

        /*header높이만큼 스크롤 될 경우 scrolldown animation hide*/
        const headerHeight = header.getBoundingClientRect().height

        document.addEventListener('scroll', () => {
            if (document.querySelector('.scroll_down')) {
                if (window.scrollY > headerHeight / 1.8) {
                    document.querySelector('.scroll_down').style.display = 'none'
                    // header.classList.add('fixed');
                } else {
                    document.querySelector('.scroll_down').style.display = 'flex'
                    // header.classList.remove('fixed');
                }
            }
        })
    },

    methods: {
        // input 박스 입력 데이터, search word 로 업데이트
        updateInput(e) {
            this.searchWord = e.target.value
        },
        // 최근 검색어 저장
        saveSearchWord(searchWord) {
            return saveSearchWord(searchWord, this.companyCode)
        },
        // 선택된 최근 검색어 삭제
        removeSearchWord(idx) {
            this.searchedWords = removeSearchWord(idx, this.companyCode)
        },
        // localStorage에서의 최근 검색어 업데이트
        updateRecentSearch() {
            let searchWords = localStorage.getItem(this.searchKey) || '[]'
            searchWords = JSON.parse(searchWords)

            this.searchedWords = searchWords
        },
        // / path 로 home으로 이동
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch((error) => {
                    // console.error(error);
                })
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
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
        // /login path로 이동
        goMypage(companyCode) {
            const tk = getCookie('token')

            let code = companyCode || this.$route.query.companyCode
            let path = code ? (tk ? '/mypage' : '/login') : '/error'

            console.log('path', path)

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch((error) => {
                    console.error(error)
                })
        },
        // /search path 로 이동
        goSearch(companyCode, searchWord) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/search' : '/error'

            searchWord = searchWord || this.searchWord

            if (searchWord.trim().length > 0) {
                this.searchedWords = this.saveSearchWord(searchWord)
            }

            // document.querySelector('.search_menu .close_area').click();
            document.querySelector('.search_input').value = ''
            this.searchWord = ''

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        searchWord: searchWord,
                        l: this.$route.query.l,
                        // meta: { transition: "slide" },
                    },
                })
                .then(() => {
                    // document.body.scrollTop =
                    //     document.documentElement.scrollTop = 0;
                })
                .catch((error) => {
                    console.error(error)
                })
        },

        // path 인자에 따른 경로로 이동.
        goLink(path, data) {
            let code = this.$route.query.companyCode
            this.$router
                .push({
                    path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch((e) => {
                    // console.log(e);
                })
        },
    },
}
</script>

<style></style>
