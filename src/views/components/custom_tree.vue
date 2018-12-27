<style scoped>
.el-tree{
background: none !important;
color: #ccffff !important;
}


</style>

<style>
.itemStyle{
    width:'100%';
    float:'right';
    display: 'flex';
    align-items: 'center';
    padding-left:'10px';
}
.el-tree-node__content:hover{
    background-color: rgba(204,255,255,0.1) !important;
}
.el-tree-node__content{
    font-size:12px;
}
.custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }

  [class*=" el-icon-"], [class^=el-icon-] {
    font-family: element-icons!important;
    speak: none;
    font-style: normal;
    font-weight: 400;
    font-variant: normal;
    text-transform: none;
    line-height: 1;
    vertical-align: baseline;
    display: inline-block;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

.el-icon-caret-right:before {
    /* content: "\e60e"; */
   content: url("../../dist/assets/images/treeRightIcon.png");
}
.el-tree-node__expand-icon.is-leaf {
    color: transparent;
    cursor: default;
    visibility: hidden;
}
.el-tree-node.is-current>.el-tree-node__content{background-color:rgba(204,255,255,0.2)!important;}
</style>



<template>
<el-tree :data="treeData" :props="defaultProps"  :expand-on-click-node="false" default-expand-all @node-click='treeItem_click'>  <!-- :render-content="renderPercentBar" -->
      <div slot-scope="{ node, data }" :style="{width:'100%'}" >
            <span style="width:2em" />
            <span style="font-size: 10px;">{{(data.num !== undefined)? (statisticsNameList[data.name] + "(" + data.num + ")") :statisticsNameList[data.name]}}</span>
            <percentBar v-if="data.num === undefined" :num="data.per" :count="data.count" :index='0'></percentBar>
        </div>
    </el-tree>
</template>

<script>
// import treeTable from '../../dist/assets/js/geo/treetable.js'
import percentBar from './custom_percentBar'
import { mapState,mapMutations } from 'vuex'
import 'element-ui/lib/theme-chalk/tree.css'

export default {
    name:'cTree',
    data(){
        return{
            treeData:[],
            tableData:[],
            colorIndex:0,
            defaultProps: {
                children: 'children',
                label: 'name'
            },
            statisticsNameList:{
                'entity':'实体',
                'human':'人物',
                'politician':'政治人物',
                'administrative':'管理',
                'organization':'机构',
                'political party':'政党',
                'else':'其他'
            },
        }
    },
    components: {
      percentBar,
    },
    props:{Statisticsdata:Array},
    mounted(){
        var mthis = this;
        mthis.treeData = JSON.parse(JSON.stringify(mthis.Statisticsdata));
    },
    watch:{
        split:function(){
            var mthis = this;
            var rightHeight = document.getElementById('right').clientWidth;

        },
        Statisticsdata:function(){
            var mthis = this;
            mthis.treeData = JSON.parse(JSON.stringify(mthis.Statisticsdata));
        },
        treeData:function(){
        }
    },
    computed:mapState (['split'],),
    methods: { 
        treeItem_click(data,node,vuecom){
            var mthis = this;
           if(data.entitylist !== undefined){
               mthis.$store.commit('setReturnStatisticsId',data.entitylist);
           }
        },
        renderPercentBar(h, { node, data, store }){
            var rightHeight = document.getElementById('right').clientWidth;
            var percebtBarInStyle = {width:data.count+'%',height: '10px',textAlign: 'center',color: 'white',borderRadius: '10px',paddingLeft:'5px',backgroundColor:'red'};
            var percebtBarOnStyle = {width:rightHeight-170+'px',height:'10px',float:'right',borderRadius: '10px',position: 'absolute',right: '0px'};
            return ( 
                <div className={this.itemStyle}>
                    <span>{data.num?this.statisticsNameList[node.label] + "(" + data.num + ")" : this.statisticsNameList[node.label]}</span>
                    {data.num?'':<div style={percebtBarOnStyle}>
                    <div style={percebtBarInStyle}></div></div>}
                </div>
            );
        },
      setTreeData(data){
          var mthis = this;
          var treedatas = [];
          mthis.changeTreeItem(0,data,treedatas);
          mthis.treeData = JSON.parse(JSON.stringify(treedatas));
      },

      changeTreeItem(ParentId,data,treeDatas){
            var mthis = this;
            var partentId = ParentId;
            var isRoot = ParentId == 0 ? true : false;
            for(var j = 0; j<data.length; j++){
                var name ;
                var count ;
                var per ;
                var id;
                var colorIndex;
                if(isRoot){
                    id = (j + 1) + '';
                    count = -1;
                    per = -1;
                    colorIndex = -1;
                    name = mthis.statisticsNameList[data[j].name] + '(' + data[j].num + ')'; 
                } else {
                    id = ParentId + '-' + (j + 1);
                    count = data[j].count;
                    per = data[j].per;
                    colorIndex = ParentId.split('-')[0]
                    name = mthis.statisticsNameList[data[j].name];
                }
                var treeItem = {
                    'Id':id,
                    'parentId':partentId,
                    'name':name,
                    'isRoot':isRoot,
                    'colorIndex':colorIndex,
                    'percentBarParam':{
                        'count':count,
                        'per':per
                    },
                };
                if(data[j].entitylist != undefined){
                    treeItem.entitylist = data[j].entitylist;
                }
                treeDatas.push(treeItem);
                if(data[j].child != undefined){
                    mthis.changeTreeItem(id,data[j].child,treeDatas);
                }
            }
        }
    }
}
</script>

