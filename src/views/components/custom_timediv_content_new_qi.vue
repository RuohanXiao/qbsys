<template>
  <!--为echarts准备一个具备大小的容器dom-->
  <div :id="timechartdivId" @click="hideDiv()">
    <Icon class="icon iconfont icon-drop-up process-img DVSL-bar-btn rotate" :id="arrowDownId" size="18" :style="{lineHeight:'30px',position:'absolute',right: '20px',zIndex:99,transform:'rotate(180deg)'}" 
    @click="onchangHeightCount" v-show="showDocTime"></Icon>
    <div :style="{height:'30px',margin:'0 10px 0 10px',borderRight:'1px solid rgb(51, 102, 102)',borderLeft:'1px solid rgb(51, 102, 102)',borderBottom:'1px solid rgb(51, 102, 102)'}" :id="timechartctrlId">
      <Row type="flex" justify="space-between" class="code-row-bg" :style="{height:'45px',paddingLeft:'10px'}">
        <!-- <Col span="3"/> -->
        <Col span="21"  class="bottom" :style="{textAlign:'left'}"><span :style="{lineHeight:'30px',color:'rgba(51, 255, 255, 0.5)'}">{{timeTitle}}</span></Col>
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
    <div :style="{borderRight:'1px solid rgb(51, 102, 102)',borderLeft:'1px solid rgb(51, 102, 102)',borderBottom:'1px solid rgb(51, 102, 102)',margin:'0 10px 0 10px',backgroundColor:'rgba(0,0,0,0.5)',height: timepxdiv}" :id="timedivId">
      <!-- <div id='barchart' :style="{height: timepxdiv,width:'300px'}"></div> -->
      <!-- <echarts id='barchart' :options="bar" :style="{height: timepxdiv}" :auto-resize="true" ></echarts> -->
      <div :id="main1Id" :style="{width:pwidth}"></div>
    </div>
    </Col>
    <div class="clcikShowDiv" :style="{left:clickdivLeft,top:clickdivTop}" v-show="clcikShowDiv" @mouseleave="clcikShowDiv=false">
      <table style = 'font-size: 12px;color: #178d8d;margin: 3px 0px;text-align:center;'>
        <tr  @click="toGeoAna(1)" class="trClass">
          <td class="icon iconfont icon-ren" style='padding-left: 3px;'></td>
          <td style="padding-right:5px;">只选中它</td>
        </tr>
        <tr @click="delSel" class="trClass">
          <td class="icon iconfont icon-ren" style='padding-left: 3px;'></td>
          <td style="padding-right:30px;">删除</td>
        </tr>
      </table>
    </div>
    <div class="clcikShowDiv" :style="{left:boxdivLeft,top:boxdivTop}" v-show="boxSelShowDiv" @mouseleave="boxSelShowDiv=false">
      <table style = 'font-size: 12px;color: #178d8d;margin: 3px 0px;text-align:center;'>
        <tr  @click="toGeoAna(2)" class="trClass">
          <td class="icon iconfont icon-ren" style='padding-left: 3px;'></td>
          <td style="padding-right:5px;">只选中它</td>
        </tr>
        <tr @click="delSel" class="trClass">
          <td class="icon iconfont icon-ren" style='padding-left: 3px;'></td>
          <td style="padding-right:30px;">删除</td>
        </tr>
      </table>
    </div>
  </div>
</template>
 
