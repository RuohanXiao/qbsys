<template>
  <div :style="{height:netheightdiv}">
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px'}">
      <Row type="flex" justify="start" class="code-row-bg" align="middle" :style="{height:'70px',paddingLeft:'10px'}">
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="分组" placement="bottom">
          <Icon class="icon iconfont icon-rectangle process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="缩略图" placement="bottom">
          <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back" @click='toContentDiv' size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="列表" placement="bottom">
          <Icon class="icon iconfont icon-list process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="翻译" placement="bottom">
          <Icon class="icon iconfont icon-selection-box process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="时间升" placement="bottom">
          <Icon class="icon iconfont icon-up process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="时间降" placement="bottom">
          <Icon class="icon iconfont icon-down process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="热度" placement="bottom">
          <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="截图" placement="bottom">
          <Icon class="icon iconfont icon-cut process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="保存" placement="bottom">
          <Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="添加目标" placement="bottom">
          <Icon class="icon iconfont icon-add process-img DVSL-bar-btn DVSL-bar-btn-back"  size="26"></Icon>
        </Tooltip>
        </Col>
      </Row>
    </div>
    <div :style="{height:netheight,border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <Scroll :on-reach-bottom="handleReachBottom"  v-if='!ifInfo' :height=contentHeight>
        <div id="contentchart" aria-autocomplete="true" :style="{height:contentHeight,display:'flex',overflowY:'scroll'}">
          <Row type="flex" justify="start" align="middle">
          <Col span="4" align="middle"  v-for="item in items">
            <div class="contentDiv">
              <p class="contentTitle" @click="showContent(item.id)">{{item.title}}</p>
              <p class="contentText">{{item.text}}</p>
              <p class="contentTime">{{item.time}}&nbsp;{{item.from}}</p>
            </div>
          </Col>
          </Row>
        </div>
      </Scroll>
      <div id="contentInfo" v-if='ifInfo' :style="{height:contentHeight,overflowY:'scroll'}">
        <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn DVSL-bar-btn-back" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='toContentDiv'></Icon>
        <h2 class="contentInfoTitle" id='contentsTitle'></h2>
        <p class="contentInfoTime" id='contentsTime'></p>
        <p style='margin:30px'><span id='contents' ></span><span id='pointer'>_</span></p>
      </div>
    </div>
    </Col>
    <!-- flag 是modal显示开关，eventData是modal左侧列表数据 -->
    <modal-chart :flag="modal01" :edata="eventData"></modal-chart>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import modalChart from './custom_modal.vue'
  mock.test = 1
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        ifInfo: false,
        contentHeight: 0,
        netheight: 0,
        netheightdiv: 0,
        flag: true,
        modal01: false,
        eventData: null,
        items: [],
        page:1
      };
    },
    components: {
      modalChart
    },
    props:['contentData'],
    methods: {
       handleReachBottom () {
         var mthis = this
         mthis.page = mthis.page + 1
                return new Promise(resolve => {
                  mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page='+this.page+'&query='+ mthis.$route.query.content).then(response => {
                    mthis.items = response.body.data
                    resolve();
                    // mthis.dataexpand = response.body.data
                    // mthis.singlePerson = (opt[1]>1)?false:true
                  })
                });
        },
      toContentDiv(){
        this.ifInfo = false 
        // document.getElementById('contents').innerHTML = ''
        // document.getElementById('contentsTitle').innerHTML = ''
        // document.getElementById('contentsTime').innerHTML = ''
      },
      showContent(id){
        var mthis = this
        mthis.ifInfo = true 
      //  mock.get("/getContentInfo",{id:id}).then(function(res) {
      //   // 获取文本数据
      //   document.getElementById('contents').innerHTML = res.data.contents
      //   document.getElementById('contentsTitle').innerHTML = res.data.title
      //   document.getElementById('contentsTime').innerHTML = res.data.time
      // });
      mthis.$http.get('http://10.60.1.140:5001/context-by-id/?idValue='+ id).then(response => {
          document.getElementById('contents').innerHTML = response.body.data[0].text
          //mthis.printer(response.body.data[0].text, 'contents', 'pointer')
          document.getElementById('contentsTitle').innerHTML = response.body.data[0].title
          document.getElementById('contentsTime').innerHTML = response.body.data[0].from + ((response.body.data[0].from!=='' && response.body.data[0].from !==undefined)?'  |  ':'')+ response.body.data[0].time
          
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
    },
    computed: {
    },
    mounted() {
      var mthis = this
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      mthis.netheight = useHeight * 0.8 - 55 + "px";
      mthis.netheightdiv = useHeight * 0.8 + "px";
      mthis.contentHeight = useHeight * 0.8 - 68 + "px";
      if(mthis.$route.query.content !== undefined && mthis.$route.query.content!==null && mthis.$route.query.content !== ''){
        // 跳转过来的
        mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=1&query='+ mthis.$route.query.content).then(response => {
          mthis.items = response.body.data
          // mthis.dataexpand = response.body.data
          // mthis.singlePerson = (opt[1]>1)?false:true
        })

      }
      
    }
  };
</script>
<style>
.ivu-scroll-container{
  height: auto !important;
}
  .top,
  .bottom {
    text-align: center;
  }
  .contentDiv {
    max-height: 255px;
    padding: 5px;
    overflow: hidden;
    background:rgba(51, 255, 255, 0.2);
    margin: 20px;
    background:linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.2) 0);
    padding-top:20px; 
  }
  .contentDiv ::before{
    content: "";
    position: absolute;
    top: 20px;
    right: 20px;
    border-width: 0 16px 16px 0;
    border-style: solid;
    border-color: rgba(0,0,0,0) rgba(0,0,0,0) rgba(51, 255, 255, 0.8)  rgba(51, 255, 255, 0.8);
    background: rgba(51, 255, 255, 0.8);
    display: block;
    width: 0;
    background:linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.8) 0);
    -webkit-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
    -moz-box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
    box-shadow: 0 1px 1px rgba(0,0,0,0.3), -1px 1px 1px rgba(0,0,0,0.2);
  }
  .contentTitle{
    padding: 0 5px;
    text-align: start;
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
  }
  .contentText{
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
    text-overflow:ellipsis;
    line-height: 19px !important;
  }
  .contentTime{
    text-align: center;
    padding: 0 5px 5px 5px;
    height: 35px;
    font-family: PARaDOS;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow: hidden;
    opacity: 0.5;
  }
  .contentInfoTitle{
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
  .contentInfoTime{
    text-align: center;
    padding: 0 5px 5px 5px;
    height: 35px;
    font-family: PARaDOS;
    font-size: 12px;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow:ellipsis;
    white-space:nowrap;
    overflow: hidden;
    opacity: 0.5;
  }
  .contentInfoText{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.8;
  }
  .contentInfoPeople{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #009999;
    opacity: 0.8;
  }
  .contentInfoPlace{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    letter-spacing: 0px;
    color: #cc6666;
    opacity: 0.8;
  }
  #contents {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.8;
    line-height: 24px;
  }
</style>
