import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const state = {
  tag: 'net',
  customDivHeight: 0,
  customCanvasHeight: 0,
  netDataObj:{}, // 用于netchart传参
  geoDataObj:{}, // 用于geochart传参
  contentDataObj:{} // 用于contentchart传参
}

const mutations = {
  // 点击收起或展开时画布区域高度 网络关系画布\地图画布\文本显示区域及对应容器的高度变化
  showTime: state => {
    state.customDivHeight = (document.documentElement.clientHeight - 64 - 20) * 0.8 + "px";
    state.customCanvasHeight = (document.documentElement.clientHeight - 64 - 20) * 0.8 - 55 + "px";
  },
  hiddenTime: state => {
    state.customDivHeight = (document.documentElement.clientHeight - 64 - 20) + "px";
    state.customCanvasHeight = (document.documentElement.clientHeight - 64 - 20) - 55 + "px";
  },
  // 点击头部导航栏切换tag
  changeToNet: state => {
    state.tag = 'net'
  },
  changeToGeo: state => {
    state.tag = 'geo'
  },
  changeToContent: state => {
    state.tag = 'content'
  }
}

const store = new Vuex.Store({
  state: state,
  mutations: mutations
})

export default store;