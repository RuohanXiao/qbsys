<template>
  <div id='demo' :style="{height:netheightdiv}" tabindex="1" @keydown="keyD" style="outline:none;">
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px',border:'solid 1px #336666'}">
      <cusButton :buttonParamArr='buttonArr' :changeButton='changeButtonParam'  @buttonClick='exButton'></cusButton>
    </div>
    <div @mousedown='kuangxuan' @mousemove="kuangmove" @mouseup="kuangup"
    :style="{borderRight:'solid 1px #336666',borderLeft:'solid 1px #336666',borderBottom:'solid 1px #336666',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}" id='containerDiv'>
      <div :style="{margin:'0,5px'}">
        <operatorHub :style="{height:ContentHeightList}" :operatorConfig="operatorConfig" @isOpen="clickHub"></operatorHub>
        <div v-show="!showList && !contentAna">
          <Scroll :on-reach-bottom="handleReachBottom" v-show='!ifInfo && !contentAna' :height=ContentHeight>
            <div id='spin' v-if="spinShow" :style="{position:'absolute',height:ContentHeight,zIndex: 98,width:'100%'}">
              <Spin size="large" fix v-if="spinShow">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
            </div>
          
            <div id="contentchart" class="scrollBarAble" @mousewheel="jiazai" aria-autocomplete="true" :style="{height:ContentHeight}"
             >
              <Row type="flex" justify="start">

                <Col :sm="colSmnum" :lg="colLgNum" :md='colMdNum' :offset='colOfset' align="middle" class-name="outCol" v-for="(item,index) in items" :key="index">
                <!-- <div v-show="showThumb" :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}"> -->
                  <div v-show="showThumb" style="text-align: center;padding:10px 0px;margin:5px 10px;width:150px;" class="docThunmsItem" :title="item.title"  :id="item.id+'thum'" @click='toSelIds(index,item.check,item.id,$event)' 
                  @dblclick="showContent(item.id,item.title)" @mousedown='clearBubble' @mouseup='clearBubble' @mousemove='clearBubble'
                  @mouseenter="addHover" @mouseleave="removeHover">
                      <img :src='item.img' class="picsize" :class="statusClass(item.check)">
                      <p class='nametext'>{{item.title}}</p>
                   
                  </div>
                <!-- </div> -->
                <div>
                  <div v-show='!showThumb' class="contentDiv fileDiv select-item" :class="statusClass(item.check)" :id="item.id" :title="item.title" 
                  @dblclick="showContent(item.id,item.title)" @contextmenu.prevent="rightMenu" @click='toSelIds(index,item.check,item.id,$event)' 
                  @mousedown='clearBubble' @mouseup='clearBubble' @mousemove='clearBubble'>
                    <p class="contentTitle">{{item.title}}</p>
                    <p class="contentText">{{item.text.substring(0,34)}}</p>
                    <p class="contentTime">{{item.time}}&nbsp;&nbsp;&nbsp;{{item.from}}</p>
                  </div>
                  <div v-show='!showThumb' class="contentItem">
                    <Icon class="icon iconfont icon-triangle-up DVSL-bar-btn-back deg180 color255-back zindex99 hoverStyle" :style="{padding:'0 !important'}" size="35" @click="selectThis(item.id)"></Icon>
                    <Icon class="icon iconfont icon-right DVSL-bar-btn-back color255" :style="{padding:'0 !important'}" size="15"></Icon>
                  </div>
                </div>
                </Col>
                <Col span=24 v-if="items.length>0" style="margin-bottom:'20px'" id='jiazaiDiv'>
                <div style="margin-bottom:'20px'"></div>
                </Col>
                <!-- <Col span=24 v-if="items.length>0">
                      <div @click="handleReachBottom" :style="{textAlign:'center',color:'rgba(51,255,255,0.5)'}" class='more'>加载更多</div>
                    </Col> -->
              </Row>
              
                <!-- <div class="layer">文档已经全部加载</div> -->
                <transition name="mybox">
                  <div class="xuanfuAlert" v-show="popout">{{message.text}}</div>
                  <!-- <div class="xuanfuAlert">message.text</div> -->
                </transition>
              
            </div>
            
          </Scroll>
          <div id="contentInfo" class="scrollBarAble" v-show='ifInfo' :style="{height:ContentHeightList,overflowY:'scroll'}">
            <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='hideContentDiv(1)'></Icon>
            <h2 class="contentInfoTitle" id='contentsTitle'></h2>
            <p class="contentInfoTime" id='contentsTime'></p>
            <p style='margin:10px'><span id='contents'></span></p>
          </div>
          
          
        </div>
      </div>
      <!-- 列表图 -->
      <!-- <div id="barList">
        <div v-show="showList" :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}">
          <Table  border :columns="columns3" :data="data4" style="margin-top:10px;margin-left:5em;margin-right:5em" height="400"></Table>
        </div>
      </div> -->
      <!-- 词云分析图 -->
      <div id='wordAna' v-show="contentAna" :style="{width:contentAnaWidth,height:ContentHeightList,overflowY:'scroll',position:'relative',left:'250px'}">
        <word-ana :docNum='selDocNum' :initWord='contentAna'></word-ana>
      </div>
    </div>
    
    <!-- </Col> -->
    <!-- flag 是modal显示开关，eventData是modal左侧列表数据 -->
    <modal-chart :flag="modal01" :edata="eventData"></modal-chart>
    <workset-modal :worksetData="worksetData" :type="worksetType" :flag="worksetFlag" :worksetInfo="worksetInfo" />
    
  </div>
