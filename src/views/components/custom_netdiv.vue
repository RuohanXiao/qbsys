<template>
  <div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px'}" id="net">
      <div class='divStyle'>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="back">
            <Icon class="icon iconfont icon-fanhui  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">撤销操作</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="square">
            <Icon class="icon iconfont icon-grid  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">矩形布局</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="star">
            <Icon class="icon iconfont icon-star  DVSL-bar-btn-new DVSL-bar-btn-back" align="center" size="26"></Icon>
            <p class="img-content">星形布局</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="hierarchy">
            <Icon class="icon iconfont icon-expand  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">层级布局</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="expandNodeKnowledge">
            <Icon class="icon iconfont icon-kuozhan--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">知识扩展</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="expandNodeEvent">
            <Icon class="icon iconfont icon-kuozhan--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">事件扩展</p>
          </div>
        </Tooltip>
        <!-- <Col span="1" align="middle" class="bottom">
                        <Tooltip content="查找关联" placement="bottom">
                          <Icon class="icon iconfont icon-linkedby  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
                        </Tooltip>
                        </Col> -->
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div">
            <Icon class="icon iconfont icon-lujing--tupu  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content" @click="showPathKnowledge">知识路径</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="showPathEvent">
            <Icon class="icon iconfont icon-lujing--shijian  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">事件路径</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="remove">
            <Icon class="icon iconfont icon-delete-point  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">删除节点</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="removeOther">
            <Icon class="icon iconfont icon-fanxuan  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">反选节点</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div class="button-div" @click="add">
            <Icon class="icon iconfont icon-add  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">添加目标</p>
          </div>
        </Tooltip>
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
    <div :style="{height:NetHeight,border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div id="netchart" aria-autocomplete="true" :style="{height:NetHeight}"></div>
    </div>
    </Col>
    <!-- flag 是modal显示开关，eventData是modal左侧列表数据 -->
    <modal-chart :flag="modal01" :edata="eventData"></modal-chart>
  </div>
