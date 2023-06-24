<!-- callBack 페이지 view -->
<template>
    <Loading />
</template>

<script>
import Loading from '@/components/utils/loading'
import * as util from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

export default {
    props: {},
    components: {
        Loading,
    },
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

        if (!this.rtype) {
            alert('server error')
            return
        }

        if (this.rtype === 'kakao') {
            preCode = 'KK'
        } else if (this.rtype === 'naver') {
            preCode = 'NV'
        }

        const data = await this.getKakaoLoginInfo(code)

        // console.log('CCCCCCCCCC', data)
        const userInfo = {
            userid: preCode + '-' + data.id,
            rtype: this.rtype,
            uname: data.kakao_account?.profile?.nickname,
            email: data.kakao_account?.email,
        }

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
                return
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
                return
            }
            console.log(result)
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
