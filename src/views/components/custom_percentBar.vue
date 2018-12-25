<template>
<div :style="{width:percentBarWidth+'px',float:'right',display: 'flex',alignItems: 'center',}">
    <span style="font-size: 10px !important;margin-right: 5px;width:10px">{{count}}</span>
    <div id="myProgress" :style="{width:'85%',height:'10px',float:'right',borderRadius: '10px'}">
        <div id="myBar" :style="{width:num+'%',height: '10px',backgroundColor:colors[index],textAlign: 'center',color: 'white',borderRadius: '10px',paddingLeft:'5px'}"></div>
    </div>
</div>
</template>
<script>

import { mapState,mapMutations } from 'vuex'

export default {
    name:'percentBar',
    data(){
        return{
            colors:['#33cc99','#33cccc','#3399ff'],
            percentBarWidth:0,
            distanceW:140
        }
    },
    mounted(){
        var mthis = this;
        mthis.changepercentBarWidth();
    },
    props:['num','count','index'],
    computed:mapState (['split']),
    watch:{
        split:function(){
            var mthis = this;
            mthis.changepercentBarWidth();
        }
    },
    methods:{
        changepercentBarWidth(){
            var mthis = this;
            var rightHeight = document.getElementById('right').clientWidth;
            mthis.percentBarWidth = rightHeight>mthis.distanceW?rightHeight-mthis.distanceW:rightHeight*0.5;
        }
    }
}
</script>

