<style scoped>



</style>

<style>

#leftStatics{
    color: #ccffff;
    /* font-family: */
    font-family:"微软雅黑";
    overflow: scroll;
}
/* #EntityAttrName, #NodeTypeName{
    background-color: rgba(51,255,255,0.1);
    font-size: 18px;
    border-top: 1px solid rgba(51, 255, 255, 0.2);
    border-bottom: 1px solid rgba(51, 255, 255, 0.2);
    cursor: default;
} */

#NodeTypeInfo,  #EntityAttrColl table{
    width:100%;
    font-size:12px !important;
    table-layout: fixed;
}
#NodeTypeInfo tr, #EntityAttrColl table tr{
    height:25px;
}
#EntityAttrColl table tr:hover{
    background-color: rgba(51,255,255,0.2);
    cursor:pointer;
}

.trNoClick{
    height:25px;
}


.trClick{
    background-color: rgba(51,255,255,0.5) !important;
    color: #ccffff;
}

#EntityAttrColl table tr:nth-child(odd):hover {
    background-color: rgba(51,255,255,0.2);
}
#EntityAttrColl table tr:nth-child(odd){
    background-color: rgba(51,255,255,0.05);
}
/* #NodeTypeInfo >tr>td>span{
    padding-left:20px;
    text-align:left;
} */
#EntityAttrColl p{
    padding-left:24px;
    text-align:left;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

#EntityAttr{
    color: #ccffff;
    font-family:"微软雅黑"
}

.NameTd{
    width:50%;
    color: #ccffff;
    font-family:"微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center; 
}
.StaticsPerTd{
    color: #ccffff;
    display: table-cell;
    vertical-align: middle;
    text-align: center; 
}
.separateLine{
    width: 4px;
    height: 16px;
    background-color: rgb(0, 153, 153);
    float: left;
    display: table-cell;
    margin-top: 6px;
    margin-left: 8px;
}
.NoDataSpan{
    color: #638888 !important;
    margin-left: 20px;
    display: table-cell;
    vertical-align: middle;
}
.moreTd{
    text-align: left;
    padding-left: 24px;
    color: #ccffff;
    vertical-align: middle;
}


#EntityAttrColl > .ivu-collapse-item > .ivu-collapse-header > i{
    margin-right:0px !important;
}
#EntityAttrColl .ivu-icon-ios-arrow-forward::before {
    content: url("../../dist/assets/images/treeRightIcon.png") !important;
}
#EntityAttrColl > .ivu-collapse-item > .ivu-collapse-header{
    height:30px !important;
    line-height: 30px !important;
    cursor: default !important;
}
#leftStatics>div>div{
    background-color: rgba(51,255,255,0.15);
    font-size: 18px;
    border-top: 1px solid #336666;;
    border-bottom: 1px solid #336666;;
    cursor: default;
}


</style>



<template>
<div id='leftStatics' :style="{height:eDivH}">
    <div :id='staticsData.firstLevelId'  v-for='(staticsData,Index) in staticsDatas'>
        <div :id="staticsData.firstLevelId + 'Name'"  v-if='staticsData.subStatisticsAttr.length > 0'>
            <span class="separateLine"></span>
            <span style="margin-left:10px;font-size: 14px;">{{staticsData.firstLevelName}}</span>
        </div>
        <Collapse simple v-model="openPanelNames" id="EntityAttrColl" v-if='staticsData.subStatisticsAttr.length > 0' @on-change="collchange">
            <panel v-for="(staticsPanel,index) in staticsData.subStatisticsAttr" :value="staticsPanel.secondLevelId" :name="Index+'_'+index">   <!-- :name="staticsPanel.secondLevelId" -->
                <span :id="staticsPanel.secondLevelId + '/countSpan'">{{staticsPanel.secondLevelName + '（' + staticsPanel.typecount + '）'}}</span>
                <table slot="content" :id="staticsPanel.secondLevelId + '/entityattr'">
                    <tr :id="specificStatics.thirdLevelId + '/id'" class='trNoClick' v-if="ndex<5"  v-for="(specificStatics,ndex ) in staticsPanel.specificStaticsAttr" @contextmenu.prevent="rightClickShow($event,specificStatics.idlist,rightMenuConf)" @click="selectedIds($event.currentTarget,specificStatics.idlist)">  
                            <td class="NameTd">
                                <p>{{specificStatics.thirdLevelName}}</p>
                            </td>
                            <td :id="specificStatics.thirdLevelId + '/StaticsPer'" class="StaticsPerTd">
                                <percentBar  :num="specificStatics.per" :count="specificStatics.count" :index='0'></percentBar>
                            </td>
                    </tr> 
                    <tr :id="staticsPanel.secondLevelId+'/more'" class='trNoClick' v-if="staticsPanel.specificStaticsAttr.length>5&&!displayItem[Index+'_'+index]" @click="displaymore(Index+'_'+index)">
                        <td colspan="2" class='moreTd'>
                        <span :id="staticsPanel.secondLevelId+'/countSpan'">{{"还有"+moreitemCount[Index+'_'+index]+"个条目"}}</span>  <!-- +moreparamCount[staticsPanel.secondLevelId]+"个节点" -->
                        </td>
                    </tr>
                    <tr :id="specificStatics.thirdLevelId + '/id'" class='trNoClick' v-if="ndex>=5&&displayItem[Index+'_'+index]"  v-for="(specificStatics,ndex ) in staticsPanel.specificStaticsAttr" @contextmenu.prevent="rightClickShow($event,specificStatics.idlist,rightMenuConf)" @click="selectedIds($event.currentTarget,specificStatics.idlist)">  
                            <td class="NameTd">
                                <p>{{specificStatics.thirdLevelName}}</p>
                            </td>
                            <td :id="specificStatics.thirdLevelId + '/StaticsPer'" class="StaticsPerTd">
                                <percentBar  :num="specificStatics.per" :count="specificStatics.count" :index='0'></percentBar>
                            </td>
                    </tr> 
                </table>
            </panel>
        </Collapse>
        <!-- <div style='background-color: rgba(0,0,0,0);font-size: 14px;padding-left: 24px;text-align: left;line-height: 30px;border-top: 0px solid #336666;border-bottom: 0px solid #336666;}' v-else>无统计项</div> -->
    </div>
