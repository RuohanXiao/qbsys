<template>
    <div class='divStyle'>
      <Tooltip placement="bottom" content="（Ctrl+A）" :disabled='!buttonParam.isOpen' :delay="1000" v-for="buttonParam in buttonParamArr" v-if="buttonParam.id != 'separate'">
        <div :id='buttonParam.id' :class="buttonParam.isOpen?'button-div':'button-none'" @click="divClick">
          <Icon class="icon iconfont" :class="buttonParam.isOpen?buttonParam.imgClass+' DVSL-bar-btn-new DVSL-bar-btn-back':buttonParam.imgClass" size="26"></Icon>
          <p>{{buttonParam.name}}</p>
        </div>
      </Tooltip>
      <div class="divSplitLine" v-else></div>
    </div>
</template>

<style>
.button-none{
  cursor:default;
  color: rgba(51, 255, 255, 0.2) !important;
  align-items: center;
  text-align: center;
  min-width: 60px;
  padding: 4px 0;
}
.button-div{
    cursor: pointer;
    color: rgba(51, 255, 255,0.6) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }
  .button-div:hover, .button-div:hover>i, .button-div:hover>p{
    cursor: pointer;
    color: rgba(51, 255, 255,1) !important;
  }
  .button-div-click{ 
    cursor: pointer;
    color: rgba(51, 255, 255,1) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }
  .button-div-click>i{
    cursor: pointer;
    color: rgba(51, 255, 255,1) !important;
  }
  
</style>

<script>
export default {
    name:'mapOperaButtons',
    data() {
      return {
        buttonParamArr:[
          {
            'id':'location_button',
            'name':'定位',
            'imgClass':'icon-location1',
            'isOpen':true
          },
          {
            'id':'heatMap_button',
            'name':'热力',
            'imgClass':'icon-hot',
            'isOpen':false
          },
          {
            'id':'route_button',
            'name':'路径',
            'imgClass':'icon-route',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'rectangle_select',
            'name':'框选',
            'imgClass':'icon-selection-box',
            'isOpen':false
          },
          {
            'id':'Circle_select',
            'name':'圆形框选',
            'imgClass':'icon-selection-round',
            'isOpen':false
          },
          {
            'id':'Polygon_select',
            'name':'自定义框选',
            'imgClass':'icon-custom',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'delete_opera',
            'name':'删除',
            'imgClass':'icon-delete-point',
            'isOpen':false
          },
          {
            'id':'invertSelection_opera',
            'name':'反选',
            'imgClass':'icon-fanxuan',
            'isOpen':false
          },
          {
            'id':'selectAll_opera',
            'name':'全选',
            'imgClass':'icon-rectangle',
            'isOpen':false
          },
          {
            'id':'returnToAllPoints_opera',
            'name':'复位',
            'imgClass':'icon-refresh',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'toNet_push',
            'name':'网络',
            'imgClass':'icon-tuisongzhiwangluo',
            'isOpen':false
          }
        ]
      }
    },
    props:{changeButton:Array},
    methods:{
        divClick(obj){
            var mthis = this;
            var operationObj = obj;
            if(operationObj.currentTarget.className === 'button-none'){
              return
            } else {
              mthis.$emit('mapOperation', operationObj)
            }
             
        }
    },
    watch:{
      changeButton:function(){
        var mthis = this;
        mthis.changeButton.forEach(function(item){
          mthis.buttonParamArr.forEach(function(Iitem){
            if(item.id === Iitem.id){
              Iitem.isOpen = item.isOpen;
            }
          })
        })
      }
    }
}
</script>


