<template>
    <!--약관 및 정책-->
    <div class="notice-wrap">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">포인트 정책</div>
        </div>
        <div id="policy-content" class="policy-content"></div>
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
        // async renderHtmlFile() {
        //     try {
        //         const res = await fetch('./police.html');
        //         const htmlContent = await res.text();
        //         const policeContent = document.getElementById('police-content');
        //         policeContent.innerHTML = htmlContent;
        //     } catch (error) {
        //         console.error('Error rendering HTML file:', error);
        //     }
        // }
    },
}
</script>

<style></style>
