<template>
  <div :style="{height:eDivH}">
    <div :style="{height:'60px',margin: '5px 0px 0 0',paddingBottom: '10px',borderBottom: '1px solid rgba(51,255,255,0.2)'}" v-if="myMap.get(detailData.entity_type) === 'event'">
      <Row type="flex" justify="center">
        <!-- 头像 + 名字 div -->
        <Col span="8" align="center" :style="{display:'flex',flexFlow:'row nowarp',justifyContent:'center'}">
        <!-- <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px'}" v-if="!(detailData && detailData.img)" /> -->
        <Avatar class="circle-img" src="http://10.60.1.140/assets/images/event.png" :style="{width:'50px',height:'50px'}" />
        </Col>
        <Col span="16" align="left">
        <div :style="{margin:'0 10px'}" class="event-title">
          <!-- 名字 -->
          <p :style="{lineHeight:'28px',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}">{{detailData.event_subtype}}</p>
        </div>
        <div :style="{margin:'0 10px'}" class="event-content">
          <!-- 描述 -->
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-if="detailData.description">{{detailData.event_content}}</p>
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-else class="e-content-p">暂无简介</p>
        </div>
        </Col>
      </Row>
    </div>
    <div :style="{height:'60px',margin: '5px 0px 0 0',paddingBottom: '10px',borderBottom: '1px solid rgba(51,255,255,0.2)'}" v-if="myMap.get(detailData.entity_type) === 'document'">
      <Row type="flex" justify="center">
        <!-- 头像 + 名字 div -->
        <Col span="8" align="center" :style="{display:'flex',flexFlow:'row nowarp',justifyContent:'center'}">
        <!-- <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px'}" v-if="!(detailData && detailData.img)" /> -->
        <Avatar class="circle-img" src='http://10.60.1.140/assets/images/content_node.png' :style="{width:'50px',height:'50px'}" />
        </Col>
        <Col span="16" align="left">
        <div :style="{margin:'0 10px'}" class="event-title">
          <!-- 名字 -->
          <p :style="{lineHeight:'28px',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}">{{detailData.title}}</p>
        </div>
        <div :style="{margin:'0 10px'}" class="event-content">
          <!-- 描述 -->
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-if="detailData.description">{{detailData.i_sn}}</p>
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-else class="e-content-p">暂无简介</p>
        </div>
        </Col>
      </Row>
    </div>
    <div :style="{height:'60px',margin: '5px 0px 0 0',paddingBottom: '10px',borderBottom: '1px solid rgba(51,255,255,0.2)'}" v-if="myMap.get(detailData.entity_type) === 'entity'">
      <Row type="flex" justify="center">
        <!-- 头像 + 名字 div -->
        <Col span="8" align="center" :style="{display:'flex',flexFlow:'row nowarp',justifyContent:'center'}">
        <!-- <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px'}" v-if="!(detailData && detailData.img)" /> -->
        <Avatar class="circle-img" :src="checkImg(this.detailData.img) ? (this.detailData.img) : ('http://10.60.1.140/assets/images/image_group.png')" :style="{width:'50px',height:'50px'}" />
        </Col>
        <Col span="16" align="left">
        <div :style="{margin:'0 10px'}" class="event-title">
          <!-- 名字 -->
          <p :style="{lineHeight:'28px',fontSize:'16px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}">{{detailData.name}}</p>
        </div>
        <div :style="{margin:'0 10px'}" class="event-content">
          <!-- 描述 -->
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-if="detailData.description">{{detailData.summary}}</p>
          <p :style="{lineHeight:'22px',overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}" v-else class="e-content-p">暂无简介</p>
        </div>
        </Col>
      </Row>
    </div>
    <div class='scrollBarAble' :style="{height:entDivH}">
      <div class="ediv" v-if="myMap.get(detailData.entity_type) === 'event'">
      </div>
      <div class="ediv" v-if="myMap.get(detailData.entity_type) === 'entity'">
        <!-- 实体属性 -->
        <div class="e-title">
          <div class="e-title-d"></div>
          <p class="e-title-p">实体属性</p>
        </div>
        <div class="e-content shuxingDiv" v-if="detailData.entity_type === 'human'">
          <div class="e-content-d">
            <p class="e-content-p w5em">全名</p>
            <p class="e-content-p">{{detailData.chinese_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.entity_name'>
            <p class="e-content-p w5em">母语名</p>
            <p class="e-content-p">{{detailData.entity_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.nickname'>
            <p class="e-content-p w5em">昵称</p>
            <p class="e-content-p">{{detailData.nickname}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_birth'>
            <p class="e-content-p w5em">出生日期</p>
            <p class="e-content-p">{{detailData.date_of_birth}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_death'>
            <p class="e-content-p w5em">死亡日期</p>
            <p class="e-content-p">{{detailData.date_of_death}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_disappearance'>
            <p class="e-content-p w5em">失踪日期</p>
            <p class="e-content-p">{{detailData.date_of_disappearance}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.place_of_birth'>
            <p class="e-content-p w5em">出生地</p>
            <p class="e-content-p">{{detailData.place_of_birth}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.country_of_citizenship'>
            <p class="e-content-p w5em">国籍</p>
            <p class="e-content-p">{{detailData.country_of_citizenship}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.ethic_group'>
            <p class="e-content-p w5em">所属民族</p>
            <p class="e-content-p">{{detailData.ethic_group}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.religion'>
            <p class="e-content-p w5em">宗教信仰</p>
            <p class="e-content-p">{{detailData.religion}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.occupation'>
            <p class="e-content-p w5em">从事职业</p>
            <p class="e-content-p">{{detailData.occupation}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.military_rank'>
            <p class="e-content-p w5em">军衔</p>
            <p class="e-content-p">{{detailData.military_rank}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.military_branch'>
            <p class="e-content-p w5em">所属军种</p>
            <p class="e-content-p">{{detailData.military_branch}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.member_of_political_party'>
            <p class="e-content-p w5em">所属政党</p>
            <p class="e-content-p">{{detailData.member_of_political_party}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.award_received'>
            <p class="e-content-p w5em">荣誉</p>
            <p class="e-content-p">{{detailData.award_received}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.e_mail'>
            <p class="e-content-p w5em">邮箱</p>
            <p class="e-content-p">{{detailData.e_mail}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_blog'>
            <p class="e-content-p w5em">博客</p>
            <p class="e-content-p">{{detailData.official_blog}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_website'>
            <p class="e-content-p w5em">官网</p>
            <p class="e-content-p">{{detailData.official_website}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.summary'>
            <p class="e-content-p w5em">简介</p>
            <p class="e-content-p">{{detailData.summary}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
        <div class="e-content shuxingDiv" v-if="detailData.entity_type === 'organization'">
          <div class="e-content-d" v-if='detailData.description'>
            <p class="e-content-p w5em">描述</p>
            <p class="e-content-p">{{detailData.description}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.native_label'>
            <p class="e-content-p w5em">母语名</p>
            <p class="e-content-p">{{detailData.native_label}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.short_name'>
            <p class="e-content-p w5em">简称</p>
            <p class="e-content-p">{{detailData.short_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.headquarters_location'>
            <p class="e-content-p w5em">组织总部</p>
            <p class="e-content-p">{{detailData.headquarters_location}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.type'>
            <p class="e-content-p w5em">组织类型</p>
            <p class="e-content-p">{{detailData.type}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.inception'>
            <p class="e-content-p w5em">成立</p>
            <p class="e-content-p">{{detailData.inception}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.member_count'>
            <p class="e-content-p w5em">成员数</p>
            <p class="e-content-p">{{detailData.member_count}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.employees'>
            <p class="e-content-p w5em">员工数</p>
            <p class="e-content-p">{{detailData.employees}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.political_ideology'>
            <p class="e-content-p w5em">意识形态</p>
            <p class="e-content-p">{{detailData.political_ideology}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_website'>
            <p class="e-content-p w5em">官网</p>
            <p class="e-content-p">{{detailData.official_website}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.telephone_number'>
            <p class="e-content-p w5em">电话</p>
            <p class="e-content-p">{{detailData.telephone_number}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
        <div class="e-content shuxingDiv" v-if="detailData.entity_type === 'administrative'">
          <div class="e-content-d" v-if='detailData.location_map'>
            <p class="e-content-p w5em">地图</p>
            <p class="e-content-p">{{detailData.location_map}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.image'>
            <p class="e-content-p w5em">地标</p>
            <p class="e-content-p">{{detailData.image}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.description'>
            <p class="e-content-p w5em">描述</p>
            <p class="e-content-p">{{detailData.description}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_name'>
            <p class="e-content-p w5em">全名</p>
            <p class="e-content-p">{{detailData.official_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.name_in_native_language'>
            <p class="e-content-p w5em">母语名</p>
            <p class="e-content-p">{{detailData.name_in_native_language}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.replaces'>
            <p class="e-content-p w5em">曾用名</p>
            <p class="e-content-p">{{detailData.replaces}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.replaces_by'>
            <p class="e-content-p w5em">现用名</p>
            <p class="e-content-p">{{detailData.replaces_by}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.nickname'>
            <p class="e-content-p w5em">昵称</p>
            <p class="e-content-p">{{detailData.nickname}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.short_name'>
            <p class="e-content-p w5em">简称</p>
            <p class="e-content-p">{{detailData.short_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.inception'>
            <p class="e-content-p w5em">建立时间</p>
            <p class="e-content-p">{{detailData.inception}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.capital'>
            <p class="e-content-p w5em">首府</p>
            <p class="e-content-p">{{detailData.capital}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.continent'>
            <p class="e-content-p w5em">所属大陆</p>
            <p class="e-content-p">{{detailData.continent}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.country'>
            <p class="e-content-p w5em">所属国家</p>
            <p class="e-content-p">{{detailData.country}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.area'>
            <p class="e-content-p w5em">面积</p>
            <p class="e-content-p">{{detailData.area}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.located_in_or_next_to_body_of_water'>
            <p class="e-content-p w5em">水域</p>
            <p class="e-content-p">{{detailData.located_in_or_next_to_body_of_water}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.population'>
            <p class="e-content-p w5em">人口</p>
            <p class="e-content-p">{{detailData.population}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.GDP'>
            <p class="e-content-p w5em">GDP</p>
            <p class="e-content-p">{{detailData.GDP}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.gini_coefficient'>
            <p class="e-content-p w5em">基尼系数</p>
            <p class="e-content-p">{{detailData.gini_coefficient}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.Human_Development_Index'>
            <p class="e-content-p w5em">人类发展指数</p>
            <p class="e-content-p">{{detailData.Human_Development_Index}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.located_in_time_zone'>
            <p class="e-content-p w5em">时区</p>
            <p class="e-content-p">{{detailData.located_in_time_zone}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.coordinate_location'>
            <p class="e-content-p w5em">坐标</p>
            <p class="e-content-p">{{detailData.coordinate_location}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.local_dialing_code'>
            <p class="e-content-p w5em">电话区号</p>
            <p class="e-content-p">{{detailData.local_dialing_code}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.postal_code'>
            <p class="e-content-p w5em">邮编</p>
            <p class="e-content-p">{{detailData.postal_code}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.top_level_Internet_domain'>
            <p class="e-content-p w5em">顶级域名</p>
            <p class="e-content-p">{{detailData.top_level_Internet_domain}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_website'>
            <p class="e-content-p w5em">官网</p>
            <p class="e-content-p">{{detailData.official_website}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.office_blog'>
            <p class="e-content-p w5em">博客</p>
            <p class="e-content-p">{{detailData.office_blog}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
        <div class="e-content shuxingDiv" v-if="detailData.entity_type === 'weapon'">
          <div class="e-content-d" v-if='detailData.description'>
            <p class="e-content-p w5em">描述</p>
            <p class="e-content-p">{{detailData.description}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.native_label'>
            <p class="e-content-p w5em">母语名</p>
            <p class="e-content-p">{{detailData.native_label}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.short_name'>
            <p class="e-content-p w5em">简称</p>
            <p class="e-content-p">{{detailData.short_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.headquarters_location'>
            <p class="e-content-p w5em">组织总部</p>
            <p class="e-content-p">{{detailData.headquarters_location}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.type'>
            <p class="e-content-p w5em">组织类型</p>
            <p class="e-content-p">{{detailData.type}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.inception'>
            <p class="e-content-p w5em">成立</p>
            <p class="e-content-p">{{detailData.inception}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.member_count'>
            <p class="e-content-p w5em">成员数</p>
            <p class="e-content-p">{{detailData.member_count}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.employees'>
            <p class="e-content-p w5em">员工数</p>
            <p class="e-content-p">{{detailData.employees}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.political_ideology'>
            <p class="e-content-p w5em">意识形态</p>
            <p class="e-content-p">{{detailData.political_ideology}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_website'>
            <p class="e-content-p w5em">官网</p>
            <p class="e-content-p">{{detailData.official_website}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.telephone_number'>
            <p class="e-content-p w5em">电话</p>
            <p class="e-content-p">{{detailData.telephone_number}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
      </div>
      <div class="ediv" v-if="myMap.get(detailData.entity_type) === 'event'">
        <!-- 实体属性 -->
        <div class="e-title">
          <div class="e-title-d"></div>
          <p class="e-title-p">事件属性</p>
        </div>
        <div class="e-content" v-if='detailData.chinese_name'>
          <div class="e-content-d">
            <p class="e-content-p w5em">全名</p>
            <p class="e-content-p">{{detailData.chinese_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.entity_name'>
            <p class="e-content-p w5em">母语名</p>
            <p class="e-content-p">{{detailData.entity_name}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.nickname'>
            <p class="e-content-p w5em">昵称</p>
            <p class="e-content-p">{{detailData.nickname}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_birth'>
            <p class="e-content-p w5em">出生日期</p>
            <p class="e-content-p">{{detailData.date_of_birth}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_death'>
            <p class="e-content-p w5em">死亡日期</p>
            <p class="e-content-p">{{detailData.date_of_death}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.date_of_disappearance'>
            <p class="e-content-p w5em">失踪日期</p>
            <p class="e-content-p">{{detailData.date_of_disappearance}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.place_of_birth'>
            <p class="e-content-p w5em">出生地</p>
            <p class="e-content-p">{{detailData.place_of_birth}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.country_of_citizenship'>
            <p class="e-content-p w5em">国籍</p>
            <p class="e-content-p">{{detailData.country_of_citizenship}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.ethic_group'>
            <p class="e-content-p w5em">所属民族</p>
            <p class="e-content-p">{{detailData.ethic_group}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.religion'>
            <p class="e-content-p w5em">宗教信仰</p>
            <p class="e-content-p">{{detailData.religion}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.occupation'>
            <p class="e-content-p w5em">从事职业</p>
            <p class="e-content-p">{{detailData.occupation}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.military_rank'>
            <p class="e-content-p w5em">军衔</p>
            <p class="e-content-p">{{detailData.military_rank}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.military_branch'>
            <p class="e-content-p w5em">所属军种</p>
            <p class="e-content-p">{{detailData.military_branch}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.member_of_political_party'>
            <p class="e-content-p w5em">所属政党</p>
            <p class="e-content-p">{{detailData.member_of_political_party}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.award_received'>
            <p class="e-content-p w5em">荣誉</p>
            <p class="e-content-p">{{detailData.award_received}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.e_mail'>
            <p class="e-content-p w5em">邮箱</p>
            <p class="e-content-p">{{detailData.e_mail}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_blog'>
            <p class="e-content-p w5em">博客</p>
            <p class="e-content-p">{{detailData.official_blog}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.official_website'>
            <p class="e-content-p w5em">官网</p>
            <p class="e-content-p">{{detailData.official_website}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.summary'>
            <p class="e-content-p w5em">简介</p>
            <p class="e-content-p">{{detailData.summary}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
      </div>
      <div class="ediv" v-if="myMap.get(detailData.entity_type) === 'document'">
        <div class="e-title">
          <div class="e-title-d"></div>
          <p class="e-title-p">文档属性</p>
        </div>
        <div class="e-content">
          <div class="e-content-d" v-if='detailData.title'>
            <p class="e-content-p w5em">标题</p>
            <p class="e-content-p">{{detailData.title}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.i_sn'>
            <p class="e-content-p w5em">来源</p>
            <p class="e-content-p">{{detailData.i_sn}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.from'>
            <p class="e-content-p w5em">作者</p>
            <p class="e-content-p">{{detailData.from}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.time'>
            <p class="e-content-p w5em">时间</p>
            <p class="e-content-p">{{detailData.time}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.channel'>
            <p class="e-content-p w5em">通道</p>
            <p class="e-content-p">{{detailData.channel}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
          <div class="e-content-d" v-if='detailData.type'>
            <p class="e-content-p w5em">类型</p>
            <p class="e-content-p">{{detailData.type}}</p>
            <div class="buttonD">
              <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" size='small'></Button>
            </div>
          </div>
        </div>
      </div>
      <div class="e-title">
        <div class="e-title-d"></div>
        <p class="e-title-p">相关实体</p>
      </div>
      <div class="xiangguanshitiDiv">
        <!-- <div  v-for='entityItem in xiangguanEntity'> -->
        <div class="e-content" v-if="detailData.entity_type === 'human'">
          <div class="e-content-d-dis" v-if='xiangguanEntity.member_of&&xiangguanEntity.member_of.length'>
            <p class="e-content-p w5em">组织</p>
            <div class='w100'>
              <div class='flexDiv' v-for="it in xiangguanEntity.member_of">
                <p class="e-content-p">{{it.name}}</p>
                <div class="buttonD">
                  <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.employer&&xiangguanEntity.employer.length'>
          <p class="e-content-p w5em">雇主</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.employer">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.educated_at&&xiangguanEntity.educated_at.length'>
          <p class="e-content-p w5em">学习经历</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.educated_at">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.work_at&&xiangguanEntity.work_at.length'>
          <p class="e-content-p w5em">工作经历</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.xiangguanEntity">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.father&&xiangguanEntity.father.length'>
          <p class="e-content-p w5em">父亲</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.father">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.mother&&xiangguanEntity.mother.length'>
          <p class="e-content-p w5em">母亲</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.mother">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.spouse&&xiangguanEntity.spouse.length'>
          <p class="e-content-p w5em">配偶</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.spouse">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.child&&xiangguanEntity.child.length'>
          <p class="e-content-p w5em">子女</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.child">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.sibling&&xiangguanEntity.sibling.length'>
          <p class="e-content-p w5em">兄弟姐妹</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.sibling">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="e-content" v-if="detailData.entity_type === 'organization'">
        <div class="e-content-d-dis" v-if='xiangguanEntity.founded_by&&xiangguanEntity.founded_by.length'>
          <p class="e-content-p w5em">创办者</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.founded_by">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.chairperson&&xiangguanEntity.chairperson.length'>
          <p class="e-content-p w5em">领袖</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.chairperson">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.chief_executive_officer&&xiangguanEntity.chief_executive_officer.length'>
          <p class="e-content-p w5em">首席执行官</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.chief_executive_officer">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.business_division&&xiangguanEntity.business_division.length'>
          <p class="e-content-p w5em">业务部门</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.business_division">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.parent_organization&&xiangguanEntity.parent_organization.length'>
          <p class="e-content-p w5em">上级部门</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.parent_organization">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.subsidiary&&xiangguanEntity.subsidiary.length'>
          <p class="e-content-p w5em">下级部门</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.subsidiary">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="e-content" v-if="detailData.entity_type === 'administrative'">
        <div class="e-content-d-dis" v-if='xiangguanEntity.head_of_state&&xiangguanEntity.head_of_state.length'>
          <p class="e-content-p w5em">国家元首</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.head_of_state">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.head_of_government&&xiangguanEntity.head_of_government.length'>
          <p class="e-content-p w5em">政府首脑</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.head_of_government">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.office_held_by_head_of_government&&xiangguanEntity.office_held_by_head_of_government.length'>
          <p class="e-content-p w5em">政府机构</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.office_held_by_head_of_government">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.head_of_government&&xiangguanEntity.head_of_government.length'>
          <p class="e-content-p w5em">政府首长</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.head_of_government">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.legislative_body&&xiangguanEntity.legislative_body.length'>
          <p class="e-content-p w5em">立法机构</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.legislative_body">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.executive_body&&xiangguanEntity.executive_body.length'>
          <p class="e-content-p w5em">执行政府</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.executive_body">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.highest_judicial_authority&&xiangguanEntity.highest_judicial_authority.length'>
          <p class="e-content-p w5em">最高司法机关</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.highest_judicial_authority">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.located_in_the_administrative_territorial_entity&&xiangguanEntity.located_in_the_administrative_territorial_entity.length'>
          <p class="e-content-p w5em">位于</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.located_in_the_administrative_territorial_entity">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.contains_administrative_territorial_entity&&xiangguanEntity.contains_administrative_territorial_entity.length'>
          <p class="e-content-p w5em">下属地区</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.contains_administrative_territorial_entity">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.diplomatic_relation&&xiangguanEntity.diplomatic_relation.length'>
          <p class="e-content-p w5em">邦交国家</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.diplomatic_relation">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.twinned_administrative_body&&xiangguanEntity.twinned_administrative_body.length'>
          <p class="e-content-p w5em">友好城市</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.twinned_administrative_body">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.shares_border_with&&xiangguanEntity.shares_border_with.length'>
          <p class="e-content-p w5em">接壤于</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.shares_border_with">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="e-content" v-if="detailData.entity_type === 'weapon'">
        <div class="e-content-d-dis" v-if='xiangguanEntity.country_of_origin&&xiangguanEntity.country_of_origin.length'>
          <p class="e-content-p w5em">原产国</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.country_of_origin">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.country&&xiangguanEntity.country.length'>
          <p class="e-content-p w5em">服役国家</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.country">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.manufacturer&&xiangguanEntity.manufacturer.length'>
          <p class="e-content-p w5em">生产商</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.manufacturer">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.developer&&xiangguanEntity.developer.length'>
          <p class="e-content-p w5em">开发者</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.developer">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.designed_by&&xiangguanEntity.designed_by.length'>
          <p class="e-content-p w5em">设计者</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.designed_by">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.operator&&xiangguanEntity.operator.length'>
          <p class="e-content-p w5em">使用者</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.operator">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.guidance_system&&xiangguanEntity.guidance_system.length'>
          <p class="e-content-p w5em">制导系统</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.guidance_system">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.ammunition&&xiangguanEntity.ammunition.length'>
          <p class="e-content-p w5em">弹药</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.ammunition">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.powerplant&&xiangguanEntity.powerplant.length'>
          <p class="e-content-p w5em">发动机</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.powerplant">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
        <div class="e-content-d-dis" v-if='xiangguanEntity.avionics&&xiangguanEntity.avionics.length'>
          <p class="e-content-p w5em">航空电子设备</p>
          <div class='w100'>
            <div class='flexDiv' v-for="it in xiangguanEntity.avionics">
              <p class="e-content-p">{{it.name}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanShiti(it.id)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="e-title">
        <div class="e-title-d"></div>
        <p class="e-title-p">相关文档</p>
      </div>
      <div v-if='xiangguanDoc.length>0'>
        <div v-for='docItem in xiangguanDoc'>
          <div class="e-content shuxingDiv">
            <div class="e-content-d">
              <p class="e-content-p w5em">{{docItem.type}}</p>
              <p class="e-content-p">{{docItem.num}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanDoc(docItem.ids)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="e-content">
          <div class="scrollBarAble e-content" :style="{backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
            <div class="e-content-d-dis">
              <p class="e-content-p">暂无相关文档</p>
            </div>
          </div>
        </div>
      </div>
      <div class="e-title">
        <div class="e-title-d"></div>
        <p class="e-title-p">相关事件</p>
      </div>
      <div v-if='xiangguanEvent.length>0'>
        <div v-for='eventItem in xiangguanEvent'>
          <div class="e-content shuxingDiv">
            <div class="e-content-d">
              <p class="e-content-p w5em">{{eventItem.type}}</p>
              <p class="e-content-p">{{eventItem.num}}</p>
              <div class="buttonD">
                <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addXiangguanEvent(eventItem.ids)"></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-else>
        <div class="e-content">
          <div class="scrollBarAble e-content" :style="{backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
            <div class="e-content-d-dis">
              <p class="e-content-p">暂无相关事件</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="selectDiv" :style="{height:selectDivHeight}">
      <div class="selectEdiv" :style="{height:selectDivHeight,maxHeight:selectDivHeight}">
        <!-- 实体属性 -->
        <div class="e-title">
          <div class="e-title-d"></div>
          <p class="e-title-p">当前选择({{evetdata.length}})</p>
        </div>
        <div class="e-content" v-if="evetdata.length == undefined" :style="{height:selectHeight, backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
          <div class="e-content-d pointIcon" @click="changeDetailDiv(evetdata.id,evetdata.entity_type)">
            <p class="e-content-p">{{evetdata.name}}</p>
          </div>
        </div>
        <div class="scrollBarAble e-content" v-else :style="{height:selectHeight, backgroundColor: 'rgba(0, 0, 0, 0.05)'}">
          <div class="e-content-d pointIcon" v-for="(item,index) in evetdata" @click="changeDetailDiv(item.id,item.entity_type)" :id='item.id' :class="(selectTag===item.id)?'selectedTag':''">
            <p class="e-content-p">{{item.name}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  import configer from '../../util/configContrl.js'
  import util from '../../util/tools.js'
  mock.test = 1
  export default {
    data() {
      return {
        selectTag: '',
        detailData: new Object(),
        selectDivHeight: '',
        eDivH: '',
        selectHeight: '',
        entDivH: '',
        entityT: '',
        myMap: new Map(),
        xiangguanEntity: [],
        xiangguanDoc: [],
        xiangguanEvent: [],
        timer: null,
        allRelatedEntity: {
          nodes: [],
          links: []
        },
        allRelatedDoc: {
          nodes: [],
          links: []
        },
        allRelatedEvent: {
          nodes: [],
          links: []
        }
      }
    },
    props: ['evetdata'],
    mounted() {
      this.selectDivHeight = (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 8 + 30 + "px";
      this.selectHeight = (document.documentElement.clientHeight * 1 - 64 - 70 - 30 - 20) * 0.2 - 10 + "px";
      this.eDivH = document.documentElement.clientHeight - 65 - 20 - 16 - 45 + 'px';
      this.entDivH = document.documentElement.clientHeight * 0.8 - 10 - 16 - 30 - 75 - (64 + 70 + 30 + 20) * 0.2 + 8 - 30 + "px";
    },
    components: {},
    watch: {
      detailData: function() {
        console.log('this.detailData')
        console.log(this.detailData)
      },
      xiangguanEntity: function() {
        console.log('this.xiangguanEntity')
        console.log(this.xiangguanEntity)
      },
      evetdata: function() {
        var mthis = this
        if (mthis.evetdata.length > 0) {
          console.log('============mthis.evetdata===============')
          console.log(mthis.evetdata[0])
          var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
          var entityMainType = ob.getElementsByTagName("entityMainType");
          if (this.timer) {
            clearTimeout(this.timer)
          }
          this.timer = setTimeout(function() {
            let arr = []
            mthis.myMap = new Map();
            for (var i = 0; i < entityMainType.length; i++) {
              let typeName = entityMainType[i].children[0].textContent;
              let typeChild = []
              for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
                // typeChild.push(entityMainType[i].children[1].children[n].textContent)
                mthis.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
              }
            }
            if (mthis.evetdata[0] !== undefined) {
              if (mthis.myMap.get(mthis.evetdata[0].entity_type) === 'entity') {
                // if(mthis.evetdata[0].entity_type ==='human'||mthis.evetdata[0].entity_type==='administrative'||mthis.evetdata[0].entity_type==='organization'||mthis.evetdata[0].entity_type==='weapon') {
                // let detailId = (mthis.evetdata.length !== undefined) ? (mthis.evetdata[0].id) : (mthis.evetdata.id);
                let detailId = (mthis.evetdata[0].id)
                mthis.selectTag = detailId
                let a = []
                a.push(detailId)
                // mthis.detailData = {}
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
                  "nodeIds": a
                }).then(response => {
                  mthis.detailData = response.body.data[0]
                })
              } else if (mthis.myMap.get(mthis.evetdata[0].entity_type) === 'event') {
                let detailId = (mthis.evetdata.length !== undefined) ? (mthis.evetdata[0].id) : (mthis.evetdata.id);
                mthis.selectTag = detailId
                let detailType = 'event';
                let a = []
                a.push(detailId)
                // mthis.detailData = {}
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/event-detail/', {
                  "EventIds": a
                }).then(response => {
                  console.log('==========/event-detail/==========')
                  console.log(response)
                  if (response.body.code === 0) {
                    mthis.detailData = response.body.data[0]
                    console.log(mthis.detailData)
                    mthis.detailData.entity_type = 'event'
                    console.log(mthis.detailData)
                  } else {
                    alert('/event-detail/接口异常')
                  }
                })
              } else if (mthis.myMap.get(mthis.evetdata[0].entity_type) === 'document') {
                let detailId = (mthis.evetdata.length !== undefined) ? (mthis.evetdata[0].id) : (mthis.evetdata.id);
                mthis.selectTag = detailId
                let detailType = (mthis.evetdata.length !== undefined) ? (mthis.evetdata[0].entity_type) : (mthis.evetdata.entity_type);
                let a = []
                a.push(detailId)
                // mthis.detailData = {}
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/doc-detail/', {
                  "docIds": a
                }).then(response => {
                  mthis.detailData = response.body.data[0]
                  mthis.detailData.entity_type = 'document'
                })
              }
              mthis.xiangguan((mthis.evetdata.length !== undefined) ? (mthis.evetdata[0].id) : (mthis.evetdata.id), mthis.myMap.get(mthis.evetdata[0].entity_type))
            }
          }, 200);
        }
      }
    },
    methods: {
      checkImg(img) {
        return util.checkImgExists(img)
      },
      addXiangguanDoc(ids) {},
      addXiangguanEvent(ids) {},
      addXiangguanShiti(id) {
        var mthis = this
        mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
          "nodeIds": new Array(id)
        }).then(response => {
          let items = {
            nodes: new Array(response.body.data[0]),
            links: []
          }
          mthis.$store.commit('setAddNetNodes', items)
        })
      },
      xiangguan(id, type) {
        // alert(type)
        let a = new Array(id)
        var mthis = this
        mthis.allRelatedEntity = mthis.allRelatedEvent = mthis.allRelatedDoc = {
          nodes: [],
          links: []
        }
        mthis.xiangguanDoc = mthis.xiangguanEvent = mthis.xiangguanEntity = []
        if (type === 'event') {
          // 事件的 相关类型接口
          mthis.xiangguanEvent = []
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-event2entity/', {
            "EventIds": a,
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanEntity = response.body.data
            } else {
              alert('事件相关实体查询接口异常')
              mthis.xiangguanEntity = []
            }
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-event2doc/', {
            "EventIds": a,
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanDoc = response.body.data
            } else {
              alert('事件相关文档查询接口异常')
              mthis.xiangguanDoc = []
            }
          })
        } else if (type === 'document') {
          mthis.xiangguanDoc = []
          // 文档的 相关类型接口
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-entity/', {
            "NodeIds": a,
            "TypeLabel": "entity"
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanEntity = response.body.data
            } else {
              alert('事件相关实体查询接口异常')
              mthis.xiangguanEntity = []
            }
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-doc2event/', {
            "EventIds": a,
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanEvent = response.body.data
            } else {
              alert('文档相关事件查询接口异常')
              mthis.xiangguanEvent = []
            }
          })
        } else {
          // 实体的 相关类型接口
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-entity/', {
            "NodeIds": a,
            "TypeLabel": 'entity'
          }).then(response => {
            if (response.body.code === 0) {
              mthis.allRelatedEntity = {
                nodes: response.body.data[0].nodes,
                links: response.body.data[0].links
              }
              mthis.xiangguanEntity = response.body.data[0].Data[a[0]]
            } else {
              alert('实体相关实体接口异常')
            }
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-DocAndEvent/', {
            "NodeIds": a,
            "TypeLabel": 'event'
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanEvent = response.body.data
            } else {
              alert('实体相关事件查询接口异常')
              mthis.xiangguanEvent = []
            }
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-DocAndEvent/', {
            "NodeIds": a,
            "TypeLabel": 'document'
          }).then(response => {
            if (response.body.code == 0) {
              mthis.xiangguanDoc = response.body.data
            } else {
              alert('实体相关文档查询接口异常')
              mthis.xiangguanDoc = []
            }
          })
        }
      },
      errorImg(type) {
        if (type === 'event') {
          this.detailData.img = 'http://10.60.1.140/assets/images/event.png'
        } else if (type === 'document') {
          this.detailData.img = 'http://10.60.1.140/assets/images/content_node.png'
        } else {
          this.detailData.img = util.checkImgExists(this.detailData.img) ? (this.detailData.img) : ('http://10.60.1.140/assets/images/image_group.png')
        }
      },
      changeDetailDiv(id, type) {
        var mthis = this
        let arr = []
        arr.push(id)
        this.xiangguan(id, type)
        if (this.myMap.get(type) === 'entity') {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/entity-detail/', {
            "nodeIds": arr
          }).then(response => {
            let res = response.body.data[0]
            // res.img = 'http://10.60.1.140/assets/images/image.png'
            res.img = (response.body.data[0].img && util.checkImgExists(response.body.data[0].img)) ? response.body.data[0].img : 'http://10.60.1.140/assets/images/image.png'
            this.detailData = res
          })
          // mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related/', {
          //   "nodeIds": arr,
          //   "TypeLabel": 'entity'
          // }).then(response => {
          //   console.log('=============related entity=============')
          //   console.log(response)
          //   let arr = response.body.data[0].nodes
          //   // mthis.xiangguanEntity = response.body.data
          //   // if (response.body.code == 0 && response.body.data[0].nodes.length > 0) {
          //   //   mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-detail/', {
          //   //     "nodeIds": arr
          //   //   }).then(res => {
          //   //     console.log(res)
          //   //     mthis.xiangguanEntity = res.body.data[0].nodes
          //   //   })
          //   // } else {
          //   //   alert('相关实体查询接口异常')
          //   //   mthis.xiangguanEntity = []
          //   // }
          // })
        }
        if (this.myMap.get(type) === 'event') {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/event-detail/', {
            "EventIds": arr
          }).then(response => {
            // this.detailData = response.body.data[0]
            let res = response.body.data[0]
            res.img = (util.checkImgExists(response.body.data[0].img)) ? response.body.data[0].img : 'http://10.60.1.140/assets/images/image.png'
            this.detailData = res
            this.detailData.entity_type = 'event'
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-DocAndEvent/', {
            "NodeIds": arr,
            "TypeLabel": 'event'
          }).then(response => {
            console.log('=============related event=============')
            console.log(response)
          })
        }
        if (this.myMap.get(type) === 'document') {
          mthis.$http.post(this.$store.state.ipConfig.api_url + '/doc-detail/', {
            "docIds": arr
          }).then(response => {
            let res = response.body.data[0]
            res.img = (util.checkImgExists(response.body.data[0].img)) ? response.body.data[0].img : 'http://10.60.1.140/assets/images/image.png'
            this.detailData = res
            mthis.detailData.entity_type = 'document'
          })
          mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-DocAndEvent/', {
            "NodeIds": arr,
            "TypeLabel": 'document'
          }).then(response => {
            console.log('=============related doc=============')
            console.log(response)
          })
        }
        this.selectTag = id
      }
    }
  }
</script>
<style>
  .flexDiv {
    display: flex;
  }
  .event-title {
    width: 90%;
    height: 28px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow: ellipsis;
  }
  .event-content {
    height: 20px;
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
    flex-wrap: nowrap;
    display: flex;
    overflow-y: hidden;
  }
  .e-title {
    height: 30px;
    background-color: rgba(51, 255, 255, 0.2);
    border-top: solid 1px #366674;
    border-bottom: solid 1px #366674;
    display: flex;
  }
  .e-title-p {
    height: 18px;
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .e-title-d {
    width: 4px;
    height: 16px;
    background-color: #009999;
    margin: 6px 6px;
  }
  .e-content {
    background-color: rgba(0, 0, 0, 0.05);
  }
  .buttonD {
    height: 20px;
    min-width: 20px;
    margin: 0px 10px;
    opacity: 0;
    float: right;
    background-color: rgba(0, 0, 0, 0) !important;
    position: relative;
  }
  .e-content-p {
    /* height: 14px; */
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    white-space: nowrap;
    min-width: 5em;
    max-width: 70%;
    width: 70%;
  }
  .wspace {
    white-space: nowrap;
  }
  .e-content-p-c {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: auto;
    max-width: 70%;
    white-space: nowrap;
    width: 70%;
  }
  .e-content-d,
  .e-content-d-dis {
    padding: 0 0 0 18px;
    display: flex;
    height: auto;
    min-height: 30px;
    position: relative;
  }
  .w100 {
    width: 100%;
  }
  .w5em {
    width: 5em;
    min-width: 5em;
    margin: 0;
  }
  .mxw30 {
    max-width: 30%;
    width: 30%;
  }
  .mxw60 {
    max-width: 60%;
    width: 60%;
  }
  .mxw70 {
    max-width: 70%;
    width: 70%;
  }
  .e-content-d:hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .shuxingDiv>.e-content-d:hover .buttonD {
    opacity: 1;
  }
  .flexDiv:hover .buttonD {
    opacity: 1;
  }
  .e-content div:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .e-content div:nth-child(even) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .selectDiv {
    position: absolute;
    /* bottom: 0; */
    width: 100%;
  }
  .selectEdiv {}
  .pointIcon {
    cursor: pointer;
  }
  .bstyle:hover {
    color: rgba(51, 255, 255, 0.8) !important;
  }
  .selectedTag {
    /* color:red !important;
                                          background-color: blue !important; */
    /* opacity: 0.5 !important; */
    background-color: rgba(51, 255, 255, 0.5) !important;
    ;
  }
</style>

