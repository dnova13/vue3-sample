<template>
    <div class="cancellation-wrap">
        <div class="cancellation-header">
            <h2>
                {{ users.name }}님 <br />
                정말 탈퇴하시겠습니까?
            </h2>
        </div>
        <div class="cancellation-info">
            <div class="cancellation-content">
                {{ users.email }}
            </div>
            <div class="form-group-check">
                <label for="termsOfService">
                    <input id="termsOfService" type="checkbox" required />
                    <span>위 내용을 모두 읽었으며, 이에 동의합니다.</span>
                </label>
            </div>
        </div>
        <div class="cancellation-btn">
            <div class="safeean-tabs" @click="goHome()">계정삭제</div>
            <div class="safeean-tabs" @click="goBack">취소</div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            users: [],
        }
    },
    created() {
        axios
            .get('https://jsonplaceholder.typicode.com/users/2')
            .then((res) => {
                this.users = res.data
            })
            .catch((error) => {
                console.log(error)
            })
    },
    mounted() {},
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
