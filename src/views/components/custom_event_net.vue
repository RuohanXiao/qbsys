<template>
  <div :style="{height:eDivH}">
    <!-- topdiv 头像, 名字, 简介 -->
    <div :style="{display:'flex'}">
      <div class='avatarStyle'>
        <Avatar class="circle-img" :src='autoImg' :onerror="defaultImg(detailData.entity_type,detailData.img,detailData.event_subtype)" :style="{width:'50px',height:'50px'}" />
      </div>
      <div class="contentStyle">
        <div>
          <p :style="{lineHeight:'28px',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" class="titleStyle">{{detailData.name}}</p>
          <!-- <p :style="{lineHeight:'28px',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" class="titleStyle">{{detailData.title}}</p> -->
        </div>
        <!-- <div v-if="myMap.get(detailData.entity_type) === 'entity'"> -->
          <p class='desClass' :title='detailData.description' v-if="detailData.description">{{detailData.description}}</p>
          <p class='desClass desStyle' v-else >暂无简介</p>
        <!-- </div> -->
      </div>
    </div>
    <!-- 节点信息 -->
    <div :style="{minHeight:entDivHTitle}">
      <div class="e-title">
        <div class="e-title-d"></div>
        <p class="e-title-p">节点信息</p>
      </div>
      <human-entity-table v-if="detailData.entity_type==='human'" :tableData="detailData" :tableType='detailData.entity_type' :entDivH='entDivH'></human-entity-table>
      <administrative-entity-table v-show="detailData.entity_type==='administrative'" :tableType='detailData.entity_type' :tableData="detailData" :entDivH='entDivH'></administrative-entity-table>
      <organization-entity-table v-show="detailData.entity_type==='organization'" :tableType='detailData.entity_type' :tableData="detailData" :entDivH='entDivH'></organization-entity-table>
      <weapon-entity-table v-show="detailData.entity_type==='weapon'" :tableType='detailData.entity_type' :tableData="detailData" :entDivH='entDivH'></weapon-entity-table>
      <event-entity-table v-show="detailData.entity_type==='event'" :tableType='detailData.entity_type' :tableData="detailData" :entDivH='entDivH'></event-entity-table>
      <doc-entity-table v-show="detailData.entity_type==='document'" :tableType='detailData.entity_type' :tableData="detailData" :entDivH='entDivH'></doc-entity-table>
    </div>
    <!-- 选中详情 -->
    <div class="selectDiv" :style="{height:selectDivHeight}">
      <div class="selectEdiv" :style="{height:selectDivHeight,maxHeight:selectDivHeight}">
        <!-- 实体属性 -->
        <div class="e-title">
          <div class="e-title-d"></div>
          <p class="e-title-p">当前选择({{nowSelData.length}})</p>
        </div>
        <div class="e-content" v-if="nowSelData.length == undefined" :style="{height:selectHeight, backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
          <div class="e-content-d pointIcon" @click="changeDetailDiv(nowSelData.id,nowSelData.entity_type,nowSelData)">
            <p class="e-content-p">{{nowSelData.name}}</p>
          </div>
        </div>
        <div class="scrollBarAble e-content" v-else :style="{height:selectHeight, backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
          <div class="e-content-d pointIcon" v-for="(item,index) in nowSelData" @click="changeDetailDiv(item.id,item.entity_type,nowSelData)" :id='item.id' :class="(selectTag===item.id)?'selectedTag':''">
            <!-- <p v-if="item.entity_type==='event'" class="e-content-p">{{myMap1.get(item.name.toLowerCase().replace(/-/, "_")).name}}</p>
            <p v-else class="e-content-p">{{item.name}}</p> -->
            <p class="e-content-p">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import configer from '../../util/configContrl.js'
  import util from '../../util/tools.js'
  import humanEntityTable from './custom_event_humanEntityTable'
  import administrativeEntityTable from './custom_event_administrativeEntityTable'
  import organizationEntityTable from './custom_event_organizationEntityTable'
  import weaponEntityTable from './custom_event_weaponEntityTable'
  import eventEntityTable from './custom_event_eventEntityTable'
  import docEntityTable from './custom_event_docEntityTable'
  mock.test = 1
  export default {
    data() {
      return {
        autoImg:'',
        nowSelData:null,
        ifShown: true,
        value1: ['1', '2', '3', '4'],
        selectTag: '',
        detailData: new Object(),
        selectDivHeight: '',
        eDivH: '',
        selectHeight: '',
        entDivH: '',
        entityT: '',
        dicMap: new Map(),
        myMapevent: new Map(),
        // dicMap:{
        //   'entity':'实体',
        //   'document':'文档',
        //   'event':'事件'
        // },
        myMap: new Map(),
        myMap1: new Map(),
        xiangguanEntity: [],
        xiangguanDoc: [],
        xiangguanEvent: [],
        timer: null,
        allRelatedEntity: {
          nodes: [],
          links: []
        },
        allRelatedDoc: {
          nodes: [],
          links: []
        },
        allRelatedEvent: {
          nodes: [],
          links: []
        }
      }
    },
    props: ['eventdata'],
    methods: {
      // checkImg(src) {
      //   util.checkImgExists(src)
      // },
      arrayUnique:function(arr,name){
        var hash = {};
        return arr.reduce(function(item,next){
          hash[next[name]] ? '':hash[next[name]] = true && item.push(next);
          return item;
        },[]);
      },
      defaultImg(type, img, subtype) {
        // console.log('==================')
        // console.log(util.checkImgExists(img))
        if(img){
        var mthis = this
        if (mthis.eventdata[0]) {
          if(!util.checkImgExists(img)){
            if (this.myMap.get(type) === 'entity') {
              if (mthis.eventdata[0].entity_type === 'administrative') {
                return 'http://10.60.1.140/assets/images/location.png'
              } else if (mthis.eventdata[0].entity_type === 'human') {
                return 'http://10.60.1.140/assets/images/People.png'
              } else if (mthis.eventdata[0].entity_type === 'organization') {
                return 'http://10.60.1.140/assets/images/Organization.png'
              } else if (mthis.eventdata[0].entity_type === 'weapon') {
                return 'http://10.60.1.140/assets/images/weapon.png'
              } else {
                return 'http://10.60.1.140/assets/images/image1.png'
              }
            } else if (this.myMap.get(type) === 'event') {
              return mthis.myMap1.get(subtype).img
              // return (img && util.checkImgExists(img)) ? img : 'http://10.60.1.140/assets/images/event.png'
            } else if (this.myMap.get(type) === 'document') {
              return (img && util.checkImgExists(img)) ? img : 'http://10.60.1.140/assets/images/content_node.png'
            } else {
              return (img && util.checkImgExists(img)) ? img : 'http://10.60.1.140/assets/images/image1.png'
            }
          } else{
            return img
          }
        }
        }else{
          return ''
        }
      },
      changeDetailDiv(id, type, ob) {
        var mthis = this
        let arr = []
        arr.push(id)
        if (mthis.myMap.get(type) === 'entity') {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/entity-detail/', {
            "nodeIds": arr
          }).then(response => {
            let res = response.body.data[0]
            res.img = mthis.defaultImg(type, res.img)
            mthis.detailData = res
          })
        }
        if (mthis.myMap.get(type) === 'event') {
          // ;
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/event-detail/', {
            "EventIds": arr
          }).then(response => {
            let res = response.body.data[0]
            res.img = mthis.myMap1.get(res.event_subtype.toLowerCase().replace(/-/, "_")).img
            res.name = mthis.myMap1.get(res.event_subtype.toLowerCase().replace(/-/, "_")).name
            mthis.detailData = res
            mthis.detailData.entity_type = 'event'
          })
          // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-DocAndEvent/', {
          //   "NodeIds": arr,
          //   "TypeLabel": 'event'
          // }).then(response => {
          //   // // console.log('=============related event=============')
          //   // // console.log(response)
          // })
        }
        if (mthis.myMap.get(type) === 'document') {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/doc-detail/', {
            "docIds": arr
          }).then(response => {
            let res = response.body.data[0]
            // res.img = (response.body.data[0].img && util.checkImgExists(response.body.data[0].img)) ? response.body.data[0].img : 'http://10.60.1.140/assets/images/content_node.png'
            res.img = 'http://10.60.1.140/assets/images/content_node.png'
            res.name = res.title
            mthis.detailData = res
            mthis.detailData.entity_type = 'document'
          })
        }
        mthis.selectTag = id
      }
    },
    components: {
      humanEntityTable,
      administrativeEntityTable,
      organizationEntityTable,
      weaponEntityTable,
      eventEntityTable,
      docEntityTable
    },
    watch: {
      detailData: function() {
        if (this.detailData.entity_type === 'event' && this.detailData.event_subtype) {
          this.autoImg = this.myMap1.get(this.detailData.event_subtype).img
        } else if(this.detailData.entity_type === 'document'){
          this.autoImg = 'http://10.60.1.140/assets/images/content_node.png'
        } else if(this.detailData.entity_type === 'other'){
          this.autoImg = 'http://10.60.1.140/assets/images/image1.png'
        }else {
          this.autoImg=this.defaultImg(this.detailData.entity_type,'http://10.60.1.143/pic_lib/padded/'+this.detailData.id+'.png','')
        }
      },
      eventdata: function() {
        var mthis = this
        if (typeof(mthis.eventdata) === "object" && mthis.eventdata.concat && mthis.eventdata.length > 0) {
          if (mthis.timer) {
            clearTimeout(mthis.timer)
          }
          mthis.timer = setTimeout(function() {
            let arr = []
            let detailId;
            if (mthis.eventdata[0]) {
              if (mthis.myMap.get(mthis.eventdata[0].entity_type) === 'entity') {
                detailId = (mthis.eventdata[0].id)
                mthis.selectTag = detailId
                let a = []
                a.push(detailId)
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
                  "nodeIds": a
                }).then(response => {
                  let result = new Object();
                  result = response.body.data[0]
                  if (mthis.eventdata[0].entity_type === 'administrative') {
                    result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/location.png'
                  } else if (mthis.eventdata[0].entity_type === 'human') {
                    result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/People.png'
                  } else if (mthis.eventdata[0].entity_type === 'organization') {
                    result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/Organization.png'
                  } else if (mthis.eventdata[0].entity_type === 'weapon') {
                    result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/weapon.png'
                  } else {
                    result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/image1.png'
                  }
                  mthis.detailData = result
                })
                // mthis.changeDetailDiv(detailId,mthis.eventdata.entity_type,mthis.eventdata)
              } else if (mthis.myMap.get(mthis.eventdata[0].entity_type) === 'event') {
                detailId = (mthis.eventdata instanceof Array) ? (mthis.eventdata[0].id) : (mthis.eventdata.id);
                mthis.selectTag = detailId
                let result = new Object();
                result = mthis.eventdata[0]
                // result.name = mthis.myMapevent.get(result.name.toLowerCase().replace(/-/, "_")).name
                // result.name = mthis.myMap1.get(result.name.toLowerCase().replace(/-/, "_")).name
                result.img = util.checkImgExists(result.img) ? (result.img) : mthis.myMap1.get(result.name.toLowerCase().replace(/-/, "_")).img
                mthis.detailData = result
                // mthis.changeDetailDiv(detailId,mthis.eventdata.entity_type,mthis.eventdata)
              } else if (mthis.myMap.get(mthis.eventdata[0].entity_type) === 'document') {
                detailId = (mthis.eventdata instanceof Array) ? (mthis.eventdata[0].id) : (mthis.eventdata.id);
                mthis.selectTag = detailId
                let detailType = (mthis.eventdata.length !== undefined) ? (mthis.eventdata[0].entity_type) : (mthis.eventdata.entity_type);
                let a = []
                a.push(detailId)
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
                  "docIds": a
                }).then(response => {
                  // console.log(response.body.data[0])
                  let result = new Object();
                  result = response.body.data[0]
                  result.entity_type = 'document'
                  result.label = response.body.data[0].title
                  result.name = response.body.data[0].title.substring(0, 19) + '...'
                  result.img = util.checkImgExists(result.img) ? (result.img) : 'http://10.60.1.140/assets/images/content_node.png'
                  mthis.detailData = result
                  // console.log('mthis.detailData')
                  // console.log(mthis.detailData)
                })
              } else {
                // // console.log('未找到匹配的类型')
              }
            }
            // mthis.changeDetailDiv(detailId,mthis.eventdata.entity_type,mthis.eventdata)
          }, 200);
        } else {
          // // console.log('=======mthis.eventdata取值异常')
          // // console.log(mthis.eventdata)
        }
        
        mthis.nowSelData =mthis.arrayUnique(mthis.eventdata,'id')
       
        
      }
      
    },
    created() {
      
      this.dicMap = new Map();
      this.dicMap.set('entity', '实体');
      this.dicMap.set('document', '文档');
      this.dicMap.set('event', '事件');
      var mthis = this
      var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap1 = new Map();
      for (let eventNameitem of eventNames) {
        for (let items of eventNameitem.children) {
          mthis.myMap1.set(items.getElementsByTagName('ename')[0].textContent, {
            name: items.getElementsByTagName('chname')[0].textContent,
            img: items.getElementsByTagName('img')[0].textContent
          })
        }
      }
      var ob1 = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
      var entityMainType = ob1.getElementsByTagName("entityMainType");
      mthis.myMap = new Map();
      for (var i = 0; i < entityMainType.length; i++) {
        let typeName = entityMainType[i].children[0].textContent;
        let typeChild = []
        for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
          mthis.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
        }
      }
    },
    mounted() {
      
      this.selectDivHeight = (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 8 + 30 + "px";
      this.selectHeight = (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 12 + "px";
      this.eDivH = document.documentElement.clientHeight - 65 - 20 - 16 - 45 + 'px';
      this.entDivH = document.documentElement.clientHeight * 0.8 - 10 - 16 - 30 - 75 - (64 + 70 + 30 + 20) * 0.2 + 8 - 60 + "px";

      this.entDivHTitle = document.documentElement.clientHeight * 0.8 - 10 - 16 - 30 - 75 - (64 + 70 + 30 + 20) * 0.2 + 8 - 30 + "px";
      var ob = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
      var entityMainType = ob.getElementsByTagName("entityMainType");
      this.myMap = new Map();
      for (var i = 0; i < entityMainType.length; i++) {
        let typeName = entityMainType[i].children[0].textContent;
        let typeChild = []
        for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
          this.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
        }
      }
      var ob1 = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/dictionary.xml");
      var eventType = ob1.getElementsByTagName("event2chinese");
      this.myMapevent = new Map();
      for (let items of eventType) {
        // console.log('-----mymapevent------')
        // console.log(items)
        // console.log(items.getElementsByTagName("eventType")[0].textContent)
        // console.log(items.getElementsByTagName("eventCHType")[0].textContent)
        this.myMapevent.set(items.getElementsByTagName("eventType")[0].textContent, {
          name: items.getElementsByTagName("eventCHType")[0].textContent
        });
      }
      this.nowSelData = this.eventdata;
      // console.log(this.eventdata)
      // console.log(this.nowSelData)
      
    }
  }
