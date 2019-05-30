<template>
    <div id="deldemo">
        <Modal id='delSet'
        :closable="false"
        :mask="false"
        footer-hide
        v-model="modal1"
        >
        <div>确认删除集合吗？</div>
        <div>
            <button>取消</button>
            <button>确认删除</button>
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
            setLeft:0,
            setTop:0,
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
            
            var setContent = document.getElementsByClassName('ivu-modal-content-no-mask')[0]
            console.log(setContent)
            setContent.style.position = 'absolute';
            setContent.style.top = (this.delSetData.datas.setLeft +20) + 'px';
            setContent.style.left =(this.delSetData.datas.setLeft - 120) + 'px';
            this.modal1 = true;
            
      },
    }
}
</script>
<style>
    #delSet .ivu-modal-content{
        width:20vw  !important;
        height:130px !important;
    }
</style>
