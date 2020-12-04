<template>
  <transition :name="transition">
    <div class="m-dialog" v-if="show">
      <div class="wrapper" v-if="type === 'alert'">
        <header class="header" v-if="title">{{ title }}</header>
        <div class="content" :data-left="left" v-html="msg"></div>
        <footer class="footer">
          <a @click="onConfirm" class="btn btn-confirm">{{ configs.btnConfirm }}</a>
        </footer>
      </div>
      <div class="wrapper" v-if="type === 'modal'">
        <div class="content" :data-left="left">
          <p>{{ msg }}</p>
          <input type="text" v-if="input" class="input" placeholder="输入框占位符" v-model="value" />
        </div>
        <footer class="footer">
          <a ref="dom" @click="onCancel" class="btn btn-cancel">{{ configs.btnCancel }}</a>
          <a @click="onConfirm" class="btn btn-confirm">{{ configs.btnConfirm }}</a>
        </footer>
      </div>
      <div class="action" v-if="type === 'action'">
        <ul v-if="items.list && items.list.length">
          <li v-for="(item, index) in items.list" :key='item' @click="clickEvent(item, index)">{{ item }}</li>
          <li @click="onCancel" class="btn btn-cancel">{{ configs.btnCancel }}</li>
        </ul>
        <div v-if="msg" class="action-content">
          <p>{{ msg }}</p>
          <a @click="onConfirm" class="btn btn-confirm">{{ configs.btnConfirm }}</a>
          <a @click="onCancel" class="btn btn-cancel">{{ configs.btnCancel }}</a>
        </div>
      </div>
      <div class="toast" v-if="type === 'toast'">{{ msg }}</div>
      <div class="snack" v-if="type === 'snack'">{{ msg }}</div>
      <div class="popup" v-if="type === 'popup'">
        <div class="popup-content">
          <p class="tit">{{ msg }}<em class="close" @click="close"></em></p>
          <ul v-if="items.list && items.list.length>0">
            <li v-for="(item, index) in items.list" :key="index" @click="clickEvent(item, index)" v-html="item.repayHtml"></li>
          </ul>
          <p class="foot">&nbsp;</p>
        </div>
      </div>
      <div class="mask" :data-type="type"></div>
    </div>
  </transition>
</template>

<script>
  export default {
    data() {
      return {
        msg: '',
        title: '',
        left: false,
        transition: 'fade',
        value: null,
        items: {},
        configs: {
          btnConfirm: '确认',
          btnCancel: '取消',
          cancelHandler() {},
          confirmHandler() {}
        },
        // type => 'alert', 'modal', 'toast'
        type: 'toast',
        input: false,
        show: false
      };
    },
    watch: {
      msg(val) {
        if (val.length > 23) {
          this.left = true;
        }
      },
      show(val) {
        if (val) {
          //document.body.style.overflow = 'hidden';
          //document.documentElement.style.overflow = 'hidden';
        } else {
          document.body.style.overflow = '';
          document.documentElement.style.overflow = '';
        }
      }
    },
    methods: {
      initConfigs(params, configs) {
        this.showHandler(true);
        if (typeof params !== 'object') return;
        const { btnConfirm, btnCancel, cancelHandler, confirmHandler } = configs;
        if (params.btns) {
          this.$set(configs, 'btnConfirm', params.btns[0] || btnConfirm);
          this.$set(configs, 'btnCancel', params.btns[1] || btnCancel);
        }
        if (params.callback) {
          this.$set(configs, 'confirmHandler', params.callback[0] || confirmHandler);
          this.$set(configs, 'cancelHandler', params.callback[1] || cancelHandler);
        }
        if (params.input) this.input = params.input || false;
      },
      resetConfigs() {
        this.msg = '';
        this.title = '';
        this.value = null;
        this.configs = {
          btnConfirm: '确认',
          btnCancel: '取消',
          cancelHandler() {},
          confirmHandler() {}
        };
        this.items = {};
      },
      showHandler(toggle) {
        if (!toggle) this.resetConfigs();
        this.show = toggle;
      },
      /**
       * 确认弹框
       * @param {string} msg - 提示文字
       * @param {object} params - 配置信息
       * @param {string} params.title - 标题
       * @param {array} params.btns - 确认按钮的文字
       * @param {array} params.callback - 确认执行的回调
       */
      alert(msg, params) {
        this.title = params.title;
        this.msg = msg;
        this.type = 'alert';
        this.transition = 'fade';
        this.initConfigs(params,this.configs);
      },
      /**
       * modal 提示，有确认和取消两按钮
       * @param {string} title - 提示标题
       * @param {string} msg - 提示文字
       * @param {boolean} input - 是否显示输入框
       * @param {array} params.callback - 0 => 确认按钮回调 1 => 取消按钮回调
       * @param {array} params.btns - 按钮文字 0 => 确认 1 => 取消
       */
      modal(title, msg, input, params = {}) {
        this.msg = msg;
        this.input = input;
        this.type = 'modal';
        this.transition = 'fade';
        this.initConfigs(params, this.configs);
      },
      /**
       * 吐司提示
       * @param {string} msg - 提示文字
       * @param {object} params - 配置信息
       * @param {number} params.delay - 多少秒后关闭, 默认 3s, 如果为 0 , 则不关闭
       * @param {function} params.callback - 关闭时执行的回调
       */
      toast(msg, params = {}) {
        this.msg = msg;
        this.type = 'toast';
        this.transition = 'toast';
        let delay = 2000;
        if (typeof params.delay === 'number') {
          delay = params.delay * 1000;
        }
        this.show = true;

        setTimeout(() => {
          if (typeof params.callback === 'function') {
            params.callback();
          }
          this.show = false;
        }, delay || 2000);
      },
      /**
       * 底部弹窗提示
       * @param {string} msg - 提示文字
       * @param {object} params - 配置信息
       * @param {number} params.delay - 多少秒后关闭，默认 3s，如果为 0，则不关闭
       * @param {function} params.callback - 关闭时执行的回调
       */
      snack(msg, params = {}) {
        this.msg = msg;
        this.type = 'snack';
        let delay = 2000;
        if (typeof params === 'number') {
          delay = params.delay * 1000;
        }
        this.show = true;
        setTimeout(() => {
          if (typeof params.callback === 'function') {
            params.callback();
          }
          this.show = false;
        }, delay || 2000);
      },
      /**
       * @param {string} msg - 提示文字
       * @param {array} items.list - 选项列表
       * @param {function} items.callback - 选项列表点击回调
       */
      popup(msg, items = {}, params = {}) {
        this.msg = msg;
        this.items = items;
        console.info(items);
        this.type = 'popup';
        this.transition = 'fade';
        this.show = true;
      },
      /**
       * @param {string} msg - 提示文字
       * @param {array} items.list - 选项列表
       * @param {function} items.callback - 选项列表点击回调
       * @param {array} params.callback - 0 => 确认按钮回调 1 => 取消按钮回调
       * @param {array} params.btns - 按钮文字 0 => 确认 1 => 取消
       */
      action (msg = '', items = {}, params = {}) {
        this.msg = msg;
        this.items = items;
        this.type = 'action';
        this.initConfigs(params, this.configs);
      },
      /**
       * 点击选项列表事件
       */
      clickEvent(item, index) {
        const data = {
          item: item,
          index: index
        }
        const promise = new Promise((resolve) => {
          resolve(!this.items.callback(data));
        })
        this.showHandler(false);
      },
      onCancel() {
        this.configs.cancelHandler(this.$refs.dom);
        this.showHandler(false);
      },
      onConfirm() {
        // 加入error的情况
        const promise = new Promise((resolve) => {
          resolve(!this.configs.confirmHandler(this.value));
        });
        promise.then((res) => {
          if (res) return this.showHandler(false);
          this.isError = true;
        });
      },
      close() {
        this.show = false;
      }
    }
  };
