<!-- // join 회원가입 컴포넌트 등록 -->
<template>
    <div class="join-page">
        <div class="join-wrap">
            <div class="join-title">
                <h2 class="title">회원가입</h2>
            </div>
            <form @submit.prevent="submitForm">
                <div class="join-content">
                    <div class="form-group">
                        <input type="email" id="email" placeholder="이메일" v-model="form.email" required />
                    </div>

                    <div class="form-group">
                        <input
                            type="password"
                            id="password"
                            placeholder="비밀번호"
                            v-model="form.password"
                            required
                        />
                    </div>

                    <div class="form-group">
                        <input
                            type="password"
                            id="confirmPassword"
                            v-model="form.confirmPassword"
                            placeholder="비밀번호 확인"
                            required
                        />
                    </div>
                </div>
                <div class="form-group-check">
                    <label for="termsOfService">
                        <input type="checkbox" id="termsOfService" v-model="form.agreeToTerms" required />
                        <span>서비스 이용약관에 동의합니다.</span>
                    </label>
                </div>

                <div class="form-group-check">
                    <label for="privacyPolicy">
                        <input
                            type="checkbox"
                            id="privacyPolicy"
                            v-model="form.agreeToPrivacyPolicy"
                            required
                        />
                        <span>개인정보 처리방침에 동의합니다.</span>
                    </label>
                </div>
                <button type="submit" class="join-btn">회원가입</button>
            </form>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                username: '',
                password: '',
                confirmPassword: '',
                email: '',
                phone: '',
                agreeToTerms: false,
                agreeToPrivacyPolicy: false,
            },
        }
    },
    mounted() {
        this.$emit('setTrigger', '/join')
    },
    methods: {
        submitForm() {
            // 회원가입 폼 제출
            console.log(this.form)
        },
    },
}
</script>
