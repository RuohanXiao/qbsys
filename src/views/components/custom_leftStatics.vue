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
#NodeTypeInfo  span, #EntityAttrColl table span{
    padding-left:20px;
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
    color: #638888;
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
<div id='leftStatics' v-if="Statisticsdata.length > 0">
    <div id='NodeType'>
        <div id='NodeTypeName'>
            <span class="separateLine"></span>
            <span style="margin-left:10px">节点类型</span>
        </div>
        <table id='NodeTypeInfo'>
            <tr :id='nodeTypeItem.id' v-for="(nodeTypeItem,index) in nodeTypeClassify" v-on:click="getAttrsById(nodeTypeItem.id)">
                <td :id="nodeTypeItem.id + '_name'" class="NameTd">
                    <span>{{nodeTypeItem.disName}}</span>
                </td>
                <td :id="nodeTypeItem.id + '_StaticsPer'" class="StaticsPerTd">
                    <percentBar v-if="nodeTypedataItem.id === nodeTypeItem.id" :num="nodeTypedataItem.per" :count="nodeTypedataItem.count" :index='0' v-for="nodeTypedataItem in nodeTypedata.data"></percentBar>
                </td>
            </tr>
        </table>
    </div>
    <div id='EntityAttr'>
        <div id='EntityAttrName'>
            <span class="separateLine"></span>
            <span style="margin-left:10px">实体属性</span>
        </div>
        <Collapse simple v-model="openPanelNames" id="EntityAttrColl">
            <panel v-for="(EntityAttrItem,index) in EntityAttrClassify" :name="EntityAttrItem.id">
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="itemInArrById(EntityAttrItem.id) && stateType.id === EntityAttrItem.id && stateType.datasCount>3" v-for="stateType in EntityAttrInformation.data">{{EntityAttrItem.disName + '(' + 3 + '/' + stateType.datasCount + ')'}}</span>
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="itemInArrById(EntityAttrItem.id) && stateType.id === EntityAttrItem.id && stateType.datasCount<=3" v-for="stateType in EntityAttrInformation.data">{{EntityAttrItem.disName + '(' + stateType.datasCount + '/' + stateType.datasCount + ')'}}</span>
                <span :id="EntityAttrItem.id + '/countSpan'" v-if="!itemInArrById(EntityAttrItem.id)">{{EntityAttrItem.disName + '(0)'}}</span>
                <table slot="content" :id="EntityAttrInfoItem.id + '/entityattr'" v-if="itemInArrById(EntityAttrItem.id) && EntityAttrInfoItem.id == EntityAttrItem.id" v-for="(EntityAttrInfoItem,index) in EntityAttrInformation.data">
                    <tr  :id="EntityInformation.name + '/name'" v-if="index<=2" v-for="(EntityInformation,index ) in EntityAttrInfoItem.datas"    >  <!-- v-on:click="cilckEntityAttrClassify(EntityInformation.name)" -->
                        <td class="NameTd">
                            <span>{{EntityInformation.name}}</span>
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
                        <span class="NoDataSpan">无匹配节点</span>
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
            openPanelNames:[],//['country_of_citizenship','occupation','address','member_of_political_party','religion','e-mail'],
            firstClassify : [
                {
                    id:'NodeType',
                    disName:'节点类型'
                },
                {
                    id:'EntityAttr',
                    disName:'实体属性'
                }
            ],
        nodeTypeClassify : [
                {
                    id:'human',
                    disName:'人物'
                },
                {
                    id:'organization',
                    disName:'组织'
                },
                {
                    id:'administrative',
                    disName:'国家'
                },
                {
                    id:'event',
                    disName:'事件'
                }
            ],
            nodeTypedata:{
                code:0,
                data:[
                    {
                        id:'human',
                        count: 1,
                        per: 20,
                        
                    },
                    {
                        id:'organization',
                        count: 3,
                        per: 8,
                        
                    },
                    {
                        id:'administrative',
                        count: 8,
                        per: 90,
                        
                    },
                    {
                        id:'event',
                        count: 1,
                        per: 8,
                        
                    }
                ]
            },
            EntityAttrClassify:[
                {
                    id:'country_of_citizenship',
                    disName:'国籍'
                },
                {
                    id:'occupation',
                    disName:'职业'
                },
                {
                    id:'address',
                    disName:'地址'
                },
                {
                    id:'member_of_political_party',
                    disName:'政党'
                },
                {
                    id:'religion',
                    disName:'信仰'
                },
                {
                    id:'e-mail',
                    disName:'邮箱'
                }

            ],
            EntityAttrInformation:{
                code:0,
                data:[
                    {
                        id:'country_of_citizenship',
                        datasCount:4,
                        moredata:{
                            dataItem:1,
                            nodeCount:10
                        },
                        datas:[
                            {
                                name:"中国",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"日本",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            },
                            {
                                name:"美国",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"英国",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            }
                        ]
                    },
                    {
                        id:'occupation',
                        datasCount:3,
                        moredata:{
                            dataItem:1,
                            nodeCount:10
                        },
                        datas:[
                            {
                                name:"军人",
                                count: 1,
                                entitylist: [
                                "Q854"
                                ],
                                per: 8,
                            },
                            {
                                name:"政治家",
                                count: 2,
                                entitylist: [
                                "Q854"
                                ],
                                per: 16,
                            },
                            {
                                name:"企业家",
                                count: 10,
                                entitylist: [
                                "Q854"
                                ],
                                per: 100,
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted(){
        var mthis = this;
        mthis.setOpenPanelNames();
    },
    props:{Statisticsdata:Array},
    components: {
      percentBar,
    },
    methods:{
        displayMore(EntityAttrData){
            var mthis = this;
            var entityattrEle = document.getElementById(EntityAttrData.id+'/entityattr');
            var moreEle = document.getElementById(EntityAttrData.id+'/more');
            var countSpan = document.getElementById(EntityAttrData.id+'/countSpan');
            debugger
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
            var allDatas = mthis.EntityAttrInformation.data;
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
                    /* var trHtml = "<tr id=" + idData.datas[j].name + "'/name' class='aaa'> "
                    + "<td class='NameTd'>"
                        +"<span>" + idData.datas[j].name + "</span>"
                    + "</td>"
                    + "<td id=" + idData.datas[j].name + "'/StaticsPer' class='StaticsPerTd'>" + percentBar + "</td>"
                + "</tr>"; */

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
                debugger
                entityattrEle.insertBefore(tr,moreEle)
            }
        },
        itemInArrById(id){
            var mthis = this;
            var data = mthis.EntityAttrInformation.data;
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
            debugger
        },
        setOpenPanelNames(){
            var mthis = this;
            mthis.EntityAttrClassify.forEach(function(item,index){
                mthis.openPanelNames.push(item.id);
            })
        }
    }
}
</script>

