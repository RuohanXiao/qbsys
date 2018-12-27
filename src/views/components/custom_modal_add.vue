<template>
  <div>
    <Modal v-model="flag" width="80%" footer-hide @on-cancel="cancel">
      <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{margin:'0'}">
        <Col span="7" class="leftModal" type="flex" justify="space-between" align="middle" :style="{height:'80vh'}">
        <Row type="flex" justify="center" class="code-row-bg" align="middle" :style="{marginTop:'20px'}">
          <Col span="20">
          <div style="width:100%;height:40px">
            <!-- <modal-search-div /> -->
            <Input v-model="addTargetValue" id="addTargetInput" prefix="ios-search" placeholder="Enter name" style="width: 90%" @on-enter="setOption"/>
          </div>
          </Col>
        </Row>
        <Card :bordered="false" id ="addTargetOptionCard" v-if="isconp && recommendSearchItems.length > 0">
          <CellGroup @on-click="getElectedEntity">
                <Cell :title="cellOption.name" v-for="(cellOption , index) in recommendSearchItems" :name="cellOption.name + '_' + cellOption.id"  />
            </CellGroup>
        </Card>
        <div  v-if="gwTargetData.id !== undefined" style="text-align: left;">
          <Collapse v-model="vColl" id="vColl">
            <Panel name="1">实体
                <CellGroup slot="content" @on-click="setTargetData">
                  <Cell :title="gwTargetData.name" :label="'描述：' + gwTargetData.type" />
                </CellGroup>
            </Panel>
          </Collapse>
        </div>
        </Col>
        <Col span="17" align="middle" class="rightModal" :style="{height:'80vh'}">
        <div style="margin:20px;" v-if="targetData.id !== undefined">
          <div>
            <span class="modalTitle" v-if="ishasValue(targetData.name)">{{targetData.name}}</span>
            <img :src="targetData.image" v-if="ishasValue(targetData.image)">
            <Avatar class="circle-img" icon="ios-person" :style="{position: 'absolute',width:'50px',height:'50px',right:'50px'}" v-else/>
          </div>
          <div class='addTarget'>
            <entityDetailsTableHuman :Entitydetail="targetData" v-if="targetData.type =='human'" ></entityDetailsTableHuman>
            <entityDetailsTableAdministrative :Entitydetail="targetData" v-if="targetData.type =='administrative'"></entityDetailsTableAdministrative>
            <entityDetailsTableOrganization :Entitydetail="targetData" v-if="targetData.type =='organization'"></entityDetailsTableOrganization>
          </div>
        </div>
        <div>
            <Row type="flex" justify="start" class="code-row-bg" align="middle"  :style="{position:'absolute',paddingRight: '20px',bottom: '20px',right: '20px'}">
              <Col  id='addNetEntity' :style="{padding: '20px'}">
              <div class='buttonModal' @click="showNodeInNet" >
                <p class="buttonModalText">追加网络分析</p>
              </div>
              </Col>
              <Col  id='newNetEntity'>
              <div class='buttonModal' @click="showNodeInNewNet">
                <p class="buttonModalText">新建网络分析</p>
              </div>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import mock from "../../mock/index.js";
  import modalSearchDiv from "./custom_modal_searchdiv";
  import { mapState,mapMutations } from 'vuex'
  import entityDetailsTableHuman from './custom_entityDetailsTable_human'
  import entityDetailsTableAdministrative from './custom_entityDetailsTable_administrative'
  import entityDetailsTableOrganization from './custom_entityDetailsTable_organization'
  const axios = require('axios')
  const MockAdapter = require('axios-mock-adapter')
  mock.test = 1;
  export default {
    data() {
      return {
        vColl:1,
        loading1: false,
        options1: [],
        buttonDivHeight: 0,
        listHeight: 0,
        InfoHeight: 0,
        addTargetValue:'',
        isconp:true,
        recommendSearchItems:[],
        targetData:{},
        gwTargetData:{},
      }
    },
    props: ['flag', 'edata'],
    mounted() {
      this.listHeight = document.documentElement.clientHeight * 0.8 - 60 + "px";
      this.InfoHeight = document.documentElement.clientHeight * 0.8 - 120 + "px";
      this.buttonDivHeight = 30 + "px";
    },
    components: {
      modalSearchDiv,
      entityDetailsTableHuman,
      entityDetailsTableAdministrative,
      entityDetailsTableOrganization
    },
    watch:{
      addTargetValue:function(){
        if(this.isconp){
          this.setOption();
        }
        
      }
    },
    methods: {
      setTargetData(){
        var mthis = this;
        mthis.targetData = mthis.gwTargetData;
      },
      cancel(){
        var mthis = this;
        mthis.$emit('detailModalFlag', false)
      },
      ishasValue(pro){
            if(pro == '' || pro == undefined){
            return false;
            } else {
            return true;
            }
        },
      getElectedEntity(name){
        var mthis = this;
        var ar = name.split('_');
        var name = ar[0];
        var id = ar[1];
        mthis.addTargetValue = name;
        mthis.isconp = false;
        setTimeout(function(){
          mthis.isconp = true;
        },200);
        mthis.recommendSearchItems = [];
        mthis.getPostById(id);
        
      },

      getPostById(id){
        var mthis = this;
        mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
            'nodeIds': [id]
          }).then(response => {
            mthis.gwTargetData = response.body.data[0].nodes[0];
          })
      },
      setOption () {
        var mthis = this;
        let a = mthis.addTargetValue;
        if(a !== undefined && a!== null && a!==''){
          let response = mthis.$http.get("http://10.60.1.140:5001/fuzzy-matchs/?pattern=" + a, {
              emulateJSON: true
            })
            .then(response => {
              mthis.recommendSearchItems = response.body.data;
            })
        } 
      },
      showPersonInfo(id) {},
      showNodeInNet() {
       this.cancel();
        this.$store.commit('setAddNetNodes', {
                  node: {
                    nodes: [{
                      'id': this.targetData.id,
                      'type': this.targetData.type,
                      'name': this.targetData.name,
                      'img': this.targetData.img,
                      'loaded': true
                    }],
                    links:[]
                  },
                  id: this.targetData.id,
                  label:this.targetData.name,
                })
      },
      showNodeInNewNet() {
        this.cancel();
        this.$store.commit('setSearchNetResult', {
                  node: {
                    nodes: [{
                      'id': this.targetData.id,
                      'type': this.targetData.type,
                      'name': this.targetData.name,
                      'img': this.targetData.img,
                      'loaded': true
                    }],
                    links:[]
                  },
                  id: this.targetData.id,
                  label: this.targetData.name,
                })
      },
      queryPerson() {},
      searchInfo(query) {
        var mthis = this
        if (query !== '') {
          this.loading1 = true;
          axios.get('/getPersonInfo', {
              name: query
            })
            .then(function(response) {
              setTimeout(() => {
                mthis.options1 = response.data.data
                mthis.loading1 = false;
              }, 10);
            });
        } else {
          this.options1 = [];
        }
      }
    }
  }
