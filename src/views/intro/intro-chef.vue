<!-- /* 셰프 소개 view */ -->
<template>
    <div class="sub_content chef">
        <div class="inner_container">
            <div
                class="chef_img_wrap"
                :style="{
                    background:
                        'no-repeat url(' + changeImgUrl(shopInfo.chefImage[0]) + ') center bottom / cover',
                }"
            ></div>
            <div class="chef_about">
                <h6 class="restaurant_name">
                    {{ shopInfo.companyName }}
                </h6>
                <h2 class="chef_name">
                    {{ shopInfo.chefInfo.chefName }}
                </h2>
                <p class="desc" v-html="handleNewLine(shopInfo.chefInfo.chefStory)"></p>
                <p class="desc" v-html="handleNewLine(shopInfo.chefInfo.chefCareer)"></p>
            </div>
        </div>
    </div>
    <!-- <img :src="changeImgUrl(shopInfo.chefImage[0])" class="chef_img"></img> -->
</template>

<script>
import { handleNewLine, changeImgUrl } from '@/utils/function.js'

export default {
    props: ['menuList', 'shopInfo'],
    data() {
        return {
            categoryList: [],
            companyInfo: [],
        }
    },
    mounted() {
        this.$emit('setTrigger', '/chef')
    },
    methods: {
        changeImgUrl(_img) {
            return changeImgUrl(_img)
        },
        handleNewLine(str) {
            return handleNewLine(str)
        },
    },
}
</script>

<style></style>
