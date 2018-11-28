<template>
    <li>
        <!-- <div @click='img_click'>111</div> -->
        <div :id='imgS.id + "_imgslider"' @click='img_click'>
            <img :src=this.imgS.imageURL style='width:50px;height:50px;border-radius:30px;border: 2px solid rgba(204, 255, 255, 0);margin: 6px;'>
            <p style='color:#525252'>{{imgS.name}}</p>
        </div>
    </li>
</template>
<script>
export default {
    name:'imgslider',
    data(){
        return{
            a:null
        }
    },
    mounted() {
    },
    methods:{
        img_click(objEvent){
            debugger
            var mthis = this
            var obj = objEvent.currentTarget
            //var imgDom = obj.currentTarget;
            if(obj.children[0].style.borderColor == "rgba(204, 255, 255, 0)"){
                /* obj.children[0].style.borderColor = 'rgb(204, 255, 255)';
                obj.children[1].style.color = 'rgb(204, 255, 255)'; */
                var imgItemOpera = {
                    id:mthis.imgS.id,
                    onOroff:'on'
                }
                mthis.$emit('imgItemOpera', imgItemOpera)
            } else{
                /* obj.children[0].style.borderColor = "rgba(204, 255, 255, 0)";
                obj.children[1].style.color = '#525252'; */
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
