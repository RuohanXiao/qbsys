<template>
    <table class='administrative_detailTable'>
              <tr v-if=" ishasValue(Entitydetail.description)">
                <td class="modalContentLabel">描述</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.description)"><!-- {{getAllValue(Entitydetail.name_in_native_language)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_name)">
                <td class="modalContentLabel">全名</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.official_name)"><!-- {{getAllValue(Entitydetail.nickname)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.name_in_native_language)">
                <td class="modalContentLabel">外文名</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.name_in_native_language)"><!-- {{getAllValue(Entitydetail.date_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.short_name)">
                <td class="modalContentLabel">简称</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.short_name)"><!-- {{getAllValue(Entitydetail.date_of_death)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__head_of_state_names)">
                <td class="modalContentLabel">国家元首</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__head_of_state_names)"><!-- {{getAllValue(Entitydetail.date_of_disappearance)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__head_of_government_names)">
                <td class="modalContentLabel">政府首脑</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__head_of_government_names)"><!-- {{getAllValue(Entitydetail.place_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.continent)">
                <td class="modalContentLabel">位于</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.continent)"><!-- {{getAllValue(Entitydetail.country_of_citizenship)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.area)">
                <td class="modalContentLabel">面积</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.area)"><!-- {{getAllValue(Entitydetail.occupation)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.GDP)">
                <td class="modalContentLabel">GDP</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.GDP)"><!-- {{getAllValue(Entitydetail.military_rank)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.gini_coefficient)">
                <td class="modalContentLabel">基尼系数</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.gini_coefficient)"><!-- {{getAllValue(Entitydetail.member_of_political_party)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.Human_Development_Index)">
                <td class="modalContentLabel">人类发展指数</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.Human_Development_Index)"><!-- {{getAllValue(Entitydetail.member_of)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__shares_border_with_names)">
                <td class="modalContentLabel">接壤国家</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__shares_border_with_names)"><!-- {{getAllValue(Entitydetail.employer)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.top_level_Internet_domain)">
                <td class="modalContentLabel">顶级域名</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.top_level_Internet_domain)"><!-- {{getAllValue(Entitydetail.award_received)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_website)">
                <td class="modalContentLabel">官网</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.official_website)"><!-- {{getAllValue(Entitydetail.educated_at)}} --></td>
              </tr>
            </table>
</template>

<script>
export default {
    name:'entityDetailsTableAdministrative',
    data(){
        return{
            
        }
    },
    props:['Entitydetail'],
    methods:{
        ishasValue(pro){
            if(pro == '' || pro == undefined || pro == "[]"){
            return false;
            } else {
            return true;
            }
        },
        getAllValue(arr){
            /* if(!(arr instanceof Array) ){
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
            return value; */
            var value = '';
            if(arr.indexOf('[') !== -1){
              value = arr.split('[')[1].split(']')[0].replace(/,/g, '<br>').replace(/'/g, '');
            } else {
              value = arr;
            }
            return value;
        }
    }
}
</script>

<style scoped>
.administrative_detailTable tr{
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
  .administrative_detailTable>tr>td {
    min-width: 80px;
    max-width:200px;
    line-height: 40px;
  }
</style>