</div>
    
</template>

<script>
import percentBar from './custom_percentBar'
import util from '../../util/tools.js'
export default {
    name:'leftStatics',
    data(){
        
        return{
            /* openPanelNames:["be9f33b2-81bd-11e9-b567-b8ca3a670664", "be9f3ca4-81bd-11e9-b567-b8ca3a670664", "be9f403c-81bd-11e9-b567-b8ca3a670664", "bea2e980-81bd-11e9-b567-b8ca3a670664", "bea2ffb0-81bd-11e9-b567-b8ca3a670664", "bea31e6e-81bd-11e9-b567-b8ca3a670664"], */
            mactiveNames:[],/* 79568354-81be-11e9-ac0c-b8ca3a670664 */
            type:'',
            eDivH:'',
            /* staticsdatas:[], */
            spinShow:true,
            moredisplay:{
                "more":true
            },
            displayItem:{},
            moreitemCount:{},
            hdids:[]
        }
    },
    mounted(){
        this.eDivH = document.documentElement.clientHeight - 65 - 20 - 16 - 45 + 'px';
    },
    props:['staticsDatas','rightMenuConf','HLIds'],  /* ,'openPanelNames' */
    components: {
      percentBar
    },
    computed:{
        openPanelNames:{
            get:function(){
                var mthis = this;
                var openPanelNames = [];
                mthis.staticsDatas.forEach(function(item,Index){
                    item.subStatisticsAttr.forEach(function(Iitem,index){
                        //openPanelNames.push(Iitem.secondLevelId);
                        openPanelNames.push(Index+'_'+index);
                    })
                })
                return openPanelNames
            },
            set:function(){}
        }
    },
    watch:{
        HLIds(){
            var mthis = this;
            mthis.hlids = mthis.HLIds;
        },
        openPanelNames(){
            var mthis = this;
            mthis.mactiveNames = [];
            for(let i = 0; i < mthis.openPanelNames.length; i++){
                mthis.mactiveNames.push(mthis.openPanelNames[i])
            }
        },
        staticsDatas:{
            handler:function(val){
                var mthis = this;
                mthis.staticsDatas.forEach(function(item,Index){
                    if(item.subStatisticsAttr.length > 0){
                        item.subStatisticsAttr.forEach(function(Iitem,index){
                            var thirdLevel = Iitem.specificStaticsAttr
                            var itemCount = thirdLevel.length;
                            var moreItemcount = itemCount>5?itemCount-5:0;
                            var morethirdIds = 0;
                            //var name_ = Iitem.secondLevelId;
                            var name = Index + '_' + index;
                            mthis.$set(mthis.displayItem, name, false)
                            mthis.$set(mthis.moreitemCount, name, moreItemcount)
                        })
                    }
                })
                mthis.hlids = [];
            },
            immediate:true
        },
        hlids:function(){
            var mthis = this;
            mthis.cancelAllClickEffect();
            var ids = [];
            var barIds = [];
            for(let q = 0; q < mthis.hlids.length; q++){
                var id = mthis.hlids[q];
                var index = id.indexOf('&');
                if(index === -1){
                    ids.push(id);
                } else {
                    ids.push(id.split('&')[1])
                }
            }
            var staticsDatas = mthis.staticsDatas;
            for(let i = 0; i < staticsDatas.length; i++){
                var firstLevelData = staticsDatas[i];
                var subStatisticsAttr = firstLevelData.subStatisticsAttr;
                for(let j = 0; j < subStatisticsAttr.length; j++){
                    var secondLevelData = subStatisticsAttr[j];
                    var specificStaticsAttr = secondLevelData.specificStaticsAttr;
                    for(let v = 0; v < specificStaticsAttr.length; v++){
                        var thirdLevelData = specificStaticsAttr[v];
                        var idlist = thirdLevelData.idlist;
                        var isHas = false;
                        for(let n = 0; n < ids.length; n++){
                            var Oid = ids[n];
                            for(let m = 0; m < idlist.length; m++){
                                var sid = idlist[m];
                                var qid = '';
                                var index = sid.indexOf('&');
                                if(index === -1){
                                    qid = sid;
                                } else {
                                    qid = sid.split('&')[1];
                                }
                                if(Oid === qid){
                                    isHas = true;
                                    break;
                                }
                            }
                        }
                        if(isHas){
                            var barId = thirdLevelData.thirdLevelId;
                            barIds.push(barId);
                            //break;
                        }
                    }
                }
            }
            for(let x = 0; x < barIds.length; x++){
                var itemId = barIds[x] + '/id';
                var bar = document.getElementById(itemId);
                mthis.gainAllClickEffect(bar);
            }
        }
    },
    methods:{
        collchange(names){
            var mthis = this;
            var activeName = "";
            if(mthis.mactiveNames.length > names.length){
                for(let i = 0; i < mthis.mactiveNames.length; i++){
                    var name = mthis.mactiveNames[i];
                    var index = util.itemIndexInArr(name,names);
                    if(index === -1){
                        activeName = name;
                    }
                }
            }
            mthis.$set(mthis.displayItem, activeName, false);
        },
        clickRightButton(buttonId,nsIds){
            var mthis = this;
            var data = {
                'buttonId':buttonId,
                'nsIds':nsIds
            }
            mthis.$emit('rightCilckArgu', data)
        },
        rightClickShow(eve,ids,conf){
            var mthis = this;
            
            var config = conf;
            if(config.length === 0){
                return;
            }
            var leftStatics = document.getElementById('leftStatics');
            var x = eve.clientX;
            var y = eve.clientY;
            
            var ovdiv = document.createElement('div');
            ovdiv.style ='position:absolute';
            ovdiv.class = 'rightMenuDiv';
            ovdiv.id='rightClickMenu';
            ovdiv.style.top = y + "px";
            ovdiv.style.left = x + "px";
            document.body.appendChild(ovdiv);
            ovdiv.addEventListener("mouseleave", function(){
                setTimeout(function(){
                    var div = document.getElementById('rightClickMenu');
                    document.body.removeChild(div);
                },100)
            });
            var table = document.createElement('table');
            table.id = 'rightClickMenuTable';
            table.style = 'font-size: 12px;color: #178d8d;margin: 3px 0px;';
            ovdiv.appendChild(table);
            config.forEach(function(item){
                var tr = document.createElement('tr');
                tr.id = item.id;
                tr.addEventListener('click',function(){
                    mthis.clickRightButton(tr.id,ids);
                })
                var iconTd = document.createElement('td');
                iconTd.style='padding-left: 5px;';
                iconTd.classList.add('icon','iconfont',item.iconClassName);
                tr.appendChild(iconTd);
                var nameTd = document.createElement('td');
                nameTd.style = 'padding-right: 10px;';
                nameTd.innerHTML=item.name;
                tr.appendChild(nameTd);
                table.appendChild(tr);
            })
        },
        selectedIds(el,ids){
            var mthis = this;
            /* if(el.style.backgroundColor ==='rgba(51, 255, 255, 0.2)'){
                return;
            } */
            mthis.cancelAllClickEffect();
            mthis.gainAllClickEffect(el);
            mthis.$emit('staticsClick', ids)
        },
        gainAllClickEffect(el){
            el.className='trClick';
            el.style.backgroundColor='rgba(51,255,255,0.2)';
        },
        cancelAllClickEffect(){
            var oldtrClick = document.getElementsByClassName('trClick');
            if(oldtrClick.length !== 0){
                for(let i = oldtrClick.length - 1; i >= 0; i--){
                    oldtrClick[i].removeAttribute('style')
                    oldtrClick[i].classList.remove('trClick')
                }
            }
        },
        isNodeTypehasInnodeTypedata(id){
            var mthis = this;
            var data = mthis.nodeTypedata.data;
            for(let i = 0; i < data.length; i++){
                if(id === data[i].name){
                    return true
                }
                if( i === data.length - 1){
                    return false
                }
            }
        },
        displaymore(id){
            var mthis = this;
            mthis.$set(mthis.displayItem, id, true)
           // mthis.$set(mthis.moredisplay, 'more', false)
            //mthis.moredisplay = false;
        },
        displayMore(EntityAttrData){
            var mthis = this;
            var entityattrEle = document.getElementById(EntityAttrData.secondLevelId+'/entityattr');
            var moreEle = document.getElementById(EntityAttrData.secondLevelId+'/more');
            var countSpan = document.getElementById(EntityAttrData.secondLevelId+'/countSpan');
            if(entityattrEle.children.length <= 6){
                mthis.addMore(EntityAttrData.secondLevelId);
                moreEle.firstChild.innerHTML = '收起';
                var AttrItemSpan = countSpan.innerHTML;
                var AttrItemSpanName = AttrItemSpan.split('(')[0];
                countSpan.innerHTML = AttrItemSpanName + "(" + EntityAttrData.datasCount + "/" + EntityAttrData.datasCount + ")";
            } else {
                mthis.deleteMore(entityattrEle);
                moreEle.firstChild.innerHTML = "还有"+EntityAttrData.moredata.dataItem + "个值," + EntityAttrData.moredata.nodeCount + "个节点";
                var AttrItemSpan = countSpan.innerHTML;
                var AttrItemSpanName = AttrItemSpan.split('(')[0];
                countSpan.innerHTML = AttrItemSpanName + "(" + 3 + "/" + EntityAttrData.datasCount + ")";
            }
        },
        deleteMore(parentNode){
            var mthis = this;
            if(parentNode.children.length > 4){
                for(let i = 4;i < parentNode.children.length - 1; i++){
                    parentNode.removeChild(parentNode.children[i]);
                }
            }
        },
        addMore(id){
            var mthis = this;
            var entityattrEle = document.getElementById(id+'/entityattr');
            var moreEle = document.getElementById(id+'/more');
            var allDatas = mthis.Statisticsdata;
            var idData = {};
            for(let i = 0; i < allDatas.length; i++){
                if(allDatas[i].id === id){
                    idData = allDatas[i]
                }
            }
            for(let j = 3; j < idData.datas.length; j++){
                var percentBar = "<div style='width:100%;float:right;display: flex;align-items: center'>"
                                    + "<span style='font-size: 10px !important;margin-right: 5px;width:10px'>" + idData.datas[j].count + "</span>"
                                    + "<div id='myProgress' style='width:85%;height:10px;float:right;border-radius: 10px;margin-left: 10px;'>"
                                        + "<div id='myBar' style=width:" + idData.datas[j].per + "%;height:10px;background-color:#33cc99;text-align:center;color:white;border-radius:2px;padding-left:5px></div>"
                                    + "</div>"
                                    + "</div>";
                var tr = document.createElement('tr');
                tr.id = idData.datas[j].name + '/name' ;
                var tdName = document.createElement('td');
                tdName.className = 'NameTd';
                tr.appendChild(tdName);
                var spanName = document.createElement('span');
                spanName.innerHTML = idData.datas[j].name;
                tdName.appendChild(spanName);
                var tdperB = document.createElement('td');
                tdperB.id=idData.datas[j].name + '/StaticsPer';
                tdperB.className = 'StaticsPerTd';
                tr.appendChild(tdperB);
                tdperB.innerHTML = percentBar
                entityattrEle.insertBefore(tr,moreEle)
            }
        },
        itemInArrById(id){
            var mthis = this;
            var data = mthis.Statisticsdata;
            for(let i = 0; i < data.length; i++){
                if(id === data[i].id){
                    return true;
                }
                if(i === data.length - 1){
                    return false;
                }
            }
        },
        getAttrsById(target){
            var mthis = this;
            mthis.type = target;
            mthis.setOpenPanelNames();
            mthis.$http.post(this.$store.state.ipConfig.api_url + '/node-statistics-in-type/', {
            "nodeIds": mthis.staticsIds,
            "typename": target
            }).then(response => {
                mthis.Statisticsdata = response.data.data;
            })
        },
        setOpenPanelNames(){
            var mthis = this;
            mthis.openPanelNames = [];
            Object.keys(mthis.SecondAttrClassify).forEach(function(type){
                mthis.SecondAttrClassify[type].forEach(function(item){
                    mthis.openPanelNames.push(item.id);
                })
            })
        }
    }
}
</script>