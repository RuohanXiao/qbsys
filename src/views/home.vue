<template>
  <!-- 此组件为入口主文件，内部包含
      net_main.vue（网络关系）
      content_main.vue（文本检索） 
      geo_main.vue（地理信息）
    三个功能子组件和
      custom_topmenu.vue（头部导航） 
      custom_nav.vue（右侧工作集）
    公共组件 -->
  <Layout>
    <Header :style="{position: 'fixed', width: '100vw', background:'black',zIndex:'99'}">
      <top-menu/>
    </Header>
    <Layout :style="{width: '100vw', overflowY:'hidden'}">
      <Content id="content">
        <nav-div/>
        <net-main v-show="($store.state.tmss === 'net')"></net-main>
        <geo-main v-show="($store.state.tmss === 'geo')"></geo-main>
        <content-main v-show="($store.state.tmss === 'content')"></content-main>
      </Content>
    </Layout>
    <Footer :style="{backgroundColor:'black',height:'0px',padding:'0'}">
    </Footer>
  </Layout>
</template>
<script>
  import $ from "jquery";
  import topMenu from "./components/custom_topmenu";
  import navDiv from "./components/custom_nav";
  import netMain from "./net_main"
  import geoMain from "./geo_main"
  import contentMain from "./content_main"
  import "../dist/assets/styles/navsytle.css";
  import "../dist/assets/styles/common.css"
  import nav from "../dist/assets/js/nav.js";
  import mock from "../mock/index.js";
  const axios = require("axios");
  const MockAdapter = require("axios-mock-adapter");
  export default {
    name: "App",
    data() {
      return {
        containerDivHeight:0,
        containerHeight:0
      }
    },
    components: {
      navDiv,
      topMenu,
      netMain,
      geoMain,
      contentMain
    },
    methods: {
      // initNode(opt) {
      //   this.netData = opt.nodes[0]
      // }
    },
    created() {
      var mthis = this
      mthis.containerDivHeight = (document.documentElement.clientHeight - 65 - 20) * 0.8;
      mthis.containerHeight = (document.documentElement.clientHeight - 65 - 20) * 0.8 - 55;
      mthis.$store.commit('setViewHeight', document.documentElement.clientHeight - 64)
      mthis.$store.commit('setNetDivHeight', mthis.containerDivHeight)
      mthis.$store.commit('setGeoDivHeight', mthis.containerDivHeight)
      mthis.$store.commit('setContentDivHeight', mthis.containerDivHeight)
      mthis.$store.commit('setNetHeight', mthis.containerHeight)
      mthis.$store.commit('setGeoHeight', mthis.containerHeight)
      mthis.$store.commit('setContentHeight', mthis.containerHeight)
    },
    mounted() {}
  }
</script>
<style scoped>
  /* 本地样式 */
