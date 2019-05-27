<template>
  <div>
    <div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}" class="inputDiv">
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoNet" filterable
          v-show="type==='net'" placeholder='' :remote='true' loading-text='加载中···' :remote-method="searchInfoNet" :loading="loading1" :label-in-value="true" @keyup.enter.native="enterNetOption(options1[0].data[0])" @on-open-change="lightIcon">
          <OptionGroup :label="opt1.title" v-for="opt1 in options1" class="optionTitle">
            <Option v-for="(option, index) in opt1.data" :title="option.label" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}" @click.native="()=>{setOption(opt1.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" :onerror="errorImg(option)"/>
              <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" :onerror="errorImg(option)" />
              <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/default.png" />{{option.labelShort}}<span style="float:right;font-size: 12px;color: #ccffff;opacity: 0.5;" :onerror="errorImg(option)">{{option.labelvalue}}</span></Option>
          </OptionGroup>
        </Select>
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoGeo" :remote='begeoSea'
          clearable filterable class="scrollBarAble" v-show="type==='geo'" placeholder='' :remote-method="searchInfoGeo" :loading="loading2" :label-in-value="false" @on-change="v=>{setOption(v)}" @keyup.enter.native="enterGeoOption(options2[0].data[0])" @on-open-change="lightIcon">
          <OptionGroup :label="opt.title" v-for="opt in options2" class="optionTitle">
            <Option v-for="(option, index) in opt.data" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}" @click.native="()=>{setOption(opt.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" :onerror="errorImg(option)"/>
              <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" :onerror="errorImg(option)"/>
              <img v-else-if="option.type ==='location'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/thermodynamic_diagra.png" :onerror="errorImg(option)"/>
              <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.labelShort}}<span style="float:right;font-size: 12px;color: #ccffff;opacity: 0.5;">{{option.labelvalue}}</span></Option>
          </OptionGroup>
        </Select>
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoContent" filterable
          class="scrollBarAble" v-show="type==='content'" remote placeholder='' :remote-method="searchInfoContent" :loading="loading3" :label-in-value="true" @on-change="v=>{setOption(v)}" @on-open-change="lightIcon" @keyup.enter.native="enterContentOption(options3[0].data[0])">
          <OptionGroup :label="opt.title" v-for="opt in options3"  class="optionTitle">
            <Option v-for="(option, index) in opt.data" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}"  @click.native="()=>{setOption(opt.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" :onerror="errorImg(option)"/>
              <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" :onerror="errorImg(option)"/>
              <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.labelShort}}<span style="float:right;opacit:0.5" :onerror="errorImg(option)">{{option.labelvalue}}</span></Option>
          </OptionGroup>
        </Select>
      </div>
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}" class="imgDiv"><i class="icon iconfont icon-search process-img" :class="(lightIconFlag)?'lightIcon':''" id='searchImg' style="position: absolute;top:1px;left:14px;width:25px;height:25px;"></i></div>
    </div>
  </div>
</template>

