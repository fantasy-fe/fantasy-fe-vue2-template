<template>
    <div id="app">
        <keep-alive>
            <router-view class="router-view" :key="generateKey"></router-view>
        </keep-alive>
    </div>
</template>
<style lang="scss">
@import "./styles/app.scss";
.router-view {
    min-height: 100%;
    height: 100%;
}
</style>
<script type="text/ecmascript-6">
export default {
    computed : {
        generateKey () {
            return this.$route.name != undefined ? this.$route.name + new Date(): this.$route + new Date()
        }
    }
}
</script>