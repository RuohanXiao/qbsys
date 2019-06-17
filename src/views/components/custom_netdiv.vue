<template>
  <div :style="{height:nh}" tabindex="1" @keydown="keyD" style="outline:none;">
    <div :style="{height:nh,backgroundColor:'rgba(0,0,0,0)',position:'absolute',zIndex: zIndex,top:0,width:'99%',margin:'0 10px'}">
      <Spin size="large" fix v-if="spinShow"></Spin>
    </div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px',border:'solid 1px #336666'}" id="net">
      <div class="divStyle">
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifhasNode? 'button-div':'button-div-disable'" @click="newCanvans">
            <Icon class="icon iconfont icon-qingchu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">清空</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('remove')">
            <Icon class="icon iconfont icon-delete-point DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">删除</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('removeOther')">
            <Icon class="icon iconfont icon-fanxuan DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">反选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifhasNode? 'button-div': 'button-div-disable'" @click="triggerMethods('selectAll')">
            <Icon class="icon iconfont icon-quanxuan DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">全选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="openCreateGroupModal">
            <Icon class="icon iconfont icon-add DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">创建集合</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="nailNode">
            <Icon class="icon iconfont icon-nail-copy DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">锁定</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="unnailNode">
            <Icon class="icon iconfont icon-nail-copy-copy-copy DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">解锁</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('square')">
            <Icon class="icon iconfont icon-grid DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">矩形</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('circleShape')">
            <Icon class="icon iconfont icon-circle DVSL-bar-btn-new DVSL-bar-btn-back" align="center" size="26"></Icon>
            <p class="img-content">环形</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('star')">
            <Icon class="icon iconfont icon-star1 DVSL-bar-btn-new DVSL-bar-btn-back" align="center" size="26"></Icon>
            <p class="img-content">星形</p>
          </div>
        </Tooltip>
        <Tooltip placement="top" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('hierarchy')">
            <Icon class="icon iconfont icon-expand DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">层级</p>
          </div>
        </Tooltip>
        <Tooltip placement="top" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('jutuan')">
            <Icon class="icon iconfont icon-jutuan DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">自动</p>
          </div>
        </Tooltip>
        <!-- <div class="divSplitLine"></div>
            <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
              <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('toGeo')">
                <Icon class="icon iconfont icon-tuisongzhikongjian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                <p class="img-content">推送空间</p>
              </div>
            </Tooltip>
            <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
              <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('toContent')">
                <Icon class="icon iconfont icon-tuisongzhiwendang DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                <p class="img-content">推送文档</p>
              </div>
            </Tooltip> -->
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="openCreatProjectModal('import')">
            <Icon class="icon iconfont icon-daoru DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">导入图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="triggerMethods('openCreatProjectModalExpend')">
            <Icon class="icon iconfont icon-daochu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">导出图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifhasNode? 'button-div':'button-div-disable'" @click="cutScreen">
            <Icon class="icon iconfont icon-cut DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">截屏</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifhasNode? 'button-div':'button-div-disable'" @click="fit">
            <Icon class="icon iconfont icon-zhengchangshitu--quanping DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">适配</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <div :style="{height:nh_50,borderRight:'solid 1px #336666',borderLeft:'solid 1px #336666',borderBottom:'solid 1px #336666',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div id="netchart" :style="{height:nh_50}"></div>
      <operatorHub :style="{height:nh_50,top:'55px'}" :operatorConfig="operatorConfig"></operatorHub>
      <transition name="mybox">
        <div class="xuanfuAlert" v-show="popout">{{message.text}}</div>
      </transition>
    </div>
    <!-- flag 是modal显示开关，eventData是modal左侧列表数据 -->
    <modal-chart :flag="modal01" :edata="eventData" @detailModalFlag="setFlagToFalse"></modal-chart>
    <workset-modal :worksetData="worksetData" :type="worksetType" :flag="worksetFlag" :worksetInfo="worksetInfo" />
    <workatlas-modal :workatlastData="workatlastData" :type="workatlasType" :flag="workatlasFlag" />
  </div>
</template>

