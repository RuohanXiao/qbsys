<template>
    <table class='organization_detailTable'>
              <tr v-if=" ishasValue(Entitydetail.description)">
                <td class="modalContentLabel">描述</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.description)"><!-- {{getAllValue(Entitydetail.name_in_native_language)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.native_label)">
                <td class="modalContentLabel">外文名</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.native_label)"><!-- {{getAllValue(Entitydetail.nickname)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.short_name)">
                <td class="modalContentLabel">简称</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.short_name)"><!-- {{getAllValue(Entitydetail.date_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.headquarters_location)">
                <td class="modalContentLabel">总部</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.headquarters_location)"><!-- {{getAllValue(Entitydetail.date_of_death)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.inception)">
                <td class="modalContentLabel">成立</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.inception)"><!-- {{getAllValue(Entitydetail.date_of_disappearance)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.founded_by)">
                <td class="modalContentLabel">创办者</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.founded_by)"><!-- {{getAllValue(Entitydetail.place_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.chairperson)">
                <td class="modalContentLabel">领袖</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.chairperson)"><!-- {{getAllValue(Entitydetail.country_of_citizenship)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.chief_executive_officer)">
                <td class="modalContentLabel">首席执行官</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.chief_executive_officer)"><!-- {{getAllValue(Entitydetail.occupation)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.member_count)">
                <td class="modalContentLabel">成员</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.member_count)"><!-- {{getAllValue(Entitydetail.military_rank)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.employees)">
                <td class="modalContentLabel">员工数</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.employees)"><!-- {{getAllValue(Entitydetail.member_of_political_party)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.political_ideology)">
                <td class="modalContentLabel">意识形态</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.political_ideology)"><!-- {{getAllValue(Entitydetail.member_of)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.business_division)">
                <td class="modalContentLabel">业务部门</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.business_division)"><!-- {{getAllValue(Entitydetail.employer)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.parent_organization)">
                <td class="modalContentLabel">上级部门</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.parent_organization)"><!-- {{getAllValue(Entitydetail.award_received)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.subsidiary)">
                <td class="modalContentLabel">子组织</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.subsidiary)"><!-- {{getAllValue(Entitydetail.educated_at)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_website)">
                <td class="modalContentLabel">官网</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.official_website)"><!-- {{getAllValue(Entitydetail.academic_degree)}} --></td>
              </tr>
            </table>
</template>

<script>
export default {
    name:'entityDetailsTableOrganization',
    data(){
        return{
            
        }
    },
    props:['Entitydetail'],
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
.organization_detailTable tr{
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
  .organization_detailTable>tr>td {
    min-width: 80px;
    max-width:200px;
    line-height: 40px;
  }
</style>


