<style>
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
  .info-list {
    background-image: linear-gradient( 8deg, rgba(102, 255, 153, 0.14) 0%, rgba(102, 128, 204, 0.14) 60%, rgba(102, 0, 255, 0.14) 100%), linear-gradient(#000000, #000000);
    background-blend-mode: normal, normal;
    border-radius: 0px 0px 0px 0px;
    border: solid 1px #336666;
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
  #tab1 {
    background: -webkit-linear-gradient( bottom, rgba(102, 0, 255, 0.2), rgba(102, 255, 103, 0.2));
    /* Safari 5.1 - 6 */
    background: -o-linear-gradient( bottom, rgba(102, 0, 255, 0.2), rgba(102, 255, 103, 0.2));
    /* Opera 11.1 - 12*/
    background: -moz-linear-gradient( bottom, rgba(102, 0, 255, 0.2), rgba(102, 255, 103, 0.2));
    /* Firefox 3.6 - 15*/
    background: linear-gradient( to bottom, rgba(102, 0, 255, 0.2), rgba(102, 255, 103, 0.2));
    /* 标准的语法 */
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
  .process-img {
    /* color: rgba(51, 255, 255, 0.4); */
    color: rgb(51, 255, 255);
    size: 30px;
    opacity: 0.4;
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
    background: rgba(0, 0, 0, 0.5) !important;
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
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    background: rgba(51, 255, 255, 0.2);
  }
  .ivu-tabs-bar {
    border-bottom: 1px solid rgba(51, 255, 255, 0.2) !important;
  }
  /* 滚动条样式 */
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
  ::-webkit-scrollbar-track,
  ::-webkit-scrollbar-thumb {
    /* border-radius: 999px; */
    border: 5px solid transparent;
  }
  :hover::-webkit-scrollbar-track {
    border-radius: 2.5px !important;
    box-shadow: 1px 1px 5px rgba(24, 255, 255, 0.5) inset;
  }
  ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0) inset;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 2.5px !important;
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0) inset;
  }
  ::-webkit-scrollbar-corner {
    background: transparent;
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab-active {
    border: 1px solid rgba(54, 102, 102, 0.1) !important;
    border-radius: 3px !important;
    -moz-border-radius: 3px !important;
    /* Old Firefox */
    background-color: rgba(51, 255, 255, 0.2) !important;
  }
  .ivu-progress-inner {
    background-color: rgba(54, 102, 102, 0.4) !important;
  }
  .ivu-tabs-tab {
    color: #ccffff !important;
  }
  .DVSL-bar-btn p {
    color: #ccffff;
  }
  .DVSL-bar-btn {
    line-height: 30px;
    color: #33ffff !important;
  }
  .vertical-center-modal {
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }
  /* 弹出框样式 */
  .ivu-modal-mask {
    /* background-color:rgba(0,0,0,0.6) !important; */
    background-color: rgba(0, 0, 0, 0.7) !important;
  }
  .ivu-modal-content {
    background-color: rgba(0, 0, 0, 0.7) !important;
    border-radius: 20px !important;
    border: solid 1px rgba(51, 255, 255, 0.5) !important;
  }
  .ivu-modal-footer {
    border: none !important;
  }
  .ivu-modal-body {
    padding: 0 !important;
  }
  .leftModal {
    background-image: linear-gradient( 8deg, rgba(102, 255, 153, 0.14) 0%, rgba(102, 128, 204, 0.14) 60%, rgba(102, 0, 255, 0.14) 100%), linear-gradient(#000000, #000000);
    border-top-left-radius: 25px;
    border-bottom-left-radius: 25px;
    border-right: solid 1px #336666;
  }
  .rightModal {
    border-top-right-radius: 25px;
    border-bottom-right-radius: 25px;
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
  .p-collapse-modal {
    font-size: 16px;
    line-height: 38px;
    height: 75px;
    color: #ccffff;
    font-family: "微软雅黑";
    background-color: rgba(51, 255, 255, 0.1);
    border: solid 1px #336666;
    margin-left: 5px;
    margin-top: 5px;
    padding: 0 10px;
  }
  .p-collapse-modal-small {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  p span {
    font-family: MicrosoftYaHei !important;
  }
  .paneRight {
    border: solid 1px rgba(54, 102, 116, 0.5);
  }
  .ivu-tabs.ivu-tabs-card>.ivu-tabs-bar .ivu-tabs-tab {
    font-family: MicrosoftYaHei !important;
    margin-right: 0px !important;
    border: none !important;
    border-radius: 0 !important;
    border: 1px solid rgba(54, 102, 102, 0.1) !important;
    -moz-border-radius: 3px !important;
    background-color: rgba(51, 255, 255, 0.1) !important;
  }
  #barchart {
    width: 100%;
  }
  .scorll-bar:hover::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3) !important;
    border-radius: 10px !important;
    background-color: #F5F5F5 !important;
  }
  .scorll-bar:hover::-webkit-scrollbar {
    width: 12px !important;
    background-color: #F5F5F5 !important;
  }
  .scorll-bar:hover::-webkit-scrollbar-thumb {
    border-radius: 10px !important;
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3) !important;
    background-color: #D62929 !important;
  }
