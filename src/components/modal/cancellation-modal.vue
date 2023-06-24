<template>
    <div class="cancellation-modal">
        <div class="modal_window">
            <div class="modal_window_inner">
                <div class="title"></div>
                <div class="modal-content cancellation">
                    비밀번호를 입력해주세요
                    <input v-model="password" type="password" />
                </div>
            </div>
            <div class="logout-table">
                <div class="modalBtn" @click="goToPage('cancellation')">확인</div>
                <div class="modalBtn" @click="modalOff('cancellation')">닫기</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['modalOff', 'goToPage'],
    data() {
        return {
            password: '',
        }
    },
    mounted() {
        this.$emit('goToPage', '/cancellation')
    },
}
</script>

<style></style>
