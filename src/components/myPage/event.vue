<template>
    <!--이벤트-->
    <div class="notice-wrap">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">이벤트</div>
        </div>
        <div class="notice-content">현재 작성된 글이 없습니다.</div>
    </div>
</template>

<script>
export default {
    data() {
        return {}
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
    },
}
</script>

<style></style>
