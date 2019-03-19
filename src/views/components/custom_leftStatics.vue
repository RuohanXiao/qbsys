<style scoped>



</style>

<style>

#leftStatics{
    color: #ccffff;
    /* font-family: */
    font-family:"微软雅黑"
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

trNoClick{
    height:25px;
}

trClick{
    background-color: rgba(51,255,255,0.2);
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
}

#EntityAttr{
    color: #ccffff;
    font-family:"微软雅黑"
}

.NameTd{
    width:35%;
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
<div id='leftStatics'>
    <div :id='staticsData.firstLevelId' v-for='(staticsData,index) in staticsDatas'>
        <div :id="staticsData.firstLevelId + 'Name'">
            <span class="separateLine"></span>
            <span style="margin-left:10px;font-size: 14px;">{{staticsData.firstLevelName}}</span>
        </div>
        <Collapse simple v-model="openPanelNames" id="EntityAttrColl" v-if='staticsData.subStatisticsAttr.length > 0'>
            <panel v-for="(staticsPanel,index) in staticsData.subStatisticsAttr" :name="staticsPanel.secondLevelId">
                <span :id="staticsPanel.secondLevelId + '/countSpan'">{{staticsPanel.secondLevelName + '（' + staticsPanel.typecount + '）'}}</span>
                <table slot="content" :id="staticsPanel.secondLevelId + '/entityattr'">
                    <tr  :id="specificStatics.thirdLevelId + '/id'" class='trNoClick' v-for="(specificStatics,index ) in staticsPanel.specificStaticsAttr" @click="selectedIds($event.currentTarget,specificStatics.idlist)">  
                        <td class="NameTd">   <!--  @mouseover='trHover($event.currentTarget,index)' -->
                            <p>{{specificStatics.thirdLevelName}}</p>
                        </td>
                        <td :id="specificStatics.thirdLevelId + '/StaticsPer'" class="StaticsPerTd">
                            <percentBar  :num="specificStatics.per" :count="specificStatics.count" :index='0'></percentBar>
                        </td>
                    </tr> 
                </table>
            </panel>
        </Collapse>
        <div style='background-color: rgba(0,0,0,0);font-size: 14px;padding-left: 24px;text-align: left;line-height: 30px;border-top: 0px solid #336666;border-bottom: 0px solid #336666;}' v-else>无统计项</div>
    </div>
</div>
    
</template>

<script>
import percentBar from './custom_percentBar'
export default {
    name:'leftStatics',
    data(){
        
        return{
            openPanelNames:[],
            type:'',
            //Statisticsdata:[]
            staticsdatas:[],
        }
    },
    /* mounted(){
        var mthis = this;
        mthis.setOpenPanelNames();
    }, */
    props:['staticsDatas'],
    components: {
      percentBar,
    },
    watch:{
        staticsdatas:{
            handler:function(val){
                var mthis = this;
                mthis.openPanelNames = [];
                if(!mthis.staticsDatas){
                    return;
                }
                mthis.staticsdatas = mthis.staticsDatas;
                mthis.staticsDatas.forEach(function(item){
                    item.subStatisticsAttr.forEach(function(Iitem){
                        mthis.openPanelNames.push(Iitem.secondLevelId);
                    })
                })
            },
            immediate:true
        }
    },
    methods:{
        /* trHover(el,index){
            var mthis = this;
            if(index % 2 === 0){
                el.className = 
            }
        }, */
        selectedIds(el,ids){
            var mthis = this;
            //trClick
            if(el.style.backgroundColor ==='rgba(51,255,255,0.2)'){
                return;
            }
            var oldtrClick = document.getElementsByClassName('trClick');
            if(oldtrClick.length !== 0){
                for(let i = 0; i < oldtrClick.length; i++){
                    oldtrClick[i].removeAttribute('style')
                    oldtrClick[i].classList.remove('trClick')
                }
            }
            el.className='trClick';
            el.style.backgroundColor='rgba(51,255,255,0.2)';
            //mthis.$store.commit('setNetStaticsSelectedIds',ids);
            mthis.$emit('staticsClick', ids)
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
        displayMore(EntityAttrData){
            var mthis = this;
            var entityattrEle = document.getElementById(EntityAttrData.id+'/entityattr');
            var moreEle = document.getElementById(EntityAttrData.id+'/more');
            var countSpan = document.getElementById(EntityAttrData.id+'/countSpan');
            if(entityattrEle.children.length <= 4){
                mthis.addMore(EntityAttrData.id);
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
                for(let i = 3;i < parentNode.children.length - 1; i++){
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
                /* ["out__country_of_citizenship_names",
                "out__occupation_names",
                "address",
                "out__member_of_political_party_names",
                "religion",
                "e-mail",
                "headquarters_location",
                "founded_by",
                "chairperson",
                "chief_executive_officer",
                "political_ideology",
                "capital",
                "head_of_state",
                "head_of_government",
                "continent",
                "gini_coefficient",
                "Human_Development_Index",
                "top-level_Internet_domain" ] */
            /* mthis.SecondAttrClassify[mthis.type].forEach(function(item,index){
                mthis.openPanelNames.push(item.id);
            }) */
            Object.keys(mthis.SecondAttrClassify).forEach(function(type){
                mthis.SecondAttrClassify[type].forEach(function(item){
                    mthis.openPanelNames.push(item.id);
                })
            })
        }
    }
}
</script>