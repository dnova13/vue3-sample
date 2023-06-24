<template>
    <div class="setting-wrap">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">개인정보설정</div>
        </div>
        <div class="safeean-info setting">
            <ul class="safeean-tabs">
                <li class="safeean-list" @click="goToPage('privacy')">
                    개인정보설정
                    <button />
                </li>
                <li class="safeean-list" @click="goToPage('porting')">
                    휴대번호 변경
                    <button />
                </li>
                <!-- 230607 주석처리 yj-seol
                    <li class="safeean-list"  @click="modalOn('cancellation')">
                        회원탈퇴
                        <button />
                    </li>
                    -->
                <li class="safeean-list" @click="modalOn('logout')">
                    로그아웃
                    <button />
                </li>
            </ul>
        </div>
        <logout-modal id="logoutModal" style="display: none" :modal-off="modalOff" :logOut="logOut" />
        <cancellation-modal
            id="cancellationModal"
            style="display: none"
            :modal-off="modalOff"
            :go-to-page="goToPage"
        />
    </div>
</template>

<script>
import * as util from '@/utils/function.js'
import logoutModal from '@/components/modal/logout-modal'
import cancellationModal from '@/components/modal/cancellation-modal'

export default {
    components: {
        logoutModal,
        cancellationModal,
    },
    data() {
        return {}
    },
    created() {},
    mounted() {},
    methods: {
        modalOn(item) {
            const modalId = item === 'logout' ? 'logoutModal' : 'cancellationModal'
            const modal = document.getElementById(modalId)
            modal.style.display = 'flex'
            // this.modalVisible = true;
            // scrollOff();
        },
        modalOff(item) {
            const modalId = item === 'logout' ? 'logoutModal' : 'cancellationModal'
            const modal = document.getElementById(modalId)
            modal.style.display = 'none'

            document.querySelector('.modal_window_inner').scrollTo(0, 0)

            // scrollOn();
            // this.modalVisible = false;
        },

        goBack() {
            this.$router.go(-1)
        },
        goToPage(pageId, companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = ''

            switch (pageId) {
                case 'privacy':
                    path = '/privacy'
                    console.log('privacy')
                    break

                case 'porting':
                    path = '/porting'
                    console.log('porting')

                    break

                case 'cancellation':
                    path = '/cancellation'
                    console.log('cancellation')

                    break

                default:
                    path = '/error'
            }
            this.$router
                .push({
                    path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            this.$router
                .push({
                    path: '/',
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
        logOut() {
            util.deleteCookie('token')
            this.goHome()
        },
    },
}
</script>

<style></style>
