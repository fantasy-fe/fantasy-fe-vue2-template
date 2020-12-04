<template>
  <div class="pdfDemo">
    <v-pdf :pdfUrl="pdfUrl"></v-pdf>
  </div>
</template>
<script>
    import pdf from './pdf'
    export default {
        data() {
            return{
                //  pdfUrl: '../../static/test.pdf'//本地调试
                //pdfUrl: require('../../../docs/demo.pdf')
                pdfUrl: 'https://udfs.10101111.com/ucarudfs/resource/R__T__xj/test.pdf'
            }
        },
        components: {
            'v-pdf': pdf
        }
    }
</script>
<style>
    .pdfDemo{
        border: 2px solid aqua;
    }
</style>