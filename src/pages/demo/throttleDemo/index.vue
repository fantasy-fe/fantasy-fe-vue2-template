<template>
    <div>
        <h1>Throttle Demo</h1>
        <p>
            <span></span>
            <input type="text" v-model="val" @input="handleInputChange" />
        </p>
    </div>
</template>

<script>
import { storage ,util } from '@/utils'
export default {
    data() {
        return {
            val: '1',
            handleInputChange: () => {}
        }
    },
     created () {
         const self = this;
        /* this.handleInputChange = this.throttle(()=> {
            console.info('handleInputChange');
            this.delayFn();
        }, 1000) */
        this.handleInputChange = util.throttle(function(){self.delayFn();}, 1000)();
    },

    methods: {
        delayFn(){
            console.info('delayFn');
        },
        /**
         * 函数节流方法
         * @param Function fn 延时调用函数
         * @param Number delay 延迟多长时间
         * @return Function 延迟执行的方法
         */
        throttle (fn, delay) {
            //console.info('throttle');
            //console.info(fn);
            var timer = null;
            return function () {
                clearTimeout(timer);
                timer = setTimeout(function() {
                    //console.info('timeout');
                    fn();
                }, delay);
            }
        },

    }
}
</script>

<style>

</style>