</template>
<script>
  import axios from 'axios'
  import mock from '../../mock/index.js'
  import modalChart from './custom_modal.vue'
  // import modalChart from './custom_modal_vue.vue'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import util from '../../util/tools.js'
  mock.test = 1
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        timer: null,
        basicY: 0,
        basicX: 0,
        // dataurl: '../../dist/data/netData.json',
        NetHeight: 0,
        pathHoverFlag: false,
        modal_loading: false,
        selectionId: [],
        netchart: null,
        nextId: 4,
        flag: true,
        selectItem: null,
        saveNum: 0,
        modal01: false,
        eventData: null,
        ids: []
      };
    },
    components: {
      modalChart
    },
    methods: {
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
        let linkArr = Object.keys(mthis.netchart._impl.data.default.links).map(key => mthis.netchart._impl.data.default.links[key]);
        mthis.$http.post('http://10.60.1.140:5001/graph-statistics/', {
          'nodes': nodeArr,
          'links': linkArr
        }).then(response => {
          mthis.$store.commit('setDataStatisticsEvent', response.data);
        })
      },
      del() {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          // this.modal01 = false;
          this.$Message.success('Successfully delete');
        }, 2000);
      },
      longPress() {
        this.netchart.startLongPress();
      },
      //强制重新渲染
      changeFlag() {
        this.flag = !this.flag;
        let focusId = (this.selectionId.length > 0) ? (this.selectionId[0].id) : 'node1'
        this.netchart.addFocusNode(focusId, 50)
        // document.getElementById('netchart').focus();
      },
      lightNodes(){
      },
      //知识拓展节点（加载新数据）
      expandNodeKnowledge() {
        var mthis = this;
        console.log(mthis.selectionId)
        let arr = []
        if (mthis.selectionId.length > 0) {
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          let res = null
          for (let i = 0; i < mthis.selectionId.length; i++) {
            arr.push(mthis.selectionId[i].id)
          }
          mthis.$http.post('http://10.60.1.140:5001/neighbor-datas/', {
            'ClassName': 'knowledge',
            'nodeIds': arr
          }).then(response => {
            res = response.body.data[0]
            for(let m = 0;m<res.nodes.length;m++){
              arr.push(res.nodes[m].id)
            }
            mthis.netchart.addData(res)
            setTimeout(function() {
              console.log(util.unique(arr))
              mthis.netchart.selection(util.unique(arr))
            },100)
            mthis.getStatistics()
          })
        } else {
          mthis.$Message.error('请至少选择一个节点进行拓展操作！')
        }
      },
      // 事件拓展
      expandNodeEvent() {
        var mthis = this;
        if (mthis.selectionId.length > 0) {
          mthis.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, mthis.saveNum)
          for (let i = 0; i < mthis.selectionId.length; i++) {
            mthis.netchart.expandNode(mthis.selectionId[i].id)
          }
          //访问数据库，拓展新数据
          mock.get("/getNodeDataNew").then(function(res) {
            let ids = [];
            let netChartLog = sessionStorage.getItem('netChartLog');
            let netChartLogJson = JSON.parse(netChartLog).data;
            let data = res.data.data[0];
            mthis.netchart.addData(data);
            for (let num = 0; num < res.data.data[0].nodes.length; num++) {
              ids.push(res.data.data[0].nodes[num].id)
            }
            netChartLogJson.push({
              'id': ids,
              'action': 'eventExpand',
              'other': ''
            })
            // netChartLog = JSON.stringify(netChartLogJson);
            sessionStorage.setItem('netChartLog', JSON.stringify({
              data: netChartLogJson
            }));
            mthis.getStatistics()
          });
          // mthis.netchart.settings.style.nodeBackground.imageCropping = 'crop'
        } else {
          this.$Message.error('请至少选择一个节点进行拓展操作！')
        }
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
        if(mthis.selectionId.length !== 2) {
          mthis.$Message.error('现阶段只支持两点路径！')
        } else {
          mthis.$http.get('http://10.60.1.140:5001/all-path-data/?start='+mthis.selectionId[0].id+'&end='+mthis.selectionId[1].id+'&step=3').then(response => {
            if(response.body.data[0].nodes.length + response.body.data[0].links.length > 0) {
              mthis.netchart.addData(response.body.data[0])
              let idArr = []
              let nodeobj = response.body.data[0].nodes
              let linkobj = response.body.data[0].links
              for(let i = 0;i<nodeobj.length;i++){
                idArr.push(nodeobj[i].id)
              }
              for(let j = 0;j<linkobj.length;j++){
                idArr.push(linkobj[j].id)
              }
              mthis.netchart.selection(idArr)
            } else {
              mthis.$Message.error('未找到此两点的知识路径')
            }
          })
        }
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
        // // var image    = mycanvas.toDataURL("image/png");  
        // // img.setAttribute('crossOrigin', 'anonymous');
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
            let radius = 5 * index + 5
            mthis.selectionId[index]["x"] = mthis.selectionId[0]["x"] +
              Math.sin(ahd * index) * radius;
            mthis.selectionId[index]["y"] = mthis.selectionId[0]["y"] +
              Math.cos(ahd * index) * radius;
            mthis.netchart.lockNode(mthis.selectionId[index].id);
          }
        } else if (mthis.selectionId.length > 0 && mthis.selectionId.length < 27) {
          //半径
          let radius = mthis.selectionId.length > 7 ? 200 : 100;
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
            mthis.netchart.unlockNode(this.selectionId[index].id);
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
            mthis.netchart.unlockNode(arr[nn]);
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
        this.eventData = [{
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
        ];
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
              // } else if (this.selectionId[num].isLink) {
              //   event.chart.removeData({
              //     links: [{
              //       id: this.selectionId[num].id
              //     }]
              //   });
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
          this.$Message.error('您并未选中任何节点！')
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
        mthis.getStatistics()
      },
      addNetData(data){
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
          this.$Message.error('无法后退，已经是第一步了！')
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
            nodeSpacing: 100
          },
          // 层级布局
          // layout: {
          //   mode: "hierarchy",
          //   nodeSpacing: 60, // horizontal spacing between nodes
          //   rowSpacing: 100 // vertical spacing between node rows in the hierarchy layout
          // },
          style: {
            // NetChart.settings.style.dragSelection 通过该属性可以设置框选颜色和背景等属性
            nodeLabel: {
              // 节点名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(0,0,0,0)"
              }
            },
            linkLabel: {
              // 事件名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(0,0,0,0)"
              }
            },
            linkClasses: [
              //要改
              // { className: "知识扩展关系", style: { fillColor: "rgba(51, 255, 255, 0.4)"} ,id: "know"},
              // { className: "事件扩展关系", style: { fillColor: "rgba(102, 255, 153, 0.4)"},id: "event" }
              // { className: "知识", style: { fillColor: "rgba(51, 255, 255, 0.4)",direction: "D", lineDash: [3, 3] } },
              // { className: "事件", style: { fillColor: "rgba(51, 255, 255, 0.4)"} }
            ],
            node: {
              display: "image",
              //节点外环大小
              lineWidth: 2,
              lineColor: "rgba(204,255,255,0.5)",
              imageCropping: true
            },
            nodeStyleFunction: function(node) {
              node.cursor = "pointer";
              node.label = node.data.name;
              // node.backgroundStyle.imageCropping =false
              // 默认图标怕
              if (node.data.type === "person" && node.data.img === "") {
                node.image = "./src/dist/assets/images/ico/b12.ico";
                nodeimageCropping = 'crop'
              } else if (node.data.type === "event" && node.data.img === "") {
                node.image = "./src/dist/assets/images/event.png";
                nodeimageCropping = 'crop'
              } else if (node.data.type === "org" && node.data.img === "") {
                node.image = "./src/dist/assets/images/ico/b3.ico";
                nodeimageCropping = 'crop'
              } else {
                node.image = node.data.img;
                node.imageCropping = 'crop'
              }
              if (node.hovered) {
                node.lineColor = node.data.lineColor = "rgba(51, 255, 255, 0.4)";
                node.lineWidth = node.data.lineWidth = '5'
              }
              // node.lineColor = node.data.lineColor =color.replace(",1)",",0.5)"); 
            },
            linkStyleFunction: function(link) {
              link.cursor = "pointer";
              link.label = link.data.type === "" ? link.data.num : link.data.type;
              // if(link.data.className === '知识扩展关系') //要改
              if (link.data.className === '知识') {
                link.fillColor = 'rgba(51, 255, 255, 0.4)';
                // , direction: "D", lineDash: [3, 3] 
              } else {
                link.fillColor = 'rgba(51, 255, 255, 0.4)';
              }
              if (link.hovered) {
                link.radius = 3;
                // 连线颜色
                // link.fillColor = "#33ffff";
              } else {
                //连线粗细
                link.radius = 1;
                // 连线颜色
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
              //   if (event.clickNode) {
              //     mthis.selectionId = event.clickNode.id;
              //   } else if (event.clickLink) {
              //     mthis.selectionId = event.clickLink.id;
              //   } else {
              //     mthis.selectionId = null
              //   }
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
              // // fill the info popup based on the node that was hovered.
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
              if (this.timer) {
                clearTimeout(this.timer)
              }
              this.timer = setTimeout(function() {
                if (event.selection.length > 0) {
                  mthis.selectItem = event;
                  // 有选中节点或者link
                  mthis.selectionId = [];
                  for (
                    let selectNum = 0; selectNum < event.selection.length; selectNum++
                  ) {
                    // mthis.selectionId.push({"selectionId":event.selection[selectNum].id,"selectionType":(event.selection[selectNum].isNode) ? 'node' : 'link'})
                    mthis.selectionId.push(event.selection[selectNum]);
                  }
                  // 触发右侧eventdiv改变
                  // mthis.$emit('selectNodes1', [{
                  //   ids: mthis.selectionId
                  // }, mthis.selectionId.length]);
                    mthis.$store.commit('setSelectNetNodes', [{
                      ids: mthis.selectionId
                  }])
                  mthis.$store.commit('setSinglePerson', !(mthis.selectionId.length > 1))
                  mthis.$store.commit('setTabSelect','目标详情')
                } else {
                  mthis.selectionId = [];
                  mthis.selectItem = null;
                }
              }, 500);
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
      }
    },
    created() {},
    computed: mapState([
      'searchNetResult', 'netHeight','addNetNodes'
    ]),
    watch: {
      searchNetResult: function(va) {
        // alert(0);
        if (this.$store.state.tmss === 'net') {
          this.reloadNetData(va.node.nodes[0])
        }
      },
      addNetNodes: function(va) {
        if (this.$store.state.tmss === 'net') {
          this.addNetData(va.node.nodes[0])
        }
      },
      netHeight: function(va) {
        var mthis = this;
        mthis.NetHeight = mthis.$store.getters.getNetHeight;
      }
      //   searchResultWatcher:function(old){
      //     // this.temp = old
      //   }
    },
    // props: ['NetHeight', 'netData'],
    mounted() {
      sessionStorage.setItem('netChartLog', JSON.stringify({
        data: []
      }));
      var mthis = this
      mthis.initCharts();
      mthis.netData = mthis.$store.getters.netData
      mthis.NetHeight = mthis.$store.getters.getNetHeight
      // mock.get("/getNodeData").then(function(res) {
      //   mthis.initCharts();
      //   mthis.netchart.addData(res.data.data[0]);
      //   for (let i = 0;i<res.data.data[0].nodes.length;i++){
      //     mthis.netchart.lockNode(res.data.data[0].nodes[i].id);
      //   }
      // });
      // mthis.$http.post('http://10.60.1.141:5000/neighbor-datas/',{'type': [],'nodeIds': 'Q1413'},{"emulateJSON":true}).then(response => {
      // mthis.$http.post('http://10.60.1.140:5001/neighbor-datas/',{'ClassName': '','nodeIds': 'Q1413'},{"emulateJSON":true}).then(response => {
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
</style>
