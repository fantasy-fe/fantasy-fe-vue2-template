<template>
  <div>
    <div v-show="!submitSuccess && !showBankList">
        <page-header v-if="showHeader" :title="title"></page-header>
        <div class="container">
          <ul class="fieldset">
            <li class="legend">
              <span class="name">当前还款卡</span>
              <div class="con">
                <span>{{this.cardInfo.bankCard}}</span>
              </div>
            </li>
            <li class="legend"> 
              <span class="name">姓名</span>
              <div class="con">
                <span>{{this.cardInfo.name}}</span>
              </div>
            </li>
            <li class="legend">
              <span class="name">借记卡号</span>
              <div class="con">
                <span v-show="this.isReadOnly">{{cardInfo.bankCardNo}}</span>
                <input v-show="!this.isReadOnly" class="input" v-model="cardInfo.bankCardNo" :readonly="this.isReadOnly" @input="handleChangeCard(cardInfo.bankCardNo)" maxlength="20" placeholder="请输入"/>
              </div>
            </li>
            <li class="legend">
                <span class="name">银行名称</span>
                <div class="con">
                    <span :class="{'defaultColor': !cardInfo.depositName}" :readonly="this.isReadOnly" @click="handleGetBankName" >{{cardInfo.depositName || "请选择 >"}}</span>
                </div>
            </li>
          </ul>
          <ul class="fieldset special">
              <div class="note">
                <span>仅支持储蓄卡，</span>
                <a @click="showBankTips" class="link">点此查看支持的银行列表</a>
              </div>
          </ul>
          <ul class="fieldset">
              <li class="legend">
                <span class="name">预留手机号</span>
                <div class="con">
                  <span v-show="this.isReadOnly">{{cardInfo.bankCardPhone}}</span>
                  <input class="input" v-show="!this.isReadOnly" v-model="cardInfo.bankCardPhone" @input="handleChangePhone(cardInfo.bankCardPhone)" :readonly="this.isReadOnly" maxlength="11" placeholder="请输入" />
                </div>
              </li>
              <li class="legend">
                <span class="name">验证码</span>
                <div class="con">
                  <input class="input" maxlength="6" @input="handleInput(cardInfo.verifycode)" placeholder="请输入6位验证码" v-model="cardInfo.verifycode"/>
                  <span class="code-split">|</span>
                  <span :class="{'send-code': this.isReadOnly }" @click="resendValidCode">{{codeText}}</span>
                </div>
              </li>
          </ul>
          <div class="remind" v-if="this.ReValidCodeStatus == 2">
            <img class="" src="../../../images/remind.png" alt="">
            <div class="color">请重新获取验证码</div>
          </div>
          <div v-if="this.fundsSource == 8" class="read-protocol">
              <span :class="{'check-box': true, 'checked': isRead}" @click="readCheck"></span>
              <span class="decs">我已阅读并同意<em class="protocol" @click="protocolLink()" >《委托扣款协议》</em></span>
          </div>
          <a data-position="fixed" @click="save()" class="btn-fixed">确认换卡</a>
        </div>
    </div>
    <div v-if="submitSuccess" class="succ">
          <img src="@/images/success.png">
          <p class="succ-title">更换成功</p>
          <p class="succ-hint">还款银行卡已成功更换为 <span>{{this.cardInfo.depositName}}</span> <span><em>(</em>{{this.cardInfo.bankCardNo}}</span><em>)</em>
          即时生效,请在扣款日前一天确保银行卡内余额充足</p>
          <a data-position="fixed" @click="back()" class="btn-fixed">好的</a>
    </div>
    <div>
      <bank-list ref="fetchBankList" @data-ready="this.dataReday" v-show="this.showBankList" :doSelectFlag="this.doSelectFlag" :fundsSource="this.fundsSource" @data-selected ="this.dataSelected" @closeBankList="this.closeBankList" ></bank-list> 
    </div>
  </div>
</template>

<script>
import {storage,util} from '@/utils'
import PageHeader from '@/components/common/header'
import BankList from '@/components/common/bankList/bankList'
import {bankcardNoRules,BankCardRules,validRules} from './rules'
import bankcardAPI from '@/api/bankcard'