</style>
<style>
  /* 全局样式 */
  .process-img {
    /* color: rgba(51, 255, 255, 0.4); */
    color: rgba(51, 255, 255, 0.6);
    size: 30px;
  }
  .bgDiv {
    width: 100%;
    height: 100%;
    position: fixed;
    display: none;
    z-index: 99;
    bottom: 0;
  }
  .layout-con {
    height: 100%;
    width: 100%;
  }
  .menu-item span {
    display: inline-block;
    overflow: hidden;
    width: 69px;
    text-overflow: ellipsis;
    white-space: nowrap;
    vertical-align: bottom;
    transition: width 0.2s ease 0.2s;
  }
  .menu-item i {
    transform: translateX(0px);
    transition: font-size 0.2s ease, transform 0.2s ease;
    vertical-align: middle;
    font-size: 16px;
  }
  .collapsed-menu span {
    width: 0px;
    transition: width 0.2s ease;
  }
  .collapsed-menu i {
    transform: translateX(5px);
    transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
    vertical-align: middle;
    font-size: 22px;
  }
  /*
                  侧导航end
                */
  .white-text {
    color: #fff;
  }
  .target-detail-div {
    height: 75px;
    width: 100%;
    border-radius: 3px;
    background-color: rgba(51, 255, 255, 0.2);
    border: solid 1px #366674;
    margin-top: 9px;
  }
  .target-detail-title {
    text-align: left;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    color: #ccffff !important;
    line-height: 41.9px;
    margin-bottom: 10px;
    padding: 0 17px !important;
  }
  .target-detail-img {
    color: rgba(51, 255, 255, 0.5);
    /* color: rgb(51, 255, 255); */
    size: 16px;
    line-height: 16px;
    padding: 0 6px !important;
  }
  .target-detail-content {
    text-align: left;
    font-family: PARaDOS;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff !important;
    padding: 0 17px !important;
    opacity: 0.5;
  }
  .demo-split {
    height: 89vh;
    border: 0px solid #dcdee2;
  }
  .demo-split-pane {
    margin: 10px 0 10px 0;
  }
  .ivu-tooltip-rel i {
    padding-left: 0px;
  }
  .bar1 {
    height: 12px;
    background-color: #33cc99;
    border-radius: 3px;
  }
  .bar2 {
    height: 12px;
    background-color: #33cccc;
    border-radius: 3px;
  }
  .bar3 {
    height: 12px;
    background-color: #3399ff;
    border-radius: 3px;
  }
  .bar4 {
    height: 12px;
    background-color: #99ffff;
    border-radius: 3px;
  }
  .changeColor {
    opacity: 40%;
  }
  .changeWidth {
    opacity: 100%;
  }
  .border-line {
    border-left: 1px solid rgba(51, 255, 255, 0.4);
    border-right: 1px solid rgba(51, 255, 255, 0.4);
  }
  .process-text {
    color: rgba(51, 255, 255, 0.4);
    font-size: 1em;
    font-family: "微软雅黑";
  }
  .ivu-tooltip-rel i {
    width: 30px;
    height: 30px;
  }
  #content {
    margin: 64px 0 0 0;
    width: 100vw;
    background: url(../dist/assets/images/bg.jpg);
    height: auto;
    overflow: hidden;
    filter: "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod='scale')";
    -moz-background-size: 100% 100%;
    background-size: 100vw 100%;
  }
  #idNumber1 {
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    text-align: left;
    height: 4vh;
    color: #ccffff;
    border: 1px solid rgba(51, 255, 255, 0.2);
    background: rgba(51, 255, 255, 0.2);
    outline: none;
    font-family: "微软雅黑";
    font-size: 18px;
  }
  #idNumber1 input[type="image"] {
    width: 25px;
    height: 25px;
    float: left;
    margin-right: 20px;
  }
  #idNumber1 input[type="text"] {
    height: 4vh;
    vertical-align: middle;
    float: left;
    color: #ccffff;
    text-align: left;
    /* background: rgba(51, 255, 255, 0); */
    background: rgba(51, 255, 255, 0.2);
  }
  #queryInput {
    width: 100%;
    border-radius: 25px;
    overflow: hidden;
    text-align: left;
    height: 4vh;
    color: #ccffff;
    border: 1px solid rgba(51, 255, 255, 0.2);
    background: rgba(51, 255, 255, 0.2);
    outline: none;
    font-family: "微软雅黑";
    font-size: 18px;
  }
  #queryInput input[type="text"] {
    /* height: 4vh; */
    vertical-align: middle;
    line-height: 40px;
    float: left;
    color: #ccffff;
    text-align: left;
    font-family: "微软雅黑";
    font-size: 14px;
    padding: 4px 0 0 0;
    /* background: rgba(51, 255, 255, 0); */
    /* background: rgba(51, 255, 255, 0.2); */
  }
  #queryInput .ivu-select-dropdown {
    left: 0px !important;
    background: rgba(0, 0, 0, 0.9) !important;
    z-index: 99;
  }
  #queryInput .ivu-select-item-focus {
    background: rgba(51, 255, 255, 0.2) !important;
  }
  #queryInput .ivu-select-item-hover {
    background: rgba(51, 255, 255, 0.2) !important;
  }
  #idNumber2 {
    width: 80%;
    margin: 25px 10px 0 0;
    color: #ccffff;
    text-align: left;
    background: rgba(51, 255, 255, 0.2);
    line-height: 4vh;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    font-size: 18px;
    text-indent: 3rem;
    min-height: 40px;
    border: 1px solid rgba(51, 255, 255, 0.2) !important;
    border-radius: 25px;
  }
  #idNumber2 input[type="text"] {
    border: none;
    background: rgba(51, 255, 255, 0);
    width: 80%;
    margin-left: 25px;
    outline-style: none;
    height: 4vh;
    vertical-align: middle;
    float: left;
    color: #ccffff;
    text-align: left;
    font-family: "微软雅黑";
    font-size: 18px;
    text-overflow: ellipsis;
  }
  .layout {
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }
  .layout-logo {
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
  }
  .layout-nav {
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
  .layout-footer-center {
    text-align: center;
  }
  .p-collapse {
    font-size: 14px;
    line-height: 38px;
    color: #ccffff;
    font-family: "微软雅黑";
  }
  .p-content {
    background-color: rgba(0, 0, 0, 1);
    font-size: 14px;
    line-height: 38px;
    color: #ccffff;
    font-family: "微软雅黑";
  }
  .ivu-collapse-content-box p {
    line-height: 30px;
    font-size: 14px;
    color: #ccffff;
    font-family: "微软雅黑";
  }
  .suojin {
    padding-left: 20px !important;
    font-size: 13px !important;
  }
  .ivu-collapse-content-box {
    padding: 0px !important;
  }
  .ivu-collapse-header {
    color: #ccffff !important;
    font-size: 14px;
    font-family: "微软雅黑";
    border: none !important;
  }
  .ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0) !important;
    padding: 0 !important;
  }
  .p-collapse-modal {
    overflow: hidden;
  }
  /* 滚动条样式 */
 .scrollBarAble {
    overflow-y: hidden;
  }
  .scrollBarAble:hover {
    overflow-y: scroll;
  }
  .scrollBarAble:hover ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  .scrollBarAble:hover ::-webkit-scrollbar-thumb {
    border: 5px solid transparent;
    background-color: rgba(0, 0, 0, 0)
  }
  .scrollBarAble:hover ::-webkit-scrollbar-thumb {
    padding-right: 5px !important;
    border-radius: 10px;
    min-height: 20px;
    background-color: #3cc;
    box-shadow: 1px 1px 3px #3cc inset;
  }
  .scrollBarAble:hover ::-webkit-scrollbar-track {
    border-radius: 2.5px !important;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0) inset;
  }
  .ivu-progress-inner {
    background-color: rgba(54, 102, 102, 0.4) !important;
  }
  /* .ivu-tabs-tab {
      color: #ccffff !important;
    } */
  .DVSL-bar-btn p {
    color: #ccffff;
  }
  .DVSL-bar-btn {
    line-height: 30px;
    color: #33ffff !important;
  }
  
  
  /* 分割线样式 */
  .ivu-split-trigger-vertical {
    width: 3px !important;
    height: 99% !important;
    background: #336666;
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
    opacity: 0.1;
  }
  .demo-split-pane {
    margin: 0px;
  }
  .scrollBarAble {
    overflow-y: hidden;
  }
  
  /* timechart样式 */
  .ivu-btn {
    background-color: rgba(0, 0, 0, 0.1) !important;
    color: rgba(51, 255, 255, 0.4) !important;
    padding: 0 !important;
    border: none !important;
  }
  /* 下拉框样式 */
  .ivu-select-selection {
    color: #33ffff !important;
    /* filter:glow(color=#CC0000 strength=20); */
    background-color: rgba(0, 0, 0, 0) !important;
    text-shadow: 0 0 0 18px #33ffff !important;
    border: none !important;
    line-height: 20px !important;
    height: 80vh;
  }
  .ivu-select-placeholder {
    color: #33ffff !important;
  }
  .ivu-select-dropdown {
    background-color: rgba(0, 0, 0, 0.8) !important;
    border: solid 1px rgba(51, 255, 255, 0.5) !important;
    border-radius: 10px !important;
    margin-top: 10px !important;
    padding-top: 10px !important;
  }
  .ivu-select-item {
    border-bottom: solid 1px rgba(0, 0, 0, 0.8) !important;
    color: #ccffff !important;
  }
  .ivu-select-item:hover {
    background-color: rgba(0, 0, 0, 0.8) !important;
    text-shadow: 0 0 18p 18px #ccffff !important;
    color: #33ffff !important;
  }
  .ivu-dropdown-item:hover {
    color: #33ffff !important;
    /* filter:glow(color=#CC0000 strength=20); */
    background-color: rgba(0, 0, 0, 0.1) !important;
    text-shadow: 0 0 0 18px #ccffff !important;
    /* text-shadow:18px #33ffff !important; */
    /* box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset; */
  }
  .ivu-dropdown-item:hover {
    color: #33ffff !important;
    /* filter:glow(color=#CC0000 strength=20); */
    background-color: rgba(0, 0, 0, 0.1) !important;
    text-shadow: 0 0 0 18px #ccffff !important;
    /* text-shadow:18px #33ffff !important; */
    /* box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset; */
  }
  .ivu-select-visible .ivu-select-selection {
    box-shadow: none !important;
  }
  .ivu-select-item-focus,
  .ivu-select-item:hover {
    background-color: rgba(0, 0, 0, 0.2) !important;
  }
  .ivu-card {
    border-radius: 0px !important;
    background: rgba(0, 0, 0, 0.8) !important;
  }
  .ivu-card-bordered {
    border: none !important;
  }
  h3 {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .ivu-tooltip-inner {
    background-color: #003333 !important;
    color: #ccffff !important;
  }
  .ivu-tooltip-arrow {
    background-color: #003333 !important;
    color: #003333 !important;
  }
  p span {
    font-family: MicrosoftYaHei !important;
  }
  .paneRight {
    border: solid 1px rgba(54, 102, 116, 0.5);
  }
  #barchart {
    width: 100%;
  }
  .button-div {
    cursor: pointer;
    color: rgba(51, 255, 255, 0.6) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }
  .button-div:hover,
  .button-div:hover>i,
  .button-div:hover>.img-content {
    cursor: pointer;
    color: rgba(51, 255, 255, 1) !important;
  } 
  .button-div-disable {
    color: rgba(51, 255, 255, 0.2) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }

  .button-div>.img-content {
    font-size: 12px;
    color: rgba(51, 255, 255, 0.6);
  }
  .button-div-disable>.img-content {
    font-size: 12px;
    color: rgba(51, 255, 255, 0.2);
  }
  .button-div>.DVSL-bar-btn-new {
    line-height: 30px;
    white-space: nowrap;
    /* padding: 0 7px; */
    text-decoration: none;
    color: rgba(51, 255, 255, 0.6);
  }
  .button-div-disable>.DVSL-bar-btn-new {
    line-height: 30px;
    white-space: nowrap;
    /* padding: 0 7px; */
    text-decoration: none;
    color: rgba(51, 255, 255, 0.2);
  }
  .divStyle {
    display: flex;
    flex-flow: row nowrap;
    height: 55px;
    padding-left: 10px;
    border-top: 1px solid rgba(54, 102, 116, 0.5);
    /* border-right:1px solid rgba(54, 102, 116, 0.5);
      border-left:1px solid rgba(54, 102, 116, 0.5); */
  }
  .divSplitLine {
    float: center;
    width: 1px;
    height: 35px;
    background: rgba(51, 255, 255, 0.2);
    margin: 10px 5px 10px 5px;
  }
  
</style>

<style scoped>
.ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    margin-bottom: 5px !important;
    background-color: rgba(51, 255, 255, 0.2) !important;
    border: 1px solid rgba(51, 255, 255, 1) !important;
  }
  .ivu-tabs-tab-active {
    background-color: rgba(51, 255, 255, 0.2) !important;
  }
</style>


