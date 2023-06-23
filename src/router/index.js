import { createRouter, createWebHistory } from 'vue-router'
import {
    publicRoute,
    // protectedRoute
} from './config'

const BASE_URL = '/dining'
const router = createRouter({
    history: createWebHistory(BASE_URL),
    routes: publicRoute,
})

router.beforeEach((to, from, next) => {
    // console.log(`param = ${to.params.str}`);
    // const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;

    // window.scrollTo({
    //     top: -500,
    //     behavior: 'smooth',
    // });
    // document.documentElement.scrollTop = 0;
    // document.body.scrollTop = 0;

    setTimeout(() => {
        window.scrollTo(0, 1)
        setTimeout(() => {
            window.scrollTo(0, 0)
        }, 0)
    }, 0)
    next()
    // window.scrollTo(0, -scrollbarWidth);
    // // window.scrollTo(0, 0);
    // next();
})

router.afterEach(() => {
    // 로딩바 셋팅
    // NProgress.done()
})

export default router
