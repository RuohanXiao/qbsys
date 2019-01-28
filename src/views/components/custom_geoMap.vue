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
    z-index: 99;
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


</style>

<template>
    <div :style="{height:GeoHeight,width:geoWidth}" class='geoDiv'>
        <imgItemOpera @mapOperation='mapOperationClick' :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)'}"></imgItemOpera>
        <div id='mapDIV'>
            <div id='locationRoute_Map' :style="{display:'block',height:mapHeight,width:'100%',backgroundColor:'black',borderColor: 'rgba(54,102,102,0.5)',borderWidth:'1px',borderStyle:'solid'}" >  <!-- ,height:'800px',width:'1300px'    '1px' 'solid' 'rgba(54,102,102,0.5)'-->
                <div id='legendDiv'>
                    <table id="legendBodyTable" style='border-collapse:separate;border-spacing:5;'>
                        <routeLegend :legendItem='legendItem' @legendItemOpera='legendItemClick' v-for="legendItem in legend"></routeLegend>
                    </table>
                </div>
            </div>
            <div id='HeatMap_Map' :style="{display:'none',height:mapHeight,width:'100%',backgroundColor:'black'}" ></div>
        </div>
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

import VectorSource from 'ol/source/Vector'
import VectorLayer from 'ol/layer/Vector'
import CircleStyle from 'ol/style/Circle'
import Fill from 'ol/style/Fill'
import Style from 'ol/style/Style'
import Feature from 'ol/Feature'
import Point from 'ol/geom/Point'
import Polygon from 'ol/geom/Polygon'
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
import {click, pointerMove} from 'ol/events/condition.js';
import Select from 'ol/interaction/Select.js';
import {easeOut} from 'ol/easing.js';
import {unByKey} from 'ol/Observable.js';
import {getCenter} from 'ol/extent.js';


import flexslider from 'flexslider'
import 'ol/ol.css'
import '../../dist/assets/styles/geo/flexslider.css'
import '../../dist/assets/styles/geo/demo.css'
import '../../dist/assets/styles/geo/mapInit.css'

import imgSlider from "./custom_imgSlider"
import routeLegend from './custom_routeLegend'
import imgItemOpera from './custom_mapOperaButtons'



