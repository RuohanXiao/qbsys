<template>
    <li>
        <div :id='imgS.id + "_imgslider"' @click='img_click' class='imgsliderDiv' style="width:60px;height:75px;">
            <img class='imgStyle' :src=this.imgS.imageURL style='width:46px;height:46px;border-radius:30px;margin: 6px;'> 
            <p style="color:rgb(204, 255, 255);font-family:'微软雅黑';text-align:center;font-size: 10px;">{{name}}</p>
        </div>
    </li>
    <!-- <div :id='imgS.id + "_imgslider"' @click='img_click' class='imgsliderDiv' style="width:60px;height:75px;">
        <img class='imgStyle' :src=this.imgS.imageURL style='width:46px;height:46px;border-radius:30px;margin: 6px;'> 
        <p style="color:rgb(204, 255, 255);font-family:'微软雅黑';text-align:center;font-size: 10px;">{{name}}</p>
    </div> -->
</template>
<style>
.imgsliderDiv{
    width: 60px;
    height: 60px;
}
.imgStyle{
}
.imgStyle:hover{
    box-shadow:#3cc  0px 0px 7px 3px;
}
</style>

<script>
export default {
    name:'imgslider',
    data(){
        return{
            a:null,
            name:''
        }
    },
    mounted() {
        var mthis = this
        var arr = []; 
        var l = mthis.imgS.name.length;   
        for(var i = 0; i < l; i++){    
            arr[i] =  mthis.imgS.name.substr(i,1);    
        } 
        if(arr.length > 5){
            for(var j = 0; j < 5; j++){
                mthis.name += arr[j];
            }
             mthis.name += '...'
        } else {
            mthis.name =  mthis.imgS.name;
        }
    },
    methods:{
        img_click(objEvent){
            var mthis = this
            var obj = objEvent.currentTarget
            //var imgDom = obj.currentTarget;
            if(obj.children[0].style.width == "46px"){
                var imgItemOpera = {
                    id:mthis.imgS.id,
                    onOroff:'on'
                }
                mthis.$emit('imgItemOpera', imgItemOpera)
            } else{
                var imgItemOpera = {
                    id:mthis.imgS.id,
                    onOroff:'off'
                }
                mthis.$emit('imgItemOpera', imgItemOpera)
            }
        }
            
    },
    props:{
        imgS:Object
    }
}
</script>
