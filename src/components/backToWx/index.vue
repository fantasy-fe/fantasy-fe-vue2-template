<template>
  <div class="btn-outer">
    <a @click="backToWx" class="btn-fixed">{{btnText ? btnText : '好的'}}</a>
  </div>
</template>
<script>
export default {
  props: ['btnText', 'fromUrl', 'saleOrderNo'],

  methods: {
    backToWx() {
      let _miniUrl = this.fromUrl + '?orderNo=' + this.saleOrderNo;
      console.info(_miniUrl);
      if(!this.fromUrl) {
        this.$dialog.toast('缺少fromUrl参数，只能待在原地。')
      }
      wx.miniProgram.getEnv(function (res) {
          console.info(res);
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

