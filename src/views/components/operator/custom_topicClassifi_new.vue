<template>
    <div>
        <div>
            <p>文字词性</p>
            <div id="wordSpeech" :style="{marginTop:'20px'}">
                <Select v-model="model1" label-in-value style="width:200px;height:40px;" @on-change='changeWords'>
                    <Option v-for="item in wordGroup" :value="item.value" :key="item.value">{{ item.label }}</Option>
                </Select>
            </div>
        </div>
        <div :style="{marginTop:'20px'}">
            <p>文字大小</p>
            <div>
                <Slider v-model="wordSize" show-input></Slider>
            </div>
            
        </div>
        <div :style="{marginTop:'20px'}">
            <p>显示角度</p>
            <div>
                 <InputNumber :max="100" v-model="wordAngle" :formatter="value => `${value}%`" 
                 :parser="value => value.replace('%', '')"></InputNumber>
            </div>
        </div>
        <div :style="{marginTop:'20px'}">
            <p>显示数量</p>
            <div>
                <InputNumber v-model="wordNum"></InputNumber>
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
    data (){
        return {
            wordSize:16,
            wordAngle:0,
            wordNum:30,
            model1:[],
            wordGroup:[
                {
                    value:'keywords',
                    label:'关键词'
                },
                {
                    value:'PER',
                    label:'人名'
                },
                {
                    value:'LOC',
                    label:'地名'
                },
                {
                    value:'ORG',
                    label:'机构名'
                },
                {
                    value:'N',
                    label:'名词'
                },
                {
                    value:'V',
                    label:'动词'
                },
                {
                    value:'J',
                    label:'形容词'
                },
                {
                    value:'R',
                    label:'副词'
                },
                {
                    value:'P',
                    label:'代词'
                },
                {
                    value:'C',
                    label:'连词'
                },
                {
                    value:'O',
                    label:'其他'
                }
            ]
        }
    },
    methods:{
        changeWords(param){
            console.log(param)
            console.log(typeof param)
            this.$store.commit('setWordsSpeech',param)
        }
    }
}
</script>
<style>
    #wordSpeech>.ivu-select-single>.ivu-select-selection {
        height:30px;
        background-color: rgba(51,255,255,0.2) !important;
        color:#fff !important;
    }
</style>
