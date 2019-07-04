<template>
    <div :style="{display:'flex',flexWrap:'wrap',flexDirection:'row-reverse'}" 
    @click="hideDoc" tabindex="1" @keydown="keyD" @keyup="keyU" style="outline:none;">
        
        <div class='docTitle' @click="showDoc">
            <img src=http://10.60.1.140/assets/images/content_node.png 
            :style="{width:'20px',height:'20px'}">
            <div :style="{color:'#fff',display:'flex'}">
                <transition name="bounce"> 
                    <p :style="{fontSize:'18px',position:'relative'}" v-show="show">{{docNumber}}</p>
                </transition>
                <p :style="{marginLeft:'3px'}">/篇</p>
            </div>
            <div class="docShow" v-show="ifShowDoc">
                <div class="docItem">
                    <div v-for="(item,index) in docDatas" :key="index" :title="item.title"
                    class="item-def"
                    >
                        <p class="itemTitle">{{item.title}}</p>
                    </div>
                </div>
                <div :style="{width:'230px',height:'20px',positon:'absolute',bottom:'0px',display:'flex',justifyContent: 'space-between',marginBottom:'5px'}">
                    <div :style="{display:'flex'}">
                        <img src=http://10.60.1.140/assets/images/content_node.png 
                        :style="{width:'20px',height:'20px',marginLeft:'10px'}">
                        <p :style="{color:'#fff',marginLeft:'5px'}">
                            <span :style="{fontSize:'10px'}">{{docNumber}}</span>
                            <span :style="{fontSize:'10px'}">/篇</span>
                        </p>
                    </div>
                    <div @click="toContent"
                    :style="{width:'100px',borderRadius:'5px',backgroundColor:'rgba(51,255,255,0.4)',cursor:'pointer',textAlign: 'center',lineHeight: '20px'}">
                        切换至文档视图
                    </div>
                    
                </div>
            </div>
        </div>
        <div :id="main1Id" :style="{marginTop:'30px'}" ></div>
        
    </div>
</template>
<script>
import echarts from 'echarts';
import mock from '../../mock/index.js';
import $ from "jquery"
import {
    mapState,
    mapMutations
  } from 'vuex' 
