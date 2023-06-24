<template>
    <!--마이페이지-->
    <div class="inner_container myPage">
        <div class="myPage-wrap">
            <!-- 개인정보 -->
            <div class="personal">
                <div class="personal-img" />
                <div class="personal-info">
                    <h2>{{ users.name }}님 안녕하세요!</h2>
                    <h6>{{ users.email }}</h6>
                </div>
            </div>

            <!-- 광고 -->
            <div class="ad">광고</div>

            <!-- 공지사항 외 -->
            <myPageList :users="users" />
        </div>
    </div>
</template>

<script>
// import loginPage from '../components/myPagegory/loginPage.js';
import myPageList from '@/components/myPage/my-page-list'

export default {
    components: {
        // loginPage,
        // kakaoMap,
        myPageList,
    },
    data() {
        return {
            users: [],
        }
    },
    computed: {
        // 외부링크이동
        // linkToEx() {
        //     /*
        //     return this.icons.filter((el) => {
        //         if (el.external) {
        //             console.log(el);
        //             return el;
        //         }
        //     });*/
        // },
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
    mounted() {
        this.$emit('setTrigger', '/myPage')
    },
    methods: {
        goLogin(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/login' : '/error'
            console.log('로그인')

            this.$router
                .push({
                    path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
        logout() {
            console.log('logout')
        },
    },
}
</script>

<style></style>
