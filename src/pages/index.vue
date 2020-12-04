<template>
    <div class="container">
       <router-link :to="{path:'/'}" tag="a">home</router-link>
        <router-link :to="{path:'/login'}" tag="a">login</router-link>
        <router-link :to="{path:'/risk'}" tag="a">risk</router-link>
        <div>日期选择</div>
    </div>
        
    
</template>
<script>

export default {
    
}
</script>

<style>
    .container {
        font-size: 32px;
        color:blue;
    }
</style>
