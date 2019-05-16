import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import Projection from 'ol/proj/Projection'
import View from 'ol/View'
import Map from 'ol/Map'
import {defaults as defaultControls, ScaleLine, FullScreen,ZoomSlider} from 'ol/control.js'

var map = function(target){
	var bounds = [75, 6,140, 55];//范围
	//世界地图
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

    //世界底图标注图层
    var countriesAndProvinces_labelLayer = new TileLayer({
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
			/* new ScaleLine(), */new FullScreen(),new ZoomSlider()
		  ]),
        //设置显示的容器
        target: target,
        //设置图层
        layers: [
            //添加图层
            wmsTileLayer,
            countriesAndProvinces_labelLayer
        ],
        //设置视图
        view: view
    });
    //this.map.addControl();
    this.addlayer = function(layer){
    	this.map.addLayer(layer);
    };
    this.map.on('movestart',function(evt){
        evt.map.getTargetElement().style.cursor = 'move';
    });
    this.map.on('moveend',function(evt){
        evt.map.getTargetElement().style.cursor = 'auto';
    })
    
    this.addRightClickInLayer = function(layer,callBack){
        var mthis = this;
        //var RClickLayer = layer;
        var mapDiv = mthis.map.getViewport();
        mapDiv.addEventListener("contextmenu", function(event){
            event.preventDefault();//屏蔽自带的右键事件
            var RClickLayer = layer;
            var coordinate = mthis.map.getEventCoordinate(event);
            //callBack(layer,coordinate);
            callBack(wmsTileLayer,coordinate);
            //callBack(rcL,)

        })
    };
    //地图显示
    this.map.getView().fit(bounds, this.map.getSize());
};
export  {map}