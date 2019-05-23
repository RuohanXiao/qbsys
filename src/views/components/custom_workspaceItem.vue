<template>
  <div>
    <Row type="flex" justify="center" class="itemDiv">
      <Col :sm="18" align="start" :style="{paddingLeft:'15px'}">
      <div class="cardDiv">
        <div :style="{display: 'flex'}">
          <span class='titleFront'>{{item.name}}</span>
          <Icon v-if="item.type === 'human'" class="icon iconfont icon-ren padd8 color515" size="20" />
          <Icon v-if="item.type === 'organization'" class="icon iconfont icon-zuzhi padd8 color515" size="20" />
          <Icon v-if="item.type === 'weapon'" class="icon iconfont icon-shouqiang padd8 color515" size="20" />
          <Icon v-if="item.type === 'administrative'" class="icon iconfont icon-diqu padd8 color515" size="20" />
          <Icon v-if="item.type === 'event'" class="icon iconfont icon-shijian padd8 color515" size="20" />
          <Icon v-if="item.type === 'document'" class="icon iconfont icon-wendang padd8 color515" size="20" />
          <Icon v-if="item.type === 'mix'" class="icon iconfont icon-star1 padd8 color515" size="20" />
        </div>
        <div class="lineheight25">
          <span class='cardFront'>描述:&nbsp;{{item.des}}</span>
        </div>
        <div class="lineheight25">
          <span class='cardFront'>创建时间:&nbsp;{{item.create_time}}</span> &nbsp;&nbsp;&nbsp;
          <span class='cardFront'>创建人:&nbsp;{{item.create_user}}</span>
        </div>
        <div class="lineheight25">
          <span class='cardFront'>修改时间:&nbsp;{{item.modify_time}}</span> &nbsp;&nbsp;&nbsp;
          <span class='cardFront'>修改人:&nbsp;{{item.modify_user}}</span>
        </div>
        <div class="lineheight25">
          <span class='cardFront'>数量:&nbsp;({{item.nodeIds.length}})</span>
        </div>
      </div>
      </Col>
      <Col :sm="6" align="right" :style="{flexDirection: 'column'}">
      <div class="cardButD">
        <div class="cd">
          <Icon class="icon iconfont icon-tianjia DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="importData(item.nodeIds)" />
          <Icon class="icon iconfont icon-edit DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="openModifyGroupModal(item.id)" />
          <Icon class="icon iconfont icon-shanchu DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="del(item.id)" />
        </div>
      </div>
      </Col>
    </Row>
    <!--
      <Row type="flex" justify="center" v-else class="itemDivDisable">
        <Col :sm="18" align="start" :style="{paddingLeft:'15px'}">
        <div class="cardDiv">
          <div :style="{display: 'flex'}">
            <span class='titleFront'>{{item.title}}</span>
            <Icon v-if="item.groupType === 'human'" class="icon iconfont icon-ren padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'organization'" class="icon iconfont icon-zuzhi padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'weapon'" class="icon iconfont icon-shouqiang padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'administrative'" class="icon iconfont icon-diqu padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'event'" class="icon iconfont icon-shijian padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'document'" class="icon iconfont icon-wendang padd8 color515" size="14" />
            <Icon v-if="item.groupType === 'mix'" class="icon iconfont icon-star1 padd8 color515" size="14" />
          </div>
          <div class="lineheight25">
            <span class='cardFront'>描述:{{item.disc}}</span>
          </div>
          <div class="lineheight25">
            <span class='cardFront'>{{item.time}}</span> &nbsp;&nbsp;&nbsp;
            <span class='cardFront'>数量:{{item.num}}</span>
          </div>
        </div>
        </Col>
        <Col :sm="6" align="right" :style="{flexDirection: 'column'}">
        <div class="cardButD">
          <div class="cd">
            <Icon class="icon iconfont icon-tianjia DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()" />
            <Icon class="icon iconfont icon-edit DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()" />
            <Icon class="icon iconfont icon-shanchu DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()" />
          </div>
        </div>
        </Col>
      </Row>
      -->
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import util from '../../util/tools.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  mock.test = 1
  export default {
    data() {
      return {
        loading: false,
        modal1: false,
        searchWorkspaceTitle: '',
        clearFlag: false,
        options1: [],
        loading1: false,
        timer: null,
        inputInfo: "",
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
    },
    methods: {
      openModifyGroupModal(setId) {
        // // console.log(setId)
        this.$store.commit('setOpenWorkSetFlag',{
          id:setId,
          type:'modify',
          time:new Date().getTime()
        })
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
              // alert('entity-detail接口异常')
               if (mthis.$store.state.tmss === 'net') {
            mthis.$store.commit('setNetPromte', 'entity-detail接口异常')
          } else if (mthis.$store.state.tmss === 'geo') {
            mthis.$store.commit('setGeoPromte', 'entity-detail接口异常')
          } else if (mthis.$store.state.tmss === 'content') {
            mthis.$store.commit('setContentPromte', 'entity-detail接口异常')
          } else {
          }
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
                    "value": response.body.data.nodes[i].id,
                    "id": response.body.data.nodes[i].id,
                    "img": util.checkImgExists(response.body.data.nodes[i].img) ? (response.body.data.nodes[i].img) : ('http://10.60.1.140/assets/images/image1.png'),
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
        var mthis = this
        // this.$emit('delId', id)
        // alert(id)
        let timestamp = new Date().getTime()
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/delete-set-data/', {
          "timestamp": timestamp,
          "idlist": new Array(id),
          "label": "set",
          "type": "set"
        }).then(response => {
          // // console.log(response)
          if (response.body.code === 0) {
            // alert('删除成功！')
             if (mthis.$store.state.tmss === 'net') {
            mthis.$store.commit('setNetPromte', '删除成功！')
          } else if (mthis.$store.state.tmss === 'geo') {
            mthis.$store.commit('setGeoPromte', '删除成功！')
          } else if (mthis.$store.state.tmss === 'content') {
            mthis.$store.commit('setContentPromte', '删除成功！')
          } else {
          }
            // mthis.$emit('ref', timestamp)
            mthis.$store.commit('setRefSet', !mthis.$store.state.refSet)
          } else {
            alert('删除异常，请查询控制台，错误编码' + response.body.code)
             if (mthis.$store.state.tmss === 'net') {
            mthis.$store.commit('setNetPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
          } else if (mthis.$store.state.tmss === 'geo') {
            mthis.$store.commit('setGeoPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
          } else if (mthis.$store.state.tmss === 'content') {
            mthis.$store.commit('setContentPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
          } else {
          }
          }
        })
      },
      modData(id) {
        // // console.log('modify');
        // // console.log(id);
        this.$store.commit('setWorkSpaceModal', {
          "id":id,
          "flag":true
        })
      },
      importData(datas) {
        var mthis = this;
        this.$emit('workSpaceModal', true)
        var tmss = mthis.$store.state.tmss;
        if(tmss === 'net'){
          /* var noAreaIds = [];
          for(let i = 0; i < datas.length; i++){
            var data = datas[i];
            var type = data.type;
            if(type === 'entity' || type === 'event' || type === 'document'){
              let ids = data.ids;
              for(let j = 0; j < ids.length; j++){
                let id = ids[j];
                noAreaIds.push(id);
              }
            }
          } */
          var dataobj = {};
          for(let i = 0; i < datas.length; i++){
            var data = datas[i];
            var type = data.type;
            if(type === 'entity' || type === 'event' || type === 'document'){
              let ids = data.ids;
              dataobj[type] = ids;
            }
            
          }
          this.$store.commit('setWorkSpaceAddData', dataobj)
        } else if(tmss === 'geo'){
          var noAreaIds = [];
          var areaIds = [];
          for(let i = 0; i < datas.length; i++){
            var data = datas[i];
            var type = data.type;
            if(type === 'entity' || type === 'event'){
              let ids = data.ids;
              for(let j = 0; j < ids.length; j++){
                let id = ids[j];
                noAreaIds.push(id);
              }
            }
            if(type === 'area'){
              let ids = data.ids;
              for(let j = 0; j < ids.length; j++){
                let id = ids[j];
                areaIds.push(id);
              }
            }
          }
          if(areaIds.length > 0){
            mthis.$store.commit('setGeoWorkSetData_area',areaIds);
          }
          if(noAreaIds.length > 0){
            mthis.$store.commit('setGeoNoAreaDataGoInMap',noAreaIds);
          }
          
        }
        
      },
      addToChart(id) {
        var mthis = this
        // mock.get("/getWorkSpaceAddData").then(function(res) {
        mthis.$store.commit('setWorkSpaceAddData', id)
        // })
      },
      cantClick() {
        alert(
          '不可用工作集，不可导入'
        )
      }
    },
    props: {
      item: Object
    }
  }
</script>
<style scoped>
  .cd {
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: space-around;
  }
  .resli {
    height: 24px;
    background-color: rgba(51, 255, 255, 0.5);
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 24px;
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
    background-color: rgba(51, 255, 255, 0.2);
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
  .inputTitle {
    justify-content: center;
    display: flex;
  }
  .inputT {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 5vh;
    margin: 1vh auto;
    color: #ccffff;
    /* border-radius: 20px; */
    border: none;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .inputTbottom {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 5vh;
    color: #ccffff;
    /* border-radius: 20px; */
    border: none;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
  }
  .inputD {
    resize: none;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    /* padding-top: 2px;
          padding-right: 10px; */
    height: 16vh;
    max-height: 16vh;
    padding: 7px;
    margin: 1vh auto;
    color: #ccffff;
    background-color: rgba(51, 255, 255, 0.2);
    width: 90%;
    color: #ccffff;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    border: none;
    border-radius: 20px;
  }
  .buttonOK {
    width: 10em;
    color: #025455 !important;
    background-color: rgba(51, 255, 255, 0.8) !important;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 16px;
  }
  .buttonOK:hover {
    width: 10em;
    color: rgba(51, 255, 255, 0.8) !important;
    background-color: #025455 !important;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
  }
  .buttonCannle {
    width: 10em;
    color: #025455 !important;
    background-color: #E5FFFF !important;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 16px;
  }
  .buttonCannle:hover {
    width: 10em;
    color: #E5FFFF !important;
    background-color: #025455 !important;
    height: 30px;
    border-radius: 5px;
    margin: 0 10px;
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
    min-height: 66vh;
    max-height: 66vh;
    overflow-x: auto;
    overflow-y: hidden;
    height: 66vh;
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
    height: 4vh;
    float: right;
    margin-right: 90px;
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
                /* background-image:url('http://10.60.1.140/assets/images/Organization.png');
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
    background-color: rgba(51, 255, 255, 0.1);
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
  .itemDiv:hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .cardFront {
    font-size: 12px;
    line-height: 25px;
  }
  .titleFront {
    font-size: 14px;
    line-height: 36px;
    display: inline;
  }
  .padd8 {
    padding: 8px;
  }
  .color515 {
    color: rgba(51, 255, 255, 0.5);
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
  }
  .inputTbottom>input {
    color: #ccffff;
    background-color: rgba(51, 255, 255, 0.2);
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    border: none;
    height: 4vh;
    border-radius: 20px;
  }
  .inputTitle>input {
    width: 90%;
  }
  .lineheight25 {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
</style>


