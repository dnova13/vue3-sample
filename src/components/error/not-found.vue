<template>
    <div id="notfound">
        <div class="notfound">
            <div class="notfound-404">
                <h1>4<span></span>4</h1>
            </div>
            <h2>Page Not Be Found</h2>
        </div>
    </div>
</template>

<script>
export default {
    // <a style="color: #fff;" @click="goHome()">Back to homepage</a>
    // <p>Sorry but the page you are looking for does not exist, have been removed. name changed or is temporarily unavailable</p>
    data() {
        return {}
    },
    created() {
        console.log('AAAAAAAAAAA')
    },
    mounted() {
        this.$emit('setTrigger', '/404')
    },
    methods: {
        goHome(companyCode) {
            let code = companyCode || this.$route.query.companyCode
            let path = code ? '/' : '/error'

            this.$router
                .push({
                    path: path,
                    query: {
                        companyCode: code,
                        l: this.$route.query.l,
                    },
                })
                .catch(() => {})
        },
    },
}
</script>
