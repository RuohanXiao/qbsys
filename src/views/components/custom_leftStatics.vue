<style scoped>



</style>

<style>

#leftStatics{
    color: #ccffff;
    /* font-family: */
    font-family:"微软雅黑"
}
#EntityAttrName, #NodeTypeName{
    background-color: rgba(51,255,255,0.1);
    font-size: 18px;
    border-top: 1px solid rgba(51, 255, 255, 0.2);
    border-bottom: 1px solid rgba(51, 255, 255, 0.2);
    cursor: default;
}

#NodeTypeInfo,  #EntityAttrColl table{
    width:100%;
    font-size:12px !important;
}
#NodeTypeInfo tr, #EntityAttrColl table tr{
    height:25px;
}
#NodeTypeInfo  tr:hover, #EntityAttrColl table tr:hover{
    background-color: rgba(51,255,255,0.2);
    cursor:pointer;
}
#NodeTypeInfo  tr:nth-child(odd):hover,#EntityAttrColl table tr:nth-child(odd):hover {
    background-color: rgba(51,255,255,0.2);
}
#NodeTypeInfo  tr:nth-child(odd), #EntityAttrColl table tr:nth-child(odd){
    background-color: rgba(51,255,255,0.05);
}
/* #NodeTypeInfo >tr>td>span{
    padding-left:20px;
    text-align:left;
} */
#EntityAttrColl p{
    padding-left:20px;
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
    width: 5px;
    height: 20px;
    background-color: rgb(0, 153, 153);
    float: left;
    display: table-cell;
    margin-top: 3px;
    margin-left: 10px;
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

</style>



<template>
<div id='leftStatics'>
    <div :id='firstClassifyItem.id' v-for='(firstClassifyItem,index) in firstClassify' v-if="index === 0 || (index === 1 && type !== '')">
        <div :id="firstClassifyItem.id + 'Name'">
            <span class="separateLine"></span>
            <span style="margin-left:10px;font-size: 14px;">{{firstClassifyItem.disName}}</span>
        </div>
        <table id='NodeTypeInfo' v-if="index === 0">
            <tr :id='nodeTypeItem.id' v-if="isNodeTypehasInnodeTypedata(nodeTypeItem.id) === true" v-for="(nodeTypeItem,index) in nodeTypeClassify" v-on:click="getAttrsById(nodeTypeItem.id)">
                <td :id="nodeTypeItem.id + '_name'" class="NameTd">
                    <span>{{nodeTypeItem.disName}}</span>
                </td>
                <td :id="nodeTypeItem.id + '_StaticsPer'" class="StaticsPerTd">
                    <percentBar v-if="nodeTypedataItem.name === nodeTypeItem.id" :num="nodeTypedataItem.per" :count="nodeTypedataItem.count" :index='0' v-for="nodeTypedataItem in nodeTypedata.data"></percentBar>
                </td>
            </tr>
        </table>
        <Collapse simple v-model="openPanelNames" id="EntityAttrColl" v-if="index === 1 && type !== ''">
            <panel v-for="(EntityAttrItem,index) in SecondAttrClassify[type]" :name="EntityAttrItem.id">
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="itemInArrById(EntityAttrItem.id) && stateType.id === EntityAttrItem.id && stateType.datasCount>3" v-for="stateType in Statisticsdata">{{EntityAttrItem.disName + '(' + 3 + '/' + stateType.datasCount + ')'}}</span>
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="itemInArrById(EntityAttrItem.id) && stateType.id === EntityAttrItem.id && stateType.datasCount<=3" v-for="stateType in Statisticsdata">{{EntityAttrItem.disName + '(' + stateType.datasCount + '/' + stateType.datasCount + ')'}}</span>
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="!itemInArrById(EntityAttrItem.id)">{{EntityAttrItem.disName + '(0)'}}</span>
                <table slot="content" :id="EntityAttrInfoItem.id + '/entityattr'" v-if="itemInArrById(EntityAttrItem.id) && EntityAttrInfoItem.id == EntityAttrItem.id" v-for="(EntityAttrInfoItem,index) in Statisticsdata">
                    <tr  :id="EntityInformation.name + '/name'" v-if="index<=2" v-for="(EntityInformation,index ) in EntityAttrInfoItem.datas"  @click="selectedIds(EntityInformation.entitylist)">  
                        <td class="NameTd">
                            <!-- <span>{{EntityInformation.name}}</span> -->
                            <p>{{EntityInformation.name}}</p>
                        </td>
                        <td :id="EntityInformation.name + '/StaticsPer'" class="StaticsPerTd">
                            <percentBar  :num="EntityInformation.per" :count="EntityInformation.count" :index='0'></percentBar>
                        </td>
                    </tr>
                    <tr :id="EntityAttrInfoItem.id + '/more'" v-else-if="index===3" @click="displayMore(EntityAttrInfoItem)">
                        <td colspan="2" style="text-align: center;color:#ccffff;text-decoration: underline;">{{"还有"+EntityAttrInfoItem.moredata.dataItem + "个值," + EntityAttrInfoItem.moredata.nodeCount + "个节点"}}</td>
                    </tr> 
                </table>
                <table slot="content" v-if="!itemInArrById(EntityAttrItem.id)">
                    <tr>
                        <p class="NoDataSpan">无匹配节点</p>
                    </tr>
                </table>
            </panel>
        </Collapse>
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
            Statisticsdata:[]
        }
    },
    /* mounted(){
        var mthis = this;
        mthis.setOpenPanelNames();
    }, */
    props:['staticsIds','firstClassify','nodeTypeClassify','SecondAttrClassify','nodeTypedata'],
    components: {
      percentBar,
    },
    watch:{
        nodeTypedata:function(){
            var mthis = this;
            if(mthis.type !== ''){
                mthis.getAttrsById(mthis.type);
            }
            
        }
    },
    methods:{
        selectedIds(ids){
            var mthis = this;
            mthis.$store.commit('setNetStaticsSelectedIds',ids);
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