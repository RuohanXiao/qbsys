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
        <Row v-for="item in operator" type="flex" justify="center">
            <sliderOperator v-if="item.type === 'Slider'" :sliderParams='item' @param="setParam"></sliderOperator>
        </Row>
    </div>
</template>
<script>
import sliderOperator from "./operator/custom_slider_operator.vue"
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
                debugger
                var executeFunction = param.executeFunction;
                if(executeFunction !== undefined && executeFunction !== ''){
                    mthis.$store.dispatch(executeFunction,param.value);
                } else {
                    var attrName = param.attrName;
                    var attrValue = param.value;
                    mthis.params[attrName] = attrValue;
                }
            }
          
        },
        components: {
          sliderOperator
        }
    }
</script>