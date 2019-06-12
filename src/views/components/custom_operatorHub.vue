<style>
.closeHub{
    position: absolute;
    z-index: 1000;
    /* width: 220px;
    overflow-y: scroll; */
}
.openHub{
  position: absolute;
  z-index: 1000;
  width: 270px;
  overflow-y: scroll;
}
.openHub .pick{
  background-image: url('../../dist/assets/images/close_before.png');
  margin-left:240px;
  /* -webkit-animation: openHubpick 1s infinite; 
    animation: openHubpick 1s infinite; */
    transition:margin-left 1s;
  -moz-transition:margin-left 1s; /* Firefox 4 */
  -webkit-transition:margin-left 1s; /* Safari and Chrome */
  -o-transition:margin-left 1s; /* Opera */
    
}
.openHub .pick:hover{
  background-image: url('../../dist/assets/images/close_after.png');
  margin-left:240px;
  /* -webkit-animation: openHubpick 1s infinite; 
    animation: openHubpick 1s infinite; */
    transition:margin-left 0.5s;
  -moz-transition:margin-left 0.5s; /* Firefox 4 */
  -webkit-transition:margin-left 0.5s; /* Safari and Chrome */
  -o-transition:margin-left 0.5s; /* Opera */
}
.closeHub .pick{
  background-image: url('../../dist/assets/images/open_before.png');
  transition:margin-left 0.5s;
  -moz-transition:margin-left 0.5s; /* Firefox 4 */
  -webkit-transition:margin-left 0.5s; /* Safari and Chrome */
  -o-transition:margin-left 0.5s; /* Opera */
}
.closeHub .pick:hover{
  background-image: url('../../dist/assets/images/open_after.png');
  transition:margin-left 0.5s;
  -moz-transition:margin-left 0.5s; /* Firefox 4 */
  -webkit-transition:margin-left 0.5s; /* Safari and Chrome */
  -o-transition:margin-left 0.5s; /* Opera */
}
/* Chrome, Safari, Opera */
@-webkit-keyframes openHubpick {
    100% {margin-left: 240px;}
}

/* Standard syntax */
@keyframes openHubpick {
    100% {margin-left: 240px;}
}
 .Hubimg{
  width:20px;
  height:20px;
}
.operatorItem{

}

#operatorHub .ivu-drawer-left{
  background-color: rgba(0,0,0,0.9) !important;
  border-right: solid 1px #366 !important;
  height: calc(100% - 2px);
}
#operatorHub .ivu-cell-main{
  width:100%;
}

 #operatorHub .ivu-drawer-body{
  padding:0px !important;
}
 #operatorHub .ivu-drawer-content{
   background-color: rgba(0,0,0,0.8);
   color:#ccffff!important;
 }

#operatorHub .ivu-drawer-header{
  border-bottom: solid 1px #366;
  padding: 7px 16px !important;
  background-color: rgba(51,255,255,0.1);
}
#operatorHub .ivu-cell-disabled, .ivu-cell-disabled:hover{
  color:rgba(51,255,255,0.2);
  background-color: transparent !important
}
#operatorHub .ivu-cell-link{
    color: rgba(51,255,255,0.4) !important;
}
#operatorHub .ivu-cell-disabled .ivu-cell-link {
    color: rgba(51,255,255,0.2) !important;
}
#operatorHub.ivu-cell-focus, .ivu-cell:hover{
  background-color: rgba(51, 255, 255, 0.2) !important;
}
#operatorHub .ivu-cell:hover .ivu-cell-link{
  color: rgba(51, 255, 255, 1) !important;
}
#operatorHub .ivu-cell-disabled:hover .ivu-cell-link{
  color: rgba(51, 255, 255, 0.2) !important;
}
.header{
  font-family: MicrosoftYaHei;
	font-size: 14px;
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
	color: #ccffff;
  text-align: center;
}
.hubName{
  height:20px !important;
}
.operHeaderName{
  display: inline;
  height:20px
}
.cancelImg{
  position: absolute;
  right: 0px;
}
.operHeaderName img{
  opacity: 0.4;
}
.operHeaderName img:hover{
  opacity: 0.8;
}
</style>

<template>
  <div :class="pickdown?'openHub':'closeHub'" id='operatorHub'>
    <div class='Hubimg pick' @click="clickHub"></div>  <!-- pickdown = !pickdown -->
    <Drawer class="drawer" placement="left" width="240" :mask="false"   :closable="false" v-model="pickdown" :inner="true" :transfer="false">
      <div slot='header' class="header">
        <Row class="hubName" v-if='header.isHub' type="flex" justify="center" align="middle">
              <Col span="24">{{header.title}}</Col>
        </Row>
        <Row v-else class="operHeaderName" type="flex" justify="center" align="middle">
              <Col span="24">
                <span>{{header.operatorName}}</span>
                <img class='cancelImg' :src="require('../../dist/assets/images/back.png')" @click="cancelOperator" />
              </Col>
              <!-- <Col span="9"><img :src="require('../../dist/assets/images/back.png')" @click="cancelOperator" /></Col> -->
        </Row>
      </div>
      <CellGroup @on-click="selectOperator" v-if='header.isHub'>
          <Cell :name="config.id" v-for="config in operatorConfig" class="operatorItem" :disabled="config.disabled===undefined||config.disabled===false?false:true">
            <Row>
              <Col span="2"></Col>
              <Col span="3"><Icon :class="'icon iconfont '+config.iconName"/></Col>
              <Col span="19">{{config.name}}</Col>
            </Row>
          </Cell>
      </CellGroup>
      <operator :operator='operatorParams' v-if="!header.isHub"></operator>
    </Drawer>
  </div>
</template>
<script>
import operator from "./custom_operator.vue"
    export default {
        data () {
            return {
                pickdown: false,
                header:{
                  title:'算子库',
                  isHub:true,
                  operatorName:'',
                  closeFunction:''
                },
                operatorParams:[],
                
            }
        },
        props:['operatorConfig'],
        methods:{
          clickHub(){
            var mthis = this;
            mthis.pickdown = !mthis.pickdown;
            mthis.$emit('isOpen',mthis.pickdown)
          },
          selectOperator(name){
            var mthis = this;
            debugger
            var params = [];
            var operName = '';
            var openFunction = '';
            var closeFunction = '';
            for(let i = 0; i < mthis.operatorConfig.length; i++){
              let config = mthis.operatorConfig[i];
              if(name ===  config.id){
                params = config.operatorSurface;
                operName = config.name;
                openFunction = config.openFunction;
                closeFunction = config.closeFunction;
                if(config.disabled === true){
                  return
                }
                break;
              }
            }
            if(openFunction !== undefined){
              mthis.$store.dispatch(openFunction);
            }
            if(closeFunction !== undefined){
              mthis.header.closeFunction = closeFunction
            }
            
            mthis.operatorParams = params;
            mthis.header.isHub = false;
            mthis.header.operatorName = operName;
          },
          cancelOperator(){
            var mthis = this;
            var closeFunction = mthis.header.closeFunction;
            if(closeFunction !== ''){
              mthis.$store.dispatch(closeFunction);
            }
            mthis.header.closeFunction = '';
            mthis.header.isHub = true;
            mthis.header.operatorName = '';
            mthis.operatorParams = [];
          }
        },
        components: {
          operator
        }
    }
</script>