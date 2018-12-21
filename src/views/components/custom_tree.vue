<template>
<el-tree :data="data5" show-checkbox="" node-key="id" default-expand-all :expand-on-click-node="false">
      <span class="custom-tree-node" slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <!-- <span>
          <el-button type="text" size="mini" @click="() => append(data)">
            Append
          </el-button>
          <el-button type="text" size="mini" @click="() => remove(node, data)">
            Delete
          </el-button>
        </span> -->
      </span>
    </el-tree>
    <!-- <table id='treeTable'>
        <tbody>
            <tr :data-tt-id="item.Id" :data-tt-parent-id="item.parentId" v-for="item in treeData">
                <td style="width: 120px;"><span>{{item.name}}</span></td>
                <td>
                    <percentBar :num="item.percentBarParam.per" :count="item.percentBarParam.count" :index="item.colorIndex" v-if="!item.isRoot"></percentBar>
                </td>
            </tr>
        </tbody>
    </table> -->
</template>

<script>
import treeTable from '../../dist/assets/js/geo/treetable.js'
import percentBar from './custom_percentBar'
import '../../dist/assets/styles/geo/jquery.treetable.css'
import '../../dist/assets/styles/geo/jquery.treetable.theme.default.css'
import '../../dist/assets/styles/geo/screen.css'

export default {
    name:'cTree',
    data(){
        const data = [{
        id: 1,
        label: '一级 1',
        children: [{
          id: 4,
          label: '二级 1-1',
          children: [{
            id: 9,
            label: '三级 1-1-1'
          }, {
            id: 10,
            label: '三级 1-1-2'
          }]
        }]
      }, {
        id: 2,
        label: '一级 2',
        children: [{
          id: 5,
          label: '二级 2-1'
        }, {
          id: 6,
          label: '二级 2-2'
        }]
      }, {
        id: 3,
        label: '一级 3',
        children: [{
          id: 7,
          label: '二级 3-1'
        }, {
          id: 8,
          label: '二级 3-2'
        }]
      }];
        return{
            id : 1000,
            data5: JSON.parse(JSON.stringify(data)),
            treeData:[],
            tableData:[],
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
        mthis.setTreeData(mthis.Statisticsdata);
        
        /* this.$nextTick(function(){
                $("#treeTable").treetable({ expandable: true });
                $("#treeTable tbody").on("mousedown", "a", function() {
                    console.log('df');
                });
                $("#treeTable tbody").on("mousemove", "tr", function() {
                    if(!$(this).hasClass("selected")){
                        $(".selected").not(this).removeClass("selected");
                        $(this).toggleClass("selected");
                    }
                });
            }) */
    },
    watch:{
        
        Statisticsdata:function(){
            /* var mthis = this;
            $("#treeTable tbody").empty();
            //mthis.render($("#treeTable tbody"));
            mthis.setTreeData(mthis.Statisticsdata);
            this.$nextTick(function(){
                $("#treeTable").treetable({ expandable: true });
                $("#treeTable tbody").on("mousedown", "a", function() {
                    console.log('df');
                });
                $("#treeTable tbody").on("mousemove", "tr", function() {
                    if(!$(this).hasClass("selected")){
                        $(".selected").not(this).removeClass("selected");
                        $(this).toggleClass("selected");
                    }
                });
            }) */
        },
        treeData:function(){
            /* 
            var mthis = this;
            $("#treeTable tbody").empty();
            //mthis.render($("#treeTable tbody"));
            mthis.setTreeData(mthis.Statisticsdata);
            this.$nextTick(function(){
                $("#treeTable").treetable({ expandable: true });
                $("#treeTable tbody").on("mousedown", "a", function() {
                    console.log('df');
                });
                $("#treeTable tbody").on("mousemove", "tr", function() {
                    if(!$(this).hasClass("selected")){
                        $(".selected").not(this).removeClass("selected");
                        $(this).toggleClass("selected");
                    }
                });
            }) */
        }
    },
    methods: {
        /* append(data) {
        const newChild = { id: this.id++, label: 'testtest', children: [] };
        if (!data.children) {
          this.$set(data, 'children', []);
        }
        
        data.children.push(newChild);
      },

      remove(node, data) {
        const parent = node.parent;
        const children = parent.data.children || parent.data;
        const index = children.findIndex(d => d.id === data.id);
        children.splice(index, 1);
      }, */
      setTreeData(data){
          var mthis = this;
          var treedatas = [];
          mthis.changeTreeItem(0,data,treedatas);
          mthis.treeData = treedatas;
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

