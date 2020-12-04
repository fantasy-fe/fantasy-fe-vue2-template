<template>
    <div class="index">
        <my-scroll ref="myScroll" @fresh="onRefresh" :scrollState="scrollState">
            <div slot="scrollList">
                <ul>
                    <li>
                        <span @click="handleDialogInfo1">弹窗组件1</span>
                        <span @click="handleDialogInfo2">弹窗组件2</span>
                        <span @click="handleDialogInfo3">弹窗组件3</span>
                        <span @click="handleDialogInfo4">弹窗组件4</span>
                        <span @click="handleDialogInfo5">弹窗组件5</span>
                        <span @click="handleDialogInfo6">弹窗组件6</span>
                        <span @click="handleDialogInfo7">弹窗组件7</span>
                    </li>
                    <!-- <li><span  @click="handleCitySelected">城市选择器</span></li>
                    <li><span @click="handleDateSelected">日期选择器</span></li>-->
                    <li>
                        <span @click="handleLoadingEvent">加载</span>
                    </li>
                    <li>
                        <uploader title="身份证照片">
                            <tip-mask slot="tips" skin="font-white close-button-bottom">
                                <img
                                    style="height:2.285rem;"
                                    slot="pic"
                                    src="../../../images/idcard-group.png"
                                >
                                <template slot="text">请提交身份证正反面照片
                                    <br>确保文字清晰、无反光、无遮挡
                                </template>
                            </tip-mask>
                            <div slot="imgWrapper" class="uploader-list">
                                <uploader-item
                                    desc="正面照片"
                                    ref="frontPhotoOfId"
                                    @on-change="uploadSuccess"
                                ></uploader-item>
                                <uploader-item
                                    desc="反面照片"
                                    ref="backPhotoOfId"
                                    @on-change="uploadSuccess"
                                ></uploader-item>
                            </div>
                        </uploader>
                    </li>
                    <li class="legend">
                        <span class="name">城市地区选择器</span>
                        <div class="con">
                            <vue-ios-pickers 
                            id="address"
                            :cols='3'
                            :picker-data="cityList"
                            v-model="form.idcardArea"
                            :onItemChange="handleAddrChange"
                            />
                        </div>
                    </li>
                    <li class="legend" v-if="BM_EDU.length">
                        <span class="name">日期选择选择器</span>
                        <div class="con">
                            <vue-ios-pickers date="datetime" :cols="5"/>
                        </div>
                    </li>
                    <li class="legend" v-if="BM_EDU.length">
                        <span class="name">性别</span>
                        <div class="con">
                            <vue-ios-pickers :picker-data="BM_EDU" :cols="1"/>
                        </div>
                    </li>
                    <li class="legend" v-if="BM_EDU.length">
                        <span class="name">民族</span>
                        <div class="con">
                            <vue-ios-pickers
                                v-model.number="form.nation"
                                :picker-data="BM_NATION"
                                :cols="1"
                                @onConfirm="aa"
                            />
                        </div>
                    </li>
                </ul>
            </div>
        </my-scroll>
    </div>
