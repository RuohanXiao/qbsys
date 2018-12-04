<template>
  <div>
    <div :style="{height:'55px',backgroundColor: 'rgba(51, 255, 255, 0.1)',margin:'0 14px 0 14px'}" id="net">
      <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{height:'70px',paddingLeft:'10px'}">
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="后退" placement="bottom">
          <Icon class="icon iconfont icon-fanhui process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="框选" placement="bottom">
          <Icon class="icon iconfont icon-selection-box process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="矩形" placement="bottom">
          <Icon class="icon iconfont icon-grid process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" ></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="星形" placement="bottom">
          <Icon class="icon iconfont icon-star process-img DVSL-bar-btn DVSL-bar-btn-back" align="center"  size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="层级" placement="bottom">
          <Icon class="icon iconfont icon-expand process-img DVSL-bar-btn DVSL-bar-btn-back" size="26" ></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="扩展节点" placement="bottom">
          <Icon class="icon iconfont icon-linkedby process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="查找关联" placement="bottom">
          <Icon class="icon iconfont icon-linkedby process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="显示路径" placement="bottom">
          <Icon class="icon iconfont icon-path process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="删除节点" placement="bottom">
          <Icon class="icon iconfont icon-delete-point process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="反选节点" placement="bottom">
          <Icon class="icon iconfont icon-delete process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col align="middle">
        <div style="float:center;width: 1px;height: 25px; background: rgba(51, 255, 255, 0.2)"></div>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="添加目标" placement="bottom">
          <Icon class="icon iconfont icon-add process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="截屏" placement="bottom">
          <Icon class="icon iconfont icon-cut process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" align="middle" class="bottom">
        <Tooltip content="保存工作集" placement="bottom">
          <Icon class="icon iconfont icon-save1 process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
        <Col span="1" offset="9" align="middle" class="bottom">
        <Tooltip content="自适应" placement="bottom">
          <Icon class="icon iconfont icon-quanping process-img DVSL-bar-btn DVSL-bar-btn-back" size="26"></Icon>
        </Tooltip>
        </Col>
      </Row>
    </div>
    <div :style="{border:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 14px',backgroundColor:'rgba(0,0,0,0.5)'}">
      <!-- <div id="geochart" aria-autocomplete="true" :style="{minHeight:netheight}"></div> -->
        <map-chart aria-autocomplete="true" :style="{minHeight:netheight}"></map-chart>
    </div>
    </Col>
  </div>