</script>

<style scoped>
.addTarget
{
-moz-column-count:2; /* Firefox */
-webkit-column-count:2; /* Safari and Chrome */
column-count:2;
}
</style>


<style>
.ivu-cell-link{
    color: #ccffff !important;
}

.ivu-cell-link:active, .ivu-cell-link:hover {
    color: #ccffff !important;
}
#vColl>.ivu-collapse-item>.ivu-collapse-content>.ivu-collapse-content-box>.ivu-cell-group>.ivu-cell:hover{
  background-color:rgba(204,255,255,0.2) !important;
}
.ivu-card:hover{
  box-shadow: none !important;
}
#addTargetInput>.ivu-input{
  border-radius: 20px;
  background-color: rgba(51, 255, 255, 0.2);
  border: 1px solid rgba(51, 255, 255, 0.4) !important;
  color: #ccffff !important
}
#addTargetInput>.ivu-input:hover{
  border: 1px solid rgba(51, 255, 255, 0.4) !important;
}

#addTargetOptionCard>.ivu-card-body>.ivu-cell-group>.ivu-cell>.ivu-cell-link>.ivu-cell-item>.ivu-cell-main{
  float: left !important;
  color:rgb(204,255,255) !important;
}

#addTargetOptionCard>.ivu-card-body>.ivu-cell-group>.ivu-cell:hover{
  background: rgba(204,255,255,0.2) !important;
}
#addTargetOptionCard{
  background-color:rgba(0,0,0,0) !important;
}

  /* 滚动条样式 */
   ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
   ::-webkit-scrollbar-track,
   ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
  }
   ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-corner {
    background: transparent;
  }
  .modalImg{
    width: 72px;
    height: 72px;
    border: solid 4px rgba(204, 255, 255, 0.5);
    border-radius: 50%;
  }
  .modalHeader {
    height:20px;
    margin: 0 0 10px 10px;
  }
  .modalHeaderBread{
    float: left;
    margin-top: 10px;
  }
  .modalHeaderClose{
    float: right;
  }
  .closeImg{
    position: absolute;
    right: -3px;
    top: -1px;
    padding: 0 !important;
    z-index: 3;
  }
  .ivu-collapse {
    border-radius: 0 !important;
    border: none !important;
  }
  .ivu-collapse-content {
    background-color: rgba(51, 255, 255, 0.1) !important;
  }
  .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    padding-left: 5px !important;
  }
  .collapseHover {
    overflow: hidden;
  }
  .collapseHover:hover {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .vertical-center-modal {
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }
  /* 弹出框样式 */
  .ivu-modal-mask {
    /* background-color:rgba(0,0,0,0.6) !important; */
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  .ivu-modal-content {
    background-color: rgba(0, 0, 0, 0.7) !important;
    border-radius: 20px !important;
    box-shadow: 1px 1px 18px rgba(51, 255, 255, 0.5) !important;
    border: solid 1px rgba(51, 255, 255, 0.5) !important;
  }
  .ivu-modal-footer {
    border: none !important;
  }
  .ivu-modal-body {
    padding: 0 !important;
    border-radius: 20px !important;
  }
  .leftModal {
    background-image: linear-gradient( 8deg, rgba(102, 255, 153, 0.14) 0%, rgba(102, 128, 204, 0.14) 60%, rgba(102, 0, 255, 0.14) 100%), linear-gradient(#000000, #000000);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-right: solid 1px #336666;
    overflow: hidden;
  }
  .rightModal {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .p-collapse-title {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .modalTitle {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 80px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .modalContentLabel {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .modalContent {
    margin-left: 20px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  .modalContent1 {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  .modalContent2 {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  td {
    min-width: 40px;
  }
  .authName {
    height: 8vh;
  }
  .personCard {
    text-align: center;
    overflow-Y: hidden;
    cursor: pointer;
  }
  .ivu-modal-close {
    top: 3px !important;
    right: 3px !important;
    background-color: rgba(0, 0, 0, 0);
    color: #ccffff;
    z-index: 2;
  }
  .ivu-modal-close .ivu-icon-ios-close {
    color: rgba(0, 0, 0, 0);
  }
  .ivu-card-body {
    padding: 3px !important;
  }
  .buttonModal {
    background-color: rgba(51, 255, 255, 0.5);
    border-radius: 5px;
    height: 30px !important;
    width: 100% !important;
  }
  .buttonModal:hover {
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
    cursor: pointer;
    width: 100% !important;
    background-color: rgba(51, 255, 255, 0.8);
  }
  .buttonModalText {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px !important;
    letter-spacing: 0px;
    color: #ccffff !important;
  }
  .p-collapse-modal {
    font-size: 16px;
    line-height: 38px;
    height: 75px;
    color: #ccffff;
    font-family: "微软雅黑";
    background-color: rgba(51, 255, 255, 0.1);
    border: solid 1px #336666;
    margin-top: 5px;
    margin-right: -5px;
    padding: 0 10px;
  }
  .p-collapse-modal-small {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  #ele>.ivu-select-dropdown {
    left: 30px !important;
    width: 80%;
    min-width: 200px;
  }
  #ele .ivu-select-item-focus {
    background: rgba(51, 255, 255, 0.2) !important;
  }
  .ivu-breadcrumb > span > a {
    color: #ccffff !important;
  }
  .ivu-breadcrumb > span > .ivu-breadcrumb-item-link {
    color: #ccffff !important;
  }
</style>

