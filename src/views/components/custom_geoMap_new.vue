<style>
.geoDiv{
    margin-left: 10px
}
#legendDiv {
    position: absolute;
    z-index: 9999;
    top: 10%;
    left: 10%;
}
.ol-control {
    position: absolute;
    background-color: hsla(0,0%,100%,.4);
    border-radius: 4px;
    padding: 2px;
    z-index: 9;
}
.ol-scale-line {
    background: rgba(0,60,136,.3);
    border-radius: 4px;
    bottom: 8px;
    left: 8px;
    padding: 2px;
    position: absolute;
    bottom: 500px;
}


#mainMap .ol-zoom {
    top: 3.5em !important;
    right: 0.5em !important;
    left: auto !important;
    background-color: transparent;
    
}
#mainMap .ol-zoom-out {
margin-top: 204px;
top: 2.3em;
}
#mainMap .ol-zoomslider {
background-color: rgba(204,255,255,0.4) !important;
top: 5.3em;
left: auto !important;
right: 1.3em !important;
width: 0.3em;
}
#mainMap .ol-zoomslider button {
right: 0.6em;
background-color: rgb(204,255,255) !important;
width: 1em !important;
height: 1em !important;
border-radius: 0.5em;
}
#mainMap .ol-touch .ol-zoomslider {
top: 2.75em;
}
#mainMap .ol-control button{
    background-color: transparent;
    color: rgb(204,255,255);
}

#mainMap .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
#mainMap .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
top: 3px;
}

#mainMap .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
#mainMap .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
top: 232px;
}

#HeatMap_Map .ol-zoom {
    top: 3.5em !important;
    right: 0.5em !important;
    left: auto !important;
    background-color: transparent;
    
}
#HeatMap_Map .ol-zoom-out {
margin-top: 204px;
top: 2.3em;
}
#HeatMap_Map .ol-zoomslider {
background-color: rgba(204,255,255,0.4) !important;
top: 5.3em;
left: auto !important;
right: 1.3em !important;
width: 0.3em;
}
#HeatMap_Map .ol-zoomslider button {
right: 0.6em;
background-color: rgb(204,255,255) !important;
width: 1em !important;
height: 1em !important;
border-radius: 0.5em;
}
#HeatMap_Map .ol-touch .ol-zoomslider {
top: 2.75em;
}
#HeatMap_Map .ol-control button{
    background-color: transparent;
    color: rgb(204,255,255);
}

#HeatMap_Map .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
#HeatMap_Map .ol-zoom-in.ol-has-tooltip:focus [rolenpm=tooltip] {
top: 3px;
}

#HeatMap_Map .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
#HeatMap_Map .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
top: 232px;
}
#rightClickMenu {
    background-color:rgba(0, 0, 0, 0.9);
    border: 1px solid #2a6464;
    cursor:pointer;
}
#rightClickMenuTable td{
    min-width: 30px !important;
    line-height: 28px;
}
#rightClickMenuTable tr:hover{
    color:rgba(51,255,255,1);
    background-color: rgba(51,255,255,0.2);
}
.ringRightMenu{
    cursor:pointer;
}

/*v-enter 是进入之前，元素的起始状态*/
/*v-leave-to 离开之后动画的终止状态*/
.prompt-enter{
    opacity:  1;/*透明度*/
}
.prompt-leave-to{
    opacity:  0;/*透明度*/
}
    /*入场(离场)动画的时间段   */
.prompt-enter-active,.prompt-leave-active{
    transition: all 2s ease;
}

.promptmessage{
    position: absolute;
    color: #ccffff;
    top: 75px;
    width: 100%;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    text-align: center;
    z-index: 999999;
}
.heatMapFormDiv{
    position: absolute;
    z-index: 9;
    bottom: 200px;
    right: 100px;
    background-color: rgba(0,0,0,0.8);
}
.heatMapForm{
    margin: 10px;
}
.heatMapForm>label{
    color:rgba(51,255,255,0.7);
}
.heatSettingName{
    color:rgba(51,255,255,1);
}
</style>

<template>
    <!-- <div :style="{height:GeoHeight,width:geoWidth}" class='geoDiv' tabindex="1" @keydown="keyD" style="outline:none;">
        <imgItemOpera :changeButton='changeButtonParam' @mapOperation='mapOperationClick' :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)'}"></imgItemOpera>
        <div id='mapDIV'>
            <div id='mainMap' :style="{display:'block',height:mapHeight,width:'100%',backgroundColor:'black',borderColor: 'rgba(54,102,102,0.5)',borderWidth:'1px',borderStyle:'solid'}" > 
                <transition name="prompt"><div v-if="promptflag" class='promptmessage'>{{promptMessage}}</div></transition>
                <div class='heatMapFormDiv' v-if='heatMapVisible' >
                    <div class='heatSettingName'>热力设置</div>
                    <form class='heatMapForm'>
                        <label>半径大小</label><br/>
                        <input id="radius" type="range" min="1" max="50" step="1" value="15" @input='setRadius()'/><br/>
                        <label>模糊度大小</label><br/>
                        <input id="blur" type="range" min="1" max="50" step="1" value="15" @input='setBlur()'/>
                    </form>
                </div>
            </div>
        </div>
        <workset-modal :worksetData="worksetData" :type="worksetType" :flag="worksetFlag" :worksetInfo="worksetInfo" />
    </div> -->
    <div :style="{height:GeoHeight,width:geoWidth}" class='geoDiv' tabindex="1" @keydown="keyD" style="outline:none;">
        <imgItemOpera :changeButton='changeButtonParam' @mapOperation='mapOperationClick' :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)'}"></imgItemOpera>
        <div id='mapDIV'>
            <div id='mainMap' :style="{display:'block',height:mapHeight,width:'100%',backgroundColor:'black',borderColor: 'rgba(54,102,102,0.5)',borderWidth:'1px',borderStyle:'solid'}" >  <!-- ,height:'800px',width:'1300px'    '1px' 'solid' 'rgba(54,102,102,0.5)'-->
                <transition name="prompt"><div v-if="promptflag" class='promptmessage'>{{promptMessage}}</div></transition>
                <div class='heatMapFormDiv' v-if='legend' >
                    <div class='heatSettingName'>图例</div>
                    <img :src="url" v-for="url in legendURL"/>
                </div>
                <operatorHub :style="{height:mapHeight}" :operatorConfig="operatorConfig"></operatorHub>
            </div>
            
            <div id='HeatMap_Map' :style="{display:'none',height:mapHeight,width:'100%',backgroundColor:'black'}" ></div>
        </div>
        <workset-modal :worksetData="worksetData" :type="worksetType" :flag="worksetFlag" :worksetInfo="worksetInfo" />
        <thematicLayer @visable="setVisabale" @selectedThematics="selectThematics" v-if="openThematicModal"></thematicLayer> <!--  @name="importThematicLayer" -->
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

import {test_Route,test_HeatMap,EventsDatas,eventsPointGeoJson,test_mapData} from '../../dist/assets/js/geo/data.js'
/* import {map} from '../../dist/assets/js/geo/ChinaMap.js'  */
import {map} from '../../dist/assets/js/geo/Map.js' 
import {getGradientColors} from '../../dist/assets/js/geo/GradientColors.js'
import {BezierSinglePoint, BezierLinePoints} from '../../dist/assets/js/geo/geometryType/BezierLine.js'
import {getThirdPoint} from '../../dist/assets/js/geo/geometryType/Arc.js'
import util from '../../util/tools.js'
import {rightMenu} from '../../dist/assets/js/rightMenu.js'
import GSF from "../../dist/assets/js/geo/geoMethods.js"

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Polygon,{fromCircle} from 'ol/geom/Polygon'
import TileWMS from 'ol/source/TileWMS'
import Overlay from 'ol/Overlay'
import Collection from 'ol/Collection'
import Stroke from 'ol/style/Stroke'
import Draw, {createBox} from 'ol/interaction/Draw'
import EqualTo from 'ol/format/filter/EqualTo'
import Or from 'ol/format/filter/Or'
import WFS from 'ol/format/WFS'
import GeoJSON from 'ol/format/GeoJSON'
import LineString from'ol/geom/LineString'
import Icon from 'ol/style/Icon'
import {click, pointerMove,mouseOnly} from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';
import {easeOut} from 'ol/easing.js';
import {unByKey} from 'ol/Observable.js';
import {getCenter} from 'ol/extent.js';
import {stopPropagation} from 'ol/events/Event';
import Heatmap from 'ol/layer/Heatmap';
import Circle from '@turf/circle'
import echarts from 'echarts'
import ImageLayer from 'ol/layer/Image';
import ImageWMS from 'ol/source/ImageWMS';

import 'ol/ol.css'
import '../../dist/assets/styles/geo/demo.css'
import '../../dist/assets/styles/geo/mapInit.css'

import imgSlider from "./custom_imgSlider"
import routeLegend from './custom_routeLegend'
import imgItemOpera from './custom_mapOperaButtons'
import worksetModal from "./custom_workSet_modal.vue"
import operatorHub from "./custom_operatorHub.vue"
import thematicLayer from "./custom_thematicLayer.vue"



