<template>
    <div class="uploader-card">
        <input type="file" ref="file" accept="image/*" style="display: none;" @change="handleChange">
        <div class="img-card" :class="[{'img-add': !imgSrc && !showError},{'no-border': !!imgSrc},
        {'img-fail': showError},
        {'img-idfront': isIdFront},{'img-idback': isIdBack},
        {'img-drifront': isDriFront},{'img-driback': isDriBack}]" @click="handleClick">
            <div v-show="showIndicator" class="uploader-mask">
                <span class="loading-snake"></span>
            </div>
            <img class="uploader-img" :src="imgSrc" alt="" v-show="imgSrc">
            <i class="img-remove" @click.stop="handleRemove" v-show="imgSrc && !disabled || showIndicator"></i>
        </div>
        <span class="img-desc" :class="{'desc-error': showError}" v-html="imgDesc"></span>
    </div>
</template>
<script>
import {  canvasResize } from "libs";
import { generate } from "@fczbkk/uuid4";
let noop = function() {};
let types = ['image/jpeg', 'image/jpg', 'image/bmp', 'image/png'];
export default {
    name: 'UploaderItem',
    props: {
        name: '',
        imgUrl: {
            type: String,
            default: ""
        },
        desc: '',
        disabled: Boolean,
        bizType: {
            type: String,
            default: '100'
        },
        isEmpty: Boolean,
        multiple: Boolean,
        apiUrl: '',
        isIdFront: false,
        isIdBack:false,
        isDriFront:false,
        isDriBack:false
    },
    data() {
        return {
            base64Data: '',
            url: this.imgUrl,
            imgDesc: this.desc || '上传',
            errorDesc: '失败，重新上传',
            showIndicator: false,
            showError: false,
            fileType: '',
            param: '?w=320&h=204&p=1',
        }
    },
    computed: {
        // url(){
        //     return this.imgUrl;
        // },
        // 传prop时 src = url
        // 上传成功后直接赋值 src = dataUrl(base64), 不用再请求图片url
        imgSrc: {
            get() {
                return this.isEmpty ? '' : this.base64Data || this.url;
            },
            set(newValue) {
                if (newValue === '') {
                    this.base64Data = '';
                    this.url = '';
                }
            }
        },
        isUrl() {
            return /http/.test(this.imgSrc);
        }
    },
    methods: {
        getValue() {
            return this.url;
        },
        isImage(type) {
            return types.includes(type);
        },
        isLt5M(size) {
            const maxFileSize = 5;
            return size / 1024 / 1024 < maxFileSize;
        },
        // base64转blob
        base64ToBlob(base64, mime) {
            base64 = base64.split(',')[1];
            mime = mime || '';
            var sliceSize = 1024;
            var byteChars = window.atob(base64);
            var byteArrays = [];
            for (var offset = 0, len = byteChars.length; offset < len; offset += sliceSize) {
                var slice = byteChars.slice(offset, offset + sliceSize);
                var byteNumbers = new Array(slice.length);
                for (var i = 0; i < slice.length; i++) {
                    byteNumbers[i] = slice.charCodeAt(i);
                }
                var byteArray = new Uint8Array(byteNumbers);
                byteArrays.push(byteArray);
            }
            return new Blob(byteArrays, {
                type: mime
            });
        },
        handleClick(e) {
            if (this.disabled || this.showIndicator) return;
            var fileInput = this.$refs.file;
            // 每次选择文件之前 清空value 以触发change事件
            fileInput.value && (fileInput.value = '');
            fileInput.click();
        },
        handleChange(e) {
            // this.$refs.file.value = '';
            const files = e.target.files;
            if (files.length === 0) return;
            let file = files[0];
            // 适配中兴手机和部分安卓机型原生浏览器，上传图片后中兴手机自带浏览器会将图片类型的文件的type清空并将文件名后缀去除，部分安卓机型会清空图片类型文件的type
            let fileType = file.type
            if (!fileType) { // type为空时生成一个新的type
                let imgName = file.name
                let imgType = imgName.split('.').pop().toLowerCase()
                if (imgType === 'jpg' || (imgName.split('.').length === 1)) { // 中兴手机会将文件名后缀去除，所以imgName.split(".").length等于1，此时强制将其type设为jpeg
                    imgType = 'jpeg'
                }
                fileType = 'image/' + imgType
            }
            if (!this.isImage(fileType)) {
                this.$dialog.toast("仅支持JPEG，JPG，BMP，PNG格式图片");
                return;
            }
            this.fileType = fileType;
            if (!this.isLt5M(file.size)) {
                this.$dialog.toast('图片过大，请重新选择');
                return;
            }
            this.uploadFile(file);
        },
        handleRemove(e) {
            
            this.showIndicator = false;
            this.multiple && this.$emit('on-remove', this.url);
            this.imgSrc = '';
            // 触发父组件change事件，判断当前是否有上传文件
            this.$emit('on-change',!!this.url);
        },
        uploadFile(file) {
            var self = this;
            this.showIndicator = true;
            this.showError = false;
            this.imgDesc = this.desc || '上传';
            const q = new Promise(resolve => {
                if(file.size < 1e5){
                    // 图片小于100k不压缩，防止图片过小被压变形、被切割
                    let reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                        resolve(reader.result);
                    };
                } else{
                    // canvas压缩
                    canvasResize(file, {
                        width: 1200,
                        height: 1200,
                        crop: false,
                        quality: 80,
                        rotate: 0,
                        callback: (data) => {
                            resolve(data);
                        }
                    })
                }
            });
            q.then(dataUrl => {
                // 单个上传组件实例 src = base64Data时 比对选中的文件和当前base64Data是否相同
                // 否则则不上传 避免资源浪费
                if (this.base64Data === dataUrl) {
                    this.$dialog.toast('请勿重复上传');
                    this.showIndicator = false;
                    return;
                }
                this.upload(dataUrl);
            });
        },
        // fetchData () {
        //     this.$axios.api('/resource/mwap/fcar/mmcnew/drivingLicenseUploadAndOCR',{}).then(data => {
        //         console.info(data);
        //     })
        // },
        upload(dataUrl) {
            let self = this;
            let base64 = dataUrl.split(',')[1];
            let type = this.fileType.split('\/')[1];
            this.$axios.api("/resource/mwap/fcar/mmcnew/imageUpload", {
                charactersFiles: {
                    [generate() + '.' + type]: base64
                },
                businessType: this.bizType
            }).then(data => {
                // 当前图片资源置空
                // 图片数组中删除原图片
                this.multiple && this.$emit('on-remove', this.url);
                this.imgSrc = '';
                this.showIndicator = false;
                if (data && data.status == 0) {
                    this.base64Data = dataUrl;
                    this.url = data.re.fileUrl;
                    (this.isEmpty || this.multiple) && this.$emit('on-add', this.url);
                    //
                    this.$emit('on-change',!!this.url);
                } else {
                    this.imgSrc = '';
                    this.imgDesc = this.errorDesc;
                    this.showError = true;
                }
            }).catch(data => {
                this.showIndicator = false;
                this.imgSrc = '';
                this.imgDesc = this.errorDesc;
                this.showError = true;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .tips-text{
        color: #fff;
    }
</style>