<script>
  import echarts from "echarts";
  import { mapState,mapMutations } from 'vuex'
  import util from '../../util/tools'
  var timer = null
  export default {
    name: "",
    data() {
      return {
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
        dataBySeries: {
          num: [],
          date: [],
          clickNum:[]
        },
        selectTime: false,
        // 右键点击柱子出现选中分析
        clcikShowDiv:false,
        // 右键点击柱子出现选中分析div的left值
        clickdivLeft:'',
        clickdivTop:'',
        // 框选时间右键点击出现选中分析
        boxSelShowDiv:false,
        // 框选时间右键点击出现选中分析div的left值
        boxdivLeft:'',
        boxdivTop:'',
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
        isDataZoom:false,
        isClick:false,
        echartsShowStart:0,
        echartsShowEnd:100,
        curInt:null,
        colorFlag:0,
        selIdsArr:[],
        sendDocIds:{
          type:'',
          ids:[]
        }

      };
    },
    methods: {
      getDateStr(dayCount,addDayCount){
        var dd = new Date(dayCount);
        dd.setDate(dd.getDate()+addDayCount);//获取AddDayCount天后的日期
        var y = dd.getFullYear(); 
        var m = (dd.getMonth()+1)<10?"0"+(dd.getMonth()+1):(dd.getMonth()+1);//获取当前月份的日期，不足10补0
        var d = dd.getDate()<10?"0"+dd.getDate():dd.getDate();//获取当前几号，不足10补0
        return y+"-"+m+"-"+d; 
      },
      getDate(datestr){
        var temp = datestr.split('-');
        var date = new Date(temp[0], temp[1] - 1, temp[2]);
    		return date;
      },
      formatEveryDay(start, end){
        var mthis = this;
        let dateList = []; 
		    var startTime = mthis.getDate(start);
		    var endTime = mthis.getDate(end);

		    while ((endTime.getTime() - startTime.getTime()) >= 0) {
		        var year = startTime.getFullYear();
		        var month = startTime.getMonth() + 1 < 10 ? '0' + (startTime.getMonth() + 1) : startTime.getMonth() + 1;
		        var day = startTime.getDate().toString().length == 1 ? "0" + startTime.getDate() : startTime.getDate();
		        dateList.push(year + "-" + month + "-" + day); 
		        startTime.setDate(startTime.getDate() + 1);
		    }
		    return dateList;
      },
      onchangHeightCount(){
        var mthis = this;
        var tmss = mthis.$store.state.tmss;
        mthis.contentHeightCount ++;
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
      delSel(){
        alert('删除')
      },
      query(){
        var mthis = this
        let sendIds = []
        let docIds = util.getStorage("docIds",mthis.selIdsArr)
        // console.log(mthis.selIdsArr)
        // console.log(docIds)
        for(var i in docIds){
              for(var j of docIds[i]){
                sendIds.push(j)
              }
            }
        mthis.sendDocIds.type = 'sel'
        mthis.sendDocIds.ids = sendIds
        mthis.$store.commit('setContentTimeCondition', mthis.sendDocIds)
        // console.log(mthis.$store.state.contentTimeCondition)
      },
      throttle(fn,delay,duration){
        if(timer){
          clearTimeout(timer)
        }
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
      toGeoAna(flag){
        if(flag==1){
          this.clcikShowDiv = false
          this.$store.commit('setContentTimeOnlySel',true)
          // console.log("click")
        }else{
          this.$store.commit('setContentTimeOnlySel',true)
          this.boxSelShowDiv = false
          this.isDataZoom = false
          this.charts.dispatchAction({
            type:'brush',
            areas:[]
          })
          // console.log('brush',this.isBrush)
          
        }
      },
      hideDiv(){
        var mthis = this
        if(this.isClick){
          
          this.curInt = null;
          
          this.option.series[1].data = []
          let cancelTime = []
          cancelTime.push(this.dataBySeries.date[0])
          cancelTime.push(this.dataBySeries.date[this.dataBySeries.date.length -1])
          mthis.sendDocIds.type = 'cancel';
          mthis.sendDocIds.ids = []
          this.$store.commit('setContentTimeCondition',mthis.sendDocIds)
          this.colorFlag = 0;
          this.charts.setOption(this.option)
        }
        this.isClick = false;
        this.clcikShowDiv = false;
        this.boxSelShowDiv = false;
      },
      loadEcharts(flag){
        
        var mthis = this
        // flag==1--->echarts初始化，mounted时加载
        if(flag === 1){
          
          // var mthis = this
          // this.option = null
        this.option = new Object({
          
          tooltip: {
            trigger: "axis",
            padding:10,
            barBorderRadius:8,
            
            // formatter: function(datas){
            //   var res = datas[0].axisValue + '<br/>',val;
            //   var m = datas[0].dataIndex;
            //   val = '事件:' + mthis.dataBySeries.num[m];
            //   res += val;
            //   return res
            // }
          },
         
          grid: {
            top: "10%",
            right: "4%",
            left: '20px',
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
              barBorderRadius: [3, 3, 3, 3],
              color: "rgba(204,255,255,0.1)"
            },
            // 选中框内样式
            inBrush: {
              color:'#33cc99',
              barBorderRadius:[3,3,3,3]
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
              color: "rgba(204,255,255,0.5)"
            },
            splitLine:{show:false},
            
          },
          dataZoom: [{
              type: "slider",
              start: 10,
              end: 80,
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
            name: "文档",
            type: "bar",
            barGap:"-100%",
            // barWidth:'10px',
            barMaxWidth: '30%',
            barWidth:'10px',
            barMinHeight: '1px',
            barCategoryGap:'50%',
            itemStyle: {
              color:function(param){
                  
                var key = param.dataIndex;
                if(mthis.colorFlag ==0){
                  if(key == mthis.curInt){
                    return '#33cc99'
                  }else{
                    return "#33cc99"
                  }
                }else if(mthis.colorFlag ==1){
                  if(key == mthis.curInt){
                    return '#33cc99'
                  }else{
                    return "rgba(204,255,255,0.1)"
                  }
                }
                
              },
              emphasis: {
                cursor: "pointer",
                barBorderRadius: [3, 3, 3, 3],
                color: '#27866a'},
              cursor: "default",
              barBorderRadius: [3, 3, 3, 3],
              
              
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
                            color:'#33cc99',
                            barBorderRadius:[3,3,3,3],
                            emphasis: {
                              cursor: "pointer",
                              barBorderRadius: [3, 3, 3, 3],
                              color: '#27866a'},
                        },
                        data:[]
                    }
          ],
        
        });
        mthis.charts = echarts.init(document.getElementById(mthis.main1Id), "", {
          width: document.documentElement.clientWidth * mthis.$store.state.split_net - 20 + 'px',
          height: document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        });
        // mthis.timeTitle = '时间轴'
        mthis.option.xAxis.data = mthis.dataBySeries.date;
        mthis.option.series[0].data = mthis.dataBySeries.num;
        mthis.option.series[1].data = mthis.dataBySeries.clickNum;
        
        mthis.charts.setOption(mthis.option)
        this.charts.on('datazoom',function(params){
          // console.log(params)
          if(params.hasOwnProperty('start')){
            mthis.echartsShowStart = params.start
            mthis.echartsShowEnd = params.end
          }else{
            mthis.echartsShowStart = params.batch[0].start
            mthis.echartsShowEnd = params.batch[0].end
          }
          
          
         
        })
        this.charts.on('brushSelected', function(params) {
          var wholeChart = document.getElementById(mthis.timechartdivId);
            wholeChart.onclick = () => false;
          if (params.batch[0].areas[0] !== undefined) {
            var startAndEnd = params.batch[0].areas[0].coordRanges[0];
             mthis.boxdivLeft = params.batch[0].areas[0].range[1] + 20 +'px'
             mthis.isDataZoom = true
             mthis.$store.commit('setContentTimeOnlySel',false)
          }
          // mthis.timeTitle = '请选择节点'
          if (params.batch[0].areas.length === 0) {
            
            if(mthis.isDataZoom){
              
              mthis.timeTitle = '时间轴'
              let cancelTime = []
              
              mthis.sendDocIds.type = 'cancel'
              mthis.sendDocIds.ids = []
              // console.log(mthis.sendDocIds)
              mthis.$store.commit('setContentTimeCondition', mthis.sendDocIds)
              
              mthis.isBrush = []
              mthis.boxSelShowDiv = false
              mthis.isDataZoom = false
              mthis.option.dataZoom[0].start = mthis.echartsShowStart;
              mthis.option.dataZoom[0].end = mthis.echartsShowEnd;
              mthis.option.series[1].data = []
              mthis.colorFlag = 0;
              mthis.charts.setOption(mthis.option)
              
            }
          } else {
            if(startAndEnd[0]<0){
              startAndEnd[0] = 0
            }
            if(startAndEnd[1]<0 || mthis.dataBySeries.date[startAndEnd[1]] === undefined){
              startAndEnd[1] = mthis.dataBySeries.date.length - 1
            }
            mthis.timeTitle = mthis.dataBySeries.date[startAndEnd[0]] + ' 至 ' + mthis.dataBySeries.date[startAndEnd[1]]
            let timeArr = []
            mthis.selIdsArr= []
            mthis.selTimeArr = []
            
            mthis.selTimeArr.push(mthis.dataBySeries.date[startAndEnd[0]])
            mthis.selTimeArr.push(mthis.dataBySeries.date[startAndEnd[1]])
            mthis.selIdsArr.push(startAndEnd[0])
            mthis.selIdsArr.push(startAndEnd[1])
            // selTimeArr.push(mthis.dataBySeries.date[startAndEnd[0]])
            // selTimeArr.push(mthis.dataBySeries.date[startAndEnd[1]])
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[0]])
            timeArr.push(mthis.dataBySeries.date[params.batch[0].selected[0].dataIndex[(params.batch[0].selected[0].dataIndex.length) - 1]])
            
            if(timeArr && mthis.selTimeArr[0] && mthis.selTimeArr[1]){
              mthis.isBrush = timeArr
              mthis.throttle(mthis.query,300,500)()
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
          params.event.event.stopPropagation();
          timeArr.push(params.name)
          timeArr.push(params.name)
        //   mthis.$store.commit('setNetTimeCondition', timeArr)
          mthis.isClick = true;
          mthis.clcikShowDiv = false;
          mthis.boxSelShowDiv = false;
          mthis.isBrush = [];
          mthis.curInt = params.dataIndex;
          mthis.option.dataZoom[0].start = mthis.echartsShowStart;
          mthis.option.dataZoom[0].end = mthis.echartsShowEnd;
          mthis.colorFlag = 1;
          mthis.charts.setOption(mthis.option)
          let docIds = util.getStorage("docIds",params.dataIndex);
          mthis.clickEventIds.ids = docIds
          mthis.sendDocIds.type = 'sel'
          mthis.sendDocIds.ids = docIds
          mthis.$store.commit('setContentTimeCondition',mthis.sendDocIds)
          // console.log(docIds)
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
             mthis.clcikShowDiv = true
             mthis.clickdivLeft = event.clientX + "px"
             mthis.clickdivTop = event.clientY + 'px'
             let docIds = util.getStorage("docIds",params.dataIndex);
             mthis.clickEventIds.ids = docIds
             mthis.sendDocIds.type = 'sel'
             mthis.sendDocIds.ids = docIds
             mthis.$store.commit('setContentTimeCondition',mthis.sendDocIds)
            
          })
          wholeChart.oncontextmenu = function(){
               mthis.boxdivLeft = event.clientX + 20 + "px"
               mthis.boxdivTop = event.clientY + "px"
              
               if(mthis.isBrush.length>0){
                 mthis.boxSelShowDiv = true
               }
               mthis.isBrush = [] 
                
            }
        }else if(flag ==2){
          // flag==2---->监听画布中的文档，显示数据
          mthis.isDataZoom = false
          if(mthis.isBrush){
            mthis.charts.dispatchAction({
              type:'brush',
              areas:[]
            })
          }
          mthis.timeTitle = '时间轴';
          mthis.resize();
          mthis.option.xAxis.data = mthis.dataBySeries.date;
          mthis.option.xAxis.boundaryGap = true;
          // mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[1].data = mthis.dataBySeries.clickNum;
          mthis.colorFlag = 0;
          mthis.charts.setOption(mthis.option)
          
        }else if(flag==3){
          mthis.resize();
          // flag==3--->数据透视点击事件，层叠显示
          mthis.isDataZoom = false
          if(mthis.isBrush){
            mthis.charts.dispatchAction({
              type:'brush',
              areas:[]
            })
          }
          mthis.option.xAxis.data = mthis.dataBySeries.date;
          mthis.option.series[0].data = mthis.dataBySeries.num;
          mthis.option.series[1].data = mthis.dataBySeries.clickNum;
          mthis.colorFlag =1;
          mthis.charts.setOption(mthis.option)
        }else{
          // flag ==4--->网络关系事件节点为空，清空echarts
          mthis.resize();
          mthis.isDataZoom = false
          if(mthis.isBrush){
            mthis.charts.dispatchAction({
              type:'brush',
              areas:[]
            })
          }
          mthis.dataBySeries.num = []
          mthis.dataBySeries.date = []
          mthis.dataBySeries.clickNum= []
          mthis.option.xAxis.data = []
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
        (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 + "px";
        
      /* this.iconPosition = useHeight * 0.8 + "px"; */

      this.pwidth = document.documentElement.clientWidth * this.$store.state.split - 20 + 'px'
      // this.iconPosition = useHeight - 40 + "px";
      this.loadEcharts(1);
      let that = this;
      // Enable data zoom when user click bar.
      var zoomSize = 6;
      // this.changHeightCount++
      window.addEventListener('resize',function(){
        that.resize()
      })
    },
    computed:mapState ([
      'split','splitWidth','tmss','conditionContent','content2time','showDocTime','split_content'
    ]),
    watch: {
      /* tmss: function(){
        var mthis = this;
        if(mthis.tmss == 'geo'){
          mthis.changHeightCount++;
        }
      }, */
      'dataBySeries.date':{
       
        handler:function(newVal,oldVal){
        
          
          this.dataBySeries.clickNum = new Array(newVal.length).fill(null)
          
        }

      },
      content2time:function(){
        var mthis = this;
        if(this.content2time[0].ids.length>0){
          mthis.$http.post(mthis.$store.state.ipConfig.api_event_test_url + "/event-2-time/",{
            "ids":mthis.content2time[0].ids
          }).then(response =>{
              if(response.body.code ==0){
                if(response.body.data.time.length<100){
                          let timeLen = response.body.data.time.length
                          let dayCount = parseInt((100 - response.body.data.time.length) /2)
                          let startT = mthis.getDateStr(response.body.data.time[0],-dayCount);
                          let endT = mthis.getDateStr(response.body.data.time[response.body.data.time.length-1],dayCount);
                          let preDateList = mthis.formatEveryDay(startT,response.body.data.time[0]);
                          let aftDateList = mthis.formatEveryDay(response.body.data.time[response.body.data.time.length-1],endT);
                          preDateList.pop();
                          aftDateList.shift();
                          
                          let conCount = new Array(preDateList.length).fill('null');
                          let conIds = new Array(preDateList.length).fill([]);
                          let localIds = [];
                          mthis.dataBySeries.date= preDateList.concat(response.body.data.time).concat(aftDateList);
                          mthis.dataBySeries.num = conCount.concat(response.body.data.count).concat(conCount);
                          localIds = conIds.concat(response.body.data.ids).concat(conIds);
                          mthis.dataBySeries.clickNum = [];
                          mthis.loadEcharts(2);
                          util.writeStorage("eventIds",localIds)
                          // console.log('<100')
                          // console.log(mthis.dataBySeries.date.length)
                      }else{
                        let dayCount = parseInt(response.body.data.time.length * 0.1)
                       if(dayCount>0){
                          let startT = mthis.getDateStr(response.body.data.time[0],-dayCount);
                       
                          let endT = mthis.getDateStr(response.body.data.time[response.body.data.time.length-1],dayCount);
                          let preDateList = mthis.formatEveryDay(startT,response.body.data.time[0]);
                          let aftDateList = mthis.formatEveryDay(response.body.data.time[response.body.data.time.length-1],endT);
                          preDateList.pop();
                          aftDateList.shift();
                          // console.log(preDateList.length)
                          // console.log(aftDateList)
                          let conCount = new Array(preDateList.length).fill('null');
                          let conIds = new Array(preDateList.length).fill([]);
                          let localIds = [];
                          mthis.dataBySeries.date= preDateList.concat(response.body.data.time).concat(aftDateList);
                          mthis.dataBySeries.num = conCount.concat(response.body.data.count).concat(conCount);
                          localIds = conIds.concat(response.body.data.ids).concat(conIds);
                          mthis.dataBySeries.clickNum = [];
                          mthis.loadEcharts(2);
                          util.writeStorage("docIds",localIds)
                      }else{
                          mthis.dataBySeries.date = response.body.data.time;
                          mthis.dataBySeries.num = response.body.data.count;
                          mthis.dataBySeries.clickNum = [];
                          mthis.loadEcharts(2);
                          util.writeStorage("docIds",response.body.data.ids)
                       }
                      }
               
              }else{
                // console.log('服务器error')
              }
            })
        }
        if(this.content2time[0].ids.length ==0 && mthis.dataBySeries.date.length>0 ){
          mthis.loadEcharts(4);
        }
      },
      // conditionContent: function(keyword) {
        
      //   var mthis = this
      //   this.$http.get(this.$store.state.ipConfig.api_url + '/context-time-count/?keyword='+keyword).then(response => {
      //     if(response.body.code === 0) {
      //       mthis.dataBySeries.num = response.body.data.count
      //       mthis.dataBySeries.date = response.body.data.time
      //       mthis.loadEcharts(2)
      //     }
      //   })
      // },
      split: function(va) {
        
        let width = document.documentElement.clientWidth * va - 20 + 'px'
        let height = document.documentElement.clientHeight * 0.2 - 10 + 20 - 55 + 'px'
        this.charts.resize({
          width,
          height
        })
      },
      split_content:function(va){
        
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
 .clcikShowDiv{
    position: fixed;
    background-color:rgba(0, 0, 0, 0.8);
    border: 1px solid #2a6464;
    cursor:pointer;
    /* top:620px;
    width:60px;
    height:20px;
    text-align: center;
    line-height: 20px;
    background-color:rgba(51,204,153,0.7);
    z-index:999999;
    border-radius: 10px;  */
  }
  
  .trClass:hover{
    color:rgba(93, 240, 240, 1);
  }
</style>