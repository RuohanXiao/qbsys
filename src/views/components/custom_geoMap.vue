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


#locationRoute_Map .ol-zoom {
    top: 3.5em !important;
    right: 0.5em !important;
    left: auto !important;
    background-color: transparent;
    
}
#locationRoute_Map .ol-zoom-out {
margin-top: 204px;
top: 2.3em;
}
#locationRoute_Map .ol-zoomslider {
background-color: rgba(204,255,255,0.4) !important;
top: 5.3em;
left: auto !important;
right: 1.3em !important;
width: 0.3em;
}
#locationRoute_Map .ol-zoomslider button {
right: 0.6em;
background-color: rgb(204,255,255) !important;
width: 1em !important;
height: 1em !important;
border-radius: 0.5em;
}
#locationRoute_Map .ol-touch .ol-zoomslider {
top: 2.75em;
}
#locationRoute_Map .ol-control button{
    background-color: transparent;
    color: rgb(204,255,255);
}

#locationRoute_Map .ol-zoom-in.ol-has-tooltip:hover [role=tooltip],
#locationRoute_Map .ol-zoom-in.ol-has-tooltip:focus [role=tooltip] {
top: 3px;
}

#locationRoute_Map .ol-zoom-out.ol-has-tooltip:hover [role=tooltip],
#locationRoute_Map .ol-zoom-out.ol-has-tooltip:focus [role=tooltip] {
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
    top: 120px;
    left: 100px;
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
    <div :style="{height:GeoHeight,width:geoWidth}" class='geoDiv'>
        <imgItemOpera :changeButton='changeButtonParam' @mapOperation='mapOperationClick' :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)'}"></imgItemOpera>
        <div id='mapDIV'>
            <div id='locationRoute_Map' :style="{display:'block',height:mapHeight,width:'100%',backgroundColor:'black',borderColor: 'rgba(54,102,102,0.5)',borderWidth:'1px',borderStyle:'solid'}" >  <!-- ,height:'800px',width:'1300px'    '1px' 'solid' 'rgba(54,102,102,0.5)'-->
                <transition name="prompt"><div v-if="promptflag" class='promptmessage'>{{promptMessage}}</div></transition>
                <div class='heatMapFormDiv' v-if='heatMapVisible' >
                    <div class='heatSettingName'>热力设置</div>
                    <form class='heatMapForm'>
                        <label>半径大小</label><br/>
                        <input id="radius" type="range" min="1" max="50" step="1" value="5" @input='setRadius()'/><br/>
                        <label>模糊度大小</label><br/>
                        <input id="blur" type="range" min="1" max="50" step="1" value="15" @input='setBlur()'/>
                    </form>
                </div>
            </div>
            <div id='HeatMap_Map' :style="{display:'none',height:mapHeight,width:'100%',backgroundColor:'black'}" ></div>
        </div>
        <workset-modal :worksetData="worksetData" :type="worksetType" :flag="worksetFlag" :worksetInfo="worksetInfo" />
    </div>
</template>

<script>
import { mapState,mapMutations } from 'vuex'

import {test_Route,test_HeatMap,EventsDatas,eventsPointGeoJson,test_mapData} from '../../dist/assets/js/geo/data.js'
import {map} from '../../dist/assets/js/geo/ChinaMap.js' 
import {getGradientColors} from '../../dist/assets/js/geo/GradientColors.js'
import {BezierSinglePoint, BezierLinePoints} from '../../dist/assets/js/geo/geometryType/BezierLine.js'
import {getThirdPoint} from '../../dist/assets/js/geo/geometryType/Arc.js'
import util from '../../util/tools.js'
import {rightMenu} from '../../dist/assets/js/rightMenu.js'

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


import flexslider from 'flexslider'
import 'ol/ol.css'
import '../../dist/assets/styles/geo/flexslider.css'
import '../../dist/assets/styles/geo/demo.css'
import '../../dist/assets/styles/geo/mapInit.css'

