<template>
  <div :style="{fontSize: '18px',height:viewHeight_20}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0',height:viewHeight_30}">
        <Tabs :value=$store.state.tabSelectNet @on-click="changTab">
          <Tab-pane label="选中详情" name='mubiaoxiangqingNet' :style="{fontSize: '18px',height:viewHeight_30,minHeight:viewHeight_30}" id='mubiaoxiangqingNet'>
            <eventNet :resArr='resArr' :eventdata='evetdata' v-show='evetdataFlag'></eventNet>
            <div v-show='!evetdataFlag' :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_select.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择左边节点，查看目标详情</p>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="数据透视" name='toushi' :style="{fontSize: '18px',height:viewHeight_30}" id='toushi'>
            <Spin size="large" v-if="spinShow">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            <left-statics :staticsDatas='staticsDatas' :openPanelNames='openPanelNames' @staticsClick='clickLeftStatics' :rightMenuConf='rightClickConf' @rightCilckArgu='clickRightMenu' v-if=" $store.state.tmss === 'net' && staticsDatas.length > 0"></left-statics>
            <div v-else :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_mulselect.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择两个以上节点，查看数据透视</p>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="分析结果" name='analysisResults' :style="{fontSize: '18px',height:viewHeight_30}" id='analysisResults' v-if='gFlag'>
            <div class="scrollBarAble" :style="{height:eventItemHeight,minHeight:eventItemHeight}">
              <div class='groupStyle' v-if='$store.state.methodType=="community"' v-for='(gitem,index) in groupItems' @click="highLightNodes($event,gitem)">第{{index+1}}社区 ({{gitem.length}}) </div>
              <div class='groupStyle' v-if='$store.state.methodType=="labelprop"' v-for='(gitem,index) in groupItems' @click="highLightNodes($event,gitem)">标签传播{{index+1}} ({{gitem.length}}) </div>
              <div class='groupStyle' v-if='$store.state.methodType=="cc"' v-for='(gitem,index) in groupItems' @click="highLightNodes($event,gitem)">弱连通分量{{index+1}} ({{gitem.length}}) </div>
              <!-- <Collapse simple class='scrollBarAble'>
                <panel class='groupStyle' v-for='(gitem,index) in groupItems' @click="highLightNodes($event,gitem)">
                  <span>第{{index+1}}社区 (共{{gitem.length}}个节点)</span>
                  <div slot="content" class="tableLine" v-for="(ite,ind) in communityData">
                    {{ite}}
                  </div>
                </panel>
              </Collapse> -->
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
  import eventNet from './custom_event_net'
  import communityDiv from './custom_community_div'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  /* eslint-disable */
  var timer = null;
  export default {
    data() {
      return {
        spinShow: false,
        spinShow1: false,
        eDiv: '',
        vh20: 0,
        selectTime: false,
        timer: null,
        // tabSelect: '数据透视',
        tabSelectNetValue: 'mubiaoxiangqingNet',
        modalNodeId: '',
        contentStatisticsdata: {},
        evetdataFlag: false,
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
        staticsDatas: [],
        nodeTypedata: null,
        staticsIds: [],
        single: false,
        resArr: [],
        rightClickConf: [{
            'name': '只选中它',
            'id': 'onlylookit',
            'iconClassName': 'icon-ren'
          },
          {
            'name': '删除',
            'id': 'delete',
            'iconClassName': 'icon-ren'
          }
        ],
        openPanelNames: [],
        gFlag: false,
        groupItems: new Array()
      };
    },
    components: {
      modalChartDetail,
      percentBar,
      leftStatics,
      eventNet,
      communityDiv
    },
    // computed: {
    //   menuitemClasses: function() {
    //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed: mapState(['selectNetNodes', 'singlePerson', 'viewHeight_20', 'dataStatisticsEvent', 'contentStatisticsResult', 'viewHeight_30', 'selectionIdByType', 'groupFlag', 'communityData']),
    watch: {
      // contentStatisticsResult:function(){
      //   var mthis = this;
      //   mthis.contentStatisticsdata = mthis.contentStatisticsResult.data;
      // },
      communityData: function() {
      },
      groupFlag: function() {
        var mthis = this
        mthis.groupItems = new Array()
        mthis.gFlag = mthis.groupFlag
        if (!mthis.groupFlag) {
          // this.tabSelectNetValue = 'mubiaoxiangqingNet';
          mthis.$store.commit("setTabSelectNet", "mubiaoxiangqingNet");
        } else {
          mthis.$store.commit("setTabSelectNet", "analysisResults");
          if (mthis.communityData.fromList.length == mthis.communityData.toList.length && mthis.communityData.fromList.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/community/", {
                from_ids: mthis.communityData.fromList,
                to_ids: mthis.communityData.toList,
                method: mthis.$store.state.methodType,
                num: mthis.communityData.numCount
              })
              .then(response => {
                if (response.body.code === 0) {
                  mthis.groupItems = response.body.data[0].groups
                }
              })
          }
        }
      },
      selectionIdByType: function() {
        var mthis = this;
        mthis.evetdataFlag = false
        if (mthis.selectNetNodes[0].ids.length > 0) {
          // 新增防抖功能
          mthis.evetdata = []
          mthis.timer = setTimeout(function() {
            if (mthis.selectionIdByType.nodeIds.length > 0) {
              let nodeOb = {}
              nodeOb.nodeIds = mthis.selectionIdByType.nodeIds
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
                mthis.evetdata = util.hebing(mthis.evetdata, response.body.data[0].nodes)
                mthis.evetdataFlag = true
              })
            }
            if (mthis.selectionIdByType.eventIds.length > 0) {
              // let nodeIdsArry = mthis.selectNetNodes[0].ids.map(item => {
              //   return item.id;
              // });
              let eventOb = {}
              eventOb.EventIds = mthis.selectionIdByType.eventIds
              // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-info/', eventOb).then(response => {
              //   // mthis.evetdataFlag = true
              //   // mthis.evetdata = response.body.data[0].nodes
              //   util.hebing(mthis.evetdata,response.body.data[0].nodes)
              // })
              // ;
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', eventOb).then(response => {
                // mthis.evetdataFlag = true
                // mthis.evetdata = response.body.data[0].nodes
                for (let i = 0; i < response.body.data.length; i++) {
                  // response.body.data[i].id = response.body.data[i].id
                  // response.body.data[i].entity_type = response.body.data[i].event_type
                  response.body.data[i].entity_type = 'event'
                  response.body.data[i].name = response.body.data[i].event_subtype
                }
                // mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
                mthis.evetdata = util.hebing(mthis.evetdata, response.body.data)
                mthis.evetdataFlag = true
              })
            }
            if (mthis.selectionIdByType.contentIds.ids.length > 0) {
              // let nodeIdsArry = mthis.selectNetNodes[0].ids.map(item => {
              //   return item.id;
              // });
              let docOb = {}
              docOb.docIds = mthis.selectionIdByType.contentIds.ids
              // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-info/', docOb).then(response => {
              //   // mthis.evetdataFlag = true
              //   // mthis.evetdata = response.body.data[0].nodes
              // })
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', docOb).then(response => {
                // mthis.evetdataFlag = true
                // mthis.evetdata = response.body.data[0].nodes
                for (let i = 0; i < response.body.data.length; i++) {
                  response.body.data[i].entity_type = 'document'
                  response.body.data[i].name = response.body.data[i].title
                }
                // mthis.evetdata = util.hebing(mthis.evetdata,response.body.data)
                mthis.evetdata = util.hebing(mthis.evetdata, response.body.data)
                mthis.evetdataFlag = true
              })
            }
          }, 200);
        } else {
          // mthis.$set(mthis.evetdata,0,null)
          mthis.$set(mthis.evetdata, 0, [])
          mthis.evetdata = []
          mthis.evetdataFlag = false
        }
      },
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
        this.tabSelectNetValue = 'mubiaoxiangqingNet'
      },
      selectNetNodes: function() {
        var mthis = this;
        if (mthis.selectNetNodes[0].ids.length > 1) {
          mthis.spinShow = true;
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/graph-attr/', {
            'nodeIds': mthis.selectNetNodes[0].ids,
            'type': 'net'
          }).then(response => {
            mthis.staticsDatas = response.body.data;
            mthis.openPanelNames = [];
            if (!mthis.staticsDatas) {
              return;
            }
            //mthis.staticsdatas = mthis.staticsDatas;
            mthis.staticsDatas.forEach(function(item) {
              item.subStatisticsAttr.forEach(function(Iitem) {
                /* var thirdLevel = Iitem.specificStaticsAttr
                var itemCount = thirdLevel.length;
                var moreItemcount = itemCount>5?itemCount-5:0;
                var morethirdIds = 0;
                if(itemCount>5){
                    for(let i = 5; i < itemCount; i++){
                        var tItem = thirdLevel[i];
                        var count = tItem.count;
                        morethirdIds += count;
                    }
                } */
                mthis.openPanelNames.push(Iitem.secondLevelId);
              })
            })
            mthis.spinShow = false;
            //mthis.$data.staticsDatas.splice(0,0,response.body.data);
            /* response.body.data.forEach(function(item,index){
            mthis.$set(mthis.staticsDatas,index,item)
            }) */
          })
        } else {
          mthis.spinShow = false;
          mthis.staticsDatas = [];
        }
      }
    },
    methods: {
      highLightNodes(mt, nodeIds) {
        this.$store.commit('setNetStaticsSelectedIds', nodeIds);
      },
      clickRightMenu(rightCilckArgu) {
        var mthis = this;
        var buttonId = rightCilckArgu.buttonId;
        var oids = rightCilckArgu.nsIds;
        //var ids = []
        /* for(let i = 0; i < oids.length; i++){
          let id = oids[i];
          let index = id.indexOf('&');
          if(index === -1){
            ids.push('org&'+id)
          } else {
            ids.push(id)
          }
        } */
        var params = {
          'type': '',
          'ids': oids
        }
        if (buttonId === 'onlylookit') {
          mthis.$store.commit('setNetOnlyStaticsSelectedIds', params)
        } else if (buttonId === 'delete') {
          alert('请期待...')
        }
      },
      clickLeftStatics(staticsClick) {
        var mthis = this;
        mthis.$store.commit('setNetStaticsSelectedIds', staticsClick);
      },
      hightLight(id) {},
      changTab(a) {
        this.tabSelectNetValue = a
        this.$store.commit('setTabSelectNet', a)
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
          //mthis.selectNetNodes = response.body.data[0]//.nodes[0]
          //mthis.$store.commit('setSelectNetNodes',response.body.data);
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
  .groupStyle {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    padding: 0 15px;
    cursor: pointer;
    height: 30px;
  }
  #analysisResults .groupStyle:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  #analysisResults .groupStyle:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  #analysisResults .groupStyle:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
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
