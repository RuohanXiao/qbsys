<template>
    <div id="deldemo">
        <Modal id='delSet'
        :closable="false"
        :mask="false"
        footer-hide
        v-model="modal1"
        >
        <div class="setTitle">{{setTitle}}</div>
        <div class="setButton">
            <div class="cancelB" style="color:rgba(204,255,255,0.5);">{{canText}}</div>
            <div class="delB" style="color:#ccffff;">{{delText}}</div>
        </div>
        
    </Modal>
    </div>
    
</template>
<script>
    import $ from "jquery";
    import {
        mapState,
        mapMutations
    } from 'vuex'
    
export default {
    data(){
        return {
            modal1: false,
            setTitle:'',
            canText:'',
            delText:'',
            
        }
    },
    
    computed:mapState([
      'delSetData'
    ]),
    mounted(){
        
    },
    watch:{
        delSetData: function() {
            if(!this.delSetData.flag) return;
            console.log(this.delSetData)
            var mthis = this;
            
            var setContent = document.getElementsByClassName('ivu-modal-content')[0]
            
            setContent.style.position = 'fixed';
            setContent.style.top = (this.delSetData.datas.setTop +18) + 'px';
            setContent.style.left =(this.delSetData.datas.setLeft - 200) + 'px';
            mthis.setTitle = this.delSetData.datas.title;
            mthis.canText = this.delSetData.datas.canText;
            mthis.delText = this.delSetData.datas.delText;
            this.modal1 = true;
            
      },
    }
}
</script>
<style>
    #delSet .ivu-modal-content{
        width:220px  !important;
        
    }
</style>
<style scoped>
    .setTitle{
        margin:20px 0px 20px 30px;
        font-family: MicrosoftYaHei;
	    font-size: 16px;
        color:'#fffff';
    }
    .setButton{
        
        display: flex;
        margin-left: 40px;
        margin-bottom: 10px;
    }
    .cancelB{
        width: 50px;
        height: 30px;
       
        background-color: rgba(204,255,255,0.3);
        box-shadow: 0px 0px 62px 0px 
            #33ffff;
        border-radius: 5px;
        
        margin-left: 30px;
        font-family: MicrosoftYaHei;
	    font-size: 14px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
    .delB{
        width: 70px;
        height: 30px;
        color:'#fffff' !important;
        background-color:rgba(51,255,255,0.7);
        border-radius: 5px;
        
        font-family: MicrosoftYaHei;
	    font-size: 14px;
        margin-left:10px;
        line-height: 30px;
        text-align: center;
        cursor: pointer;
    }
</style>

