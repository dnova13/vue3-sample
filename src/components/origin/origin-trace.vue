<template>
    <section class="ingredient_detail">
        <div class="inner_container">
            <div class="update-date">업데이트 : {{ getUpdateDate(subCode) }}</div>
            <template v-for="(item, idx) in traceList" :key="idx">
                <div class="process">
                    <h4 class="process_title">{{ item.stepType }}</h4>
                    <div id="process_wrap" class="process_wrap">
                        <div class="img_wrap process_img_wrap">
                            <img :src="changeTraceImgUrl(item.picSrc[0], idx)" alt="" />
                        </div>
                        <button v-if="item.docSrc.length > 0" class="document_btn">
                            증빙서류 보기
                            <input type="checkbox" class="switch" />
                        </button>
                    </div>
                    <div class="swiper-container document_list">
                        <div class="swiper-wrapper">
                            <template v-for="(doc, idx) in item.docSrc" :key="idx">
                                <div v-if="typeof doc === 'string'" class="swiper-slide">
                                    <div class="img_wrap document">
                                        <div
                                            class="box"
                                            :style="{
                                                'background-image': 'url(' + changeImgUrl(doc) + ')',
                                                top: '30px',
                                                position: 'relative',
                                            }"
                                            @click="imgModalOn(changeImgUrl(doc))"
                                        ></div>
                                        <div
                                            class="zoom-in-wrap"
                                            @click.capture="imgModalOn(changeImgUrl(doc))"
                                        >
                                            <img class="zoom-in-icon" src="@img/pluse_btn.png" />
                                        </div>
                                    </div>
                                </div>
                                <div v-else-if="typeof doc === 'object'" class="swiper-slide">
                                    <p class="img_title">{{ doc.title }}</p>
                                    <div class="img_wrap">
                                        <div class="box test" @click="imgModalOn(doc)">
                                            <img class="test-img" :src="changeImgUrl(doc.image)" />
                                        </div>
                                        <div class="zoom-in-wrap" @click.capture="imgModalOn(doc)">
                                            <img
                                                :style="{ bottom: '2.5vh' }"
                                                class="zoom-in-icon"
                                                src="@img/pluse_btn.png"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </div>
                        <div class="swiper-button-next"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-pagination"></div>
                    </div>
                </div>
            </template>
        </div>
    </section>
</template>

<script>
import { changeImgUrl } from '@/utils/function.js'

export default {
    props: ['traceInfo', 'subCode', 'checkPoint'],
    data() {
        return {
            trarceInfo: null,
            fresh: undefined,
            companyInfo: {},
            traceList: [],
        }
    },
    computed: {
        // pointer() {
        //     if (window.PointerEvent) return true;
        //     else return false;
        // },
    },

    watch: {},
    created() {
        for (let item of this.traceInfo) {
            if (item.stepTypeCode === 'ST01') this.traceList[0] = item
            else if (item.stepTypeCode === 'ST03') this.traceList[1] = item
            else if (item.stepTypeCode === 'ST02') this.traceList[2] = item
        }
    },
    mounted() {
        /*         const imgTitles = document.querySelectorAll('.img_title');
        console.log("imgTitle",imgTitles)
        // Array.from(imgTitles).forEach((title) => {
        imgTitles.forEach((title) => {
            const nextElement = title.nextElementSibling;
            if (nextElement) {
                const zoomInWrap = nextElement.querySelector('.zoom-in-wrap');
                if (zoomInWrap) {
                    zoomInWrap.style.bottom = '2.5vh';
                }
            }
        })
 */
    },
    methods: {
        // trace image url 변경 함수
        changeTraceImgUrl(_img, idx) {
            // console.log(idx)
            // console.log(this.traceInfo[idx].docSrc)

            if (!_img && this.traceInfo[idx].docSrc.length > 0) {
                return process.env.VUE_APP_BASE_URL + 'img/prepare.png'
            }

            return changeImgUrl(_img)
        },
        // 공통 image url 변경 함수
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },

        // image 확대 모달 창 on
        /*
        YJ SEOL 230510 데이터 타입에 따라 랜더링 결과 변경을 위해 로직 수정
        imgModalOn(item) {
            this.$emit('imgModalOn', item);
            console.log(`item=${item}`);
        },
        */
        imgModalOn(item) {
            if (typeof item === 'string') {
                this.$emit('imgModalOn', item)
            } else if (typeof item === 'object') {
                const { title, image, content } = item
                this.$emit('imgModalOn', {
                    title,
                    image: this.changeImgUrl(image),
                    content,
                })

                // console.log(`item.title = ${title}`);
                // console.log(`item.image = ${image}`);
                // console.log(`item.content = ${content}`);
            }
        },
        getUpdateDate(subCode) {
            if (!subCode) return '2023.03'
            else {
                subCode = subCode.replace('DT', '')
                return `${subCode.substr(0, 4)}.${subCode.substr(4, 2)}`
            }
        },
    },
}
</script>

<style></style>
