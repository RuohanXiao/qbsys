<style>
    .selOper .ivu-select-single .ivu-select-selection {
        height: 32px;
        position: relative;
        background-color:rgba(51,255,255,0.15) !important;
    }
</style>

<template>
    <Col span="20" class="selOper">
        <div :style="{marginBottom:'10px'}">{{Params.name+":"}}</div>
        <Select v-model="defaultValue" label-in-value style="width:200px;height:40px;" @on-change="changeValue">
            <Option v-for="item in layerNames" :value="item.value" :key="item.value">{{ item.label }}</Option>
        </Select>
    </Col>
</template>
<script>
    export default {
        data () {
            return {
            }
        },
        props:['Params'],
        methods:{
            changeValue(selParams){
              var mthis = this;
              
              console.log(selParams)
              
              var param = {
                  attrName:mthis.Params.attrName,
                  value:selParams,
              }
              if(mthis.Params.excuteFunction !== undefined){
                  param.excuteFunction = mthis.Params.excuteFunction
              }
              mthis.$emit('param',param)
          }
          
        },
        watch:{
        },
        computed:{
            defaultValue:{
                get(){
                    var mthis = this;
                    var defaultV = mthis.Params.value.defaultValue;
                    if(defaultV !== undefined){
                        return defaultV
                    } else{
                        return ''
                    }
                },
                set(){}
            },
            layerNames:{
                get(){
                    var mthis = this;
                    var options = mthis.Params.value.options;
                    if(options === undefined){
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