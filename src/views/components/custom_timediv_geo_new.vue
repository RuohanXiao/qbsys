<template>
  <div :id="timechartdivId">
    <Icon class="icon iconfont icon-drop-up process-img DVSL-bar-btn rotate" :id="arrowDownId" size="18" :style="{lineHeight:'30px',marginTop:'3px',position:'absolute',right: '20px',zIndex:99,transform:'rotate(180deg)'}" @click="onchangHeightCount"></Icon>
    <div :style="{height:'30px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px',borderRight:'1px solid rgb(51, 102, 102)',borderLeft:'1px solid rgb(51, 102, 102)',borderBottom:'1px solid rgb(51, 102, 102)'}" :id="timechartctrlId">
      <Row type="flex" justify="space-between" class="code-row-bg" :style="{height:'45px',paddingLeft:'10px'}">
        <!-- <Col span="1" />
        <Col span="20" class="bottom" :style="{textAlign:'left'}"><span :style="{lineHeight:'30px',color:'rgba(51, 255, 255, 0.5)'}">{{timeTitle}}</span></Col> -->
        <Col span="21" class="bottom" :style="{textAlign:'left'}"><span :style="{lineHeight:'30px',color:'rgba(51, 255, 255, 0.5)'}">{{timeTitle}}</span></Col>
        <Col span="1" class="bottom">
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
    <div :style="{borderRight:'1px solid rgb(51, 102, 102)',borderLeft:'1px solid rgb(51, 102, 102)',borderBottom:'1px solid rgb(51, 102, 102)',margin:'0 10px 0 10px',backgroundColor:'rgba(0,0,0,0.5)',height: timepxdiv}" :id="timedivId">
      <!-- <div id='barchart' :style="{height: timepxdiv,width:'300px'}"></div> -->
      <!-- <echarts id='barchart' :options="bar" :style="{height: timepxdiv}" :auto-resize="true" ></echarts> -->
      <div :id="main1Id" :style="{width:pwidth}"></div>
    </div>
    </Col>
    <div v-show="clcikShowDiv" class="clcikShowDiv" :style="{left:clickdivLeft}" @mouseleave="clcikShowDiv=false" @click="toGeoAna(1)">选中分析</div>
    <div v-show="boxSelShowDiv" class="boxSelShowDiv" :style="{left:boxdivLeft}" @mouseleave="boxSelShowDiv=false" @click="toGeoAna(2)">选中分析</div>
  </div>
</template>
 
