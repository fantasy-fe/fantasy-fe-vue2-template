<template>
    <transition :name="transition">
        <div class="m-dialog" v-if="show">
            <div class="popup" v-if="type === 'popup'">
                <div>
                    <p>{{title}}</p>
                    <ul v-if="list.length>0">
                        <li
                            v-for="(item, index) in list"
                            :key="item"
                            @click="clickEvent(item, index)"
                        >{{html}}</li>
                    </ul>
                </div>
            </div>
            <div class="mask" :data-type="type"></div>
        </div>
    </transition>
</template>

<script>
export default {
  data() {
    return {};
  },
  watch: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
.m-dialog {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 999;
}
.wrapper {
  position: absolute;
  left: 0;
  right: 0;
  top: 50%;
  margin-top: -25%;
  transform: translate3d(0, -50%, 1px);
  margin: auto;
  z-index: 2;
  width: 80%;
  overflow: hidden;
  border-radius: 6px;
  background-color: #fff;
  font-size: 26px;
}
.action {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  width: 100%;
  background-color: #fff;
  font-size: 24px;
  li {
    text-align: center;
    line-height: 70px;
    border-bottom: 1px solid #ccc;
    &:last-child {
      border-bottom: none;
    }
  }
  .btn-cancel {
    border-top: 5px solid #ccc;
  }
  .action-content {
    width: 100%;
    text-align: center;
    p {
      width: 100%;
      color: #aaa;
      padding: 20px;
      line-height: 40px;
      border-bottom: 1px solid #ccc;
    }
    .btn {
      display: block;
    }
  }
}
.toast {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 300px;
  margin: 0 auto;
  width: 600px;
  padding: 20px;
  border-radius: 6px;
  color: #fff;
  text-align: center;
  background-color: rgba(68, 68, 68, 0.7);
  z-index: 2;
}
.snack {
  position: absolute;
  left: 0;
  right: 0;
  bottom: -20%;
  width: 100%;
  padding: 30px 20px;
  color: #fff;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 2;
  animation: snack ease-in 0.5s;
  animation-fill-mode: forwards;
}
@keyframes snack {
  0% {
    bottom: -20%;
  }
  100% {
    bottom: 0;
  }
}
.content {
  padding: 0 60px;
  margin: 50px 0;
  line-height: 1.5;
  max-height: 500px;
  overflow: auto;
  word-break: break-all;
  text-align: center;
  &[data-left="true"] {
    text-align: left;
  }
  .input {
    border: 1px solid #cccccc;
    padding: 20px;
    box-sizing: border-box;
    margin-top: 40px;
    width: 100%;
    height: 70px;
    font-size: 26px;
  }
  .error {
    color: #ee2a46;
    margin-top: 20px;
  }
}
.header {
  padding: 40px 60px;
  border-bottom: 1px solid #f0f0f0;
}
.footer {
  display: flex;
  text-align: center;
  justify-content: space-between;
  border-top: 1px solid #f0f0f0;
}
.btn {
  flex: 1;
  line-height: 70px;
}
.btn-confirm {
  color: #ee2a46;
  position: relative;
  &:before {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 1px;
    background-color: #f0f0f0;
  }
}
.mask {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 200%;
  background-color: #000;
  opacity: 0.3;
  z-index: 1;
  &[data-type="toast"] {
    opacity: 0.01;
  }
}
</style>
