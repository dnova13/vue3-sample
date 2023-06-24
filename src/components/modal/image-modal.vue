<template>
    <div id="img-modal" class="modal_overlay" style="display: none">
        <div
            class="modal_window"
            style="max-width: 380px"
            :style="{
                height: title || content ? '70vh' : 'auto',
            }"
            @click="modalOff"
        >
            <div class="close_area" @click="modalOff">
                <img src="@img/modal_close_btn.png" alt="" />
            </div>
            <div class="modal_window_inner">
                <!--
                        <div class="content">
                            <img :src="originImage">
                        </div>
                    -->
                <div class="content">
                    <div class="modal_title">{{ title }}</div>
                    <img :src="originImage" />
                    <div class="modal_content">{{ content }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { changeImgUrl, scrollOn, scrollOff } from '@/utils/function.js'

// 원산지 목록
export default {
    // height: auto;
    props: ['originImage', 'title', 'content'],
    data() {
        return {}
    },
    created() {},
    mounted() {},
    beforeUpdate() {},
    methods: {
        modalOff() {
            const modal = document.getElementById('img-modal')
            modal.style.display = 'none'

            scrollOn()
        },
    },
}
</script>

<style></style>
