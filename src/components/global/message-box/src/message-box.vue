<template>
  <div class="msgbox-wrapper">
    <transition name="msgbox-bounce">
      <div class="msgbox" v-show="value">
        <div class="msgbox-header" :style="{'padding-bottom':message === '' ? '2.142rem' : '0'}" v-if="title !== ''">
          <div class="msgbox-title" v-html="title"></div>
        </div>
        <div class="msgbox-content" v-if="message !== '' && typeof message !== 'object'" :style="{'padding-top': title ? '1.071rem' : '0'}">
          <div class="msgbox-message" v-html="message" :style="{'text-align':$type === 'tips' && title ? 'justify' : 'center'}"></div>
          <div class="msgbox-input" v-show="showInput">
            <input v-model="inputValue" :placeholder="inputPlaceholder" ref="input">
            <div class="msgbox-errormsg" :style="{ visibility: !!editorErrorMessage ? 'visible' : 'hidden' }">{{ editorErrorMessage }}</div>
          </div>
        </div>
        <div class="msgbox-content" v-if="message !== '' && typeof message === 'object'">
          <div class="msgbox-message" :style="{'text-align':$type === 'tips' && title ? 'justify' : 'center'}"></div>
        </div>
        <div v-if="showRedButton">
          <button class="btn btn-red" @click="handleAction('confirm')">{{ tipsButtonText }}</button>
        </div>
        <div class="msgbox-btns" v-if="!showRedButton && !noButton">
          <button :class="[ cancelButtonClasses ]" v-show="showCancelButton" @click="handleAction('cancel')">{{ cancelButtonText }}</button>
          <button :class="[ confirmButtonClasses ]" v-show="showConfirmButton" @click="handleAction('confirm')">{{ confirmButtonText }}</button>
        </div>
      </div>
    </transition>
  </div>
</template>

<style>
  .msgbox {
    position: fixed;
    top: 50%;
    left: 50%;
    -webkit-transform: translate3d(-50%, -50%, 0);
    transform: translate3d(-50%, -50%, 0);
    background-color: #fff;
    width: 84%;
    border-radius: 10px;
    font-size: 16px;
    -webkit-user-select: none;
    overflow: hidden;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: .2s;
    transition: .2s;
    padding-top: 2.142rem;
  }
  .msgbox-header {
  }
  .msgbox-content {
    padding: 1.071rem;
    padding-bottom: 2.142rem;
    /*min-height: 36px;*/
    position: relative;
  }
  /*.msgbox-input {*/
    /*padding-top: 15px;*/
  /*}*/
  .msgbox-input input {
    border: 1px solid #eee;
    border-radius: 5px;
    /*padding: 4px 5px;*/
    width: 100%;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    outline: none;
    height: 3.142rem;
    font-size: 1.071rem;
    color: #333;
    box-sizing: border-box;
    padding-left: .714rem;
  }
  .msgbox-input input.invalid {
    border-color: #ff4949;
  }
  .msgbox-input input.invalid:focus {
    border-color: #ff4949;
  }
  .msgbox-errormsg {
    color: red;
    font-size: 12px;
    min-height: 18px;
    margin-top: 2px;
  }
  .msgbox-title {
    text-align: center;
    padding-left: 0;
    margin-bottom: 0;
    font-size: 1.214rem;
    font-weight: 700;
    color: #333;
  }
  .msgbox-message {
    color: #666;
    margin: 0;
    text-align: justify;
    line-height: 1.5;
    font-size: 1.071rem;
  }
  .msgbox-message p{
    margin-bottom: .5rem;
  }

  .msgbox-message p:last-of-type{
    margin-bottom: 0;
  }
  .btn-red{
    margin: 0 auto;
    border-radius: 5px;
    margin-bottom: 1.071rem;
  }
  .msgbox-btns {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    height: 3.142rem;
    line-height: 3.142rem;
    border-top: 1px solid #eee;
  }
  .msgbox-btn {
    line-height: 1.214rem;
    font-size: 1.214rem;
    display: block;
    background-color: #fff;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    margin: 0;
    border: 0;
    border-radius: 10px;
  }
  .msgbox-btn:focus {
    outline: none;
  }
  .msgbox-btn:active {
    background-color: #fff;
  }
  .msgbox-cancel {
    width: 50%;
    color: #666;
    border-right: 1px solid #eee;
  }
  .msgbox-cancel:active {
    color: #666;
  }
  .msgbox-confirm {
    color: #f44338;
    width: 50%;
  }
  .msgbox-btn:first-of-type{
    border-bottom-right-radius: 0;
    border-top-right-radius: 0;
  }
  .msgbox-confirm:active {
    color: #f44338;
  }
  .msgbox-bounce-enter {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.7);
    transform: translate3d(-50%, -50%, 0) scale(0.7);
  }
  .msgbox-bounce-leave-active {
    opacity: 0;
    -webkit-transform: translate3d(-50%, -50%, 0) scale(0.9);
    transform: translate3d(-50%, -50%, 0) scale(0.9);
  }

  .v-modal-enter {
    -webkit-animation: v-modal-in .2s ease;
    animation: v-modal-in .2s ease;
  }
  .v-modal-leave {
    -webkit-animation: v-modal-out .2s ease forwards;
    animation: v-modal-out .2s ease forwards;
  }
  @-webkit-keyframes v-modal-in {
    0% {
      opacity: 0;
    }
    100% {
    }
  }
  @keyframes v-modal-in {
    0% {
      opacity: 0;
    }
    100% {
    }
  }
  @-webkit-keyframes v-modal-out {
    0% {
    }
    100% {
      opacity: 0;
    }
  }
  @keyframes v-modal-out {
    0% {
    }
    100% {
      opacity: 0;
    }
  }
  .v-modal {
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
  }
