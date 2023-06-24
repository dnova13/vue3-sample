<template>
    <div class="modal_window" style="max-width: 380px; height: auto" @click="modalOff">
        <div class="close_area" @click="modalOff">
            <img src="@img/modal_close_btn.png" alt="" />
        </div>
        <div class="modal_window_inner">
            <div class="title">
                <h2 class="modal_title">푸드마일리지 정보</h2>
                <p class="desc">
                    제품의 이동 거리를 고려한 푸드 마일리지를 확인합니다.<br />
                    값이 높을 수록 이동 거리가 길어지므로<br />신선도가 떨어질 수 있습니다.<br />
                </p>

                <p class="desc" style="text-decoration: underline; font-weight: bold">
                    수치가 낮을수록 운송수단의 탄소배출량이 적습니다.
                </p>
            </div>
            <div class="content">
                <div class="modal_img_wrap">
                    <img src="@img/food_mileage_logo.png" style="height: 150px" />
                </div>
                <div class="modal_text_wrap" style="margin-bottom: 1vw">
                    <span class="bg_text">{{ checkPoint.value }} (톤ㆍ㎞)</span>
                    <p class="safety_value">안전도점수 {{ checkPoint.freshValue }}점</p>
                    <span class="safety_value_cal"> (권장점수/푸드마일리지)*100 </span>
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
