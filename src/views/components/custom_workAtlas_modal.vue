<template>
  <!-- 集合弹框 -->
  <div>
    <Modal class="modalDiv" width='80vw' footer-hide loading='loading' v-model="showFlag" id='md'>
      <p slot="close" style="color:#f60;text-align:center;top: -2px !important;right:-4px !important}" class='iconP'>
        <Icon type="icon iconfont icon-quxiaocancel color515" size="60"></Icon>
      </p>
      <div class='mainModal'>
        <div class='modalLeftDiv'>
          <div class='lefttop' v-if="type==='import'">
            <div class="inputTitle">
              <Input class='inputTbottom' v-model="searchWorkspaceTitle" @on-change="v=>{searchInfo(v)}" placeholder="图集搜索" prefix="ios-search" />
            </div>
            <div class='scrollBarAble1' style='margin-bottom: 20px;height: 60vh;'>
              <div class='resList '>
                <div class='resli' v-for='op in options1' style="padding:'10px auto';line-height:4vh;" @click="addDataToTemp(op)">
                  <p>{{op.name}}
                    <Icon class="icon iconfont icon-delete-name DVSL-bar-btn DVSL-bar-btn-back lineH20" :style="{float: 'right',lineHeight: '4vh',height: '4vh'}" size="20" @click="delDataToTemp(op)" />
                    <!-- <Icon class="icon iconfont icon-tianjia DVSL-bar-btn DVSL-bar-btn-back lineH20" :style="{float: 'right',lineHeight: '4vh',height: '4vh'}" size="20" @click="addDataToTemp(op)" /> -->
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class='lefttop' v-else>
            <div class="inputTitle">
              <Input class='inputT' v-model="workspaceTitle" placeholder="图集名" />
            </div>
            <div class="inputTitle">
              <Input v-model="workspaceDes" type="textarea" class='inputD scrollBarAble' :rows='8' :cols="20" placeholder="图集描述" />
            </div>
          </div>
        </div>
        <div class='modalRightDiv' v-if="type==='import'">
          <!-- 导入图集 -->
          <!-- 导入图集应包含搜索图集,预览图集(drawable) -->
          <div id='demo' />
        </div>
        <div class='modalRightDiv' v-else>
          <!-- 导出图 -->
          <!-- 导出图集应包含预览图集(disdrawable)-->
          <div id='demo' />
        </div>
      </div>
      <div class="rightbottom">
        <Button class='buttonCannle' @click="back">取消</Button>
        <Button class='buttonOK' v-if="type==='import'" @click='modifySet'>导入图</Button>
        <Button class='buttonOK' v-else @click='createSet'>导出图</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import util from '../../util/tools.js'
  import configer from '../../util/configContrl.js'
  // import { Store } from 'vuex';
  import {
    mapState,
    mapMutations
  } from 'vuex'
  mock.test = 1
  export default {
    data() {
      return {
        myMap: new Map(),
        showFlag: false,
        lightIconFlag: false,
        loading: false,
        modal1: false,
        workspaceTitle: '',
        workspaceDes: '',
        searchWorkspaceTitle: '',
        clearFlag: false,
        options1: [],
        loading1: false,
        timer: null,
        inputInfo: "",
        modalType: '',
        dicMap: {
          entity: '实体',
          document: '文本',
          event: '事件',
        },
        worksetData: [{
          title: '',
          des: '',
          data: {
            nodes: [],
            links: []
          }
        }],
        itemsObj: [{
          name: '实体节点',
          num: 6
        }, {
          name: '事件节点',
          num: 6
        }, {
          name: '文档节点',
          num: 6
        }],
        workatlastChart: null
        // workatlastChart: new NetChart({
        //   container: "demo",
        //   area: {
        //     height: 350
        //   },
        //   data: {
        //     preloaded: {
        //       "nodes": [],
        //       "links": []
        //     }
        //   }
        // })
      }
    },
    mounted() {
      var mthis = this
      mthis.workatlastChart = mthis.$store.getters.netData;
      var ob = configer.loadxmlDoc(
        mthis.$store.state.ipConfig.xml_url + "/dictionary.xml"
      );
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap = new Map();
      for (let eventNameitem of eventNames) {
        for (let items of eventNameitem.children) {
          mthis.myMap.set(items.getElementsByTagName("ename")[0].textContent, {
            name: items.getElementsByTagName("chname")[0].textContent,
            img: items.getElementsByTagName("img")[0].textContent
          });
        }
      }
      mthis.initChart()
    },
    watch: {
      flag: function() {
        this.showFlag = true
        this.workatlastChart.replaceData({
          "nodes": [],
          "links": []
        })
      },
      type: function() {
        // this.worksetData = new Array()
        if (this.type === 'import') {} else if (this.type === 'export') {} else {}
      },
      workatlastData: function() {
        var mthis = this
        // setTimeout(function() {
        // mthis.workatlastChart.reloadData() 
        mthis.initChart()
        mthis.workatlastChart.replaceData(mthis.workatlastData[0].data)
        // },200)
        // this.workatlastChart.updateStyle()
      }
    },
    methods: {
      initChart() {
        var mthis = this
        let canvansHeight = document.documentElement.clientHeight * 0.6
        let canvansWidth = document.documentElement.clientWidth * 0.5
        this.workatlastChart = new NetChart({
          navigation: {
            focusNodeExpansionRadius: 1,
            initialNodes: ["node1"],
            mode: "showall",
            expandOnClick: false
          },
          legend: {
            enabled: true,
            width: 900,
            panel: {
              side: "top",
              align: "center"
            }
          },
          interaction: {
            resizing: {
              enabled: false
            }
          },
          advanced: {
            assets: [
              "https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"
            ],
            exportProxyURL: 'https://echo.zoomcharts-cloud.com/download',
            crossOrigin: "true"
          },
          layout: {
            mode: "static",
            twoRingRadialLayout: true,
            nodeSpacing: 100,
            rowSpacing: 100
          },
          style: {
            nodeLabel: {
              textStyle: {
                fillColor: '#ccffff'
              },
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(0,0,0,0)"
              }
            },
            linkLabel: {
              textStyle: {
                fillColor: '#006666'
              },
              backgroundStyle: {
                fillColor: "rgba(0,0,0,0)",
                lineColor: "rgba(51, 255, 255, 0.4)"
              },
              aspectRatio: 1
            },
            node: {
              display: "image",
              lineWidth: 2,
              imageCropping: true
            },
            selection: {
              fillColor: 'rgba(51,255,255,0.1)',
              lineWidth: 5
            },
            nodeStyleFunction: function(node) {
              if (node.selected) {
                node.lineColor = "#ccffff";
                node.shadowColor = "#33ffff";
                node.fillColor = "#003333";
                node.shadowBlur = 25;
                node.lineWidth = 5;
                if (node.hightLight) {
                  node.shadowColor = "#009999";
                  node.shadowBlur = 20;
                  node.fillColor = "#003333";
                  node.lineColor = "#009999";
                  node.lineWidth = 5
                }
              } else if (node.hovered) {
                node.lineWidth = 5
                node.shadowColor = "#009999";
                node.shadowBlur = 20;
                node.fillColor = "#003333";
                node.lineColor = "#009999";
              } else {
                node.fillColor = "#003333";
                node.lineColor = "#006666";
                node.lineWidth = 5;
                node.shadowColor = "rgba(0,0,0,0)";
                node.shadowBlur = 20;
              }
              if (node.data.Entity_type === 'event') {
                node.display = 'text'
                node.radius = 15
                node.borderRadius = 300
                let mapItem = mthis.myMap.get(node.data.event_subtype)
                node.image = mapItem ? mapItem.img : "http://10.60.1.140/assets/images/event.png";
                // node.image = 'http://10.60.1.140/assets/images/content_node.png'
              } else if (node.data.Entity_type === 'content') {
                node.display = 'rectangle'
                node.image = 'http://10.60.1.140/assets/images/content_node.png'
                node.backgroundStyle = {}
              } else {
                node.display = 'image'
                if (util.checkImgExists("http://10.60.1.143/pic_lib/padded/" + node.id + ".png")) {
                  node.image = "http://10.60.1.143/pic_lib/padded/" + node.id + ".png"
                } else {
                  // node.image = 'http://10.60.1.140/assets/images/' + node.data.Entity_type + '.png';
                   if (node.data.Entity_type === 'administrative') {
                      node.image = 'http://10.60.1.140/assets/images/location.png'
                    } else if (node.data.Entity_type === 'human') {
                      node.image = 'http://10.60.1.140/assets/images/People.png'
                    } else if (node.data.Entity_type === 'organization') {
                      node.image = 'http://10.60.1.140/assets/images/organization.png'
                    } else if (node.data.Entity_type === 'weapon') {
                      node.image = 'http://10.60.1.140/assets/images/weapon.png'
                    } else if (node.data.Entity_type === 'geographic_entity') {
                      node.image = 'http://10.60.1.140/assets/images/other.png'
                    } else if (node.data.Entity_type === 'project') {
                      node.image = 'http://10.60.1.140/assets/images/other.png'
                    } else {
                      node.image = 'http://10.60.1.140/assets/images/other.png'
                    }
                }
              }
              node.cursor = "pointer";
              node.label = node.data.name;
              mthis.workatlastChart.updateSettings()
            },
            linkStyleFunction: function(link) {
              link.length = 1;
              link.cursor = "pointer";
              link.position = 'absolute';
              link.strength = 1;
              link.fillColor = "#336666";
              if (link.hovered) {
                link.shadowColor = "#33ffff";
                link.shadowBlur = 5;
                link.radius = 2;
                link.lineWidth = 3;
                link.fillColor = "#006666";
              }
              if (link.selected) {
                link.lineColor = "#33ffff";
                link.fillColor = "#33ffff";
                link.radius = 3;
                link.lineWidth = 3;
                if (link.hightLight) {
                  link.shadowColor = "#006666";
                  link.shadowBlur = 5;
                  link.radius = 3;
                  link.lineWidth = 3;
                }
              } else {
                link.fillColor = "#006666";
                link.radius = 2;
                link.lineWidth = 3;
              }
              if (link.data.type !== undefined && link.data.type !== "") {
                link.items = [{ // Default item places just as the regular label.
                  text: link.data.type,
                  scaleWithZoom: false,
                  textStyle: {
                    font: '10px MicrosoftYaHei',
                    fillColor: '#669999',
                  },
                  backgroundStyle: {
                    fillColor: "rgba(0,0,0,0.8)"
                  }
                }]
              } else {
                link.direction = [100, 100, 100, 100]
                link.fromDecoration = "arrow";
                link.toDecoration = "arrow";
                link.items = [{ // Default item places just as the regular label.
                  rotateWithLink: true,
                  scaleWithZoom: true,
                  align: 'center',
                  text: link.data.num,
                  imageSlicing: [0, 0, 20, 20],
                  textStyle: {
                    font: '12px MicrosoftYaHei',
                    fillColor: '#669999',
                  }
                }]
              }
            }
          },
          data: {},
          container: "demo",
          area: {
            height: canvansHeight,
            width: canvansWidth
          },
          toolbar: {
            enabled: false
          },
          //  toolbar: {
          //   zoomControl: true,
          //   cssClass: 'zoomButtonClass',
          //   items: [{
          //     item: "zoomcontrol",
          //     side: "right",
          //     align: "top"
          //   }]
          // },
          interaction: {
            resizing: {
              enabled: false
            }
          },
          theme: NetChart.themes.dark
        });
      },
      deletItem(id, index) {
        // this.worksetData[index].data = this.worksetData[index].data.filter(item => {
        //   return item.id !== id
        // })
      },
      modifySet() {
        this.$store.commit('setAtlastData', this.workatlastChart.exportData())
        this.showFlag = false
      },
      createSet() {
        var mthis = this
        let timestamp = new Date().getTime()
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/index-project-data/', {
          "timestamp": timestamp,
          "data": {
            "id": "",
            "name": (mthis.workspaceTitle === '') ? ('默认标题' + timestamp) : mthis.workspaceTitle,
            "des": (mthis.workspaceDes === '') ? ('暂无描述') : mthis.workspaceDes,
            "modify_time": util.getNowFormatDate(),
            "modify_user": "XiaoRuohan",
            "create_time": util.getNowFormatDate(),
            "create_user": "XiaoRuohan",
            "type": "human",
            "image": "",
            "data": mthis.workatlastChart.exportData()
          }
        }).then(response => {
          if (response.body.code === 0) {
            // alert('导出成功！')
            if (mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '导出成功！')
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '导出成功！')
            } else if (mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '导出成功！')
            } else {
            }
            mthis.$store.commit('setRefAtlast', !mthis.$store.state.refAtlast)
            this.showFlag = false
          } else {
            // alert('导出失败！')
            if (mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '导出失败！')
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '导出失败！')
            } else if (mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '导出失败！')
            } else {
            }
          }
        })
      },
      back() {
        this.showFlag = false;
        this.workspaceTitle = ''
        this.workspaceDes = ''
        this.searchWorkspaceTitle = ''
        this.options1 = []
        this.worksetData = [{
          title: '',
          des: '',
          data: {
            nodes: [],
            links: []
          }
        }]
      },
      addDataToTemp(item) {
        this.workatlastChart.replaceData(item.data)
      },
      delDataToTemp(item) {
        var mthis = this
        let time = new Date().getTime()
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/delete-set-data/', {
          "timestamp": time,
          "idlist": new Array(item.id),
          "label": "project",
          "type": "project"
        }).then(response => {
          if (response.body.code === 0) {
            //  mthis.setMessage
            // alert('删除成功')
            if (mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '删除成功')
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '删除成功')
            } else if (mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '删除成功')
            } else {
            }
          } else {
            //  alert('删除失败')
            if (mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '删除失败')
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '删除失败')
            } else if (mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '删除失败')
            } else {
            }
          }
        })
      },
      searchInfo(query) {
        var mthis = this;
        this.loading1 = true;
        if (mthis.searchWorkspaceTitle !== "") {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let time = new Date().getTime()
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
              "timestamp": time,
              "idlist": '',
              "query": mthis.searchWorkspaceTitle,
              "label": "project",
              "page": 1,
              "pagesize": 30
            }).then(response => {
              if (response.body.code === 0) {
                if (time = response.body.timestamp) {
                  mthis.options1 = response.body.data;
                }
              }
            })
          }, 200);
        } else {
          mthis.options1 = [];
        }
        mthis.loading1 = false;
      },
      del(id) {
        this.$emit('delId', id)
      },
      modData(id) {
        // alert('modify');
        // this.$store.commit('setWorkSpaceModal', {
        //   "id":id,
        //   "flag":true
        // })
        this.modal1 = !this.modal1;
        this.loading = true;
        let oldimg = ''
        let mthis = this
        $('.touxiangImg').mouseover(function(item) {
          oldimg = item.target.src
          item.target.src = 'http://10.60.1.140/assets/images/geo/delete_HL.png'
        })
        $('.touxiangImg').mouseout(function(item) {
          item.target.src = oldimg
        })
        $('.touxiangImg').click(function(item) {
          //  this.data
          // item.filter(function (obj) {
          //   return obj.id!==item.target.id
          // })
          // alert('调用删除接口，调用id为' + item.target.parentNode.id)

          if (mthis.$store.state.tmss === 'net') {
            mthis.$store.commit('setNetPromte', '调用删除接口，调用id为' + item.target.parentNode.id)
          } else if (mthis.$store.state.tmss === 'geo') {
            mthis.$store.commit('setGeoPromte', '调用删除接口，调用id为' + item.target.parentNode.id)
          } else if (mthis.$store.state.tmss === 'content') {
            mthis.$store.commit('setContentPromte', '调用删除接口，调用id为' + item.target.parentNode.id)
          } else {
          }
          //  item.target.id
        })
      },
      importData(id) {
        this.$emit('workSpaceModal', true)
        this.addToChart(id)
      },
      addToChart(id) {
        var mthis = this
        mock.get("/getWorkSpaceAddData").then(function(res) {
          mthis.$store.commit('setWorkSpaceAddData', res.data.data[0])
        })
      },
      cantClick() {
        // alert(
        //   '不可用工作集，不可导入'
        // )
        
      }
    },
    props: {
      workatlastData: Array,
      type: String,
      flag: Number
    }
  }