</template>
<script type="text/javascript">
import TipMask from "components/tips";
import Uploader from "components/upload/Uploader.vue";
import UploaderItem from "components/upload/UploaderItem.vue";
import myScroll from "@/components/common/loading/reFresh.vue";
export default {
  components: {
    Uploader,
    UploaderItem,
    TipMask,
    myScroll
  },
  data() {
    return {
      form: {
        nation: "汉族",
        idcardArea: ''
      },
      scrollState: true,
      BM_EDU: [
        [
          { code: "0", index: "0", name: "男" },
          { code: "1", index: "1", name: "女" }
        ]
      ],
      BM_NATION: [
        [{ id: "汉族", name: "汉族" }, { id: "蒙古族", name: "蒙古族" }]
      ],
      cityList: [
        [
          {
            name: "北京",
            id: "010",
            children: [
              {
                name: "北京",
                id: "0101",
                children: [
                  { name: "西城区", id: "010101" },
                  { name: "东城区", id: "010102" },
                  { name: "海淀区", id: "010103" }
                ]
              }
            ]
          },
          {
            name: "四川",
            id: "028",
            children: [
              {
                name: "成都市",
                id: "0281",
                children: [
                  { name: "武侯区", id: "02811" },
                  { name: "青羊区", id: "02812" },
                  { name: "成华区", id: "02813" },
                  { name: "锦江区", id: "02814" },
                  { name: "金牛区", id: "02815" }
                ]
              },
              {
                name: "泸州市",
                id: "0282",
                children: [
                  { name: "江阳区", id: "02821" },
                  { name: "龙马潭区", id: "02822" },
                  { name: "纳西区", id: "02823" },
                  { name: "泸县", id: "02824" }
                ]
              }
            ]
          }
        ]
      ]
    };
  },
  mounted() {},
  methods: {
    aa(name) {
      console.log("sdfadf");
    },
    onRefresh() {
      //刷新回调,发送请求成功后状态改为3，刷新完成
      setTimeout(() => {
        this.$refs.myScroll.setState(3);
        console.log("asdfa");
      }, 500);
    },
    handleAddrChange(column, newItem, oldItem){
      console.info(column, newItem, oldItem)
      console.info(arguments);
    },
    handleDialogInfo1() {
      this.$dialog.modal("提示", "请输入正确的首付金额！", false, {
        btns: ["确定", "取消"],
        callback: [
          function() {
            console.log("确认");
          },
          function() {
            console.log("取消");
          }
        ]
      });
    },
    handleDialogInfo2() {
      this.$dialog.modal("提示", "请输入正确的首付金额！", true, {
        btns: ["确定", "取消"],
        callback: [
          function() {
            console.log("确认");
          },
          function() {
            console.log("取消");
          }
        ]
      });
    },
    handleDialogInfo3() {
      /**
       * 方式2：调用的时候，选项列表为空时要设置数组为空
       */
      this.$dialog.action(
        "提示文字可以折行，最好不要超过两行",
        {},
        {
          btns: ["删除", "取消"],
          callback: [
            function() {
              console.log("删除成功");
            },
            function() {
              console.log("取消成功");
            }
          ]
        }
      );
    },
    handleDialogInfo4() {
      /**
       * 方式1：调用的时候btns这个数组要有两个值，没有删除这个按钮的时候设置为空，并且提示语即第一个参数没有的话也要设置为空
       */
      this.$dialog.action(
        "",
        {
          list: ["选项一", "选项二", "选项三"],
          callback: function(data) {
            console.log(data);
          }
        },
        {
          btns: ["", "取消"],
          callback: [
            function() {
              console.log("删除成功");
            },
            function() {
              console.log("取消成功");
            }
          ]
        }
      );
    },
    handleDialogInfo5() {
      this.$dialog.snack("请输入正确的首付金额！");
    },
    handleDialogInfo6() {
      this.$dialog.alert("请输入正确的首付金额");
    },
    handleDialogInfo7() {
      this.$dialog.toast("请输入正确的首付金额");
    },
    handleLoadingEvent() {
      this.$loading.show();
      setTimeout(() => {
        this.$loading.hide();
      }, 2000);
    },

    handleCitySelected() {
      console.log("city");
    },

    handleDateSelected() {
      console.log("date");
    },
    uploadSuccess() {
      console.log("uploadSuccess");
    },
    getCityData() {
      //http://h5pre.maimaiche.com/action/base/app/provinceAndCity
      this.$axios.crossApi("/action/base/app/provinceAndCity", {}).then(res => {
      //this.$axios.api("/resource/mwap/fcar/mmcnew/xiaojin/getResidentialAddress", {}).then(res => {
        console.info(res);
        let data = JSON.stringify(res.re);
        // 递归 可视化数据
        data = JSON.parse(
          data.replace(/cities/g, "children").replace(/areas/g, "children").replace(/code/g, "id")
        );
        this.cityList[0] = data;
      });
    }
  },
  created() {
    console.log("created");
    console.log(this.BM_EDU);
  },

  mounted() {
    /* for(let i=0;i<1*50;i++){
                // this.list.push('列表数据');
            } */
    this.getCityData();
  }
};
</script>
<style lang="scss" scoped>
span {
  display: inline-block;
  width: 30%;
  padding-bottom: 20px;
}
.legend {
  margin-left: 30px;
  padding: 2px 30px 2px 0;
  min-height: 90px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  position: relative;
  border-bottom: 1px solid #ececec;
  &:last-child {
    border-bottom: 0 none;
  }
  .name {
    margin-right: 20px;
  }
  .con {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>
