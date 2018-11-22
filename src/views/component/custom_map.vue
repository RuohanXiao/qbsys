<template>
  <div :style="{backgroundColor:'rgb(0,0,0)',margin:'0px'}">
    <div style="width:100%">
		<select id="draw_type" onchange="changedrawType(this)"
			style="float: right;">
			<option value="None">No-Draw</option>
			<option value="Polygon">polygon</option>
			<option value="rectangle">rectangle</option>
			<option value="Circle">circle</option>
		</select> <select id="map_type" onchange="changemapType(this)"
			style="float: right;">
			<option value="vec_c">vec</option>
			<option value="img_c">img</option>
		</select>
		<button id='location' onclick="click_location()" style="float:left">location</button>
		<button id='hotMap' onclick="click_hotMap()" style="float:left">hotMap</button>
		<button id='route' onclick="click_route()" style="float:left">route</button>
	</div>
	<div id="map">
		<div id='legendDiv'></div>
		<div id="main" role="main" style='margin-left: 0px;margin-top: 0px; position: fixed;z-index:9;bottom:0;width:100%;'>
		   <section id='slider' class="slider"></section>
		</div>
	</div>
	<div id="heatMap"></div>
  </div>
</template>
<script>
import '../../dist/assets/styles/geo/ol.css'
import '../../dist/assets/styles/geo/mapInit.css'
import '../../dist/assets/styles/geo/demo.css'
import '../../dist/assets/styles/geo/flexslider.css'
import '../../dist/assets/js/geo/import/Slider/css/slider.css'


export default {
name: "App",
  data() {
    return {}
  },
  created() {
  },
  computed: {
  },
  mounted() {
    require.ensure([], function() {
    //   var testData = require('../../dist/assets/js/geo/test/TestData.js')
    //  var ol = require('../../dist/assets/js/geo/openlayers/ol.js')
    //   var arc = require('../../dist/assets/js/geo/geometryType/Arc.js')
    //   var bezierLine = require('../../dist/assets/js/geo/geometryType/BezierLine.js') //Failed to load resource: net::ERR_CONNECTION_REFUSED
    //   var jquery = require('../../dist/assets/js/geo/openlayers/jquery.min.js')
      
      var mapinit = require('../../dist/assets/js/geo/mapInit.js')
    })
  }
}
</script>
