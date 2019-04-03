<template>
  <div :style="{height:nh}">
    <div :style="{height:nh,backgroundColor:'rgba(0,0,0,0)',position:'absolute',zIndex: zIndex,top:0,width:'99%',margin:'0 10px'}">
      <Spin size="large" fix v-if="spinShow"></Spin>
      <!-- <Spin size="large" fix v-if="true"></Spin> -->
    </div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px',border:'solid 1px #336666'}" id="net">
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
            <Icon class="icon iconfont icon-qingchu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">清空画布</p>
          </div>
        </Tooltip>
        <!-- <div class="divSplitLine"></div> -->
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                                                      <div class="button-div" @click="add">
                                                        <Icon class="icon iconfont icon-add  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                        <p class="img-content">添加目标</p>
                                                      </div>
                                                    </Tooltip> -->
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
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="remove">
            <Icon class="icon iconfont icon-juhe DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">聚合</p>
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
        <Tooltip placement="top" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="hierarchy">
            <Icon class="icon iconfont icon-expand  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">聚团</p>
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
              <Icon class="icon iconfont icon-guanlianshiti DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller  DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">关联实体</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addExpandTimer()" @mouseout="stopExpandTimer()" @click="expandNodeEvent" v-if="(expandFlag=='event')">
              <Icon class="icon iconfont icon-guanlianshijian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller  DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">关联事件</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addExpandTimer()" @mouseout="stopExpandTimer()" v-if="(expandFlag=='content')" @click="expandNodeContent">
              <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">关联文档</p>
            </div>
            <DropdownMenu slot="list" placement="bottom-start">
              <div class="button-div" @click="expandNodeKnowledge">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-guanlianshiti DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>关联实体</span><span v-if="(expandFlag=='knowledge')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="expandNodeEvent">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-guanlianshijian DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>关联事件</span><span v-if="(expandFlag=='event')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="expandNodeContent">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-guanlianwendang DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>关联文档</span><span v-if="(expandFlag=='content')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
                </DropdownItem>
              </div>
            </DropdownMenu>
          </Dropdown>
        </Tooltip>
        <Tooltip placement="top" content="（Ctrl+A）" :delay="5000">
          <!-- <Dropdown trigger="custom"  :visible="expandVisible"> -->
          <Dropdown :visible="expandGongzhiVisible">
            <!-- <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="expandNodeKnowledge" >
                                                                          <Icon class="icon iconfont icon-kuozhan--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                                          <p class="img-content">关系扩展</p>
                                                                        </div> -->
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addGongzhi()" @mouseout="stopGongzhi()" @click="gongzhiEnitiy" v-if="(expandFlag_gongzhi=='knowledge_gongzhi')">
              <Icon class="icon iconfont icon-gongzhishiti DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller  DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">共指实体</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addGongzhi()" @mouseout="stopGongzhi()" @click="gongzhiEvent" v-if="(expandFlag_gongzhi=='event_gongzhi')">
              <Icon class="icon iconfont icon-gongzhishijian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller  DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">共指事件</p>
            </div>
            <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mouseover="addGongzhi()" @mouseout="stopGongzhi()" v-if="(expandFlag_gongzhi=='content_gongzhi')" @click="gongzhiDoc">
              <Icon class="icon iconfont icon-gongzhiwendang DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
              <Icon class="icon iconfont icon-sanjiao-smaller DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
              <p class="img-content">共指文档</p>
            </div>
            <DropdownMenu slot="list" placement="bottom-start">
              <div class="button-div" @click="gongzhiEnitiy">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-gongzhishiti DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>共指实体</span><span v-if="(expandFlag_gongzhi=='knowledge_gongzhi')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="gongzhiEvent">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-gongzhishijian  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>共指事件</span><span v-if="(expandFlag_gongzhi=='event_gongzhi')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
                </DropdownItem>
              </div>
              <div class="button-div" @click="gongzhiDoc">
                <DropdownItem class="img-content">
                  <Icon class="icon iconfont icon-gongzhiwendang  DVSL-bar-btn-new DVSL-bar-btn-back padding6" size="18"></Icon>
                  <span>共指文档</span><span v-if="(expandFlag_gongzhi=='content_gongzhi')" class="dropDownSelectPoint">●</span><span v-else class="dropDownSelectPoint">&nbsp;</span>
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
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('knowledge')" v-show="stepFlag==='knowledge'" @mouseup="stopStepTimer">
            <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <!--<Icon class="icon iconfont icon-sanjiao-smaller DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>-->
            <p class="img-content">关系路径</p>
          </div>
          <!-- <Dropdown :visible="stepVisible" trigger="custom">
                                                        <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('knowledge')" v-show="stepFlag==='knowledge'" @mouseup="stopStepTimer">
                                                          <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                          <Icon class="icon iconfont icon-sanjiao-smaller DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
                                                          <p class="img-content">关系路径</p>
                                                        </div>
                                                        <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('event')" v-show="stepFlag==='event'" @mouseup="stopStepTimer">
                                                          <Icon class="icon iconfont icon-lujing--shijian DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                          <Icon class="icon iconfont icon-sanjiao-smaller DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
                                                          <p class="img-content">事件路径</p>
                                                        </div>
                                                        <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @mousedown="addStepTimer" @click="showModalStep('content')" v-show="stepFlag==='content'" @mouseup="stopStepTimer">
                                                          <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                          <Icon class="icon iconfont icon-sanjiao-smaller  DVSL-bar-btn-new DVSL-bar-btn-back downIcon" size="5"></Icon>
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
                                                      </Dropdown> -->
        </Tooltip>
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                                                      <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="spread">
                                                        <Icon class="icon iconfont icon-expand  DVSL-bar-btn-new DVSL-bar-btn-back deg-90" size="26"></Icon>
                                                        <p class="img-content">展开</p>
                                                      </div>
                                                    </Tooltip> -->
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="toGeo()">
            <Icon class="icon iconfont icon-tuisongzhikongjian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">推送空间</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="toContent()">
            <Icon class="icon iconfont icon-tuisongzhiwendang  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">推送文档</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="openCreatProjectModal('import')">
            <Icon class="icon iconfont icon-daoru DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">导入图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div :class="ifSelectNode? 'button-div': 'button-div-disable'" @click="openCreatProjectModal('expend')">
            <Icon class="icon iconfont icon-daochu DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">导出图</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="cutScreen">
            <Icon class="icon iconfont icon-cut  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">截屏</p>
          </div>
        </Tooltip>
        <!-- <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
                                                      <div class="button-div" @click="save">
                                                        <Icon class="icon iconfont icon-save1  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                                                        <p class="img-content">保存</p>
                                                      </div>
                                                    </Tooltip> -->
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="fit">
            <Icon class="icon iconfont icon-zhengchangshitu--quanping  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">适配</p>
          </div>
        </Tooltip>
      </div>
    </div>
    <div :style="{height:nh_50,borderRight:'solid 1px #336666',borderLeft:'solid 1px #336666',borderBottom:'solid 1px #336666',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <!-- <div id="netchart" aria-autocomplete="true" :style="{height:nh_50}"></div> -->
      <div id="netchart" :style="{height:nh_50}"></div>
      <transition name="mybox">
        <div class='xuanfuAlert' v-show="popout">{{message.text}}</div>
      </transition>
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
    <workset-modal :worksetData='worksetData' :type='worksetType' :flag="worksetFlag" :worksetInfo="worksetInfo" />
    <workatlas-modal :workatlastData='workatlastData' :type='workatlasType' :flag="workatlasFlag" />
  </div>
