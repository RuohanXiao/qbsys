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
    height: 69.8vh;
    /* min-height: 60vh;
    max-height: 60vh;
    overflow-x: auto;
    overflow-y: hidden;
    height: 60vh;
    flex-flow: column wrap;
    margin: 0 60px;
    padding: 2vh 0px 0 0px; */
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
    position: absolute;
    height: 10vh;
    margin-right: 90px;
    line-height: 10vh;
    right: 10px;
    bottom: 10px;
    z-index: 9;
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
.resList .ivu-cell-main{
    display: block !important;
}
.resList .ivu-col{
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
}
#thematicShow{
    width: 100%;
}
</style>
<template>
    <!-- 集合弹框 -->
    <div>
        <Modal class="modalDiv" width='80vw' footer-hide loading='loading' v-model="showFlag" id='md' @on-visible-change="setvisible">
            <p slot="close" style="color:#f60;text-align:center;top: -2px !important;right:-4px !important}" class='iconP'>
                <Icon type="icon iconfont icon-quxiaocancel color515" size="60"></Icon>
            </p>
            <div class='mainModal'>
                <div class='modalLeftDiv'>
                    <div class='lefttop'>
                        <div class="inputTitle">
                            <Input class='inputTbottom' v-model="searchWord" @on-change="v=>{searchInfo(v)}" placeholder="专题图搜索" prefix="ios-search" />
                        </div>
                        <div class='scrollBarAble1' style='margin-bottom: 20px;height: 60vh;'>
                            <div class='resList '>
                                <!-- <div class='resli' v-for='thematic in thematics' style="padding:'10px auto';line-height:4vh;" @click="addDataToTemp(thematic)">
                                    <Row><Col span="24">{{thematic.name}}</Col></Row>
                                </div> -->
                                <CellGroup @on-click="selectThematic">
                                    <Cell :name="thematic.thematicName" v-for="thematic in thematics" class="ThematicItem">
                                        <Row><Col span="24">{{thematic.name}}</Col></Row>
                                    </Cell>
                                </CellGroup>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='modalRightDiv'>
                    <div id='thematicShow'>
                      <div class="rightbottom">
                        <Button class='buttonCannle' @click="cancel">取消</Button>
                        <Button class='buttonOK' @click='ok'>导入专题图</Button>
                    </div>
                    </div>
                </div>

                <!-- <div class="rightbottom">
                    <Button class='buttonCannle' @click="back">取消</Button>
                    <Button class='buttonOK' @click='modifySet'>导入专题图</Button>
                </div> -->
            </div>
        </Modal>
        </div>
</template>

<script>
/* import {map} from '../../dist/assets/js/geo/Map.js'  */
/* import {map} from '../../dist/assets/js/geo/ChinaMap.js' */ 
import {map} from '../../dist/assets/js/geo/openMap.js'

import TileLayer from 'ol/layer/Tile'
import TileWMS from 'ol/source/TileWMS'
import util from '../../util/tools.js'
    export default {
        data() {
            return {
                showFlag: true,
                searchWord: '',
                thematics: [],
                ThematicMap: null,
                thematicCons:[]
            }
        },
        methods: {
          setvisible(visable){
            debugger 
            var mthis = this;
            mthis.$emit('visable',visable)
          },
            selectThematic(name){
                var mthis = this;
                debugger
                var selectedThematics = mthis.thematics.filter(function(thematic){
                  if(thematic.thematicName === name){
                    return thematic
                  }
                });
                if(mthis.ThematicMap === null){
                  mthis.ThematicMap = new map('thematicShow');
                  for(let i = 0; i < selectedThematics.length; i++){
                    var thematicCon = selectedThematics[i];
                    mthis.thematicCons.push(thematicCon);
                    var thematicLayer = new TileLayer({  //世界底图标注图层
                      visible: true,
                      source: new TileWMS({
                          url: 'http://10.60.1.142:8082/geoserver/gwc/service/wms?',
                          params: {
                              'FORMAT': 'image/png',
                              'VERSION': '1.1.1',
                              tiled: true,
                              LAYERS: thematicCon.thematicName,
                          }
                      })
                    });
                    mthis.ThematicMap.addLayer(thematicLayer);
                    mthis.ThematicMap.fit(thematicCon.extent);
                  }
                }
                
            },
            ok(){
              var mthis = this;
              debugger
              mthis.$emit('selectedThematics',mthis.thematicCons)
              mthis.setvisible(false);
            },
            cancel() {
              var mthis = this;
              debugger
              mthis.$Modal.remove()
            },
            searchInfo(query) {
                var mthis = this;
                debugger
                var queryWord = mthis.searchWord;
                if(queryWord !== ''){
                     mthis.$http.post("http://localhost:5000/searchthematic/", {
                        queryWord: queryWord
                    }).then(response => {
                        debugger
                        if(response.body.code === 0){
                            mthis.thematics = response.body.data;
                        }
                    }).catch(function(error) {
                        alert('ThematicLayer request failed:' + error.status)
                    });
                }
            },
            delDataToTemp() {}
        },
        /* mounted(){
          var mthis = this;
          debugger
          var ThematicMap = new map('thematicShow');
          var worldLabelLayer = new TileLayer({  //世界底图标注图层
            visible: true,
            source: new TileWMS({
                url: 'http://10.60.1.142:8082/geoserver/gwc/service/wms?',
                params: {
                    'FORMAT': 'image/png',
                    'VERSION': '1.1.1',
                    tiled: true,
                    LAYERS: 'ThematicLayer:shiahandsunni',
                }
            })
          });
          ThematicMap.addLayer(worldLabelLayer);
          ThematicMap.map.render()
        } */
    }
</script>
