<!-- callBack 페이지 view -->
<template>
    <div>
        <Loading />
    </div>
</template>

<script>
import Loading from '@/components/utils/loading'
import * as util from '@/utils/function.js'
import NaverLogin from '@/utils/naverLoginService.js'
import { _xurl } from '#/localSettings.js'

export default {
    components: {
        Loading,
    },
    props: {},
    data() {
        return {
            rtype: '',
        }
    },
    computed: {},
    async created() {
        this.rtype = this.$route.params.str
        const code = this.$route.query.code

        let preCode = ''
        let data = null
        let userInfo = null

        if (!this.rtype) {
            alert('server error')
            return
        }

        if (this.rtype === 'kakao') {
            preCode = 'KK'
            data = await this.getKakaoLoginInfo(code)

            if (!data?.kakao_account) {
                alert('server error')
                return
            }

            userInfo = {
                userid: preCode + '-' + data.id,
                rtype: this.rtype,
                uname: data.kakao_account?.profile?.nickname,
                email: data.kakao_account?.email,
            }
        } else if (this.rtype === 'naver') {
            preCode = 'NV'
            const naeverLogin = new NaverLogin()
            const data = await naeverLogin.getUserInfo()

            if (!data?.user) {
                alert('server error')
                return
            }

            let birthday = `${data.user?.birthyear}-${data.user?.birthday}`

            userInfo = {
                userid: preCode + '-' + data.user.id,
                rtype: this.rtype,
                uname: data.user?.name ? data.user.name : data.user?.nickname ? data.user.nickname : '',
                email: data.user?.email ? data.user.email : '',
                gender: data.user?.gender ? (data.user?.gender === 'M' ? 'male' : 'female') : '',
                birthday: util.checkValidDate(birthday) ? birthday : '',
            }
        }

        // console.log('userInfo', userInfo)

        this.ajaxFetchLogin(_xurl.signin, userInfo)
    },
    mounted() {},
    methods: {
        async getKakaoLoginInfo(code) {
            const auth_url = 'https://kauth.kakao.com/oauth/token'

            let result = ''
            const data = {
                client_id: process.env.VUE_APP_KK_REST,
                code: code,
                grant_type: 'authorization_code',
            }

            result = await util.ajaxFetchQuery(auth_url, 'POST', data)

            if (!result.ok) {
                alert('server error')
                return null
            }

            result = await result.json()
            const accToken = result.access_token

            Kakao.init(process.env.VUE_APP_KK_CLIENT)
            Kakao.Auth.setAccessToken(accToken)

            try {
                result = await Kakao.API.request({
                    url: '/v2/user/me',
                    data: {
                        property_keys: [
                            'kakao_account.profile',
                            'kakao_account.name',
                            'kakao_account.email',
                            'kakao_account.age_range',
                            'kakao_account.gender',
                            'kakao_account.birthyear',
                            'kakao_account.birthday',
                            // 'kakao_account.phone_number',
                        ],
                    },
                })
            } catch (error) {
                alert('server error')
                return null
            }
            // console.log(result)
            return result
        },
        ajaxFetchLogin(_url, userinfo) {
            util.ajaxFetchJson(_url, 'POST', userinfo).then(async (res) => {
                if (res.ok) {
                    let result = await res.json()

                    // util.setCookie('token', result.profile.token)
                    localStorage.setItem('token', result.profile.token)
                    this.goMain()
                    return
                }

                if (res.status == 401) {
                    const data = {
                        uid: userinfo.userid,
                        rtype: userinfo.rtype,
                        uname: userinfo.uname,
                        email: userinfo.email ? userinfo.email : '',
                        phone: userinfo.phone ? userinfo.phone : '',
                        birthday: userinfo.birthday ? userinfo.birthday : '',
                        gender: userinfo.gender ? userinfo.gender : '',
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

<style></style>
