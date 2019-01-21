//定位模块测试数据
var test_Location = [ {
	//name:'普京',
	coordinate : [ 117.00559998, 36.6670723 ],
	type : 'a'
}, {
	coordinate : [ 87.62695, 43.90137 ],
	type : 'a'
}, {
	coordinate : [ 101.77734, 36.60645 ],
	type : 'b'
}, {
	coordinate : [ 101.77734, 36.60645 ],
	type : 'a'
}, {
	coordinate : [ 17.62695, 52.90137 ],
	type : 'b'
} ];

//路径模块测试数据
var test_Route = [ {
	'id':0,
	'name' : "普京",
	'imageURL':'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg',
	'route' : [ {
		pointId:0,
		coordinate : [ 117.00559998, 36.6670723 ],
		type : 1,
		name : 'a',
		order : 0,
		eventId:'E1111',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:1,
		coordinate : [ 117.20349884, 39.13111877 ],
		type : 1,
		name : 'b',
		order : 1,
		eventId:'E1112',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:2,
		coordinate : [ 114.48977661, 38.04512787 ],
		type : 2,
		name : 'c',
		order : 2,
		eventId:'E1113',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
		
	}, {
		pointId:3,
		coordinate : [ 116.3809433, 39.9236145 ],
		type : 2,
		name : 'd',
		order : 3,
		eventId:'E1114',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:4,
		coordinate : [ 123.41168213, 41.7966156 ],
		type : 1,
		name : 'e',
		order : 4,
		eventId:'E1115',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	} ]
}, {
	'id':1,
	'name' : "梅德韦杰夫",
	'imageURL':'https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=472b782bd843ad4bb2234e92e36b31ca/359b033b5bb5c9ea8bd6866ddc39b6003af3b313.jpg',
	'route' : [ {
		pointId:0,
		coordinate : [ 87.62695, 43.90137 ],
		type : 1,
		name : 'a',
		order : 0,
		eventId:'E2111',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:1,
		coordinate : [ 91.14258, 29.75098 ],
		type : 1,
		name : 'b',
		order : 1,
		eventId:'E2112',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:2,
		coordinate : [ 113.55469, 22.28027 ],
		type : 2,
		name : 'c',
		order : 2,
		eventId:'E2113',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:3,
		coordinate : [ 101.77734, 36.60645 ],
		type : 2,
		name : 'd',
		order : 3,
		eventId:'E2114',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:4,
		coordinate : [ 126.65039, 45.83496 ],
		type : 1,
		name : 'e',
		order : 4,
		eventId:'E2115',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	} ]
}, {
	'id':2,
	'name' : "默克尔",
	'imageURL':'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=5b13b4f4c4fcc3cea0cdc161f32cbded/279759ee3d6d55fbaef84ef061224f4a20a4dd2d.jpg',
	'route' : [ {
		pointId:0,
		coordinate : [ 17.62695, 52.90137 ],
		type : 1,
		name : 'a',
		order : 0,
		eventId:'E3111',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:1,
		coordinate : [ 41.14258, 79.75098 ],
		type : 1,
		name : 'b',
		order : 1,
		eventId:'E3112',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:2,
		coordinate : [ 13.55469, 12.28027 ],
		type : 2,
		name : 'c',
		order : 2,
		eventId:'E3113',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:3,
		coordinate : [ 151.77734, 26.60645 ],
		type : 2,
		name : 'd',
		order : 3,
		eventId:'E3114',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	}, {
		pointId:4,
		coordinate : [ 26.65039, 15.83496 ],
		type : 1,
		name : 'e',
		order : 4,
		eventId:'E3115',
		eventType:'access', //访问
		Time:["2018-01-02","2018-01-03"],
	} ]
}];


var test_HeatMap = [ {
	'city' : 'Beijing',
	'value' : 100
}, {
	'city':'Qinghai',
	'value':50
},{
	'city' : 'Henan',
	'value' : 80
}, {
	'city':'Krasnoyarsk',
	'value':60
} ];

