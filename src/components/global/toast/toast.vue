<template>
    <transition name="toast-pop">
        <div class="toast" v-show="visible" :class="customClass" :style="{ 'padding': iconClass === '' ? '10px' : '20px' }">
            <i class="toast-icon" :class="iconClass" v-if="iconClass !== ''"></i>
            <span class="toast-text" :style="{ 'padding-top': iconClass === '' ? '0' : '10px' }">{{ message }}</span>
        </div>
    </transition>
</template>
<style scoped>
    .toast {
        position: fixed;
        max-width: 80%;
        border-radius: 5px;
        background: #333;
        color: #fff;
        box-sizing: border-box;
        text-align: center;
        z-index: 1000;
        -webkit-transition: opacity .3s linear;
        transition: opacity .3s linear
    }
    .toast.is-placebottom {
        bottom: 50px;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }
    .toast.is-placemiddle {
        left: 50%;
        top: 50%;
        -webkit-transform: translate(-50%, -50%);
        transform: translate(-50%, -50%)
    }
    .toast.is-placetop {
        top: 50px;
        left: 50%;
        -webkit-transform: translate(-50%, 0);
        transform: translate(-50%, 0)
    }
    .toast-icon {
        display: block;
        text-align: center;
        font-size: 56px 
    }
    .toast-text {
        font-size: 14px;
        display: block;
        text-align: center
    }
    .toast-pop-enter, .toast-pop-leave-active {
        opacity: 0
    }
</style>
<script type="text/babel">
    export default {
        props: {
            message: String,
            className: {
                type: String,
                default: ''
            },
            position: {
                type: String,
                default: 'middle'
            },
            iconClass: {
                type: String,
                default: ''
            }
        },

        data() {
            return {
                visible: false
            };
        },

        computed: {
            customClass() {
                var classes = [];
                switch (this.position) {
                    case 'top':
                        classes.push('is-placetop');
                        break;
                    case 'bottom':
                        classes.push('is-placebottom');
                        break;
                    default:
                        classes.push('is-placemiddle');
                }
                classes.push(this.className);

                return classes.join(' ');
            }
        }
    };
</script>
