<!-- /* error page component */ -->

<template>
    <div class="error-container">
        <div class="MainGraphic">
            <svg class="Hummingbird" viewBox="0 0 55 41" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M35.5 5L54.7.6H32.3L35.5 5zM12.4 40.8l10.3-10.1-6.2-6.7-4.1 16.8zM33.8 5.3L30.5.8l-5.4 4 8.7.5zM20.8 4.6L8.8 0l1.9 4.1 10.1.5zM0 5l15.2 15.4 7.5-14.2L0 5zM34.2 6.8l-9.9-.5-8 15.2 7.4 8.1 8-7.9 2.5-14.9z"
                />
            </svg>
            <svg class="Cog" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path
                    d="M29.18 19.07c-1.678-2.908-.668-6.634 2.256-8.328L28.29 5.295c-.897.527-1.942.83-3.057.83-3.36 0-6.085-2.743-6.085-6.126h-6.29c.01 1.043-.25 2.102-.81 3.07-1.68 2.907-5.41 3.896-8.34 2.21L.566 10.727c.905.515 1.69 1.268 2.246 2.234 1.677 2.904.673 6.624-2.24 8.32l3.145 5.447c.895-.522 1.935-.82 3.044-.82 3.35 0 6.066 2.725 6.083 6.092h6.29c-.004-1.035.258-2.08.81-3.04 1.676-2.902 5.4-3.893 8.325-2.218l3.145-5.447c-.9-.515-1.678-1.266-2.232-2.226zM16 22.48c-3.578 0-6.48-2.902-6.48-6.48S12.423 9.52 16 9.52c3.578 0 6.48 2.902 6.48 6.48s-2.902 6.48-6.48 6.48z"
                />
            </svg>
        </div>

        <h1 class="MainTitle">An error has occurred</h1>
        <p class="Main Description">
            죄송합니다. 현재 웹페이지 접속이 어려우니 <br />
            다음에 다시 시도해주세요.
        </p>
    </div>
</template>

<script>
export default {
    // 230519 YJ-SEOL 에러페이지에서 tap-top의 ci클릭 시 mainHome으로 이동방지
    beforeRouteLeave(to, from, next) {
        // 이전 페이지 이동만 허용
        if (from.name !== null) {
            next()
        }
        // 라우터 이동을 막기 위해 next(false)를 호출
        next(false)
    },
    data() {
        return {}
    },
    created() {},
    mounted() {
        this.$emit('setTrigger', '/error')

        // YJ SEOL 230502 app.js setTrigger에 추가
        // document.querySelector('.splash')?.classList.add('fadeOut');

        // 메인네비게이션 숨김
        // const nav = document.querySelector('#mainNav')
        // if (nav) {
        //     nav.style.display='none'
        // }
    },
    methods: {},
}
</script>
