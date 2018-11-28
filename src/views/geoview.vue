<style>
</style>
<template>
  <div class="layout" :style="{width: '100vw',height: '100vh', background:'black'}">
    <Layout :style="{width: '98vw',height: '100vh'}">
      <Header :style="{position: 'fixed', width: '100vw', background:'black',zIndex:'99'}">
        <Row type="flex" justify="space-between" class="code-row-bg" align="middle">
          <Col span="1" align="middle">
          <router-link to="/">
            <img src="../dist/assets/images/net.png" style="display: inline-block; vertical-align: middle; width:36px;" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/geoView" target='_blank'>
            <img src="../dist/assets/images/earth.png" style="display: inline-block; vertical-align: middle;width:36px" /></router-link>
          </Col>
          <Col span="1" align="middle">
          <router-link to="/contentView" target='_blank'>
            <img src="../dist/assets/images/content.png" style="display: inline-block; vertical-align: middle;width:36px" /></router-link>
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
              <geo-chart @selectNodes1="selectNodes" id="geo" :style="{height:geopxdiv}" :geoHeight="geopx" :geoWidth='splitWidth' :geoData="geoData"></geo-chart>
              <time-chart-div :splitWidth="splitWidth" :split="split1"></time-chart-div>
              
            </div>
            <div slot="right" class="scroll-bar demo-split-pane paneRight" :style="{height:eventheightdiv,marginRight:'2.3vw'}">
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
  import geoChart from "./component/custom_operationButtons";
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
        buttonSize: 25,
        vhpx: 0,
        geopx: 0,
        timepx: 0,
        geopxdiv: 0,
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
        geochart: null,
        barchart: null,
        geoData: null,
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
      geoChart,
      timeChartDiv,
      eventChartDiv,
      //  timeDiv,
      searchDiv
    },
    methods: {
      initNode(opt) {
      },
      // netdiv 回传选中节点参数
      selectNodes(opt) {},
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
    },
    created() {},
    computed: {},
    watch: {
      split1: function() {
        this.splitWidth = document.documentElement.clientWidth * this.split1 - 20 + 'px'
      },
      geopxdiv: function() {
        this.divheight = document.documentElement.clientHeight * 0.2 - 10 + 20 + 55 + 'px'
      },
      changHeightCount: function() {
        let useHeight = document.documentElement.clientHeight - 64 - 20;
        if (this.changHeightCount % 2 === 0) {
          this.timepx = "0px";
          this.timepxdiv = "0px";
          this.iconPosition = useHeight - 40 + "px";
          this.geopxdiv = useHeight * 1 + "px";
          this.geopx = useHeight * 1 + "px";
          //this.geopx = useHeight * 1 - 55 + "px";
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
          this.geopxdiv = useHeight * 0.8 + "px";
          this.geopx = useHeight * 0.8 + "px";
          //this.geopx = useHeight * 0.8 - 55 + "px";
          
          document.getElementById("timechartctrl").style.display = "block";
          document.getElementById("barchart").style.display = "block";
          document.getElementById("arrowDown").style.transform = "rotate(180deg)";
        }
        document.getElementById("arrowDown").style.position = "absolute";
        document.getElementById("arrowDown").style.right = "20px";
        document.getElementById("arrowDown").style.top = this.geopxdiv;
        document.getElementById("arrowDown").style.zIndex = 30;
      }
      // changHeightCount: function() {
      //   let useHeight = document.documentElement.clientHeight - 64 - 20;
      //   if (this.changHeightCount % 2 === 0) {
      //     this.timepx = "0px";
      //     this.timepxdiv = "0px";
      //     this.iconPosition = useHeight - 40 + "px";
      //     this.geopxdiv = useHeight * 1 + "px";
      //     this.geopx = useHeight * 1 - 55 + "px";
      //     document.getElementById("timechartctrl").style.display = "none";
      //     document.getElementById("barchart").style.display = "none";
      //     document.getElementById("arrowDown").style.transform = "rotate(0deg)";
      //   } else {
      //     this.iconPosition = useHeight * 0.8 + "px";
      //     this.timepx =
      //       (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 -
      //       30 +
      //       "px";
      //     this.timepxdiv =
      //       (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
      //     this.geopxdiv = useHeight * 0.8 + "px";
      //     this.geopx = useHeight * 0.8 - 55 + "px";
      //     document.getElementById("timechartctrl").style.display = "block";
      //     document.getElementById("barchart").style.display = "block";
      //     document.getElementById("arrowDown").style.transform = "rotate(180deg)";
      //   }
      //   document.getElementById("arrowDown").style.position = "absolute";
      //   document.getElementById("arrowDown").style.right = "20px";
      //   document.getElementById("arrowDown").style.top = this.geopxdiv;
      //   document.getElementById("arrowDown").style.zIndex = 30;
      // }
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
        mthis.geopxdiv = useHeight * 0.8 + "px";
        mthis.geopx = useHeight * 0.8 + "px";
          //mthis.geopx = useHeight * 0.8 - 55 + "px";
        
        mthis.eventheightdiv = document.documentElement.clientHeight * 1 - 64 - 10 + "px";
        mthis.eventpx = document.documentElement.clientHeight * 1 - 64 - 20 + "px";
        mthis.rightNav = document.documentElement.clientHeight * 1 - 64 + "px";
        mthis.splitWidth = document.documentElement.clientWidth * mthis.split1 - 20 + 'px'
        mthis.divheight = mthis.eventheightdiv - mthis.geopx + 'px'
      };
      this.contentHeight = document.documentElement.clientHeight - 65 + "px";
      this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20 + "px";
      this.timepx =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 30 + "px";
      this.timepxdiv =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
      this.iconPosition = useHeight * 0.8 + "px";
      this.geopxdiv = useHeight * 0.8 + "px";
      this.geopx = useHeight * 0.8 + "px";
      //this.geopx = useHeight * 0.8 - 55 + "px";
      this.eventheightdiv = document.documentElement.clientHeight * 1 - 64 - 10 + "px";
      this.splitWidth = document.documentElement.clientWidth * this.split1 - 20 + 'px'
      this.divheight = this.eventheightdiv - this.geopx + 'px'
      this.eventpx = document.documentElement.clientHeight * 1 - 64 - 20 + "px";
      this.rightNav = document.documentElement.clientHeight * 1 - 64 + "px";
      document.getElementById("arrowDown").style.transform = "rotate(180deg)";
      // var mthis = this;
      // mock.get("/getShujuTouShi").then(function(res) {
      //   mthis.dataexpand = res.data.data;
      // });
    }
  };
</script>