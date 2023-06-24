<!-- // MyReviewComp -->

<template>
    <!--내 리뷰-->
    <div class="my-review">
        <ul class="content-list">
            <li v-for="(user, idx) in paginatedUsers" :key="user.id" class="content">
                <span>
                    {{ user.id }}, {{ user.name }}
                    <p>{{ timeStamp(user.timestamp) }}</p>
                </span>
                <span>⭐️</span>
                <span>{{ user.body }}</span>
            </li>
        </ul>
        <!-- 페이지네이션 -->
        <div v-if="pageCount > 1" class="pagination">
            <button :disabled="currentPage === 1" @click="previousPage">&lt;&lt;</button>
            <span v-for="pageNumber in visiblePageNumbers" :key="pageNumber">
                <button
                    class="paginationBtn"
                    :class="{ active: pageNumber === currentPage }"
                    @click="goToPage(pageNumber)"
                >
                    {{ pageNumber }}
                </button>
            </span>
            <button :disabled="currentPage === pageCount" @click="nextPage">>></button>
        </div>
    </div>
</template>

<script>
export default {
    props: ['shopInfo'],
    data() {
        return {
            users: [],
            currentPage: 1,
            pageSize: 10,
        }
    },
    computed: {
        // 페이지네이션
        paginatedUsers() {
            const startIndex = (this.currentPage - 1) * this.pageSize
            const endIndex = startIndex + this.pageSize
            return this.users.slice(startIndex, endIndex)
        },
        pageCount() {
            return Math.ceil(this.users.length / this.pageSize)
        },
        visiblePageNumbers() {
            const currentPageIndex = this.currentPage - 1
            const startPageIndex = Math.max(0, currentPageIndex - 2)
            const endPageIndex = Math.min(startPageIndex + 4, this.pageCount - 1)
            return Array.from(
                { length: endPageIndex - startPageIndex + 1 },
                (_, index) => startPageIndex + index + 1
            )
        },
        // 리뷰 작성일
        timeStamp() {
            return (timestamp) => {
                const today = new Date()
                const createdAt = new Date(timestamp)

                const diffTime = Math.abs(today - createdAt)
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

                if (diffDays === 0) {
                    return '오늘'
                } else if (diffDays === 1) {
                    return '어제'
                } else {
                    return `${diffDays - 1}일 전`
                }
            }
        },
    },
    created() {
        axios
            .get('https://jsonplaceholder.typicode.com/comments?_limit=20')
            .then((res) => {
                this.users = res.data.reverse()
                console.log('res = ', res)
            })
            .catch((error) => {
                console.log(error)
            })
    },
    methods: {
        // 페이지네이션
        previousPage() {
            if (this.currentPage > 1) {
                this.currentPage--
            }
        },
        nextPage() {
            if (this.currentPage < this.pageCount) {
                this.currentPage++
            }
        },
        goToPage(pageNumber) {
            if (pageNumber >= 1 && pageNumber <= this.pageCount) {
                this.currentPage = pageNumber
            }
        },
    },
}
</script>

<style></style>
