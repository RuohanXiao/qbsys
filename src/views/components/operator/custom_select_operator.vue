<style>
</style>

<template>
    <Col span="20">
        <div>{{Params.name+":"}}</div>
        <Select v-model="value" style="width:200px" @on-change="changeValue">
            <Option v-for="item in layerNames" :value="item.value" :key="item.value">{{ item.name }}</Option>
        </Select>
    </Col>
</template>
<script>
    export default {
        data () {
            return {
                value:''
            }
        },
        props:['Params'],
        methods:{
            changeValue(){
              var mthis = this;
              
              
              var param = {
                  attrName:mthis.Params.attrName,
                  value:mthis.value,
              }
              if(mthis.Params.excuteFunction !== undefined){
                  param.excuteFunction = mthis.Params.excuteFunction
              }
              mthis.$emit('param',param)
          }
          
        },
        watch:{
            /*Value:{
                handler: function() {
                    var mthis = this;
                    
                    mthis.value = mthis.Value;
                },
                immediate: true
                
            } */
        },
        computed:{
            layerNames:{
                get(){
                    var mthis = this;
                    var options = mthis.Params.value.options;
                    if(options === undefined){
                        /* return [0,100]; */
                        alert('算子库options设置错误！')
                    }  else {
                        return options;
                    }
                },
                set(){}
            }
        }
    }
</script>