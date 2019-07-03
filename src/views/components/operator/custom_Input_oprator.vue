<template>
    <Col span="20" class="singleInput">
        <div :style="{marginBottom:'10px'}">{{Params.name+':'}}</div>
        <InputNumber v-model="value1" :active-change='false' :min='rangeVal[0]' :max='rangeVal[1]' @on-change="changeVal"></InputNumber>
    </Col>
</template>
<script>
export default {
    data(){
        return {
            // value1:0,
            // maxVal:100
        }
    },
    props:['Params'],
    methods:{
        changeVal(selParams){
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
    computed:{
        value1:{
            get(){
                var mthis = this;
                var val = mthis.Params.value.defaultValue
                if(val == undefined){
                    val = 0
                }else{
                    return val
                }
            },
            set(){}
        },
        rangeVal:{
            get (){
                var mthis = this;
                var val = mthis.Params.value.extent
                return val
            },
            set (){}
        }
    }
}
</script>
<style>
    .singleInput .ivu-input-number-input{
        background-color: rgba(51,255,255,0.15) !important;
        color:#fff;
        
    }
    .singleInput a{
        color:rgba(51,255,255,0.2) !important;
    }
    .singleInput .ivu-input-number{
        background-color: transparent !important;
        color:#fff;
        border:none !important;
        width: 200px;
    }
    .singleInput .ivu-input-number-handler-wrap{
        border-left: 1px solid rgba(51,255,255,0.15);
        background-color: rgba(51,255,255,0.15);
    }
    .singleInput .ivu-input-number-handler-down{
        border-top: 1px solid rgba(51,255,255,0.15);
    }
    .singleInput .ivu-input-number-handler-up-inner,.ivu-input-number-handler-down-inner{
        color:rgba(51,255,255,0.2) !important;
    }

    .singleInput a:hover{
        color:rgba(51,255,255,0.8) !important;
    }
    .singleInput  .ivu-input-number-handler{
        background-color: rgba(51,255,255,0.15) !important;
    }
</style>
