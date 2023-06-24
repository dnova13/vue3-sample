<!-- // review-view
//      - myReviewComp
//      - ceoReviewComp -->
<template>
    <!-- 리뷰 페이지 -->
    <div class="notice-wrap review">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">매장 리뷰</div>
        </div>
        <div class="review-content">
            <myReview :shopInfo="shopInfo" />
            <ceoReview :shopInfo="shopInfo" style="display: none" />
        </div>
        <div class="reviewBtn" @click="addReview">
            <p>리뷰 작성하기</p>
        </div>
    </div>
</template>

<script>
import myReview from '@/components/review/my-review.vue'
import ceoReview from '@/components/review/boss-review'

export default {
    components: { myReview, ceoReview },
    props: ['shopInfo'],
    data() {
        return {}
    },
    async created() {
        // 리뷰작성하기 페이지 이동 시간 단축
        // try {
        // 	const response = await axios.get(
        // 		"https://jsonplaceholder.typicode.com/comments/",
        // 		{
        // 			params: {
        // 				_limit: 10, // 10개의 데이터만 반환하도록 지정
        // 			},
        // 		}
        // 	);
        // 	console.log("comments = ", response.data);
        // } catch (error) {
        // 	console.log(error);
        // }
    },
    mounted() {
        this.$emit('setTrigger', '/review')
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        addReview(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/addReview' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>

<style></style>
