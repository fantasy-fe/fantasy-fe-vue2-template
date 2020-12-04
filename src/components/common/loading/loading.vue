<template>
  <div class="loading-mask" v-if="toggle">
    <div class="loading-box">
      <img class="img" src="../../../images/loading@2x.png" alt="数据加载中..." />
      <p class="tips">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        toggle: false,
        tips: '正在加载'
      };
    },
    methods: {
      show(tips = this.tips) {
        this.tips = tips;
        this.toggle = true;
      },
      close() {
        this.tips = '正在加载';
        this.toggle = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .loading-mask {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background-color: rgba(0, 0, 0, .3);
    z-index: 100;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loading-box {
    padding: 45px;
    // width: 180px;
    // height: 180px;
    background-color: rgba(0, 0, 0, .4);
    border-radius: 6px;
    flex-direction: column;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    width: 72px;
    height: 72px;
    display: block;
    margin: 0 auto 20px;
    animation: turn 2s linear infinite;
  }
  .tips {
    color: #fff;
    text-align: center;
  }
  @keyframes turn {
    0% {
      transform: rotate(0deg);
    }
    100%{
      transform: rotate(360deg);
    }
  }
</style>
