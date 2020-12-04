<template>
<div>
    <page-header v-if="showHeader" title="银行卡列表"></page-header>
    <div class="container">
        <ul>
            <li class="item" v-for="(item) in this.bankList" :key="item.bankId" @click="doSelect(item)">
                <img :src="item.bankIcon" alt="">
                <span v-text="item.bankName"></span>
            </li>
        </ul>
    </div>
</div>
</template>

<script>

import PageHeader from '@/components/common/header'
import { storage } from '@/utils'
export default {
    components: {
        PageHeader
    },
    data () {
        return {
            showHeader:0,
            showTitle: 1,
            bankList: [],
            backUrl: '' ,
            path: '',
            q:'',
            type:'',
            fundsSource:''
        }
    },
    mounted () {
        //页面的跳转路径
        this.path = this.$route.query.path;
        this.q = decodeURIComponent(this.$route.query.q);
        this.backUrl = this.path + this.q;
        this.type = this.$route.query.type;
        this.fundsSource = this.$route.query.fundsSource;
        //console.info('fromurl');
        //console.info(this.$route.query.fromUrl);
        //console.info(this.fromUrl);
        this.fetchData();
    },
    methods : {
        /**
         * 查询全量银行，点击返回选择的银行
         */
        fetchData () {
            if(this.type == "xj" ){
                this.$axios.api('/resource/mwap/fcar/mmcnew/xiaojin/getAllBankList').then((data) => {
                console.info(data);
                if(data.status === 0 && data.mapiStatus === 'SUCCESS') 
                    // this.bankList = data.re;
                    this.bankList = data.re.map(item => {
                        var img = null;
                        try {
                            img = require(`../../../images/${item.bankCode}.png`);
                        } catch (err) {
                            img = require('../../../images/default.png');
                        }
                        return{
                            bankName:item.bankName,
                            bankCode:item.bankCode,
                            bankIcon:img
                        }
                    })
                }) 
            }else{
                this.$axios.api('/resource/mwap/fcar/mmcnew/getBankList',{"fundsSource" : this.fundsSource}).then((data) => {
                console.info(data);
                if(data.status === 0 && data.mapiStatus === 'SUCCESS') 
                    // this.bankList = data.re;
                    this.bankList = data.re.map(item => {
                        var img = null;
                        try {
                            img = require(`../../../images/${item.bankCode}.png`);
                        } catch (err) {
                            img = require('../../../images/default.png');
                        }
                        return{
                            bankName:item.bankName,
                            bankCode:item.bankCode,
                            bankIcon:img
                        }
                    })
                })
                }
        },
        doSelect(item) {
            //保存携带的银行卡号
            console.info('tmpBankCard:' ,storage.getSession('tmpBankCard'));
            let bankCardInfo = storage.getSession('tmpBankCard')
            //将选择的银行的code和name赋值给银行卡信息bankCardInfo
            bankCardInfo.bankCode = item.bankCode;
            bankCardInfo.bankName = item.bankName;
            //将选择的银行信息通过tmpBankCard带回
            storage.setSession('tmpBankCard', bankCardInfo)
            if(this.backUrl) {
                //location.href = this.fromUrl;
                this.$router.replace({
                    path: this.backUrl
                })
            }else {
                this.$router.go(-1);
            }
            
        }
    }
}
</script>

<style lang="scss" scoped>

    .container {
        //margin-top: 90px;
        min-height: 100%;
        position: relative;
        color: #333333;
        font-size: 28px;
        background-color:#fff;
        .item{
            margin-left: 30px;
            padding: 2px 30px 2px 0;
            min-height: 90px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            position: relative;
            border-bottom: 1PX solid #ececec;
            span{
                margin-left:20px;
            }
        }
    }
</style>
