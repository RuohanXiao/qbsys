<template>
  <div :style="{fontSize: '18px',height:viewHeight_20_geo}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0',height:viewHeight_20_geo}">
        <Tabs :value=$store.state.tabSelectGeo>
          <Tab-pane label="选中详情" name='mubiaoxiangqingGeo' :style="{fontSize: '18px',height:viewHeight_20_geo}" id='mubiaoxiangqingGeo' @click="changTab('mubiaoxiangqingGeo')">
            <eventgeo :resArr='resArr' :eventdata='evetdata' v-show='evetdataFlag'></eventgeo>
            <div v-show='!evetdataFlag' :style="{height:eventItemHeight,minHeight:eventItemHeight,display:'flex',alignItems:'center',justifyContent:'center',flexWrap:'wrap'}">
              <div :style="{display: 'flex',width: '100%',flexWrap:'inherit',justifyContent:'center'}">
                <img src="../../dist/assets/images/need_select.png" :style="{maxWidth:'4vw',width:'auto',height:'auto',maxHeight:'4vh'}" />
                <p class="selectP">请选择左边节点，查看目标详情</p>
              </div>
            </div>
          </Tab-pane>
          <Tab-pane label="数据透视" name='toushi' :style="{fontSize: '18px',height:viewHeight_20_geo}" id='toushi_geo' @click="changTab('toushi')">
            <Spin size="large" v-if="spinShow">
              <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
              <div>Loading</div>
            </Spin>
            <left-statics :staticsDatas='staticsDatas' @staticsClick='clickLeftStatics' :rightMenuConf='rightClickConf' @rightCilckArgu='clickRightMenu' v-if=" $store.state.tmss === 'geo' && staticsDatas.length > 0"></left-statics>
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
  import leftStatics from './custom_leftStatics'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import eventgeo from './custom_event_geo'
  import util from '../../util/tools.js'
  var timer = null;
  export default {
    data() {
      return {
        spinShow: false,
        timer: null,
        tabSelectGeo: 'mubiaoxiangqingGeo',
        modalNodeId: '',
        contentStatisticsdata: {},
        evetdata: [],
        detailModalFlag: false,
        dataStatistics: [],
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
        closable: true,
        staticsDatas: [],
        evetdataFlag: false,
        eventItemHeight: 0,
        saveSelectedIds: [],
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
        ]
      };
    },
    components: {
      modalChartDetail,
      leftStatics,
      eventgeo
    },
    // computed: {
    //   menuitemClasses: function() {
    //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed: mapState(['geo_selected_param', 'geo_onlyselected_param', 'singlePerson', 'viewHeight', 'contentStatisticsResult', 'viewHeight_20_geo', 'clickSelectedGeoIds']),
    watch: {
      clickSelectedGeoIds: function() {
        var mthis = this;
        if (mthis.clickSelectedGeoIds.length > 0) {
          var OrgIds = [];
          var EventIds = [];
          mthis.clickSelectedGeoIds.forEach(function(id) {
            var type = id.split('&')[0];
            var Id = id.split('&')[1];
            if (type === 'event') {
              EventIds.push(Id);
            } else {
              OrgIds.push(Id);
            }
          })
          if (OrgIds.length > 0) {
            var nodeOb = {};
            nodeOb.nodeIds = OrgIds;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
              mthis.evetdata = response.body.data[0].nodes; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
              //mthis.saveSelectedIds = mthis.evetdata;
              mthis.evetdataFlag = true
            })
          }
          if (EventIds.length > 0) {
            var eventeOb = {};
            eventeOb.EventIds = EventIds;
            // debugger;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', eventeOb).then(response => {
              var EventDetail = response.body.data; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
              var eventDs = [];
              for (var i = 0; i < EventDetail.length; i++) {
                var eventD = {};
                eventD.entity_type = 'event';
                eventD.id = EventDetail[i].id;
                eventD.img = mthis.$store.state.ipConfig.xml_url + '/images/event.png';
                eventD.loaded = true;
                // eventD.name = EventDetail[i].event_content;
                // eventD.name = EventDetail[i].event_content?(EventDetail[i].event_content):(EventDetail[i].event_subtype);
                eventD.name = EventDetail[i].event_subtype
                eventDs.push(eventD)
              }
              mthis.evetdata = eventDs;
              //mthis.saveSelectedIds = mthis.evetdata;
              mthis.evetdataFlag = true
            })
          }
        } else {
          mthis.evetdata = mthis.saveSelectedIds;
        }
      },
      eventheightdiv: function() {
        this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      },
      geo_onlyselected_param: function() {
        // debugger;
        var mthis = this;
        var OrgIds = [];
        var EventIds = [];
        mthis.geo_onlyselected_param.forEach(function(id) {
          var index = id.indexOf('&');
          if (index === -1) {
            OrgIds.push(id);
          } else {
            var type = id.split('&')[0];
            var Id = id.split('&')[1];
            if (type === 'org') {
              OrgIds.push(Id);
            } else {
              EventIds.push(Id);
            }
          }
        })
        if (mthis.geo_onlyselected_param.length > 0) {
          if (OrgIds.length > 0) {
            var nodeOb = {};
            nodeOb.nodeIds = OrgIds;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
              mthis.evetdata = response.body.data[0].nodes; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
              mthis.saveSelectedIds = mthis.evetdata;
              mthis.evetdataFlag = true
            })
          }
          if (EventIds.length > 0) {
            var eventeOb = {};
            eventeOb.EventIds = EventIds;
            // debugger;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', eventeOb).then(response => {
              var EventDetail = response.body.data; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
              var eventDs = [];
              for (var i = 0; i < EventDetail.length; i++) {
                var eventD = {};
                eventD.entity_type = 'event';
                eventD.id = EventDetail[i].id;
                eventD.img = mthis.$store.state.ipConfig.xml_url + '/images/event.png';
                eventD.loaded = true;
                // eventD.name = EventDetail[i].event_content;
                // eventD.name = EventDetail[i].event_content?(EventDetail[i].event_content):(EventDetail[i].event_subtype);
                eventD.name = EventDetail[i].event_subtype
                eventDs.push(eventD)
              }
              mthis.evetdata = eventDs;
              mthis.saveSelectedIds = mthis.evetdata;
              mthis.evetdataFlag = true
            })
          }
        } else {
          mthis.evetdata = [];
          mthis.evetdataFlag = false;
        }
        if (mthis.geo_onlyselected_param.length > 1) {
          var nodeIds = [];
          for (let i = 0; i < OrgIds.length; i++) {
            nodeIds.push(OrgIds[i])
          }
          for (let i = 0; i < EventIds.length; i++) {
            nodeIds.push(EventIds[i])
          }
          //mthis.waiting()
          mthis.spinShow = true;
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/graph-attr/', {
            'nodeIds': nodeIds,
            'type': 'geo'
          }).then(response => {
            mthis.staticsDatas = response.body.data;
            mthis.spinShow = false;
          })
        } else {
          mthis.staticsDatas = [];
          mthis.spinShow = false;
        }
      },
      /* geo_selected_param: function() {
        // debugger;
        var mthis = this;
        var OrgIds = [];
        var EventIds = [];
        mthis.geo_selected_param.paramIds.forEach(function(id) {
          var type = id.split('&')[0];
          var Id = id.split('&')[1];
          if (type === 'event') {
            EventIds.push(Id);
          } else {
            OrgIds.push(Id);
          }
        })
        if (mthis.geo_selected_param.type !== 'GeoStatics') {
          if (mthis.geo_selected_param.paramIds.length > 0) {
            if (OrgIds.length > 0) {
              var nodeOb = {};
              nodeOb.nodeIds = OrgIds;
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', nodeOb).then(response => {
                mthis.evetdata = response.body.data[0].nodes; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
                mthis.saveSelectedIds = mthis.evetdata;
                mthis.evetdataFlag = true
              })
            }
            if (EventIds.length > 0) {
              var eventeOb = {};
              eventeOb.EventIds = EventIds;
              // debugger;
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', eventeOb).then(response => {
                var EventDetail = response.body.data; //util.hebing(mthis.evetdata,response.body.data[0].nodes)
                var eventDs = [];
                for (var i = 0; i < EventDetail.length; i++) {
                  var eventD = {};
                  eventD.entity_type = 'event';
                  eventD.id = EventDetail[i].id;
                  eventD.img = mthis.$store.state.ipConfig.xml_url + '/images/event.png';
                  eventD.loaded = true;
                  // eventD.name = EventDetail[i].event_content?(EventDetail[i].event_content):(EventDetail[i].event_subtype);
                  eventD.name = EventDetail[i].event_subtype
                  eventDs.push(eventD)
                }
                mthis.evetdata = eventDs;
                mthis.saveSelectedIds = mthis.evetdata;
                mthis.evetdataFlag = true
              })
            }
          } else {
            mthis.evetdata = [];
            mthis.evetdataFlag = false;
          }
          if (mthis.geo_selected_param.paramIds.length > 1) {
            var nodeIds = [];
            for (let i = 0; i < OrgIds.length; i++) {
              nodeIds.push(OrgIds[i])
            }
            for (let i = 0; i < EventIds.length; i++) {
              nodeIds.push(EventIds[i])
            }
            //mthis.waiting()
            mthis.spinShow = true;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/graph-attr/', {
              'nodeIds': nodeIds,
              'type': 'geo'
            }).then(response => {
              mthis.staticsDatas = response.body.data;
              mthis.spinShow = false;
              //mthis.hide();
            })
          } else {
            mthis.staticsDatas = [];
            mthis.spinShow = false;
          }
        } else {
          return;
        }
      } */
    },
    methods: {
      waiting() {
        var mthis = this;
        mthis.hide();
        var procbg = document.createElement("div"); //首先创建一个div    
        procbg.setAttribute("id", "WaitCover"); //定义该div的id    
        procbg.style.background = "#000000";
        procbg.style.width = "100%";
        procbg.style.height = "100%";
        //procbg.style.position = "fixed";    
        procbg.style.top = "0";
        procbg.style.left = "0";
        procbg.style.zIndex = "500000";
        procbg.style.opacity = "0.6";
        procbg.style.cursor = 'wait';
        procbg.style.filter = "Alpha(opacity=70)";
        var toushi = document.getElementById('toushi_geo');
        toushi.appendChild(procbg);
      },
      //取消遮罩    
      hide() {
        var mybg = document.getElementById("WaitCover");
        if (mybg) {
          var toushi = document.getElementById("toushi");
          toushi.removeChild(mybg)
        }
      },
      clickRightMenu(rightCilckArgu) {
        var mthis = this;
        var buttonId = rightCilckArgu.buttonId;
        var oids = rightCilckArgu.nsIds;
        var ids = []
        for (let i = 0; i < oids.length; i++) {
          let id = oids[i];
          let index = id.indexOf('&');
          if (index === -1) {
            ids.push('org&' + id)
          } else {
            ids.push(id)
          }
        }
        if (buttonId === 'onlylookit') {
          mthis.$store.commit('setGeoStaticsOnlyLookSelectedIds', ids)
        } else if (buttonId === 'delete') {
          alert('delete')
        }
      },
      clickLeftStatics(staticsClick) {
        var mthis = this;
        mthis.$store.commit('setGeoStaticsSelectedIds', staticsClick)
      },
      changTab(a) {
        alert(a)
        this.$store.commit('setTabSelectGeo', a)
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
      /* detail(id) {
        var mthis = this
        mthis.modalNodeId = id
        let nodeIdsArry = []
        nodeIdsArry.push(id)
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
          'nodeIds': nodeIdsArry
        }).then(response => {
          mthis.selectNetNodes = response.body.data[0].nodes[0]
          mthis.detailModalFlag = true
        })
        //查询详细信息
      } */
    },
    mounted() {
      var mthis = this;
      window.onresize = function() {
        this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
        this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
        this.eventItemHeight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16 - 40) + "px";
      };
      this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
      this.eventItemHeight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16 - 40) + "px";
      this.eheight = this.eventheightdiv - 32 - 16 + 'px'
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
    font-size: 18px;
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
  .ivu-spin {
    color: #2d8cf0;
    vertical-align: middle;
    text-align: center;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .demo-spin-icon-load {
    animation: ani-demo-spin 1s linear infinite;
  }
</style>
