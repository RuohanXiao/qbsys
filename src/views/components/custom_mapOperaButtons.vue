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
.divStyle p{
  font-size:12px;
  font-family: inherit;
}
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
        buttonParamArr:[//AT(AllTime)：永远点亮； HD(HaveData):有(组织机构和事件)数据时点亮； HSD(HavaSelectedData):当有数据被选中时点亮； HDD(HaveDeleteData):当有被删除的数据时被点亮； 
                        // HL(HaveLocation):当有高亮的行政区时被点亮； NT(NoTime):永远不被点亮  HCD(HaveClearData):当有数据（包括地图上高亮的面数据）时被点亮
                        //HSE(HaveSelectedEvent):当有事件数据被选择时点亮；HASD(HaveAnySelectedData):当有任何数据时（组织机构、事件以及区域）点亮
                        //OT(OpenThematic):打开专题图之后
          /* {
            'id':'location_AT',
            'name':'定位',
            'imgClass':'icon-location',
            'isOpen':true
          }, */
          {
            'id':'clearAll_HCD',
            'name':'清空',
            'imgClass':'icon-qingchu',
            'isOpen':false
          },
          {
            'id':'rectangle_HD',
            'name':'框选',
            'imgClass':'icon-selection-box',
            'isOpen':false
          },
          {
            'id':'selectAll_HD',
            'name':'全选',
            'imgClass':'icon-rectangle',
            'isOpen':false
          },
          {
            'id':'invertSelection_HSD',
            'name':'反选',
            'imgClass':'icon-fanxuan',
            'isOpen':false
          }, 
          {
            'id':'delete_HSD',
            'name':'删除',
            'imgClass':'icon-delete-point',
            'isOpen':false
          },
          {
            'id':'returnToAllPoints_HDD',
            'name':'复位',
            'imgClass':'icon-fuwei',
            'isOpen':false
          },
          {
            'id':'createWorkSpace_HASD',
            'name':'创建集合',
            'imgClass':'icon-add',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'RectangleExplore_AT',
            'name':'矩形探索',
            'imgClass':'icon-tansuo',
            'isOpen':true
          },
          {
            'id':'CircleExplore_AT',
            'name':'圆形探索',
            'imgClass':'icon-tansuo2',
            'isOpen':true
          },
          {
            'id':'customExplore_AT',
            'name':'自定义探索',
            'imgClass':'icon-tansuo1',
            'isOpen':true
          },
          {
            'id':'exploreLocationName_HL',
            'name':'探索',
            'imgClass':'icon-match-search',
            'isOpen':false

          },
          {'id':'separate'},
          /* {
            'id':'heatMap_HSD',
            'name':'显示热力',
            'imgClass':'icon-hot',
            'isOpen':false
          }, */
          {
            'id':'route_HSD',
            'name':'显示轨迹',
            'imgClass':'icon-route',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'toNet_HSD',
            'name':'推送网络',
            'imgClass':'icon-tuisongzhiwangluo',
            'isOpen':false
          },
          {'id':'separate'},
          {
            'id':'leadingInThematic_AT',
            'name':'导入图',
            'imgClass':'icon-daoru',
            'isOpen':true
          },
          {
            'id':'closeThematic_OT',
            'name':'关闭图',
            'imgClass':'icon-daochu',
            'isOpen':false
          },
          {
            'id':'screenCapture_NT',
            'name':'截屏',
            'imgClass':'icon-cut',
            'isOpen':false
          },
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
            if(item.id_suf === Iitem.id.split('_')[1]){
              Iitem.isOpen = item.isOpen;
            }
          })
        })
      }
    }
}
</script>