<script>
  import echarts from "echarts";
  import { mapState,mapMutations } from 'vuex'
  import {timeStaticsData,reSetTimeStaticsData} from '../../dist/assets/js/geo/data.js'
  export default {
    name: "",
    data() {
      return {
        timeStaticsData:timeStaticsData,
        timeTitle: '请选择节点',
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
        // dataBySeries: {
        //   num: [10,2,3,2,4,12,3,6,24,3,12,12,43,2,13,15,56,33,32,23,22,3,,,43,56,23,15,6,,,23,3,,44,21,12,51,67,2,10,24,,6,23,15,6,,,23,3,,44,21,12,51,67,2,10,24,3,12,12,43,2,1,],
        //   date: ['2019-01-01', '2019-01-02', '2019-01-03', '2019-01-04', '2019-01-05', '2019-01-06', '2019-01-07', '2019-01-08', '2019-01-09', '2019-01-10', '2019-01-11', '2019-01-12', '2019-01-13', '2019-01-14', '2019-01-15', '2019-01-16', '2019-01-17', '2019-01-18','2019-01-19', '2019-01-20', '2019-01-21', '2019-01-22', '2019-01-23', '2019-01-24', '2019-01-25', '2019-01-26', '2019-01-27', '2019-01-28',  '2019-01-29', '2019-01-30', '2019-01-31',
        //          '2019-02-01', '2019-02-02', '2019-02-03', '2019-02-04', '2019-02-05', '2019-02-06', '2019-02-07', '2019-02-08', '2019-02-09', '2019-02-10', '2019-02-11', '2019-02-12', '2019-02-13', '2019-02-14', '2019-02-15', '2019-02-16', '2019-02-17', '2019-02-18','2019-02-19', '2019-02-20', '2019-02-21', '2019-02-22', '2019-02-23', '2019-02-24', '2019-02-25', '2019-02-26', '2019-02-27', '2019-02-28'],
        // clickNum:[]      
        // },
        dataBySeries: {
          num: [],
          date: [],
          clickNum:[]
        },
        geo_eventIds:[],
        // selectTime: false,
        // 右键点击柱子出现选中分析
        clcikShowDiv:false,
        // 右键点击柱子出现选中分析div的left值
        clickdivLeft:'',
        // 框选时间右键点击出现选中分析
        boxSelShowDiv:false,
        // 框选时间右键点击出现选中分析div的left值
        boxdivLeft:'',
        //点击单个柱子的选中分析，要传给数据透视的事件IDS
        clickEventIds:{
          type:"analysis",
          eventIds:[]
        },
        //点击框选时间的选中分析，要传给数据透视的事件IDS
        boxSelEventIds:{
          type:"analysis",
          eventIds:[]
        },
        // 框选时控制选中分析的显示与否
        isBrush:[],
        // 框选时间轴，给geo画布的事件IDS
        toGeoEventIds:{
          type:"notAnalysis",
          eventIds:[]
        },
        geoStatics_eventIds:[],
        geo_only_eventIds:[],
        selTimeArr:[],
        isDataZoom:false
      };
    },
    methods: {
      toGeoAna(flag){
        if(flag==1){
          this.clickEventIds.type = "analysis";
          this.$store.commit('setGeoTimeCondition',this.clickEventIds);
        }else{
          this.boxSelEventIds.type = "analysis";
          console.log(this.boxSelEventIds)
          this.$store.commit('setGeoTimeCondition',this.boxSelEventIds);
        }
        

      },
      query(){
            this.$http.post(this.$store.state.ipConfig.api_event_test_url + '/time-2-event/',{
                    "selectedIds":this.geo_only_eventIds,
                    "startTime":this.selTimeArr[0],
                    "endTime":this.selTimeArr[1]
                }).then(response =>{
                    if(response.body.code == 0){
                      this.boxSelEventIds.eventIds =[]
                      this.toGeoEventIds.eventIds = []
                      for(let i=0;i<response.body.data.eventIds.length;i++){
                        this.boxSelEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                        this.toGeoEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                      }
                      console.log(response.body.data)
                      console.log(this.toGeoEventIds)
                      this.$store.commit('setGeoTimeCondition',this.toGeoEventIds)
                      
                    }else{
                      console.log("服务器error")   
                    }
                    
                })
        
      },
      throttle(fn,delay,duration){
        
        let timer = null;
        let prev = new Date();
        return function(){
          var now = new Date();
          
          if(now - prev > duration){
            
            fn();
            prev = now;
            // clearTimeout(timer);
          }else{
            // clearTimeout(timer);
            timer = setTimeout(function(){
              
              fn();
              // prev = null;
            },delay)
          }
        }
      },
      onchangHeightCount(){
        var mthis = this;
        var tmss = mthis.$store.state.tmss;
        mthis.geoHeightCount ++ ;
      },
      timeZoomOut() { },
      timeZoomIn() { },
      resize() {
        let width = document.documentElement.clientWidth * this.$store.state.split_geo - 20 + 'px'
        let height = document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        this.charts.resize({
          width,
          height
        })
      },
      hideDiv(){
        
        this.clcikShowDiv = false;
        this.boxSelShowDiv = false;
      },
      loadEcharts(flag){
        
        var mthis = this
        
        if(flag === 1){
          
          // var mthis = this
          // this.option = null
        this.option = new Object({
          
          tooltip: {
            trigger: "axis",
            padding:10,
            barBorderRadius:8,
        },
         
          grid: {
            top: "10%",
            right: "4%",
            left: '50px',
            bottom:'20%',
            containLabel: true  
          },
          toolbox: {
            id: "toolbox",
            left:"30px",
            show: false,
            feature: {
              
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
              },
              
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
            
            throttleType: "debounce",
            //throttleDelay: 300,
            throttleDelay: 0,
            transformable: true, //已经选好的选框是否可以被调整形状或平移。
            selected: [
              
              {
                // series 0 被选中的项
                seriesIndex: 0, //指定了哪些 series 可以被联动  [3, 4, 5] 表示 seriesIndex 为 3, 4, 5 的 series 可以被联动
                dataIndex: [] // 用这些 dataIndex，可以去原始数据中找到真正的值。
              }
            ]
          },
          xAxis: {
            
            type: "category",
            // min:-35,
            boundaryGap: true,
            data: [],
            splitNumber:10,
            axisLabel: {
              // rotate:-10,
              color: "rgba(204,255,255,0.5)"
            }
          },
          
          yAxis:{
            type:"value",
            show:true,
            min:0,
            max:function(value){
                return value.max
            },
            minInterval: 1,
            axisLabel:{
              formatter:"{value}",
              color: "rgba(204,255,255,1)"
            },
            splitLine:{show:false},
            
          },
          dataZoom: [{
              type: "slider",
              start: 0,
              end: 100,
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
              
              borderColor: "rgba(0,0,0,0)", //边框颜色
              cursor: "move",
              xAxisIndex: [0],
              // startValue: 10,
              // endValue: 20,
              minValueSpan: 10,
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
              // start: 0,
              // end: 10,
              show: true,
              xAxisIndex: [0],
              // startValue: 0,
              // endValue: 5,
              minValueSpan: 10
            }
          ],
        series: [{
            name: "全部",
            type: "bar",
            barGap:"-100%",
            // barWidth:'10px',
            barMaxWidth: '30%',
            barWidth:'10px',
            barMinHeight: '1px',
            barCategoryGap:'50%',
            itemStyle: {
              // 柱形图默认颜色
              normal: {
                cursor: "default",
                barBorderRadius: [3, 3, 3, 3],
                color: "rgba(51,204,153,1)"
              },
              // 柱形图悬浮颜色
              emphasis: {
                cursor: "pointer",
                barBorderRadius: [3, 3, 3, 3],
                color: "rgba(51,204,153,1)"
                
              },
              
              
            },
            animationDelay: function(idx) {
              return 0;
             
            },
            animationDurationUpdate: function(idx) {
              
              return 1;
            },
            // data:mthis.dataBySeries.num
            data: []
          },
          {
                    type:'bar',
                    // barWidth:'10px',
                    barMaxWidth: '30%',
                    barWidth:'10px',
                    barMinHeight: '1px',
                    barCategoryGap : '60%',
                    data:mthis.dataBySeries.clickNum,
                    itemStyle:{
                        color:'#33ddff',
                        barBorderRadius:[3,3,3,3]
                    }
                }],
        
        });
        mthis.charts = echarts.init(document.getElementById(mthis.main1Id), "", {
          width: document.documentElement.clientWidth * mthis.$store.state.split_net - 20 + 'px',
          height: document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        });
        mthis.timeTitle = '请选择节点'
        mthis.option.xAxis.data = mthis.dataBySeries.date;
        mthis.option.series[0].data = mthis.dataBySeries.num;
        mthis.option.series[1].data = mthis.dataBySeries.clickNum;
       
        mthis.charts.setOption(mthis.option)
        this.charts.on('brushSelected', function(params) {
          
          var wholeChart = document.getElementById(mthis.timechartdivId);
            wholeChart.onclick = () => false;
          if (params.batch[0].areas[0] !== undefined) {
            var startAndEnd = params.batch[0].areas[0].coordRanges[0];
             mthis.boxdivLeft = params.batch[0].areas[0].range[1] + 20 +'px'
             mthis.isDataZoom = true
            
            
          }
          // mthis.timeTitle = '请选择节点'
          if (params.batch[0].areas.length === 0) {
            if(mthis.isDataZoom){
              // console.log("hahhaah")
              mthis.timeTitle = '时间轴'
              mthis.boxSelEventIds.eventIds = []
              mthis.toGeoEventIds.eventIds = []
              mthis.toGeoEventIds.type = 'cancelBox'
              mthis.$store.commit('setGeoTimeCondition',mthis.toGeoEventIds)
              // console.log(mthis.toGeoEventIds)
              mthis.isBrush = []
              mthis.boxSelShowDiv = false
              mthis.$store.commit('setGeoTimeCondition',mthis.boxSelEventIds)
              // console.log(mthis.boxSelEventIds)
            }
            mthis.isDataZoom = false
            
          } else {
            if(startAndEnd[0]<0){
              startAndEnd[0] = 0
            }
            if(startAndEnd[1]<0 || mthis.dataBySeries.date[startAndEnd[1]] === undefined){
              startAndEnd[1] = mthis.dataBySeries.date.length - 1
            }
            mthis.timeTitle = mthis.dataBySeries.date[startAndEnd[0]] + ' 至 ' + mthis.dataBySeries.date[startAndEnd[1]]
            let timeArr = []
            mthis.isBrush = timeArr
            mthis.selTimeArr = []
            mthis.selTimeArr.push(mthis.dataBySeries.date[startAndEnd[0]])
            mthis.selTimeArr.push(mthis.dataBySeries.date[startAndEnd[1]])
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]])
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[(params.batch[0].selected[0].dataIndex.length) - 1]])
            if(timeArr && mthis.selTimeArr[0] && mthis.selTimeArr[1]){
                mthis.throttle(mthis.query,1000,1000)()
                //     mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + '/time-2-event/',{
                //     "selectedIds":mthis.geo_only_eventIds,
                //     "startTime":selTimeArr[0],
                //     "endTime":selTimeArr[1]
                // }).then(response =>{
                //     if(response.body.code == 0){
                      
                //       for(let i=0;i<response.body.data.eventIds.length;i++){
                //         mthis.boxSelEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                //         mthis.toGeoEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                //       }
                      
                //       mthis.$store.commit('setGeoTimeCondition',mthis.toGeoEventIds)
                      
                //     }else{
                //       console.log("服务器error")
                //     }
                    
                // })
                // mthis.selectTime = true
              }
            }
            
          
        })
        
        this.charts.dispatchAction({
          type: "takeGlobalCursor",
          key: "brush",
          brushOption: {
            brushType: "lineX"
          }
        });
        this.charts.on('click', function(params) {
          mthis.timeTitle = params.name
          let timeArr = []
          
          timeArr.push(params.name)
          timeArr.push(params.name)
        //   mthis.$store.commit('setNetTimeCondition', timeArr)
          mthis.clcikShowDiv = false;
          mthis.boxSelShowDiv = false;
          mthis.isBrush = [];
          mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + '/time-2-event/',{
                    "selectedIds":mthis.geo_eventIds,
                    "startTime":params.name,
                    "endTime":params.name
                }).then(response =>{
                    if(response.body.code == 0){
                      mthis.boxSelEventIds.eventIds= []
                      mthis.toGeoEventIds.eventIds = []

                      for(let i=0;i<response.body.data.eventIds.length;i++){
                        mthis.boxSelEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                        mthis.toGeoEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i];
                      }
                      
                      mthis.$store.commit('setGeoTimeCondition',mthis.toGeoEventIds);
                      
                    }else{
                      console.log("服务器error")
                    }
                    
                })
          mthis.charts.dispatchAction({
            type: 'highlight',
            // 可选，数据的 index
            dataIndex: params.dataIndex
          })
         
        });
        let myChart = document.getElementById(mthis.main1Id);
        var wholeChart = document.getElementById(mthis.timechartdivId);
        myChart.oncontextmenu = () => false;
        // wholeChart.oncontextmenu = () =>false;
        mthis.charts.on('contextmenu',function(params){
            // wholeChart.oncontextmenu = () =>false;
            let leftWid = params.event.offsetX+20 + "px"
            var clickTime = params.name
            
            mthis.clcikShowDiv = true
            mthis.clickdivLeft = leftWid
            mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + '/time-2-event/',{
                "selectedIds":mthis.geo_eventIds,
                "startTime":clickTime,
                "endTime":clickTime
                 
            }).then(response =>{
                if(response.body.code == 0){
                  for(let i=0;i<response.body.data.eventIds.length;i++){
                    mthis.clickEventIds.eventIds[i] = "event&" + response.body.data.eventIds[i]
                  }
                  
                  
                }else{
                  console.log("服务器error")
                }
                
            })
            
          })
          wholeChart.oncontextmenu = function(){
               if(mthis.isBrush.length>0){
                 mthis.boxSelShowDiv = true
               }
               mthis.isBrush = [] 
                   
                   
                
                
            }
          wholeChart.onclick = function(){
            mthis.clickEventIds.title = "";
            mthis.clickEventIds.ids=[];
            mthis.boxSelEventIds.title = "";
            mthis.boxSelEventIds.ids = "";
            // console.log("1111111111111")
          }
        }else if(flag ==2){
          
          mthis.timeTitle = '时间轴';
          mthis.resize();
          mthis.option.xAxis.data = mthis.dataBySeries.date;
          
          mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[1].data = mthis.dataBySeries.clickNum;
          mthis.charts.setOption(mthis.option)
          
        }else if(flag==3){
          mthis.resize();
          mthis.option.xAxis.data = mthis.dataBySeries.date;
          mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[1].data = mthis.dataBySeries.clickNum;
          mthis.charts.setOption(mthis.option)
        }else{
          // console.log("noshuju")
          // console.log(mthis.geo_onlyselected_param)
          mthis.dataBySeries.num = [];
          mthis.dataBySeries.date = [];
          mthis.dataBySeries.clickNum = [];
          mthis.option.xAxis.data = [];
          mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[1].data = mthis.dataBySeries.clickNum;
          mthis.timeTitle = '请选择节点'
          mthis.charts.setOption(mthis.option)
        }

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
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 -8 + "px";
        
      /* this.iconPosition = useHeight * 0.8 + "px"; */

      this.pwidth = document.documentElement.clientWidth * this.$store.state.split_geo - 20 + 'px'
      // this.iconPosition = useHeight - 40 + "px";
      this.loadEcharts(1);
      let that = this;
      // Enable data zoom when user click bar.
      var zoomSize = 6;
      // this.changHeightCount++
    },
    computed:mapState ([
      'split','split_geo','splitWidth','tmss','selectNetNodes','geo_selected_param','geo_onlyselected_param']),
    watch: {
      // setGeoOnlyselectedParam
        geo_onlyselected_param:function(){
          console.log('=========setGeoOnlyselectedParam  xxxxx==========')
          console.log(this.geo_onlyselected_param)
          var mthis = this
         
          if(this.geo_onlyselected_param.length>0){
             mthis.geo_only_eventIds = [];

            for(let i = 0;i<this.geo_onlyselected_param.length;i++){
              mthis.geo_only_eventIds[i] = this.geo_onlyselected_param[i].split("&")[1]
            }
            // for(let j=0;j<mthis.geo_only_eventIds.length;j++){
            //   if(mthis.geo_only_eventIds[j].length<20){
            //     mthis.geo_only_eventIds[j] = mthis.geo_only_eventIds[j] + "_d" +mthis.geo_only_eventIds[j]
            //   }
            // }
            mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + "/event-2-time/",{
                  "eventids":mthis.geo_only_eventIds
                }).then(response =>{
                  if(response.body.code === 0){
                       mthis.dataBySeries.date = response.body.data.time;
                       mthis.dataBySeries.num = response.body.data.count;
                       mthis.dataBySeries.clickNum = [];
                      
                       mthis.loadEcharts(2);
                       
                  }else{
                    console.log("服务器error")
                  }
                })

          }
          if(this.geo_onlyselected_param.length ==0){
            
            mthis.loadEcharts(4);
            }
        },
        geo_selected_param:function(){
           var mthis = this
           var type = this.$store.state.geo_selected_param.type;
          //  console.log(this.geo_selected_param)
           if(type == "GeoStatics"){
              if(this.geo_selected_param.paramIds.length>0){
                mthis.geoStatics_eventIds = []
                for(let i = 0;i<this.geo_selected_param.paramIds.length;i++){
                  mthis.geoStatics_eventIds[i] = this.geo_selected_param.paramIds[i].split("&")[1]
                }
                
                mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + "/event-2-time/",{
                      "eventids":mthis.geoStatics_eventIds
                    }).then(response =>{
                      if(response.body.code === 0){
                          mthis.dataBySeries.clickNum = new Array(mthis.dataBySeries.date.length).fill(0)
                          for(let i=0;i<response.body.data.time.length;i++){
                            let index = mthis.dataBySeries.date.indexOf(response.body.data.time[i])
                            mthis.dataBySeries.clickNum[index] = response.body.data.count[i];
                           
                          }
                          
                          mthis.loadEcharts(3);
                          
                      }else{
                        console.log("服务器error")
                      }
                    })
              }
              if(this.geo_selected_param.paramIds.length==0){
                mthis.dataBySeries.clickNum = [];
                
              }
              
            }
            
            
        },
      split_geo: function(va) {
        let width = document.documentElement.clientWidth * va - 20 + 'px'
        let height = document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        this.charts.resize({
          width,
          height
        })
      },
      splitWidth: function(va) {
        this.pwidth = document.documentElement.clientWidth * this.$store.state.split_geo - 20 + 'px'
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
          document.getElementById('arrowDown_geo').style.top = useHeight * 0.8 -3 + "px";
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
  .clcikShowDiv{
    position: absolute;
    top:620px;
    width:60px;
    height:20px;
    text-align: center;
    line-height: 20px;
    background-color:rgba(51,204,153,0.7);
    /* z-index:999999; */
    border-radius: 10px;
  }
  .boxSelShowDiv{
    position: absolute;
    top:620px;
    width:60px;
    height:20px;
    text-align: center;
    line-height: 20px;
    background-color:rgba(51,204,153,0.7);
    /* background-color:red; */
    /* z-index:999999; */
    border-radius: 10px;
  }
  .clcikShowDiv:hover{
    cursor: pointer;
  }
  .boxSelShowDiv:hover{
    cursor: pointer;
  }
</style>