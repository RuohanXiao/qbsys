<template>
    <div>
        <div class='operationButtonDiv'>
            <div id='location_button' :class="locationClassObject" @click='location_cilck'>location</div>
            <div id='heatMap_button'  :class="heatMapClassObject" @click='heatMap_cilck'>heatMap</div>
            <div id='route_button'  :class="routeClassObject" @click='route_cilck'>route</div>
            <select id="draw_type"  @change="changedrawType" style="float: right;">                                        
                <option value="None">No-Draw</option>
                <option value="Polygon">polygon</option>
                <option value="rectangle">rectangle</option>
                <option value="Circle">circle</option>                                   
            </select>
        </div>
        <div>
            <div id='locationRoute_Map' style="display:block;"><div id='legendDiv'></div>
            <div id="main" style='margin-left: 0px;margin-top: 0px; position: fixed;z-index:9;bottom:0;width:100%;'>
                <div style='margin: 0 0 0 0;background:none;border:none' class='flexslider'>
                    <ul class='slides'>
                        <img-slider :imgS='imgslider' @imgId='imgClick' v-for='imgslider in test_Route'></img-slider>
                    </ul>
                </div>
                
            </div>
        </div>
            <div id='HeatMap_Map' style="display:none;"></div>
        </div>
    </div>
</template>

<style>
.operationButtonDiv{
    width:100%;
}
.location_click{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background: #a9ca13;
}
.location_Noclick{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background: #064a4d;
}
.heatMap_click{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background-color: #a9ca13;
}
.heatMap_Noclick{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background-color: #064a4d;
}
.route_click{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background-color: #a9ca13;
}
.route_Noclick{
    margin: 3px;
    float: left;
    width:30px;
    height:30px;
    background-color: #064a4d;
}

</style>

<script>

import {test_Route,test_HeatMap} from '../../dist/assets/js/geo/data.js'
import {map} from '../../dist/assets/js/geo/ChinaMap.js' 
import {getGradientColors} from '../../dist/assets/js/geo/GradientColors.js'
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
import Draw from 'ol/interaction/Draw'
import EqualTo from 'ol/format/filter/EqualTo'
import Or from 'ol/format/filter/Or'
import WFS from 'ol/format/WFS'
import GeoJSON from 'ol/format/GeoJSON'
import $ from "jquery";

import flexslider from 'flexslider'
import '../../dist/assets/styles/geo/flexslider.css'
import '../../dist/assets/styles/geo/demo.css'
import '../../dist/assets/styles/geo/mapInit.css'

import imgSlider from "./custom_imgSlider";


