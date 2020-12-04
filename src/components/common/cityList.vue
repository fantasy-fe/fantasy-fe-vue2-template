<template>
  <div class="container">
    <header class="head" v-if="!isHideHeader">
      <em class="close" @click="onCloseHandler"></em>
      <h3>选择城市</h3>
    </header>
    <section class="city-box" :class='{"no-header": isHideHeader}' ref="cityBox" @scroll="onScrollPos">
      <div class="current" v-if="!isCurrentCity">
        <p class="title">当前定位城市</p>
        <p class="list" @click="onSelectedHandler(geoCity)">
          <span>{{ geoCity.cityName }}</span>
          <em v-show="selectedCityCode === geoCity.code" class="icon-selected"></em>
        </p>
      </div>
      <div class="hot-city" v-if="hotCitys.length">
        <p class="title">热门城市</p>
        <div class="list">
          <a v-for="item in hotCitys" :key="item.cityId" @click="onSelectedHandler(item)">
            {{ item.showCityName }}
            <em v-show="selectedCityCode === item.code" class="icon-selected"></em>
          </a>
        </div>
      </div>
      <div class="list-box" v-for="l in letter" :key="l" :ref="l">
        <p class="title">{{ l }}</p>
        <div class="list">
          <a class="list" v-for="item in allCitys[l]" :key="item.cityId" @click="onSelectedHandler(item)">
            {{ item.showCityName }}
            <em v-show="selectedCityCode === item.code" class="icon-selected"></em>
          </a>
        </div>
      </div>
      <div class="letter-box" v-if="letter.length">
        <p>
          <a v-for="l in letter" :key="l" @click="onChangeLetter(l)">{{ l }}</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import {storage} from '@/utils'
export default {
  props: {
    onClose: Function,
    onSelected: Function,
    isHideHeader: Boolean,
    isCurrentCity: Boolean
  },
  data() {
    return {
      selectedCityCode: '',
      geoCity: {},
      hotCitys: [],
      letter: [],
      allCitys: null
    };
  },
  mounted() {
    // const __selectedcity__ = JSON.parse(window.sessionStorage.getItem('__selectedcity__'));
    // this.selectedCityCode = __selectedcity__ ? __selectedcity__.code : '';
    // this.$getGeoCity().then(res => {
    //   this.geoCity = res.data;
    //   // this.saveCurrentCity(res.data);
    // });
    // this.$setPageTitle('选择城市');
    /* if(!this.allCitys){
      this.getCityList();
    } */
  },
  methods: {
    setCityList(data) {
      const allCitys = this.filterCity(data);
      this.$set(this.$data, 'allCitys', allCitys);
    },
    getCityList() {
      // this.$request({
      //   uri: '/action/base/app/cityList'
      // }).then((res) => {
      //   if (res && res.status === 1) {
      //     const hotCitys = res.data.hotCitys;
      //     const allCitys = this.filterCity(res.data.allCitys);
      //     this.$set(this.$data, 'hotCitys', hotCitys || []);
      //     this.$set(this.$data, 'allCitys', allCitys);
      //   }
      // });
      /* this.$store.dispatch('queryBaseData').then((data) => {
        const allCitys = this.filterCity(data.cityList);
        this.$set(this.$data, 'allCitys', allCitys);
      }) */
      this.$loading.show()
      const cityList = storage.getStorage('cityList');
      if(!cityList) {
        this.$axios.api('/resource/mwap/fcar/mmcnew/queryCityData', {
        }).then((res) => {
          this.$loading.hide();
          console.info(res);
          if(res && res.status == 0 && res.re) {
            const allCitys = this.filterCity(res.re.cityList);
            this.allCitys = allCitys;
            storage.setStorage('cityList', allCitys);
          }else{
            this.$dialog.toast('no city')
          }
        })
      }else {
        this.$loading.hide();
        this.allCitys = cityList
      }
      
    },
    filterCity(list) {
      if (!list || list.length === 0) return;
      const allCitys = {};
      const letter = [];
      list.map(item => {
        if (!item.cities || item.cities.length === 0) return;
        item.cities.map(val => {
          if (allCitys[val.cityIndex]) {
            allCitys[val.cityIndex].push({
              cityId: val.id,
              cityIndex: val.cityIndex,
              cityName: val.name,
              code: val.code,
              enName: val.enName,
              showCityName: val.showName
            });
          } else {
            letter.push(val.cityIndex);
            allCitys[val.cityIndex] = [{
              cityId: val.id,
              cityIndex: val.cityIndex,
              cityName: val.name,
              code: val.code,
              enName: val.enName,
              showCityName: val.showName
            }];
          }
        })
      });
      this.letter = letter.sort();
      return allCitys;
    },
    onCloseHandler() {
      if (typeof this.onClose === 'function') {
        this.onClose();
      }
      this.$emit('input', false);
    },
    onSelectedHandler(value) {
      if (typeof this.onSelected === 'function') {
        this.saveCurrentCity(value);
        this.onSelected(value);
        this.$emit('input', false);
      }
    },
    onChangeLetter(letter) {
      const ref = this.$refs;
      const el = ref[letter];
      const cityBox = ref['cityBox'];
      cityBox.scrollTop = el[0].offsetTop;
    },
    onScrollPos(evt) {
      const target = evt.target;
      console.log(target.scrollTop);
    },
    saveCurrentCity(data) {
      window.sessionStorage.setItem('__selectedcity__', JSON.stringify(data));
      this.selectedCityCode = data.code;
    }
  }
};
</script>

