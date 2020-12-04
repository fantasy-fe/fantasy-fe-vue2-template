<template>
  <div class="con">
    <span v-text="this.tianjiStatusText" class="goAndDone" :class="{'validated': tianjiStatus === 1, 'failed': tianjiStatus === 2}" @click="gotoRong360"></span>
    <em class="arrow-right"></em>
  </div>
</template>

<script>
export default {
  props: [
    'rong360BankStatus',
    'fromUrl',
    'saleOrderNo'
  ],
  data() {
    return {
      bankInProcess: false,
      tianjiStatus: this.rong360BankStatus || 0,//// 天机认证状态 0 未认证 1 认证成功 2 认证失败
      tianjiStatusText: '去认证',
      getRong360UrlApi: '/resource/mwap/fcar/mmcnew/getRong360Url',
      getStatusApi: '/resource/mwap/fcar/mmcnew/getRong360Data',
    }
  },
  watch: {
    'rong360BankStatus' (newVal, oldVal) {
      this.tianjiStatus = newVal;
      this.updateTianjiStatusText();
    }
  },

  computed: {
    
  },
  mounted() {
    this.updateTianjiStatusText();
  },
  
  methods: {
    updateTianjiStatusText() {
      if(this.tianjiStatus === 1) {
        this.tianjiStatusText = '认证完成';
      }else if(this.tianjiStatus === 0){
          this.tianjiStatusText = this.bankInProcess ?  '认证中' : '去认证';
      } else if(this.tianjiStatus === 2){
        this.tianjiStatusText = '认证失败 重新认证';
      }
    },
    /*
    跳转到融360银行
    param：
    loanApplyNo	是	String	闪贷订单编号
    idNumber	是	String	会员身份证号
    mobile	是	String	会员手机号
    name	是	String	会员姓名
    returnUrl	是	String	页面跳转同步通知页面路径
    backUrl	否	String	回退功能
    */
    gotoRong360() {
      if(this.tianjiStatus === 1 || (this.bankInProcess && this.tianjiStatus === 0)) return;
      // let _returnUrl = this.fromUrl ? this.fromUrl : location.href
      // if(!_returnUrl.match("&backfrom=rong360")){
      //   _returnUrl += "&backfrom=rong360"
      // }
      let _returnUrl = this.formatUrl(this.$route.query,['fromUrl','uid','saleOrderNo','loanApplyNo','fullAudit'], 'rong360');
      let data = {
        saleOrderNo: this.saleOrderNo,
        returnUrl: _returnUrl
      }
      this.$emit('on-beforeRedirect');
      this.$axios.api(this.getRong360UrlApi, data).then((res) => {
         if (res && res.status === 0) {
          location.href = res.re;
        } else {
          this.$dialog.toast(res.msg);
        } 
      });
    },
    /**
     * 查询后台接口，返回融360验证状态
     * param：
            loanApplyNo: '',
            idNumber: '',
            mobile: ''
     */
    getStatusOfRong360() {
      let data = {
        saleOrderNo: this.saleOrderNo
      };
      this.$axios.api(this.getStatusApi, data).then((res) => {
        if (res && !res.status) {
          this.tianjiStatus = res.re;
          this.updateTianjiStatusText();
          if (this.tianjiStatus === 1 || this.tianjiStatus === 2) {
            this.$emit('on-success', this.tianjiStatus);
          }
        }
      })
    },

    setProcessed(bol) {
      console.info('setProcessed:', bol);
      this.bankInProcess = bol
    },
    /**
     * 过滤并拼接url字符串参数
     */
    formatUrl(source,key,val) {
      let target = '';
      let url = location.href;
      for(let k in source) {
        if(key.includes(k)){
          if(source[k] instanceof Array && source[k].length >= 2) {
            // 去重
            source[k] = Array.from(new Set(source[k]));
          }
          target += `&${k}=${source[k]}`;
        }
      }
      if(val){
        target += `&backfrom=${val}`;
      }
      target = target.replace(/^&/gi,"");
      return `${url.split("?")[0]}?${target}`;
    }
  }
}
</script>

<style>
</style>
