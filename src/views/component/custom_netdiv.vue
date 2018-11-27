<template>
  <div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 10px 0 10px'}" id="net">
      <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{height:'70px',paddingLeft:'10px'}">
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="后退" placement="bottom">
          <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back" @click="back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <!-- <Col span="1" align="middle" class="bottom">
        <Tooltip content="框选" placement="bottom">
          <Icon class="icon iconfont icon-selection-box process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col> -->
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="矩形" placement="bottom">
          <Icon class="icon iconfont icon-grid process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="square"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="星形" placement="bottom">
          <Icon class="icon iconfont icon-star process-img DVSL-bar-btn DVSL-bar-btn-back" align="center" @click="star" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="层级" placement="bottom">
          <Icon class="icon iconfont icon-expand process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="hierarchy"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="知识扩展" placement="bottom">
          <Icon class="icon iconfont icon-kuozhan--tupu process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="expandNodeKnowledge"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="事件扩展" placement="bottom">
          <Icon class="icon iconfont icon-kuozhan--shijian process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="expandNodeEvent"></Icon>
        </Tooltip>
        </Col>
        
        <!-- <Col span="1" align="middle" class="bottom">
        <Tooltip content="查找关联" placement="bottom">
          <Icon class="icon iconfont icon-linkedby process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col> -->
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="知识路径" placement="bottom">
          <Icon class="icon iconfont icon-lujing--tupu process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="showPathKnowledge"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="事件路径" placement="bottom">
          <Icon class="icon iconfont icon-lujing--shijian process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="showPathEvent"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="删除节点" placement="bottom">
          <Icon class="icon iconfont icon-delete-point process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="remove"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="删除其余节点" placement="bottom">
          <Icon class="icon iconfont icon-delete-fanxuan process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="removeOther"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="添加目标" placement="bottom">
          <Icon class="icon iconfont icon-add process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="add"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="截屏" placement="bottom">
          <!-- <Icon class="icon iconfont icon-cut process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="cutScreen"></Icon> -->
          <Icon class="icon iconfont icon-cut process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="exportImg"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="保存工作集" placement="bottom">
          <Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="save"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" offset="9" align="middle" class="bottom">
        <Tooltip content="自适应" placement="bottom">
          <Icon class="icon iconfont icon-zhengchangshitu--quanping process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" @click="fit"></Icon>
        </Tooltip>
        </Col>
      </Row>
    </div>
    <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <div id="netchart" aria-autocomplete="true" :style="{height:netHeight}"></div>
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
  import util from '../../util/tools.js'
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
        ids:[]
      };
    },
    components: {
      modalChart
    },
    methods: {
      del() {
        this.modal_loading = true;
        setTimeout(() => {
          this.modal_loading = false;
          // this.modal01 = false;
          this.$Message.success('Successfully delete');
        }, 2000);
      },
      longPress() {
        console.log(this.netchart)
        this.netchart.startLongPress();
      },
      //强制重新渲染
      changeFlag() {
        this.flag = !this.flag;
        let focusId = (this.selectionId.length > 0) ? (this.selectionId[0].id) : 'node1'
        this.netchart.addFocusNode(focusId, 50)
        // document.getElementById('netchart').focus();
      },
      //知识拓展节点（加载新数据）
      expandNodeKnowledge() {
        if (this.selectionId.length > 0) {
          var mthis = this;
          this.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          // for (let i = 0; i < mthis.selectionId.length; i++) {
          //   // mthis.netchart.expandNode(this.selectionId[i].id)
          //   // 未来应该是个数组
          //   mthis.$http.get('http://10.60.1.141:5001/neighbor-datas/?ClassName=knowledge&&nodeId='+mthis.selectionId[i].id).then(response => {
          //     console.log(response.body.data[0])
          //     mthis.netchart.addData(response.body.data[0])
          //   })
          // }
           mthis.$http.get('http://10.60.1.141:5001/neighbor-datas/?ClassName=knowledge&&nodeId='+mthis.selectionId[0].id).then(response => {
              console.log(response.body.data[0])
              mthis.netchart.addData(response.body.data[0])
            })
          //访问数据库，拓展新数据
          // mock.get("/getNodeDataNew").then(function(res) {
          //   let ids = [];
          //   let netChartLog = sessionStorage.getItem('netChartLog');
          //   let netChartLogJson = JSON.parse(netChartLog).data; 
          //   let data = res.data.data[0];
          //   mthis.netchart.addData(data);
          //   for(let num = 0; num <res.data.data[0].nodes.length; num ++){
          //     ids.push(res.data.data[0].nodes[num].id)
          //   }
          //   netChartLogJson.push(
          //     {
          //       'id':ids,
          //       'action':'knowledgeExpand',
          //       'other': ''
          //     }
          //   )
          //   // netChartLog = JSON.stringify(netChartLogJson);
          //   sessionStorage.setItem('netChartLog', JSON.stringify({data:netChartLogJson}));
          // });

        } else {
          this.$Message.error('请至少选择一个节点进行拓展操作！')
        }
      },
      // 事件拓展
      expandNodeEvent() {
        if (this.selectionId.length > 0) {
          var mthis = this;
          this.saveData(mthis.netchart._impl.data.default.nodes, mthis.netchart._impl.data.default.links, this.saveNum)
          for (let i = 0; i < this.selectionId.length; i++) {
            mthis.netchart.expandNode(this.selectionId[i].id)
          }
          //访问数据库，拓展新数据
          mock.get("/getNodeDataNew").then(function(res) {
            let ids = [];
            let netChartLog = sessionStorage.getItem('netChartLog');
            let netChartLogJson = JSON.parse(netChartLog).data; 
            let data = res.data.data[0];
            mthis.netchart.addData(data);
            for(let num = 0; num <res.data.data[0].nodes.length; num ++){
              ids.push(res.data.data[0].nodes[num].id)
            }
            netChartLogJson.push(
              {
                'id':ids,
                'action':'eventExpand',
                'other': ''
              }
            )
            // netChartLog = JSON.stringify(netChartLogJson);
            sessionStorage.setItem('netChartLog', JSON.stringify({data:netChartLogJson}));
          });
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
        // (this.selectionId.length === 1) ? (this.pathHoverFlag = true) : ((this.selectionId.length > 0) ? (this.$Message.error('请选择单一节点进行路径显示')) : (this.$Message.error('请选择一个节点进行路径显示')))
        console.log(this.netchart)
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
        // // console.log(mycanvas.toDataURL("image/png"))
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
        // console.log(canvas.toDataURL('image/png'))
        // var w=window.open('about:blank','image from canvas');  
        // w.document.write("<img id='c2img' alt='from canvas'/>");  
        // var ctx = canvas.getContext('2d');
        // var image = new Image();
        // image.setAttribute('crossorigin', 'anonymous');
        // image.onload = function() {
        //     ctx.drawImage(image, 0, 0);
        //     document.getElementById('c2img').src = canvas.toDataURL('image/png');
        // };
        // console.log(this.netchart)
        this.netchart.exportData('png', {
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
        // console.log(document.getElementsByClassName('知识'))
        // this.netchart.dataLinks.selection
      },
      //矩形布局
      square() {
        // console.log('------------------8')
        if (this.selectionId.length > 0) {
          this.changeFlag();
          var mthis = this;
          // console.log('------------------9')
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
        if (this.selectionId.length > 0) {
          this.changeFlag();
          //半径
          let radius = this.selectionId.length > 7 ? 200 : 100;
          //每一个BOX对应的角度;
          let avd = 360 / this.selectionId.length;
          //每一个BOX对应的弧度;
          let ahd = avd * Math.PI / 180;
          // let basePoint = this.selectionId[0];
          var mthis = this;
          for (let index = 0; index < this.selectionId.length; index++) {
            //解锁位置
            mthis.netchart.unlockNode(this.selectionId[index].id);
            // this.selectionId[index]["x"] = 
            //   Math.sin(ahd * index) * radius;
            // this.selectionId[index]["y"] = 
            //   Math.cos(ahd * index) * radius;
            this.selectionId[index]["x"] = this.selectionId[0]["x"] +
              Math.sin(ahd * index) * radius;
            this.selectionId[index]["y"] = this.selectionId[0]["y"] - radius +
              Math.cos(ahd * index) * radius;
            // 锁定位置
            mthis.netchart.lockNode(this.selectionId[index].id);
          }
          // mthis.netchart.addFocusNode(this.selectionId[0].id);
        } else {
          this.$Message.error('请选择节点进行矩形排列操作！')
        }
      },
      // 层级布局
      hierarchy() {
        var mthis = this
        // mode: "hierarchy",
        // nodeSpacing: 60, // horizontal spacing between nodes
        // rowSpacing: 200 // vertical spacing between node rows in the hierarchy layou
        // var mthis = this
        // console.log('------------------10')
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
              if(mthis.selectionId[index].dataLinks[num].from === mthis.selectionId[index].id){
                (arr.push(mthis.selectionId[index].dataLinks[num].to))
              } else {
                (arr.push(mthis.selectionId[index].dataLinks[num].from))
              }
            }
          }
          arr = util.unique(arr)
          // console.log('------------------13')
          if(mthis.selectionId.length >1){
            arr = util.diff(arr,arrLevel1)
          }
          // arr = util.diff(arr,arrLevel1)
          for(let nn = 0; nn < arr.length; nn++){
            mthis.netchart.unlockNode(arr[nn]);
            mthis.netchart.getNode(arr[nn])["x"] = nn * 100  + mthis.basicX
            mthis.netchart.getNode(arr[nn])["y"] = mthis.basicY + 200
            mthis.netchart.lockNode(arr[nn]);
          }
          // console.log('---------------2222222222222-')
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
      save() {},
      //添加节点
      add() {
        this.eventData = [
        {
          text: 'list1',
          chlidren: [
            {text: 'list1-1',info:'this is list1-1'},
            {text: 'list1-2',info:'this is list1-2'},
            {text: 'list1-3',info:'this is list1-3'},
            {text: 'list1-4',info:'this is list1-4'},
            {text: 'list1-5',info:'this is list1-5'},
            {text: 'list1-6',info:'this is list1-6'},
            {text: 'list1-7',info:'this is list1-7'}
          ]
        },
        {
          text: 'list2',
          chlidren: [
            {text: 'list2-1',info:'this is list2-1'},
            {text: 'list2-2',info:'this is list2-2'},
            {text: 'list2-3',info:'this is list2-3'}
          ]
        },
        {
          text: 'list3',
          chlidren: [
            {text: 'list3-1',info:'this is list3-1'},
            {text: 'list3-2',info:'this is list3-2'},
            {text: 'list3-3',info:'this is list3-3'}
          ]
        },
        {
          text: 'list4',
          chlidren: [
            {text: 'list4-1',info:'this is list4-1'},
            {text: 'list4-2',info:'this is list4-2'},
            {text: 'list4-3',info:'this is list4-3'},
            {text: 'list4-4',info:'this is list4-4'},
            {text: 'list4-5',info:'this is list4-5'},
            {text: 'list4-6',info:'this is list4-6'},
            {text: 'list4-7',info:'this is list4-7'},
            {text: 'list4-8',info:'this is list4-8'},
            {text: 'list4-9',info:'this is list4-9'},
            {text: 'list4-10',info:'this is list4-10'},
            {text: 'list4-11',info:'this is list4-11'}
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
          netChartLogJson.push(
                {
                  'id':ids,
                  'action':'remove',
                  'other': ''
                }
              )
          // netChartLog = JSON.stringify(netChartLogJson);
          sessionStorage.setItem('netChartLog', JSON.stringify({data:netChartLogJson}));
          // console.log(sessionStorage.getItem('netChartLog'))
          //隐藏节点
          // for (let num = 0; num < this.selectionId.length; num++) {
          //   if (this.selectionId[num].isNode) {
          //     this.netchart.hideNode(this.selectionId[num].id)
          //     id: this.selectionId[num].id;
          //   }
          // }

        } else {
          this.$Message.error('请选择节点进行矩形排列操作！')
        }
      },
      queryPerson() {
      },
      //删除其余节点
      removeOther() {
        var mthis = this;
        // 获取当前选中节点
        // console.log('------------------25')
        if (this.selectionId.length > 0) {
          // 获取全部节点
          // console.log(this.netchart.nodes())
          let selectNodes = this.selectionId;
          let allNodes =  this.netchart.nodes();
          let temp01 = [];
          let temp02 = [];
          let netChartLog = sessionStorage.getItem('netChartLog');
          let netChartLogJson = JSON.parse(netChartLog).data;
          let ids = [];
          for(var i in selectNodes){
            temp01[selectNodes[i].id] = true;
          }
          for (var k in allNodes){
            if (!temp01[allNodes[k].id]) {
              // temp02.push(allNodes[k])
              if (allNodes[k].isNode) {
                ids.push(allNodes[k].id);
                mthis.netchart.removeData({
                  nodes: [{
                    id: allNodes[k].id
                  }]
                });
              } else if (allNodes[k].isLink) {
                event.chart.removeData({
                  links: [{
                    id: allNodes[k].id
                  }]
                });
              }
            }
          }
          netChartLogJson.push(
            {
              'id':ids,
              'action':'remove',
              'other': '反选'
            }
          )
          sessionStorage.setItem('netChartLog', JSON.stringify({data:netChartLogJson}));
          // 反选结果
        } else {
           this.$Message.error('您并未选中任何节点！')
        }

      },
      reloadNetData (data) {
        let dataarr = []
        dataarr.push(data)
        this.netchart.replaceData({"nodes":dataarr,"links":[]})
      },
      back() {
        let netChartLog = sessionStorage.getItem('netChartLog');
        let netChartLogJson = JSON.parse(netChartLog).data;
        if(netChartLogJson.length>0) {
          // 删除节点的后退操作 或 反选删除节点的后退操作
          if(netChartLogJson[netChartLogJson.length-1].action === 'remove') {
            console.log(netChartLogJson[netChartLogJson.length-1].id)
            // for(let i = 0; i < netChartLogJson[netChartLogJson.length-1].id.length; i++) {
            // }
            // 模拟接口，getNodeObjByIds   netChartLogJson[netChartLogJson.length-1].id
          }
          // 添加节点的后退操作
          if(netChartLogJson[netChartLogJson.length-1].action === 'add') {
          }
          // 知识拓展的后退操作
          if(netChartLogJson[netChartLogJson.length-1].action === 'knowledgeExpand') {
          }
          // 事件拓展的后退操作
          if(netChartLogJson[netChartLogJson.length-1].action === 'eventExpand') {
          }
          // 删除最后一条日志
          netChartLogJson = netChartLogJson.slice(0,-1);
          // 将改动过的日志写回session
          sessionStorage.setItem('netChartLog', JSON.stringify({data:netChartLogJson}));
        } else {
          this.$Message.error('无法后退，已经是第一步了！')
        }
        // this.netchart.back();
      },
      initCharts() {
        var mthis = this;
        (this.netchart = new NetChart({
          navigation: {
            // 初始化展示层级
            focusNodeExpansionRadius: 1,
            initialNodes: ["node1"],
            mode: "showall",
            // "mode": "focusnodes" ,
            expandOnClick: false
          },
          legend: { enabled: true },
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
            nodeLabel: {
              // 节点名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0.8)",
                lineColor: "rgba(0,0,0,0.8)"
              }
            },
            linkLabel: {
              // 事件名称边框
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0.8)",
                lineColor: "rgba(0,0,0,0.8)"
              }
            },
            linkClasses: [
                //要改
                // { className: "知识扩展关系", style: { fillColor: "rgba(51, 255, 255, 0.4)"} ,id: "know"},
                // { className: "事件扩展关系", style: { fillColor: "rgba(102, 255, 153, 0.4)"},id: "event" }
                { className: "知识", style: { fillColor: "rgba(51, 255, 255, 0.4)",direction: "D", lineDash: [3, 3] } },
                { className: "事件", style: { fillColor: "rgba(51, 255, 255, 0.4)"} }
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
              // 默认图标怕
              if (node.data.type === "person" && node.data.img === "") {
                node.image = "./src/dist/assets/images/ico/b12.ico";
              } else if (node.data.type === "event" && node.data.img === "") {
                node.image = "./src/dist/assets/images/event.png";
              } else if (node.data.type === "org" && node.data.img === "") {
                node.image = "./src/dist/assets/images/ico/b3.ico";
              } else {
                node.image = node.data.img;
              }
              if (node.hovered){
                node.lineColor = node.data.lineColor ="rgba(51, 255, 255, 0.4)"; 
                node.lineWidth = node.data.lineWidth = '5'
              }
              // node.lineColor = node.data.lineColor =color.replace(",1)",",0.5)"); 
            },
            linkStyleFunction: function(link) {
              link.cursor = "pointer";
              link.label = link.data.type === "" ? link.data.num : link.data.type;
              // console.log('-------------')
              // console.log(link)
              // if(link.data.className === '知识扩展关系') //要改
              if(link.data.className === '知识')
              {
                link.fillColor = 'rgba(51, 255, 255, 0.4)';
                // , direction: "D", lineDash: [3, 3] 
              } else {
                link.fillColor = 'rgba(51, 255, 255, 0.4)';
              }
              if (link.hovered){
                link.radius = 3;
                // 连线颜色
              // link.fillColor = "#33ffff";
              } else{
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
          data: {
            
          },
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
            onRightClick: function(event) {
              event.preventDefault();
            },
            onClick: function(event) {
              if (event.clickNode || event.clickLink) {
                if (event.clickNode) {
                  // mthis.changeTargetNode();
                  // event.selection[0].expand();
                }
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
            onPointerDrag: function(event) {
            },
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
                mthis.$emit('selectNodes1',{ids:mthis.selectionId});

              } else {
                mthis.selectionId = [];
                mthis.selectItem = null;
              }
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
      }
    },
    created() {
    },
    computed: {
      // menuitemClasses: function() {
      //   return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      // }
    },
    watch: {
      netData: function() {
        // this.netchart.data = this.netData
        // this.netchart.reloadData()
        this.reloadNetData(this.netData)
      }
    },
    props: ['netHeight','netData'],
    mounted() {
      sessionStorage.setItem('netChartLog', JSON.stringify({data:[]}));
      var mthis = this
      // mock.get("/getNodeData").then(function(res) {
      //   mthis.initCharts();
      //   mthis.netchart.addData(res.data.data[0]);
      //   for (let i = 0;i<res.data.data[0].nodes.length;i++){
      //     console.log()
      //     mthis.netchart.lockNode(res.data.data[0].nodes[i].id);
      //   }
      // });
      
      mthis.$http.post('http://10.60.1.141:5000/neighbor-datas/',{'type': [],'nodeIds': 'Q1413'},{"emulateJSON":true}).then(response => {
        // console.log(response.data);
        mthis.initCharts();
        mthis.netchart.addData(response.data.data[0]);
        for (let i = 0;i<response.data.data[0].nodes.length;i++){
          mthis.netchart.lockNode(response.data.data[0].nodes[i].id);
        }
      }, response => {
          console.log("error");
          this.$Message.error('getNodeData失败,请查看日志或稍后重试！')

      });
      // window.onresize = function() {
      //   this.netheight = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      //   this.netheightdiv = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
      // }
      // this.netheight = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      // this.netheightdiv = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
    }
  };
</script>
<style>
  .top,
  .bottom {
    text-align: center;
  }
</style>
