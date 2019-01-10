<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div :id="timechartdivId">
    <Icon class="icon iconfont icon-drop-up process-img DVSL-bar-btn rotate" :id="arrowDownId" size="18" :style="{lineHeight:'30px',marginTop:'3px',position:'absolute',right: '20px',zIndex:99,transform:'rotate(180deg)'}" @click="onchangHeightCount"></Icon>
    <div :style="{height:'30px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px'}" :id="timechartctrlId">
      <Row type="flex" justify="space-between" class="code-row-bg" :style="{height:'45px',paddingLeft:'10px'}">
        <Col span="3"/>
        <Col span="18"  class="bottom"><span :style="{lineHeight:'30px',color:'rgba(51, 255, 255, 0.5)'}">{{timeTitle}}</span></Col>
        <Col span="1"  class="bottom">
        <Tooltip content="放大" placement="bottom">
          <Icon class="icon iconfont icon-zoom-out1 process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeZoomIn" size="18" :style="{lineHeight:'30px',marginTop:'3px'}"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" class="bottom">
        <Tooltip content="缩小" placement="bottom">
          <Icon class="icon iconfont icon-zoom-out process-img DVSL-bar-btn DVSL-bar-btn-back" @click="timeZoomOut" size="18" :style="{lineHeight:'30px',marginTop:'3px'}"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" class="bottom" />
      </Row>
      </Col>
      </Row>
    </div>
    <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',backgroundColor:'rgba(0,0,0,0.5)',height: timepxdiv}" :id="timedivId">
      <!-- <div id='barchart' :style="{height: timepxdiv,width:'300px'}"></div> -->
      <!-- <echarts id='barchart' :options="bar" :style="{height: timepxdiv}" :auto-resize="true" ></echarts> -->
      <div :id="main1Id" :style="{width:pwidth}"></div>
    </div>
    </Col>
  </div>
</template>
 
