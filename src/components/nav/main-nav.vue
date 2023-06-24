<template>
    <transition name="slide" mode="in-out">
        <div id="mainNav" class="mainNav-container">
            <!-- <div id="mainNav">  -->
            <div class="scroll_down">
                <span></span>
                <span></span>
                <p class="scroll_down_text">scroll down</p>
            </div>
            <div id="mainNav-wrap">
                <ul class="mainNav-tabs">
                    <template v-for="(tab, idx) in tabs" :key="tab.id">
                        <li
                            v-if="
                                shopInfo &&
                                (shopInfo.shopInfo.chefInfo
                                    ? idx !== 1
                                    : shopInfo.shopInfo.bossInfo || shopInfo.shopInfo.ceoInfo
                                    ? idx !== 2
                                    : idx !== 1)
                            "
                            class="tab list"
                            :class="{ active: idx === activeTabIndex }"
                            @click="
                                tab.id === 'allCategory'
                                    ? (toggleCategory(), goToPage(tab.id, idx))
                                    : goToPage(tab.id, idx)
                            "
                        >
                            <div class="icon">
                                <img
                                    :src="baseUrl + tab.icon"
                                    :class="{ owner: idx === 1, map: idx === 4 }"
                                />
                            </div>
                            <div class="title">
                                <span>{{ tab.title }}</span>
                            </div>
                        </li>
                    </template>
                </ul>
                <!--
                    <div class="mainNav-tabs-hide" v-if="hideCategory">
                    -->
                <div class="mainNav-tabs-hide" :class="{ hide: !hideCategory }">
                    <li
                        v-for="(icon, idx) in icons"
                        :key="icon.id"
                        class="tab list"
                        :class="{ disabled: !icon.external && icon.url === $route.path }"
                        @click="goToPage(icon.id, idx)"
                    >
                        <router-link v-if="icon.external === false" :to="{ name: 'diningMap' }">
                            <a class="icon">
                                <img :src="baseUrl + icon.icon" />
                            </a>
                        </router-link>
                        <a v-else class="icon" :href="icon.url" target="_blank">
                            <img :src="baseUrl + icon.icon" />
                        </a>
                        <div class="title">
                            <span>{{ icon.title }}</span>
                        </div>
                    </li>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    props: ['shopInfo'],
    data() {
        return {
            baseUrl: process.env.VUE_APP_BASE_URL,
            hideCategory: false,
            // hideCategory: true,
            preHeight: null,
            companyCode: null,
            activeTabIndex: 2,
            selectedIcon: '',
            tabs: [
                {
                    id: 'dining-intro',
                    title: '다이닝소개',
                    icon: 'img/nav_bar_icon/nav_dining_intro_off.svg',
                },
                {
                    id: 'owner',
                    title: '점주소개',
                    icon: 'img/nav_bar_icon/nav_ceo_off.svg',
                },
                {
                    id: 'chef',
                    title: '셰프소개',
                    icon: 'img/nav_bar_icon/nav_chef_off.svg',
                },
                {
                    id: 'home',
                    title: 'HOME',
                    icon: 'img/nav_bar_icon/nav_home_icon_on.svg',
                },
                // {
                // 	id: "diningMap",
                // 	title: "다이닝맵",
                // 	icon: "img/nav_bar_icon/nav_map_off.svg",
                // },
                {
                    id: 'review',
                    title: '매장리뷰',
                    icon: 'img/nav_bar_icon/nav_review_off.svg',
                },
                {
                    id: 'allCategory',
                    title: '더보기',
                    icon: 'img/nav_bar_icon/nav_all_menu_off.svg',
                },
            ],
            icons: [
                // {
                // 	id: "diningMap",
                // 	external: false,
                // 	title: "다이닝맵",
                // 	icon: "./img/nav_bar_icon/nav_map_off.svg",
                // 	url: "/diningMap",
                // },
                {
                    id: 'safeean',
                    external: true,
                    title: '세이피안',
                    icon: 'img/allCategory/landing.svg',
                    url: 'http://www.safeean.com/',
                },
                {
                    id: 'shop',
                    external: true,
                    title: '안전식품몰',
                    icon: 'img/allCategory/shop.svg',
                    url: 'https://shop2.safeean.com/',
                },
                {
                    id: 'blog',
                    external: true,
                    title: '블로그',
                    icon: 'img/allCategory/blog.svg',
                    url: 'https://blog.naver.com/vadapf',
                },
                {
                    id: 'insta',
                    external: true,
                    title: '인스타',
                    icon: 'img/allCategory/instar.svg',
                    url: 'https://www.instagram.com/vadaro_safeean/',
                },
            ],
        }
    },
    computed: {},
    // TODO: 230504 mainNav heigth값 변화에 따라 scrollDown 클래스 위치 변경
    watch: {
        hideCategory() {
            const mainNavWrap = document.getElementById('mainNav-wrap')
            const scrollDown = document.querySelector('.scroll_down')

            if (this.hideCategory) {
                mainNavWrap.style.height = `${mainNavWrap.offsetHeight}px`
                setTimeout(() => {
                    mainNavWrap.style.height = '120px'
                    scrollDown.style.bottom = '120px'
                }, 0)
            } else {
                mainNavWrap.style.height = `58px`
                scrollDown.style.bottom = `56px`
            }
        },
    },
    created() {
        this.companyCode = this.$route.query.companyCode || null
        this.activeTabIndex = 2

        // console.log('this.$route.query.companyCode', this.$route.query.companyCode);
        // console.log('this.companyCode', this.companyCode);

        /*
        this.$watch('$route', () => {
            if (this.$route.path === '/menu' || this.$route.path === '/home' || this.$route.path === '/my') {
                this.hideCategory = false;
                this.activeTabIndex;
            }
        });
        */

        // this.preloadImages()
    },
    mounted() {
        // this.$emit('setTrigger', '/menu');
    },
    methods: {
        // 230524 YJ-SEOL 이미지 변경 속도 개선
        // 일단 사용 안하므로 주석처리 230625 JHJUN
        /* preloadImages() {
            const images = [
                'img/nav_bar_icon/nav_dining_intro_on.svg',
                'img/nav_bar_icon/nav_ceo_on.svg',
                'img/nav_bar_icon/nav_chef_on.svg',
                'img/nav_bar_icon/nav_home_icon_off.svg',
                'img/nav_bar_icon/nav_map_on.svg',
                'img/nav_bar_icon/nav_review_on.svg',
                'img/nav_bar_icon/nav_all_menu_on.svg',
            ]

            for (let i = 0; i < images.length; i++) {
                const image = new Image()
                image.src = images[i]
            }
        }, */
        goToPage(pageId, tabIndex) {
            const code = this.companyCode || this.$route.query.companyCode
            let path = ''
            // let consoleText = '';

            switch (pageId) {
                case 'dining-intro':
                    path = '/restaurant'
                    // consoleText = '다이닝 소개 클릭됨';
                    break
                case 'owner':
                    if (
                        this.shopInfo &&
                        this.shopInfo?.shopInfo?.ceoInfo &&
                        this.shopInfo?.shopInfo?.bossInfo == null
                    ) {
                        path = '/ceo'
                        // consoleText = 'CEO 클릭됨';
                    } else if (this.shopInfo && this.shopInfo?.shopInfo?.bossInfo) {
                        path = '/boss'
                        // consoleText = '사장님 클릭됨';
                    }
                    break
                case 'chef':
                    path = '/chef'
                    // consoleText = 'chef 클릭됨';
                    break
                case 'home':
                    path = '/home'
                    // consoleText = 'HOME 클릭됨';
                    this.hideCategory = false
                    break
                case 'diningMap':
                    path = '/diningMap'
                    // consoleText = 'diningMap 클릭됨';
                    break
                case 'review':
                    path = '/review'
                    // consoleText = 'review 클릭됨';
                    break

                case 'allCategory':
                    // consoleText = '더보기 클릭됨';
                    break
                case 'safeean':
                    // consoleText = 'safeean 클릭됨';
                    break
                case 'shop':
                    // consoleText = 'shop 클릭됨';
                    break
                case 'blog':
                    // consoleText = 'blog 클릭됨';
                    break
                case 'insta':
                    // consoleText = 'insta 클릭됨';
                    break

                default:
                    path = '/error'
                    // consoleText = 'Error';
                    this.activeTabIndex = 2
            }

            /*
                        console.log(consoleText);
                        console.log(`activeTabIndex변경 전: ${this.activeTabIndex}`);
                        console.log(`this.tabs[3].icon : ${this.tabs[3].icon}`);
            */
            // 탭아이콘 변경
            this.tabs.forEach((tab, index) => {
                if (index === tabIndex) {
                    tab.icon = this.selectedIcon || tab.icon.replace('_off', '_on')
                } else {
                    tab.icon = tab.icon.replace('_on', '_off')
                }
            })

            this.activeTabIndex = tabIndex

            // console.log('AAAAAAAAA', code);
            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})

            // 다이닝 맵 아이콘 변경
            // this.icons.forEach((icon, index) => {
            //     if (index === tabIndex) {
            //         icon.icon =
            //             this.selectedIcon || icon.icon.replace("_off", "_on");
            //     } else {
            //         icon.icon = icon.icon.replace("_on", "_off");
            //     }
            // });

            // 전체메뉴 확장
            // if (pageId === "/" && hideCategory == true) {
            //     console.log("더보기 누름")
            //     this.hideCategory = false;
            // }
        },
        toggleCategory() {
            this.hideCategory = !this.hideCategory
            this.$emit('hide-category')
        },
    },
}
</script>

<style></style>
