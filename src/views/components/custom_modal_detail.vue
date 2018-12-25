<template>
    <Modal v-model="flag" width='80' @on-cancel="cancel" footer-hide>
      <el-tabs  v-model="editableTabsValue" type="card" closable @tab-remove="removeTab">
        <el-tab-pane v-for="(Entitydetail, index) in editableTabs" :key="index+1" :label="Entitydetail.name" :name="index+1">
          <entityDetailTable :Entitydetail="Entitydetail"></entityDetailTable>
        </el-tab-pane>
      </el-tabs>
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
</template>
<script>
  import mock from "../../mock/index.js";
  import util_tools from "../../util/tools.js";
  import 'element-ui/lib/theme-chalk/tabs.css'
  import entityDetailTable from './custom_entitydetailTable'
  const axios = require('axios')
  const MockAdapter = require('axios-mock-adapter')
  mock.test = 1;
  export default {
    data() {
      return {
        aflag:false,
        buttonDivHeight: 0, 
        listHeight: 0,
        InfoHeight: 0,
        /* Entitydetail:{
          name:''
        }, */
        editableTabs:[],
        editableTabsValue:1
      }
    },
    props: ['nodeId','flag'],
    mounted() {
      this.listHeight = document.documentElement.clientHeight * 0.8 - 60 + "px";
      this.InfoHeight = document.documentElement.clientHeight * 0.8 - 85 + "px";
      this.buttonDivHeight = 69 + "px";
    },
    watch:{
      nodeId:function(){
        var nodeIds =[this.nodeId];
      this.$http.post('http://10.60.1.140:5001/node-datas/', {
          'nodeIds': nodeIds
        }).then(response => {
           //this.Entitydetail = response.body.data[0].nodes[0]
           this.editableTabs.push(response.body.data[0].nodes[0]);
        })
      } 
    },
    created(){
      
    },
    components: {entityDetailTable},
    methods: {
      removeTab(targetName) {
       /*  let tabs = this.editableTabs;
        let activeName = this.editableTabsValue;
        if (activeName === targetName) {
          tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
              let nextTab = tabs[index + 1] || tabs[index - 1];
              if (nextTab) {
                activeName = nextTab.name;
              }
            }
          });
        }
        
        this.editableTabsValue = activeName;
        this.editableTabs = tabs.filter(tab => tab.name !== targetName); */
        alert(123);
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
       showNodeInNet() {
        alert('追加网络分析')
        
      },
      showNodeInNewNet() {
        alert('新建网络分析')
      }
    } 
  }
</script>

<style>
.el-tabs--card>.el-tabs__header .el-tabs__item.is-active{
  border-bottom: none !important;
}
.el-tabs__item{
  color:#ccffff !important;
}
.el-tabs--card > .el-tabs__header {
    border-bottom:none !important;
}
.el-tabs--card > .el-tabs__header .el-tabs__nav{
  border: none !important;
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

