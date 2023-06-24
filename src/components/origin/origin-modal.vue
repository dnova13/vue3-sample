<template>
    <div id="modal" class="modal_overlay" style="display: none">
        <template v-if="checkPoint?.name === '방사선'">
            <radiation :checkPoint="checkPoint" :changeImgUrl="changeImgUrl" :modalOff="modalOff" />
        </template>
        <template v-else-if="checkPoint?.name === '푸드마일리지'">
            <food-mileage :checkPoint="checkPoint" :changeImgUrl="changeImgUrl" :modalOff="modalOff" />
        </template>
    </div>
</template>

<script>
import { changeImgUrl, scrollOn, scrollOff } from '@/utils/function.js'
import radiation from '@/components/origin/radiation'
import foodMileage from '@/components/origin/food-mileage'

// 원산지 목록
export default {
    components: {
        radiation,
        foodMileage,
    },
    props: ['checkPoint'],
    data() {
        return {
            categoryList: [],
        }
    },
    created() {},
    mounted() {
        /*방사선 정보 modal*/
        const modal = document.getElementById('modal')

        function isModalOn() {
            return modal.style.display === 'flex'
        }

        modal.addEventListener('click', (e) => {
            const evTarget = e.target

            if (evTarget.classList.contains('modal_overlay')) {
                this.modalOff()
            }
        })
    },
    methods: {
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        // /relatedMenu path 로 이동
        goOriginFood(productCode) {
            this.$router
                .push({
                    path: `/relatedMenu`,
                    query: {
                        companyCode: this.$route.query.companyCode,
                        productCode: productCode,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
        // 모달 창 닫기
        modalOff() {
            const modal = document.getElementById('modal')
            modal.style.display = 'none'

            document.querySelector('.modal_window_inner').scrollTo(0, 0)

            scrollOn()
        },
    },
}
</script>

<style></style>
