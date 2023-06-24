<template>
    <!--약관 및 정책-->
    <div class="notice-wrap">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">약관 및 정책</div>
        </div>
        <div class="policy-content" id="policy-content"></div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    mounted() {
        this.renderHtmlFile()
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        async renderHtmlFile() {
            try {
                const res = await fetch('./policy.html')
                const htmlContent = await res.text()
                const policyContent = document.getElementById('policy-content')
                policyContent.innerHTML = htmlContent
            } catch (error) {
                console.error('Error rendering HTML file:', error)
            }
        },
    },
}
</script>

<style></style>
