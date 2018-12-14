<template>
<div style="width:50%;float:right;display: flex;align-items: center;">
    <span style="font-size: 10px !important;margin-right: 5px;">{{count}}</span>
    <div id="myProgress" :style="{width:'85%',height:'10px',float:'right',borderRadius: '10px'}">
        <div id="myBar" :style="{width:num+'%',height: '10px',backgroundColor:colors[index],textAlign: 'center',color: 'white',borderRadius: '10px',paddingLeft:'5px'}"></div>
    </div>
</div>
</template>
<script>
export default {
    name:'percentBar',
    data(){
        return{
            colors:['#33cc99','#33cccc','#3399ff']
        }
    },
    props:['num','count','index']
}
</script>

