<template>
  <div :style="{fontSize: '18px',height:viewHeight_20}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0',height:viewHeight_30}">
        <Tabs :value=$store.state.tabSelectContent>
          <Tab-pane label="选中详情" name='mubiaoxiangqingContent' :style="{fontSize: '18px',height:viewHeight_30,minHeight:viewHeight_30}" id='mubiaoxiangqingContent' @click="changTab('mubiaoxiangqingContent')">
            <eventContent :resArr='resArr' :eventdata='evetdata' v-show='evetdataFlag'></eventContent>
            <div v-show='!evetdataFlag' :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_select.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择左边节点，查看目标详情</p>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="数据透视" name='toushi' :style="{fontSize: '18px',height:viewHeight_30}" id='toushi' @click="changTab('toushi')">
            <left-statics :staticsDatas='staticsDatas' @staticsClick='clickLeftStatics' v-if=" $store.state.tmss === 'content' && staticsDatas.length > 0"></left-statics>
            <div v-else :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_mulselect.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择两个以上节点，查看数据透视</p>
              </div>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
      <modal-chart-detail :nodeId='modalNodeId' :flag='detailModalFlag' @detailModalFlag='setFlagToFalse'></modal-chart-detail>
    </div>
    </Col>
  </div>
</template>
<script>
  import util from '../../util/tools.js'
  import modalChartDetail from './custom_modal_detail'
  import percentBar from './custom_percentBar'
  import leftStatics from './custom_leftStatics'
  import eventContent from './custom_event_content'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  /* eslint-disable */
  var timer = null;
  export default {
    data() {
      return {
        eDiv: '',
        vh20: 0,
        selectTime: false,
        timer: null,
        // tabSelect: '数据透视',
        tabSelectNet: 'mubiaoxiangqingContent',
        modalNodeId: '',
        contentStatisticsdata: {},
        evetdataFlag:false,
        statisticsNameList: {
          'entity': '实体',
          'human': '人物',
          'politician': '政治人物',
          'administrative': '管理',
          'organization': '机构',
          'political party': '政党',
          'else': '其他'
        },
        evetdata: [],
        detailModalFlag: false,
        //dataStatistics: [],
        value4: '1-1',
        myList: [{
          name: 'aaaaa',
          img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.webp',
          url: 'www.baidu.com'
        }],
        colorMap: [
          '#33cc99',
          '#33cccc',
          '#3399ff'
        ],
        detail_data: null,
        show: [],
        value3: '1',
        value4: '1-1',
        eheight: 0,
        eventheightdiv: 0,
        eventheight: 0,
        eventItemHeight: 0,
        closable: true,
        staticsDatas:[],
        nodeTypedata: null,
        staticsIds: [],
        single: false,
        resArr: []
      };
    },
    components: {
      modalChartDetail,
      percentBar,
      leftStatics,
      eventContent
    },
    // computed: {
    //   menuitemClasses: function() {
    //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed: mapState(['selectContentNodes', 'singlePerson', 'viewHeight_20', 'dataStatisticsEvent', 'contentStatisticsResult', 'viewHeight_30', 'selectionIdByType']),
    watch: {
      // selectionIdByType: function() {
      //   // // console.log(this.selectionIdByType)
      //   var mthis = this;
      //   mthis.evetdataFlag = false
      //   if (mthis.selectContentNodes[0].ids.length > 0) {
      //     // 新增防抖功能
      //     mthis.evetdata = []
      //     mthis.timer = setTimeout(function() {
      //       if (mthis.selectionIdByType.nodeIds.length > 0) {
      //         let nodeOb = {}
      //         nodeOb.nodeIds = mthis.selectionIdByType.nodeIds
      //         mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
      //           // mthis.evetdata = response.body.data[0].nodes
      //           mthis.evetdata = util.hebing(mthis.evetdata,response.body.data[0].nodes)
      //           mthis.evetdataFlag = true
      //           // mthis.evetdata = util.hebing(mthis.evetdata,response.body.data[0].nodes)
      //           // mthis.$set(mthis.evetdata,0,response.body.data[0].nodes)
      //         })
      //       }
      //       if (mthis.selectionIdByType.eventIds.length > 0) {
      //         // let nodeIdsArry = mthis.selectContentNodes[0].ids.map(item => {
      //         //   return item.id;
      //         // });
      //         let eventOb = {}
      //         eventOb.EventIds = mthis.selectionIdByType.eventIds
      //         // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-info/', eventOb).then(response => {
      //         //   // mthis.evetdataFlag = true
      //         //   // mthis.evetdata = response.body.data[0].nodes
      //         //   util.hebing(mthis.evetdata,response.body.data[0].nodes)
      //         // })
      //         mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', eventOb).then(response => {
      //           // mthis.evetdataFlag = true
      //           // mthis.evetdata = response.body.data[0].nodes
      //           for(let i = 0; i < response.body.data.length;i++){
      //             response.body.data[i].id = response.body.data[i].doc_id
      //             // response.body.data[i].entity_type = response.body.data[i].event_type
      //             response.body.data[i].entity_type = 'event'
      //             response.body.data[i].name = response.body.data[i].event_subtype
      //           }
      //           // // console.log(util.hebing(mthis.evetdata,response.body.data))
      //           // mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
      //           mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
      //           mthis.evetdataFlag = true
      //         })
      //       }
      //       if (mthis.selectionIdByType.contentIds.length > 0) {
      //         // let nodeIdsArry = mthis.selectContentNodes[0].ids.map(item => {
      //         //   return item.id;
      //         // });
      //         let docOb = {}
      //         docOb.docIds = mthis.selectionIdByType.contentIds
      //         // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-info/', docOb).then(response => {
      //         //   // mthis.evetdataFlag = true
      //         //   // mthis.evetdata = response.body.data[0].nodes
      //         // })
      //          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', docOb).then(response => {
      //           // mthis.evetdataFlag = true
      //           // mthis.evetdata = response.body.data[0].nodes
      //           for(let i = 0; i < response.body.data.length;i++){
      //             response.body.data[i].entity_type = 'document'
      //             response.body.data[i].name = response.body.data[i].title
      //           }
      //           // mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
      //           // // console.log(util.hebing(mthis.evetdata,response.body.data))
      //           mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
      //           mthis.evetdataFlag = true
      //         })
      //       }
      //     }, 200);
      //   } else {
      //     // mthis.$set(mthis.evetdata,0,null)
      //     mthis.$set(mthis.evetdata,0,[])
      //     mthis.evetdata =  []
      //     mthis.evetdataFlag = false
      //   }
      // },
      singlePerson: function() {
        this.single = this.singlePerson
      },
      dataStatisticsEvent: function() {
        var mthis = this;
        mthis.staticsIds = mthis.$store.state.StaticsIds;
        mthis.nodeTypedata = mthis.$store.state.dataStatisticsEvent
        //mthis.dataStatistics = mthis.EntityAttrInformation.data;
        //mthis.dataStatistics = mthis.dataStatisticsEvent.data;  //这是测试数据，正式数据接通后，应删除EntityAttrInformation变量
      },
      eventheightdiv: function() {
        this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      },
      netTimeCondition: function(va) {
        this.selectTime = true
        this.tabSelectNet = 'mubiaoxiangqingContent'
      },

      
      // selectContentNodes: function() {
      //   var mthis = this;
      //   if(mthis.selectContentNodes[0].ids.length > 0 ){
      //     console.log(mthis.selectContentNodes)
      //     mthis.evetdata = mthis.selectContentNodes[0].ids
      //   }
      //   if(mthis.selectContentNodes[0].ids.length > 1){
      //     //调用统计接口
      //     mthis.$http.post('http://10.60.1.140:5100/graph-attr/', {
      //     'nodeIds': mthis.selectContentNodes[0].ids
      //     }).then(response => {
      //         mthis.staticsDatas = response.body.data;
      //     })
      //     // 调用详情接口
      //     mthis.$http.post('http://10.60.1.140:5100/graph-attr/', {
      //     'nodeIds': mthis.selectContentNodes[0].ids
      //     }).then(response => {
      //       mthis.staticsDatas = response.body.data;
      //     })
      //   } else {
      //     mthis.staticsDatas = [];
      //   }
          
      // }
      selectContentNodes: function() {
        var mthis = this;
        mthis.evetdataFlag = false
        if (mthis.selectContentNodes[0].ids.length > 0) {
          // 新增防抖功能
          mthis.evetdata = []
          mthis.timer = setTimeout(function() {
              let docOb = {}
              docOb.docIds = mthis.selectContentNodes[0].ids
               mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', docOb).then(response => {
                for(let i = 0; i < response.body.data.length;i++){
                  response.body.data[i].entity_type = 'document'
                  response.body.data[i].name = response.body.data[i].title
                }
                mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
                mthis.evetdataFlag = true
              })
          }, 200);
        } else {
          // mthis.$set(mthis.evetdata,0,null)
          mthis.$set(mthis.evetdata,0,[])
          mthis.evetdata =  []
          mthis.evetdataFlag = false
        }
      }
    },
    methods: {
      clickLeftStatics(staticsClick){
        var mthis = this;
        // // console.log(staticsClick)
        mthis.$store.commit('setContentStaticsSelectedIds',staticsClick);
      },
      hightLight(id) {},
      changTab(a) {
        // alert(a)
        this.$store.commit('setTabSelectContent', a)
      },
      setFlagToFalse(detailModalFlag) {
        var mthis = this;
        mthis.detailModalFlag = detailModalFlag;
      },
      changeLimit() {
        // function getArrayItems(arr, num) {
        //     const temp_array = [];
        //     for (let index in arr) {
        //         temp_array.push(arr[index]);
        //     }
        //     const return_array = [];
        //     for (let i = 0; i<num; i++) {
        //         if (temp_array.length>0) {
        //             const arrIndex = Math.floor(Math.random()*temp_array.length);
        //             return_array[i] = temp_array[arrIndex];
        //             temp_array.splice(arrIndex, 1);
        //         } else {
        //             break;
        //         }
        //     }
        //     return return_array;
        return this.myList
        // }
        // this.randomMovieList = getArrayItems(this.myList, 5);
      },
      look() {
        // let mthis = this
        // mthis.singlePerson = false
      },
      detail(id) {
        var mthis = this
        mthis.modalNodeId = id
        mthis.detailModalFlag = true
        let nodeIdsArry = []
        nodeIdsArry.push(id)
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
          'nodeIds': nodeIdsArry
        }).then(response => {
          //mthis.selectContentNodes = response.body.data[0]//.nodes[0]
          //mthis.$store.commit('setSelectContentNodes',response.body.data);
          // mthis.detailModalFlag = true
        })
        //查询详细信息
      }
    },
    // props: ['dataExpand', 'singlePerson', 'eventheightdiv', 'dataStatisticsEvent'],
    mounted() {
      var mthis = this;
      window.onresize = function() {
        this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
        this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
        this.eventItemHeight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16 - 40) + "px";
        this.vh20 = document.documentElement.clientHeight - 65 - 20 + 'px';
      };
      this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      this.eventItemHeight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16 - 40) + "px";
      this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
      this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      this.vh20 = document.documentElement.clientHeight - 65 - 20 + 'px';
      this.changeLimit()
    }
  };
