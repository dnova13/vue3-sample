<template>
    <section class="ingredient_brief">
        <div class="title_wrap main_slide_title_wrap">
            <div class="inner_container">
                <h2 class="primary_title">{{ getOnlyMenuName(menuName) }}</h2>
                <h5 class="ingredient_name">{{ originInfo.productName }}</h5>
                <a class="related_btn" @click="goOriginFood(originInfo.productCode)"> 관련메뉴 </a>
            </div>
        </div>
        <div class="ingredient_img">
            <div class="inner_wide_container">
                <div class="ingredient_img_wrap">
                    <img :src="changeImgUrl(originInfo.productImage)" />
                </div>
            </div>
        </div>
        <ul class="ingredient_info_list">
            <template v-for="(item, j) in originInfo.summaries" :key="j">
                <li v-if="item.name === '방사선'">
                    <h5 class="ingredient_info_title">{{ item.name }}</h5>
                    <a class="ingredient_info_cont modal_btn" @click="modalOn(item)">
                        <span class="ingredient_row">
                            {{ getRadiationGrade(item.freshValue) }}<em class="icon guide">?</em></span
                        >
                        <em>{{ item.value }} mSv</em>
                    </a>
                </li>
                <li v-else-if="item.name === '푸드마일리지'">
                    <h5 class="ingredient_info_title">{{ item.name }}</h5>
                    <a class="ingredient_info_cont modal_btn" @click="modalOn(item)">
                        <span class="ingredient_row">
                            {{ getFoodMileageGrade(item.freshValue) }}<em class="icon guide">?</em></span
                        >
                        <em>{{ item.value }} (톤ㆍ㎞)</em>
                    </a>
                </li>
                <li v-else>
                    <h5 class="ingredient_info_title">{{ item.name }}</h5>
                    <span class="ingredient_info_cont">{{
                        item.value.replace('노르웨이산', '노르웨이')
                    }}</span>
                </li>
            </template>
        </ul>
    </section>
</template>

<script>
import { changeImgUrl } from '@/utils/function.js'

// 원산지 목록
export default {
    props: [
        'originInfo',
        'idx',
        'lastIdx',
        'menuName',
        // 'mainOriginDetailList'
    ],
    data() {
        return {
            originIdx: 0,
            // originInfo: null,
            categoryList: [],
            isDown: false,
            mouseMoveCnt: 0,
        }
    },
    created() {},
    mounted() {
        if (this.idx === this.lastIdx - 1) {
            this.$emit('slideEvent')
        }
    },
    methods: {
        getOnlyMenuName(_menu) {
            return _menu.split('-')[0].trim()
        },
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // 반사능 등급 반환
        getRadiationGrade(_val) {
            const freshVal = Number(_val)

            if (freshVal > 70) return '안전'
            else if (freshVal > 30 && freshVal <= 70) return '경고'
            else return '위험'
        },
        // 푸드마일리지 등급 반화
        getFoodMileageGrade(value) {
            const freshVal = Number(value)

            if (freshVal >= 80) return '저탄소'
            else return '고탄소'
        },
        // testModal(idx) {
        //     this.modalOn();
        // },
        modalOn(item) {
            this.$emit('modalOn', item)
        },
        //  /relatedMenu path 로 이동
        goOriginFood(productCode) {
            this.$router
                .push({
                    path: `/relatedMenu`,
                    query: {
                        companyCode: this.$route.query.companyCode,
                        productCode: productCode,
                        menuCode: this.$route.query.menuCode,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