</style>
<template>
  <div class="layout" :style="{width: '100vw',height: '100vh', background:'black'}">
    <Layout :style="{width: '98vw',height: '100vh'}">
      <Header :style="{position: 'fixed', width: '100vw', background:'black',zIndex:'99'}">
        <Row type="flex" justify="space-between" class="code-row-bg" align="middle">
          <Col span="1" align="middle">
          <router-link to="/">
            <img src="../dist/assets/images/net.png" style="display: inline-block; vertical-align: middle; width:3em;" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/geoView" target='_blank'>
            <img src="../dist/assets/images/earth.png" style="display: inline-block; vertical-align: middle;width:3em" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/contentView" target='_blank'>
            <img src="../dist/assets/images/content.png" style="display: inline-block; vertical-align: middle;width:3em" /></router-link>
          </Col>
          <Col span="4" offset="17">
          <!-- <i class="icon iconfont icon-search  process-img" style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i>
            <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfo" filterable remote placeholder='' :remote-method="searchInfo" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v,'type')}">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select> -->
          <search-div @initNodes="initNode" />
          </Col>
        </Row>
      </Header>
      <Content :style="{marginTop:'64px', width: '100vw'}" id="content">
        <div class="rightNav" :style="{height:contentHeight,display:'flex'}">
          <div class="navStyleTitle right" :style="{position: 'initial',zIndex: '999999',width:'2vw',bottom:'1px',display:'flex'}">
            <div class="floater">
              <div :style="{height:'5vh'}">
                <Icon class="icon iconfont icon-file process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" />
              </div>
              <div :style="{height:'5vh'}">
                <Icon class="icon iconfont icon-image process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" />
              </div>
              <div :style="{height:'5vh'}">
                <Icon class="icon iconfont icon-question process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" />
              </div>
              <div :style="{height:'5vh'}">
                <Icon class="icon iconfont icon-yidiandiantubiao08 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" />
              </div>
            </div>
          </div>
          <div :style="{height:rightNav,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">2222222</div>
        </div>
        <div class="bgDiv"></div>
        <div class="demo-split" :style="{height:contentHeight}">
          <Split v-model="split1" :max="max" :min="min">
            <div slot="left" class="demo-split-pane" display='flex' :style="{height:contentHeight}">
              <!-- <h1>this is left</h1> -->
              <net-chart-div @selectNodes1="selectNodes" id="net" :style="{height:netpxdiv}" :netHeight="netpx" :netData="netData"></net-chart-div>
              <time-chart-div :splitWidth="splitWidth" :split="split1"></time-chart-div>
              
            </div>
            <div slot="right" class="scorll-bar demo-split-pane paneRight" :style="{height:eventheightdiv,marginRight:'2.3vw'}">
              <event-chart-div :dataExpand="dataexpand"></event-chart-div>
            </div>
          </Split>
        </div>
      </Content>
      <footer :style="{backgroundColor:'black',height:'1px'}"></footer>
    </Layout>
  </div>
