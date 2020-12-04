<template>
    <div>
        <ul>
            <li><router-link tag="a" @click="handleUserInfo">getUserInfo</router-link></li>
            <li><router-link tag="a" @click="handleDeviceId">getDeviceId</router-link></li>
            <li><router-link tag="a" @click="handleLocation">getLocation</router-link></li>
        </ul>
    </div>
</template>

<script>
    import bridgeUtil from "utils/JsBridgeUtil.js";
    export default {
        data () {},
        created() {
            console.log('created');
        },
       mounted () {
           console.log('mounted');
       } ,
       methods: {
           handleUserInfo () {
               
           },

           handleDeviceId () {
               bridgeUtil.getDeviceId().then((data) => {
                   console.info(data);
               })
           },

           handleLocation () {

           }
       }
    }
</script>

<style>

</style>