</template>
<script>
    import mapChart from './custom_map.vue'
    import mock from '../../mock/index.js'
  mock.test = 1
  /* eslint-disable */
  export default {
    name: "App",
    data() {
      return {
        dataurl:'../../dist/data/netData.json',
        netheight: 0,
        netheightdiv: 0,
        pathHoverFlag: false,
        modal_loading: false,
        selectionId: [],
        netchart: null,
        nextId: 4,
        flag: true,
        netData: [],
        selectItem: null,
        saveNum: 0,
        query : "",
        numNodes: 1000,
        areaColorMap:["#0099cc", "#ec2e2e"]
      };
    },
    components: {
      mapChart
    },
    methods: {
      tweetPostprocess(data) {
        data = JSON.parse(data);
        var result = [];
        for (var i = 0; i < data.length; i++) {
            var n = data[i];
            n.type = "point";
            n.coordinates = [n.geo_long, n.geo_lat];
            result.push(n);
        }
        return { nodes: result };
    },
    mapColor(position) {
        var count = this.areaColorMap.length - 1;
        var p0 = Math.min(count - 1, Math.floor(position * count));
        position = position * count - p0;
        var c0 = this.areaColorMap[p0];
        var c1 = this.areaColorMap[p0 + 1];
        var r1 = parseInt(c0.slice(1, 3), 16);
        var r2 = parseInt(c1.slice(1, 3), 16);
        var g1 = parseInt(c0.slice(3, 5), 16);
        var g2 = parseInt(c1.slice(3, 5), 16);
        var b1 = parseInt(c0.slice(5, 7), 16);
        var b2 = parseInt(c1.slice(5, 7), 16);
        return { red: r1 * (1 - position) + r2 * position, green: g1 * (1 - position) + g2 * position, blue: b1 * (1 - position) + b2 * position };
    },
    getNodeColor(data) {
        var str = data.tweet_text.toLowerCase();
        var isObama = str.indexOf("obama") > -1;
        var isPutin = str.indexOf("putin") > -1;
        var color;
        if (isObama && isPutin) {
            color = "orange";
        } else if (isObama) {
            color = "#09c";
        } else if (isPutin) {
            color = "#ec2e2e";
        } else {
            color = "grey";
        }

        return color;

    },
    getNodeName(data) {
        var str = data.tweet_text.toLowerCase();
        var isObama = str.indexOf("obama") > -1;
        var isPutin = str.indexOf("putin") > -1;
        var name = "";
        if (isObama && isPutin) {
            name = "obama and putin";
        } else if (isObama) {
            name = "obama";
        } else if (isPutin) {
            name = "putin";
        } else {
        }

        return name;

    },
    getOpacityByLevel(level) {
        var opacity = 0.3;
        opacity = opacity * (1 / (Math.max(level, 5) - 4));
        return opacity;
    },
    initCharts() {
        var mthis = this;
        (this.netchart = new GeoChart({
        container:document.getElementById("geochart"),
        area: { height: 500 },
        info: {
            enabled: true,
            nodeContentsFunction: function (nodeData) {
                if (nodeData.tweet_text) {
                    return "<p>" + nodeData.tweet_text.replace(/strong\>/g, "i>") + "</p>";
                } else {
                    return nodeData.name;
                }
            }
        },
        data: [
            {
                id: "shapes",
                format: "GeoJSON",
                url: "https://zoomcharts.com/dvsl/data/geo-chart/countries.geo.json",
                perDrilldownData: false,
                perZoomData: false,
                perBoundsData: false
            },
            {
                id: "twitter",
                url: "https://zoomcharts.com/dvsl/data/geo-chart/twitter.json",
                urlParameters: [
                    {
                        name: "method",
                        value: "getGeoTweets"
                    },
                    {
                        name: "limit",
                        value: "" + this.numNodes + ""
                    },
                    {
                        name: "q",
                        value: "{obama putin} " + this.query
                    }
                ],
                postprocessorFunction: this.tweetPostprocess,
                perDrilldownData: false,
                perZoomData: false,
                perBoundsData: false
            }
        ],
        background: {
            enabled: true
        },
        layers: [
            {
                id: "shapes",
                type: "shapes",
                data: {
                    id: "shapes"
                },
                style: {
                    node: { 
                        fillColor: null, 
                        lineColor: "transparent" 
                    },
                    nodeStyleFunction: function (node) {
                        node.fillColor = null;
                        node.label = node.data.name;
                    }
                }
            },
            {
                id: "twitter",
                type: "items",
                enabled: true,
                minZoom: 7,
                data: {
                    id: "twitter"
                },
                style: {
                    nodeStyleFunction: function (node) {
                        node.display = "text";
                        node.labelStyle = { textStyle: { fillColor: "white" } };
                        node.label = this.getNodeName(node.data);
                        node.fillColor = this.getNodeColor(node.data);
                        node.lineColor = "white";
                    }
                }
            },
            {
                id: "twitterPoints",
                type: "items",
                enabled: true,
                minZoom: 3,
                maxZoom: 6,
                data: {
                    id: "twitter"
                },
                style: {
                    nodeStyleFunction: function (node) {
                        node.label = "";
                        node.fillColor = this.getNodeColor(node.data);
                        node.lineColor = null;
                        node.radius = 3;
                    }
                }
            },
            {
                // The layer with shapes of the countries
                enabled: true,
                id: "twitterAggr",
                data: {
                    id: "twitter"
                },
                type: "aggregateOnShapes",
                shapesLayer: "shapes",
                aggregationFunction: function (values) {
                    var obama = 0;
                    var putin = 0;
                    for (var i = 0; i < values.length; i += 1) {
                        var data = values[i];
                        var str = data.tweet_text.toLowerCase();
                        if (str.indexOf("obama") > -1)
                            obama += 1;
                        if (str.indexOf("putin") > -1)
                            putin += 1;
                    }

                    return [obama, putin];
                },
                styleFunction: function (node, value) {
                    var obama = value[0];
                    var putin = value[1];
                    if (obama + putin > 0) {
                        var proportion = (-obama + putin) / (putin + obama); // -1 = obama, 1 = putin
                        var intensity = Math.min(putin + obama, 50) / 50;
                        var col = this.mapColor((proportion + 1) / 2);
                        var opacity = Math.min(0.5, intensity);
                        if (node.hovered) {
                            opacity = this.getOpacityByLevel(chart.zoomLevel());
                        }
                        node.fillColor = "rgba(" + Math.round(col.red) + "," + Math.round(col.green) + "," + Math.round(col.blue) + "," + opacity + ")";
                    } else if (node.hovered) {
                        node.fillColor = "rgba(0,0,0,0.1)";
                    }
                }
            }
        ],
        navigation: {
            drilldownLayer: "shapes",
            minZoom: 2,
            initialLng: -25,
            initialLat: 48.92
        },
        advanced: {
            style: {
                loadingArcStyle: {
                    location: "center"
                }
            }
        }
        }))
      }
    },
    created() {
    },
    computed: {
      // menuitemClasses: function() {
      //   return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      // }
    },
    mounted() {
      var mthis = this
      // mock.get("/getNodeData").then(function(res) {
      //   mthis.initCharts();
      //   mthis.netchart.addData(res.data.data[0]);
      // });
    //   this.initCharts()
      window.onresize = function() {
        this.netheight = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
        this.netheightdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
      }
      this.netheight = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
      this.netheightdiv = (document.documentElement.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 + "px";
    }
  };
</script>
<style>
  .top,
  .bottom {
    text-align: center;
  }
</style>
