<template>
  <div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 14px 0 14px'}" id="net">
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
    <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 14px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div id="contentchart" aria-autocomplete="true" :style="{minHeight:netheight,maxHeight:netheight,display:'flex',overflowY:'scroll'}">
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
      <div id="contentInfo" :style="{minHeight:netheight,maxHeight:netheight,display:'none',overflowY:'scroll'}">
        <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn DVSL-bar-btn-back" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='toContentDiv'></Icon>
        <h2 class="contentInfoTitle" id='contentsTitle'></h2>
        <p class="contentInfoTime" id='contentsTime'></p>
        <div id='contents'></div>
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
        basicY: 0,
        basicX: 0,
        dataurl:'../../dist/data/netData.json',
        netheight: 0,
        netheightdiv: 0,
        pathHoverFlag: false,
        modal_loading: false,
        selectionId: [],
        netchart: null,
        nextId: 4,
        flag: true,
        netData: [],
        selectItem: null,
        saveNum: 0,
        modal01: false,
        eventData: null,
        items: []
      };
    },
    components: {
      modalChart
    },
    methods: {
      toContentDiv(){
        document.getElementById('contentchart').style.display = 'block'
        document.getElementById('contentInfo').style.display = 'none'
        document.getElementById('contents').innerHTML = ''
        document.getElementById('contentsTitle').innerHTML = ''
        document.getElementById('contentsTime').innerHTML = ''
      },
      showContent(id){
      var mthis = this
       mock.get("/getContentInfo",{id:id}).then(function(res) {
        // 获取文本数据
        document.getElementById('contents').innerHTML = res.data.contents
        document.getElementById('contentsTitle').innerHTML = res.data.title
        document.getElementById('contentsTime').innerHTML = res.data.time
      });
        document.getElementById('contentchart').style.display = 'none'
        document.getElementById('contentInfo').style.display = 'block'
      }
    },
    created() {
      var mthis = this
       mock.get("/getContent").then(function(res) {
        // 获取文本数据
        mthis.items = res.data.data
      });
    },
    computed: {
    },
    mounted() {
      var mthis = this
      window.onresize = function() {
        this.netheight = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
        this.netheightdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
      }
      this.netheight = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      this.netheightdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
    }
  };
</script>
<style>
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
</style>
