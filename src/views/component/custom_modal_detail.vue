<template>
  <div>
    <Modal v-model="a" width='80'  footer-hide>
      <div style="margin: 20px;">
        <div>
          <span class="modalTitle" v-if="ishasValue(Entitydetail.name)">{{Entitydetail.name}}</span>
          <img :src="Entitydetail.image" v-if="ishasValue(Entitydetail.image)">
          <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px',left:'80%'}" v-else/>
        </div>
        <div class='entity_detail'>
        <table id='entity_detailTable'>
          <!-- <tr v-if=" ishasValue(Entitydetail.birth_name)">
            <td class="modalContentLabel">全名</td>
             <td class="modalContentLabel">{{Entitydetail.birth_name}}</td>
          </tr> -->
          <tr v-if=" ishasValue(Entitydetail.name_in_native_language)">
            <td class="modalContentLabel">外文名</td>
            <td class="modalContent">{{Entitydetail.name_in_native_language}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.nickname)">
            <td class="modalContentLabel">昵称</td>
            <td class="modalContent">{{Entitydetail.nickname}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.date_of_birth)">
            <td class="modalContentLabel">出生日期</td>
            <td class="modalContent">{{Entitydetail.date_of_birth}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.date_of_death)">
            <td class="modalContentLabel">死亡日期</td>
            <td class="modalContent">{{Entitydetail.date_of_death}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.date_of_disappearance)">
            <td class="modalContentLabel">失踪</td>
            <td class="modalContent">{{Entitydetail.date_of_disappearance}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.place_of_birth)">
            <td class="modalContentLabel">出生地</td>
            <td class="modalContent">{{Entitydetail.place_of_birth}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.country_of_citizenship)">
            <td class="modalContentLabel">国籍</td>
            <td class="modalContent">{{Entitydetail.country_of_citizenship}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.occupation)">
            <td class="modalContentLabel">职业</td>
             <td class="modalContent">{{Entitydetail.occupation}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.military_rank)">
            <td class="modalContentLabel">军衔</td>
             <td class="modalContent">{{Entitydetail.military_rank}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.member_of_political_party)">
            <td class="modalContentLabel">政党</td>
             <td class="modalContent">{{Entitydetail.member_of_political_party}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.member_of)">
            <td class="modalContentLabel">组织</td>
             <td class="modalContent">{{Entitydetail.member_of}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.employer)">
            <td class="modalContentLabel">雇主</td>
             <td class="modalContent">{{Entitydetail.employer}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.award_received)">
            <td class="modalContentLabel">荣誉</td>
             <td class="modalContent">{{Entitydetail.award_received}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.educated_at)">
            <td class="modalContentLabel">就读学校</td>
             <td class="modalContent">{{Entitydetail.educated_at}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.academic_degree)">
            <td class="modalContentLabel">学历</td>
             <td class="modalContent">{{Entitydetail.academic_degree}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.position_held)">
            <td class="modalContentLabel">工作经历</td>
             <td class="modalContent">{{Entitydetail.position_held}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.father)">
            <td class="modalContentLabel">父亲</td>
             <td class="modalContent">{{Entitydetail.father}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.mother)">
            <td class="modalContentLabel">母亲</td>
            <td class="modalContent">{{Entitydetail.mother}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.spouse)">
            <td class="modalContentLabel">配偶</td>
            <td class="modalContent">{{Entitydetail.spouse}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.child)">
            <td class="modalContentLabel">子女</td>
             <td class="modalContent">{{Entitydetail.child}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.sibling)">
            <td class="modalContentLabel">兄弟姐妹</td>
             <td class="modalContent">{{Entitydetail.sibling}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.e_mail)">
            <td class="modalContentLabel">邮箱</td>
             <td class="modalContent">{{Entitydetail.e_mail}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.official_blog)">
            <td class="modalContentLabel">博客</td>
             <td class="modalContent">{{Entitydetail.official_blog}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.official_website)">
            <td class="modalContentLabel">网站</td>
             <td class="modalContent">{{Entitydetail.official_website}}</td>
          </tr>
          <tr v-if=" ishasValue(Entitydetail.summary)">
            <td class="modalContentLabel">简介</td>
             <td class="modalContent">{{Entitydetail.summary}}</td>
          </tr>
        </table>
        </div>
      </div>
      <div :style="{margin:'20px 0px',maxHeight:buttonDivHeight}">
        <Row type="flex" justify="start" class="code-row-bg" align="middle">
          <Col span="4" offset="16">
          <div class='buttonModal' @click="showNodeInNet">
            <p class="buttonModalText">追加网络分析</p>
          </div>
          </Col>
          <Col span="4">
          <div class='buttonModal' @click="showNodeInNewNet">
            <p class="buttonModalText">新建网络分析</p>
          </div>
          </Col>
        </Row>
      </div>
    </Modal>
  </div>
