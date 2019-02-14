<template>
  <div :style="{fontSize: '18px',height:viewHeight}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0'}">
        <Tabs :value=$store.state.tabSelect>
          <Tab-pane label="数据透视" name= '数据透视' :style="{fontSize: '18px',height:viewHeight}" id='toushi'>
            <left-statics :staticsIds='staticsIds' :nodeTypedata='nodeTypedata' :SecondAttrClassify='EntityAttrClassify' :firstClassify='firstClassify' :nodeTypeClassify='nodeTypeClassify' v-if=" $store.state.tmss === 'geo' && nodeTypedata !== null"></left-statics>
          </Tab-pane>
          <Tab-pane label="目标详情" name= '目标详情'  :style="{fontSize: '18px',height:viewHeight}" id='mubiaoxiangqing'>
            <div>
              <Row type="flex" justify="start" class="code-row-bg" :style="{margin:'0',padding:'0'}" v-show="!singlePerson">
                <div :style="{borderBottom:'0px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',width:'100%'}" style="cursor:default">
                  <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                    <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> 数据实体(<span v-if="selectNetNodes != null&&selectNetNodes[0]!==undefined">{{selectNetNodes[0].ids.length}}</span>)
                    <i class="icon iconfont icon-more" style="float:right"></i>
                  </p>
                </div>
                <div class='scrollBarAble' :style="{width:'100%',height:eventheight,margin:'0px 5px 0 10px',paddingRight:'5px'}">
                <div class="p-collapse-modal" :style="{width:'100%'}" v-for="data in evetdata" @click="detail(data.id)">{{data.name}}
                  <p class="p-collapse-modal-small">{{data.type}}</p>
                </div>
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
                    <entityDetailsTableHuman :Entitydetail="evetdata" v-if="evetdata.type =='human'" ></entityDetailsTableHuman>
                    <entityDetailsTableAdministrative :Entitydetail="evetdata" v-if="evetdata.type =='administrative'"></entityDetailsTableAdministrative>
                    <entityDetailsTableOrganization :Entitydetail="evetdata" v-if="evetdata.type =='organization'"></entityDetailsTableOrganization>
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
  import leftStatics from './custom_leftStatics'
  import { mapState,mapMutations } from 'vuex'
  import entityDetailsTableHuman from './custom_entityDetailsTable_human'
  import entityDetailsTableAdministrative from './custom_entityDetailsTable_administrative'
  import entityDetailsTableOrganization from './custom_entityDetailsTable_organization'
  /* eslint-disable */
  var timer = null;
  export default {
    data() {
      return {
        timer:null,
        tabSelect:'数据透视',
        modalNodeId: '',
        contentStatisticsdata:{},
        statisticsNameList:{
          'entity':'实体',
          'human':'人物',
          'politician':'政治人物',
          'administrative':'管理',
          'organization':'机构',
          'political party':'政党',
          'else':'其他'
        },
        evetdata: null,
        detailModalFlag: false,
        dataStatistics:[],
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
                    id:'event',
                    disName:'事件'
                },
                {
                    id:'organization',
                    disName:'机构'
                }
            ],
            EntityAttrClassify:{
              "event":[{
                    id:'type',
                    disName:'类型'
                },
                {
                    id:'main_body',
                    disName:'主体'
                },
                {
                    id:'place',
                    disName:'地点'
                }],
              "organization":[
                {
                    id:'type',
                    disName:'类型'
                },
                {
                    id:'headquarters_location',
                    disName:'总部'
                },
                {
                    id:'torchbearer',
                    disName:'领导人'
                }
              ]
            },
            nodeTypedata:null,
            staticsIds:[],
      };
    },
    components: {
      modalChartDetail,
      leftStatics,
      entityDetailsTableHuman,
      entityDetailsTableAdministrative,
      entityDetailsTableOrganization
    },
    // computed: {
      //   menuitemClasses: function() {
        //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed:mapState (['selectNetNodes', 'singlePerson', 'viewHeight', 'geo_selected_param','contentStatisticsResult']),
    watch: {
      // contentStatisticsResult:function(){
      //   var mthis = this;
      //   mthis.contentStatisticsdata = mthis.contentStatisticsResult.data;
      // },
      geo_selected_param: function() {
        var mthis = this;
        var type = mthis.$store.state.geo_selected_param.type;
        if(type !== 'GeoTime'){
          //mthis.dataStatistics = mthis.$store.state.geo_selected_param.eventId;
          mthis.nodeTypedata = {
                code:0,
                data:[
                    {
                        id:'event',
                        count: 1,
                        per: 8,
                        
                    },
                    {
                        id:'organization',
                        count: 3,
                        per: 8,
 
                    },
                ]
            };
        }
      },
      eventheightdiv: function() {
        this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      },
      // selectNetNodes: function(va) {
      //   var mthis = this;
      //     let nodeIdsArry = va[0].ids.map(item => {
      //       return item.id;
      //     });
      //     if (this.timer) {
      //       clearTimeout(this.timer)
      //     }
      //     this.timer = setTimeout(function() {
      //     // 新增防抖功能
      //     mthis.$http.post(this.$store.state.ipConfig.api_url + '/node-datas/', {
      //       'nodeIds': nodeIdsArry
      //     }).then(response => {
      //       mthis.evetdata = mthis.singlePerson?response.body.data[0].nodes[0]:response.body.data[0].nodes
      //     })
      //     }, 100);
      //   // let qu = (mthis.singlePerson) ? mthis.selectNetNodes[0].ids[0] : mthis.selectNetNodes[0].ids
      //   // mthis.evetdata = 
      // }
    },
    methods: {
      setFlagToFalse(detailModalFlag){
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
.entityDetail>.organization_detailTable tr{
  border-bottom: none !important;
}
.entityDetail>.administrative_detailTable tr{
  border-bottom: none !important;
}
.entityDetail>.human_detailTable tr{
  border-bottom: none !important;
}
#toushi>.toushiItems>.ivu-collapse-item>.ivu-collapse-content>.ivu-collapse-content-box>div>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
  margin-left:10px
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
  .ivu-collapse{
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
    color: #cff !important;
  }
  .ivu-collapse-header span{
    font-size: 14px !important;
  }
  .ivu-collapse-content-box>.ivu-collapse{
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
