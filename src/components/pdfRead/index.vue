<template>
    <div class="pdfDemo">
        <v-pdf :pdfUrl="pdfUrl"></v-pdf>
    </div>
</template>
<script>
import pdf from "./pdfreader";
export default {
  props: {
    pdfUrl: {
      type: String
    },
  },
  data() {
    return {
      //  pdfUrl: '../../static/test.pdf'//本地调试
      //pdfUrl: require("../../docs/2019-05-13_6_3-1.pdf")
    };
  },
  components: {
    "v-pdf": pdf
  }
};
</script>
<style>

</style>