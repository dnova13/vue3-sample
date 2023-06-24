<template>
    <div class="sub_content search_screen">
        <div class="inner_container">
            <!-- 검색창 -->
            <div class="search_area">
                <!--
                        <input type="text" class="search_input search_screen_input"
                            @click="searchInputClickEvent"
                            @keyup.enter="search"
                            :value="searchWord" 
                            v-on:input="updateInput"
                        >
                    -->
                <input
                    type="text"
                    class="search_input search_screen_input"
                    :value="searchWord"
                    @click="searchInputClickEvent"
                    @keyup.enter="search"
                    @input="$emit('input-change', $event.target.value)"
                />
                <!-- @input="updateInput" -->
                <button value="검색" class="search_btn" @click="search">
                    <img src="@img/search_icon.png" alt="" />
                </button>
            </div>
            <!-- 로그 -->
            <div class="latest_search">
                <ul class="latest_search_list">
                    <template v-for="(word, idx) in searchedWords" :key="idx">
                        <li>
                            <a class="latest_search_item">
                                <span class="latest_search_title" @click="pasteKeword(word)"
                                    >{{ word }}
                                </span>
                                <em class="delete" @click="removeSearchWord(idx)">⨉</em>
                            </a>
                        </li>
                    </template>
                </ul>
            </div>
            <!-- 검색 결과 -->
            <div v-for="(item, idx) in searchMenu" :key="idx" class="sesarch_contained_menu">
                <h4 class="contained_menu_title">{{ getOnlyMenuName(item.menuName) }}</h4>
                <div class="contained_menu_img_wrap" @click="goOrigin(item.menuCode)">
                    <img :src="changeImgUrl(item.menuImage3 ? item.menuImage3 : item.menuImage1)" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { saveSearchWord, removeSearchWord, callAjax, changeImgUrl } from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

// ajax url 설정
const xurl = _xurl
let urlSerach = xurl.search

export default {
    // <div style = "position:fixed;"></div>
    props: ['menuList'],
    data() {
        return {
            companyInfo: null,
            savedSearchWords: null,
            companyCode: null,
            searchWord: '',
            menu: [],
            searchedWords: [],
            searchList: [],
        }
    },
    computed: {
        searchMenu() {
            // 프론트에서 검색용
            // todo: 230427 메뉴창 + 검색창 합치는 중 UpperCase에러 때문에 주석처리
            let searchWord = this.searchWord
            if (!searchWord) return []

            let searchWordArr = this.searchWord.toUpperCase().split(/\s+/)
            let searchMenu = this.menu.filter((item) => {
                let andSearch = true

                searchWordArr.forEach((word) => {
                    andSearch = andSearch && item.menuName.toUpperCase().includes(word)
                })
                return andSearch
            })

            // TODO : search API를 통한 검색 기능. watch 기능 이용
            // console.log('!!!!!!!!!!!!!!!!!!!!!');
            // console.log(this.searchWord);

            // let queryStrings = {
            //     companyCode: this.companyCode,
            //     search: this.searchWord,
            // };

            // callAjax(urlSerach, queryStrings, this, this.getData, this.isError);

            return searchMenu
        },
    },
    created() {
        this.menu = this.menuList
        this.companyCode = this.$route.query.companyCode
        this.searchWord = this.$route.query.searchWord

        const searchKey = `searchWords_${this.companyCode}`
        this.searchedWords = localStorage.getItem(searchKey)
            ? JSON.parse(localStorage.getItem(searchKey))
            : []
    },
    mounted() {},
    methods: {
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // ajax call 후 데이터 얻기
        getData(data, param, url) {
            console.log(data.result)
            this.searchList = data.result
        },
        // 검색 동작
        search(e) {
            if (this.searchWord.trim().length > 0) {
                this.searchedWords = this.saveSearchWord(this.searchWord)
            }
        },
        // 최근 검색어 클릭시 데이터 불러오는 동작
        pasteKeword(keyword) {
            this.searchWord = keyword

            let queryStrings = {
                companyCode: this.companyCode,
                search: this.searchWord,
            }

            callAjax(urlSerach, queryStrings, this, this.getData, this.isError)
        },
        // input 박스 입력 데이터, search word 로 업데이트
        updateInput(e) {
            this.searchWord = e.target.value
            // console.log(this.searchWord);
        },
        // 최근 검색어 저장
        saveSearchWord(searchWord) {
            return saveSearchWord(searchWord, this.companyCode)
        },
        // 최근 검색어 제거
        removeSearchWord(idx) {
            this.searchedWords = removeSearchWord(idx, this.companyCode)
        },
        // input 박스에서 enter 동작시 event
        searchInputClickEvent() {
            document.querySelector('.search_menu .close_area').click()
        },
        // /origin path 로 이동
        goOrigin(meunuCode) {
            this.$router
                .push({
                    path: '/origin',
                    name: 'origin',
                    query: {
                        companyCode: this.$route.query.companyCode,
                        menuCode: meunuCode,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
