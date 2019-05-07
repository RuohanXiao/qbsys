<template>
  <div>
    <Collapse simple v-model="value1" id='nodeAttr' :style="{height:entDivH}" class='scrollBarAble'>
      <panel name="1">
        <span>实体属性</span>
        <div slot="content" class="tableLine">





          <div class="econtent" v-if='tableData.native_label'>
            <p class="econtentp w5em">母语名</p>
            <p class="econtentp">{{tableData.native_label}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.short_name'>
            <p class="econtentp w5em">简称</p>
            <p class="econtentp">{{tableData.short_name}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.headquarters_location'>
            <p class="econtentp w5em">组织总部</p>
            <p class="econtentp">{{tableData.headquarters_location}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.type'>
            <p class="econtentp w5em">组织类型</p>
            <p class="econtentp">{{tableData.type}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.inception'>
            <p class="econtentp w5em">成立时间</p>
            <p class="econtentp">{{tableData.inception}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.founded_by'>
            <p class="econtentp w5em">创办者</p>
            <p class="econtentp">{{tableData.founded_by}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.chairperson'>
            <p class="econtentp w5em">领袖</p>
            <p class="econtentp">{{tableData.chairperson}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.chief_executive_officer'>
            <p class="econtentp w5em">首席执行官</p>
            <p class="econtentp">{{tableData.chief_executive_officer}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.member_count'>
            <p class="econtentp w5em">组织成员数</p>
            <p class="econtentp">{{tableData.member_count}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.employees'>
            <p class="econtentp w5em">组织员工数</p>
            <p class="econtentp">{{tableData.employees}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.political_ideology'>
            <p class="econtentp w5em">意识形态</p>
            <p class="econtentp">{{tableData.political_ideology}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.business_division'>
            <p class="econtentp w5em">业务部门</p>
            <p class="econtentp">{{tableData.business_division}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.parent_organization'>
            <p class="econtentp w5em">上级部门</p>
            <p class="econtentp">{{tableData.parent_organization}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.subsidiary'>
            <p class="econtentp w5em">下级部门</p>
            <p class="econtentp">{{tableData.subsidiary}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.official_website'>
            <p class="econtentp w5em">官网</p>
            <p class="econtentp">{{tableData.official_website}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.telephone_number'>
            <p class="econtentp w5em">电话</p>
            <p class="econtentp">{{tableData.telephone_number}}</p>
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
          <div class="econtent" v-if='xiangguanEntityItems.length>0'  v-for="items in xiangguanEntityItems">
            <p class="econtentp w5em">{{items.relation}}</p>
            <p class="econtentp">{{items.name}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.id,'entity','')"></Button>
            </div>
          </div>
          <div class="econtent" v-if='xiangguanEntityItems.length ==0'>
            <p class="econtentp" v-show="spinWaiting">相关实体加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关实体</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关事件================================================== -->
      <panel name="3">
        <span>相关事件</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0' v-for='items in xiangguanEvent.statistics'>
            <p class="econtentp w5em">{{myMap1.get(items.type.toLowerCase().replace(/-/, "_")).name}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'event',items.type)"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">相关事件加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关事件</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关文档================================================== -->
      <panel name="4">
        <span>相关文档</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0' v-for='items in xiangguanDoc.statistics'>
            <p class="econtentp w5em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'document','')"></Button>
            </div>
          </div>
          <div class="econtent"  v-if='!(xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">文档事件加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关文档</p>
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
        spinWaiting:false,
        value1: ['1','2','3','4'],
        xiangguanEntityItems: new Array(),
        xiangguanEntitys:new Object(),
        xiangguanEvent:new Array(),
        xiangguanDoc:new Array(),
        linkObj: new Object(),
        myMap: new Map(),
        myMap1: new Map()
        
      }
    },
    props: ['tableData', 'entDivH'],
    mounted() {
      var mthis = this
      var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap1 = new Map();
      for(let eventNameitem of eventNames) {
        for(let items of eventNameitem.children){
          mthis.myMap1.set(items.getElementsByTagName('ename')[0].textContent, {name:items.getElementsByTagName('chname')[0].textContent,img:items.getElementsByTagName('img')[0].textContent})
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
    beforeDestroy(){
      this.tableData= new Object()
    },
    methods: {
      addSingleNodeToCanvans(id,type,subType) {
        var mthis = this
        if(type === 'entity') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            "nodeIds":id
          }).then(response => {
            let nodeArr = response.body.data[0].nodes.map(it=>{
              it.img = util.checkImgExists(it.img) ? (it.img) : 'http://10.60.1.140/assets/images/People.png'
              return it.id
            })
            mthis.$store.commit('setAddNetNodes', {
              nodes:response.body.data[0].nodes,
              links:mthis.linkObj.filter(item=>{
                return item.from == id || item.to == id
              })
            })
          })
        }
        if(type === 'event') {
          // ;
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
            "EventIds":id
          }).then(response => {
            // console.log('response.body.data')
            let nodes = new Array();
            let links = new Array();
            if(response.body.code === 0) {
              // let type = response.body.data[0].event_subtype.toLowerCase().replace(/-/, "_")
              let img = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).img
              let name = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).name
              for(let i = 0;i<response.body.data.length;i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: img,
                  entity_type: 'event',
                  name: name,
                  loaded: true
                })
                response.body.data[i].entity_list.map(oitem=>{
                  if(oitem.id === this.tableData.id) {
                    links.push({
                      id: (this.tableData.id>response.body.data[i].id)?(this.tableData.id+'-'+response.body.data[i].id):(response.body.data[i].id+'-'+this.tableData.id),
                      type: oitem.role,
                      from: this.tableData.id,
                      to: response.body.data[i].id,
                      direct: false
                    })
                  }
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes:nodes,
                links:links
              })
            }
          })
        }
        if(type === 'document') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
            "docIds":id
          }).then(response => {
            let nodes = new Array();
            let links = new Array();
            if(response.body.code === 0) {
              for(let i = 0;i<response.body.data.length;i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: 'http://10.60.1.140/assets/images/content_node.png',
                  entity_type: 'content',
                  name:response.body.data[i].title,
                  label: response.body.data[i].title.substring(0, 19)+'...',
                  loaded: true
                })
                let idstr = (this.tableData.id>response.body.data[i].id)?('content_'+this.tableData.id+'-'+response.body.data[i].id):('content_'+response.body.data[i].id+'-'+this.tableData.id)
                links.push({
                  id: idstr,
                  type: '包含',
                  from: this.tableData.id,
                  to: response.body.data[i].id,
                  direct: false
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes:nodes,
                links:links
              })
            }
          })
        }
      }
    },
    watch: {
      tableData: function() {
        // // console.log('===========custom_event_humanEntityTable --------tableData')
        let mthis = this
        mthis.xiangguanEntityItems = new Array()
        mthis.xiangguanEntitys = new Object()
        mthis.xiangguanEvent = new Array()
        mthis.xiangguanDoc = new Array()
        mthis.spinWaiting = true
        if(this.tableData.isArray){
          if(this.tableData.length>0){
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds":  mthis.tableData.map(item=>{return item.id}),
              "NodeTypes":mthis.tableData.map(item=>{return item.entity_type}),
              "TypeLabel": "all"
            }).then(response => {
  
            })
          } else {
            alert('长度为0')
          }
          // mthis.spinWaiting = false
        } else {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
            "NodeIds":  new Array(mthis.tableData.id),
            "NodeTypes":new Array('entity'),
            "TypeLabel": "all"
          }).then(response => {
            
           if(response.body.data[0].RelatedEntity[mthis.tableData.id]){
             response.body.data[0].RelatedEntity[mthis.tableData.id].links.map(item=>{
              item.type = item.undirected_type
              return item
            })
              mthis.linkObj = response.body.data[0].RelatedEntity[mthis.tableData.id].links
              mthis.xiangguanEntityItems = response.body.data[0].RelatedEntity[mthis.tableData.id].nodes
              mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
            }
            if(response.body.data[0].RelatedEvent[mthis.tableData.id]){
              mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
            }
            if(response.body.data[0].RelatedDocument[mthis.tableData.id]){
              mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
            }
            if (response.body.data[0].unknown !== new Object()) {
              // // console.log('------------有未知类型的节点--------------------')
              // // console.log(response.body.data[0].unknown)
              // // console.log('-----------------------------------------------')
            }
          })
        }
        mthis.spinWaiting = false
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
  .w5em {
    width: 5em;
    min-width: 5em;
    margin: 0;
  }

  .tableLine>.econtent:nth-child(odd){
    background-color: rgba(51,255,255,0.05);
  }
  .tableLine>.econtent:nth-child(odd):hover{
    background-color: rgba(51,255,255,0.2);
  }
  .tableLine>.econtent:nth-child(even):hover{
    background-color: rgba(51,255,255,0.2);
  }
  .tableLine>.econtent:hover>.eButton{
    opacity: 1;
  }
  .eButton{
    opacity: 0;
  }
</style>


