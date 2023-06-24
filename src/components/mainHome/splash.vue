<template>
    <div class="step01">
        <div class="logo_wrap splash01">
            <img src="@img/splash_logo.png" alt="" />
        </div>
        <div class="logo_wrap splash02">
            <img :src="`${baseUrl}img/logo/${shopInfo?.biznum}.png`" />
            <span v-if="!branchExceptionList.includes(shopInfo?.biznum)" class="branch">
                {{ shopInfo?.branchName ? '[' + shopInfo?.branchName + ']' : '' }}
            </span>
        </div>
        <div class="splash_bottom">
            <h5 class="splash_title">세이피안 다이닝</h5>
            <p class="splash_desc">식자재안전정보서비스</p>
        </div>
    </div>
    <!-- <div class="logo_wrap splash01">
            <img src="@img/splash_logo.png" alt="">
                </div>
                    <div class="logo_wrap splash02">
                <div v-if="">
            <div></div>
        </div> -->
</template>

<script>
import { imgUrl } from '#/localSettings.js'
import { changeImgUrl } from '@/utils/function.js'

export default {
    props: ['shopInfo'],
    data() {
        return {
            imgUrl: null,
            isImageLoaded: false,
            branchExceptionList: ['6408501954'],
            baseUrl: process.env.VUE_APP_BASE_URL,
        }
    },
    created() {
        // this.isLoadImage(this.changeImgUrl(this.shopInfo?.companyLogo));
    },
    mounted() {},
    methods: {
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // 이미지 로드가 완료되면 랜더링 메소드
        isLoadImage(_img) {
            const img = new Image()
            img.onload = () => {
                this.isImageLoaded = true
            }
            img.onerror = () => {
                this.isImageLoaded = false
                console.log('img ERRRRR')
            }
            img.src = _img
            // img.src = this.changeImgUrl(this.shopInfo?.companyLogo + 'AAAA');
        },
    },
}
</script>

<style></style>