<script>
  import util from '../../util/tools.js'
  import configer from '../../util/configContrl.js'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        begeoSea: true,
        loading1: false,
        loading2: false,
        loading3: false,
        inputInfoNet: "",
        inputInfoGeo: "",
        inputInfoContent: "",
        timestamp: '',
        options1: [],
        options2: [],
        options3: [],
        lightIconFlag: false,
        timer: null,
        optionNet: [],
        myMap: new Map()
      }
    },
    methods: {
      enterNetOption(a) {
        this.inputInfoNet = a.label
        this.setOption(a)
      },
      enterGeoOption(a) {
        this.inputInfoGeo = a.label
        this.setOption(a)
      },
      enterContentOption(a) {
        this.inputInfoContent = a.label
        this.setOption(a)
      },
      lightIcon() {
        this.lightIconFlag = !this.lightIconFlag
      },
      setOption(a) {
        var mthis = this;
        if (this.$store.state.tmss === 'net') {
          if (a.itemType === 'entity') {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
              'nodeIds': new Array(a.id)
            }).then(response => {
              if (response.body.code === 0) {
                mthis.$store.commit('setSearchNetResult', {
                  data: response.body.data[0].nodes[0]
                })
              } else {
                // alert('entity-detail接口异常')
                mthis.$store.commit('setNetPromte', 'entity-detail接口异常')
              }
            })
          } else if (a.itemType === 'set') {
            mthis.timestamp = new Date().getTime()
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
              "timestamp": mthis.timestamp,
              "idlist": new Array(a.id),
              "query": "id",
              "label": "set",
              "page": 1,
              "pagesize": 30
            }).then(response => {
              if (response.body.code === 0) {
                var dataobj = {};
                let re = response.body.data[0].nodeIds
                for (let i = 0; i < re.length; i++) {
                  var data = re[i];
                  var type = data.type;
                  if (type === 'entity' || type === 'event' || type === 'document') {
                    let ids = data.ids;
                    dataobj[type] = ids;
                  }
                }
                this.$store.commit('setWorkSpaceAddData', dataobj)
              } else {
                // alert('entity-detail接口异常')
              }
            })
            // let timestamp = new Date().getTime()
            // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
            //   "timestamp": timestamp,
            //   "idlist": new Array(a.id),
            //   "query":"id",
            //   "label": "set",
            //   "page": 1,
            //   "pagesize": 30
            // }).then(response => {
            //   if (response.body.code === 0) {
            //     this.$store.commit('setOpenWorkSetFlag',{
            //       id:a.id,
            //       type:'modify',
            //       time:new Date().getTime()
            //     })
            //   } else {
            //     alert('entity-detail接口异常')
            //   }
            // })
          } else if (a.itemType === 'pro') {
            mthis.timestamp = new Date().getTime()
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
              "timestamp": mthis.timestamp,
              "idlist": new Array(a.id),
              "query": "id",
              "label": "project",
              "page": 1,
              "pagesize": 30
            }).then(response => {
              if (response.body.code === 0) {
                mthis.$store.commit('setAddNetNodes', response.body.data[0].data)
              } else {
                // alert('entity-detail接口异常')
              }
            })
          } else {}
        }
        if (this.$store.state.tmss === 'content') {
          if (a.itemType === 'entity') {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds": new Array(a.id),
              // "NodeTypes": ["entity"],
              "TypeLabel": "document"
            }).then(response => {
              if (response.body.code === 0) {
                if (response.body.data[0].RelatedDocument[a.id]) {
                  let nodes = response.body.data[0].RelatedDocument[a.id].nodes
                  let ids = new Array()
                  ids = nodes.map(item => {
                    return item.id
                  })
                  mthis.$store.commit('setNetToContentData', {
                    'contentIds':{
                      'type':'search',
                      'ids': ids
                    }
                    
                  })
                } else {
                  mthis.$store.commit('setNetToContentData', {
                    'contentIds':{
                      'type':'search',
                      'ids': []
                    }
                  })
                  // alert('未找到对应文档')
                  mthis.$store.commit('setContentPromte', '未找到对应文档')
                }
              } else {
                mthis.$store.commit('setContentPromte', '查询文档数据异常')
                // alert('查询文档数据异常')
              }
            })
          } else if (a.itemType === 'set') {
            mthis.timestamp = new Date().getTime()
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
              "timestamp": mthis.timestamp,
              "idlist": new Array(a.id),
              "query": "id",
              "label": "set",
              "page": 1,
              "pagesize": 30
            }).then(response => {
              if (response.body.code === 0) {
                var idsList = [];
                let re = response.body.data[0].nodeIds
                for (let i = 0; i < re.length; i++) {
                  var data = re[i];
                  var type = data.type;
                  if (type === 'document') {
                    idsList.concat(data.ids);
                  }
                }
                if (idsList.length > 0) {
                  mthis.$store.commit('setNetToContentData', {
                    
                    'contentIds': {
                      'type':'search',
                      'ids':idlist
                    }
                  })
                } else {
                  // alert('该集合中无文档，请重新选择')
                  mthis.$store.commit('setContentPromte', '该集合中无文档，请重新选择')
                }
              } else {
                // alert('entity-detail接口异常')
                mthis.$store.commit('setContentPromte', 'entity-detail接口异常')
              }
            })
          } else if (a.itemType === 'keywords') {
            mthis.$store.commit('setSearchContentResult', a.value)
            mthis.$store.commit('setConditionContent', a.value)
            var query = a.value;
            mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/doc-statistics/?query=" + a.value, {
                emulateJSON: true
              })
              .then(response => {
                mthis.$store.commit('setContentStatisticsResult', response.body)
              });
          } else {}
        }
        if (this.$store.state.tmss === 'geo') {
          mthis.inputInfoGeo = a.label
          if (a && a.value) {
            if(a.itemType === 'set'){
              var setId = a.id
              var param = {
                "timestamp": "loooooooooooooooooong_timestamp",
                "idlist": [setId],
                "query":"id",
                "label": "set",
                "page": 1,
                "pagesize": 30
              }
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + "/load-set-data/",param)
                .then(response => {
                  var datas = response.body.data[0].nodeIds
                  var noAreaIds = [];
                  var areaIds = [];
                  for(let i = 0; i < datas.length; i++){
                    var data = datas[i];
                    var type = data.type;
                    if(type === 'entity' || type === 'event'){
                      let ids = data.ids;
                      for(let j = 0; j < ids.length; j++){
                        let id = ids[j];
                        noAreaIds.push(id);
                      }
                    }
                    if(type === 'area'){
                      let ids = data.ids;
                      for(let j = 0; j < ids.length; j++){
                        let id = ids[j];
                        areaIds.push(id);
                      }
                    }
                  }
                  if(areaIds.length > 0){
                    mthis.$store.commit('setGeoWorkSetData_area',areaIds);
                  }
                  if(noAreaIds.length > 0){
                    mthis.$store.commit('setGeoNoAreaDataGoInMap',noAreaIds);
                  }
                },function(error){
                  console.log('请求/load-set-data/失败！')
                })
            } else if(a.itemType === 'location'){
              mthis.$store.commit('setHLlocationIds', [a.value])
            } else {
              mthis.$store.commit('setGeoNoAreaDataGoInMap',[a.id]);
            }
            /* if (a.type === 'human') {
              mthis.$store.commit('setSearchGeoEventResult', {
                ids: [a.value]
              })
            } else if (a.type === 'location') {
              mthis.$store.commit('setHLlocationIds', [a.value])
            } else if (a.type === 'administrative') {
              mthis.$store.commit('setSearchGeoEntityResult', {
                ids: [a.value]
              })
            } */
          }
        }
      },
      returnCHname(ename) {
        switch (ename) {
          case 'human':
            return '人物'
            break;
          case 'administrative':
            return '国家'
            break;
          case 'organization':
            return '组织'
            break;
          case 'weapon':
            return '武器'
            break;
          case 'other':
            return '其他'
            break;
          case 'country':
            return '国家'
            break;
          case 'province':
            return '省份'
            break;
        }
      },
      errorImg(item) {
        if (item.type === 'administrative') {
          this.src = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
        } else if (item.type === 'human') {
          this.src = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchHuman.png'
        } else if (item.type === 'organization') {
          this.src = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchOrg.png'
        } else if (item.type === 'weapon') {
          this.src = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/weapon.png'
        } else {
          this.src = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/image.png'
        }
      },
       errorImg1(item) {
        if (item.type === 'administrative') {
          return  util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
        } else if (item.type === 'human') {
          return  util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchHuman.png'
        } else if (item.type === 'organization') {
          return  util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchOrg.png'
        } else if (item.type === 'weapon') {
          return  util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/weapon.png'
        } else {
          return util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/image.png'
        }
      },
      searchInfoNet(query) {
        var mthis = this;
        mthis.timestamp = new Date().getTime()
        mthis.loading1 = true;
        let optionsTemp = []
        if (query !== "") {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let qtext = decodeURI(query)
            let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/qb-search/?keyword=" + qtext + '&type=net&timestamp=' + mthis.timestamp, {
                emulateJSON: true
              })
              .then(response => {
                if (response.body.timestamp == mthis.timestamp && response.body.code == 0) {
                  mthis.options1 = []
                  // let optionList = {}
                  // let optionListArr = []
                  // for (let i = 0; i < response.body.data.nodes.length; i++) {
                  //   optionListArr.push({
                  //     "label": response.body.data.nodes[i].name,
                  //     "value": query,
                  //     "id": response.body.data.nodes[i].id,
                  //     "img": util.checkImgExists(response.body.data.nodes[i].img) ? (response.body.data.nodes[i].img) : ('http://10.60.1.140/assets/images/default.png'),
                  //     "type": response.body.data.nodes[i].type
                  //   })
                  // }
                  // optionList.title = '实体检索'
                  // optionList.data = optionListArr
                  // mthis.options1 = new Array(optionList)
                  // mthis.loading1 = false;
                  if (response.body.data.SearchEntity.length > 0) {
                    let optionList = new Object()
                    let optionListArr = new Array()
                    response.body.data.SearchEntity.map(item => {
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": "(" + mthis.returnCHname(item.type) + ')',
                        "value": item.name,
                        "id": item.id,
                        // "img": mthis.errorImg1(item),
                        "img": item.img,
                        "type": item.type,
                        "itemType": 'entity'
                      })
                    })
                    optionList.title = '实体检索';
                    optionList.data = optionListArr
                    optionsTemp.push(optionList)
                  }
                  if (response.body.data.SearchSet.length > 0) {
                    let optionList = new Object()
                    let optionListArr = new Array()
                    response.body.data.SearchSet.map(item => {
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": '(集合)',
                        "value": item.name,
                        "id": item.id,
                        // "img": util.checkImgExists(item.img) ? (item.img) : ('http://10.60.1.140/assets/images/default.png'),
                        "img": 'http://10.60.1.140/assets/images/searchSet.png',
                        "type": item.type,
                        "itemType": 'set'
                      })
                    })
                    optionList.title = '集合检索';
                    optionList.data = optionListArr
                    optionsTemp.push(optionList)
                  }
                  if (response.body.data.SearchPro.length > 0) {
                    let optionList = new Object()
                    let optionListArr = new Array()
                    optionList.title = '图集检索';
                    response.body.data.SearchPro.map(item => {
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": '(图集)',
                        "value": item.name,
                        "id": item.id,
                        // "img": util.checkImgExists(item.img) ? (item.img) : ('http://10.60.1.140/assets/images/default.png'),
                        "img": 'http://10.60.1.140/assets/images/timg.png',
                        "type": item.type,
                        "itemType": 'pro'
                      })
                    })
                    optionList.data = optionListArr
                    optionsTemp.push(optionList)
                  }
                  setTimeout(function() {
                    mthis.loading1 = false;
                    mthis.options1 = optionsTemp
                  }, 200);
                } else {}
              })
          }, 200);
        } else {
          mthis.options1 = [];
          mthis.loading1 = false;
        }
      },
      searchInfoGeo(query) {
        var mthis = this;
        if (query !== "") {
          mthis.loading2 = true;
          let optionsTemp = []
          mthis.timestamp = new Date().getTime()
          let qtext = decodeURI(query)
          let option = []
          let optionOrg = {}
          let optionOrgArr = []
          let optionEvent = {}
          let optionEventArr = []
          let optionLocationNames = []
          let optionLocationNameArr = []
          let res1 = new Array()
          let res2 = new Array()
          let res3 = new Array()
          let optionListArr = new Array()
          let optionListArr1 = new Array()
          mthis.options2 = [];
          /* let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-match/?pattern=" + query, { */
          let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/qb-search/?keyword=" + qtext + '&type=geo&timestamp=' + mthis.timestamp, {
              emulateJSON: true
            })
            .then(response => {
              if (response.body.timestamp == mthis.timestamp && response.body.code == 0) {
                if (response.body.data.SearchEntity.length > 0) {
                  let optionList = new Object()
                  
                  response.body.data.SearchEntity.map(item => {
                    if(item.type === "locationName"){
                      /* optionLocationNames.push(item); */
                      var shortname = '';
                      if (item.name.length > 14) {
                        shortname = item.name.substring(0, 13) + '...'
                      } else {
                        shortname = item.name
                      }
                      var queryObj = {
                        "label": item.name,
                        "labelShort": shortname,
                        "labelvalue": "(地区)",
                        "value": item.id,
                        "id": item.id,
                        "img": '',
                        "type": 'location',
                        "itemType":'location'
                      }
                      optionLocationNameArr.push(queryObj);
                    } else {
                      if (item.type === 'administrative') {
                        item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
                      } else if (item.type === 'human') {
                        item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchHuman.png'
                      } else if (item.type === 'organization') {
                        item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchOrg.png'
                      } else if (item.type === 'weapon') {
                        item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/weapon.png'
                      } else {
                        item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/image.png'
                      }
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": "(" + mthis.returnCHname(item.type) + ')',
                        "value": item.name,
                        "id": item.id,
                        "img": item.img,
                        "type": item.type,
                        "itemType": 'entity'
                      })
                    }
                  })
                }
                if (response.body.data.SearchSet.length > 0) {
                  let optionList1 = new Object()
                  
                  response.body.data.SearchSet.map(item => {
                    if (item.name.length > 14) {
                      item.shortname = item.name.substring(0, 13) + '...'
                    } else {
                      item.shortname = item.name
                    }
                    optionListArr1.push({
                      "label": item.name,
                      "labelShort": item.shortname,
                      "labelvalue": '(集合)',
                      "value": item.name,
                      "id": item.id,
                      // "img": util.checkImgExists(item.img) ? (item.img) : ('http://10.60.1.140/assets/images/default.png'),
                      "img": 'http://10.60.1.140/assets/images/searchSet.png',
                      "type": item.type,
                      "itemType": 'set'
                    })
                  })
                }
                
              }
              setTimeout(function() {
                mthis.loading2 = false;
                if(optionLocationNameArr.length > 0){
                  mthis.options2.push({
                      title: '地名检索',
                      data: optionLocationNameArr
                    })
                }
                if(optionListArr.length > 0){
                  mthis.options2.push({
                      title: '实体检索',
                      data: optionListArr
                    })
                }
                if(optionListArr1.length > 0){
                  mthis.options2.push({
                      title: '集合检索',
                      data: optionListArr1
                    })
                }
              }, 200);
            });
        } else {
          mthis.options2 = [];
        }
      },
      searchInfoContent(query) {
        // var mthis = this;
        // if (query !== "") {
        //   mthis.loading3 = true;
        //   let option = []
        //   let optionWord = {}
        //   let optionWordArr = []
        //   optionWordArr.push({
        //     "label": query,
        //     "value": query,
        //     "img": ''
        //   })
        //   optionWord.title = '文章检索'
        //   optionWord.data = optionWordArr
        //   option.push(optionWord)
        //   mthis.options3 = option;
        //   mthis.loading3 = false;
        var mthis = this;
        mthis.timestamp = new Date().getTime()
        mthis.loading3 = true;
        let optionsTemp = []
        if (query !== "") {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let qtext = decodeURI(query)
            let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/qb-search/?keyword=" + qtext + '&type=net&timestamp=' + mthis.timestamp, {
                emulateJSON: true
              })
              .then(response => {
                if (response.body.timestamp == mthis.timestamp && response.body.code == 0) {
                  mthis.options3 = []
                  if (response.body.data.SearchEntity.length > 0) {
                    let optionList = new Object()
                    let optionListArr = new Array()
                    response.body.data.SearchEntity.map(item => {
                      // if (item.type === 'administrative') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
                      // } else if (item.type === 'human') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchHuman.png'
                      // } else if (item.type === 'organization') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchOrg.png'
                      // } else if (item.type === 'weapon') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/weapon.png'
                      // } else if (item.type === 'province') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
                      // } else if (item.type === 'country') {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/searchAdmin.png'
                      // } else {
                      //   item.img = util.checkImgExists(item.img) ? (item.img) : 'http://10.60.1.140/assets/images/image.png'
                      // }
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": "(" + mthis.returnCHname(item.type) + ')',
                        "value": item.name,
                        "id": item.id,
                        // "img": mthis.errorImg1(item),
                        "img": item.img,
                        "type": item.type,
                        "itemType": 'entity'
                      })
                    })
                    optionList.title = '实体检索';
                    optionList.data = optionListArr
                    optionsTemp.push(optionList)
                  }
                  if (response.body.data.SearchSet.length > 0) {
                    let optionList = new Object()
                    let optionListArr = new Array()
                    response.body.data.SearchSet.map(item => {
                      if (item.name.length > 14) {
                        item.shortname = item.name.substring(0, 13) + '...'
                      } else {
                        item.shortname = item.name
                      }
                      optionListArr.push({
                        "label": item.name,
                        "labelShort": item.shortname,
                        "labelvalue": '(集合)',
                        "value": item.name,
                        "id": item.id,
                        // "img": util.checkImgExists(item.img) ? (item.img) : ('http://10.60.1.140/assets/images/default.png'),
                        "img": 'http://10.60.1.140/assets/images/searchSet.png',
                        "type": item.type,
                        "itemType": 'set'
                      })
                    })
                    optionList.title = '集合检索';
                    optionList.data = optionListArr
                    optionsTemp.push(optionList)
                  }
                  setTimeout(function() {
                    let optionWord = {}
                    let optionWordArr = []
                    optionWordArr.push({
                      "label": query,
                      "labelShort": query,
                      "value": query,
                      "id": '',
                      "itemType": 'keywords',
                      "img": 'http://10.60.1.140/assets/images/image.png'
                    })
                    optionWord.title = '关键词检索'
                    optionWord.data = optionWordArr
                    optionsTemp.push(optionWord)
                    mthis.loading3 = false;
                    mthis.options3 = optionsTemp
                  }, 200);
                } else {}
              })
          }, 200);
        } else {
          mthis.options3 = [];
          mthis.loading3 = false;
        }
      }
    },
    props: ['type'],
    created() {
      var mthis = this
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
    }
  }