</template>
<script>
  import util from '../../util/tools.js'
  import mock from '../../mock/index.js'
  // import liM from '../../dist/assets/js/jquery.liMarquee.js'
  import modalChart from './custom_modal.vue'
  import InfiniteLoading from 'vue-infinite-loading';
  import worksetModal from "./custom_workSet_modal.vue";
  import echarts from 'echarts';
  import $ from "jquery";
  import cusButton from './custom_menuButton.vue'
  import operatorHub from "./custom_operatorHub.vue"
  import wordAna from "./custom_content_kewordsana.vue"
  import {
    mapState,
    mapMutations
  } from 'vuex'
  // import func from '../../../vue-temp/vue-editor-bridge';
  mock.test = 1
  var timer = null;
  var tthis = this;
  var timerClick = null;
  var timer2 = null;
  var timerMouse = null;
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        selDocNum:0,
        changeButtonParam:[],
        buttonArr:[
            {
                'id':'clearAll_HD',
                'name':'清空',
                'imgClass':'icon-qingchu',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'fanxuan_HD',
                'name':'反选',
                'imgClass':'icon-fanxuan',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'quanxuan_HD',
                'name':'全选',
                'imgClass':'icon-quanxuan',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'delete_HSD',
                'name':'删除',
                'imgClass':'icon-delete-point',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'addSet_HSD',
                'name':'创建集合',
                'imgClass':'icon-add',
                'isUse':false,
                'type':'default',
                
            },
            {'id':'separate'},
            {
                'id':'contentShow_PCD',
                'name':'摘要图',
                'imgClass':'icon-zhaiyaotu',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'thumShow_PTD',
                'name':'缩略图',
                'imgClass':'icon-suolvetu',
                'isUse':false,
                'type':'default',
                
            },
            // {
            //     'id':'listShow_HD',
            //     'name':'列表图',
            //     'imgClass':'icon-liebiaotu',
            //     'isUse':false,
            //     'type':'default',
                
            // },
            {'id':'separate'},
            {
                'id':'defaultOrder_HD',
                'name':'相关性排序',
                'imgClass':'icon-paixu--guanlian',
                'isUse':false,
                'type':'default',
                
            },
            {
                'id':'timeOrder_HD',
                'name':'时间排序',
                'imgClass':'icon-paixu--shijian',
                'isUse':false,
                'type':'default',
                
            },
            {'id':'separate'},
            {
                'id':'translate_TD',
                'name':'翻译',
                'imgClass':'icon-translate2',
                'isUse':false,
                'type':'state',
                'status':'unFocus'
            },
            {
                'id':'toNet_HSD',
                'name':'推送网络',
                'imgClass':'icon-tuisongzhiwangluo',
                'isUse':false,
                'type':'default',
                
            },
            {'id':'separate'},
            {
                'id':'cutPic_NT',
                'name':'截屏',
                'imgClass':'icon-cut',
                'isUse':false,
                'type':'default',
                
            }
        ],
        loadingCount:0,
        options:[],
        charts:[],
        docAnaCount:0,
        topicIndex:0,
        dropPlace:'关键词',
        ifRenderAllTitle:false,
        openHub:false,
        ifResize:false,
        showAllDocCount:0,
        myWordCharts:[],
        option:new Object({
          title:{
            name:'keyWords分析',
            x:'center',
            textStyle:{
              fontSize:12,
              color:'#ffffff'
            }
          },
          tooltip: {
 			        show: true
           },
           series: [{
 			        name: '关键词',
               type: 'wordCloud',
               shape: 'circle',
 			        sizeRange: [14, 24],
 			        rotationRange: [0, 0],
              textPadding: 0,
              
 			        autoSize: {
 			            enable: true,
 			            minSize: 14
 			        },
 			        textStyle: {
 			            normal: {
 			                color: function(params) {
                           var colorList = ['#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff']
                           return colorList[Math.floor(Math.random()*6)]
 			                }
                   },
                
 			            emphasis: {
 			                // shadowBlur: 10,
 			                shadowColor: '#333'
 			            }
               },
               right: null,
               bottom: null,
               left:'center',
               top:'center',
               data:[]
 			 	  }]
        }),
        ifTopic:false,
        wordCloudOption:null,
        topicDatas:[],
        
        changeBar:'词云',
        orderCount:0,
        
        ifhasSel:false,
        
        prevIfhasSel:false,
        isBru:false,
        bruIds:[],
        bruStartX:0,
        bruStartY:0,
        prevKdown:null,
        prevKup:null,
        keyCount:0,
        isSel:null,
        itemWidth:0,
        itemHeight:0,
        topWidth:0,
        topHeight:0,
        contentAnaWidth:0,
        prevItems:[],
        mouseStartX:0,
        mouseStartY:0,
        mouseOn:false,
        colOfset:0,
        colLgNum:3,
        colMdNum:6,
        colSmnum:4,
        selDocItems:{},
        worksetData: [],
        worksetType: "",
        worksetFlag: 0,
        worksetInfo: {
          title: "",
          des: "",
          id: ""
        },
        popout:false,
        message: {
          text: "",
          time: ""
        },
        goodsList: [],
        sortFlag: true, //默认升序
        page: 1,
        pageSize: 8,
        busy: true,
        watchSelectCounter: 0,
        
        
        spinShow: false,
        markedItem: false,
        ifInfo: false,
        contentAna:false,
        ContentHeight: 0,
        ContentHeightList: 0,
        netheight: 0,
        netheightdiv: 0,
        netheightout: 0,
        flag: true,
        modal01: false,
        showThumb:true,
        thumbDocIds:[],
        eventData: null,
        items: [],
        page: 1,
        content: '',
        order: '',
        toEdg: -100,
        showList: false,
        moreLoading: false,
        selectArr: [],
        
        operatorConfig:[
                {
                  name:'文档聚类',
                  id:'docCluster',
                  iconName:'icon-neirongfenxi',
                  disabled:true
                },
                {
                    name:'关键词分析',
                    id:'topicClassification',
                    iconName:'icon-neirongfenxi',
                    openFunction:'opentopicClassif',
                    closeFunction:'closetopicClassif',
                    disabled:false,
                    operatorSurface:[
                      {
                        name:'文字词性',
                        id:'wordsSpeech',
                        type:'Select',
                        attrName:'wordsSppech',
                        excuteFunction:'setWordsSpeech',
                        value:{
                          options:[
                            {
                                value:'keywords',
                                label:'关键词'
                            },
                            {
                                value:'PER',
                                label:'人名'
                            },
                            {
                                value:'LOC',
                                label:'地名'
                            },
                            {
                                value:'ORG',
                                label:'机构名'
                            },
                            {
                                value:'N',
                                label:'名词'
                            },
                            {
                                value:'V',
                                label:'动词'
                            },
                            {
                                value:'J',
                                label:'形容词'
                            },
                            {
                                value:'R',
                                label:'副词'
                            },
                            {
                                value:'P',
                                label:'代词'
                            },
                            {
                                value:'C',
                                label:'连词'
                            },
                            {
                                value:'O',
                                label:'其他'
                            }
                          ]
                        }
                      },
                      {
                        name:'文字大小',
                        id:'wordsSize',
                        type:'SliderUn',
                        attrName:'wordsSize',
                        excuteFunction:'setWordSize',
                        value:{
                            extent:[10,28],
                            defaultValue:18
                        }
                      },
                      {
                        name:'显示角度',
                        id:'wordAngle',
                        type:'InputRange',
                        attrName:'wordAngle',
                        excuteFunction:'setWordAngle',
                        value:{
                          extent:[0,360],
                          defaultValue:[0,0],
                          step:5
                        }
                      },
                      {
                        name:'显示数量',
                        id:'wordNum',
                        type:'Input',
                        attrName:'wordNum',
                        excuteFunction:'setWordNum',
                        value:{
                          defaultValue:50,
                          extent:[1,100]
                        }
                      }
                    

                    ]
                },
                {
                name:'机器翻译',
                id:'maskinoversettelse',
                iconName:'icon-neirongfenxi',
                disabled:true
                },
                {
                name:'倾向性分析',
                id:'sentimentAnalysis',
                iconName:'icon-neirongfenxi',
                disabled:true
                },
                {
                name:'文档摘要',
                id:'docSummary',
                iconName:'icon-neirongfenxi',
                disabled:true
                },
                {
                name:'获取更多',
                id:'getMore',
                iconName:'icon-neirongfenxi',
                disabled:true
                },

        ]
      };
    },
    computed: mapState([
      'searchContentResult', 'contentHeight', 'contentTimeCondition', 'netToContentData','contentKeyboards','contentPromte','contentTimeOnlySel','selectContentNodes','topicClassifStatus',
      
      ]),

   
    watch: {
      
      
      // topicDatas:function(){
        
      //   this.$nextTick(function(){
      //     var mthis = this
      //     mthis.ifRenderAllTitle = true
      //     mthis.myWordCharts = [];
        
      //     mthis.options = [];
      //     mthis.charts = [];
          
      //     for(let i=0;i<mthis.topicDatas.length;i++){
      //           mthis.charts.push(i+'wordChart');
      //           mthis.myWordCharts.push(i+'myChart');
      //           mthis.options.push(mthis.option);
      //         }
              
      //          for(let j=0;j<mthis.myWordCharts.length;j++){
      //             mthis.options[j].series[0].data = mthis.topicDatas[j].topDatas;
                    
      //             mthis.myWordCharts[j] = echarts.init(document.getElementById(mthis.charts[j]),'',{
      //               width:mthis.itemWidth,
      //               height:mthis.itemHeight
      //             });
      //             mthis.myWordCharts[j].setOption(mthis.options[j]);
                  
      //           }
      //       mthis.wordResize(mthis.topicDatas.length)
      //   })
      // },
      
      // ifSinDocAna:function(){
      //   var mthis = this
      //   let name = mthis.dropPlace;
      //   let val = '';
      //   switch(name){
      //     case '人名' : val = 'PER';break;
      //     case '地名' : val = 'PER';break;
      //     case '机构名' : val='ORG'; break;
      //     case '名词' : val='N';break;
      //     case '动词' : val = 'V';break;
      //     case '形容词' : val = 'J';break;
      //     case '副词' : val = 'R';break;
      //     case '代词' : val = 'P';break;
      //     case '连词' : val = 'C';break;
      //     case '关键词' : val = 'keywords';break;
          
      //     case '其他' : val = 'O';break;
      //     default: val = 'keywords';break;
      //   }
      //   if(this.ifSinDocAna){
      //     let ids = mthis.$store.state.topicSelIds
      //     mthis.$store.commit('setTopicSelIds',[])
      //     mthis.getDocAna(val,'single',ids);
          
          
        
      //   }
      // },
      // ifMulDocAna:function(){
      //   var mthis = this
      //   if(this.ifMulDocAna){
      //     let name = mthis.dropPlace;
      //     let val = '';
      //     switch(name){
      //       case '人名' : val = 'PER';break;
      //       case '地名' : val = 'PER';break;
      //       case '机构名' : val='ORG'; break;
      //       case '名词' : val='N';break;
      //       case '动词' : val = 'V';break;
      //       case '形容词' : val = 'J';break;
      //       case '副词' : val = 'R';break;
      //       case '代词' : val = 'P';break;
      //       case '连词' : val = 'C';break;
      //       case '关键词' : val = 'keywords';break;
            
      //       case '其他' : val = 'O';break;
      //       default: val = 'keywords';break;
      //     }
      //     if(this.ifMulDocAna){
      //     let ids = mthis.$store.state.topicSelIds
      //     mthis.$store.commit('setTopicSelIds',[])
      //     mthis.getDocAna(val,'group',ids);
          
          
        
      //   }
      //   }
      // },
      prevItems:{
        handler(newVal,oldVal){
          var mthis = this
          if(mthis.prevItems.length>0){
            
            
            let buttonItems = mthis.prevItems.filter(item => item.check =='sel')
            if(buttonItems.length>0){
              mthis.ifhasSel = true;
              if(mthis.showThumb){
                mthis.changeButtonParam = [
                  {
                      'id_suf':'HD',
                      'isUse':true
                  },
                  {
                      'id_suf':'HSD',
                      'isUse':true
                  },
                  {
                    'id_suf':'PCD',
                    'isUse':true
                  },
                  {
                    'id_suf':'PTD',
                    'isUse':false
                  }
                ]
              }else{
                mthis.changeButtonParam = [
                  {
                      'id_suf':'HD',
                      'isUse':true
                  },
                  {
                      'id_suf':'HSD',
                      'isUse':true
                  },
                  {
                    'id_suf':'PCD',
                    'isUse':false
                  },
                  {
                    'id_suf':'PTD',
                    'isUse':true
                  }
                ]
              }
              
              // mthis.operatorConfig[1].disabled = false
            }else{
              mthis.ifhasSel = false
              if(mthis.showThumb){
                mthis.changeButtonParam = [
                  {
                      'id_suf':'HD',
                      'isUse':true
                  },
                  {
                      'id_suf':'HSD',
                      'isUse':false
                  },
                  {
                    'id_suf':'PCD',
                    'isUse':true
                  },
                  {
                    'id_suf':'PTD',
                    'isUse':false
                  }
                ]
              }else{
                mthis.changeButtonParam = [
                  {
                      'id_suf':'HD',
                      'isUse':true
                  },
                  {
                      'id_suf':'HSD',
                      'isUse':false
                  },
                  {
                    'id_suf':'PCD',
                    'isUse':false
                  },
                  {
                    'id_suf':'PTD',
                    'isUse':true
                  }
                ]
              }
              
              // mthis.operatorConfig[1].disabled = true
            }
            
          }else{

            
            mthis.ifhasSel = false
            
            mthis.changeButtonParam = [
                {
                    'id_suf':'HD',
                    'isUse':false
                },
                {
                    'id_suf':'HSD',
                    'isUse':false
                },
                {
                    'id_suf':'TD',
                    'isUse':false
                },
                {
                  'id_suf':'PCD',
                  'isUse':false
                },
                {
                  'id_suf':'PTD',
                  'isUse':false
                }
            ]
            // mthis.operatorConfig[1].disabled = true
          }
        },
        deep:true,
        immediate: true
      },
      topicClassifStatus:function(){
        var mthis = this;
        if(mthis.topicClassifStatus){
          
          
          mthis.contentAna = true
          mthis.selDocNum = mthis.$store.state.seletedDocAttrList.length;
          // mthis.$store.commit('setShowWordsAna',true)
          mthis.ifhasSel = false
          mthis.changeButtonParam = [
              {
                  'id_suf':'HD',
                  'isUse':false
              },
              {
                  'id_suf':'HSD',
                  'isUse':false
              },
              {
                'id_suf':'PCD',
                'isUse':false
              },
              {
                'id_suf':'PTD',
                'isUse':false
              }
          ]
          
        }else{
          mthis.contentAna = false
          
          mthis.ifhasSel = true
         
          if(mthis.showThumb){
            mthis.changeButtonParam = [
              {
                  'id_suf':'HD',
                  'isUse':true
              },
              {
                  'id_suf':'HSD',
                  'isUse':true
              },
              {
                'id_suf':'PCD',
                'isUse':true
              },
              {
                'id_suf':'PTD',
                'isUse':false
              }
            ]
          }else{
            mthis.changeButtonParam = [
              {
                  'id_suf':'HD',
                  'isUse':true
              },
              {
                  'id_suf':'HSD',
                  'isUse':true
              },
              {
                'id_suf':'PCD',
                'isUse':false
              },
              {
                  'id_suf':'PTD',
                  'isUse':true
              },
            ]
          }
          
        }
        
      },
      contentTimeOnlySel:function(){
        var mthis = this
        if(mthis.contentAna) return;
        // let items = []
        // for(var i of mthis.contentTimeOnlySel){
        //     for(var j in mthis.prevItems){
        //         if(i == mthis.prevItems[j].id){
        //             items.push(mthis.deepClone(mthis.prevItems[j]))
        //             }
        //           }
        //         }

         mthis.items.forEach(function(item){
           if(item.check == 'half-sel'){
             item.check = 'sel'
           }
         })
         mthis.watchSelectCounter++;
         mthis.prevItems = mthis.deepClone(mthis.items)
        //  mthis.items = mthis.deepClone(items)
        //  mthis.selectAll()
      },
      contentPromte:function(){
        this.setMessage(this.contentPromte)
      },
      message: function() {
        var mthis = this;
        mthis.popout = true; //点击后popout为ture
        if (timer2) {
          clearTimeout(timer2);
        }
        timer2 = setTimeout(function() {
          mthis.popout = !mthis.popout; //对popout进行取反
        }, 3000);
      },
      contentKeyboards:function(){
        var mthis = this
        
        if(this.contentKeyboards.indexOf('delete')>-1){
          let index = mthis.contentKeyboards.indexOf('delete')
          mthis.deleteNode()
          mthis.$store.state.contentKeyboards.splice(index,1)
        }else if(this.contentKeyboards.indexOf('selall')>-1){
          let index = mthis.contentKeyboards.indexOf('selall')
          mthis.selectAll()
          mthis.$store.state.contentKeyboards.splice(index,1)
        }else{
          return
        }
        
        
      },
      watchSelectCounter: function() {
        this.prevItems = this.deepClone(this.items)
        let selectList = this.items.filter(item => item.check == 'sel')
        let seleArr = []
        for(let m = 0;m<selectList.length;m++){
          seleArr.push(selectList[m].id)
        }
        this.$store.commit('setSelectContentNodes', [{
          ids: seleArr
        }])
        this.$store.commit('setContent2time',[{
          ids:seleArr
        }])
        let selDocList = [];
        selDocList = selectList.map(item =>({
          title: item.title,      
          id: item.id,
          time: item.time,
          from: item.from,
          check:false     
          })
        );
        this.$store.commit('setSeletedDocAttrList',selDocList)
        
        
      },
      netToContentData: function() {
        
        var mthis = this
        
        if(this.netToContentData.contentIds.ids.length ==0){
          
          mthis.items = []
          
        }else if(this.netToContentData.contentIds.ids.length>0){
          mthis.spinShow = true
          
          mthis.items = []
          let contentIds = this.netToContentData.contentIds.ids
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
          'docIds': contentIds
        }).then(response => {
          let selectIds = []
          if(mthis.netToContentData.contentIds.type == 'push'){
            mthis.items = response.body.data.map(item =>({
                title: item.title,      
                i_sn: item.i_sn, 
                id: item.id,
                text: item.description,
                time: item.time,
                from: item.from,     
                img: "http://10.60.1.140/assets/images/content_node.png",
                check:'sel'
              })
              
            );
            mthis.prevItems = mthis.deepClone(mthis.items)
            mthis.watchSelectCounter++;
            
           
            
            
            
            // mthis.ifShowDoc = true
           
          }else if(mthis.netToContentData.contentIds.type == 'search'){
            mthis.items = response.body.data.map(item =>({
                title: item.title,      
                i_sn: item.i_sn, 
                id: item.id,
                text: item.description,
                time: item.time,
                from: item.from,     
                img: "http://10.60.1.140/assets/images/content_node.png",
                check:'def'
              })
            );
            mthis.$store.commit('setSelectContentNodes', [{
              ids: []
            }])
            mthis.$store.commit('setContent2time',[{
              ids:[]
            }])
            mthis.prevItems = mthis.deepClone(mthis.items)
            
            mthis.$store.commit('setSeletedDocAttrList',[])
          }
          
          mthis.spinShow = false
          
          
         
        })
        
        }
        
      },
      'contentTimeCondition.ids':function(){
            var mthis = this;
            if(mthis.contentAna) return;
            if(mthis.contentTimeCondition.ids.length ==0){
              mthis.items =  mthis.deepClone(mthis.prevItems)
            }else if(mthis.contentTimeCondition.ids.length>0){
              
              let index = []
              mthis.items.forEach(function(item){
                item.check = 'def'
              })
              for(var i of mthis.contentTimeCondition.ids){
                for(var j in mthis.items){
                  if(i == mthis.items[j].id){
                    mthis.items[j].check = 'half-sel'
                    index.push(j)
                  }
                }
              }
              let firItem = Math.min.apply(null, index);
              let firstIds = null;
              if(mthis.showThumb){
                firstIds = mthis.items[firItem].id+'thum'
              }else{
                firstIds = mthis.items[firItem].id
              }
              
              $('#'+firstIds)[0].scrollIntoView(true);
              
            }
      },
      
      
     
      'searchContentResult.time': function(va) {
        var mthis = this
        mthis.page = 1
        // if(mthis.$store.state.tmss === 'content') {
        // if(va[0].label.split('搜索:').length > 1) {
        
        mthis.content = mthis.searchContentResult.val
        mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query=' + mthis.content).then(response => {
          if (response.body.data.length > 0) {
            mthis.items = response.body.data.map(item =>({
                title: item.title,      
                i_sn: item.i_sn, 
                id: item.id,
                text: item.description,
                time: item.time,
                from: item.from,     
                img: "http://10.60.1.140/assets/images/content_node.png",
                check:'def'
              })
            );
            mthis.prevItems = mthis.deepClone(mthis.items)
            
            if(response.body.data.length ==48){
              mthis.moreLoading = true
            }
           
            
            
            $('<div class="select-box-dashed"></div>').remove();
            // mthis.showMore = true
            mthis.$store.commit('setSelectContentNodes', [{
              ids: []
            }])
            mthis.$store.commit('setContent2time',[{
              ids:[]
            }])
            
            mthis.$store.commit('setSeletedDocAttrList',[])
          } else {
            // mthis.showMore = false
            mthis.setMessage('未找到匹配的文章')
           
            mthis.items = []

          }
        })
        // }
        // }
        
      },
      // netHeight: function() {
      //   var mthis = this;
      //   mthis.netheight = mthis.$store.getters.getNetHeight;
      // },
      contentHeight: function() {
        var mthis = this;
        mthis.ContentHeight = mthis.$store.state.contentHeight - 75-1 + 'px';
        mthis.ContentHeightList = mthis.$store.state.contentHeight - 75-2+ 22 + 'px';
     
      },
      ContentHeightList: function() {
        var mthis = this;
        var Ele = document.getElementById('translatedDiv');
        var contentDiv = document.getElementById('contentInfo');
        
        // mthis.WCheight = (parseInt(mthis.ContentHeightList.split('px')[0]) - 45) + 'px'
        // mthis.barHeight = (parseInt(mthis.ContentHeightList.split('px')[0]) /2 -0.8) + 'px'
        if (Ele !== null) {
          Ele.style.height = mthis.ContentHeightList;
        }
      }
    },
    components: {
      InfiniteLoading,modalChart,worksetModal,operatorHub,cusButton,wordAna
    },
    props: ['contentData'],
    methods: {
        statusClass(check){
          var mthis = this
          if(check == 'def'){
            if(mthis.showThumb){
              return 
            }
            return 'defContent'
          }
          if(check == 'sel'){
            return 'item-selected'
          }
          if(check == 'half-sel'){
            return 'half-select'
          }
        },
        exButton(obj){
            var mthis = this;
            
            var buttonId = obj.currentTarget.id;
            if(buttonId == 'clearAll_HD'){
                mthis.removeAll()
            }
            if(buttonId == 'fanxuan_HD'){
                mthis.fanxuan()
            }
            if(buttonId == 'quanxuan_HD'){
                mthis.selectAll()
            }
            if(buttonId == 'delete_HSD'){
                mthis.deleteNode()
            }
            if(buttonId == 'addSet_HSD'){
                mthis.openCreateGroupModal()
            }
            if(buttonId == 'contentShow_PCD'){
                mthis.toContentDiv();
                
            }
            if(buttonId == 'thumShow_PTD'){
                mthis.toThumbnails()
            }
            if(buttonId == 'listShow_HD'){
                mthis.showAsList()
            }
            if(buttonId == 'defaultOrder_HD'){
                mthis.orderTimeUp()
            }
            if(buttonId == 'timeOrder_HD'){
                mthis.orderTimeDown()
            }
            if(buttonId == 'translate_TD'){
                mthis.contentTranslate()
            }
            if(buttonId == 'toNet_HSD'){
                mthis.toNet()
            }
            if(buttonId == 'cutPic_NT'){
               
            }

        },
      cutScreen(){
        // 截屏事件
      },
     
     
      clickHub(isOpen,e){
        var mthis = this;
        mthis.clearBubble(e)
        
        if(!mthis.contentAna) return;
        
        
        // if(isOpen){
          
        //   topicAnalyDiv.style.left = '240px';
        //   mthis.contentAnaWidth = document.documentElement.clientWidth * this.$store.state.split - 20 - 262 + 'px';
          
        //   mthis.openHub = false
        // }else{
          
          
        //   mthis.contentAnaWidth = document.documentElement.clientWidth * this.$store.state.split - 30  + 'px';
          
        //   mthis.openHub = true
        // }
        
      },
     
      deepClone(obj){
        let _obj = JSON.stringify(obj);
        let objClone = JSON.parse(_obj);
        return objClone
      },
      keyD(e){
        
        var mthis = this;
        if(mthis.keyCount<0){
              mthis.keyCount = 0
            }
        if(e.code != mthis.prevKdown){
            mthis.keyCount = mthis.keyCount + 1;
            mthis.prevKdown = e.code
          }
       
        if(mthis.$store.state.tmss === 'content') {
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if(e && e.keyCode == 46 && (!e.shiftKey) && (!e.altKey) && (!e.ctrlKey)){
            // delete
            mthis.deleteNode()
            mthis.clearBubble(e)
          }
          if(e.keyCode == 65 && (e.ctrlKey || e.metaKey) && (!e.shiftKey) && (!e.altKey)){
            mthis.selectAll()
            mthis.clearBubble(e)
          }
          
        }
        
        
      },
      keyU(e){
        
        var mthis = this;
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if(mthis.keyCount==1 && e && e.keyCode == 46){
            // delete
            
            mthis.clearBubble(e)
          }
          if(mthis.keyCount==2 && e.keyCode == 65 && (e.ctrlKey || e.metaKey)){
           
            mthis.clearBubble(e)
          }
        if(e.code != mthis.prevKup){
            mthis.keyCount = mthis.keyCount - 1;
            mthis.prevKup = e.code
          }
        
      },
      clearBubble(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
          } else {
            e.cancelBubble = true;
          }
          if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
          },
      getOffset(obj){
        var arr=[]
        var offsetL=0
        var offsetT=0
        while(obj!=window.document.body&&obj!=null)
        {
          offsetL+=obj.offsetLeft
          offsetT+=obj.offsetTop
          obj=obj.offsetParent
        }
        arr.push(offsetL,offsetT)
        return arr
      },
      addHover(e){
        this.clearBubble(e)
        $(e.target).find('img').addClass('imgHover')
      },
      removeHover(e){
        this.clearBubble(e)
        $(e.target).find('img').removeClass('imgHover')
      },
      
      kuangxuan(e){
        
        if(!this.showThumb) return;
        if(this.contentAna) return;
        if (e.buttons !== 1 || e.which !== 1) return;
        
        this.isSel = true;
        this.clearBubble(e);
        this.bruIds= [];
        var mthis = this;
        var selDivList = document.getElementsByClassName('docThunmsItem');
        for(let k =0;k<selDivList.length;k++){
                  $(selDivList[k]).off('mouseenter');
                  $(selDivList[k]).off('mouseleave');
                  
                }
        var selOutDiv = document.createElement("div");
        selOutDiv.id = 'selOutDiv';
        selOutDiv.style.cssText = "position:absolute;margin:0px;padding:0px;z-index:100;display:none;width:100%;height:100%;top:0;left:0;";
        var selDiv = document.createElement("div");
        selDiv.style.cssText = "position:absolute;width:0px;height:0px;font-size:0px;margin:0px;padding:0px;border:1px dashed #0099FF;background-color:rgb(51, 255, 255);z-index:999;filter:alpha(opacity:60);opacity:0.6;display:block;cursor:move;"; 
        selDiv.id = "selectDiv";
        var $selectBoxDashed = $('#selectDiv')
        // var $selectBoxDashed = $('<div class="select-box-dashed"></div>');
        $('#contentchart').append(selOutDiv);
        $('#selOutDiv').append(selDiv);
        //  设置选框的初始位置
        mthis.bruStartX= (e.x || e.clientX) ;
        mthis.bruStartY = (e.y || e.clientY) -120 ;
        // var startX = e.offsetX;
        // var startY = e.offsetY;
        
        
        selDiv.style.left = mthis.bruStartX + "px"; 
        selDiv.style.top = mthis.bruStartY  + "px"; 
      },
      kuangmove(eventMove){
        if(!this.isSel) return;
        this.isBru = true;
       
        var mthis = this;
        var selDiv = document.getElementById('selectDiv');
        var selOutDiv = document.getElementById('selOutDiv');
        var selDivList = document.getElementsByClassName('docThunmsItem');
        var _x = null;
        var _y = null;
        
        selOutDiv.style.display = 'block'
        selDiv.style.display = 'block'
        // selOutDiv.style.top = 0 
        // selOutDiv.style.left = 0 
        //  根据鼠标移动，设置选框的位置、宽高
        _x = (eventMove.x || eventMove.clientX);
        _y = (eventMove.y || eventMove.clientY) -120;
        //  暂存选框的位置及宽高，用于将 select-item 选中
        var _left = Math.min(_x, mthis.bruStartX);
        var _top = Math.min(_y, mthis.bruStartY);
        var _width = Math.abs(_x - mthis.bruStartX);
        var _height = Math.abs(_y - mthis.bruStartY);
                
        selDiv.style.left = _left + "px"; 
        selDiv.style.top =  _top + "px"; 
        selDiv.style.width = _width + "px"; 
        selDiv.style.height =  _height + "px";
                
        var _w = selDiv.offsetWidth, _h = selDiv.offsetHeight;
        var _l = mthis.getOffset(selDiv)[0];
        var _t = mthis.getOffset(selDiv)[1];
        
        for ( var i = 0; i < selDivList.length; i++) {
                  var sw =  mthis.getOffset(selDivList[i])[0];
                  var sh = mthis.getOffset(selDivList[i])[1];
                  var sl = selDivList[i].offsetWidth + sw ; 
                  var st = selDivList[i].offsetHeight + sh ; 
                  if (sl > _l && st > _t && sw < _l + _w && sh < _t + _h) {
                    
                    if($(selDivList[i]).find('img').hasClass("item-selected")){
                      continue
                    }else{
                      mthis.items[i].check = 'sel'
                      mthis.bruIds.push(mthis.items[i].id)
                      
                    }
                    
                  
                  }else{
                    
                    if($(selDivList[i]).find('img').hasClass("item-selected")){
                      mthis.items[i].check = 'def'
                      let idx = mthis.bruIds.indexOf(mthis.items[i].id)
                      mthis.bruIds.splice(idx,1)
                    }
                  }
                }
        
        this.clearBubble(eventMove)
      },
      kuangup(e){
        // if(!this.showThumb) return;
        // this.isSel = false;
        // var mthis = this;
        
        // var selDiv = document.getElementById('selectDiv');
        // var selOutDiv = document.getElementById('selOutDiv');
        // selOutDiv.style.display = 'none';
        // selDiv.style.display = 'none';
        
        // if(this.isBru){
        //   mthis.bruIds= util.unique(mthis.bruIds);
          
        //   mthis.$store.commit('setSelectContentNodes', [{
        //     ids: mthis.bruIds
        //   }])
        //   mthis.$store.commit('setContent2time',[{
        //     ids:mthis.bruIds
        //   }])
        
        //   let selDocList = mthis.items.filter(item => item.check)
        //   selDocList = selDocList.map(item =>({
        //             title: item.title,      
        //             id: item.id,
        //             time: item.time,
        //             from: item.from,     
        //           })
        //         );
        //   mthis.$store.commit('setSeletedDocAttrList',selDocList)
        //   mthis.isBru = false;
        // }
        
        // $('#selectDiv').remove();
        // $('#selOutDiv').remove();
        // this.clearBubble(e)
        // $('#contentchart').off('mousemove');
      },
    toSelIds(index,check,id,evt){
        this.clearBubble(evt)
        
        clearTimeout(timerClick);
        var mthis = this;
        
        timerClick = setTimeout(function(){
          if(check == 'def' || check == 'half-sel'){
            mthis.items[index].check = 'sel'
          }
          if(check == 'sel'){
            mthis.items[index].check = 'def'
          }
          mthis.watchSelectCounter++;
        },300)
        
        
      },
      openCreateGroupModal(){
        var mthis = this;
        this.worksetInfo = {
          title: "",
          des: "",
          id: ""
        };
        this.worksetData = [{
            type: "entity",
            data: []
          },
          {
            type: "event",
            data: []
          },
          {
            type: "document",
            data: []
          }, {
            type: "area",
            data: []
          },
        ];
        let contentIds = [];
        let checkItems = [];
        checkItems = mthis.items.filter(item => item.check == 'sel')
        if(checkItems.length ==0){
          mthis.setMessage('请至少选择一篇文章')
          return
        }
        for (let m = 0; m < checkItems.length; m++) {
          contentIds.push(checkItems[m].id)
        }
        
        if (contentIds.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/doc-detail/", {
                docIds: contentIds
              })
              .then(response => {
                if (response.body.code === 0) {
                  mthis.worksetData[2].type = "document";
                  response.body.data.map(item => {
                    item.name = item.title
                    item.img = "http://10.60.1.140/assets/images/content_node.png"
                    return item
                  })
                  mthis.worksetData[2].data = response.body.data;
                }
              });
          }
        this.worksetType = "add";
        this.worksetFlag = this.worksetFlag + 1;
      },
      setMessage(mes) {
        
        this.message = {
          text: mes,
          time: new Date().getTime()
        };
      },
      selectAll(){
        var mthis = this
        if(mthis.items.length==0){
          mthis.setMessage('该页面没有文档')
          return
        }
        let ids = []
        for(let i=0;i<mthis.items.length;i++){
          ids.push(mthis.items[i].id)
          if(mthis.items[i].check == 'sel'){
            continue
           
          }else{
             mthis.items[i].check = 'sel'
          }
        }
        mthis.watchSelectCounter++;
        // let selDocList = mthis.items.filter(item => item.check == 'sel')
        // selDocList = selDocList.map(item =>({
        //           title: item.title,      
        //           id: item.id,
        //           time: item.time,
        //           from: item.from,
        //           check:false     
        //         })
        //       );
       
       
        // mthis.$store.commit('setSelectContentNodes', [{
        //   ids: ids
        // }])
        // mthis.$store.commit('setContent2time',[{
        //     ids:ids
        //   }])
        // mthis.$store.commit('setSeletedDocAttrList',selDocList)
          
        mthis.prevItems = mthis.deepClone(mthis.items)
        // let disselectDom = $('.contentDiv:not(.item-selected)')
        // disselectDom.addClass('item-selected')
        // this.watchSelectCounter++;
        
      },
      rightMenu(e){
        // var mthis = this
        
        // let that = e.target
        // if(that.tagName == "P"){
        //   that = that.parentNode
        // }else{
        //   that = that
        // }
        
        // if($(that).hasClass('item-selected')){
        //   return true
        // }else{
        //   $(that).addClass('item-selected')
        //   mthis.watchSelectCounter++;
        // }
      },
      
      deleteNode(){
        var mthis = this
        mthis.items =  mthis.items.filter(item => item.check == 'def')
        mthis.prevItems = mthis.deepClone(mthis.items)
        mthis.$store.commit('setSelectContentNodes', [{
          ids: []
        }])
        mthis.$store.commit('setContent2time',[{
          ids:[]
        }])
        mthis.$store.commit('setSeletedDocAttrList',[])
        
      },

      //无限滚动加载触发方法
      infiniteHandler($state) {
      setTimeout(() => {
        const temp = [];
        for (let i = this.list.length + 1; i <= this.list.length + 20; i++) {
          temp.push(i);
        }
        this.list = this.list.concat(temp);
        $state.loaded();
      }, 1000);
    },

      selectThis(id) {
        var mthis = this
        let index = 0;
        let selIds = mthis.selectContentNodes[0].ids;
        for(let i=0;i<mthis.items.length;i++){
          if(mthis.items[i].id == id){
            index = i;
            if(mthis.items[i].check == false){
              selIds.push(id)
              mthis.items[i].check = true
              mthis.$store.commit('setSelectContentNodes', [{
                ids: selIds
              }])
              mthis.$store.commit('setContent2time',[{
                ids:[]
              }])
            }else{
              
            }
          }
        }
        let selDocList = mthis.items.filter(item => item.check)
        selDocList = selDocList.map(item =>({
                  title: item.title,      
                  id: item.id,
                  time: item.time,
                  from: item.from,
                  check:false     
                })
              );
        mthis.$store.commit('setSeletedDocAttrList',selDocList)
        mthis.prevItems = mthis.deepClone(mthis.items)
      },
      fanxuan() {
        // document.getElementsByClassName("box");
        var mthis = this
        for(let i=0;i<this.items.length;i++){
          mthis.items[i].check = !mthis.items[i].check
        }
        mthis.prevItems = mthis.deepClone(mthis.items)
        let selectList = []
        let selectContent = this.items.filter(item => item.check)
        for(let i=0;i<selectContent.length;i++){
          selectList.push(selectContent[i].id)
        }
        mthis.$store.commit('setSelectContentNodes', [{
          ids: selectList
        }])
        mthis.$store.commit('setContent2time',[{
            ids:selectList
          }])
        let selDocList = []
        selDocList = selectContent.map(item =>({
                  title: item.title,      
                  id: item.id,
                  time: item.time,
                  from: item.from,
                  check:false     
                })
              );
        mthis.$store.commit('setSeletedDocAttrList',selDocList)
      },
      removeAll() {
        
        this.items = []
        this.prevItems = this.deepClone(this.items)
        // this.watchSelectCounter++;
        this.page = 1;
        this.$store.commit('setSelectContentNodes', [{
          ids: []
        }])
        this.$store.commit('setContent2time',[{
            ids:[]
          }])
        this.$store.commit('setSeletedDocAttrList',[])
        // this.$store.commit('setSelectContentNodes',[])
      },
      alertNotice(titleStr, nodesc) {
        this.$Notice.open({
          title: titleStr,
          desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        });
      },
      toNet() {
        
        let selectList = this.items.filter(item => item.check)
        
        let infos = []
        for (let m = 0; m < selectList.length; m++) {
          infos.push({
            id: selectList[m].id,
            entity_type: 'content',
            img: '',
            name: [...selectList[m].title].length > 20 ? selectList[m].title.substring(0, 19) + '...' : selectList[m].title,
            label: selectList[m].title,
            loaded: true
          })
        }
        this.$store.commit('setContentToNetData', {
          "nodes": infos
        })
        this.$store.commit('changeTMSS', 'net')
      },
      
      toThumbnails(){
        this.showList = false
        this.showThumb = true
        this.colLgNum = 3
        // this.colOfset = 1
        this.colSmnum = 6
        this.colMdNum= 4
       
      },
      contentTranslate() {
        var mthis = this;
        
        
          var oldEle = document.getElementById('translatedDiv');
        if (oldEle !== null) {
          oldEle.parentElement.removeChild(oldEle);
          var contentDiv = document.getElementById('contentInfo');
          contentDiv.style.width = '100%';
          contentDiv.style.float = 'none';
          contentDiv.style.display = 'block';
          contentDiv.style.borderRight = 'none';
          mthis.changeButtonParam[0].status = 'focus'
        
          return
        }
        var contentId = document.getElementById('contentInfo').value;
        
        //contentDiv.parentElement.appendChild()10.60.1.141:5100/translate/?id=5c6ce61e9c2b888d83ba7e23
        let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url+"/translate/?id=" + contentId, {
              emulateJSON: true
            })
            .then(response => {
              var contentDiv = document.getElementById('contentInfo');
              contentDiv.style.width = '50%';
              contentDiv.style.float = 'left';
              contentDiv.style.display = 'inline';
              contentDiv.style.borderRight = '2px #366674 solid';
              var data = response.body.data;
              var translatedTitle = data.title_translate;
              var translatedTime = $('#contentsTime').html()
              // var translatedTime = util.transformPHPTimeMS(data.time);
              var translatedText = data.text;
              var translatedHtml = /* "<div  id='translateContentInfo' class='scrollBarAble' style='height: 607px; overflow-y: scroll; width: 50%; border-right: 2px solid rgb(54, 102, 116);'>" */
                "<h2 id='translateContentsTitle'class='contentInfoTitle'>" + translatedTitle +
                "</h2> <p id='translateContentsTime' class='contentInfoTime'>" + translatedTime +
                "</p><p style='margin: 30px;'><span id='translateContents'>" + translatedText + "</span>";
              var translatedDiv = document.createElement('div');
              translatedDiv.id = 'translatedDiv';
              // translatedDiv.class = 'scrollBarAble';
              translatedDiv.style = "overflow-y: scroll;width: 50%;";
              translatedDiv.style.height = contentDiv.style.height;
              translatedDiv.innerHTML = translatedHtml;
              contentDiv.parentElement.appendChild(translatedDiv);
              $('#translatedDiv').addClass('scrollBarAble');
              
              mthis.changeButtonParam[0].status = 'unFocus'
              
            }) 
            
        
        
        
      },
      orderTimeUp() {
        var mthis = this
        mthis.items = mthis.deepClone(mthis.prevItems)
        
      },
      orderTimeDown() {
        var mthis = this
        
        let hasTime = mthis.items.filter(item => item.time);
        let noTime = mthis.items.filter(item => !item.time);
        
        for(var i=0;i<hasTime.length-1;i++){
          for(var j=0;j<hasTime.length-1-i;j++){
            
            if(Date.parse(hasTime[j]['time']) < Date.parse(hasTime[j+1]['time'])){
              var temp = hasTime[j];
              hasTime[j] = hasTime[j + 1];
              hasTime[j + 1] = temp;
            }
          }
        }
        if(noTime.length>0){
          mthis.items = hasTime.concat(noTime)
        }else{
          mthis.items = hasTime
        }
        
        // mthis.$forceUpdate()
        
      },
      showAlert(index) {
        // if ($(this).hasClass('selected'))
        // alert(index)
        // this.items[index].check = true
      },
      orderDefalut() {
        var mthis = this
        mthis.order = ''
        mthis.page = 1
        return new Promise(resolve => {
          if (mthis.contentTimeCondition.length === 2) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[1])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val+ '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据7', true)
              }
              resolve();
            })
          } else if (mthis.contentTimeCondition.length === 1) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[0])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据8', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据9', true)
              }
              resolve();
            })
          }
        });
      },
      handleReachBottom(){
        var mthis = this;
        
        mthis.page = mthis.page + 1;
        if(mthis.moreLoading){
          mthis.$http.get(mthis.$store.state.ipConfig.api_url+'/context-by-text/?page='+mthis.page+'&query='+mthis.searchContentResult.val+mthis.order).then(response =>{
            if(response.body.code ==0 ){
              if(response.body.data.length >0){
                let nowItems = []
                nowItems = response.body.data.map(item =>({
                    title: item.title,      
                    i_sn: item.i_sn, 
                    id: item.id,
                    text: item.description,
                    time: item.time,
                    from: item.from,     
                    img: "http://10.60.1.140/assets/images/content_node.png",
                    check:'def'
                  })
                );
                mthis.items = mthis.items.concat(nowItems);
                mthis.prevItems = mthis.deepClone(mthis.items);
                if(nowItems.length<48){
                  mthis.moreLoading = false
                  mthis.setMessage('文档已经全部加载')
                }
              }
            }
          })
        }
      },
      // handleReachBottom() {
      //   var mthis = this
      //   mthis.page = mthis.page + 1
      //   if(mthis.moreLoading){
      //     return new Promise(resolve => {
      //     if (mthis.contentTimeCondition.length === 2) {
      //       let stime = util.getTimestamp(mthis.contentTimeCondition[0])
      //       let etime = util.getTimestamp(mthis.contentTimeCondition[1])
      //       mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
      //         if (response.body.data.length > 0) {
                
      //           $('.item-selected').removeClass('item-selected')
                
      //           mthis.items = mthis.items.concat(response.body.data)
      //         } else {
      //           mthis.alertNotice('无匹配数据10', true)
      //         }
      //         resolve();
      //       })
      //     } else if (mthis.contentTimeCondition.length === 1) {
      //       let stime = util.getTimestamp(mthis.contentTimeCondition[0])
      //       let etime = util.getTimestamp(mthis.contentTimeCondition[0])
      //       mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
      //         if (response.body.data.length > 0) {
                
      //           $('.item-selected').removeClass('item-selected')
                
      //           mthis.items = mthis.items.concat(response.body.data)
      //         } else {
      //           mthis.alertNotice('无匹配数据11', true)
      //         }
      //         resolve();
      //       })
      //     } else {
      //       let nowItems = []
      //       mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult.val + mthis.order).then(response => {
      //         if (response.body.data.length > 0) {
      //           nowItems = response.body.data.map(item =>({
      //             title: item.title,      
      //             i_sn: item.i_sn, 
      //             id: item.id,
      //             text: item.description,
      //             time: item.time,
      //             from: item.from,     
      //             img: "http://10.60.1.140/assets/images/content_node.png",
      //             check:false
      //           })
      //         );
              
      //           // $('.item-selected').removeClass('item-selected')
                
      //           mthis.items = mthis.items.concat(nowItems)
                
      //           mthis.prevItems = mthis.deepClone(mthis.items)
      //         } else {
                
      //           // $('.layer').show().delay(3000).fadeOut()
      //           mthis.setMessage('文档已经全部加载')
      //           mthis.moreLoading = false
                
      //           // mthis.alertNotice('已全部加载', true)
                
      //         }
      //         resolve();
      //       })
      //     }
      //   });
        

      //   }
      //   // mthis.moreLoading = true
        
        
      // },
      hideContentDiv(flag){
        var mthis = this
        
        mthis.ifhasSel = mthis.prevIfhasSel;
        
        if(flag ==1){
          mthis.ifInfo = false
          mthis.$store.state.contentSelShowFlag = false
          let selData = {}
          selData.id = [];
          selData.title = ''
          
          mthis.$store.commit('setContentSelData',selData)
          if(!mthis.showThumb){
            mthis.toContentDiv()
            mthis.changeButtonParam = [
              {
                'id_suf':'HD',
                'isUse' : true
              },
              {
                'id_suf':'HSD',
                'isUse' : mthis.prevIfhasSel
              },
              {
                'id_suf':'TD',
                'isUse':false
              },
              {
                'id_suf':'PTD',
                'isUse':true
              },
              {
                'id_suf':'PCD',
                'isUse':false
              }
            ]
        
          }
        }
        mthis.$store.commit('setShowDocTime',true)
        
      },
      toContentDiv() {
        
        this.colLgNum = 4
        this.colSmnum = 8
        this.colMdNum = 6
        
        this.showList = false
        this.showThumb = false
        this.ifInfo = false
        this.contentAna = false
        var oldEle = document.getElementById('translatedDiv');
        if (oldEle !== null) {
          oldEle.parentElement.removeChild(oldEle);
          var contentDiv = document.getElementById('contentInfo');
          contentDiv.style.width = 'auto';
          contentDiv.style.float = 'none';
          contentDiv.style.display = 'none';
          contentDiv.style.borderRight = 'none';
        }
        // this.$store.state.contentSelShowFlag = false
        // let selData = {}
        // selData.id = [];
        // selData.title = ''
        
        // this.$store.commit('setContentSelData',selData)
        // document.getElementById('contents').innerHTML = ''
        // document.getElementById('contentsTitle').innerHTML = ''
        // document.getElementById('contentsTime').innerHTML = ''
      },
      jiazai(){
        
        var mthis= this
       
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function() {
          
          while($('#jiazaiDiv').offset().top < 800){
            
            mthis.handleReachBottom()
            
            break;
          }
        }, 500);
      },
      scrollBottom() {
        // alert('ssss')
        // 滚动到页面底部时，请求前一天的文章内容
        if (((window.screen.height + document.body.scrollTop) > (document.body.clientHeight)) && this.REQUIRE) {
          // 请求的数据未加载完成时，滚动到底部不再请求前一天的数据
          this.REQUIRE = false;
          this.loading = true;
          this.tips = '努力加载中...';
          //   axios.get('http://zhihuapi.herokuapp.com/api/4/news/before/' + this.todayDate).then((res) => {
          //     this.newsList.push(res.data['stories']);
          //   this.date.push(res.data['date']);
          //   this.todayDate = res.data['date'];
          //   // 请求的数据加载完成后，再次滚动到底部时，允许请求前一天数据
          //   this.$nextTick(() => {
          //     this.REQUIRE = true;
          //     this.loading = false;
          //   });
          // }).catch(() => {
          //     this.tips = '连接失败，请稍后重试';
          //   // 请求失败时，将 REQUIRE 置为 true，滚动到底部时，再次请求
          //   this.REQUIRE = true;
          // });
        }
      },
      
      
      
      showContent(id,title) {
        clearTimeout(timerClick);
        var mthis = this
       
        mthis.prevIfhasSel = mthis.ifhasSel;
        
        mthis.$store.state.contentSelShowFlag = true
        let selData = {}
        selData.id = [id];
        selData.title = title
        
        mthis.$store.commit('setContentSelData',selData)
        
        
        mthis.ifInfo = true
        
        mthis.changeButtonParam=[
          {
            'id_suf':'TD',
            'isUse':true,
            'type':'state',
            'status':'focus'
          },
          {
            'id_suf' :'HD',
            'isUse':false
          },
          {
            'id_suf' :'HSD',
            'isUse':false
          },
          {
            'id_suf':'PCD',
            'isUse':false
          },
          {
            'id_suf':'PTD',
            'isUse':false
          }
        ]
          
          
        
        //  mock.get("/getContentInfo",{id:id}).then(function(res) {
        //   // 获取文本数据
        //   document.getElementById('contents').innerHTML = res.data.contents
        //   document.getElementById('contentsTitle').innerHTML = res.data.title
        //   document.getElementById('contentsTime').innerHTML = res.data.time
        // });
        mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-id/?idValue=' + id).then(response => {
          // mthis.printer(response.body.data[0].text, 'contents', 'pointer')
         
          document.getElementById('contentInfo').value = response.body.data[0].id;
          var text = response.body.data[0].description.replace(/(\r\n)|(\n)/g, '<br>');
          document.getElementById('contents').innerHTML = text
          document.getElementById('contentsTitle').innerHTML = response.body.data[0].title
          document.getElementById('contentsTime').innerHTML = response.body.data[0].from + ((response.body.data[0].from !== '' && response.body.data[0].from !== undefined) ? '  |  ' : '') + response.body.data[0].time
          // mthis.dataexpand = response.body.data
          // mthis.singlePerson = (opt[1]>1)?false:true
        })
        
      },
      risize(){
        
      },
      /* printer(text,contentid,pointerid){ 
          var l = text.length;
          var t = 0;
          var arr = [];    
          for(var i = 0; i < l; i++){    
          arr[i] = text.substr(i,1);    
          } 
          var contentId = "#" + contentid;
          var pointerId = "#" + pointerid;
         // var pointerInit = setInterval(function(){ $(pointerId).fadeOut(100).fadeIn(100); },300); 
          var init = setInterval(function(){
          if(t < l){    
              $(contentId).append(arr[t]);
              if((t!==(l-1))&&(t%8==7)){
                  //$(contentId).append('<br/>');
              }    
              t++;    
              }else{
            clearInterval(init); 
            //clearInterval(pointerInit);           
              }
      },10);
              
      } */
    },
    created() {
      // var mthis = this
      //  mock.get("/getContent").then(function(res) {
      //   // 获取文本数据
      //   mthis.items = res.data.data
      // });
      // window.addEventListener('scroll', this.scrollBottom)
    },
    mounted() {
      var mthis = this
      mthis.contentAnaWidth = document.documentElement.clientWidth * this.$store.state.split - 20 - 262 + 'px'
      
      let wwWidth = document.documentElement.clientWidth * this.$store.state.split - 20
      
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      // mthis.netheight = useHeight * 0.8 - 55 + "px";
      mthis.netheightdiv = useHeight * 0.8 + "px";
      mthis.ContentHeight = useHeight * 0.8 - 68-1 + "px";
      
      
      // let divBox = document.getElementById('contentchart')
      

      // if(mthis.$route.query.content !== undefined && mthis.$route.query.content!==null && mthis.$route.query.content !== ''){
        //   // 跳转过来的
      //   mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query='+ mthis.$route.query.content).then(response => {
        //     mthis.items = response.body.data
      //     // mthis.dataexpand = response.body.data
      //     // mthis.singlePerson = (opt[1]>1)?false:true
      //   })
      // }
      window.px = "";
      window.py = "";
      window.divLength = 0;
      // document.onclick = function(){
      //   if(!mthis.showAllDocCount) return;
      //   $('.allTitle').css('display','none');
      // }
      // console.log(document.getElementById('content'))
      document.onmouseup = function(e){
        
        if(!mthis.showThumb) return;
        if(mthis.contentAna) return;
        if(mthis.$store.state.tmss !== 'content') return;
        if(mthis.isSel){
           mthis.isSel = false;
            var selDiv = document.getElementById('selectDiv');
            var selOutDiv = document.getElementById('selOutDiv');
            selOutDiv.style.display = 'none';
            selDiv.style.display = 'none';
            
            if(mthis.isBru){
              mthis.bruIds= util.unique(mthis.bruIds);
              
              mthis.$store.commit('setSelectContentNodes', [{
                ids: mthis.bruIds
              }])
              mthis.$store.commit('setContent2time',[{
                ids:mthis.bruIds
              }])
            
              let selDocList = mthis.items.filter(item => item.check == 'sel')
             
              selDocList = selDocList.map(item =>({
                        title: item.title,      
                        id: item.id,
                        time: item.time,
                        from: item.from,
                        check:false     
                      })
                    );
              mthis.$store.commit('setSeletedDocAttrList',selDocList)
              mthis.isBru = false;
            }
            
            $('#selectDiv').remove();
            $('#selOutDiv').remove();
            mthis.clearBubble(e)
            $('#contentchart').off('mousemove');
        }else{
          return
        }
       
      }
      
    }
  };
