<template>
    <div class='divStyle'>
        <Tooltip placement="bottom" content="（Ctrl+A）" :disabled='!buttonParam.isOpen' :delay="1000" v-for="buttonParam in buttonParamArr" v-if="buttonParam.id != 'separate'">
            <div  :id='buttonParam.id' :class="statusclass(buttonParam)" @click="divClick">
            <Icon :class="'icon iconfont '+buttonParam.imgClass+' DVSL-bar-btn-new DVSL-bar-btn-back'" size="26"></Icon>
            <p>{{buttonParam.name}}</p>
            </div>
      </Tooltip>
      <div class="divSplitLine" v-else></div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            
        }
    },
    props:['buttonParamArr','changeButton'],
    methods:{
        clearBubble(e){
            if(e.stopPropagation){
                e.stopPropagation();
            }else{
                e.cancelBubble = true;
            }
            if(e.preventDefault){
                e.preventDefault();
            }else{
                e.returnValue = false;
            }
        },
        statusclass(item){
            if(!item.isUse){
                return 'button-div-disable'
            }else if(item.type =='default'){
                return 'button-div'
            }else if(item.status == 'unFocus'){
                return 'button-dark'
            }else{
                return 'button-div'
            }
        },
        divClick(obj){
            if(obj.currentTarget.className == 'button-div-disable'){
                return
            }else{
                this.$emit('buttonClick',obj)
            }
        }
    },
    watch:{
        changeButton:{
            deep:true,
            immediate: true,
            handler(newVal,oldVal){
                var mthis = this;
                
                mthis.changeButton.forEach(function(item){
                    mthis.buttonParamArr.forEach(function(Iitem){
                        if(item.id_suf === Iitem.id.split('_')[1]){
                            Iitem.isUse = item.isUse
                            if(!item.isUse) return;
                            if(item.type == 'state'){
                                Iitem.status = item.status
                            }
                        }
                    })
                })
            }
        }
    }

}
</script>
<style>
    .divStyle p{
        font-size:12px;
        font-family: inherit;
    }
    /* .button-none{
        cursor:default;
        color: rgba(51, 255, 255, 0.2) !important;
        align-items: center;
        text-align: center;
        min-width: 60px;
        padding: 4px 0;
    } */
    .button-dark{
        cursor: pointer;
        color: rgba(51, 255, 255,0.4) !important;
        align-items: center;
        text-align: center;
        min-width: 60px;
        padding: 4px 0;
    }
    .button-dark:hover,.button-dark:hover>i, .button-div:hover>p{
        color: rgba(51, 255, 255,1) !important;
    }
    .button-div{
        cursor: pointer;
        color: rgba(51, 255, 255,0.6) !important;
        align-items: center;
        text-align: center;
        min-width: 60px;
        padding: 4px 0;
    }
    /* .button-div:hover, .button-div:hover>i, .button-div:hover>p{
        cursor: pointer;
        color: rgba(51, 255, 255,1) !important;
    }
    .button-dark:hover, .button-div:hover>i, .button-dark:hover>p{
        cursor: pointer;
        color: rgba(51, 255, 255,1) !important;
    } */
    /* .button-div-click{ 
        cursor: pointer;
        color: rgba(51, 255, 255,1) !important;
        align-items: center;
        text-align: center;
        min-width: 60px;
        padding: 4px 0;
    }
    .button-div-click>i{
        cursor: pointer;
        color: rgba(51, 255, 255,1) !important;
    } */
</style>

