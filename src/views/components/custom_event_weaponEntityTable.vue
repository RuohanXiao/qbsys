<template>
  <div>
    <Collapse simple v-model="value1" id='nodeAttr' :style="{height:entDivH}" class='scrollBarAble'>
      <panel name="1">
        <span>实体属性</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='tableData.country_of_origin'>
            <p class="econtentp w8em">原产国</p>
            <p class="econtentp">{{tableData.country_of_origin}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.country'>
            <p class="econtentp w8em">服役国家</p>
            <p class="econtentp">{{tableData.country}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.vessel_class'>
            <p class="econtentp w8em">舰级</p>
            <p class="econtentp">{{tableData.vessel_class}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.location_of_final_assembly'>
            <p class="econtentp w8em">总装地点</p>
            <p class="econtentp">{{tableData.location_of_final_assembly}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.manufacturer'>
            <p class="econtentp w8em">生产商</p>
            <p class="econtentp">{{tableData.manufacturer}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.total_produced'>
            <p class="econtentp w8em">总产量</p>
            <p class="econtentp">{{tableData.total_produced}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.developer'>
            <p class="econtentp w8em">开发者</p>
            <p class="econtentp">{{tableData.developer}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.designed_by'>
            <p class="econtentp w8em">设计者</p>
            <p class="econtentp">{{tableData.designed_by}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.operator'>
            <p class="econtentp w8em">使用者</p>
            <p class="econtentp">{{tableData.operator}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.inception'>
            <p class="econtentp w8em">诞生时间</p>
            <p class="econtentp">{{tableData.inception}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.first_flight'>
            <p class="econtentp w8em">首航日期</p>
            <p class="econtentp">{{tableData.first_flight}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.service_entry'>
            <p class="econtentp w8em">入役时间</p>
            <p class="econtentp">{{tableData.service_entry}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.service_retirement'>
            <p class="econtentp w8em">退役时间</p>
            <p class="econtentp">{{tableData.service_retirement}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.use'>
            <p class="econtentp w8em">飞行用途</p>
            <p class="econtentp">{{tableData.use}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.cost'>
            <p class="econtentp w8em">造价</p>
            <p class="econtentp">{{tableData.cost}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.guidance_system'>
            <p class="econtentp w8em">制导系统</p>
            <p class="econtentp">{{tableData.guidance_system}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.ammunition'>
            <p class="econtentp w8em">弹药</p>
            <p class="econtentp">{{tableData.ammunition}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.muzzle_velocity'>
            <p class="econtentp w8em">枪口初速度</p>
            <p class="econtentp">{{tableData.muzzle_velocity}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.length'>
            <p class="econtentp w8em">长度(现在需要替换关键词)</p>
            <p class="econtentp">{{tableData.length}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.width'>
            <p class="econtentp w8em">宽度</p>
            <p class="econtentp">{{tableData.width}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.height'>
            <p class="econtentp w8em">高度</p>
            <p class="econtentp">{{tableData.height}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.mass'>
            <p class="econtentp w8em">武器重量</p>
            <p class="econtentp">{{tableData.mass}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.bore'>
            <p class="econtentp w8em">枪支口径</p>
            <p class="econtentp">{{tableData.bore}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.diameter'>
            <p class="econtentp w8em">武器直径</p>
            <p class="econtentp">{{tableData.diameter}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.powerplant'>
            <p class="econtentp w8em">发动机</p>
            <p class="econtentp">{{tableData.powerplant}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.wingspan'>
            <p class="econtentp w8em">翼展</p>
            <p class="econtentp">{{tableData.wingspan}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.takeoff_and_landing_capability'>
            <p class="econtentp w8em">降落方式</p>
            <p class="econtentp">{{tableData.takeoff_and_landing_capability}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.avionics'>
            <p class="econtentp w8em">航空电子设备</p>
            <p class="econtentp">{{tableData.avionics}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.conflict'>
            <p class="econtentp w8em">参与事件</p>
            <p class="econtentp">{{tableData.conflict}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.significant_event'>
            <p class="econtentp w8em">参与事件</p>
            <p class="econtentp">{{tableData.significant_event}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.participant_of'>
            <p class="econtentp w8em">参与事件</p>
            <p class="econtentp">{{tableData.participant_of}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.armament'>
            <p class="econtentp w8em">装载武器</p>
            <p class="econtentp">{{tableData.armament}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.coordinate_location'>
            <p class="econtentp w8em">驻扎点</p>
            <p class="econtentp">{{tableData.coordinate_location}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.call_sign'>
            <p class="econtentp w8em">船舶信号</p>
            <p class="econtentp">{{tableData.call_sign}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.pennant_number'>
            <p class="econtentp w8em">舷号</p>
            <p class="econtentp">{{tableData.pennant_number}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.official_website'>
            <p class="econtentp w8em">官方网站</p>
            <p class="econtentp">{{tableData.official_website}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
      </panel>
      <!-- ============================================相关实体================================================== -->
      <panel name="2">
        <span>相关实体</span>
        <div slot="content" class="tableLine">
          <!-- <div class="econtent" v-if='xiangguanEntityItems.length>0'  v-for="items in xiangguanEntityItems">
              <p class="econtentp w8em">{{items.relation}}</p>
              <p class="econtentp">{{items.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='xiangguanEntityItems.length>0' v-for="(items,ind) in xiangguanEntityItems">
            <div v-show='ctrls[ind]||items.data.length<5' class="econtent blockStyle" v-for="(item,index) in items.data">
              <p class="econtentp w8em" v-if='index==0' :title="items.relation">{{items.relation}}</p>
              <p class="econtentp w8em" v-else :title="items.relation"></p>
              <p class="econtentp">{{item.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div>
            <div v-show="!ctrls[ind]&&items.data.length>5&&index<5" class="econtent blockStyle" v-for="(item,index) in items.data">
              <p class="econtentp w8em" v-if='index==0' :title="items.relation">{{items.relation}}</p>
              <p class="econtentp w8em" v-else :title="items.relation"></p>
              <p class="econtentp">{{item.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div>
            <div v-show="!ctrls[ind]&&items.data.length>5" class="econtent blockStyle">
              <p class="econtentp w8em"><a @click='more(ind)'>更多</a></p>
              <p class="econtentp"></p>
            </div>
            <div v-show="ctrls[ind]&&items.data.length>5" class="econtent blockStyle">
              <p class="econtentp w8em"><a @click='more(ind)'>收起</a></p>
              <p class="econtentp"></p>
            </div>
          </div>
          <div class="econtent" v-if='xiangguanEntityItems.length ==0'>
            <p class="econtentp" v-show="spinWaiting">相关实体加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关实体</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关事件================================================== -->
      <panel name="3">
        <span>相关事件</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0' v-for='items in xiangguanEvent.statistics'>
            <!-- <p class="econtentp w8em">{{myMap1.get(items.type.toLowerCase().replace(/-/, "_")).name}}</p> -->
            <p class="econtentp w8em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'event',items.type)"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">相关事件加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关事件</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关文档================================================== -->
      <panel name="4">
        <span>相关文档</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0' v-for='items in xiangguanDoc.statistics'>
            <p class="econtentp w8em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'document','')"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">文档事件加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关文档</p>
          </div>
        </div>
      </panel>
    </Collapse>
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import util from '../../util/tools.js'
  import configer from '../../util/configContrl.js'
  export default {
    data() {
      return {
        spinWaiting: false,
        value1: ['1', '2', '3', '4'],
        ctrls: new Array(),
        xiangguanEntityItems: new Array(),
        xiangguanEntitys: new Object(),
        xiangguanEvent: new Array(),
        xiangguanDoc: new Array(),
        linkObj: new Object(),
        myMap: new Map(),
        myMap1: new Map()
      }
    },
    props: ['tableData', 'entDivH', 'tableType'],
    mounted() {
      var mthis = this
      var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap1 = new Map();
      for (let eventNameitem of eventNames) {
        for (let items of eventNameitem.children) {
          mthis.myMap1.set(items.getElementsByTagName('ename')[0].textContent, {
            name: items.getElementsByTagName('chname')[0].textContent,
            img: items.getElementsByTagName('img')[0].textContent
          })
        }
      }
      var ob1 = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
      var entityMainType = ob1.getElementsByTagName("entityMainType");
      mthis.myMap = new Map();
      for (var i = 0; i < entityMainType.length; i++) {
        let typeName = entityMainType[i].children[0].textContent;
        let typeChild = []
        for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
          mthis.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
        }
      }
    },
    beforeDestroy() {
      this.tableData = new Object()
    },
    methods: {
      more(index) {
                // this.ctrls[index].splice(index,1,!this.ctrls[index]) 
                this.ctrls[index]=!this.ctrls[index]
                this.$forceUpdate()
            },
      addSingleNodeToCanvans(id, type, subType) {
        var mthis = this
        if (type === 'entity') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            "nodeIds": id
          }).then(response => {
            let nodeArr = response.body.data[0].nodes.map(it => {
              it.img = util.checkImgExists(it.img) ? (it.img) : 'http://10.60.1.140/assets/images/People.png'
              return it.id
            })
            mthis.$store.commit('setAddNetNodes', {
              nodes: response.body.data[0].nodes,
              links: mthis.linkObj.filter(item => {
                return item.from == id || item.to == id
              })
            })
          })
        }
        if (type === 'event') {
          // ;
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
            "EventIds": id
          }).then(response => {
            let nodes = new Array();
            let links = new Array();
            if (response.body.code === 0) {
              // let type = response.body.data[0].event_subtype.toLowerCase().replace(/-/, "_")
              let img = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).img
              let name = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).name
              for (let i = 0; i < response.body.data.length; i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: img,
                  Entity_type: 'event',
                  name: name,
                  loaded: true
                })
                response.body.data[i].entity_list.map(oitem => {
                  if (oitem.id === this.tableData.id) {
                    links.push({
                      id: (this.tableData.id > response.body.data[i].id) ? (this.tableData.id + '-' + response.body.data[i].id) : (response.body.data[i].id + '-' + this.tableData.id),
                      type: oitem.role,
                      from: this.tableData.id,
                      to: response.body.data[i].id,
                      direct: false
                    })
                  }
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes: nodes,
                links: links
              })
            }
          })
        }
        if (type === 'document') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
            "docIds": id
          }).then(response => {
            let nodes = new Array();
            let links = new Array();
            if (response.body.code === 0) {
              for (let i = 0; i < response.body.data.length; i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: 'http://10.60.1.140/assets/images/content_node.png',
                  Entity_type: 'content',
                  name: response.body.data[i].title,
                  label: response.body.data[i].title.substring(0, 19) + '...',
                  loaded: true
                })
                let idstr = (this.tableData.id > response.body.data[i].id) ? ('content_' + this.tableData.id + '-' + response.body.data[i].id) : ('content_' + response.body.data[i].id + '-' + this.tableData.id)
                links.push({
                  id: idstr,
                  type: '包含',
                  from: this.tableData.id,
                  to: response.body.data[i].id,
                  direct: false
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes: nodes,
                links: links
              })
            }
          })
        }
      }
    },
    watch: {
      tableData: function() {
        let mthis = this
        mthis.xiangguanEntityItems = new Array()
        mthis.xiangguanEntitys = new Object()
        mthis.xiangguanEvent = new Array()
        mthis.xiangguanDoc = new Array()
        if (this.tableType === 'weapon') {
          mthis.spinWaiting = true
          if (this.tableData.isArray) {
            if (this.tableData.length > 0) {
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
                "NodeIds": mthis.tableData.map(item => {
                  return item.id
                }),
                // "NodeTypes":mthis.tableData.map(item=>{return item.Entity_type}),
                "TypeLabel": "all"
              }).then(response => {
              })
            } else {
              // alert('长度为0')
              if (mthis.$store.state.tmss === 'net') {
                mthis.$store.commit('setNetPromte', '长度为0')
              } else if (mthis.$store.state.tmss === 'geo') {
                mthis.$store.commit('setGeoPromte', '长度为0')
              } else if (mthis.$store.state.tmss === 'content') {
                mthis.$store.commit('setContentPromte', '长度为0')
              } else {
              }
            }
            // mthis.spinWaiting = false
          } else {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds": new Array(mthis.tableData.id),
              // "NodeTypes":new Array('entity'),
              "Group": "True",
              "TypeLabel": "all"
            }).then(response => {
              // mthis.xiangguanEntityItems = new Array()
              // mthis.xiangguanEntitys = new Object()
              // mthis.xiangguanEvent = new Array()
              // mthis.xiangguanDoc = new Array()
              if (response.body.data[0].RelatedEntity[mthis.tableData.id]) {
                response.body.data[0].RelatedEntity[mthis.tableData.id].links.map(item => {
                  item.type = item.undirected_type
                  return item
                })
                mthis.linkObj = response.body.data[0].RelatedEntity[mthis.tableData.id].links
                mthis.xiangguanEntityItems = response.body.data[0].RelatedEntity[mthis.tableData.id].nodes
                mthis.ctrls = new Array()
                mthis.xiangguanEntityItems.map(item => {
                  mthis.ctrls.push(!item.data.length > 5)
                })
                mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedEvent[mthis.tableData.id]) {
                mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedDocument[mthis.tableData.id]) {
                mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
              }
              if (response.body.data[0].unknown !== new Object()) {
              }
            })
          }
          mthis.spinWaiting = false
        }
      }
    }
  }
</script>
<style scoped>
  .titleName {
    min-width: 5em;
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contentName {
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .econtentp {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
    max-width: 70%;
    white-space: nowrap;
    /* margin-right: 40px; */
  }
  .econtent {
    display: flex;
    height: auto;
    min-height: 30px;
  }
  .eButton {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin: 0px 10px;
  }
  .w8em {
    width: 8em;
    min-width: 8em;
    max-width: 8em;
    margin: 0;
  }
  .tableLine>.econtent:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .tableLine>.econtent:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .blockStyle:hover .eButton{
    opacity: 1;
  }
  .eButton {
    opacity: 0;
  }
</style>


