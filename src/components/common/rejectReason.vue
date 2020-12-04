<template>
  <div class="reason-tips">
    <div class="content" ref="reasonTips">
      <p v-if="showLine" class="all-line">
        <span ref="allLine">{{ rejectReason }}</span>
      </p>
      <p v-else  class="one-line">{{ rejectReason }}</p>
      <span v-if="showArrow" :class="['show-icon', showLine ? '' : 'hide-line']" @click="showReason"></span>
    </div>
  </div>
</template>
<script>
export default {
  props:['rejectReason'],
  data() {
    return {
      // 是否展开驳回原因
      showLine: true,
      // 是否显示驳回原因下拉箭头
      showArrow: false
    }
  },
  mounted() {
    this.computedLine();
  },
  methods: {
    computedLine() {
      // 计算是否展示驳回原因的下拉箭头，超过一行才显示
      const containWidth = this.$refs.reasonTips.clientWidth;
      const lineWidth = this.$refs.allLine.clientWidth;
      if(lineWidth >= containWidth) {
        this.showArrow = true;
      }
    },
    showReason() {
      this.showLine = !this.showLine;
    }
  }
}
</script>
<style lang="scss" scoped>
  .reason-tips {
    padding: 25px 0px 50px 0px;
    color: #333;
    background-color: #fff;
    font-size: 24px;
    margin: 0px auto 40px auto;
    position: relative;
    .content {
      width: 710px;
      margin: 0 auto;
    }
    .show-icon {
      width: 20px;
      height: 20px;
      display: block;
      transform: rotate(45deg);
      border-top: 2px solid #000;
      border-left: 2px solid #000;
      position: absolute;
      left: 50%;
      margin-left: -10px;
      bottom: 10px;
      transform-origin: 25% 25%;
      transition: transform 0.2s;
    }
    .hide-line {
      transform: rotate(225deg);
    }
    .one-line {
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      font-size: 28px;
    }
    .all-line span {
      display: inline-block;
      font-size: 28px;
    }
  }
</style>


