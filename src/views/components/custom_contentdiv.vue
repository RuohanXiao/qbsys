<template>
  <div :style="{height:netheightdiv}">
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
          <div class="button-div">
            <Icon class="icon iconfont icon-delete-name DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">删除</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-add DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">创建集合</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-zhaiyaotu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">摘要图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click='toContentDiv'>
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
          <div class="button-div" @click='contentTranslate'>
            <Icon class="icon iconfont icon-selection-box" :class="(translateButton)?'lightUp':''" size="26"></Icon>
            <p class="img-content">翻译</p>
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
    <div :style="{borderRight:'solid 1px #336666',borderLeft:'solid 1px #336666',borderBottom:'solid 1px #336666',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div :style="{margin:'0,5px'}">
        <div v-if="!showList">
          <Scroll :on-reach-bottom="handleReachBottom" v-show='!ifInfo' :height=ContentHeight>
            <div id='spin' v-if="spinShow" :style="{position:'absolute',height:ContentHeight,zIndex: 98,width:'100%'}">
              <Spin size="large" fix v-if="spinShow"></Spin>
            </div>
            <div id="contentchart" class="scrollBarAble" @mousewheel="jiazai" aria-autocomplete="true" :style="{height:ContentHeight}">
              <Row type="flex" justify="start">
                <Col :sm="8" :lg="4" align="middle" v-for="(item,index) in items" :key="index">
                <div>
                  <div class="contentDiv fileDiv select-item" :class="(item.check)?'marked':''" :id="item.id" :title="item.text" @dblclick="showContent(item.id)">
                    <p class="contentTitle">{{item.title}}</p>
                    <p class="contentText">{{item.text.substring(0,34)}}</p>
                    <p class="contentTime">{{item.time}}&nbsp;&nbsp;&nbsp;{{item.from}}</p>
                  </div>
                  <div class="contentItem">
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
            </div>
          </Scroll>
          <div id="contentInfo" class="scrollBarAble" v-show='ifInfo' :style="{height:ContentHeightList,overflowY:'scroll'}">
            <Icon class="icon iconfont icon-delete2 process-img DVSL-bar-btn-new DVSL-bar-btn-back" :style="{position:'absolute',right:'15px',top:'70px'}" size="26" @click='toContentDiv'></Icon>
            <h2 class="contentInfoTitle" id='contentsTitle'></h2>
            <p class="contentInfoTime" id='contentsTime'></p>
            <p style='margin:10px'><span id='contents'></span></p>
          </div>
        </div>
      </div>
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
  import util from '../../util/tools.js'
  import mock from '../../mock/index.js'
  // import liM from '../../dist/assets/js/jquery.liMarquee.js'
  import modalChart from './custom_modal.vue'
  import InfiniteLoading from 'vue-infinite-loading';
  import $ from "jquery";
  import {
    mapState,
    mapMutations
  } from 'vuex'
  // import func from '../../../vue-temp/vue-editor-bridge';
  mock.test = 1
  var timer = null;
  var tthis = this;
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        goodsList: [],
        sortFlag: true, //默认升序
        page: 1,
        pageSize: 8,
        busy: true,
        watchSelectCounter: 0,
        translateButton: false,
        spinShow: false,
        markedItem: false,
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
        selectArr: [],
        columns2: [{
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
        data3: [{
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
        ],
        initSelectBox: function(selector, selectCallback) {
          var mthis = this
          function clearBubble(e) {
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
          }
          var $container = $(selector);
          //  框选事件
          $container
            .on('mousedown', function(eventDown) {
              //  设置选择的标识
              var isSelect = true;
              //  创建选框节点
              var $selectBoxDashed = $('<div class="select-box-dashed"></div>');
              $('body').append($selectBoxDashed);
              //  设置选框的初始位置
              var startX = eventDown.x || eventDown.clientX;
              var startY = eventDown.y || eventDown.clientY;
              $selectBoxDashed.css({
                left: startX,
                top: startY
              });
              //  根据鼠标移动，设置选框宽高
              var _x = null;
              var _y = null;
              //  清除事件冒泡、捕获
              clearBubble(eventDown);
              //  监听鼠标移动事件
              $(selector).on('mousemove', function(eventMove) {
                //  设置选框可见
                $selectBoxDashed.css('display', 'block');
                //  根据鼠标移动，设置选框的位置、宽高
                _x = eventMove.x || eventMove.clientX;
                _y = eventMove.y || eventMove.clientY;
                //  暂存选框的位置及宽高，用于将 select-item 选中
                var _left = Math.min(_x, startX);
                var _top = Math.min(_y, startY);
                var _width = Math.abs(_x - startX);
                var _height = Math.abs(_y - startY);
                $selectBoxDashed.css({
                  left: _left,
                  top: _top,
                  width: _width,
                  height: _height
                });
                //  遍历容器中的选项，进行选中操作
                $(selector).find('.select-item').each(function() {
                  var $item = $(this);
                  var itemX_pos = $item.prop('offsetWidth') + $item.prop('offsetLeft');
                  var itemY_pos = $item.prop('offsetHeight') + $item.prop('offsetTop');
                  //  判断 select-item 是否与选框有交集，添加选中的效果（ temp-selected ，在事件 mouseup 之后将 temp-selected 替换为 selected）
                  var condition1 = itemX_pos > _left;
                  var condition2 = itemY_pos > _top;
                  var condition3 = $item.prop('offsetLeft') < (_left + _width);
                  var condition4 = $item.prop('offsetTop') < (_top + _height);
                  if (condition1 && condition2 && condition3 && condition4) {
                    $item.addClass('temp-selected');
                  } else {
                    $item.removeClass('temp-selected');
                  }
                });
                //  清除事件冒泡、捕获
                clearBubble(eventMove);
              });
              $(document).on('mouseup', function() {
                $(selector).off('mousemove');
                // $(selector).find('.temp-selected').find('.contentDiv').addClass('item-selected')
                $(selector)
                  .find('.temp-selected')
                  .removeClass('temp-selected').addClass('item-selected');
                $selectBoxDashed.remove();
                if (selectCallback) {
                  selectCallback();
                }
              });
            })
            //  点选切换选中事件
            .on('click', '.select-item', function() {
              if ($(this).hasClass('item-selected')) {
                $(this).removeClass('item-selected');
              } else {
                $(this).addClass('item-selected');
              }
              mthis.watchSelectCounter++;
            })
          //  点选全选全不选
          // .on('click', '.toggle-all-btn', function() {
          //     if ($(this).attr('data-all')) {
          //         $(this).removeAttr('data-all');
          //         $container.find('.select-item').removeClass('selected');
          //     } else {
          //         $(this).attr('data-all', 1);
          //         $container.find('.select-item').addClass('selected');
          //     }
          // });
        }
      };
    },
    computed: mapState([
      'searchContentResult', 'contentHeight', 'contentTimeCondition', 'netToContentData'
    ]),
    watch: {
      watchSelectCounter: function() {
        let selectList = $('.fileDiv').filter('.contentDiv').filter('.item-selected')
        this.selectArr = []
        for (let m = 0; m < selectList.length; m++) {
          this.selectArr.push(selectList[m].id)
        }
        // console.log('==============++++++++++==============')
        // console.log(this.selectArr)
        this.$store.commit('setSelectContentNodes', [{
          ids: this.selectArr
        }])
      },
      netToContentData: function() {
        var mthis = this
        // alert('文档接受到了')
        // // console.log(this.netToContentData)
        mthis.items = []
        let contentIds = this.netToContentData.contentIds
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
          'docIds': contentIds
        }).then(response => {
          $('.item-selected').removeClass('item-selected')
          mthis.items = response.body.data
        })
        mthis.watchSelectCounter++;
      },
      contentTimeCondition: function(va) {
        var mthis = this
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function() {
          mthis.page = 1
          if (va.length === 2) {
            mthis.spinShow = true
            let stime = util.getTimestamp(va[0])
            let etime = util.getTimestamp(va[1])
            mthis.$http.get(mthis.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = response.body.data
              } else {
                mthis.items = []
              }
              mthis.spinShow = false
            })
          } else if (va.length === 1) {
            alert('aaa')
          } else {
            alert('bbbb')
          }
        }, 500);
      },
      searchContentResult: function(va) {
        var mthis = this
        // if(mthis.$store.state.tmss === 'content') {
        // if(va[0].label.split('搜索:').length > 1) {
        mthis.content = va
        mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query=' + mthis.content).then(response => {
          if (response.body.data.length > 0) {
            $('.item-selected').removeClass('item-selected')
            mthis.items = response.body.data
            $('<div class="select-box-dashed"></div>').remove();
            // mthis.showMore = true
          } else {
            // mthis.showMore = false
            mthis.items = []
            alert('未找到匹配的文章')
          }
        })
        // }
        // }
        mthis.watchSelectCounter++;
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
        if (Ele !== null) {
          Ele.style.height = mthis.ContentHeightList;
        }
      }
    },
    components: {
      InfiniteLoading,modalChart
    },
    props: ['contentData'],
    methods: {
      //无限滚动加载触发方法
      infiniteHandler($state) {
        alert()
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
        // 添加：document.getElementById("id").classList.add("类名")；
        // 删除：document.getElementById("id").classList.remove("类名")；
        (document.getElementById(id).getAttribute("class").indexOf('item-selected') > 0) ? (document.getElementById(id).classList.remove("item-selected")) : (document.getElementById(id).classList.add("item-selected"))
        this.watchSelectCounter++;
      },
      fanxuan() {
        // document.getElementsByClassName("box");
        let selectDom = $('.item-selected')
        let disselectDom = $('.contentDiv:not(.item-selected)')
        selectDom.removeClass('item-selected')
        disselectDom.addClass('item-selected')
        this.watchSelectCounter++;
      },
      removeAll() {
        this.items = []
        this.watchSelectCounter++;
      },
      alertNotice(titleStr, nodesc) {
        this.$Notice.open({
          title: titleStr,
          desc: nodesc ? '' : 'Here is the notification description. Here is the notification description. '
        });
      },
      toNet() {
        let selectList = $('.fileDiv').filter('.contentDiv').filter('.item-selected')
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
      contentTranslate() {
        var mthis = this;
        this.translateButton = true
        debugger
        var oldEle = document.getElementById('translatedDiv');
        if (oldEle !== null) {
          oldEle.parentElement.removeChild(oldEle);
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
              var translatedTitle = data.title;
              var translatedTime = util.transformPHPTimeMS(data.time);
              var translatedText = data.text.ch;
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
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = response.body.data
              } else {
                mthis.alertNotice('无匹配数据', true)
              }
              resolve();
            })
          }
        });
      },
      handleReachBottom() {
        var mthis = this
        mthis.page = mthis.page + 1
        mthis.moreLoading = true
        return new Promise(resolve => {
          if (mthis.contentTimeCondition.length === 2) {
            let stime = util.getTimestamp(mthis.contentTimeCondition[0])
            let etime = util.getTimestamp(mthis.contentTimeCondition[1])
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + '&timeStart=' + stime + '&timeEnd=' + etime + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = mthis.items.concat(response.body.data)
              } else {
                mthis.alertNotice('无匹配数据', true)
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
                mthis.alertNotice('无匹配数据', true)
              }
              resolve();
            })
          } else {
            mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=' + this.page + '&query=' + mthis.searchContentResult + mthis.order).then(response => {
              if (response.body.data.length > 0) {
                $('.item-selected').removeClass('item-selected')
                mthis.items = mthis.items.concat(response.body.data)
              } else {
                mthis.alertNotice('已全部加载', true)
              }
              resolve();
            })
          }
        });
        this.watchSelectCounter++;
      },
      toContentDiv() {
        this.showList = false
        this.ifInfo = false
        var oldEle = document.getElementById('translatedDiv');
        if (oldEle !== null) {
          oldEle.parentElement.removeChild(oldEle);
          var contentDiv = document.getElementById('contentInfo');
          contentDiv.style.width = 'auto';
          contentDiv.style.float = 'none';
          contentDiv.style.display = 'none';
          contentDiv.style.borderRight = 'none';
        }
        // document.getElementById('contents').innerHTML = ''
        // document.getElementById('contentsTitle').innerHTML = ''
        // document.getElementById('contentsTime').innerHTML = ''
      },
      jiazai(){
        var mthis= this
        console.log($('#jiazaiDiv').offset())
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(function() {
          while($('#jiazaiDiv').offset().top < 1000){
            mthis.handleReachBottom()
            console.log('===============')
            break;
          }
        }, 500);
      },
      scrollBottom() {
        alert('ssss')
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
        mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-id/?idValue=' + id).then(response => {
          // mthis.printer(response.body.data[0].text, 'contents', 'pointer')
          document.getElementById('contentInfo').value = response.body.data[0].id;
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
      //   mthis.$http.get(this.$store.state.ipConfig.api_url + '/context-by-text/?page=1&query='+ mthis.$route.query.content).then(response => {
        //     mthis.items = response.body.data
      //     // mthis.dataexpand = response.body.data
      //     // mthis.singlePerson = (opt[1]>1)?false:true
      //   })
      // }
      window.px = "";
      window.py = "";
      window.divLength = 0;
      this.initSelectBox('#contentchart')
      
      // console.log($('#jiazaiDiv').offset())
      // window.addEventListener('scroll', this.handleScroll)
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
</style>
<style scoped>
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
    border: 1px solid rgba(51, 255, 255, 0.5);
  }
  .temp-selected {
    background-color: rgba(51, 255, 255, 0.2);
  }
  /* .select-item.item-selected,
            .select-item.temp-selected {
              background-color: rgba(51, 255, 255, 0.2);
            } */
  .select-box-dashed {
    position: absolute;
    display: none;
    width: 0px;
    height: 0px;
    padding: 0px;
    margin: 0px;
    border: 1px dashed #0099ff;
    background-color: rgb(51, 255, 255);
    opacity: 0.5;
    filter: alpha(opacity=50);
    font-size: 0px;
    z-index: 999;
    pointer-events: none;
  }
  .marked {
    border: 1px solid rgba(51, 255, 255, 0.8);
  }
  .contentItem {
    position: absolute;
    background-color: rgba(0, 0, 0, 0);
    top: 12px;
    left: 12px;
    width: 15px;
    height: 15px;
  }
  contentItem:hover {
    opacity: 1;
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
    color: #ccffff;
  }
</style>