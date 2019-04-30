<template>
  <!-- 集合弹框 -->
  <div>
    <Modal class="modalDiv" width='80vw' footer-hide loading='loading' v-model="showFlag" id='md'>
      <p slot="close" style="color:#f60;text-align:center;top: -2px !important;right:-4px !important}" class='iconP'>
        <Icon type="icon iconfont icon-quxiaocancel color515" size="60"></Icon>
      </p>
      <div class='mainModal'>
        <div class='modalLeftDiv'>
          <div class='lefttop'>
            <div class="inputTitle">
              <Input class='inputT' v-model="workspaceTitle" placeholder="集合名" />
            </div>
            <div class="inputTitle">
              <Input v-model="workspaceDes" type="textarea" class='inputD scrollBarAble' :rows='8' :cols="20" placeholder="集合描述" />
            </div>
          </div>
          <div class='leftbottom'>
            <div class="inputTitle">
              <Input class='inputTbottom' v-model="searchWorkspaceTitle" @on-change="v=>{searchInfo(v)}" placeholder="搜索实体" prefix="ios-search" />
            </div>
            <div class='scrollBarAble' style='margin-bottom: 20px;height: 39vh;'>
              <div class='resList '>
                <div class='resli' v-for='op in options1' style="padding:'10px auto';line-height:4vh;">
                  <p>{{op.name}}
                    <Icon class="icon iconfont icon-tianjia DVSL-bar-btn DVSL-bar-btn-back lineH20" :style="{float: 'right',lineHeight: '4vh',height: '4vh'}" size="20" @click="addDataToTemp(op)" />
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class='modalRightDiv'>
          <div class="scrollBarAble">
            <div class='rightdiv' v-for='(item,index) in worksetData'>
              <div class="type-title lefttop">
                <div class="type-title-d"></div>
                <p class="type-title-p">{{dicMap[item.type]}}({{item.data.length}})</p>
              </div>
              <div class="type-content">
                <Row type="flex" justify="start">
                  <Col :sm="2" align="start" style="align-items: center;text-align: center;padding:10px 0px;" v-for='itemObj in item.data'>
                  <!-- <Avatar class="circle-img touxiangImg" icon="icon-delete-point" :style="{width:'50px',height:'50px',background:'rgba(51, 255, 255, 0.3)'}" /> -->
                  <Avatar class="circle-img touxiangImg" icon="ios-person" :id='itemObj.id' :src='itemObj.img' :style="{width:'50px',height:'50px',background:'rgba(51, 255, 255, 0.3)'}" />
                  <p class='nametext'>{{itemObj.name}}</p>
                  <div class='delItemDiv' @click="deletItem(itemObj.id,index)">
                    <Icon type="icon iconfont icon-shanchu color515" :style="{padding:'20px 0px'}" size="40"></Icon>
                  </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div>
        <!-- <div class='modalRightDiv' v-else>
          <div class="scrollBarAble">
            <div class='rightdiv' v-for='(item,index) in worksetData'>
              <div class="type-title lefttop">
                <div class="type-title-d"></div>
                <p class="type-title-p">{{dicMap[item.type]}}({{item.data.length}})</p>
              </div>
              <div class="type-content">
                <Row type="flex" justify="start">
                  <Col :sm="2" align="start" style="align-items: center;text-align: center;padding:10px 0px;" v-for='itemObj in item.data'>
                  <Avatar class="circle-img touxiangImg" icon="ios-person" :id='itemObj.id' :src='itemObj.img' :style="{width:'50px',height:'50px',background:'rgba(51, 255, 255, 0.3)'}" />
                  <p class='nametext'>{{itemObj.name}}</p>
                  <div class='delItemDiv' @click="deletItem(itemObj.id,index)">
                    <Icon type="icon iconfont icon-shanchu color515" :style="{padding:'20px 0px'}" size="40"></Icon>
                  </div>
                  </Col>
                </Row>
              </div>
            </div>
          </div>
        </div> -->
      </div>
      <div class="rightbottom">
        <Button class='buttonCannle' @click="back">取消</Button>
        <Button class='buttonOK' v-if="type==='modify'" @click='modifySet'>修改集合</Button>
        <Button class='buttonOK' v-else @click='createSet'>创建集合</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import util from '../../util/tools.js'
  import configer from '../../util/configContrl.js'
  // import { Store } from 'vuex';
  import {
    mapState,
    mapMutations
  } from 'vuex'
  mock.test = 1
  export default {
    data() {
      return {
        workspaceId: '',
        showFlag: false,
        lightIconFlag: false,
        loading: false,
        modal1: false,
        workspaceTitle: '',
        workspaceDes: '',
        searchWorkspaceTitle: '',
        clearFlag: false,
        options1: [],
        loading1: false,
        timer: null,
        inputInfo: "",
        modalType: '',
        dicMap: {
          entity: '实体',
          document: '文本',
          event: '事件',
        },
        // worksetData: [{
        //     type: 'entity',
        //     data: []
        //   },
        //   {
        //     type: 'document',
        //     data: []
        //   },
        //   {
        //     type: 'event',
        //     data: []
        //   }
        // ],
        itemsObj: [{
          name: '实体节点',
          num: 6
        }, {
          name: '事件节点',
          num: 6
        }, {
          name: '文档节点',
          num: 6
        }]
      }
    },
    mounted() {
      // $('.touxiangImg')
      var ob = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
      var entityMainType = ob.getElementsByTagName("entityMainType");
      this.myMap = new Map();
      for (var i = 0; i < entityMainType.length; i++) {
        let typeName = entityMainType[i].children[0].textContent;
        let typeChild = []
        for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
          this.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
        }
      }
    },
    watch: {
      worksetData:function(){
        // // console.log('---------------------------this.worksetInfo')
        // // console.log(this.worksetInfo)
        
      },
      worksetInfo:function(){
        this.workspaceTitle = this.worksetInfo.title
        this.workspaceDes = this.worksetInfo.des
        this.workspaceId = this.worksetInfo.id
      },
      flag: function() {
        this.showFlag = true
      },
      type: function() {
        // this.worksetData = new Array()
        if (this.type === 'add') {
          // alert('u click add')
        } else if (this.type === 'modify') {
          // alert('u click modify')
        } else {
          // alert('u click else')
        }
      }
    },
    methods: {
      deletItem(id,index){
        alert(id+ '   '+index)
        this.worksetData[index].data = this.worksetData[index].data.filter(item => {
          return item.id !== id
        })
      },
      modifySet() {
        // this.workspaceTitle = 
        var mthis = this
        let timestamp = new Date().getTime()
        let human = mthis.worksetData[0].data.filter(item => {
          return item.type === 'human'
        }).map(it => {
          return it.id
        })
        let administrative = mthis.worksetData[0].data.filter(item => {
          return item.type === 'administrative'
        }).map(it => {
          return it.id
        })
        let organization = mthis.worksetData[0].data.filter(item => {
          return item.type === 'organization'
        }).map(it => {
          return it.id
        })
        let weapon = mthis.worksetData[0].data.filter(item => {
          return item.type === 'weapon'
        }).map(it => {
          return it.id
        })
        let events = mthis.worksetData[2].data.map(it => {
          return it.id
        })
        let documents = mthis.worksetData[1].data.map(it => {
          return it.id
        })
        let setIds = mthis.worksetData[0].data.map(item => {
          return item.id
        })
        mthis.$http.put(mthis.$store.state.ipConfig.api_url + '/index-set-data/', {
          "timestamp": timestamp,
          "data": {
            "id": mthis.workspaceId,
            "name": (mthis.workspaceTitle==='')?('默认标题'+timestamp):mthis.workspaceTitle,
            "des": (mthis.workspaceDes==='')?('暂无描述'):mthis.workspaceDes,
            "nodeIds": setIds,
            "modify_time": util.getNowFormatDate(),
            "modify_user": "XiaoRuohan",
            // "create_time": util.getNowFormatDate(),
            // "create_user": "XiaoRuohan",
            "type": "human"
          }
        }).then(response => {
          // // console.log(response)
          if (response.body.code === 0) {
            alert('修改成功！')
            mthis.$store.commit('setRefSet', !mthis.$store.state.refSet)
            this.showFlag = false
          } else {
            alert('修改失败！')
          }
        })
      },
      createSet() {
        var mthis = this
        let timestamp = new Date().getTime()
        let human = mthis.worksetData[0].data.filter(item => {
          return item.type === 'human'
        }).map(it => {
          return it.id
        })
        let administrative = mthis.worksetData[0].data.filter(item => {
          return item.type === 'administrative'
        }).map(it => {
          return it.id
        })
        let organization = mthis.worksetData[0].data.filter(item => {
          return item.type === 'organization'
        }).map(it => {
          return it.id
        })
        let weapon = mthis.worksetData[0].data.filter(item => {
          return item.type === 'weapon'
        }).map(it => {
          return it.id
        })
        let events = mthis.worksetData[2].data.map(it => {
          return it.id
        })
        let documents = mthis.worksetData[1].data.map(it => {
          return it.id
        })
        let setIds = mthis.worksetData[0].data.map(item => {
          return item.id
        })
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/index-set-data/', {
          "timestamp": timestamp,
          "data": {
            "Id": "",
            "name": (mthis.workspaceTitle==='')?('默认标题'+timestamp):mthis.workspaceTitle,
            "des": (mthis.workspaceDes==='')?('暂无描述'):mthis.workspaceDes,
            "nodeIds": setIds,
            "modify_time": util.getNowFormatDate(),
            "modify_user": "XiaoRuohan",
            "create_time": util.getNowFormatDate(),
            "create_user": "XiaoRuohan",
            "type": "human"
          }
        }).then(response => {
          if (response.body.code === 0) {
            alert('新增成功！')
            mthis.$store.commit('setRefSet', !mthis.$store.state.refSet)
            this.showFlag = false
          } else {
            alert('新增失败！')
          }
        })
      },
      back() {
        this.showFlag = false;
        this.workspaceTitle = ''
        this.workspaceDes = ''
        this.searchWorkspaceTitle = ''
        this.options1 = []
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
        ]
      },
      addDataToTemp(item) {
        // // console.log(this.worksetData)
        var mthis = this
        let arr = []
        if (mthis.myMap.get(item.type) === 'entity') {
          if (!util.ifInArr(new Array(item), mthis.worksetData[0].data)) {
            mthis.worksetData[0].data.push(item)
          }
        } else if (mthis.myMap.get(item.type) === 'document') {
          if (!util.ifInArr(new Array(item), mthis.worksetData[1].data)) {
            mthis.worksetData[1].data.push(item)
          }
        } else if (mthis.myMap.get(item.type) === 'event') {
          if (!util.ifInArr(new Array(item), mthis.worksetData[2].data)) {
            mthis.worksetData[2].data.push(item)
          }
        } else {
          alert('选择节点类型异常，节点ID是' + item.id)
        }
        // // console.log('addDataToTemp')
        // // console.log(mthis.worksetData)
      },
      setOption(a) {
        var mthis = this;
        if (this.$store.state.tmss === 'net') {
          // if (this.timer) {
          //   clearTimeout(this.timer)
          // }
          // this.timer = setTimeout(function() {
          //   // 新增防抖功能
          let arr = []
          arr.push(a.id)
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            'nodeIds': arr
          }).then(response => {
            if (response.body.code === 0) {
              mthis.$store.commit('setSearchNetResult', {
                // id: response.body.data[0].nodes[0].id,
                // name: response.body.data[0].nodes[0].name,
                // nodes:response.body.data[0],
                data: response.body.data[0].nodes[0]
              })
            } else {
              alert('entity-detail接口异常')
            }
          })
          // }, 100);
        }
        if (this.$store.state.tmss === 'content') {
          mthis.$store.commit('setSearchContentResult', a.value)
          mthis.$store.commit('setConditionContent', a.value)
          var query = a.value;
          mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/doc-statistics/?query=" + a.value, {
              emulateJSON: true
            })
            .then(response => {
              mthis.$store.commit('setContentStatisticsResult', response.body)
            });
          /* mthis.inputInfoContent = a.value
          mthis.$store.commit('setSearchContentResult', [{
            node: {
              nodes: []
            },
            id: '',
            label: a.value
          }]) */
        }
        if (this.$store.state.tmss === 'geo') {
          if (a && a.value) {
            if (a.type === 'human') {
              mthis.$store.commit('setSearchGeoEventResult', {
                ids: [a.value]
              })
            } else if (a.type === 'location') {
              mthis.$store.commit('setHLlocationIds', [a.value])
            } else {
              mthis.$store.commit('setSearchGeoEntityResult', {
                ids: [a.value]
              })
            }
          }
        }
      },
      searchInfo(query) {
        var mthis = this;
        this.loading1 = true;
        if (mthis.searchWorkspaceTitle !== "") {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-match/?pattern=" + mthis.searchWorkspaceTitle, {
                emulateJSON: true
              })
              .then(response => {
                mthis.options1 = []
                // let optionWord = {}
                // let optionWordArr = []
                let optionList = {}
                let optionListArr = []
                // // console.log(response.body)
                // optionWordArr.push({"label":'文档搜索-\''+query+'\'',"value":'搜索:'+query,"img":'',"type":'content'})
                for (let i = 0; i < response.body.data.nodes.length; i++) {
                  // let name  = (response.body.data[0].nodes[i].chinese_name == '') ? response.body.data[0].nodes[i].name : response.body.data[0].nodes[i].chinese_name
                  optionListArr.push({
                    // "label": name,
                    "label": response.body.data.nodes[i].name,
                    "name": response.body.data.nodes[i].name,
                    "value": response.body.data.nodes[i].id,
                    "id": response.body.data.nodes[i].id,
                    "img": util.checkImgExists(response.body.data.nodes[i].img) ? (response.body.data.nodes[i].img) : ('http://10.60.1.140/assets/images/image.png'),
                    "type": response.body.data.nodes[i].type
                  })
                }
                // // console.log(optionListArr)
                mthis.options1 = optionListArr;
                // // console.log(mthis.options1)
              })
          }, 200);
        } else {
          mthis.options1 = [];
        }
        mthis.loading1 = false;
      },
      del(id) {
        this.$emit('delId', id)
      },
      modData(id) {
        // alert('modify');
        // this.$store.commit('setWorkSpaceModal', {
        //   "id":id,
        //   "flag":true
        // })
        this.modal1 = !this.modal1;
        this.loading = true;
        let oldimg = ''
        $('.touxiangImg').mouseover(function(item) {
          oldimg = item.target.src
          item.target.src = 'http://10.60.1.140/assets/images/geo/delete_HL.png'
        })
        $('.touxiangImg').mouseout(function(item) {
          item.target.src = oldimg
        })
        $('.touxiangImg').click(function(item) {
          //  this.data
          // // console.log(item.target.parentNode.id)
          // item.filter(function (obj) {
          //   return obj.id!==item.target.id
          // })
          alert('调用删除接口，调用id为' + item.target.parentNode.id)
          //  item.target.id
        })
      },
      cantClick() {
        alert(
          '不可用工作集，不可导入'
        )
      }
    },
    props: {
      worksetData: Array,
      type: String,
      flag: Number,
      worksetInfo:Object
    }
  }
