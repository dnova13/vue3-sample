<!-- /* 
    원산지(origin) 페이지 view 
*/ -->
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
import originDetail from '@/components/origin/origin-detail'
import { callAjax, getQueryStringObject, scrollTo } from '@/utils/function.js'
import { _xurl } from '#/localSettings.js'

let urlOriginList = _xurl.origin_list

export default {
    components: {
        originDetail,
    },
    props: [
        'menuList',
        'mainOriginList',
        'menuInfo',
        'shopInfo',
        // 'mainOriginDetailList'
    ],
    // :mainOriginDetailList="mainOriginDetailList"
    data() {
        return {
            originList: [],
            companyInfo: null,
        }
    },
    created() {
        // console.log('abc', this.menuInfo);
        this.companyCode = this.$route.query.companyCode
        this.productCode = this.$route.query.productCode
        this.idx = this.$route.query.idx
    },
    mounted() {
        this.$emit('setTrigger', '/origin')
    },
    methods: {},
}
</script>

<style></style>
