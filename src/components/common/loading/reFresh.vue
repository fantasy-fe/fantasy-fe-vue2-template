<template>
  <div 
    class="my-scroll" 
    :class="[scrollState ? 'prohibit' : 'allow']" 
    ref="myScroll" 
    @touchstart="touchStart($event)" 
    @touchmove="touchMove($event)" 
    @touchend="touchEnd($event)" 
  >
    <div class="scroll-top" :style="{height:top+'px'}">
      <div>
        <p v-if="state==4">下拉刷新</p>
        <p v-if="state==1">
          <img class="loading-gif" src="../../../images/loading-snake.png" />
          <span>正在刷新</span>
        </p>
        <p v-if="state==2">松开刷新</p>
        <p v-if="state==3">
          <img class="loading-gif" src="../../../images/loading-snake.png" />
          <span>刷新完成</span>
        </p>
      </div>
    </div>
    <div class="scroll-list" :style="{ transform: 'translate3d(0, ' + top + 'px, 0)'}">
      <slot name="scrollList"></slot>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      "scrollState": {
        // 是否可滑动
        type:Boolean,
        default:false
      },
      "refreshHeight": {
        // 下拉的高度，即下拉到哪个位置时刷新
        type: [Number, String],
        default: 100
      }
    },
    data() {
      return {
        pageX:0,
        pageY:0,
        state:0, 
        scrollPosition:0,
        myScroll:null,
        myScrollList:null,
        top:0
      };
    },
    mounted() {
      this.myScroll = this.$refs.myScroll
      this.myScrollList = this.myScroll.children[1]
    },
    methods: {
      /**
       * 修改状态 1=>正在刷新 2=>松开刷新 3=>刷新完成 4=>下拉刷新
       */
      setState(state) { 
        this.state = state;
        if(state == 3) {
          setTimeout(() => {
            this.state = 0;
            let timer = null;
            let that = this;
            cancelAnimationFrame(timer);
            timer = requestAnimationFrame(function fn() {
                let oTop = that.top;
                if (that.top > 0) {
                  that.top = Math.ceil(oTop) - 15;
                  timer = requestAnimationFrame(fn);
                } else {
                  cancelAnimationFrame(timer);
                  that.top = 0;
                }
            });
          },500)
        }
      },
      touchStart(e) {
        this.pageX = e.targetTouches[0].pageX;
        this.pageY = e.targetTouches[0].pageY;
      },
      touchMove(e) {
        this.scrollPosition = this.myScroll.scrollTop; //获取滚动条位置
        if(this.scrollState && e.targetTouches[0].pageY > this.pageY) { //向上滑动
          if(this.myScroll.scrollTop == 0) {
            let diff = e.targetTouches[0].pageY - this.pageY - this.scrollPosition;
            this.top = Math.pow(diff, 0.9);
            let ranget = diff / document.body.clientHeight * 100; //计算在屏幕上滑动了多少
            if(ranget > 20) {
              this.state = 2;
            }else if(ranget < 15) {
              this.state = 4;
            }
            e.preventDefault();
          }
        }
      },
      touchEnd(e) {
        if(this.state == 2 || this.state == 1) { //上拉处理
          this.top = this.refreshHeight;
          this.state = 1;
          this.refreshCallback();
        }
        if(this.state == 4) {
          this.top = 0;
          this.state = 0;
        }
      },
      /**
       * 刷新回调
       */
      refreshCallback() {
        this.$emit('fresh');
      },
    }
  };
</script>

<style lang="scss" scoped>
 .allow{
    overflow:hidden;
    height: auto;
  }
  .prohibit {
    min-height: 100%;
    -webkit-overflow-scrolling: touch;
    will-change: transform;
    transition: all 450ms;
    backface-visibility: hidden;
    perspective: 1000;
  }
  .my-scroll {
    position: relative;
    .scroll-top {
      text-align: center;
      display:flex;
      position:absolute;
      top:0;
      left:0;
      width:100%;
      overflow: hidden;
      div {
        display:flex;
        height:auto;
        width:100%;
        justify-content: center;
        align-items:center;
        flex-wrap: wrap;
        p {
          flex:1 0 100%;
          font-size: 26px;
        }
      }
    }
    .loading-gif {
      width: 60px;
      height: 60px;
      margin: 0 auto 10px auto;
      display: block;
      animation: turn 1s linear infinite;
    }
    @keyframes turn {
      0% {
        transform: rotate(0deg);
      }
      100% {
        transform: rotate(360deg);
      }
    }
  }
</style>
