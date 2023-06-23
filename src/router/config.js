// import { menu } from './views/menu.js'
// import search from './views/search-view.js'
// // import { search } from './components/search.js';
// import homeScreen from './views/home-screen.js'
// import mainHome from './views/mainHome.js'
// import originView from './views/origin-view.js'
// import relatedMenu from './views/related-menu.js'
// import chefIntro from './views/intro-chef.js'
// import personIntro from './views/intro-person.js'
// import restaruantIntro from './views/restaruant-intro.js'
// import diningMap from './views/diningMap.js'
// import myPageView from './views/myPage-view.js'
// import reviewView from './views/review-view.js'
// import myReview from './components/review/myReview.js'
// import ceoReview from './components/review/ceoReview.js'
// import addReview from './components/review/addReview.js'
// import notice from './components/myPage/notice.js'
// import event from './components/myPage/event.js'
// import policy from './components/myPage/policy.js'
// import point from './components/myPage/point.js'
// import setting from './components/myPage/setting.js'
// import personalSetting from './components/myPage/personalSetting.js'
// import privacy from './components/myPage/privacy.js'
// import porting from './components/myPage/porting.js'
// import cancellation from './components/myPage/cancellation.js'
// import loginPage from './components/login/loginPage.js'
// import join from './components/login/join.js'
// import addUserInfo from './components/login/addUserInfo.js'
// import loading from './components/loading.js'
// import callBackView from './views/callBack-view.js'

import test from '@/components/HelloWorld'
import notFound from '@/components/error/not-found'
import error from '@/components/error/error-comp'

export const publicRoute = [
    // { path: '/', name: 'base', component: AddUserInfo }, // 230522 home 컴포넌트 origin comp 로 변경

    // dining
    {
        path: '/',
        name: 'base',
        component: () => import('@/components/HelloWorld'),
    },
    // { path: '/home', name: 'home', component: HomeScreen },
    // // { path: '/main', name: 'mainHome', component: MainHome },
    // // { path: '/main', name: 'mainHome', component: MainHome }

    // { path: '/detail', name: 'detail', component: OriginView }, // 주재료 페이지
    // { path: '/menu', name: 'menu', component: Menu },
    // { path: '/search', name: 'search', component: SearchView },
    // { path: '/origin', name: 'origin', component: OriginView },

    // ,
    // { path: '/relatedMenu', name: 'food', component: RelatedMenu },
    // { path: '/restaurant', name: 'restaurant', component: RestaurantIntro },
    // { path: '/chef', name: 'chef', component: ChefIntro, props: true },
    // { path: '/ceo', name: 'ceo', component: PersonIntro, props: true },
    // { path: '/boss', name: 'boss', component: PersonIntro }, // 점주
    // { path: '/diningMap', name: 'diningMap', component: DiningMap },

    // // mypage
    // { path: '/mypage', name: 'myPageView', component: MyPageView },

    // // 리뷰 라우터
    // { path: '/review', name: 'reviewView', component: ReviewView },
    // { path: '/myreview', name: 'myReview', component: MyReview },
    // { path: '/ceoreview', name: 'ceoReview', component: CeoReview },
    // { path: '/addreview', name: 'addReview', component: AddReview },

    // { path: '/point', name: 'point', component: Point },

    // // notice
    // { path: '/notice', name: 'notice', component: Notice },
    // { path: '/event', name: 'event', component: Event },
    // { path: '/policy', name: 'policy', component: Policy },
    // { path: '/setting', name: 'setting', component: Setting },
    // { path: '/personal', name: 'personal', component: PersonalSetting },
    // { path: '/privacy', name: 'privacy', component: Privacy }, //개인정보설정-개인정보설정
    // { path: '/porting', name: 'porting', component: Porting },
    // { path: '/cancellation', name: 'cancellation', component: Cancellation },

    // // login 라우터
    // { path: '/login', name: 'login', component: login },
    // { path: '/join', name: 'join', component: Join },
    // {
    //     path: '/addUserInfo',
    //     name: 'addUserInfo',
    //     component: AddUserInfo,
    //     props: true,
    // },

    // // etc
    // { path: '/callback/:str', name: 'callback', component: callBackView },
    // { path: '/loading', name: 'loading', component: Loading },
    { path: '/404', name: 'notFound', component: notFound },
    { path: '/error', name: 'error', component: error },
    // 설정 이외의 경로가 올경우 not found로 대체
    { path: '/:catchAll(.*)', component: notFound },
]
