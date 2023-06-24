<!-- 대표 및 점주 등 소개 view -->

<template>
    <div class="sub_content chef">
        <div class="inner_container">
            <div
                class="chef_img_wrap"
                :style="{
                    background:
                        'no-repeat url(' + changeImgUrl(introInfo?.mainImage) + ') center bottom / cover',
                }"
            ></div>
            <div class="chef_about">
                <h6 class="restaurant_name">
                    {{ shopInfo.companyName }}
                </h6>
                <h2 class="chef_name">
                    {{ personName }}
                </h2>
                <p class="desc" v-html="handleNewLine(introInfo?.story)"></p>
            </div>
            <div intro-image-wrap>
                <template v-for="(item, idx) in introInfo.otherImages" :key="idx">
                    <div class="intro-image">
                        <img :src="changeImgUrl(item)" />
                    </div>
                </template>
            </div>
        </div>
    </div>
    <!-- <img :src="changeImgUrl(introInfo?.mainImage)" class="chef_img"></img> -->
</template>

<script>
import { handleNewLine, changeImgUrl } from '@/utils/function.js'

export default {
    props: ['menuList', 'shopInfo'],
    data() {
        return {
            companyInfo: [],
            introInfo: null,
            personName: null,
        }
    },
    created() {
        switch (this.$route.path) {
            case '/boss':
                this.introInfo = this.shopInfo?.shopInfo?.bossInfo
                this.personName = this.introInfo?.name + ' 점주님'
                break
            case '/ceo':
                this.introInfo = this.shopInfo?.shopInfo?.ceoInfo
                this.personName = this.introInfo?.name + ' 대표님'
                break
            default:
                break
        }
    },
    mounted() {
        this.$emit('setTrigger', '/chef')
    },
    methods: {
        changeImgUrl(_img) {
            console.log(_img)
            return changeImgUrl(_img)
        },
        handleNewLine(str) {
            // str = '"' + str + '"';
            return handleNewLine(str)
        },
    },
}
</script>

<style></style>