</style>
<script type="text/babel">
  let CONFIRM_TEXT = '确定';
  let CANCEL_TEXT = '取消';
  let TIPS_TEXT = '我知道了';

  import Popup from '../../popup';

  export default {
    mixins: [ Popup ],

    props: {
      modal: {
        default: true
      },
      showClose: {
        type: Boolean,
        default: true
      },
      lockScroll: {
        type: Boolean,
        default: false
      },
      closeOnClickModal: {
        default: true
      },
      closeOnPressEscape: {
        default: true
      },
      inputType: {
        type: String,
        default: 'text'
      }
    },
    computed: {
      confirmButtonClasses() {
        let classes = 'msgbox-btn msgbox-confirm ' + this.confirmButtonClass;
        if (this.confirmButtonHighlight) {
          classes += ' msgbox-confirm-highlight';
        }
        return classes;
      },
      cancelButtonClasses() {
        let classes = 'msgbox-btn msgbox-cancel ' + this.cancelButtonClass;
        if (this.cancelButtonHighlight) {
          classes += ' msgbox-cancel-highlight';
        }
        return classes;
      }
    },

    methods: {
      doClose() {
        this.value = false;
        this._closing = true;

        this.onClose && this.onClose();

        setTimeout(() => {
          if (this.modal && this.bodyOverflow !== 'hidden') {
            document.body.style.overflow = this.bodyOverflow;
            document.body.style.paddingRight = this.bodyPaddingRight;
          }
          this.bodyOverflow = null;
          this.bodyPaddingRight = null;
        }, 200);
        this.opened = false;

        if (!this.transition) {
          this.doAfterClose();
        }
      },

      handleAction(action) {
        if (this.$type === 'prompt' && action === 'confirm' && !this.validate()) {
          return;
        }
        var callback = this.callback;
        this.value = false;
        callback(action);
      },

      validate() {
        if (this.$type === 'prompt') {
          var inputPattern = this.inputPattern;
          if (inputPattern && !inputPattern.test(this.inputValue || '')) {
            this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
            this.$refs.input.classList.add('invalid');
            return false;
          }
          var inputValidator = this.inputValidator;
          if (typeof inputValidator === 'function') {
            var validateResult = inputValidator(this.inputValue);
            if (validateResult === false) {
              this.editorErrorMessage = this.inputErrorMessage || '输入的数据不合法!';
              this.$refs.input.classList.add('invalid');
              return false;
            }
            if (typeof validateResult === 'string') {
              this.editorErrorMessage = validateResult;
              return false;
            }
          }
        }
        this.editorErrorMessage = '';
        this.$refs.input.classList.remove('invalid');
        return true;
      },

      handleInputType(val) {
        if (val === 'range' || !this.$refs.input) return;
        this.$refs.input.type = val;
      }
    },

    watch: {
      inputValue() {
        if (this.$type === 'prompt') {
          this.validate();
        }
      },

      value(val) {
        this.handleInputType(this.inputType);
        if (val && this.$type === 'prompt') {
          setTimeout(() => {
            if (this.$refs.input) {
              this.$refs.input.focus();
            }
          }, 500);
        }
      },

      inputType(val) {
        this.handleInputType(val);
      }
    },

    data() {
      return {
        title: '',
        message: '',
        type: '',
        showInput: false,
        inputValue: null,
        inputPlaceholder: '',
        inputPattern: null,
        inputValidator: null,
        inputErrorMessage: '',
        showRedButton:false,
        noButton: false,
        showConfirmButton: true,
        showCancelButton: false,
        tipsButtonText: TIPS_TEXT,
        confirmButtonText: CONFIRM_TEXT,
        cancelButtonText: CANCEL_TEXT,
        confirmButtonClass: '',
        confirmButtonDisabled: false,
        cancelButtonClass: '',
        editorErrorMessage: null,
        callback: null
      };
    }
  };
</script>