</script>
<style scoped>
  .scrollBarAble1 {
    overflow-y: auto;
    overflow-x: hidden;
  }
  /* .scrollBarAble1::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    position: absolute;
  }
  .scrollBarAble1::-webkit-scrollbar-thumb {
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
    opacity: 0;
  }
  .scrollBarAble1::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 0;
    background: rgba(0, 0, 0, 0);
    opacity: 0;
  } */
  /* .scrollBarAble1:hover {
    overflow-y: auto;
    overflow-x: hidden;
  } */
  .scrollBarAble1::-webkit-scrollbar {
    opacity: 1;
    width: 5px;
    height: 5px;
  }
  .scrollBarAble1::-webkit-scrollbar-thumb {
    opacity: 1;
    border: 5px solid transparent;
    padding-right: 5px !important;
    border-radius: 10px;
    min-height: 20px;
    background-color: #3cc;
    box-shadow: 1px 1px 3px #3cc inset;
  }
  .scrollBarAble1::-webkit-scrollbar-track {
    opacity: 0;
    border-radius: 2.5px !important;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0) inset;
    background: rgba(0, 0, 0, 0);
  }
  .resli>p {
    height: 4vh;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .resli {
    height: 4vh;
    background-color: rgba(51, 255, 255, 0.5);
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    color: #ccffff;
    padding: 0 10px;
  }
  .resList {
    margin: 1vh auto;
  }
  .resList div:nth-child(even) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .resList div:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0);
  }
  .selectDic {
    line-height: 50px;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    padding-left: 40px;
    padding-top: 2px;
    padding-right: 10px;
    font-size: 18px;
    text-indent: 3rem;
    min-height: 40px;
  }
  /* .modalDiv {
                                  min-height: 50vh;
                                } */
  .inputTitle {
    margin-bottom: 10px;
    justify-content: center;
    display: flex;
  }
  .inputT {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 4vh;
    margin: 2vh auto 1vh auto;
    /* border-radius: 20px; */
  }
  .inputTbottom {
    width: 90%;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    /* padding-left: 40px; */
    padding-top: 2px;
    height: 4vh;
    color: #ccffff;
    /* border-radius: 20px; */
    border: none;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    margin: 2vh auto 1vh auto;
  }
  .inputD {
    width: 90%;
  }
  .buttonOK {
    width: 6em;
    color: rgb(204, 255, 255, 0.8) !important;
    background-color: rgba(51, 255, 255, 0.5) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
    height: 25px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    line-height: 25px;
  }
  .buttonOK:hover {
    color: #ccffff !important;
    background-color: rgba(51, 255, 255, 0.7) !important;
  }
  .buttonCannle {
    width: 6em;
    color: rgba(204, 255, 255, 0.5) !important;
    background-color: rgba(204, 255, 255, 0.3) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
    height: 25px;
    border-radius: 5px;
    margin: 0 10px;
    font-size: 14px;
    line-height: 25px;
  }
  .buttonCannle:hover {
    color: rgba(204, 255, 255, 0.8) !important;
    background-color: rgba(204, 255, 255, 0.5) !important;
    /* box-shadow: 0px 0px 62px 0px #33ffff; */
  }
  .mainModal {
    margin: 0 0px 45px 20px 20px;
  }
  .modalLeftDiv {
    float: left;
    display: flex;
    flex-flow: column nowrap;
    width: 25%;
    border-right: 1px solid rgba(51, 255, 255, 0.3);
    height: 69.8vh;
    background-image: linear-gradient(8deg, rgba(102, 255, 153, 0.3) -10%, rgba(102, 128, 204, 0.3) 65%, rgba(102, 0, 255, 0.3) 100%), linear-gradient(#000000, #000000);
    background-blend-mode: normal, normal;
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    /* margin-bottom: 20px; */
  }
  .modalLeftDiv_firstchild {
    margin-top: 20px;
  }
  .modalRightDiv {
    display: flex;
    min-height: 60vh;
    max-height: 60vh;
    overflow-x: auto;
    overflow-y: hidden;
    height: 60vh;
    flex-flow: column wrap;
    margin: 0 60px;
    padding: 2vh 0px 0 0px;
  }
  .lefttop {
    height: 68vh;
    overflow-x: auto;
    overflow-y: hidden;
    /* border-bottom: 1px solid rgba(51, 255, 255, 0.3); */
  }
  /* .leftbottom {
          height: 44vh;
          overflow-x: auto;
          overflow-y: hidden;
          margin-top: 1vh;
        } */
  .rightbottom {
    height: 10vh;
    float: right;
    margin-right: 90px;
    line-height: 10vh;
  }
  .rightdiv {
    padding: 20px;
    width: 100%;
  }
  .type-title {
    height: 40px;
    border-bottom: solid 1px #336666;
    display: flex;
    padding-bottom: 10px;
  }
  .type-title-p {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .type-title-d {
    width: 4px;
    height: 16px;
    background-color: #009999;
    margin: 6px 6px;
  }
  .type-content {
    padding-top: 10px;
  }
  .nametext {
    font-family: MicrosoftYaHei;
    font-size: 9px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  /* .touxiangImg:hover img{
                            /* background-image:url('http://10.60.1.140/assets/images/Organization.png');
                            background-image:url(../../dist/assets/images/circle.png);
                          }  */
  .top,
  .bottom {
    text-align: center;
  }
  .center {
    width: 300px;
    margin: 10px auto;
    overflow: hidden;
  }
  .center-left {
    float: left;
  }
  .center-right {
    float: right;
  }
  .DVSL-bar-btndisHover {
    white-space: nowrap;
    color: #cff;
    float: left;
    padding: 0 7px;
    text-decoration: none;
    cursor: pointer;
    opacity: .6;
  }
  .cardButD {
    width: 30px;
    color: #ccffff;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .lineH20 {
    line-height: 20px;
  }
  .itemDivDisable {
    background-color: rgba(51, 255, 255, 0.2);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .itemDiv {
    background-color: rgba(51, 255, 255, 0.3);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .cardFront {
    font-size: 12px;
    line-height: 25px;
  }
  .titleFront {
    font-size: 14px;
    line-height: 30px;
    display: inline;
  }
  .padd8 {
    padding: 8px;
  }
  .color515 {
    color: rgba(51, 255, 255, 0.5);
  }
  .touxiangImg {
    background-color: #003333
  }
</style>
<style>
  #md>.ivu-modal-wrap>.ivu-modal>.ivu-modal-content>.ivu-modal-close {
    top: -3px !important;
    right: -4px !important;
  }
  #md>.ivu-modal-wrap>.ivu-modal>.ivu-modal-content {
    max-height: 70vh;
    height: 70vh;
  }
  .inputT>input {
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    border: none;
    box-shadow: none !important;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    border-radius: 20px;
    padding: 0 20px;
    text-overflow: ellipsis;
  }
  /* .inputTbottom>input {
      color: rgba(204, 255, 255, 0.5);
      background-color: rgba(51, 255, 255, 0.2);
      border: none;
      box-shadow: none !important;
      font-size: 14px;
      font-weight: normal;
      font-stretch: normal;
      line-height: 4vh;
      letter-spacing: 0px;
      font-family: MicrosoftYaHei;
      height: 4vh;
      border-radius: 20px;
    } */
  .inputTbottom>input {
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    border: none;
    box-shadow: none !important;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 4vh;
    letter-spacing: 0px;
    font-family: MicrosoftYaHei;
    height: 4vh;
    border-radius: 20px;
  }
  .inputTitle>input {
    width: 90%;
  }
  .inputD>textarea {
    border: none;
    box-shadow: none !important;
    resize: none;
    display: inline-block;
    vertical-align: middle;
    text-overflow: ellipsis;
    height: 16vh;
    max-height: 16vh;
    padding: 7px;
    color: rgba(204, 255, 255, 0.5);
    background-color: rgba(51, 255, 255, 0.2);
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 3vh;
    letter-spacing: 0px;
    border: none;
    border-radius: 20px;
    padding: 10px 20px;
  }
  .inputTbottom>.ivu-input-prefix>i {
    font-size: 20px !important;
    line-height: 4vh !important;
    color: rgba(204, 255, 255, 0.3);
  }
  .resli>p>i {
    opacity: 0.3;
  }
  .resli:hover>p>i {
    opacity: 0.6;
  }
  .delItemDiv {
    height: 60px;
    width: 100%;
    position: absolute;
    top: 0;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.8);
  }
  .delItemDiv:hover {
    opacity: 1;
  }
  .DVSL-NC-zoom {
    height: 200px !important;
  }
  .zoomButtonClass {
    top: 20px !important;
    right: 30px !important;
  }
</style>