import imgSlider from "./custom_imgSlider"
import routeLegend from './custom_routeLegend'
import imgItemOpera from './custom_mapOperaButtons'
import worksetModal from "./custom_workSet_modal.vue";



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
        routeMap:null,
        heatMap:null,
        provinTilSource:null,
        selectedPointsSource:null,
        polygonLayer:null,
        diePointColor:'#9eb2b1', //'#33ffff',//初始化加载时的实体点颜色
        lifePointColor: '#ff9900',//拉框选中后的实体点颜色
        halflifePointColor:'rgba(255,204,102,0.5)',
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
        allEventIdsToFeaturesIdsList:{},   //{<paramId>:{'featureId':<featureId>,...}} 省略的属性，都存放在AllLayerList_conf中的paramAttrs中，除id外都存在该对象中
        removeEventIdList:{},
        geometrySelectedEventIds:[],
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
        }
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
            }
        },
        /* openWorkset(){
            var mthis = this;
            mthis.worksetFlag += 1;
            var orgIds = [];
            var eventIds = [];
            for(let i = 0; i < mthis.SelectedIds.length; i++){
                var id = mthis.SelectedIds[i];
                var type = id.split('&')[0];
                var oid = id.split('&')[1];
                if(type === 'event'){
                    eventIds.push(oid);
                } else {
                    orgIds.push(oid);
                }
            }
            mthis.worksetData = [{
                    type: "entity",
                    data: orgIds
                },
                {
                    type: "document",
                    data: []
                },
                {
                    type: "event",
                    data: eventIds
                }
            ];
        }, */
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
            var eventIds = [];
            var areaIds = [];
            for(let i = 0; i < mthis.SelectedIds.length; i++){
                let id = mthis.SelectedIds[i];
                let type = id.split('&')[0];
                let oid = id.split('&')[1];
                if(type === 'event'){
                    eventIds.push(oid);
                } else {
                    orgIds.push(oid);
                }
            }
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
                    debugger
                    mthis.$http.post("http://10.60.1.141:5100/search-Area/", {
                        ids: areaIds
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
                /* if (mthis.selectionIdByType.contentIds.length > 0) {
                    mthis.$http
                    .post(mthis.$store.state.ipConfig.api_url + "/doc-detail/", {
                        docIds: mthis.selectionIdByType.contentIds
                    })
                    .then(response => {
                        ;
                        if (response.body.code === 0) {
                        mthis.worksetData[2].type = "document";
                        response.body.data.map(item => {
                            item.name = item.title
                            item.img = "http://10.60.1.140/assets/images/content_node.png"
                            return item
                        })
                        mthis.worksetData[2].data = response.body.data;
                        }
                    });
                } */
                console.log('mthis.worksetData----------')
                console.log(mthis.worksetData)
            }
            this.worksetType = "add";
            this.worksetFlag = this.worksetFlag + 1;
            // // console.log(this.worksetData)
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
                    id:'heatmapLayer'
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
                /* eventLayer.setVisible(true);
                orgLayer.setVisible(true); */
            } else {
                 button.className = 'button-div-click';
                 mthis.heatMapVisible = true;
                 heatMapLayer.setVisible(true);
                 /* eventLayer.setVisible(false);
                 orgLayer.setVisible(false); */
            }
            /* var heatMapLayer = mthis.getLayerById('heatmapLayer');
            mthis.click_heatMap(heatMapLayer);
            heatMapLayer.setVisible(true) */
            
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
                mthis.$set(mthis.allEventIdsToFeaturesIdsList,OId,listParam);
                var index = util.itemIndexInArr(paramId,mthis.geometrySelectedEventIds);
                if(index === -1){
                    mthis.$data.geometrySelectedEventIds.push(paramId);
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
                if(mthis.allEventIdsToFeaturesIdsList[OId]){  //如果allEventIdsToFeaturesIdsList中存在该id及其属性，则删除
                    delete mthis.allEventIdsToFeaturesIdsList[OId]
                }
                if(mthis.removeEventIdList[paramId]){  //如果removeEventIdList中存在该id及其属性，则删除
                    delete mthis.removeEventIdList[paramId]
                }
                var index = util.itemIndexInArr(paramId,mthis.HLIds);
                if(index !== -1){ //如果SelectedIds中存在该id，则删除
                    mthis.$data.HLIds.splice(index,1)
                }
                var index_geometry = util.itemIndexInArr(paramId,mthis.geometrySelectedEventIds);
                if(index_geometry !== -1){ //如果geometrySelectedEventIds中存在该id，则删除
                    mthis.$data.geometrySelectedEventIds.splice(index_geometry,1)
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
            mthis.orgsSpatialQuery(geometryArr,'Org');
        },
        
        clearAll(){
            var mthis = this;;
            mthis.getLayerById('eventsPointsLayer').getSource().clear();
            mthis.getLayerById('HLAreaLayer').getSource().clear();
            mthis.getLayerById('OrgLayer').getSource().clear();
            mthis.geometrySelectedEventIds = [];
            mthis.timeSelectedEventIds = [];
            mthis.staticsSelectedEventIds = [];
            mthis.invertSelectedEventIds = [];
            mthis.AreaIds = [];
            mthis.allAreaIds = [];
            mthis.allEventIdsToFeaturesIdsList = new Object();
            mthis.removeEventIdList = new Object();
            Object.keys(mthis.AnimationFun).forEach(function(key){
                mthis.routeMap.map.un('postcompose', mthis.AnimationFun[key]);
            })
            mthis.AnimationFun = new Object();
        },
        pushToNet(){
            var mthis = this;
            var eventIds = [];
            var nodeIds = [];
            var metalworkIds = mthis.HLIds;
            if(metalworkIds.length > 0){
                metalworkIds.forEach(function(id){
                    var type = id.split('&')[0];
                    var Id = id.split('&')[1];
                    if(type === 'event'){
                        eventIds.push(Id);
                    } else {
                        nodeIds.push(Id);
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
            if(mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0){
                //全量
                //ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                selectedParam = {
                    "type":'All',
                    "ids":mthis.getallEventIdsFromallEventIdsToFeaturesIds()
                };
            } else if(mthis.geometrySelectedEventIds.length !== 0 && (mthis.geometrySelectedEventIds.length <= mthis.staticsSelectedEventIds.length || mthis.geometrySelectedEventIds.length <= mthis.timeSelectedEventIds.length || (mthis.timeSelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0))){
                //view
                selectedParam = {
                    "type":'GeoView',
                    "ids":mthis.geometrySelectedEventIds
                };
                //ids = mthis.geometrySelectedEventIds;
            } else if(mthis.timeSelectedEventIds.length !== 0 && (mthis.timeSelectedEventIds.length <= mthis.staticsSelectedEventIds.length || mthis.timeSelectedEventIds.length <= mthis.geometrySelectedEventIds.length || (mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0))){
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
            mthis.geometrySelectedEventIds.length = 0;
            mthis.timeSelectedEventIds.length = 0;
            mthis.staticsSelectedEventIds.length = 0;
            
            Object.keys(mthis.AllLayerList_conf).forEach(function(itemId){
                var layerId = mthis.AllLayerList_conf[itemId].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                features.forEach(function(item){
                    var num = item.get('Params').length;
                    item.set('selectedNum',num);
                    mthis.addEventIdsToSelectedIds(item);
                    mthis.setFeatureStatus(item,'life');
                });
            })
            
        },
        returnToAllPoints(){
            var mthis = this;
            if($.isEmptyObject(mthis.removeEventIdList)){
                return;
            }
            mthis.geometrySelectedEventIds = [];
            mthis.timeSelectedEventIds.length = 0;
            mthis.staticsSelectedEventIds.length = 0;
            //mthis.HLIds = [];
            if(mthis.removeFeaturesArr.length > 0){
                mthis.removeFeaturesArr.forEach(function(feature){
                    var featureId = feature.getId();
                    var featureType = featureId.split('&')[0]
                    var layerId = mthis.AllLayerList_conf[featureType].layerId
                    var source = mthis.getLayerById(layerId).getSource();
                    source.addFeature(feature);
                    var type = feature.getGeometry().getType();
                    if(type === 'MultiLineString'){
                        mthis.routeMap.map.on('postcompose', mthis.AnimationFun[featureId])
                    }
                })
                //source.addFeatures(mthis.removeFeaturesArr);
                mthis.removeFeaturesArr = [];
            }
            var keys = Object.keys(mthis.removeEventIdList);
            if(keys.length > 0){   //将删除的数据添加到feature中
                keys.forEach(function(item){
                    var featureId = mthis.removeEventIdList[item].featureId
                    var featureType = featureId.split('&')[0];
                    var layerId = mthis.getLayerIdByFeatureIdOrParamId(featureId);
                    var source = mthis.getLayerById(layerId).getSource();
                    var feature = source.getFeatureById(mthis.removeEventIdList[item].featureId);
                    var addParam = {'id':item};
                    mthis.AllLayerList_conf[featureType].paramAttrs.forEach(function(param){
                        if(param !== 'id'){
                            addParam[param] = mthis.removeEventIdList[item][param]
                        }
                    })
                    var oldParam = feature.get('Params');
                    var events = oldParam.push(addParam)
                    feature.set('Params',oldParam,false);
                    mthis.$delete(mthis.removeEventIdList,item);
                })
            }

            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                if(features.length > 0){
                    features.forEach(function(item){
                        var num = item.get('Params').length;
                        item.set('selectedNum',num);
                        
                        mthis.setFeatureStatus(item,'life');
                        mthis.addEventIdsToAEITFIdsListFromFeature(item);
                        mthis.addEventIdsToSelectedIds(item);
                    });
                }
            })
            /* var features = source.getFeatures();
            if(features.length > 0){
                features.forEach(function(item){
                    item.set('selectedNum',item.get('Params').length,false);
                    mthis.setFeatureStatus(item,'life');
                    mthis.addEventIdsToAEITFIdsListFromFeature(item);
                    mthis.addEventIdsToSelectedIds(item);
                })
            } */
        },
        legendItemClick(legendItemOpera){
            var mthis = this;
            var map = mthis.routeMap.map;
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
            debugger
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var feature = mthis.getLayerById("HLAreaLayer").getSource().getFeatureById(id)
                var geometry = feature.getGeometry();
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                geometryList.push(geometryStr);
                
            }
            mthis.orgsSpatialQuery(geometryList,'Event');
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
                
            }
            mthis.orgsSpatialQuery(geometryList,'Org');
            mthis.deleteRightMenu();
        },
        rightClickLoc(){
            var mthis = this;
            var feature = mthis.oparAreaFeature;
            var geometry = feature.getGeometry();
            var geometryArr = new GeoJSON().writeGeometry(geometry)
            mthis.orgsSpatialQuery([geometryArr],'Org');
            mthis.deleteRightMenu();
        },
        rightClickDM(){
            var mthis = this;
            /* var feature = mthis.oparAreaFeature;
            mthis.deleteRightMenu();
            var source = mthis.getLayerById('HLAreaLayer').getSource();
            var fid = feature.getId();
            var index = -1;
            for(let i = 0; i < mthis.AreaIds.length; i++){
                if(fid === mthis.AreaIds[i]){
                    index = i
                }
            }
            if(index !== -1){
                mthis.$data.AreaIds.splice(index,1);
            }
            source.removeFeature(feature);
            var map = mthis.routeMap.map;
            var overlayId = 'rightClickMenu_Area';
            var overlay = map.getOverlayById(overlayId);
            if(overlay){
                map.removeOverlay(overlay)
            } */
            var areaIds= mthis.AreaIds;
            var geometryList = [];
            for(let i = 0; i < areaIds.length; i++){
                var id = areaIds[i];
                var source = mthis.getLayerById('HLAreaLayer').getSource();
                var feature = source.getFeatureById(id)
                /* var geometry = feature.getGeometry();
                var geometryStr = new GeoJSON().writeGeometry(geometry)
                geometryList.push(geometryStr); */
                source.removeFeature(feature);
            }
            /* mthis.orgsSpatialQuery(geometryList,'Org'); */
            mthis.deleteRightMenu();
        },
        deleteRightMenu(){
            var mthis = this;
            setTimeout(function(){
                    var map = mthis.routeMap.map;
                    var overlayId = 'rightClickMenu_Area';
                    var overlay = map.getOverlayById(overlayId);
                    if(overlay){
                        map.removeOverlay(overlay)
                    }
                },100)
        },
        setRightClickMenu_Area(coordinate){
            var mthis = this;
            var overlayId = 'rightClickMenu_Area';
            var ovdiv = document.createElement('div');
            ovdiv.style = 'width:400px;height:400px';
            ovdiv.class = 'ringRightMenu';
            ovdiv.id='ringRightMenu';
            var config = [
                {'Id':1,'parentId':0,'name':'探索事件','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickEvent','icon':''},
                {'Id':2,'parentId':0,'name':'探索组织','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickOrg','icon':''},
                {'Id':3,'parentId':0,'name':'探索地名','hasLeaf':true,'color':"rgba(0, 0, 0, 0.7)",'backcall':'','icon':''},
                {'Id':4,'parentId':0,'name':'删除区域','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickDM','icon':''},
/*                 {'Id':5,'parentId':0,'name':'探索地名11','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'','icon':''},
                {'Id':6,'parentId':0,'name':'删除区域','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickDM','icon':''}, */
                {'Id':301,'parentId':3,'name':'aa','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickLoc','icon':''},
                {'Id':302,'parentId':3,'name':'bb','hasLeaf':false,'color':"rgba(0, 0, 0, 0.7)",'backcall':'mthis.rightClickLoc','icon':''},
            ]
            //mthis.oparAreaFeature = feature;
            var routeMap = new rightMenu(mthis,ovdiv,config);
            //ovdiv.style ='background-color:rgba(0, 0, 0, 0.8);border: 1px solid #2a6464;cursor:pointer';
            /*ovdiv.class = 'rightMenuDiv';
            ovdiv.id='rightClickMenu';
            ovdiv.addEventListener("mouseleave", function(){
                mthis.deleteRightMenu();
            });
            var table = document.createElement('table');
            table.id = 'rightClickMenuTable';
            table.style = 'font-size: 12px;color: rgba(51,255,255,0.4);margin: 3px 0px;';
            ovdiv.appendChild(table);
            var rightClickConf = [
                {'name':'探索事件','id':'eventExplore','iconClassName':'icon-ren','funName':'mthis.rightClickEvent'},
                {'name':'探索组织','id':'orgExplore','iconClassName':'icon-ren','funName':'mthis.rightClickOrg'},
                {'name':'探索地点','id':'locExplore','iconClassName':'icon-ren','funName':'mthis.rightClickLoc'},
                {'name':'删除边框','id':'menuDelete','iconClassName':'icon-ren','funName':'mthis.rightClickDM'}
            ];
            rightClickConf.forEach(function(item){
                var tr = document.createElement('tr');
                tr.id = item.id;
                tr.addEventListener('click',function(){
                    var func=eval(item.funName);
                    func.call(mthis,feature);
                })
                var iconTd = document.createElement('td');
                iconTd.style='padding-left: 5px;';
                iconTd.classList.add('icon','iconfont',item.iconClassName);
                tr.appendChild(iconTd);
                var nameTd = document.createElement('td');
                nameTd.style = 'padding-right: 10px;';
                nameTd.innerHTML=item.name;
                tr.appendChild(nameTd);
                table.appendChild(tr);
            }) */
            
            var overlayId = mthis.setOverlay(coordinate,ovdiv,overlayId,'top-left',-200,-200);
            mthis.routeMap.map.addOverlay(overlayId);
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
            if(layer.get('id') === "eventsPointsLayer"){
                if(feature.getStyle().getImage().getFill().getColor() === mthis.lifePointColor){
                    return true
                } else {
                    return false
                }
            } else {
                if(feature.getStyle().getImage().getOpacity() === 1){
                    return true
                } else {
                    return false
                }
            }
        },
        selectfilterStyleFun(feature,resolution){
            var iconStyle = new Style({
                image: new Icon(({
                    src: require('../../dist/assets/images/geo/Organization_Selected.png')
                }))
            });
            return iconStyle
        },
        clickselectfilterFun(feature,layer){
            /* if(feature.getStyle().getImage().getOpacity() !== 0.98){
                return true
            } else {
                return false
            } */
            return true
        },
        rightClickFilterFun(layer){
            var mthis = this;
            /* if(layer.get('id') === "HLAreaLayer"){
                return true;
            }
            return false; */
            return true;
        },
        rightClickFun(layer,coordinate){
            var mthis = this;
            debugger
            var map = mthis.routeMap.map;
            var pixel = map.getPixelFromCoordinate(coordinate);
            var overlayId = 'rightClickMenu_Area';
            var overlay = map.getOverlayById(overlayId);
            if(overlay){
                map.removeOverlay(overlay)
            }
            mthis.setRightClickMenu_Area(coordinate)
            /* map.forEachLayerAtPixel(pixel,function(feature,layer){
                debugger
                var overlayId = 'rightClickMenu_Area';
                var overlay = map.getOverlayById(overlayId);
                if(overlay){
                    map.removeOverlay(overlay)
                }
                mthis.setRightClickMenu_Area(feature,coordinate)
            },{'layerFilter':mthis.rightClickFilterFun}) */
        },
        addlocationLayer(){
            var mthis = this;
            /* var blurIn = document.getElementById('blur');
            var radiusIn = document.getElementById('radius');
            var blur = 20;
            var radius = 15;
            if(blurIn){
                blur = blurIn.value;
            }
            if(radiusIn){
                radius = radiusIn.value;
            } */

            if(mthis.routeMap == null){
                var HLAreaStyle = new Style({
                    fill: new Fill({ //矢量图层填充颜色，以及透明度
                        color: 'rgba(51, 255, 255, 0.3)'
                    }),
                    stroke: new Stroke({ //边界样式
                        color: 'rgba(51, 255, 255, 1)',
                        width: 3
                    })
                });
                mthis.routeMap = new map('locationRoute_Map')
                 //mthis.routeMap.map.getView().on('singleclick',function(){alert(11)});
                var HLAreaSource = new VectorSource({});
                //HLAreaSource.on('singleclick',function(e){alert(11)});
                var HLArealayer = new VectorLayer({  //高亮地区图层
                    source: HLAreaSource,
                    style:HLAreaStyle,
                    id:'HLAreaLayer'
                });
                
                var Orglayer = new VectorLayer({  //组织机构图层
                    source: new VectorSource({
                    }),
                    style: mthis.OrgStyleFun,
                    id:'OrgLayer'
                });
                
                var Eventslayer = new VectorLayer({  //事件图层
                    source: new VectorSource({
                    }),
                    //style:mthis.eventStyle,
                    id:'eventsPointsLayer'
                });
                
                var heatMapLayer = new Heatmap({  //热力图层
                    source: new VectorSource({
                    }),
                    blur: 15,
                    radius: mthis.radius,
                    weight:mthis.weightFunction,
                    renderModed:'image',
                    id:'heatmapLayer',
                    visible:false
                })
                
                mthis.routeMap.addlayer(heatMapLayer);
                mthis.routeMap.addlayer(HLArealayer);
                mthis.routeMap.addlayer(Eventslayer);
                mthis.routeMap.addlayer(Orglayer);
                mthis.selectPointerMove = new Select({
                    condition: pointerMove,
                    layers:[Eventslayer,Orglayer],
                    filter:mthis.pointerMoveselectfilterFun,
                    style:mthis.selectfilterStyleFun   
                });
                mthis.selectClick = new Select({
                    condition: click,
                    layers:[Orglayer,Eventslayer,HLArealayer],
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
                /* mthis.selectClick_area = new Select({
                    condition: click,
                    layers:[HLArealayer],
                    filter:mthis.clickselectfilterFun,
                    //  style:new Style({
                    //     fill: new Fill({ //矢量图层填充颜色，以及透明度
                    //         color: 'rgba(51, 255, 255, 0.0)'
                    //     }),
                    //     stroke: new Stroke({ //边界样式
                    //         color: 'rgba(51, 255, 255, 0)',
                    //         width: 0
                    //     })
                    // }) 
                }); */
                /* mthis.selectClick = new Select({
                    condition: click,
                    layers:[Orglayer,Eventslayer],
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

                }); */
                /* mthis.mapSingleClick = mthis.routeMap.map.on('singleclick',function(e){
                    debugger
                    for(let i = 0; i < mthis.SelectedIds.length; i++){
                        let id = mthis.SelectedIds[i];
                        let oId = id.split("&")[1];
                        let featureId = mthis.allEventIdsToFeaturesIdsList[oId].featureId;
                        let layerId = mthis.getLayerIdByFeatureIdOrParamId(id);
                        let feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                        mthis.setFeatureStatus(feature,'die');
                    }
                    mthis.geometrySelectedEventIds = [];
                    
                }); */
                mthis.routeMap.addRightClickInLayer(HLArealayer,mthis.rightClickFun);  //添加HLArealayers上的右键点击事件
                mthis.routeMap.map.addInteraction(mthis.selectPointerMove);
                mthis.routeMap.map.addInteraction(mthis.selectClick);
                //mthis.routeMap.map.addInteraction(mthis.selectClick_area);
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
                                mthis.pointSelectedAnimation(selectFeatures[i],'pointMove');
                                //鼠标悬浮时的信息框
                                mthis.setPointMoveOverlay_Event(selectFeatures[i]);
                            } else {
                                setTimeout(function(){
                                    mthis.setPointMoveOverlay_Org(selectFeatures[i]);
                                    //mthis.setFeatureStatus(selectFeatures[i],'violent')
                                },100)
                            }
                        }
                    }
                });
                mthis.selectClick.on('select', function(e) {
                    debugger
                    mthis.deleteSelectClickFeatures();
                    var selectFeatures = e.selected;
                    var deselectFeatures = e.deselected;
                    var num = 0;
                    mthis.geometrySelectedEventIds = [];
                    if(deselectFeatures.length > 0){
                        var paramFeatures = [];
                        for(let i = 0; i < selectFeatures.length; i++){
                            let feature = selectFeatures[i];
                            var id = feature.getId();
                            let index = id.indexOf('&');
                            if(index != -1){
                                //let oId = id.split('&')[1];
                                paramFeatures.push(feature);
                            }
                        }
                        if(paramFeatures.length > 0){
                            paramFeatures.forEach(function(feature){
                                mthis.setFeatureStatus(feature,'die');
                                mthis.geometrySelectedEventIds = [];
                            })
                        }
                    }
                    if(selectFeatures.length > 0){
                        //mthis.deleteSelectClickFeatures();
                        var HLIds = mthis.HLIds;
                        debugger
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
                            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
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
                            })
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
                        /* mthis.deleteSelectClickFeatures();
                        stopPropagation(); */
                    }
                    /* stopPropagation(); */
                });
                /* mthis.selectClick_area.on('select', function(e) {
                    var features = e.selected;
                    debugger
                    mthis.deleteSelectClickFeatures();
                    for(let i = 0; i < features.length; i++){
                        var feature = features[i];
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
                    //stopPropagation();
                }) */
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
            mthis.routeMap.map.addOverlay(overlayId);
        },
        setPointMoveOverlay_Event(feature){
            var mthis = this;
            var overlayId = 'pointMoveOverlay_Event';
            var ovdiv = document.createElement('div');
            ovdiv.style ='background-color: rgba(0,51,51,0.8);border-radius: 5px;';
            var conLabel = document.createElement('div');
            conLabel.style = 'padding: 5px 10px;';
            ovdiv.appendChild(conLabel);
            var Lp = document.createElement('p');
            conLabel.appendChild(Lp);
            Lp.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';
            Lp.innerHTML = feature.get('locationName');
            var Ap = document.createElement('p');
            conLabel.appendChild(Ap);
            Ap.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';

            var orgNum = feature.get('selectedNum');
            /* if(orgNum === 1){
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
                        Ap.innerHTML = "事件：" + params[i].completeEvent;
                        break;
                    }
                }
            } else { */
                Ap.innerHTML = "事件数：" + feature.get('selectedNum');
            //}
            //Ap.innerHTML = "事件：" + feature.get('selectedNum');
            var overlayId = mthis.setOverlay(feature.getGeometry().flatCoordinates,ovdiv,overlayId,'top-left');
            mthis.routeMap.map.addOverlay(overlayId);
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
                var map = this.routeMap.map;
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
        clickButtonOpenDiv(id){
            var mthis = this
            mthis.mapDivbuttonIds.forEach(function(item){
                var button = document.getElementById(item)
                var bottonName = item.split('&')[0]
                var classname = ''
                if(item == id){
                    classname = 'button-div-click';
                } else {
                    var arr = mthis.changeButtonParam;
                    var isOpen = true;
                    for(let i = 0; i < arr.length - 1; i++){
                        if(arr[i].id_suf === item.split('&')[1]){
                            isOpen = arr[i].isOpen;
                            break
                        }
                    }
                    if(isOpen){
                        classname = 'button-div';
                    } else {
                        classname = 'button-none';
                    }
                }
                button.className = classname
            })
            var locationRoute_Map = document.getElementById('locationRoute_Map')
            var HeatMap_Map = document.getElementById('HeatMap_Map')
            if(id == 'heatMap_HSD'){
                locationRoute_Map.style.display = 'none'
                HeatMap_Map.style.display = 'block'
            } else {
                locationRoute_Map.style.display = 'block'
                HeatMap_Map.style.display = 'none'
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
            mthis.routeMap.addlayer(layer);
            mthis.geometrySelectedFeatures = mthis.getLayerById('eventsPointsLayer').getSource().getFeatures();
        },
        locationPoints(){
            var mthis = this
            var map = mthis.routeMap.map
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
                var viewResolution=mthis.routeMap.map.getView().getResolution();
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
            var layer = mthis.routeMap.map.getLayers().getArray();
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
            var mapDiv = document.getElementById('locationRoute_Map')
            mapDiv.style.cursor = 'crosshair';
            var map = mthis.routeMap.map
            //map.removeInteraction(mthis.draw);
            map.removeInteraction(mthis.selectPointerMove);
            map.removeInteraction(mthis.selectClick);
            //map.removeInteraction(mthis.selectClick_area);
            //矢量图层是用来渲染矢量数据的图层类型，在OpenLayers里，它是可以定制的，可以控制它的透明度，颜色，以及加载在上面的要素形状等。
            var Vecsource = new VectorSource({
                features : new Collection()
            });
            var polygonLayer = new VectorLayer({
                source : Vecsource
            });
            var drawExploreSource = mthis.getLayerById('HLAreaLayer').getSource();
            map.addLayer(polygonLayer);
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
                map.addInteraction(exploreDraw);
            } 
            map.removeLayer(polygonLayer);
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
                mthis.routeMap.map.removeInteraction(draw);
                mthis.routeMap.map.addInteraction(mthis.selectPointerMove);
                mthis.routeMap.map.addInteraction(mthis.selectClick);
                //mthis.routeMap.map.addInteraction(mthis.selectClick_area);
                mthis.allAreaIds.push(id);
                mthis.AreaIds.push(id);
                mthis.routeMap.map.getView().animate({
                    center: getCenter(geometry.getExtent()),
                    duration: 1000
                });
                mthis.routeMap.map.render();
            });
        },
        orgsSpatialQuery(geometryArr,type){
            var mthis = this;
            var url = '';
            var promptType = ''
            var num = 0;
            if(type === 'Event'){
                url = 'http://10.60.1.141:5100/exploreEvent/'
                //url = 'http://localhost:5000/exploreEvent/'
                promptType = '事件数';
            } else if(type === 'Org'){
                url = 'http://10.60.1.141:5100/exploreOrg/'
                promptType = '组织机构数';
            }
            
            mthis.waiting();
             mthis.$http.post(url, {
                    'geometry':geometryArr
                }).then(response => {
                    var OrgGeojson = response.body.data.Features;
                    var addfeatures = (new GeoJSON()).readFeatures(OrgGeojson);
                    mthis.geometrySelectedEventIds = [];
                    mthis.timeSelectedEventIds.length = 0;
                    mthis.staticsSelectedEventIds.length = 0;
                    Object.keys(mthis.AllLayerList_conf).forEach(function(key){
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
                        num += params.length;
                        if(feature.getGeometry().getType() === 'MultiLineString'){
                            
                            mthis.startAnimation(feature)
                        }
                        
                        mthis.mapAddFeature(feature);
                    }
                    var promptMess = '增加' + promptType + ': ' + num;
                    mthis.Message(promptMess);
                    mthis.hide();
                    
                })
        },
        startAnimation(feature) { 
            var mthis = this;
            if(feature.getGeometry().getType() !== 'MultiLineString'){
                return;
            }
            var id = feature.getId();
            var map = mthis.routeMap.map;
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
            var map = mthis.routeMap.map;
            var id = feature.getId();
            map.un('postcompose', mthis.AnimationFun[id]);
        },
        changedrawType(object){
            var mthis = this
            var mapDiv = document.getElementById('locationRoute_Map')
            mapDiv.style.cursor = 'crosshair';
            var map = mthis.routeMap.map
            map.removeInteraction(mthis.draw);
            map.removeInteraction(mthis.selectPointerMove);
            map.removeInteraction(mthis.selectClick);
            //map.removeInteraction(mthis.selectClick_area);
            //矢量图层是用来渲染矢量数据的图层类型，在OpenLayers里，它是可以定制的，可以控制它的透明度，颜色，以及加载在上面的要素形状等。
            var Vecsource = new VectorSource({
                features : new Collection()
            });
            mthis.polygonLayer = new VectorLayer({
                source : Vecsource
            });
            map.addLayer(mthis.polygonLayer);
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
                map.addInteraction(mthis.draw);
            } 
            map.removeLayer(mthis.polygonLayer);
        },

        draw_polygon(draw) {
            var mthis = this
            draw.on('drawstart',function(){
                mthis.removeSelectedPoints();
            });
            draw.on('drawend', function(obj) {
                var feature = obj.feature;
                var geometry = feature.getGeometry();
                
                mthis.selectEventPointsByGeometry_test(geometry);
                /* if(mthis.geometrySelectedEventIds.length === 0){
                    mthis.$set(mthis.geometrySelectedEventIds,mthis.geometrySelectedEventIds.length,'geo没有选择到数据')  //为了解决使用geometry选择没有选择到数据时，对geometrySelectedEventIds的监视
                } */
                mthis.timeSelectedEventIds.length = 0;
                mthis.staticsSelectedEventIds.length = 0;
                mthis.routeMap.map.removeInteraction(draw);
                mthis.deleteSelectClickFeatures();//清除Interaction中select的释放feature
                setTimeout(function(){
                    mthis.routeMap.map.addInteraction(mthis.selectPointerMove);
                    mthis.routeMap.map.addInteraction(mthis.selectClick);
                    //mthis.routeMap.map.addInteraction(mthis.selectClick_area);
                },1000)
            /*     mthis.routeMap.map.addInteraction(mthis.selectPointerMove)
                mthis.routeMap.map.addInteraction(mthis.selectClick) */
                
                //mthis.deleteSelectClickFeatures();//清除Interaction中select的释放feature
                mthis.routeMap.map.getView().animate({
                    center: getCenter(geometry.getExtent()),
                    duration: 1000
                });
                mthis.routeMap.map.render();
            });
        },
        
        //颜色转换，移除被选择的实体点
        removeSelectedPoints(){
            var mthis = this
            var selectingPointSource = mthis.getLayerById("eventsPointsLayer").getSource();
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
                    //item.setStyle(mthis.selectedstyle);
                    //mthis.setSelectedEventFeatureParam(item,true);
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

        selectEventPointsByGeometry_test(geometry){   
            var mthis = this
            var num = 0;
            
            mthis.geometrySelectedEventIds = [];
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                if(features.length !== 0){
                    features.forEach(function(item) {
                        var coord = item.getGeometry().getCoordinates();
                        var isIn = geometry.intersectsCoordinate(coord);
                        if (isIn) {
                            item.get('Params').forEach(function(Iitem){
                                mthis.$set(mthis.geometrySelectedEventIds,num,Iitem.id);
                                num++;
                            })
                            //mthis.setFeatureStatus(item,'life');
                        } else {
                            mthis.setFeatureStatus(item,'die');
                        }
                    });

                }
            })
        },
        getFeatureIdsByParamIds(paramIds){
            var mthis = this;
            var featureIds = []
            for(let i = 0; i < paramIds.length; i++){
                var sId = paramIds[i];
                var oId = sId.split('&')[1]
                var layerId = mthis.getLayerIdByFeatureIdOrParamId(sId);
                var featureId = mthis.allEventIdsToFeaturesIdsList[oId].featureId;
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
            mthis.routeMap.map.addLayer(Route_layer);
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
            mthis.routeMap.map.addLayer(vectorLayer);
        },

        /**
 * @param 鼠标移动事件
 */

//鼠标移动事件
        mapPointerMove() {
            var mthis = this;
            var map = mthis.routeMap.map;
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
            /* var mthis = this
            mthis.maxEventsNum = 0;
            var heatSource = layer.getSource();
            var HLIds = mthis.getSelectedEventIds().ids;
            HLIds.forEach(function(item){
                var OId = mthis.getOIdFromId(item);
                var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                var feature = heatSource.getFeatureById(featureId);
                if(feature === null){
                    var heatFeature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId).clone();
                    heatFeature.setId(featureId);
                    heatFeature.setStyle(null);
                    heatSource.addFeature(heatFeature);
                    var num = heatFeature.get('selectedNum');
                    if(num > mthis.maxEventsNum){
                        mthis.maxEventsNum = num;
                    }
                }
            }) */
        },
        weightFunction(feature){
            var mthis = this;
            var weight = feature.get('selectedNum') / mthis.maxEventsNum;
            return weight
        },
        getWfsData(featureTypes,filter) {   //mthis.getWfsData(featureTypes,filter);
            var mthis = this;
            debugger
            /* var featureTypes;
            var filter;
            if(type === 'province'){
                featureTypes = "world_states_provinces_postgis"
                filter = new EqualTo('objectid',id);
            } else {
                featureTypes = "world_states_countries_postgis"
                filter = new EqualTo('id',id);
            } */
            
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
                var map = mthis.routeMap.map;
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
                //mthis.routeMap.map.render();
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
            /* if(mthis.selectClick_area.getFeatures().getArray().length > 0){
                let features = mthis.selectClick_area.getFeatures().getArray();
                for(let i = 0; i < features.length; i++){
                    let feature = features[i]
                    mthis.stopAnimation(feature);
                }
                mthis.selectClick_area.getFeatures().clear();
            } */
        },
        deletePoints(){
            var mthis = this;
            //var source = mthis.getLayerById('eventsPointsLayer').getSource();
            mthis.deleteSelectClickFeatures();
            var HLIds = mthis.getSelectedEventIds().ids;
            if(HLIds.length > 0){
                HLIds.forEach(function(item){
                    var OId = mthis.getOIdFromId(item);
                    mthis.$set(mthis.removeEventIdList,item,mthis.allEventIdsToFeaturesIdsList[OId]);
                    mthis.deleteEventInFeaturesById(item);
                    mthis.$delete(mthis.allEventIdsToFeaturesIdsList,OId)
                })
            }
            mthis.geometrySelectedEventIds = [];
            mthis.timeSelectedEventIds.length = 0;
            mthis.staticsSelectedEventIds.length = 0;
        },
        deleteEventInFeaturesById(id){
            var mthis = this;
             /* Object.keys(mthis.AllLayerList_conf).forEach(function(itemId){
                if(id.split('_')[0] === itemId){
                    var layerId = mthis.AllLayerList_conf[itemId].layerId;
                    source = mthis.getLayerById(layerId).getSource();
                }
            }) */
            var layerId = mthis.getLayerIdByFeatureIdOrParamId(id);
            var source = mthis.getLayerById(layerId).getSource();
            var feature = mthis.getBelongFeatureByParamId(id);
            var event = feature.get('Params');
            for(let i = event.length - 1; i >= 0; i--){
                if(event[i].id === id){
                    event.splice(i,1) ;
                    break;
                }
            }
            var selectedEventsNum = feature.get('selectedNum');
            feature.set('selectedNum',selectedEventsNum - 1,false);
            if(feature.get('Params').length === 0){
                mthis.stopAnimation(feature);
                mthis.removeFeaturesArr.push(feature);
                source.removeFeature(feature);
            } else if(feature.get('Params').length !== 0  && feature.get('selectedNum') <= 0){
                mthis.setSelectedEventFeatureParam(feature,false);
            } else if(feature.get('Params').length !== 0  && feature.get('selectedNum') > 0){
                mthis.setSelectedEventFeatureParam(feature,true);
            }
        },
        
        /*
        *
        * @param选中事件的反选
        * 
        */
        invertSelection(){
            var mthis = this
            var keys = Object.keys(mthis.allEventIdsToFeaturesIdsList);
            var HLIds = mthis.$store.state.geo_onlyselected_param;
            var noSelectedIds = [];
            if(keys.length > 0){
                keys.forEach(function(key){
                    var id = mthis.allEventIdsToFeaturesIdsList[key].id;
                    var index = util.itemIndexInArr(id,HLIds);
                    if(index === -1){
                        noSelectedIds.push(id)
                    } else {

                    }
                })
            }
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                for(let i = 0; i < features.length; i++){
                    mthis.setFeatureStatus(features[i],'die');
                }
            })
            mthis.geometrySelectedEventIds = noSelectedIds;
            /* //mthis.invertSelectedEventIds = [];
            // var HLIds = mthis.getSelectedEventIds();
            // var ids = HLIds.ids;
            // var type = HLIds.type;
            var ids = mthis.HLIds;
            var type = mthis.$store.state.geo_selected_param.type;
            var invertIds = [];
            var HighUpSelectedParam = mthis.getHighUpSelectedIds();
            ids.forEach(function(item){ //将原来选中的事件取消
                var OId = mthis.getOIdFromId(item);
                var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                var layerId = mthis.AllLayerList_conf[item.split('&')[0]].layerId;
                var feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                mthis.setSelectedEventFeatureParam(feature,false);
            })
            //找到未被选中的事件并高亮
            //mthis.invertSelectedEventIds = [];
            if(type === 'All'){
                Object.keys(mthis.allEventIdsToFeaturesIdsList).forEach(function(key){
                    if(util.itemIndexInArr(mthis.allEventIdsToFeaturesIdsList[key].id,ids) === -1){
                        mthis.invertSelectedEventIds.push(key);
                    }
                })
            } else if(type === 'GeoView'){
                mthis.geometrySelectedEventIds = [];
                HighUpSelectedParam.ids.forEach(function(key){
                    if(util.itemIndexInArr(key,ids) === -1){
                        invertIds.push(key);
                    }
                })
                mthis.geometrySelectedEventIds = invertIds;
            } else if(type === 'GeoTime'){
                mthis.timeSelectedEventIds = [];
                HighUpSelectedParam.ids.forEach(function(key){
                    if(util.itemIndexInArr(key,ids) === -1){
                        invertIds.push(key);
                    }
                })
                mthis.timeSelectedEventIds = invertIds;
            } else {
                mthis.staticsSelectedEventIds = [];
                HighUpSelectedParam.ids.forEach(function(key){
                    if(util.itemIndexInArr(key,ids) === -1){
                        invertIds.push(key);
                    }
                })
                mthis.staticsSelectedEventIds = invertIds;
            } */
        },
        getHighUpSelectedIds(){  //获取此时选择的上一级选择
            var mthis = this;
            var ids = [];
            var highUp = '';
            if(mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0){
                //none
                //ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                highUp = 'None';
            } else if((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0) || (mthis.geometrySelectedEventIds.length !== 0 && mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length === 0) || (mthis.timeSelectedEventIds.length !== 0 && mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0)){
                //全量
                highUp = 'All';
                ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
            } else if(mthis.staticsSelectedEventIds.length !== 0 && (((mthis.geometrySelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length !== 0) && ((mthis.staticsSelectedEventIds.length <= mthis.geometrySelectedEventIds.length && mthis.staticsSelectedEventIds.length >= mthis.timeSelectedEventIds.length) || (mthis.staticsSelectedEventIds.length <= mthis.timeSelectedEventIds.length && mthis.staticsSelectedEventIds.length >= mthis.geometrySelectedEventIds.length))) || (((mthis.geometrySelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length !== 0) && (mthis.staticsSelectedEventIds.length >= mthis.timeSelectedEventIds.length)) || ((mthis.geometrySelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length === 0) && (mthis.staticsSelectedEventIds.length >= mthis.geometrySelectedEventIds.length))))){
                //statics
                highUp = 'GeoStatics';
                ids = mthis.staticsSelectedEventIds;
            } else if(mthis.geometrySelectedEventIds.length !== 0 && (((mthis.staticsSelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length !== 0) && ((mthis.geometrySelectedEventIds.length <= mthis.staticsSelectedEventIds.length && mthis.geometrySelectedEventIds.length >= mthis.timeSelectedEventIds.length) || (mthis.geometrySelectedEventIds.length <= mthis.timeSelectedEventIds.length && mthis.geometrySelectedEventIds.length >= mthis.staticsSelectedEventIds.length))) || (((mthis.staticsSelectedEventIds.length === 0 && mthis.timeSelectedEventIds.length !== 0) && (mthis.geometrySelectedEventIds.length >= mthis.timeSelectedEventIds.length)) || ((mthis.staticsSelectedEventIds.length !== 0 && mthis.timeSelectedEventIds.length === 0) && (mthis.geometrySelectedEventIds.length >= mthis.staticsSelectedEventIds.length))))){
                //view
                highUp = 'GeoView';
                ids = mthis.geometrySelectedEventIds;
            } else if(mthis.timeSelectedEventIds.length !== 0 && (((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedEventIds.length !== 0) && ((mthis.timeSelectedEventIds.length <= mthis.staticsSelectedEventIds.length && mthis.timeSelectedEventIds.length >= mthis.geometrySelectedEventIds.length) || (mthis.timeSelectedEventIds.length <= mthis.geometrySelectedEventIds.length && mthis.timeSelectedEventIds.length >= mthis.staticsSelectedEventIds.length))) || (((mthis.staticsSelectedEventIds.length === 0 && mthis.geometrySelectedEventIds.length !== 0) && (mthis.timeSelectedEventIds.length >= mthis.geometrySelectedEventIds.length)) || ((mthis.staticsSelectedEventIds.length !== 0 && mthis.geometrySelectedEventIds.length === 0) && (mthis.timeSelectedEventIds.length >= mthis.staticsSelectedEventIds.length))))){
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
            var OId = mthis.getOIdFromId(id);
            var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
            var layerId = mthis.getLayerIdByFeatureIdOrParamId(id);
            var source = mthis.getLayerById(layerId).getSource();
            return source.getFeatureById(featureId);
        },
        getLayerById(layerId){  //根据id获取layer
            var mthis = this
            var layers = mthis.routeMap.map.getLayers().getArray();
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
            var overlays = mthis.routeMap.map.getOverlays().getArray();
            if(overlays.length == 0){
                return;
            } else{
                for(var i = overlays.length - 1; i >= 0; i--){
                    if(overlays[i].getId().indexOf(id) != -1){
                        mthis.routeMap.map.removeOverlay(overlays[i]);
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
            var overlays = mthis.routeMap.map.getOverlays().getArray();
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
            mthis.routeMap.map.addOverlay(point_overlay);
            mthis.routeMap.map.render();
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
            var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
            var feature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId);
            if(feature.getStyle().getImage().getFill().getColor() !== mthis.lifePointColor){
                //m
            }
        },
        setFeatureStatusByIds(ids){
            var mthis = this;
            mthis.getLayerById('heatmapLayer').getSource().clear();
            var featureIds = [];
            var selectedNum = [];
            mthis.maxEventsNum = 0;
            var heatSource = mthis.getLayerById('heatmapLayer').getSource();
            ids.forEach(function(item){
                var OId = mthis.getOIdFromId(item);
                var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                var index = util.itemIndexInArr(featureId,featureIds);
                if(index === -1){
                    featureIds.push(featureId);
                    selectedNum.push(1);
                } else {
                    ++selectedNum[index];
                }
            })
            /* for(let i = 0; i < mthis.SelectedIds.length; i++){

            } */
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                for(let i = 0; i < features.length; i++){
                    let feature = features[i];
                    let id = feature.getId();
                    let isSelected = false;
                    let index = -1;
                    for(let j = 0; j < featureIds.length; j++){
                        if(id === featureIds[j]){
                            isSelected = true;
                            index = j;
                            break;
                        }
                    }
                    if(isSelected){
                        
                        feature.set('selectedNum',selectedNum[index],false);
                        if(key === 'event'){
                            var geometry = feature.getGeometry();
                            if(geometry.getType() !== "MultiLineString"){
                                var heatFeature = feature.clone();
                                heatFeature.setId(id);
                                heatFeature.setStyle(null);
                                heatSource.addFeature(heatFeature);
                                var num = heatFeature.get('selectedNum');
                                if(num > mthis.maxEventsNum){
                                    mthis.maxEventsNum = num;
                                }
                            } else {
                                var multiLines = geometry.getCoordinates();
                                var lineEventBeloneLocals = [];
                                for(let v = 0; v < multiLines.length; v++){
                                    var line = multiLines[v];
                                    var length = line.length;
                                    var rLine = [line[0],line[length - 1]];
                                    rLine.forEach(function(pointCoor){
                                        var coor = 'event&' + pointCoor[0] + '' + pointCoor[1];
                                        var index = util.itemIndexInArr(coor,lineEventBeloneLocals);
                                        if(index === -1){
                                            if(heatSource.getFeatureById(coor)){
                                                var fFeature = heatSource.getFeatureById(coor);
                                                var num = fFeature.get('selectedNum');
                                                fFeature.set('selectedNum',num+1,false);
                                                if((num + 1) > mthis.maxEventsNum){
                                                    mthis.maxEventsNum = num + 1;
                                                }
                                            } else {
                                                var feature = new Feature({
                                                    geometry: new Point(pointCoor)
                                                });
                                                feature.setId(coor);
                                                feature.set('selectedNum',1,false);
                                                heatSource.addFeature(feature);
                                                lineEventBeloneLocals.push(coor);
                                            }
                                        } 
                                    })
                                }
                            }
                            
                        }
                        mthis.setFeatureStatus(feature,'life');
                    } else {
                        feature.set('selectedNum',0,false);
                        //mthis.setFeatureStatus(feature,'die');
                    }
                }
            })
        },
        getallEventIdsFromallEventIdsToFeaturesIds(){
            var mthis = this;
            var ids = []
            Object.keys(mthis.allEventIdsToFeaturesIdsList).forEach(function(key){
                ids.push(mthis.allEventIdsToFeaturesIdsList[key].id)
            })
            return ids;
        },
        /**
         * @param 根据传入的feature往事件ID字典（allEventIdsToFeaturesIdsList）中添加eventid
         */
        addEventIdsToAEITFIdsListFromFeature(feature){  
            var mthis = this;
            var featureId = feature.getId();
            feature.get('Params').forEach(function(param){
                var paramId = param.id;
                var id = paramId.split('&')[1];
                var type = paramId.split('&')[0];
                //mthis.allEventIds.push(eventId);
                var Listparam = {'featureId':featureId}
                var attrArr = mthis.AllLayerList_conf[type].paramAttrs;
                attrArr.forEach(function(attrName){
                    //if(attrName !== 'id'){
                    Listparam[attrName] = param[attrName]
                    //}
                })
                mthis.$set(mthis.allEventIdsToFeaturesIdsList,id,Listparam)
            });
        },
        addEventIdsToSelectedIds(eventFeature){
            var mthis = this;
            eventFeature.get('Params').forEach(function(Iitem){
                var eventId = Iitem.id;
                mthis.$data.geometrySelectedEventIds.push(eventId);
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
                    mthis.addEventIdsToAEITFIdsListFromFeature(item);
                    mthis.addEventIdsToSelectedIds(item)
                });
                mthis.returnSelectedEventIds(mthis.EventsDatas.data);
                LayerSource.addFeatures(addFeatures);
            } else { //若地图中原本有数据
                mthis.geometrySelectedEventIds = [];
                mthis.timeSelectedEventIds.length = 0;
                mthis.staticsSelectedEventIds.length = 0;
                var mapFeatures = LayerSource.getFeatures();
                mapFeatures.forEach(function(feature){
                    feature.set('selectedNum',0);
                    mthis.setFeatureStatus(feature,'die');
                })
                addFeatures.forEach(function(additem){
                    mthis.addEventIdsToAEITFIdsListFromFeature(additem);
                    mthis.addEventIdsToSelectedIds(additem)
                    if(additem.getId() !== null && additem.getId() !== undefined){
                        var featureId = additem.getId();
                        var mapFeature = LayerSource.getFeatureById(featureId);
                        if(mapFeature === null){  //判断地图原有数据中改地点是否有数据
                            var addevents = additem.get('Params');
                            addevents.forEach(function(event){
                                mthis.geometrySelectedEventIds.push(event.id);
                            })
                            mthis.setFeatureStatus(additem,'life');
                            LayerSource.addFeature(additem);
                        } else {  //若地图原有数据中没有该地点数据
                            var addevents = additem.get('Params');
                            addevents.forEach(function(event){
                                mthis.geometrySelectedEventIds.push(event.id);
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
            },2000);
        },
        waiting(){  
            var mthis = this;
            mthis.hide();
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
        },
    //取消遮罩    
        hide() {    
            var mybg = document.getElementById("WaitCover");
            if(mybg){
                var body = document.getElementsByTagName("body");
                body[0].removeChild(mybg)
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
                    var addFeatures = (new GeoJSON()).readFeatures(eventGeoJson);
                    for(let i = 0; i < addFeatures.length; i++){
                        var feature= addFeatures[i];
                        var featureId = feature.getId();
                        var type = featureId.split('&')[0];
                        var num = feature.get("Params").length
                        if(type === 'event'){
                            addFeatures_Event.push(feature);
                            eventNum += num;
                        } else if(type === 'org'){
                            addFeatures_Org.push(feature)
                            orgNum += num;
                        }
                    }
                    mthis.addFeaturesToLayer(addFeatures_Org,'org');
                    mthis.addFeaturesToLayer(addFeatures_Event,'event')
                    if(orgNum > 0){
                        mes.push('组织机构：' + orgNum + ' 处');
                        /* if(data.eventIds.length === 0){
                            var promess_ = '增加' + mes.join(',');
                            mthis.Message(promess_);
                        } */
                    }
                    if(eventNum > 0){
                        mes.push('事件：' + eventNum + ' 件');
                    }
                    if((eventNum + orgNum) > 0){
                        var promess = '增加' + mes.join(' , ');
                        mthis.Message(promess);
                    }
                    mthis.hide()
                })
        },
        isOperateButtonsHLOrDim(){
            var mthis = this;
            if($.isEmptyObject(mthis.allEventIdsToFeaturesIdsList)){
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
            }
        }

    },
    computed:mapState ([
      'tmss','split','split_geo','geoHeight','geoTimeCondition','geo_selected_param','netToGeoData','searchGeoEventResult','searchGeoEntityResult',
      'HLlocationIds','geoStaticsSelectedIds','geoStaticsOnlyLookSelectedIds','geoWorkSetData_noArea','geoWorkSetData_area','geoPromte'
    ]),
    
    watch:{
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
        allEventIdsToFeaturesIdsList:{
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
        geoWorkSetData_noArea:function(){
            var mthis = this;
            var data = mthis.geoWorkSetData_noArea;
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
            if(mthis.routeMap){
                mthis.setFeatureStatusByIds(mthis.HLIds);
                mthis.isOperateButtonsHLOrDim();
            }
            
        },
        geoStaticsOnlyLookSelectedIds(){
            var mthis = this;
            var ids = [];
            if(mthis.geoStaticsOnlyLookSelectedIds.length > 0){
                mthis.geoStaticsOnlyLookSelectedIds.forEach(function(item){
                    if(item.indexOf('&') === -1){
                        var id = 'org&'+item;
                        ids.push(id)
                    } else {
                        ids.push(item)
                    }
                })
            }
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                for(let i = 0; i < features.length; i++){
                    mthis.setFeatureStatus(features[i],'die');
                }
            })
            mthis.HLIds = mthis.geoStaticsOnlyLookSelectedIds;
            mthis.SelectedIds = mthis.geoStaticsOnlyLookSelectedIds;
            var selectedEventsParam = mthis.geoStaticsOnlyLookSelectedIds
            console.log('============setGeoOnlyselectedParam==================')
            console.log(selectedEventsParam)
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam); 
        },
        geoStaticsSelectedIds:function(){
            var mthis = this;
            //if(mthis.staticsSelectedEventIds.length === 0 || mthis.staticsSelectedEventIds.length !== mthis.HLIds.length){
                mthis.halfSelectedIds = mthis.HLIds;
                var ids = [];
                var keys = Object.keys(mthis.geoStaticsSelectedIds);
                if(keys.length > 0){
                    keys.forEach(function(key){
                        var item = mthis.geoStaticsSelectedIds[key];
                        if(item.indexOf('&') === -1){
                            var id = 'org&'+item;
                            ids.push(id)
                        } else {
                            ids.push(item)
                        }
                    })
                }
                mthis.staticsSelectedEventIds = ids;
                if(mthis.halfSelectedIds.length > 0){
                    mthis.halfSelectedIds.forEach(function(paramid){
                        var layerId = mthis.getLayerIdByFeatureIdOrParamId(paramid);
                        var OId = mthis.getOIdFromId(paramid);
                        var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                        var feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                        mthis.setFeatureStatus(feature,'halflife')
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
            debugger
            mthis.HLIds = mthis.timeSelectedEventIdsOnly;
            mthis.SelectedIds = mthis.timeSelectedEventIdsOnly;
            Object.keys(mthis.AllLayerList_conf).forEach(function(key){
                var layerId = mthis.AllLayerList_conf[key].layerId;
                var features = mthis.getLayerById(layerId).getSource().getFeatures();
                for(let i = 0; i < features.length; i++){
                    mthis.setFeatureStatus(features[i],'die');
                }
            })
            var selectedEventsParam = mthis.timeSelectedEventIdsOnly
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam); 
        },
        geometrySelectedEventIds:function(){
            var mthis = this;
            /* var selectedEventsParam = {
                type:'GeoView',
                paramIds:mthis.geometrySelectedEventIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedEventsParam);  */
            mthis.HLIds = mthis.geometrySelectedEventIds;
            mthis.SelectedIds = mthis.geometrySelectedEventIds;
            var selectedEventsParam = mthis.geometrySelectedEventIds
            console.log('============setGeoOnlyselectedParam3==================')
            console.log(selectedEventsParam)
            mthis.$store.commit('setGeoOnlyselectedParam',selectedEventsParam); 
            //mthis.HLIds = mthis.geometrySelectedEventIds
        },
        geoTimeCondition:{
            handler(newValue) {
                var mthis = this;
                var type = mthis.geoTimeCondition.type;
                var timeSelectedIds = mthis.geoTimeCondition.eventIds;
                if(type === 'notAnalysis'){
                    mthis.timeSelectedEventIds = timeSelectedIds;
                    mthis.halfSelectedIds = mthis.HLIds;
                    var ids = [];
                    if(mthis.timeSelectedEventIds.length > 0){
                        mthis.timeSelectedEventIds.forEach(function(item){
                            if(item.indexOf('&') === -1){
                                var id = 'org&'+item;
                                ids.push(id)
                            } else {
                                ids.push(item)
                            }
                        })
                    }
                    mthis.timeSelectedEventIds = ids;
                    mthis.$store.commit('setGeoStaticsHLItemIds',ids);
                    if(mthis.halfSelectedIds.length > 0){
                        mthis.halfSelectedIds.forEach(function(paramid){
                            var layerId = mthis.getLayerIdByFeatureIdOrParamId(paramid);
                            var OId = mthis.getOIdFromId(paramid);
                            var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                            var feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                            mthis.setFeatureStatus(feature,'halflife')
                        })
                    }
                } else if(type === 'analysis'){
                    mthis.timeSelectedEventIdsOnly = timeSelectedIds;
                } else if(type === 'cancelBox'){
                    mthis.timeSelectedEventIds = mthis.SelectedIds;
                }
    　　　　 },
    　　　　 deep: true,
            immediate: true
        },
        /* geoTimeCondition:function(){
            var mthis = this;
            var type = mthis.geoTimeCondition.type;
            var timeSelectedIds = mthis.geoTimeCondition.eventIds;
            if(type === 'notAnalysis'){
                mthis.timeSelectedEventIds = timeSelectedIds;
                mthis.halfSelectedIds = mthis.HLIds;
                var ids = [];
                if(mthis.timeSelectedEventIds.length > 0){
                    mthis.timeSelectedEventIds.forEach(function(item){
                        if(item.indexOf('&') === -1){
                            var id = 'org&'+item;
                            ids.push(id)
                        } else {
                            ids.push(item)
                        }
                    })
                }
                mthis.staticsSelectedEventIds = ids;
                if(mthis.halfSelectedIds.length > 0){
                    mthis.halfSelectedIds.forEach(function(paramid){
                        var layerId = mthis.getLayerIdByFeatureIdOrParamId(paramid);
                        var OId = mthis.getOIdFromId(paramid);
                        var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
                        var feature = mthis.getLayerById(layerId).getSource().getFeatureById(featureId);
                        mthis.setFeatureStatus(feature,'halflife')
                    })
                }
            } else {
                mthis.timeSelectedEventIdsOnly = timeSelectedIds;
            }
        }, */
        timeCondition:function(){
            var mthis = this;
            var ids = [];
            var HLIds = [];
            var idsIsAllIds = false;
            //var allEventIds = [];
            if(mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0){
                //全量
                ids = mthis.getallEventIdsFromallEventIdsToFeaturesIds();
                idsIsAllIds = true;
            } else if(mthis.geometrySelectedEventIds.length !== 0 && (mthis.geometrySelectedEventIds.length <= mthis.staticsSelectedEventIds.length || mthis.staticsSelectedEventIds.length === 0)){
                //view
                ids = mthis.geometrySelectedEventIds;
            } else{
                //statics
                ids = mthis.staticsSelectedEventIds;
            }
            ids.forEach(function(item){
                var OId = mthis.getOIdFromId(item);
                var featureId = mthis.allEventIdsToFeaturesIdsList[OId].featureId;
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
                    //mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',true);
                    HLIds.push(item);
                } else {
                    //mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',false);
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
            if(mthis.routeMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.routeMap.map.updateSize();
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
            if(mthis.routeMap != null){
                this.$nextTick(function(){
                    var mthis = this;
                    mthis.routeMap.map.updateSize();
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
      worksetModal
    }
}
</script>
