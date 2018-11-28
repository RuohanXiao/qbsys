import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import Projection from 'ol/proj/Projection'
import View from 'ol/View'
import Map from 'ol/Map'
import {defaults as defaultControls, ScaleLine} from 'ol/control.js'


var map = function(target){
	var bounds = [75, 6,140, 55];//范围
    var scaleLineControl = new ScaleLine();
	//中国各省底图（面）
    var wmsTileLayer = new TileLayer({
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
    //设置地图投影
    var projection = new Projection({
        code: 'EPSG:4326',//投影编码
        units: 'degrees',
        axisOrientation: 'neu'
    });

    //设置地图
    var view = new View({
            //设置投影
			projection: projection,
			minZoom : 3,
            maxZoom : 9,
            extent:[-180, -90, 180, 90]  
        });
    this.map = new Map({
        //地图中的比例尺等控制要素
		controls: defaultControls().extend([
			scaleLineControl
		  ]),
        //设置显示的容器
        target: target,
        //设置图层
        layers: [
            //添加图层
            wmsTileLayer
        ],
        //设置视图
        view: view
    });
    
    this.addlayer = function(layer){
    	this.map.addLayer(layer);
    };
    
    /* this.hidemap = function(target){
    	//this.map.addLayer(layer);
    	var map = document.getElementById(target);
    	map.style='display:none';
    }; */

    //地图显示
    this.map.getView().fit(bounds, this.map.getSize());
    //this.map.render();
};
export  {map}
