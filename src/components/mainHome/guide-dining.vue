<template>
    <div class="step02">
        <div class="step_cont_wrap">
            <h2 class="splash_intro">안심하고 드세요!</h2>
            <p class="splash_intro_desc">
                <span class="text_green"> 세이피안 다이닝</span>은<br />
                방문하신 {{ defaultShop }}의 식자재 안전정보를<br />
                제공하는 서비스입니다.
            </p>
            <div class="splash_ingredient">
                <h6 class="splash_ingredient_title">주 원재료</h6>
                <div class="img_wrap">
                    <img :src="changeImgUrl(shopInfo?.companyGuideImage)" />
                </div>
            </div>
            <div class="splash_checkpoint">
                <h4 class="checkpoint_title">Check Point</h4>
                <ul class="checkpoint_list">
                    <li>
                        <div class="img_wrap">
                            <img src="@img/splash_checkpoint_img01.png" alt="" />
                        </div>
                    </li>
                    <li>
                        <div class="img_wrap">
                            <img src="@img/splash_checkpoint_img02.png" alt="" />
                        </div>
                    </li>
                    <li>
                        <div class="img_wrap">
                            <img src="@img/splash_checkpoint_img03.png" alt="" />
                        </div>
                    </li>
                </ul>
            </div>
            <div class="splash_btn_wrap">
                <a class="splash_hide_btn" @click="hideGuide">한 눈에 보러 가기 ></a>
            </div>
            <label class="hide-week-wrap" for="hide-week">
                <input
                    id="hide-week"
                    v-model="isChecked"
                    style="margin-right: 3px"
                    type="checkbox"
                    name="hide-week"
                />
                <span>하루동안 보지 않기</span>
            </label>
        </div>
    </div>
</template>

<script>
import { changeImgUrl, scrollOn, scrollOff } from '@/utils/function.js'

export default {
    props: ['shopInfo'],
    data() {
        return {
            isChecked: false,
            defaultShop: '음식점',
        }
    },
    created() {
        // TODO : 추후 이거 매장, 음식점 구별 필요
        if (this.shopInfo.biznum == '6168191440') {
            this.defaultShop = '매장'
        }
    },
    mounted() {
        // 며칠동안 보기 기간이 만료 되지 않을때.
        if (!this.isExpiredGuide()) {
            document.querySelector('.step02').style.display = 'none'

            setTimeout(this.hideGuide, 3000)
        }
    },
    methods: {
        // 이미지 url 변경
        changeImgUrl(_img) {
            if (!_img) {
                return `${process.env.VUE_APP_BASE_URL}img/guide_ingredient.png`
            }

            return changeImgUrl(_img)
        },
        // guide 숨김
        hideGuide() {
            const splash = document.querySelector('.splash')
            splash?.classList.add('fadeOut')

            scrollOn()

            if (this.isChecked) this.setExpireGuide(1)
        },
        // guide 보이는 유효기간 셋팅
        setExpireGuide(expireDays) {
            let date = new Date()
            date = new Date(date.getFullYear(), date.getMonth(), date.getDate())
            date = date.getTime() + expireDays * 24 * 60 * 60 * 1000

            localStorage.setItem('guide_close', date)
        },
        // guide 유효기간 확인
        isExpiredGuide() {
            let expireDay = localStorage.getItem('guide_close')
            if (!expireDay) return true

            let now = new Date()
            now = now.getTime()

            // 시간이 남아 있으면 false, 아니면 true 리턴
            return parseInt(localStorage.getItem('guide_close')) < now
        },
    },
}
</script>

<style></style>
