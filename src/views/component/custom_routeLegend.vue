<template>
    <tr @click="clickRouteLegendItem">
        <td :id="colorId" class='color_td_Div' :style="{background:color}"></td>
        <td :id="mesId" :style="{color:color}">{{legendItem.name}}</td>
    </tr>
</template>

<style>
.color_td_Div {
    width: 25px;
    height: 15px;
    border-radius:'3px';
    padding-right: '5px';
    margin: 5px;
}
</style>

<script>
export default {
    name:'routeLegend',
    data(){
        return {
            color:'rgb(204, 204, 204)',
            routeColors:['#616f39','#88A2AA','#509aaf'],
            colorId:'colorTdDiv',
            mesId:'LegendItemMesTdDiv'
        }
    },
    props:{
        legendItem:Object
    },
     methods:{
        clickRouteLegendItem(){
            var mthis = this
            var a = mthis.legendItem.id
            var color_td_Div = mthis.colorId;
            var td_mes = mthis.mesId;
            if(mthis.color === "rgb(204, 204, 204)"){
                mthis.color =  mthis.routeColors[a];
                var legendItemOpera = {
                    id:a,
                    onOroff:'on'
                };
                mthis.$emit('legendItemOpera',legendItemOpera);
            } else {
                mthis.color = 'rgb(204, 204, 204)';
                var legendItemOpera = {
                    id:a,
                    onOroff:'off'
                };
                mthis.$emit('legendItemOpera',legendItemOpera);
            }
        }
     }
    
}
</script>


