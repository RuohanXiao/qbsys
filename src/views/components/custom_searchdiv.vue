<template>
  <div>
    <div>
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}"><i class="icon iconfont icon-search  process-img" :class="(lightIconFlag)?'lightIcon':''" id='searchImg' style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i></div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}">
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoNet" filterable
          v-show="type==='net'" remote placeholder='' :remote-method="searchInfoNet" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v)}">
          <OptionGroup :label="opt1.title" v-for="(opt1) in options1">
            <Option v-for="(option, index) in opt1.data" :value="option.value" :key="index" :style="{lineHeight:'17px',display:'flex'}" @click.native="()=>{setOption(opt1.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
              <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
              <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/default.png" />&nbsp;&nbsp;{{option.label}}</Option>
          </OptionGroup>
        </Select>
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoGeo" filterable
          v-show="type==='geo'" remote placeholder='' :remote-method="searchInfoGeo" :loading="loading2" :label-in-value="true" @on-change="v=>{setOption(v)}">
          <OptionGroup :label="opt.title" v-for="opt in options2">
            <Option v-for="(option, index) in opt.data" :value="option.value" :key="index"  @click.native="()=>{setOption(opt.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
              <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
              <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />&nbsp;&nbsp;{{option.label}}</Option>
          </OptionGroup>
        </Select>
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfoContent" filterable
          v-show="type==='content'" remote placeholder='' :remote-method="searchInfoContent" :loading="loading3" :label-in-value="true" @on-change="v=>{setOption(v)}">
          <OptionGroup :label="opt.title" v-for="opt in options3">
            <Option v-for="(option, index) in opt.data" :value="option.value" :key="index"  @click.native="()=>{setOption(opt.data[index])}">
              <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
              <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_group.png" />
              <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="../../dist/assets/images/image_type.png" />&nbsp;&nbsp;{{option.label}}</Option>
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
        lightIconFlag: false,
        timer: null
      }
    },
    methods: {
      lightIcon() {
        lightIconFlag = !lightIconFlag
      },
      setOption(a) {
        var mthis = this;
        if (a !== undefined && a !== null && a !== '') {
          if (a.value.split('搜索:').length > 1) {
            // if (mthis.$store.state.tmss === 'net') {
            //   mthis.inputInfoNet = a.value.split('搜索:')[1]
            //   mthis.$store.commit('setSearchNetResult', [{
            //     node: {
            //       nodes: []
            //     },
            //     id: '',
            //     label: a.value
            //   }])
            // } else if (mthis.$store.state.tmss === 'geo') {
            //   mthis.inputInfoGeo = a.value.split('搜索:')[1]
            //   mthis.$store.commit('setSearchGeoResult', [{
            //     node: {
            //       nodes: []
            //     },
            //     id: '',
            //     label: a.value
            //   }])
            // }  else if (mthis.$store.state.tmss === 'content')  {
            //   alert(a.value)
            //   mthis.inputInfoContent = a.value
            //   mthis.$store.commit('setSearchContentResult', [{
            //     node: {
            //       nodes: []
            //     },
            //     id: '',
            //     label: a.value
            //   }])
            // }
            // mthis.$router.push({path:'/home/contentView', query:{content:a.value.split('搜索:')[1]}})
          } else {
            // mthis.$store.commit('setSearchResult',response.body.data[0])
            if (this.$store.state.tmss === 'net') {
              if (this.timer) {
                clearTimeout(this.timer)
              }
              this.timer = setTimeout(function() {
                // 新增防抖功能
                let arr = []
                arr.push(a.value)
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/node-datas-coarse/', {
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
                    alert('node-datas接口异常')
                  }
                })
              }, 100);
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
              debugger
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
          let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-matchs/?pattern=" + query, {
              emulateJSON: true
            })
            .then(response => {
              mthis.options1 = []
              // let optionWord = {}
              // let optionWordArr = []
              let optionList = {}
              let optionListArr = []
              // optionWordArr.push({"label":'文档搜索-\''+query+'\'',"value":'搜索:'+query,"img":'',"type":'content'})
              for (let i = 0; i < response.body.data[0].nodes.length; i++) {
                // let name  = (response.body.data[0].nodes[i].chinese_name == '') ? response.body.data[0].nodes[i].name : response.body.data[0].nodes[i].chinese_name
                // console.log(name)
                optionListArr.push({
                  // "label": name,
                  "label":response.body.data[0].nodes[i].name,
                  "value": response.body.data[0].nodes[i].id,
                  "img": response.body.data[0].nodes[i].img,
                  "type": response.body.data[0].nodes[i].type
                })
              }
              optionList.title = '实体检索'
              optionList.data = optionListArr
              let option = []
              option.push(optionList)
              mthis.options1 = option;
              mthis.loading1 = false;
            });
        } else {
          mthis.options1 = [];
        }
      },
      searchInfoGeo(query) {
        var mthis = this;
        if (query !== "") {
          mthis.loading2 = true;
          let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-matchs/?pattern=" + query, {
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
              for (let i = 0; i < response.body.data[0].nodes.length; i++) {
                optionListArr.push({
                  "label": response.body.data[0].nodes[i].name,
                  "value": response.body.data[0].nodes[i].id,
                  "img": response.body.data[0].nodes[i].img,
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
          mthis.options2 = [];
        }
      },
      searchInfoContent(query) {
        var mthis = this;
        if (query !== "") {
          mthis.loading3 = true;
          let response = mthis.$http.get(mthis.$store.state.ipConfig.api_url + "/fuzzy-matchs/?pattern=" + query, {
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
          mthis.options3 = [];
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
