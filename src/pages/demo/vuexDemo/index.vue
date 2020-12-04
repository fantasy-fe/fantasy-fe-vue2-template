<template>
    <div class="container">
        <nav>
            <a>首页</a> >> <a>个人信息</a>
        </nav>
        <div>
            Count: {{count}}
            <p>
                getCount: {{getCount}}
            </p>
            <button @click="handleAdd">+</button>
            <button @click="handleAsyncAdd">delay + </button>
        </div>
        <div>
            <div class='tit'>
                <span class="col1">id</span>
                <span class="col2">name</span>
                <span class="col3">price</span>
            </div>
            <ul class="listContainer">
                <li v-for="item in prodList" :key="item.id">
                    <span class="col1">{{item.id}}</span>
                    <span class="col2">{{item.name}}</span>
                    <span class="col3">{{item.price}}</span>
                    <span class="col4"><span class="btn" @click="handleDetail(item.id)">detail</span></span>
                </li>
            </ul>
        </div>
        
    </div>
</template>

<script>
import {
    mapState,
    mapGetters,
    mapActions
} from 'vuex';

export default {

    computed : {
        ...mapGetters([
            'getProdList'
        ]),
        getCount (){
            console.info('getCount');
            console.info(this);
            console.info(this.count)
            return this.count;
        },
        ...mapState({
        prodList: (state) => state.product.prodList,
        
        count(state) {
                //console.info(this.count);
                return state.product.count
            }
        })
        
        
    },

    data () {
        return {
            a: "Vue.js",
            list: [],
        }
    },
    beforeRouteEnter(to, from, next) {
        next((vm) => {
            console.info('beforeRouteEnter')
        });
    },
    beforeRouteLeave(to, from, next) {
        next((vm) => {
            console.info('beforeRouteLeave')
        });
    },

    beforeCreate: function() {
        console.log("创建前");
    },
    created: function() {
        console.log("创建之后");
        this.$store.dispatch('queryCityList')
    },
    beforeMount: function() {
        console.log("mount之前")
    },
    mounted: function() {
        console.log("mount之后")
        console.info(this.$store.state);
        this.fetchData();
    },
    beforeUpdate: function() {
        console.log("更新前");
    },
    updated: function() {
        console.log("更新完成");
    },
    beforeDestroy: function() {
        console.log("销毁前");
    },
    destroyed: function() {
        console.log("已销毁");
    },
    methods: {
        ...mapActions([
            'queryProdList',
            'setProductInfo',
            'queryCityList',
            'addCount',
            'addAsyncAddCount'
        ]),
        async fetchData () {
            const data = await this.queryProdList();
            console.info(data);
            //this.list = data;
        },
        handleAdd(){
            console.info('handleAdd');
            this.addCount();
        },
        handleAsyncAdd(){
            this.addAsyncAddCount();
        },
        handleDetail (id) {
            /* console.info('getProdList: ', this.getProdList);
            this.detailInfo = this.list.filter((item) => { return item.id === id})[0];
            console.info(this.detailInfo);
            if( Object.keys(this.detailInfo).length > 0) {
                this.showDetail = true;
            } else {
                this.showDetail = false;
            } */
            let productInfo = this.list.filter((item) => { return item.id === id})[0];
            console.info(productInfo)
            //this.setProductInfo({id:1,name:'sss',price:100});
            this.setProductInfo(productInfo)
            
            this.$router.push({
                path: '/vuedemo/detail',
                query: {
                    id
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        margin:10px;
        background-color: #f5f5f5;

        
    }
    button {
        padding: 5px;
    }
    .wrapper{
            width: 100%;
    }

    .listContainer, .tit{
        width: 100%;
        padding: 10px;
        li{
            width:100%;
        }
        span{
            display: inline-block;
        }

        span.col1{
            width: 20%;
            text-align: left;
        }
        span.col2{
            width: 40%;
        }
        span.col3 {
            width: 20%;
            text-align: center;
        }
        span.col4 {
            width: 15%;
            text-align: center;
        }
        .btn {
            
        }
    }
</style>
