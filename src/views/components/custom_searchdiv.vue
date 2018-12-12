<template>
  <!-- <div>
    <i class="icon iconfont icon-search  process-img" style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i>
    <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfo" filterable
      remote placeholder='' :remote-method="searchInfo" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v,'type')}">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
            </Select>
  </div> -->
  <div>
    <div>
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}"><i class="icon iconfont icon-search  process-img" :class="(lightIconFlag)?'lightIcon':''" id='searchImg' style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i></div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}">
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfo" filterable
      remote placeholder='' :remote-method="searchInfo" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v)}">
              <!-- <OptionGroup label="文章检索">
                <Option :value='搜索:+{{inputInfo}}' :key="index">搜索关于{{inputInfo}}的相关文档</Option>
              </OptionGroup> -->
              <OptionGroup :label="opt.title" v-for="(opt,ind) in options1">
                <!-- <Option v-for="(option, index) in opt.data" :value="option.value" :key="index">
                  <img :src="option.src" />
                  <span style="float:right">{{option.label}}</span>
                  {{option.label}} {{option.label}}
                </Option> -->
                <Option v-for="(option, index) in opt.data" :value="option.value" :key="index">
                  <img v-if="option.img !== ''" :style="{width:'17px',height:'17px',borderRadius:'50%'}" :src="option.img" />
                  <img v-else-if="option.type ==='human'" :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544579488321&di=6ac4e68a9c8abbf0316159c3c410fe0e&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Felement_origin_min_pic%2F00%2F84%2F53%2F3156e7b84954899.jpg" />
                  <img v-else :style="{width:'17px',height:'17px',borderRadius:'50%'}" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1544580003616&di=4aa13f45136ed83ee2b79c793b914b8d&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dshijue1%252C0%252C0%252C294%252C40%2Fsign%3Daa6221f22aa446236ac7ad21f04b187b%2F08f790529822720ecbb3b97271cb0a46f21fab3d.jpg" />{{option.label}}</Option>
              </OptionGroup>
            </Select>
      </div>
    </div>
  </div>

</template>
<script>
  export default {
    data(){
      return {
        loading1: false,
        inputInfo: "",
        options1: [],
        lightIconFlag:false
      }
    },
    methods: {
      lightIcon() {
        lightIconFlag = !lightIconFlag
      },
      setOption (a) {
        var mthis = this;
        if(a !== undefined && a!== null && a!==''){
          if(a.value.split('搜索:').length > 1) {
          mthis.inputInfo = a.value.split('搜索:')[1]
          mthis.$router.push({path:'/home/contentView', query:{content:a.value.split('搜索:')[1]}})
        } else {
            mthis.$http.post('http://10.60.1.140:5001/node-datas/',{'nodeIds': a.value},{"emulateJSON":true}).then(response => {
            mthis.$store.commit('setSearchResult',response.body.data[0])
          })
        }

        } 
      },
      searchInfo(query) {
      var mthis = this;
      if (query !== "") {
        this.loading1 = true;
        let response = mthis.$http.get("http://10.60.1.140:5001/fuzzy-matchs/?pattern=" + query, {
            emulateJSON: true
          })
          .then(response => {
            let option = []
            let optionWord = {}
            let optionWordArr = []
            let optionList = {}
            let optionListArr = []
            optionWordArr.push({"label":'文档搜索-\''+query+'\'',"value":'搜索:'+query,"img":'',"type":'content'})
            for(let i = 0 ;i<response.body.data.length;i++) {
              optionListArr.push({"label":response.body.data[i].name,"value":response.body.data[i].id,"img":response.body.data[i].img,"type":'human'})
            }
            optionWord.title='文章检索'
            optionWord.data=optionWordArr
            optionList.title='实体检索'
            optionList.data=optionListArr
            option.push(optionList)
            option.push(optionWord)
            mthis.options1 = option;
            mthis.loading1 = false;
          });
      } else {
        this.options1 = [];
      }
    },
    }
  }
</script>
<style scoped>
.lightIcon{
  color: #33ffff;
}
</style>