//=============================================================================
var EventsDatas={
	Code:1,
	data:[
		{
			//Person:['普京'],
			//Position: ['北京'],
			Time:["2002-01-02","2018-01-03"],
			EventId: 'V101',
			//PersonId:['Q111'],
			coordinate:[ 117.00559998, 36.6670723 ]
		},
		{
			//Person:['普京'],
			//Position: ['北京'],
			Time:["2005-01-02","2018-01-03"],
			EventId: 'V102',
			//PersonId:['Q111'],
			coordinate:[ 117.20349884, 39.13111877 ]
		},
		{
			//Person:['普京','习近平'],
			//Position: ['北京'],
			Time:["2007-01-02","2018-01-03"],
			EventId: 'V103',
			//PersonId:['Q111'],
			coordinate:[ 117.20349884, 39.13111877  ]
		},
		{
			//Person:['普京'],
			//Position: ['北京'],
			Time:["2007-01-02","2018-01-03"],
			EventId: 'V104',
			//PersonId:['Q111'],
			coordinate:[ 116.3809433, 39.9236145 ]
		},
		{
			Time:["2009-01-02","2018-01-03"],
			EventId: 'V105',
			coordinate:[ 123.41168213, 41.7966156 ]
		},
		{
			Time:["2011-01-02","2018-01-03"],
			EventId: 'V106',
			coordinate:[ 87.62695, 43.90137 ]
		},
		{
			Time:["2013-01-02","2018-01-03"],
			EventId: 'V107',
			coordinate:[ 91.14258, 29.75098 ]
		},
		{
			Time:["2014-01-02","2018-01-03"],
			EventId: 'V108',
			coordinate:[ 113.55469, 22.28027 ]
		},
		{
			//Person:['普京'],
			//Position: ['北京'],
			Time:["2016-01-02","2018-01-03"],
			EventId: 'V109',
			//PersonId:['Q111'],
			coordinate:[ 101.77734, 36.60645 ]
		},
		{
			//Person:['普京'],
			//Position: ['北京'],
			Time:["2018-01-02","2018-01-03"],
			EventId: 'V110',
			//PersonId:['Q111'],
			coordinate:[ 126.65039, 45.83496 ]
		}
	]
};

var eventsPointGeoJson = { "type": "FeatureCollection",
	'crs': {
		'type': 'name',
		'properties': {
		'name': 'EPSG:4326'
		}
	},
	"features": [
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 117.00559998, 36.6670723 ]},
			"properties": {
				'Time':["2002-01-02","2018-01-03"],
				'EventId': 'V101',
				'isSelected': false,
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 117.00559998, 36.6670723 ]},
			"properties": {
				'Time':["2005-01-02","2018-01-03"],
				'EventId': 'V102',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 114.48977661, 38.04512787 ]},
			"properties": {
				'Time':["2007-01-02","2018-01-03"],
				'EventId': 'V103',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 116.3809433, 39.9236145 ]},
			"properties": {
				'Time':["2007-01-02","2018-01-03"],
				'EventId': 'V104',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 123.41168213, 41.7966156 ]},
			"properties": {
				'Time':["2009-01-02","2018-01-03"],
				'EventId': 'V105',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 87.62695, 43.90137 ]},
			"properties": {
				'Time':["2011-01-02","2018-01-03"],
				'EventId': 'V106',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 91.14258, 29.75098 ]},
			"properties": {
				'Time':["2013-01-02","2018-01-03"],
				'EventId': 'V107',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 113.55469, 22.28027 ]},
			"properties": {
				'Time':["2014-01-02","2018-01-03"],
				'EventId': 'V108',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 101.77734, 36.60645 ]},
			"properties": {
				'Time':["2016-01-02","2018-01-03"],
				'EventId': 'V109',
				'isSelected': false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 126.65039, 45.83496 ]},
			"properties": {
				'Time':["2018-01-02","2018-01-03"],
				'EventId': 'V110',
				'isSelected': false
			}
		}
	]
 };

var timeStaticsData = {
					"code": 0,
					"data": {
						"time": [
							"2002-01-02",
							"2005-01-02",
							"2007-01-02",
							"2009-01-02",
							"2011-01-02",
							"2013-01-02",
							"2014-01-02",
							"2016-01-02",
							"2018-01-02"
						],
						"count": [
							1,
							1,
							2,
							1,
							1,
							1,
							1,
							1,
							1,
						]
					}
				};

var reSetTimeStaticsData = {
	"code": 0,
	"data": {
		"time": [
			"2005-01-02",
			"2007-01-02",
			"2009-01-02",
			"2013-01-02",
			"2016-01-02"
		],
		"count": [
			1,
			1,
			2,
			1
		]
	}
};

var test_mapData = {
	"code":0,
	"data":{ "type": "FeatureCollection",
	'crs': {
		'type': 'name',
		'properties': {
		'name': 'EPSG:4326'
		}
	},
	"features": [
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 117.00559998, 36.6670723 ]},
			"properties": {
				'Events': [{'id':'V101','time':"2002-01-02"},{'id':'V102','time':"2018-01-03"}],
				'localtionName':'北京',
				'isGeometrySelected': false,
				'isTimeSelected':false,
				'isStaticsSelected':false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 114.48977661, 38.04512787 ]},
			"properties": {
				'Events': [{'id':'V102','time':"2002-01-02"},{'id':'V103','time':"2018-01-03"}],
				'localtionName':'北京',
				'isGeometrySelected': false,
				'isTimeSelected':false,
				'isStaticsSelected':false
			}
		},
		{ "type": "Feature",
			"geometry": {"type": "Point", "coordinates": [ 116.3809433, 39.9236145 ]},
			"properties": {
				'Events': [{'id':'V104','time':"2002-01-02"},{'id':'V105','time':"2018-01-03"}],
				'localtionName':'北京',
				'isGeometrySelected': false,
				'isTimeSelected':false,
				'isStaticsSelected':false
			}
		}
	]
 }
};

	

export {test_Route,test_HeatMap,EventsDatas,timeStaticsData,reSetTimeStaticsData,eventsPointGeoJson,test_mapData}