<script>
  import echarts from "echarts";
  import { mapState,mapMutations } from 'vuex'
  export default {
    name: "",
    data() {
      return {
        timeTitle: '',
        timechartdivId:'timechartdiv_' + this.activeId,
        arrowDownId:'arrowDown_'+ this.activeId,
        timechartctrlId:'timechartctrl_'+ this.activeId,
        timedivId:'timediv_'+ this.activeId,
        main1Id:'main1_'+ this.activeId,
        pwidth: 0,
        timepxdiv: 0,
        timepx: 0,
        /* iconPosition: 0, */
        charts: null,
        yMax: 500,
        dataShadow: [],
        option: null,
        netHeightCount: 1,
        geoHeightCount: 1,
        contentHeightCount: 1,
        dataBySeries: {
          num: [],
          date: []
        }
      };
    },
    methods: {
      onchangHeightCount(){
        var mthis = this;
        var tmss = mthis.$store.state.tmss;
        mthis.netHeightCount ++ ;
      },
      timeZoomOut() { },
      timeZoomIn() { },
      resize() {
        let width = document.documentElement.clientWidth * this.$store.state.split - 20 + 'px'
        let height = document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        this.charts.resize({
          width,
          height
        })
      },
      loadEcharts() {
        var mthis = this
        this.option = null
        this.option = {
          tooltip: {
            trigger: "axis",
            formatter: "{b}<br/>{a0}: {c0}%<br />{a1}: {c1}%<br />{a2}: {c2}%<br/>{a3}: {c3}%"
          },
          // legend: {
          //     data:['China','United States','India','Japan']
          // },
          grid: {
            top: "10px",
            right: "20px",
            left: "50px"
          },
          toolbox: {
            id: "toolbox",
            show: false,
            feature: {
              /*
                	dataZoom: {},
                	dataView: {
                		readOnly: false
                	},
                	*/
              brush: {
                type: ["polygon", "clear"]
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
            id: "brush",
            xAxisIndex: "all",
            brushLink: "all", //不同系列间，选中的项可以联动
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
              color: "rgba(51,255,255,0.3)",
              // borderColor: "#336666"
              borderColor: "rgba(51,255,255,1)"
            },
            /*
              	throttleType 取值可以是：
              	'debounce'：表示只有停止动作了（即一段时间没有操作了），才会触发事件。时间阈值由 brush.throttleDelay 指定。
              	'fixRate'：表示按照一定的频率触发时间，时间间隔由 brush.throttleDelay 指定。
              */
            throttleType: "debounce",
            //throttleDelay: 300,
            throttleDelay: 0,
            transformable: true, //已经选好的选框是否可以被调整形状或平移。
            selected: [
              // 每个系列被选中的项。
              // 注意，如果某个系列不支持 brush，但是还是会在这里出现对应的项。
              // 也就是说，selected 可以使用 seriesIndex 来直接找到对应的项。
              {
                // series 0 被选中的项
                seriesIndex: 0, //指定了哪些 series 可以被联动  [3, 4, 5] 表示 seriesIndex 为 3, 4, 5 的 series 可以被联动
                dataIndex: [] // 用这些 dataIndex，可以去原始数据中找到真正的值。
              }
            ]
          },
          xAxis: {
            // 'value' 数值轴，适用于连续数据。
            // 'category' 类目轴，适用于离散的类目数据，为该类型时必须通过 data 设置类目数据。
            // 'time' 时间轴，适用于连续的时序数据，与数值轴相比时间轴带有时间的格式化，在刻度计算上也有所不同，例如会根据跨度的范围来决定使用月，星期，日还是小时范围的刻度。
            // 'log' 对数轴。适用于对数数据。
            type: "category",
            // min:-35,
            boundaryGap: true,
            data: [],
            // data:['Mar-00', 'Jun-00', 'Sep-00', 'Dec-00', 'Mar-01', 'Jun-01', 'Sep-01', 'Dec-01', 'Mar-02', 'Jun-02', 'Sep-02', 'Dec-02', 'Mar-03', 'Jun-03', 'Sep-03', 'Dec-03', 'Mar-04', 'Jun-04', 'Sep-04', 'Dec-04', 'Mar-05', 'Jun-05', 'Sep-05', 'Dec-05', 'Mar-06', 'Jun-06', 'Sep-06', 'Dec-06', 'Mar-07', 'Jun-07', 'Sep-07', 'Dec-07', 'Mar-08', 'Jun-08', 'Sep-08', 'Dec-08', 'Mar-09', 'Jun-09', 'Sep-09', 'Dec-09', 'Mar-10', 'Jun-10', 'Sep-10', 'Dec-10', 'Mar-11', 'Jun-11', 'Sep-11', 'Dec-11', 'Mar-12', 'Jun-12', 'Sep-12', 'Dec-12', 'Mar-13', 'Jun-13', 'Sep-13', 'Dec-13', 'Mar-14', 'Jun-14', 'Sep-14', 'Dec-14', 'Mar-15', 'Jun-15', 'Sep-15', 'Dec-15', 'Mar-16', 'Jun-16', 'Sep-16', 'Dec-16', 'Mar-17', 'Jun-17', 'Sep-17']
            // data: 年6月', '200/2年9月', '2002年12月', '2003年3月', '2003年6月', '2003年9月', '2003年12月', '2004年3月', '2004年6月', '2004年9月', '2004年12月', '2005年3月', '2005年6月', '2005年9月', '2005年12月', '2006年3月', '2006年6月', '2006年9月', '2006年12月', '2007年3月', '2007年6月', '2007年9月', '2007年12月', '2008年3月', '2008年6月', '2008年9月', '2008年12月', '2009年3月', '2009年6月', '2009年9月', '2009年12月', '2010年3月', '2010年6月', '2010年9月', '2010年12月', '2011年3月', '2011年6月', '2011年9月', '2011年12月', '2012年3月', '2012年6月', '2012年9月', '2012年12月', '2013年3月', '2013年6月', '2013年9月', '2013年12月', '2014年3月', '2014年6月', '2014年9月', '2014年12月', '2015年3月', '2015年6月', '2015年9月', '2015年12月', '2016年3月', '2016年6月', '2016年9月', '2016年12月', '2017年3月', '2017年6月', '2017年9月']
            axisLabel: {
              color: "rgba(204,255,255,0.5)"
            }
          },
          yAxis: {
            type: "value",
            splitLine: {
              show: false
            },
            // min:-35,
            // name: "占世界贸易额比重",
            axisLabel: {
              formatter: "{value} w",
              color: "rgba(204,255,255,0.5)"
            }
          },
          dataZoom: [{
              type: "slider",
              start: 0,
              end: 10,
              // realtime: false, //是否实时加载
              realtime: true, //是否实时加载
              show: true,
              textStyle: {
                color: "#33ffff",
                fontFamily: 'Microsoft YaHei'
              },
              fillerColor: "rgba(51, 255, 255, 0.2)",
              dataBackground: { //数据阴影的样式。
                // lineStyle:mylineStyle,              //阴影的线条样式
                areaStyle: {
                  color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                      offset: 1,
                      color: '#33ffff' // 100% 处的颜色
                    }, {
                      offset: 0,
                      color: '#9999ff' // 0% 处的颜色
                    }],
                    globalCoord: false // 缺省为 false
                  }
                }, //阴影的填充样式
              },
              // backgroundColor: "rgba(51, 255, 255, 0.2)",
              // backgroundColor: "rgba(51, 255, 255, 0.2)",
              // dataBackground: "rgba(51, 255, 255, 0.8)",
              // borderColor:"rgba(51, 255, 255, 0.2)", //边框颜色
              borderColor: "rgba(0,0,0,0)", //边框颜色
              cursor: "move",
              xAxisIndex: [0],
              // startValue: 10,
              // endValue: 20,
              minValueSpan: 1,
              handleIcon: "M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",
              handleSize: "80%",
              handleStyle: {
                color: "rgb(51, 255, 255)",
                shadowBlur: 3,
                shadowColor: "rgba(0, 0, 0, 1)",
                shadowOffsetX: 2,
                shadowOffsetY: 2
              },
              cursor: "pointer"
            },
            {
              type: "inside",
              start: 0,
              end: 10,
              show: true,
              xAxisIndex: [0],
              startValue: 0,
              endValue: 5,
              minValueSpan: 100
            }
          ],
          series: [{
            name: "China",
            type: "bar",
            // barMaxWidth: '10%',
            // barMinHeight: '1px',
            itemStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: "#33ffff"
                },
                {
                  offset: 1,
                  color: "#9999ff"
                }
              ]),
              barBorderRadius: [3, 3, 3, 3],
              // label: {
              //           show: true,
              //           position: 'top',
              //           textStyle: {
              //               color: '#fff',
              //               fontSize: '14'
              //           }
              //       }
            },
            animationDelay: function(idx) {
              return 0;
              //return idx * 1000;
            },
            animationDurationUpdate: function(idx) {
              // 越往后的数据延迟越大
              return 1;
            },
            data: []
          }]
        };
        this.charts = echarts.init(document.getElementById(this.main1Id), "", {
          width: document.documentElement.clientWidth * this.$store.state.split - 20 + 'px',
          height: document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        });
        mthis.timeTitle = ''
        this.option.xAxis.data = this.dataBySeries.date;
        this.option.series[0].data = this.dataBySeries.num;
        this.charts.setOption(this.option)
        this.charts.on('brushSelected', function (params) {
          console.log(params)
          mthis.timeTitle = ''
          if(params.batch[0].areas.length  === 0) {
            mthis.timeTitle = ''
          } else{
            mthis.timeTitle = mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]] + ' 至 ' + mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex.length-1]
          }
        })
        this.charts.on('click', function (params) {
          mthis.timeTitle = params.name
          // alert(0)
          // console.log(params)
          // if(params.batch!==undefined &&params.batch[0].areas.length  === 0) {
          //   alert(1)
          //   alert(params.batch!==undefined &&params.batch[0].areas.length  === 0)
          //   alert(params.batch[0].areas.length)
          //   mthis.timeTitle = ''
          // } else if(params.batch!==undefined &&params.batch[0].areas.length  > 0) {
          //   alert(2)
          //   alert(params.batch!==undefined &&params.batch[0].areas.length >  0)
          //   alert(params.batch[0].areas.length)
          //   mthis.timeTitle = mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]] + ' 至 ' + mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex.length-1]
          // } else {
          //   alert(3)
          //   mthis.timeTitle = params.name
          // }
          
            // myChart.dispatchAction({
            //     type: 'dataZoom',
            //     startValue: dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
            //     endValue: dataAxis[Math.min(params.dataIndex + zoomSize / 2, data.length - 1)]
            // });
          mthis.charts.dispatchAction({
              type: 'highlight',
              // 可选，数据的 index
              dataIndex: params.dataIndex
          })
        })
        mthis.timeTitle = ''
        this.option.xAxis.data = this.dataBySeries.date;
        this.option.series[0].data = this.dataBySeries.num;
        this.charts.setOption(this.option)
        this.charts.on('brushSelected', function (params) {
          mthis.timeTitle = ''
          if(params.batch[0].areas.length  === 0) {
            mthis.timeTitle = ''
          } else{
            console.log('========================================')
            console.log(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]])
            console.log(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[(params.batch[0].selected[0].dataIndex.length) - 1]])
            console.log('========================================')
            mthis.timeTitle = mthis.dataBySeries.date[0] + ' 至 ' + mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[(params.batch[0].selected[0].dataIndex.length) - 1]]
            let timeArr = []
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]])
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[(params.batch[0].selected[0].dataIndex.length) - 1]])
            mthis.$store.commit('setContentTimeCondition',timeArr)
          }
        })
        this.charts.on('click', function (params) {
          mthis.timeTitle = params.name
          let timeArr = []
          timeArr.push(params.name)
          timeArr.push(params.name)
          mthis.$store.commit('setNetTimeCondition',timeArr)
          mthis.charts.dispatchAction({
              type: 'highlight',
              // 可选，数据的 index
              dataIndex: params.dataIndex
          })
        })
        this.charts.dispatchAction({
          type: "takeGlobalCursor",
          key: "brush",
          brushOption: {
            brushType: "lineX"
          }
        });
      }
    },
    // props: ['splitWidth', 'split'],
    //调用
    mounted() {
      this.netHeightCount++;
      this.contentHeightCount++;
      this.geoHeightCount+=2;
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      this.timepx =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 30 + "px";
      this.timepxdiv =
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
        
      /* this.iconPosition = useHeight * 0.8 + "px"; */

      this.pwidth = document.documentElement.clientWidth * this.$store.state.split - 20 + 'px'
      // this.iconPosition = useHeight - 40 + "px";
      this.loadEcharts();
      let that = this;
      // Enable data zoom when user click bar.
      var zoomSize = 6;
      // this.changHeightCount++
    },
    computed:mapState ([
      'split','splitWidth','tmss','selectNetNodes'
    ]),
    watch: {
      /* tmss: function(){
        var mthis = this;
        if(mthis.tmss == 'geo'){
          mthis.changHeightCount++;
        }
      }, */
      selectNetNodes: function(va) {
        var mthis = this;
        if(mthis.tmss == 'net'){
          // alert('下面要查询实体相关时间');
        }
      },
      split: function(va) {
        let width = document.documentElement.clientWidth * va - 20 + 'px'
        let height = document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        this.charts.resize({
          width,
          height
        })
      },
      splitWidth: function(va) {
        this.pwidth = document.documentElement.clientWidth * this.$store.state.split - 20 + 'px'
      },
      geoHeightCount: function() {
        var mthis = this
        
        var tmss = mthis.$store.state.tmss;
        let useHeight = document.documentElement.clientHeight - 64 - 20;
        if (mthis.geoHeightCount % 2 === 0) {
          /* mthis.iconPosition = useHeight - 40 + "px"; */
          document.getElementById('arrowDown_geo').style.top = useHeight - 40 + "px";
          //var timeDivHeight = parseInt(document.getElementById(mthis.timechartdivId).style.height)
          //mthis.$store.commit('setGeoHeight',useHeight * 1)
            mthis.$store.commit('setGeoHeight',useHeight * 1)

          document.getElementById('timechartctrl_geo').style.display = "none";
          document.getElementById('main1_geo').style.display = "none";
          document.getElementById('timediv_geo').style.display = "none";
          document.getElementById('arrowDown_geo').style.transform = "rotate(0deg)";
          /* mthis.$store.commit('setChangenetpx',false); */
          
        } else {
          
          /* mthis.iconPosition = useHeight * 0.8 + "px"; */
          document.getElementById('arrowDown_geo').style.top = useHeight * 0.8 + "px";
          /* mthis.$store.commit('setChangenetpx',true); */
          document.getElementById('timechartctrl_geo').style.display = "block";
          document.getElementById('main1_geo').style.display = "block";
          document.getElementById('timediv_geo').style.display = "block";
          document.getElementById('arrowDown_geo').style.transform = "rotate(180deg)";
          //mthis.$store.commit('setGeoHeight',useHeight * 0.8)
            mthis.$store.commit('setGeoHeight',useHeight * 0.8)
        }
        document.getElementById('arrowDown_geo').style.position = "absolute";
        document.getElementById('arrowDown_geo').style.right = "20px";
        
        /* var netpxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + 55 + "px"; */
       /*  document.getElementById('arrowDown_geo').style.top = netpxdiv; */
        document.getElementById('arrowDown_geo').style.zIndex = 99;
      },
      netHeightCount: function() {
        var mthis = this
        
        var tmss = mthis.$store.state.tmss;
        let useHeight = document.documentElement.clientHeight - 64 - 20;
        if (mthis.netHeightCount % 2 === 0) {
          /* mthis.iconPosition = useHeight - 40 + "px"; */
          document.getElementById('arrowDown_net').style.top = useHeight - 40 + "px";
          
            mthis.$store.commit('setNetHeight',useHeight * 1)

          document.getElementById('timechartctrl_net').style.display = "none";
          document.getElementById('main1_net').style.display = "none";
          document.getElementById('timediv_net').style.display = "none";
          document.getElementById('arrowDown_net').style.transform = "rotate(0deg)";
          mthis.$store.commit('setChangenetpx',false);
          
        } else {
          /* mthis.iconPosition = useHeight * 0.8 + "px"; */
          document.getElementById('arrowDown_net').style.top = useHeight * 0.8 + "px";
          // this.timepx =
          //   (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 -
          //   30 +
          //   "px";
          // this.timepxdiv =
          //   (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
          // mthis.$emit('changenetpx', true);
          mthis.$store.commit('setChangenetpx',true);
          document.getElementById('timechartctrl_net').style.display = "block";
          document.getElementById('main1_net').style.display = "block";
          document.getElementById('timediv_net').style.display = "block";
          document.getElementById('arrowDown_net').style.transform = "rotate(180deg)";
          //mthis.$store.commit('setGeoHeight',useHeight * 0.8)
            mthis.$store.commit('setNetHeight',useHeight * 0.8)
        }
        document.getElementById('arrowDown_net').style.position = "absolute";
        document.getElementById('arrowDown_net').style.right = "20px";
        
/*         var netpxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + 55 + "px"; */
        /* document.getElementById('arrowDown_net').style.top = netpxdiv; */
        document.getElementById('arrowDown_net').style.zIndex = 99;
      },
      contentHeightCount: function() {
        var mthis = this
        
        var tmss = mthis.$store.state.tmss;
        let useHeight = document.documentElement.clientHeight - 64 - 20;
        if (mthis.contentHeightCount % 2 === 0) {
          /* mthis.iconPosition = useHeight - 40 + "px"; */
          document.getElementById('arrowDown_content').style.top = useHeight - 40 + "px";
          
          //var timeDivHeight = parseInt(document.getElementById(mthis.timechartdivId).style.height)
          //mthis.$store.commit('setGeoHeight',useHeight * 1)
            mthis.$store.commit('setContentHeight',useHeight * 1)

          document.getElementById('timechartctrl_content').style.display = "none";
          document.getElementById('main1_content').style.display = "none";
          document.getElementById('timediv_content').style.display = "none";
          document.getElementById('arrowDown_content').style.transform = "rotate(0deg)";
          /* mthis.$store.commit('setChangenetpx',false); */
          
        } else {
          /* mthis.iconPosition = useHeight * 0.8 + "px"; */
          document.getElementById('arrowDown_content').style.top = useHeight * 0.8 + "px";
          // this.timepx =
          //   (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 -
          //   30 +
          //   "px";
          // this.timepxdiv =
          //   (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
          // mthis.$emit('changenetpx', true);
          /* mthis.$store.commit('setChangenetpx',true); */
          document.getElementById('timechartctrl_content').style.display = "block";
          document.getElementById('main1_content').style.display = "block";
          document.getElementById('timediv_content').style.display = "block";
          document.getElementById('arrowDown_content').style.transform = "rotate(180deg)";
          //mthis.$store.commit('setGeoHeight',useHeight * 0.8)
            mthis.$store.commit('setContentHeight',useHeight * 0.8)
        }
        document.getElementById('arrowDown_content').style.position = "absolute";
        document.getElementById('arrowDown_content').style.right = "20px";
/*         var netpxdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + 55 + "px"; */
        /* document.getElementById('arrowDown_content').style.top = netpxdiv; */
        document.getElementById('arrowDown_content').style.zIndex = 99;
      }
    },
    props:{activeId:String}
  };
</script>
<style scoped>
  * {
    margin: 0;
    padding: 0;
    list-style: none;
  }
  #main1 {
    background-color: rgba(0, 0, 0, 0);
  }
</style>