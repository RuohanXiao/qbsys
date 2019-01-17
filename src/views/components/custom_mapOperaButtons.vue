<template>
    <div class='divStyle'>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='location_button' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-location1  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">定位</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='heatMap_button' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-hot  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">热力</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='route_button' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-route  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">路径</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='rectangle_select' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-selection-box  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">框选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='Circle_select' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-selection-round  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">圆形框选</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='Polygon_select' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-custom DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">自定义框选</p>
          </div>
        </Tooltip>
        <div class="divSplitLine"></div>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='delete_opera' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-delete-point  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">删除</p>
          </div>
        </Tooltip>
        <Tooltip placement="bottom" content="（Ctrl+A）" :delay="1000">
          <div id='invertSelection_opera' class="button-div" @click="divClick">
            <Icon class="icon iconfont icon-fanxuan  DVSL-bar-btn-new DVSL-bar-btn-back" size="26"></Icon>
            <p class="img-content">反选</p>
          </div>
        </Tooltip>
    </div>
</template>

<style>
.button-div{
    cursor: pointer;
    color: rgba(51, 255, 255,0.6) !important;
    align-items: center;
    text-align: center;
    min-width: 60px;
    padding: 4px 0;
  }
  .button-div:hover, .button-div:hover>i, .button-div:hover>.img-content{
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
    methods:{
        divClick(obj){
            var mthis = this;
            var operationObj = obj;
             mthis.$emit('mapOperation', operationObj)
        }
    }
}
</script>


