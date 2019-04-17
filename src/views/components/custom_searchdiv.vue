<template>
  <div>
    <div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}" class="inputDiv">
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoNet" filterable
          v-show="type==='net'" placeholder='' :remote='true' loading-text='加载中···' :remote-method="searchInfoNet" :loading="loading1" :label-in-value="true" @keyup.enter.native="enterNetOption(options1[0].data[0])" @on-open-change="lightIcon">
                <OptionGroup :label="opt1.title" v-for="(opt1) in options1" class="optionTitle">
                  <Option v-for="(option, index) in opt1.data" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}" @click.native="()=>{setOption(opt1.data[index])}">
                    <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/default.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoGeo" :remote='begeoSea'
          clearable filterable class="scrollBarAble" v-show="type==='geo'" placeholder='' :remote-method="searchInfoGeo" :loading="loading2" :label-in-value="false" @on-change="v=>{setOption(v)}" @keyup.enter.native="enterGeoOption(options2[0].data[0])" @on-open-change="lightIcon">
                <OptionGroup :label="opt.title" v-for="opt in options2" class="optionTitle">
                  <Option v-for="(option, index) in opt.data" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}" @click.native="()=>{setOption(opt.data[index])}">
                    <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else-if="option.type ==='location'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/thermodynamic_diagra.png" />
                    <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
        <Select id="queryInput" style="line-height: 50px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoContent" filterable
          class="scrollBarAble" v-show="type==='content'" remote placeholder='' :remote-method="searchInfoContent" :loading="loading3" :label-in-value="true" @on-change="v=>{setOption(v)}" @on-open-change="lightIcon" @keyup.enter.native="enterContentOption(options3[0].data[0])">
                <OptionGroup :label="opt.title" v-for="opt in options3">
                  <Option v-for="(option, index) in opt.data" :value="option.value" :key="index" :style="{lineHeight:'25px',display:'flex'}"  @click.native="()=>{setOption(opt.data[index])}">
                    <img v-if="option.img !== ''" :style="{width:'25px',height:'25px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else :style="{width:'25px',height:'25px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
      </div>
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}" class="imgDiv"><i class="icon iconfont icon-search process-img" :class="(lightIconFlag)?'lightIcon':''" id='searchImg' style="position: absolute;top:1px;left:14px;width:25px;height:25px;"></i></div>
    </div>
  </div>