</script>
<style>
  .ivu-scroll-container {
    height: auto !important;
  }
  .top,
  .bottom {
    text-align: center;
  }
  .contentDiv {
    max-height: 255px;
    padding: 5px 15px 5px 15px;
    /* overflow: hidden; */
    background: rgba(51, 255, 255, 0.1);
    margin: 10px;
    /* 右角标 */
    /* background: linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.2) 0); */
    padding-top: 20px;
    cursor: pointer;
    /* 自定义鼠标样式
        cursor:url(url图片地址) */
  }
  .contentDiv:hover {
    /* 右角标 */
    /* background: linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.3) 0); */
    animation: all 1s;
    -webkit-animation: all 1s;
    /* transform:translate(5px,5px); */
    /* -webkit-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    -moz-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5); */
    background-color: rgba(51,255,255,0.2);
  }
  .half-select{
    background-color: rgba(51,255,255,0.3) !important;
  }
  .defContent{
    background-color: rgba(51,255,255,0.1);
  }
  /* 角标折角 */
  /* .contentDiv ::before {
                content: "";
                position: absolute;
                top: 20px;
                right: 20px;
                border-width: 0 16px 16px 0;
                border-style: solid;
                border-color: rgba(0, 0, 0, 0) rgba(0, 0, 0, 0) rgba(51, 255, 255, 0.5) rgba(51, 255, 255, 0.5);
                background: rgba(51, 255, 255, 0.5);
                display: block;
                width: 0;
                background: linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.4) 0);
                -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);
                -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);
                box-shadow: 0 1px 1px rgba(0, 0, 0, 0.3), -1px 1px 1px rgba(0, 0, 0, 0.2);
              } */
  .contentTitle {
    /* padding: 0 25px 0 5px; */
    text-align: left;
    color: #ccffff;
    cursor: pointer;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    letter-spacing: 0px;
    max-height: 32px;
    height: 32px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    width: 95%;
  }
  .contentText {
    text-align: start;
    padding: 5 5px 0px 5px;
    height: 100px;
    max-height: 100px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
    overflow: hidden;
    text-overflow: ellipsis;
    line-height: 19px !important;
  }
  .contentTime {
    text-align: left;
    padding: 0 5px 5px 5px;
    height: 35px;
    font-family: PARaDOS;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0.5;
  }
  .contentInfoTitle {
    margin-top: 20px;
    margin-bottom: 20px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    width: 100%;
    text-align: center;
  }
  .contentInfoTime {
    text-align: center;
    padding: 0 5px 5px 5px;
    height: 35px;
    font-family: PARaDOS;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    opacity: 0.5;
  }
  .contentInfoText {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.8;
  }
  .contentInfoPeople {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #009999;
    opacity: 0.8;
  }
  .contentInfoPlace {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #cc6666;
    opacity: 0.8;
  }
  #contents,
  #translateContents {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.8;
    line-height: 24px;
  }
  .more:hover {
    cursor: pointer;
    color: rgba(51, 255, 255, 0.8) !important;
    transition: all 1s;
    background: -webkit-linear-gradient( 8deg, rgba(0, 0, 0, 0) 0%, rgba(51, 255, 255, 0.2) 40%, rgba(51, 255, 255, 0.3) 50%, rgba(51, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0) 100%);
    /* Safari 5.1 - 6 */
    background: -o-linear-gradient( 8deg, rgba(0, 0, 0, 0) 0%, rgba(51, 255, 255, 0.2) 40%, rgba(51, 255, 255, 0.3) 50%, rgba(51, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0) 100%);
    /* Opera 11.1 - 12*/
    background: -moz-linear-gradient( 8deg, rgba(0, 0, 0, 0) 0%, rgba(51, 255, 255, 0.2) 40%, rgba(51, 255, 255, 0.3) 50%, rgba(51, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0) 100%);
    /* Firefox 3.6 - 15*/
    background: linear-gradient( 8deg, rgba(0, 0, 0, 0) 0%, rgba(51, 255, 255, 0.2) 40%, rgba(51, 255, 255, 0.3) 50%, rgba(51, 255, 255, 0.2) 60%, rgba(0, 0, 0, 0) 100%);
    /* 标准的语法 */
  }
  .ivu-radio-wrapper{
    color:#ccffff !important;
  }
  .ivu-radio-wrapper-checked{
    color:rgba(51,255,255,1) !important;
  }
  .ivu-radio-inner{
    background-color: rgba(51,255,255,0) !important;
    border: 1px solid rgba(51,255,255,0.4) !important;
  }
  .ivu-radio-inner:after{
    background-color:rgba(51,255,255,1) !important;
    border: 1px solid rgba(51,255,255,1) !important;
  }
  .ivu-radio-inner:hover{
    background-color: rgba(51,255,255,0) !important;
    border: 1px solid rgba(51,255,255,1) !important;
  }
  .ivu-radio-checked  .ivu-radio-inner:after{
    background-color:rgba(51,255,255,1) !important;
  }
  .ivu-dropdown-rel>a{
    color:#ccffff;
  }
  .ivu-dropdown-rel>a:hover{
    color:#33ffff;
  }
  .ivu-dropdown-rel>a:hover .ivu-icon-ios-arrow-down:before{
    content: url('http://10.60.1.140/assets/images/keyownhover.png') !important;
    
  }
  .ivu-icon-ios-arrow-down:before {
    content: url('http://10.60.1.140/assets/images/keyown.png') !important;
  }
  #topicAnaly .ivu-dropdown-item{
    padding-left:10px !important;
  }
  .ivu-table{
    background-color: rgba(0, 0, 0, 0.8) !important;
    
  }
  
  
  .ivu-table-header th{
    background-color: #212c31 !important;
    color:#ccffff;
    font-weight: bold;
    border-color: #2a6464 !important;
  }
  .ivu-table-fixed-header th{
    background-color: #212c31 !important;
    color:#ccffff;
    font-weight: bold;
    border-color: #2a6464 !important;
   
  }
  .ivu-table-tbody .ivu-table-row .ivu-table-cell{
    white-space: nowrap;
    overflow-x: scroll;
  }
  .ivu-table td{
    background-color:rgba(0, 0, 0, 0.8) !important;
    color:#ccffff;
    border-color: #2a6464 !important;
  }
  .ivu-table-row-hover td {
      background-color: rgba(65, 252, 252, 0.4) !important;
      color:#668c8e;
      
    }
  /* .ivu-table-wrapper {
      border: none !important;
    }
    .ivu-table:before{background-color:none;}
    .ivu-table:after{background-color:none;} */

