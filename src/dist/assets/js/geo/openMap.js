import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import Projection from 'ol/proj/Projection'
import View from 'ol/View'
import Map from 'ol/Map'
import {defaults as defaultControls, ScaleLine, FullScreen,ZoomSlider} from 'ol/control.js'


//定义类
class map {
    constructor(target) {
        /* this.target = target; */
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
            target: target,
            view: view
        });
    };
    init(){
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
    };
    fit(extent){
        this.map.getView().fit(extent, this.map.getSize());
    }
    
    
        
    
}
export  {map}