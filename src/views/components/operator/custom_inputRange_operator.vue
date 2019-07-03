<template>
    <Col span="20" class="range">
        <div>{{Params.name+':'}}</div>
        <div :style="{display:'flex',alignItems: 'center',marginTop:'10px'}">
            <InputNumber :max="90" :min='-90' :step='1' :active-change='false' v-model="startVal" size="small" :formatter="value => `${value}º`" 
            :parser="value => value.replace('º', '')" @on-change="changeStart"></InputNumber>
            <div :style="{fontSize:'20px',marginLeft:'10px',marginRight:'10px'}">~</div>
            <InputNumber :max="90" :min="-90" :active-change='false' :step='1' v-model="endVal" size="small" :formatter="value => `${value}º`" 
            :parser="value => value.replace('º', '')" @on-change="changeEnd"></InputNumber>
        </div>
        
    </Col>
</template>
<script>
export default {
    data () {
        return {
            // startVal:0,
            // endVal:0
        }
    },
    props:["Params"],
    methods:{
        changeStart(val){
            var mthis = this 
            let sendVal = []
            sendVal.push(val)
            sendVal.push(mthis.endVal)
            let param = {
                attrName:mthis.Params.attrName,
                value:sendVal
            };
           
            if(mthis.Params.excuteFunction !== undefined){
                  param.excuteFunction = mthis.Params.excuteFunction
              }
            mthis.$emit('param',param)
        },
        changeEnd(val){
            var mthis = this 
            let sendVal = []
            sendVal.push(mthis.startVal)
            sendVal.push(val)
            
            let param = {
                attrName:mthis.Params.attrName,
                value:sendVal
            };
            
            if(mthis.Params.excuteFunction !== undefined){
                  param.excuteFunction = mthis.Params.excuteFunction
              }
            mthis.$emit('param',param)
        }
    },
    computed:{
        startVal:{
            get(){
                var mthis = this;
                var st = mthis.Params.value.defaultValue[0]
                if(st == undefined){
                    return 0
                }else{
                    return st
                }
            },
            set(){}
        },
        endVal:{
            get(){
                var mthis = this;
                var et = mthis.Params.value.defaultValue[1]
                if(et == undefined){
                    return 0
                }else{
                    return et
                }
            },
            set(){}
        }
    }
}
</script>
<style>
.range input{
    /* background-color: rgba(51,255,255,0.15) !important; */
}
.range .ivu-input-number-input{
    background-color: rgba(51,255,255,0.15) !important;
    color:#fff;
}
.range a{
    color:rgba(51,255,255,0.2) !important;
}
.range .ivu-input-number{
    background-color: transparent !important;
    color:#fff;
    border:none !important;
}
.range .ivu-input-number-handler-wrap{
    border-left: 1px solid rgba(51,255,255,0.15);
    background-color: rgba(51,255,255,0.15);
}
.range .ivu-input-number-handler-down{
     border-top: 1px solid rgba(51,255,255,0.15);
}
.range .ivu-input-number-handler-up-inner,.ivu-input-number-handler-down-inner{
    color:rgba(51,255,255,0.2) !important;
}

.range a:hover{
    color:rgba(51,255,255,0.8) !important;
}
.range .ivu-input-number-small .ivu-input-number-handler{
    background-color: rgba(51,255,255,0.15) !important;
}
</style>
