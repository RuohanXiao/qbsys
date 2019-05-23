<template>
  <div>
    <Collapse simple v-model="value1" id='nodeAttr' :style="{height:entDivH}" class='scrollBarAble'>
      <panel name="1">
        <span>实体属性</span>
        <div slot="content" class="tableLine">
          <!-- <div class="econtent">
              <p class="econtentp w5em">全名</p>
              <p class="econtentp">{{tableData.chinese_name}}</p>
            </div> -->
          <div class="econtent allowWrap">
            <div v-if="typeof(tableData.chinese_name) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">全名</p>
              <p class="econtentp">{{tableData.chinese_name}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.chinese_name_ids,'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chinese_name) === 'object'&&index<5" v-for="(it,index) in tableData.chinese_name">
              <p class="econtentp w5em" v-if="index==0">全名</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.chinese_name_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chinese_name.length>5&&displayMore['chinese_name']" @click="clickMore('chinese_name')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chinese_name) === 'object'&&index>=5&&!displayMore['chinese_name']" v-for="(occ,index) in tableData.chinese_name">
              <p class="econtentp w5em" v-if="index==0">全名</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chinese_name.length>5&&!displayMore['chinese_name']" @click="clickCutOut('chinese_name')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.entity_name'>
              <p class="econtentp w5em">母语名</p>
              <p class="econtentp">{{tableData.entity_name}}</p>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.entity_name'>
            <div v-if="typeof(tableData.entity_name) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">母语名</p>
              <p class="econtentp">{{tableData.entity_name}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.entity_name_ids,'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.entity_name) === 'object'&&index<5" v-for="(it,index) in tableData.entity_name">
              <p class="econtentp w5em" v-if="index==0">母语名</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.entity_name_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.entity_name.length>5&&displayMore['entity_name']" @click="clickMore('entity_name')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.entity_name) === 'object'&&index>=5&&!displayMore['entity_name']" v-for="(occ,index) in tableData.entity_name">
              <p class="econtentp w5em" v-if="index==0">母语名</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.entity_name.length>5&&!displayMore['entity_name']" @click="clickCutOut('entity_name')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.nickname'>
              <p class="econtentp w5em">昵称</p>
              <p class="econtentp">{{tableData.nickname}}</p>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.nickname'>
            <div v-if="typeof(tableData.nickname) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">昵称</p>
              <p class="econtentp">{{tableData.nickname}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.nickname_ids,'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.nickname) === 'object'&&index<5" v-for="(it,index) in tableData.nickname">
              <p class="econtentp w5em" v-if="index==0">昵称</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.nickname_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.nickname.length>5&&displayMore['nickname']" @click="clickMore('nickname')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.nickname) === 'object'&&index>=5&&!displayMore['nickname']" v-for="(occ,index) in tableData.nickname">
              <p class="econtentp w5em" v-if="index==0">昵称</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <!-- <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids[index],'entity','')" size='small'></Button> -->
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.nickname.length>5&&!displayMore['nickname']" @click="clickCutOut('nickname')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.date_of_birth'>
              <p class="econtentp w5em">出生日期</p>
              <p class="econtentp">{{tableData.date_of_birth}}</p>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.date_of_birth'>
            <div v-if="typeof(tableData.date_of_birth) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">出生日期</p>
              <p class="econtentp">{{tableData.date_of_birth}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_birth_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_birth) === 'object'&&index<5" v-for="(it,index) in tableData.date_of_birth">
              <p class="econtentp w5em" v-if="index==0">出生日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_birth_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_birth.length>5&&displayMore['date_of_birth']" @click="clickMore('date_of_birth')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_birth) === 'object'&&index>=5&&!displayMore['date_of_birth']" v-for="(occ,index) in tableData.date_of_birth">
              <p class="econtentp w5em" v-if="index==0">出生日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_birth_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_birth.length>5&&!displayMore['date_of_birth']" @click="clickCutOut('date_of_birth')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.date_of_death'>
              <p class="econtentp w5em">死亡日期</p>
              <p class="econtentp">{{tableData.date_of_death}}</p>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.date_of_death'>
            <div v-if="typeof(tableData.date_of_death) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">死亡日期</p>
              <p class="econtentp">{{tableData.date_of_death}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_death_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_death) === 'object'&&index<5" v-for="(it,index) in tableData.date_of_death">
              <p class="econtentp w5em" v-if="index==0">死亡日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_death_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_death.length>5&&displayMore['date_of_death']" @click="clickMore('date_of_death')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_death) === 'object'&&index>=5&&!displayMore['date_of_death']" v-for="(occ,index) in tableData.date_of_death">
              <p class="econtentp w5em" v-if="index==0">死亡日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_death_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_death.length>5&&!displayMore['date_of_death']" @click="clickCutOut('date_of_death')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.date_of_disappearance'>
              <p class="econtentp w5em">失踪日期</p>
              <p class="econtentp">{{tableData.date_of_disappearance}}</p>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.date_of_disappearance'>
            <div v-if="typeof(tableData.date_of_disappearance) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">失踪日期</p>
              <p class="econtentp">{{tableData.date_of_disappearance}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_disappearance_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_disappearance) === 'object'&&index<5" v-for="(it,index) in tableData.date_of_disappearance">
              <p class="econtentp w5em" v-if="index==0">失踪日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_disappearance_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_disappearance.length>5&&displayMore['date_of_disappearance']" @click="clickMore('date_of_disappearance')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.date_of_disappearance) === 'object'&&index>=5&&!displayMore['date_of_disappearance']" v-for="(occ,index) in tableData.date_of_disappearance">
              <p class="econtentp w5em" v-if="index==0">失踪日期</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.date_of_disappearance_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.date_of_disappearance.length>5&&!displayMore['date_of_disappearance']" @click="clickCutOut('date_of_disappearance')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.place_of_birth'>
              <p class="econtentp w5em">出生地</p>
              <p class="econtentp">{{tableData.place_of_birth}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small' @click="addSingleNodeToCanvans(tableData.place_of_birth_ids,'entity','')"></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.place_of_birth'>
            <div v-if="typeof(tableData.place_of_birth) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">出生地</p>
              <p class="econtentp">{{tableData.place_of_birth}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.place_of_birth_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.place_of_birth) === 'object'&&index<5" v-for="(it,index) in tableData.place_of_birth">
              <p class="econtentp w5em" v-if="index==0">出生地</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.place_of_birth_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.place_of_birth.length>5&&displayMore['place_of_birth']" @click="clickMore('place_of_birth')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.place_of_birth) === 'object'&&index>=5&&!displayMore['place_of_birth']" v-for="(occ,index) in tableData.place_of_birth">
              <p class="econtentp w5em" v-if="index==0">出生地</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.place_of_birth_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.place_of_birth.length>5&&!displayMore['place_of_birth']" @click="clickCutOut('place_of_birth')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>

          
          <div class="econtent allowWrap" v-if='tableData.country_of_citizenship'>
            <div v-if="typeof(tableData.country_of_citizenship) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">国籍</p>
              <p class="econtentp">{{tableData.country_of_citizenship}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.country_of_citizenship_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.country_of_citizenship) === 'object'&&index<5" v-for="(country,index) in tableData.country_of_citizenship">
              <p class="econtentp w5em" v-if="index==0">国籍</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{country}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.country_of_citizenship_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.country_of_citizenship.length>5&&displayMore['country_of_citizenship']" @click="clickMore('country_of_citizenship')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.country_of_citizenship) === 'object'&&index>=5&&!displayMore['country_of_citizenship']" v-for="(occ,index) in tableData.country_of_citizenship">
              <p class="econtentp w5em" v-if="index==0">国籍</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.country_of_citizenship_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.country_of_citizenship.length>5&&!displayMore['country_of_citizenship']" @click="clickCutOut('country_of_citizenship')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.ethic_group'>
              <p class="econtentp w5em">所属民族</p>
              <p class="econtentp">{{tableData.ethic_group}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.ethic_group'>
            <div v-if="typeof(tableData.ethic_group) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">所属民族</p>
              <p class="econtentp">{{tableData.ethic_group}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.ethic_group_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.ethic_group) === 'object'&&index<5" v-for="(it,index) in tableData.ethic_group">
              <p class="econtentp w5em" v-if="index==0">所属民族</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.ethic_group_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.ethic_group.length>5&&displayMore['ethic_group']" @click="clickMore('ethic_group')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.ethic_group) === 'object'&&index>=5&&!displayMore['ethic_group']" v-for="(occ,index) in tableData.ethic_group">
              <p class="econtentp w5em" v-if="index==0">所属民族</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.ethic_group_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.ethic_group.length>5&&!displayMore['ethic_group']" @click="clickCutOut('ethic_group')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.religion'>
              <p class="econtentp w5em">宗教信仰</p>
              <p class="econtentp">{{tableData.religion}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.religion'>
            <div v-if="typeof(tableData.religion) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">宗教信仰</p>
              <p class="econtentp">{{tableData.religion}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.religion_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.religion) === 'object'&&index<5" v-for="(it,index) in tableData.religion">
              <p class="econtentp w5em" v-if="index==0">宗教信仰</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.religion_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.religion.length>5&&displayMore['religion']" @click="clickMore('religion')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.religion) === 'object'&&index>=5&&!displayMore['religion']" v-for="(occ,index) in tableData.religion">
              <p class="econtentp w5em" v-if="index==0">宗教信仰</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.religion_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.religion.length>5&&!displayMore['religion']" @click="clickCutOut('religion')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>



          <div class="econtent allowWrap" v-if='tableData.occupation'>
            <div v-if="typeof(tableData.occupation) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">从事职业</p>
              <p class="econtentp">{{tableData.occupation}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.occupation) === 'object'&&index<5" v-for="(occ,index) in tableData.occupation">
              <p class="econtentp w5em" v-if="index==0">从事职业</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.occupation.length>5&&displayMore['occupation']" @click="clickMore('occupation')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.occupation) === 'object'&&index>=5&&!displayMore['occupation']" v-for="(occ,index) in tableData.occupation">
              <p class="econtentp w5em" v-if="index==0">从事职业</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.occupation_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.occupation.length>5&&!displayMore['occupation']" @click="clickCutOut('occupation')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.military_rank'>
              <p class="econtentp w5em">军衔</p>
              <p class="econtentp">{{tableData.military_rank}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.military_rank'>
            <div v-if="typeof(tableData.military_rank) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">军衔</p>
              <p class="econtentp">{{tableData.military_rank}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_rank_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.military_rank) === 'object'&&index<5" v-for="(occ,index) in tableData.military_rank">
              <p class="econtentp w5em" v-if="index==0">军衔</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_rank_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.military_rank.length>5&&displayMore['military_rank']" @click="clickMore('military_rank')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.military_rank) === 'object'&&index>=5&&!displayMore['military_rank']" v-for="(occ,index) in tableData.military_rank">
              <p class="econtentp w5em" v-if="index==0">军衔</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_rank_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.military_rank.length>5&&!displayMore['military_rank']" @click="clickCutOut('military_rank')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.military_branch'>
              <p class="econtentp w5em">所属军种</p>
              <p class="econtentp">{{tableData.military_branch}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.military_branch'>
            <div v-if="typeof(tableData.military_branch) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">所属军种</p>
              <p class="econtentp">{{tableData.military_branch}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_branch_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.military_branch) === 'object'&&index<5" v-for="(occ,index) in tableData.military_branch">
              <p class="econtentp w5em" v-if="index==0">所属军种</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_branch_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.military_branch.length>5&&displayMore['military_branch']" @click="clickMore('military_branch')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.military_branch) === 'object'&&index>=5&&!displayMore['military_branch']" v-for="(occ,index) in tableData.military_branch">
              <p class="econtentp w5em" v-if="index==0">所属军种</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.military_branch_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.military_branch.length>5&&!displayMore['military_branch']" @click="clickCutOut('military_branch')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.member_of_political_party'>
              <p class="econtentp w5em">所属政党</p>
              <p class="econtentp">{{tableData.member_of_political_party}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.member_of_political_party'>
            <div v-if="typeof(tableData.member_of_political_party) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">所属政党</p>
              <p class="econtentp">{{tableData.member_of_political_party}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.member_of_political_party_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.member_of_political_party) === 'object'&&index<5" v-for="(occ,index) in tableData.member_of_political_party">
              <p class="econtentp w5em" v-if="index==0">所属政党</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.member_of_political_party_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.member_of_political_party.length>5&&displayMore['member_of_political_party']" @click="clickMore('member_of_political_party')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.member_of_political_party) === 'object'&&index>=5&&!displayMore['member_of_political_party']" v-for="(occ,index) in tableData.member_of_political_party">
              <p class="econtentp w5em" v-if="index==0">所属政党</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.member_of_political_party_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.member_of_political_party.length>5&&!displayMore['member_of_political_party']" @click="clickCutOut('member_of_political_party')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.award_received'>
              <p class="econtentp w5em">荣誉</p>
              <p class="econtentp">{{tableData.award_received}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.award_received'>
            <div v-if="typeof(tableData.award_received) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">荣誉</p>
              <p class="econtentp">{{tableData.award_received}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.award_received_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.award_received) === 'object'&&index<5" v-for="(occ,index) in tableData.award_received">
              <p class="econtentp w5em" v-if="index==0">荣誉</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.award_received_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.award_received.length>5&&displayMore['award_received']" @click="clickMore('award_received')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.award_received) === 'object'&&index>=5&&!displayMore['award_received']" v-for="(occ,index) in tableData.award_received">
              <p class="econtentp w5em" v-if="index==0">荣誉</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.award_received_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.award_received.length>5&&!displayMore['award_received']" @click="clickCutOut('award_received')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.e_mail'>
              <p class="econtentp w5em">邮箱</p>
              <p class="econtentp">{{tableData.e_mail}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.e_mail'>
            <div v-if="typeof(tableData.e_mail) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">邮箱</p>
              <p class="econtentp">{{tableData.e_mail}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.e_mail_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.e_mail) === 'object'&&index<5" v-for="(occ,index) in tableData.e_mail">
              <p class="econtentp w5em" v-if="index==0">邮箱</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.e_mail_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.e_mail.length>5&&displayMore['e_mail']" @click="clickMore('e_mail')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.e_mail) === 'object'&&index>=5&&!displayMore['e_mail']" v-for="(occ,index) in tableData.e_mail">
              <p class="econtentp w5em" v-if="index==0">邮箱</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.e_mail_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.e_mail.length>5&&!displayMore['e_mail']" @click="clickCutOut('e_mail')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.official_blog'>
              <p class="econtentp w5em">博客</p>
              <p class="econtentp">{{tableData.official_blog}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.official_blog'>
            <div v-if="typeof(tableData.official_blog) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">博客</p>
              <p class="econtentp">{{tableData.official_blog}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_blog_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_blog) === 'object'&&index<5" v-for="(occ,index) in tableData.official_blog">
              <p class="econtentp w5em" v-if="index==0">博客</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_blog_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_blog.length>5&&displayMore['official_blog']" @click="clickMore('official_blog')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_blog) === 'object'&&index>=5&&!displayMore['official_blog']" v-for="(occ,index) in tableData.official_blog">
              <p class="econtentp w5em" v-if="index==0">博客</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_blog_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_blog.length>5&&!displayMore['official_blog']" @click="clickCutOut('official_blog')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.official_website'>
              <p class="econtentp w5em">官网</p>
              <p class="econtentp">{{tableData.official_website}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.official_website'>
            <div v-if="typeof(tableData.official_website) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">官网</p>
              <p class="econtentp">{{tableData.official_website}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_website_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_website) === 'object'&&index<5" v-for="(occ,index) in tableData.official_website">
              <p class="econtentp w5em" v-if="index==0">官网</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_website_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_website.length>5&&displayMore['official_website']" @click="clickMore('official_website')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_website) === 'object'&&index>=5&&!displayMore['official_website']" v-for="(occ,index) in tableData.official_website">
              <p class="econtentp w5em" v-if="index==0">官网</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_website_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_website.length>5&&!displayMore['official_website']" @click="clickCutOut('official_website')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.summary'>
              <p class="econtentp w5em">简介</p>
              <p class="econtentp">{{tableData.summary}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.summary'>
            <div v-if="typeof(tableData.summary) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w5em">简介</p>
              <p class="econtentp">{{tableData.summary}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.summary_ids,'entity','')" size='small'></Button>
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.summary) === 'object'&&index<5" v-for="(occ,index) in tableData.summary">
              <p class="econtentp w5em" v-if="index==0">简介</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.summary_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.summary.length>5&&displayMore['summary']" @click="clickMore('summary')">
              <p class="econtentp w5em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.summary) === 'object'&&index>=5&&!displayMore['summary']" v-for="(occ,index) in tableData.summary">
              <p class="econtentp w5em" v-if="index==0">简介</p>
              <p class="econtentp w5em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.summary_ids[index],'entity','')" size='small'></Button>
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.summary.length>5&&!displayMore['summary']" @click="clickCutOut('summary')">
              <p class="econtentp w5em moreP">收起</p>
            </div>
          </div>
        </div>
      </panel>
      <!-- ============================================相关实体================================================== -->
      <panel name="2">
        <span>相关实体</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanEntityItems.length>0' v-for="items in xiangguanEntityItems">
            <p class="econtentp w5em" :title="items.relation">{{items.relation}}</p>
            <p class="econtentp">{{items.name}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.id,'entity','')"></Button>
            </div>
          </div>
          <div class="econtent" v-if='xiangguanEntityItems.length ==0'>
            <p class="econtentp" v-show="spinWaiting">相关实体加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关实体</p>
          </div>
          <!-- <div class="econtent" v-else>
              <p class="econtentp">暂无相关实体</p>
            </div> -->
        </div>
      </panel>
      <!-- ============================================相关事件================================================== -->
      <panel name="3">
        <span>相关事件</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0' v-for='items in xiangguanEvent.statistics'>
            <!-- <p class="econtentp w5em" :title="items.type">{{myMap1.get(items.type.toLowerCase().replace(/-/, "_")).name}}</p> -->
            <p class="econtentp w5em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'event',items.type)"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">相关事件加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关事件</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关文档================================================== -->
      <panel name="4">
        <span>相关文档</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0' v-for='items in xiangguanDoc.statistics'>
            <p class="econtentp w5em" :title="items.type">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'document','')"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">文档事件加载中···</p>
            <p class="econtentp" v-show="!spinWaiting">暂无相关文档</p>
          </div>
        </div>
      </panel>
    </Collapse>
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import util from '../../util/tools.js'
  import configer from '../../util/configContrl.js'
  export default {
    data() {
      return {
        spinWaiting: false,
        value1: ['1', '2', '3', '4'],
        xiangguanEntityItems: new Array(),
        xiangguanEntitys: new Object(),
        xiangguanEvent: new Array(),
        xiangguanDoc: new Array(),
        linkObj: new Object(),
        myMap: new Map(),
        myMap1: new Map(),
        displayMore: {
          'chinese_name': true,
          'entity_name': true,
          'nickname': true,
          'date_of_birth': true,
          'date_of_death': true,
          'date_of_disappearance': true,
          'place_of_birth': true,
          'occupation':true,
          'country_of_citizenship': true,
          'ethic_group': true,
          'religion': true,
          'military_rank': true,
          'military_branch': true,
          'member_of_political_party': true,
          'award_received': true,
          'e_mail': true,
          'official_blog': true,
          'official_website': true,
          'summary': true
        }
      }
    },
    props: ['tableData', 'entDivH', 'tableType'],
    created() {
      let mthis = this
      mthis.xiangguanEntityItems = new Array()
      mthis.xiangguanEntitys = new Object()
      mthis.xiangguanEvent = new Array()
      mthis.xiangguanDoc = new Array()
      if (this.tableType === 'human') {
        mthis.spinWaiting = true
        if (this.tableData.isArray) {
          if (this.tableData.length > 0) {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds": mthis.tableData.map(item => {
                return item.id
              }),
              // "NodeTypes": mthis.tableData.map(item => {
              //   return item.entity_type
              // }),
              "TypeLabel": "all"
            }).then(response => {
              mthis.spinWaiting = false
            })
          } else {
            // alert('长度为0')
            if (mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '长度为0')
            } else if (mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '长度为0')
            } else if (mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '长度为0')
            } else {
            }
            mthis.spinWaiting = false
          }
        } else {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
            "NodeIds": new Array(mthis.tableData.id),
            // "NodeTypes": new Array('entity'),
            "TypeLabel": "all"
          }).then(response => {
            // mthis.xiangguanEntityItems = new Array()
            // mthis.xiangguanEntitys = new Object()
            // mthis.xiangguanEvent = new Array()
            // mthis.xiangguanDoc = new Array()
            if (response.body.data[0].RelatedEntity[mthis.tableData.id]) {
              response.body.data[0].RelatedEntity[mthis.tableData.id].links.map(item => {
                item.type = item.undirected_type
                return item
              })
              mthis.linkObj = response.body.data[0].RelatedEntity[mthis.tableData.id].links
              mthis.xiangguanEntityItems = response.body.data[0].RelatedEntity[mthis.tableData.id].nodes
              mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
            }
            if (response.body.data[0].RelatedEvent[mthis.tableData.id]) {
              mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
            }
            if (response.body.data[0].RelatedDocument[mthis.tableData.id]) {
              mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
            }
            if (response.body.data[0].unknown !== new Object()) {
              // // console.log('------------有未知类型的节点--------------------')
              // // console.log(response.body.data[0].unknown)
              // // console.log('-----------------------------------------------')
            }
            mthis.spinWaiting = false
          })
        }
      }
    },
    mounted() {
      var mthis = this
      var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
      var eventNames = ob.getElementsByTagName("eventNames");
      mthis.myMap1 = new Map();
      for (let eventNameitem of eventNames) {
        for (let items of eventNameitem.children) {
          mthis.myMap1.set(items.getElementsByTagName('ename')[0].textContent, {
            name: items.getElementsByTagName('chname')[0].textContent,
            img: items.getElementsByTagName('img')[0].textContent
          })
        }
      }
      var ob1 = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
      var entityMainType = ob1.getElementsByTagName("entityMainType");
      mthis.myMap = new Map();
      for (var i = 0; i < entityMainType.length; i++) {
        let typeName = entityMainType[i].children[0].textContent;
        let typeChild = []
        for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
          mthis.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
        }
      }
    },
    methods: {
      clickMore(item) {
        var mthis = this;
        mthis.displayMore[item] = false;
      },
      clickCutOut(item) {
        var mthis = this;
        mthis.displayMore[item] = true;
      },
      addSingleNodeToCanvans(id, type, subType) {
        var mthis = this
        debugger
        if (type === 'entity') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
            "nodeIds": id
          }).then(response => {
            let nodeArr = response.body.data[0].nodes.map(it => {
              it.img = util.checkImgExists(it.img) ? (it.img) : 'http://10.60.1.140/assets/images/People.png'
              return it.id
            })
            mthis.$store.commit('setAddNetNodes', {
              nodes: response.body.data[0].nodes,
              links: mthis.linkObj.filter(item => {
                return item.from == id || item.to == id
              })
            })
          })
        }
        if (type === 'event') {
          // ;
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
            "EventIds": id
          }).then(response => {
            // console.log('response.body.data')
            let nodes = new Array();
            let links = new Array();
            if (response.body.code === 0) {
              // let type = response.body.data[0].event_subtype.toLowerCase().replace(/-/, "_")
              let img = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).img
              let name = mthis.myMap1.get(subType.toLowerCase().replace(/-/, "_")).name
              for (let i = 0; i < response.body.data.length; i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: img,
                  entity_type: 'event',
                  name: name,
                  loaded: true
                })
                response.body.data[i].entity_list.map(oitem => {
                  if (oitem.id === this.tableData.id) {
                    links.push({
                      id: (this.tableData.id > response.body.data[i].id) ? (this.tableData.id + '-' + response.body.data[i].id) : (response.body.data[i].id + '-' + this.tableData.id),
                      type: oitem.role,
                      from: this.tableData.id,
                      to: response.body.data[i].id,
                      direct: false
                    })
                  }
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes: nodes,
                links: links
              })
            }
          })
        }
        if (type === 'document') {
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
            "docIds": id
          }).then(response => {
            let nodes = new Array();
            let links = new Array();
            if (response.body.code === 0) {
              for (let i = 0; i < response.body.data.length; i++) {
                nodes.push({
                  id: response.body.data[i].id,
                  img: 'http://10.60.1.140/assets/images/content_node.png',
                  entity_type: 'content',
                  name: response.body.data[i].title,
                  label: response.body.data[i].title.substring(0, 19) + '...',
                  loaded: true
                })
                let idstr = (this.tableData.id > response.body.data[i].id) ? ('content_' + this.tableData.id + '-' + response.body.data[i].id) : ('content_' + response.body.data[i].id + '-' + this.tableData.id)
                links.push({
                  id: idstr,
                  type: '包含',
                  from: this.tableData.id,
                  to: response.body.data[i].id,
                  direct: false
                })
              }
              mthis.$store.commit('setAddNetNodes', {
                nodes: nodes,
                links: links
              })
            }
          })
        }
      }
    },
    computed: mapState(['searchNetResult']),
    watch: {
      tableData: function() {
        let mthis = this
        debugger
        mthis.xiangguanEntityItems = new Array()
        mthis.xiangguanEntitys = new Object()
        mthis.xiangguanEvent = new Array()
        mthis.xiangguanDoc = new Array()
        if (this.tableType === 'human') {
          mthis.spinWaiting = true
          if (this.tableData.isArray) {
            if (this.tableData.length > 0) {
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
                "NodeIds": mthis.tableData.map(item => {
                  return item.id
                }),
                "TypeLabel": "all"
              }).then(response => {})
            } else {
              if (mthis.$store.state.tmss === 'net') {
                mthis.$store.commit('setNetPromte', '长度为0')
              } else if (mthis.$store.state.tmss === 'geo') {
                mthis.$store.commit('setGeoPromte', '长度为0')
              } else if (mthis.$store.state.tmss === 'content') {
                mthis.$store.commit('setContentPromte', '长度为0')
              } else {
              }
            }
          } else {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds": new Array(mthis.tableData.id),
              "TypeLabel": "all"
            }).then(response => {
              if (response.body.data[0].RelatedEntity[mthis.tableData.id]) {
                response.body.data[0].RelatedEntity[mthis.tableData.id].links.map(item => {
                  item.type = item.undirected_type
                  return item
                })
                mthis.linkObj = response.body.data[0].RelatedEntity[mthis.tableData.id].links
                mthis.xiangguanEntityItems = response.body.data[0].RelatedEntity[mthis.tableData.id].nodes
                mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedEvent[mthis.tableData.id]) {
                mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedDocument[mthis.tableData.id]) {
                mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
              }
              if (response.body.data[0].unknown !== new Object()) {}
            })
          }
          mthis.spinWaiting = false
        }
      }
    }
  }
</script>
<style scoped>
  .moreDiv {
    text-align: center !important;
  }
  .titleName {
    min-width: 5em;
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contentName {
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .econtentp {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
    max-width: 70%;
    white-space: nowrap;
    /* margin-right: 40px; */
  }
  .econtent {
    display: flex;
    height: auto;
    min-height: 30px;
  }
  .eButton {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin: 0px 10px;
  }
  .w5em {
    width: 10em;
    min-width: 5em;
    margin: 0;
  }
  .tableLine>.econtent:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .tableLine>.econtent:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:hover>.eButton,
  .tableLine>.econtent>div:hover>.eButton {
    opacity: 1;
  }
  .eButton {
    opacity: 0;
  }
  .allowWrap {
    display: flex;
    flex-wrap: wrap;
  }
</style>


