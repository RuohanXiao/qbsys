<template>
<div style="width:70%;float:right;display: flex;align-items: center;">
    <span style="font-size: 10px !important;">{{num}}</span>
    <div id="myProgress" :style="{width:'85%',height:'10px',backgroundColor:'#ddd',float:'right',borderRadius: '10px'}">
        <div id="myBar" :style="{width:num+'%',height: '10px',backgroundColor: '#4CAF50',textAlign: 'center',color: 'white',borderRadius: '10px'}"></div>
    </div>
</div>
</template>
<script>
export default {
    name:'percentBar',
    data(){
        return{

        }
    },
    props:['num']
}
</script>

