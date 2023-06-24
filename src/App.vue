<template>
    <div id="wrapper" @click="onClickOutside">
        <div class="wrapper_inner">
            <home-splash
                v-if="onIntro"
                :on-splash="onSplash"
                :on-guide="onGuide"
                :shop-info="shopInfo"
            ></home-splash>
            <tap-top :menu-list="menuList" :shop-info="shopInfo" @setTrigger="setTrigger"></tap-top>
            <!-- <transition name="fade"> -->
            <router-view
                v-if="onScreen"
                :menu-list="menuList"
                :menu-info="menuInfo"
                :shop-info="shopInfo"
                :main-origin-list="mainOriginList"
                @setTrigger="setTrigger"
            >
            </router-view>
            <!-- </transition> -->
            <mainNav
                ref="mainNav"
                :shop-info="shopInfo"
                :hide-category="hideCategory"
                @setTrigger="setTrigger"
                @hide-category="hideCategory = $event"
            />
        </div>
    </div>
</template>

<script>
import {
    callAjax,
    getQueryStringObject,
    isJsonString,
    scrollOn,
    scrollOff,
    ajaxFetchQuery,
} from '@/utils/function.js'

// JHJUN20221219 localSetting.js 에서 backend URL정보 import한게 셋팅하도록 변경.
import { _xurl, authKey } from '#/localSettings.js'

import tapTop from '@/components/nav/tap-top'
import mainNav from '@/components/nav/main-nav'
import homeSplash from '@/views/homeViews/home-splash'
import mainHome from '@/views/homeViews/main-home'

// ajax url 설정
const xurl = _xurl

let urlMenuList = xurl.menu
let urlMainOrigin = xurl.mainOrigin
let urlShopInfo = xurl.shop
// 230522 YJ-SEOL
let urlOrigin = _xurl.origin

