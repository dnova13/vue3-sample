<!-- /* 홈 처음 화면 view, and 주재료 페이지 */ -->

<template>
    <origin-detail
        :menuInfo="menuInfo"
        :mainOriginList="mainOriginList"
        :shopInfo="shopInfo"
        :menuList="menuList"
    >
    </origin-detail>
</template>

<script>
import originDetail from '@/components/origin-detail.js'
import {
    callAjax,
    getQueryStringObject,
    scrollTo,
    scrollOn,
    scrollOff,
} from '@/utils/function.js'
import { _xurl } from '@/localSettings.js'

let urlOriginList = _xurl.origin_list

export default {
    props: [
        'menuList',
        'mainOriginList',
        'menuInfo',
        'shopInfo',
        // 'mainOriginDetailList'
    ],
    data() {
        return {
            originList: [],
            companyInfo: null,
        }
    },
    created() {
        this.companyCode = this.$route.query.companyCode
        this.productCode = this.$route.query.productCode
        this.idx = this.$route.query.idx
    },
    mounted() {
        document.querySelector('header').classList.add('fixed_noshadow')
        scrollOff()

        this.$emit('setTrigger', '/base')
    },
    methods: {},
}
</script>
