<template>
    <div style="margin: 0px 20px;">
            <div>
              <span class="modalTitle" v-if="ishasValue(Entitydetail.name)">{{Entitydetail.name}}</span>
              <img :src="Entitydetail.image" v-if="ishasValue(Entitydetail.image)">
              <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px',left:'80%'}" v-else/>
            </div>
            <div class='entity_detail'>
            <table id='entity_detailTable'>
              <!-- <tr v-if=" ishasValue(Entitydetail.birth_name)">
                <td class="modalContentLabel">全名</td>
                <td class="modalContentLabel">{{Entitydetail.birth_name}}</td>
              </tr> -->
              <tr v-if=" ishasValue(Entitydetail.name_in_native_language)">
                <td class="modalContentLabel">外文名</td>
                <td class="modalContent">{{Entitydetail.name_in_native_language}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.nickname)">
                <td class="modalContentLabel">昵称</td>
                <td class="modalContent">{{Entitydetail.nickname}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_birth)">
                <td class="modalContentLabel">出生日期</td>
                <td class="modalContent">{{Entitydetail.date_of_birth}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_death)">
                <td class="modalContentLabel">死亡日期</td>
                <td class="modalContent">{{Entitydetail.date_of_death}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.date_of_disappearance)">
                <td class="modalContentLabel">失踪</td>
                <td class="modalContent">{{Entitydetail.date_of_disappearance}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.place_of_birth)">
                <td class="modalContentLabel">出生地</td>
                <td class="modalContent">{{Entitydetail.place_of_birth}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.country_of_citizenship)">
                <td class="modalContentLabel">国籍</td>
                <td class="modalContent">{{Entitydetail.country_of_citizenship}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.occupation)">
                <td class="modalContentLabel">职业</td>
                <td class="modalContent">{{Entitydetail.occupation}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.military_rank)">
                <td class="modalContentLabel">军衔</td>
                <td class="modalContent">{{Entitydetail.military_rank}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.member_of_political_party)">
                <td class="modalContentLabel">政党</td>
                <td class="modalContent">{{Entitydetail.member_of_political_party}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.member_of)">
                <td class="modalContentLabel">组织</td>
                <td class="modalContent">{{Entitydetail.member_of}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.employer)">
                <td class="modalContentLabel">雇主</td>
                <td class="modalContent">{{Entitydetail.employer}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.award_received)">
                <td class="modalContentLabel">荣誉</td>
                <td class="modalContent">{{Entitydetail.award_received}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.educated_at)">
                <td class="modalContentLabel">就读学校</td>
                <td class="modalContent">{{Entitydetail.educated_at}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.academic_degree)">
                <td class="modalContentLabel">学历</td>
                <td class="modalContent">{{Entitydetail.academic_degree}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.position_held)">
                <td class="modalContentLabel">工作经历</td>
                <td class="modalContent">{{Entitydetail.position_held}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.father)">
                <td class="modalContentLabel">父亲</td>
                <td class="modalContent">{{Entitydetail.father}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.mother)">
                <td class="modalContentLabel">母亲</td>
                <td class="modalContent">{{Entitydetail.mother}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.spouse)">
                <td class="modalContentLabel">配偶</td>
                <td class="modalContent">{{Entitydetail.spouse}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.child)">
                <td class="modalContentLabel">子女</td>
                <td class="modalContent">{{Entitydetail.child}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.sibling)">
                <td class="modalContentLabel">兄弟姐妹</td>
                <td class="modalContent">{{Entitydetail.sibling}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.e_mail)">
                <td class="modalContentLabel">邮箱</td>
                <td class="modalContent">{{Entitydetail.e_mail}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_blog)">
                <td class="modalContentLabel">博客</td>
                <td class="modalContent">{{Entitydetail.official_blog}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.official_website)">
                <td class="modalContentLabel">网站</td>
                <td class="modalContent">{{Entitydetail.official_website}}</td>
              </tr>
              <tr v-if=" ishasValue(Entitydetail.summary)">
                <td class="modalContentLabel">简介</td>
                <td class="modalContent">{{Entitydetail.summary}}</td>
              </tr>
            </table>
            </div>
          </div>
</template>

<script>
export default {
    name:'entityDetailTable',
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
    }
}
</script>

<style scoped>
#entity_detailTable tr{
  border-bottom: 1px solid;
}

</style>

