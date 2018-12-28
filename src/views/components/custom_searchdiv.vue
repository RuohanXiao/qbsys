<template>
  <div>
    <div>
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}"><i class="icon iconfont icon-search  process-img" :class="(lightIconFlag)?'lightIcon':''" id='searchImg' style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i></div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}">
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoNet" filterable
          v-show="type==='net'" remote placeholder='' :remote-method="searchInfoNet" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v)}">
                <OptionGroup :label="opt.title" v-for="(opt,ind) in options1">
                  <Option v-for="(option, index) in opt.data" :value="option.value" :key="index" :style="{lineHeight:'17px'}">
                    <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/default.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoGeo" filterable
          v-show="type==='geo'" remote placeholder='' :remote-method="searchInfoGeo" :loading="loading2" :label-in-value="true" @on-change="v=>{setOption(v)}">
                <OptionGroup :label="opt.title" v-for="(opt,ind) in options2">
                  <Option v-for="(option, index) in opt.data" :value="option.value" :key="index">
                    <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoContent" filterable
          v-show="type==='content'" remote placeholder='' :remote-method="searchInfoContent" :loading="loading3" :label-in-value="true" @on-change="v=>{setOption(v)}">
                <OptionGroup :label="opt.title" v-for="(opt,ind) in options3">
                  <Option v-for="(option, index) in opt.data" :value="option.value" :key="index">
                    <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
                    <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
                    <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />{{option.label}}</Option>
                </OptionGroup>
              </Select>
      </div>
    </div>
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        loading1: false,
        loading2: false,
        loading3: false,
        inputInfoNet: "",
        inputInfoGeo: "",
        inputInfoContent: "",
        options1: [],
        options2: [],
        options3: [],
        lightIconFlag: false
      }
    },
    methods: {
      lightIcon() {
        lightIconFlag = !lightIconFlag
      },
      setOption(a) {
        var mthis = this;
        debugger
        if (a !== undefined && a !== null && a !== '') {
          if (a.value.split('搜索:').length > 1) {
            if (mthis.$store.state.tmss === 'net') {
              mthis.inputInfoNet = a.value.split('搜索:')[1]
              mthis.$store.commit('setSearchNetResult', [{
                node: {
                  nodes: []
                },
                id: '',
                label: a.value
              }])
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.inputInfoGeo = a.value.split('搜索:')[1]
              mthis.$store.commit('setSearchGeoResult', [{
                node: {
                  nodes: []
                },
                id: '',
                
                label: a.value
              }])
            } else {
              mthis.inputInfoContent = a.value
              mthis.$store.commit('setSearchContentResult', [{
                node: {
                  nodes: []
                },
                id: '',
                label: a.value
              }])
            }
            // mthis.$router.push({path:'/home/contentView', query:{content:a.value.split('搜索:')[1]}})
          } else {
            // mthis.$store.commit('setSearchResult',response.body.data[0])
            if (this.$store.state.tmss === 'net') {
              mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
                'nodeIds': a.value
              }, {
                "emulateJSON": true
              }).then(response => {
                mthis.$store.commit('setSearchNetResult', {
                  node: response.body.data[0],
                  id: response.body.data[0].nodes[0].id,
                  label: response.body.data[0].nodes[0].name
                })
              })
            }
            if (this.$store.state.tmss === 'content') {
              // alert('setoption1')
              console.log(a);
              var query = a.value;
              mthis.$http.get("http://10.60.1.140:5001/doc-statistics/?query=" + query, {
              emulateJSON: true
            })
            .then(response => {
              debugger
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
              mthis.$store.commit('setSearchGeoResult', {
                node: {
                  nodes: []
                },
                id: '',
                label: a.value
              })
            }
          }
        }
      },
      searchInfoNet(query) {
        var mthis = this;
        if (query !== "") {
          this.loading1 = true;
          let response = mthis.$http.get("http://10.60.1.140:5001/fuzzy-matchs/?pattern=" + query, {
              emulateJSON: true
            })
            .then(response => {
              let option = []
              // let optionWord = {}
              // let optionWordArr = []
              let optionList = {}
              let optionListArr = []
              // optionWordArr.push({"label":'文档搜索-\''+query+'\'',"value":'搜索:'+query,"img":'',"type":'content'})
              for (let i = 0; i < response.body.data.length; i++) {
                optionListArr.push({
                  "label": response.body.data[i].name,
                  "value": response.body.data[i].id,
                  "img": response.body.data[i].img,
                  "type": 'human'
                })
              }
              // optionWord.title='文章检索'
              // optionWord.data=optionWordArr
              optionList.title = '实体检索'
              optionList.data = optionListArr
              option.push(optionList)
              // option.push(optionWord)
              mthis.options1 = option;
              mthis.loading1 = false;
            });
        } else {
          this.options1 = [];
        }
      },
      searchInfoGeo(query) {
        var mthis = this;
        if (query !== "") {
          this.loading2 = true;
          let response = mthis.$http.get("http://10.60.1.140:5001/fuzzy-matchs/?pattern=" + query, {
              emulateJSON: true
            })
            .then(response => {
              let option = []
              let optionWord = {}
              let optionWordArr = []
              let optionList = {}
              let optionListArr = []
              optionWordArr.push({
                "label": '文档搜索-\'' + query + '\'',
                "value": '搜索:' + query,
                "img": '',
                "type": 'content'
              })
              for (let i = 0; i < response.body.data.length; i++) {
                optionListArr.push({
                  "label": response.body.data[i].name,
                  "value": response.body.data[i].id,
                  "img": response.body.data[i].img,
                  "type": 'human'
                })
              }
              optionWord.title = '文章检索'
              optionWord.data = optionWordArr
              optionList.title = '实体检索'
              optionList.data = optionListArr
              option.push(optionList)
              option.push(optionWord)
              mthis.options2 = option;
              mthis.loading2 = false;
            });
        } else {
          this.options2 = [];
        }
      },
      searchInfoContent(query) {
        var mthis = this;
        if (query !== "") {
          this.loading3 = true;
          let response = mthis.$http.get("http://10.60.1.140:5001/fuzzy-matchs/?pattern=" + query, {
              emulateJSON: true
            })
            .then(response => {
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
            });
        } else {
          this.options3 = [];
        }
      }
    },
    props: ['type']
  }
</script>
<style scoped>
  .lightIcon {
    color: #33ffff;
  }
</style>