<script>
  import axios from "axios";
  import mock from "../../mock/index.js";
  import modalChart from "./custom_modal_add.vue";
  import worksetModal from "./custom_workSet_modal.vue";
  import workatlasModal from "./custom_workAtlas_modal.vue";
  import {
    rightMenu
  } from '../../dist/assets/js/rightMenu.js'
  import {
    mapState,
    mapMutations
  } from "vuex";
  import util from "../../util/tools.js";
  import html2canvas from "../../util/html2canvas.min.js";
  import Canvas2Image from "../../util/canvas2image.js";
  import configer from "../../util/configContrl.js";
  import operatorHub from "./custom_operatorHub.vue"
  mock.test = 1;
  var timer1 = null;
  /* eslint-disable */
  var timer = null;
  var timer2 = null;
  export default {
    name: "App",
    data() {
      return {
        linkTemp: new Object(),
        prevKdown: null,
        prevKup: null,
        keyCount: 0,
        updateStyleCounter: 0,
        worksetInfo: {
          title: "",
          des: "",
          id: ""
        },
        worksetData: [],
        workatlastData: [{
          title: "",
          des: "",
          data: {
            nodes: [],
            links: []
          },
          time: ""
        }],
        worksetType: "",
        workatlasType: "",
        worksetFlag: 0,
        workatlasFlag: 0,
        selectionEventObj: null,
        eventImgRules: null,
        popout: false,
        zIndex: 0,
        message: {
          text: "",
          time: ""
        },
        selectLineColor: '#ccffff',
        selectShadowColor: '#33ffff',
        hightlightLineColor: '#009999',
        hightlightShadowColor: "#009999",
        hightlightDocShadowColor: "#33ffff",
        spinShow: false,
        expandFlag_gongzhi: "knowledge_gongzhi",
        expandFlag: "knowledge",
        stepFlag: "knowledge",
        expandVisible: false,
        expandGongzhiVisible: false,
        stepVisible: false,
        InputNumber: 0,
        modalStep: false,
        createGroupModal: false,
        // timer: null,
        basicY: 0,
        basicX: 0,
        // dataurl: '../../dist/data/netData.json',
        nh: 0,
        pathHoverFlag: false,
        modal_loading: false,
        selectionId: [],
        selectionIdByTypeData: {
          nodeIds: [],
          eventIds: [],
          contentIds: {
            'type': 'push',
            'ids': []
          }
        },
        myMap: new Map(),
        myMapevent: new Map(),
        netchart: null,
        nextId: 4,
        flag: true,
        selectItem: null,
        saveNum: 0,
        modal01: false,
        eventData: null,
        ids: [],
        ifhasNode: false,
        ifSelectNode: false,
        ifSelectTwoNode: false,
        ifSelectOnlyTwoNode: false,
        // 节点形状
        stepTimer: null,
        expandTimer: null,
        expandTimer_gongzhi: null,
        nh_50: 0,
        buttonTimer: null,
        hoverdNode: null,
        linkedNodeFlag: false,
        linkedNodesType: '',
        linkedNodes: [],
        operatorConfig: [
          // {
          //   name:'文档聚类',
          //   id:'docCluster',
          //   iconName:'icon-kongjianfenxi',
          //   disabled:true
          // },
          // {
          // name:'倾向性分析',
          // id:'sentimentAnalysis',
          // iconName:'icon-kongjianfenxi',
          // disabled:true
          // },
          // {
          // name:'文档摘要',
          // id:'docSummary',
          // iconName:'icon-kongjianfenxi',
          // disabled:true
          // }
          {
            name: '社区发现',
            id: 'community',
            iconName: 'icon-kongjianfenxi',
            // openFunction:'communityDiscovery',
            // closeFunction:'disCommunityDiscovery',
            operatorSurface: [],
            disabled: false
          }
        ]
      };
    },
    components: {
      modalChart,
      worksetModal,
      workatlasModal,
      Canvas2Image,
      operatorHub
    },
    methods: {
      communityDiscovery() {
        alert(1)
      },
      disCommunityDiscovery() {
        alert(2)
      },
      keyD(e) {
        var mthis = this;
        if (mthis.keyCount < 0) {
          mthis.keyCount = 0
        }
        if (e.code != mthis.prevKdown) {
          mthis.keyCount = mthis.keyCount + 1;
          mthis.prevKdown = e.code
        }
        if (mthis.$store.state.tmss === 'net') {
          var e = event || window.event || arguments.callee.caller.arguments[0];
          if (e && e.keyCode == 46 && (!e.shiftKey) && (!e.altKey) && (!e.ctrlKey)) {
            // delete
            mthis.triggerMethods('remove')
            mthis.clearBubble(e)
          }
          if (e.keyCode == 65 && (e.ctrlKey || e.metaKey) && (!e.shiftKey) && (!e.altKey)) {
            mthis.triggerMethods('selectAll')
            mthis.clearBubble(e)
          }
        }
      },
      keyU(e) {
        var mthis = this;
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (mthis.keyCount == 1 && e && e.keyCode == 46) {
          // delete
          mthis.clearBubble(e)
        }
        if (mthis.keyCount == 2 && e.keyCode == 65 && (e.ctrlKey || e.metaKey)) {
          mthis.clearBubble(e)
        }
        if (e.code != mthis.prevKup) {
          mthis.keyCount = mthis.keyCount - 1;
          mthis.prevKup = e.code
        }
        // console.log('keyup')
        // console.log(mthis.keyCount)
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
      juhe() {
        let contentIds = this.selectionIdByTypeData.contentIds.ids;
        let ids = contentIds.length > 0 ? contentIds.concat(this.selectionIdByTypeData.eventIds) : this.selectionIdByTypeData.eventIds
        let mthis = this
        let allNodes = mthis.netchart.nodes().map(item => {
          return item.id
        })
        let timestamp = new Date().getTime()
        mthis.$http
          .post(mthis.$store.state.ipConfig.api_url + "/aggregation/", {
            allNodeIds: allNodes,
            selectNodeIds: ids,
            timestamp: timestamp
          })
          .then(response => {
            console.log(response.body)
            console.log(response.body.code === 0)
            console.log(timestamp)
            console.log(timestamp + '' === response.body.timestamp)
            if (response.body.code === 0) {
              if (timestamp + '' === response.body.timestamp) {
                ids.map(item => {
                  console.log(item)
                  mthis.netchart.hideNode(item + '')
                  return item
                })
                mthis.netchart.addData(response.body.data)
              }
            } else {
              mthis.setMessage('聚合失败！aggregation异常')
            }
          })
      },
      jutuan() {
        // this.changeCenterNode()
        // this.changNetchartMode('d')
        // this.netchart.updateSettings({
        //       layout: {
        //         mode: 'dynamic'
        //       }
        //     })
        this.netchart.updateSettings();
        this.netchart.updateSize();
      },
      changeCenterNode(arr) {
        let mthis = this
        // console.log(mthis.selectionId)
        this.netchart.updateSettings({
          navigation: {
            focusNodeExpansionRadius: 3,
            // initialNodes: mthis.selectionId,
            initialNodes: ['3e875d823b6e314db9c239058866fb8f'],
            mode: "focusnodes",
            expandOnClick: false
          }
        })
      },
      changNetchartMode(n) {
        //更改样式mode
        // switch (n) {
        //   case 'h':
        //     this.netchart.updateSettings({
        //       layout: {
        //         mode: 'hierarchy'
        //       }
        //     })
        //     break;
        //   case 's':
        //     this.netchart.updateSettings({
        //       layout: {
        //         mode: 'static'
        //       }
        //     })
        //     break;
        //   case 'r':
        //     this.netchart.updateSettings({
        //       layout: {
        //         mode: 'radial'
        //       }
        //     })
        //     break;
        //   case 'd':
        //     this.netchart.updateSettings({
        //       layout: {
        //         mode: 'dynamic'
        //       }
        //     })
        //     break;
        // }
      },
      linkedKnowlage() {
        var mthis = this
        if (mthis.selectionId.length > 0) {
          mthis.linkedNodeFlag = true
          mthis.linkedNodesType = 'entity'
          mthis.linkedNodes = mthis.selectionId
          mthis.setMessage('已获取到带一组节点，请选择第二组节点')
        } else {
          mthis.setMessage('请选择节点后再进行链向操作')
        }
      },
      linkedKnowlageAll() {
        // this.setMessage('请期待下一版本的链向功能')
        var mthis = this
        if (mthis.selectionId.length > 0) {
          mthis.linkedNodeFlag = true
          mthis.linkedNodesType = 'all'
          mthis.linkedNodes = mthis.selectionId
          mthis.setMessage('已获取到带一组节点，请选择第二组节点')
        } else {
          mthis.setMessage('请选择节点后再进行链向操作')
        }
      },
      readyToLink(ids) {
        var mthis = this
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + "/ShortPath/", {
            NodeIds_single: mthis.linkedNodes,
            NodeIds_double: ids,
            typeLabel: mthis.linkedNodesType
          })
          .then(response => {
            if (response.body.code == 0) {
              // mthis.changNetchartMode('r')
              response.body.data.nodes.map(item => {
                if (item.entity_type === 'document') {
                  item.name = item.title.substring(0, 19) + '...'
                }
                if (item.entity_type === 'event') {
                  sitem.name = item.event_subtype
                }
              })
              if (response.body.data.nodes.length > 0) {
                mthis.netchart.addData(response.body.data)
              } else {
                mthis.setMessage('未找到相关链向，请重新选择节点！')
              }
            }
          }).then(() => {
            mthis.linkedNodeFlag = false
            mthis.linkedNodesType = ''
            mthis.linkedNodes = []
          })
      },
      nailNode() {
        // console.log(this.selectionId)
        for (let i = 0; i < this.selectionId.length; i++) {
          this.netchart.lockNode(this.selectionId[i])
          // util.promisify(lockNode,[this.selectionId[i]],this.netchart).then(
          //   alert('bb')
          // )
          this.netchart.updateStyle(this.selectionId[i])
        }
      },
      unnailNode() {
        // console.log(this.selectionId)
        for (let i = 0; i < this.selectionId.length; i++) {
          // util.promisify(unlockNode,[this.selectionId[i]],this.netchart).then(
          //   alert('aa')
          // )
          this.netchart.unlockNode(this.selectionId[i])
          this.netchart.updateStyle(this.selectionId[i])
        }
      },
      selectAll() {
        if (this.netchart.nodes().length > 0) {
          this.netchart.selection(this.netchart.nodes().map(item => {
            return item.id
          }))
        } else {
          this.setMessage('画布上还没有节点，无法全选')
        }
      },
      deleteRightMenu() {
        var mthis = this;
        $('#ringRightMenu').remove()
      },
      // 触发按钮事件
      triggerMethods(n) {
        switch (n) {
          case 'selectAll':
            this.selectAll()
            break;
        }
        if (this.selectionId.length > 0) {
          switch (n) {
            case 'removeOther':
              this.removeOther()
              break;
            case 'remove':
              this.remove()
              break;
            case '聚合':
              this.removeOther()
              break;
            case 'square':
              this.square()
              break;
            case 'circleShape':
              this.circleShape()
              break;
            case 'star':
              this.star()
              break;
            case 'hierarchy':
              this.hierarchy1()
              break;
            case 'juhe':
              this.juhe()
              break;
            case 'jutuan':
              this.jutuan()
              break;
            case 'expandNodeKnowledge':
              this.expandNodeKnowledge()
              break;
            case 'expandNodeEvent':
              this.expandNodeEvent()
              break;
            case 'expandNodeContent':
              this.expandNodeContent()
              break;
            case 'toGeo':
              this.toGeo()
              break;
            case 'toContent':
              this.toContent()
              break;
            case 'openCreatProjectModalExpend':
              this.openCreatProjectModal('expend')
              // this.pathKnowledge()
              break;
            case 'linkedKnowlage':
              this.linkedKnowlage()
              break;
            case 'linkedKnowlageAll':
              this.linkedKnowlageAll()
              break;
          }
        }
        if (this.selectionId.length > 1) {
          switch (n) {
            case 'gongzhiEnitiy':
              this.gongzhiEnitiy()
              break;
            case 'gongzhiEvent':
              this.gongzhiEvent()
              break;
            case 'gongzhiDoc':
              this.gongzhiDoc()
              break;
          }
        }
        if (this.selectionId.length > 2) {
          switch (n) {
            case 'showModalStepKnowledge':
              this.shortPath(this.selectionId)
              break;
            case 'showModalStepAll':
              this.shortAllPath(this.selectionId)
              break;
          }
        }
      },
      shortPath(ids) {
        if (ids.length > 1) {
          var mthis = this
          // // console.log(ids);
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + "/ShortPath/", {
              NodeIds_single: ids,
              NodeIds_double: [],
              typeLabel: "entity"
            })
            .then(response => {
              if (response.body.code === 0) {
                if (response.body.data.nodes.length > 0) {
                  // mthis.changNetchartMode('r')//  mthis.changNetchartMode('d')
                  mthis.netchart.addData(response.body.data)
                  mthis.netchart.selection(response.body.data.nodes.map(item => {
                    return item.id
                  }))
                  // changNetchartMode('s')
                } else {
                  mthis.setMessage('未找到最短路径')
                }
              } else {
                mthis.setMessage('ShortPath接口异常！')
              }
            })
        } else {
          mthis.setMessage('请选择两个或以上的节点进行路径操作')
        }
      },
      shortAllPath(ids) {
        var mthis = this
        if (ids.length > 1) {
          mthis.$http
            .post(mthis.$store.state.ipConfig.api_url + "/ShortPath/", {
              NodeIds_single: ids,
              NodeIds_double: [],
              typeLabel: "all"
            })
            .then(response => {
              if (response.body.code === 0) {
                if (response.body.data.nodes.length > 0) {
                  // mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                  response.body.data.nodes.map(item => {
                    if (item.entity_type === 'document') {
                      item.name = item.title.substring(0, 19) + '...'
                    }
                    if (item.entity_type === 'event') {
                      item.name = item.event_subtype
                    }
                  })
                  mthis.netchart.addData(response.body.data)
                  setTimeout(function() {
                    mthis.netchart.selection(response.body.data.nodes.map(item => {
                      return item.id
                    }))
                    // mthis.changNetchartMode('s')
                  }, 200);
                } else {
                  mthis.setMessage('未找到最短路径')
                }
              } else {
                mthis.setMessage('ShortPath接口异常！')
              }
            })
        } else {
          mthis.setMessage('请选择两个或以上的节点进行路径操作')
        }
      },
      changeMode(type) {
        this.netchart.replaceSettings({
          layout: {
            mode: type
          }
        })
      },
      openCreatProjectModal(type) {
        var mthis = this;
        mthis.workatlastData = [{
          title: "",
          des: "",
          data: {
            nodes: [],
            links: []
          },
          time: ""
        }];
        // // // console.log('=====selectionId==========')
        // // // console.log(mthis.selectionId)
        setTimeout(() => {
          let ddata = mthis.netchart.exportData();
          mthis.workatlastData = [{
            title: "",
            des: "",
            data: ddata, //xrh  这里写的不对，现在是全部导出，应该选中导出
            time: new Date().getTime()
          }];
          // if (mthis.selectionId.length>0) {
          //   mthis.workatlastData = [{
          //     title: '',
          //     des: '',
          //     data: mthis.netchart.exportData(),//xrh  这里写的不对，现在是全部导出，应该选中导出
          //     time: new Date().getTime()
          //   }];
          // } else {
          // }
          this.workatlasType = type;
          this.workatlasFlag = this.workatlasFlag + 1;
        }, 200);
        // // // console.log(this.worksetData)
      },
      openCreateGroupModal() {
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
        // // // console.log('=====setSelectionIdByType==========')
        // // // console.log(mthis.selectionIdByTypeData)
        if (mthis.selectionIdByTypeData.nodeIds.length + mthis.selectionIdByTypeData.eventIds.length + mthis.selectionIdByTypeData.contentIds.ids.length > 0) {
          if (mthis.selectionIdByTypeData.nodeIds.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/entity-info/", {
                nodeIds: mthis.selectionIdByTypeData.nodeIds
              })
              .then(response => {
                if (response.body.code === 0) {
                  mthis.worksetData[0].type = "entity";
                  mthis.worksetData[0].data = response.body.data[0].nodes;
                }
              });
          }
          if (mthis.selectionIdByTypeData.eventIds.length > 0) {
            // ;
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/event-detail/", {
                EventIds: mthis.selectionIdByTypeData.eventIds
              })
              .then(response => {
                if (response.body.code === 0) {
                  mthis.worksetData[1].type = "event";
                  response.body.data.map(item => {
                    item.name = item.event_subtype
                    let mapItem = mthis.myMap.get(item.event_subtype)
                    item.img = mapItem ? mapItem.img : "http://10.60.1.140/assets/images/event.png";
                    return item
                  })
                  mthis.worksetData[1].data = response.body.data;
                }
              });
          }
          if (mthis.selectionIdByTypeData.contentIds.ids.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/doc-detail/", {
                docIds: mthis.selectionIdByTypeData.contentIds.ids
              })
              .then(response => {;
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
          // console.log('mthis.worksetData----------')
          // console.log(mthis.worksetData)
        }
        this.worksetType = "add";
        this.worksetFlag = this.worksetFlag + 1;
        // // // console.log(this.worksetData)
      },
      startTimer(v) {
        var mthis = this;
        buttonTimer = setTimeout(function(e) {
          e.preventDefault();
          mthis.showModalStep(v);
        }, 2000);
      },
      stopTimer() {
        clearTimeout(buttonTimer);
      },
      addStepTimer() {
        let mthis = this;
        mthis.stepTimer = setTimeout(function(e) {
          // e.preventDefault();
          mthis.stepVisible = true;
        }, 1000);
      },
      stopStepTimer() {
        clearTimeout(this.stepTimer);
        this.stepVisible = false;
      },
      addExpandTimer() {
        let mthis = this;
        this.expandTimer = setTimeout(function() {
          mthis.expandVisible = true;
        }, 1000);
      },
      stopExpandTimer() {
        clearTimeout(this.expandTimer);
        this.expandVisible = false;
      },
      addGongzhi() {
        let mthis = this;
        this.expandTimer_gongzhi = setTimeout(function() {
          mthis.expandGongzhiVisible = true;
        }, 1000);
      },
      stopGongzhi() {
        clearTimeout(this.expandTimer_gongzhi);
        this.expandGongzhiVisible = false;
      },
      toGeo() {
        this.$store.commit("changeTMSS", "geo");
        let arr = {
          'orgIds': [],
          'eventIds': []
        };
        for (let i = 0; i < this.selectionIdByTypeData.nodeIds.length; i++) {
          arr.orgIds.push(this.selectionIdByTypeData.nodeIds[i]);
        }
        for (let j = 0; j < this.selectionIdByTypeData.eventIds.length; j++) {
          arr.eventIds.push(this.selectionIdByTypeData.eventIds[j]);
        }
        //arr = util.unique(arr);
        this.$store.commit("setNetToGeoData", arr);
      },
      toContent() {
        if (this.selectionIdByTypeData.contentIds.ids.length > 0) {
          this.$store.commit("setNetToContentData", this.selectionIdByTypeData);
          this.$store.commit("changeTMSS", "content");
        } else {
          this.setMessage("非文档节点不能推送至文档!");
        }
      },
      spread() {
        var mthis = this;
        //   return x.isLink
        // }))
        //   return x.isLink && x.data.class === 'event'
        // }))
        //   return x.isLink && x.data.class === 'event' && x.data.num !== ''
        // }))
        let eventArry = this.selectionId.filter(function(x) {
          return x.isLink && x.data.class === "event" && x.data.num !== "";
        });
        this.netchart.removeData({
          links: [{
            id: eventArry[0].id
          }]
        });
        mock.get("/getSpreadEvent").then(function(res) {
          for (let m = 0; m < res.data.data[0].node.length; m++) {
            // res.data.data[0].node[m].img = eventImgRules.get(res.data.data[0].node.name)
          }
          mthis.netchart.addData(res.data.data[0]);
        });
      },
      con() {},
      showModalStep(a) {
        this.modalStep = true;
      },
      pathKnowledge() {
        this.modalStep = false;
        this.showPathKnowledge();
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
        // var mthis = this
        // let nodeArr = Object.keys(mthis.netchart._impl.data.default.nodes).map(key => mthis.netchart._impl.data.default.nodes[key].id);
        // mthis.$store.commit('setStaticsIds', nodeArr);
        // let linkArr = Object.keys(mthis.netchart._impl.data.default.links).map(key => mthis.netchart._impl.data.default.links[key]);
        // mthis.$http.post(this.$store.state.ipConfig.api_url + '/node-statistics/', {
        //   "nodeIds": nodeArr
        // }).then(response => {
        //   mthis.$store.commit('setDataStatisticsEvent', response.data);
        // })
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
        // this.flag = !this.flag;
        // let focusId = (this.selectionId.length > 0) ? (this.selectionId[0].id) : 'node1'
        // this.netchart.addFocusNode(focusId, 50)
      },
      // 悬浮点亮节点
      hoverLightinNodes(ids) {
        this.netchart.selection(ids);
      },
      //知识拓展节点（加载新数据）
      expandNodeKnowledge() {
        var mthis = this;
        let arr = [];
        let entitRes,
          eventRes,
          docRes = null;
        if (mthis.selectionId.length > 0) {
          mthis.spinShow = true;
          mthis.zIndex = 999;
          let arrList_net = new Array();
          let arrList_event = new Array();
          let arrList_doc = new Array();
          // console.log('===============selectionIdByTypeData==============================')
          // console.log(mthis.selectionIdByTypeData)
          let arrList = new Array().concat(mthis.selectionIdByTypeData.nodeIds).concat(mthis.selectionIdByTypeData.eventIds).concat(mthis.selectionIdByTypeData.contentIds.ids)
          // // let arrTypeList_net = new Array();
          // // let arrTypeList_event = new Array();
          // // let arrTypeList_doc = new Array();
          // for (let i = 0; i < mthis.selectionIdByTypeData.nodeIds.length; i++) {
          //   arrList_net.push(mthis.selectionIdByTypeData.nodeIds[i]);
          //   // arrTypeList_net.push("entity");
          // }
          // for (let i = 0; i < mthis.selectionIdByTypeData.eventIds.length; i++) {
          //   arrList_event.push(mthis.selectionIdByTypeData.eventIds[i]);
          //   // arrTypeList_event.push("event");
          // }
          // for (let i = 0; i < mthis.selectionIdByTypeData.contentIds.length; i++) {
          //   arrList_doc.push(mthis.selectionIdByTypeData.contentIds[i]);
          //   // arrTypeList_doc.push("document");
          // }
          mthis.saveData(
            mthis.netchart._impl.data.default.nodes,
            mthis.netchart._impl.data.default.links,
            this.saveNum
          );
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(
              mthis.selectionId[i].id ?
              mthis.selectionId[i].id :
              mthis.selectionId[i]
            );
          }
          if (arrList.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/related-all/", {
                NodeIds: arrList,
                TypeLabel: "entity"
              })
              .then(response => {
                if (response.body.code === 0) {
                  entitRes = response.body.data[0].RelatedEntity;
                  let items = {
                    nodes: [],
                    links: []
                  };
                  // let ids = mthis.selectionId;
                  let nodes = []
                  let links = []
                  let ids = mthis.selectionId;
                  for (let n = 0; n < arrList.length; n++) {
                    if (entitRes[arrList[n]]) {
                      nodes = nodes.concat(entitRes[arrList[n]].nodes)
                      links = links.concat(entitRes[arrList[n]].links)
                      ids = ids.concat(entitRes[arrList[n]].nodes.map(it => {
                        return it.id
                      }))
                    }
                  }
                  // mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                  mthis.netchart.addData({
                    'nodes': nodes,
                    'links': links
                  });
                  setTimeout(function() {
                    mthis.netchart.selection(ids);
                    // mthis.changNetchartMode('s')
                  }, 200);
                } else {
                  mthis.setMessage("related-all 接口异常！");
                }
              });
          }
          mthis.spinShow = false;
          mthis.zIndex = 0;
          mthis.getStatistics();
        } else {
          // mthis.$Message.error('请至少选择一个节点进行拓展操作！')
          mthis.setMessage("请至少选择一个节点进行拓展操作！");
        }
        mthis.expandFlag = "knowledge";
      },
      closeModal() {
        mthis.spinShow = false;
        mthis.zIndex = 0;
      },
      newCanvans() {
        this.netchart.replaceData({
          nodes: [],
          links: []
        });
        this.$store.commit("setSearchNetResult", [{
          node: {
            nodes: []
          },
          id: "",
          name: ""
        }]);
        this.selectionId = [];
        this.selectionIdByTypeData = new Object({
          nodeIds: [],
          eventIds: [],
          contentIds: {
            'type': 'net',
            'ids': []
          }
        });
        this.$store.commit("setSelectionIdByType", this.selectionIdByTypeData)
        this.ifSelectNode = false;
        this.ifSelectTwoNode = false;
        this.ifSelectOnlyTwoNode = false;
        this.ifhasNode = false
        this.getStatistics();
      },
      // 事件拓展
      expandNodeEvent() {
        var mthis = this;
        let arr = [];
        let entitRes,
          eventRes,
          docRes = null;;
        if (mthis.selectionId.length > 0) {
          mthis.spinShow = true;
          mthis.zIndex = 999;
          let arrList = new Array();
          let arrTypeList = new Array();
          for (let i = 0; i < mthis.selectionIdByTypeData.nodeIds.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.nodeIds[i]);
            arrTypeList.push("entity");
          }
          for (let i = 0; i < mthis.selectionIdByTypeData.eventIds.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.eventIds[i]);
            arrTypeList.push("event");
          }
          for (let i = 0; i < mthis.selectionIdByTypeData.contentIds.ids.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.contentIds.ids[i]);
            arrTypeList.push("document");
          }
          mthis.saveData(
            mthis.netchart._impl.data.default.nodes,
            mthis.netchart._impl.data.default.links,
            this.saveNum
          );
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(
              mthis.selectionId[i].id ?
              mthis.selectionId[i].id :
              mthis.selectionId[i]
            );
          }
          if (arrTypeList.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/related-all/", {
                NodeIds: arrList,
                TypeLabel: "event"
              })
              .then(response => {
                if (response.body.code === 0) {
                  if (JSON.stringify(response.body.data[0].RelatedEvent) !== "{}") {
                    // // console.log('if(JSON.stringify(response.body.data[0].RelatedEvent) == "{}")')
                    // // console.log(JSON.stringify(response.body.data[0].RelatedEvent) !== "{}")
                    // // console.log(response)
                    eventRes = response.body.data[0].RelatedEvent;
                    let eventList = [];
                    let sList = arrList;
                    let nodes = []
                    let links = []
                    let ids = mthis.selectionId;
                    for (let n = 0; n < arrList.length; n++) {
                      if (eventRes[arrList[n]]) {
                        nodes = nodes.concat(eventRes[arrList[n]].nodes)
                        links = links.concat(eventRes[arrList[n]].links)
                        ids = ids.concat(eventRes[arrList[n]].nodes.map(it => {
                          return it.id
                        }))
                      }
                    }
                    nodes.map(ite => {
                      ite.img = (ite.img) ? ite.img : ''
                      ite.loaded = true
                      ite.name = ite.event_subtype
                      return ite
                    })
                    links.map(ite => {
                      if (ite.relation_name !== undefined) {
                        ite.type = ite.relation_name
                      }
                      return ite
                    })
                    // mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                    mthis.netchart.addData({
                      'nodes': nodes,
                      'links': links
                    });
                    setTimeout(function() {
                      mthis.netchart.selection(ids);
                      // mthis.changNetchartMode('s')
                    }, 200);
                  } else {
                    mthis.setMessage('未找到关联事件')
                  }
                } else {
                  mthis.setMessage("related-all 接口异常！");
                }
              });
          }
          mthis.spinShow = false;
          mthis.zIndex = 0;
          mthis.getStatistics();
        } else {
          mthis.setMessage("请至少选择一个节点进行拓展操作！");
        }
        mthis.expandFlag = "event";
      },
      // 共线扩展
      expandNodeContent() {
        var mthis = this;
        let arr = [];
        let entitRes,
          eventRes,
          docRes = null;
        if (mthis.selectionId.length > 0) {
          mthis.spinShow = true;
          mthis.zIndex = 999;
          let arrList = new Array();
          let arrTypeList = new Array();
          for (let i = 0; i < mthis.selectionIdByTypeData.nodeIds.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.nodeIds[i]);
            arrTypeList.push("entity");
          }
          for (let i = 0; i < mthis.selectionIdByTypeData.eventIds.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.eventIds[i]);
            arrTypeList.push("event");
          }
          for (let i = 0; i < mthis.selectionIdByTypeData.contentIds.length; i++) {
            arrList.push(mthis.selectionIdByTypeData.contentIds[i]);
            arrTypeList.push("document");
          }
          mthis.saveData(
            mthis.netchart._impl.data.default.nodes,
            mthis.netchart._impl.data.default.links,
            this.saveNum
          );
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(
              mthis.selectionId[i].id ?
              mthis.selectionId[i].id :
              mthis.selectionId[i]
            );
          }
          if (arrTypeList.length > 0) {
            mthis.$http
              .post(mthis.$store.state.ipConfig.api_url + "/related-all/", {
                NodeIds: arrList,
                // NodeTypes: arrTypeList,
                TypeLabel: "document"
              })
              .then(response => {
                if (response.body.code === 0) {
                  if (JSON.stringify(response.body.data[0].RelatedDocument) !== "{}") {
                    docRes = response.body.data[0].RelatedDocument;
                    let docList = [];
                    let sList = arrList;
                    let sids = docList;
                    let nodes = []
                    let links = []
                    let ids = mthis.selectionId;
                    for (let n = 0; n < arrList.length; n++) {
                      if (docRes[arrList[n]]) {
                        nodes = nodes.concat(docRes[arrList[n]].nodes)
                        links = links.concat(docRes[arrList[n]].links)
                        ids = ids.concat(docRes[arrList[n]].nodes.map(it => {
                          return it.id
                        }))
                      }
                    }
                    nodes.map(ite => {
                      ite.img = (ite.img) ? ite.img : ''
                      ite.loaded = true
                      // console.log(ite.title)
                      ite.name = (ite.name) ? ite.name : ((ite.title + "").substring(0, 19) + '...')
                      return ite
                    })
                    links.map(ite => {
                      ite.type = (ite.type) ? ite.type : ite.relation_name
                      return ite
                    })
                    // mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                    mthis.netchart.addData({
                      'nodes': nodes,
                      'links': links
                    });
                    setTimeout(function() {
                      mthis.netchart.selection(ids);
                      // mthis.changNetchartMode('s')
                    }, 200);
                  } else {
                    mthis.setMessage('未找到关联文档')
                  }
                } else {
                  mthis.setMessage("related-all 接口异常！");
                }
              });
          }
          mthis.spinShow = false;
          mthis.zIndex = 0;
          mthis.getStatistics();
        } else {
          mthis.setMessage("请至少选择一个节点进行拓展操作！");
        }
        mthis.expandFlag = "content";
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
        var mthis = this;
        (this.selectionId.length === 1) ?
        (this.pathHoverFlag = true) :
        this.selectionId.length > 0 ?
          this.setMessage("请选择单一节点进行路径显示") :
          this.setMessage("请选择一个节点进行路径显示");
        // this.netchart.selection(["911716", '1016826'])
        if (mthis.selectionId.length !== 2) {
          // mthis.$Message.error('现阶段只支持两点路径！')
          mthis.setMseeage("现阶段只支持两点路径！");
          // mthis.message={text:'现阶段只支持两点路径！' + this.netTimeCondition.length,time:new Date().getTime()}
        } else {
          mthis.spinShow = true;
          mthis.zIndex = 999;
          mthis.$http
            .get(
              this.$store.state.ipConfig.api_url +
              "/all-path-data?start=" +
              mthis.selectionId[0].id +
              "&end=" +
              mthis.selectionId[1].id +
              "&step=" +
              mthis.InputNumber
            )
            .then(response => {
              if (
                response.body.data[0].nodes.length +
                response.body.data[0].links.length >
                0
              ) {
                //  mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                mthis.netchart.addData(response.body.data[0]);
                let idArr = [];
                let nodeobj = response.body.data[0].nodes;
                let linkobj = response.body.data[0].links;
                for (let i = 0; i < nodeobj.length; i++) {
                  idArr.push(nodeobj[i].id);
                }
                for (let j = 0; j < linkobj.length; j++) {
                  idArr.push(linkobj[j].id);
                }
                setTimeout(function() {
                  mthis.netchart.selection(idArr);
                  // mthis.changNetchartMode('s')
                }, 200);
                mthis.spinShow = false;
                mthis.zIndex = 0;
              } else {
                // mthis.$Message.error('未找到知识路径')
                // mthis.message={text:'未找到知识路径' + this.netTimeCondition.length,time:new Date().getTime()}
                this.setMseeage("未找到知识路径");
              }
            });
        }
        mthis.modalStep = 0;
        // mthis.netchart.selection(["911716", '1016826'])
      },
      // showPathEvent() {
      //   this.selectionId.length === 1 ?
      //     (this.pathHoverFlag = true) :
      //     this.selectionId.length > 0 ?
      //     this.setMseeage(
      //       "请选择单一节点进行路径显示" + this.netTimeCondition.length
      //     ) :
      //     this.setMseeage(
      //       "请选择一个节点进行路径显示" + this.netTimeCondition.length
      //     );
      // },
      setMessage(mes) {
        this.message = {
          text: mes + this.netTimeCondition.length,
          time: new Date().getTime()
        };
      },
      gongzhiEnitiy() {
        // // console.log(this.selectionId)
        var mthis = this
        if (this.selectionId.length > 1) {
          this.expandFlag_gongzhi = 'knowledge_gongzhi'
          mthis.spinShow = true;
          this.$http.post(mthis.$store.state.ipConfig.api_url + "/commonAll/", {
            "NodeIds": mthis.selectionId,
            // "TypeLabel": "all",
            "ComLabel": "entity"
          }).then(response => {
            if (response.body.code === 0) {
              if (response.body.data.nodes.length > 0) {
                //  mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                mthis.netchart.addData(response.body.data)
                setTimeout(function() {
                  mthis.netchart.selection(response.body.data.nodes.map(item => {
                    return item.id
                  }))
                  // mthis.changNetchartMode('s')
                }, 200);
              } else {
                mthis.setMessage('未找到共指实体')
              }
            }
            mthis.spinShow = false;
          })
        } else {
          this.setMessage('gongzhiEnitiy接口异常，selectionIds参数错误')
        }
      },
      gongzhiEvent() {
        // // console.log(this.selectionId)
        this.expandFlag_gongzhi = 'event_gongzhi'
        var mthis = this
        mthis.spinShow = true;
        if (this.selectionId.length > 1) {
          this.$http.post(mthis.$store.state.ipConfig.api_url + "/commonAll/", {
            "NodeIds": mthis.selectionId,
            // "TypeLabel": "all",
            "ComLabel": "event"
          }).then(response => {
            if (response.body.code === 0) {
              if (response.body.data.nodes.length > 0) {
                //  mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                mthis.netchart.addData(response.body.data)
                setTimeout(function() {
                  mthis.netchart.selection(response.body.data.nodes.map(item => {
                    return item.id
                  }))
                }, 200);
              } else {
                mthis.setMessage('未找到共指事件')
              }
            }
            mthis.spinShow = false;
          })
        } else {
          this.setMessage('gongzhiEvent接口异常，selectionIds参数错误')
        }
      },
      gongzhiDoc() {
        // // console.log(this.selectionId)
        var mthis = this
        mthis.expandFlag_gongzhi = 'content_gongzhi'
        mthis.spinShow = true;
        if (this.selectionId.length > 1) {
          this.$http.post(mthis.$store.state.ipConfig.api_url + "/commonAll/", {
            "NodeIds": mthis.selectionId,
            // "TypeLabel": "all",
            "ComLabel": "document"
          }).then(response => {
            if (response.body.code === 0) {
              if (response.body.data.nodes.length > 0) {
                //  mthis.changNetchartMode('r') //  mthis.changNetchartMode('d')
                mthis.netchart.addData(response.body.data)
                setTimeout(function() {
                  mthis.netchart.selection(response.body.data.nodes.map(item => {
                    return item.id
                  }))
                  // mthis.changNetchartMode('s')
                }, 200);
              } else {
                mthis.setMessage('未找到共指文档')
              }
            }
            mthis.spinShow = false;
          })
        } else {
          this.setMessage('gongzhiDoc接口异常，selectionIds参数错误')
        }
      },
      exportImg() {
        // // // console.log(this.netchart)
        // // // console.log(this.netchart.exportData()) //可以通过这种方法获取到节点的坐标
        var mthis = this;
        // // // // console.log('=================exportImg==================')
        // // // // console.log(this.netchart.getNode("Q22368"))
        // let nodeObj = this.netchart.getNode("Q22368")
        // nodeObj.lineColor = 'rgba(51,255,255,0.5)';
        // nodeObj.backgroundStyle = {
        //   lineColor: 'rgba(51,255,255,0.5)',
        //   fillColor: 'rgba(51,255,255,0.4)'
        // }
        // // nodeObj.fillColor = 'rgba(51,255,255,1)';
        // nodeObj.lineWidth = 30;
        // nodeObj.radius = 50;
        // this.netchart.getNode("Q22368").hovered = true;
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
        mthis.netchart.exportAsString("png", res => {});
        mthis.netchart.exportData(
          "png", {
            mime: "image/png",
            extension: "png",
            image: !0,
            transparent: !0
          }, {
            dpi: 1050,
            unit: "px",
            width: 100,
            height: 200,
            scale: 1
          },
          true
        );
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
      //环形布局
      circleShape() {
        // this.changNetchartMode('r');
        var mthis = this
        if (mthis.selectionId.length > 0) {
          //半径
          let radius = mthis.selectionId.length > 7 ? 200 : 100;
          // let radius = mthis.selectionId.length*2;
          //每一个BOX对应的角度;
          let avd = 360 / mthis.selectionId.length;
          //每一个BOX对应的弧度;
          let ahd = (avd * Math.PI) / 180;
          let no1 = mthis.netchart.getNode(this.selectionId[0]);
          for (let i = 0; i < mthis.selectionId.length; i++) {
            //解锁位置
            // lock
            // mthis.netchart.unlockNode(mthis.selectionId[index].id);
            let no = mthis.netchart.getNode(this.selectionId[i]);
            no.x = no1.x + Math.sin(ahd * i) * radius;
            no.y = no1.y - radius + Math.cos(ahd * i) * radius;
            // mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
            //   Math.sin(ahd * index) * radius;
            // mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] - radius +
            //   Math.cos(ahd * index) * radius;
            // 锁定位置
            // lock
            mthis.netchart.lockNode(mthis.selectionId[i]);
            mthis.netchart.updateStyle(mthis.selectionId[i]);
          }
          mthis.netchart.addFocusNode(no1.id);
        } else {
          // mthis.$Message.error('请选择节点进行矩形排列操作！')
          this.setMessage("请选择节点进行环型排列操作！");
        }
      },
      //矩形布局
      square() {
        if (this.selectionId.length > 0) {
          var mthis = this;
          let rowNum = Math.ceil(Math.sqrt(this.selectionId.length));
          let basePoint = this.selectionId[0];
          let no1 = mthis.netchart.getNode(this.selectionId[0]);
          for (let i = 0; i < this.selectionId.length; i++) {
            let col = i % rowNum;
            let row = parseInt(i / rowNum);
            let no = mthis.netchart.getNode(this.selectionId[i]);
            no["x"] = no1["x"] + col * 150;
            no["y"] = no1["y"] + row * 150;
            mthis.netchart.lockNode(this.selectionId[i]);
          }
          // mthis.changNetchartMode('s')
          mthis.netchart.scrollIntoView(
            mthis.selectionId.map(item => {
              mthis.netchart.lockNode(item.id);
              return item.id;
            })
          );
          mthis.netchart.updateStyle(this.selectionId);
          mthis.netchart.updateSettings();
          mthis.netchart.updateSize();
        } else {
          this.setMessage("请选择节点进行矩形排列操作！");
        }
        // this.flag = false;
      },
      //星型布局
      star() {
        var mthis = this;
        // if (mthis.selectionId.length > 27) {
        //     mthis.changeFlag();
        //     let ahd = Math.PI / 72;
        //     let no1 = mthis.netchart.getNode(this.selectionId[0]);
        //     for (let i = 1; i < mthis.selectionId.length; i++) {
        //         // lock
        //         // mthis.netchart.unlockNode(mthis.selectionId[i].id);
        //         // 辐射布局
        //         // let circleNum = Math.floor(Math.log(i) / Math.log(3))
        //         // let avd = 360 / Math.pow(3, circleNum);
        //         // let ahd = avd * Math.PI / 360;
        //         // let radius = 200 * circleNum + 200
        //         // mthis.selectionId[i]["x"] = mthis.selectionId[0]["x"] +
        //         //   Math.sin(ahd * i) * radius;
        //         // mthis.selectionId[i]["y"] = mthis.selectionId[0]["y"] +
        //         //   Math.cos(ahd * i) * radius;
        //         // 螺旋布局
        //         // let radius = 5 * i + 5
        //         let no = mthis.netchart.getNode(this.selectionId[i]);
        //         no.x = no1.x + Math.sin(ahd * i) * (Math.random() - 0.5) * 2000;
        //         no.y = no1.y + Math.cos(ahd * i) * (Math.random() - 0.5) * 2000;
        //         // mthis.selectionId[i]["x"] = mthis.selectionId[0]["x"] +
        //         //   Math.sin(ahd * i) * (Math.random() - 0.5) * 2000;
        //         // mthis.selectionId[i]["y"] = mthis.selectionId[0]["y"] +
        //         //   Math.cos(ahd * i) * (Math.random() - 0.5) * 2000;
        //         //   lock
        //         // mthis.netchart.lockNode(mthis.selectionId[index].id);
        //     }
        // } else if (
        //     mthis.selectionId.length > 0 &&
        //     mthis.selectionId.length < 27
        // ) {
        //     //半径
        //     let radius = mthis.selectionId.length > 7 ? 200 : 100;
        //     // let radius = mthis.selectionId.length*2;
        //     //每一个BOX对应的角度;
        //     let avd = 360 / mthis.selectionId.length;
        //     //每一个BOX对应的弧度;
        //     let ahd = (avd * Math.PI) / 180;
        //     let no1 = mthis.netchart.getNode(this.selectionId[0]);
        //     for (let i = 0; i < mthis.selectionId.length; i++) {
        //         //解锁位置
        //         // lock
        //         // mthis.netchart.unlockNode(mthis.selectionId[index].id);
        //         let no = mthis.netchart.getNode(this.selectionId[i]);
        //         no.x = no1.x + Math.sin(ahd * i) * radius;
        //         no.y = no1.y - radius + Math.cos(ahd * i) * radius;
        //         // mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
        //         //   Math.sin(ahd * index) * radius;
        //         // mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] - radius +
        //         //   Math.cos(ahd * index) * radius;
        //         // 锁定位置
        //         // lock
        //         // mthis.netchart.lockNode(mthis.selectionId[index].id);
        //     }
        //     mthis.netchart.addFocusNode(no1.id);
        // } else {
        //     // mthis.$Message.error('请选择节点进行矩形排列操作！')
        //     this.setMessage("请选择节点进行矩形排列操作！");
        // }
        if (mthis.selectionId.length > 0) {
          for (let i = 0; i < mthis.selectionId.length; i++) {
            // 辐射布局
            let circleNum = Math.floor(Math.log(i) / Math.log(3))
            let avd = 360 / Math.pow(3, circleNum);
            let ahd = avd * Math.PI / 360;
            let radius = 150 * circleNum + 150
            let nodesInfo = mthis.netchart.getNode(mthis.selectionId[i])
            let initInfo = mthis.netchart.getNode(mthis.selectionId[0])
            initInfo['x'] = (initInfo['x']) ? (initInfo['x']) : (0)
            initInfo['y'] = (initInfo['y']) ? (initInfo['y']) : (0)
            nodesInfo["x"] = mthis.netchart.getNode(mthis.selectionId[0])["x"] +
              Math.sin(ahd * i) * radius;
            nodesInfo["y"] = mthis.netchart.getNode(mthis.selectionId[0])["y"] +
              Math.cos(ahd * i) * radius;
            mthis.netchart.updateStyle(mthis.selectionId[i])
            mthis.netchart.lockNode(mthis.selectionId[i]);
            // mthis.changNetchartMode('s')
          }
        } else {
          // mthis.$Message.error('请选择节点进行矩形排列操作！')
          this.setMessage("请选择节点进行星型排列操作！");
        }
      },
      // 层级布局
      hierarchy() {
        // this.changNetchartMode('h');
        // setTimeout(function() {
        //   mthis.changNetchartMode('s')
        // }, 500);
      },
      hierarchy1() {
        var mthis = this;
        if (mthis.selectionId.length > 0) {
          var mthis = this;
          let nodesIDS = mthis.netchart.nodes().map(item => {
            return item.id
          })
          let rootIds = (typeof mthis.selectionId[0] === 'string') ? (mthis.selectionId) : (mthis.selectionId.map(it => {
            return it.id
          }))
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + "/hierarchical-node-structure/", {
            nodeIds: nodesIDS,
            RootNodeIdList: rootIds,
            edge_from_backend: true
          }).then(response => {
            if (response.body.code == 0) {
              let initNode = new Object()
              if (typeof mthis.selectionId[0] === 'string') {
                initNode = mthis.netchart.getNode(mthis.selectionId[0])
              } else {
                initNode = mthis.selectionId[0]
              }
              let x0 = initNode.x
              let y0 = initNode.y
              let arrids = []
              //非递归广度优先实现
              var iterator1 = function(treeNodes) {
                if (!treeNodes || !treeNodes.length) return;
                var stack = [];
                //先将第一层节点放入栈
                for (var i = 0, len = treeNodes.length; i < len; i++) {
                  stack.push(treeNodes[i]);
                }
                var item;
                while (stack.length) {
                  // // console.log('================++++++++++++++++++')
                  item = stack.shift();
                  // // console.log(item.order + '    ' + item.depth)
                  let nodeObj = mthis.netchart.getNode(item.id)
                  nodeObj['x'] = item.order * 200 + x0
                  nodeObj['y'] = item.depth * 300 + y0
                  arrids.push(item.id)
                  //如果该节点有子节点，继续添加进入栈底
                  if (item.children && item.children.length) {
                    // // console.log(item.children.length)
                    stack = stack.concat(item.children);
                  }
                }
              };
              //非递归深度优先实现
              let xpos = 0
              let ypos = 0
              var iterator2 = function(treeNodes) {
                var stack = [];
                if (!treeNodes || !treeNodes.length) return;
                //先将第一层节点放入栈
                for (var i = 0, len = treeNodes.length; i < len; i++) {
                  stack.push(treeNodes[i]);
                }
                var item;
                while (stack.length) {
                  item = stack.shift();
                  let nodeObj = mthis.netchart.getNode(item.id)
                  let x = nodeObj['x']
                  let y = nodeObj['y']
                  if (item.order == 0 && item.depth == 0) {
                    nodeObj['x'] = x0
                    nodeObj['y'] = y0
                    xpos = 0
                    ypos = 0
                  } else {
                    if (item.depth < ypos) {
                      // 叔节点
                      xpos++
                      nodeObj['y'] = item.depth * 200 + y0
                      nodeObj['x'] = xpos * 150 + x0
                      ypos = item.depth
                    } else if (item.depth == ypos) {
                      // 兄弟节点
                      xpos++
                      nodeObj['y'] = item.depth * 200 + y0
                      nodeObj['x'] = (xpos) * 150 + x0
                      ypos = item.depth
                    } else {
                      // 子节点
                      nodeObj['x'] = (xpos) * 150 + x0
                      nodeObj['y'] = item.depth * 200 + y0
                      // xpos ++
                      ypos = item.depth
                    }
                  }
                  // nodeObj['x'] = item.order * 200 + x0
                  // nodeObj['y'] = item.depth * 300 + y0
                  // // console.log(nodeObj['x'] + ' , ' + nodeObj['y'])
                  arrids.push(item.id)
                  // mthis.netchart.lockNode(item.id)
                  //如果该节点有子节点，继续添加进入栈顶
                  if (item.children && item.children.length) {
                    // len = item.children.length;
                    // for (; len; len--) {
                    //     stack.unshift(item.children[len - 1]);
                    // }
                    // // // console.log(item.children.length)
                    stack = item.children.concat(stack);
                  }
                }
              };
              // // // console.log('===============guan du=====================')
              // iterator1(response.body.data[0]);
              // // console.log('===============shen du=====================')
              iterator2(response.body.data[0]);
              response.body.nodes.map(ite => {
                mthis.netchart.lockNode(ite)
                return ite
              })
            }
          });
          mthis.netchart.updateStyle(nodesIDS);
          mthis.netchart.updateSettings();
          mthis.netchart.updateSize();
        } else {
          this.setMessage("请选择节点进行层级排列操作！");
        }
      },
      //自适应
      fit() {
        this.changeFlag();
        this.netchart._impl.autoZoom.scene.autoZoomMode = "overview";
        this.netchart.updateSettings();
        this.netchart.updateSize();
      },
      // 还原（重新布局）
      rebulid() {
        this.changeFlag();
        this.netchart.resetLayout();
      },
      //截屏
      cutScreen() {
        // // console.log('================')
        // // console.log(this.netchart)
        // // console.log(this.netchart.nodes())
        // // console.log(this.netchart.links())
        // html2canvas(document.getElementById('netchart')).then(function(canvas) {
        //   var pageData = canvas.toDataURL('image/jpeg', 1.0);
        //   // // // console.log(pageData)
        //   var saveFile = function(data, filename){
        //       var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        //       save_link.href = data;
        //       save_link.download = filename;
        //       var event = document.createEvent('MouseEvents');
        //       event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //       save_link.dispatchEvent(event);
        //   };
        //   saveFile(pageData.replace("image/jpeg", "image/octet-stream"),new Date().getTime()+".jpeg");
        // });
        // this.netchart.export("png")
        // html2canvas(document.querySelector('#netchart'),{useCORS:true}).then(function (canvas) {
        //         //获取年月日作为文件名
        //         var timers=new Date();
        //         var fullYear=timers.getFullYear();
        //         var month=timers.getMonth()+1;
        //         var date=timers.getDate();
        //         var randoms=Math.random()+'';
        //         //年月日加上随机数
        //         var numberFileName=fullYear+''+month+date+randoms.slice(3,10);
        //         var imgData=canvas.toDataURL();
        //         //保存图片
        //         var saveFile = function(data, filename){
        //             var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
        //             save_link.href = data;
        //             save_link.download = filename;
        //             var event = document.createEvent('MouseEvents');
        //             event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        //             save_link.dispatchEvent(event);
        //         };
        //         //最终文件名+文件格式
        //         var filename = numberFileName + '.png';
        //         saveFile(imgData,filename);
        //         //document.body.appendChild(canvas);  把截的图显示在网页上
        //     })
        // Canvas2Image.saveAsPNG(document.querySelector('#netchart'),300,200);
        // var oCanvas = document.getElementById("netchart");
        // Canvas2Image.saveAsPNG(document.querySelector("#netchart"), 100, 100);
        // // console.log(this.selectionId)
        // for(let i = 0;i<this.selectionId.length;i++){
        //   this.netchart.hideNode(this.selectionId[i])
        // }
        // let arrayNode = new Array()
        // for (let v of this.selectionIdByTypeData.eventIds) {
        //   // // console.log(v);  
        //   arrayNode.push(this.netchart.getNode(v))
        // };
        // // console.log(arrayNode)
        // var obj = {};
        // var i = 0;
        // for (i = 0; i < arrayNode.length; i++) {
        //   key = arrayNode[i].id;
        //   if (obj[key]) {
        //     //对象中有这个字母
        //     obj[key]++;
        //   } else {
        //     //对象中没有这个字母,把字母加到对象中
        //     obj[key] = 1;
        //   }
        // }
        // for (var key in obj) //遍历这个对象
        // {
        //   // console.log(key + "这个字母出现了" + obj[key] + "次");
        // }
        // this.changNetchartMode('h')
        console.log(this.netchart.nodes())
        this.netchart.expandNode(this.selectionId[0])
      },
      //保存工作集
      save() {
        // this.netchart.selection(["911716", '1016826'])
        // 调用保存工作集接口
        // this.message = '调用保存工作集接口'
        this.setMessage("调用保存工作集接口");
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
        if (mthis.selectionId.length > 1) {
          mthis.saveData(
            mthis.netchart._impl.data.default.nodes,
            mthis.netchart._impl.data.default.links,
            this.saveNum
          );
          //删除节点
          // this.netchart.removeData(this.selectionId)
          // let netChartLog = sessionStorage.getItem('netChartLog');
          // let netChartLogJson = JSON.parse(netChartLog).data;
          let ids = [];
          for (let num = 0; num < this.selectionId.length; num++) {
            // // // console.log(typeof(mthis.selectionId[0]))
            if (typeof mthis.selectionId[0] === "string") {
              if (mthis.netchart.getNode(mthis.selectionId[num]).isNode) {
                mthis.netchart.removeData({
                  nodes: [{
                    id: mthis.selectionId[num]
                  }]
                });
              } else if (mthis.netchart.getLink(mthis.selectionId[num]).isLink) {
                mthis.netchart.removeData({
                  links: [{
                    id: mthis.selectionId[num]
                  }]
                });
              }
            } else {
              if (mthis.selectionId[num].isNode) {
                mthis.netchart.removeData({
                  nodes: [{
                    id: mthis.selectionId[num].id
                  }]
                });
              } else if (mthis.selectionId[num].isLink) {
                mthis.netchart.removeData({
                  links: [{
                    id: mthis.selectionId[num].id
                  }]
                });
              }
            }
          }
          // netChartLogJson.push({
          //   'id': ids,
          //   'action': 'remove',
          //   'other': ''
          // })
          // // netChartLog = JSON.stringify(netChartLogJson);
          // sessionStorage.setItem('netChartLog', JSON.stringify({
          //   data: netChartLogJson
          // }));
          //隐藏节点
          // for (let num = 0; num < this.selectionId.length; num++) {
          //   if (this.selectionId[num].isNode) {
          //     this.netchart.hideNode(this.selectionId[num].id)
          //     id: this.selectionId[num].id;
          //   }
          // }
          mthis.getStatistics();
        } else if (mthis.selectionId.length == 1) {
          if (typeof mthis.selectionId[0] === "string") {
            if (mthis.netchart.getNode(mthis.selectionId[0]).isNode) {
              mthis.netchart.removeData({
                nodes: [{
                  id: mthis.selectionId[0]
                }]
              });
            } else if (mthis.netchart.getLink(mthis.selectionId[0]).isLink) {
              mthis.netchart.removeData({
                links: [{
                  id: mthis.selectionId[0]
                }]
              });
            }
          } else {
            if (mthis.selectionId[0].isNode) {
              mthis.netchart.removeData({
                nodes: [{
                  id: mthis.selectionId[0].id
                }]
              });
            } else if (mthis.selectionId[0].isLink) {
              mthis.netchart.removeData({
                links: [{
                  id: mthis.selectionId[0].id
                }]
              });
            }
          }
          // mthis.netchart.removeData(mthis.selectionId[0])
        } else {
          // this.$Message.error('请选择节点进行删除操作！')
          this.setMessage("请选择节点进行删除操作！");
        }
        mthis.selectionIdByTypeData = new Object({
          nodeIds: [],
          eventIds: [],
          contentIds: {
            'type': 'push',
            'ids': []
          }
        });
        mthis.$store.commit("setSelectionIdByType", mthis.selectionIdByTypeData)
        mthis.ifSelectNode = false;
        mthis.ifSelectTwoNode = false;
        mthis.ifSelectOnlyTwoNode = false;
        setTimeout(function() {
          if (mthis.netchart.nodes().length > 0) {
            mthis.ifhasNode = true
          } else {
            mthis.ifhasNode = false
          }
        }, 200);
      },
      queryPerson() {},
      //反选节点
      removeOther() {
        var mthis = this;
        // 获取当前选中节点
        if (mthis.selectionId.length > 0) {
          // 获取全部节点
          let selectNodes = mthis.selectionId;
          let allNodes = mthis.netchart.nodes().map((item) => {
            return item.id
          });
          let ids = allNodes.filter(function(item) {
            return selectNodes.indexOf(item) < 0
          })
          mthis.netchart.selection(ids);
          mthis.getStatistics();
          // 反选结果
        } else {
          mthis.setMessage("请选中节点！");
        }
      },
      reloadNetData(data) {
        var mthis = this;
        let dataarr = [];
        dataarr.push(data);
        mthis.netchart.replaceData({
          nodes: dataarr,
          links: []
        });
        let ar = [];
        for (let k = 0; k < dataarr.length; k++) {
          ar.push(dataarr[k].id);
        }
        setTimeout(function() {
          mthis.netchart.scrollIntoView(ar);
          mthis.netchart.selection(ar);
        }, 200);
        mthis.fit();
        mthis.getStatistics();
      },
      addNetData(data) {
        var mthis = this;
        let dataarr = [];
        dataarr.push(data);
        mthis.netchart.addData({
          nodes: dataarr,
          links: []
        });
        mthis.getStatistics();
      },
      rightMenuShow() {
        $('#ringRightMenu').remove()
        var overlayId = 'rightClickMenu_Area';
        var ovdiv = document.createElement('div');
        ovdiv.style = 'width:440px;height:440px;';
        ovdiv.style.position = 'absolute';
        ovdiv.style.top = event.pageY - 120 - 220 + "px";
        ovdiv.style.left = event.pageX - 220 + "px";
        ovdiv.class = 'ringRightMenu';
        ovdiv.id = 'ringRightMenu';
        var config = [{
            'Id': 1,
            'parentId': 0,
            'name': '链向',
            'hasLeaf': true,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': '',
            'icon': 'lianxiang.png',
            'disicon': 'lianxiang_disable.png'
          },
          {
            'Id': 2,
            'parentId': 0,
            'name': '聚合',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("juhe")',
            'icon': 'juhe.png',
            'disicon': 'juhe_disable.png'
          }, {
            'Id': 3,
            'parentId': 0,
            'name': '暂无',
            'disable': true,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.noItemInRightMenu',
            'icon': 'noclick.png',
            'disicon': 'noclick_disable.png'
          },
          {
            'Id': 4,
            'parentId': 0,
            'name': '删除',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("remove")',
            'icon': 'shanchu.png',
            'disicon': 'shanchu_disable.png'
          }, {
            'Id': 5,
            'parentId': 0,
            'disable': false,
            'name': '推送',
            'hasLeaf': true,
            'color': "rgba(0,51,51,0.98)",
            'backcall': '',
            'icon': 'tuisong.png',
            'disicon': 'tuisong_disable.png'
          }, {
            'Id': 6,
            'parentId': 0,
            'name': '路径',
            'disable': false,
            'hasLeaf': true,
            'color': "rgba(0,51,51,0.98)",
            'backcall': '',
            'icon': 'lujing.png',
            'disicon': 'lujing_disable.png'
          }, {
            'Id': 7,
            'parentId': 0,
            'name': '共指',
            'disable': false,
            'hasLeaf': true,
            'color': "rgba(0,51,51,0.98)",
            'backcall': '',
            'icon': 'gongzhi.png',
            'disicon': 'gongzhi_disable.png'
          },
          {
            'Id': 8,
            'parentId': 0,
            'disable': false,
            'name': '关联',
            'hasLeaf': true,
            'color': "rgba(0,51,51,0.98)",
            'backcall': '',
            'icon': 'guanlian.png',
            'disicon': 'guanlian_disable.png'
          },
          {
            'Id': 801,
            'parentId': 8,
            'name': '实体',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("expandNodeKnowledge")',
            'icon': 'guanlianshiti.png',
            'disicon': 'guanlianshiti_disable.png'
          },
          {
            'Id': 802,
            'parentId': 8,
            'name': '事件',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("expandNodeEvent")',
            'icon': 'guanlianshijian.png',
            'disicon': 'guanlianshijian_disable.png'
          },
          {
            'Id': 803,
            'parentId': 8,
            'name': '文档',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("expandNodeContent")',
            'icon': 'guanlianwendang.png',
            'disicon': 'guanlianwendang_disable.png'
          },
          {
            'Id': 701,
            'parentId': 7,
            'name': '实体',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("gongzhiEnitiy")',
            'icon': 'gongzhishiti.png',
            'disicon': 'gongzhishiti_disable.png'
          },
          {
            'Id': 702,
            'parentId': 7,
            'name': '事件',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("gongzhiEvent")',
            'icon': 'gongzhishijian.png',
            'disicon': 'gongzhishijian_disable.png'
          },
          {
            'Id': 703,
            'parentId': 7,
            'name': '文档',
            'disable': false,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("gongzhiDoc")',
            'icon': 'gongzhiwendang.png',
            'disicon': 'gongzhiwendang_disable.png'
          },
          {
            'Id': 601,
            'parentId': 6,
            'name': '关系',
            'disable': false,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("showModalStepKnowledge")',
            'icon': 'zhishilujing.png',
            'disicon': 'zhishilujing_disable.png'
          },
          {
            'Id': 602,
            'parentId': 6,
            'name': '所有',
            'disable': false,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("showModalStepAll")',
            'icon': 'quanbu.png',
            'disicon': 'quanbu_disable.png'
          },
          {
            'Id': 501,
            'parentId': 5,
            'name': '地图',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("toGeo")',
            'icon': 'guanlianshiti.png',
            'disicon': 'guanlianshiti_disable.png'
          },
          {
            'Id': 502,
            'parentId': 5,
            'name': '文档',
            'hasLeaf': false,
            'disable': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("toContent")',
            'icon': 'guanlianshijian.png',
            'disicon': 'guanlianshijian_disable.png'
          },
          {
            'Id': 101,
            'parentId': 1,
            'name': '关系',
            'disable': false,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("linkedKnowlage")',
            'icon': 'zhishilianxiang.png',
            'disicon': 'zhishilianxiang_disable.png'
          },
          {
            'Id': 102,
            'parentId': 1,
            'name': '所有',
            'disable': false,
            'hasLeaf': false,
            'color': "rgba(0,51,51,0.98)",
            'backcall': 'mthis.triggerMethods("linkedKnowlageAll")',
            'icon': 'quanbu.png',
            'disicon': 'quanbu_disable.png'
          }
        ]
        var routeMap = new rightMenu(this, ovdiv, config);
        document.getElementById('netchart').appendChild(ovdiv)
        document.getElementById('ringRightMenu').oncontextmenu = function(e) {
          return false;
        }
      },
      back() {
        let netChartLog = sessionStorage.getItem("netChartLog");
        let netChartLogJson = JSON.parse(netChartLog).data;
        if (netChartLogJson.length > 0) {
          // 删除节点的后退操作 或 反选删除节点的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === "remove") {
            // for(let i = 0; i < netChartLogJson[netChartLogJson.length-1].id.length; i++) {
            // }
            // 模拟接口，getNodeObjByIds   netChartLogJson[netChartLogJson.length-1].id
          }
          // 添加节点的后退操作
          if (netChartLogJson[netChartLogJson.length - 1].action === "add") {}
          // 知识拓展的后退操作
          if (
            netChartLogJson[netChartLogJson.length - 1].action ===
            "knowledgeExpand"
          ) {}
          // 事件拓展的后退操作
          if (
            netChartLogJson[netChartLogJson.length - 1].action === "eventExpand"
          ) {}
          // 删除最后一条日志
          netChartLogJson = netChartLogJson.slice(0, -1);
          // 将改动过的日志写回session
          // sessionStorage.setItem('netChartLog', JSON.stringify({
          //   data: netChartLogJson
          // }));
        } else {
          // this.$Message.error('无法后退')
          this.setMessage("无法后退！");
        }
        // this.netchart.back();
      },
      initCharts() {
        var mthis = this;
        mthis.netchart = new NetChart({
          navigation: {
            // 初始化展示层级
            focusNodeExpansionRadius: 1,
            mode: "showall",
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
            ],
            exportProxyURL: "https://echo.zoomcharts-cloud.com/download",
            crossOrigin: "true"
          },
          // 星形布局
          layout: {
            // mode: 'hierarchy',
            // mode: "radial",
            // mode: "static",
            mode: "dynamic",
            // z重力模块配置
            // gravity:{
            //     from:"graph",
            //     to: "graphLockedNodes",
            //     fromCenter:"geometric", // "geometric"
            //     toCenter:"geometric "
            // },
            gravity: {
              from: "node",
              to: "nearestLockedNode",
              strength: 0.05
            },
            twoRingRadialLayout: true,
            // layoutFreezeMinTimeout:300,
            layoutFreezeTimeout: 10000,
            // incrementalLayoutMaxTime:1000,
            // initialLayoutMaxTime:1000,
            globalLayoutOnChanges: false,
            nodeSpacing: 50,
            rowSpacing: 100
          },
          // 层级布局
          // layout: \
          //   mode: "hierarchy",
          //   nodeSpacing: 60, // horizontal spacing between nodes
          //   rowSpacing: 100 // vertical spacing between node rows in the hierarchy layout
          // },
          style: {
            // nodeLocked: {
            //   items: [{
            //     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVQ4T32TP2gTcRTHP7+7oKA5G2iFqqgHgh3qkCbtoIvpXndFKAlKiIvWBukiteKopc3o1DrU4OBQOuniZW4vOaFLFSWotA4iiYn/oJef3KXX5C5X3/j+fN5739/7CcJsPZ5CqGeRMu6GhbBQWlUSlVIwXfgclbiOrS4BqVAwGKh2hhGr6sU7ADORRrIAInZA8Z5b1hDcJVledodzvW5npRJWPK8/ZvDQCXIfcjTsZgeitkacSdqA9YSBEJfDOj8/9Yzzg8Ns//jMvS8zbP1+56UZjJrjgrZgb8KK5/Q5Jvon9kONP3VyH291INIeF7i7C0c415JakunT0zR3GyS1UR/XNEsUN5cwLmy2/UJmBBuJRRB3vMx87DbXzk32DFQsFphfuw8X++HSgKdFoQfAp19ka1fJZmb3ISVjlfzLG5DWA2BZ6FnByRiqn+HJ8ALa0RjRaB9b7y2uf03DkYgf4K4QEFFTo6wMrfBwZpKm+pOnj15hbhjk1Qe9AFfEwDNmj99kZ7XMGq/dXbUX39F2ImxPHfN3l7LEWDnVdUiqBfQ5GvC2BldOdgq+/YWBw92AOqod7xySE2o/56IL+b/VEXLKf8pegXPSu8ryQVeJM3aklQ7/TN1dHWEVRUey952xaLWqjFlGcLh/YLaxYaYxrS8AAAAASUVORK5CYII=",
            //     //    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROA" +
            //     // "AAAaVBMVEVMaXFTU1NFRUX///////9FRUVNTU3+/v5KS0pERERHSEc6Ojr////+/v7///+" +
            //     // "Tk5OOjo5FRUVCQkJISUg/Pz9LTEs6Ojo8PTxOT07///8zNDM1NjU3NzdRUVExMjE6OzpHR" +
            //     // "0dJSUlTU1PLhCxuAAAAEXRSTlMAAQFJSpeX5OXl5eXm5uf19ZpgTxEAAABcSURBVHjaTcc" +
            //     // "FDoBAEEPR4i7DsoLL/Q8JAyzwkib9sGb89P3yxTBorW2MY8v4KqWy5sZJRAkxXIQQ6Tk8p" +
            //     // "JSxxMUNCMYYMK+o1xCYJrC82yoHwP5UV+Lll5EP6wAJEwV+kJe3nwAAAABJRU5ErkJggg==",
            //     py: -0.8,
            //     px: 0.8,
            //     // scaleWithSize:true,
            //     maxWidth: 5,
            //     backgroundStyle: {
            //       fillColor: "transparent"
            //     }
            //   }],
            // },
            // NetChart.settings.style.dragSelection 通过该属性可以设置框选颜色和背景等属性
            nodeLabel: {
              maxWidth: 10,
              // textOverflow:ellipsis,
              textStyle: {
                fillColor: "#ccffff"
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
                fillColor: "#006666"
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
              // display: "image",
              display: "text",
              //节点外环大小
              lineWidth: 3,
              // lineColor: "rgba(204,255,255,0.5)",
              // fillColor: "rgba(51, 255, 255, 0.2)",
              imageCropping: "letterbox"
              // imageCropping: true
            },
            // link:{
            //   fillColor:'red',
            //   lineColor: "green",
            //   lineWidth: 2,
            //   items:{
            //     lineColor: "blue",
            //     fillColor: "yellow"
            //   }
            // },
            // linkSelected:{
            //   lineColor: "blue",
            //   fillColor: "yellow",
            //   radius:5,
            //   strength:5,
            //   items:{
            //     lineColor: "blue",
            //     fillColor: "yellow"
            //   }
            // },
            selection: {
              // 选中样式
              fillColor: "rgba(51,255,255,0.1)",
              lineWidth: 5
            },
            nodeStyleFunction: function(node) {
              // node.labelStyle.maxWidth = 3
              // node.labelStyle.margin = 2
              // ---------------------------------------
              // 具体类型节点样式
              node.shadowColor = ''
              node.shadowBlur = 0
              console.log('------------------')
              console.log(node)
              if (node.userLock) {
                node.items = [{
                  image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAB60lEQVQ4T32TP2gTcRTHP7+7oKA5G2iFqqgHgh3qkCbtoIvpXndFKAlKiIvWBukiteKopc3o1DrU4OBQOuniZW4vOaFLFSWotA4iiYn/oJef3KXX5C5X3/j+fN5739/7CcJsPZ5CqGeRMu6GhbBQWlUSlVIwXfgclbiOrS4BqVAwGKh2hhGr6sU7ADORRrIAInZA8Z5b1hDcJVledodzvW5npRJWPK8/ZvDQCXIfcjTsZgeitkacSdqA9YSBEJfDOj8/9Yzzg8Ns//jMvS8zbP1+56UZjJrjgrZgb8KK5/Q5Jvon9kONP3VyH291INIeF7i7C0c415JakunT0zR3GyS1UR/XNEsUN5cwLmy2/UJmBBuJRRB3vMx87DbXzk32DFQsFphfuw8X++HSgKdFoQfAp19ka1fJZmb3ISVjlfzLG5DWA2BZ6FnByRiqn+HJ8ALa0RjRaB9b7y2uf03DkYgf4K4QEFFTo6wMrfBwZpKm+pOnj15hbhjk1Qe9AFfEwDNmj99kZ7XMGq/dXbUX39F2ImxPHfN3l7LEWDnVdUiqBfQ5GvC2BldOdgq+/YWBw92AOqod7xySE2o/56IL+b/VEXLKf8pegXPSu8ryQVeJM3aklQ7/TN1dHWEVRUey952xaLWqjFlGcLh/YLaxYaYxrS8AAAAASUVORK5CYII=",
                  //    image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROA" +
                  // "AAAaVBMVEVMaXFTU1NFRUX///////9FRUVNTU3+/v5KS0pERERHSEc6Ojr////+/v7///+" +
                  // "Tk5OOjo5FRUVCQkJISUg/Pz9LTEs6Ojo8PTxOT07///8zNDM1NjU3NzdRUVExMjE6OzpHR" +
                  // "0dJSUlTU1PLhCxuAAAAEXRSTlMAAQFJSpeX5OXl5eXm5uf19ZpgTxEAAABcSURBVHjaTcc" +
                  // "FDoBAEEPR4i7DsoLL/Q8JAyzwkib9sGb89P3yxTBorW2MY8v4KqWy5sZJRAkxXIQQ6Tk8p" +
                  // "JSxxMUNCMYYMK+o1xCYJrC82yoHwP5UV+Lll5EP6wAJEwV+kJe3nwAAAABJRU5ErkJggg==",
                  py: -0.8,
                  px: 0.8,
                  // scaleWithSize:true,
                  maxWidth: 5,
                  backgroundStyle: {
                    fillColor: "transparent"
                  }
                }]
                // node.items = [{text:"Locked", px:0.5, py:-0.5}]
              } else {
                node.items = [];
              }
              if (node.data.entity_type === "event") {
                if (node.selected) {
                  node.lineColor = mthis.selectLineColor;
                  node.shadowBlur = 25;
                  node.shadowColor = mthis.selectShadowColor;
                  node.lineWidth = 3;
                  if (node.hightLight) {
                    node.lineColor = mthis.hightlightLineColor;
                    node.shadowBlur = 20;
                    node.shadowColor = mthis.hightlightShadowColor;
                    node.lineWidth = 3;
                  }
                } else if (node.hovered) {
                  node.lineWidth = 3;
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.lineColor = "#009999";
                } else {
                  node.lineColor = "#006666";
                  node.lineWidth = 3;
                  node.shadowColor = "rgba(0,0,0,0)";
                  node.shadowBlur = 20;
                }
                node.fillColor = "#003333";
                node.display = "text";
                node.radius = 15;
                node.borderRadius = 5;
                let mapItem = mthis.myMap.get(node.data.event_subtype)
                node.image = mapItem ? mapItem.img : "http://10.60.1.140/assets/images/event.png";
              } else if (node.data.entity_type === "content" || node.data.entity_type === "document") {
                if (node.selected) {
                  node.lineColor = mthis.selectLineColor;
                  node.shadowColor = mthis.selectShadowColor;
                  node.shadowBlur = 25;
                  node.lineWidth = 5;
                  node.fillColor = "#003333";
                  if (node.hightLight) {
                    node.fillColor = "#003333";
                    node.lineColor = mthis.hightlightLineColor
                    node.shadowBlur = 20;
                    node.shadowColor = mthis.hightlightDocShadowColor;
                    node.lineWidth = 5;
                  }
                } else if (node.hovered) {
                  node.lineWidth = 5;
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                } else {
                  node.fillColor = "rgba(0,0,0,0)";
                  node.lineColor = "rgba(0,0,0,0)";
                  node.lineWidth = 5;
                  node.shadowColor = "rgba(0,0,0,0)";
                  node.shadowBlur = 20;
                }
                node.display = "rectangle";
                node.image = "http://10.60.1.140/assets/images/content_node.png";
                node.backgroundStyle = {};
                node.radius = 25;
              } else if (node.data.entity_type === "other") {
                if (node.selected) {
                  node.lineColor = mthis.selectLineColor;
                  node.shadowColor = mthis.selectShadowColor;
                  node.shadowBlur = 25;
                  node.lineWidth = 5;
                  if (node.hightLight) {
                    node.lineColor = mthis.hightlightLineColor;
                    node.shadowBlur = 20;
                    node.shadowColor = mthis.hightlightShadowColor;
                  }
                } else if (node.hovered) {
                  node.lineWidth = 5;
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.lineColor = "#009999";
                } else {
                  node.lineColor = "#006666";
                  node.lineWidth = 5;
                  node.shadowColor = "rgba(0,0,0,0)";
                  node.shadowBlur = 20;
                }
                node.radius = 25;
                node.fillColor = "#003333";
                node.display = "image";
                node.image = "http://10.60.1.140/assets/images/other.png";
              } else {
                if (node.selected) {
                  node.lineColor = mthis.selectLineColor
                  node.fillColor = "#003333";
                  node.shadowColor = mthis.selectShadowColor;
                  node.shadowBlur = 25;
                  node.lineWidth = 5;
                  if (node.hightLight) {
                    node.fillColor = "#003333";
                    node.lineColor = mthis.hightlightLineColor;
                    node.shadowBlur = 20;
                    node.shadowColor = mthis.hightlightDocShadowColor;
                    node.lineWidth = 3;
                  }
                } else if (node.hovered) {
                  node.lineWidth = 3;
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                } else {
                  node.fillColor = "#003333";
                  node.lineColor = "#006666";
                  node.lineWidth = 3;
                  node.shadowColor = "rgba(0,0,0,0)";
                  node.shadowBlur = 20;
                }
                node.display = "image";
                //判断图片资源是否存在
                if (
                  util.checkImgExists(
                    "http://10.60.1.143/pic_lib/padded/" + node.id + ".png"
                  )
                ) {
                  node.image =
                    "http://10.60.1.143/pic_lib/padded/" + node.id + ".png";
                } else {
                  if (node.data.entity_type === 'administrative') {
                    node.image = 'http://10.60.1.140/assets/images/location.png'
                  } else if (node.data.entity_type === 'human') {
                    node.image = 'http://10.60.1.140/assets/images/People.png'
                  } else if (node.data.entity_type === 'organization') {
                    node.image = 'http://10.60.1.140/assets/images/organization.png'
                  } else if (node.data.entity_type === 'weapon') {
                    node.image = 'http://10.60.1.140/assets/images/weapon.png'
                  } else if (node.data.entity_type === 'geographic_entity') {
                    node.image = 'http://10.60.1.140/assets/images/other.png'
                  } else if (node.data.entity_type === 'project') {
                    node.image = 'http://10.60.1.140/assets/images/other.png'
                  } else {
                    node.image = 'http://10.60.1.140/assets/images/other.png'
                  }
                  node.lineWidth = 3;
                  // node.image =
                  //   "http://10.60.1.140/assets/images/" +
                  //   node.data.entity_type +
                  //   ".png";
                  // node.image = './src/dist/assets/images/' + node.data.entity_type + '.png';
                }
              }
              node.cursor = "pointer";
              node.label = node.data.name;
              // 默认图标
              // if (node.data.type === "human") {
              //   if (node.data.img === "") {
              //     node.image = "./src/dist/assets/images/ico/b12.ico";
              //   } else {
              //     node.image = "http://10.60.1.143/pic_lib/padded/"+node.id+".png";
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
              // }
              mthis.netchart.updateSettings();
            },
            linkStyleFunction: function(link) {
              // link.length = 1;
              // link.position = "absolute";
              // link.strength = 1;
              link.cursor = "pointer";
              // ---------------------------------------
              //默认样式
              // if (link.hovered) {
              //   link.lineColor = "rgba(204,255,255,0.5)";
              //   link.shadowColor = "rgba(204,255,255,0.5)";
              //   link.shadowBlur = 80;
              // }
              // if (link.selected) {
              //   if (link.hightLight) {
              //     link.lineColor = "rgb(204,255,255)";
              //   } else {
              //     link.shadowColor = "#33ffff";
              //     link.shadowBlur = 80;
              //   }
              // } else {
              //   link.fillColor = "rgb(0,51,51)";
              //   link.lineColor = "rgb(51,102,102)";
              // }
              // link.fillColor = "#336666";
              link.lineWidth = 3;
              link.radius = 2;
              // link.lineColor = "rgba(0,0,0,0)";
              if (link.hovered) {
                // link.shadowColor = "#33ffff";
                // link.shadowBlur = 5;
                // link.radius = 2;
                link.fillColor = "#006666";
              }
              if (link.selected) {
                link.lineColor = "#33ffff";
                link.fillColor = "#33ffff";
                // link.radius = 3;
                // link.shadowColor = "#33ffff";
                // link.shadowBlur = 0;
                // link.lineWidth = 0;
                // link.radius = 3
                // if (link.hightLight) {
                //   // link.shadowColor = "#006666";
                //   // link.shadowBlur = 5;
                //   link.radius = 3;
                //   link.lineWidth = 3;
                // }
              } else {
                link.fillColor = "#006666";
                // link.radius = 2;
                // link.lineColor = "rgb(51,102,102)";
                // link.lineWidth = 5;
              }
              // -- -------------------------------------
              if (link.data.num !== undefined && link.data.num !== "") {
                // link.direction = [100, 100, 100, 100];
                // link.fromDecoration = "arrow";
                // link.toDecoration = "arrow";
                // link.lineColor = 'rgba(51,255,255,0.2)'
                link.items = [{
                  // Default item places just as the regular label.
                  // rotateWithLink: true,
                  scaleWithZoom: false,
                  // align: "center",
                  text: link.data.num + '',
                  // imageSlicing: [0, 0, 20, 20],
                  textStyle: {
                    font: "10px MicrosoftYaHei",
                    fillColor: "#33ffff"
                  },
                  backgroundStyle: {
                    //连线文字背景色
                    fillColor: "rgba(0,0,0,0.8)"
                    // fillColor: "rgba(51,255,255,0.2)"
                  }
                }];
              } else if (link.data.type !== undefined && link.data.type !== "") {
                // link.label = link.data.type;
                link.items = [{
                  // Default item places just as the regular label.
                  text: link.data.type,
                  // padding: 2,
                  // scaleWithZoom: true,
                  scaleWithZoom: false,
                  textStyle: {
                    font: "10px MicrosoftYaHei",
                    fillColor: "#669999"
                  },
                  backgroundStyle: {
                    //连线文字背景色
                    // fillColor: "rgba(0,0,0,0)"
                    fillColor: "rgba(0,0,0,0.8)"
                  }
                }];
              } else {
                // link.label = link.data.type;
                link.items = [{
                  // Default item places just as the regular label.
                  text: link.data.type,
                  // padding: 2,
                  // scaleWithZoom: true,
                  scaleWithZoom: false,
                  textStyle: {
                    font: "10px MicrosoftYaHei",
                    fillColor: "#669999"
                  },
                  backgroundStyle: {
                    //连线文字背景色
                    // fillColor: "rgba(0,0,0,0)"
                    fillColor: "rgba(0,0,0,0.8)"
                  }
                }];
              }
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
            onPointerDrag: function(event) {
              // mthis.changNetchartMode('s')
              console.log('-----s----------')
              console.log(event)
            },
            // onChartUpdate: function (event) {
            //     // console.log('-------------------------------------------------->>>onChartUpdate')
            // },
            onSettingsChange: function(event) {},
            onRightClick: function(event) {
              event.preventDefault();
              // if (mthis.selectionId > 0) {
              mthis.rightMenuShow()
              // }
            },
            onError: function(event) {
              // // // console.log('------error-------------')
              // // // console.log(event)
            },
            onClick: function(event) {
              if (event.clickNode || event.clickLink) {
                mthis.$store.commit("setTabSelectNet", "mubiaoxiangqingNet");
                // if (event.clickNode) {}
                // mthis.selectItem = event;
                // mthis.selectionId = [];
                // for (
                //   let selectNum = 0; selectNum < event.selection.length; selectNum++
                // ) {
                //   mthis.selectionId.push(event.selection[selectNum]);
                // }
              } else {
                mthis.selectionId = [];
                // mthis.operatorConfig[0].disable=true;
                mthis.selectItem = null;
                mthis.selectionIdByTypeData = new Object({
                  nodeIds: [],
                  eventIds: [],
                  contentIds: {
                    'type': "push",
                    'ids': []
                  }
                });
                mthis.netchart.nodes().map(item => {
                  item.opacity = 1;
                  mthis.netchart.updateStyle(item.id)
                  return item.id
                })
                mthis.linkTemp = new Object();
                mthis.$store.commit('setGroupFlag', false)
                mthis.$store.commit("setSelectNetNodes", [{
                  ids: mthis.selectionId
                }]);
                mthis.$store.commit(
                  "setSelectionIdByType",
                  mthis.selectionIdByTypeData
                );
                mthis.updateStyleCounter++;
              }
              // event.preventDefault();
            },
            // onPointerMove: function(event) {
            // },
            onDoubleClick: function(event) {
              let nodeList = event.selection.filter(function(x) {
                return x.isNode;
              });
              let linkList = event.selection.filter(function(x) {
                return x.isLink;
              });
              if (event.clickNode || event.clickLink) {
                // mthis.$store.commit("setTabSelectNet", "mubiaoxiangqingNet");
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
                clearTimeout(timer);
              }
              timer = setTimeout(function() {
                mthis.fromTemp = new Array()
                mthis.netchart.nodes().map(item => {
                  item.opacity = 1;
                  mthis.netchart.updateStyle(item.id)
                  return item.id
                })
                let lf = new Array()
                let lt = new Array()
                let eslect = new Array()
                mthis.linkTemp = new Object()
                for (let i = 0; i < event.selection.length; i++) {
                  if (event.selection[i].isNode) {
                    eslect.push(event.selection[i].id)
                  } else if (event.selection[i].isLink) {
                    lf.push(event.selection[i].from.id)
                    lt.push(event.selection[i].to.id)
                  } else {}
                }
                mthis.linkTemp = new Object({
                  fromList: lf,
                  toList: lt
                })
                // console.log(eslect)
                // console.log(lselect)
                // let eslect = event.selection.filter(it => {
                //   return it.isNode
                // }).map(item => {
                //   return item.id;
                // });
                // let lselect = event.selection.filter(it => {
                //   return it.isLink
                // }).map(item => {
                //   mthis.fromTemp.push(item.from)
                //   mthis.toTemp.push(item.to)
                //   return {
                //     fromList:mthis.fromTemp,
                //     toList:mthis.toTemp
                //   };
                // });
                if (mthis.linkedNodeFlag && eslect.length > 0) {
                  //链向标&&选中节点
                  mthis.readyToLink(eslect)
                }
                //   selectLineColor:'#ccffff',
                // selectShadowColor:'#33ffff',
                // hightlightLineColor:'#009999',
                // hightlightShadowColor:"#009999",
                // hightlightDocShadowColor:"#33ffff",
                mthis.selectLineColor = '#ccffff'
                mthis.hightlightLineColor = '#009999'
                mthis.selectShadowColor = "#33ffff"
                mthis.hightlightShadowColor = '#009999'
                let netchartnodes = mthis.netchart.nodes()
                for (let i = 0; i < netchartnodes.length; i++) {
                  let no = mthis.netchart.getNode(netchartnodes[i].id)
                  no.hightLight = false;
                  // no.draggable = false;
                  mthis.netchart.updateStyle(netchartnodes[i].id)
                }
                if (mthis.netchart.nodes().length > 0) {
                  mthis.ifhasNode = true
                } else {
                  mthis.ifhasNode = false
                }
                if (event.selection.length > 0) {
                  // mthis.operatorConfig[0].disable=true;
                  mthis.ifhasNode = true
                  let selectN = {
                    nodes: event.selection.map(item => {
                      return item.data;
                    })
                  };
                  mthis.selectionId = event.selection.filter(it => {
                    return it.isNode
                  }).map(item => {
                    return item.id;
                  });
                  // // console.log(mthis.selectionId)
                  let linksArr = [];
                  for (let n = 0; n < mthis.selectionId.length; n++) {
                    if (mthis.netchart.getNode(mthis.selectionId[n])) {
                      linksArr.push(
                        mthis.netchart.getNode(mthis.selectionId[n]).links.map(item => {
                          if (
                            mthis.selectionId.indexOf(item.from.id) > -1 &&
                            mthis.selectionId.indexOf(item.to.id) > -1
                          ) {
                            return item.id;
                          } else {
                            return "";
                          }
                        })
                      );
                    }
                  }
                  let c = [];
                  for (let nn = 0; nn < linksArr.length; nn++) {
                    c = c.concat(linksArr[nn]);
                  }
                  let uniquec = util.unique(c);
                  mthis.netchart.selection(uniquec.concat(mthis.selectionId));
                  // 有选中节点或者link
                  mthis.selectionId = mthis.selectionId;
                  mthis.selectionIdByTypeData = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: {
                      'type': 'push',
                      'ids': []
                    }
                  };
                  // let nodeArr = event.selection.filter(item=>{
                  //   return item.isNode
                  // })
                  // let nodesId = nodeArr.map(a=>{
                  //   return a.id
                  // })
                  // let links = nodeArr.map(item=>{
                  //   return item.links
                  // })
                  // // // // console.log('-----// // // console.log(nodeArr)-----')
                  // // // // console.log(nodeArr)
                  // // // // console.log(nodesId)
                  // // // // console.log(links)
                  // let selectLinks =  links.filter(a=>{
                  //   return (util.ifInArr(nodesId,a.from)&& util.ifInArr(nodesId,a.to))
                  // })
                  // // // // console.log(selectLinks)
                  // // // // console.log('-----// // // console.log(nodeArr)-----')
                  for (let nu = 0; nu < event.selection.length; nu++) {
                    if (event.selection[nu].isNode) {
                      // mthis.netchart.lockNode(event.selection[nu].data.id)
                      //有三种情况，实体，事件，文档
                      if (event.selection[nu].data.entity_type === "content" || event.selection[nu].data.entity_type === "document") {
                        mthis.selectionIdByTypeData.contentIds.ids.push(
                          event.selection[nu].data.id
                        );
                      } else if (
                        event.selection[nu].data.entity_type === "event"
                      ) {
                        mthis.selectionIdByTypeData.eventIds.push(
                          event.selection[nu].data.id
                        );
                      } else {
                        mthis.selectionIdByTypeData.nodeIds.push(
                          event.selection[nu].data.id
                        );
                      }
                      // } else if (event.selection[nu].isLink) {
                      //   if (event.selection[nu].data.class === 'event') {
                      //     mthis.selectionIdByTypeData.eventIds.push(event.selection[nu].data.id)
                      //   }
                    }
                  }
                  mthis.$store.commit("setSelectNetNodes", [{
                    ids: mthis.selectionId
                  }]);
                  mthis.$store.commit(
                    "setSelectionIdByType",
                    mthis.selectionIdByTypeData
                  );
                  mthis.$store.commit(
                    "setSinglePerson", !(mthis.selectionId.length > 1)
                  );
                } else {
                  mthis.selectionId = [];
                  mthis.selectionIdByTypeData = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: {
                      'type': 'push',
                      'ids': []
                    }
                  };
                  mthis.$store.commit("setSelectNetNodes", [{
                    ids: mthis.selectionId
                  }]);
                  mthis.$store.commit(
                    "setSelectionIdByType",
                    mthis.selectionIdByTypeData
                  );
                  // // // console.log('==========ssssss======================')
                  // // // console.log(mthis.selectionId)
                  mthis.netchart.updateStyle(mthis.selectionId);
                  mthis.netchart.updateSettings();
                  mthis.netchart.updateSize();
                  mthis.ifSelectNode = false;
                  mthis.ifSelectTwoNode = false;
                  mthis.ifSelectOnlyTwoNode = false;
                  mthis.selectItem = null;
                  // mthis.changNetchartMode('s')
                }
              }, 200);
              if (mthis.netchart.exportData()) {
                mthis.workatlastData[0].data = mthis.netchart.exportData();
              }
              // mthis.operatorConfig[0].disable=false;
            }
          },
          toolbar: {
            // enabled: false,
            zoomControl: true,
            cssClass: "zoomButtonClass",
            items: [{
              item: "zoomcontrol",
              side: "right",
              align: "top"
            }]
          },
          interaction: {
            resizing: {
              enabled: false
            },
            zooming: {
              autoZoomPositionElasticity: 50e-7
            },
            selection: {
              lockNodesOnMove: false
            }
          },
          theme: NetChart.themes.dark
        });
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
      "netPromte",
      "openWorkSetFlag",
      "searchNetResult",
      "netHeight",
      "addNetNodes",
      "netTimeCondition",
      "contentToNetData",
      "netStaticsSelectedIds",
      "geoToNetData",
      "workSpaceAddData",
      "eventImg",
      "atlastData",
      "netOnlyStaticsSelectedIds",
      'netKeyboards'
    ]),
    watch: {
      linkTemp: function() {
        var mthis = this
        // if (mthis.linkTemp.fromList.length == mthis.linkTemp.toList.length && mthis.linkTemp.fromList.length > 0) {
        //   mthis.$http
        //     .post(mthis.$store.state.ipConfig.api_url + "/community/", {
        //       from_ids: mthis.linkTemp.fromList,
        //       to_ids: mthis.linkTemp.toList
        //     })
        //     .then(response => {
        //       if(response.body.code === 0) {
        //         for(let num = 0; num<response.body.data[0].group.length;num++){
                  
        //         }
        //       }
        //     })
        // }

        //  mthis.operatorConfig[0].operatorSurface.push({
        //   name: '社区发现',
        //   id: 'community',
        //   type: 'group',
        //   excuteFunction: 'setGroup',
        //   value: mthis.linkTemp
        // })
        mthis.operatorConfig[0].operatorSurface=new Array({
          name: '分析结果',
          id: 'community',
          type: 'group',
          excuteFunction: 'setGroup',
          value: mthis.linkTemp
        })
        mthis.$store.commit("setCommunityData", mthis.linkTemp);
      },
      //全局监听消息提示
      netPromte: function() {
        this.setMessage(this.netPromte)
      },
      netKeyboards: function() {
        var mthis = this
        if (this.netKeyboards.indexOf('delete') > -1) {
          let index = mthis.netKeyboards.indexOf('delete')
          mthis.triggerMethods('remove')
          mthis.$store.state.netKeyboards.splice(index, 1)
        } else if (this.netKeyboards.indexOf('selall') > -1) {
          let index = mthis.netKeyboards.indexOf('selall')
          mthis.triggerMethods('selectAll')
          mthis.$store.state.netKeyboards.splice(index, 1)
        } else {
          return
        }
      },
      netOnlyStaticsSelectedIds: function() {
        this.netchart.selection(this.netOnlyStaticsSelectedIds.ids)
        this.netchart.updateStyle()
        this.netchart.updateSettings()
      },
      selectionIdByTypeData: function() {
        let lengthNum = this.selectionIdByTypeData.nodeIds.length + this.selectionIdByTypeData.eventIds.length + this.selectionIdByTypeData.contentIds.ids.length
        this.ifSelectNode = (lengthNum > 0) ? true : false
        this.ifSelectTwoNode = (lengthNum > 1) ? true : false
        this.ifSelectOnlyTwoNode = (lengthNum === 2) ? true : false
      },
      updateStyleCounter: function() {
        this.netchart.updateStyle()
        this.netchart.updateSettings()
      },
      atlastData: function() {
        var mthis = this;
        // // // console.log('------------dao ru cao zuo------------------')
        // // // console.log(this.atlastData)
        // layout: {
        //     // mode: 'hierarchy',
        //     mode: "radial",
        //     // mode: "static",
        //     // mode: "dynamic",
        // // // console.log(mthis.netchart)
        // // // console.log(mthis.netchart._impl.settings.layout.mode)
        // mthis.netchart._impl.settings.layout.mode = 'static'
        // mthis.netchart.replaceSettings({
        //   layout:{
        //     mode: 'static'
        //   }
        // })
        mthis.netchart.addData(mthis.atlastData);
        setTimeout(function() {
          for (let item of mthis.atlastData.nodes) {
            mthis.netchart.lockNode(item.id, item.x, item.y);
          }
        }, 200);
        // mthis.netchart.freezeLayout()
        // mthis.netchart.lockNode(mthis.atlastData.nodes.map(item=>{return item.id}))
        // // // // console.log(mthis.netchart._impl.settings.layout.mode)
        // setTimeout(function(e) {
        //   // mthis.netchart.replaceSettings({
        //   //   layout:{
        //   //     mode: 'radial'
        //   //   }
        //   // })
        // },200)
      },
      openWorkSetFlag: function() {
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
            type: "document",
            data: []
          },
          {
            type: "event",
            data: []
          },
          {
            type: "area",
            data: []
          }
        ];
        if (mthis.openWorkSetFlag.id !== "") {
          mthis.$http
            .post(mthis.$store.state.ipConfig.api_url + "/load-set-data/", {
              timestamp: mthis.openWorkSetFlag.time,
              idlist: mthis.openWorkSetFlag.id,
              label: "set",
              query: "id",
              page: 1,
              pagesize: 30
            })
            .then(response => {
              // // // console.log('=======response============')
              // // // console.log(response)
              if (
                response.body.code === 0 &&
                response.body.data[0].nodeIds.length > 0
              ) {
                mthis.worksetInfo = {
                  title: response.body.data[0].name,
                  des: response.body.data[0].des,
                  id: mthis.openWorkSetFlag.id
                };
                response.body.data[0].nodeIds.map(item => {
                  if (item.type === 'entity') {
                    mthis.$http
                      .post(mthis.$store.state.ipConfig.api_url + "/entity-info/", {
                        nodeIds: item.ids
                      })
                      .then(res => {
                        // // // console.log('=======res============')
                        // // // console.log(res)
                        if (res.body.code === 0) {
                          mthis.worksetData[0].data = res.body.data[0].nodes;
                        }
                      });
                  } else if (item.type === 'event') {
                    mthis.$http
                      .post(this.$store.state.ipConfig.api_url + "/event-detail/", {
                        EventIds: item.ids
                      })
                      .then(res => {
                        if (res.body.code === 0) {
                          res.body.data.map(items => {
                            let mapItem = mthis.myMap.get(items.event_subtype)
                            items.img = mapItem ? mapItem.img : "http://10.60.1.140/assets/images/event.png";
                            items.name = mapItem ? mapItem.name : type;
                            items.type = type
                            return items
                          })
                          for (let i = 0; i < res.body.data.length; i++) {
                            if (res.body.code === 0) {
                              mthis.worksetData[2].data = res.body.data;
                            }
                          }
                        } else {
                          mthis.setMessage("/event-detail/接口异常");
                        }
                      });
                  } else if (item.type === 'document') {
                    mthis.$http
                      .post(mthis.$store.state.ipConfig.api_url + "/doc-detail/", {
                        docIds: item.ids
                      })
                      .then(response => {
                        if (response.body.code === 0) {
                          response.body.data.map(items => {
                            items.name = items.title.substring(0, 19) + '...'
                            items.img = "http://10.60.1.140/assets/images/content_node.png"
                            return items
                          })
                          mthis.worksetData[1].data = response.body.data;
                        } else {
                          mthis.setMessage("/doc-detail/接口异常");
                        }
                      });
                  } else if (item.type === 'area') {
                    let datas = new Array()
                    item.ids.map(items => {
                      datas.push({
                        id: items,
                        name: items,
                        img: "http://10.60.1.140/assets/images/location.png",
                      })
                      return items
                    })
                    mthis.worksetData[3].data = datas;
                  }
                })
              } else {
                if (response.body.code !== 0) {
                  mthis.worksetInfo = {
                    title: "",
                    des: "",
                    id: ""
                  };
                  mthis.setMessage("查询集合异常");
                }
              }
            });
        }
        /*
          if (mthis.selectionIdByTypeData.nodeIds.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
              'nodeIds': mthis.selectionIdByTypeData.nodeIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[0].type = 'entity';
                mthis.worksetData[0].data = response.body.data[0].nodes
              }
            })
          }
          if (mthis.selectionIdByTypeData.eventIds.length > 0) {
            // ;
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
              'EventIds': mthis.selectionIdByTypeData.eventIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[1].type = 'event';
                mthis.worksetData[1].data = response.body.data[0].nodes
              }
            })
          }
          if (mthis.selectionIdByTypeData.contentIds.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
              'docIds': mthis.selectionIdByTypeData.contentIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[2].type = 'document';
                mthis.worksetData[2].data = response.body.data[0].nodes
              }
            })
          }
          */
        this.worksetType = "modify";
        this.worksetFlag = this.worksetFlag + 1;
        // // // console.log(this.worksetData)
      },
      startTimer(v) {
        var mthis = this;
        buttonTimer = setTimeout(function(e) {
          e.preventDefault();
          mthis.showModalStep(v);
        }, 2000);
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
      eventImg: function() {
        this.eventImgRules = this.eventImg;
      },
      selectionId: function() {
        // this.netchart.unlockNode(this.selectionId);
      },
      workSpaceAddData: function(obj) { //留扣，导入集合修改
        var mthis = this;
        // console.log(obj)
        let arr = [];
        // let nodes = [];
        let res = [];
        mthis.spinShow = true;
        if (obj && obj.entity && obj.entity.length > 0) {
          let ids = obj.entity
          mthis.$http
            .post(mthis.$store.state.ipConfig.api_url + "/entity-info/", {
              nodeIds: ids
            })
            .then(response => {
              if (response.body.code === 0) {
                let nodes = response.body.data[0].nodes;
                nodes.map(item => {
                  item.type = item.entity_type;
                  item.imageCropping = true;
                  arr.push(item.id)
                  return item;
                });
                mthis.netchart.addData({
                  nodes: nodes,
                  links: []
                });
              } else {
                mthis.setMessage("entity-detail接口异常");
              }
            });
        }
        if (obj && obj.event && obj.event.length > 0) {
          let ids = obj.event
          mthis.$http
            .post(this.$store.state.ipConfig.api_url + "/event-detail/", {
              EventIds: ids
            })
            .then(res => {
              if (res.body.code === 0) {
                let nodes = new Array()
                for (let i = 0; i < res.body.data.length; i++) {
                  let type = res.body.data[i].event_subtype.toLowerCase().replace(/-/, "_");
                  let mapItem = mthis.myMap.get(type)
                  let img = mapItem ? mapItem.img : "http://10.60.1.140/assets/images/event.png";
                  let name = mapItem ? mapItem.name : type;
                  nodes.push({
                    id: res.body.data[i].id,
                    img: img,
                    entity_type: "event",
                    name: name,
                    loaded: true
                  });
                  arr.push(res.body.data[i].id)
                }
                mthis.netchart.addData({
                  nodes: nodes,
                  links: []
                });
              } else {
                mthis.setMessage("/event-detail/接口异常");
              }
            });
        }
        if (obj && obj.document && obj.document.length > 0) {
          let ids = obj.document
          mthis.$http
            .post(mthis.$store.state.ipConfig.api_url + "/doc-detail/", {
              docIds: ids
            })
            .then(response => {
              if (response.body.code === 0) {
                let nodes = new Array()
                response.body.data.map(item => {
                  item.name = item.title.substring(0, 19) + '...'
                  item.img = "http://10.60.1.140/assets/images/content_node.png"
                  nodes.push({
                    id: item.id,
                    img: item.img,
                    entity_type: "document",
                    name: item.name,
                    loaded: true
                  });
                  arr.push(item.id)
                  return item
                })
                mthis.netchart.addData({
                  nodes: nodes,
                  links: []
                });
              } else {
                mthis.setMessage("/doc-detail/接口异常");
              }
            });
        }
        mthis.zIndex = 0;
        setTimeout(function() {
          mthis.netchart.selection(util.unique(arr));
          setTimeout(function() {
            mthis.square();
          }, 500);
          mthis.netchart.scrollIntoView(arr);
          mthis.netchart.updateSettings()
          mthis.spinShow = false;
        }, 500);
      },
      expandVisible: function() {
        this.stepVisible = false;
      },
      stepVisible: function() {
        this.expandVisible = false;
      },
      netStaticsSelectedIds: function() {
        var mthis = this;
        let arr = new Array();
        let allNodIds = new Array();
        let netchartnodes = mthis.netchart.nodes()
        for (let i = 0; i < netchartnodes.length; i++) {
          allNodIds.push(netchartnodes[i].id);
          let no = mthis.netchart.getNode(netchartnodes[i].id)
          no.hightLight = false;
          no.opacity = 0.5;
        }
        if (mthis.netStaticsSelectedIds.length > 0) {
          mthis.selectLineColor = '#009999'
          mthis.selectShadowColor = "#009999"
          mthis.hightlightLineColor = '#ccffff'
          mthis.hightlightShadowColor = '#33ffff'
          for (let i = 0; i < mthis.netStaticsSelectedIds.length; i++) {
            let no = mthis.netchart.getNode(
              mthis.netStaticsSelectedIds[i]
            )
            arr.push(mthis.netStaticsSelectedIds[i]);
            no.opacity = 1;
            no.hightLight = true;
            mthis.netchart.updateStyle(mthis.netStaticsSelectedIds[i])
          }
        }
        mthis.netchart.updateStyle(allNodIds);
        mthis.netchart.updateSettings();
        mthis.netchart.updateSize();
      },
      geoToNetData: function() {
        // console.log('-----------------------------')
        // console.log(this.geoToNetData)
        // 调用查询接口，查询id对应数据
        // this.netchart.addData()
        var mthis = this;
        let dataids = []
        if (mthis.geoToNetData.nodeIds.length > 0) {
          dataids.concat(mthis.geoToNetData.nodeIds)
          mthis.$http
            .post(mthis.$store.state.ipConfig.api_url + "/entity-info/", {
              nodeIds: mthis.geoToNetData.nodeIds
            })
            .then(response => {
              mthis.netchart.addData({
                nodes: response.body.data[0].nodes,
                links: []
              });
            });
        }
        if (mthis.geoToNetData.eventIds.length > 0) {
          dataids.concat(mthis.geoToNetData.eventIds)
          // ;
          mthis.$http
            .post(this.$store.state.ipConfig.api_url + "/event-detail/", {
              EventIds: mthis.geoToNetData.eventIds
            })
            .then(res => {
              if (res.body.code === 0) {
                let nodes = new Array();
                for (let i = 0; i < res.body.data.length; i++) {
                  let type = res.body.data[i].event_subtype.toLowerCase().replace(/-/, "_");
                  let img = mthis.myMap.get(type).img;
                  let name = mthis.myMap.get(type).name;
                  nodes.push({
                    id: res.body.data[i].id,
                    img: img,
                    entity_type: "event",
                    name: name,
                    loaded: true
                  });
                }
                mthis.netchart.addData({
                  nodes: nodes,
                  links: []
                });
                // mthis.changNetchartMode('r')
              } else {
                mthis.setMessage("/event-detail/接口异常");
              }
            });
        }
        // mthis.netchart.selection(dataids)
        setTimeout(() => {
          mthis.netchart.selection(dataids);
        }, 200);
        setTimeout(() => {
          mthis.square();
          mthis.spinShow = false;
        }, 500);
      },
      contentToNetData: function() {
        this.spinShow = true;
        let mthis = this;
        let contentIdsArry = mthis.contentToNetData.nodes.map(item => {
          return item.id;
        });
        var addData2chart = function(data) {
          return new Promise(function(resolve) {
            mthis.netchart.addData(data);
            resolve();
          })
        }
        // addData2chart(mthis.contentToNetData).then(()=>{
        //   mthis.netchart.selection(contentIdsArry)
        // }).then(()=>{
        //   mthis.square()
        // }).then(()=>{
        //   mthis.netchart.lockNode(contentIdsArry)
        //   mthis.netchart.scrollIntoView(contentIdsArry)
        // })
        mthis.netchart.addData(mthis.contentToNetData)
        mthis.netchart.scrollIntoView(contentIdsArry);
        contentIdsArry.map(it => {
          mthis.netchart.lockNode(it);
          return it
        })
        setTimeout(() => {
          mthis.netchart.selection(contentIdsArry);
        }, 200);
        setTimeout(() => {
          mthis.square();
          mthis.spinShow = false;
        }, 500);
      },
      netTimeCondition: function() {
        var mthis = this;
        let arr = new Array();
        let allNodIds = new Array();
        let netchartnodes = mthis.netchart.nodes()
        for (let i = 0; i < netchartnodes.length; i++) {
          allNodIds.push(netchartnodes[i].id);
          let no = mthis.netchart.getNode(netchartnodes[i].id)
          no.hightLight = false;
          no.opacity = 0.5;
          // no.draggable = false;
        }
        if (mthis.netTimeCondition != null && mthis.netTimeCondition.length > 0) {
          mthis.selectLineColor = '#009999'
          mthis.selectShadowColor = "#009999"
          mthis.hightlightLineColor = '#ccffff'
          mthis.hightlightShadowColor = '#33ffff'
          for (let i = 0; i < mthis.netTimeCondition.length; i++) {
            arr.push(mthis.netTimeCondition[i]);
            let no = mthis.netchart.getNode(mthis.netTimeCondition[i])
            no.hightLight = true;
            no.opacity = 1;
            // no.draggable = true;
            // mthis.netchart.getNode(
            //   mthis.netTimeCondition[i]
            // ).hightLight = true;
            mthis.netchart.updateStyle(mthis.netTimeCondition[i])
          }
        } else {
          mthis.selectLineColor = '#ccffff'
          mthis.hightlightLineColor = '#009999'
          mthis.selectShadowColor = "#33ffff"
          mthis.hightlightShadowColor = '#009999'
        }
        mthis.netchart.updateStyle(allNodIds);
        mthis.netchart.updateSettings();
        mthis.netchart.updateSize();
      },
      searchNetResult: function(va) {
        var mthis = this;
        va.data.type = va.data.entity_type;
        va.data.image = va.data.img;
        va.data.images = va.data.img;
        // 清空画布后添加节点
        // this.reloadNetData(va.data)
        // 不清空画布，直接添加节点
        console.log('==================>>>')
        console.log(mthis.netchart.getNodeDimensions(mthis.netchart.getNode(mthis.selectionId.pop())))
        console.log(va.data)
        // let positionNode = mthis.netchart.getNodeDimensions(mthis.netchart.getNode(mthis.selectionId.pop()))
        mthis.addNetData(va.data);
        setTimeout(function() {
          let arr = new Array(va.data.id);
          mthis.netchart.clearFocus()
          mthis.netchart.selection(arr);
          mthis.netchart.addFocusNode(va.data.id)
          mthis.netchart.scrollIntoView(arr);
          mthis.netchart.updateSettings()
          // mthis.changNetchartMode('r')
          // alert(8)
          // mthis.netchart.selection(util.unique(arr))
          // mthis.netchart.lockNode(util.unique(arr))
        }, 200);
        // let ar = va.data.id
        // setTimeout(() => {
        //   mthis.netchart.selection(ar)
        // }, 100);
        // setTimeout(() => {
        //   this.netchart.selection(va.data.id)
        // }, 200);
      },
      addNetNodes: function(va) {
        // // // console.log('=======addNetNodes============================')
        // // // console.log(this.addNetNodes)
        // // // console.log(va)
        var mthis = this;
        if (mthis.$store.state.tmss === "net") {
          mthis.netchart.addData(va);
          // let ids = va.nodes.map(item=>{
          //   return item.id
          // })
          // setTimeout(() => {
          //   mthis.netchart.selection(va.data.id)
          // }, 200);
        }
      },
      netHeight: function(va) {
        var mthis = this;
        mthis.nh = mthis.$store.getters.getNetHeight;
        mthis.nh_50 = va - 55 + "px";
        // alert( document.getElementById('netchart').style.height)
        // mthis.nh_50 =  (document.documentElement.clientHeight - 65 - 20)*0.8 - 55 + 'px'
        // document.getElementById('netchart').style.height = mthis.nh_50
        // alert(document.getElementById('netchart').style.height)
        // mthis.$store.commit('setNetDivHeight',mthis.nh_50)
      }
    },
    mounted() {
      // sessionStorage.setItem('netChartLog', JSON.stringify({
      //   data: []
      // }));
      var mthis = this;
      // //快捷键监听
      // document.onkeydown=function(event){ 
      //   if(mthis.$store.state.tmss === 'net') {
      //     var e = event || window.event || arguments.callee.caller.arguments[0];
      //     if (e && e.keyCode == 46) {
      //       mthis.triggerMethods('remove')
      //       e.preventDefault();
      //       e.stopPropagation();
      //     }
      //     if (e.keyCode == 65 && e.ctrlKey) {
      //       mthis.triggerMethods('selectAll')
      //       e.preventDefault();
      //       e.stopPropagation();
      //     }
      //   }
      // };  
      var ob = configer.loadxmlDoc(
        mthis.$store.state.ipConfig.xml_url + "/dictionary.xml"
      );
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap = new Map();
      for (let eventNameitem of eventNames) {
        for (let items of eventNameitem.children) {
          mthis.myMap.set(items.getElementsByTagName("ename")[0].textContent, {
            name: items.getElementsByTagName("chname")[0].textContent,
            img: items.getElementsByTagName("img")[0].textContent
          });
        }
      }
      mthis.nh = document.documentElement.clientHeight - 64 - 20 + "px";
      mthis.nh_50 = document.documentElement.clientHeight - 64 - 20 - 55 + "px";
      mthis.initCharts();
      mthis.netchart.replaceData({
        nodes: [],
        links: []
      });
      mthis.netData = mthis.$store.getters.netData;
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
  .DVSL-NC-zoom {
    height: 200px !important;
  }
  .zoomButtonClass {
    top: 20px !important;
    right: 30px !important;
  }
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
  .deg-90 {
    transform: rotate(-90deg);
  }
  .downIcon {
    position: absolute;
    right: 3px;
    bottom: 11px;
    transform: scale(0.5);
  }
  .ivu-spin-fix {
    background-color: rgba(0, 0, 0, 0.8) !important;
  }
  .ivu-spin-dot {
    background-color: rgba(51, 255, 255, 1) !important;
  }
  .dropDownSelectPoint {
    margin: 0 10px;
  }
  .xuanfuAlert {
    /* background-color: rgba(51, 255, 255, 0.3); */
    position: absolute;
    color: #ccffff;
    top: 75px;
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
  .ringRightMenu {
    cursor: pointer;
    color: #ccffff;
    background-color: rgba(51, 102, 102, 0.5);
    border: 1px solid red;
  }
  .ringRightMenu:hover {
    color: red;
    background-color: rgba(51, 255, 255, 0.3);
  }
</style>