export default {
    name: 'App',
    components: {
        tapTop,
        homeSplash,
        mainNav,
        // mainHome,
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
    computed: {
        //플로트 버튼 출력
        // isFloat() {
        //     return this.onHome || this.onNav;
        // },
    },
    created() {
        const queryStrings = getQueryStringObject() //for real server
        this.companyCode = queryStrings.companyCode

        const companyCode = localStorage.getItem('ccode')

        if (companyCode) {
            queryStrings.companyCode = companyCode
            localStorage.removeItem('ccode')
        }

        console.log('queryStrings', queryStrings)

        // urlMenuList = urlMenuList.replace('companyCode', queryStrings.companyCode);
        callAjax(urlMenuList, queryStrings, this, this.getData, this.isError)
        callAjax(urlMainOrigin, queryStrings, this, this.getData, this.isError)
        callAjax(urlShopInfo, queryStrings, this, this.getData, this.isError)
    },
    mounted() {
        let authCode = this.$route.query.code
        // this.getKakaoLoginInfo(authCode);

        // todo 230612
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent
        )

        if (!isMobile) {
            return // 웹에서는 이벤트를 무시하고 함수를 종료
        }

        const mainNav = document.querySelector('#mainNav')
        const inputElements = document.querySelectorAll('input, textarea')

        window.addEventListener('focusin', (event) => {
            const target = event.target

            if (mainNav && !mainNav.contains(target)) {
                mainNav.style.opacity = '0'
            }

            // 입력 요소에 포커스가 생겼을 때 mainNav를 숨김
            if (inputElements && Array.from(inputElements).includes(target)) {
                mainNav.style.opacity = '0'
            }
        })
        window.addEventListener('focusout', () => {
            if (mainNav) {
                mainNav.style.opacity = '1'
            }
        })

        // 키보드 입력기의 "완료" 버튼을 누를 때 blur 이벤트 추가
        window.addEventListener('blur', () => {
            if (mainNav) {
                mainNav.style.opacity = '1'
            }
        })
        window.addEventListener('keydown', () => {
            if (mainNav) {
                mainNav.style.opacity = '0'
            }
        })
    },
    methods: {
        // ajax 에서 불러오 데이터 저장
        getData(data, param, url) {
            this.ajaxCnt++
            // console.log('AAAAAAAAAAAA', this.ajaxCnt, this.onScreen)

            if (url === urlMenuList) {
                this.getMenuList(data)
            } else if (url === urlMainOrigin) {
                this.getMainOriginInfo(data)
            } else if (url === urlShopInfo) {
                this.getShopInfo(data)
            }

            if (this.menuList && this.mainOriginList && this.shopInfo) {
                this.onScreen = true
                this.onIntro = true

                /* todo 나중에 주석 */
                this.onIntro = false
                this.goHome(param.companyCode)
            } else {
                this.onScreen = false
            }

            if (this.ajaxCnt === 3 && !this.onScreen) {
                this.onIntro = false
                this.onScreen = true

                this.goLink('/404')
            }
        },
        // 에러 체크
        isError() {
            // console.log('isErr');
            // this.onScreen = true;
            return false
        },
        // get menulist from ajax
        getMenuList(data) {
            this.menuList = data?.menuArray
            this.menuInfo = data?.menuInfo

            return true
        },
        // get Main OriginInfo from ajax
        getMainOriginInfo(data) {
            this.mainOriginList = data?.productMain

            // mainOriginDetailList 뽑기
            // this.getMainOriginDetailList(this.mainOriginList);

            return true
        },
        // TODO : 성능 문제로 주석처리
        // get Main originDeatial list
        /*  getMainOriginDetailList(mainOriginList) {
            // console.log(this.mainOriginList, 'DDDDDDDDDDDDDDDDDDDDD');
            let productCodeArr = [];

            productCodeArr = mainOriginList.map((obj) => obj.productCode);

            this.originDetailListLength = productCodeArr.length;
            // 주 원재료 상세 리스트 세션 캐시에서 가져오기
            let cachedOriginList = this.getCacheOriginData(this.companyCode, 'main');

            if (cachedOriginList) {
                this.mainOriginDetailList = cachedOriginList;
                return;
            }

            productCodeArr.forEach((item, idx) => {
                let productObj = { productCode: item };
                callAjax(urlOrigin, productObj, this, this.getProductData, this.isError, idx);

                this.originIdx = idx;
            });
        }, */
        // ajax 에서의 데이터 가져옴
        getProductData(data, param, url, idx) {
            this.tempList[idx] = data
            this.originCnt++

            if (this.originCnt === this.originDetailListLength) {
                this.mainOriginDetailList = [...this.tempList]

                // console.log(this.companyCode);
                this.setCacheOriginData(this.companyCode, 'main', this.mainOriginDetailList)

                // this.checkPoint = this.originList[0].summaries;
                // console.log('DFDSFDS', this.mainOriginDetailList);
            }
        },
        // JHJUN 20230522 원산지 데이터 세션스토리지 통한 캐시 셋팅
        setCacheOriginData(companyCode, menuCode, _data) {
            sessionStorage.setItem(companyCode + menuCode, JSON.stringify(_data))
        },
        // JHJUN 20230522 세션스토리지에서 캐시 데이터 가져옴.
        getCacheOriginData(companyCode, menuCode) {
            let cachedOriginList = sessionStorage.getItem(companyCode + menuCode)

            try {
                cachedOriginList = JSON.parse(cachedOriginList)
            } catch (error) {
                cachedOriginList = null
            }

            return cachedOriginList
        },
        // get shop Info from ajax
        getShopInfo(data) {
            if (!data || data.shopInfo.length < 1) return

            this.shopInfo = data.shopInfo[0]

            let shopNameArr = this.shopInfo.bizname.split('-')

            this.shopInfo.companyName = shopNameArr[0].trim()
            this.shopInfo.branchName = shopNameArr.length > 1 ? shopNameArr[1].trim() : null

            this.shopInfo.chefImage = isJsonString(this.shopInfo.chefImage)
                ? JSON.parse(this.shopInfo.chefImage)
                : this.shopInfo.chefImage
            this.shopInfo.chefInfo = isJsonString(this.shopInfo.chefInfo)
                ? JSON.parse(this.shopInfo.chefInfo)
                : this.shopInfo.chefInfo

            this.shopInfo.shopImage = isJsonString(this.shopInfo.shopImage)
                ? JSON.parse(this.shopInfo.shopImage)
                : this.shopInfo.chefImage
            this.shopInfo.shopInfo = isJsonString(this.shopInfo.shopInfo)
                ? JSON.parse(this.shopInfo.shopInfo)
                : this.shopInfo.shopInfo

            return true
        },
        // router path 경로로 이동
        goRouterPath(companyCode) {
            let code = companyCode
            let path = code ? this.$route.path : '/error'
            let query = !this.$route.query.companyCode
                ? { companyCode: code, l: this.$route.query.l }
                : this.$route.query

            this.$router
                .push({
                    path: path,
                    query: query,
                })
                .catch(() => {})

            this.onLoading = true
            this.onSplash = true
            this.onGuide = true
        },
        // home(/) path 로 이동
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/' : '/error'

            // let exceptionList = ['/login', '/callback'];

            if (this.$route.path === '/login' || this.$route.path.includes('/callback/')) {
                path = this.$route.path

                this.onIntro = false
            }

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})

            this.onLoading = true
            this.onSplash = true
            this.onGuide = true
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

            this.onLoading = false
        },
        // /search path 로 이동
        goSearch(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/search' : '/error'

            this.$router.push({
                path: path,
                query: {
                    companyCode: code,
                    l: this.$route.query.l,
                },
            })

            this.onLoading = false
        },

        // path 인자에 따른 경로로 이동.
        goLink(path) {
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

            this.onLoading = false
        },
        // /error path 경로로 이동
        goErorr() {
            this.$router
                .push({
                    path: '/error',
                })
                .catch((e) => {
                    // console.log(e);
                })

            this.onLoading = false
        },
        // vue trigger 셋팅
        setTrigger(triggerType) {
            // 맨처음 스플래시 화면 제외한 서치메뉴 닫기 동작

            // this.resetScrollPosition();
            const splashElement = document.querySelector('.splash')
            document.querySelector('header').classList.add('fixed_noshadow')

            if (splashElement && splashElement.classList.contains('fadeOut'))
                document.querySelector('.search_menu .close_area').click()

            switch (triggerType) {
                case '/menu':
                    this.boldMenuBtn()
                    this.hideScrollDown()

                    break
                case '/base':
                    this.blurMenuBtn()
                    this.showMyBtn()
                    this.showScrollDown()
                    // this.scrollDown();
                    // this.showSearchBtn();

                    // origin
                    if (splashElement?.classList.contains('fadeOut')) scrollOn()

                    // if (splashElement && splashElement.classList.contains('fade')) {
                    //     scrollOn();
                    // }

                    break

                /* case '/home':
                    // this.blurMenuBtn();
                    this.showMyBtn();
                    this.hideScrollDown();
                    this.showMenuBtn();

                    // scrollOff();

                    break; */

                case '/origin':
                    this.blurMenuBtn()
                    // this.showSearchBtn();
                    this.showMyBtn()
                    this.showScrollDown()

                    scrollOn()

                    break

                // YJSEOL 230414 추가
                case '/search':
                    this.blurMenuBtn()
                    // this.hideSearchBtn();
                    this.hideMyBtn()
                    this.hideScrollDown()
                    break

                // 230421 yj추가
                case '/login':
                case '/join':
                    this.blurMenuBtn()
                    // this.showSearchBtn();
                    this.hideMyBtn()
                    this.hideScrollDown()

                    break
                // 230526 YJSEOL 추가
                case '/mypage':
                    this.hideScrollDown()
                    this.showMenuBtn()
                    this.showMyBtn()
                    scrollOn()

                    break
                /* 
                YJ SEOL 230503 상단 중복코드로 주석처리
                case "/menu":
                case "/search":
                    // this.hideMainNavAddMenu();
                    this.hideMyBtn();

                    break;
                */
                // 230608 YJSEOL 추가
                case '/diningMap':
                    this.hideScrollDown()
                    scrollOff()

                    break

                case '/review':
                    this.hideScrollDown()

                    break

                case '/loading':
                    scrollOff()
                    this.hideScrollDown()
                    this.hideMenuBtn()

                    break

                case '/404':
                case '/error':
                    this.hideMenuBtn()
                    // this.hideSearchBtn();
                    this.hideMyBtn()
                    this.addFadeOut()
                    this.hideMainNav()
                    this.hideScrollDown()
                    break

                default:
                    // this.blurMenuBtn();
                    // this.showSearchBtn();
                    this.showMyBtn()
                    this.hideScrollDown()
                    this.showMenuBtn()

                    scrollOn()
                    break
            }

            /* // 뒤로가기 버튼 클릭 시 메인 네비게이션 고정
			if (window.history && window.history.pushState) {
				window.addEventListener("popstate", () => {
					const path = window.location.pathname;
					if (path === "/menu" || path === "/home") {
						this.showMenuBtn();
					} else {
						this.hideMenuBtn();
					}
				});
			}
			*/
        },
        // 메뉴 버튼 굵게 변경
        boldMenuBtn() {
            document.querySelector('.menu_wrap').classList.add('active')
        },
        // 메뉴 버튼 블러로 변경
        blurMenuBtn() {
            document.querySelector('.menu_wrap').classList.remove('active')
        },
        // 메뉴 버튼 보이게
        showMenuBtn() {
            document.querySelector('.menu_wrap').style.opacity = '1'
            document.querySelector('.menu_wrap').style.visibility = 'visible'
        },
        // 메뉴 버튼 숨김
        hideMenuBtn() {
            document.querySelector('.menu_wrap').style.opacity = '0'
            document.querySelector('.menu_wrap').style.visibility = 'hidden'
        },
        // 검색 버튼 보이게
        showSearchBtn() {
            document.querySelector('.header_search').style.opacity = '1'
            document.querySelector('.header_search').style.visibility = 'visible'
        },
        // 검색 버튼 숨김
        hideSearchBtn() {
            document.querySelector('.header_search').style.opacity = '0'
            document.querySelector('.header_search').style.visibility = 'hidden'
        },
        // my 버튼 보이게
        showMyBtn() {
            document.querySelector('.header_my').style.opacity = '1'
            document.querySelector('.header_my').style.visibility = 'visible'
        },
        // my 버튼 숨김
        hideMyBtn() {
            document.querySelector('.header_my').style.opacity = '0'
            document.querySelector('.header_my').style.visibility = 'hidden'
        },

        // 메인 네비게이션 더보기메뉴 숨김
        hideMainNavAddMenu() {
            document.querySelector('.mainNav-wrap').classList.remove('mainNav-tabs-show')
            document.querySelector('.mainNav-wrap').classList.add('mainNav-tabs-hide')
        },
        // YJSEOL 230502 error Page .fadeOut 추가
        addFadeOut() {
            document.querySelector('.splash')?.classList.add('fadeOut')
        },
        // YJSEOL 230502 error Page #mainNav 숨김
        hideMainNav() {
            document.querySelector('#mainNav').style.display = 'none'
        },
        // YJ SEOL 230503 scrollDown
        showScrollDown() {
            document.querySelector('.scroll_down').style.opacity = '0.5'
            document.querySelector('.scroll_down').style.visibility = 'visible'
        },
        hideScrollDown() {
            document.querySelector('.scroll_down').style.opacity = '0'
            document.querySelector('.scroll_down').style.visibility = 'hidden'
        },

        // 스크롤 위치 리셋
        resetScrollPosition() {
            const el = this.$el.querySelector('.scroll-container')

            // console.log(el);
            if (el) {
                el.scrollTop = 0
            } else {
                window.scroll(0, -100)
            }
        },
        // mainNav 영역 외의 터치 또는 클릭 이벤트 발생 시 메뉴 숨김
        onClickOutside(e) {
            if (!this.$refs.mainNav.$el.contains(e.target)) {
                // console.log('화면클릭');
                this.$refs.mainNav.hideCategory = false
            }
        },
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
<style scoped>
/* 페이지 페이드 전환효과 */
.fade-enter-active,
.fade-leave-active {
    transition: opacity 1s ease-in-out;
}

.fade-enter,
.fade-enter-to,
.fade-leave,
.fade-leave-to {
    opacity: 0;
    display: block;
}
</style>
