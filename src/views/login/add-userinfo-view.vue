<template>
    <addUserInfo />
</template>

<script>
import addUserInfo from '@/components/login/add-userinfo'

export default {
    components: {
        addUserInfo,
    },
    data() {
        return {}
    },
    computed: {},
    created() {
        console.log(this.$route)
    },
    mounted() {
        this.$emit('setTrigger', '/login')
    },
    methods: {},
}
</script>

<style></style>