</script>

<style scoped>
  .lightIcon {
    color: rgb(51, 255, 255, 0.8);
  }
</style>

<style>
  /* 滚动条样式 */
  #queryInput>.ivu-select-dropdown {
    overflow-y: hidden;
    max-width: 100%;
  }
  #queryInput>.ivu-select-dropdown::-webkit-scrollbar {
    background: rgba(0, 0, 0, 0);
    opacity: 0;
    position: absolute;
  }
  #queryInput>.ivu-select-dropdown::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    background: rgba(0, 0, 0, 0);
    opacity: 0;
  }
  #queryInput>.ivu-select-dropdown::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 0;
    background: rgba(0, 0, 0, 0);
    opacity: 0;
  }
  #queryInput>.ivu-select-dropdown:hover {
    overflow-y: auto;
    overflow-x: hidden;
  }
  #queryInput>.ivu-select-dropdown:hover::-webkit-scrollbar {
    opacity: 1;
    width: 5px;
    height: 5px;
  }
  #queryInput>.ivu-select-dropdown:hover::-webkit-scrollbar-thumb {
    opacity: 1;
    border: 5px solid transparent;
    padding-right: 5px !important;
    border-radius: 10px;
    min-height: 20px;
    background-color: #3cc;
    box-shadow: 1px 1px 3px #3cc inset;
  }
  #queryInput>.ivu-select-dropdown:hover::-webkit-scrollbar-track {
    opacity: 0;
    border-radius: 2.5px !important;
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0) inset;
    background: rgba(0, 0, 0, 0);
  }
  .ivu-select-group-title {
    color: rgba(204, 255, 255, 0.5) !important;
    line-height: 20px !important;
    height: 20px !important;
  }
  .process-img {
    color: rgba(51, 255, 255, 0.5);
    animation: all 1s;
    -webkit-animation: all 1s;
  }
  .labelWidth {
    width: 70%;
    text-overflow: ellipsis;
    overflow: hidden;
  }
  /* #queryInput:focus>.inputDiv+.imgDiv .process-img {
                                            color: red;
                                          } */
</style>
