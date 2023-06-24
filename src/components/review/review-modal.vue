<template>
    <div class="logout-modal">
        <div class="modal_window">
            <div class="modal_window_inner">
                <div class="title"></div>
                <div class="modal-content">리뷰작성이 완료됐습니다.</div>
            </div>
            <div class="review">
                <div class="review modalBtn" @click="modalOff()">확인</div>
            </div>
        </div>
    </div>
</template>

<script>
// 작성완료 모달
export default {
    props: ['modalOff'],
}
</script>

<style></style>
