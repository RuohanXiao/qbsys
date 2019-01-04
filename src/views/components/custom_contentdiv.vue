<template>
  <div :style="{height:netheightdiv}">
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px'}">
      <div class='divStyle'>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-rectangle DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">分组</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='toContentDiv'>
            <Icon class="icon iconfont icon-fanhui DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">缩略图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='showAsList'>
            <Icon class="icon iconfont icon-list DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">列表</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-selection-box DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">翻译</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='orderTimeUp'>
            <Icon class="icon iconfont icon-up DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">时间升</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='orderTimeDown'>
            <Icon class="icon iconfont icon-down DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">时间降</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='orderDefalut'>
            <Icon class="icon iconfont icon-fanhui DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">热度</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-up DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">截图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-cut DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">保存</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-add DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">添加目标</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div :style="{margin:'0,5px'}">
      <div v-if="!showList">
        <Scroll :on-reach-bottom="handleReachBottom" v-if='!ifInfo' :height=ContentHeight>
          <div id="contentchart"  class="scrollBarAble" aria-autocomplete="true" :style="{height:ContentHeight,display:'flex',overflowY:'scroll'}">
            <Row type="flex" justify="start" align="middle">
              <Col :sm="8" :lg="6" align="middle" v-for="item in items">
              <div class="contentDiv" @click="showContent(item.id)">
                <p class="contentTitle" >{{item.title}}</p>
                <p class="contentText">{{item.text}}</p>
                <p class="contentTime">{{item.time}}&nbsp;&nbsp;&nbsp;{{item.from}}</p>
              </div>
              </Col>
              <Col span=24 v-if="items.length>0">
              <div @click="handleReachBottom" :style="{textAlign:'center',color:'rgba(51,255,255,0.5)'}" class='more'>加载更多</div>
              </Col>
            </Row>
          </div>
        </Scroll>
        <div id="contentInfo" class="scrollBarAble" v-if='ifInfo' :style="{height:ContentHeight,overflowY:'scroll'}">
          <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn-new DVSL-bar-btn-back" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='toContentDiv'></Icon>
          <h2 class="contentInfoTitle" id='contentsTitle'></h2>
          <p class="contentInfoTime" id='contentsTime'></p>
          <p style='margin:30px'><span id='contents'></span></p>
        </div>
      </div></div>
      <div>
      <div v-if="showList" :style="{height:ContentHeightList,overflowY:'scroll'}">
        <Table width="550" border :columns="columns2" :data="data3"></Table>
      </div>
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
  import {
    mapState,
    mapMutations
  } from 'vuex'
  mock.test = 1
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        ifInfo: false,
        ContentHeight: 0,
        ContentHeightList: 0,
        netheight: 0,
        netheightdiv: 0,
        netheightout: 0,
        flag: true,
        modal01: false,
        eventData: null,
        items: [],
        page: 1,
        content: '',
        order: '',
        toEdg: -100,
        showList: false,
        moreLoading: false,
        columns2: [
                    {
                        title: 'Name',
                        key: 'name',
                        width: 100,
                        fixed: 'left'
                    },
                    {
                        title: 'Age',
                        key: 'age',
                        width: 100
                    },
                    {
                        title: 'Province',
                        key: 'province',
                        width: 100
                    },
                    {
                        title: 'City',
                        key: 'city',
                        width: 100
                    },
                    {
                        title: 'Address',
                        key: 'address',
                        width: 200
                    },
                    {
                        title: 'Postcode',
                        key: 'zip',
                        width: 100
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        fixed: 'right',
                        width: 120,
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'View'),
                                h('Button', {
                                    props: {
                                        type: 'text',
                                        size: 'small'
                                    }
                                }, 'Edit')
                            ]);
                        }
                    }
                ],
                data3: [
                    {
                        name: 'John Brown',
                        age: 18,
                        address: 'New York No. 1 Lake Park',
                        province: 'America',
                        city: 'New York',
                        zip: 100000
                    },
                    {
                        name: 'Jim Green',
                        age: 24,
                        address: 'Washington, D.C. No. 1 Lake Park',
                        province: 'America',
                        city: 'Washington, D.C.',
                        zip: 100000
                    },
                    {
                        name: 'Joe Black',
                        age: 30,
                        address: 'Sydney No. 1 Lake Park',
                        province: 'Australian',
                        city: 'Sydney',
                        zip: 100000
                    },
                    {
                        name: 'Jon Snow',
                        age: 26,
                        address: 'Ottawa No. 2 Lake Park',
                        province: 'Canada',
                        city: 'Ottawa',
                        zip: 100000
                    }
                ]
      };
    },
    computed: mapState([
      'searchContentResult', 'contentHeight', 'contentTimeCondition'
    ]),
    watch: {
      contentTimeCondition: function(va) {
        // alert('时间变啦!!')
        console.log(va)
      },
      searchContentResult: function(va) {
        console.log('-----------------------1')
        console.log(va)
        var mthis = this
        // if(mthis.$store.state.tmss === 'content') {
        // if(va[0].label.split('搜索:').length > 1) {
        mthis.content = va
        mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=1&query=' + mthis.content).then(response => {
          if (response.body.data.length > 0) {
            mthis.items = response.body.data
            mthis.$store.commit('setConditionContent',mthis.content)
            // mthis.showMore = true
          } else {
            // mthis.showMore = false
            mthis.items = []
            alert('未找到匹配的文章')
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
        mthis.ContentHeightList =  mthis.$store.state.contentHeight - 75 + 22 + 'px';
      }
    },
    components: {
      modalChart
    },
    props: ['contentData'],
    methods: {
      showAsList() {
        this.showList = true
      },
      orderTimeUp() {
        var mthis = this
        mthis.order = '&isSortByTime=asc'
        mthis.page = 1
        return new Promise(resolve => {
          console.log('-----------------------2')
          mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=' + this.page + '&query=' + mthis.content + mthis.order).then(response => {
            mthis.items = response.body.data
            resolve();
            // mthis.dataexpand = response.body.data
            // mthis.singlePerson = (opt[1]>1)?false:true
          })
        });
      },
      orderTimeDown() {
        var mthis = this
        mthis.order = '&isSortByTime=desc'
        mthis.page = 1
        return new Promise(resolve => {
          console.log('-----------------------3')
          mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=' + this.page + '&query=' + mthis.content + mthis.order).then(response => {
            mthis.items = response.body.data
            resolve();
            // mthis.dataexpand = response.body.data
            // mthis.singlePerson = (opt[1]>1)?false:true
          })
        });
      },
      orderDefalut() {
        var mthis = this
        mthis.order = ''
        mthis.page = 1
        return new Promise(resolve => {
          console.log('-----------------------4')
          mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=' + this.page + '&query=' + mthis.content + mthis.order).then(response => {
            mthis.items = response.body.data
            resolve();
            // mthis.dataexpand = response.body.data
            // mthis.singlePerson = (opt[1]>1)?false:true
          })
        });
      },
      handleReachBottom(status) {
        var mthis = this
        mthis.page = mthis.page + 1
        mthis.moreLoading = true
        return new Promise(resolve => {
          console.log('-----------------------5')
          mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=' + this.page + '&query=' + mthis.content + mthis.order).then(response => {
            console.log(mthis.items)
            mthis.items = mthis.items.concat(response.body.data)
            resolve();
            mthis.moreLoading = false
            // mthis.dataexpand = response.body.data
            // mthis.singlePerson = (opt[1]>1)?false:true
          })
        });
      },
      toContentDiv() {
        this.showList = false
        this.ifInfo = false
        // document.getElementById('contents').innerHTML = ''
        // document.getElementById('contentsTitle').innerHTML = ''
        // document.getElementById('contentsTime').innerHTML = ''
      },
      scrollBottom() {
        //  ALERT('sss')
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
      showContent(id) {
        var mthis = this
        mthis.ifInfo = true
        //  mock.get("/getContentInfo",{id:id}).then(function(res) {
        //   // 获取文本数据
        //   document.getElementById('contents').innerHTML = res.data.contents
        //   document.getElementById('contentsTitle').innerHTML = res.data.title
        //   document.getElementById('contentsTime').innerHTML = res.data.time
        // });
        mthis.$http.get('http://10.60.1.140:5001/context-by-id/?idValue=' + id).then(response => {
          // mthis.printer(response.body.data[0].text, 'contents', 'pointer')
          var text = response.body.data[0].text.replace(/(\r\n)|(\n)/g, '<br>');
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
      let useHeight = document.documentElement.clientHeight - 64 - 20;
      // mthis.netheight = useHeight * 0.8 - 55 + "px";
      mthis.netheightdiv = useHeight * 0.8 + "px";
      mthis.ContentHeight = useHeight * 0.8 - 68 + "px";
      // if(mthis.$route.query.content !== undefined && mthis.$route.query.content!==null && mthis.$route.query.content !== ''){
      //   // 跳转过来的
      //   mthis.$http.get('http://10.60.1.140:5001/context-by-text/?page=1&query='+ mthis.$route.query.content).then(response => {
      //     mthis.items = response.body.data
      //     // mthis.dataexpand = response.body.data
      //     // mthis.singlePerson = (opt[1]>1)?false:true
      //   })
      // }
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
    background: rgba(51, 255, 255, 0.2);
    margin: 20px;
    background: linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.2) 0);
    padding-top: 20px;
    cursor: pointer;
  }
  .contentDiv:hover {
    background: linear-gradient(-135deg, transparent 10px, rgba(51, 255, 255, 0.3) 0);
    animation: all 1s;
    -webkit-animation: all 1s;
    /* transform:translate(5px,5px); */
    -webkit-box-shadow:-5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    -moz-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
  }
  .contentDiv ::before {
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
  }
  .contentTitle {
    padding: 0 5px;
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
</style>
