<template>
  <div id='demo' :style="{height:netheightdiv}" tabindex="1" @keydown="keyD" style="outline:none;">
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px',border:'solid 1px #336666'}">
      <div class='divStyle'>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="removeAll">
            <Icon class="icon iconfont icon-qingchu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">清空</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='fanxuan'>
            <Icon class="icon iconfont icon-fanxuan DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">反选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="selectAll">
            <Icon class="icon iconfont icon-quanxuan DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">全选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="deleteNode()"> 
            <Icon class="icon iconfont icon-delete-name DVSL-bar-btn-new DVSL-bar-btn-back" size="26" ></Icon>
            <p class="img-content">删除</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="openCreateGroupModal">
            <Icon class="icon iconfont icon-add DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">创建集合</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='toContentDiv'>
            <Icon class="icon iconfont icon-zhaiyaotu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">摘要图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="toThumbnails">
            <Icon class="icon iconfont icon-suolvetu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">缩略图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='showAsList'>
            <Icon class="icon iconfont icon-liebiaotu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">列表图</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='orderTimeUp'>
            <Icon class="icon iconfont icon-paixu--guanlian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">相关性排序</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='orderTimeDown'>
            <Icon class="icon iconfont icon-paixu--shijian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">时间排序</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-custom" @click='contentTranslate'>
            <Icon class="icon iconfont icon-selection-box" size="26"  :class="(translateButton)?'lightUp':''" ></Icon>
            <p class="img-content"  :class="(translateButton)?'lightUp':''">翻译</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-custom" @click="showContentAna">
            <Icon class="icon iconfont icon-selection-box" size="26" :class="(analysisButton)?'lightUp':''"></Icon>
            <p class="img-content" :class="(analysisButton)?'lightUp':''">分析</p>
          </div>
        </Tooltip>
        <!-- <div class="divSplitLine"></div> -->
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="toNet">
            <Icon class="icon iconfont icon-tuisongzhiwangluo  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">网络</p>
          </div>
        </Tooltip>
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-tuisongzhikongjian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">空间</p>
          </div>
        </Tooltip> -->
      </div>
    </div>
    <div :style="{borderRight:'solid 1px #336666',borderLeft:'solid 1px #336666',borderBottom:'solid 1px #336666',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}" id='containerDiv'>
      <div :style="{margin:'0,5px'}">
        <div v-show="!showList">
          <Scroll :on-reach-bottom="handleReachBottom" v-show='!ifInfo && !contentAna' :height=ContentHeight>
            <div id='spin' v-if="spinShow" :style="{position:'absolute',height:ContentHeight,zIndex: 98,width:'100%'}">
              <Spin size="large" fix v-if="spinShow">
                <Icon type="ios-loading" size=18 class="demo-spin-icon-load"></Icon>
                <div>Loading</div>
              </Spin>
            </div>
          
            <div id="contentchart" class="scrollBarAble" @mousewheel="jiazai" aria-autocomplete="true" :style="{height:ContentHeight}"
             @mousedown='kuangxuan' @mousemove="kuangmove" @mouseup="kuangup">
              <Row type="flex" justify="start">

                <Col :sm="colSmnum" :lg="colLgNum" :md='colMdNum' align="middle" class-name="outCol" v-for="(item,index) in items" :key="index">
                <!-- <div v-show="showThumb" :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}"> -->
                  <div v-show="showThumb" style="text-align: center;padding:10px 0px;margin:5px 10px;width:150px;" class="docThunmsItem" :title="item.title"  :id="item.id" @click='toSelIds(index,item.check,item.id,$event)' 
                  @dblclick="showContent(item.id,item.title)" @mousedown='clearBubble' @mouseup='clearBubble' @mousemove='clearBubble'
                  @mouseenter="addHover" @mouseleave="removeHover">
                   
                      <img :src='item.img' class="picsize" :class="(item.check)?'item-selected':''" >
                      <p class='nametext' ref='docP'>{{item.title}}</p>
                   
                  </div>
                <!-- </div> -->
                <div>
                  <div v-show='!showThumb' class="contentDiv fileDiv select-item" :class="(item.check)?'item-selected':''" :id="item.id" :title="item.title" 
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
          <!-- 文档内容分析词云图 -->
          <div id = "contentWordCloud" class="scrollBarAble" v-show='contentAna' :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}" style='z-index:100'>
            <!-- <i-button type='info' size="large" :style="{position:'absolute',left:'50px',top:'70px'}" @click='changeChart(1)'>词云图</i-button>
            <i-button type='info' size="large" :style="{position:'absolute',left:'150px',top:'70px'}" @click='changeChart(2)'>柱状图</i-button> -->
            <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='hideContentDiv(2)' style='z-index:101'></Icon>
            <div  :style="{width:WCWidth,position:'absolute',display:'flex'}">
              <div :style="{width:docWidth,height:ContentHeightList}" style="border-right:1px solid #336666">
                <div class="e-title">
                  <div class="e-title-d"></div>
                  <p class="e-title-p">{{selDocItems.firstLevelName}}</p>
                </div>
                <Collapse simple id='nodeAttr' class='scrollBarAble'>
                  <panel v-for="(list,index) in selDocItems.subStatisticsAttr" :key="index">
                    <span>{{list.secondLevelName}}</span>
                    <div slot="content" class="tableLine">
                      <div class="econtent" v-for="(specifics,ind) in list.specificStaticsAttr" :key="ind">
                        <p class="econtentp w8em">{{specifics.thirdLevelName}}</p>
                        <p class="econtentp">{{specifics.count}}</p>
                      </div>
                    </div>
                  </panel>
                </Collapse>
                
                
              </div>
              <div :style="{width:barWidth,height:ContentHeightList}">
                <div style='border-bottom:1px solid #336666'>
                    <div id="worldCloud" :style="{width:barWidth,height:barHeight}"></div>
                </div>
                  <div style='border-bottom:1px solid #336666'>
                    <div id="myChart" :style="{width:barWidth,height:barHeight}"></div>
                  </div>
                  
              </div>
            </div>
            
            
            <!-- <div v-show='ifWord' >
              <div id="worldCloud" style="position:absolute;left: 50px;right:50px;top:100px;" :style="{width:WCWidth,height:WCheight}"></div>
            </div>
            <div v-show='ifBar' >
              <div id="myChart" style="position:absolute;left: 50px;right:50px;top:100px;" :style="{width:WCWidth,height:WCheight}"></div>
            </div> -->
            
          </div>
        </div>
      </div>
      <!-- 列表图 -->
      <div>
        <div v-show="showList" :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}">
          <Table  border :columns="columns3" :data="data4" style="margin-top:10px;margin-left:5em;margin-right:5em" height="400"></Table>
        </div>
      </div>
      <div>
        <!-- <div v-show="showThumb" :style="{height:ContentHeightList,overflowY:'scroll',width:'100%'}">
          <Row type="flex" justify="space-between" class="code-row-bg">
              <Col :sm="2" align="start" style="align-items: center;text-align: center;padding:10px 0px;" class-name="docThunmsItem" v-for='itemObj in thumbDocIds'>
                <img :src='itemObj.img' class="picsize">
                <p class='nametext'>{{itemObj.title}}</p>
              </Col>
          </Row>
        </div> -->
      </div>
    </div>
    </Col>
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
        isBru:false,
        bruIds:[],
        bruStartX:0,
        bruStartY:0,
        prevKdown:null,
        prevKup:null,
        keyCount:0,
        isSel:null,
        ifWord:false,
        ifBar:false,
        WCheight:0,
        WCWidth:0,
        docWidth:0,
        barWidth:0,
        barHeight:0,
        contentAnaWidth:0,
        prevItems:[],
        mouseStartX:0,
        mouseStartY:0,
        mouseOn:false,
        colLgNum:4,
        colMdNum:6,
        colSmnum:8,
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
        translateButton: false,
        deleteButton:false,
        analysisButton:false,
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
        showThumb:false,
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
        
        columns3: [{
            title: 'Title',
            key: 'title',
            width: 100,
            fixed: 'left',
            render:(h,params)=>{
              let texts = '';
              texts = params.row.title.substring(0,10) + '....';
              let strTitle = '';
              strTitle = params.row.title;
              return h(
                "tooltip",
                {
                  props:{
                    placement:"bottom",
                    transfer:true,
                    marginLeft:'-30px',
                    cursor:'pointer'
                  }
                },
                [
                  texts,
                  h(
                    "span",
                    {
                      slot:"content",
                      style:{whiteSpace: "normal", wordBreak: "break-all" }
                    },
                    strTitle
                  )
                ]
              )
            }
           
          },
          {
            title: 'Time',
            key: 'time',
            width: 150,
            fixed:'left',
            sortable: true
          },
          {
            title: 'I_sn',
            key: 'i_sn',
            width: 150,
            fixed:'left',
          },
          {
            title: 'Text',
            key: 'text',
            
          },
          {
            title: 'Entity',
            key: 'entity',
            width: 100,
            fixed:'right'
          },
          
        ],
        data4: [{
            title: 'John Brown',
            time: 18,
            i_sn:'england',
            text: "Taiwan's president, Tsai Ing-wen, at a ceremony marking the Lunar New Year on Feb. 4 in Taipei. (Taiwan Presidential Office/EPA-EFE) (Taiwan Presidential Office/Han Handout/EPA-EFE/REX/Shutterstock) As Taiwan prepares for a presidential election less than a year from now, it looks increasingly likely that the island democracy risks replaying its traditional role as a flash point in U.S.-China relations. On Feb. 7, a group of four Republican senators called on House Speaker Nancy Pelosi (D-Calif.) to invite Taiwan’s president, Tsai Ing-wen, to address a joint session of Congress — a move that would enrage Beijing. Hard-line Chinese analysts have issued a report advocating that Beijing take a page from American policy in Venezuela and recognize as Taiwan’s next president any candidate who supports unification. In Taiwan, a group of uncompromising independence activists are lobbying their government to “create [an] independent state and advance towards being a normal country” next year. Beijing has warned that any formal declaration of independence by Taiwan would result in war. These maneuvers are occurring against a backdrop of a deteriorating relationship between the Trump administration and Beijing, and as China’s president, Xi Jinping, seems anxious for movement on Taiwan. Beijing has always claimed that Taiwan is part of China and has never dropped its threat to use force to “unite the motherland.” For its part, the United States’ one-China policy acknowledges Beijing’s position that there is only one China, but Washington has never taken a position on whether Taiwan belongs to the People’s Republic of China. What’s more, under the Taiwan Relations Act, signed in 1979, the United States is legally obligated to provide for Taiwan’s defense. For decades, Chinese officials privately argued that with time and Chinese economic growth Taiwan would have no choice but to accept China’s embrace. Now Chinese analysts are far more pessimistic. First, there had been an assumption in some circles that China’s political system would evolve into a more liberal one, making a confederation with China a palpable option for many on Taiwan. But instead, China today is more repressive than at any time since the 1989 crackdown on pro-democracy protests around Tiananmen Square. Second, many Taiwanese have been turned off by China’s handling of Hong Kong, which they see as a harbinger of things to come in Taiwan should China take control. China absorbed the former British colony in 1997, promising — under the slogan “one country, two systems” — to let it maintain its unique economic system for 50 years and pledging to allow more democracy. Twenty-two years into Chinese rule and Beijing has not significantly expanded democracy in Hong Kong and has begun to meddle openly in the internal affairs of the territory. Finally, after almost 30 years of democratization in Taiwan, many Taiwanese have discovered a unique identity and have no interest in unifying with Beijing. In 1992, when democracy just began in Taiwan, only 20 percent of the respondents to an annual poll held by Taiwan’s National Chengchi University called themselves “Taiwanese only.” In 2018, more than 50 percent did so. And those who identified solely as Chinese dropped from a quarter of those asked in 1992 to less than 3 percent last year. Faced with these trends, Xi has apparently decided that saber rattling is better than a soft touch. On Jan. 2, in his first major speech on Taiwan since taking over the leadership of the Communist Party in 2012, he warned that the Taiwan “problem” could not be put off for another generation and threatened the island with attack. He also demanded that any talks between Taiwan and China must be carried out with both sides acknowledging that the ultimate goal would be unification. Xi’s speech prompted a rarely seen show of political unity in Taiwan. Both President Tsai, who represents the independence-leaning Democratic Progressive Party, and the main opposition party, the Kuomintang, rejected Xi’s demands. Xi’s tougher line has garnered support among hard-liners in China. In a report given to me by a prominent hard-liner who requested anonymity, one group suggested somewhat implausibly that should China decide to attack Taiwan, it could persuade Russia, North Korea and Iran to join the fight. The report also advocated launching an economic embargo on Taiwan by first drawing up a list of Taiwanese independence supporters and blocking them from doing business in China. The Financial Times recently reported that officials from China’s Taiwan Affairs Council have been calling in mainland-based Taiwanese business executives and Taiwanese students for discussions on Taiwan’s fate. Taiwanese who participated in these sessions described them as a way to gauge the political reliability of Taiwanese living in China. The hard-liners’ report called on the Chinese government to find a leader on Taiwan willing to accept Chinese rule recognize him or her, as the United States has with Venezuela’s opposition leader Juan Guaidó. This type of extremism has echoes in Taiwan, where independence activists are chafing at Tsai’s moderate stance. Following defeats for the Democratic Progressive Party in local elections in November, independence advocates, led by Kuo Pei-hung, chairman of pro-independence Formosa TV, established an organization called the Formosa Alliance to push independence and organize a referendum on the topic. Back in Washington, support for Taiwan is at its highest since the passing of the Taiwan Relations Act in 1979. Former diplomat Richard C. Bush, now at the Brookings Institution, predicted that inviting Taiwan’s president to Congress would inflame Beijing. Others are less alarmed. Regardless, Taiwan, which has lain dormant for years as an issue between the United States and China, is back. Readmoore:",
            entity: 'Trump',
          },
          {
           title: 'John Brown',
           time: 18,
           i_sn:'england',
            text: "Taiwan's president, Tsai Ing-wen, at a ceremony marking the Lunar New Year on Feb. 4 in Taipei. (Taiwan Presidential Office/EPA-EFE) (Taiwan Presidential Office/Han Handout/EPA-EFE/REX/Shutterstock) As Taiwan prepares for a presidential election less than a year from now, it looks increasingly likely that the island democracy risks replaying its traditional role as a flash point in U.S.-China relations. On Feb. 7, a group of four Republican senators called on House Speaker Nancy Pelosi (D-Calif.) to invite Taiwan’s president, Tsai Ing-wen, to address a joint session of Congress — a move that would enrage Beijing. Hard-line Chinese analysts have issued a report advocating that Beijing take a page from American policy in Venezuela and recognize as Taiwan’s next president any candidate who supports unification. In Taiwan, a group of uncompromising independence activists are lobbying their government to “create [an] independent state and advance towards being a normal country” next year. Beijing has warned that any formal declaration of independence by Taiwan would result in war. These maneuvers are occurring against a backdrop of a deteriorating relationship between the Trump administration and Beijing, and as China’s president, Xi Jinping, seems anxious for movement on Taiwan. Beijing has always claimed that Taiwan is part of China and has never dropped its threat to use force to “unite the motherland.” For its part, the United States’ one-China policy acknowledges Beijing’s position that there is only one China, but Washington has never taken a position on whether Taiwan belongs to the People’s Republic of China. What’s more, under the Taiwan Relations Act, signed in 1979, the United States is legally obligated to provide for Taiwan’s defense. For decades, Chinese officials privately argued that with time and Chinese economic growth Taiwan would have no choice but to accept China’s embrace. Now Chinese analysts are far more pessimistic. First, there had been an assumption in some circles that China’s political system would evolve into a more liberal one, making a confederation with China a palpable option for many on Taiwan. But instead, China today is more repressive than at any time since the 1989 crackdown on pro-democracy protests around Tiananmen Square. Second, many Taiwanese have been turned off by China’s handling of Hong Kong, which they see as a harbinger of things to come in Taiwan should China take control. China absorbed the former British colony in 1997, promising — under the slogan “one country, two systems” — to let it maintain its unique economic system for 50 years and pledging to allow more democracy. Twenty-two years into Chinese rule and Beijing has not significantly expanded democracy in Hong Kong and has begun to meddle openly in the internal affairs of the territory. Finally, after almost 30 years of democratization in Taiwan, many Taiwanese have discovered a unique identity and have no interest in unifying with Beijing. In 1992, when democracy just began in Taiwan, only 20 percent of the respondents to an annual poll held by Taiwan’s National Chengchi University called themselves “Taiwanese only.” In 2018, more than 50 percent did so. And those who identified solely as Chinese dropped from a quarter of those asked in 1992 to less than 3 percent last year. Faced with these trends, Xi has apparently decided that saber rattling is better than a soft touch. On Jan. 2, in his first major speech on Taiwan since taking over the leadership of the Communist Party in 2012, he warned that the Taiwan “problem” could not be put off for another generation and threatened the island with attack. He also demanded that any talks between Taiwan and China must be carried out with both sides acknowledging that the ultimate goal would be unification. Xi’s speech prompted a rarely seen show of political unity in Taiwan. Both President Tsai, who represents the independence-leaning Democratic Progressive Party, and the main opposition party, the Kuomintang, rejected Xi’s demands. Xi’s tougher line has garnered support among hard-liners in China. In a report given to me by a prominent hard-liner who requested anonymity, one group suggested somewhat implausibly that should China decide to attack Taiwan, it could persuade Russia, North Korea and Iran to join the fight. The report also advocated launching an economic embargo on Taiwan by first drawing up a list of Taiwanese independence supporters and blocking them from doing business in China. The Financial Times recently reported that officials from China’s Taiwan Affairs Council have been calling in mainland-based Taiwanese business executives and Taiwanese students for discussions on Taiwan’s fate. Taiwanese who participated in these sessions described them as a way to gauge the political reliability of Taiwanese living in China. The hard-liners’ report called on the Chinese government to find a leader on Taiwan willing to accept Chinese rule recognize him or her, as the United States has with Venezuela’s opposition leader Juan Guaidó. This type of extremism has echoes in Taiwan, where independence activists are chafing at Tsai’s moderate stance. Following defeats for the Democratic Progressive Party in local elections in November, independence advocates, led by Kuo Pei-hung, chairman of pro-independence Formosa TV, established an organization called the Formosa Alliance to push independence and organize a referendum on the topic. Back in Washington, support for Taiwan is at its highest since the passing of the Taiwan Relations Act in 1979. Former diplomat Richard C. Bush, now at the Brookings Institution, predicted that inviting Taiwan’s president to Congress would inflame Beijing. Others are less alarmed. Regardless, Taiwan, which has lain dormant for years as an issue between the United States and China, is back. Readmoore:",
            entity: 'Trump',
          },
          {
            title: 'John Brown',
            time: 18,
            i_sn:'england',
            text: "Taiwan's president, Tsai Ing-wen, at a ceremony marking the Lunar New Year on Feb. 4 in Taipei. (Taiwan Presidential Office/EPA-EFE) (Taiwan Presidential Office/Han Handout/EPA-EFE/REX/Shutterstock) As Taiwan prepares for a presidential election less than a year from now, it looks increasingly likely that the island democracy risks replaying its traditional role as a flash point in U.S.-China relations. On Feb. 7, a group of four Republican senators called on House Speaker Nancy Pelosi (D-Calif.) to invite Taiwan’s president, Tsai Ing-wen, to address a joint session of Congress — a move that would enrage Beijing. Hard-line Chinese analysts have issued a report advocating that Beijing take a page from American policy in Venezuela and recognize as Taiwan’s next president any candidate who supports unification. In Taiwan, a group of uncompromising independence activists are lobbying their government to “create [an] independent state and advance towards being a normal country” next year. Beijing has warned that any formal declaration of independence by Taiwan would result in war. These maneuvers are occurring against a backdrop of a deteriorating relationship between the Trump administration and Beijing, and as China’s president, Xi Jinping, seems anxious for movement on Taiwan. Beijing has always claimed that Taiwan is part of China and has never dropped its threat to use force to “unite the motherland.” For its part, the United States’ one-China policy acknowledges Beijing’s position that there is only one China, but Washington has never taken a position on whether Taiwan belongs to the People’s Republic of China. What’s more, under the Taiwan Relations Act, signed in 1979, the United States is legally obligated to provide for Taiwan’s defense. For decades, Chinese officials privately argued that with time and Chinese economic growth Taiwan would have no choice but to accept China’s embrace. Now Chinese analysts are far more pessimistic. First, there had been an assumption in some circles that China’s political system would evolve into a more liberal one, making a confederation with China a palpable option for many on Taiwan. But instead, China today is more repressive than at any time since the 1989 crackdown on pro-democracy protests around Tiananmen Square. Second, many Taiwanese have been turned off by China’s handling of Hong Kong, which they see as a harbinger of things to come in Taiwan should China take control. China absorbed the former British colony in 1997, promising — under the slogan “one country, two systems” — to let it maintain its unique economic system for 50 years and pledging to allow more democracy. Twenty-two years into Chinese rule and Beijing has not significantly expanded democracy in Hong Kong and has begun to meddle openly in the internal affairs of the territory. Finally, after almost 30 years of democratization in Taiwan, many Taiwanese have discovered a unique identity and have no interest in unifying with Beijing. In 1992, when democracy just began in Taiwan, only 20 percent of the respondents to an annual poll held by Taiwan’s National Chengchi University called themselves “Taiwanese only.” In 2018, more than 50 percent did so. And those who identified solely as Chinese dropped from a quarter of those asked in 1992 to less than 3 percent last year. Faced with these trends, Xi has apparently decided that saber rattling is better than a soft touch. On Jan. 2, in his first major speech on Taiwan since taking over the leadership of the Communist Party in 2012, he warned that the Taiwan “problem” could not be put off for another generation and threatened the island with attack. He also demanded that any talks between Taiwan and China must be carried out with both sides acknowledging that the ultimate goal would be unification. Xi’s speech prompted a rarely seen show of political unity in Taiwan. Both President Tsai, who represents the independence-leaning Democratic Progressive Party, and the main opposition party, the Kuomintang, rejected Xi’s demands. Xi’s tougher line has garnered support among hard-liners in China. In a report given to me by a prominent hard-liner who requested anonymity, one group suggested somewhat implausibly that should China decide to attack Taiwan, it could persuade Russia, North Korea and Iran to join the fight. The report also advocated launching an economic embargo on Taiwan by first drawing up a list of Taiwanese independence supporters and blocking them from doing business in China. The Financial Times recently reported that officials from China’s Taiwan Affairs Council have been calling in mainland-based Taiwanese business executives and Taiwanese students for discussions on Taiwan’s fate. Taiwanese who participated in these sessions described them as a way to gauge the political reliability of Taiwanese living in China. The hard-liners’ report called on the Chinese government to find a leader on Taiwan willing to accept Chinese rule recognize him or her, as the United States has with Venezuela’s opposition leader Juan Guaidó. This type of extremism has echoes in Taiwan, where independence activists are chafing at Tsai’s moderate stance. Following defeats for the Democratic Progressive Party in local elections in November, independence advocates, led by Kuo Pei-hung, chairman of pro-independence Formosa TV, established an organization called the Formosa Alliance to push independence and organize a referendum on the topic. Back in Washington, support for Taiwan is at its highest since the passing of the Taiwan Relations Act in 1979. Former diplomat Richard C. Bush, now at the Brookings Institution, predicted that inviting Taiwan’s president to Congress would inflame Beijing. Others are less alarmed. Regardless, Taiwan, which has lain dormant for years as an issue between the United States and China, is back. Readmoore:",
            entity: 'Trump',
          },
          {
            title: 'John Brown',
            time: 18,
            i_sn:'england',
            text: "Taiwan's president, Tsai Ing-wen, at a ceremony marking the Lunar New Year on Feb. 4 in Taipei. (Taiwan Presidential Office/EPA-EFE) (Taiwan Presidential Office/Han Handout/EPA-EFE/REX/Shutterstock) As Taiwan prepares for a presidential election less than a year from now, it looks increasingly likely that the island democracy risks replaying its traditional role as a flash point in U.S.-China relations. On Feb. 7, a group of four Republican senators called on House Speaker Nancy Pelosi (D-Calif.) to invite Taiwan’s president, Tsai Ing-wen, to address a joint session of Congress — a move that would enrage Beijing. Hard-line Chinese analysts have issued a report advocating that Beijing take a page from American policy in Venezuela and recognize as Taiwan’s next president any candidate who supports unification. In Taiwan, a group of uncompromising independence activists are lobbying their government to “create [an] independent state and advance towards being a normal country” next year. Beijing has warned that any formal declaration of independence by Taiwan would result in war. These maneuvers are occurring against a backdrop of a deteriorating relationship between the Trump administration and Beijing, and as China’s president, Xi Jinping, seems anxious for movement on Taiwan. Beijing has always claimed that Taiwan is part of China and has never dropped its threat to use force to “unite the motherland.” For its part, the United States’ one-China policy acknowledges Beijing’s position that there is only one China, but Washington has never taken a position on whether Taiwan belongs to the People’s Republic of China. What’s more, under the Taiwan Relations Act, signed in 1979, the United States is legally obligated to provide for Taiwan’s defense. For decades, Chinese officials privately argued that with time and Chinese economic growth Taiwan would have no choice but to accept China’s embrace. Now Chinese analysts are far more pessimistic. First, there had been an assumption in some circles that China’s political system would evolve into a more liberal one, making a confederation with China a palpable option for many on Taiwan. But instead, China today is more repressive than at any time since the 1989 crackdown on pro-democracy protests around Tiananmen Square. Second, many Taiwanese have been turned off by China’s handling of Hong Kong, which they see as a harbinger of things to come in Taiwan should China take control. China absorbed the former British colony in 1997, promising — under the slogan “one country, two systems” — to let it maintain its unique economic system for 50 years and pledging to allow more democracy. Twenty-two years into Chinese rule and Beijing has not significantly expanded democracy in Hong Kong and has begun to meddle openly in the internal affairs of the territory. Finally, after almost 30 years of democratization in Taiwan, many Taiwanese have discovered a unique identity and have no interest in unifying with Beijing. In 1992, when democracy just began in Taiwan, only 20 percent of the respondents to an annual poll held by Taiwan’s National Chengchi University called themselves “Taiwanese only.” In 2018, more than 50 percent did so. And those who identified solely as Chinese dropped from a quarter of those asked in 1992 to less than 3 percent last year. Faced with these trends, Xi has apparently decided that saber rattling is better than a soft touch. On Jan. 2, in his first major speech on Taiwan since taking over the leadership of the Communist Party in 2012, he warned that the Taiwan “problem” could not be put off for another generation and threatened the island with attack. He also demanded that any talks between Taiwan and China must be carried out with both sides acknowledging that the ultimate goal would be unification. Xi’s speech prompted a rarely seen show of political unity in Taiwan. Both President Tsai, who represents the independence-leaning Democratic Progressive Party, and the main opposition party, the Kuomintang, rejected Xi’s demands. Xi’s tougher line has garnered support among hard-liners in China. In a report given to me by a prominent hard-liner who requested anonymity, one group suggested somewhat implausibly that should China decide to attack Taiwan, it could persuade Russia, North Korea and Iran to join the fight. The report also advocated launching an economic embargo on Taiwan by first drawing up a list of Taiwanese independence supporters and blocking them from doing business in China. The Financial Times recently reported that officials from China’s Taiwan Affairs Council have been calling in mainland-based Taiwanese business executives and Taiwanese students for discussions on Taiwan’s fate. Taiwanese who participated in these sessions described them as a way to gauge the political reliability of Taiwanese living in China. The hard-liners’ report called on the Chinese government to find a leader on Taiwan willing to accept Chinese rule recognize him or her, as the United States has with Venezuela’s opposition leader Juan Guaidó. This type of extremism has echoes in Taiwan, where independence activists are chafing at Tsai’s moderate stance. Following defeats for the Democratic Progressive Party in local elections in November, independence advocates, led by Kuo Pei-hung, chairman of pro-independence Formosa TV, established an organization called the Formosa Alliance to push independence and organize a referendum on the topic. Back in Washington, support for Taiwan is at its highest since the passing of the Taiwan Relations Act in 1979. Former diplomat Richard C. Bush, now at the Brookings Institution, predicted that inviting Taiwan’s president to Congress would inflame Beijing. Others are less alarmed. Regardless, Taiwan, which has lain dormant for years as an issue between the United States and China, is back. Readmoore:",
            entity: 'Trump',
          }
        ]
      };
    },
    computed: mapState([
      'searchContentResult', 'contentHeight', 'contentTimeCondition', 'netToContentData','contentKeyboards','contentPromte','contentTimeOnlySel','selectContentNodes'
    ]),
    watch: {
      contentTimeOnlySel:function(){
        if(this.contentTimeOnlySel){
          this.selectAll()
        }else{
          
        }
        
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
        
        
        // let selectList = $('.fileDiv').filter('.contentDiv').filter('.item-selected')
        
        // let selectList = $('.fileDiv').filter('.contentDiv').filter('.item-selected')
        // if(selectList.length >0){
        //   this.deleteButton = true
        // }else{
        //   this.deleteButton = false
        // }
        // this.selectArr = []
        // for (let m = 0; m < selectList.length; m++) {
        //   this.selectArr.push(selectList[m].id)
        // }
        
        // this.$store.commit('setSelectContentNodes', [{
        //   ids: this.selectArr
        // }])
        
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
                check:true
              })
              
            );
            console.log(1)
            mthis.prevItems = mthis.deepClone(mthis.items)
            
            for(let i=0;i<mthis.items.length;i++){
              selectIds.push(mthis.items[i].id)
            }
            mthis.$store.commit('setSelectContentNodes', [{
              ids: selectIds
            }])
            mthis.$store.commit('setContent2time',[{
              ids:selectIds
            }])
            mthis.translateButton = true
            mthis.analysisButton = true
          }else if(mthis.netToContentData.contentIds.type == 'search'){
            mthis.items = response.body.data.map(item =>({
                title: item.title,      
                i_sn: item.i_sn, 
                id: item.id,
                text: item.description,
                time: item.time,
                from: item.from,     
                img: "http://10.60.1.140/assets/images/content_node.png",
                check:false
              })
            );
            console.log(2)
            mthis.$store.commit('setSelectContentNodes', [{
              ids: []
            }])
            mthis.$store.commit('setContent2time',[{
              ids:[]
            }])
            mthis.prevItems = mthis.deepClone(mthis.items)
          }
          
          mthis.spinShow = false
          
          
         
        })
        
        }
        
      },
      contentTimeCondition:{
        deep:true,
        handler(newValue){
           var mthis = this
            
            
            if(mthis.contentTimeCondition.type == 'cancel'){
              console.log(3)
              console.log(mthis.prevItems)
              mthis.items =  mthis.deepClone(mthis.prevItems)
            }
            if(mthis.contentTimeCondition.type == 'sel'){
              
              if(mthis.contentTimeCondition.ids.length ==0){
                console.log(4)
                mthis.items = mthis.deepClone(mthis.prevItems)
              }
              if(mthis.contentTimeCondition.ids.length>0){
                let items = []
                for(var i of mthis.contentTimeCondition.ids){
                  for(var j in mthis.prevItems){
                    if(i == mthis.prevItems[j].id){
                      items.push(mthis.deepClone(mthis.prevItems[j]))
                      }
                    }
                  }
                for(var m=0;m<items.length;m++){
                  items[m].check = false
                }
                mthis.items = mthis.deepClone(items)
               
              
              }
            }
            }
            
            
      },
      
     
      searchContentResult: function(va) {
        var mthis = this
        mthis.page = 1
        // if(mthis.$store.state.tmss === 'content') {
        // if(va[0].label.split('搜索:').length > 1) {
        mthis.content = va
        mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query=' + mthis.content).then(response => {
          if (response.body.data.length > 0) {
            
            
            $('.item-selected').removeClass('item-selected')
            
            // mthis.items = response.body.data
            mthis.items = response.body.data.map(item =>({
                title: item.title,      
                i_sn: item.i_sn, 
                id: item.id,
                text: item.description,
                time: item.time,
                from: item.from,     
                img: "http://10.60.1.140/assets/images/content_node.png",
                check:false
              })
            );
            console.log(5)
            mthis.prevItems = mthis.deepClone(mthis.items)
            
            if(response.body.data.length ==30){
              mthis.moreLoading = true
            }
           
            // mthis.data4 = []
            // for(let i=0;i<mthis.items.length;i++){
            //   let itemList = {};
            //   itemList.title = mthis.items[i].title
            //   itemList.time = mthis.items[i].time.substring(0,10)
            //   itemList.text = mthis.items[i].text
            //   itemList.id = mthis.items[i].id
            //   itemList.i_sn = mthis.items[i].i_sn
            //   itemList.entity = mthis.content
            //   mthis.data4.push(itemList)
            // }
            
            $('<div class="select-box-dashed"></div>').remove();
            // mthis.showMore = true
            mthis.$store.commit('setSelectContentNodes', [{
              ids: []
            }])
            mthis.$store.commit('setContent2time',[{
              ids:[]
            }])
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
        mthis.ContentHeight = mthis.$store.state.contentHeight - 75 + 'px';
        mthis.ContentHeightList = mthis.$store.state.contentHeight - 75 + 22 + 'px';
      },
      ContentHeightList: function() {
        var mthis = this;
        var Ele = document.getElementById('translatedDiv');
        var contentDiv = document.getElementById('contentInfo');
        
        mthis.WCheight = (parseInt(mthis.ContentHeightList.split('px')[0]) - 45) + 'px'
        mthis.barHeight = (parseInt(mthis.ContentHeightList.split('px')[0]) /2 -0.8) + 'px'
        if (Ele !== null) {
          Ele.style.height = mthis.ContentHeightList;
        }
      }
    },
    components: {
      InfiniteLoading,modalChart,worksetModal
    },
    props: ['contentData'],
    methods: {
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
                      mthis.items[i].check = true
                      mthis.bruIds.push(mthis.items[i].id)
                      
                    }
                    
                  
                  }else{
                    
                    if($(selDivList[i]).find('img').hasClass("item-selected")){
                      mthis.items[i].check = false
                      let idx = mthis.bruIds.indexOf(mthis.items[i].id)
                      mthis.bruIds.splice(idx,1)
                    }
                  }
                }
        
        this.clearBubble(eventMove)
      },
      kuangup(e){
        if(!this.showThumb) return;
        this.isSel = false;
        var mthis = this;
        
        var selDiv = document.getElementById('selectDiv');
        var selOutDiv = document.getElementById('selOutDiv');
        selOutDiv.style.display = 'none';
        selDiv.style.display = 'none';
        
        if(this.isBru){
          mthis.bruIds= util.unique(mthis.bruIds);
          
          mthis.$store.commit('setSelectContentNodes', [{
            ids: mthis.bruIds
          }])
          mthis.$store.commit('setContent2time',[{
            ids:mthis.bruIds
          }])
          mthis.isBru = false;
        }
        
        $('#selectDiv').remove();
        $('#selOutDiv').remove();
        this.clearBubble(e)
        $('#contentchart').off('mousemove');
      },
    toSelIds(index,check,id,evt){
        this.clearBubble(evt)
        
        clearTimeout(timerClick);
        var mthis = this;
        check = !check;
        mthis.items[index].check = check;
        mthis.prevItems = mthis.deepClone(mthis.items)
        timerClick = setTimeout(function(){
          var ids = mthis.selectContentNodes[0].ids
          if(ids.indexOf(id)>-1){
            let index = ids.indexOf(id)
            ids.splice(index,1)
          }else{
            ids.push(id)
          }
          if(ids.length>0){
            mthis.deleteButton = true
            mthis.analysisButton = true
          }else{
            mthis.deleteButton = false
            mthis.analysisButton = false
          }
          mthis.$store.commit('setSelectContentNodes', [{
            ids: ids
          }])
          mthis.$store.commit('setContent2time',[{
            ids:ids
          }])
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
        checkItems = mthis.items.filter(item => item.check)
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
          if(!mthis.items[i].check){
            mthis.items[i].check = true
          }else{
            continue
          }
        }
       
        mthis.deleteButton = true
        mthis.analysisButton = true
        mthis.$store.commit('setSelectContentNodes', [{
          ids: ids
        }])
        mthis.$store.commit('setContent2time',[{
            ids:ids
          }])
          console.log(6)
        mthis.prevItems = mthis.deepClone(mthis.items)
        // let disselectDom = $('.contentDiv:not(.item-selected)')
        // disselectDom.addClass('item-selected')
        // this.watchSelectCounter++;
        
      },
      rightMenu(e){
        var mthis = this
        
        let that = e.target
        if(that.tagName == "P"){
          that = that.parentNode
        }else{
          that = that
        }
        
        if($(that).hasClass('item-selected')){
          return true
        }else{
          $(that).addClass('item-selected')
          mthis.watchSelectCounter++;
        }
        
        
      },
      
      deleteNode(){
        var mthis = this
        if(this.deleteButton){
          mthis.items =  mthis.items.filter(item => item.check == false)
          mthis.prevItems = mthis.deepClone(mthis.items)
          mthis.$store.commit('setSelectContentNodes', [{
            ids: []
          }])
          mthis.$store.commit('setContent2time',[{
            ids:[]
          }])
        }else{
          mthis.setMessage("请选择至少一篇文章")
        }
        
      },
        // 判断是否是闰年，请求结束时间加一天
      isLeapYear(str){
          var newStr = str.split("-")
          
              var year = parseInt(newStr[0])
              var month = parseInt(newStr[1])
              var day = parseInt(newStr[2])
              switch(month){
                  case 1: 
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break ;
                    case 2:
                    if(day<28){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day =28){
                      let cond1 = year % 4 == 0;
                      let cond2 = year % 100 != 0 ;
                      let cond3 = year % 400 ==0 ;
                      let cond = cond1 && cond2 || cond3 ;
                      if(cond){
                        day = "29"
                        newStr.splice(2,1,day)
                        newStr = newStr.join("-")
                        return newStr
                      }else{
                        month += 1;
                        if(month<10){
                          month = "0" + month
                        }
                        day = "01"
                        newStr.splice(2,1,day)
                        newStr.splice(1,1,month)
                        newStr = newStr.join("-")
                        return newStr
                      }

                    }else if(day =29){
                      month += 1;
                        if(month<10){
                          month = "0" + month
                        }
                        day = "01"
                        newStr.splice(2,1,day)
                        newStr.splice(1,1,month)
                        newStr = newStr.join("-")
                        return newStr
                    }
                    break;
                    case 3:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 4:
                    if(day<30){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=30){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 5:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 6:
                    if(day<30){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=30){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }break;
                    case 7:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 8:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 9:
                    if(day<30){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=30){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }break;
                    case 10:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    case 11:
                    if(day<30){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=30){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }break;
                    case 12:
                    if(day<31){
                      day +=1;
                      if(day<10){
                        day = "0" +day
                      }
                      newStr.splice(2,1,day)
                      newStr = newStr.join("-")
                      return newStr
                    }else if(day=31){
                      month += 1;
                      if(month<10){
                        month = "0" + month
                      }
                      day = "01";
                      newStr.splice(2,1,day)
                      newStr.splice(1,1,month)
                      newStr = newStr.join("-")
                      return newStr
                    }
                    break;
                    default:break;
              }
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
              return
            }
          }
        }
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
      showAsList() {
        
        
        this.showList = true
        
      },
      toThumbnails(){
        this.showList = false
        this.showThumb = true
        this.colLgNum = 3
        this.colSmnum = 6
        this.colMdNum= 4 
       
      },
      contentTranslate() {
        var mthis = this;
        
        if(this.translateButton){
          var oldEle = document.getElementById('translatedDiv');
        if (oldEle !== null) {
          oldEle.parentElement.removeChild(oldEle);
          var contentDiv = document.getElementById('contentInfo');
          contentDiv.style.width = '100%';
          contentDiv.style.float = 'none';
          contentDiv.style.display = 'block';
          contentDiv.style.borderRight = 'none';
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
              var translatedTime = util.transformPHPTimeMS(data.time);
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
            }) 
            // this.translateButton = false
        }
        // this.translateButton = true
        
      },
      orderTimeUp() {
        var mthis = this
        mthis.order = '&isSortByTime=asc'
        mthis.page = 1
        return new Promise(resolve => {
          if (mthis.contentTimeCondition.length === 2) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[1])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据1', true)
              }
              resolve();
            })
          } else if (mthis.contentTimeCondition.length === 1) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[0])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data.map(item =>({
                  title: item.title,      
                  i_sn: item.i_sn, 
                  id: item.id,
                  text: item.description,
                  time: item.time,
                  from: item.from,     
                  img: "http://10.60.1.140/assets/images/content_node.png",
                  check:false
                })
              );
              mthis.$store.commit('setSelectContentNodes', [{
                ids: []
              }])
              mthis.$store.commit('setContent2time',[{
                ids:[]
              }])
              } else {
                mthis.alertNotice('无匹配数据2', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                // $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.setMessage('无匹配数据3')
              }
              resolve();
            })
          }
        });
      },
      orderTimeDown() {
        var mthis = this
        mthis.order = '&isSortByTime=desc'
        mthis.page = 1
        return new Promise(resolve => {
          if (mthis.contentTimeCondition.length === 2) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[1])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据4', true)
              }
              resolve();
            })
          } else if (mthis.contentTimeCondition.length === 1) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[0])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据5', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              
              if (response.body.data.length > 0) {
                mthis.items = response.body.data.map(item =>({
                  title: item.title,      
                  i_sn: item.i_sn, 
                  id: item.id,
                  text: item.description,
                  time: item.time,
                  from: item.from,     
                  img: "http://10.60.1.140/assets/images/content_node.png",
                  check:false
                })
              );
                // $('.item-selected').removeClass('item-selected')
                
                mthis.$store.commit('setSelectContentNodes', [{
                  ids: []
                }])
                mthis.$store.commit('setContent2time',[{
                  ids:[]
                }])
              } else {
                mthis.setMessage('无匹配数据6')
              }
              resolve();
            })
          }
        });
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
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
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
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据8', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
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
      handleReachBottom() {
        var mthis = this
        mthis.page = mthis.page + 1
        if(mthis.moreLoading){
          return new Promise(resolve => {
          if (mthis.contentTimeCondition.length === 2) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[1])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = mthis.items.concat(response.body.data)
              } else {
                mthis.alertNotice('无匹配数据10', true)
              }
              resolve();
            })
          } else if (mthis.contentTimeCondition.length === 1) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[0])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                
                $('.item-selected').removeClass('item-selected')
                
                mthis.items = mthis.items.concat(response.body.data)
              } else {
                mthis.alertNotice('无匹配数据11', true)
              }
              resolve();
            })
          } else {
            let nowItems = []
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                nowItems = response.body.data.map(item =>({
                  title: item.title,      
                  i_sn: item.i_sn, 
                  id: item.id,
                  text: item.description,
                  time: item.time,
                  from: item.from,     
                  img: "http://10.60.1.140/assets/images/content_node.png",
                  check:false
                })
              );
              
                // $('.item-selected').removeClass('item-selected')
                
                mthis.items = mthis.items.concat(nowItems)
                console.log(7)
                mthis.prevItems = mthis.deepClone(mthis.items)
              } else {
                
                // $('.layer').show().delay(3000).fadeOut()
                mthis.setMessage('文档已经全部加载')
                mthis.moreLoading = false
                
                // mthis.alertNotice('已全部加载', true)
                
              }
              resolve();
            })
          }
        });
        this.watchSelectCounter++;

        }
        // mthis.moreLoading = true
        
        
      },
      hideContentDiv(flag){
        var mthis = this
        if(flag ==1){
          mthis.ifInfo = false
          mthis.$store.state.contentSelShowFlag = false
          let selData = {}
          selData.id = [];
          selData.title = ''
          
          mthis.$store.commit('setContentSelData',selData)
          if(!mthis.showThumb){
            mthis.toContentDiv()
          }
        }else{
          mthis.contentAna = false;
          mthis.analysisButton = true
        }
        mthis.$store.commit('setShowDocTime',true)
        
      },
      toContentDiv() {
        
        this.colLgNum = 4
        this.colSmnum = 8
        this.colMdNum = 6
        this.translateButton = false
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
          while($('#jiazaiDiv').offset().top < 1000){
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
      changeChart(flag){
        var mthis = this
        if(flag ==1){
          mthis.ifWord = true;
          mthis.ifBar = false
        }else{
          mthis.ifWord = false;
          mthis.ifBar = true
        }
      },
      showContentAna(){
        var mthis = this
        if(mthis.analysisButton){
            mthis.contentAna = true;
        // 控制时间轴不显示
        mthis.$store.commit('setShowDocTime',false)
        let selDocs = mthis.items.filter(item => item.check);
        let contentIds = []
        mthis.selDocItems = new Object();
        for(let i=0;i<selDocs.length;i++){
          contentIds.push(selDocs[i].id)
        }
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/graph-attr/', {
          "nodeIds": contentIds,
          "type":"document"
        }).then(response =>{
          if(response.body.code ==0){
            
            mthis.selDocItems = response.body.data[1]
          }
        })
        // mthis.ifWord = true;
        var worldCloudcharts=echarts.init(document.getElementById('worldCloud'));
        var charts = echarts.init(document.getElementById('myChart'));
        var worldCloudoption = new Object({
          title: {
 			        text: '关键词分析',
 			        x: 'center',
 			        textStyle: {
 			            fontSize: 12,
 			            color:'#FFFFFF'
 			        }
 
           },
           tooltip: {
 			        show: true
           },
           series: [{
 			        name: '关键词分析',
 			        type: 'wordCloud',
 			        sizeRange: [10, 18],
 			        rotationRange: [0, 0],
 			        textPadding: 0,
 			        autoSize: {
 			            enable: true,
 			            minSize: 10
 			        },
 			        textStyle: {
 			            normal: {
 			                color: function() {
 			                    return 'rgb(' + [
 			                        Math.round(Math.random() * 160),
 			                        Math.round(Math.random() * 160),
 			                        Math.round(Math.random() * 160)
 			                    ].join(',') + ')';
 			                }
 			            },
 			            emphasis: {
 			                shadowBlur: 10,
 			                shadowColor: '#333'
 			            }
 			        },
 			 	}]
          
        })
        var JosnList = [];
 
        JosnList.push({
            name: "Jayfee",
            value: 520
        }, {
            name: "Nancy",
            value: 520
        }, {
            name: "生活资源",
            value: 520
        }, {
            name: "供热管理",
            value: 520
        }, {
            name: "供气质量",
            value: 520
        }, {
            name: "生活用水管理",
            value: 520
        }, {
            name: "一次供水问题",
            value: 520
        }, {
            name: "交通运输",
            value: 520
        }, {
            name: "城市交通",
            value: 520
        }, {
            name: "环境保护",
            value: 520
        }, {
            name: "房地产管理",
            value: 520
        },  );
        var colors = ['#66CDAA',  '#B8860B','#FF9080'];

        var xData = function() {
            var data = [];
            for (var i = 1; i < 13; i++) {
                data.push("地区"+i);
            }
            return data;
        }();
        var chartOption = new Object({
          title: {
            "text": "生产总值累计值\n",
            subtext:"",
            top:'12%',
            "left": "10%",
            "subtextStyle": {
              "color": "#fff",
              fontWeight:800,
              fontSize:16
            },
            textStyle:{
                "color": "#fff",
              fontSize:28
            }
          },

          backgroundColor: '#020306',
          color: ['#4162ff', '#c78b42', '#CD3F2A', '#ff6e72', '#9692ff'],
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'shadow'
              }
          },
          legend: {
              top:'14%',
              right:'30%',
              textStyle:{
                  color:'#FFFFFF'
              },
              orient: 'vertical',
              data: ['第一产业', '第二产业', '第三产业', '']
          },
          grid: {
              left: '10%',
              right: '30%',
              bottom: '20%',
              top: '27%',
              containLabel: true,
              z: 22
          },
          yAxis: [{
              type: 'value',
              splitLine: {
                  show: false,
                  lineStyle: {
                      color: ['#f2f2f2']
                  }
              },
              axisLine: {
                      lineStyle: {
                          color: '#0c3b71'
                      }
                  },
                  axisLabel: {
                      color: 'rgb(170,170,170)',
                      formatter: '{value} '
                  }
          }],
          xAxis: [{
              type: 'category',
              axisLine: {
                  lineStyle: {
                      color: '#0c3b71'
                  }
              },
              axisLabel: {
                  show: true,
                  color: 'rgb(170,170,170)',
                  fontSize:14
              },
              data:xData
          }],
          series: [{
                  name: '第一产业',
                  type: 'bar',
                  stack: '总量',
                  barWidth: '16px',
                  data: [80, 212, 101, 110, 80, 212, 101, 120, 113, 101, 120, 113],
                  // markArea: areaStyle
              },
              {
                  name: '第二产业',
                  type: 'bar',
                  stack: '总量',
                  data: [90, 232, 251, 212, 101, 110,212, 101, 110, 10,  120, 113],
                  // markArea: areaStyle
              },
              {
                  name: '第三产业',
                  type: 'bar',
                  stack: '总量',
                  data: [90, 232, 231, 134, 190, 90, 232, 251, 212, 101, 110, 10],
                  // markArea: areaStyle
              },
              
            
          ]
        })
        charts.setOption(chartOption)
        worldCloudoption.series[0].data = JosnList;
  
        worldCloudcharts.setOption(worldCloudoption);
        mthis.analysisButton = false
        }else{
          mthis.setMessage("请选择至少一篇文章")
        }
        
      },
      showContent(id,title) {
        clearTimeout(timerClick);
        var mthis = this
        
        mthis.$store.state.contentSelShowFlag = true
        let selData = {}
        selData.id = [id];
        selData.title = title
        
        mthis.$store.commit('setContentSelData',selData)
        
        
        mthis.ifInfo = true
        mthis.translateButton = true
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
      mthis.contentAnaWidth = document.documentElement.clientWidth * this.$store.state.split - 20 + 'px'
      let wwWidth = document.documentElement.clientWidth * this.$store.state.split - 20
      mthis.WCWidth = wwWidth   + 'px'
      mthis.docWidth = (wwWidth * 0.5) + 'px'
      mthis.barWidth = (wwWidth - (parseInt(mthis.docWidth.split('px')[0]))) + 'px'
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      // mthis.netheight = useHeight * 0.8 - 55 + "px";
      mthis.netheightdiv = useHeight * 0.8 + "px";
      mthis.ContentHeight = useHeight * 0.8 - 68 + "px";
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
      
    
      // this.initSelectBox('#contentchart')
      
      
      // window.addEventListener('scroll', this.handleScroll)
      // let contentChart = document.getElementById('contentchart');
      
      // var contentTimer = null;
      // $('#contentchart').click(function(){
      //   contentTimer = setTimeout(function(){
      //      $('#contentchart').css("cursor","crosshair");
      //      alert(1111)
      //   },1000);
      // },function(){
      //   clearTimeout(contentTimer);
      // });
      // $('#contentchart').on('keydown',function(e){
      
      //   if(mthis.$store.state.tmss === 'content') {
      //       var e = event || window.event || arguments.callee.caller.arguments[0];
      //       if (e && e.keyCode == 46) {
      //         mthis.deleteNode()
      //         e.preventDefault();
      //         e.stopPropagation();
      //       }
      //       if (e.keyCode == 65 && e.ctrlKey) {
      //         mthis.selectAll()
      //         e.preventDefault();
      //         e.stopPropagation();
      //       }
      //     }
      // })
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
    overflow: hidden;
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
    -webkit-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    -moz-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
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
    padding: 0 25px 0 5px;
    text-align: center;
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
    background-color: rgba(51, 255, 255, 0.4);
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
    max-width:100px;
    max-height:100px;
    width:100%;
    
    
  }
  .nametext{
    white-space: nowrap;
    word-break: break-all;
    text-overflow: ellipsis;
    overflow-x: hidden;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 30px; */
    letter-spacing: 0px;
    color: #ccffff;
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
 #contentWordCloud{
   border-right:1px solid #336666;
   border-left:1px solid #336666;
   
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
  .econtent {
    display: flex;
    height: auto;
    min-height: 30px;
  }
  
  .w8em {
    width: 8em;
    min-width: 8em;
    max-width: 8em;
    margin: 0;
  }
  .tableLine>.econtent:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .tableLine>.econtent:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .rightIcon:hover{
    opacity: 1;
    cursor: pointer;
  }
</style>