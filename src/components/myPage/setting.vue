<template>
    <div class="setting-wrap">
        <div class="setting-header">
            <button @click="goBack" />
            <div class="notice-title">설정</div>
        </div>
        <div class="safeean-info setting">
            <ul class="safeean-tabs">
                <li class="safeean-list" @click="goToPage()">
                    개인정보설정
                    <button />
                </li>
            </ul>
        </div>
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
        goToPage(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/personal' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch((error) => {
                    console.error(error)
                })
        },
    },
}
</script>

<style></style>
