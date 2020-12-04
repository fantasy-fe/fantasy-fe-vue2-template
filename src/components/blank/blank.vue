<template>
  <div class="blank">
    <img src="../../images/faile.png" alt="暂无数据空白页面图片">
    <p>{{tips}}</p>
    <a class="btn" @click="onKonw">知道了</a>
    
  </div>
</template>
<script>
export default {
  props: {
    tips: {
      type: String,
      default: '服务器开小差了，休息一下再试吧'
    },
    fromUrl:{
      type: String
    },
    saleOrderNo: {
      type: String
    }
  },
  data () {
    return {
      
    }
  },

  methods: {
    onKonw() {
      let _miniUrl = this.fromUrl + '?orderNo=' + this.saleOrderNo;
      console.info(_miniUrl);
      if(!this.fromUrl) {
        this.$dialog.toast('缺少fromUrl参数，只能待在原地。')
      }
      wx.miniProgram.getEnv(function (res) {
          console.info(res);
          
          /* if (res.miniprogram) {
              wx.miniProgram.switchTab({url: _fromUrl});
              wx.miniProgram.postMessage({data: {"orderNo": _orderNo}}); // 传的参数
          } */
          wx.miniProgram.redirectTo({
              url: _miniUrl,
              success: function(){
                  console.log('success')
              },
              fail: function(){
                  console.log('fail');
              },
              complete:function(){
                  console.log('complete');
              }

          });
      });
      
    }
  }
}
</script>

<style lang="scss" scoped>
  .blank {
    height: 100%;
    background-color: #fff;
    color: #666;
    overflow: hidden;
    font-size: 26px;
    .btn {
      width: 220px;
      height: 70px;
      display: block;
      border: 1px solid #ddd;
      border-radius: 10px;
      text-align: center;
      line-height: 70px;
      color: #666;
      margin: 0 auto;
    }
    p {
      text-align: center;
      padding: 40px 60px;
    }
    img {
      display: block;
      margin: 300px auto 0 auto;
      width: 200px;
      height: 208px;
    }
  }
</style>
