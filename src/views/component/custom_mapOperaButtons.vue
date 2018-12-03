<template>
    <div class='operationButtonDiv'>
        <div id='location_button' class="location_Noclick"  @click='divClick' ></div>
        <div id='heatMap_button'  class="heatMap_Noclick" @click='divClick'></div>
        <div id='route_button'  class="route_Noclick" @click='divClick'></div>
        <div class='separateDiv'></div>
        <div id='rectangle_select' value='rectangle'  class="rectangle_Noclick" @click='divClick' ></div>
        <div id='Circle_select' value='Circle' class="Circle_Noclick" @click='divClick'></div>
        <div id='Polygon_select' value='Polygon' class="Polygon_Noclick" @click='divClick'></div>
        <div class='separateDiv'></div>
        <div id='delete_opera' class='delete_Noclick' @click='divClick'></div>
        <div id='invertSelection_opera' class='invertSelection_Noclick' @click='divClick'></div>
    </div>
</template>

<style>
.delete_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 1;
}
.delete_click{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 1;
}
.delete_Noclick{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 0.4;
}
.invertSelection_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 1;
}
.invertSelection_click{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 1;
}
.invertSelection_Noclick{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 0.4;
}
.operationButtonDiv{
    position: absolute;
    z-index: 9;
    padding-left: 50px;
    width:100%;
    padding-right: 50px;
    background-color:rgba(0,0,0,0.3);
}
.operationButtonDiv div{
    margin: 3px;
    float: left;
    width:30px;;
    height:30px;
    background-size:cover;
}
.separateDiv{
    float: left;
    background-image: url('../../dist/assets/images/geo/separateLine.png');
    width: 30px;
    height: 30px;
    margin-top: 2px;
}
.Polygon_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/custom_HL.png');
    opacity: 1;
}
.Polygon_click{
    background-image: url('../../dist/assets/images/geo/custom_HL.png');
    opacity: 1;
}
.Polygon_Noclick{
    background-image: url('../../dist/assets/images/geo/custom_HL.png');
    opacity: 0.4;
}
.Circle_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/circleSelection_HL.png');
    opacity: 1;
}
.Circle_Noclick{
    background-image: url('../../dist/assets/images/geo/circleSelection_HL.png');
    opacity: 1;
}
.Circle_Noclick{
    background-image: url('../../dist/assets/images/geo/circleSelection_HL.png');
    opacity: 0.4;
}
.rectangle_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/boxSelection_HL.png');
    opacity: 1;
}
.rectangle_Noclick{
    background-image: url('../../dist/assets/images/geo/boxSelection_HL.png');
    opacity: 1;
}
.rectangle_Noclick{
    background-image: url('../../dist/assets/images/geo/boxSelection_HL.png');
    opacity: 0.4;
}
.invertSelection_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 1;
}
.invertSelection_Noclick{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 0.4;
}
.invertSelection_click{
    background-image: url('../../dist/assets/images/geo/invertSelection_HL.png');
    opacity: 1;
}
.delete_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 1;
}
.delete_click{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 1;
}
.delete_Noclick{
    background-image: url('../../dist/assets/images/geo/delete_HL.png');
    opacity: 0.4;
}

.location_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/location_HL.png');
    opacity: 1;
}
.location_click{
    background-image: url('../../dist/assets/images/geo/location_HL.png');
}
.location_Noclick{
    background-image: url('../../dist/assets/images/geo/location_HL.png');
    opacity: 0.4;
}
.heatMap_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/heatMap_HL.png');
    opacity: 1;
}
.heatMap_click{
    background-image: url('../../dist/assets/images/geo/heatMap_HL.png');
}
.heatMap_Noclick{
    background-image: url('../../dist/assets/images/geo/heatMap_HL.png');
    opacity: 0.4;
}
.route_Noclick:hover{
    background-image: url('../../dist/assets/images/geo/route_HL.png');
    opacity: 1;
}
.route_click{
    background-image: url('../../dist/assets/images/geo/route_HL.png');
}
.route_Noclick{
    background-image: url('../../dist/assets/images/geo/route_HL.png');
    opacity: 0.4;
}
</style>

<script>
export default {
    name:'mapOperaButtons',
    methods:{
        divClick(obj){
            debugger;
            var mthis = this;
            var operationObj = obj;
             mthis.$emit('mapOperation', operationObj)
        }
    }
}
</script>


