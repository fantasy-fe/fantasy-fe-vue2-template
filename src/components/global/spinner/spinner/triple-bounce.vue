<template>
    <div class="spinner-triple-bounce">
        <div class="spinner-triple-bounce-bounce1" :style="bounceStyle"></div>
        <div class="spinner-triple-bounce-bounce2" :style="bounceStyle"></div>
        <div class="spinner-triple-bounce-bounce3" :style="bounceStyle"></div>
    </div>
</template>

<script>
    import common from './common.vue';

    export default {
        name: 'triple-bounce',

        mixins: [common],

        computed: {
            spinnerSize() {
                return ((this.size || this.$parent.size || 28) / 3) + 'px';
            },

            bounceStyle() {
                return {
                    width: this.spinnerSize,
                    height: this.spinnerSize,
                    backgroundColor: this.spinnerColor
                };
            }
        }
    };
</script>

<style lang="css">
    .spinner-triple-bounce {
    }

    .spinner-triple-bounce-bounce1, .spinner-triple-bounce-bounce2, .spinner-triple-bounce-bounce3 {
        border-radius: 100%;
        display: inline-block;
        animation: spinner-triple-bounce 1.4s infinite ease-in-out both;
    }

    .spinner-triple-bounce-bounce1 {
        animation-delay: -0.32s;
    }

    .spinner-triple-bounce-bounce2 {
        animation-delay: -0.16s;
    }

    @keyframes spinner-triple-bounce {
        0%, 80%, 100% {
            transform: scale(0);
        }
        40% {
            transform: scale(1.0);
        }
    }
</style>
