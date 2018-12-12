<style>
  /* 右侧导航栏 */
  .bgDiv {
    width: 100%;
    height: 100%;
    position: fixed;
    display: none;
    z-index: 99;
    bottom: 0;
  }
  /*
              侧导航start
            */
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
    padding: 10px;
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
  .process-img {
    /* color: rgba(51, 255, 255, 0.4); */
    color: rgb(51, 255, 255);
    size: 30px;
    /* opacity: 0.4; */
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
    background: rgba(51, 255, 255, 0.2);
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
    margin-left: 50px;
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
  }
  .p-content {
    background-color: rgba(0, 0, 0, 1);
    font-size: 14px;
    line-height: 38px;
    color: #ccffff;
    font-family: "微软雅黑";
  }
  .ivu-col p {
    line-height: 38px;
  }
  .ivu-collapse-content-box p {
    line-height: 38px;
    font-size: 14px;
    color: #009999;
    font-family: "微软雅黑";
  }
  .ivu-collapse-content-box {
    padding: 0px !important;
  }
  .ivu-collapse-header {
    color: #ccffff !important;
    font-size: 14px;
    border: none !important;
  }
  .ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0.1) !important;
    padding: 0 !important;
  }
  /* 滚动条样式 */
   ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
   ::-webkit-scrollbar-track,
   ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
  }
   ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-corner {
    background: transparent;
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
  .vertical-center-modal {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  /* 分割线样式 */
  .ivu-split-trigger-vertical {
    width: 1px !important;
    height: 100%;
    background: #336666;
    border-top: none;
    border-bottom: none;
    cursor: col-resize;
    opacity: 0.1;
  }
  .demo-split-pane {
    padding: 0;
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
  }
  .ivu-select-placeholder {
    color: #33ffff !important;
  }
  .ivu-select-dropdown {
    background-color: rgba(0, 0, 0, 0.8) !important;
    border: solid 1px rgba(51, 255, 255, 0.5) !important;
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
    text-shadow: 0 0 0 18px #ccffff !important;
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
</style>
<template>
  <div class="layout" :style="{width: '100vw',height: '100vh'}">
    <Layout :style="{width: '98vw'}" >
      <Header :style="{position: 'fixed', width: '100vw', background:'black'}">
        <Row type="flex" justify="space-between" class="code-row-bg" align="middle">
          <Col span="1" align="middle">
          <router-link to="/">
            <img src="../dist/assets/images/net.png" style="display: inline-block; vertical-align: middle; width:3em;" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/geoView">
            <img src="../dist/assets/images/earth.png" style="display: inline-block; vertical-align: middle;width:3em" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/contentView">
            <img src="../dist/assets/images/content.png" style="display: inline-block; vertical-align: middle;width:3em" /></router-link>
          </Col>
          <Col span="4" offset="17" align="left">
          <i class="icon iconfont icon-search  process-img" style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i>
          <input class="" id="idNumber1" style="line-height: 4vh;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:50px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px">
          </Col>
        </Row>
      </Header>
      <Content :style="{marginTop:'64px'}"  id="content" >
        <!-- 右侧伸缩 -->
        <div class="rightNav" :style="{height:contentHeight}">
          <Row>
            <Col span="4" class="navStyleTitle right" :style="{position: 'initial',zIndex: '999999'}">
            <div class="floater">
              <div><Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" /></div>
              <div><Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" /></div>
              <div><Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" /></div>
              <div><Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" /></div>
              <!-- <div>11</div> -->
            </div>
            </Col>
            <Col span="20" class="navStyle"><span>菜单1</span>
            <span>菜单2</span>
            <span>菜单3</span>
            <span>菜单4</span></Col>
          </Row>
        </div>
        <div class="bgDiv"></div>
        <div class="demo-split" :style="{height:contentHeight}">
          <Split v-model="split1" :max="max" :min="min">
            <div slot="left" class="demo-split-pane">
              <!-- <h1>this is left</h1> -->
              <!-- <net-chart-div></net-chart-div> -->
              <geo-chart-div></geo-chart-div>
              <!-- <time-chart-div></time-chart-div> -->
              <div>
                <div :style="{height:'40px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 14px 0 14px'}">
                  <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{height:'55px',paddingLeft:'10px'}">
                    <Col span="1" align="middle" class="bottom">
                    <Tooltip content="后退" placement="bottom">
                      <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeBack" size="26"></Icon>
                    </Tooltip>
                    </Col>
                    <Col span="1" align="middle" class="bottom">
                    <Tooltip content="缩小" placement="bottom">
                      <Icon class="icon iconfont icon-zoom-out process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeZoomOut" size="26"></Icon>
                    </Tooltip>
                    </Col>
                    <Col span="10" align="middle" class="bottom" offset="12" :style="{height:'40px',paddingLeft:'10px'}">
                    <Row type="flex" justify="space-between" class="code-row-bg" align="middle">
                      <Col span="2" align="middle" class="bottom" offset="6">
                      <Select v-model="unitValue" style="width:100px;line-height:30px" @on-change='displayUnit' placeholder='按默认显示'>
                            <Option v-for="item in dataList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                          </Select>
                      <!-- <Dropdown trigger="click"  >
                          <Button size="buttonSize" icon="icon iconfont icon-date" class="DVSL-bar-btn DVSL-bar-btn-month DVSL-bar-show-more ivu-btn-custom">日期</Button>
                          <DropdownMenu slot="list">
                            <DropdownItem>all data</DropdownItem>
                            <DropdownItem>last day</DropdownItem>
                            <DropdownItem>last week</DropdownItem>
                            <DropdownItem>last month</DropdownItem>
                            <DropdownItem>lastyear</DropdownItem>
                          </DropdownMenu>
                        </Dropdown> -->
                      </Col>
                      <Col span="2" align="middle" class="bottom">
                      <Select v-model="periodsValue" style="width:100px;line-height:30px" @on-change='displayPeriods' placeholder='全部日期'>
                            <Option v-for="item in lastDataList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                          </Select>
                      </Col>
                      <Col span="2" align="middle" class="bottom">
                      <Select v-model="exportValue" style="width:100px;line-height:30px" @on-change='exportImg' placeholder='生成图片'>
                            <Option v-for="item in exportList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
                          </Select>
                      </Col>
                      <Col span="2" align="middle" class="bottom" offset="2">
                      <Tooltip content="收起" placement="bottom">
                        <Icon class="icon iconfont icon-drop-up-copy process-img DVSL-bar-btn" size="18" :style="{lineHeight:'30px'}"></Icon>
                      </Tooltip>
                      </Col>
                    </Row>
                    </Col>
                  </Row>
                </div>
                <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 14px 0 14px',backgroundColor:'rgba(0,0,0,0.5)',minHeight: timepxdiv}">
                  <!-- <chart :options="option_1" :style="{minHeight: '55vh'}" :auto-resize="true"></chart> -->
                  <div id='barchart' :style="{height:'23vh',minHeight: timepx}"></div>
                </div>
                </Col>
              </div>
            </div>
            <div slot="right" class="demo-split-pane">
              <!-- <h1>this is right</h1> -->
              <event-chart-div></event-chart-div>
            </div>
          </Split>
        </div>
       
        <!-- </Row> -->
      </Content>
    </Layout>
  </div>
</template>
<script>
  import mock from "../mock/index.js";
  // import { FactChart,NetCart,PieChart,GeoChart } from "../dist/assets/js/zoomcharts";
  import Bg2 from "../dist/assets/images/bg.jpg";
  import $ from "jquery";
  // import geoChartDiv from "./component/custom_geodiv";
  import geoChartDiv from "./component/custom_operationButtons";
  import timeChartDiv from "./component/custom_timediv";
  import eventChartDiv from "./component/custom_eventdiv";
  import navDiv from "./component/custom_nav";
  import '../dist/assets/styles/navsytle.css';
  import nav from "../dist/assets/js/nav.js";
  mock.test = 1;
  export default {
    name: "App",
    data() {
      return {
        // split1: 0.75,
        // max: 0.25,
        // min: 0.5,
        contentHeight:0,

        exportValue: '',
        unitValue: 'auto', // 分度值
        periodsValue: 'max', // 快捷查询
        exportList: [{
            value: '',
            label: '生成图片'
          },
          {
            value: 'jpg',
            label: 'jpg'
          },
          {
            value: 'png',
            label: 'png'
          }
        ],
        lastDataList: [{
            value: 'max',
            label: '全部日期'
          },
          {
            value: '1 d',
            label: '近一天'
          },
          {
            value: '1 M',
            label: '近一月'
          },
          {
            value: '1 y',
            label: '近一年'
          }
        ],
        dataList: [{
            value: 'auto',
            label: '按默认显示'
          },
          {
            value: 'd',
            label: '按天显示'
          },
          {
            value: 'M',
            label: '按月显示'
          },
          {
            value: 'y',
            label: '按年显示'
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
        split1: 0.75,
        max: 0.25,
        min: 0.5,
        show: [],
        netchart: null,
        barchart: null,
        nextId: 4,
        bg2: Bg2,
        opacityImage: "40%",
        flag: true,
        netData: [],
        selectItem: null
      };
    },
    components: {
      geoChartDiv,
      timeChartDiv,
      eventChartDiv
    },
    methods: {
      showSider () {
      },
      exportImg() {
        if (this.exportValue !== '') {
          this.barchart.export(this.exportValue, {
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
          }, true)
          this.exportValue = ''
        }
      },
      displayUnit() {
        // 改变分度值
        this.barchart.displayUnit(this.unitValue)
      },
      displayPeriods() {
        // 快捷查看
        this.barchart.setDisplayPeriod(this.periodsValue, 'now', true)
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
        (this.barchart = new TimeChart({
          container: document.getElementById("barchart"),
          interaction: {
            resizing: {
              enabled: false
            }
          },
          data: {
            timestampInSeconds: true,
            units: ["y", "M", "d", "h"],
            urlByUnit: {
              y: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-y.json?unit=y&timeZone=UTC",
              M: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-M.json?unit=M&timeZone=UTC",
              d: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-d.json?unit=d&timeZone=UTC",
              h: "https://zoomcharts.com/dvsl/data/time-chart/bitcoin-h.json?unit=d&timeZone=UTC"
            }
          },
          // 渐变柱形图
          // chartTypes:{
          //       columns:{
          //           style: {
          //               fillGradientMode: "vertical",
          //               fillGradient: [
          //                   [0, "rgb(2,4,24)"],
          //                   [0.25, "rgb(2,33,88)"],
          //                   [0.40, "rgb(21,138,190)"],
          //                   [0.50, "rgb(30,181,201)"],
          //                   [0.75, "rgb(220,197,161)"],
          //                   [1, "rgb(150,45,50)"]
          //               ]
          //           }
          //       }
          // },
          // 纯色
          // chartTypes:{
          //   columns:{
          //     style: {
          //       fillColor: "rgba(153,204,0,1)"
          //     }
          //   }
          // },
          chartTypes: {
            columns: {
              style: {
                fillGradientMode: "vertical",
                fillGradient: [
                  [0, "#33ffff"],
                  [1, "#9999ff"]
                ]
              }
            }
          },
          events: {
            onClick: function(event) {
              alert('下面准备调用接口，时间：' + event.timeStart + "-------" + event.timeEnd)
            }
          },
          toolbar: {
            //工具栏选择
            logScale: false,
            displayUnit: false,
            displayPeriod: false,
            back: false,
            zoomOut: false,
            export: false,
            //工具栏位置
            location: "outside",
            side: "top"
          },
          //注释上面chart内容，用以下内容替换，可以展示柱状图+折线图
          // data: {
          //         units: ["h"],
          //         url: "https://zoomcharts.com/dvsl/data/time-chart/temperature-kuldiga-h.json?unit=h"
          //     },
          //     valueAxis: {
          //         "va1": {
          //             title: "Temperature 1",
          //             side: "left"
          //         },
          //         "va2": {
          //             title: "Temperature 2",
          //             side: "right"
          //         }
          //     },
          //     series: [
          //         {
          //             id: "s1",
          //             type: "columns",
          //             valueAxis: "va1",
          //             data: {
          //                 index: 1,
          //                 aggregation: "avg"
          //             },
          //             style: {
          //                 fillColor: "lightgreen",
          //                 lineColor: "olive",
          //                 lineWidth: 1,
          //                 padding: [2, 2] // space around the columns
          //             }
          //         },
          //         {
          //             id: "s2",
          //             type: "line",
          //             valueAxis: "va2",
          //             data: {
          //                 index: 1,
          //                 aggregation: "max"
          //             },
          //             style: {
          //                 lineColor: "olive",
          //                 lineWidth: 3
          //             }
          //         }
          //     ],
          //两柱形图对比
          //     data:{
          //     url:"https://zoomcharts.com/dvsl/data/time-chart/temperature-kuldiga-h.json?unit=h"
          // },
          // facetAxis:{
          //     size:70
          // },
          // series:[
          //     {
          //         name: "2010",
          //         data:{field:"2010"},
          //         style:{fillColor: "#ccf"}
          //     },
          //     {
          //         name: "2011",
          //         data:{field:"2011"},
          //         style:{fillColor:"#bbf"}
          //     },
          //     {
          //         name: "2012",
          //         data:{field:"2012"},
          //         style:{fillColor:"#aaf"}
          //     }
          // ],
          // items: {styleFunction:function (slice, data){slice.label = data.name;}},
          theme: TimeChart.themes.dark
        }));
      }
    },
    created() {
      var ZoomChartsLicense =
        "ZCS-6p9jz05q9: ZoomCharts SDK Single Developer Licencefor xia..@..6.com (valid for development only); upgrades until: 2019-08-22";
      var ZoomChartsLicenseKey =
        "87589a523b2424d1014fd9ac70a57f294461a33030b2f61c5a" +
        "d4684ec069fe538bbb062b54a3363a080d0f52e957c4285753fdc66156b6a6a549e480e18ac14" +
        "82da433899045c1ca84e5c335b3b293f5ac1d01573d1da54a232894a2b1ed487d66993452184d" +
        "1315f6c2c8b2909cce2708e2130193a941331a699fe1c1f009ec22719fb2342f8c7ee24f6b55c" +
        "139c7a4a955fa93c2ddb99fca8abe4d3de22ba043d82f6bb0f7d4db5e08ac3373b21ed4669302" +
        "031cae13dda9eb026807f764422f8f35fb19413c9310e0e6c525a0a5fbe497d73a71d09b0b866" +
        "b9209186f1f451a4713b82236fd0ecaabb2d25fd6f7fcd351bb4c4abc5f8130e6a982ad5b556b"; 
    },
    computed: {
      },
    // mounted() {
    //   this.contentHeight = document.documentElement.clientHeight - 65 + "px";
    // }
    mounted() {
      window.onresize = function() {
        this.contentHeight = document.documentElement.clientHeight - 65 + "px";
        this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20 + "px";
        this.timepxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.1 + 40 + "px";
        this.timepx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.1 + "px";
        this.netpxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + 55 + "px";
        this.netpx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
        this.eventpx =
          document.documentElement.clientHeight * 1 - 64 - 20 + "px";
      }
      this.contentHeight = document.documentElement.clientHeight - 65 + "px";
       this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20 + "px";
        this.timepxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.1 + 40 + "px";
        this.timepx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.1 + "px";
        this.netpxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + 55 + "px";
        this.netpx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
        this.eventpx =
        document.documentElement.clientHeight * 1 - 64 - 20 + "px";
      // 弹出框样式
      // var infoElement = document.createElement("div");
      // infoElement.style.zIndex = 9999;
      // infoElement.style.display = "none";
      // infoElement.style.position = "absolute";
      // infoElement.style.background = "#eee";
      // infoElement.style.border = "1px solid #09c";
      // infoElement.style.padding = "10px";
      // infoElement.style.pointerEvents = "none";
      // var infoElementVisible = false;
      this.initCharts();
    }
  };
</script>