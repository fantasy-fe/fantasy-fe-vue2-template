<template>

  <header class="fcar_header">
    <a class="header-back getback" @click="back()"></a>
    <h2 class="fcar-title">
      <div v-if="type==='normal'">{{title}}</div>
      <slot v-else></slot>
    </h2>
  </header>

</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    title: {
      type: String,
      default: ''
    },
    callback: {
        type: Function,
        default: null
    }
  },
  methods: {
    back(from) {
        if (from) {
            this.$router.push(from);
            return;
        }
        if (typeof this.callback === 'function') {
            this.callback();
            return;
        }
        this.$router.go(-1);
    }
  }

}
</script>

<style lang="scss" scoped>
.fcar_header {
  width: 100%;
  height: 90px;
  background-color: #28292D;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 100;
  border-bottom: 1px solid #eee;

  .fcar-title {
    font-size: 36px;
    text-align: center;
    line-height: 90px;
    color: #fff;
    font-weight: 400;
  }
  .header-back {
    width: 40px;
    height: 40px;
    display: block;
    position: absolute;
    top: 24px;
    left: 30px;
    background: url(../../images/arrow-left.png) 50% no-repeat;
    background-size: 100% auto;
  }
}
</style>