</template>
<script>
  import util from '../../util/tools.js'
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
        options1: [],
        options2: [],
        options3: [],
        lightIconFlag: false,
        timer: null,
        optionNet: []
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
        // console.log('----setoption-----')
        // console.log(a)
        var mthis = this;
        if (this.$store.state.tmss === 'net') {
          // if (this.timer) {
          //   clearTimeout(this.timer)
          // }
          // this.timer = setTimeout(function() {
          //   // 新增防抖功能
          let arr = []
          arr.push(a.id)
          // console.log(a)
          // console.log(arr)
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            'nodeIds': arr
          }).then(response => {
            if (response.body.code === 0) {
              mthis.$store.commit('setSearchNetResult', {
                // id: response.body.data[0].nodes[0].id,
                // name: response.body.data[0].nodes[0].name,
                // nodes:response.body.data[0],
                data: response.body.data[0].nodes[0]
              })
            } else {
              alert('entity-detail接口异常')
            }
          })
          // }, 100);
        }
        if (this.$store.state.tmss === 'content') {
          mthis.$store.commit('setSearchContentResult', a.value)
          mthis.$store.commit('setConditionContent', a.value)
          var query = a.value;
          mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/doc-statistics/?query=" + a.value, {
              emulateJSON: true
            })
            .then(response => {
              mthis.$store.commit('setContentStatisticsResult', response.body)
            });
          /* mthis.inputInfoContent = a.value
          mthis.$store.commit('setSearchContentResult', [{
            node: {
              nodes: []
            },
            id: '',
            label: a.value
          }]) */
        }
        if (this.$store.state.tmss === 'geo') {
          if (a && a.value) {
            if (a.type === 'human') {
              mthis.$store.commit('setSearchGeoEventResult', {
                ids: [a.value]
              })
            } else if (a.type === 'location') {
              mthis.$store.commit('setHLlocationIds', [a.value])
            } else {
              mthis.$store.commit('setSearchGeoEntityResult', {
                ids: [a.value]
              })
            }
          }
        }
      },
      searchInfoNet(query) {
        var mthis = this;
        let timestamp = new Date().getTime()
        this.loading1 = true;
        if (query !== "") {
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let response = mthis.$http.get(mthis.$store.state.ipConfig.api_search + "/fuzzy-match/?pattern=" + query + '&timestamp=' + timestamp, {
                emulateJSON: true
              })
              .then(response => {
                if (response.body.timestamp == timestamp) {
                  // console.log('=======pattern======')
                  // // console.log(response)
                  mthis.options1 = []
                  // let optionWord = {}
                  // let optionWordArr = []
                  let optionList = {}
                  let optionListArr = []
                  // console.log(response.body)
                  // optionWordArr.push({"label":'文档搜索-\''+query+'\'',"value":'搜索:'+query,"img":'',"type":'content'})
                  for (let i = 0; i < response.body.data.nodes.length; i++) {
                    // console.log('======____+++++++++')
                    // console.log(response.body.data.nodes[i].img)
                    // console.log(util.checkImgExists(response.body.data.nodes[i].img) ? (response.body.data.nodes[i].img) : ('http://10.60.1.140/assets/images/default.png'))
                    // let name  = (response.body.data[0].nodes[i].chinese_name == '') ? response.body.data[0].nodes[i].name : response.body.data[0].nodes[i].chinese_name
                    optionListArr.push({
                      // "label": name,
                      "label": response.body.data.nodes[i].name,
                      // "value": response.body.data.nodes[i].id,
                      "value": query,
                      "id": response.body.data.nodes[i].id,
                      "img": util.checkImgExists(response.body.data.nodes[i].img) ? (response.body.data.nodes[i].img) : ('http://10.60.1.140/assets/images/default.png'),
                      "type": response.body.data.nodes[i].type
                    })
                  }
                  optionList.title = '实体检索'
                  optionList.data = optionListArr
                  // mthis.optionNet.push(optionList)
                  // mthis.options1 = mthis.optionNet;
                  mthis.options1 = new Array(optionList)
                  // console.log(mthis.options1)
                  mthis.loading1 = false;
                } else {
                  // console.log('---------error time-----')
                }
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
          //mthis.options2 = [];
          /* let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-match/?pattern=" + query, { */
          let response = mthis.$http.get(mthis.$store.state.ipConfig.api_search + "/fuzzy-match/?pattern=" + query, {
              emulateJSON: true
            })
            .then(response => {
              let option = []
              let optionOrg = {}
              let optionOrgArr = []
              let optionEvent = {}
              let optionEventArr = []
              let optionLocationName = {}
              let optionLocationNameArr = []
              let response_geo = mthis.$http.get("http://10.60.1.140:5001/search-location-name/?localName=" + query, {
                  //let response_geo = mthis.$http.get("http://127.0.0.1:5000/searchLocationName/" + query, {
                  emulateJSON: true
                })
                .then(response_geo => {
                  if (response_geo.data !== 'false') {
                    var LCdata = response_geo.body.data;
                    LCdata.forEach(function(item) {
                      var queryObj = {
                        "label": item.name,
                        "value": item.id + '_' + item.type,
                        "id": item.id + '_' + item.type,
                        "img": '',
                        "type": 'location'
                      }
                      optionLocationNameArr.push(queryObj)
                    })
                    optionLocationName.title = "地名搜索";
                    optionLocationName.data = optionLocationNameArr
                    for (let i = 0; i < response.body.data.nodes.length; i++) {
                      if (response.body.data.nodes[i].type === 'human') {
                        optionEventArr.push({
                          "label": response.body.data.nodes[i].name + ' 的事件',
                          "id": response.body.data.nodes[i].id,
                          "value": response.body.data.nodes[i].id,
                          "img": response.body.data.nodes[i].img,
                          "type": 'human'
                        })
                      } else if (response.body.data.nodes[i].type === 'organization') {
                        optionOrgArr.push({
                          "label": response.body.data.nodes[i].name,
                          "id": response.body.data.nodes[i].id,
                          "value": response.body.data.nodes[i].id,
                          "img": response.body.data.nodes[i].img,
                          "type": 'organization'
                        })
                      } else {}
                    }
                  }
                  optionOrg.title = '实体搜索'
                  optionOrg.data = optionOrgArr
                  optionEvent.title = '事件搜索'
                  optionEvent.data = optionEventArr
                  mthis.options2 = []
                  if (optionOrg.data.length > 0) {
                    mthis.options2.push(optionOrg)
                  }
                  if (optionEvent.data.length > 0) {
                    mthis.options2.push(optionEvent)
                  }
                  if (optionLocationName.data.length > 0) {
                    mthis.options2.push(optionLocationName)
                  }
                  // option.push(optionEvent)
                  // option.push(optionOrg)
                  // option.push(optionLocationName)
                  //// console.log('-------option------')
                  // // console.log(option)
                  // mthis.options2 = option;
                  //// console.log(mthis.options2)
                  mthis.loading2 = false;
                })
            });
        } else {
          mthis.options2 = [];
        }
      },
      searchInfoContent(query) {
        var mthis = this;
        if (query !== "") {
          mthis.loading3 = true;
          // let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-match/?pattern=" + query, {
          //     emulateJSON: true
          //   })
          //   .then(response => {
          let option = []
          let optionWord = {}
          let optionWordArr = []
          // for(let i = 0 ;i<response.body.data.length;i++) {
          //   optionWordArr.push({"label":'文档搜索实体-\''+response.body.data[i].name+'\'',"value":response.body.data[i].id,"img":response.body.data[i].img})
          // }
          optionWordArr.push({
            "label": query,
            "value": query,
            "img": ''
          })
          optionWord.title = '文章检索'
          optionWord.data = optionWordArr
          option.push(optionWord)
          mthis.options3 = option;
          mthis.loading3 = false;
          // });
        } else {
          mthis.options3 = [];
        }
      }
    },
    props: ['type']
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
  /* #queryInput:focus>.inputDiv+.imgDiv .process-img {
        color: red;
      } */
</style>