export default {
    name: 'OperationButtons',
    data() {
      return {
        //isEventPointsSelected:false,
        a:null,
        mapDivbuttonIds : ['location_button','heatMap_button','route_button'],
        mapHeight:'0px',
        imgTopVules:'',
        test_Route:test_Route,
        test_HeatMap:test_HeatMap,
        EventsDatas:EventsDatas,
        eventsPointGeoJson:eventsPointGeoJson,
        test_mapData:test_mapData,
        routeMap:null,
        heatMap:null,
        provinTilSource:null,
        selectedPointsSource:null,
        polygonLayer:null,
        diePointColor: 'rgba(255,204,102,0.5)',//初始化加载时的实体点颜色
        lifePointColor: '#ff9900',//拉框选中后的实体点颜色
        frameSelectedEntityPoints : [],  //拉框时选择的所有实体点
        draw:null,
        selectPointerMove : null,
        selectClick : null,
        legend:null,
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
        removeFeaturesArr:[],
        allEventIdsToFeaturesIds:{},
        allEventIds:[],
        geometrySelectedEventIds:[],
        timeSelectedEventIds:0,
        staticsSelectedEventIds:[],
        pointMoveListenerKey:null,
        pointClickListenerKey:null,
        noSelectedstyle : new Style({
            image : new CircleStyle({
                radius : 3,
                fill : new Fill({
                    color : '#ff9900' //'#33ffff'
                })
            })
        }),
        /* selectedstyle: new Style({
            image : new CircleStyle({
                radius : 3,
                fill : new Fill({
                    color : '#ff9900'
                })
            })
        }), */
        graystyle:new Style({
            image : new CircleStyle({
                radius : 3,
                fill : new Fill({
                    color : '#788c8c'
                })
            })
        }),
      }
    },
    mounted() {
        var mthis = this;
        mthis.test_Route.forEach(function(item){
            mthis.allImgIds.push(item.id);
        })
        mthis.GeoHeight=mthis.$store.getters.getGeoHeight;
        mthis.mapHeight =mthis.$store.getters.getGeoHeight;
        mthis.geoWidth=document.documentElement.clientWidth * this.$store.state.split - 20 + 'px';
    },
    methods:{
        mapOperationClick(mapOperation){
            var mthis = this;
            var mapOperationId = mapOperation.currentTarget.id;
            if(mapOperationId == 'location_button'){
                mthis.location_cilck();
            } else if(mapOperationId == 'heatMap_button'){
                mthis.heatMap_cilck();
            } else if(mapOperationId == 'route_button'){
                mthis.route_cilck();
            } else if(mapOperationId == 'Circle_select' || mapOperationId == 'Polygon_select' || mapOperationId == 'rectangle_select'){
                mthis.changedrawType(mapOperation)
            } else if(mapOperationId == 'delete_opera'){
                mthis.deletePoints();
            } else if(mapOperationId == 'invertSelection_opera'){
                mthis.invertSelectionSliderImgs();
            } else if(mapOperationId == 'toNet_push'){
                mthis.pushToNet();
            } else if(mapOperationId == 'toContent_push'){
                mthis.pushToContent();
            }
        },
        pushToNet(){},
        pushToContent(){},
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
        location_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('location_button')
            mthis.legend = null
            if(mthis.routeMap == null){
                mthis.routeMap = new map('locationRoute_Map')
                mthis.provinTilSource = new TileWMS({
                    url: 'http://10.60.1.142:8082/geoserver/worldBaseMap/wms',
                    params: {
                        'FORMAT': 'image/png',
                        'VERSION': '1.1.1',
                        tiled: true,
                        LAYERS: 'worldBaseMap:World_states_provinces',
                    }
                });
                /* mthis.selectedPointsSource = new VectorSource()
                var selectedPointsLayer = new VectorLayer({  //被选择的点组成的图层
                    id : 'selectedPointsLayer',
                    source : mthis.selectedPointsSource,
                    style : mthis.selectedstyle
                }); */
                
                //mthis.setPointFeatures(mthis.eventsPointGeoJson);
                mthis.setPointFeatures_test(mthis.test_mapData.data);
                mthis.returnSelectedEventIds(mthis.EventsDatas.data); //将所有ids返回给全局被选中的节点变量，为了统计时间轴和右侧菜单
                //mthis.routeMap.addlayer(selectedPointsLayer) 
               //mthis.creatPicSlider();//图片轮播
                //mthis.locationPoints()  //空间查询出点所在地信息
                //mthis.routeMap.map.setSize([mthis.routeMap.map.getViewport().offsetWidth,mthis.routeMap.map.getViewport().offsetHeight])
                //mthis.routeMap.map.setSize([0,100])
                //setTimeout( function() {mthis.routeMap.map.setSize([mthis.routeMap.map.getViewport().offsetWidth,mthis.routeMap.map.getViewport().offsetHeight]);}, 2);
            }  
        },
        
        setLifePointSelectedStyle(feature){
            //var oldRadius = 
        },
        setPointMoveOverlay(feature){
            var mthis = this;
            var overlayId = 'pointMoveOverlay';
            var ovdiv = document.createElement('div');
            ovdiv.style ='background-color: rgba(0,51,51,0.8);border-radius: 5px;';
            var conLabel = document.createElement('div');
            conLabel.style = 'padding: 5px 10px;';
            ovdiv.appendChild(conLabel);
            var Lp = document.createElement('p');
            conLabel.appendChild(Lp);
            Lp.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';
            Lp.innerHTML = feature.get('localtionName');
            var Ap = document.createElement('p');
            conLabel.appendChild(Ap);
            Ap.style = 'color:#ccffff;margin:0px;font-family: Arial;font-size: 10px;';
            Ap.innerHTML = "事件：" + feature.get('selectedEventsNum');
            var overlayId = mthis.setOverlay(feature.getGeometry().flatCoordinates,ovdiv,overlayId,'top-left');
            mthis.routeMap.map.addOverlay(overlayId);
        },
        setPointFeatures_test(data){
            var mthis = this
            mthis.allEventIdsToFeaturesIds = {};
            mthis.allEventIds = [];
            var features = (new GeoJSON()).readFeatures(data);
            features.forEach(function(item){
                mthis.setLifeOrDiePointStyleByValue(item,'life');
                item.get('Events').forEach(function(Iitem){
                    var eventId = Iitem.id;
                    mthis.allEventIds.push(eventId);
                    mthis.allEventIdsToFeaturesIds[eventId] = item.getId();
                });
            });
            var layer = new VectorLayer({
                source: new VectorSource({
                    // features:Feature,
                    //url: '',
                    features: features,
                    format: new GeoJSON()
                }),
                style:mthis.noSelectedstyle,
                id:'eventsPointsLayer'
            });
            mthis.routeMap.addlayer(layer);
            mthis.selectPointerMove = new Select({
                condition: pointerMove
            });
            mthis.selectClick = new Select({
                condition: click
            });
            mthis.routeMap.map.addInteraction(mthis.selectPointerMove);
            mthis.routeMap.map.addInteraction(mthis.selectClick);
            mthis.selectPointerMove.on('select', function(e) {
                debugger
                if(e.selected.length > 0 && e.selected[0].get('Events') !== undefined && e.selected[0].getStyle().getImage().getFill().getColor() === mthis.lifePointColor){
                    mthis.pointSelectedAnimation(e.selected[0],'pointMove');
                    //鼠标悬浮时的信息框
                    mthis.setPointMoveOverlay(e.selected[0]);
                } else {
                    if(mthis.pointMoveListenerKey !== null && mthis.pointMoveListenerKey.type !== undefined && mthis.pointMoveListenerKey.type === "postcompose"){
                        unByKey(mthis.pointMoveListenerKey);
                    }
                    mthis.removeOverlays('pointMoveOverlay');
                }
                
            });
            mthis.selectClick.on('select', function(e) {
                if(e.selected.length > 0 && e.selected[0].get('Events') !== undefined && e.selected[0].getStyle().getImage().getFill().getColor() === mthis.lifePointColor){
                    if(mthis.pointMoveListenerKey !== null && mthis.pointMoveListenerKey.type !== undefined && mthis.pointMoveListenerKey.type === "postcompose"){
                        unByKey(mthis.pointMoveListenerKey);
                    }
                    if(mthis.pointClickListenerKey !== null && mthis.pointClickListenerKey.type !== undefined && mthis.pointClickListenerKey.type === "postcompose"){
                        unByKey(mthis.pointClickListenerKey);
                    }
                    mthis.pointSelectedAnimation(e.selected[0],'pointClick');
                } else {
                    if(mthis.pointClickListenerKey !== null && mthis.pointClickListenerKey.type !== undefined && mthis.pointClickListenerKey.type === "postcompose"){
                        unByKey(mthis.pointClickListenerKey);
                    }
                }
            });

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
        heatMap_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('heatMap_button')
            if(mthis.heatMap == null){
                mthis.heatMap = new map('HeatMap_Map')
                mthis.click_heatMap()
            }  
            //document.body.style.zoom = 1
            //setTimeout( function() { mthis.routeMap.map.updateSize();}, 2000);
            
        },
        route_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('route_button')
            if(mthis.legend == null){
                //mthis.click_route()
            }
            
        },
        clickButtonOpenDiv(id){
            var mthis = this
            mthis.mapDivbuttonIds.forEach(function(item){
                var button = document.getElementById(item)
                var bottonName = item.split('_')[0]
                var classname = ''
                if(item == id){
                    classname = 'button-div-click';
                } else {
                    classname = 'button-div';
                }
                button.className = classname
            })
            var locationRoute_Map = document.getElementById('locationRoute_Map')
            var HeatMap_Map = document.getElementById('HeatMap_Map')
            if(id == 'heatMap_button'){
                locationRoute_Map.style.display = 'none'
                HeatMap_Map.style.display = 'block'
            } else {
                locationRoute_Map.style.display = 'block'
                HeatMap_Map.style.display = 'none'
            }
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
        changedrawType(object){
            var mthis = this
            var map = mthis.routeMap.map
            map.removeInteraction(mthis.draw);
            map.removeInteraction(mthis.selectPointerMove);
            map.removeInteraction(mthis.selectClick);
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
                    geometryFunction: geometryFunction              // 几何信息变更时的回调函数
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
                mthis.geometrySelectedEventIds = mthis.selectEventPointsByGeometry_test(geometry);
                mthis.routeMap.map.removeInteraction(draw);
                mthis.routeMap.map.addInteraction(mthis.selectPointerMove);
                mthis.routeMap.map.addInteraction(mthis.selectClick);
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
                    mthis.setLifeOrDiePointStyleByValue(item,'life');
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
                    item.get('Events').forEach(function(Iitem){
                        frameselectedEventIds.push(Iitem.id);
                    })
                    
                } else {
                    item.setStyle(mthis.graystyle);
                }
            });
            return frameselectedEventIds
        },
        selectEventPointsByGeometry_test(geometry){   
            var mthis = this
            var frameselectedEventIds = [];
            //mthis.geometrySelectedFeatures = [];
            var num = 0;
            var selectingPointSource = mthis.getLayerById("eventsPointsLayer").getSource();
            //mthis.selectedPointsSource.clear();
            selectingPointSource.getFeatures().forEach(function(item) {
                var coord = item.getGeometry().getCoordinates();
                var isIn = geometry.intersectsCoordinate(coord);
                 mthis.setSelectedEventFeatureParam(item,'isGeometrySelected',false);
                if (isIn) {
                    //mthis.geometrySelectedFeatures.push(item);
                    //mthis.setSelectedEventFeatureParam(item,'isGeometrySelected',true);
                    item.get('Events').forEach(function(Iitem){
                        frameselectedEventIds.push(Iitem.id);
                    })
                    num++;
                } else {
                    //item.setStyle(mthis.graystyle);
                    //mthis.setSelectedEventFeatureParam(item,'isGeometrySelected',false);
                }
            });
            return frameselectedEventIds
        },

        setSelectedEventFeatureParam(feature,selectType,isSelected){  
            var mthis = this;
            if(isSelected){
                //feature.setStyle(mthis.selectedstyle);
                mthis.setLifeOrDiePointStyleByValue(feature,'life');
                feature.set(selectType,true,false)
            } else {
                mthis.setLifeOrDiePointStyleByValue(feature,'die');
                feature.set(selectType,false,false)
            }
            
        },
        setLifeOrDiePointStyleByValue(feature,lifeOrdie){
            var mthis = this;
            /* if(feature.getStyle() !== null && feature.getStyle().getImage().getFill().getColor() === mthis.lifePointColor){
                return;
            } */
            var eventNum = feature.get('Events').length;
            var fRadius = 0;
            if(eventNum > 10){
                fRadius = 13;
            } else {
                fRadius = eventNum + 2;
            }
            var lifeSelectedstyle = new Style({
                image : new CircleStyle({
                    radius : fRadius,
                    fill : new Fill({
                        color : mthis.lifePointColor //'#33ffff'
                    })
                })
            });
            var dieSelectedstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.diePointColor //'#33ffff'
                    })
                })
            });
            if(lifeOrdie === 'life'){
                feature.setStyle(lifeSelectedstyle);
            } else {
                feature.setStyle(dieSelectedstyle);
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
        click_heatMap(){
            var mthis = this
            var seachCondition = [];
            mthis.test_HeatMap.forEach(function(item){
                var a = new EqualTo('name', item.city);
                seachCondition.push(a);
            });
            var filter = new Or(seachCondition[0],seachCondition[1],seachCondition[2],seachCondition[3]);
            mthis.getWfsData(filter);
            //查询条件的嵌套关系
        },
        getWfsData(filter) {
        var mthis = this
            //获取wms生成的资源url， fdLayer.getSource().getGetFeatureInfoUrl
            var featureRequest = new WFS().writeGetFeature({
                srsName : 'EPSG:4326',//坐标系统
                featureNS : 'http://10.60.1.142:8082/worldBaseMap',//命名空间 URI
                featurePrefix : 'worldBaseMap',//工作区名称
                featureTypes : [ 'World_states_provinces' ],//查询图层，可以同一个工作区下多个图层，逗号隔开
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
                mthis.setheatMap(features);
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
            //heatMap_source.addFeatures(features);
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
        deletePoints(){
            var mthis = this;
            var source = mthis.getLayerById('eventsPointsLayer').getSource();
            for(let i = source.getFeatures().length - 1; i >= 0 ; i--){
                if(source.getFeatures()[i].getStyle().getImage().getFill().getColor() === mthis.lifePointColor){
                    mthis.removeFeaturesArr.push(source.getFeatures()[i]);
                    source.removeFeature(source.getFeatures()[i]);
                }
            }
            /* mthis.geometrySelectedFeatures = [];
            mthis.timeSelectedFeatures = [];
            mthis.staticsSelectedFeatures = []; */
        },
        
        /*
        *
        * @param图片轮播的反选
        * 
        */
        invertSelectionSliderImgs(){
            var mthis = this
            
            var invertSelectIds = [];
            mthis.allImgIds.forEach(function(item,index,arr){
                for(var i = mthis.onImgIds.length - 1; i >= 0; i--){
                    if(item == mthis.onImgIds[i]){
                        mthis.offImgClick(item);
                        break;
                    }
                    if(i == 0){
                        mthis.onImgClick(item);
                        invertSelectIds.push(item);
                    }
                }
            });
            mthis.onImgIds = invertSelectIds;
        },
















        //=======================================================================================
        //通用函数
        /**
         * @param 创建overlay
         *  coor：放置坐标, element：overlay中放置的节点, id：overlay的id, positioning：放置方式（bottom-left、bottom-center、bottom-right 、center-left、center-center、center-right、top-left、top-center、top-right，默认是 top-left，也就是 element 左上角与 position 重合r等）
         */
        setOverlay(coor, element, id, positioning){
            var mthis = this
            var overlay = new Overlay(({
                element: element,
                id:id,
                stopEvent:false,
                position:coor,
                positioning:positioning,
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
        //根据id获取layer
        getLayerById(layerId){
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
            var featureId = mthis.allEventIdsToFeaturesIds[id];
            var feature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId);
            if(feature.getStyle().getImage().getFill().getColor() !== mthis.lifePointColor){
                //m
            }
        },
        itemIndexInArr(item,arr){
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
            
        },
        changeEveryFeatureSelectedEventsNumAndStyleByids(ids){
            var mthis = this;
            var featureIds = [];
            var selectedNum = [];
            var source = mthis.getLayerById('eventsPointsLayer').getSource();
            ids.forEach(function(item){
                var featureId = mthis.allEventIdsToFeaturesIds[item];
                var index = mthis.itemIndexInArr(featureId,featureIds);
                if(index === -1){
                    featureIds.push(featureId);
                    selectedNum.push(1);
                } else {
                    ++selectedNum[index];
                }
            })
            featureIds.forEach(function(Item,index){
                var feature = source.getFeatureById(Item);
                feature.set('selectedEventsNum',selectedNum[index],false);
                mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',true);
            })
        }

    },
    computed:mapState ([
      'tmss','split','geoHeight','geoTimeCondition','geo_selected_param'
    ]),
    
    watch:{
        timeSelectedEventIds:function(){
            var mthis = this;
            mthis.changeEveryFeatureSelectedEventsNumAndStyleByids(mthis.timeSelectedEventIds);
            var selectedEventsParam = {
                type:'GeoTime',
                eventId:mthis.timeSelectedEventIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedEventsParam); 
        },
        geometrySelectedEventIds:function(){
            var mthis = this;
            mthis.changeEveryFeatureSelectedEventsNumAndStyleByids(mthis.geometrySelectedEventIds);
            var selectedEventsParam = {
                type:'GeoView',
                eventId:mthis.geometrySelectedEventIds
            };
            mthis.$store.commit('setGeoSelectedParam',selectedEventsParam); 
        },
        geo_selected_param:function(){},
        geoTimeCondition:function(){
            var mthis = this;
            mthis.timeCondition = [util.getTimestamp(mthis.$store.state.geoTimeCondition[0]),util.getTimestamp(mthis.$store.state.geoTimeCondition[1])];
        },
        timeCondition:function(){
            var mthis = this;
            var ids = [];
            var selectedIds = [];
            if(mthis.geometrySelectedEventIds.length === 0 && mthis.staticsSelectedEventIds.length === 0){
                //全量
                ids = mthis.allEventIds;
            } else if(mthis.geometrySelectedEventIds.length !== 0 && (mthis.geometrySelectedEventIds.length <= mthis.staticsSelectedEventIds.length || mthis.staticsSelectedEventIds.length === 0)){
                //view
                ids = mthis.geometrySelectedEventIds;
            } else{
                //statics
                ids = mthis.staticsSelectedEventIds;
            }
            ids.forEach(function(item){
                var featureId = mthis.allEventIdsToFeaturesIds[item];
                var feature = mthis.getLayerById('eventsPointsLayer').getSource().getFeatureById(featureId);
                var eventTime = '';
                var featrueEvents = feature.get('Events');
                mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',false);
                for(let i = 0; i < featrueEvents.length; i++){
                    if(item === featrueEvents[i].id){
                        eventTime = featrueEvents[i].time;
                        break;
                    }
                }
                if(eventTime !== '' && util.getTimestamp(eventTime) >= mthis.timeCondition[0] && util.getTimestamp(eventTime) <= mthis.timeCondition[1]){
                    //mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',true);
                    selectedIds.push(item);
                } else {
                    //mthis.setSelectedEventFeatureParam(feature,'isTimeSelected',false);
                }
            })
            mthis.timeSelectedEventIds = selectedIds;
            /* var selectedFeatures;
            if(mthis.staticsSelectedFeatures.length > 0){
                selectedFeatures = mthis.geometrySelectedFeatures;
            } else {
                selectedFeatures = mthis.geometrySelectedFeatures;
            }
            selectedFeatures.forEach(function(item){
                if(item.get('Time') !== undefined && util.getTimestamp(item.get('Time')[0]) >= mthis.timeCondition[0] && util.getTimestamp(item.get('Time')[0]) <= mthis.timeCondition[1]){
                    item.setStyle(mthis.noSelectedstyle);
                    mthis.timeSelectedFeatures.push(item);
                } else {
                    item.setStyle(mthis.graystyle);
                }
            }) */
            //var eventFeatures = mthis.getLayerById("eventsPointsLayer").getSource().getFeatures();
            //var selectedEvents = mthis.isEventPointsSelected();
            /* if(selectedEvents.length > 0){
                selectedEvents.forEach(function(item){
                    if(item.get('Time') !== undefined && util.getTimestamp(item.get('Time')[0]) >= mthis.timeCondition[0] && util.getTimestamp(item.get('Time')[0]) <= mthis.timeCondition[1]){
                        item.setStyle(mthis.selectedstyle);
                    } else {
                        item.setStyle(mthis.noSelectedstyle);
                    }
                })
                
            } else {
                for(let j = 0; j < eventFeatures.length; j++){
                    if(eventFeatures[j].get('Time') !== undefined && util.getTimestamp(eventFeatures[j].get('Time')[0]) >= mthis.timeCondition[0] && util.getTimestamp(eventFeatures[j].get('Time')[0]) <= mthis.timeCondition[1]){
                        eventFeatures[j].setStyle(mthis.selectedstyle);
                    } else{
                        eventFeatures[j].setStyle(mthis.noSelectedstyle);
                    }
                }
            }  */       
        },
        tmss:function(){
            var mthis = this
            if(mthis.tmss == 'geo'){
                this.$nextTick(function(){
                    var mthis = this
                    mthis.location_cilck()  //初始化时开启location
                });
            }
            
        },
        split:function(){
            var mthis = this;
            if(mthis.$store.state.tmss == 'geo'){
                mthis.geoWidth = document.documentElement.clientWidth * mthis.split - 20 + 'px';
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
    }
}
</script>
