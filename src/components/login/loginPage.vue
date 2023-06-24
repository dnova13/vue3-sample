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
                <img src="/img/login/kakao_login_medium_wide.png" />
            </button>
            <button class="loginBtn naver" @click="loginBtn('naver')" />
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
import { _xurl, authKey } from '#/localSettings.js'

const hostUrl = location.protocol + '//' + location.host
export default {
    // components: { addUserInfo },
    data() {
        return {}
    },
    mounted() {
        this.$emit('setTrigger', '/login')
        // this.naverLogin();
    },
    methods: {
        kakaoLogin() {
            const preKakao = 'KK'
            const rdUrl = hostUrl + '/callback/kakao'

            if (!Kakao.isInitialized()) Kakao.init(authKey.KK_CLIENT)
            // Kakao.isInitialized();
            // console.log('host', host);

            Kakao.Auth.authorize({
                redirectUri: rdUrl,
                prompts: 'login',
            })

            localStorage.setItem('ccode', this.$route.query.companyCode)
        },
        naverLogin() {
            console.log('naver')

            const cid = '8hpffobLk4qA6gOYMlfa'
            let url = 'http://localhost:5503'

            let naverLogin = new naver_id_login(cid, url)
            let state = naverLogin.getUniqState()

            // naver_id_login.setButton('white', 2, 40);
            // naver_id_login.setDomain('YOUR_SERVICE_URL');
            naverLogin.setState(state)
            // naverLogin.setPopup();
            naverLogin.init_naver_id_login()

            // let naverLogin = new naver.LoginWithNaverId({
            // 	clientId: cid,
            // 	callbackUrl: url,
            // 	isPopup: false,
            // 	callbackHandle: false,
            // 	// loginButtonHandler.use:  true ,
            // });

            // naverLogin.init();

            localStorage.setItem('ccode', this.$route.query.companyCode)
            // console.log(naverLogin);
            // naverLogin.click();
        },
        googleLogin() {
            google.accounts.id.initialize({
                client_id: authKey.GG_CLIENT,
                callback: this.cbSigninGoogle,
            })

            google.accounts.id.prompt(() => {
                util.deleteCookie('g_state')
            })
        },
        cbSigninGoogle(res) {
            const responsePayload = util.decodeJwtResponse(res.credential)
            const prepGoogle = 'GG'

            // console.log(responsePayload);

            const userinfo = {
                userid: prepGoogle + responsePayload.sub,
                rtype: 'google',
            }

            util.ajaxFetchJson(_xurl.signin, 'POST', userinfo).then(async (res) => {
                if (res.ok) {
                    let result = await res.json()

                    util.setCookie('token', result.profile.token)
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
