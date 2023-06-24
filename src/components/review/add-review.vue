<!-- // review-view
//      - myReviewComp
//      - ceoReviewComp
//      - addReivewComp -->

<template>
    <!-- 리뷰 페이지 -->
    <div class="notice-wrap review">
        <div class="notice-header">
            <button @click="goBack" />
            <div class="notice-title">리뷰 작성하기</div>
        </div>
        <div class="review-content addReview">
            <p class="companyName">
                {{ shopInfo?.companyName }}{{ shopInfo?.branchName ? ' [' + shopInfo?.branchName + ']' : '' }}
            </p>
            <div class="rating_box">
                <div class="rating">
                    <span v-for="star in stars" :key="star" class="star">★</span>
                    <span class="rating_star">★★★★★</span>
                    <input v-model="rating" type="range" step="1" min="0" max="5" />
                </div>
            </div>
            <div class="input-wrapper">
                <textarea
                    v-model="reviewText"
                    type="text"
                    placeholder="내용을 작성해주세요"
                    @focus="onTextareaFocus"
                    @blur="onTextareaBlur"
                />
            </div>
        </div>
        <div class="addReviewBtn" :class="{ small: isTextareaFocused }" @click="modalOn">
            <p>작성완료</p>
        </div>

        <review-modal id="reviewModal" style="display: none" :modal-off="modalOff" />
    </div>
</template>

<script>
import reviewModal from '@/components/review/review-modal'

export default {
    components: { reviewModal },
    props: ['shopInfo'],
    data() {
        return {
            isTextareaFocused: false,
            rating: 0,
            reviewList: [],
            reviewText: '',
            stars: [1, 2, 3, 4, 5],
            user: { name: '' },
            isMobile: /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
                navigator.userAgent
            ),
        }
    },
    computed: {},
    created() {
        // axios
        // 	.get(`https://jsonplaceholder.typicode.com/comments/`)
        // 	.then((res) => {
        // 		this.users = res.data[0].name;
        // 		console.log(`res.data=${JSON.stringify(res.data.name)}`);
        // 	})
        // 	.catch((error) => {
        // 		console.log(error);
        // 	});
    },
    mounted() {
        this.$emit('setTrigger', '/review')

        // 별점
        const rating_input = document.querySelector('.rating input')
        const rating_star = document.querySelector('.rating_star')

        if (rating_input) {
            rating_input.addEventListener('input', () => {
                rating_star.style.width = `${rating_input.value * 20}%`
            })
        }
    },
    methods: {
        goBack() {
            this.$router.go(-1)
        },
        submitReview() {
            axios
                .post('https://jsonplaceholder.typicode.com/comments/', {
                    reviewText: this.reviewText,
                    rating: this.rating,
                    timestamp: new Date(),
                    user: this.user.name,
                })
                .then((res) => {
                    console.log('리뷰작성완료')
                    this.updateReviewList(`res.data = ${JSON.stringify(res.data)}`)
                })
                .catch((error) => {
                    console.log(error)
                })

            // this.goReview();
        },
        goReview(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/review' : '/error'
            this.$router
                .push({
                    path: path,
                    query: { companyCode: code },
                })
                .catch(() => {})
        },
        updateReviewList(reviewData) {
            this.reviewList.push(reviewData)
            console.log('리뷰 리스트 업데이트: ', reviewData)
        },
        modalOn() {
            const modal = document.getElementById('reviewModal')
            modal.style.display = 'flex'
            // this.modalVisible = true;
            // scrollOff();

            this.submitReview()
        },
        modalOff() {
            const modal = document.getElementById('reviewModal')

            modal.style.display = 'none'

            document.querySelector('.modal_window_inner').scrollTo(0, 0)

            // scrollOn();
            // this.modalVisible = false;
            this.goReview()
        },
        onTextareaFocus() {
            if (this.isMobile) {
                this.isTextareaFocused = true
            }
        },
        onTextareaBlur() {
            if (this.isMobile) {
                this.isTextareaFocused = false
            }
        },
    },
}
</script>

<style></style>
