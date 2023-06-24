import diningViews from '@/views/dining'
import homeViews from '@/views/homeViews'
import intro from '@/views/intro'
import { myPageView } from '@/views/myPage'

// review import
import { reviewView } from '@/views/review'
import reviewComp from '@/components/review'
import myPageComp from '@/components/myPage'

// login
import loginViews from '@/views/login'
import loginComp from '@/components/login'

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
    { path: '/home', name: 'home', component: homeViews.homeScreen },
    // { path: '/main', name: 'mainHome', component: homeViews.mainHome },

    { path: '/detail', name: 'detail', component: diningViews.originView }, // 주재료 페이지
    { path: '/menu', name: 'menu', component: diningViews.menuView },
    { path: '/search', name: 'search', component: diningViews.searchView },
    { path: '/origin', name: 'origin', component: diningViews.originView },

    // ,
    { path: '/relatedMenu', name: 'food', component: diningViews.relatedMenu },
    { path: '/restaurant', name: 'restaurant', component: intro.introRestaruant },
    { path: '/chef', name: 'chef', component: intro.introChef, props: true },
    { path: '/ceo', name: 'ceo', component: intro.introPerson, props: true },
    { path: '/boss', name: 'boss', component: intro.introPerson }, // 점주
    { path: '/diningMap', name: 'diningMap', component: diningViews.diningMap },

    // // mypage
    { path: '/mypage', name: 'myPageView', component: myPageView },

    // // 리뷰 라우터
    { path: '/review', name: 'reviewView', component: reviewView },
    { path: '/my-review', name: 'myReview', component: reviewComp.myReview },
    { path: '/boss-review', name: 'ceoReview', component: reviewComp.bossReview },
    { path: '/add-review', name: 'addReview', component: reviewComp.addReview },

    { path: '/point', name: 'point', component: myPageComp.point },

    // // notice
    { path: '/notice', name: 'notice', component: myPageComp.notice },
    { path: '/event', name: 'event', component: myPageComp.event },
    { path: '/policy', name: 'policy', component: myPageComp.policy },
    { path: '/setting', name: 'setting', component: myPageComp.setting },
    { path: '/personal', name: 'personal', component: myPageComp.personalSetting },
    { path: '/privacy', name: 'privacy', component: myPageComp.privacy }, //개인정보설정-개인정보설정
    { path: '/porting', name: 'porting', component: myPageComp.porting },
    { path: '/cancellation', name: 'cancellation', component: myPageComp.cancellation },

    // // login 라우터
    { path: '/login', name: 'login', component: loginComp.login },
    { path: '/join', name: 'join', component: loginComp.join },
    {
        path: '/addUserInfo',
        name: 'addUserInfo',
        component: loginViews.addUserInfo,
        props: true,
    },

    // // etc
    { path: '/callback/:str', name: 'callback', component: loginViews.callBackView },
    // { path: '/loading', name: 'loading', component: Loading },
    { path: '/404', name: 'notFound', component: notFound },
    { path: '/error', name: 'error', component: error },
    // 설정 이외의 경로가 올경우 not found로 대체
    { path: '/:catchAll(.*)', component: notFound },
]