</script>
<style scope>
  .circle-img>img {
    background-color: rgba(51, 255, 255, 0.2)
  }
  .avatarStyle {
    width: 50px;
    margin: 0 20px;
  }
  .contentStyle {
    width: 100%;
    text-align: left;
    margin-bottom: 16px;
    overflow-x: hidden;
  }
  .desStyle {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    opacity: 0.5;
  }
  .titleStyle {
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .e-title {
    height: 30px;
    background-color: rgba(51, 255, 255, 0.2);
    border-top: solid 1px #366674;
    border-bottom: solid 1px #366674;
    display: flex;
  }
  .e-title-p {
    height: 18px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .e-title-d {
    width: 4px;
    height: 16px;
    background-color: #009999;
    margin: 6px 6px;
  }
  .NameTdss {
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  #nodeAttr>.ivu-collapse-item>.ivu-collapse-header>i {
    margin-right: 0px !important;
  }
  #nodeAttr .ivu-icon-ios-arrow-forward::before {
    content: url("../../dist/assets/images/treeRightIcon.png") !important;
  }
  #nodeAttr>.ivu-collapse-item>.ivu-collapse-header {
    height: 30px !important;
    line-height: 30px !important;
    cursor: default !important;
  }
  #nodeAttr table tr:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  #nodeAttr table tr:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  /* #NodeTypeInfo >tr>td>span{
          padding-left:20px;
          text-align:left;
      } */
  #nodeAttr p {
    padding-left: 1em;
    text-align: left;
  }
  .tableStyle {
    width: 100%
  }
  .e-content-p {
    /* height: 14px; */
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    /* max-width: 70%;
        margin-right: 40px; */
    padding: 0 10px;
    white-space: nowrap;
  }
  .selectedTag {
    background-color: rgba(51, 255, 255, 0.5) !important;
  }
  .e-content-d:hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .e-content-d:hover .buttonD {
    opacity: 1;
  }
  .e-content div:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .e-content div:nth-child(even) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .selectDiv {
    position: absolute;
    /* bottom: 0; */
    width: 100%;
  }
  .selectEdiv {}
  .pointIcon {
    cursor: pointer;
  }
  .bstyle:hover {
    color: rgba(51, 255, 255, 0.8) !important;
  }
  .allowWrap {
    display: flex;
    flex-wrap: wrap;
  }
  .blockStyle{
    display: block;
    width: 100%;
  }
  .desClass{
    line-height: 22px;
    overflow: hidden;
    white-space: wrap;
    text-overflow: -o-ellipsis-lastline;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    height: 44px;
    word-break: break-all;
    }
</style>

