<template>
    <!-- 공지사항 외 -->
    <div class="safeean-info">
        <ul class="safeean-tabs">
            <li class="safeean-list" @click="goToPage('notice')">
                공지사항
                <button />
            </li>
            <li class="safeean-list" @click="goToPage('event')">
                이벤트
                <button />
            </li>
            <li class="safeean-list" @click="goToPage('policy')">
                약관 및 정책
                <button />
            </li>
            <li class="safeean-list" @click="goToPage('point')">
                포인트 정책
                <button />
            </li>
            <li class="safeean-list" @click="goToPage('setting')">
                설정
                <button />
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: ['users'],
    data() {
        return {}
    },
    computed: {
        // 외부링크이동
        // linkToEx() {
        //     return this.icons.filter((el) => {
        //         if (el.external) {
        //             console.log(el)
        //             return el
        //         }
        //     })
        // },
    },
    created() {},
    mounted() {
        this.$emit('setTrigger', '/myPage')
    },

    methods: {
        goToPage(pageId, companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = ''

            switch (pageId) {
                case 'notice':
                    path = '/notice'
                    break

                case 'event':
                    path = '/event'

                    break

                case 'policy':
                    path = '/policy'

                    break

                case 'point':
                    path = '/point'

                    break

                case 'setting':
                    path = '/setting'

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
                    props: {
                        users: this.users,
                    },
                })
                .catch(() => {})
        },
        logout() {
            console.log('logout')
        },
    },
}
</script>

<style></style>