</template>
<script>
  import mock from "../../mock/index.js";
  import util_tools from "../../util/tools.js";
  const axios = require('axios')
  const MockAdapter = require('axios-mock-adapter')
  mock.test = 1;
  export default {
    data() {
      return {
        a:true,
        buttonDivHeight: 0, 
        listHeight: 0,
        InfoHeight: 0,
        Entitydetail:null,
      }
    },
    props: ['nodeId','flag'],
    mounted() {
      this.listHeight = document.documentElement.clientHeight * 0.8 - 60 + "px";
      this.InfoHeight = document.documentElement.clientHeight * 0.8 - 85 + "px";
      this.buttonDivHeight = 69 + "px";
    },
    created(){
      var nodeIds =[this.nodeId];
       
      this.$http.post('http://10.60.1.140:5001/node-datas/', {
          'nodeIds': nodeIds
        }).then(response => {
           
           this.Entitydetail = response.body.data[0].nodes[0]
        })
    },
    components: {},
    methods: {
      ishasValue(pro){
        if(pro == '' || pro == undefined){
          return false;
        } else {
          return true;
        }
      }
    } 
  }
</script>

<style scoped>
#entity_detailTable tr{
  border-bottom: 1px solid;
}
</style>


<style>
.entity_detail
{
-moz-column-count:3; /* Firefox */
-webkit-column-count:3; /* Safari and Chrome */
column-count:3;
}
  .ivu-collapse {
    border-radius: 0 !important;
    border: none !important;
  }
  .ivu-collapse-header {
    background-color: rgba(0, 0, 0, 0) !important;
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
    background-color: rgba(0, 0, 0, 0.7) !important;
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
  }
  .leftModal {
    background-image: linear-gradient( 8deg, rgba(102, 255, 153, 0.14) 0%, rgba(102, 128, 204, 0.14) 60%, rgba(102, 0, 255, 0.14) 100%), linear-gradient(#000000, #000000);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-right: solid 1px #336666;
    overflow: hidden;
  }
  .rightModal {
    /*
    
        border-top-right-radius: 25px;
    
        border-bottom-right-radius: 25px;
    
        */
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
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 80px;
    letter-spacing: 0px;
    color: #ccffff;
    width:100px;
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
  /* .personCard:hover{
    
          transition:All 0.4s ease-in-out;
    
          -webkit-transition:All 0.4s ease-in-out;
    
          -moz-transition:All 0.4s ease-in-out;
    
          -o-transition:All 0.4s ease-in-out;
    
          transform:translateX(-2px);
    
          -webkit-transform:translateX(-2px);
    
          -moz-transform:translateX(-2px);
    
          -o-transform:translateX(-2px);
    
          -ms-transform:translateX(-2px);
    
          box-shadow: 2px 2px 2px rgba(51, 255, 255, 0.5);
    
          cursor: pointer;
    
        } */
  .ivu-modal-close {
    top: 3px !important;
    right: 3px !important;
    background-color: rgba(0, 0, 0, 0);
    color: #ccffff;
    z-index: 2;
  }
  /* .closeBackground {
    top: -1px;
    right: -1px;
    position: absolute;
    border-left: 62px solid #000000;
    border-top: 62px solid #339999;
    background: #339999;
  } */
  .ivu-modal-close .ivu-icon-ios-close {
    color: rgba(0, 0, 0, 0);
  }
  .ivu-card-body {
    padding-bottom: 0 !important;
  }
  .buttonModal {
    background-color: rgba(51, 255, 255, 0.5);
    border-radius: 5px;
    height: 100%;
    width: 80%;
  }
  .buttonModal:hover {
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
    cursor: pointer;
    border-radius: 5px;
    height: 100%;
    width: 100%;
    background-color: rgba(51, 255, 255, 0.4);
  }
  .buttonModalText {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff !important;
    text-align: center;
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
</style>

