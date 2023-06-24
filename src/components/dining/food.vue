<template>
    <div class="related_menu_item slide">
        <div class="img_wrap">
            <img :src="changeImgUrl(foodInfo.menuImage2)" alt="" />
        </div>
        <div class="text_wrap">
            <div class="inner_container">
                <div class="related_heading_wrap">
                    <h2 class="related_menu_title">
                        {{ getOnlyMenuName(foodInfo.menuName) }}
                    </h2>
                    <p class="related_menu_desc">
                        {{ foodInfo.menuDesc }}
                    </p>
                    <a class="goto_ingredient" @click="goOrigin(foodInfo.menuCode)"> 원재료 보기 </a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { callAjax, scrollTo, horizonalScrollTo, changeImgUrl } from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

let urlOriginFoods = _xurl.origin_foods

export default {
    props: ['foodInfo', 'idx', 'lastIdx'],
    data() {
        return {
            foodList: [],
            categoryList: [],
            companyInfo: [],
            isDown: false,
            startX: 0,
            scrollLeft: 0,
            clickWork: true,
            mouseMoveCnt: 0,
        }
    },
    created() {},
    mounted() {
        if (this.idx === this.lastIdx - 1) {
            this.$emit('initSlide')
        }
    },
    methods: {
        // only 메뉴 이름만 가져옴
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        // 이미지 url 변경
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // /origin path 로 이동
        goOrigin(code) {
            this.$router
                .push({
                    path: '/origin',
                    name: 'origin',
                    query: {
                        companyCode: this.$route.query.companyCode,
                        menuCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
