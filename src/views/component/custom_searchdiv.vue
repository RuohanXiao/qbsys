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
      <div align="center" :style="{float:'left',verticalAlign: 'middle',lineHeight: '40px',width:'40px',height:'40px'}"><i class="icon iconfont icon-search  process-img" style="position: absolute;top:4px;left:14px;width:25px;height:25px;"></i></div>
      <div :style="{float:'right',position:'absolute',verticalAlign: 'middle',lineHeight: '40px',width:'100%',height:'40px'}">
        <Select id="queryInput" style="line-height: 40px;display: inline-block; vertical-align: middle;text-overflow:ellipsis;padding-left:40px;padding-top:2px;padding-right:10px;font-size: 18px,text-indent:3rem;min-height:40px" v-model="inputInfo" filterable
      remote placeholder='' :remote-method="searchInfo" :loading="loading1" :label-in-value="true" @on-change="v=>{setOption(v,'type')}">
              <Option v-for="(option, index) in options1" :value="option.value" :key="index">{{option.label}}</Option>
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
        options1: []
      }
    },
    methods: {
      setOption (a,b) {
        var mthis = this;
        // console.log(a)
        mthis.$http.post('http://10.60.1.141:5001/node-datas/',{'nodeIds': a.value},{"emulateJSON":true}).then(response => {
          mthis.$emit('initNodes',response.body.data[0]);
        })
      },
      searchInfo(query) {
      var mthis = this;
      if (query !== "") {
        this.loading1 = true;
        let response = mthis.$http.get("http://10.60.1.141:5001/node-ids/?pattern=" + query, {
            emulateJSON: true
          })
          .then(response => {
            let option = []
            for(let i = 0 ;i<response.data.data[0].nodes.length;i++) {
              option.push({"label":response.data.data[0].nodes[i].name,"value":response.data.data[0].nodes[i].nodeId})
            }
            // console.log(option)
            mthis.options1 = option;
            mthis.loading1 = false;
          });
        // axios.get('/getPersonInfo',{name:query})
        //   .then(function(response) {
        //     setTimeout(() => {
        //       mthis.options1 = response.data.data
        //       mthis.loading1 = false;
        //     }, 10);
        //   });
      } else {
        this.options1 = [];
      }
    },
    }
  }
</script>
<style>

</style>