import {
    mapGetters,
    mapActions
} from 'vuex';
export default {
  components: {
    PageHeader,
    BankList
  },
  data () {
    return {
      showHeader:0,
      submitSuccess: 0,
      showBankList: 0,
      protocolowner:'',
      fundsSource:'',
      title:'更换银行卡',
      cardInfo:{
        bankCard:'',
        name:'',
        identityNo:'',
        bankCardNo:'',
        bankName:'',
        depositName: '',
        bankCode:'',
        bankCardPhone:'',
        verifycode:'',
      },
      isRead: false,
      codeText: '免费获取',
      num:60,
      validCodeType:2,
      sendValidCodeFlag:false,
      hadSendValidCode: 0,
      appType: 'C',
      ReValidCodeStatus: 0,
      getBankNameFlag:true,
      choseBankNameFlag:false,
      identityType: '01',
      isReadOnly:false,  //不可编辑状态
      doSelectFlag:false,
    }
  },
  mounted () {
    this.uid = this.$route.query.uid,
    this.masterChannel = this.$route.query.masterChannel
    this.smsowner = this.$route.query.smsowner  //验证码的发送方 1 神舟 2 北京银行
    this.fundsSource = this.$route.query.fundsSource;
    this.saleOrderNo = this.$route.query.saleOrderNo, //买买车销售订单号
    this.loanApplyNo = this.$route.query.loanApplyNo, //闪贷订单号
    this.protocolowner = this.$route.query.protocolowner;
    this.fromUrl = this.$route.query.fromUrl;
    this.ip = this.$route.query.ip;
    this.osType = this.$route.query.osType
    this.fetchData()
    util.page.setPageInit();
    console.log(location.href);
  },
  computed: {
    ...mapGetters(['getCardInfo'])
  },
  methods: {
    ...mapActions(['setCardInfo']),
    fetchData () {
      const identityInfo = this.getCardInfo;   //storage.getSession('identityInfo');
      Object.getOwnPropertyNames(this.cardInfo).forEach((key) => {
        if(identityInfo && identityInfo[key]){
          this.cardInfo[key] = identityInfo[key]
        }
      })
        
      if(!this.cardInfo.bankCode) {
        this.cardInfo.depositName = '';
      }
    },
    //借记卡号发生改变对应的规则
    handleChangeCard(val){
      this.cardInfo.bankCardNo = val.replace(/[^\d]/g,'');
      this.cardInfo.depositName = ''
      this.cardInfo.verifycode = ''
      this.getBankNameFlag = true;
      this.choseBankNameFlag = false;
      // 卡号发生变更显示强提示标志
      if(this.ReValidCodeStatus == 1){
        this.ReValidCodeStatus = 2
      }
    },
    handleChangePhone(val){
      this.cardInfo.bankCardPhone = val.replace(/[^\d]/g,'');
      this.cardInfo.verifycode = ''
      if(this.ReValidCodeStatus == 1){
        this.ReValidCodeStatus = 2
      }
    },
    handleInput(val){
      this.cardInfo.verifycode = val.replace(/[^\d]/g,'');
    },
    //银查看支持的银行卡列表行卡
    showBankTips () {
      this.$refs['fetchBankList'].fetchData();
      document.title = this.$refs['fetchBankList'].title || ''
    },
    dataReday(){
      this.showBankList = 1;
    },
    closeBankList(){
      this.showBankList = 0;
      document.title = this.$route.meta.pageInfo.title || '';
      this.$nextTick(() => {
          util.page.setPageInit();
        })
    },
    dataSelected(bankCardInfo){
      this.doSelectFlag = false
      this.showBankList = 0;
      this.cardInfo.bankCode = bankCardInfo.bankCode
      this.cardInfo.depositName = bankCardInfo.bankName;
      document.title = this.$route.meta.pageInfo.title || '';
    },
    validate () {
      let validMsg = this.$validate(this.cardInfo, BankCardRules);
      if (validMsg) {
        this.$dialog.toast(validMsg);
        return false;
      }
      return true;
    },
    handleGetBankName () {
      if(this.isReadOnly) return
        //点击银行列表选择器，首先校验银行卡号
      var validMsg = this.$validate(this.cardInfo,bankcardNoRules);
      if (validMsg) {
        this.$dialog.toast(validMsg);
        return false;
      }
      if(!this.getBankNameFlag) return false;
      // 识别失败后允许再次选择银行名称
      if(this.choseBankNameFlag){
        this.cardInfo.verifycode = ''
        if(this.ReValidCodeStatus == 1){
          this.ReValidCodeStatus = 2
        }
        this.doSelectFlag = true
        this.showBankTips();
        return
      }
      //传参包括资金来源，15-20位银行卡号码
      var data = {
        fundsSource:this.fundsSource,
        bankCardNo: this.cardInfo.bankCardNo,
      }
      bankcardAPI.autoGetBankInfoByCardNo(data, (data) => {
        console.info(data);
        if(data.bankName) {
            this.cardInfo.bankCode = data.bankCode
            this.cardInfo.depositName = data.bankName;
            this.getBankNameFlag = false;
        }else {
            if(data.cardbinmsg ){
              //银行卡或手机号不准确，请确认后再提交
              this.$dialog.toast(data.cardbinmsg)
            }
        }
      }, (errMsg) => {     
        //银行卡识别失败，跳转至银行卡列表页
        this.doSelectFlag = true;
        this.showBankTips();
        this.choseBankNameFlag = true;
      })
    },
    protocolLink(){
      this.setCardInfo(this.cardInfo)
      this.$router.push({
        path:'/protocol/entrustAgreement',
        query:{
          'protocolowner':this.protocolowner
        }
      })
    },
    readCheck() {
      this.isRead = !this.isRead;
    },
    //验证码发送
    resendValidCode(){
      var validMsg = this.$validate(this.cardInfo,validRules);
      if (validMsg) {
          this.$dialog.toast(validMsg);
          return false;
      }
      this.ReValidCodeStatus = 0;
      this.cardInfo.verifycode = '';
        if(!this.sendValidCodeFlag){
          this.sendValidCodeFlag = true
          this.sendValidCode();
        }
    },
    sendValidCode () {
      const self = this;
      let params = {
        memberId: this.uid,
        saleOrderNo	: this.saleOrderNo,
        smsowner: this.smsowner,    //	短信发送渠道(1：神州,2：北京银商)
        type: this.validCodeType,    //	类型 2更换银行卡
        cardNo	: this.cardInfo.bankCardNo,
        cardOrganizationCode: this.cardInfo.bankCode,
        mobile:this.cardInfo.bankCardPhone,
        cardType: '02',      //  否		01:贷记卡，02:借记卡(smsowner==2 必选)
        cardCertificationType: this.identityType,   //证件类型 01身份证
        cardHolderName:this.cardInfo.name,  //姓名
        cardCertificationNo	: this.cardInfo.identityNo   //身份证号
      }
      bankcardAPI.bankCardSendValidateCode(params, (data) => {
        console.info(data);
        this.$dialog.toast(data.msg);
        this.smsVerifyIndex = data.smsVerifyIndex
        this.hadSendValidCode = 1
        this.timer = setInterval(() => {
          this.isReadOnly = true
          self.num -= 1;
          self.codeText = `${self.num}s`;
          if (self.num <= 0) {
              self.num = 60;
              self.codeText = '重新获取';
              self.ReValidCodeStatus = 1
              self.sendValidCodeFlag = false;
              self.isReadOnly = false;
              clearInterval(self.timer);
          }
        }, 1000);
      },(errMsg) => {
        this.$dialog.toast(errMsg);
        self.sendValidCodeFlag = false;
        if(self.codeText == "重新获取"){
          self.ReValidCodeStatus = 1
          self.hadSendValidCode = 1
        }
      })
    },
    //确认换卡
    save () {
      if(!this.validate()) return false;
      if(this.fundsSource == 8 && !this.isRead){
        this.$dialog.toast("请先勾选授权信息");
        return false;
      }
      if(!this.hadSendValidCode){
        this.$dialog.toast("请先获取验证码")
        return false;
      }else if(this.ReValidCodeStatus == 2){
        this.$dialog.toast("银行卡信息已变更，请重新获取验证码") 
        return false
      }
      this.updateBankCard();
    },
    //保存更新银行卡
    updateBankCard(){
      let params = {
        "loanApplyNo": this.loanApplyNo,    //闪贷订单号
        "saleOrderNo":this.saleOrderNo, //买买车销售订单号
        "name":this.cardInfo.name,
        "idNo":this.cardInfo.identityNo,
        "fundsSource": this.fundsSource,
        "bankCardNo":this.cardInfo.bankCardNo,
        "bankCode":this.cardInfo.bankCode,
        "bankCardPhone":this.cardInfo.bankCardPhone,
        "verifycode": this.cardInfo.verifycode,
        "osType": this.osType,    //操作系统（微众必填）
        "ip": this.ip,            //ip地址（微众必填）
        "appType":this.appType ,       //应用提交类型（换卡传C）
        "smsowner" : this.smsowner,
        "smsVerifyIndex" : this.smsVerifyIndex,
        "masterChannel":this.masterChannel       //主渠道
      }
      bankcardAPI.updateCollectionBankInfo(params, (data)=>{
        this.submitSuccess = 1;
        var str = this.cardInfo.bankCardNo.substr(-4,4);
        this.cardInfo.bankCardNo = str;
      },(errMsg) =>{
        this.$dialog.toast(errMsg)
      })
    },
  }
}
</script>