export default {
    name: 'OperationButtons',
    data() {
      return {
        test_Route:test_Route,
        test_HeatMap:test_HeatMap,
        routeMap:null,
        heatMap:null,
        provinTilSource:null,
        entityPointsColor: '#33ffff',//初始化加载时的实体点颜色
        frameSelectedColor: '#ff9900',//拉框选中后的实体点颜色
        imgSelectedEntityPoints : [], //点击头像时选择的所有实体点
        frameSelectedEntityPoints : [],  //拉框时选择的所有实体点
        draw:null,
        //map:this.routeMap.map,
        locationClassObject:{
            location_Noclick: true,
            'location_click': true,
            //IslocaltionClicked:false
        },
        heatMapClassObject:{
            heatMap_Noclick: true,
            'heatMap_click': true,
        },
        routeClassObject:{
            route_Noclick:true,
            'route_click': true
        }
        
      }
    },
    mounted(){
        this.init()
    },
    methods:{
        init  () {
            var mthis = this
            mthis.location_cilck()
            mthis.routeMap = new map('locationRoute_Map')
            mthis.provinTilSource = new TileWMS({
                url: 'http://10.60.1.142:8082/geoserver/worldBaseMap/wms',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    LAYERS: 'worldBaseMap:World_states_provinces',
                }
            })
            mthis.setPointFeatures(test_Route)
            mthis.locationPoints()
        },
        location_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('locationRoute_Map')
            mthis.locationClassObject.location_Noclick = false
            mthis.heatMapClassObject.heatMap_Noclick = true
            mthis.routeClassObject.route_Noclick = true
        },
        heatMap_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('HeatMap_Map')
            mthis.locationClassObject.location_Noclick = true
            mthis.heatMapClassObject.heatMap_Noclick = false
            mthis.routeClassObject.route_Noclick = true
            mthis.IslocaltionClicked = false
            if(mthis.heatMap == null){
                mthis.heatMap = new map('HeatMap_Map')
                mthis.click_heatMap()
            }
            
            
        },
        route_cilck(){
            var mthis = this
            mthis.clickButtonOpenDiv('locationRoute_Map')
            mthis.locationClassObject.location_Noclick = true
            mthis.heatMapClassObject.heatMap_Noclick = true
            mthis.routeClassObject.route_Noclick = false
        },
        clickButtonOpenDiv(id){
            var locationRoute_Map = document.getElementById('locationRoute_Map')
            var HeatMap_Map = document.getElementById('HeatMap_Map')
            if(id == 'locationRoute_Map'){
                locationRoute_Map.style.display = 'block'
                HeatMap_Map.style.display = 'none'
            } else {
                locationRoute_Map.style.display = 'none'
                HeatMap_Map.style.display = 'block'
            }
        },
        setPointFeatures(pointsData){
            var mthis = this
            var entityPointsSource = new VectorSource()
            var entityPoint_layer = new VectorLayer({
                id : 'entityPointsLayer',
                source : entityPointsSource
            })
            mthis.routeMap.addlayer(entityPoint_layer)
            var style = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.entityPointsColor
                    })
                })
            })
            pointsData.forEach(function(item){
                for(var i = 0; i < item.route.length; i++){
                    var pointFeature = new Feature({
                        geometry:new Point(item.route[i].coordinate),
                        properties:{
                            id:item.route[i].pointId,
                            belongId:item.id,
                            belongName:item.name,
                            name:item.route[i].name
                        }
                    })
                    pointFeature.setStyle(style)
                    entityPointsSource.addFeature(pointFeature)
                }
            })
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
            var features = mthis.getLayerById("entityPointsLayer").getSource().getFeatures();
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
                                    contryName = feature.properties.admin;
                                } else {
                                }
                            }
                        });
                };
                var conLabel = document.createElement('div');
                var Lp = document.createElement('p');
                conLabel.appendChild(Lp);
                Lp.style = 'color:#ccffff;padding-left:10px;font-size:6px;margin:0px;';
                Lp.innerHTML = provinName + ' - ' + contryName;
                var localtion_Overlay = mthis.setOverlay(Coor,conLabel,'localtion_Overlay','center-left');
                map.addOverlay(localtion_Overlay);
                map.render();
            });
            mthis.creatPicSlider();
        },
        creatPicSlider(){
            var mthis = this
            $('.flexslider').flexslider({
                animation: "slide",
                    animationLoop: false,
                    mousewheel: true,
                    itemWidth: 50,
                    minItems: 1,
                    maxItems: 2
            });
        },
        imgClick(imgId){
            var mthis = this
            debugger
            var obj = imgId
            var id = obj.id.split('_')[0]
            var entityPointstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.entityPointsColor
                    })
                })
            });
            if(obj.children[0].style.borderColor == "rgba(204, 255, 255, 0)"){  //点击关闭
                var idN = 'pointAnimation_' + id;
                mthis.removeOverlays(idN);
                var layer = mthis.routeMap.map.getLayers().getArray();
                
                for(var i = 0; i < layer.length; i++){
                    if(layer[i].getProperties().id == 'entityPointsLayer'){
                        var features = layer[i].getSource().getFeatures();//.getProperties().properties.belongId
                        features.forEach(function(ItemF){
                            if(ItemF.getProperties().properties.belongId == id){
                                ItemF.setStyle(entityPointstyle);
                                deleteArrItem(this.imgSelectedEntityPoints,ItemF);
                            }
                        });
                        break;
                    }
                }               
            } else{  //点击开启
                var entityPoints = mthis.getLayerById("entityPointsLayer").getSource().getFeatures();
                var returnId = [];
                if(mthis.frameSelectedEntityPoints.length == 0){  //判断是否有过拉框选择
                    entityPoints.forEach(function(item) {
                        if (item.getProperties().properties.belongId == id) {
                            mthis.pointAnimation(item);
                            returnId.push(item.getProperties().properties.name);
                            mthis.imgSelectedEntityPoints.push(item);
                        }
                    });
                    console.log(returnId);
                } else {
                    entityPoints.forEach(function(item) {
                        if (item.getProperties().properties.belongId == id) {  //判断实体点的id时候为我们需要点亮的点的id
                            if(mthis.isPointInPointsArr(item,mthis.frameSelectedEntityPoints)){  //判断点是否在拉框选择的范围内
                                mthis.setpointStyle(item,mthis.frameSelectedColor);
                                mthis.pointAnimation(item);
                                mthis.imgSelectedEntityPoints.push(item);
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
                    console.log(returnId);
                }
                
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
            var point_overlay = mthis.setOverlay(point.getGeometry().getCoordinates(),point_animation,point_animation_id, 'center-center');
            mthis.routeMap.map.addOverlay(point_overlay);
            mthis.routeMap.map.render();
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
        changedrawType(object){
            var mthis = this
            var map = mthis.routeMap.map
            map.removeInteraction(mthis.draw);
            //矢量图层是用来渲染矢量数据的图层类型，在OpenLayers里，它是可以定制的，可以控制它的透明度，颜色，以及加载在上面的要素形状等。
            var Vecsource = new VectorSource({
                features : new Collection()
            });
            var polygonLayer = new VectorLayer({
                source : Vecsource,
                /*图形绘制好时最终呈现的样式,显示在地图上的最终图形*/
                style : new Style({
                    fill : new Fill({
                        color : 'rgba(0, 0, 0, 0.5)'
                    }),
                    stroke : new Stroke({
                        color : '#33E4E4',
                        width : 2
                    }),
                    image : new CircleStyle({
                        radius : 7,
                        fill : new Fill({
                            color : 'rgba(255, 0, 0, 0.6)'
                        })
                    })
                })
            });
            map.addLayer(polygonLayer);
            var opt = object.target;
            var typeValue = object.target.value;
            var geometryFunction, maxPoints;
            if (opt.value != "None") {
                if (opt.value == "rectangle") {
                    typeValue = 'LineString'; // 设置绘制类型为LineString
                    maxPoints = 2; // 设置最大点数为2
                    geometryFunction = function(coordinates, geometry) {
                        if (!geometry) {
                            geometry = new Polygon(null); // 多边形
                        }
                        var start = coordinates[0];
                        var end = coordinates[1];
                        geometry.setCoordinates([ [ start, [ start[0], end[1] ], end,
                                [ end[0], start[1] ], start ]

                        ]);
                        return geometry;
                    };
                }
                // console.log(typeValue);
                // 实例化图形绘制控件对象并添加到地图容器中
                mthis.draw = new Draw({
                    source: Vecsource,
                    type: typeValue,                                // 几何图形类型
                    geometryFunction: geometryFunction,             // 几何信息变更时的回调函数
                    maxPoints: maxPoints                            //最大点数
                });
                mthis.draw_polygon(mthis.draw);
                map.addInteraction(mthis.draw);
            } 
            map.removeLayer(polygonLayer);
        },

        draw_polygon(draw) {
            var mthis = this
            draw.on('drawstart',function(){
                mthis.removeSelectedPoints(mthis.frameSelectedColor, mthis.entityPointsColor);
            });
            draw.on('drawend', function(obj) {
                //var vectorSource = new ol.source.Vector();
                var feature = obj.feature;
                var geometry = feature.getGeometry();
                mthis.selectedEntityPoints(geometry);
                mthis.routeMap.map.removeInteraction(draw);
            });
        },
        //颜色转换，移除被选择的实体点
        removeSelectedPoints(RemovedColor,changeColor){
            var mthis = this
            var selectingPointSource = mthis.getLayerById("entityPointsLayer").getSource();
            var changePointstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : changeColor
                    })
                })
            });
            selectingPointSource.getFeatures().forEach(function(item){
                if(item.getStyle() != null && item.getStyle().getImage().getFill().getColor() == RemovedColor){
                    item.setStyle(changePointstyle);
                }
            });
        },
        //拉框选择实体点
        selectedEntityPoints(geometry,selectedColor){
            var mthis = this
            var frameselectedpoints = [];
            var selectingPointSource = mthis.getLayerById("entityPointsLayer").getSource();
            var frameSelectedPointstyle = new Style({
                image : new CircleStyle({
                    radius : 3,
                    fill : new Fill({
                        color : mthis.frameSelectedColor
                    })
                })
            });
            var Returnid = [];
            if (mthis.imgSelectedEntityPoints.length != 0) {
                selectingPointSource.getFeatures().forEach(function(item) {
                    if (mthis.isPointInPointsArr(item,mthis.imgSelectedEntityPoints)) {
                        var coord = item.getGeometry().getCoordinates();
                        var isIn = geometry.intersectsCoordinate(coord);
                        if (isIn) {
                            //frameSelectedEntityPoints.push(item);
                            mthis.setpointStyle(item,mthis.frameSelectedColor);
                            var overlayId = 'pointAnimation_'
                                + item.getProperties().properties.belongId
                                + "_"
                                + item.getProperties().properties.id;
                            var tarOverlayer = mthis.routeMap.map.getOverlayById(overlayId);
                            tarOverlayer.getElement().style.background = item.getStyle().getImage().getFill().getColor();
                            // 传回数据，展示点信息
                            Returnid.push(item.getProperties().properties.name);
                        }
                    } 
                });
            } else {
                selectingPointSource.getFeatures().forEach(function(item) {
                    var coord = item.getGeometry().getCoordinates();
                    var isIn = geometry.intersectsCoordinate(coord);
                    if (isIn) {
                        frameselectedpoints.push(item);
                        item.setStyle(frameSelectedPointstyle);
                        // 传回数据，展示点信息
                        Returnid.push(item.getProperties().properties.name);
                    }
                });
            }
            mthis.frameSelectedEntityPoints = frameselectedpoints;
            console.log(Returnid);
        },
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

        //==========================================================================
        //路径
        click_route(){
            var mthis = this
            if(document.getElementById('legendButtonDiv')){
                return;
            } else{
                //生成图例
                var legendTable = mthis.creatRouteLegendRoom();
                test_Route.forEach(function(Item){
                    mthis.creatLegendItem(legendTable,Item.name,Item.id);
                });
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
        }

    },
    watch:{
        locationClassObject:{
                handler:function(val,oldval){
                    var locationRoute_Map = document.getElementById('locationRoute_Map');
                    if(oldval.location_Noclick){
                        //locationRoute_Map.
                    }
                },
                deep:true//对象内部的属性监听，也叫深度监听
        }

    },
    components: {
      imgSlider
    }
}

</script>