<style lang="less" scoped>
.container {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 333;
  width: 100%;
  background-color: #f8f8f8;
}
@size: 91px;
.head {
  height: 91px;
  line-height: 91px;
  text-align: center;
  background-color: #f8f8f8;
  border-bottom: 1px solid #ececec;
  font-size: 16/14em;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 3;
}
.close {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 90px;
  height: 90px;
  background: url('../../images/icon_close@2x.png') center center no-repeat;
  background-size: 32px;
}
.city-box {
  position: absolute;
  top: 90px;
  bottom: 0;
  width: 100%;
  overflow: auto;
  &.no-header {
    top: 0;
  }
}
html[data-app='true'] {
  .head {
    padding-top: 50px;
  }
  .city-box {
    top: 90px + 50px;
  }
}
.letter-box {
  position: fixed;
  right: 0;
  top: 90px;
  bottom: 0;
  z-index: 2;
  display: flex;
  align-items: center;
  font-size: 10/14em;
  a {
    color: #2a2a2a;
    display: block;
    text-align: center;
    padding: 5px 20px 5px 20px;
  }
}
.title {
  color: #999;
  padding: 16px 32px;
  border-top: 1px solid #ececec;
  border-bottom: 1px solid #ececec;
}
.current {
  .list {
    display: flex;
    color: #ee2a46;
    padding: 26px 88px 24px 32px;
    justify-content: space-between;
    align-items: center;
  }
}
.icon-selected {
  width: 40px;
  height: 40px;
  background: url('../../images/icon_selected@2x.png') center center no-repeat;
  background-size: contain;
}
.hot-city {
  .list {
    padding: 32px 0 32px 32px;
  }
  a {
    display: inline-block;
    vertical-align: middle;
    overflow: hidden;
    white-space: nowrap;
    margin-right: 20px;
    margin-top: 30px;
    text-align: center;
    width: 200px;
    height: 64px;
    line-height: 64px;
    border: 1px solid #dadadf;
    border-radius: 5px;
    &:nth-child(-n + 3) {
      margin-top: 0;
    }
  }
}
.list {
  padding: 0 0 0 32px;
  background-color: #fff;
}
.list-box {
  a {
    color: #60606c;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px 88px 30px 0;
    border-bottom: 1px solid #ececec;
    &:last-child {
      border-bottom: 0 none;
    }
  }
}
</style>
