

<template>
  <div>
    <div>
      <div :style="{height:'40px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px'}">
        <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{height:'55px',paddingLeft:'10px'}">
          <Col span="1" align="middle" class="bottom">
          <Tooltip content="后退" placement="bottom">
            <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeBack" size="18" :style="{lineHeight:'30px'}"></Icon>
          </Tooltip>
          </Col>
          <Col span="1" align="middle" class="bottom">
          <Tooltip content="缩小" placement="bottom">
            <Icon class="icon iconfont icon-zoom-out process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeZoomOut" size="18" :style="{lineHeight:'30px'}"></Icon>
          </Tooltip>
          </Col>
          <Col span="10" align="middle" class="bottom" offset="12" :style="{height:'40px',paddingLeft:'10px'}">
          <Row type="flex" justify="space-between" class="code-row-bg" align="middle">
            <Col span="2" align="middle" class="bottom" offset="6">
              <Select v-model="unitValue" style="width:100px;line-height:30px" @on-change='displayUnit' placeholder='按默认显示'>
                <Option v-for="item in dataList" :value="item.value" :key="item.value" >{{ item.label }}</Option>
              </Select>
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
            <Col span="2" align="middle" class="bottom" offset="2" >
            <Tooltip content="收起" placement="bottom">
              <Icon class="icon iconfont icon-drop-up-copy process-img DVSL-bar-btn" size="18" :style="{lineHeight:'30px'}" @click="closeDiv"></Icon>
            </Tooltip>
            </Col>
          </Row>
          </Col>
        </Row>
      </div>
      <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',backgroundColor:'rgba(0,0,0,0.5)',minHeight: timepxdiv}">
        <div id='barchart' :style="{height:'23vh',minHeight: timepx}"></div>
      </div>
      </Col>
    </div>
  </div>
</template>
<script>
  import mock from "../../mock/index.js";
  mock.test = 1;
  export default {
    data() {
      return {
        closeFlag: flase,
        timechart: null,
        vhpx: 0,
        timepx: 0,
        timepxdiv: 0,
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
        ]
      }
    },
    computed: {
      menuitemClasses: function() {
        return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      }
    },
    mounted(){
      var mthis = this;
      mock.get("/getTimeList").then(function(res) {
        // console.log(res.data.data);
        mthis.initCharts();
        // mthis.timechart.addData(res.data.data);
        mthis.timechart.addData({
                preloaded: {
                    values: [
                        ["2017-01-09 00:00:00", 100],
                        ["2017-01-20", 200],
                        [1485907200, 300],
                        ["2017-02-05 15:20:00", 400],
                        ["2017-02-15 22:59:59", 500]
                    ],
                    dataLimitFrom: "2017-01-09 00:00:00",
                    dataLimitTo: "2017-02-15 22:59:59",
                    unit: 's'
                }
            })
      });
      window.onresize = function() {
        // alert(document.documentElement.clientHeight)
        this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20 + "px";
        this.timepxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.065 + 40 + "px";
        this.timepx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.065 + "px";
      }
       this.vhpx = document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20 + "px";
        this.timepxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.065 + 40 + "px";
        this.timepx =
          (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.065 + "px";
    },
    created(){
    },
    methods:{
      // 收起timechart
      closeDiv () {
        (this.closeFlag)?(
          alert('true')
        ):(
          alert('flase')
        )
        this.closeFlag = !this.closeFlag
      },
      initCharts() {
        var mthis = this;
        (mthis.timechart = new TimeChart({
          container: 'barchart',
          interaction: {
            resizing: {
              enabled: false
            }
          },
          data: null,
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
              // alert('下面准备调用接口，时间：' + event.timeStart + "-------" + event.timeEnd)
              // console.log(event)
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
          theme: TimeChart.themes.dark
        }));
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
      }
    }
  }
</script>
<style>

</style>


              