<template>
  <transition name="indicator">
    <div class="indicator" v-show="visible">
      <div class="indicator-wrapper" :style="{ 'padding': text ? '20px' : '15px' }">
        <spinner class="indicator-spin" :type="convertedSpinnerType" :size="32"></spinner>
        <span class="indicator-text" v-show="text">{{ text }}</span>
      </div>
      <div class="indicator-mask" @touchmove.stop.prevent></div>
    </div>
  </transition>
</template>

<style scoped>
  .indicator {
    -webkit-transition: opacity .2s linear;
    transition: opacity .2s linear;
    z-index: 9999;
  }
  .indicator-wrapper {
    top: 50%;
    left: 50%;
    position: fixed;
    -webkit-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    border-radius: 5px;
    background: rgba(0, 0, 0, 0.7);
    color: white;
    box-sizing: border-box;
    text-align: center;
    z-index: 9999;
  }
  .indicator-text {
    display: block;
    color: #fff;
    text-align: center;
    margin-top: 10px;
    font-size: 16px;
  }
  .indicator-spin {
    display: inline-block;
    text-align: center;
  }
  .indicator-mask {
    top: 0;
    left: 0;
    position: fixed;
    width: 100%;
    height: 100%;
    opacity: 0;
    background: transparent;
	z-index: 9999;
  }
  .indicator-enter, .indicator-leave-active {
    opacity: 0;
  }

</style>

<script type="text/babel">
  import Spinner from '../spinner/index';

  export default {
    data() {
      return {
        visible: false
      };
    },

    components: {
      Spinner
    },

    computed: {
      convertedSpinnerType() {
        switch (this.spinnerType) {
          case 'double-bounce':
            return 1;
          case 'triple-bounce':
            return 2;
          case 'fading-circle':
            return 3;
          default:
            return 0;
        }
      }
    },

    props: {
      text: String,
      spinnerType: {
        type: String,
        default: 'snake'
      }
    }
  };
</script>