export default {
    name: 'OperationButtons',
    data() {
      return {
        //isEventPointsSelected:false,
        a:null,
        radius:15,
        mapDivbuttonIds : ['location_AT','heatMap_HSD','route_HSD'],
        mapHeight:'0px',
        imgTopVules:'',
        promptMessage:'',
        promptflag:false,
        test_Route:test_Route,
        test_HeatMap:test_HeatMap,
        EventsDatas:EventsDatas,
        eventsPointGeoJson:eventsPointGeoJson,
        test_mapData:test_mapData.data.eventFeatures,
        qbMap:null,
        heatMap:null,
        provinTilSource:null,
        selectedPointsSource:null,
        polygonLayer:null,
        diePointColor:'#9eb2b1', //'#33ffff',//初始化加载时的实体点颜色
        lifePointColor: '#ff9900',//拉框选中后的实体点颜色
        halflifePointColor:'#93bdbb',//'rgba(255,204,102,0.5)',
        frameSelectedEntityPoints : [],  //拉框时选择的所有实体点
        draw:null,
        selectPointerMove : null,
        selectClick : null,
        selectClick_area:null,
        mouseOnly:null,
        legend:null,
        evt:null,
        BezierPointsObjsArr:[],
        routeColors:['#616f39','#88A2AA','#509aaf'],
        n :500,//曲线的粒度（曲线是由几个点组成）
        mousePointCoordinate: null,
        GeoHeight:'0px',
        geoWidth:'0px',
        timeCondition:[],
        isCtrl:false,
        onImgIds:[],  //被点亮的img的id
        allImgIds:[], //所有img的id
        maxEventsNum:0,
        removeFeaturesArr:[],
        QBIdsToFeatureIdList:{},   //{<paramId>:{'featureId':<featureId>,...}} 省略的属性，都存放在AllLayerList_conf中的paramAttrs中，除id外都存在该对象中
        removeQBIdsList:{},
        geometrySelectedQBIds:[],
        timeSelectedEventIds:[],
        timeSelectedEventIdsOnly:[],
        staticsSelectedEventIds:[],
        staticsSelectedEventIdsOnly:[],
        mouseSelectedEventIds:[],
        onlyLookItIds:[],
        HLIds:[],//被高亮的事件或组织机构ids
        SelectedIds:[],
        halfSelectedIds:{},
        invertSelectedEventIds:[], //反选存储
        AreaIds:[],  //行政区划ids
        allAreaIds:[],
        violentFeatureIds:[],//狂暴点的featureId，（地图上被click选中的点）
        AnimationFun:{},
        mapSingleClick:null,
        heatMapVisible:false,
        oparAreaFeature:null,
        worksetData:[{
            type: "entity",
            data: []
          },
          {
            type: "document",
            data: []
          },
          {
            type: "event",
            data: []
          }
        ],
        worksetType: "",
        worksetFlag:0,
        worksetInfo: {
          title: "",
          des: "",
          id: ""
        },
        //selectedOrgIds:[],  //被选中的组织机构ids
        changeButtonParam:[],
        pointMoveListenerKey:null,
        pointClickListenerKey:null,
        eventGeoJson:null,
        noSelectedstyle : new Style({
            image : new CircleStyle({
                radius : 3,
                fill : new Fill({
                    color : '#ff9900' //'#33ffff'
                })
            })
        }),
        graystyle:new Style({
            image : new CircleStyle({
                radius : 3,
                fill : new Fill({
                    color : '#788c8c'
                })
            })
        }),
        AllLayerList_conf:{
            'event':{
                'layerId':'eventsPointsLayer',
                'paramAttrs':['id','time','eventType','completeEvent']    //除id外的所有属性都应该写在allEventIdsToFeaturesIdsList中，
            },
            'org':{
                'layerId':'OrgLayer',
                'paramAttrs':['id','OrgName']
            }
        },
        qbstyles:{},
        operatorConfig:[
                {
                    name:'热力分析',
                    id:'heatMap',
                    iconName:'icon-star',
                    openFunction:'openHeat',
                    closeFunction:'closeHeat',
                    operatorSurface:[
                      {
                        name:'半径大小',
                        id:'heatRadius',
                        type:'Slider',
                        attrName:'radius', 
                        excuteFunction:'setHeatMapRadius',
                        value:{
                          extent:[1,50],
                          defaultValue:20
                        }
                      },{
                        name:'热力模糊度',
                        id:'heatBlur',
                        type:'Slider',
                        attrName:'blur',
                        excuteFunction:'setHeatMapBlur',
                        value:{
                          extent:[1,50],
                          defaultValue:20
                        }
                      }
                    ]
                },
                {
                name:'图层处理',
                id:'layerHandle',
                iconName:'icon-file',
                disabled:true,
                },
                {
                name:'轨迹分析',
                id:'locusAnalyse',
                iconName:'icon-route',
                disabled:true
                },
                {
                name:'空间分析',
                id:'spatialAnalyse',
                iconName:'icon-kongjianfenxi',
                disabled:true
                },
                {
                name:'获取更多',
                id:'getMore',
                iconName:'icon-more',
                disabled:true
                }
        ],
        legend:false,
        legendURL:[],
        openThematicModal:false,
        hasTheamatic:false,
        asynwaitCount:1,
        asynAddIdsCount:1,   
        } 
    },
    mounted() {
        var mthis = this;
        mthis.test_Route.forEach(function(item){
            mthis.allImgIds.push(item.id);
        })
        mthis.GeoHeight=mthis.$store.getters.getGeoHeight;
        mthis.mapHeight =mthis.$store.getters.getGeoHeight;
        mthis.geoWidth=document.documentElement.clientWidth * this.$store.state.split_geo - 20 + 'px';
    },
    methods:{
         keyD(e){
            var mthis = this;
            if(mthis.$store.state.tmss === 'geo') {
                var e = event || window.event || arguments.callee.caller.arguments[0];
                if(e && e.keyCode == 46 && (!e.shiftKey) && (!e.altKey) && (!e.ctrlKey)){
                    // delete
                    mthis.deletePoints()
                    mthis.clearBubble(e)
                }
                if(e.keyCode == 65 && (e.ctrlKey || e.metaKey) && (!e.shiftKey) && (!e.altKey)){
                    //   ctrl+A
                    mthis.selectAll()
                    mthis.clearBubble(e)
                }
            }
        },
        clearBubble(e) {
            if (e.stopPropagation) {
                e.stopPropagation();
            } else {
                e.cancelBubble = true;
            }
            if (e.preventDefault) {
                e.preventDefault();
            } else {
                e.returnValue = false;
            }
        },
        setBlur(){
            var mthis = this;
            var radius = document.getElementById('blur').value;
            mthis.radius = parseInt(radius);
            var heatmapLayer = mthis.getLayerById('heatmapLayer').setBlur(mthis.radius)
        },
        setRadius(){
            var mthis = this;
            var radius = document.getElementById('radius').value;
            mthis.radius = parseInt(radius);
            var heatmapLayer = mthis.getLayerById('heatmapLayer').setRadius(mthis.radius)
        },
        mapOperationClick(mapOperation){
            var mthis = this;
            var mapOperationId = mapOperation.currentTarget.id;
            if(mapOperationId == 'location_AT'){
                mthis.location_cilck();
            } else if(mapOperationId == 'heatMap_HSD'){
                mthis.disHeatMap();
            } else if(mapOperationId == 'route_HSD'){
                mthis.route_cilck();
            } else if(mapOperationId == 'Circle_HD' || mapOperationId == 'Polygon_HD' || mapOperationId == 'rectangle_HD'){
                mthis.changedrawType(mapOperation)
            } else if(mapOperationId == 'delete_HSD'){
                mthis.deletePoints();
            } else if(mapOperationId == 'invertSelection_HSD'){
                mthis.invertSelection();
            } else if(mapOperationId == 'toNet_HSD'){
                mthis.pushToNet();
            } else if(mapOperationId == 'returnToAllPoints_HDD'){
                mthis.returnToAllPoints();
            } else if(mapOperationId == 'selectAll_HD'){
                mthis.selectAll();
            } else if(mapOperationId == 'clearAll_HCD'){
                mthis.clearAll();
            } else if(mapOperationId == 'exploreLocationName_HL'){
                mthis.explore();
            } else if(mapOperationId == 'RectangleExplore_AT' || mapOperationId == 'CircleExplore_AT' || mapOperationId == 'customExplore_AT'){
                mthis.drawExplore(mapOperation)
            } else if(mapOperationId == 'createWorkSpace_HASD'){
                mthis.openWorkset();
            } else if(mapOperationId == 'leadingInThematic_AT'){
                mthis.openThematic();
            } else if(mapOperationId == 'closeThematic_OT'){
                mthis.closeThematic();
            }
        },
        closeThematic(){
            var mthis = this;
            var layers = mthis.qbMap.getLayers().getArray();
            for(let i = 0; i < layers.length; i++){
                var layer = layers[i];
                if(layer.getProperties().id !== undefined && layer.getProperties().id.split('_')[0] === 'ThematicLayer'){
                    mthis.routeMap.map.removeLayer(layer);
                }
            }
            /* var layer = mthis.getLayerById('ThematicLayer');
            mthis.routeMap.map.removeLayer(layer);
            mthis.legendURL = [];
            mthis.legend = false; */
        },
        openThematic(){
            var mthis = this;
            mthis.openThematicModal = true;
        },
        setVisabale(){
            var mthis = this;
            mthis.openThematicModal = false;
        },
        selectThematics(selectedThematics){
            var mthis = this;
            for(let i = 0; i < selectedThematics.length; i++){
                let thematic = selectedThematics[i];
                let extent = thematic.extent;
                let layerId = 'ThematicLayer_' + thematic.thematicName;
                if(mthis.getLayerById(layerId) === undefined){
                    let legendurl = 'http://10.60.1.142:8082/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=' + thematic.thematicName;
                    let wmsLayer = new ImageLayer({
                        visible: true,
                        id:layerId,
                        source: new ImageWMS({
                            ratio: 1,
                            url: 'http://10.60.1.142:8082/geoserver/ThematicLayer/wms?',
                            params:{
                                'FORMAT': 'image/png',
                                'VERSION': '1.1.1',
                                'LAYERS': thematic.thematicName,
                            }
                        })
                    });
                    var layersArray = mthis.qbMap.getLayers();
                    layersArray.insertAt(2,wmsLayer)
                    /* mthis.routeMap.addlayer(wmsLayer); */
                    mthis.legendURL.push(legendurl);
                    mthis.hasTheamatic = true;
                    mthis.isOperateButtonsHLOrDim()
                    /* mthis.routeMap.map.getView().fit(extent, mthis.routeMap.map.getSize()); */
                    mthis.qbMap.viewAnimate(extent);
                    
                    
                }
            }
            mthis.legend = true;
        },
        openWorkset() {
            var mthis = this;
            this.worksetInfo = {
                title: "",
                des: "",
                id: ""
            };
            this.worksetData = [{
                    type: "entity",
                    data: []
                },
                {
                    type: "event",
                    data: []
                },
                {
                    type: "area",
                    data: []
                }
            ];
            var orgIds = [];
            var eventIds = mthis.geo_hastype_param.eventIds;
            var areaIds = mthis.geo_hastype_param.orgIds;
            /* for(let i = 0; i < mthis.SelectedIds.length; i++){
                let id = mthis.SelectedIds[i];
                let type = id.split('&')[0];
                let oid = id.split('&')[1];
                if(type === 'event'){
                    eventIds.push(oid);
                } else {
                    orgIds.push(oid);
                }
            } */
            for(let i = 0; i < mthis.AreaIds.length; i++){
                let id = mthis.AreaIds[i];
                areaIds.push(id);
            }
            if (orgIds.length + eventIds.length + areaIds.length > 0) {
                if (orgIds.length > 0) {
                    mthis.$http.post(mthis.$store.state.ipConfig.api_url + "/entity-info/", {
                        nodeIds: orgIds
                    }).then(response => {
                        if (response.body.code === 0) {
                        mthis.worksetData[0].type = "entity";
                        mthis.worksetData[0].data = response.body.data[0].nodes;
                        }
                    });
                }
                if (eventIds.length > 0) {
                    // ;
                    mthis.$http
                    .post(mthis.$store.state.ipConfig.api_url + "/event-detail/", {
                        EventIds: eventIds
                    })
                    .then(response => {
                        if (response.body.code === 0) {
                            mthis.worksetData[1].type = "event";
                            response.body.data.map(item => {
                                item.name = item.event_subtype
                                item.img = "http://10.60.1.140/assets/images/event.png"
                                return item
                            })
                            mthis.worksetData[1].data = response.body.data;
                        }
                    });
                }
                if (areaIds.length > 0){
                    mthis.$http.post("http://10.60.1.141:5100/search-Area/", {
                        nodeIds: areaIds
                    }).then(response => {
                        if (response.body.code === 0) {
                            mthis.worksetData[2].type = "area";
                            response.body.data.map(item => {
                                item.img = "http://10.60.1.140/assets/images/event.png"
                                return item
                            })
                            mthis.worksetData[2].data = response.body.data;
                        }
                    });
                }
            }
            this.worksetType = "add";
            this.worksetFlag = this.worksetFlag + 1;
        },
        heatMap_cilck(){
            var mthis = this
            var heatMapLayer;
            //mthis.clickButtonOpenDiv('heatMap_HSD')
            if(mthis.heatMap == null){
                mthis.heatMap = new map('HeatMap_Map')
                //mthis.click_heatMap();
                var source = new VectorSource({
                });
                heatMapLayer = new Heatmap({
                    source: source,
                    blur: 20,
                    radius: 15,
                    weight:mthis.weightFunction,
                    renderModed:'image',
                    id:'heatmapLayer',
                    gradient:[]
                })
                mthis.heatMap.addlayer(heatMapLayer);
            } else {
                var layers = mthis.heatMap.map.getLayers().getArray();
                for(let i = 0; i < layers.length; i++){
                    if(layers[i].getProperties().id !== undefined){
                        heatMapLayer = layers[i];
                        break;
                    }
                }
                heatMapLayer.getSource().clear();
            }
            mthis.click_heatMap(heatMapLayer);
        },
        disHeatMap(){
            var mthis = this;
            var id = 'heatMap_HSD';
            var button = document.getElementById(id)
            var heatMapLayer = mthis.getLayerById('heatmapLayer');
            var eventLayer = mthis.getLayerById('eventsPointsLayer');
            var orgLayer = mthis.getLayerById('OrgLayer');
            if(button.className === 'button-div-click'){
                button.className ='button-div';
                mthis.heatMapVisible = false;
                heatMapLayer.setVisible(false);
            } else {
                 button.className = 'button-div-click';
                 mthis.heatMapVisible = true;
                 heatMapLayer.setVisible(true);
            }   
        },
        mapAddFeature(feature){
            var mthis = this;
            var featureId = feature.getId();
            var layerId = mthis.AllLayerList_conf[featureId.split('&')[0]].layerId;
            var source = mthis.getLayerById(layerId).getSource();
            source.addFeature(feature);
            var params = feature.get('Params');
            params.forEach(function(param){
                var paramId = param.id;
                var OId = mthis.getOIdFromId(paramId);
                var listParam = {'featureId':featureId};
                var paramAttrs = mthis.AllLayerList_conf[featureId.split('&')[0]].paramAttrs;
                paramAttrs.forEach(function(attr){
                    //if(attr !== 'id'){
                    listParam[attr] = param[attr]
                    //}
                })
                mthis.$set(mthis.QBIdsToFeatureIdList,OId,listParam);
                var index = util.itemIndexInArr(paramId,mthis.geometrySelectedQBIds);
                if(index === -1){
                    mthis.$data.geometrySelectedQBIds.push(paramId);
                }
            })
        },
        getOIdFromId(id){
            if(id.indexOf('&') === -1){
                return id
            } else {
                return id.split('&')[1]
            }
        },
        mapRemoveFeature(feature){  //mapRemoveFeature方法是在map中彻底删除feature，包括删除所有痕迹（删除列表、各种选中列表，反选列表等）
            var mthis = this;
            var id = feature.getId();
            var layerId = mthis.AllLayerList_conf[id.split('&')[0]].layerId;
            var source = mthis.getLayerById(layerId).getSource();
            var existFeatures = source.getFeatures();
            var isHas = false;
            for(let j = 0; j < existFeatures.length; j++){
                var existFId = existFeatures[j].getId();
                if(id === existFId){
                    isHas = true;
                    break;
                }
            }
            
            var params = feature.get('Params');
            var fid = feature.getId()
            for(let i = 0; i < params.length; i++){
                var paramId = params[i].id;
                var OId = mthis.getOIdFromId(paramId);
                if(paramId)
                if(mthis.QBIdsToFeatureIdList[OId]){  //如果allEventIdsToFeaturesIdsList中存在该id及其属性，则删除
                    delete mthis.QBIdsToFeatureIdList[OId]
                }
                if(mthis.removeQBIdsList[paramId]){  //如果removeEventIdList中存在该id及其属性，则删除
                    delete mthis.removeQBIdsList[paramId]
                }
                var index = util.itemIndexInArr(paramId,mthis.HLIds);
                if(index !== -1){ //如果SelectedIds中存在该id，则删除
                    mthis.$data.HLIds.splice(index,1)
                }
                var index_geometry = util.itemIndexInArr(paramId,mthis.geometrySelectedQBIds);
                if(index_geometry !== -1){ //如果geometrySelectedEventIds中存在该id，则删除
                    mthis.$data.geometrySelectedQBIds.splice(index_geometry,1)
                }
                var index_time = util.itemIndexInArr(paramId,mthis.timeSelectedEventIds);
                if(index_time !== -1){ //如果timeSelectedEventIds中存在该id，则删除
                    mthis.$data.timeSelectedEventIds.splice(index_time,1)
                }
                var index_statics = util.itemIndexInArr(paramId,mthis.staticsSelectedEventIds);
                if(index_statics !== -1){ //如果staticsSelectedEventIds中存在该id，则删除
                    mthis.$data.staticsSelectedEventIds.splice(index_statics,1)
                }
                var index_invert = util.itemIndexInArr(paramId,mthis.invertSelectedEventIds);
                if(index_invert !== -1){ //如果staticsSelectedEventIds中存在该id，则删除
                    mthis.$data.invertSelectedEventIds.splice(index_invert,1)
                }
            }
            if(isHas){
                source.removeFeature(source.getFeatureById(fid));
            }
        },
        explore(){
            var mthis = this;
            var areaFeatures = mthis.getLayerById('HLAreaLayer').getSource().getFeatures();
            var geometryArr = [];
            if(areaFeatures.length > 0){
                areaFeatures.forEach(function(areaFeature){
                    if(areaFeature.getId() !== undefined){
                        var geometry = areaFeature.getGeometry()
                        var geometryStr = new GeoJSON().writeGeometry(geometry);
                        geometryArr.push(geometryStr);
                    }
                    
                })
            }
            mthis.exploreQB(geometryArr,'Org');
        },
        
        clearAll(){
            var mthis = this;;
            mthis.getLayerById('QBLayer').getSource().clear();
            mthis.getLayerById('HLAreaLayer').getSource().clear();
            mthis.geometrySelectedQBIds = [];
            mthis.timeSelectedEventIds = [];
            mthis.staticsSelectedEventIds = [];
            mthis.invertSelectedEventIds = [];
            mthis.AreaIds = [];
            mthis.allAreaIds = [];
            mthis.QBIdsToFeatureIdList = new Object();
            mthis.removeQBIdsList = new Object();
        },
        pushToNet(){
            var mthis = this;
            var eventIds = [];
            var nodeIds = [];
            var metalworkIds = mthis.HLIds;
            if(metalworkIds.length > 0){
                metalworkIds.forEach(function(id){
                    var featureId = mthis.QBIdsToFeatureIdList[id];
                    var type = featureId.split('&')[0]
                    if(type === 'event'){
                        eventIds.push(id);
                    } else {
                        nodeIds.push(id);
                    }
                })
            }
            //var ids = mthis.getSelectedEventIds().ids;
            var GeoToNetData = {
                nodeIds:nodeIds,
                eventIds:eventIds,
                contentIds:[]
            };
            mthis.$store.commit('setGeoToNetData',GeoToNetData);
            mthis.$store.commit('changeTMSS', 'net');
        },
        getSelectedEventIds(){  //获取被选择的ids
            var mthis = this;
            var selectedParam = {
                "type":'',
                "ids":[]
            };
            var ids = [];
            //var heighUp = '';
            if(mthis.geometrySelectedQBIds.length === 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0){
                //全量
                //ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                selectedParam = {
                    "type":'All',
                    "ids":mthis.getallEventIdsFromallEventIdsToFeaturesIds()
                };
            } else if(mthis.geometrySelectedQBIds.length !== 0 && (mthis.geometrySelectedQBIds.length <= mthis.staticsSelectedEventIds.length || mthis.geometrySelectedQBIds.length <= mthis.timeSelectedEventIds.length || (mthis.timeSelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0))){
                //view
                selectedParam = {
                    "type":'GeoView',
                    "ids":mthis.geometrySelectedQBIds
                };
                //ids = mthis.geometrySelectedQBIds;
            } else if(mthis.timeSelectedEventIds.length !== 0 && (mthis.timeSelectedEventIds.length <= mthis.staticsSelectedEventIds.length || mthis.timeSelectedEventIds.length <= mthis.geometrySelectedQBIds.length || (mthis.geometrySelectedQBIds.length === 0 && mthis.staticsSelectedEventIds.length === 0))){
                //statics
                selectedParam = {
                    "type":'GeoTime',
                    "ids":mthis.timeSelectedEventIds
                };
                //ids = mthis.staticsSelectedEventIds;
            } else{
                selectedParam = {
                    "type":'GeoStatics',
                    "ids":mthis.staticsSelectedEventIds
                };
                //ids =  mthis.timeSelectedEventIds;
            }
            return selectedParam
            //return ids;
        },
        pushToContent(){
            var mthis = this;
            var ids = mthis.getSelectedEventIds().ids;
            var GeoToContentData = {
                nodeIds:[],
                eventIds:ids,
                contentIds:[]
            };
            mthis.$store.commit('setGeoToContentData',GeoToContentData);
            mthis.$store.commit('changeTMSS', 'content');
        },
        selectAll(){
            var mthis = this;
            var ids = [];
            mthis.geometrySelectedQBIds.length = 0;
            mthis.timeSelectedEventIds.length = 0;
            mthis.staticsSelectedEventIds.length = 0;
            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            for(let i = 0; i < features.length; i++){
                var item = features[i];
                var num = item.get('Params').length;
                item.set('selectedNum',num,false);
                GSF.getParamIdsFromFeature(item,ids);
            }
            mthis.geometrySelectedQBIds = ids;
            
        },
        returnToAllPoints(){
            var mthis = this;
            if($.isEmptyObject(mthis.removeQBIdsList)){
                return;
            }
            mthis.geometrySelectedQBIds = [];
            /* for(let i = ) */
            if(mthis.removeFeaturesArr.length > 0){
                mthis.removeFeaturesArr.forEach(function(feature){
                    var featureId = feature.getId();
                    var source = mthis.qbMap.getLayer('QBLayer').getSource();
                    source.addFeature(feature);
                    var type = feature.getGeometry().getType();
                })
                mthis.removeFeaturesArr = [];
            }
            var keys = Object.keys(mthis.removeQBIdsList);
            if(keys.length > 0){   //将删除的数据添加到feature中
                keys.forEach(function(item){
                    var featureId = mthis.removeQBIdsList[item].featureId
                    var source = mthis.qbMap.getLayer('QBLayer').getSource();
                    var feature = source.getFeatureById(featureId);
                    var addParam = mthis.removeQBIdsList[item].param;
                    var Param = feature.get('Params');
                    var events = Param.push(addParam)
                    feature.set('Params',Param,false);
                    mthis.$delete(mthis.removeQBIdsList,item);
                })
            }

            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            if(features.length > 0){
                features.forEach(function(item){
                    var num = item.get('Params').length;
                    item.set('selectedNum',num);
                    mthis.addParamsToQBIdsFeatureList(item);
                    mthis.addEventIdsToSelectedIds(item);
                });
            }
        },
        legendItemClick(legendItemOpera){
            var mthis = this;
            var map = mthis.qbMap.map;
            var routeId = legendItemOpera.id
            if(legendItemOpera.onOroff == 'on'){
                var Route = mthis.test_Route.find(function(obj){
			        return obj.id == routeId;
                });
                mthis.creatRouteLine(Route);
            } else {
                var layerArr = map.getLayers().getArray();
                for(var i=layerArr.length-1; i>=0; i--){
                    var item = layerArr[i];
                    var point_animation_id = 'point_animation_' + routeId;
                    if(item.getType() == "VECTOR" && (item.getSource().getFeatures()[0].getProperties().belongId == routeId)){
                        map.removeLayer(item);
                        if(mthis.BezierPointsObjsArr.length > 0){
                            var a = mthis.BezierPointsObjsArr.find(function(obj,index,arr) {
                                if(obj.belongRouteId == routeId){
                                    arr.splice(index, 1); 
                                }
                            });
                        }
                        var overlayArr =map.getOverlays().getArray();
                        for(var j=overlayArr.length-1; j>=0; j--){
                            if(overlayArr[j].getId() == point_animation_id){
                                map.removeOverlay(overlayArr[j]);
                            }
                        }
                    }
                }
            }
        },
        imgClick(imgItemOpera){
            var mthis = this;
            window.document.onkeydown = function(){
                if (window.event.ctrlKey) {
                    mthis.isCtrl = true;
                }
            };
            window.document.onkeyup = function(){
                if (!window.event.ctrlKey) {
                    mthis.isCtrl = false;
                }
            };
            if(imgItemOpera.onOroff == 'on'){
                if(mthis.isCtrl){
                    mthis.onImgClick(imgItemOpera.id);
                    mthis.onImgIds.push(imgItemOpera.id);
                } else {
                    mthis.onImgIds.forEach(function(item){
                        mthis.offImgClick(item)
                    });
                    mthis.onImgIds = [];
                    mthis.onImgClick(imgItemOpera.id)
                    mthis.onImgIds.push(imgItemOpera.id);
                }
                
            } else {
                mthis.offImgClick(imgItemOpera.id);
                mthis.deleteArrItem(mthis.onImgIds,imgItemOpera.id);
            }
        },
        rightClickEvent(){
            var mthis = this;
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var feature = mthis.getLayerById("HLAreaLayer").getSource().getFeatureById(id)
                var geometry = feature.getGeometry();
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                geometryList.push(geometryStr);
                //mthis.exploreQB([geometryStr],'Event');
            }
            mthis.exploreQB(geometryList,'Event');
            mthis.deleteRightMenu();
        },
        rightClickOrg(){
            var mthis = this;
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var feature = mthis.getLayerById("HLAreaLayer").getSource().getFeatureById(id)
                var geometry = feature.getGeometry();
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                geometryList.push(geometryStr);
                //mthis.exploreQB([geometryStr],'Org');
            }
            mthis.exploreQB(geometryList,'Org');
            mthis.deleteRightMenu();
        },

        rightClickGeoTar(){
            var mthis = this;
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var feature = mthis.getLayerById("HLAreaLayer").getSource().getFeatureById(id)
                var geometry = feature.getGeometry();
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                geometryList.push(geometryStr);
                //mthis.exploreQB([geometryStr],'GeoTar');
            }
            mthis.exploreQB(geometryList,'GeoTar');
            mthis.deleteRightMenu();
        },
        rightClickDM(){
            var mthis = this;
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var source = mthis.getLayerById('HLAreaLayer').getSource();
                var feature = source.getFeatureById(id)
                source.removeFeature(feature);
                var index = util.itemIndexInArr(id,mthis.allAreaIds);
                if(index !== -1){
                    mthis.$data.allAreaIds.splice(index,1);
                }
            }
            mthis.AreaIds = [];
            /* mthis.exploreQB(geometryList,'Org'); */
            mthis.deleteRightMenu();
        },
        noItemInRightMenu(){
            alert('请期待!')
        },
        deleteRightMenu(){
            var mthis = this;
            setTimeout(function(){
                    var map = mthis.qbMap.map;
                    var overlayId = 'rightClickMenu_Area';
                    var overlay = map.getOverlayById(overlayId);
                    if(overlay){
                        map.removeOverlay(overlay)
                    }
                },100)
        },
        judgeRightMenuaDisable(){
            var mthis = this;
            var disableIds = [];
            if(mthis.SelectedIds.length === 0){
                disableIds.push(4);
                disableIds.push(301);
            }
            if(mthis.AreaIds.length == 0){
                disableIds.push(6);
                disableIds.push(302);
            }
            if(mthis.AreaIds.length == 0&&mthis.SelectedIds.length === 0){
                disableIds.push(3);
            }
            return disableIds;
        },
        setRightClickMenu_Area(coordinate){
            var mthis = this;
            var overlayId = 'rightClickMenu_Area';
            var ovdiv = document.createElement('div');
            ovdiv.style = 'width:440px;height:440px';
            ovdiv.class = 'ringRightMenu';
            ovdiv.id='ringRightMenu';
            var disableIds = mthis.judgeRightMenuaDisable();
            var config = [
                {'Id':1,'parentId':0,'name':'暂无','disable':true,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.noItemInRightMenu','icon':'noclick.png','disicon':'noclick_disable.png'},
                {'Id':2,'parentId':0,'name':'暂无','disable':true,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.noItemInRightMenu','icon':'noclick.png','disicon':'noclick_disable.png'},
                {'Id':3,'parentId':0,'name':'删除','disable':false,'hasLeaf':true,'color':"rgba(0,51,51,0.98)",'backcall':'','icon':'delete.png','disicon':'delete_disable.png'},
                {'Id':4,'parentId':0,'name':'推送','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.pushToNet','icon':'pushnet.png','disicon':'pushnet_disable.png'},
                {'Id':5,'parentId':0,'name':'暂无','disable':true,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.noItemInRightMenu','icon':'noclick.png','disicon':'noclick_disable.png'},
                {'Id':6,'parentId':0,'name':'探索','disable':false,'hasLeaf':true,'color':"rgba(0,51,51,0.98)",'backcall':'','icon':'explor.png','disicon':'explor_disable.png'},
                {'Id':601,'parentId':6,'name':'事件','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.rightClickEvent','icon':'explorevent.png','disicon':'explorevent_disable.png'},
                {'Id':602,'parentId':6,'name':'组织','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.rightClickOrg','icon':'exploreorg.png','disicon':'exploreorg_disable.png'},
                {'Id':603,'parentId':6,'name':'地理目标','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.rightClickGeoTar','icon':'exploregoal.png','disicon':'exploregoal_disable.png'},
                {'Id':604,'parentId':6,'name':'全部','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.rightClickOrg','icon':'quanbu.png','disicon':'quanbu_disable.png'},
                {'Id':301,'parentId':3,'name':'所选节点','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.deletePoints','icon':'deletenodes.png','disicon':'deletenodes_disable.png'},
                {'Id':302,'parentId':3,'name':'所选区域','disable':false,'hasLeaf':false,'color':"rgba(0,51,51,0.98)",'backcall':'mthis.rightClickDM','icon':'deletearea.png','disicon':'deletearea_disable.png'},
            ]
            for(let i = 0; i < disableIds.length; i++){
                var id = disableIds[i];
                for(let j = 0; j < config.length; j++){
                    var item = config[j];
                    if(item.Id === id){
                        item.disable = true;
                        break;
                    }
                }
            }
            var qbMap = new rightMenu(mthis,ovdiv,config);
            var overlayId = mthis.setOverlay(coordinate,ovdiv,overlayId,'top-left',-200,-200);
            mthis.qbMap.map.addOverlay(overlayId);
        },
        OrgStyleFun(feature){
            var mthis = this;
            var iconStyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/Organization.png'),
                        opacity:1
                    }))
                }); 
            return iconStyle;
        },
        pointerMoveselectfilterFun(feature,layer){
            var mthis = this;
            if(layer.get('id') === "QBLayer"){
                if(feature.get('selectedNum') > 0){
                    return true
                } else {
                    return false
                }
            } else {
                return false
            }
        },
        selectfilterStyleFun(feature,resolution){
            var mthis = this;
            var iconStyle = null;
            var type = feature.getId().split('&')[0];
            if(type === 'org'){
                iconStyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/Organization_Selected.png')
                    }))
                });
            } else {
                iconStyle = new Style({
                    image : new CircleStyle({
                        radius : 5,
                        fill : new Fill({
                            color : mthis.lifePointColor //'#33ffff'
                        })
                    }),
                    stroke: new Stroke({
                        width: 5,
                        color: mthis.lifePointColor
                    }),
                    fill: new Fill({
                        color: mthis.lifePointColor
                    })
                })
            }
            return iconStyle
        },
        clickselectfilterFun(feature,layer){
            return true
        },
        rightClickFilterFun(layer){
            var mthis = this;
            return true;
        },
        rightClickFun(layer,coordinate){
            var mthis = this;
            var map = mthis.qbMap.map;
            var pixel = map.getPixelFromCoordinate(coordinate);
            var overlayId = 'rightClickMenu_Area';
            var overlay = map.getOverlayById(overlayId);
            if(overlay){
                map.removeOverlay(overlay)
            }
            mthis.setRightClickMenu_Area(coordinate)
        },
        QBStyleFunction(feature,resolution){
            var mthis = this;
            var featureType = feature.getId().split('&')[0];
            var selectedNum = feature.get('selectedNum');
            var featureStatus = selectedNum>0?'multi':selectedNum.toString();
            return mthis.qbstyles[featureType][featureStatus];

        },
        addlocationLayer(){
            var mthis = this;
            if(mthis.qbMap == null){
                mthis.qbstyles = {
                    "org":{
                        '-1':new Style({
                                image: new Icon(({
                                    src: require('../../dist/assets/images/geo/orgNoSelected.png'),
                                    opacity:1
                                }))
                            }),
                        '0': new Style({
                                image: new Icon(({
                                    src: require('../../dist/assets/images/geo/halfOrganization.png'),
                                    opacity:1
                                }))
                            }),
                        'multi':new Style({
                                    image: new Icon(({
                                        src: require('../../dist/assets/images/geo/Organization.png'),
                                        opacity:1
                                    }))
                                })
                    },
                    "event":{
                        '-1':new Style({
                                image : new CircleStyle({
                                    radius : 3,
                                    fill : new Fill({
                                        color : mthis.diePointColor //'#33ffff'
                                    })
                                }),
                                stroke: new Stroke({
                                    width: 3,
                                    color: mthis.diePointColor
                                }),
                                fill: new Fill({
                                    color: mthis.diePointColor
                                })
                            }),
                        '0':new Style({
                                image : new CircleStyle({
                                    radius : 3,
                                    fill : new Fill({
                                        color : mthis.halflifePointColor //'#33ffff'
                                    })
                                }),
                                stroke: new Stroke({
                                    width: 3,
                                    color: mthis.halflifePointColor
                                }),
                                fill: new Fill({
                                    color: mthis.halflifePointColor
                                })
                            }),
                        'multi':new Style({
                                    image : new CircleStyle({
                                        radius : 5,
                                        fill : new Fill({
                                            color : mthis.lifePointColor //'#33ffff'
                                        })
                                    }),
                                    stroke: new Stroke({
                                        width: 5,
                                        color: mthis.lifePointColor
                                    }),
                                    fill: new Fill({
                                        color: mthis.lifePointColor
                                    })
                                })
                    },
                    "geoGoal":{
                        '-1':new Style({
                                image: new Icon(({
                                    src: require('../../dist/assets/images/geo/orgNoSelected.png'),
                                    opacity:1
                                }))
                            }),
                        '0': new Style({
                                image: new Icon(({
                                    src: require('../../dist/assets/images/geo/halfOrganization.png'),
                                    opacity:1
                                }))
                            }),
                        'multi':new Style({
                                    image: new Icon(({
                                        src: require('../../dist/assets/images/geo/Organization.png'),
                                        opacity:1
                                    }))
                                })
                    }
                }
                var HLAreaStyle = new Style({
                    fill: new Fill({ //矢量图层填充颜色，以及透明度
                        color: 'rgba(51, 255, 255, 0.3)'
                    }),
                    stroke: new Stroke({ //边界样式
                        color: 'rgba(51, 255, 255, 1)',
                        width: 3
                    })
                });
                mthis.qbMap = new map('mainMap');
                mthis.qbMap.init();
                var HLAreaSource = new VectorSource({});
                var HLArealayer = new VectorLayer({  //高亮地区图层
                    source: HLAreaSource,
                    style:HLAreaStyle,
                    id:'HLAreaLayer'
                });
                
                var QBlayer = new VectorLayer({  //
                    source: new VectorSource({
                    }),
                    id:'QBLayer',
                    style:mthis.QBStyleFunction,
                });
                
                var heatMapLayer = new Heatmap({  //热力图层
                    source: new VectorSource({
                    }),
                    blur: 15,
                    radius: mthis.radius,
                    weight:mthis.weightFunction,
                    renderModed:'image',
                    id:'heatmapLayer',
                    visible:false,
                    gradient:['#00f', '#0ff', '#0f0', '#ff0', '#f00']
                })
                mthis.qbMap.addLayer(HLArealayer);
                mthis.qbMap.addLayer(QBlayer);
                mthis.qbMap.addLayer(heatMapLayer);
                mthis.qbMap.addRightClickInLayer(QBlayer,mthis.rightClickFun);  //添加HLArealayers上的右键点击事件

                mthis.selectPointerMove = new Select({
                    condition: pointerMove,
                    layers:[QBlayer],
                    filter:mthis.pointerMoveselectfilterFun,
                    style:mthis.selectfilterStyleFun   
                });
                mthis.selectClick = new Select({
                    condition: click,
                    layers:[QBlayer,HLArealayer],
                    filter:mthis.clickselectfilterFun,
                    style:new Style({
                        fill: new Fill({ //矢量图层填充颜色，以及透明度
                            color: 'rgba(51, 255, 255, 0.0)'
                        }),
                        stroke: new Stroke({ //边界样式
                            color: 'rgba(51, 255, 255, 0)',
                            width: 0
                        })
                    })
                });
                mthis.qbMap.addInteraction(mthis.selectPointerMove);
                mthis.qbMap.addInteraction(mthis.selectClick);
                mthis.selectPointerMove.on('select', function(e) {
                    var selectFeatures = e.selected
                    var deselectFeatures = e.deselected
                    if(deselectFeatures.length > 0){
                        for(let i = 0; i < deselectFeatures.length; i++){
                            if(deselectFeatures[i].getId().split('&')[0] === 'event'){
                                if(mthis.pointMoveListenerKey !== null && mthis.pointMoveListenerKey.type !== undefined && mthis.pointMoveListenerKey.type === "postcompose"){
                                    unByKey(mthis.pointMoveListenerKey);
                                }
                                mthis.removeOverlays('pointMoveOverlay_Event');
                            } else {
                                setTimeout(function(){
                                    mthis.removeOverlays('pointMoveOverlay_Org');
                                },100)
                            }
                        }
                    }
                    if(selectFeatures.length > 0){
                        for(let i = 0; i < selectFeatures.length; i++){
                            if(selectFeatures[i].getId().split('&')[0] === 'event'){
                                //mthis.pointSelectedAnimation(selectFeatures[i],'pointMove');
                                //鼠标悬浮时的信息框
                                mthis.setPointMoveOverlay_Event(selectFeatures[i]);
                            } else {
                                setTimeout(function(){
                                    mthis.setPointMoveOverlay_Org(selectFeatures[i]);
                                },100)
                            }
                        }
                    }
                });
                mthis.selectClick.on('select', function(e) {
                    mthis.deleteSelectClickFeatures();
                    var selectFeatures = e.selected;
                    var deselectFeatures = e.deselected;
                    var num = 0;
                    
                    if(deselectFeatures.length > 0){
                        var paramFeatures = [];
                        for(let i = 0; i < selectFeatures.length; i++){
                            let feature = selectFeatures[i];
                            var id = feature.getId();
                            let index = id.indexOf('&');
                            if(index != -1){
                                paramFeatures.push(feature);
                            }
                        }
                        if(paramFeatures.length > 0){
                            paramFeatures.forEach(function(feature){
                                /* mthis.setFeatureStatus(feature,'die'); */
                                feature.set('selectedNum',-1,false);
                                mthis.geometrySelectedQBIds = [];
                            })
                        }
                    }
                    if(selectFeatures.length > 0){
                        //mthis.deleteSelectClickFeatures();
                        var HLIds = mthis.HLIds;
                        var paramIds = [];
                        for(let i = 0; i < selectFeatures.length; i++){
                            var id = selectFeatures[i].getId();
                            let index = id.indexOf('&');
                            if(index != -1){
                                //let oId = id.split('&')[1];
                                paramIds.push(id);
                            }
                        }
                        if(paramIds.length > 0){
                            mthis.geometrySelectedQBIds = [];
                            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
                            if(features.length > 0){
                                features.forEach(function(item) {
                                    var isIN = false;
                                    for(var i = 0; i < paramIds.length; i++){
                                        var featureId = paramIds[i];
                                        var itemId = item.getId();
                                        if (itemId === featureId) {
                                            isIN = true;
                                            break;
                                        }
                                    }
                                    if(isIN){
                                        item.get('Params').forEach(function(Iitem){
                                            mthis.$set(mthis.geometrySelectedQBIds,num,Iitem.id);
                                            num++;
                                        })
                                        var selectedNum = item.get('Params').length;
                                        item.set('selectedNum',selectedNum,false)
                                    } else{
                                        item.set('selectedNum',-1,false)
                                    }
                                });
                            }
                            /* Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                                var layerId = mthis.AllLayerList_conf[key].layerId;
                                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                                if(features.length > 0){
                                    features.forEach(function(item) {
                                        var isIN = false;
                                        for(var i = 0; i < paramIds.length; i++){
                                            var featureId = paramIds[i];
                                            var itemId = item.getId();
                                            if (itemId === featureId) {
                                                isIN = true;
                                                break;
                                            }
                                        }
                                        if(isIN){
                                            item.get('Params').forEach(function(Iitem){
                                                mthis.$set(mthis.geometrySelectedEventIds,num,Iitem.id);
                                                num++;
                                            })
                                            mthis.setFeatureStatus(item,'life');
                                        } else{
                                            mthis.setFeatureStatus(item,'die');
                                        }
                                    });
                                }
                            }) */
                        } else {
                            for(let i = 0; i < selectFeatures.length; i++){
                                var feature = selectFeatures[i];
                                var status = feature.get("status");
                                var id = feature.getId();
                                var index = util.itemIndexInArr(id,mthis.AreaIds);
                                if(status === undefined){
                                    feature.setProperties({"status":"die"}, false)
                                    mthis.setAreaStyle(feature,'die');
                                    if(index !== -1){
                                        mthis.AreaIds.splice(index,1);
                                    }
                                } else if(status === "life"){
                                    feature.setProperties({"status":"die"}, false)
                                    mthis.setAreaStyle(feature,'die');
                                    if(index !== -1){
                                        mthis.AreaIds.splice(index,1);
                                    }
                                } else{
                                    feature.setProperties({"status":"life"}, false)
                                    mthis.setAreaStyle(feature,'life');
                                    if(index === -1){
                                        mthis.AreaIds.push(id);
                                    }
                                }
                            }
                        }
                    }
                });
            }  
        },
        setAreaStyle(feature,status){
            var mthis = this;
            var lifeStyle = new Style({
                        fill: new Fill({ //矢量图层填充颜色，以及透明度
                            color: 'rgba(51, 255, 255, 0.3)',
                            
                        }),
                        stroke: new Stroke({ //边界样式
                            color: 'rgba(51, 255, 255, 1)',
                            width: 3
                        })
                    })
            var dieStyle = new Style({
                    fill: new Fill({ //矢量图层填充颜色，以及透明度
                        color: 'rgba(51, 255, 255, 0.3)'
                    }),
                    stroke: new Stroke({ //边界样式
                        color: 'rgba(51, 255, 255, 1)',
                        width: 1
                    })
            })
            if(status === "life"){
                feature.setStyle(lifeStyle);
            }else{
                feature.setStyle(dieStyle);
            }
        },
        location_cilck(){
            var mthis = this
            //mthis.clickButtonOpenDiv('location_AT')
            mthis.legend = null
            mthis.addlocationLayer();
        },
        getAllFeatures(){
            var mthis = this;
            var features = [];
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var Lfeatures = mthis.getLayerById(layerId).getSource().getFeatures();
                features.concat(Lfeatures);
            })
            return features;
        },
        setPointMoveOverlay_Org(feature){
            var mthis = this;
            var overlayId = 'pointMoveOverlay_Org';
            var ovdiv = document.createElement('div');
            ovdiv.style ='background-color: rgba(0,51,51,0.8);border-radius: 5px;';
            var conLabel = document.createElement('div');
            conLabel.style = 'padding: 5px 10px;';
            ovdiv.appendChild(conLabel);
            var Ap = document.createElement('p');
            conLabel.appendChild(Ap);
            Ap.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';
            var orgNum = feature.get('selectedNum');
            
            if(orgNum === 1){
                var name = ''
                var params =feature.get('Params');
                for(let i = 0; i < params.length; i++){
                    for(let j = 0; j < mthis.HLIds.length; j++){
                        if(params[i].id === mthis.HLIds[j]){
                            name = params[i].OrgName;
                            break;
                        }
                    }
                    if(name !== ''){
                        Ap.innerHTML = "机构名：" + name;
                        break;
                    }
                }
                //Ap.innerHTML = "机构名：" + feature.get('Params')[0].OrgName;
            } else {
                Ap.innerHTML = "机构数：" + feature.get('selectedNum');
            }
            
            var overlayId = mthis.setOverlay(feature.getGeometry().flatCoordinates,ovdiv,overlayId,'top-left');
            mthis.qbMap.map.addOverlay(overlayId);
        },
        setPointMoveOverlay_Event(feature){
            var mthis = this;
            var overlayId = 'pointMoveOverlay_Event';
            var ovdiv = document.createElement('div');
            ovdiv.style ='background-color: rgba(0,51,51,0.8);border-radius: 5px;';
            var conLabel = document.createElement('div');
            conLabel.style = 'padding: 5px 10px;';
            ovdiv.appendChild(conLabel);
            /* var Lp = document.createElement('p');
            conLabel.appendChild(Lp);
            Lp.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';
            Lp.innerHTML = feature.get('locationName'); */
            var Ap = document.createElement('p');
            conLabel.appendChild(Ap);
            Ap.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';

            var orgNum = feature.get('selectedNum');
            if(orgNum === 1){
                var name = ''
                var Entitites = '';
                var eventType = '';
                var locationName = feature.get('locationName') ? feature.get('locationName') : '';
                var params =feature.get('Params');
                for(let i = 0; i < params.length; i++){
                    var isHas = false;
                    for(let j = 0; j < mthis.HLIds.length; j++){
                        if(params[i].id === mthis.HLIds[j]){
                            eventType = params[i].eventType;
                            isHas = true
                            break;
                        }
                    }
                    if(isHas){
                        Ap.innerHTML = "事件：" + params[i].eventType;
                        break;
                    }
                }
            } else {
                Ap.innerHTML = "事件数：" + orgNum;
            }
            //Ap.innerHTML = "事件：" + feature.get('selectedNum');
            var overlayId = mthis.setOverlay(feature.getGeometry().flatCoordinates,ovdiv,overlayId,'top-left');
            mthis.qbMap.map.addOverlay(overlayId);
        },
        returnSelectedEventIds(Data){
            var mthis = this;
            var EventIds = [];
            Data.forEach(function(item){
                EventIds.push(item.EventId);
            })
            var selectedParam = {
                'type':'mapView',
                eventId:EventIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedParam);
        },
        setEventsLayerAndSource(features){
            var mthis = this
            

        },
        pointSelectedAnimation(feat,listenerKey){
            var mthis = this;
                var feature = feat;
                var start = new Date().getTime();
                var map = this.qbMap.map;
                //地图渲染事件 
                if(listenerKey === 'pointMove'){
                    mthis.pointMoveListenerKey = map.on('postcompose', animate);     
                }  else if(listenerKey === 'pointClick'){
                    mthis.pointClickListenerKey = map.on('postcompose', animate);     
                }
                // mthis.pointMoveListenerKey = map.on('postcompose', animate);     
                //listenerKey = map.on('postcompose', animate); 
	             
                function animate(event){
                    var duration = 3000;
                    var vectorContext = event.vectorContext;
                    var frameState = event.frameState;
                    var flashGeom = feature.getGeometry().clone();
                    var timeDis = frameState.time - start;

                    var changeBigNum = feature.getStyle().getImage().getRadius() * 1.2;
                    var changeBigStyle = new Style({//设置样式
                        image : new CircleStyle({
                            radius : changeBigNum,
                            fill : new Fill({
                                color : mthis.lifePointColor
                            })
                        })
                    });
                    vectorContext.setStyle(changeBigStyle);
                    vectorContext.drawGeometry(flashGeom);

                    var elapsed = (timeDis) % duration;
                    var elapsedRatio1 = elapsed / duration;
                    var radius1 = easeOut(elapsedRatio1) * 10 + changeBigNum;
                    var opacity1 = easeOut(1 - elapsedRatio1);
                    var style1 = new Style({//设置样式
                        image: new CircleStyle({
                            radius: radius1,
                            snapToPixel: false,
                            stroke: new Stroke({
                            color: 'rgba(255,153,0, ' + opacity1 + ')',
                            width: 0.25 + opacity1
                            })
                        })
                    });
                    vectorContext.setStyle(style1);
                    vectorContext.drawGeometry(flashGeom);
                    if(timeDis > 1000){
                        var elapsed2 = (timeDis - 1000) % duration;
                        var elapsedRatio2 = (elapsed2) / duration;
                        var radius2 = easeOut(elapsedRatio2) * 10 + changeBigNum;
                        var opacity2 = easeOut(1 - elapsedRatio2);
                        var style2 = new Style({//设置样式
                            image: new CircleStyle({
                                radius: radius2,
                                snapToPixel: false,
                                stroke: new Stroke({
                                color: 'rgba(255,153,0, ' + opacity2 + ')',
                                width: 0.25 + opacity2
                                })
                            })
                        });
                        vectorContext.setStyle(style2);
                        vectorContext.drawGeometry(flashGeom);
                    }
                    if(timeDis > 2000){
                        var elapsed3 = (timeDis - 2000) % duration;
                        var elapsedRatio3 = (elapsed3) / duration;
                        var radius3 = easeOut(elapsedRatio3) * 10 + changeBigNum;
                        var opacity3 = easeOut(1 - elapsedRatio3);
                        var style3 = new Style({//设置样式
                            image: new CircleStyle({
                                radius: radius3,
                                snapToPixel: false,
                                stroke: new Stroke({
                                color: 'rgba(255,153,0, ' + opacity3 + ')',
                                width: 0.25 + opacity3
                                })
                            })
                        });
                        vectorContext.setStyle(style3);
                        vectorContext.drawGeometry(flashGeom);
                    }
                    // tell OL3 to continue postcompose animation                  	
                    map.render();  
                }  
	    },
        hasDataInSource(targetSource){
            var features = targetSource.getFeatures();
            if(features.length > 0){
                return true;
            } else {
                return false;
            }
        },
        route_cilck(){
            var mthis = this
            //mthis.clickButtonOpenDiv('route_HSD')
            if(mthis.legend == null){
                //mthis.click_route()
            }
            
        },
        setPointFeatures(pointsDataJson){
            var mthis = this
            var layer = new VectorLayer({
                source: new VectorSource({
                    // features:Feature,
                    //url: '',
                    features: (new GeoJSON()).readFeatures(eventsPointGeoJson),
                    format: new GeoJSON()
                }),
                style:mthis.noSelectedstyle,
                id:'eventsPointsLayer'
            });
            mthis.qbMap.addlayer(layer);
            mthis.geometrySelectedFeatures = mthis.getLayerById('eventsPointsLayer').getSource().getFeatures();
        },
        locationPoints(){
            var mthis = this
            var map = mthis.qbMap.map
            if(map.getOverlays().getArray().length > 0){
                var localtion_OverlopArr = map.getOverlays().getArray();	
                for(var i = map.getOverlays().getArray().length -1 ; i >=0; i--){
                    if(localtion_OverlopArr[i].getId() == 'localtion_Overlay'){
                        map.removeOverlay(localtion_OverlopArr[i]);
                    }
                }
            }
            //先获取实体点的坐标
            var provinName;
            var contryName;
            var Coor;
            var features = mthis.getLayerById("eventsPointsLayer").getSource().getFeatures();
            features.forEach(function(item,index){
                Coor = item.getGeometry().getCoordinates();
                var viewResolution=mthis.qbMap.map.getView().getResolution();
                var url=mthis.provinTilSource.getGetFeatureInfoUrl(
                        Coor,viewResolution,'EPSG:4326',
                        {
                            'INFO_FORMAT': 'application/json',
                            'FEATURE_COUNT': 1
                        }
                );
                if(url){
                    $.ajax({
                            url: url,
                            async: false,
                            dataType: 'json',
                            success: function(data) {
                                if (data.features.length > 0) {
                                    //解析geojson结果
                                    var feature = data.features[0];
                                    //获取wms服务中想要的属性
                                    provinName = feature.properties.name;
                                    //contryName = feature.properties.admin;
                                } else {
                                }
                            }
                        });
                };
                var conLabel = document.createElement('div');
                var Lp = document.createElement('p');
                conLabel.appendChild(Lp);
                Lp.style = 'color:#ccffff;padding-left:10px;margin:0px;font-family: Arial;font-size: 10px;';
                //Lp.innerHTML = provinName + ' - ' + contryName;
                Lp.innerHTML = provinName;
                var Id = 'localtion_Overlay_'+ item.getProperties().properties.belongId;
                var localtion_Overlay = mthis.setOverlay(Coor,conLabel,Id,'center-left');
                map.addOverlay(localtion_Overlay);
                map.render();
            });
            
        },
        creatPicSlider(){
            var mthis = this
            $('.flexslider').flexslider({
                animation: "slide",
                animationLoop: false,
                mousewheel: true,
                itemWidth: 50,
                minItems: 1,
                maxItems: 16
            });
        },
        offImgClick(id){  
            var mthis = this
            var entityPointstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.entityPointsColor
                    })
                })
            });
            var idImg = id + '_imgslider';
            var element = document.getElementById(idImg);
            element.children[0].style.border = '';
            element.children[0].style.width = '46px';
            element.children[0].style.height = '46px';
            element.children[0].style.boxShadow = '';
            //element.children[1].style.color = 'rgba(24,255,255,0.5)';
            var idN = 'pointAnimation_' + id;
            //mthis.removeOverlays(idN);
            var layer = mthis.qbMap.map.getLayers().getArray();
            for(var i = 0; i < layer.length; i++){
                if(layer[i].getProperties().id == 'eventsPointsLayer'){
                    var features = layer[i].getSource().getFeatures();//.getProperties().properties.belongId
                    features.forEach(function(ItemF){
                        if(ItemF.getProperties().properties.belongId == id){
                            ItemF.setStyle(entityPointstyle);
                            //mthis.deleteArrItem(imgSelectedEntityPoints,ItemF);
                        }
                    });
                    break;
                }
            } 
        },
        onImgClick(id){
            var mthis = this;
            var entityPointstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.entityPointsColor
                    })
                })
            });
            var entityPoints = mthis.getLayerById("eventsPointsLayer").getSource().getFeatures();
            var returnId = [];
            var idImg = id + '_imgslider';
            var element = document.getElementById(idImg);
            element.children[0].style.border = '2px solid rgba(204, 255, 255, 1)';
            element.children[0].style.width = '50px';
            element.children[0].style.height = '50px';
            element.children[0].style.boxShadow = '#3ff 0px 0px 7px 3px';
            //element.children[1].style.color = 'rgb(204, 255, 255)';
            if(mthis.frameSelectedEntityPoints.length == 0){  //判断是否有过拉框选择
                entityPoints.forEach(function(item) {
                    if (item.getProperties().properties.belongId == id) {
                        mthis.pointAnimation(item);
                        returnId.push(item.getProperties().properties.name);
                        //imgSelectedEntityPoints.push(item);
                    }
                });
            } else {
                entityPoints.forEach(function(item) {
                    if (item.getProperties().properties.belongId == id) {  //判断实体点的id时候为我们需要点亮的点的id
                        if(mthis.isPointInPointsArr(item,mthis.frameSelectedEntityPoints)){  //判断点是否在拉框选择的范围内
                            mthis.setpointStyle(item,mthis.frameSelectedColor);
                            mthis.pointAnimation(item);
                            //imgSelectedEntityPoints.push(item);
                            returnId.push(item.getProperties().properties.name);
                        } else {
                            mthis.pointAnimation(item);
                        }
                    } else {
                        if(mthis.isPointInPointsArr(item,mthis.frameSelectedEntityPoints)){
                            if(!mthis.isPointAnimation(item)){
                                item.setStyle(entityPointstyle);
                            }
                        }
                    }
                });
            }
        },
        drawExplore(object){
            var mthis = this
            var mapDiv = document.getElementById('mainMap')
            mapDiv.style.cursor = 'crosshair';
            //矢量图层是用来渲染矢量数据的图层类型，在OpenLayers里，它是可以定制的，可以控制它的透明度，颜色，以及加载在上面的要素形状等。
            var Vecsource = new VectorSource({
                features : new Collection()
            });
            var polygonLayer = new VectorLayer({
                source : Vecsource
            });
            mthis.qbMap.addLayer(polygonLayer);
            var opt = object.currentTarget;
            var id = opt.id.split('&')[0];
            var typeValue = '';
            var geometryFunction;
            if(opt.id === 'RectangleExplore_AT'){
                typeValue = 'rectangle';
            } else if(opt.id === 'CircleExplore_AT'){
                typeValue = 'Circle';
            } else {
                typeValue = 'Polygon'
            }
            if (typeValue != "None") {
                if (typeValue == "rectangle") {
                    typeValue = 'Circle'; // 设置绘制类型为LineString
                    geometryFunction = createBox();
                }
                // 实例化图形绘制控件对象并添加到地图容器中
                var exploreDraw = new Draw({
                    source: Vecsource,
                    type: typeValue,                                // 几何图形类型
                    geometryFunction: geometryFunction,              // 几何信息变更时的回调函数
                    style: new Style({
                        fill: new Fill({ //矢量图层填充颜色，以及透明度
                            color: 'rgba(51, 255, 255, 0.3)',
                        }),
                        stroke: new Stroke({ //边界样式
                            color: 'rgba(51, 255, 255, 1)',
                            width: 3
                        })
                    })
                });
                mthis.drawExploreGeo(exploreDraw)
                mthis.qbMap.addInteraction(exploreDraw);
            } 
            mthis.qbMap.removeLayer(polygonLayer);
        },
        drawExploreGeo(draw){
            var mthis = this;
            draw.on('drawend', function(obj) {
                var feature = obj.feature;
                var source = mthis.getLayerById('HLAreaLayer').getSource();
                var geometry = feature.getGeometry();
                if(geometry.getType() === 'Circle'){
                    geometry = fromCircle(geometry,64)
                }
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                var drawFeature = new Feature({
                    geometry: new Polygon(geometry.getCoordinates()),
                });
                var id = 'custom.' + drawFeature.ol_uid;
                drawFeature.setId(id);
                source.addFeature(drawFeature);
                mthis.qbMap.removeInteraction(draw);
                mthis.allAreaIds.push(id);
                mthis.AreaIds.push(id);
                mthis.qbMap.map.getView().animate({
                    center: getCenter(geometry.getExtent()),
                    duration: 1000
                });
                mthis.qbMap.map.render();
            });
        },
        exploreQB(geometryArr,type){
            var mthis = this;
            var url = '';
            var promptType = ''
            var num = 0;
            var allIds = [];
            if(type === 'Event'){
                url = 'http://10.60.1.141:5100/exploreEvent/'
                //url = 'http://localhost:5000/exploreEvent/'
                promptType = '事件数';
            } else if(type === 'Org'){
                url = 'http://10.60.1.141:5100/exploreOrg/'
                //url = 'http://localhost:5000/exploreOrg/'
                promptType = '组织机构数';
            } else if(type === 'GeoTar'){
                url = 'http://10.60.1.141:5100/exploreGeoTar/'
                //url = 'http://localhost:5000/exploreGeoTar/'
                promptType = '地理目标数';
            }
            mthis.geometrySelectedQBIds = [];
            var num = geometryArr.length;
            mthis.cancelSelectQB();
            for(let i = 0; i < num; i++){
                mthis.waiting();
                var geometry = geometryArr[i];
                mthis.$http.post(url, {
                    'geometry':[geometry]
                }).then(response => {
                    var Ids = [];
                    var OrgGeojson = response.body.data.Features;
                    var addfeatures = (new GeoJSON()).readFeatures(OrgGeojson);
                    for(let i = 0; i < addfeatures.length; i++){
                        let feature = addfeatures[i];
                        let featureId = feature.getId();
                        let params = feature.get('Params');
                        for(let j = 0; j < params.length; j++){
                            let param = params[j];
                            let id = param.id;
                            mthis.QBIdsToFeatureIdList[id] = featureId;
                            //mthis.geometrySelectedQBIds.push(id)
                            Ids.push(id);
                        }
                    }
                    allIds = mthis.asynAddgeometrySelectedQBIds(Ids,allIds,num);
                    mthis.qbMap.addFeatures(addfeatures,'QBLayer');
                    /* mthis.qbMap.addFeatures(addfeatures,'heatmapLayer'); */
                    mthis.hide(num);
                },function(error){
                    alert("探索失败!");
                    mthis.hide(num);
                })
            }
        },
        asynAddgeometrySelectedQBIds(ids,allIds,count){
            var mthis = this;
            /* var allIds = []; */
            var a = [];
            if(mthis.asynAddIdsCount === count){
                a = allIds.concat(ids);
                mthis.geometrySelectedQBIds = a;
                mthis.asynAddIdsCount = 1;
                return a;
            } else {
                a = allIds.concat(ids);
                mthis.asynAddIdsCount++;
                return a;
            }
        },
        cancelSelectQB(){
            var mthis = this;
            var existQBfeatures = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            for(let i = 0; i < existQBfeatures.length; i++){
                let feature = existQBfeatures[i];
                feature.set('selectedNum',-1,false)
            }
        },
        startAnimation(feature) { 
            var mthis = this;
            if(feature.getGeometry().getType() !== 'MultiLineString'){
                return;
            }
            var id = feature.getId();
            var map = mthis.qbMap.map;
            if(mthis.AnimationFun[id]){
                map.on('postcompose', mthis.AnimationFun[id]);
                return;
            }
            var now = new Date().getTime();
            var speed = 0.01;
            var n = 48;
            var lineStringArr = feature.getGeometry().getLineStrings();
            var moveFeature = function(event) {
                var vectorContext = event.vectorContext;
                var frameState = event.frameState;
                var elapsedTime = frameState.time - now;
                var index = Math.ceil((speed * elapsedTime) % n);
                var pointmoveTailStyle = {
                        'carStyle' : new Style({
                            image : new Icon(({
                                src : require('../../dist/assets/images/geo/arrow.png'),
                                anchor: [0.5, 0.5],
                                scale: 0.2
                            }))
                        })
                };
                var pointmoveTailStyle2 = new Style({
                    image : new CircleStyle({
                        radius : 0.5,
                        snapToPixel : false,
                        fill : new Fill({
                            color : 'rgba(255,255,255,0.3)'
                        })
                    })
                });
                lineStringArr.forEach(function(Item) {
                    var item = Item.getCoordinates();
                    /* if (index > 1) {
                        var dx = item[index -1][0] - item[index - 2][0];
                        var dy = item[index -1][1] - item[index - 2][1];
                        var rotation = -Math.atan2(dy, dx);
                        //pointmoveTailStyle.carStyle.getImage().setRotation(rotation);
                        var currentPoint = new Point(item[index]);
                        var feature = new Feature(currentPoint);
                        vectorContext.drawFeature(feature, pointmoveTailStyle.TailStyle);
                    } */
                    var a = (index > 10) ? 10 : index;
                    for(var i = 0; i<a; i++){
                        var radius = (5 - i) > 1 ? (5 - i) : 1;
                        var opacity = 1 - i/10;
                        //pointmoveTailStyle.TailStyle.getImage().setRadius(radius);
                        var style = new Style({
                            image : new CircleStyle({
                                radius : radius,
                                snapToPixel : false,
                                fill : new Fill({
                                    color : 'rgba(255,255,255,' + opacity + ')'
                                })
                            })
                        })
                        var currentPoint = new Point(item[index - i]);
                        var feature = new Feature(currentPoint);
                        vectorContext.drawFeature(feature, style);
                    }
                });
                map.render();
            }
            mthis.AnimationFun[id] = moveFeature
            map.on('postcompose', mthis.AnimationFun[id]);
        },
        stopAnimation(feature){
            var mthis = this;
            var type = feature.getGeometry().getType();
            if(type !== 'MultiLineString'){
                return;
            }
            var map = mthis.qbMap.map;
            var id = feature.getId();
            map.un('postcompose', mthis.AnimationFun[id]);
        },
        changedrawType(object){
            var mthis = this
            var mapDiv = document.getElementById('mainMap')
            mapDiv.style.cursor = 'crosshair';
            mthis.qbMap.removeInteraction(mthis.draw);
            mthis.qbMap.removeInteraction(mthis.selectPointerMove);
            mthis.qbMap.removeInteraction(mthis.selectClick);
            //map.removeInteraction(mthis.selectClick_area);
            //矢量图层是用来渲染矢量数据的图层类型，在OpenLayers里，它是可以定制的，可以控制它的透明度，颜色，以及加载在上面的要素形状等。
            var Vecsource = new VectorSource({
                features : new Collection()
            });
            mthis.polygonLayer = new VectorLayer({
                source : Vecsource
            });
            mthis.qbMap.addLayer(mthis.polygonLayer);
            var opt = object.currentTarget;
            var typeValue = opt.id.split('_')[0];
            var geometryFunction;
            if (typeValue != "None") {
                if (typeValue == "rectangle") {
                    typeValue = 'Circle'; // 设置绘制类型为LineString
                    geometryFunction = createBox();
                }
                // 实例化图形绘制控件对象并添加到地图容器中
                mthis.draw = new Draw({
                    source: Vecsource,
                    type: typeValue,                                // 几何图形类型
                    geometryFunction: geometryFunction,              // 几何信息变更时的回调函数
                    style: new Style({
                        fill: new Fill({ //矢量图层填充颜色，以及透明度
                            color: 'rgba(51, 255, 255, 0.3)',
                            
                        }),
                        stroke: new Stroke({ //边界样式
                            color: 'rgba(51, 255, 255, 1)',
                            width: 3
                        })
                    })
                });
                mthis.draw_polygon(mthis.draw);
                mthis.qbMap.addInteraction(mthis.draw);
            } 
            mthis.qbMap.removeLayer(mthis.polygonLayer);
        },

        draw_polygon(draw) {
            var mthis = this
            /* draw.on('drawstart',function(){
                mthis.removeSelectedPoints();
            }); */
            draw.on('drawend', function(obj) {
                var feature = obj.feature;
                var geometry = feature.getGeometry();
                
                mthis.boxSelectedQB(geometry);
                mthis.timeSelectedEventIds.length = 0;
                mthis.staticsSelectedEventIds.length = 0;
                mthis.qbMap.map.removeInteraction(draw);
                mthis.deleteSelectClickFeatures();//清除Interaction中select的释放feature
                setTimeout(function(){
                    mthis.qbMap.addInteraction(mthis.selectPointerMove);
                    mthis.qbMap.addInteraction(mthis.selectClick);
                    //mthis.routeMap.map.addInteraction(mthis.selectClick_area);
                },1000)
                mthis.qbMap.map.getView().animate({
                    center: getCenter(geometry.getExtent()),
                    duration: 1000
                });
                mthis.qbMap.map.render();
            });
        },
        
        //颜色转换，移除被选择的实体点
        removeSelectedPoints(){
            var mthis = this
            var selectingPointSource = mthis.qbMap.getLayer("QBLayer").getSource();
            selectingPointSource.getFeatures().forEach(function(item){
                if(item.getStyle() !== null && item.getStyle().getImage().getFill().getColor() === 'rgba(102,153,153,1)'){
                    /* item.setStyle(mthis.noSelectedstyle); */
                    mthis.setFeatureStatus(item,'life');
                }
            });
        },
        //拉框选择实体点
        selectEventPointsByGeometry(geometry){   
            var mthis = this
            var frameselectedEventIds = [];
            mthis.geometrySelectedFeatures = [];
            var selectingPointSource = mthis.getLayerById("eventsPointsLayer").getSource();
            //mthis.selectedPointsSource.clear();
            selectingPointSource.getFeatures().forEach(function(item) {
                var coord = item.getGeometry().getCoordinates();
                var isIn = geometry.intersectsCoordinate(coord);
                if (isIn) {
                    mthis.geometrySelectedFeatures.push(item);
                    item.get('Params').forEach(function(Iitem){
                        frameselectedEventIds.push(Iitem.id);
                    })
                    
                } else {
                    item.setStyle(mthis.graystyle);
                }
            });
            return frameselectedEventIds
        },
        getStatusArrByVarietyFilter(rangeIds,fun){
            var mthis = this;
            var allSelectedIds = rangeIds;
            var layerIds = [];
            var lifeSelectedIds = [];
            var halflifeSelectedIds = [];
            var dieIds = [];
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                layerIds.push(mthis.AllLayerList_conf[key].layerId)
            })
            layerIds.forEach(function(layerId){
                var layer = mthis.getLayerById(layerId);
                var features = layer.getSource().getFeatures();
                for(let j = 0; j < features.length; j++){
                    let feature = features[j];
                    let featureId = feature.getId();
                    let isIn = fun(feature)
                    if(isIn){
                        let Params = feature.get('Params');
                        Params.forEach(function(param){
                            let paramId = param.id;
                            let index = util.itemIndexInArr(paramId,allSelectedIds)
                            if(index !== -1){
                                lifeSelectedIds.push(paramId)
                            } else {
                                dieIds.push(paramId);
                            }
                        })
                    } else {
                        let Params = feature.get('Params');
                        Params.forEach(function(param){
                            let paramId = param.id;
                            let index = util.itemIndexInArr(paramId,allSelectedIds)
                            if(index !== -1){
                                halflifeSelectedIds.push(paramId);
                            } else {
                                dieIds.push(paramId);
                            }
                        })
                    }
                }
            })
            return {
                'lifeSelectedIds':lifeSelectedIds,
                'halflifeSelectedIds':halflifeSelectedIds,
                'dieIds':dieIds
            }
        },
        setStatusByIds(featureIds,stats){
            let mthis = this;
            for(let i = 0; i < featureIds.length; i++){
                let featureId = featureIds[i];
                let layerId = mthis.getLayerIdByFeatureIdOrParamId(featureId);
                let feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                mthis.setFeatureStatus(feature,stats);
            }
        },

        boxSelectedQB(geometry){   
            var mthis = this
            var num = 0;
            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            if(features.length !== 0){
                var boxSelectedIds = [];
                features.forEach(function(item) {
                    var coord = item.getGeometry().getCoordinates();
                    var isIn = geometry.intersectsCoordinate(coord);
                    if (isIn) {
                        var params = item.get('Params')
                        var paramNum = params.length;
                        
                        params.forEach(function(param){
                            var id = param.id;
                            boxSelectedIds.push(id);
                        })
                        item.set('selectedNum',paramNum,false);
                        
                    } else {
                        item.set('selectedNum',-1,false)
                    }
                });
                mthis.geometrySelectedQBIds = boxSelectedIds;

            }
        },
        getFeatureIdsByParamIds(paramIds){
            var mthis = this;
            var featureIds = []
            for(let i = 0; i < paramIds.length; i++){
                var sId = paramIds[i];
                var oId = sId.split('&')[1]
                var layerId = mthis.getLayerIdByFeatureIdOrParamId(sId);
                var featureId = mthis.QBIdsToFeatureIdList[oId].featureId;
                var index = util.itemIndexInArr(featureId,featureIds)
                if(index == -1){
                    featureIds.push(featureId)
                }
            }
            return featureIds;
        },
        setSelectedEventFeatureParam(feature,isSelected){ //setSelectedEventFeatureParam(feature,selectType,isSelected){  
            var mthis = this;
            if(isSelected){
                //feature.setStyle(mthis.selectedstyle);
                mthis.setFeatureStatus(feature,'life');
                //feature.set(selectType,true,false)
            } else {
                mthis.setFeatureStatus(feature,'die');
                //feature.set(selectType,false,false)
            }
            
        },
        //setLifeOrDieOrgPointStyleByValue(){},
        setFeatureStatus(feature,pointStatus){  //pointStatus参数目前一共有三种情况，life、halflife、die
            var mthis = this;
            var id = feature.getId();
            var lifeSelectedstyle;
            var halflifeSelectedstyle;
            var dieSelectedstyle;
            var violentSelectedstyle;
            if(id.split('&')[0] ==='event'){
                var fRadius = 5;
                lifeSelectedstyle = new Style({
                    image : new CircleStyle({
                        radius : fRadius,
                        fill : new Fill({
                            color : mthis.lifePointColor //'#33ffff'
                        })
                    }),
                    stroke: new Stroke({
                        width: 3,
                        color: mthis.lifePointColor
                    }),
                    fill: new Fill({
                        color: mthis.lifePointColor
                    })
                });
                halflifeSelectedstyle = new Style({
                    image : new CircleStyle({
                        radius : fRadius,
                        fill : new Fill({
                            color : mthis.halflifePointColor //'#33ffff'
                        })
                    }),
                    stroke: new Stroke({
                        width: 3,
                        color: mthis.halflifePointColor
                    }),
                    fill: new Fill({
                        color: mthis.halflifePointColor
                    })
                });
                dieSelectedstyle = new Style({
                    image : new CircleStyle({
                        radius : 3,
                        fill : new Fill({
                            color : mthis.diePointColor //'#33ffff'
                        })
                    }),
                    stroke: new Stroke({
                        width: 3,
                        color: mthis.diePointColor
                    }),
                    fill: new Fill({
                        color: mthis.diePointColor
                    })
                });
                violentSelectedstyle = new Style({
                    image : new CircleStyle({
                        radius : 7,
                        fill : new Fill({
                            color : mthis.lifePointColor //'#33ffff'
                        })
                    }),
                    stroke: new Stroke({
                        width: 3,
                        color: 'red'
                    }),
                    fill: new Fill({
                        color: 'red'
                    })
                });
                var geometryType = feature.getGeometry().getType();
                if(geometryType === 'MultiLineString'){  //如果feature是线事件，开启和关闭animation
                    if(pointStatus === 'life'){
                        mthis.startAnimation(feature);
                    } else if(pointStatus === 'die') {
                        mthis.stopAnimation(feature);
                    } else if(pointStatus === 'halflife') {
                        mthis.stopAnimation(feature);
                    } else if(pointStatus === 'violent'){
                        feature.setStyle(violentSelectedstyle);
                    }
                }
            } else {
                lifeSelectedstyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/Organization.png'),
                        opacity:1
                    }))
                });
                halflifeSelectedstyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/halfOrganization.png'),
                        opacity:0.99
                    }))
                });
                dieSelectedstyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/orgNoSelected.png'),
                        opacity:0.98
                    }))
                });
                violentSelectedstyle = new Style({
                    image: new Icon(({
                        src: require('../../dist/assets/images/geo/violentOrganization.png'),
                        opacity:1
                    }))
                });
            }
            if(pointStatus === 'life'){
                    feature.setStyle(lifeSelectedstyle);
                } else if(pointStatus === 'die') {
                    feature.setStyle(dieSelectedstyle);
                } else if(pointStatus === 'halflife') {
                    feature.setStyle(halflifeSelectedstyle);
                } else if(pointStatus === 'violent'){
                    feature.setStyle(violentSelectedstyle);
                }
        },
        //==========================================================================
        //路径
        click_route(){
            var mthis = this;
            //mthis.legend = 
            var legendD = [];
            mthis.test_Route.forEach(function(item){
                var Litem = {
                    'id':item.id,
                    'name':item.name
                };
                legendD.push(Litem);
            });
            mthis.legend = legendD;
        },
        creatRouteLine(Route){
            var mthis = this;
            var Route_source = new VectorSource({
            });
            var Route_layer = new VectorLayer({
                source : Route_source,
                style : new Style({
                        stroke : new Stroke({
                            color : mthis.routeColors[Route.id],
                            width : 2
                        })
                    })
            });
            mthis.qbMap.map.addLayer(Route_layer);
            var routes = mthis.routeOrder(Route.route);
            var BezierPointsArr = [];//贝塞尔曲线路径
            routes.forEach(function(item){
                var A = item.coor[0];
                var C = item.coor[1];
                var B = getThirdPoint(A,C);  //使用策略根据AB两个点生成C点
                var Bl = new BezierLinePoints(A.concat(B).concat(C));
                var BezierPoints = Bl.getBezierPoints(mthis.n);
                BezierPointsArr.push(BezierPoints);
                mthis.createRouteFeatures(BezierPoints, item.mes, Route_source, Route.id);//生成路径
            });
            var BezierPointsObj = {
                    'belongRouteId':Route.id,
                    'BezierRoutePoints':BezierPointsArr};//贝塞尔曲线路径
            if(mthis.BezierPointsObjsArr.length == 0){//判断BezierPointsObj是否已经存在
                mthis.BezierPointsObjsArr.push(BezierPointsObj);
            } else{
                if(mthis.BezierPointsObjsArr.find(function(obj){return obj.belongRouteId === Route.id;})){
                    
                } else {
                    mthis.BezierPointsObjsArr.push(BezierPointsObj);
                }
            }
            //routeCharacPoints(Route,'point_animation_',routeColors[Route.id]);//路径特征点扩散效果
            mthis.lastPointArrow(BezierPointsObj);//将每条贝赛尔曲线的最后一个点设置成箭头样式
            //startAnimation(BezierPointsObj);//轨迹回放
            mthis.mapPointerMove();//鼠标移动事件
        },
        routeOrder(dataJson){
            var mthis = this
            var routeOrderArr = dataJson.sort(mthis.compare);
            var res = [];
            for(var i = 0; i < routeOrderArr.length - 1; i++){
                var fromCoord = routeOrderArr[i].coordinate;
                var toCoord = routeOrderArr[i + 1].coordinate;
                var message = 'From: ' + routeOrderArr[i].name + ' To: ' + routeOrderArr[i + 1].name;
                res.push({'mes':message,coor:[fromCoord, toCoord]});
            }
            return res;
        },
        //添加路径曲线
        createRouteFeatures(Routepoints, message, Route_source, routeId){
            var RouteFeature = new Feature({
                geometry:new LineString(Routepoints),
                attributes:{mes:message},
                belongId:routeId
            });
            Route_source.addFeature(RouteFeature);
        },

        /**
         * @param 设置最后一个点为箭头样式
         */
        lastPointArrow(routePointsObj) {
            var mthis = this;
            var n = mthis.n;
            var vectorSource = new VectorSource({
            });

            var vectorLayer = new VectorLayer({
                source : vectorSource
            });

            routePointsObj.BezierRoutePoints.forEach(function(item) {
                // var item = Item.BezierPoints;
                var lastPointCoor = item[n - 1];
                var dx = item[n - 1][0] - item[n - 2][0];
                var dy = item[n - 1][1] - item[n - 2][1];
                var rotation = -Math.atan2(dy, dx);
                var iconFeature = new Feature({
                    geometry : new Point(lastPointCoor),
                    belongId : routePointsObj.belongRouteId,
                    population : 4000,
                    rainfall : 500
                });

                var iconStyle = new Style({
                    image : new Icon(({
                        src : require('../../dist/assets/images/geo/arrow.png'),
                        rotation : rotation
                    }))
                });
                iconFeature.setStyle(iconStyle);
                vectorSource.addFeature(iconFeature);
            });
            mthis.qbMap.map.addLayer(vectorLayer);
        },

        /**
 * @param 鼠标移动事件
 */