</style>
<style scoped>
  
  .button-custom{
    cursor: pointer;
    color: rgba(51, 255, 255, 0.6) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }
  .zindex99 {
    z-index: 99
  }
  .contentItem:hover .hoverStyle {
    opacity: 1;
    color: rgba(51, 255, 255, 0.2);
  }
  .contentItem:hover .icon-right {
    opacity: 1;
    color: #ccffff;
  }
  .select-box-container {
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
  }
  .select-box-container .toggle-all-container {
    margin-bottom: 25px;
  }
  /* .select-item {
                        display: inline-block;
                        width: 100px;
                        height: 100px;
                        text-align: center;
                        line-height: 100px;
                        font-size: 12px;
                        border: 1px solid #ccc;
                        margin-right: 10px;
                        margin-bottom: 10px;
                        cursor: pointer;
                    } */
  .select-item {
    border: 1px solid rgba(51, 255, 255, 0);
  }
  .item-selected {
    animation: all 1s;
    -webkit-animation: all 1s;
    background-color: rgba(51, 255, 255, 0.4) !important;
    /* background-color: pink; */
    border: 1px solid rgba(51, 255, 255, 0.5);
  }
  .temp-selected {
    background-color: rgba(51, 255, 255, 0.2);
  }
  /* .select-item.item-selected,
            .select-item.temp-selected {
              background-color: rgba(51, 255, 255, 0.2);
            } */
  #select-box-dashed {
    position: absolute;
    display: none;
    width: 0px;
    height: 0px;
    padding: 0px;
    margin: 0px;
    border: 1px solid #0099ff;
    /* background-color: rgb(51, 255, 255); */
    background-color: pink !important;
    opacity: 0.6;
    filter: alpha(opacity=60);
    font-size: 0px;
    z-index: 9999;
    pointer-events: none;
  }
  .marked {
    /* border: 1px solid rgba(51, 255, 255, 0.8); */
    animation: all 1s;
    -webkit-animation: all 1s;
    background-color: rgba(51, 255, 255, 0.4);
    /* background-color: pink; */
    border: 1px solid rgba(51, 255, 255, 0.5);
  }
  .markImg{
    background-color: #003333;
	  border: solid 1px #ccffff;
  }
  .contentItem {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 12px;
    left: 12px;
    width: 15px;
    height: 15px;
  }
  .contentItem:hover {
    opacity: 1;
    cursor: pointer;
  }
  .color255-back {
    color: rgba(51, 255, 255, 0.1);
    background-color: rgba(51, 255, 255, 0);
  }
  .item-selected+.contentItem>.color255-back {
    color: rgba(51, 255, 255, 0.3);
  }
  .color255 {
    color: rgba(51, 255, 255, 0.1);
  }
  .item-selected+.contentItem>.color255 {
    color: rgba(204, 255, 255, 1);
  }
  .top {
    padding: 10px;
    background: rgba(0, 153, 229, .7);
    color: #fff;
    text-align: center;
    border-radius: 2px;
  }
  .showContentButton {
    position: absolute;
    top: 31px;
    right: 15px;
  }
  .deg180 {
    transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    /* IE 9 */
    -moz-transform: rotate(180deg);
    /* Firefox */
    -webkit-transform: rotate(180deg);
    /* Safari 和 Chrome */
    -o-transform: rotate(180deg);
    /* Opera */
    position: absolute;
    top: -5px;
    left: -4px;
  }
  .lightUp {
    /* color: #ccffff; */
    /* color:#cc6666; */
    cursor: pointer;
    color: rgba(51, 255, 255, 1) !important;
  }
  /* .layer{
    width:200px;
    height:30px;
    text-align: center;
    line-height: 30px;
    animation: all 1s;
    -webkit-animation: all 1s;
    font-family: MicrosoftYaHei;
   
    font-weight: bold;
    color:#ccffff;
    background-color: rgba(51, 255, 255, 0.4);
    
    border: 1px solid rgba(51, 255, 255, 0.5);
    display: none;
    border-radius: 10px;
    margin-bottom: 10px;
    position: absolute;
    font-size: 18px;
    right: 20px;
    bottom:30px;
  } */