export default {
    data(){
        return {
            charts:null,
            main1Id:'wordC',
            // docNum:234,
            ifShowDoc:false,

            docDatas:[],
            prevDocDatas:[],
            showWords:[],
            docNumber:null,
            items:[],
            allWords:{},
            show:true,
            rangeAngle:[],
            // 用于控制词云颜色
            colorFlag:0,
            // 用于改变某个词云
            dataInt:null,
            // 用于word-doc的请求IDList
            sendWordIds:[],
            ctrlFlag:false,
            sWord:[],
            prevColorList:[]
        }
    },
    props:['docNum','initWord'],
    computed: mapState(['wordsSpeech','wordsAngel','wordsNum','wordsSize','contentTimeCondition']),
    watch:{
        docNum:function(){
            this.docNumber = this.docNum
        },
        docDatas:{
            deep:true,
            handler(){
                var mthis = this;
                mthis.sendWordIds=[]
                mthis.docDatas.forEach(item =>{
                    mthis.sendWordIds.push(item.id)
                })
            }
        },
        'contentTimeCondition.ids':function(){
            var mthis = this
            if(!mthis.initWord) return;
            console.log(mthis.contentTimeCondition.ids)
            if(mthis.contentTimeCondition.ids.length>0){
                let items = []
                mthis.changeNum(mthis.contentTimeCondition.ids.length)
                for(var i of mthis.contentTimeCondition.ids){
                    for(var j in mthis.prevDocDatas){
                        if(i == mthis.prevDocDatas[j].id){
                            // mthis.prevDocDatas[j].check = true
                            items.push(mthis.deepClone(mthis.prevDocDatas[j]))
                        }
                    }
                }
                mthis.docDatas = mthis.deepClone(items)
                
            }
            if(mthis.contentTimeCondition.ids.length ==0){
                mthis.changeNum(mthis.prevDocDatas.length)
                mthis.docDatas = mthis.deepClone(mthis.prevDocDatas)
            }
        },
        wordsSize:function(){
            // 词云fontsize
            var mthis = this 
            console.log(mthis.wordsSize)
            mthis.loadEcharts(3,mthis.wordsSize)
            // alert(mthis.wordsSize)
        },
        wordsNum:function(){
            // 词云数量
            var mthis = this
            alert(mthis.wordsNum)
        },
        wordsAngel:{
            // 词云旋转角度
            deep:true,
            handler(){
                var mthis = this
                // mthis.rangeAngle = mthis.wordsAngel
                mthis.loadEcharts(4,mthis.wordsAngel)
            }
        },
        wordsSpeech:{
            // 词性选择
            deep:true,
            
            handler(newVal){
                var mthis = this
                console.log(this.wordsSpeech)
                let keyW = mthis.wordsSpeech.value
                mthis.showWords = mthis.allWords[keyW]
                
                
                mthis.loadEcharts(2,mthis.wordsSpeech)
                
            }
        },
        initWord:function(){
            var mthis = this
            
            if(this.initWord){
                mock.get('/getWords').then(function(res){
                    console.log(res)
                    mthis.showWords = res.data.data.keywords
                    mthis.allWords = mthis.deepClone(res.data.data)
                    mthis.loadEcharts(6,null)
                })
                mthis.docDatas = mthis.$store.state.seletedDocAttrList
                mthis.prevDocDatas = mthis.deepClone(mthis.docDatas)
                // let idList = mthis.$store.state.selectContentNodes[0].ids
                // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-top/',{
                //     ids:idList,
                //     typeLabel:'group',
                //     word:'keywords'
                // }).then((response) =>{
                //     if(response.body.code ==0){
                //         mthis.showWords = response.body.data[0].topDatas;
                        
                //         mthis.loadEcharts(6)
                //     }
                // })
            }
        }
    },
    methods:{
        deepClone(obj){
            let _obj = JSON.stringify(obj);
            let objClone = JSON.parse(_obj);
            return objClone
        },
        changeNum(num){
            var mthis = this
            this.show = false
            this.docNumber = num
            setTimeout(function(){
                mthis.show = true
            },300)
        },
        clearBubble(e) {
        if (e.stopPropagation) {
          e.stopPropagation();
          } else {
            e.cancelBubble = true;
          }
          if (e.preventDefault) {
              e.preventDefault();
            } else {
              e.returnValue = false;
            }
        },
        keyD(e){
            this.clearBubble(e)
            var mthis = this;
            if(e.ctrlKey){
                mthis.ctrlFlag = true
                console.log("keydown")
            }
            
        },
        keyU(e){
            this.clearBubble(e)
            var mthis = this;
            
            if(e.keyCode==17){
                mthis.ctrlFlag = false
                console.log("keyup")
            }
        },
        getWordsDoc(word,speech){
            mthis.$http.post(mthis.$store.state.ipConfig.api_url +"/word-doc/",{
                "idList":mthis.sendWordIds,
                "word":word,
                "speech":speech
            }).then(response =>{
                if(response.body.code == 0){
                    let items = []
                    mthis.changeNum(response.body.data.ids.length)
                    for(var i of response.body.data.ids){
                        for(var j in mthis.prevDocDatas){
                            if(i == mthis.prevDocDatas[j].id){
                                // mthis.prevDocDatas[j].check = true
                                items.push(mthis.deepClone(mthis.prevDocDatas[j]))
                            }
                        }
                    }
                    mthis.docDatas = mthis.deepClone(items)
                }
            })
        },
        loadEcharts(flag,param){
            var mthis = this;
            if(flag ==1){
                this.option = new Object({
                    title:{
                        name:'keyWords分析',
                        x:'center',
                        textStyle:{
                            fontSize:12,
                            color:'#ffffff'
                        }
                    },
                    tooltip: {
                        show: true
                    },
                    series:[
                        {
                            name:'关键词',
                            type:'wordCloud',
                            shape: 'circle',
                            sizeRange: [18, 32],
                            rotationRange: [0, 0],
                            textPadding: 0,
                            autoSize:{
                                enable:true,
                                minSize:18
                            },
                            textStyle:{
                                normal:{
                                    color:function(params){
                                        var colorList = ['#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff'
                                        ,'#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff',
                                        '#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff'
                                        ,'#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff'
                                        ,'#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff','#99ffff','#339999','#ccffff','#33cccc','#00cccc','#33ffff']
                                        var colorListSingle = []
                                        var colorListMore = []
                                        // var prevColorList = []
                                        if(mthis.colorFlag ==0){
                                            // 初始化
                                            return colorList[params.dataIndex]
                                        }else if(mthis.colorFlag ==1){
                                            // 单选
                                            colorListSingle = colorList.slice(0)
                                            colorListSingle[mthis.dataInt] = "#C1232B"
                                            mthis.prevColorList = colorListSingle.slice(0)
                                            // console.log(prevColorList)
                                            return colorListSingle[params.dataIndex]
                                        }else if(mthis.colorFlag ==2){
                                            // 多选
                                            
                                            colorListMore = mthis.prevColorList.slice(0)
                                            // console.log(colorListMore)
                                            colorListMore[mthis.dataInt] = "#C1232B"
                                            // console.log(colorListMore)
                                            mthis.prevColorList = colorListMore.slice(0)
                                            // console.log(prevColorList)
                                            return colorListMore[params.dataIndex]
                                        }
                                        
                                        
                                        
                                    }
                                },
                                emphasis:{
                                    shadowColor: '#333'
                                }
                            },
                            right: null,
                            bottom: null,
                            left:'center',
                            top:'center',
                            
                            data:[]
                        }
                    ]
                });
                mthis.charts = echarts.init(document.getElementById(mthis.main1Id), "", {
                width: document.documentElement.clientWidth * mthis.$store.state.split_net - 20-260 + 'px',
                height: mthis.$store.state.contentHeight - 75-2+ 22 + 'px'
                });
                
                mthis.charts.setOption(mthis.option)
                this.charts.on('click',function(param){
                    
                    let speech = param.seriesName
                    mthis.dataInt = param.dataIndex
                    
                    if(mthis.ctrlFlag){
                        // mthis.dataInt = param.dataIndex
                        mthis.colorFlag = 2
                        mthis.sWord.push(param.name)
                    }else{
                        mthis.sWord = []
                        mthis.sWord.push(param.name)
                        // mthis.dataInt = param.dataIndex
                        mthis.colorFlag = 1
                        
                    }
                    
                    mthis.charts.setOption(mthis.option)
                    mthis.changeNum(12)
                    console.log(mthis.sWord)
                })
            }
            if(flag == 2){
                // 改变文字词性
                mthis.option.series[0].name = param.label;
                mthis.option.series[0].data = mthis.showWords;
                mthis.charts.setOption(mthis.option)
            }
            if(flag ==3){
                // 改变文字大小
                let size = []
                size.push(param)
                size.push(26)
                mthis.option.series[0].sizeRange =size;
                mthis.option.series[0].autoSize.minSize = param;
                mthis.charts.setOption(mthis.option)
            }
            if(flag == 4){
                // 改变文字旋转角度
                mthis.option.series[0].rotationRange =param;
                
                mthis.charts.setOption(mthis.option)
            }
            if(flag == 5){
                // 改变文字数量
            }
            if(flag == 6){
                // 改变文档所对应的数据
                mthis.option.series[0].data = mthis.showWords;
                
                mthis.charts.setOption(mthis.option)
            }
        },
        hideDoc(e){
            this.clearBubble(e)
            if(!this.ifShowDoc) return;
            this.ifShowDoc = false
        },
        showDoc(e){
            this.clearBubble(e)
            var mthis = this;
            
            // mthis.docNum = mthis.docDatas.length
            mthis.ifShowDoc = true
        },
        
        toContent(){

        }
    },
    mounted (){
        
        this.loadEcharts(1,null);
    }
}
</script>
<style scoped>
    .docTitle{
        display:flex;
        width:100px;
        height:40px;
        margin-top:10px;
        border-radius:20px;
        align-items:center;
        flex-wrap: wrap;
        justify-content:space-around;
        background-color:rgba(51,255,255,0.2);
        padding: 0px 10px 0px 10px;
        cursor: pointer;
    }
    .docTitle:hover{
        background-color:rgba(51,255,255,0.4);
    }
    .docShow{
        width: 260px;
        /* max-height: 300px;
        overflow-y: scroll; */
        z-index: 100;
        position: absolute;
        right: 0px;
        top: 60px;
        border: 1px solid #33ffff;
        border-radius: 5px;
        
        color: #fff;
        animation: all 1s ease;
    }
    .docItem{
        max-height: 260px;
        overflow-y: scroll;
    }
    .itemTitle{
        width: 200px;
        overflow: hidden;
        font-family: MicrosoftYaHei;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

    }
    .item-select{
        animation: all 1s;
        -webkit-animation: all 1s;
        background-color: rgba(51, 255, 255, 0.4)!important;
        
    }
    .item-def{
        width: 100%;
        cursor:pointer;
        background-color: rgba(51, 255, 255, 0);
        height: 20px;
        line-height: 20px;
        margin-top: 10px;
        margin-left: 10px;
    }
    .bounce-enter-active {
        animation: bounce-in .5s;
    }
    .bounce-leave-active {
        animation: bounce-in .5s reverse;
    }
    @keyframes bounce-in {
    0% {
        transform: scale(0);
    }
    50% {
        transform: scale(2);
    }
    100% {
        transform: scale(1);
    }
    }
</style>
