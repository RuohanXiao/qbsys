<template>
    <table class='human_detailTable'>
              <tr v-if=" ishasValue(Entitydetail.name_in_native_language)">
                <td class="modalContentLabel">外文名</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.name_in_native_language)"><!-- {{getAllValue(Entitydetail.name_in_native_language)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.nickname)">
                <td class="modalContentLabel">昵称</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.nickname)"><!-- {{getAllValue(Entitydetail.nickname)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_birth)">
                <td class="modalContentLabel">出生日期</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.date_of_birth)"><!-- {{getAllValue(Entitydetail.date_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_death)">
                <td class="modalContentLabel">死亡日期</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.date_of_death)"><!-- {{getAllValue(Entitydetail.date_of_death)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_disappearance)">
                <td class="modalContentLabel">失踪</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.date_of_disappearance)"><!-- {{getAllValue(Entitydetail.date_of_disappearance)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.place_of_birth)">
                <td class="modalContentLabel">出生地</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.place_of_birth)"><!-- {{getAllValue(Entitydetail.place_of_birth)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__country_of_citizenship_names)">
                <td class="modalContentLabel">国籍</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__country_of_citizenship_names)"><!-- {{getAllValue(Entitydetail.country_of_citizenship)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__occupation_names)">
                <td class="modalContentLabel">职业</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__occupation_names)"><!-- {{getAllValue(Entitydetail.occupation)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.military_rank)">
                <td class="modalContentLabel">军衔</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.military_rank)"><!-- {{getAllValue(Entitydetail.military_rank)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__member_of_political_party_names)">
                <td class="modalContentLabel">政党</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__member_of_political_party_names)"><!-- {{getAllValue(Entitydetail.member_of_political_party)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__member_of_names)">
                <td class="modalContentLabel">组织</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__member_of_names)"><!-- {{getAllValue(Entitydetail.member_of)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__employer_names)">
                <td class="modalContentLabel">雇主</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__employer_names)"><!-- {{getAllValue(Entitydetail.employer)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.award_received)">
                <td class="modalContentLabel">荣誉</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.award_received)"><!-- {{getAllValue(Entitydetail.award_received)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.educated_at)">
                <td class="modalContentLabel">就读学校</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.educated_at)"><!-- {{getAllValue(Entitydetail.educated_at)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.academic_degree)">
                <td class="modalContentLabel">学历</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.academic_degree)"><!-- {{getAllValue(Entitydetail.academic_degree)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.position_held)">
                <td class="modalContentLabel">工作经历</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.position_held)"><!-- {{getAllValue(Entitydetail.position_held)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__father_names)">
                <td class="modalContentLabel">父亲</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__father_names)"><!-- {{getAllValue(Entitydetail.father)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__mother_names)">
                <td class="modalContentLabel">母亲</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__mother_names)"><!-- {{getAllValue(Entitydetail.mother)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__spouse_names)">
                <td class="modalContentLabel">配偶</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__spouse_names)"><!-- {{getAllValue(Entitydetail.spouse)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.out__child_names)">
                <td class="modalContentLabel">子女</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.out__child_names)"><!-- {{getAllValue(Entitydetail.child)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.in__sibling_names)">
                <td class="modalContentLabel">兄弟姐妹</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.in__sibling_names)"><!-- {{getAllValue(Entitydetail.sibling)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.e_mail)">
                <td class="modalContentLabel">邮箱</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.e_mail)"><!-- {{getAllValue(Entitydetail.e_mail)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_blog)">
                <td class="modalContentLabel">博客</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.official_blog)"><!-- {{getAllValue(Entitydetail.official_blog)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_website)">
                <td class="modalContentLabel">网站</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.official_website)"><!-- {{getAllValue(Entitydetail.official_website)}} --></td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.summary)">
                <td class="modalContentLabel">简介</td>
                <td class="modalContent" v-html="getAllValue(Entitydetail.summary)"><!-- {{getAllValue(Entitydetail.summary)}} --></td>
              </tr>
            </table>
</template>

<script>
export default {
    name:'entityDetailsTableHuman',
    data(){
        return{
            
        }
    },
    props:['Entitydetail'],
    methods:{
        ishasValue(pro){
          debugger
            if(pro == '' || pro == undefined){
            return false;
            } else {
            return true;
            }
        },
        getAllValue(arr){
          debugger
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
.human_detailTable tr{
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
  .human_detailTable>tr>td {
    min-width: 80px;
    max-width:200px;
    line-height: 40px;
  }
</style>

