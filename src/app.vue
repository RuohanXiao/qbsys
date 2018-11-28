<style scoped>
    @import 'styles/common.css';
</style>
<template>
    <div>
        <router-view></router-view>
    </div>
</template>
<script>

    import store from './store'
    export default {
        data () {
            return {}
        },
        store,
        mounted () {

        },
        beforeDestroy () {

        },
        methods: {

        }
    }
</script>
