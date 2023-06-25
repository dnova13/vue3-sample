class NaverLoginService {
    constructor() {
        const clientId = process.env.VUE_APP_NV_CLIENT
        const hostUrl = location.protocol + '//' + location.host
        const rdUrl = hostUrl + '/callback/naver'

        this.naverLogin = new window.naver.LoginWithNaverId({
            clientId: clientId,
            callbackUrl: rdUrl,
            isPopup: false,
        })

        this.naverLogin.init()
    }

    // getLoginInfo = () => this.naverLogin
    getUserInfo = async () => {
        const status = await new Promise((resolve) => {
            this.naverLogin.getLoginStatus(resolve)
        })

        // console.log('status', status)
        if (status) {
            return this.naverLogin
        }

        return null
    }
}

export default NaverLoginService