</script>
<style scoped>
  .resli>p {
    height: 4vh;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .resli {
    height: 4vh;
    background-color: rgba(51, 255, 255, 0.5);
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    color: #ccffff;
    padding: 0 10px;
  }
  .resList {
    margin: 1vh auto;
  }
  .resList div:nth-child(even) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .resList div:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0);
  }
  .selectDic {
    line-height: 50px;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    padding-left: 40px;
    padding-top: 2px;
    padding-right: 10px;
    font-size: 18px;
    text-indent: 3rem;
    min-height: 40px;
  }
  /* .modalDiv {
                          min-height: 50vh;
                        } */
  
  .inputT {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 4vh;
    margin: 2vh auto 1vh auto;
    /* border-radius: 20px; */
  }
  .inputTbottom {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 4vh;
    color: #ccffff;
    /* border-radius: 20px; */
    border: none;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
  }
  .inputD {
    width: 90%;
  }
  .buttonOK {
    width: 6em;
    color: rgb(204,255,255,0.8) !important;
    background-color: rgba(51,255,255,0.5) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
    height: 25px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    line-height:25px;
  }
  .buttonOK:hover {
    color: #ccffff !important;
    background-color:rgba(51,255,255,0.7) !important;
  }
  .buttonCannle {
    width: 6em;
    color: rgba(204,255,255,0.5) !important;
    background-color: rgba(204,255,255,0.3) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
    height: 25px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    line-height:25px;
  }
  .buttonCannle:hover {
    color: rgba(204,255,255,0.8) !important;
    background-color: rgba(204,255,255,0.5) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
  }
  .mainModal {
    margin: 0 0px 45px 20px 20px;
  }
  .modalLeftDiv {
    float: left;
    display: flex;
    flex-flow: column nowrap;
    width: 25%;
    border-right: 1px solid rgba(51, 255, 255, 0.3);
    height: 70vh;
    background-image: linear-gradient(8deg, rgba(102, 255, 153, 0.3) -10%, rgba(102, 128, 204, 0.3) 65%, rgba(102, 0, 255, 0.3) 100%), linear-gradient(#000000, #000000);
    background-blend-mode: normal, normal;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin-bottom: 20px;
  }
  .modalLeftDiv_firstchild {
    margin-top: 20px;
  }
  .modalRightDiv {
    display: flex;
    min-height: 60vh;
    max-height: 60vh;
    overflow-x: auto;
    overflow-y: hidden;
    height: 60vh;
    flex-flow: column wrap;
    margin: 0 60px;
    padding: 2vh 0px 0 0px;
  }
  .lefttop {
    height: 25vh;
    overflow-x: auto;
    overflow-y: hidden;
    border-bottom: 1px solid rgba(51, 255, 255, 0.3);
  }
  .leftbottom {
    height: 44vh;
    overflow-x: auto;
    overflow-y: hidden;
    margin-top: 1vh;
  }
  .rightbottom {
    height: 10vh;
    float: right;
    margin-right: 90px;
    line-height: 10vh;
  }
  .rightdiv {
    padding: 20px;
    width: 100%;
  }
  .type-title {
    height: 40px;
    border-bottom: solid 1px #336666;
    display: flex;
    padding-bottom: 10px;
  }
  .type-title-p {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .type-title-d {
    width: 4px;
    height: 16px;
    background-color: #009999;
    margin: 6px 6px;
  }
  .type-content {
    padding-top: 10px;
  }
  .nametext {
    font-family: MicrosoftYaHei;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  /* .touxiangImg:hover img{
                    /* background-image:url('http://10.60.1.140/assets/images/organization.png');
                    background-image:url(../../dist/assets/images/circle.png);
                  }  */
  .top,
  .bottom {
    text-align: center;
  }
  .center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
  }
  .center-left {
    float: left;
  }
  .center-right {
    float: right;
  }
  .DVSL-bar-btndisHover {
    white-space: nowrap;
    color: #cff;
    float: left;
    padding: 0 7px;
    text-decoration: none;
    cursor: pointer;
    opacity: .6;
  }
  .cardButD {
    width: 30px;
    color: #ccffff;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .lineH20 {
    line-height: 20px;
  }
  .itemDivDisable {
    background-color: rgba(51, 255, 255, 0.2);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .itemDiv {
    background-color: rgba(51, 255, 255, 0.3);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .cardFront {
    font-size: 12px;
    line-height: 25px;
  }
  .titleFront {
    font-size: 14px;
    line-height: 30px;
    display: inline;
  }
  .padd8 {
    padding: 8px;
  }
  .color515 {
    color: rgba(51, 255, 255, 0.5);
  }
  .touxiangImg {
    background-color: #003333
  }
</style>
<style>
  #md>.ivu-modal-wrap>.ivu-modal>.ivu-modal-content>.ivu-modal-close {
    top: -3px !important;
    right: -4px !important;
  }
  #md>.ivu-modal-wrap>.ivu-modal>.ivu-modal-content {
    max-height: 70vh;
    height: 70vh;
  }
  .inputT>input {
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    border: none;
    box-shadow: none !important;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    border-radius: 20px;
    padding: 0 20px;
    text-overflow: ellipsis;
  }
  .inputTbottom>input {
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    border: none;
    box-shadow: none !important;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    border-radius: 20px;
  }
  .inputTitle>input {
    width: 90%;
  }
  .inputTitle {
    margin-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .inputD>textarea {
    border: none;
    box-shadow: none !important;
    resize: none;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    height: 16vh;
    max-height: 16vh;
    padding: 7px;
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 3vh;
    letter-spacing: 0px;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
  }
  .inputTbottom>.ivu-input-prefix>i {
    font-size: 20px !important;
    line-height: 4vh !important;
    color: rgba(204, 255, 255, 0.3);
  }
  .resli>p>i {
    opacity: 0.3;
  }
  .resli:hover>p>i {
    opacity: 0.6;
  }
  .delItemDiv{
    height: 60px;
    width: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    background-color: rgba(0,0,0,0.8);
  }
  .delItemDiv:hover{
    opacity: 1;
  }
</style>


