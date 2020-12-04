<template>
    <div>
    <page-header v-if="showHeader" title="银行卡列表"></page-header>
        <div class="container">
            <div v-if="this.showList ===1" class="list">
                <div class="item">
                    <p class="title">
                        <span v-text="cardInfo.bankName"></span>
                        <span class="icon">当前还款卡</span>
                    </p>
                    <p class="txt">
                        <span v-text="cardInfo.bankCard"></span>
                    </p>
                    <p>
                        <button class="btnchange" @click="doChange()">换卡</button>
                    </p>
                </div>
            </div>
        </div>
        <blank v-if="this.showList ===0" :fromUrl="fromUrl" :saleOrderNo="saleOrderNo"/>
    </div>
</template>

<script>
import PageHeader from '@/components/common/header'
import Blank from '@/components/blank/blank'
import { util,storage} from '@/utils'
import bankcardAPI from '@/api/bankcard'
import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
    data() {
        return {
            showHeader:0,
            showList: '',
            cardInfo: '',
            fromUrl: ''
            // uid: this.$route.query.uid,
            // fundsSource : this.$route.query.fundsSource 
        }
    },
    components: {
        PageHeader,
        Blank
    },

    mounted() {
        console.info(location.href);
        this.queryString = this.$route.params.query
        this.uid = this.$route.query.uid;  //用户ID
        this.loanApplyNo = this.$route.query.loanApplyNo;   //闪贷订单号
        this.fundsSource = this.$route.query.fundsSource ; 
        this.saleOrderNo = this.$route.query.saleOrderNo ;  //买买车销售单号
        this.protocolowner = this.$route.query.protocolowner;
        this.fromUrl = this.$route.query.fromUrl;
        // if(typeof this.$route.query.osType === 'string'){
        //     this.osType = this.$route.query.osType;
        // } else if(typeof this.$route.query.osType === 'object') {
        //     this.osType = this.$route.query.osType[0]
        // }
        // if(typeof this.$route.query.ip === 'string'){
        //     this.ip = this.$route.query.ip;
        // } else if(typeof this.$route.query.ip === 'object') {
        //     this.ip = this.$route.query.ip[0]
        // }
        this.osType = this.$route.query.osType;       //操作系统（微众必填）
        this.ip	= this.$route.query.ip;               //ip地址（微众必填）
        this.fetchData()
    },
    methods: {
        ...mapActions([
            'setCardInfo'
        ]),
        fetchData () {
            if(!this.uid) {
                this.$dialog.toast('缺少用户id');
            }else{
                let params ={
                    "loanApplyNo": this.loanApplyNo,  //闪贷订单号
                    "saleOrderNo":this.saleOrderNo   //买买车订单号
                }

                bankcardAPI.queryCollectionBankList(params, (data) => {
                    if(!data && util.isEmptyObject(data)) {
                        this.showList = 0;
                    }else {
                        this.showList = 1;
                        this.cardInfo = data;
                        if(this.cardInfo.bankCard)
                        this.cardInfo.bankCard = this.cardInfo.bankCard.replace(/(.{4})/g, "$1 ");
                        this.setCardInfo(data);
                    }
                }, (errMsg) => {
                    this.showList =0;
                })
            }
        },
        doChange () {
            // var cardInfo = this.cardList;
            // var cardInfo = this.cardList.filter((item)=>{return item.memberId === id;})[0];
            //this.setCardInfo(this.cardInfo);
            //storage.setSession('cardInfo',this.cardInfo);
            this.$router.push({
                name: "updateBankCard",
				query: this.$route.query
            }) 
        }
    }
}
</script>

<style lang="scss" scoped>
    .container {
        margin: auto;
        margin-top: 30px;
        .list {
            padding: 0 30px;
            .item{
                width: 100%;
                height: 400px;
                box-shadow: 0 4px 4px 0 rgba(0,0,0,0.05);
                background-color: #fff;
                margin: auto;
                .title {
                    background-image: linear-gradient(90deg, #E81747 100%, #A80027 0%);
                    border-top-left-radius: 20px;
                    border-top-right-radius: 20px;
                    height:118px;
                    line-height: 118px;
                    font-size: 36px;
                    color:#fff;
                    padding-left:60px;
                }
                .icon {
                    float: right;
                    background: rgba(255,255,255,0.30);
                    width:140px;
                    height:38px;
                    line-height:38px;
                    margin-top: 40px;
                    margin-right: 40px;
                    text-align: center;
                    border-radius: 5px;
                    font-size:24px;
                }
                .txt{
                    margin-top:60px;
                    height:120px;
                    line-height: 120px;
                    margin-left:60px;
                    color:#333;
                    font-size: 36px;
                }
                .btnchange {
                    width:160px;
                    height:70px;
                    background: #28292D;
                    border-radius: 17.5px;
                    color:#fff;
                    float: right;
                    margin-right: 40px;
                    font-size:24px;
                }
            }
        }
        .noResult{
            padding: 0;
        }
    }
</style>
