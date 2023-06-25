<template>
    <div class="login-page">
        <div class="modal-wrap">
            <div class="modal-title">
                <h2>세이피안 로그인</h2>
            </div>
            <!--
                    <div class="modal-content">
                        <div class="content-input">
                            <input
                                class="email"
                                type="email"
                               	 placeholder="이메일"
                                required />
                            <input
                                class="password"
                                type="password"
                                vlaue="password"
                                placeholder="비밀번호"
                                required />
                        </div>
                        <div class="content-check">
                            <div class="check-box">
                                <input type="checkbox" name="checkbox">
                                <span>로그인 유지하기</span>
                            </div>
                                <span>아이디 / 비밀번호 찾기</span>
                        </div>
                    </div>
                    <button class="loginBtn" @click="loginBtn">로그인</button>
                -->
            <button class="loginBtn kakao" @click="kakaoLogin">
                <img src="@img/login/kakao_login_medium_wide.png" />
            </button>
            <!-- id="naverIdLogin"  -->
            <button id="naverIdLogin_loginButton" class="loginBtn naver" @click="naverLogin" />
            <!-- <button id="naver_id_login" class="loginBtn naver" @click="naverLogin" /> -->

            <button class="loginBtn google" @click="googleLogin" />
            <!--
                <div class="join">
                    <span><a @click="goJoin">회원가입</a>하고 혜택받기</span>
                </div>
            	-->
        </div>
    </div>
</template>

<script>
// import addUserInfo from '@/components/add-userinfo'
import * as util from '@/utils/function.js'
import NaverLogin from '@/utils/naverLoginService.js'
import { _xurl } from '#/localSettings.js'

const hostUrl = location.protocol + '//' + location.host
export default {
    // components: { addUserInfo },
    data() {
        return {}
    },
    mounted() {
        this.$emit('setTrigger', '/login')
        new NaverLogin()
    },
    methods: {
        kakaoLogin() {
            const rdUrl = hostUrl + '/callback/kakao'

            if (!Kakao.isInitialized()) Kakao.init(process.env.VUE_APP_KK_CLIENT)

            Kakao.Auth.authorize({
                redirectUri: rdUrl,
                prompts: 'login',
            })

            localStorage.setItem('ccode', this.$route.query.companyCode)
        },
        naverLogin() {
            localStorage.setItem('ccode', this.$route.query.companyCode)
        },
        googleLogin() {
            document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'

            google.accounts.id.initialize({
                client_id: process.env.VUE_APP_GG_CLIENT,
                callback: this.cbSigninGoogle,
            })

            google.accounts.id.prompt(() => {
                document.cookie = 'g_state=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
                // util.deleteCookie('g_state')
            })
        },
        cbSigninGoogle(res) {
            const responsePayload = util.decodeJwtResponse(res.credential)
            const prepGoogle = 'GG'

            const userinfo = {
                userid: prepGoogle + '-' + responsePayload.sub,
                rtype: 'google',
            }

            util.ajaxFetchJson(_xurl.signin, 'POST', userinfo).then(async (res) => {
                if (res.ok) {
                    let result = await res.json()

                    localStorage.setItem('token', result.profile.token)
                    // util.setCookie('token', result.profile.token)
                    this.goMain()
                    return
                }

                if (res.status == 401) {
                    const data = {
                        uid: userinfo.userid,
                        rtype: userinfo.rtype,
                        uname: responsePayload.name,
                        email: responsePayload.email,
                    }

                    this.goJoin(null, data)
                } else {
                    alert('server error')
                }
            })
        },
        goMain(companyCode, data) {
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
        goJoin(companyCode, data) {
            let code = companyCode || this.$route.query.companyCode
            let path = '/addUserInfo'

            this.$router
                .push({
                    path,
                    name: 'addUserInfo',
                    query: {
                        companyCode: code,
                    },
                    params: data,
                })
                .catch(() => {})
        },
    },
}
</script>
