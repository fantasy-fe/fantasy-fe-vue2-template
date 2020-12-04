<template>
    <div class="uploader-wrapper">
        <span class="uploader-title" v-if="title" v-text="title"></span>
        <slot name="tips"></slot>
        <slot name="imgWrapper">
            <div class="uploader-list" v-show="multiple">
                <uploader-item v-for="file in fileList" :key="file" :img-url="file" :multiple="multiple" :disabled="disabled" name="name" @on-add="onAdd" @on-remove="onRemove"></uploader-item>
                <uploader-item ref="plus" :desc="desc" :is-empty="true" v-show="showAdd" @on-add="onAdd" @on-remove="onRemove"></uploader-item>
            </div>
        </slot>
        <slot name="desc"></slot>
    </div>
</template>
<style lang="scss">
@import "../../styles/uploader.scss";
</style>
<script>
import UploaderItem from "./UploaderItem";
var noop = function() {};
export default {
    name: 'Uploader',
    props: {
        name: '',
        title: '',
        desc: '',
        subdesc: '',
        // 包含多个同类型图片时
        fileList: {
            type: Array,
            default () {
                return []
            }
        },
        // 表示最多可有多少同类型图片，默认20
        // 超出限额，则隐藏长传入口
        max: {
            type: Number,
            default: 20,
        },
        // 该组件是否包含多个同类型的图片，例如 银行流水证明
        multiple: Boolean,
        disabled: Boolean
    },
    computed:{
        imgUrls(){
            return this.fileList
        },
        showAdd(){
            return !this.disabled && this.imgUrls.length < 20;
        }
    },
    data() {
        return {

        }
    },
    components: {},
    methods: {
        // 包含多个uploaderitem实例的操作方法
        onAdd(file) {
			if(this.imgUrls.includes(file)){
				this.$dialog.toast('请勿重复上传');
				return;
			}
			this.imgUrls.push(file);
            // 触发父组件change事件, 判断当前组是否有图片上传
            this.$emit('on-change',!!this.imgUrls.length);
        },
        onRemove(file) {
            let index = this.imgUrls.indexOf(file);
            this.imgUrls.splice(index, 1);
            this.$emit('on-change',!!this.imgUrls.length);
        },
        getValue() {
            return this.imgUrls.map(x => x);
        }
    },
    components: {
        UploaderItem
    }
}
</script>
