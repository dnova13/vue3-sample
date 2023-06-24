<template>
    <div class="logout-modal">
        <div class="modal_window">
            <div class="modal_window_inner">
                <div class="title"></div>
                <div class="modal-content">로그아웃 하시겠습니까?</div>
            </div>
            <div class="logout-table">
                <div class="modalBtn" @click="logOut">확인</div>
                <div class="modalBtn" @click="modalOff('logout')">닫기</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modalOff', 'logOut'],
}
</script>

<style></style>
