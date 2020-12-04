<template>
    <div class="vue-mask-tips" :class="skin">
        <div class="vue-mask-tips-ico pic5" @click.stop="show"></div>
        <div class="mask" :class="{'show':open}" v-show="open" @click.stop>
            <div class="vue-mask-tips-imgbox">
                <slot name="pic"></slot>
                <span class="tips-text">
                    <slot name="text"></slot>
                </span>
            </div>
            <a class="vue-mask-tip-close" @click.stop="hide"></a>
        </div>
    </div>
</template>
<style lang="scss">
.vue-mask-tips {
    display: inline-block;
    vertical-align: middle;
    .vue-mask-tips-ico {
        background-size: 100% auto;
        margin-left: 8px;
        width: 30px;
        height: 32px;
        background-repeat: no-repeat;
    }
    .vue-mask-tips-imgbox {
        overflow: hidden;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        img {
            height: 420px;
        }
    }
    .tips-text {
        z-index: 300;
        color: #ffa300;
        font-size: 24px;
        line-height: 1.5;
        display: block;
        text-align: center;
        margin-top: 1rem;
    }
    .vue-mask-tip-close {
        width: 60px;
        height: 60px;
        background: url(../../images/close_white.png) no-repeat;
        background-size: auto 100%;
        position: absolute;
        bottom: 135px;
        left: 350px;
    }
}

.vue-tip-orange {
    .vue-mask-tips-ico {
        background-image: url(../../images/tip-orange.png)
    }
}

.mask {
    transition: all .5s ease;
    opacity: 0;
    position: fixed;
    height: 100%;
    width: 100%;
}

.show {
    background: rgba(0, 0, 0, .7);
    z-index: 200;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    opacity: 1;
}
.reg-date{
    .tips-text {
        margin-top: -14px;
    }
}
.font-white{
	&.vue-mask-tips .vue-mask-tips-imgbox{
		width: 100%;
		text-align: center;
	}
	.tips-text {
		padding-left: 30px;
	    padding-right: 30px;
        color: #fff;
    }
}
.text-left{
	.tips-text {
        text-align: left;
    }
}
.close-button-bottom{
    .vue-mask-tip-close{
        bottom: 48px;
    }
}
</style>
<script>
import {
    util
} from "utils";
export default {
    created() {

        },
        props: {
            skin: {
                type: String,
                default: ""
            }
        },
        data() {
            return {
                open: 0,
                deviceHeight: 0
            }
        },
        methods: {
            touchmove(e) {
                e.preventDefault();
            },
            show: function() {
                this.deviceHeight = util.page.getViewHeight();
                this.open = 1;
                document.body.addEventListener('touchmove', this.touchmove, false);
            },
            hide: function() {
                document.body.removeEventListener('touchmove', this.touchmove, false);
                this.open = 0;
            }
        }
}
</script>
