<template>
<div>
    <page-header v-if="showHeader" :title="title"></page-header>
    <div class="container">
        <ul>
            <li class="row" v-show="!this.doSelectFlag">
                <span class="note">支持以下银行借记卡</span>
            </li>
            <li class="item" v-for="(item) in this.bankList" :key="item.bankId" @click="doSelect(item)">
                <img :src="item.bankIcon" alt="">
                <span v-text="item.bankName"></span>
            </li>
        </ul>
        <div v-show="!this.doSelectFlag">
            <a data-position="fixed" @click="handleClose" class="btn-fixed">关闭</a>
        </div>
    </div>
</div>
</template>

<script>
import PageHeader from '@/components/common/header'
import { storage } from '@/utils'
import bankcardAPI from '@/api/bankcard'

export default {
    props: {
        fundsSource: {
            type: String
        },
        doSelectFlag:{
            type: Boolean
        },
        type:{
            type: String
        }
    },
    components: {
        PageHeader
    },
    data () {
        return {
            title:"银行列表",
            showHeader:0,
            showTitle: 1,
            bankList: []
        }
    },
    mounted () {
        
    },
    methods : {
        /**
         * 查询支持托收的银行卡，点击关闭隐藏当前组件
         */
        fetchData () {
            let params = {
                type :this.type,
                fundsSource:this.fundsSource
            };
            bankcardAPI.getAuthorizeBank(params, (data) => {
                this.bankList = data.map(item => {
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
                this.$emit('data-ready');
            }, (errMsg) => { })
            
        },
        doSelect(item) {
            if(!this.doSelectFlag) return false;
            let bankCardInfo = {}
            //将选择的银行的code和name赋值给银行卡信息bankCardInfo
            bankCardInfo.bankCode = item.bankCode;
            bankCardInfo.bankName = item.bankName;
            this.$emit('data-selected', bankCardInfo);
        },
        handleClose(){
            this.$emit('closeBankList');
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
        .row{
            background-color: #F5F5F5;
            height: 90px;
            .note{
                line-height: 90px;
                padding-left: 30px;
                font-size: 24px;
                color: #999;
            }
        }
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
