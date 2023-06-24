<template>
    <div class="modal_window" @click="modalOff">
        <div class="close_area" @click="modalOff">
            <img src="@img/modal_close_btn.png" alt="" />
        </div>
        <div class="modal_window_inner">
            <div class="title">
                <h2 class="modal_title">방사선 정보</h2>
                <p class="desc">
                    유통과정에서 방사선 측정기를 사용해 측정합니다.<br />연간 방사선 허용치는 1mSV 입니다.
                </p>
            </div>
            <div class="content">
                <div class="modal_img_wrap">
                    <img
                        v-if="checkPoint.image"
                        :src="changeImgUrl(checkPoint.image)"
                        style="height: 150px"
                    />
                </div>
                <div v-if="checkPoint.image" class="modal_chkpoint">
                    <p>제품 방사선</p>
                    <p>{{ checkPoint.measuredValue }}</p>
                </div>
                <div class="modal_text_wrap">
                    <span class="bg_text">{{ checkPoint.value }} mSv</span>
                    <p class="safety_value">안전도점수 {{ checkPoint.freshValue }}점</p>
                    <span class="safety_value_cal"> (1 - 방사선수치/안전기준치)*100 </span>
                </div>
                <div class="modal_img_wrap certification">
                    <span class="certification_name">KOLAS 인증서류</span>
                    <img :src="changeImgUrl('/web-img/common/KOLAS_QSAFE.jpg')" alt="Kolas 교정성적서" />
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['checkPoint', 'changeImgUrl', 'modalOff'],
}
</script>

<style></style>