</script>

<style lang="scss" scoped>
  .m-dialog {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: 999;
  }
  .wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    margin-top: -25%;
    transform: translate3d(0, -50%, 1PX);
    margin: auto;
    z-index: 2;
    width: 80%;
    overflow: hidden;
    border-radius: 6px;
    background-color: #fff;
    font-size: 26px;
  }
  .action {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    background-color: #fff;
    font-size: 24px;
    li {
      text-align: center;
      line-height: 70px;
      border-bottom: 1PX solid #ccc;
      &:last-child {
        border-bottom: none;
      }
    }
    .btn-cancel {
      border-top: 5px solid #ccc;
    }
    .action-content {
      width: 100%;
      text-align: center;
      p {
        width: 100%;
        color: #aaa;
        padding: 20px;
        line-height: 40px;
        border-bottom: 1PX solid #ccc;
      }
      .btn {
        display: block;
      }
    }
  }
  .popup {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;
    width: 100%;
    background-color: #fff;
    font-size: 36px;
    .tit {
      height: 90px;
      line-height: 90px;
      text-align: center;
      border-bottom: 1PX solid #ccc;
    }
    .popup-content {
      position: relative;
        width: 100%;
        .close {
          position: absolute;
          top: 40;
          right: 20px;
          width: 90px;
          height: 90px;
          background: url('../../../images/icon_close@2x.png') center center no-repeat;
          background-size: 32px;
        }
    }
    li {
      height: 160px;
      line-height: 160px;
      &:last-child {
        border-bottom: none;
      }
    }
    .foot{
      height:120px;
    }
  }
  .toast {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 300px;
    margin: 0 auto;
    width: 600px;
    padding: 20px;
    border-radius: 6px;
    color: #fff;
    text-align: center;
    background-color: rgba(68, 68, 68, .7);
    z-index: 2;
  }
  .snack {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -20%;
    width: 100%;
    padding: 30px 20px;
    color: #fff;
    text-align: center;
    background-color: rgba(0, 0, 0, .6);
    z-index: 2;
    animation: snack ease-in 0.5s;
    animation-fill-mode: forwards;
  }
  @keyframes snack {
    0% {
      bottom: -20%;
    }
    100% {
      bottom: 0;
    }
  }
  .content {
    padding: 0 60px;
    margin: 50px 0;
    line-height: 1.5;
    max-height: 500px;
    overflow: auto;
    word-break: break-all;
    text-align: center;
    &[data-left="true"] {
      text-align: left;
    }
    .input {
      border: 1px solid #CCCCCC;
      padding: 20px;
      box-sizing: border-box;
      margin-top: 40px;
      width: 100%;
      height: 70px;
      font-size: 26px;
    }
    .error {
      color: #EE2A46; 
      margin-top: 20px;
    }
  }
  .header {
    padding: 40px 60px;
    border-bottom: 1PX solid #f0f0f0;
  }
  .footer {
    display: flex;
    text-align: center;
    justify-content: space-between;
    border-top: 1PX solid #f0f0f0;
  }
  .btn {
    flex: 1;
    line-height: 70px;
  }
  .btn-confirm {
    color: #EE2A46;
    position: relative;
    &:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 1PX;
      background-color: #f0f0f0;
    }
  }
  .mask {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 200%;
    background-color: #000;
    opacity: 0.3;
    z-index: 1;
    &[data-type='toast'] {
      opacity: 0.01;
    }
  }
</style>