//鼠标移动事件
        mapPointerMove() {
            var mthis = this;
            var map = mthis.qbMap.map;
            var routeSusOverlay = document.createElement('div');
            var lp = document.createElement('p');
            lp.style = 'color:#ccffff;font-size:14px;margin:0px;';
            routeSusOverlay.appendChild(lp);
            map.on('pointermove',function(e) {
                if(map.getOverlayById('route_Overlay')){
                    map.removeOverlay(map.getOverlayById('route_Overlay'));
                }
                var features = map.getFeaturesAtPixel(e.pixel);
                if (features != null) {
                    mthis.mousePointCoordinate = e.coordinate;
                    features.forEach(function(item) {
                        if (item.getProperties().attributes != null && item.getProperties().attributes['mes'] != null) {
                            lp.innerHTML = item.getProperties().attributes['mes'];
                            var route_Overlay = mthis.setOverlay(mthis.mousePointCoordinate, routeSusOverlay, 'route_Overlay', 'bottom-center');
                            map.addOverlay(route_Overlay);
                        } else {
                            map.removeOverlay(map.getOverlayById('route_Overlay'));
                        }
                    });
                }else {
                    map.removeOverlay(map.getOverlayById('route_Overlay'));
                }
            });
        },

        compare (obj1, obj2) {
            var val1 = obj1.order;
            var val2 = obj2.order;
            if (val1 < val2) {
                return -1;
            } else if (val1 > val2) {
                return 1;
            } else {
                return 0;
            }            
        },

        //===========================================================================
        //热力图
        click_heatMap(layer){
        },
        weightFunction(feature){
            var mthis = this;
            var we = feature.get('selectedNum') / mthis.maxEventsNum;
            var weight = we<0.5&&we>0?0.5:we;
            return weight
        },
        getWfsData(featureTypes,filter) {   //mthis.getWfsData(featureTypes,filter);
            var mthis = this;
            //获取wms生成的资源url， fdLayer.getSource().getGetFeatureInfoUrl
            var featureRequest = new WFS().writeGetFeature({
                srsName : 'EPSG:4326',//坐标系统
                featureNS : 'http://10.60.1.142:8082/worldBaseMap',//命名空间 URI
                featurePrefix : 'worldBaseMap',//工作区名称
                featureTypes : featureTypes ,//查询图层，可以同一个工作区下多个图层，逗号隔开
                outputFormat : 'application/json',
                filter : filter
            });
            fetch('http://10.60.1.142:8082/geoserver/wfs', {//geoserver wfs地址如localhost:8080/geoserver/wfs
                method: 'POST',
                body: new XMLSerializer().serializeToString(featureRequest)
            }).then(function (response) {
                return response.json();
            }).then(function (data) {
                //查询结果
                var features = new GeoJSON().readFeatures(data);
                var map = mthis.qbMap.map;
                var source = mthis.getLayerById('HLAreaLayer').getSource();
                var extent = features[0].getGeometry().getExtent();
                if(features.length > 0){
                    for(let j = 0; j < features.length; j++){
                        var id = features[j].getId();
                        var index = -1;
                        for(let i = 0; i < mthis.allAreaIds.length; i++){
                            if(id === mthis.allAreaIds[i]){
                                index = i
                            }
                        }
                        if(index !== -1){
                            features.splice(index,1);
                        } else {
                            mthis.$data.allAreaIds.push(id);
                            mthis.$data.AreaIds.push(id);
                        }
                    }
                }
                source.addFeatures(features)
                map.getView().fit(extent,{
                    size:map.getSize(),
                    duration: 1000
                });
                //mthis.qbMap.map.render();
            })
            .catch(function(error) {
                alert('request failed')
            });
        },

        setheatMap(features){
            var mthis = this
            var map = mthis.heatMap.map
            var colors = getGradientColors("#33cccc","#ccff33",60);
            var heatMap_source = new VectorSource({
                attributions:'heatMap'
            });
            var heatMap_layer = new VectorLayer({
            source : heatMap_source,
            style : new Style({
                    stroke : new Stroke({
                        color : 'blue',
                        width : 2
                    })
                })
            });
            map.addLayer(heatMap_layer);
            features.forEach(function(item,index){
                
                var heatMapStyle = new Style({
                    fill : new Fill({
                        
                    })
                });
                var i = test_HeatMap.find(function(Item){
                    return Item.city == item.getProperties().name;
                    });
                heatMapStyle.getFill().setColor(colors[i.value-49]);
                item.setStyle(heatMapStyle);
                heatMap_source.addFeature(item);
            });
        },

        /*
        *
        * @param地图上事件点的删除
        * 
        */
        deleteSelectClickFeatures(){  //清除Interaction中select的释放feature
            var mthis = this;
            if(mthis.selectClick.getFeatures().getArray().length > 0){
                let features = mthis.selectClick.getFeatures().getArray();
                for(let i = 0; i < features.length; i++){
                    let feature = features[i]
                    mthis.stopAnimation(feature);
                }
                mthis.selectClick.getFeatures().clear();
            }
        },
        deletePoints(){
            var mthis = this;
            var selectedIds = mthis.$store.state.geo_onlyselected_param;
            if(selectedIds.length > 0){
                selectedIds.forEach(function(item){
                    
                    mthis.deleteEventInFeaturesById(item);
                    mthis.$delete(mthis.QBIdsToFeatureIdList,item)
                })
            }
            mthis.geometrySelectedQBIds = [];
        },
        deleteEventInFeaturesById(id){
            var mthis = this;
            var source = mthis.qbMap.getLayer('QBLayer').getSource();
            var featureId = mthis.QBIdsToFeatureIdList[id];
            var feature = source.getFeatureById(featureId);
            var event = feature.get('Params');
            for(let i = event.length - 1; i >= 0; i--){
                if(event[i].id === id){
                    let featureId = mthis.QBIdsToFeatureIdList[id];
                    let param = event[i];
                    let removeParam = {
                        'featureId':featureId,
                        'param':param
                    }
                    mthis.$set(mthis.removeQBIdsList,id,removeParam);
                    event.splice(i,1) ;
                    break;
                }
            }
            var selectedEventsNum = feature.get('selectedNum');
            feature.set('selectedNum',selectedEventsNum - 1,false);
            if(feature.get('Params').length === 0){
                mthis.removeFeaturesArr.push(feature);
                source.removeFeature(feature);
            }
        },
        
        /*
        *
        * @param选中事件的反选
        * 
        */
        invertSelection(){
            var mthis = this
            var keys = Object.keys(mthis.QBIdsToFeatureIdList);
            var HLIds = mthis.$store.state.geo_onlyselected_param;
            var noSelectedIds = [];
            if(keys.length > 0){
                keys.forEach(function(key){
                    var index = util.itemIndexInArr(key,HLIds);
                    if(index === -1){
                        noSelectedIds.push(key)
                    } else {

                    }
                })
            }
            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            GSF.setAllFeaturesStatus(noSelectedIds,noSelectedIds,features,mthis.QBIdsToFeatureIdList)
            mthis.geometrySelectedQBIds = noSelectedIds;
        },
        
        getHighUpSelectedIds(){  //获取此时选择的上一级选择
            var mthis = this;
            var ids = [];
            var highUp = '';
            if(mthis.geometrySelectedQBIds.length === 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0){
                //none
                //ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                highUp = 'None';
            } else if((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedQBIds.length === 0 && mthis.timeSelectedEventIds.length === 0) || (mthis.geometrySelectedQBIds.length !== 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0) || (mthis.timeSelectedEventIds.length !== 0 && mthis.geometrySelectedQBIds.length === 0 && mthis.staticsSelectedEventIds.length === 0)){
                //全量
                highUp = 'All';
                ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
            } else if(mthis.staticsSelectedEventIds.length !== 0 && (((mthis.geometrySelectedQBIds.length !== 0 && mthis.timeSelectedEventIds.length !== 0) && ((mthis.staticsSelectedEventIds.length <= mthis.geometrySelectedQBIds.length && mthis.staticsSelectedEventIds.length >= mthis.timeSelectedEventIds.length) || (mthis.staticsSelectedEventIds.length <= mthis.timeSelectedEventIds.length && mthis.staticsSelectedEventIds.length >= mthis.geometrySelectedQBIds.length))) || (((mthis.geometrySelectedQBIds.length === 0 && mthis.timeSelectedEventIds.length !== 0) && (mthis.staticsSelectedEventIds.length >= mthis.timeSelectedEventIds.length)) || ((mthis.geometrySelectedQBIds.length !== 0 && mthis.timeSelectedEventIds.length === 0) && (mthis.staticsSelectedEventIds.length >= mthis.geometrySelectedQBIds.length))))){
                //statics
                highUp = 'GeoStatics';
                ids = mthis.staticsSelectedEventIds;
            } else if(mthis.geometrySelectedQBIds.length !== 0 && (((mthis.staticsSelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length !== 0) && ((mthis.geometrySelectedQBIds.length <= mthis.staticsSelectedEventIds.length && mthis.geometrySelectedQBIds.length >= mthis.timeSelectedEventIds.length) || (mthis.geometrySelectedQBIds.length <= mthis.timeSelectedEventIds.length && mthis.geometrySelectedQBIds.length >= mthis.staticsSelectedEventIds.length))) || (((mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length !== 0) && (mthis.geometrySelectedQBIds.length >= mthis.timeSelectedEventIds.length)) || ((mthis.staticsSelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length === 0) && (mthis.geometrySelectedQBIds.length >= mthis.staticsSelectedEventIds.length))))){
                //view
                highUp = 'GeoView';
                ids = mthis.geometrySelectedQBIds;
            } else if(mthis.timeSelectedEventIds.length !== 0 && (((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedQBIds.length !== 0) && ((mthis.timeSelectedEventIds.length <= mthis.staticsSelectedEventIds.length && mthis.timeSelectedEventIds.length >= mthis.geometrySelectedQBIds.length) || (mthis.timeSelectedEventIds.length <= mthis.geometrySelectedQBIds.length && mthis.timeSelectedEventIds.length >= mthis.staticsSelectedEventIds.length))) || (((mthis.staticsSelectedEventIds.length === 0 && mthis.geometrySelectedQBIds.length !== 0) && (mthis.timeSelectedEventIds.length >= mthis.geometrySelectedQBIds.length)) || ((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedQBIds.length === 0) && (mthis.timeSelectedEventIds.length >= mthis.staticsSelectedEventIds.length))))){
                //time
                highUp = 'GeoTime';
                ids = mthis.timeSelectedEventIds;
            }
            
            return {
                        "highUp":highUp,
                        "ids":ids
                    }
        },
        //=======================================================================================
        //Geo通用函数
        getLayerIdByFeatureIdOrParamId(featureId){
            var mthis = this;
            var type = featureId.split('&')[0];
            var layerId = mthis.AllLayerList_conf[type].layerId;
            return layerId
        },
        getBelongFeatureByParamId(id){
            var mthis = this;
            var featureId = mthis.QBIdsToFeatureIdList[id];
            var source = mthis.qbMap.getLayer('QBLayer').getSource();
            return source.getFeatureById(featureId);
        },
        getLayerById(layerId){  //根据id获取layer
            var mthis = this
            var layers = mthis.qbMap.map.getLayers().getArray();
            for(var i = 0; i<layers.length; i++){
                if(layers[i].getProperties().id == layerId){
                    return layers[i];
                }
            }
        },
        deleteArrItem(arr,item){
            var index = arr.indexOf(item);
            if(index > -1){
                arr.splice(index, 1);
            }
        },
        /* itemIndexInArr(item,arr){
            if(arr.length > 0){
                for(var i = 0; i < arr.length; i++){
                    if(item == arr[i]){
                        return i;
                    }
                    if(i == arr.length-1){
                        return -1;
                    }
                }
            } else {
                return -1;
            }
        }, */
        //=======================================================================================




        /**
         * @param 创建overlay
         *  coor：放置坐标, element：overlay中放置的节点, id：overlay的id, positioning：放置方式（bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position 重合r等）
         */
        setOverlay(coor, element, id, positioning,offsetX,offsetY){
            var mthis = this
            var ox = 0;
            var oy = 0;
            if(offsetX){
                ox = offsetX;
            }
            if(offsetY){
                oy = offsetY;
            }
            var overlay = new Overlay(({
                element: element,
                id:id,
                stopEvent:true,
                position:coor,
                positioning:positioning,
                offset:[ox,oy],
                autoPan: false,
                autoPanAnimation: {
                    duration: 250
                }
            }));
            return overlay;
        },
        /**
         * @param 删除map中所有此id的overlay  切记，overlay的移除只能从后往前移除
         */
        removeOverlays(id){
            var mthis = this
            var overlays = mthis.qbMap.map.getOverlays().getArray();
            if(overlays.length == 0){
                return;
            } else{
                for(var i = overlays.length - 1; i >= 0; i--){
                    if(overlays[i].getId().indexOf(id) != -1){
                        mthis.qbMap.map.removeOverlay(overlays[i]);
                    }
                }
            }
            
        },
        deleteEntityPointsById(id){
            var mthis = this;
            var eventsPointsFeatures = mthis.getLayerById("eventsPointsLayer").getSource().getFeatures();
            eventsPointsFeatures.forEach(function(item){
                if(item.get('EventId') == id){
                    Source.removeFeature(item);
                }
            });  
        },
        
        
        isPointAnimation(point){
            var mthis = this
            var overlayId = 'pointAnimation_' + point.getProperties().properties.belongId + 
            '_' + point.getProperties().properties.id;
            var overlays = mthis.qbMap.map.getOverlays().getArray();
            if(overlays.length == 0){
                return false;
            } else{
                for(var i = overlays.length - 1; i >= 0; i--){
                    if(overlays[i].getId() == overlayId){
                        return true;
                    }
                    if(i == 0){
                        return false;
                    }
                }
            }
        },
        setpointStyle(point,color){
            var style = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : color
                    })
                })
            });
            point.setStyle(style);
        },

        isPointInPointsArr(point,points){
            for(var i = 0; i < points.length; i++){
                if(point == points[i]){
                    return true;
                }
                if(i == points.length-1){
                    return false;
                }
            }
        },

        pointAnimation(point){
            var mthis = this
            var point_animation_BelongId = 'pointAnimation_' + point.getProperties().properties.belongId;
            var point_animation = document.createElement('div');
            point_animation.className = 'point_animation';
            point_animation.style.background = point.getStyle().getImage().getFill().getColor();
            var point_animation_id = point_animation_BelongId + '_' + point.getProperties().properties.id;
            if(mthis.isPointAnimation(point)){
                
                //mthis.removeOverlays(point_animation_id);
            }
            var point_overlay = mthis.setOverlay(point.getGeometry().getCoordinates(),point_animation,point_animation_id, 'center-center');
            mthis.qbMap.map.addOverlay(point_overlay);
            mthis.qbMap.map.render();
        },
        selectEntityPointsById(belongIds){
            var mthis = this;
            var selectedFeatures = [];
            var entityLayer = mthis.getLayerById('eventsPointsLayer');
            var features = entityLayer.getSource().getFeatures();
            belongIds.forEach(function(belongId){
                features.forEach(function(item){
                    if(item.getProperties().properties.belongId == belongId){
                        selectedFeatures.push(item);
                    }
                });
            });
            return selectedFeatures;
        },
        isEventPointsSelected(){
            var mthis = this;
            var features = mthis.getLayerById("eventsPointsLayer").getSource().getFeatures();
            var selectedEvents=[];
            for(let i = 0; i < features.length; i++){
                if(features[i].get('isSelected') === true){
                    selectedEvents.push(features[i]);
                }
            }
            return selectedEvents;
        },
        differentiateLifeAndDiePointByEventId(id){
            var mthis = this;
            var OId = mthis.getOIdFromId(id);
            var featureId = mthis.QBIdsToFeatureIdList[OId].featureId;
            var feature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId);
            if(feature.getStyle().getImage().getFill().getColor() !== mthis.lifePointColor){
                //m
            }
        },
        setFeatureStatusByIds(ids){
            var mthis = this;
            var selectedFeatures = [];
            var selectedFeatureIds = [];
            var selectedIds = mthis.$store.state.geo_onlyselected_param;
            mthis.qbMap.getLayer('heatmapLayer').getSource().clear();
            GSF.getFeatureIdsByIds(selectedIds,mthis.QBIdsToFeatureIdList,selectedFeatureIds);
            var selectedFeatures = this.qbMap.getFeaturesByIds(selectedFeatureIds,'QBLayer');
            GSF.setFeaturesHalfOrHL(ids,selectedFeatures,mthis.QBIdsToFeatureIdList);
            mthis.maxEventsNum = mthis.getMaxWeight(selectedFeatures);
            mthis.qbMap.addFeatures(selectedFeatures,'heatmapLayer');
        },
        getMaxWeight(features){
            var mthis = this;
            var max = 0;
            for(let i = 0; i < features.length; i++){
                var feature = features[i];
                var selectedNum = feature.get('selectedNum');
                if(selectedNum > max){
                    max = selectedNum;
                }
            }
            return max;
        },
        getallEventIdsFromallEventIdsToFeaturesIds(){
            var mthis = this;
            var ids = []
            Object.keys(mthis.QBIdsToFeatureIdList).forEach(function(key){
                ids.push(mthis.QBIdsToFeatureIdList[key].id)
            })
            return ids;
        },
        /**
         * @param 根据传入的feature往事件ID字典（allEventIdsToFeaturesIdsList）中添加eventid
         */
        addParamsToQBIdsFeatureList(feature){  
            var mthis = this;
            var featureId = feature.getId();
            feature.get('Params').forEach(function(param){
                var paramId = param.id;
                //mthis.allEventIds.push(eventId);
                mthis.$set(mthis.QBIdsToFeatureIdList,paramId,featureId)
            });
        },
        addEventIdsToSelectedIds(eventFeature){
            var mthis = this;
            eventFeature.get('Params').forEach(function(Iitem){
                var eventId = Iitem.id;
                mthis.$data.geometrySelectedQBIds.push(eventId);
            });
        },
        /**
         * @param 将feature追加进入eventsLayer，并将原来已经选中的事件变为不选中状态，新追加的事件为选中状态
         */
        addFeaturesToLayer(addFeatures,type){
            var mthis = this;
            var layerId = mthis.AllLayerList_conf[type].layerId;
            var LayerSource = mthis.getLayerById(layerId).getSource();
            if(LayerSource.getFeatures().length === 0){                          //判断地图中是否原本有数据
                addFeatures.forEach(function(item){
                    mthis.setFeatureStatus(item,'life');
                    mthis.addParamsToQBIdsFeatureList(item);
                    mthis.addEventIdsToSelectedIds(item)
                });
                mthis.returnSelectedEventIds(mthis.EventsDatas.data);
                LayerSource.addFeatures(addFeatures);
            } else { //若地图中原本有数据
                mthis.geometrySelectedQBIds = [];
                mthis.timeSelectedEventIds.length = 0;
                mthis.staticsSelectedEventIds.length = 0;
                var mapFeatures = LayerSource.getFeatures();
                mapFeatures.forEach(function(feature){
                    feature.set('selectedNum',0);
                    mthis.setFeatureStatus(feature,'die');
                })
                addFeatures.forEach(function(additem){
                    mthis.addParamsToQBIdsFeatureList(additem);
                    mthis.addEventIdsToSelectedIds(additem)
                    if(additem.getId() !== null && additem.getId() !== undefined){
                        var featureId = additem.getId();
                        var mapFeature = LayerSource.getFeatureById(featureId);
                        if(mapFeature === null){  //判断地图原有数据中改地点是否有数据
                            var addevents = additem.get('Params');
                            addevents.forEach(function(event){
                                mthis.geometrySelectedQBIds.push(event.id);
                            })
                            mthis.setFeatureStatus(additem,'life');
                            LayerSource.addFeature(additem);
                        } else {  //若地图原有数据中没有该地点数据
                            var addevents = additem.get('Params');
                            addevents.forEach(function(event){
                                var index = util.itemIndexInArr(event.id,mthis.geometrySelectedQBIds)
                                if(index === -1){
                                    mthis.geometrySelectedQBIds.push(event.id);
                                }
                                var mapEvents = mapFeature.get('Params');
                                for(let i = 0; i < mapEvents.length; i++){
                                    if(event.id === mapEvents[i].id){
                                        break;
                                    }
                                    if(i === mapEvents.length - 1){
                                        mapEvents.push(event);
                                        //mapFeature.set('Events',evs);
                                        var num = mapFeature.get('selectedNum')
                                        mapFeature.set('selectedNum',++num);
                                        //mthis.setSelectedEventFeatureParam(feature,false);
                                    }
                                }
                                mthis.setFeatureStatus(mapFeature,'life');
                            })
                        }
                    } else {
                        // alert('数据没有id');
                         mthis.Message('数据没有id')
                    }
                })
            }
        },
        Message(mes){
            var mthis = this;
            mthis.promptMessage = mes;
            mthis.promptflag = true;
            setTimeout(function(){
                mthis.promptflag = false;
            },3000);
        },
        waiting(count){  
            var mthis = this;
            /* mthis.hide(); */
            if(document.getElementById('WaitCover') === null){
                var procbg = document.createElement("div"); //首先创建一个div    
                procbg.setAttribute("id","WaitCover"); //定义该div的id    
                procbg.style.background = "#000000";    
                procbg.style.width = "100%";    
                procbg.style.height = "100%";    
                procbg.style.position = "fixed";    
                procbg.style.top = "0";    
                procbg.style.left = "0";    
                procbg.style.zIndex = "500000";    
                procbg.style.opacity = "0.6";  
                procbg.style.cursor='wait';  
                procbg.style.filter = "Alpha(opacity=70)";    
                document.body.appendChild(procbg); 
            }   
        },
    //取消遮罩    
        hide(count) {
            var mthis = this; 
            var mybg = document.getElementById("WaitCover");
            if(mybg){
                var num = 1
                if(count !== undefined){
                    num = count;
                }
                var body = document.getElementsByTagName("body");
                var asynwaitCount = mthis.asynwaitCount;
                if(num === asynwaitCount){
                    body[0].removeChild(mybg);
                    mthis.asynwaitCount = 1;
                } else {
                    mthis.asynwaitCount++
                }
                
            }   
        }, 
        setFeatureByIds(ids){
            var mthis = this;
            mthis.waiting();
            //mthis.$http.post("http://localhost:5000/getParamsByIds/", {
            mthis.$http.post("http://10.60.1.141:5100/param-exploration/", {
                     "nodeIds": ids
                }).then(response => {
                    var orgNum = 0;
                    var eventNum = 0
                    var mes = [];
                    var addFeatures_Org = [];
                    var addFeatures_Event = [];
                    var eventGeoJson = response.body.data.Features;
                    var addfeatures = (new GeoJSON()).readFeatures(eventGeoJson);


                    /* Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                        var layerId = mthis.AllLayerList_conf[key].layerId;
                        var existFeatures = mthis.getLayerById(layerId).getSource().getFeatures();
                        for(let j = 0; j < existFeatures.length; j++){
                            mthis.setFeatureStatus(existFeatures[j],'die');
                        }
                    })
                    mthis.AnimationFun = {};
                    for(let i = 0; i < addfeatures.length; i++){
                        var feature = addfeatures[i];
                        var params = feature.get('Params');
                        //num += params.length;
                        if(feature.getGeometry().getType() === 'MultiLineString'){
                            
                            mthis.startAnimation(feature)
                        }
                        
                        mthis.mapAddFeature(feature);
                    }
                    // var promptMess = '增加' + promptType + ': ' + num;
                    // mthis.Message(promptMess);
                    mthis.hide(); */




                    for(let i = 0; i < addfeatures.length; i++){
                        var feature= addfeatures[i];
                        var featureId = feature.getId();
                        var type = featureId.split('&')[0];
                        var num = feature.get("Params").length
                        if(type === 'event'){
                            eventNum += num;
                        } else if(type === 'org'){
                            orgNum += num;
                        }
                        var params = feature.get('Params');
                        params.forEach(function(param){
                            var paramId = param.id;
                            mthis.$set(mthis.QBIdsToFeatureIdList,paramId,featureId);
                            var index = util.itemIndexInArr(paramId,mthis.geometrySelectedQBIds);
                            if(index === -1){
                                mthis.$data.geometrySelectedQBIds.push(paramId);
                            }
                        })
                    }
                    /* mthis.qbMap.addFeatures(addfeatures,'heatmapLayer'); */
                    mthis.qbMap.addFeatures(addfeatures,'QBLayer')
                    mes.push('组织机构：' + orgNum + ' 处');
                    mes.push('事件：' + eventNum + ' 件');
                    var promess = '增加' + mes.join(' , ');
                    mthis.Message(promess);
                    mthis.hide()
                },function(res){
                    alert(res.status)
                    mthis.hide();
                });
        },
        isOperateButtonsHLOrDim(){
            var mthis = this;
            if($.isEmptyObject(mthis.QBIdsToFeatureIdList)){
                mthis.changeButtonParam=[
                        {
                            'id_suf':'HSD',
                            'isOpen':false
                        },
                        {
                            'id_suf':'HD',
                            'isOpen':false
                        }
                    ]
                mthis.heatMapVisible = false;  //关闭热力设置按钮
                if($.isEmptyObject(mthis.removeEventIdList)){
                    mthis.changeButtonParam.push({

                            'id_suf':'HDD',
                            'isOpen':false
                        })
                        
                } else {
                    mthis.changeButtonParam.push({
                            'id_suf':'HDD',
                            'isOpen':true
                        })
                }
                if(mthis.AreaIds.length == 0){
                    mthis.changeButtonParam.push({
                        'id_suf':'HL',
                        'isOpen':false
                    })
                    mthis.changeButtonParam.push({
                        'id_suf':'HCD',
                        'isOpen':false
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'HL',
                        'isOpen':true
                    })
                    mthis.changeButtonParam.push({
                        'id_suf':'HCD',
                        'isOpen':true
                    })
                }
                if(mthis.AreaIds.length > 0){
                    mthis.changeButtonParam.push({
                        'id_suf':'HASD',
                        'isOpen':true
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'HASD',
                        'isOpen':false
                    })
                }
                if(mthis.hasTheamatic){
                    mthis.changeButtonParam.push({
                        'id_suf':'OT',
                        'isOpen':true
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'OT',
                        'isOpen':false
                    })
                }

            } else {
                mthis.changeButtonParam=[
                    {
                        'id_suf':'HD',
                        'isOpen':true
                    },
                    {
                        'id_suf':'HCD',
                        'isOpen':true
                    }
                ]
                if(mthis.HLIds.length > 0){
                    mthis.changeButtonParam.push({
                        'id_suf':'HSD',
                        'isOpen':true
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'HSD',
                        'isOpen':false
                    })
                    mthis.heatMapVisible = false;  //关闭热力设置按钮
                }
                if($.isEmptyObject(mthis.removeEventIdList)){
                    mthis.changeButtonParam.push({
                        'id_suf':'HDD',
                        'isOpen':false
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'HDD',
                        'isOpen':true
                    })
                }
                if(mthis.AreaIds.length == 0){
                    mthis.changeButtonParam.push({
                        'id_suf':'HL',
                        'isOpen':false
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'HL',
                        'isOpen':true
                    })
                }
                if(mthis.AreaIds.length == 0 && mthis.SelectedIds.length ==0){
                    mthis.changeButtonParam.push({
                        'id_suf':'HASD',
                        'isOpen':false
                    })
                } else{
                    mthis.changeButtonParam.push({
                        'id_suf':'HASD',
                        'isOpen':true
                    })
                }
                if(mthis.hasTheamatic){
                    mthis.changeButtonParam.push({
                        'id_suf':'OT',
                        'isOpen':true
                    })
                } else {
                    mthis.changeButtonParam.push({
                        'id_suf':'OT',
                        'isOpen':false
                    })
                }
            }
            
        },

    },
    computed:mapState ([
      'tmss','split','split_geo','geoHeight','geoTimeCondition','geo_selected_param','geo_hastype_param','netToGeoData','searchGeoEventResult','searchGeoEntityResult',
      'HLlocationIds','geoStaticsSelectedIds','geoStaticsOnlyLookSelectedIds','geoNoAreaDataGoInMap','geoWorkSetData_area','geoPromte',
      'heatMapRadius','heatMapBlur','displayHeatMap'
    ]),
    
    watch:{
        displayHeatMap(){
            var mthis = this;
            var heatMapLayer = mthis.getLayerById('heatmapLayer');
            heatMapLayer.setVisible(mthis.displayHeatMap);    
        },
        heatMapRadius(){
            var mthis = this;
            var radius = mthis.heatMapRadius
            mthis.getLayerById('heatmapLayer').setRadius(radius)
        },
        heatMapBlur(){
            var mthis = this;
            var blur = mthis.heatMapBlur
            mthis.getLayerById('heatmapLayer').setBlur(blur)
        },
        geoPromte:function(){
            this.Message(this.geoPromte)
        },
        AreaIds:function(){
            var mthis = this;
            mthis.isOperateButtonsHLOrDim();
        },
        HLlocationIds:function(){
            var mthis = this;
            var ids = mthis.$store.state.HLlocationIds;
            //var source = mthis.getLayerById('HLAreaLayer').getSource();
            //source.clear();
            var feature;
            for(let i = 0; i < ids.length; i++){
                var type = ids[i].split('_')[1];
                var id = ids[i].split('_')[0];
                var featureTypes;
                var filter;
                if(type === 'province'){
                    featureTypes = ["world_states_provinces_postgis"]
                    filter = new EqualTo('objectid',id);
                } else {
                    featureTypes = ["world_states_countries_postgis"]
                    filter = new EqualTo('id',id);
                }
                mthis.getWfsData(featureTypes,filter);
            }

        },
        QBIdsToFeatureIdList:{
            handler(newValue) {
                var mthis = this;
                mthis.isOperateButtonsHLOrDim();
    　　　　 },
    　　　　 deep: true,
            immediate: true
        },
        searchGeoEntityResult:function(){
            var mthis = this;
        },
        searchGeoEventResult:function(){
            var mthis = this;
            mthis.$http.post(this.$store.state.ipConfig.api_url + '/node-to-GIS/', {
            //mthis.$http.post("http://127.0.0.1/node2GIS/", {
                "nodeIds": mthis.$store.state.searchGeoEventResult.ids
            }).then(response => {
                var eventGeoJson = response.body.data[0].eventGeoJson;
                var addFeatures = (new GeoJSON()).readFeatures(eventGeoJson);
                mthis.addFeaturesToLayer(addFeatures,'event');
            })
        },
        geoNoAreaDataGoInMap:function(){
            var mthis = this;
            var data = mthis.geoNoAreaDataGoInMap;
            mthis.setFeatureByIds(data)
        },
        geoWorkSetData_area:function(){
            var mthis = this;
            var ids = mthis.geoWorkSetData_area;
            //var 
            var featureTypes_c = ["world_states_countries_postgis"];
            var featureTypes_p = ["world_states_provinces_postgis"];
            var filters_c = [];
            var filters_p = [];
            var proIds = [];
            var countIds = [];
            for(let i = 0; i < ids.length; i++){
                var da = ids[i];
                var id = da.split(".")[1];
                var type = da.split(".")[0];
                if(type === 'country'){
                    //countIds.push(id);
                    let filter = new EqualTo('id',id);
                    filters_c.push(filter);
                } else {
                    //proIds
                    let filter = new EqualTo('objectid',id);
                    filters_p.push(filter);
                }
            }
            if(filters_c.length > 0){
                var Filter_c = filters_c.length >1 ?new Or(...filters_c):filters_c[0];
                mthis.getWfsData(featureTypes_c,Filter_c);
            }
            if(filters_p.length > 0){
                var Filter_p = filters_p.length >1 ?new Or(...filters_p):filters_p[0];
                mthis.getWfsData(featureTypes_p,Filter_p);
            }
            
            /* var Filter_p = new Or(...filters_p);
            mthis.getWfsData(featureTypes_c,Filter_c);
            mthis.getWfsData(featureTypes_p,Filter_p); */
            /* if(type === 'province'){
                filter = new EqualTo('objectid',id);
            } else {
                featureTypes = ["world_states_countries_postgis"]
                filter = new EqualTo('id',id);
            }
            mthis.getWfsData(featureTypes,filter); */

            /* filter: new Or(
          likeFilter('name', 'Mississippi*'),
          equalToFilter('waterway', 'riverbank')
        ) */

        },
        netToGeoData:function(){
            var mthis = this;
            var data = mthis.$store.state.netToGeoData;
            var ids = [];
            var keys = Object.keys(data);
            for(let i = 0; i < keys.length; i++){
                var key = keys[i]
                var fIds = data[key];
                for(let j = 0; j < fIds.length; j++){
                    var id = fIds[j];
                    ids.push(id);
                }
            }
            if(ids.length<= 0){
                return
            } else {
                mthis.setFeatureByIds(ids)
            }
        },
        HLIds:function(){
            var mthis = this;
            if(mthis.qbMap){
                mthis.setFeatureStatusByIds(mthis.HLIds);
                mthis.isOperateButtonsHLOrDim();
            }
            
        },
        geoStaticsOnlyLookSelectedIds(){
            var mthis = this;
            var eventIds = [];
            var orgIds = [];
            var ids = mthis.geoStaticsOnlyLookSelectedIds;
            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            GSF.setAllFeaturesStatus(ids,ids,features,mthis.QBIdsToFeatureIdList);
            mthis.HLIds = mthis.geoStaticsOnlyLookSelectedIds;
            mthis.SelectedIds = mthis.geoStaticsOnlyLookSelectedIds;
            var selectedEventsParam = mthis.geoStaticsOnlyLookSelectedIds
            for(let i = 0; i < selectedEventsParam.length; i++){
                var paramId = selectedEventsParam[i];
                var featureId = mthis.QBIdsToFeatureIdList[paramId];
                var type = featureId.split('&')[0];
                if(type === 'event'){
                    eventIds.push(paramId);
                } else {
                    orgIds.push(paramId);
                }
            }
            var selectedHastypeParam = {
                'eventIds':eventIds,
                'orgIds':orgIds
            }
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam);
            mthis.$store.commit('setGeoHastypeParam',selectedHastypeParam); 
        },
        geoStaticsSelectedIds:function(){
            var mthis = this;
            mthis.halfSelectedIds = mthis.HLIds;
            var ids = [];
            var keys = Object.keys(mthis.geoStaticsSelectedIds);
            if(keys.length > 0){
                keys.forEach(function(key){
                    var item = mthis.geoStaticsSelectedIds[key];
                    ids.push(item)
                    /* if(item.indexOf('&') === -1){
                        var id = 'event&'+item;
                        ids.push(id)
                    } else {
                        ids.push(item)
                    } */
                })
            }
            mthis.staticsSelectedEventIds = ids;
            if(mthis.halfSelectedIds.length > 0){
                mthis.halfSelectedIds.forEach(function(paramid){
                    var featureId = mthis.QBIdsToFeatureIdList[paramid];
                    var feature = mthis.qbMap.getLayer('QBLayer').getSource().getFeatureById(featureId);
                    feature.set('selectdNum',0,false)
                })
            }
        },
        staticsSelectedEventIds:function(){
            var mthis = this;
            var selectedEventsParam = {
                type:'GeoStatics',
                paramIds:mthis.staticsSelectedEventIds//dealSelectedIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedEventsParam); 
            mthis.HLIds = mthis.staticsSelectedEventIds
        },
        timeSelectedEventIds:function(){
            var mthis = this;
            mthis.HLIds = mthis.timeSelectedEventIds
            var selectedEventsParam = {
                type:'GeoTime',
                paramIds:mthis.timeSelectedEventIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedEventsParam); 
        },
        timeSelectedEventIdsOnly:function(){
            var mthis = this;
            var eventIds = [];
            var orgIds = [];
            mthis.HLIds = mthis.timeSelectedEventIdsOnly;
            mthis.SelectedIds = mthis.timeSelectedEventIdsOnly;
            var features = mthis.qbMap.getLayer('QBLayer').getSource().getFeatures();
            GSF.setAllFeaturesStatus(mthis.SelectedIds,mthis.SelectedIds,features,mthis.QBIdsToFeatureIdList)
            var selectedEventsParam = mthis.timeSelectedEventIdsOnly
            for(let i = 0; i < selectedEventsParam.length; i++){
                var paramId = selectedEventsParam[i];
                var featureId = mthis.QBIdsToFeatureIdList[paramId];
                var type = featureId.split('&')[0];
                if(type === 'event'){
                    eventIds.push(paramId);
                } else {
                    orgIds.push(paramId);
                }
            }
            var selectedHastypeParam = {
                'eventIds':eventIds,
                'orgIds':orgIds
            }
            mthis.$store.commit('setGeoHastypeParam',selectedHastypeParam); 
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam); 
        },
        geometrySelectedQBIds:function(){
            var mthis = this;
            var eventIds = [];
            var orgIds = [];
            mthis.HLIds = mthis.geometrySelectedQBIds;
            mthis.SelectedIds = mthis.geometrySelectedQBIds;
            var selectedEventsParam = mthis.geometrySelectedQBIds
            for(let i = 0; i < selectedEventsParam.length; i++){
                var paramId = selectedEventsParam[i];
                var featureId = mthis.QBIdsToFeatureIdList[paramId];
                var type = featureId.split('&')[0];
                if(type === 'event'){
                    eventIds.push(paramId);
                } else {
                    orgIds.push(paramId);
                }
            }
            var selectedHastypeParam = {
                'eventIds':eventIds,
                'orgIds':orgIds
            }
            mthis.$store.commit('setGeoHastypeParam',selectedHastypeParam); 
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam); 
        },
        geoTimeCondition:{
            handler(newValue) {
                var mthis = this;
                var type = mthis.geoTimeCondition.type;
                var timeSelectedIds = mthis.geoTimeCondition.eventIds;
                if(type === 'notAnalysis'){
                    mthis.timeSelectedEventIds = timeSelectedIds;
                    mthis.halfSelectedIds = mthis.HLIds;
                    //var ids = mthis.timeSelectedEventIds;
                    /* if(mthis.timeSelectedEventIds.length > 0){
                        mthis.timeSelectedEventIds.forEach(function(item){
                            if(item.indexOf('&') === -1){
                                var id = 'org&'+item;
                                ids.push(id)
                            } else {
                                ids.push(item)
                            }
                        })
                    } */
                    //mthis.timeSelectedEventIds = ids;
                    mthis.$store.commit('setGeoStaticsHLItemIds',timeSelectedIds);
                    //GSF.setFeaturesHalfOrHL()
                    /* if(mthis.halfSelectedIds.length > 0){
                        mthis.halfSelectedIds.forEach(function(paramid){
                            var layerId = mthis.getLayerIdByFeatureIdOrParamId(paramid);
                            var OId = mthis.getOIdFromId(paramid);
                            var featureId = mthis.QBIdsToFeatureIdList[OId].featureId;
                            var feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                            mthis.setFeatureStatus(feature,'halflife')
                        })
                    } */
                } else if(type === 'analysis'){
                    mthis.timeSelectedEventIdsOnly = timeSelectedIds;
                } else if(type === 'cancelBox'){
                    mthis.timeSelectedEventIds = mthis.SelectedIds;
                }
    　　　　 },
    　　　　 deep: true,
            immediate: true
        },
        timeCondition:function(){
            var mthis = this;
            var ids = [];
            var HLIds = [];
            var idsIsAllIds = false;
            //var allEventIds = [];
            if(mthis.geometrySelectedQBIds.length === 0 && mthis.staticsSelectedEventIds.length === 0){
                //全量
                ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                idsIsAllIds = true;
            } else if(mthis.geometrySelectedQBIds.length !== 0 && (mthis.geometrySelectedQBIds.length <= mthis.staticsSelectedEventIds.length || mthis.staticsSelectedEventIds.length === 0)){
                //view
                ids = mthis.geometrySelectedQBIds;
            } else{
                //statics
                ids = mthis.staticsSelectedEventIds;
            }
            ids.forEach(function(item){
                var OId = mthis.getOIdFromId(item);
                var featureId = mthis.QBIdsToFeatureIdList[OId].featureId;
                var feature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId);
                var eventTime = '';
                var featrueEvents = feature.get('Params');
                if(idsIsAllIds){  //判断ids是否是全量，如果是全量的话，则说明是第一步选择，所有的点先变成die的状态
                    mthis.setFeatureStatus(feature,'die');
                } else {
                    mthis.setFeatureStatus(feature,'halflife');
                }
                for(let i = 0; i < featrueEvents.length; i++){
                    if(item === featrueEvents[i].id){
                        eventTime = featrueEvents[i].time;
                        break;
                    }
                }
                if(eventTime !== '' && util.getTimestamp(eventTime) >= mthis.timeCondition[0] && util.getTimestamp(eventTime) <= mthis.timeCondition[1]){
                    HLIds.push(item);
                } else {
                }
            })
            mthis.timeSelectedEventIds = HLIds;
                
        },
        tmss:function(){
            var mthis = this
            if(mthis.tmss == 'geo'){
                this.$nextTick(function(){
                    var mthis = this
                    mthis.location_cilck()  //初始化时开启location
                    //mthis.addlocationLayer();
                    if(mthis.eventGeoJson !== null){
                        var allFeatures = (new GeoJSON()).readFeatures(mthis.eventGeoJson);
                        mthis.addFeaturesToEventLayer(allFeatures);
                    }
                });
            }
            
        },
        split_geo:function(){
            var mthis = this;
            if(mthis.$store.state.tmss == 'geo'){
                mthis.geoWidth = document.documentElement.clientWidth * mthis.split_geo - 20 + 'px';
            }
            
        },
        geoHeight:function(){
            var mthis = this;
            mthis.GeoHeight = mthis.$store.getters.getGeoHeight;
            mthis.mapHeight = mthis.$store.state.geoHeight - 55 + 'px';
            if(mthis.qbMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.qbMap.map.updateSize();
                });
                
            };
            if(mthis.heatMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.heatMap.map.updateSize();
                });
                
            }
        },
        geoWidth:function(){
            var mthis = this;
            if(mthis.qbMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.qbMap.map.updateSize();
                });
                
            };
            if(mthis.heatMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.heatMap.map.updateSize();
                });
                
            }
            
        },
    },
    components: {
        imgSlider,
        routeLegend,
        imgItemOpera,
        worksetModal,
        operatorHub,
        thematicLayer
    }
}
</script>
