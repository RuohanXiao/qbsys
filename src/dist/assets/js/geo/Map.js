import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import Projection from 'ol/proj/Projection'
import View from 'ol/View'
import Map from 'ol/Map'
import {defaults as defaultControls, ScaleLine, FullScreen,ZoomSlider} from 'ol/control.js'
import {getCenter} from 'ol/extent.js';


//定义类
class map {
    constructor(target) {
        this.target = target;
    };
    init(){
        var bounds = [75, 6,140, 55];//范围
        var worldStreetLayer = new TileLayer({
            visible: true,
            source: new TileWMS({
                url: 'http://10.60.1.142:8082/geoserver/gwc/service/wms?',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    LAYERS: 'worldBaseMap:worldImgBaseMapGroup',
                }
            })
        });
        var worldLabelLayer = new TileLayer({  //世界底图标注图层
            visible: true,
            source: new TileWMS({
                url: 'http://10.60.1.142:8082/geoserver/gwc/service/wms?',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    LAYERS: 'worldBaseMap:countriesAndProvinces_label',
                }
            })
        });
        
        var projection = new Projection({   //设置地图投影
            code: 'EPSG:4326', //投影编码
            units: 'degrees',
            axisOrientation: 'neu'
        });

        
        var view = new View({  //设置地图
                //设置投影
                projection: projection,
                minZoom : 3,
                maxZoom : 9,
                extent:[-180, -90, 180, 90]  
            });
        this.map = new Map({
            //地图中的比例尺等控制要素
            controls: defaultControls().extend([
                /* new ScaleLine(), */new FullScreen(),new ZoomSlider()
                ]),
            //设置显示的容器
            target: this.target,
            //设置图层
            layers: [
                //添加图层
                worldStreetLayer,
                worldLabelLayer
            ],
            //设置视图
            view: view
        });
        this.map.on('movestart',function(evt){
            evt.map.getTargetElement().style.cursor = 'move';
        });
        this.map.on('moveend',function(evt){
            evt.map.getTargetElement().style.cursor = 'auto';
        })
        this.map.getView().fit(bounds, this.map.getSize());
    };

    addRightClickInLayer(layer,callBack){  //添加右键点击事件
        var mthis = this;
        var mapDiv = mthis.map.getViewport();
        mapDiv.addEventListener("contextmenu", function(event){
            event.preventDefault();//屏蔽自带的右键事件
            var coordinate = mthis.map.getEventCoordinate(event);
            callBack(layer,coordinate);
        })
    };
    addLayer(layer){
    	this.map.addLayer(layer);
    };
    removeLayer(layer){
        this.map.removeLayer(layer);
    };
    getLayer(layerId){
        var layers = this.map.getLayers().getArray();
        for(var i = 0; i<layers.length; i++){
            if(layers[i].getProperties().id == layerId){
                return layers[i];
            }
        }
    };
    getLayers(){
        var layerColls = this.map.getLayers();
        return layerColls;
    };
    addFeatures(features,layerId){
        var layer = this.getLayer(layerId);
        layer.getSource().addFeatures(features);
    };
    addFeature(feature,layerId){
        var layer = this.getLayer(layerId);
        layer.getSource().addFeature(feature);
    };
    addInteraction(interaction){  //添加地图交互
        this.map.addInteraction(interaction);
    };
    removeInteraction(interaction){  //移除地图交互
        this.map.removeInteraction(interaction);
    };
    getFeaturesByIds(ids,layerId){
        var source = this.getLayer(layerId).getSource();
        var features = [];
        for(let i = 0; i < ids.length; i++){
            let id = ids[i];
            features.push(source.getFeatureById(id));
        }
        return features;
    }
    viewAnimate(extent){
        this.map.getView().animate({
            center: getCenter(extent),
            duration: 1000
        });
    }

    
        
    
}
export  {map}