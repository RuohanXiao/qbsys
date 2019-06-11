<style>
.docBar{
    margin-top: 5px;
}
.docBarDiv {
    background: rgba(51, 255, 255, 0.1);
    cursor: pointer;
    padding: 10px;
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
    text-align: center;
    color: #ccffff;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    letter-spacing: 0px;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }
  .docBarTime {
    text-align: center;
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

<template>
    <Col span="24" class='docBar'>
        <div class="docBarDiv select-item" :class="selected?'item-selected':''" @contextmenu.prevent="rightMenu($event)" @click='clickDocBar'>
            <p class="docBarTitle">{{Params.title}}</p>
            <p class="docBarTime">{{Params.time}}&nbsp;|&nbsp;{{Params.from}}</p>
            <Icon class="icon iconfont icon-triangle-up DVSL-bar-btn-back deg180 color255-back zindex99 " :style="{padding:'0 !important'}" size="25"></Icon>  <!-- @click="selectThis(item.id)" -->
            <Icon class="icon iconfont icon-right DVSL-bar-btn-back color255 py" :style="{padding:'0 !important'}" size="13"></Icon>
        </div>
    </Col>
</template>
<script>
    export default {
        data () {
            return {
                selected:false
            }
        },
        props:['Params'],
        methods:{
            clickDocBar(){
              var mthis = this;
              debugger
              mthis.selected = !mthis.selected;
              var attrName = mthis.Params.attrName;
              var getValue = mthis.Params[attrName];
              var param = {
                  value:{
                      excute:mthis.selected?"add":"remove"
                  }
              }
              param.value[attrName] = getValue;
              if(mthis.Params.excuteFunction !== undefined){
                  param['excuteFunction'] = mthis.Params.excuteFunction
              }
              mthis.$emit('param',param)
          },
            clickRightButton(excuteFunction){
                var mthis = this;
                debugger
                var param = {};
                if(excuteFunction !== undefined){
                  param['excuteFunction'] = excuteFunction
                }
                mthis.$emit('param',param)
            },
          rightMenu(evt){
            var mthis = this;
            var config = mthis.Params.rightMenuConfig;
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
                    var excuteFunction = item.excuteFunction
                    var tr = document.createElement('tr');
                    tr.addEventListener('click',function(){
                        mthis.clickRightButton(excuteFunction);
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
          }
          
        },
        watch:{
        },
        computed:{
        }
    }
</script>