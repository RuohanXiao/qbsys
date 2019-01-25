<template>
    <div style="margin: 0px 20px;">
        <div>
          <span class="modalTitle" v-if="ishasValue(Entitydetail.name)">{{Entitydetail.name}}</span>
          <!-- <img :src="Entitydetail.image" v-if="ishasValue(Entitydetail.img)">
          <Avatar class="circle-img" icon="ios-person" :style="{position: 'absolute',width:'50px',height:'50px',right:'50px'}" v-else/> -->
          <Avatar class="circle-img" icon="ios-person" :style="{position: 'absolute',width:'50px',height:'50px',right:'50px'}"  v-else/>
          <Avatar class="circle-img" v-if="ishasValue(Entitydetail.img)" :src="Entitydetail.img" :style="{position: 'absolute',width:'50px',height:'50px',right:'50px'}" />
        </div>
        <div class='entity_detail'>
          <entityDetailsTableHuman :Entitydetail="Entitydetail" v-if="Entitydetail.entity_type =='human'" ></entityDetailsTableHuman>
          <entityDetailsTableAdministrative :Entitydetail="Entitydetail" v-if="Entitydetail.entity_type =='administrative'"></entityDetailsTableAdministrative>
          <entityDetailsTableOrganization :Entitydetail="Entitydetail" v-if="Entitydetail.entity_type =='organization'"></entityDetailsTableOrganization>
        </div>
    </div>
</template>

<script>
import entityDetailsTableHuman from './custom_entityDetailsTable_human'
import entityDetailsTableAdministrative from './custom_entityDetailsTable_administrative'
import entityDetailsTableOrganization from './custom_entityDetailsTable_organization'
export default {
    name:'entityDetailsIntegration',
    data(){
        return{
        }
    },
    props:['Entitydetail'],
    components:{
      entityDetailsTableHuman,
      entityDetailsTableAdministrative,
      entityDetailsTableOrganization
    },
    methods:{
        ishasValue(pro){
            if(pro == '' || pro == undefined){
            return false;
            } else {
            return true;
            }
        },
        getAllValue(arr){
            if(!(arr instanceof Array) ){
                return arr;
            }
            var value = '';
            arr.forEach(function(item,index){
                if(index == 0){
                    value += item;
                } else {
                    value += '<br>';
                    value += item;
                }
                
            })
            return value;
        }
    }
}
</script>

<style scoped>
.entity_detail
{
-moz-column-count:3; /* Firefox */
-webkit-column-count:3; /* Safari and Chrome */
column-count:3;
}
#entity_detailTable tr{
  border-bottom: 1px solid;
}

.modalTitle {
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 80px;
    letter-spacing: 0px;
    color: #ccffff;
    width:100px;
  }
  .modalContentLabel {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 30px; */
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .modalContent {
    margin-left: 20px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 20px; */
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  .modalContent1 {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  .modalContent2 {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 25px;
    letter-spacing: 0px;
    color: #ccffff;
    text-align: left;
  }
  td {
    /* min-width: 80px; */
    max-width:200px;
    line-height: 30px;
  }

</style>

