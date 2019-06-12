<template>
  <div>
    <Collapse simple v-model="value1" id='nodeAttr' :style="{height:entDivH}" class='scrollBarAble'>
      <panel name="1">
        <span>实体属性</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='tableData.native_label'>
            <p class="econtentp w8em">母语名</p>
            <p class="econtentp">{{tableData.native_label}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.short_name'>
            <p class="econtentp w8em">简称</p>
            <p class="econtentp">{{tableData.short_name}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.headquarters_location'>
              <p class="econtentp w8em">组织类型</p>
              <p class="econtentp">{{tableData.headquarters_location}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.headquarters_location'>
            <div v-if="typeof(tableData.headquarters_location) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">组织总部</p>
              <p class="econtentp">{{tableData.headquarters_location}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.headquarters_location) === 'object'&&index<5" v-for="(it,index) in tableData.headquarters_location">
              <p class="econtentp w8em" v-if="index==0">组织总部</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.headquarters_location.length>5&&displayMore['headquarters_location']" @click="clickMore('headquarters_location')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.headquarters_location) === 'object'&&index>=5&&!displayMore['headquarters_location']" v-for="(occ,index) in tableData.headquarters_location">
              <p class="econtentp w8em" v-if="index==0">组织总部</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.headquarters_location.length>5&&!displayMore['headquarters_location']" @click="clickCutOut('headquarters_location')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.type'>
              <p class="econtentp w8em">组织类型</p>
              <p class="econtentp">{{tableData.type}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.type'>
            <div v-if="typeof(tableData.type) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">组织类型</p>
              <p class="econtentp">{{tableData.type}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.type) === 'object'&&index<5" v-for="(it,index) in tableData.type">
              <p class="econtentp w8em" v-if="index==0">组织类型</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.type.length>5&&displayMore['type']" @click="clickMore('type')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.type) === 'object'&&index>=5&&!displayMore['type']" v-for="(occ,index) in tableData.type">
              <p class="econtentp w8em" v-if="index==0">组织类型</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.type.length>5&&!displayMore['type']" @click="clickCutOut('type')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <div class="econtent" v-if='tableData.inception'>
            <p class="econtentp w8em">成立时间</p>
            <p class="econtentp">{{tableData.inception}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.founded_by'>
              <p class="econtentp w8em">创办者</p>
              <p class="econtentp">{{tableData.founded_by}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.founded_by'>
            <div v-if="typeof(tableData.founded_by) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">创办者</p>
              <p class="econtentp">{{tableData.founded_by}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.founded_by) === 'object'&&index<5" v-for="(it,index) in tableData.founded_by">
              <p class="econtentp w8em" v-if="index==0">创办者</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.founded_by.length>5&&displayMore['founded_by']" @click="clickMore('founded_by')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.founded_by) === 'object'&&index>=5&&!displayMore['founded_by']" v-for="(occ,index) in tableData.founded_by">
              <p class="econtentp w8em" v-if="index==0">创办者</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.founded_by.length>5&&!displayMore['founded_by']" @click="clickCutOut('founded_by')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.chairperson'>
              <p class="econtentp w8em">领袖</p>
              <p class="econtentp">{{tableData.chairperson}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.chairperson'>
            <div v-if="typeof(tableData.chairperson) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">领袖</p>
              <p class="econtentp">{{tableData.chairperson}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chairperson) === 'object'&&index<5" v-for="(it,index) in tableData.chairperson">
              <p class="econtentp w8em" v-if="index==0">领袖</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chairperson.length>5&&displayMore['chairperson']" @click="clickMore('chairperson')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chairperson) === 'object'&&index>=5&&!displayMore['chairperson']" v-for="(occ,index) in tableData.chairperson">
              <p class="econtentp w8em" v-if="index==0">领袖</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chairperson.length>5&&!displayMore['chairperson']" @click="clickCutOut('chairperson')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.chief_executive_officer'>
              <p class="econtentp w8em">首席执行官</p>
              <p class="econtentp">{{tableData.chief_executive_officer}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.chief_executive_officer'>
            <div v-if="typeof(tableData.chief_executive_officer) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">首席执行官</p>
              <p class="econtentp">{{tableData.chief_executive_officer}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chief_executive_officer) === 'object'&&index<5" v-for="(it,index) in tableData.chief_executive_officer">
              <p class="econtentp w8em" v-if="index==0">首席执行官</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chief_executive_officer.length>5&&displayMore['chief_executive_officer']" @click="clickMore('chief_executive_officer')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.chief_executive_officer) === 'object'&&index>=5&&!displayMore['chief_executive_officer']" v-for="(occ,index) in tableData.chief_executive_officer">
              <p class="econtentp w8em" v-if="index==0">首席执行官</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.chief_executive_officer.length>5&&!displayMore['chief_executive_officer']" @click="clickCutOut('chief_executive_officer')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <div class="econtent" v-if='tableData.member_count'>
            <p class="econtentp w8em">组织成员数</p>
            <p class="econtentp">{{tableData.member_count}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="econtent" v-if='tableData.employees'>
            <p class="econtentp w8em">组织员工数</p>
            <p class="econtentp">{{tableData.employees}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.political_ideology'>
              <p class="econtentp w8em">意识形态</p>
              <p class="econtentp">{{tableData.political_ideology}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.political_ideology'>
            <div v-if="typeof(tableData.political_ideology) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">意识形态</p>
              <p class="econtentp">{{tableData.political_ideology}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.political_ideology) === 'object'&&index<5" v-for="(it,index) in tableData.political_ideology">
              <p class="econtentp w8em" v-if="index==0">意识形态</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.political_ideology.length>5&&displayMore['political_ideology']" @click="clickMore('political_ideology')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.political_ideology) === 'object'&&index>=5&&!displayMore['political_ideology']" v-for="(occ,index) in tableData.political_ideology">
              <p class="econtentp w8em" v-if="index==0">意识形态</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.political_ideology.length>5&&!displayMore['political_ideology']" @click="clickCutOut('political_ideology')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.business_division'>
              <p class="econtentp w8em">业务部门</p>
              <p class="econtentp">{{tableData.business_division}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.business_division'>
            <div v-if="typeof(tableData.business_division) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">业务部门</p>
              <p class="econtentp">{{tableData.business_division}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.business_division) === 'object'&&index<5" v-for="(it,index) in tableData.business_division">
              <p class="econtentp w8em" v-if="index==0">业务部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.business_division.length>5&&displayMore['business_division']" @click="clickMore('business_division')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.business_division) === 'object'&&index>=5&&!displayMore['business_division']" v-for="(occ,index) in tableData.business_division">
              <p class="econtentp w8em" v-if="index==0">业务部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.business_division.length>5&&!displayMore['business_division']" @click="clickCutOut('business_division')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.parent_organization'>
              <p class="econtentp w8em">上级部门</p>
              <p class="econtentp">{{tableData.parent_organization}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.parent_organization'>
            <div v-if="typeof(tableData.parent_organization) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">上级部门</p>
              <p class="econtentp">{{tableData.parent_organization}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.parent_organization) === 'object'&&index<5" v-for="(it,index) in tableData.parent_organization">
              <p class="econtentp w8em" v-if="index==0">上级部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.parent_organization.length>5&&displayMore['parent_organization']" @click="clickMore('parent_organization')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.parent_organization) === 'object'&&index>=5&&!displayMore['parent_organization']" v-for="(occ,index) in tableData.parent_organization">
              <p class="econtentp w8em" v-if="index==0">上级部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.parent_organization.length>5&&!displayMore['parent_organization']" @click="clickCutOut('parent_organization')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.subsidiary'>
              <p class="econtentp w8em">下级部门</p>
              <p class="econtentp">{{tableData.subsidiary}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.subsidiary'>
            <div v-if="typeof(tableData.subsidiary) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">下级部门</p>
              <p class="econtentp">{{tableData.subsidiary}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.subsidiary) === 'object'&&index<5" v-for="(it,index) in tableData.subsidiary">
              <p class="econtentp w8em" v-if="index==0">下级部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.subsidiary.length>5&&displayMore['subsidiary']" @click="clickMore('subsidiary')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.subsidiary) === 'object'&&index>=5&&!displayMore['subsidiary']" v-for="(occ,index) in tableData.subsidiary">
              <p class="econtentp w8em" v-if="index==0">下级部门</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.subsidiary.length>5&&!displayMore['subsidiary']" @click="clickCutOut('subsidiary')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.official_website'>
              <p class="econtentp w8em">官网</p>
              <p class="econtentp">{{tableData.official_website}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.official_website'>
            <div v-if="typeof(tableData.official_website) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">官网</p>
              <p class="econtentp">{{tableData.official_website}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_website) === 'object'&&index<5" v-for="(it,index) in tableData.official_website">
              <p class="econtentp w8em" v-if="index==0">官网</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_website.length>5&&displayMore['official_website']" @click="clickMore('official_website')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_website) === 'object'&&index>=5&&!displayMore['official_website']" v-for="(occ,index) in tableData.official_website">
              <p class="econtentp w8em" v-if="index==0">官网</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.official_website.length>5&&!displayMore['official_website']" @click="clickCutOut('official_website')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
          <!-- <div class="econtent" v-if='tableData.telephone_number'>
              <p class="econtentp w8em">电话</p>
              <p class="econtentp">{{tableData.telephone_number}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='tableData.telephone_number'>
            <div v-if="typeof(tableData.telephone_number) !== 'object'" :style="{display:'flex'}">
              <p class="econtentp w8em">电话</p>
              <p class="econtentp">{{tableData.telephone_number}}</p>
              <div class="eButton">
              </div>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.telephone_number) === 'object'&&index<5" v-for="(it,index) in tableData.telephone_number">
              <p class="econtentp w8em" v-if="index==0">电话</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.telephone_number.length>5&&displayMore['telephone_number']" @click="clickMore('telephone_number')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.telephone_number) === 'object'&&index>=5&&!displayMore['telephone_number']" v-for="(occ,index) in tableData.telephone_number">
              <p class="econtentp w8em" v-if="index==0">电话</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="tableData.telephone_number.length>5&&!displayMore['telephone_number']" @click="clickCutOut('telephone_number')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div>
        </div>
      </panel>
      <!-- ============================================相关实体================================================== -->
      <panel name="2">
        <span>相关实体</span>
        <div slot="content" class="tableLine">
          <!-- <div class="econtent" v-if='xiangguanEntityItems.length>0'  v-for="items in xiangguanEntityItems">
              <p class="econtentp w8em">{{items.relation}}</p>
              <p class="econtentp">{{items.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div> -->
          <div class="econtent allowWrap" v-if='xiangguanEntityItems.length>0' v-for="(items,ind) in xiangguanEntityItems">
            <div v-show='ctrls[ind]||items.data.length<5' class="econtent blockStyle" v-for="(item,index) in items.data">
              <p class="econtentp w8em" v-if='index==0' :title="items.relation">{{items.relation}}</p>
              <p class="econtentp w8em" v-else :title="items.relation"></p>
              <p class="econtentp">{{item.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div>
            <div v-show="!ctrls[ind]&&items.data.length>5&&index<5" class="econtent blockStyle" v-for="(item,index) in items.data">
              <p class="econtentp w8em" v-if='index==0' :title="items.relation">{{items.relation}}</p>
              <p class="econtentp w8em" v-else :title="items.relation"></p>
              <p class="econtentp">{{item.name}}</p>
              <div class="eButton">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(item.id,'entity','')"></Button>
              </div>
            </div>
            <div v-show="!ctrls[ind]&&items.data.length>5" class="econtent blockStyle">
              <p class="econtentp w8em"><a @click='more(ind)'>更多</a></p>
              <p class="econtentp"></p>
            </div>
            <div v-show="ctrls[ind]&&items.data.length>5" class="econtent blockStyle">
              <p class="econtentp w8em"><a @click='more(ind)'>收起</a></p>
              <p class="econtentp"></p>
            </div>
          </div>
          <div class="econtent" v-if='xiangguanEntityItems.length ==0'>
            <p class="econtentp" v-show="spinWaiting">相关实体加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关实体</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关事件================================================== -->
      <panel name="3">
        <span>相关事件</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0' v-for='items in xiangguanEvent.statistics'>
            <!-- <p class="econtentp w8em">{{myMap1.get(items.type.toLowerCase().replace(/-/, "_")).name}}</p> -->
            <p class="econtentp w8em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'event',items.type)"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">相关事件加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关事件</p>
          </div>
        </div>
      </panel>
      <!-- ============================================相关文档================================================== -->
      <panel name="4">
        <span>相关文档</span>
        <div slot="content" class="tableLine">
          <div class="econtent" v-if='xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0' v-for='items in xiangguanDoc.statistics'>
            <p class="econtentp w8em">{{items.type}}</p>
            <p class="econtentp">{{items.num}}</p>
            <div class="eButton">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.ids,'document','')"></Button>
            </div>
          </div>
          <div class="econtent" v-if='!(xiangguanDoc.statistics&&xiangguanDoc.statistics.length>0)'>
            <p class="econtentp" v-show="spinWaiting">文档事件加载中···</p>
            <p class="econtentp" style="padding-left:2em;" v-show="!spinWaiting">暂无相关文档</p>
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
        ctrls: new Array()
      }
    },
    props: ['tableData', 'entDivH', 'tableType'],
    created() {
      let mthis = this
      mthis.xiangguanEntityItems = new Array()
      mthis.xiangguanEntitys = new Object()
      mthis.xiangguanEvent = new Array()
      mthis.xiangguanDoc = new Array()
      if (this.tableType === 'organization') {
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
            "Group": "True",
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
              mthis.ctrls = new Array()
              mthis.xiangguanEntityItems.map(item => {
                mthis.ctrls.push(!item.data.length > 5)
              })
              mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
            }
            if (response.body.data[0].RelatedEvent[mthis.tableData.id]) {
              mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
            }
            if (response.body.data[0].RelatedDocument[mthis.tableData.id]) {
              mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
            }
            if (response.body.data[0].unknown !== new Object()) {
              // // // console.log('------------有未知类型的节点--------------------')
              // // // console.log(response.body.data[0].unknown)
              // // // console.log('-----------------------------------------------')
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
    beforeDestroy() {
      this.tableData = new Object()
    },
    methods: {
     more(index) {
                // this.ctrls[index].splice(index,1,!this.ctrls[index]) 
                this.ctrls[index]=!this.ctrls[index]
                this.$forceUpdate()
            },
      addSingleNodeToCanvans(id, type, subType) {
        var mthis = this
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
            // // console.log('response.body.data')
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
    watch: {
      tableData: function() {
        // // // console.log('===========custom_event_humanEntityTable --------tableData')
        let mthis = this
        mthis.xiangguanEntityItems = new Array()
        mthis.xiangguanEntitys = new Object()
        mthis.xiangguanEvent = new Array()
        mthis.xiangguanDoc = new Array()
        if (this.tableType === 'organization') {
          mthis.spinWaiting = true
          if (this.tableData.isArray) {
            if (this.tableData.length > 0) {
              mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
                "NodeIds": mthis.tableData.map(item => {
                  return item.id
                }),
                // "NodeTypes":mthis.tableData.map(item=>{return item.entity_type}),
                "TypeLabel": "all"
              }).then(response => {
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
            }
            // mthis.spinWaiting = false
          } else {
            mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
              "NodeIds": new Array(mthis.tableData.id),
              // "NodeTypes":new Array('entity'),
              "Group": "True",
              "TypeLabel": "all"
            }).then(response => {
              if (response.body.data[0].RelatedEntity[mthis.tableData.id]) {
                response.body.data[0].RelatedEntity[mthis.tableData.id].links.map(item => {
                  item.type = item.undirected_type
                  return item
                })
                mthis.linkObj = response.body.data[0].RelatedEntity[mthis.tableData.id].links
                mthis.xiangguanEntityItems = response.body.data[0].RelatedEntity[mthis.tableData.id].nodes
                mthis.ctrls = new Array()
                mthis.xiangguanEntityItems.map(item => {
                  mthis.ctrls.push(!item.data.length > 5)
                })
                mthis.xiangguanEntitys = response.body.data[0].RelatedEntity[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedEvent[mthis.tableData.id]) {
                mthis.xiangguanEvent = response.body.data[0].RelatedEvent[mthis.tableData.id]
              }
              if (response.body.data[0].RelatedDocument[mthis.tableData.id]) {
                mthis.xiangguanDoc = response.body.data[0].RelatedDocument[mthis.tableData.id]
              }
              if (response.body.data[0].unknown !== new Object()) {
                // // // console.log('------------有未知类型的节点--------------------')
                // // // console.log(response.body.data[0].unknown)
                // // // console.log('-----------------------------------------------')
              }
            })
          }
          mthis.spinWaiting = false
        }
      }
    }
  }
</script>
<style scoped>
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
  .w8em {
    width: 8em;
    min-width: 8em;
    max-width: 8em;
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
  .blockStyle:hover .eButton{
    opacity: 1;
  }
  .eButton {
    opacity: 0;
  }
</style>


