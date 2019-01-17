<template>
  <div :style="{fontSize: '18px',height:viewHeight}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0'}">
        <Tabs :value=$store.state.tabSelect>
          <Tab-pane label="数据透视" name='数据透视' :style="{fontSize: '18px',height:viewHeight}" id='toushi' @click="changTab('数据透视')">
            <left-statics :Statisticsdata='dataStatistics' :EntityAttrInformation='EntityAttrInformation' :nodeTypedata='nodeTypedata' :SecondAttrClassify='EntityAttrClassify' :firstClassify='firstClassify' :nodeTypeClassify='nodeTypeClassify' v-if=" $store.state.tmss === 'net' && dataStatistics.length > 0"></left-statics>
          </Tab-pane>
          <Tab-pane label="选中详情" name='选中详情' v-if="$store.state.tmss === 'net'" :style="{fontSize: '18px',height:viewHeight}" id='mubiaoxiangqing' @click="changTab('选中详情')">
            <div>
              <Row type="flex" justify="start" class="code-row-bg" :style="{margin:'0',padding:'0'}" v-show="!singlePerson">
                <!-- 目标详情 -->
                <div :style="{borderBottom:'0px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',width:'100%'}" style="cursor:default" v-show="!selectTime">
                  <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                    <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> 数据实体(<span v-if="selectNetNodes != null&&selectNetNodes[0]!==undefined">{{selectNetNodes[0].ids.length}}</span>)
                    <i class="icon iconfont icon-more" style="float:right"></i>
                  </p>
                </div>
                <div class='scrollBarAble' :style="{width:'100%',height:eventheight,margin:'0px 5px 0 10px',paddingRight:'5px'}">
                  <div class="p-collapse-modal" :style="{width:'100%'}" v-for="data in evetdata" @click="detail(data.id)">{{data.name}}
                    <p class="p-collapse-modal-small">{{data.entity_type}}</p>
                  </div>
                </div>
                <!-- 事件详情 -->
                <div  v-show="!selectTime">

                  这里是事件详情
                </div>
              </Row>
              <Card dis-hover style="width:100%,background-color:rgba(0,0,0,0);" :style="{overflowY:'scroll',height:eventheight}" v-show="singlePerson" v-if="evetdata!== undefined && evetdata!==null">
                <Row type="flex" justify="end">
                  <Icon class="cardIcon icon iconfont icon-fangda process-img DVSL-bar-btn DVSL-bar-btn-back" size="20" @click="detail(evetdata.id)" />
                </Row>
                <div :style="{padding:'0 5px'}">
                  <Row type="flex" justify="center">
                    <span class="infoTitle">{{evetdata.name}}</span>
                  </Row>
                  <Row type="flex" justify="center" :style="{margin:'5px 0 '}">
                    <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px'}" v-if="evetdata.img==''" />
                    <Avatar class="circle-img" v-else :src="evetdata.img" :style="{width:'50px',height:'50px'}" />
                  </Row>
                  <div class='entityDetail'>
                    <entityDetailsTableHuman :Entitydetail="evetdata" v-if="evetdata.entity_type =='human'"></entityDetailsTableHuman>
                    <entityDetailsTableAdministrative :Entitydetail="evetdata" v-if="evetdata.entity_type =='administrative'"></entityDetailsTableAdministrative>
                    <entityDetailsTableOrganization :Entitydetail="evetdata" v-if="evetdata.entity_type =='organization'"></entityDetailsTableOrganization>
                  </div>
                </div>
              </Card>
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
        selectTime: false,
        timer: null,
        tabSelect: '数据透视',
        modalNodeId: '',
        contentStatisticsdata: {},
        statisticsNameList: {
          'entity': '实体',
          'human': '人物',
          'politician': '政治人物',
          'administrative': '管理',
          'organization': '机构',
          'political party': '政党',
          'else': '其他'
        },
        evetdata: null,
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
        firstClassify : [
                {
                    id:'NodeType',
                    disName:'节点类型'
                },
                {
                    id:'EntityAttr',
                    disName:'实体属性'
                }
            ],
        nodeTypeClassify : [
                {
                    id:'human',
                    disName:'人物'
                },
                {
                    id:'organization',
                    disName:'组织'
                },
                {
                    id:'administrative',
                    disName:'国家'
                },
                {
                    id:'event',
                    disName:'事件'
                }
            ],
            EntityAttrClassify:[
                {
                    id:'country_of_citizenship',
                    disName:'国籍'
                },
                {
                    id:'occupation',
                    disName:'职业'
                },
                {
                    id:'address',
                    disName:'地址'
                },
                {
                    id:'member_of_political_party',
                    disName:'政党'
                },
                {
                    id:'religion',
                    disName:'信仰'
                },
                {
                    id:'e-mail',
                    disName:'邮箱'
                }
            ],
            nodeTypedata:{
                code:0,
                data:[
                    {
                        id:'human',
                        count: 1,
                        per: 20,
                        
                    },
                    {
                        id:'organization',
                        count: 3,
                        per: 8,
                        
                    },
                    {
                        id:'administrative',
                        count: 8,
                        per: 90,
                        
                    },
                    {
                        id:'event',
                        count: 1,
                        per: 8,
                        
                    }
                ]
            },
            EntityAttrInformation:{
                code:0,
                data:[
                    {
                        id:'country_of_citizenship',
                        datasCount:4,
                        moredata:{
                            dataItem:1,
                            nodeCount:10
                        },
                        datas:[
                            {
                                name:"中国",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"日本",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            },
                            {
                                name:"美国",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"英国",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            }
                        ]
                    },
                    {
                        id:'occupation',
                        datasCount:3,
                        moredata:{
                            dataItem:1,
                            nodeCount:10
                        },
                        datas:[
                            {
                                name:"军人",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"政治家",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            },
                            {
                                name:"企业家",
                                count: 10,
                                entitylist: [
                                "Q854"
                                ],
                                per: 100,
                            }
                        ]
                    }
                ]
            }
      };
    },
    components: {
      modalChartDetail,
      percentBar,
      leftStatics,
      cTree,
      entityDetailsTableHuman,
      entityDetailsTableAdministrative,
      entityDetailsTableOrganization
    },
    // computed: {
    //   menuitemClasses: function() {
    //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed: mapState(['selectNetNodes', 'singlePerson', 'viewHeight', 'dataStatisticsEvent', 'contentStatisticsResult']),
    watch: {
      // contentStatisticsResult:function(){
      //   var mthis = this;
      //   mthis.contentStatisticsdata = mthis.contentStatisticsResult.data;
      // },
      dataStatisticsEvent: function() {
        var mthis = this;
        mthis.dataStatistics = mthis.EntityAttrInformation.data;
        //mthis.dataStatistics = mthis.dataStatisticsEvent.data;  //这是测试数据，正式数据接通后，应删除EntityAttrInformation变量
      },
      eventheightdiv: function() {
        this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      },
      netTimeCondition: function(va) {
        this.selectTime = true
        this.tabSelect= '选中详情'
      },
      selectNetNodes: function(va) {
        var mthis = this;
        let nodeIdsArry = va[0].ids.map(item => {
          return item.id;
        });
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(function() {
          // 新增防抖功能
          if(mthis.singlePerson){
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/node-datas/', {
              'nodeIds': nodeIdsArry
            }).then(response => {
              console.log(response.body.data[0])
              mthis.evetdata =  response.body.data[0]
            })
          } else {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/node-datas-coarse/', {
              'nodeIds': nodeIdsArry
            }).then(response => {
              mthis.evetdata =  response.body.data[0].nodes
            })
          }

          
        }, 100);
        // let qu = (mthis.singlePerson) ? mthis.selectNetNodes[0].ids[0] : mthis.selectNetNodes[0].ids
        // mthis.evetdata = 
      }
    },
    methods: {
      changTab(a){
        this.$store.commit('setTabSelect', a)
      },
      a() {
        alert(55);
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
        // console.log('detail')
        var mthis = this
        mthis.modalNodeId = id
        let nodeIdsArry = []
        nodeIdsArry.push(id)
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/node-datas/', {
          'nodeIds': nodeIdsArry
        }).then(response => {
          mthis.selectNetNodes = response.body.data[0].nodes[0]
          mthis.detailModalFlag = true
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
      };
      this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
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
</style>
