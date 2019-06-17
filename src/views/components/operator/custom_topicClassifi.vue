<template>
    <div id="topicAnaly" :style="{width:'100%'}">
        
        <Row>
            <Col span="24" v-for="(item,index) in items" :key="index">
                <div class="docBarDiv select-item" :class="item.check?'item-selected':''" @contextmenu.prevent="rightMenu($event)" @click='clickDocBar(index,item.check,item.id,$event)'>
                    <p class="docBarTitle">{{item.title}}</p>
                    <p class="docBarTime">{{item.time}}&nbsp;|&nbsp;{{item.from}}</p>
                    <Icon class="icon iconfont icon-triangle-up DVSL-bar-btn-back deg180 color255-back zindex99 " :style="{padding:'0 !important'}" size="25"></Icon>  
                    <Icon class="icon iconfont icon-right DVSL-bar-btn-back color255 py" :style="{padding:'0 !important'}" size="13"></Icon> 
                 </div> 
             </Col> 
        </Row> 
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
                items : [],
            }
        },
        methods:{
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
            rightMenu(evt){
                var mthis = this;
                var config = [{
                                'name': '单个文档分析',
                                'iconClassName': 'icon-ren',
                                'key':'single'
                              },
                              {
                                'name': '合并分析',
                                'iconClassName': 'icon-ren',
                                'key':'group'
                              }
                            ];
                if(config !== undefined && config.length > 0){
                    var leftStatics = document.getElementById('leftStatics');
                    var x = evt.clientX;
                    var y = evt.clientY;
                    
                    var ovdiv = document.createElement('div');
                    ovdiv.style ='position:absolute;z-index:1001;';
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
                        var type = item.key
                        var tr = document.createElement('tr');
                        tr.addEventListener('click',function(){
                            if(type === 'single'){
                                mthis.$store.commit('exSinDocAna');
                                mthis.removeSel(mthis.$store.state.topicSelIds)
                            }else{
                                mthis.$store.commit('exMulDocAna')
                                mthis.removeSel(mthis.$store.state.topicSelIds)
                            }
                            
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
                }
            },
            clickDocBar(index,check,id,evt){
                this.clearBubble(evt)
                var mthis = this;
                check = !check;
                mthis.items[index].check = check;
                var ids = mthis.$store.state.topicSelIds
                
                if(ids.indexOf(id)>-1){
                    let index = ids.indexOf(id)
                    ids.splice(index,1)
                }else{
                    ids.push(id)
                }
                mthis.$store.commit('setTopicSelIds',ids)

            },
            removeSel(ids){
                var mthis = this
                for(var i of ids){
                    for(var j in mthis.items){
                        if(i == mthis.items[j].id){
                            mthis.items[j].check = false
                            }else{
                                continue
                            }
                        }
                    }
                }
        },
        
        computed:mapState([
            'docAnaSelIds'
        ]),
        watch:{
            docAnaSelIds:function(){
                var mthis = this;
                for(var i of mthis.docAnaSelIds){
                    for(var j in mthis.items){
                        if(i == mthis.items[j].id){
                            mthis.items[j].check = true
                            }else{
                                continue
                            }
                        }
                    }
                mthis.$store.commit('setTopicSelIds',mthis.docAnaSelIds)
            }
        },
        mounted(){
            var mthis = this;
            mthis.items = mthis.$store.state.seletedDocAttrList
        },
    }
</script>
<style scoped>
    .docBar{
        margin-top: 5px;
    }
    .docBarDiv {
        background: rgba(51, 255, 255, 0.1);
        cursor: pointer;
        padding: 10px;
        margin-bottom: 5px;
    }
    .docBarDiv:hover {
        /* 右角标 */
        animation: all 1s;
        -webkit-animation: all 1s;
        -webkit-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
        -moz-box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
        box-shadow: -5px 5px 10px -4px rgba(81, 85, 85, 0.5);
    }
    .select-item {
        border-bottom: 1px solid rgba(51, 255, 255, 0.3);
        border-top: 1px solid rgba(51, 255, 255, 0.3);
    }
    .item-selected {
        animation: all 1s;
        -webkit-animation: all 1s;
        background-color: rgba(51, 255, 255, 0.4);
        /* background-color: pink; */
        border-bottom: 1px solid rgba(51, 255, 255, 0.5);
        border-top: 1px solid rgba(51, 255, 255, 0.5);
    }
    .docBarTitle {
        text-align: left;
        color: #ccffff;
        font-family: MicrosoftYaHei;
        font-size: 14px;
        letter-spacing: 0px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
    }
    .docBarTime {
        text-align: left;
        font-family: PARaDOS;
        font-size: 12px;
        letter-spacing: 0px;
        color: #ccffff;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        opacity: 0.5;
        margin-top: 5px;
    }
    .contentItem{
        position: absolute;
        background-color: rgba(0, 0, 0, 0);
        top: 3px;
        left: 2px;
        width: 15px;
        height: 15px;
    }
    .deg180 {
        transform: rotate(180deg);
        -ms-transform: rotate(180deg);
        /* IE 9 */
        -moz-transform: rotate(180deg);
        /* Firefox */
        -webkit-transform: rotate(180deg);
        /* Safari 和 Chrome */
        -o-transform: rotate(180deg);
        /* Opera */
        position: absolute;
        top: -1px;
        left: -4px;
    }
    .color255-back {
        color: rgba(51, 255, 255, 0.1);
        background-color: rgba(51, 255, 255, 0);
    }
    .color255 {
        color: rgba(51, 255, 255, 0.1);
    }
    .item-selected+.contentItem>.color255-back {
        color: rgba(51, 255, 255, 0.3);
    }
    .zindex99 {
        z-index: 99
    }
    .item-selected .hoverStyle {
        opacity: 1;
        color: rgba(51, 255, 255, 0.2);
    }
    .item-selected .icon-right {
        opacity: 1;
        color: #ccffff;
    }
    .py{
        position: absolute;
        top: 1px;
        left: 2px;
    }
</style>