</template>
<script>
  import $ from "jquery";
  // import echarts from 'vue-echarts'
  // import timeDiv from './component/custom_timediv'
  import netChartDiv from "./component/custom_netdiv";
  import timeChartDiv from "./component/custom_timediv";
  import eventChartDiv from "./component/custom_eventdiv";
  import navDiv from "./component/custom_nav";
  import searchDiv from "./component/custom_searchdiv";
  import "../dist/assets/styles/navsytle.css";
  import nav from "../dist/assets/js/nav.js";
  import mock from "../mock/index.js";
  const axios = require("axios");
  const MockAdapter = require("axios-mock-adapter");
  mock.test = 1;
  export default {
    name: "App",
    data() {
      return {
        bar: {
          // title: [{
          // 	text: '中、美、日贸易量占世界总贸易量比重',
          // 	left: 'center'
          // 	// subtext: '纯属虚构'
          // }],
          legend: {
            //x: 'middle',                         
            y: 'bottom',
            //orient: 'vertical',
            data: ['China']
          },
          tooltip: {
            trigger: 'axis',
            formatter: '{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br/>{a3}: {c3}%'
          },
          // legend: {
          //     data:['China','United States','India','Japan']
          // },
          toolbox: {
            id: 'toolbox',
            show: false,
            feature: {
              /*
              	dataZoom: {},
              	dataView: {
              		readOnly: false
              	},
              	*/
              brush: {
                type: ['polygon', 'clear']
              },
              /*
              magicType: {
              	type: ['line','bar']
              },
              */
              restore: {},
              saveAsImage: {
                pixelRatio: 5
              }
            }
          },
          brush: {
            id: 'brush',
            xAxisIndex: 'all',
            brushLink: 'all', //不同系列间，选中的项可以联动
            // 选中框外样式
            outOfBrush: {
              colorAlpha: 1
            },
            // 选中框内样式
            inBrush: {
              colorAlpha: 1
            },
            brushStyle: {
              borderWidth: 1,
              color: 'rgba(120,140,180,0.3)',
              borderColor: 'rgba(120,140,180,0.8)'
            },
            /*
            	throttleType 取值可以是：
            	'debounce'：表示只有停止动作了（即一段时间没有操作了），才会触发事件。时间阈值由 brush.throttleDelay 指定。
            	'fixRate'：表示按照一定的频率触发时间，时间间隔由 brush.throttleDelay 指定。
            */
            throttleType: 'debounce',
            //throttleDelay: 300,
            throttleDelay: 0,
            transformable: true, //已经选好的选框是否可以被调整形状或平移。
            selected: [ // 每个系列被选中的项。
              // 注意，如果某个系列不支持 brush，但是还是会在这里出现对应的项。
              // 也就是说，selected 可以使用 seriesIndex 来直接找到对应的项。
              { // series 0 被选中的项
                seriesIndex: 0, //指定了哪些 series 可以被联动  [3, 4, 5] 表示 seriesIndex 为 3, 4, 5 的 series 可以被联动
                dataIndex: [] // 用这些 dataIndex，可以去原始数据中找到真正的值。
              }
            ]
          },
          xAxis: {
            type: 'category',
            name: '年份',
            // min:-35,
            boundaryGap: true,
            data: []
            // data:['Mar-00', 'Jun-00', 'Sep-00', 'Dec-00', 'Mar-01', 'Jun-01', 'Sep-01', 'Dec-01', 'Mar-02', 'Jun-02', 'Sep-02', 'Dec-02', 'Mar-03', 'Jun-03', 'Sep-03', 'Dec-03', 'Mar-04', 'Jun-04', 'Sep-04', 'Dec-04', 'Mar-05', 'Jun-05', 'Sep-05', 'Dec-05', 'Mar-06', 'Jun-06', 'Sep-06', 'Dec-06', 'Mar-07', 'Jun-07', 'Sep-07', 'Dec-07', 'Mar-08', 'Jun-08', 'Sep-08', 'Dec-08', 'Mar-09', 'Jun-09', 'Sep-09', 'Dec-09', 'Mar-10', 'Jun-10', 'Sep-10', 'Dec-10', 'Mar-11', 'Jun-11', 'Sep-11', 'Dec-11', 'Mar-12', 'Jun-12', 'Sep-12', 'Dec-12', 'Mar-13', 'Jun-13', 'Sep-13', 'Dec-13', 'Mar-14', 'Jun-14', 'Sep-14', 'Dec-14', 'Mar-15', 'Jun-15', 'Sep-15', 'Dec-15', 'Mar-16', 'Jun-16', 'Sep-16', 'Dec-16', 'Mar-17', 'Jun-17', 'Sep-17']
            // data: 年6月', '200/2年9月', '2002年12月', '2003年3月', '2003年6月', '2003年9月', '2003年12月', '2004年3月', '2004年6月', '2004年9月', '2004年12月', '2005年3月', '2005年6月', '2005年9月', '2005年12月', '2006年3月', '2006年6月', '2006年9月', '2006年12月', '2007年3月', '2007年6月', '2007年9月', '2007年12月', '2008年3月', '2008年6月', '2008年9月', '2008年12月', '2009年3月', '2009年6月', '2009年9月', '2009年12月', '2010年3月', '2010年6月', '2010年9月', '2010年12月', '2011年3月', '2011年6月', '2011年9月', '2011年12月', '2012年3月', '2012年6月', '2012年9月', '2012年12月', '2013年3月', '2013年6月', '2013年9月', '2013年12月', '2014年3月', '2014年6月', '2014年9月', '2014年12月', '2015年3月', '2015年6月', '2015年9月', '2015年12月', '2016年3月', '2016年6月', '2016年9月', '2016年12月', '2017年3月', '2017年6月', '2017年9月']
          },
          yAxis: {
            type: 'value',
            // min:-35,
            name: '占世界贸易额比重',
            axisLabel: {
              formatter: '{value} %'
            }
          },
          dataZoom: [{
              type: "slider",
              realtime: true, //是否实时加载
              show: true,
              cursor: "move",
              xAxisIndex: [
                0
              ],
              startValue: 10,
              endValue: 20,
              minValueSpan: 1,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                color: '#fff',
                shadowBlur: 3,
                shadowColor: 'rgba(0, 0, 0, 0.6)',
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              cursor: "pointer"
            },
            {
              type: "inside",
              show: true,
              xAxisIndex: [
                0
              ],
              startValue: 10,
              endValue: 2018,
              minValueSpan: 500
            }
          ],
          series: [
            {
              name: 'China',
              type: 'bar',
              animationDelay: function(idx) {
                return 0;
                //return idx * 1000;
              },
              animationDurationUpdate: function(idx) {
                // 越往后的数据延迟越大
                return 1;
              },
              data: []
            }
          ],
        },
        eventheightdiv: 0,
        eventheight:0,
        changHeightCount: 1,
        dataexpand: null,
        singlePerson: null,
        msg: [],
        closeFlag: false,
        contentHeight: 0,
        rightNav: 0,
        exportValue: "",
        unitValue: "auto", // 分度值
        periodsValue: "max", // 快捷查询
        exportList: [{
            value: "",
            label: "生成图片"
          },
          {
            value: "jpg",
            label: "jpg"
          },
          {
            value: "png",
            label: "png"
          }
        ],
        lastDataList: [{
            value: "max",
            label: "全部日期"
          },
          {
            value: "1 d",
            label: "近一天"
          },
          {
            value: "1 M",
            label: "近一月"
          },
          {
            value: "1 y",
            label: "近一年"
          }
        ],
        dataList: [{
            value: "auto",
            label: "按默认显示"
          },
          {
            value: "d",
            label: "按天显示"
          },
          {
            value: "M",
            label: "按月显示"
          },
          {
            value: "y",
            label: "按年显示"
          }
        ],
        buttonSize: 25,
        vhpx: 0,
        netpx: 0,
        timepx: 0,
        netpxdiv: 0,
        timepxdiv: 0,
        pathHoverFlag: false,
        modal_loading: false,
        col: 4,
        sq: [
          [],
          [],
          [],
          []
        ],
        modal01: false,
        isCollapsed: true,
        selectionId: [],
        dragFlag: true,
        split1: 0.85,
        max: 0.15,
        min: 0.7,
        show: [],
        netchart: null,
        barchart: null,
        netData: null,
        nextId: 4,
        opacityImage: "40%",
        flag: true,
        selectItem: null,
        inputInfo: "",
        loading1: false,
        options1: [],
        ref: false,
        iconPosition: 0,
        timeWidth: 0,
        divheight: 0,
        splitWidth: 0,
        dataBySeries: {
          num: [
            1.63,
            1.9,
            2.16,
            2.55,
            2.7,
            2.69,
            2.65,
            2.87,
            2.9,
            3.1,
            3.47,
            3.89,
            4.54,
            5.33,
            5.95,
            6.44,
            6.94,
            7.45,
            7.61,
            8.44,
            9.35,
            9.58,
            10.06,
            10.6,
            10.94,
            11.49,
            11.03,
            11.11
          ],
          date: [
            1990,
            1991,
            1992,
            1993,
            1994,
            1995,
            1996,
            1997,
            1998,
            1999,
            2000,
            2001,
            2002,
            2003,
            2004,
            2005,
            2006,
            2007,
            2008,
            2009,
            2010,
            2011,
            2012,
            2013,
            2014,
            2015,
            2016
          ]
        }
      };
    },
    components: {
      netChartDiv,
      timeChartDiv,
      eventChartDiv,
      //  timeDiv,
      searchDiv
    },
    methods: {
      initNode(opt) {
        this.netData = opt.nodes[0]
      },
      // netdiv 回传选中节点参数
      selectNodes(opt) {
        var mthis = this
        //单节点
        if (opt.ids.length == 1) {
          let nodeIdsArry = opt.ids.map(item => {
            return item.id;
          });
          mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
            'nodeIds': nodeIdsArry
          }).then(response => {
            this.dataexpand = response.data.data[0].nodes
            console.log('-------------')
            console.log(this.dataexpand)
            this.singlePerson = true
          })
        } else if (opt.ids.length > 1) {
          //多节点
          let nodeIdsArry = opt.ids.map(item => {
            return item.id;
          });
          // nodeIdsArry = ["Q370363", "Q1413"]
          //  console.log(nodeIdsArry)
          // 调用接口,根据id查询信息
          // mthis.$http.post('http://10.60.1.141:5001/node-datas/',{'nodeIds': nodeIdsArry},{"emulateJSON":true}).then(response => {
          // mthis.$http.post('http://10.60.1.141:5000/person-overviews/', {
          mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
            'nodeIds': nodeIdsArry
          }).then(response => {
            this.dataexpand = response.data.data[0].nodes
             console.log('-------------')
            console.log(this.dataexpand)
            this.singlePerson = false
          })
        }
        // var mthis = this;
        // alert('叮!我已经监听到你选中了节点,下面开始调用接口,更改右边数据透视的数据咯!(现在是假数据)')
        // mock.get("/getShujuTouShi").then(function(res) {
        //   // mthis.ref = !mthis.ref
        //   mthis.dataexpand = res.data.data;
        // });
      },
      // searchInfo(query) {
      //   var mthis = this;
      //   if (query !== "") {
      //     this.loading1 = true;
      //     let response = mthis.$http.get("http://10.60.1.141:5001/node-ids/?pattern=" + query, {
      //         emulateJSON: true
      //       })
      //       .then(response => {
      //         let option = []
      //         for(let i = 0 ;i<response.data.data[0].nodes.length;i++) {
      //           option.push({"label":response.data.data[0].nodes[i].name,"value":response.data.data[0].nodes[i].nodeId})
      //         }
      //         console.log(option)
      //         mthis.options1 = option;
      //         mthis.loading1 = false;
      //       });
      //     // axios.get('/getPersonInfo',{name:query})
      //     //   .then(function(response) {
      //     //     setTimeout(() => {
      //     //       mthis.options1 = response.data.data
      //     //       mthis.loading1 = false;
      //     //     }, 10);
      //     //   });
      //   } else {
      //     this.options1 = [];
      //   }
      // },
      // setOption(a, b) {
      //   var mthis = this;
      //   mthis.$http
      //     .post(
      //       "http://10.60.1.141:5000/node-datas/",
      //       { nodeIds: a.value },
      //       { emulateJSON: true }
      //     )
      //     .then(response => {
      //       console.log(response);
      //     });
      // },
      exportImg() {
        if (this.exportValue !== "") {
          this.barchart.export(
            this.exportValue, {
              mime: "image/png",
              extension: "png",
              image: !0,
              transparent: !0
            }, {
              dpi: 1050,
              unit: "px",
              width: 100,
              height: 200,
              scale: 1
            },
            true
          );
          this.exportValue = "";
        }
      },
      displayUnit() {
        // 改变分度值
        this.barchart.displayUnit(this.unitValue);
      },
      displayPeriods() {
        // 快捷查看
        this.barchart.setDisplayPeriod(this.periodsValue, "now", true);
      },
      timeBack() {
        this.barchart.back();
      },
      timeZoomOut() {
        this.barchart.zoomOut();
      },
      timeExport() {
        // this.barchart.export(type)
      },
      initCharts() {
        var mthis = this;
        // (this.barchart = new TimeChart({
        //   container: document.getElementById("barchart"),
        //   interaction: {
        //     resizing: {
        //       enabled: false
        //     }
        //   },
        //   data: {
        //     timestampInSeconds: true,
        //     units: ["y", "M", "d", "h"],
        //     urlByUnit: {
        //       y: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-y.json?unit=y&timeZone=UTC",
        //       M: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-M.json?unit=M&timeZone=UTC",
        //       d: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-d.json?unit=d&timeZone=UTC",
        //       h: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-h.json?unit=d&timeZone=UTC"
        //     }
        //   },
        //   chartTypes: {
        //     columns: {
        //       style: {
        //         fillGradientMode: "vertical",
        //         fillGradient: [
        //           [0, "#33ffff"],
        //           [1, "#9999ff"]
        //         ]
        //       }
        //     }
        //   },
        //   events: {
        //     onClick: function(event) {
        //       // alert('下面准备调用接口，时间：' + event.timeStart + "-------" + event.timeEnd)
        //       console.log(event)
        //     }
        //   },
        //   toolbar: {
        //     //工具栏选择
        //     logScale: false,
        //     displayUnit: false,
        //     displayPeriod: false,
        //     back: false,
        //     zoomOut: false,
        //     export: false,
        //     //工具栏位置
        //     location: "outside",
        //     side: "top"
        //   },
        //   theme: TimeChart.themes.dark
        // }));
        // 指定图表的配置项和数据
        // function kuangxuan () {
        // myChart.dispatchAction({
        // 	type: 'brush',
        // 	areas: [ // areas 表示选框的集合，可以指定多个选框。
        // 		{ // 选框一：
        // 			xAxisIndex: 0, // 指定此选框属于 index 为 0 的 geo 坐标系。
        // 						 // 也可以通过 xAxisIndex 或 yAxisIndex 来指定此选框属于直角坐标系。
        // 						 // 如果没有指定，则此选框属于『全局选框』。不属于任何坐标系。
        // 						 // 属于『坐标系选框』，可以随坐标系一起缩放平移。属于全局的选框不行。
        // 			brushType: 'lineX', // 指定选框的类型。还可以为 'rect', 'lineX', 'lineY'
        // 			/*
        // 			range: [ // 如果是『全局选框』，则使用 range 来描述选框的范围。
        // 				100,300
        // 			]
        // 			*/
        // 			coordRange: ['2000','2010']
        // 		}
        // 	]
        // })
      }
    },
    created() {},
    computed: {},
    watch: {
      split1: function() {
        this.splitWidth = document.documentElement.clientWidth * this.split1 - 20 + 'px'
      },
      netpxdiv: function() {
        this.divheight = document.documentElement.clientHeight * 0.2 - 10 + 20 + 55 + 'px'
      },
      changHeightCount: function() {
        let useHeight = document.documentElement.clientHeight - 64 - 20;
        if (this.changHeightCount % 2 === 0) {
          this.timepx = "0px";
          this.timepxdiv = "0px";
          this.iconPosition = useHeight - 40 + "px";
          this.netpxdiv = useHeight * 1 + "px";
          this.netpx = useHeight * 1 - 55 + "px";
          document.getElementById("timechartctrl").style.display = "none";
          document.getElementById("barchart").style.display = "none";
          document.getElementById("arrowDown").style.transform = "rotate(0deg)";
        } else {
          this.iconPosition = useHeight * 0.8 + "px";
          this.timepx =
            (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 -
            30 +
            "px";
          this.timepxdiv =
            (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
          this.netpxdiv = useHeight * 0.8 + "px";
          this.netpx = useHeight * 0.8 - 55 + "px";
          document.getElementById("timechartctrl").style.display = "block";
          document.getElementById("barchart").style.display = "block";
          document.getElementById("arrowDown").style.transform = "rotate(180deg)";
        }
        document.getElementById("arrowDown").style.position = "absolute";
        document.getElementById("arrowDown").style.right = "20px";
        document.getElementById("arrowDown").style.top = this.netpxdiv;
        document.getElementById("arrowDown").style.zIndex = 30;
      }
    },
    mounted() {
      var mthis = this
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      window.onresize = function() {
        mthis.contentHeight = document.documentElement.clientHeight - 65 + "px";
        mthis.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20 + "px";
        mthis.timepx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 30 + "px";
        mthis.timepxdiv =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
        mthis.iconPosition = useHeight * 0.8 + "px";
        mthis.netpxdiv = useHeight * 0.8 + "px";
        mthis.netpx = useHeight * 0.8 - 55 + "px";
        mthis.eventheightdiv = document.documentElement.clientHeight * 1 - 64 - 10 + "px";
        mthis.eventpx = document.documentElement.clientHeight * 1 - 64 - 20 + "px";
        mthis.rightNav = document.documentElement.clientHeight * 1 - 64 + "px";
        mthis.splitWidth = document.documentElement.clientWidth * mthis.split1 - 20 + 'px'
        mthis.divheight = mthis.eventheightdiv - mthis.netpx + 'px'
      };
      this.contentHeight = document.documentElement.clientHeight - 65 + "px";
      this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20 + "px";
      this.timepx =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 30 + "px";
      this.timepxdiv =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
      this.iconPosition = useHeight * 0.8 + "px";
      this.netpxdiv = useHeight * 0.8 + "px";
      this.netpx = useHeight * 0.8 - 55 + "px";
      this.eventheightdiv = document.documentElement.clientHeight * 1 - 64 - 10 + "px";
      this.splitWidth = document.documentElement.clientWidth * this.split1 - 20 + 'px'
      this.divheight = this.eventheightdiv - this.netpx + 'px'
      this.eventpx = document.documentElement.clientHeight * 1 - 64 - 20 + "px";
      this.rightNav = document.documentElement.clientHeight * 1 - 64 + "px";
      this.initCharts();
      document.getElementById("arrowDown").style.transform = "rotate(180deg)";
      // var mthis = this;
      // mock.get("/getShujuTouShi").then(function(res) {
      //   mthis.dataexpand = res.data.data;
      // });
    }
  };
</script>