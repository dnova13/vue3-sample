<!-- callBack 페이지 view -->
<template>
    <Loading />
</template>

<script>
import Loading from '@/components/utils/loading'

export default {
    components: {
        Loading,
    },
    data() {
        return {}
    },
    computed: {},
    created() {
        console.log(this.$route)
        console.log('!!!!!!!!!!!!!!!!!!!!!!!!!!!!')
    },
    mounted() {
        this.$emit('setTrigger', '/loading')

        // // 유저 로그인 or 추가정보입력으로 이동
        // const externalData = this.$route.params.str;

        // // 유저가 이미 가입된 회원인지 확인
        // let userExists = false; //초기값 false로 설정

        // // 외부 서비스로부터 받은 정보 활용, 로그인 Or 추가정보 처리 수행
        // if (!externalData) {
        // 	// 외부서비스로부터 전달된 정보가 없는 경우, 에러 처리
        // 	this.$router.push("/error");
        // } else {
        // 	// 유저가 이미 가입된 회원인지 확인
        // 	console.log("Checking user existence...");
        // 	// const userExists = checkUserExists(externalData);
        // 	userExists = true; // 임시로 true로 설정하여 가입된 회원으로 처리

        // 	if (userExists) {
        // 		// 이미 가입된 회원일 경우, 로그인
        // 		loginUser(externalData);
        // 	} else {
        // 		// 신규 유저인 경우, 회원가입 페이지로 안내
        // 		this.$router.push("/addUserInfo");
        // 	}
        // }
    },
    methods: {},
}
</script>

<style></style>
