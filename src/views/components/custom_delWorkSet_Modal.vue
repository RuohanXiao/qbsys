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
            <div class="cancelB" style="color:rgba(204,255,255,0.5);" @click="modal1 = false">{{canText}}</div>
            <div class="delB" style="color:#ccffff;" @click="del(setId)">{{delText}}</div>
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
            setId:''
        }
    },
    
    computed:mapState([
      'delSetData'
    ]),
    methods:{
        del(id){
            console.log(id)
           
            var mthis = this
            let timestamp = new Date().getTime()
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/delete-set-data/', {
                "timestamp": timestamp,
                "idlist": new Array(id),
                "label": "set",
                "type": "set"
            }).then(response => {
                // // console.log(response)
                if (response.body.code === 0) {
                    // alert('删除成功！')
                    if (mthis.$store.state.tmss === 'net') {
                        mthis.$store.commit('setNetPromte', '删除成功！')
                    } else if (mthis.$store.state.tmss === 'geo') {
                        mthis.$store.commit('setGeoPromte', '删除成功！')
                    } else if (mthis.$store.state.tmss === 'content') {
                        mthis.$store.commit('setContentPromte', '删除成功！')
                    } else {
                }
                // mthis.$emit('ref', timestamp)
                    mthis.$store.commit('setRefSet', !mthis.$store.state.refSet)
                } else {
                    alert('删除异常，请查询控制台，错误编码' + response.body.code)
                    if (mthis.$store.state.tmss === 'net') {
                        mthis.$store.commit('setNetPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
                    } else if (mthis.$store.state.tmss === 'geo') {
                        mthis.$store.commit('setGeoPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
                    } else if (mthis.$store.state.tmss === 'content') {
                        mthis.$store.commit('setContentPromte', '删除异常，请查询控制台，错误编码' + response.body.code)
                    } else {
                    }
                }
            })
            this.modal1 = false
        }
    },
    watch:{
        delSetData: function() {
            if(!this.delSetData.flag) return;
            console.log(this.delSetData)
            var mthis = this;
            
            var setContent = document.getElementsByClassName('ivu-modal-content')[0]
            
            setContent.style.position = 'fixed';
            if(this.delSetData.datas.setTop>670){
                setContent.style.top = (mthis.delSetData.datas.setTop -40-55) +'px';
                setContent.style.left =(mthis.delSetData.datas.setLeft - 200-110) + 'px';
            }else{
                setContent.style.top = (mthis.delSetData.datas.setTop +18) + 'px';
                setContent.style.left =(mthis.delSetData.datas.setLeft - 200) + 'px';
            }
            
            mthis.setTitle = this.delSetData.datas.title;
            mthis.canText = this.delSetData.datas.canText;
            mthis.delText = this.delSetData.datas.delText;
            mthis.setId = this.delSetData.datas.id;
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