</template>
<script>
  import axios from 'axios'
  import mock from '../../mock/index.js'
  import modalChart from './custom_modal_add.vue'
  import worksetModal from './custom_workSet_modal.vue'
  import workatlasModal from './custom_workAtlas_modal.vue'
  // import modalChart from './custom_modal_vue.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import util from '../../util/tools.js'
  import html2canvas from '../../util/html2canvas.min.js'
  import Canvas2Image from '../../util/canvas2image.js'
  import configer from '../../util/configContrl.js'
  mock.test = 1
  var timer1 = null;
  /* eslint-disable */
  var timer = null;
  var timer2 = null;
  export default {
    name: "App",
    data() {
      return {
        worksetInfo: {
          title: '',
          des: '',
          id: ''
        },
        worksetData: [],
        workatlastData: [{
          title: '',
          des: '',
          data: {
            nodes: [],
            links: []
          },
          time: ''
        }],
        worksetType: '',
        workatlasType: '',
        worksetFlag: 0,
        workatlasFlag: 0,
        selectionEventObj: null,
        eventImgRules: null,
        popout: false,
        zIndex: 0,
        message: {
          text: '',
          time: ''
        },
        spinShow: false,
        expandFlag_gongzhi: 'knowledge_gongzhi',
        expandFlag: 'knowledge',
        stepFlag: 'knowledge',
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
        selectionIdByType: {
          nodeIds: [],
          eventIds: [],
          contentIds: []
        },
        myMap: new Map(),
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
        expandTimer_gongzhi: null,
        nh_50: 0,
        buttonTimer: null,
        hoverdNode: null
      };
    },
    components: {
      modalChart,
      worksetModal,
      workatlasModal,
      Canvas2Image
    },
    methods: {
      changeMode(type) {
        // this.netchart.replaceSettings({
        //   layout:{
        //     mode: type
        //   }
        // })
      },
      openCreatProjectModal(type) {
        var mthis = this
        mthis.workatlastData = [{
          title: '',
          des: '',
          data: {
            nodes: [],
            links: []
          },
          time: ''
        }];
        console.log('=====selectionId==========')
        console.log(mthis.selectionId)
        setTimeout(() => {
          let ddata = mthis.netchart.exportData()
          mthis.workatlastData = [{
            title: '',
            des: '',
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
          this.workatlasType = type
          this.workatlasFlag = this.workatlasFlag + 1
        }, 200)
        console.log(this.worksetData)
      },
      openCreateGroupModal() {
        var mthis = this
        this.worksetInfo = {
          title: '',
          des: '',
          id: ''
        }
        this.worksetData = [{
            type: 'entity',
            data: []
          },
          {
            type: 'document',
            data: []
          },
          {
            type: 'event',
            data: []
          }
        ];
        console.log('=====setSelectionIdByType==========')
        console.log(mthis.selectionIdByType)
        if (!(mthis.selectionIdByType.nodeIds.length == mthis.selectionIdByType.eventIds.length == mthis.selectionIdByType.contentIds.length == 0)) {
          if (mthis.selectionIdByType.nodeIds.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
              'nodeIds': mthis.selectionIdByType.nodeIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[0].type = 'entity';
                mthis.worksetData[0].data = response.body.data[0].nodes
              }
            })
          }
          if (mthis.selectionIdByType.eventIds.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
              'EventIds': mthis.selectionIdByType.eventIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[1].type = 'event';
                mthis.worksetData[1].data = response.body.data[0].nodes
              }
            })
          }
          if (mthis.selectionIdByType.contentIds.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
              'docIds': mthis.selectionIdByType.contentIds
            }).then(response => {
              if (response.body.code === 0) {
                mthis.worksetData[2].type = 'document';
                mthis.worksetData[2].data = response.body.data[0].nodes
              }
            })
          }
        }
        this.worksetType = 'add'
        this.worksetFlag = this.worksetFlag + 1
        console.log(this.worksetData)
      },
      startTimer(v) {
        var mthis = this
        buttonTimer = setTimeout(function(e) {
          e.preventDefault();
          mthis.showModalStep(v)
        }, 2000);
      },
      stopTimer() {
        clearTimeout(buttonTimer);
      },
      addStepTimer() {
        let mthis = this
        mthis.stepTimer = setTimeout(function(e) {
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
      addGongzhi() {
        let mthis = this
        this.expandTimer_gongzhi = setTimeout(function() {
          mthis.expandGongzhiVisible = true
        }, 1000)
      },
      stopGongzhi() {
        clearTimeout(this.expandTimer_gongzhi)
        this.expandGongzhiVisible = false
      },
      toGeo() {
        this.$store.commit('changeTMSS', 'geo')
        let arr = []
        for (let i = 0; i < this.selectionIdByType.nodeIds.length; i++) {
          arr.push(this.selectionIdByType.nodeIds[i])
        }
        for (let j = 0; j < this.selectionIdByType.eventIds.length; j++) {
          arr.push(this.selectionIdByType.enentIds[j])
        }
        for (let k = 0; k < this.selectionIdByType.contentIds.length; k++) {
          arr.push(this.selectionIdByType.enentIds[k])
        }
        /* arr.push(this.selectionIdByType.nodeIds)
        arr.push(this.selectionIdByType.enentIds)
        arr.push(this.selectionIdByType.contentIds) */
        arr = util.unique(arr)
        this.$store.commit('setNetToGeoData', arr)
        /* alert('已经推送，结果请参阅控制台') */
        //this.$store.commit('changeTMSS', 'geo')
      },
      toContent() {
        if(this.selectionIdByType.contentIds.length>0){
          this.$store.commit('setNetToContentData', this.selectionIdByType)
          this.$store.commit('changeTMSS', 'content')
        } else {
          this.setMessage('非文档节点不能推送至文档!')
        }
      },
      spread() {
        var mthis = this
        //   return x.isLink
        // }))
        //   return x.isLink && x.data.class === 'event'
        // }))
        //   return x.isLink && x.data.class === 'event' && x.data.num !== ''
        // }))
        let eventArry = this.selectionId.filter(function(x) {
          return x.isLink && x.data.class === 'event' && x.data.num !== ''
        })
        this.netchart.removeData({
          links: [{
            id: eventArry[0].id
          }]
        })
        mock.get("/getSpreadEvent").then(function(res) {
          for (let m = 0; m < res.data.data[0].node.length; m++) {
            // res.data.data[0].node[m].img = eventImgRules.get(res.data.data[0].node.name)
          }
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
        this.netchart.selection(ids)
      },
      //知识拓展节点（加载新数据）
      expandNodeKnowledge() {
        var mthis = this;
        let arr = []
        let entitRes,eventRes,docRes = null
        if (mthis.selectionId.length > 0) {
          mthis.spinShow = true
          mthis.zIndex = 999
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push((mthis.selectionId[i].id) ? mthis.selectionId[i].id : mthis.selectionId[i])
          }
          if (mthis.selectionIdByType.nodeIds.length>0){
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/neighbor-datas/', {
              'ClassName': 'knowledge',
              // 'nodeIds': arr
              'nodeIds': mthis.selectionIdByType.nodeIds
            }).then(response => {
              entitRes = response.body.data[0]
              console.log('++++++++++1')
              console.log(response)
              for (let m = 0; m < entitRes.nodes.length; m++) {
                entitRes.nodes[m].type = entitRes.nodes[m].entity_type
                entitRes.nodes[m].imageCropping = true
                arr.push(entitRes.nodes[m].id)
              }
              mthis.netchart.addData({nodes:entitRes.nodes,links:entitRes.links})
              setTimeout(function() {
                let ar = util.unique(arr)
                mthis.netchart.selection(ar)
                mthis.spinShow = false
                mthis.zIndex = 0
              }, 500)
            })
          }
          if(mthis.selectionIdByType.eventIds.length>0){
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-2-entity/', {
              'EventIds': mthis.selectionIdByType.eventIds
            }).then(response => {
              eventRes = response.body.data[0]
              console.log('++++++++++2')
              console.log(response)
              for (let m = 0; m < eventRes.nodes.length; m++) {
                eventRes.nodes[m].type = eventRes.nodes[m].entity_type
                eventRes.nodes[m].imageCropping = true
                arr.push(eventRes.nodes[m].id)
              }
              mthis.netchart.addData({nodes:eventRes.nodes,links:eventRes.links})
            })
          }
          if(mthis.selectionIdByType.contentIds.length>0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/docs-expand-entity/', {
              'docIds': mthis.selectionIdByType.contentIds
            }).then(response => {
              docRes = response.body.data[0]
              console.log(docRes.nodes)
              console.log('++++++++++3')
              for (let m = 0; m < docRes.nodes.length; m++) {
                docRes.nodes[m].type = docRes.nodes[m].entity_type
                docRes.nodes[m].imageCropping = true
                arr.push(docRes.nodes[m].id)
              }
              console.log({nodes:docRes.nodes,links:(docRes.links)?docRes.links:[]})
              mthis.netchart.addData({nodes:docRes.nodes,links:(docRes.links)?docRes.links:[]})
            })
          }
          mthis.spinShow = false
          mthis.zIndex = 0
          mthis.getStatistics()
        } else {
          // mthis.$Message.error('请至少选择一个节点进行拓展操作！')
          mthis.setMessage('请至少选择一个节点进行拓展操作！')
        }
        mthis.expandFlag = 'knowledge'
      },
      closeModal(){
        mthis.spinShow = false
        mthis.zIndex = 0
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
          for (let i = 0; i < mthis.selectionId.length; i++) {
            if (typeof(mthis.selectionId[i]) !== 'string') {
              arr.push(mthis.selectionId[i].id)
            } else {
              arr.push(mthis.selectionId[i])
            }
          }
          mthis.spinShow = true
          mthis.zIndex = 999
          var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
          var eventNames = ob.getElementsByTagName("eventNames");
          mthis.myMap = new Map();
          for(let eventNameitem of eventNames) {
            for(let items of eventNameitem.children){
              mthis.myMap.set(items.getElementsByTagName('ename')[0].textContent, {name:items.getElementsByTagName('chname')[0].textContent,img:items.getElementsByTagName('img')[0].textContent})
            }
          }

          // var roleNames = ob.getElementsByTagName("roleNames");
          // mthis.myMapRole = new Map();
          // for(let roleNameitem of roleNames) {
          //   for(let items of roleNameitem.children){
          //     mthis.myMapRole.set(items.getElementsByTagName('erolename')[0].textContent, {name:items.getElementsByTagName('chrolename')[0].textContent})
          //   }
          // }
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-2-events/', {
            'EntityIds': arr
          }).then(response => {
            if (response.body.code === 0) {
              let eventIds = response.body.data
              mthis.$http.post(this.$store.state.ipConfig.api_url + '/event-detail/', {
                'EventIds': eventIds
              }).then(res => {
                let eventItems = res.body.data
                let otherNodesIds = []
                let dataItems = {
                  nodes: [],
                  links: []
                };
                let idarr = []
                for (let eitems of eventItems) {
                  console.log('+==========+')
                  console.log(eitems)
                  let type = eitems.event_subtype.toLowerCase().replace(/-/, "_")
                  let img = mthis.myMap.get(type).img
                  let name = mthis.myMap.get(type).name
                  idarr.push(eitems.entity_list.map(item=>{
                    return item.id
                  }))
                  dataItems.nodes.push({
                    id: eitems.id,
                    entity_name: name,
                    chinese_name: name,
                    event_type: eitems.event_type,
                    event_subtype: type,
                    entity_type: "event",
                    label:name,
                    img: img,
                    loaded: true,
                    name: name
                  })
                  for (let linksItem of eitems.entity_list) {
                    otherNodesIds.push(linksItem.id)
                    dataItems.links.push({
                      id: eitems.id + linksItem.id,
                      type: linksItem.role,
                      from: eitems.id,
                      to: linksItem.id,
                      direct: false
                    })
                  }
                }
                console.log(dataItems)
                console.log(otherNodesIds)
                console.log(idarr)
                console.log('===========dataItems================')
                // console.log(dataItems)
                // console.log(otherNodesIds)
                // console.log(util.unique(otherNodesIds))
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
                  'nodeIds': util.unique(otherNodesIds)
                }).then(result => {
                  // console.log(result.body.data)
                  mthis.netchart.addData({nodes:result.body.data[0].nodes,links:[]})
                })
                mthis.netchart.addData(dataItems)
                setTimeout(function() {
                  mthis.netchart.selection(dataItems.nodes.map(ite => {
                    return ite.id
                  }))
                  // mthis.netchart.lockNode(util.unique(arr))
                }, 100)
              })
            } else {
              mthis.setMessage('entity-2-events接口调用异常')
            }
            // setTimeout(function() {
            //   mthis.changeMode('radial')
            // }, 200)
            mthis.spinShow = false
            mthis.zIndex = 0
            mthis.getStatistics()
          })
          // mthis.netchart.settings.style.nodeBackground.imageCropping = 'crop'
          mthis.expandFlag = 'event'
        } else {
          // this.$Message.error('请至少选择一个节点进行拓展操作！')
          this.setMessage('请至少选择一个节点进行拓展操作！')
        }
      },
      // 共线扩展
      expandNodeContent() {
        var mthis = this;
        let arr = []
        let rearr = []
        // console.log('mthis.selectionId')
        // console.log(mthis.selectionId)
        if (mthis.selectionId.length > 0) {
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          let res = null
          if (mthis.selectionId.length > 1 || mthis.selectionId[0].id == undefined) {
            rearr = mthis.selectionId
          } else {
            rearr = arr.push(mthis.selectionId[0].id)
          }
          mthis.spinShow = true
          mthis.zIndex = 999
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/context-by-entity-ids/', {
            'entityIds': rearr
          }).then(response => {
            console.log(response)
            if (response.body.code == 0 && response.body.data.length > 0) {
              res = response.body.data
              console.log(res)
              let resNodes = new Object()
              resNodes.nodes = []
              resNodes.links = []
              for (let m =0;m<res.length;m++) {
                console.log('000000000-------------------------000000000000000')
                let resNodeItem = new Object()
                resNodeItem.id = res[m].id
                resNodeItem.entity_type = 'content'
                resNodeItem.loaded = true
                resNodeItem.img = ''
                resNodeItem.label = resNodeItem.name = [...res[m].title].length>20?res[m].title.substring(0,19)+'...':res[m].title,
                resNodeItem.imageCropping = true
                resNodes.nodes.push(resNodeItem)

                // resNodes.links.push({
                //   id: rearr + res[m].id,
                //   from: rearr[0],  //这里写的不对!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                //   to: res[m].id,
                //   type: '关联',
                //   relation_id: 'guanlian'
                // })
                arr.push(res[m].id)
              }
              
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/docs-expand-entity/', {
                'docIds': arr
              }).then(response => {
                mthis.netchart.addData({nodes:response.body.data[0].nodes,links:response.body.data[0].links})
              })
              
              mthis.zIndex = 0
              mthis.spinShow = false
              mthis.netchart.addData(resNodes)
              setTimeout(function() {
                let ar = util.unique(resNodes.nodes.map(item=>{
                  return item.id
                }))
                mthis.netchart.selection(ar)
              }, 200)
              mthis.getStatistics()
            } else {
              // mthis.message = '无匹配数据'
              mthis.setMessage('无匹配数据')
              // mthis.message={text:'无匹配数据' + this.netTimeCondition.length,time:new Date().getTime()}
              mthis.zIndex = 0
              mthis.spinShow = false
            }
          })
        } else {
          // mthis.message={text:'请至少选择一个节点进行拓展操作！' + this.netTimeCondition.length,time:new Date().getTime()}
          // mthis.$Message.error('请至少选择一个节点进行拓展操作！')
          mthis.setMessage('请至少选择一个节点进行拓展操作！')
        }
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
        var mthis = this(this.selectionId.length === 1) ? (this.pathHoverFlag = true) : ((this.selectionId.length > 0) ? (this.setMessage('请选择单一节点进行路径显示')) : (this.setMessage('请选择一个节点进行路径显示')))
        // this.netchart.selection(["911716", '1016826'])
        if (mthis.selectionId.length !== 2) {
          // mthis.$Message.error('现阶段只支持两点路径！')
          mthis.setMseeage('现阶段只支持两点路径！')
          // mthis.message={text:'现阶段只支持两点路径！' + this.netTimeCondition.length,time:new Date().getTime()}
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
              // mthis.$Message.error('未找到知识路径')
              // mthis.message={text:'未找到知识路径' + this.netTimeCondition.length,time:new Date().getTime()}
              this.setMseeage('未找到知识路径')
            }
          })
        }
        mthis.modalStep = 0
        // mthis.netchart.selection(["911716", '1016826'])
      },
      showPathEvent() {
        (this.selectionId.length === 1) ? (this.pathHoverFlag = true) : ((this.selectionId.length > 0) ? (this.setMseeage('请选择单一节点进行路径显示' + this.netTimeCondition.length)) : (this.setMseeage('请选择一个节点进行路径显示' + this.netTimeCondition.length)))
      },
      setMessage(mes) {
        this.message = {
          text: mes + this.netTimeCondition.length,
          time: new Date().getTime()
        }
      },
      gongzhiEnitiy() {
        console.log(JSON.stringify(this.netchart.exportData()))
      },
      gongzhiEvent() {},
      gongzhiDoc() {},
      exportImg() {
        console.log(this.netchart)
        console.log(this.netchart.exportData()) //可以通过这种方法获取到节点的坐标
        var mthis = this
        // console.log('=================exportImg==================')
        // console.log(this.netchart.getNode("Q22368"))
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
        mthis.netchart.exportAsString('png', (res) => {})
        mthis.netchart.exportData('png', {
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
        }, true)
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
          // this.changeFlag();
          var mthis = this;
          // console.log(this.selectionId)
          if (this.selectionId.length > 0) {
            let rowNum = Math.ceil(Math.sqrt(this.selectionId.length));
            let basePoint = this.selectionId[0];
            // console.log(mthis.netchart.getNode(this.selectionId))
            let no1 = mthis.netchart.getNode(this.selectionId[0])
            for (let i = 0; i < this.selectionId.length; i++) {
              //解锁位置
              // mthis.netchart.unlockNode(this.selectionId[i].id);
              let col = i % rowNum;
              let row = parseInt(i / rowNum);
              // this.selectionId[i]["x"] = col * 100;
              // this.selectionId[i]["y"] = row * 100;
              let no = mthis.netchart.getNode(this.selectionId[i])
              no["x"] = no1["x"] + col * 150;
              no["y"] = no1["y"] + row * 150;
              // mthis.netchart.unlockNode(this.selectionId[i].id);
              // // mthis.netchart.layout.mode = 'dynamic'
              // // mthis.netchart.layout.mode = 'radial'
              // // mthis.netchart.layout.mode = 'static'
              // // 锁定位置
              mthis.netchart.lockNode(this.selectionId[i]);
            }
            mthis.netchart.scrollIntoView(this.selectionId.map(item => {
              return item.id
            }))
            mthis.netchart.updateStyle(this.selectionId)
            mthis.netchart.updateSettings()
            mthis.netchart.updateSize()
            // mthis.netchart.addFocusNode(this.selectionId[0].id);
          }
        } else {
          // this.$Message.error('请选择节点进行矩形排列操作！')
          this.setMessage('请选择节点进行矩形排列操作！')
        }
        // this.flag = false;
      },
      //星型布局
      star() {
        var mthis = this;
        if (mthis.selectionId.length > 27) {
          mthis.changeFlag();
          let ahd = Math.PI / 72;
          let no1 = mthis.netchart.getNode(this.selectionId[0])
          for (let i = 1; i < mthis.selectionId.length; i++) {
            // lock
            // mthis.netchart.unlockNode(mthis.selectionId[i].id);
            // 辐射布局
            // let circleNum = Math.floor(Math.log(i) / Math.log(3))
            // let avd = 360 / Math.pow(3, circleNum);
            // let ahd = avd * Math.PI / 360;
            // let radius = 200 * circleNum + 200
            // mthis.selectionId[i]["x"] = mthis.selectionId[0]["x"] +
            //   Math.sin(ahd * i) * radius;
            // mthis.selectionId[i]["y"] = mthis.selectionId[0]["y"] +
            //   Math.cos(ahd * i) * radius;
            // 螺旋布局
            // let radius = 5 * i + 5
            let no = mthis.netchart.getNode(this.selectionId[i])
            no.x = no1.x + Math.sin(ahd * i) * (Math.random() - 0.5) * 2000;
            no.y = no1.y + Math.cos(ahd * i) * (Math.random() - 0.5) * 2000;
            // mthis.selectionId[i]["x"] = mthis.selectionId[0]["x"] +
            //   Math.sin(ahd * i) * (Math.random() - 0.5) * 2000;
            // mthis.selectionId[i]["y"] = mthis.selectionId[0]["y"] +
            //   Math.cos(ahd * i) * (Math.random() - 0.5) * 2000;
            //   lock
            // mthis.netchart.lockNode(mthis.selectionId[index].id);
          }
        } else if (mthis.selectionId.length > 0 && mthis.selectionId.length < 27) {
          //半径
          let radius = mthis.selectionId.length > 7 ? 200 : 100;
          // let radius = mthis.selectionId.length*2;
          //每一个BOX对应的角度;
          let avd = 360 / mthis.selectionId.length;
          //每一个BOX对应的弧度;
          let ahd = avd * Math.PI / 180;
          let no1 = mthis.netchart.getNode(this.selectionId[0])
          for (let i = 0; i < mthis.selectionId.length; i++) {
            //解锁位置
            // lock
            // mthis.netchart.unlockNode(mthis.selectionId[index].id);
            let no = mthis.netchart.getNode(this.selectionId[i])
            no.x = no1.x + Math.sin(ahd * i) * radius;
            no.y = no1.y - radius + Math.cos(ahd * i) * radius;
            // mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
            //   Math.sin(ahd * index) * radius;
            // mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] - radius +
            //   Math.cos(ahd * index) * radius;
            // 锁定位置
            // lock
            // mthis.netchart.lockNode(mthis.selectionId[index].id);
          }
          mthis.netchart.addFocusNode(no1.id);
        } else {
          // mthis.$Message.error('请选择节点进行矩形排列操作！')
          this.setMessage('请选择节点进行矩形排列操作！')
        }
      },
      // 层级布局
      hierarchy() {
        var mthis = this
        if (mthis.selectionId.length > 0) {
          // old 层级代码
          // this.$http.post(this.$store.state.ipConfig.api_url + '/hierarchical-node-structure/', {
          //   "nodeIds": mthis.selectionId,
          //   "RootNodeId": mthis.selectionId[0],
          //   "edge_from_backend": true
          // }).then(response => {
          //   if (response.body.code == 0) {
          //     console.log('traverseTree2')
          //     console.log(util.traverseTree2(response.body.data[0]))
          //   }
          // })
          // mthis.changeFlag();
          // mthis.basicX = mthis.selectionId[0]['x']
          // mthis.basicY = mthis.selectionId[0]['y']
          // let arr = []
          // let arrLevel1 = []
          // for (let index = 0; index < mthis.selectionId.length; index++) {
          //   // mthis.netchart.unlockNode(this.selectionId[index].id);
          //   mthis.selectionId[index]["x"] = index * 100 + mthis.basicX
          //   mthis.selectionId[index]["y"] = mthis.basicY
          //   // lock
          //   // mthis.netchart.lockNode(mthis.selectionId[index].id);
          //   arrLevel1.push(mthis.selectionId[index].id)
          //   for (let num = 0; num < mthis.selectionId[index].dataLinks.length; num++) {
          //     if (mthis.selectionId[index].dataLinks[num].from === mthis.selectionId[index].id) {
          //       (arr.push(mthis.selectionId[index].dataLinks[num].to))
          //     } else {
          //       (arr.push(mthis.selectionId[index].dataLinks[num].from))
          //     }
          //     var item;
          //     let num = 0
          //     while (stack.length) {
          //       item = stack.shift();
          //       // console.log(item.id);
          //       //如果该节点有子节点，继续添加进入栈底
          //       if (item.children && item.children.length) {
          //         stack = stack.concat(item.children);
          //       } else {
          //         // console.log('!!!!!!!!___________!!!!!!!!!!')
          //         console.log(mthis.netchart.getNode(item.id).label)
          //       }
          //       console.log('aaaaaaa')
          //     }
          //   };
          //   iterator1(response.body.data[0]);
          // }
        } else {
          // this.$Message.error('请选择节点进行层级排列操作！')
          this.setMessage('请选择节点进行层级排列操作！')
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
        // html2canvas(document.getElementById('netchart')).then(function(canvas) {
        //   var pageData = canvas.toDataURL('image/jpeg', 1.0);
        //   console.log(pageData)
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
        var oCanvas = document.getElementById("netchart");
        Canvas2Image.saveAsPNG(document.querySelector('#netchart'), 100, 100);
      },
      //保存工作集
      save() {
        // this.netchart.selection(["911716", '1016826'])
        // 调用保存工作集接口
        // this.message = '调用保存工作集接口'
        this.setMessage('调用保存工作集接口')
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
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          //删除节点
          // this.netchart.removeData(this.selectionId)
          // let netChartLog = sessionStorage.getItem('netChartLog');
          // let netChartLogJson = JSON.parse(netChartLog).data;
          let ids = [];
          for (let num = 0; num < this.selectionId.length; num++) {
            console.log(typeof(mthis.selectionId[0]))
            if (typeof(mthis.selectionId[0]) === 'string') {
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
          mthis.getStatistics()
        } else if (mthis.selectionId.length == 1) {
          if (typeof(mthis.selectionId[0]) === 'string') {
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
          this.setMessage('请选择节点进行删除操作！')
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
          // sessionStorage.setItem('netChartLog', JSON.stringify({
          //   data: netChartLogJson
          // }));
          mthis.getStatistics()
          // 反选结果
        } else {
          // this.$Message.error('请选中节点！')
          this.setMessage('请选中节点！')
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
        setTimeout(function() {
          mthis.netchart.scrollIntoView(ar)
          mthis.netchart.selection(ar)
        }, 200)
        mthis.fit()
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
          // sessionStorage.setItem('netChartLog', JSON.stringify({
          //   data: netChartLogJson
          // }));
        } else {
          // this.$Message.error('无法后退')
          this.setMessage('无法后退！')
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
            // mode: "focusnodes" ,
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
            exportProxyURL: 'https://echo.zoomcharts-cloud.com/download',
            crossOrigin: "true"
          },
          // 星形布局
          layout: {
            // mode: 'hierarchy',
            mode: "radial",
            // mode: "static",
            // mode: "dynamic",
            twoRingRadialLayout: true,
            nodeSpacing: 100,
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
            //     image: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA0AAAANCAMAAABFNRROA" +
            //       "AAAaVBMVEVMaXFTU1NFRUX///////9FRUVNTU3+/v5KS0pERERHSEc6Ojr////+/v7///+" +
            //       "Tk5OOjo5FRUVCQkJISUg/Pz9LTEs6Ojo8PTxOT07///8zNDM1NjU3NzdRUVExMjE6OzpHR" +
            //       "0dJSUlTU1PLhCxuAAAAEXRSTlMAAQFJSpeX5OXl5eXm5uf19ZpgTxEAAABcSURBVHjaTcc" +
            //       "FDoBAEEPR4i7DsoLL/Q8JAyzwkib9sGb89P3yxTBorW2MY8v4KqWy5sZJRAkxXIQQ6Tk8p" +
            //       "JSxxMUNCMYYMK+o1xCYJrC82yoHwP5UV+Lll5EP6wAJEwV+kJe3nwAAAABJRU5ErkJggg==",
            //     py: -1,
            //     x: 6,
            //     backgroundStyle: {
            //       fillColor: "transparent"
            //     }
            //   }],
            // },
            // NetChart.settings.style.dragSelection 通过该属性可以设置框选颜色和背景等属性
            nodeLabel: {
              maxWidth:10,
              // textOverflow:ellipsis,
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
              // lineColor: "rgba(204,255,255,0.5)",
              // fillColor: "rgba(51, 255, 255, 0.2)",
              imageCropping: 'letterbox'
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
              fillColor: 'rgba(51,255,255,0.1)',
              lineWidth: 5
            },
            nodeStyleFunction: function(node) {
              // node.labelStyle.maxWidth = 3
              // node.labelStyle.margin = 2
              
              // ---------------------------------------
              // 具体类型节点样式
              if (node.data.entity_type === 'event') {
                if (node.selected) {
                node.lineColor = "#ccffff";
                node.shadowColor = "#33ffff";
                node.fillColor = "#003333";
                node.shadowBlur = 25;
                node.lineWidth = 5;
                if (node.hightLight) {
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                  // node.lineDash= [10,5,2,5];
                  node.lineWidth = 5
                }
              } else if (node.hovered) {
                node.lineWidth = 5
                node.shadowColor = "#009999";
                node.shadowBlur = 20;
                node.fillColor = "#003333";
                node.lineColor = "#009999";
              } else {
                node.fillColor = "#003333";
                node.lineColor = "#006666";
                node.lineWidth = 5;
                node.shadowColor = "rgba(0,0,0,0)";
                node.shadowBlur = 20;
              }
                node.display = 'text'
                node.radius = 15
                node.borderRadius = 5
                node.image = util.checkImgExists(node.data.img)?node.data.img:'http://10.60.1.140/assets/images/event.png'
                
              } else if (node.data.entity_type === 'content') {
                if (node.selected) {
                node.lineColor = "#ccffff";
                node.shadowColor = "#33ffff";
                node.fillColor = "#003333";
                node.shadowBlur = 25;
                node.lineWidth = 5;
                if (node.hightLight) {
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                  // node.lineDash= [10,5,2,5];
                  node.lineWidth = 5
                }
              } else if (node.hovered) {
                node.lineWidth = 5
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
                node.display = 'rectangle'
                node.image = 'http://10.60.1.140/assets/images/content_node.png'
                node.backgroundStyle = {}
                node.radius = 20
              } else {
                if (node.selected) {
                node.lineColor = "#ccffff";
                node.shadowColor = "#33ffff";
                node.fillColor = "#003333";
                node.shadowBlur = 25;
                node.lineWidth = 5;
                if (node.hightLight) {
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                  // node.lineDash= [10,5,2,5];
                  node.lineWidth = 5
                }
              } else if (node.hovered) {
                node.lineWidth = 5
                node.shadowColor = "#009999";
                node.shadowBlur = 20;
                node.fillColor = "#003333";
                node.lineColor = "#009999";
              } else {
                node.fillColor = "#003333";
                node.lineColor = "#006666";
                node.lineWidth = 5;
                node.shadowColor = "rgba(0,0,0,0)";
                node.shadowBlur = 20;
              }
                node.display = 'image'
                //判断图片资源是否存在
                if (util.checkImgExists("http://10.60.1.143/pic_lib/entity/" + node.id + ".png")) {
                  node.image = "http://10.60.1.143/pic_lib/entity/" + node.id + ".png"
                } else {
                  node.image = 'http://10.60.1.140/assets/images/' + node.data.entity_type + '.png';
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
              // }
              mthis.netchart.updateSettings()
            },
            linkStyleFunction: function(link) {
              link.length = 1;
              link.cursor = "pointer";
              link.position = 'absolute';
              link.strength = 1;
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
              link.fillColor = "#336666";
              // link.lineColor = "rgba(0,0,0,0)";
              if (link.hovered) {
                link.shadowColor = "#33ffff";
                link.shadowBlur = 5;
                link.radius = 2;
                link.lineWidth = 3;
                link.fillColor = "#006666";
              }
              if (link.selected) {
                link.lineColor = "#33ffff";
                link.fillColor = "#33ffff";
                link.radius = 3;
                link.lineWidth = 3;
                // link.shadowColor = "#33ffff";
                // link.shadowBlur = 0;
                // link.lineWidth = 0;
                // link.radius = 3
                if (link.hightLight) {
                  link.shadowColor = "#006666";
                  link.shadowBlur = 5;
                  link.radius = 3;
                  link.lineWidth = 3;
                }
              } else {
                link.fillColor = "#006666";
                link.radius = 2;
                link.lineWidth = 3;
                // link.lineColor = "rgb(51,102,102)";
                // link.lineWidth = 5;
              }
              // ---------------------------------------
              if (link.data.type !== undefined && link.data.type !== "") {
                // link.label = link.data.type;
                link.items = [{ // Default item places just as the regular label.
                  text: link.data.type,
                  // padding: 2,
                  // scaleWithZoom: true,
                  scaleWithZoom: false,
                  textStyle: {
                    font: '10px MicrosoftYaHei',
                    fillColor: '#669999',
                  },
                  backgroundStyle: {
                    //连线文字背景色
                    // fillColor: "rgba(0,0,0,0)"
                    fillColor: "rgba(0,0,0,0.8)"
                  }
                }]
              } else {
                link.direction = [100, 100, 100, 100]
                link.fromDecoration = "arrow";
                link.toDecoration = "arrow";
                // link.lineColor = 'rgba(51,255,255,0.2)'
                link.items = [{ // Default item places just as the regular label.
                  rotateWithLink: true,
                  scaleWithZoom: true,
                  align: 'center',
                  text: link.data.num,
                  imageSlicing: [0, 0, 20, 20],
                  textStyle: {
                    font: '12px MicrosoftYaHei',
                    fillColor: '#669999',
                  }
                }]
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
            onChartUpdate: function(event) {},
            onSettingsChange: function(event) {},
            onRightClick: function(event) {
              event.preventDefault();
            },
            onError: function(event) {
              console.log('------error-------------')
              console.log(event)
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
                mthis.$store.commit('setTabSelect', 'mubiaoxiangqing')
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
              console.log(event.selection)
              // this.selectionEventObj = event.selection
              if (timer) {
                clearTimeout(timer)
              }
              timer = setTimeout(function() {
                if (event.selection.length > 0) {
                  mthis.ifSelectNode = true
                  // mthis.selectItem = 
                  let selectN = new Object();
                  selectN.nodes = event.selection.map(item => {
                    return item.data
                  });
                  let selectNIds = selectN.nodes.map(ite => {
                    return ite.id
                  })
                  // mthis.netchart.lockNode(selectNIds);
                  // 所有有关节点的link
                  // console.log(mthis.netchart._impl.data.default.nodeToLinks)
                  // let alllinks = mthis.netchart._impl.data.default.nodeToLinks
                  // var linkarr = []
                  // for (let i in alllinks) {
                  // // linkarr.push(alllinks[i]); //属性
                  //   linkarr.push(alllinks[i]); //值
                  // }
                  // 遍历所有边
                  // console.log(linkarr)
                  let linksArr = []
                  for (let n = 0; n < selectNIds.length; n++) {
                    console.log(mthis.netchart.getNode(selectNIds[n]))
                    linksArr.push(mthis.netchart.getNode(selectNIds[n]).links.map(item => {
                      if ((selectNIds.indexOf(item.from.id) > -1) && (selectNIds.indexOf(item.to.id) > -1)) {
                        return item.id
                      } else {
                        return ''
                      }
                    }))
                  }
                  let c = []
                  for (let nn = 0; nn < linksArr.length; nn++) {
                    c = c.concat(linksArr[nn])
                  }
                  let uniquec = util.unique(c)
                  mthis.netchart.selection(uniquec.concat(selectNIds))
                  // 有选中节点或者link
                  mthis.selectionId = selectNIds;
                  mthis.selectionIdByType = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: []
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
                  // console.log('-----console.log(nodeArr)-----')
                  // console.log(nodeArr)
                  // console.log(nodesId)
                  // console.log(links)
                  // let selectLinks =  links.filter(a=>{
                  //   return (util.ifInArr(nodesId,a.from)&& util.ifInArr(nodesId,a.to))
                  // })
                  // console.log(selectLinks)
                  // console.log('-----console.log(nodeArr)-----')
                  for (let nu = 0; nu < event.selection.length; nu++) {
                    if (event.selection[nu].isNode) {
                      // mthis.netchart.lockNode(event.selection[nu].data.id)
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
                  mthis.selectionId = selectNIds
                  // 触发右侧eventdiv改变
                  // mthis.$emit('selectNodes1', [{
                  //   ids: mthis.selectionId
                  // }, mthis.selectionId.length]);
                  mthis.$store.commit('setSelectNetNodes', [{
                    ids: selectNIds
                  }])
                  mthis.$store.commit('setSelectionIdByType', mthis.selectionIdByType)
                  mthis.$store.commit('setSinglePerson', !(selectNIds.length > 1))
                } else {
                  mthis.selectionId = []
                  mthis.selectionIdByType = {
                    nodeIds: [],
                    eventIds: [],
                    contentIds: []
                  };
                  mthis.$store.commit('setSelectNetNodes', [{
                    ids: mthis.selectionId
                  }])
                  mthis.$store.commit('setSelectionIdByType', mthis.selectionIdByType)
                  mthis.ifSelectNode = false
                  mthis.selectItem = null
                }
              }, 200);
              if (mthis.netchart.exportData()) {
                mthis.workatlastData[0].data = mthis.netchart.exportData()
              }
              mthis.netchart.updateStyle(this.selectionId)
              mthis.netchart.updateSettings()
              mthis.netchart.updateSize()
            }
          },
          toolbar: {
            // enabled: false,
            zoomControl: true,
            cssClass: 'zoomButtonClass',
            items: [{
              item: "zoomcontrol",
              side: "right",
              align: "top"
            }]
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
      'openWorkSetFlag', 'searchNetResult', 'netHeight', 'addNetNodes', 'netTimeCondition', 'contentToNetData', 'netStaticsSelectedIds', 'geoToNetData', 'workSpaceAddData', 'eventImg', 'atlastData'
    ]),
    watch: {
      atlastData: function() {
        var mthis = this
        console.log('------------dao ru cao zuo------------------')
        console.log(this.atlastData)
        // layout: {
        //     // mode: 'hierarchy',
        //     mode: "radial",  
        //     // mode: "static",
        //     // mode: "dynamic",
        console.log(mthis.netchart)
        console.log(mthis.netchart._impl.settings.layout.mode)
        // mthis.netchart._impl.settings.layout.mode = 'static'
        mthis.changeMode('static')
        // mthis.netchart.replaceSettings({
        //   layout:{
        //     mode: 'static'
        //   }
        // })
        mthis.netchart.addData(mthis.atlastData)
        setTimeout(function() {
          for (let item of mthis.atlastData.nodes) {
            console.log('lock--------------')
            console.log(item)
            console.log(item.id)
            console.log(item.x)
            console.log(item.y)
            mthis.netchart.lockNode(item.id, item.x, item.y)
          }
        }, 200)
        // mthis.netchart.freezeLayout()
        // mthis.netchart.lockNode(mthis.atlastData.nodes.map(item=>{return item.id}))
        // console.log(mthis.netchart._impl.settings.layout.mode)
        // setTimeout(function(e) {
        //   mthis.changeMode('radial')
        //   // mthis.netchart.replaceSettings({
        //   //   layout:{
        //   //     mode: 'radial'
        //   //   }
        //   // })
        // },200)
      },
      openWorkSetFlag: function() {
        // console.log('-----------open modify workset--------------')
        // console.log(this.openWorkSetFlag)
        // console.log('--------------------------------------------')
        var mthis = this
        this.worksetInfo = {
          title: '',
          des: '',
          id: ''
        }
        this.worksetData = [{
            type: 'entity',
            data: []
          },
          {
            type: 'document',
            data: []
          },
          {
            type: 'event',
            data: []
          }
        ];
        if (mthis.openWorkSetFlag.id !== '') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
            "timestamp": mthis.openWorkSetFlag.time,
            "idlist": mthis.openWorkSetFlag.id,
            "label": "set",
            "query": "id",
            "page": 1,
            "pagesize": 30
          }).then(response => {
            console.log('=======response============')
            console.log(response)
            if (response.body.code === 0 && response.body.data[0].nodeIds.length > 0) {
              mthis.worksetInfo = {
                title: response.body.data[0].name,
                des: response.body.data[0].des,
                id: mthis.openWorkSetFlag.id
              }
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
                'nodeIds': response.body.data[0].nodeIds
              }).then(res => {
                console.log('=======res============')
                console.log(res)
                if (res.body.code === 0) {
                  mthis.worksetData[0].data = res.body.data[0].nodes
                }
              })
            } else {
              if (response.body.code !== 0) {
                mthis.worksetInfo = {
                  title: '',
                  des: '',
                  id: ''
                }
                mthis.setMessage('查询集合异常')
              }
            }
          })
        }
        /*
        if (mthis.selectionIdByType.nodeIds.length > 0) {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            'nodeIds': mthis.selectionIdByType.nodeIds
          }).then(response => {
            if (response.body.code === 0) {
              mthis.worksetData[0].type = 'entity';
              mthis.worksetData[0].data = response.body.data[0].nodes
            }
          })
        }
        if (mthis.selectionIdByType.eventIds.length > 0) {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
            'EventIds': mthis.selectionIdByType.eventIds
          }).then(response => {
            if (response.body.code === 0) {
              mthis.worksetData[1].type = 'event';
              mthis.worksetData[1].data = response.body.data[0].nodes
            }
          })
        }
        if (mthis.selectionIdByType.contentIds.length > 0) {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
            'docIds': mthis.selectionIdByType.contentIds
          }).then(response => {
            if (response.body.code === 0) {
              mthis.worksetData[2].type = 'document';
              mthis.worksetData[2].data = response.body.data[0].nodes
            }
          })
        }
        */
        this.worksetType = 'modify'
        this.worksetFlag = this.worksetFlag + 1
        console.log(this.worksetData)
      },
      startTimer(v) {
        var mthis = this
        buttonTimer = setTimeout(function(e) {
          e.preventDefault();
          mthis.showModalStep(v)
        }, 2000);
      },
      message: function() {
        var mthis = this
        mthis.popout = true;          //点击后popout为ture
        if (timer2) {
          clearTimeout(timer2)
        }
        timer2 = setTimeout(function() {
          mthis.popout = !mthis.popout;   //对popout进行取反
        }, 1000)
      },
      eventImg: function() {
        this.eventImgRules = this.eventImg
      },
      selectionId: function() {
        // this.netchart.unlockNode(this.selectionId);
      },
      workSpaceAddData: function(ids) {
        var mthis = this
        let arr = []
        let nodes = []
        let res = []
        mthis.spinShow = true
        console.log('ids')
        console.log(ids)
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
          'nodeIds': ids
        }).then(response => {
          if (response.body.code === 0) {
            nodes = response.body.data[0].nodes
            arr = nodes.map(item => {
              item.type = item.entity_type
              item.imageCropping = true
              return item.id
            })
            console.log('=================')
            console.log(nodes)
            console.log(arr)
            console.log('=================')
            mthis.spinShow = false
            mthis.zIndex = 0
            mthis.netchart.addData({
              nodes: nodes
            });
            setTimeout(function() {
              let ar = util.unique(arr);
              mthis.netchart.selection(ar);
              setTimeout(function() {
                mthis.square();
                mthis.spinShow = false
              }, 200);
            }, 100)
          } else {
            mthis.setMessage('entity-detail接口异常')
          }
          mthis.spinShow = false
        })
      },
      expandVisible: function() {
        this.stepVisible = false
      },
      stepVisible: function() {
        this.expandVisible = false
      },
      netStaticsSelectedIds: function() {
        var mthis = this;
        if (mthis.netStaticsSelectedIds.length > 0) {
          let arr = new Array()
          let allNodIds = new Array()
          for (let nod of mthis.netchart.nodes()) {
            console.log(nod)
            allNodIds.push(nod.id)
            nod.hightLight = false
          }
          for (let i = 0; i < mthis.netStaticsSelectedIds.length; i++) {
            arr.push(mthis.netStaticsSelectedIds[i])
            mthis.netchart.getNode(mthis.netStaticsSelectedIds[i]).hightLight = true
          }
          mthis.netchart.updateStyle(allNodIds)
          // mthis.netchart.updateStyle(arr)
          mthis.netchart.updateSettings()
          mthis.netchart.updateSize()
          // // mthis.netchart.selection(mthis.$store.state.netStaticsSelectedIds);
          // var obj = mthis.netchart._impl.data.default.nodes
          // var arr = [];
          // for (var key in obj) {
          //   if (!obj.hasOwnProperty(key)) {
          //     continue;
          //   }
          //   var item = {};
          //   item[key] = obj[key];
          //   arr.push(item);
          // }
          // // mthis.netchart._impl.settings.style.opacity = 0.5   
          // // mthis.netchart._impl.settings.style.nodeStyleFunction(true)
          // // mthis.netchart.style.nodeStyleFunction(highLightNodes)
          // // mthis.netchart
          // let disarr = arr.map(item => {
          //   return item.id
          // })
          // let ar = util.diff(disarr, mthis.$store.state.netStaticsSelectedIds);
          // mthis.$store.commit('setNetStaticsSelectedIds', [])
        }
      },
      geoToNetData: function() {
        // 调用查询接口，查询id对应数据
        // this.netchart.addData()
        var mthis = this
        console.log(mthis.geoToNetData)
        if(mthis.geoToNetData.nodeIds.length>0){
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            'nodeIds': mthis.geoToNetData.nodeIds
          }).then(response => {
            mthis.netchart.addData({nodes:result.body.data[0].nodes,links:[]})
          })
        }
        if(mthis.geoToNetData.eventIds.length>0) {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/event-detail/', {
            'EventIds': mthis.geoToNetData.eventIds
          }).then(res => {
            
          })
        }
      },
      contentToNetData: function() {
        console.log('this.contentToNetData')
        console.log(this.contentToNetData)
        this.spinShow = true
        let mthis = this
        let contentIdsArry = this.contentToNetData.nodes.map(item => {
          return item.id;
        });
        this.netchart.addData(this.contentToNetData)
        setTimeout(() => {
          mthis.netchart.selection(contentIdsArry)
          setTimeout(() => {
            mthis.square()
            this.spinShow = false
            // mthis.netchart.lockNode(contentIdsArry);
          }, 200);
        }, 100);
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
            mthis.setMessage('netTimeCondition出错,格式不正确,netTimeCondition长度为' + this.netTimeCondition.length)
            // this.message={text:'netTimeCondition出错,格式不正确,netTimeCondition长度为' + this.netTimeCondition.length,time:new Date().getTime()}
          }
        }
      },
      searchNetResult: function(va) {
        var mthis = this
        va.data.type = va.data.entity_type
        va.data.image = va.data.img
        va.data.images = va.data.img
        // 清空画布后添加节点
        // this.reloadNetData(va.data)
        // 不清空画布，直接添加节点
        this.addNetData(va.data)
        // let arr = va.data.nodes.map(item => {
        //   return item.id
        // })
        setTimeout(function() {
          let arr = new Array(va.data.id)
          mthis.netchart.selection(arr)
          // mthis.netchart.lockNode(arr)
          mthis.netchart.scrollIntoView(arr);
          // alert(8)
          // mthis.netchart.selection(util.unique(arr))
          // mthis.netchart.lockNode(util.unique(arr))
        }, 20)
        // let ar = va.data.id
        // setTimeout(() => {
        //   mthis.netchart.selection(ar)
        // }, 100);
        // setTimeout(() => {
        //   this.netchart.selection(va.data.id)
        // }, 200);
      },
      addNetNodes: function(va) {
        var mthis = this
        if (mthis.$store.state.tmss === 'net') {
          mthis.netchart.addData(va)
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
        mthis.nh_50 = va - 55 + 'px'
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
</style>