.xuanfuAlert {
    /* background-color: rgba(51, 255, 255, 0.3); */
    position: absolute;
    color: #ccffff;
    top: 8px;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    text-align: center;
  }
  .mybox-leave-active,
  .mybox-enter-active {
    transition: all 2s ease;
  }
  .mybox-leave-active,
  .mybox-enter {
    opacity: 0;
  }
  .mybox-leave,
  .mybox-enter-active {
    opacity: 1;
  }
  .picsize{
    max-width:50px;
    max-height:70px;
    width:100%;
    
    
  }
  .nametext{
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow-x: hidden;
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 30px; */
    letter-spacing: 0px;
    color: #ccffff;
    max-width:70px;
    margin-left: 3em;
  }
  
  .imgHover{
    /* background-color:rgba(51, 255, 255, 1); */
    cursor:pointer;
    background-color: #003333;
	  border: solid 1px #336666;
    
  }
  .markedImg{
    background-color: #003333;
	  border: solid 2px #ccffff;
  }

  .topItem{
    border:'1px solid #336666';
    /* margin:0px 0px 1em 0.8em; */
    margin-bottom:10px;
    font-family: MicrosoftYaHei;
    
  }
  .itemEmpty{
    margin-bottom:10px;
  }
  .topItem .itemHeader{
    color:rgba(51,255,255,0.4);
  }
  .bigNumber{
    width:19px;
    height:19px;
    background-color: #cc3333;
	  border-radius: 3px;
    text-align: center;
  }
  .number{
    width:19px;
    height:19px;
    background-color:rgba(51,255,255,0.3);
    border-radius: 3px;
    
    text-align: center;
  }
  .itemHeader .headerTitle{
    font-size:14px;
    color:rgba(51, 255, 255, 0.4);
    font-size: 16px;
    align-items: center;
  }
  .itemHeader .docAnaTitle{
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
    /* width:70%;
    max-width: 70%; */
    
  }
  .itemHeader .headerTitle:hover{
    color:rgba(51, 255, 255, 1);
    cursor:pointer;
  }
  .itemTitle{
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
    width:200px;
    max-width: 200px;
  }
  .itemFrom{
    text-overflow:ellipsis;
    white-space: nowrap;
    overflow:hidden;
  }
  .delB{
        width: 50px;
        height: 26px;
        
        background-color:rgba(51,255,255,0.5) !important;
        border-radius: 5px;
        
        font-family: MicrosoftYaHei;
	      font-size: 12px;
        color:rgba(204,255,255,1);
        line-height: 26px;
        text-align: center;
        cursor: pointer;
        margin-left:10px;
    }
    .delB:hover{
        /* color:rgba(204,255,255,1) !important; */
        /* color: #ccffff !important; */
        background-color:rgba(51,255,255,0.6) !important;
    }
    .allTitle{
      position:absolute;
      z-index:99;
      border:solid 1px #336666;
      border-radius:10px;
      background-color:black;
      padding:10px 0px 0px 10px;
      max-height:300px;
      min-height:80px;
      overflow-y:scroll;
      /* transition:all 0.8s ease; */
    }
    .animaTopItem{
      transition:all 0.8s ease;
      /* transition:width 0.7s ease; */
    }
    #topicAnaly .ivu-dropdown-item {
      padding-left: 10px !important;
      color: rgba(51,255,255,0.4);
      line-height: 26px;
    }
    #topicAnaly .ivu-dropdown-item:hover {
      color: rgba(51,255,255,1);
    }
    /* .textTitle:hover{
      background-color: rgba(51, 255, 255, 0.2);
    } */
    .topTran-item{
      display: flex;
      flex-flow:row wrap;
      justify-content:space-around;
      width:100%;
      padding:5px 0px 0px 5px;
    }
    .topTran-enter-active, .topTran-leave-active {
      transition: all 1s;
    }
    .topTran-enter, .topTran-leave-to
    /* .list-leave-active for below version 2.1.8 */ {
      opacity: 0;
      transform: translateY(320px);
    }
</style>