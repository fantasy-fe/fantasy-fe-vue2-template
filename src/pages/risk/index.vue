<template>
    <div class="container">
        <ul>

        <li><router-link tag="a" :to="{name: 'identityCheck'}">身份验真</router-link></li>

        <li><router-link tag="a" :to="{name: 'webankRisk'}">微众风控</router-link></li>

        <li><router-link tag="a" :to="{name: 'spdbRisk'}">浦发风控</router-link></li>

        <li><router-link tag="a" :to="{name: 'BankCardList'}">更换托收银行卡</router-link></li>

        <li><router-link tag="a" :to="{name: 'loanApply'}">消费金额申请</router-link></li>

        <li><router-link tag="a" :to="{name: 'userInfo'}">授信申请</router-link></li>

        <li><router-link tag="a" :to="{name: 'cashOut'}">申请提现</router-link></li>
        
        <li><router-link tag="a" :to="{name: 'pdfdemo'}">pdfDemo</router-link></li>
        
        </ul>
    </div>
</template>

<script>
export default {
    
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    .container {
        font-size: 24px;
        color:blue;
        padding: 10px;
        ul{
            margin-top: 100px;
            li{
                font-size: 32px;
                margin: 10px 0px;
            }
        }
    }
</style>
