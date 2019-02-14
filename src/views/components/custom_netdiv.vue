<template>
  <div :style="{height:nh}">
    <div :style="{height:nh,backgroundColor:'rgba(0,0,0,0)',position:'absolute',zIndex: zIndex,top:0,width:'99%',margin:'0 10px'}">
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px'}" id="net">
      <div class='divStyle'>
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                          <div class="button-div" @click="back">
                            <Icon class="icon iconfont icon-fanhui  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                            <p class="img-content">撤销操作</p>
                          </div>
                        </Tooltip>
                        <div class="divSplitLine"></div> -->
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="newCanvans">
            <Icon class="icon iconfont icon-refresh  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">清空画布</p>
          </div>
        </Tooltip>
        <!-- <div class="divSplitLine"></div> -->
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="add">
            <Icon class="icon iconfont icon-add  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">添加目标</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="removeOther">
            <Icon class="icon iconfont icon-fanxuan  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">反选节点</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="remove">
            <Icon class="icon iconfont icon-delete-point  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">删除</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="square">
            <Icon class="icon iconfont icon-grid  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">矩形</p>
            <!-- <p class="img-content">矩形布局</p> -->
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="star">
            <Icon class="icon iconfont icon-star  DVSL-bar-btn-new DVSL-bar-btn-back" align="center" size="26"></Icon>
            <p class="img-content">星形</p>
            <!-- <p class="img-content">星形布局</p> -->
          </div>
        </Tooltip>
        <Tooltip placement="top" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="hierarchy">
            <Icon class="icon iconfont icon-expand  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">层级</p>
            <!-- <p class="img-content">层级布局</p> -->
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="top" content="（Ctrl+A）" :delay="5000">
          <!-- <Dropdown trigger="custom"  :visible="expandVisible"> -->
          <Dropdown :visible="expandVisible">
            <!-- <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="expandNodeKnowledge" >
                <Icon class="icon iconfont icon-kuozhan--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                <p class="img-content">关系扩展</p>
              </div> -->
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addExpandTimer()" @mouseout="stopExpandTimer()" @click="expandNodeKnowledge" v-if="(expandFlag=='knowledge')">
              <Icon class="icon iconfont icon-kuozhan--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">关系扩展</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addExpandTimer()" @mouseout="stopExpandTimer()" @click="expandNodeEvent" v-if="(expandFlag=='event')">
              <Icon class="icon iconfont icon-event-expand  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">事件扩展</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addExpandTimer()" @mouseout="stopExpandTimer()" v-if="(expandFlag=='content')" @click="expandNodeContent">
              <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">共现扩展</p>
            </div>
            <DropdownMenu slot="list" placement="bottom-start">
              <div class="button-div" @click="expandNodeKnowledge">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-kuozhan--tupu  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>关系扩展</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="expandNodeEvent">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-event-expand  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>事件扩展</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="expandNodeContent">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>共现扩展</span>
                </DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Tooltip>
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                      <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="showModalStep">
                        <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                        <p class="img-content">路径</p>
                      </div>
                    </Tooltip>
                    <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                        <div class="button-div" @click="showPathEvent">
                          <Icon class="icon iconfont icon-lujing--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                          <p class="img-content">事件路径</p>
                        </div>
                      </Tooltip>
                     -->
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                      <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="expandNodeEvent">
                        <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                        <p class="img-content">事件扩展</p>
                      </div>
                    </Tooltip> -->
        <!-- <Col span="1" align="middle" class="bottom">
                                        <Tooltip content="查找关联" placement="bottom">
                                          <Icon class="icon iconfont icon-linkedby  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                        </Tooltip>
                                        </Col> -->
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="5000">
          <Dropdown :visible="stepVisible" trigger="custom">
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('knowledge')" v-show="stepFlag==='knowledge'" @mouseup="stopStepTimer">
              <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">关系路径</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('event')" v-show="stepFlag==='event'" @mouseup="stopStepTimer">
              <Icon class="icon iconfont icon-lujing--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">事件路径</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('content')" v-show="stepFlag==='content'" @mouseup="stopStepTimer">
              <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <p class="img-content">共现路径</p>
            </div>
            <DropdownMenu slot="list" placement="bottom-start">
              <div class="button-div">
                <DropdownItem class="img-content" @click="showModalStep('knowledge')">
                  <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>关系路径</span>
                </DropdownItem>
              </div>
              <div class="button-div">
                <DropdownItem class="img-content" @click="showModalStep('event')">
                  <Icon class="icon iconfont icon-lujing--shijian  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>事件路径</span>
                </DropdownItem>
              </div>
              <div class="button-div">
                <DropdownItem class="img-content" @click="showModalStep('content')">
                  <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>共现路径</span>
                </DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="spread">
            <Icon class="icon iconfont icon-expand  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">展开</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="toGeo()">
            <Icon class="icon iconfont icon-tuisongzhikongjian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">空间</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="toContent()">
            <Icon class="icon iconfont icon-tuisongzhiwendang  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">文档</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="exportImg">
            <Icon class="icon iconfont icon-cut  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">截屏</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="save">
            <Icon class="icon iconfont icon-save1  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">保存工作集</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="fit">
            <Icon class="icon iconfont icon-zhengchangshitu--quanping  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">自适应</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <div :style="{height:nh_50,border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <!-- <div id="netchart" aria-autocomplete="true" :style="{height:nh_50}"></div> -->
      <div id="netchart" :style="{height:nh_50}"></div>
    </div>
    <!-- flag 是modal显示开关，eventData是modal左侧列表数据 -->
    <modal-chart :flag="modal01" :edata="eventData" @detailModalFlag='setFlagToFalse'></modal-chart>
    <!-- <Modal v-model="modalStep" ok-text="设置步数"
                        cancel-text="放弃查询" @on-ok="showPathKnowledge" @on-cancel="cancel">
                      <InputNumber :max="10" :min="1" v-model="value1"></InputNumber>
                    </Modal> -->
    <Modal v-model="modalStep" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>Delete confirmation</span>
      </p>
      <div style="text-align:center">
        <InputNumber :max="10" :min="1" v-model="InputNumber" :on-change='con'></InputNumber>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long @click="pathKnowledge">Delete</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import axios from 'axios'
  import mock from '../../mock/index.js'
  import modalChart from './custom_modal_add.vue'
  // import modalChart from './custom_modal_vue.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import util from '../../util/tools.js'
  mock.test = 1
  var timer1 = null;
  /* eslint-disable */
  var timer = null;
  export default {
    name: "App",
    data() {
      return {
        zIndex: 0,
        spinShow: false,
        expandFlag: 'knowledge',
        stepFlag: 'knowledge',
        expandVisible: false,
        stepVisible: false,
        InputNumber: 0,
        modalStep: false,
        // timer: null,
        basicY: 0,
        basicX: 0,
        // dataurl: '../../dist/data/netData.json',
        nh: 0,
        pathHoverFlag: false,
        modal_loading: false,
        selectionId: [],
        selectionIdByType: {},
        netchart: null,
        nextId: 4,
        flag: true,
        selectItem: null,
        saveNum: 0,
        modal01: false,
        eventData: null,
        ids: [],
        ifSelectNode: false,
        // 节点形状
        stepTimer: null,
        expandTimer: null,
        nh_50: 0,
        buttonTimer: null
      };
    },
    components: {
      modalChart
    },
    methods: {
      startTimer(v) {
        var mthis = this
        buttonTimer = setTimeout(function (e) {
          console.log('LongPress');
          e.preventDefault();
          mthis.showModalStep(v)
        }, 2000);
      },
      stopTimer(){
        clearTimeout(buttonTimer);
      },
      addStepTimer() {
        let mthis = this
        mthis.stepTimer = setTimeout(function(e) {
          console.log('LongPress');
          // e.preventDefault();
          mthis.stepVisible = true
        }, 1000)
      },
      stopStepTimer() {
        clearTimeout(this.stepTimer)
        this.stepVisible = false
      },
      addExpandTimer() {
        let mthis = this
        this.expandTimer = setTimeout(function() {
          mthis.expandVisible = true
        }, 1000)
      },
      stopExpandTimer() {
        clearTimeout(this.expandTimer)
        this.expandVisible = false
      },
      toGeo() {
        this.$store.commit('setNetToGeoData', this.selectionIdByType)
        alert('已经推送，结果请参阅控制台')
        console.log('推送至地理空间模块，推送数据如下：')
        console.log(this.selectionIdByType)
        this.$store.commit('changeTMSS', 'geo')
      },
      toContent() {
        this.$store.commit('setNetToContent', this.selectionIdByType)
        console.log('推送至文本分析模块，推送数据如下：')
        console.log(this.selectionIdByType)
        this.$store.commit('changeTMSS', 'content')
      },
      spread() {
        var mthis = this
        // console.log(this.selectionId)
        // console.log(this.selectionId.filter(function(x) {
        //   return x.isLink
        // }))
        // console.log(this.selectionId.filter(function(x) {
        //   return x.isLink && x.data.class === 'event'
        // }))
        // console.log(this.selectionId.filter(function(x) {
        //   return x.isLink && x.data.class === 'event' && x.data.num !== ''
        // }))
        let eventArry = this.selectionId.filter(function(x) {
          return x.isLink && x.data.class === 'event' && x.data.num !== ''
        })
        console.log(eventArry)
        this.netchart.removeData({
          links: [{
            id: eventArry[0].id
          }]
        })
        mock.get("/getSpreadEvent").then(function(res) {
          mthis.netchart.addData(res.data.data[0])
        });
      },
      con() {},
      showModalStep(a) {
        this.modalStep = true
      },
      pathKnowledge() {
        this.modalStep = false
        this.showPathKnowledge()
      },
      setFlagToFalse(detailModalFlag) {
        var mthis = this;
        mthis.modal01 = detailModalFlag;
      },
      objOfValueToArr(object) {
        var arr = [];
        var i = 0;
        for (var item in object) {
          arr[i] = object[item];
          i++;
        }
        return arr;
      },
      // 调用统计接口
      getStatistics() {
        var mthis = this
        let nodeArr = Object.keys(mthis.netchart._impl.data.default.nodes).map(key => mthis.netchart._impl.data.default.nodes[key].id);
        mthis.$store.commit('setStaticsIds', nodeArr);
        let linkArr = Object.keys(mthis.netchart._impl.data.default.links).map(key => mthis.netchart._impl.data.default.links[key]);
        mthis.$http.post(this.$store.state.ipConfig.api_url + '/node-statistics/', {
          "nodeIds": nodeArr
        }).then(response => {
          mthis.$store.commit('setDataStatisticsEvent', response.data);
        })
      },
      // del() {
      //   this.modal_loading = true;
      //   setTimeout(() => {
      //     this.modal_loading = false;
      //     this.$Message.success('Successfully delete');
      //   }, 2000);
      // },
      // longPress() {
      //   this.netchart.startLongPress();
      // },
      //强制重新渲染
      changeFlag() {
        this.flag = !this.flag;
        let focusId = (this.selectionId.length > 0) ? (this.selectionId[0].id) : 'node1'
        this.netchart.addFocusNode(focusId, 50)
      },
      // 悬浮点亮节点
      hoverLightinNodes(ids) {
        mthis.netchart.selection(ids)
      },
      //知识拓展节点（加载新数据）
      expandNodeKnowledge() {
        console.log('this is know')
        var mthis = this;
        let arr = []
        if (mthis.selectionId.length > 0) {
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          let res = null
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(mthis.selectionId[i].id)
          }
          mthis.spinShow = true
          mthis.zIndex = 999
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/neighbor-datas/', {
            'ClassName': 'knowledge',
            'nodeIds': arr
          }).then(response => {
            res = response.body.data[0]
            for (let m = 0; m < res.nodes.length; m++) {
              res.nodes[m].type = res.nodes[m].entity_type
              res.nodes[m].imageCropping = true
              arr.push(res.nodes[m].id)
            }
            mthis.spinShow = false
            mthis.zIndex = 0
            mthis.netchart.addData(res)
            setTimeout(function() {
              let ar = util.unique(arr)
              mthis.netchart.selection(ar)
              mthis.netchart.unlockNode(ar);
            }, 100)
            mthis.getStatistics()
          })
        } else {
          mthis.$Message.error('请至少选择一个节点进行拓展操作！')
        }
        mthis.expandFlag = 'knowledge'
      },
      newCanvans() {
        this.netchart.replaceData({
          "nodes": [],
          "links": []
        })
        this.$store.commit('setSearchNetResult', [{
          node: {
            nodes: []
          },
          id: '',
          name: ''
        }])
        this.selectionId = []
        this.ifSelectNode = false
        this.getStatistics()
      },
      // 事件拓展
      expandNodeEvent() {
        var mthis = this;
        let arr = []
        if (mthis.selectionId.length > 0) {
          //访问数据库，拓展新数据
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          let res = null
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(mthis.selectionId[i].id)
          }
          mthis.spinShow = true
          mthis.zIndex = 999
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/event-exploration/', {
            'nodeIds': arr
          }).then(response => {
            res = response.body.data[0]
            // for(let m = 0;m<res.nodes.length;m++){
            //   res.nodes[m].label = res.nodes[m].name
            // }
            for (let n = 0; n < res.links.length; n++) {
              res.links[n].num = '2'
              res.links[n].label = res.nodes[n].name
            }
            mthis.netchart.addData(res)
            mthis.spinShow = false
            mthis.zIndex = 0
            for (let m = 0; m < res.nodes.length; m++) {
              arr.push(res.nodes[m].id)
            }
            setTimeout(function() {
              mthis.netchart.selection(util.unique(arr))
            }, 100)
            mthis.getStatistics()
          })
          // mthis.netchart.settings.style.nodeBackground.imageCropping = 'crop'
          mthis.expandFlag = 'event'
        } else {
          this.$Message.error('请至少选择一个节点进行拓展操作！')
        }
      },
      // 共线扩展
      expandNodeContent() {
        var mthis = this;
        mthis.expandFlag = 'content'
      },
      saveData(nodes, links, num) {
        // sessionStorage.setItem('dataInfo' + num, JSON.stringify({
        //   nodes,
        //   links
        // }));
        // sessionStorage.setItem('dataNum' + num, nodes.length + '    ' + links.length);
        this.saveNum = (num + 1) % 3;
      },
      // 显示路径
      showPathKnowledge() {
        var mthis = this
        // (this.selectionId.length === 1) ? (this.pathHoverFlag = true) : ((this.selectionId.length > 0) ? (this.$Message.error('请选择单一节点进行路径显示')) : (this.$Message.error('请选择一个节点进行路径显示')))
        // this.netchart.selection(["911716", '1016826'])
        if (mthis.selectionId.length !== 2) {
          mthis.$Message.error('现阶段只支持两点路径！')
        } else {
          mthis.spinShow = true
          mthis.zIndex = 999
          mthis.$http.get(this.$store.state.ipConfig.api_url + '/all-path-data?start=' + mthis.selectionId[0].id + '&end=' + mthis.selectionId[1].id + '&step=' + mthis.InputNumber).then(response => {
            if (response.body.data[0].nodes.length + response.body.data[0].links.length > 0) {
              mthis.netchart.addData(response.body.data[0])
              let idArr = []
              let nodeobj = response.body.data[0].nodes
              let linkobj = response.body.data[0].links
              for (let i = 0; i < nodeobj.length; i++) {
                idArr.push(nodeobj[i].id)
              }
              for (let j = 0; j < linkobj.length; j++) {
                idArr.push(linkobj[j].id)
              }
              mthis.netchart.selection(idArr)
              mthis.spinShow = false
              mthis.zIndex = 0
            } else {
              mthis.$Message.error('未找到知识路径')
            }
          })
        }
        mthis.modalStep = 0
        // mthis.netchart.selection(["911716", '1016826'])
      },
      showPathEvent() {
        (this.selectionId.length === 1) ? (this.pathHoverFlag = true) : ((this.selectionId.length > 0) ? (this.$Message.error('请选择单一节点进行路径显示')) : (this.$Message.error('请选择一个节点进行路径显示')))
      },
      exportImg() {
        // if (this.exportValue !== '') {
        //   this.netchart.export(this.exportValue, {
        //     mime: "image/png",
        //     extension: "png",
        //     image: !0,
        //     transparent: !0
        //   }, {
        //     dpi: 1050,
        //     unit: "px",
        //     width: 100,
        //     height: 200,
        //     scale: 1
        //   }, true)
        //   this.exportValue = ''
        // }
        // var image = new Image();
        // image.src = document.getElementById('netchart').toDataURL("image/png");  //把canvas转换成base64图像保存
        // var mycanvas = document.getElementById('netchart').getElementsByTagName('canvas')[0];  
        // var image    = mycanvas.toDataURL("image/png");  
        // img.setAttribute('crossOrigin', 'anonymous');
        // var image = new Image();
        // image.setAttribute('crossorigin', 'anonymous');
        // document.getElementById('image').src = mycanvas.toDataURL("image/png")
        // var image = new Image();
        // image.setAttribute('crossorigin', 'anonymous');
        // window.location.href=image; 
        // return image;
        // var canvas = document.getElementById('netchart').getElementsByTagName('canvas')[0];
        // var w=window.open('about:blank','image from canvas');  
        // w.document.write("<img id='c2img' alt='from canvas'/>");  
        // var ctx = canvas.getContext('2d');
        // var image = new Image();
        // image.setAttribute('crossorigin', 'anonymous');
        // image.onload = function() {
        //     ctx.drawImage(image, 0, 0);
        //     document.getElementById('c2img').src = canvas.toDataURL('image/png');
        // };
        // this.netchart.exportAsString('png',(res)=>{
        // })
        // this.netchart.exportData('png', {
        //     mime: "image/png",
        //     extension: "png",
        //     image: !0,
        //     transparent: !0
        //   }, {
        //     dpi: 1050,
        //     unit: "px",
        //     width: 100,
        //     height: 200,
        //     scale: 1
        //   }, true)
        // export('png', {
        //     mime: "image/png",
        //     extension: "png",
        //     image: !0,
        //     transparent: !0
        //   }, {
        //     dpi: 1050,
        //     unit: "px",
        //     width: 100,
        //     height: 200,
        //     scale: 1
        //   }, true)
        //   this.exportValue = ''
        // this.netchart.exportData
        // image.src = 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3497300994,2503543630&fm=27&gp=0.jpg';
        // this.netchart.dataLinks.selection
      },
      //矩形布局
      square() {
        if (this.selectionId.length > 0) {
          this.changeFlag();
          var mthis = this;
          if (this.selectionId.length > 0) {
            let rowNum = Math.ceil(Math.sqrt(this.selectionId.length));
            let basePoint = this.selectionId[0];
            for (let i = 0; i < this.selectionId.length; i++) {
              //解锁位置
              mthis.netchart.unlockNode(this.selectionId[i].id);
              let col = i % rowNum;
              let row = parseInt(i / rowNum);
              // this.selectionId[i]["x"] = col * 100;
              // this.selectionId[i]["y"] = row * 100;
              this.selectionId[i]["x"] = this.selectionId[0]["x"] + col * 100;
              this.selectionId[i]["y"] = this.selectionId[0]["y"] + row * 100;
              // 锁定位置
              mthis.netchart.lockNode(this.selectionId[i].id);
            }
            // mthis.netchart.addFocusNode(this.selectionId[0].id);
          }
        } else {
          this.$Message.error('请选择节点进行矩形排列操作！')
        }
        // this.flag = false;
      },
      //星型布局
      star() {
        var mthis = this;
        if (mthis.selectionId.length > 27) {
          mthis.changeFlag();
          for (let index = 1; index < mthis.selectionId.length; index++) {
            mthis.netchart.unlockNode(mthis.selectionId[index].id);
            // 辐射布局
            // let circleNum = Math.floor(Math.log(index) / Math.log(3))
            // let avd = 360 / Math.pow(3, circleNum);
            // let ahd = avd * Math.PI / 360;
            // let radius = 200 * circleNum + 200
            // mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
            //   Math.sin(ahd * index) * radius;
            // mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] +
            //   Math.cos(ahd * index) * radius;
            // 螺旋布局
            let ahd = Math.PI / 72;
            // let radius = 5 * index + 5
            mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
              Math.sin(ahd * index) * (Math.random() - 0.5) * 2000;
            mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] +
              Math.cos(ahd * index) * (Math.random() - 0.5) * 2000;
            mthis.netchart.lockNode(mthis.selectionId[index].id);
          }
        } else if (mthis.selectionId.length > 0 && mthis.selectionId.length < 27) {
          //半径
          let radius = mthis.selectionId.length > 7 ? 200 : 100;
          // let radius = mthis.selectionId.length*2;
          //每一个BOX对应的角度;
          let avd = 360 / mthis.selectionId.length;
          //每一个BOX对应的弧度;
          let ahd = avd * Math.PI / 180;
          for (let index = 0; index < mthis.selectionId.length; index++) {
            //解锁位置
            mthis.netchart.unlockNode(mthis.selectionId[index].id);
            mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
              Math.sin(ahd * index) * radius;
            mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] - radius +
              Math.cos(ahd * index) * radius;
            // 锁定位置
            mthis.netchart.lockNode(mthis.selectionId[index].id);
          }
          mthis.netchart.addFocusNode(mthis.selectionId[0].id);
        } else {
          mthis.$Message.error('请选择节点进行矩形排列操作！')
        }
      },
      // 层级布局
      hierarchy() {
        var mthis = this
        // mode: "hierarchy",
        // nodeSpacing: 60, // horizontal spacing between nodes
        // rowSpacing: 200 // vertical spacing between node rows in the hierarchy layou
        // var mthis = this
        if (mthis.selectionId.length > 0) {
          mthis.changeFlag();
          mthis.basicX = mthis.selectionId[0]['x']
          mthis.basicY = mthis.selectionId[0]['y']
          let arr = []
          let arrLevel1 = []
          for (let index = 0; index < mthis.selectionId.length; index++) {
            // mthis.netchart.unlockNode(this.selectionId[index].id);
            mthis.selectionId[index]["x"] = index * 100 + mthis.basicX
            mthis.selectionId[index]["y"] = mthis.basicY
            mthis.netchart.lockNode(mthis.selectionId[index].id);
            arrLevel1.push(mthis.selectionId[index].id)
            for (let num = 0; num < mthis.selectionId[index].dataLinks.length; num++) {
              if (mthis.selectionId[index].dataLinks[num].from === mthis.selectionId[index].id) {
                (arr.push(mthis.selectionId[index].dataLinks[num].to))
              } else {
                (arr.push(mthis.selectionId[index].dataLinks[num].from))
              }
            }
          }
          arr = util.unique(arr)
          if (mthis.selectionId.length > 1) {
            arr = util.diff(arr, arrLevel1)
          }
          // arr = util.diff(arr,arrLevel1)
          for (let nn = 0; nn < arr.length; nn++) {
            // mthis.netchart.unlockNode(arr[nn]);
            mthis.netchart.getNode(arr[nn])["x"] = nn * 100 + mthis.basicX
            mthis.netchart.getNode(arr[nn])["y"] = mthis.basicY + 200
            mthis.netchart.lockNode(arr[nn]);
          }
          mthis.netchart._impl.autoZoom.scene.autoZoomMode = 'overview'
          mthis.netchart.scrollIntoView();
          //     //解锁位置
          //     mthis.netchart.unlockNode(this.selectionId[index].id);
          //     // this.selectionId[index]["x"] =
          //     //   Math.sin(ahd * index) * radius;
          //     // this.selectionId[index]["y"] =
          //     //   Math.cos(ahd * index) * radius;
          //     // 锁定位置
          //     mthis.netchart.lockNode(this.selectionId[index].id);
          //   }
        } else {
          this.$Message.error('请选择节点进行层级排列操作！')
        }
      },
      //自适应
      fit() {
        this.changeFlag();
        this.netchart._impl.autoZoom.scene.autoZoomMode = 'overview'
      },
      // 还原（重新布局）
      rebulid() {
        this.changeFlag();
        this.netchart.resetLayout();
      },
      //截屏
      cutScreen() {
        this.netchart.saveAsImage("png", {
          dpi: 1050,
          unit: "px",
          width: 100,
          height: 200,
          scale: 1
        }, true)
        // Canvas2Image.saveAsImage(canvasObj, width, height, type, fileName)
      },
      //保存工作集
      save() {
        this.netchart.selection(["911716", '1016826'])
      },
      //添加节点
      add() {
        /* this.eventData = [{
            text: 'list1',
            chlidren: [{
                text: 'list1-1',
                info: 'this is list1-1'
              },
              {
                text: 'list1-2',
                info: 'this is list1-2'
              },
              {
                text: 'list1-3',
                info: 'this is list1-3'
              },
              {
                text: 'list1-4',
                info: 'this is list1-4'
              },
              {
                text: 'list1-5',
                info: 'this is list1-5'
              },
              {
                text: 'list1-6',
                info: 'this is list1-6'
              },
              {
                text: 'list1-7',
                info: 'this is list1-7'
              }
            ]
          },
          {
            text: 'list2',
            chlidren: [{
                text: 'list2-1',
                info: 'this is list2-1'
              },
              {
                text: 'list2-2',
                info: 'this is list2-2'
              },
              {
                text: 'list2-3',
                info: 'this is list2-3'
              }
            ]
          },
          {
            text: 'list3',
            chlidren: [{
                text: 'list3-1',
                info: 'this is list3-1'
              },
              {
                text: 'list3-2',
                info: 'this is list3-2'
              },
              {
                text: 'list3-3',
                info: 'this is list3-3'
              }
            ]
          },
          {
            text: 'list4',
            chlidren: [{
                text: 'list4-1',
                info: 'this is list4-1'
              },
              {
                text: 'list4-2',
                info: 'this is list4-2'
              },
              {
                text: 'list4-3',
                info: 'this is list4-3'
              },
              {
                text: 'list4-4',
                info: 'this is list4-4'
              },
              {
                text: 'list4-5',
                info: 'this is list4-5'
              },
              {
                text: 'list4-6',
                info: 'this is list4-6'
              },
              {
                text: 'list4-7',
                info: 'this is list4-7'
              },
              {
                text: 'list4-8',
                info: 'this is list4-8'
              },
              {
                text: 'list4-9',
                info: 'this is list4-9'
              },
              {
                text: 'list4-10',
                info: 'this is list4-10'
              },
              {
                text: 'list4-11',
                info: 'this is list4-11'
              }
            ]
          }
        ]; */
        this.modal01 = true;
      },
      //删除选中节点
      remove() {
        var mthis = this;
        if (this.selectionId.length > 0) {
          this.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          //删除节点
          let netChartLog = sessionStorage.getItem('netChartLog');
          let netChartLogJson = JSON.parse(netChartLog).data;
          let ids = [];
          for (let num = 0; num < this.selectionId.length; num++) {
            if (this.selectionId[num].isNode) {
              ids.push(this.selectionId[num].id);
              this.netchart.removeData({
                nodes: [{
                  id: this.selectionId[num].id
                }]
              });
            } else if (this.selectionId[num].isLink) {
              this.netchart.removeData({
                links: [{
                  id: this.selectionId[num].id
                }]
              });
            }
          }
          netChartLogJson.push({
            'id': ids,
            'action': 'remove',
            'other': ''
          })
          // netChartLog = JSON.stringify(netChartLogJson);
          sessionStorage.setItem('netChartLog', JSON.stringify({
            data: netChartLogJson
          }));
          //隐藏节点
          // for (let num = 0; num < this.selectionId.length; num++) {
          //   if (this.selectionId[num].isNode) {
          //     this.netchart.hideNode(this.selectionId[num].id)
          //     id: this.selectionId[num].id;
          //   }
          // }
          mthis.getStatistics()
        } else {
          this.$Message.error('请选择节点进行矩形排列操作！')
        }
      },
      queryPerson() {},
      //反选节点
      removeOther() {
        var mthis = this;
        // 获取当前选中节点
        if (this.selectionId.length > 0) {
          // 获取全部节点
          let selectNodes = this.selectionId;
          let allNodes = this.netchart.nodes();
          let temp01 = [];
          let temp02 = [];
          let netChartLog = sessionStorage.getItem('netChartLog');
          let netChartLogJson = JSON.parse(netChartLog).data;
          let ids = [];
          for (var i in selectNodes) {
            temp01[selectNodes[i].id] = true;
          }
          for (var k in allNodes) {
            if (!temp01[allNodes[k].id]) {
              if (allNodes[k].isNode) {
                ids.push(allNodes[k].id);
                // mthis.netchart.removeData({
                //   nodes: [{
                //     id: allNodes[k].id
                //   }]
                // });
              } else if (allNodes[k].isLink) {
                // ids.push(allNodes[k].id);
                // event.chart.removeData({
                //   links: [{
                //     id: allNodes[k].id
                //   }]
                // });
              }
            }
            mthis.netchart.selection(ids)
          }
          netChartLogJson.push({
            'id': ids,
            'action': 'remove',
            'other': '反选'
          })
          sessionStorage.setItem('netChartLog', JSON.stringify({
            data: netChartLogJson
          }));
          mthis.getStatistics()
          // 反选结果
        } else {
          this.$Message.error('请选中节点！')
        }
      },
      reloadNetData(data) {
        var mthis = this
        let dataarr = []
        dataarr.push(data)
        mthis.netchart.replaceData({
          "nodes": dataarr,
          "links": []
        })
        let ar = []
        for (let k = 0; k < dataarr.length; k++) {
          ar.push(dataarr[k].id)
        }
        mthis.netchart.selection(ar)
        mthis.getStatistics()
      },
      addNetData(data) {
        var mthis = this
        let dataarr = []
        dataarr.push(data)
        mthis.netchart.addData({
          "nodes": dataarr,
          "links": []
        })
        mthis.getStatistics()
      },
      back() {
        let netChartLog = sessionStorage.getItem('netChartLog');
        let netChartLogJson = JSON.parse(netChartLog).data;
        if (netChartLogJson.length > 0) {
          // 删除节点的后退操作 或 反选删除节点的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === 'remove') {
            // for(let i = 0; i < netChartLogJson[netChartLogJson.length-1].id.length; i++) {
            // }
            // 模拟接口，getNodeObjByIds   netChartLogJson[netChartLogJson.length-1].id
          }
          // 添加节点的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === 'add') {}
          // 知识拓展的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === 'knowledgeExpand') {}
          // 事件拓展的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === 'eventExpand') {}
          // 删除最后一条日志
          netChartLogJson = netChartLogJson.slice(0, -1);
          // 将改动过的日志写回session
          sessionStorage.setItem('netChartLog', JSON.stringify({
            data: netChartLogJson
          }));
        } else {
          this.$Message.error('无法后退')
        }
        // this.netchart.back();
      },
      initCharts() {
        var mthis = this;
        (mthis.netchart = new NetChart({
          navigation: {
            // 初始化展示层级
            focusNodeExpansionRadius: 1,
            initialNodes: ["node1"],
            mode: "showall",
            // "mode": "focusnodes" ,
            expandOnClick: false
          },
          // legend: { enabled: true },
          legend: {
            enabled: true,
            width: 900,
            panel: {
              side: "top",
              align: "center"
            }
          },
          interaction: {
            resizing: {
              enabled: false
            }
          },
          advanced: {
            assets: [
              "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            ]
          },
          // 星形布局
          layout: {
            mode: "radial",
            nodeSpacing: 80
          },
          // 层级布局
          // layout: \
          //   mode: "hierarchy",
          //   nodeSpacing: 60, // horizontal spacing between nodes
          //   rowSpacing: 100 // vertical spacing between node rows in the hierarchy layout
          // },
          style: {
            // NetChart.settings.style.dragSelection 通过该属性可以设置框选颜色和背景等属性
            nodeLabel: {
              textStyle: {
                fillColor: '#ccffff'
              },
              // #ccffff
              // 节点名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(0,0,0,0)"
              }
            },
            linkLabel: {
              textStyle: {
                fillColor: '#006666'
              },
              // 事件名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(51, 255, 255, 0.4)"
              },
              aspectRatio: 1
            },
            // linkClasses: [
            // { className: "links", style: { fillColor: "rgba(51, 255, 255, 0.4)"} ,position: 'absolute',borderRadius: '50%',animation: 'move 6s infinite linear'}
            //要改
            // { className: "知识扩展关系", style: { fillColor: "rgba(51, 255, 255, 0.4)"} ,id: "know"},
            // { className: "事件扩展关系", style: { fillColor: "rgba(102, 255, 153, 0.4)"},id: "event" }
            // { className: "知识", style: { fillColor: "rgba(51, 255, 255, 0.4)",direction: "D", lineDash: [3, 3] } },
            // { className: "事件", style: { fillColor: "rgba(51, 255, 255, 0.4)"} }
            // ],
            node: {
              display: "image",
              //节点外环大小
              lineWidth: 2,
              lineColor: "rgba(204,255,255,0.5)",
              imageCropping: true,
              nodeLocked: {
                items: [{
                  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROA" +
                    "AAAaVBMVEVMaXFTU1NFRUX///////9FRUVNTU3+/v5KS0pERERHSEc6Ojr////+/v7///+" +
                    "Tk5OOjo5FRUVCQkJISUg/Pz9LTEs6Ojo8PTxOT07///8zNDM1NjU3NzdRUVExMjE6OzpHR" +
                    "0dJSUlTU1PLhCxuAAAAEXRSTlMAAQFJSpeX5OXl5eXm5uf19ZpgTxEAAABcSURBVHjaTcc" +
                    "FDoBAEEPR4i7DsoLL/Q8JAyzwkib9sGb89P3yxTBorW2MY8v4KqWy5sZJRAkxXIQQ6Tk8p" +
                    "JSxxMUNCMYYMK+o1xCYJrC82yoHwP5UV+Lll5EP6wAJEwV+kJe3nwAAAABJRU5ErkJggg==",
                  py: -1,
                  x: 6,
                  backgroundStyle: {
                    fillColor: "transparent"
                  }
                }]
              }
            },
            nodeStyleFunction: function(node) {
              if (node.data.entity_type === 'event') {
                node.display = 'text'
                node.radius = 15
                node.borderRadius = 300
                // node.image = "http://10.60.1.143/pic_lib/entity/";
                node.image = 'http://10.60.1.140/assets/images/content_node.png'
                if (node.hovered) {
                  node.lineColor = "rgba(51, 255, 255, 0.4)";
                  node.data.lineColor = "rgba(51, 255, 255, 0.4)";
                  node.lineWidth = 10
                  node.data.lineWidth = 10
                  for (let m = 0; m < node.links.length; m++) {
                    // node.links[m].length = 10;
                    node.links[m].hovered = true;
                    // node.links[m].fillColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].lineColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].animation = 'move 0.5s infinite linear';
                  }
                } else {
                  for (let m = 0; m < node.links.length; m++) {
                    node.links[m].hovered = false;
                  }
                }
              } else if (node.data.entity_type === 'content') {
                // var defaultUpdateFunction = function (ctx, radius) {
                //     var halfWidth, halfHeight;
                //     halfWidth = halfHeight = radius;
                //     return {
                //         bounds: [-halfHeight, -halfHeight, halfWidth, halfHeight],
                //         HWidth: halfWidth,
                //         HHeight: halfHeight,
                //         anchor: [0, 0]
                //     };
                // };
                // node.display = 'customShape'
                // node.customShape = {
                //     onUpdate: defaultUpdateFunction,
                //     paint: function (ctx, offsetX, offsetY, Hwidth, Hheight) {
                //         if (this.hovered) {
                //             ctx.fillStyle = "rgba(111,82,184,1)";
                //         } else {
                //             ctx.fillStyle = this.fillColor;
                //         }
                //         ctx.fillRect(offsetX - Hwidth, offsetY - Hheight, Hwidth * 2, Hheight * 2);
                //     },
                //     paintSelection: function (ctx, offsetX, offsetY, Hwidth, Hheight) {
                //         ctx.fillStyle = this.layer.style.selection.fillColor;
                //         ctx.fillRect(offsetX - Hwidth-10, offsetY - Hheight-10, Hwidth * 2 + 20, Hheight * 2 + 20);
                //     }
                // }
                // node.imageCropping = true
                node.display = 'rectangle'
                node.image = 'http://10.60.1.140/assets/images/content_node.png'
                // node.backgroundStyle= {
                //   fillColor: "rgba(51,255,255,0.2)",
                //   lineColor: "rgba(51,255,255,0.2)"
                // },
                // node.fillColor = 'rgba(0,0,0,0)'
                // node.lineColor = 'rgba(0,0,0,0)'
                if (node.hovered) {
                  node.fillColor = 'rgba(51,255,255,0.2)'
                  node.lineColor = 'rgba(51,255,255,0.2)'
                  node.data.lineColor = "rgba(51, 255, 255, 0.4)";
                  node.lineWidth = 10
                  node.data.lineWidth = 10
                  for (let m = 0; m < node.links.length; m++) {
                    // node.links[m].length = 10;
                    node.links[m].hovered = true;
                    // node.links[m].fillColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].lineColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].animation = 'move 0.5s infinite linear';
                  }
                } else {
                  node.fillColor = 'rgba(0,0,0,0)'
                  node.lineColor = 'rgba(0,0,0,0)'
                  for (let m = 0; m < node.links.length; m++) {
                    node.links[m].hovered = false;
                  }
                }
              } else {
                node.display = 'image'
                node.image = "http://10.60.1.143/pic_lib/entity/" + node.id + ".png";
                if (node.hovered) {
                  node.lineColor = "rgba(51, 255, 255, 0.4)";
                  node.data.lineColor = "rgba(51, 255, 255, 0.4)";
                  node.lineWidth = 10
                  node.data.lineWidth = 10
                  for (let m = 0; m < node.links.length; m++) {
                    // node.links[m].length = 10;
                    node.links[m].hovered = true;
                    // node.links[m].fillColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].lineColor = "rgba(51, 255, 255, 0.4)";
                    // node.links[m].animation = 'move 0.5s infinite linear';
                  }
                } else {
                  for (let m = 0; m < node.links.length; m++) {
                    node.links[m].hovered = false;
                  }
                }
              }
              node.cursor = "pointer";
              node.label = node.data.name;
              // node.backgroundStyle.imageCropping =false
              // 默认图标
              // if (node.data.type === "human") {
              //   if (node.data.img === "") {
              //     node.image = "./src/dist/assets/images/ico/b12.ico";
              //   } else {
              //     node.image = "http://10.60.1.143/pic_lib/entity/"+node.id+".png";
              //   }
              // }
              // else if (node.data.type === "event") {
              //   if (node.data.img === "") {
              //     node.image = "./src/dist/assets/images/event.png";
              //   } 
              // } else if (node.data.type === "org") {
              //   if (node.data.img === "") {
              //     node.image = "./src/dist/assets/images/ico/b3.ico";
              //     nodeimageCropping = 'crop'
              //   } 
              // } else {
              //   if (node.data.img === "") {
              //     node.image = node.data.img;
              //     node.imageCropping = 'crop'
              //   } 
              // }
              // node.lineColor = node.data.lineColor =color.replace(",1)",",0.5)"); 
            },
            linkStyleFunction: function(link) {
              link.length = 2;
              link.cursor = "pointer";
              link.fillColor = "rgba(51, 255, 255, 0.4)";
              link.position = 'absolute';
              link.borderRadius = '50%';
              link.animation = 'move 0.5s infinite linear';
              if (link.data.type !== undefined && link.data.type !== "") {
                // link.label = link.data.type;
                link.items = [{ // Default item places just as the regular label.
                  text: link.data.type,
                  padding: 2,
                  scaleWithZoom: true,
                  textStyle: {
                    font: '12px MicrosoftYaHei',
                    fillColor: '#669999',
                    // outlineColor:"rgba(0,0,0,1)",
                    // outlineJoin:'round',
                    // outlineWidth: 10
                  },
                  backgroundStyle: {
                    fillColor: "rgba(0,0,0,0)"
                  }
                }]
              } else {
                link.direction = [100, 100, 100, 100]
                link.fromDecoration = "arrow";
                link.toDecoration = "arrow";
                link.fillColor = 'rgba(51,255,255,0.2)'
                link.lineColor = 'rgba(51,255,255,0.2)'
                link.items = [{ // Default item places just as the regular label.
                  rotateWithLink: true,
                  scaleWithZoom: true,
                  align: 'center',
                  // image: '../../dist/assets/images/circle.png',
                  text: link.data.num,
                  imageSlicing: [0, 0, 20, 20],
                  // padding: 2,
                  textStyle: {
                    font: '12px MicrosoftYaHei',
                    fillColor: '#669999',
                    // outlineColor:"rgba(0,0,0,1)",
                    // outlineJoin:'round',
                    // outlineWidth: 10
                  },
                  backgroundStyle: {
                    // fillColor:"rgba(0,0,0,0)"
                    fillColor: 'rgba(0,0,0,1)',
                    lineColor: 'rgba(51,255,255,0.2)'
                  },
                }]
              }
              //   // link.backgroundStyle= {
              //   //   fillColor: "rgba(51,255,255,0)",
              //   //   lineColor: "rgba(51,255,255,0)"
              //   // }
              //   // if(link.data.className === '知识扩展关系') //要改
              //   // if (link.data.className === '知识') {
              //   //   link.fillColor = 'rgba(51, 255, 255, 0.4)';
              //   //   // , direction: "D", lineDash: [3, 3] 
              //   // } else {
              //   //   link.fillColor = 'rgba(51, 255, 255, 0.4)';
              //   // }
              if (link.hovered) {
                link.radius = 2;
                // 连线颜色
                link.fillColor = "rgba(51, 255, 255, 0.8)";
              } else {
                //连线粗细
                link.radius = 1;
                // 连线颜色
                link.fillColor = "rgba(51, 255, 255, 0.4)";
                // link.fillColor = "#006666";
              }
            },
            selection: {
              // 选中样式
              fillColor: "rgba(51, 255, 255, 0.4)",
              lineColor: "#33ffff"
              // fillColor: 'red',
              // lineColor: 'yellow',
            }
          },
          data: {},
          container: "netchart",
          events: {
            // onClick(event) - 单击时调用的功能。
            // onRightClick(event) - 右键单击​​或长按时调用的功能。
            // onDoubleClick(event) - 双击时调用的函数。
            // onSelectionChange(event) - 用户选择或取消选择某些数据后要调用的函数。
            // onHoverChange(event) - 当鼠标指针下的对象发生变化时要调用的函数。
            // onPositionChange(event) - 在屏幕上重新定位对象时要调用的函数。
            // onError(event) - 发生（数据）错误时要调用的函数。
            // onChartUpdate(event) - 当前视图已更改时调用的函数。通常在平移和导航后。用于更新任何链接的视图。请注意，在图表初始化和API方法之后也会触发此操作。使用args.origin字段确定事件的来源。
            // onPointerDown(event) - 调用指针的函数。
            // onPointerDrag(event) - 发生指针拖动时调用的函数。
            // onPointerMove(event) - 移动鼠标指针时调用的函数。
            // onPointerUp(event) - 调用指针的函数。
            // onSettingsChange(event) - 更改设置时调用的函数。
            // onTripleClick(event) - 当用户三次点击图表时调用的函数。用于自定义函数调用。
            onChartUpdate: function(event) {},
            onSettingsChange: function(event) {},
            onRightClick: function(event) {
              event.preventDefault();
            },
            onClick: function(event) {
              if (event.clickNode || event.clickLink) {
                if (event.clickNode) {}
                mthis.selectItem = event;
                mthis.selectionId = [];
                for (
                  let selectNum = 0; selectNum < event.selection.length; selectNum++
                ) {
                  mthis.selectionId.push(event.selection[selectNum]);
                }
              } else {
                mthis.selectionId = [];
                mthis.selectItem = null;
              }
              // event.preventDefault();
            },
            // onPointerMove: function(event) {
            // },
            onPointerDrag: function(event) {},
            onDoubleClick: function(event) {
              let nodeList = event.selection.filter(function(x) {
                return x.isNode
              })
              let linkList = event.selection.filter(function(x) {
                return x.isLink
              })
              if (event.clickNode || event.clickLink) {
                mthis.$store.commit('setTabSelect', '选中详情')
              } else {
                // mthis.selectionId = null
              }
              //   // if (event.clickNode) { //test the click was on a node
              //   //   this.netchart.addData({
              //   //     nodes: [{
              //   //       "id": "n" + this.nextId
              //   //     }],
              //   //     links: [{
              //   //       "id": "ll" + this.nextId,
              //   //       from: event.clickNode.id,
              //   //       to: "n" + this.nextId
              //   //     }]
              //   //   });
              //   //   this.nextId += 1;
              //   // }
              event.preventDefault();
            },
            onHoverChange: function(event, args) {
              // var content = "";
              // fill the info popup based on the node that was hovered.
              // if (args.hoverItem) {
              //     content = "Item hovered";
              // } else if (args.hoverNode) {
              //     content = "Node hovered";
              // } else if (args.hoverLink) {
              //     content = "Link hovered";
              // }
              // infoElementVisible = !!content;
              // infoElement.innerHTML = content;
              // infoElement.style.display = infoElementVisible ? "block" : "none";
            },
            onSelectionChange(event) {
              if (timer) {
                clearTimeout(timer)
              }
              timer = setTimeout(function() {
                if (event.selection.length > 0) {
                  mthis.ifSelectNode = true
                  mthis.selectItem = event;
                  // 有选中节点或者link
                  mthis.selectionId = [];
                  mthis.selectionIdByType = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: []
                  };
                  console.log('==========event.selection================')
                  console.log(event.selection)
                  for (let nu = 0; nu < event.selection.length; nu++) {
                    if (event.selection[nu].isNode) {
                      //有三种情况，实体，事件，文档
                      if (event.selection[nu].data.entity_type === 'content') {
                        mthis.selectionIdByType.contentIds.push(event.selection[nu].data.id)
                      } else if (event.selection[nu].data.entity_type === 'event') {
                        mthis.selectionIdByType.eventIds.push(event.selection[nu].data.id)
                      } else {
                        mthis.selectionIdByType.nodeIds.push(event.selection[nu].data.id)
                      }
                    } else if (event.selection[nu].isLink) {
                      if (event.selection[nu].data.class === 'event') {
                        mthis.selectionIdByType.eventIds.push(event.selection[nu].data.id)
                      }
                    }
                  }
                  let tem = [];
                  for (
                    let selectNum = 0; selectNum < event.selection.length; selectNum++
                  ) {
                    // mthis.selectionId.push({"selectionId":event.selection[selectNum].id,"selectionType":(event.selection[selectNum].isNode) ? 'node' : 'link'})
                    tem.push(event.selection[selectNum]);
                  }
                  mthis.selectionId = tem
                  // 触发右侧eventdiv改变
                  // mthis.$emit('selectNodes1', [{
                  //   ids: mthis.selectionId
                  // }, mthis.selectionId.length]);
                  mthis.$store.commit('setSelectNetNodes', [{
                    ids: mthis.selectionId
                  }])
                  mthis.$store.commit('setSinglePerson', !(mthis.selectionId.length > 1))
                } else {
                  mthis.selectionId = []
                  mthis.selectionIdByType = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: []
                  };
                  mthis.ifSelectNode = false
                  mthis.selectItem = null
                }
              }, 200);
            }
          },
          toolbar: {
            fullscreen: false,
            enabled: false
          },
          interaction: {
            resizing: {
              enabled: false
            }
          },
          theme: NetChart.themes.dark
        }))
        // mthis.netchart.settings.style.nodeBackground.imageCropping = 'crop'
        // // 节点变形
        // var div = $('<div class="type-select" style="position:absolute;z-index:2" >');
        // var x = $('<label for="v1"><input id="v1" type="radio" checked="checked" name="nodeType" value="rect" />Rectangle <b>(Note: Rectangle shape is also available as a built-in shape since 1.9)</label><br/>');
        // div.append(x);
        // x = $('<label for="v2"><input id="v2" type="radio" name="nodeType" value="diamond"/> Diamond</label><br/>');
        // div.append(x);
        // x = $('<label for="v3"><input id="v3" type="radio" name="nodeType" value="hexagon"/> Hexagon</label><br/>');
        // div.append(x);
        // $("#netchart").before(div);
        // // using jquery to add event handler
        // // Update the chart settings, when user changes desired node display type
        // $('.type-select input:radio').change(function() {
        //   var selected = $('.type-select input:radio:checked').val();
        //    mthis.netchart.updateSettings({
        //     style: {
        //         node: {
        //             display: selected
        //         }
        //     }
        // });
        //   // mthis.netchart.updateSettings({
        //   //   style: {
        //   //     node: {
        //   //       customShape: this.someUserDefinedShapes[selected]
        //   //     }
        //   //   }
        //   // });
        // });
      }
    },
    created() {},
    computed: mapState([
      'searchNetResult', 'netHeight', 'addNetNodes', 'netTimeCondition', 'contentToNetData', 'netStaticsSelectedIds', 'geoToNetData'
    ]),
    watch: {
      expandVisible: function() {
        this.stepVisible = false
      },
      stepVisible: function() {
        this.expandVisible = false
      },
      netStaticsSelectedIds: function() {
        var mthis = this;
        if (mthis.$store.state.netStaticsSelectedIds.length > 0) {
          mthis.netchart.selection(mthis.$store.state.netStaticsSelectedIds);
          mthis.$store.commit('setNetStaticsSelectedIds', [])
        }
      },
      geoToNetData: function() {
        // 调用查询接口，查询id对应数据
      },
      contentToNetData: function() {
        this.netchart.addData(this.contentToNetData)
      },
      netTimeCondition: function() {
        if (this.netTimeCondition) {
          // 选中了时间，令links高亮
          var mthis = this
          let links = this.netchart._impl.data.default.links
          if (this.netTimeCondition.length > 0 && this.netTimeCondition.length === 2) {
            this.$http.post(this.$store.state.ipConfig.api_url + '/limit-event-by-time/', {
              "nodeIds": links,
              "startDate": this.netTimeCondition[0],
              "endDate": this.netTimeCondition[1]
            }).then(response => {
              if (response.code === 0) {
                mthis.netchart.selection(response.data[0].links)
              }
            })
          } else if (this.netTimeCondition.length > 0 && this.netTimeCondition.length === 1) {
            this.$http.post(this.$store.state.ipConfig.api_url + '/limit-event-by-time/', {
              "nodeIds": links,
              "startDate": this.netTimeCondition[0],
              "endDate": this.netTimeCondition[0]
            }).then(response => {
              if (response.code === 0) {
                mthis.netchart.selection(response.data[0].links)
              }
            })
          } else {
            alert('netTimeCondition出错,格式不正确,netTimeCondition长度为' + this.netTimeCondition.length)
          }
        }
      },
      searchNetResult: function(va) {
        if (this.$store.state.tmss === 'net') {
          va.data.type = va.data.entity_type
          va.data.image = va.data.img
          va.data.images = va.data.img
          this.reloadNetData(va.data)
        }
      },
      addNetNodes: function(va) {
        if (this.$store.state.tmss === 'net') {
          this.addNetData(va.node)
        }
      },
      netHeight: function(va) {
        var mthis = this;
        console.log(va)
        mthis.nh = mthis.$store.getters.getNetHeight;
        mthis.nh_50 = va - 55 + 'px'
        // alert( document.getElementById('netchart').style.height)
        // mthis.nh_50 =  (document.documentElement.clientHeight - 65 - 20)*0.8 - 55 + 'px'
        // document.getElementById('netchart').style.height = mthis.nh_50
        // alert(document.getElementById('netchart').style.height)
        // mthis.$store.commit('setNetDivHeight',mthis.nh_50)
      }
    },
    mounted() {
      sessionStorage.setItem('netChartLog', JSON.stringify({
        data: []
      }));
      var mthis = this
      mthis.nh = document.documentElement.clientHeight - 64 - 20 + 'px'
      mthis.nh_50 = document.documentElement.clientHeight - 64 - 20 - 55 + 'px'
      mthis.initCharts();
      mthis.netData = mthis.$store.getters.netData
      // mock.get("/getNodeData").then(function(res) {
      //   mthis.initCharts();
      //   mthis.netchart.addData(res.data.data[0]);
      //   for (let i = 0;i<res.data.data[0].nodes.length;i++){
      //     mthis.netchart.lockNode(res.data.data[0].nodes[i].id);
      //   }
      // });
      // mthis.$http.post('http://10.60.1.141:5000/neighbor-datas/',{'type': [],'nodeIds': 'Q1413'},{"emulateJSON":true}).then(response => {
      // mthis.$http.post(this.$store.state.ipConfig.api_url + '/neighbor-datas/',{'ClassName': '','nodeIds': 'Q1413'},{"emulateJSON":true}).then(response => {
      //   mthis.initCharts();
      //   mthis.netchart.addData(response.data.data[0]);
      //   for (let i = 0;i<response.data.data[0].nodes.length;i++){
      //     mthis.netchart.lockNode(response.data.data[0].nodes[i].id);
      //   }
      // }, response => {
      //     this.$Message.error('getNodeData失败,请查看日志或稍后重试！')
      // });
      // window.onresize = function() {
      //   this.NetHeight = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      //   this.NetHeightdiv = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
      // }
      // this.NetHeight = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      // this.NetHeightdiv = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
    }
  };
</script>
<style>
  .top,
  .bottom {
    text-align: center;
  }
  .padding6 {
    padding: 6px;
  }
  #net .ivu-select-dropdown {
    margin-top: 5px !important;
    border-radius: 0 !important;
    padding: 0px !important;
  }
  #net .ivu-dropdown-item {
    padding: 0 !important;
  }
  .ivu-tooltip-rel i {
    line-height: 30px;
  }
</style>
