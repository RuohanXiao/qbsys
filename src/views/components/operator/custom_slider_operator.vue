<style>
</style>

<template>
    <Col span="20">
        <div>{{sliderParams.name+":"}}</div>
        <Slider v-model="value" :min="extent[0]" :max="extent[1]" @on-input="changeValue"></Slider>
    </Col>
</template>
<script>
    export default {
        data () {
            return {
                value:0
            }
        },
        props:['sliderParams'],
        methods:{
            changeValue(){
              var mthis = this;
              debugger
              
              var param = {
                  attrName:mthis.sliderParams.attrName,
                  value:mthis.value,
              }
              if(mthis.sliderParams.executeFunction !== undefined){
                  param.executeFunction = mthis.sliderParams.executeFunction
              }
              mthis.$emit('param',param)
          }
          
        },
        watch:{
            Value:{
                handler: function() {
                    var mthis = this;
                    debugger
                    mthis.value = mthis.Value;
                },
                immediate: true
                
            }
            /* sliderParams:{
                handler: function() {
                    var mthis = this;
                    debugger
                    mthis.value = mthis.Value;
                },
                deep: true,
                immediate: true
            } */
        },
        computed:{
            extent:{
                get(){
                    var mthis = this;
                    var setterExtent = mthis.sliderParams.value.extent;
                    if(setterExtent === undefined){
                        return [0,100];
                    }  else {
                        return setterExtent;
                    }
                },
                set(){}
            },
            Value:{
                get(){
                    var mthis = this;
                    debugger
                    var setterValue = mthis.sliderParams.value.defaultValue;
                    if(setterValue === undefined){
                        return mthis.extent[0];
                    }  else {
                        return setterValue;
                    }
                },
                set(){}
            }
        }
    }
</script>