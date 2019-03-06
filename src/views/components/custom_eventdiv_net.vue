<template>
  <div :style="{fontSize: '18px',height:viewHeight_20}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0',height:viewHeight_30}">
        <Tabs :value=$store.state.tabSelect>
          <Tab-pane label="选中详情" name='mubiaoxiangqing' v-if="$store.state.tmss === 'net'" :style="{fontSize: '18px',height:viewHeight_30,minHeight:viewHeight_30}" id='mubiaoxiangqing' @click="changTab('mubiaoxiangqing')">
            <eventNet :resArr='resArr' :evetdata='evetdata' v-show='evetdataFlag'></eventNet>
            <div v-show='!evetdataFlag' :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_select.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择左边节点，查看目标详情</p>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="数据透视" name='toushi' :style="{fontSize: '18px',height:viewHeight_30}" id='toushi' @click="changTab('toushi')">
            <left-statics :staticsIds='staticsIds' :nodeTypedata='nodeTypedata' :SecondAttrClassify='EntityAttrClassify' :firstClassify='firstClassify' :nodeTypeClassify='nodeTypeClassify' v-if=" $store.state.tmss === 'net' && nodeTypedata !== null"></left-statics>
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
  import modalChartDetail from './custom_modal_detail'
  import percentBar from './custom_percentBar'
  import leftStatics from './custom_leftStatics'
  import eventNet from './custom_event_net'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import cTree from './custom_tree'
  import entityDetailsTableHuman from './custom_entityDetailsTable_human'
  import entityDetailsTableAdministrative from './custom_entityDetailsTable_administrative'
  import entityDetailsTableOrganization from './custom_entityDetailsTable_organization'
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
        tabSelect: 'mubiaoxiangqing',
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
        firstClassify: [{
            id: 'NodeType',
            disName: '节点类型'
          },
          {
            id: 'EntityAttr',
            disName: '实体属性'
          }
        ],
        nodeTypeClassify: [{
            id: 'human',
            disName: '人物'
          },
          {
            id: 'organization',
            disName: '组织'
          },
          {
            id: 'administrative',
            disName: '国家'
          },
          {
            id: 'event',
            disName: '事件'
          }
        ],
        EntityAttrClassify: {
          "human": [{
              id: 'out__country_of_citizenship_names',
              disName: '国籍'
            },
            {
              id: 'out__occupation_names',
              disName: '职业'
            },
            {
              id: 'address',
              disName: '地址'
            },
            {
              id: 'out__member_of_political_party_names',
              disName: '政党'
            },
            {
              id: 'religion',
              disName: '信仰'
            },
            {
              id: 'e-mail',
              disName: '邮箱'
            }
          ],
          "organization": [{
              id: 'headquarters_location',
              disName: '总部'
            },
            {
              id: 'founded_by',
              disName: '创办者'
            },
            {
              id: 'chairperson',
              disName: '领袖'
            },
            {
              id: 'chief_executive_officer',
              disName: '首席执行官'
            },
            {
              id: 'political_ideology',
              disName: '意识形态'
            }
          ],
          "administrative": [{
              id: 'capital',
              disName: '首都'
            },
            {
              id: 'head_of_state',
              disName: '国家元首'
            },
            {
              id: 'head_of_government',
              disName: '政府首脑'
            },
            {
              id: 'continent',
              disName: '所属洲'
            },
            {
              id: 'gini_coefficient',
              disName: '基尼指数'
            },
            {
              id: 'human_development_index',
              disName: '人类发展指数'
            },
            {
              id: 'top-level_Internet_domain',
              disName: '顶级域名'
            }
          ],
        },
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
      cTree,
      entityDetailsTableHuman,
      entityDetailsTableAdministrative,
      entityDetailsTableOrganization,
      eventNet
    },
    // computed: {
    //   menuitemClasses: function() {
    //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed: mapState(['selectNetNodes', 'singlePerson', 'viewHeight_20', 'dataStatisticsEvent', 'contentStatisticsResult', 'viewHeight_30', 'selectionIdByType']),
    watch: {
      // contentStatisticsResult:function(){
      //   var mthis = this;
      //   mthis.contentStatisticsdata = mthis.contentStatisticsResult.data;
      // },
      selectionIdByType: function() {
        console.log(this.selectionIdByType)
        var mthis = this;
        if (mthis.selectNetNodes[0].ids.length > 0) {
          // 新增防抖功能
          this.timer = setTimeout(function() {
            if (mthis.selectionIdByType.nodeIds.length > 0) {
              let nodeOb = {}
              nodeOb.nodeIds = mthis.selectionIdByType.nodeIds
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
                mthis.evetdataFlag = true
                mthis.evetdata = response.body.data[0].nodes
              })
            }
            // if (mthis.selectionIdByType.nodeIds.length == 0) {
            //   let nodeIdsArry = new Array(mthis.selectNetNodes[0].ids[0]);
            //   let ar = nodeIdsArry.map(item=>{
            //     return item.id
            //   })
            //     mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/',{nodeIds:ar}).then(response => {
            //       mthis.evetdataFlag = true
            //       mthis.$set(mthis.evetdata,0,response.body.data[0])
            //   })
            // }
            if (mthis.selectionIdByType.eventIds.length > 0) {
              // let nodeIdsArry = mthis.selectNetNodes[0].ids.map(item => {
              //   return item.id;
              // });
              let eventOb = {}
              eventOb.EventIds = mthis.selectionIdByType.eventIds
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-info/', eventOb).then(response => {
                // mthis.evetdataFlag = true
                // mthis.evetdata = response.body.data[0].nodes
              })
            }
            // if (mthis.selectionIdByType.eventIds.length == 0) {
            //   let nodeIdsArry = new Array(mthis.selectNetNodes[0].ids[0]);
            //   let ar = nodeIdsArry.map(item=>{
            //     return item.id
            //   })
            //     mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/',{nodeIds:ar}).then(response => {
            //       mthis.evetdataFlag = true
            //       mthis.$set(mthis.evetdata,0,response.body.data[0])
            //   })
            // } 
            if (mthis.selectionIdByType.contentIds.length > 0) {
              // let nodeIdsArry = mthis.selectNetNodes[0].ids.map(item => {
              //   return item.id;
              // });
              let docOb = {}
              docOb.docIds = mthis.selectionIdByType.contentIds
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-info/', docOb).then(response => {
                // mthis.evetdataFlag = true
                // mthis.evetdata = response.body.data[0].nodes
              })
            }
            // if (mthis.selectionIdByType.contentIds.length == 0) {
            //   let nodeIdsArry = new Array(mthis.selectNetNodes[0].ids[0]);
            //   let ar = nodeIdsArry.map(item=>{
            //     return item.id
            //   })
            //     mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/',{nodeIds:ar}).then(response => {
            //       mthis.evetdataFlag = true
            //       mthis.$set(mthis.evetdata,0,response.body.data[0])
            //   })
            // }
          }, 200);
        } else {
          // mthis.$set(mthis.evetdata,0,null)
          mthis.evetdata =  []
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
        this.tabSelect = 'mubiaoxiangqing'
      },
      selectNetNodes: function() {
        // var mthis = this;
        // if (mthis.selectNetNodes[0].ids.length > 0) {
        //   // 新增防抖功能
        //   this.timer = setTimeout(function() {
        //     if (mthis.selectNetNodes[0].ids.length > 1) {
        //       let nodeIdsArry = mthis.selectNetNodes[0].ids.map(item => {
        //         return item.id;
        //       });
        //       let ob = {}
        //       ob.nodeIds = nodeIdsArry

        //       mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', ob).then(response => {
        //         mthis.evetdataFlag = true
        //         mthis.evetdata = response.body.data[0].nodes
        //       })
        //     } else {
        //       let nodeIdsArry = new Array(mthis.selectNetNodes[0].ids[0]);
        //       let ar = nodeIdsArry.map(item=>{
        //         return item.id
        //       })
        //       // setTimeout(function() {
        //         mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/',{nodeIds:ar}).then(response => {
        //           // mthis.evetdata =  new Array(response.body.data[0])
        //           mthis.evetdataFlag = true
        //           mthis.$set(mthis.evetdata,0,response.body.data[0])
        //       })
        //       // }, 50);
        //     }
        //   }, 200);
        // } else {
        //   // mthis.$set(mthis.evetdata,0,null)
        //   mthis.evetdata =  []
        //   mthis.evetdataFlag = false
        // }
      }
    },
    methods: {
      hightLight(id) {},
      changTab(a) {
        this.$store.commit('setTabSelect', a)
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
