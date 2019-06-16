<style>
.operatorDiv{
    margin: 10px auto;
    color: rgba(51,255,255,0.4);
    font-family: MicrosoftYaHei;
	/* font-size: 14px; */
	font-weight: normal;
	font-stretch: normal;
	letter-spacing: 0px;
}
</style>

<template>
    <div class="operatorDiv">
        <Row v-for="item in operatorData" type="flex" justify="center" id="asssss">
            <groupOperator v-if="item.type === 'group'" :Params='item' @param="setParam"></groupOperator>
            <sliderOperator v-if="item.type === 'Slider'" :sliderParams='item' @param="setParam"></sliderOperator>
            <docBar v-if="item.type === 'docBar'" :Params='item' @param="setParam"></docBar>
            <selectOperator v-if="item.type === 'Select'" :Params='item' @param="setParam"></selectOperator>
        </Row>
    </div>
</template>
<script>
import groupOperator from "./operator/custom_group_operator.vue"
import sliderOperator from "./operator/custom_slider_operator.vue"
import docBar from "./operator/custom_docBar_operator.vue"
import selectOperator from "./operator/custom_select_operator.vue"
    export default {
        data () {
            return {
                params:{}
            }
        },
        props:['operator'],
        methods:{
            setParam(param){
                var mthis = this;
                
                var excuteFunction = param.excuteFunction;
                if(excuteFunction !== undefined && excuteFunction !== ''){
                    if(param.value !== undefined){
                        mthis.$store.dispatch(excuteFunction,param.value);
                    } else {
                        mthis.$store.dispatch(excuteFunction);
                    }
                    
                } else {
                    var attrName = param.attrName;
                    var attrValue = param.value;
                    mthis.params[attrName] = attrValue;
                }
            }
          
        },
        computed:{
            operatorData:{
                get(){
                    var mthis = this;
                    var operatordata = [];
                    var Operator = mthis.operator;
                    for(let i = 0; i < Operator.length; i++){
                        var oper = Operator[i];
                        var operatorType = oper.operatorType;
                        if(operatorType === 'dynamic'){
                            
                            var dispose = oper.dispose;
                            var paramCompare = oper.paramCompare;
                            var att = oper.dynamicAttr;
                            var valueList = mthis.$store.state[att];
                            
                            for(let j = 0; j < valueList.length; j++){
                                var dynamicOperaItem = {};
                                var docItem = valueList[j];
                                if(!(docItem instanceof Object)){
                                    alert(att+'不是Object类型');
                                }else{
                                    var paramCompareKeys = Object.keys(paramCompare);
                                    var disposeKeys = Object.keys(dispose);
                                    for(let k = 0; k < paramCompareKeys.length; k++){
                                        let key = paramCompareKeys[k];
                                        let paramValue = docItem[key];
                                        dynamicOperaItem[key] = paramValue;
                                    }
                                    for(let k = 0; k < disposeKeys.length; k++){
                                        let key = disposeKeys[k];
                                        let disposeValue = dispose[key];
                                        dynamicOperaItem[key] = disposeValue;
                                    }
                                    
                                }
                                operatordata.push(dynamicOperaItem)
                            }
                        } else {
                            operatordata.push(oper)
                        }
                    }
                    return operatordata
                }
            }
        },
        watch:{
            operatorData(){
                
            }
        },
        components: {
          sliderOperator,
          docBar,
          groupOperator,
          selectOperator
        }
    }
</script>