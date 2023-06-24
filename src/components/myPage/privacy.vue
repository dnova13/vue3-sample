<template>
    <div class="setting-wrap">
        <div class="setting-header">
            <button @click="goBack" />
            <div class="notice-title">개인정보 변경</div>
        </div>
        <div class="safeean-info setting">작성 내용 없음.</div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {},
    methods: {
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

                // case "logout":
                //   path = "/logout";
                //   console.log("logout");

                //   break;

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
    },
}
</script>

<style></style>