<style lang="scss" scoped>
.container {
    // margin-top: 90px;
    min-height: 100%;
    position: relative;
    .special{
      border: none;
      .note{
      text-align: right;
      padding-right: 30px;
      font-size: 26px;
      line-height: 84px;
      background-color: #F5F5F5;
      .link{
        color: #4A90E2 ;
      }
      }
    }  
  .code-split {
    padding: 0 40px;
    color: #ececec;
  }
  .send-code{
    color: #CCC;
    padding-left: 22px;
    padding-right: 52px;
  }
  .remind{
    padding-top: 40px;
    height: 28px;
    img{
      width: 28px;
      height: 28px;
      padding-left: 30px;
      padding-right: 12px;
      float: left;
    }
    .color{
      line-height: 28px;
      font-size: 24px;
      color: #EB4067;  
    }
  }
}
.read-protocol{
  margin-left: 10px;
  position: fixed;
  bottom: 130px;
}
.defaultColor{
  color: #CCC;
}
.fieldset{
  margin-bottom: 0px;
}
.succ{
  margin-top: 380px;
  text-align: center;
  img{
    width: 88px;
    height: 88px;
  }
  .succ-title{
    font-size: 38px;
    font-weight: bold;
    padding-bottom: 16px;
  }
  .succ-hint{
    padding: 0px 40px 0px 40px;
    font-size: 32px;
    line-height: 38px;
  }
}
</style>