</script>
<style scoped>
  .ivu-card {
    background-color: rgba(0, 0, 0, 0) !important;
    background: rgba(0, 0, 0, 0) !important;
  }
  .infoTitle {
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    margin-bottom: 10px;
  }
  .ivu-tabs-nav {
    background-color: rgba(0, 0, 0, 0) !important;
  }
</style>

<style>
  #tab1 .ivu-tabs-nav-wrap {
    overflow: hidden;
    margin-bottom: 0px;
    border-bottom: 1px solid #447272;
    background-color: rgba(51, 255, 255, 0.1);
  }
  #tab1 .ivu-tabs-nav .ivu-tabs-tab {
    margin-right: 0px;
    border-right: 1px solid #447272;
    font-family: 'Microsoft Yahei';
  }
  #tab1 .ivu-tabs-ink-bar {
    bottom: 0px;
    height: 0px;
    background-color: rgba(51, 255, 255, 0.2)
  }
  #tab1 .ivu-tabs-tab-focused {
    border-color: #57a3f3 !important;
    background-color: rgba(51, 255, 255, 0.2);
  }
  #tab1 .ivu-tabs-tab {
    border-color: #447272 !important;
    color: #ccffff !important;
  }
  .entityDetail>.organization_detailTable tr {
    border-bottom: none !important;
  }
  .entityDetail>.administrative_detailTable tr {
    border-bottom: none !important;
  }
  .entityDetail>.human_detailTable tr {
    border-bottom: none !important;
  }
  #toushi>.toushiItems>.ivu-collapse-item>.ivu-collapse-content>.ivu-collapse-content-box>div>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i {
    margin-left: 10px
  }
  .content_header {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .content_value {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow: ellipsis;
  }
  .ivu-card-body>.ivu-row-flex-end {
    float: right;
  }
  .ivu-avatar>* {
    line-height: 50px !important;
    width: 50px !important;
  }
  .ivu-card-head {
    border-bottom-width: 0 !important;
  }
  .ivu-card-body {
    margin: 10px !important;
  }
  .pfront {
    width: 36px;
    height: 17px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .infoKey {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
    /* min-width: 30px; */
    padding-left: 10px;
  }
  .infoValue {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    /* min-width: 200px; */
    padding-right: 20px;
  }
  .infoName {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .infoTitle {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .cardIcon {
    float: right !important;
  }
  /* 环内文字 */
  .demo-Circle-inner {
    font-family: PARaDOS !important;
    font-size: 14px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    line-height: 20px !important;
    letter-spacing: 0px !important;
    color: #ccffff !important;
    opacity: 0.5;
  }
  .circle-img {
    border-radius: 50% !important;
  }
  .ivu-collapse {
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
    color: #cff !important;
  }
  .ivu-collapse-header span {
    font-size: 14px !important;
  }
  .ivu-collapse-content-box>.ivu-collapse {
    margin: 5px 0 !important;
  }
  #toushi>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-content,
  .toushiItems,
  .toushiItems>.ivu-collapse-item-active>.ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0) !important;
    /* border-bottom: 1px solid rgba(51,255,255,0.5) !important; */
  }
  #toushi>.ivu-collapse,
  .toushiItems>.ivu-collapse {
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
  }
  .collapse_bg {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  #toushi .ivu-collapse-content-box p {
    font-size: 12px !important;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .ivu-collapse-item-active>.ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .ivu-collapse>.ivu-collapse-item {
    border: none !important;
  }
  .ivu-collapse-item {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  #toushi {
    /* overflow-y: scroll; */
    overflow-y: auto;
  }
  .selectP {
    width: 100%;
    text-align: center;
    height: 17px;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 32px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
</style>
