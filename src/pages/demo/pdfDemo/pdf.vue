<template>
    <div class="pdfContent">
      
        
        <canvas v-for="page in pages" :id="'canvas'+page" :key="page"></canvas>
   
     
      <div class="zoombar">
        <img class="icon icon-add" src="@/images/zoomin.png" @click="iconAdd">
        <img class="icon icon-jian" src="@/images/zoomout.png" @click="iconJian">
      </div>
    </div>
</template>
<script>
import PDF from "pdfjs-dist";
import workerSrc from 'pdfjs-dist/build/pdf.worker'


export default {
  name: "pdf",
  data() {
    return {
      width: 100,
      height: 100,
      pages: 0,
      pdfDoc: "",
      pageNo: 1
    };
  },
  props: ["pdfUrl"],
  mounted (){
    //console.info('this.pdfUrl: ', this.pdfUrl);
    //this.pdfRender(this.pdfUrl)
  },
  methods: {
     /*加载PDF文件*/
    loadFile: function(url) {
      let _this = this;
      //https://unpkg.com/pdfjs-dist@1.9.426/cmaps/
      var CMAP_URL = '/static/cmaps/';
      var CMAP_PACKED = true;
    
      PDF.GlobalWorkerOptions.workerSrc = workerSrc
      PDF.getDocument({
        url: url,
        cMapUrl: CMAP_URL,
        cMapPacked: CMAP_PACKED,
      }).then(function(pdf) {
        _this.pdfDoc = pdf;
        _this.pages = _this.pdfDoc.numPages;
        _this.$nextTick(() => {
          _this.renderPage(1);
        });
      });
    },
    /*渲染PDF文件*/
    renderPage: function(num) {
      let _this = this;
      this.pdfDoc.getPage(num).then(function(page) {
        let canvas = document.getElementById("canvas" + num);
        let ctx = canvas.getContext("2d");
        let dpr = window.devicePixelRatio || 1; //设备像素比
        let bsr =
          ctx.webkitBackingStorePixelRatio ||
          ctx.mozBackingStorePixelRatio ||
          ctx.msBackingStorePixelRatio ||
          ctx.oBackingStorePixelRatio ||
          ctx.backingStorePixelRatio ||
          1; //浏览器在渲染canvas之前会用几个像素来来存储画布信息,类似img
        let ratio = dpr / bsr;
        var viewport = page.getViewport(
          screen.availWidth / page.getViewport(1).width
        ); //用户网页的可视区域
        canvas.width = viewport.width * ratio; //画布大小,默认值是width:300px,height:150px
        canvas.height = viewport.height * ratio;
        canvas.style.width = viewport.width + "px"; //画布的框架大小
        canvas.style.height = viewport.height + "px";
        ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
        var renderContext = {
          canvasContext: ctx,
          viewport: viewport
        };
        page.render(renderContext);
        if (_this.pages > num) {
          _this.renderPage(num + 1);
        }
      });
    },

    /*放大PDF文件*/
    iconAdd: function() {
      let pageNum = document.querySelectorAll("canvas").length;
      this.width += 20;
      this.height += 20;
      for (var i = 0; i < pageNum; i++) {
        document.querySelectorAll("canvas")[i].style.width = this.width + "%";
        document.querySelectorAll("canvas")[i].style.height = this.height + "%";
      }
    },
    /*缩小PDF文件*/
    iconJian: function() {
      if (this.width == 100) return;
      let pageNum = document.querySelectorAll("canvas").length;
      this.width -= 20;
      this.height -=20;
      for (var i = 0; i < pageNum; i++) {
        document.querySelectorAll("canvas")[i].style.width = this.width + "%";
        document.querySelectorAll("canvas")[i].style.height = this.height + "%";
      }
    }
  },
  created: function() {
    this.loadFile(this.pdfUrl);
  }
};
</script>
<style lang="scss" >
.pdfContent{
   overflow-y: auto;
}
.zoombar{
  
  .icon {
    width: 50px;
    height: 50px;
    margin-bottom: 10px;
    position: fixed;
    z-index: 100;
    
  }
  .icon-add {
    bottom: 100px;
  }
  .icon-jian{
    width:45px;
    height:45px;
    bottom: 30px;
  }
}

.icon-jian {
  bottom: 2.22rem;
}
@mixin ucar-line-arrows ($size: 12px) {
  display: block;
  width: $size;
  height: $size;
  transform: rotate(45deg);
  transform-origin: $size $size;
}
.pager {
    position: absolute;
    top: 45%;
    width: 60px;
    height: 120px;
    background-color: rgba(0,0,0,.3);
    &.prev{
      left: 0;
      &:before{
        position: absolute;
        top: 40px;
        left: 0;
        content: '';
        display: block;
        @include ucar-line-arrows(30px);
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform-origin: 20px 20px;
        margin-left: 20px;
      }
    }
    &.next{
      right: 0;

      &:before{
        position: absolute;
        top: 40px;
        left: 0;
        content: '';
        display: block;
        @include ucar-line-arrows(30px);
        border-right: 2px solid #fff;
        border-top: 2px solid #fff;
        transform-origin: 20px 20px;
        margin-right: 20px;
      }
    }
  }
</style>