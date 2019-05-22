<template>
<div>
    <Collapse simple v-model="value1" id='nodeAttr' :style="{height:entDivH}" class='scrollBarAble'>
        <panel name="1">
            <span>实体属性</span>
            <div slot="content" class="tableLine">
                <div class="econtent allowWrap" v-if='tableData.location_map'>
                    <div v-if="typeof(tableData.location_map) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">地图</p>
                        <p class="econtentp">{{tableData.location_map}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.location_map_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.location_map) === 'object'" v-for="(item,index) in tableData.location_map">
                        <p class="econtentp w5em" v-if="index==0">地图</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.location_map_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.image'>
                    <div v-if="typeof(tableData.image) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">地标</p>
                        <p class="econtentp" :title="tableData.image">{{tableData.image}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.image_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.image) === 'object'" v-for="(item,index) in tableData.image">
                        <p class="econtentp w5em" v-if="index==0">地标</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.image_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.description'>
                    <div v-if="typeof(tableData.description) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">描述</p>
                        <p class="econtentp">{{tableData.description}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.description_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.description) === 'object'" v-for="(item,index) in tableData.description">
                        <p class="econtentp w5em" v-if="index==0">描述</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.description_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.official_name'>
                    <div v-if="typeof(tableData.official_name) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">全名</p>
                        <p class="econtentp">{{tableData.official_name}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_name_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_name) === 'object'" v-for="(item,index) in tableData.official_name">
                        <p class="econtentp w5em" v-if="index==0">全名</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_name_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.name_in_native_language'>
                    <div v-if="typeof(tableData.name_in_native_language) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">母语名</p>
                        <p class="econtentp">{{tableData.name_in_native_language}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.name_in_native_language_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.name_in_native_language) === 'object'" v-for="(item,index) in tableData.name_in_native_language">
                        <p class="econtentp w5em" v-if="index==0">母语名</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.name_in_native_language_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.replaces'>
                    <div v-if="typeof(tableData.replaces) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">曾用名</p>
                        <p class="econtentp">{{tableData.replaces}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.replaces_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.replaces) === 'object'" v-for="(item,index) in tableData.replaces">
                        <p class="econtentp w5em" v-if="index==0">曾用名</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.replaces_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.replaces_by'>
                    <div v-if="typeof(tableData.replaces_by) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">现用名</p>
                        <p class="econtentp">{{tableData.replaces_by}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.replaces_by_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.replaces_by) === 'object'" v-for="(item,index) in tableData.replaces_by">
                        <p class="econtentp w5em" v-if="index==0">现用名</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.replaces_by_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.nickname'>
                    <div v-if="typeof(tableData.nickname) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">昵称</p>
                        <p class="econtentp">{{tableData.nickname}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.nickname_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.nickname) === 'object'" v-for="(item,index) in tableData.nickname">
                        <p class="econtentp w5em" v-if="index==0">昵称</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.nickname_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.short_name'>
                    <div v-if="typeof(tableData.short_name) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">简称</p>
                        <p class="econtentp">{{tableData.short_name}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.short_name_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.short_name) === 'object'" v-for="(item,index) in tableData.short_name">
                        <p class="econtentp w5em" v-if="index==0">简称</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.short_name_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.inception'>
                    <div v-if="typeof(tableData.inception) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">建立时间</p>
                        <p class="econtentp">{{tableData.inception}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.inception_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.inception) === 'object'" v-for="(item,index) in tableData.inception">
                        <p class="econtentp w5em" v-if="index==0">建立时间</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.inception_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.capital'>
                    <div v-if="typeof(tableData.capital) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">首府</p>
                        <p class="econtentp">{{tableData.capital}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.capital_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.capital) === 'object'" v-for="(item,index) in tableData.capital">
                        <p class="econtentp w5em" v-if="index==0">首府</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.capital_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.head_of_state'>
                    <div v-if="typeof(tableData.head_of_state) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">国家元首</p>
                        <p class="econtentp">{{tableData.head_of_state}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_state_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.head_of_state) === 'object'" v-for="(item,index) in tableData.head_of_state">
                        <p class="econtentp w5em" v-if="index==0">国家元首</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_state_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.head_of_government'>
                    <div v-if="typeof(tableData.head_of_government) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">政府首脑</p>
                        <p class="econtentp">{{tableData.head_of_government}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_government_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.head_of_government) === 'object'" v-for="(item,index) in tableData.head_of_government">
                        <p class="econtentp w5em" v-if="index==0">政府首脑</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_government_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.office_held_by_head_of_government'>
                    <div v-if="typeof(tableData.office_held_by_head_of_government) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">政府机构</p>
                        <p class="econtentp">{{tableData.office_held_by_head_of_government}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.office_held_by_head_of_government_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.office_held_by_head_of_government) === 'object'" v-for="(item,index) in tableData.office_held_by_head_of_government">
                        <p class="econtentp w5em" v-if="index==0">政府机构</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.office_held_by_head_of_government_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.head_of_government'>
                    <div v-if="typeof(tableData.head_of_government) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">政府首长</p>
                        <p class="econtentp">{{tableData.head_of_government}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_government_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.head_of_government) === 'object'" v-for="(item,index) in tableData.head_of_government">
                        <p class="econtentp w5em" v-if="index==0">政府首长</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.head_of_government_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.legislative_body'>
                    <div v-if="typeof(tableData.legislative_body) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">立法机构</p>
                        <p class="econtentp">{{tableData.legislative_body}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.legislative_body_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.legislative_body) === 'object'" v-for="(item,index) in tableData.legislative_body">
                        <p class="econtentp w5em" v-if="index==0">立法机构</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.legislative_body_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.executive_body'>
                    <div v-if="typeof(tableData.executive_body) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">执行政府</p>
                        <p class="econtentp">{{tableData.executive_body}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.executive_body_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.executive_body) === 'object'" v-for="(item,index) in tableData.executive_body">
                        <p class="econtentp w5em" v-if="index==0">执行政府</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.executive_body_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.highest_judicial_authority'>
                    <div v-if="typeof(tableData.highest_judicial_authority) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">最高司法机关</p>
                        <p class="econtentp">{{tableData.highest_judicial_authority}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.highest_judicial_authority_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.highest_judicial_authority) === 'object'" v-for="(item,index) in tableData.highest_judicial_authority">
                        <p class="econtentp w5em" v-if="index==0">最高司法机关</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.highest_judicial_authority_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.continent'>
                    <div v-if="typeof(tableData.continent) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">所属大陆</p>
                        <p class="econtentp">{{tableData.continent}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.continent_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.continent) === 'object'" v-for="(item,index) in tableData.continent">
                        <p class="econtentp w5em" v-if="index==0">所属大陆</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.continent_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.country'>
                    <div v-if="typeof(tableData.country) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">所属国家</p>
                        <p class="econtentp">{{tableData.country}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.country_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.country) === 'object'" v-for="(item,index) in tableData.country">
                        <p class="econtentp w5em" v-if="index==0">所属国家</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.country_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.area'>
                    <div v-if="typeof(tableData.area) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">面积</p>
                        <p class="econtentp">{{tableData.area}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.area_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.area) === 'object'" v-for="(item,index) in tableData.area">
                        <p class="econtentp w5em" v-if="index==0">面积</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.area_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.located_in_or_next_to_body_of_water'>
                    <div v-if="typeof(tableData.located_in_or_next_to_body_of_water) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">水域</p>
                        <p class="econtentp">{{tableData.located_in_or_next_to_body_of_water}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.located_in_or_next_to_body_of_water_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.located_in_or_next_to_body_of_water) === 'object'" v-for="(item,index) in tableData.located_in_or_next_to_body_of_water">
                        <p class="econtentp w5em" v-if="index==0">水域</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.located_in_or_next_to_body_of_water_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.population'>
                    <div v-if="typeof(tableData.population) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">人口</p>
                        <p class="econtentp">{{tableData.population}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.population_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.population) === 'object'" v-for="(item,index) in tableData.population">
                        <p class="econtentp w5em" v-if="index==0">人口</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.population_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.GDP'>
                    <div v-if="typeof(tableData.GDP) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">GDP</p>
                        <p class="econtentp">{{tableData.GDP}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.GDP_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.GDP) === 'object'" v-for="(item,index) in tableData.GDP">
                        <p class="econtentp w5em" v-if="index==0">GDP</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.GDP_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.local_dialing_code'>
                    <div v-if="typeof(tableData.gini_coefficient) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">基尼系数</p>
                        <p class="econtentp">{{tableData.gini_coefficient}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.gini_coefficient_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.gini_coefficient) === 'object'" v-for="(item,index) in tableData.gini_coefficient">
                        <p class="econtentp w5em" v-if="index==0">基尼系数</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.gini_coefficient_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.Human_Development_Index'>
                    <div v-if="typeof(tableData.Human_Development_Index) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">人类发展指数</p>
                        <p class="econtentp">{{tableData.Human_Development_Index}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.Human_Development_Index_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.Human_Development_Index) === 'object'" v-for="(item,index) in tableData.Human_Development_Index">
                        <p class="econtentp w5em" v-if="index==0">人类发展指数</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.Human_Development_Index_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.contains_administrative_territorial_entity'>
                    <div v-if="typeof(tableData.contains_administrative_territorial_entity) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">下属地区</p>
                        <p class="econtentp">{{tableData.contains_administrative_territorial_entity}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.contains_administrative_territorial_entity_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.contains_administrative_territorial_entity) === 'object'" v-for="(item,index) in tableData.contains_administrative_territorial_entity">
                        <p class="econtentp w5em" v-if="index==0">下属地区</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.contains_administrative_territorial_entity[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.diplomatic_relation'>
                    <div v-if="typeof(tableData.diplomatic_relation) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">邦交国家</p>
                        <p class="econtentp">{{tableData.diplomatic_relation}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.diplomatic_relation_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.diplomatic_relation) === 'object'" v-for="(item,index) in tableData.diplomatic_relation">
                        <p class="econtentp w5em" v-if="index==0">邦交国家</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.diplomatic_relation_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.twinned_administrative_body'>
                    <div v-if="typeof(tableData.twinned_administrative_body) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">友好城市</p>
                        <p class="econtentp">{{tableData.twinned_administrative_body}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.twinned_administrative_body_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.twinned_administrative_body) === 'object'" v-for="(item,index) in tableData.twinned_administrative_body">
                        <p class="econtentp w5em" v-if="index==0">友好城市</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.twinned_administrative_body_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.shares_border_with'>
                    <div v-if="typeof(tableData.shares_border_with) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">接壤于</p>
                        <p class="econtentp">{{tableData.shares_border_with}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.shares_border_with_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.shares_border_with) === 'object'" v-for="(item,index) in tableData.shares_border_with">
                        <p class="econtentp w5em" v-if="index==0">邦交国家</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.shares_border_with_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.located_in_time_zone'>
                    <div v-if="typeof(tableData.located_in_time_zone) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">时区</p>
                        <p class="econtentp">{{tableData.located_in_time_zone}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.located_in_time_zone_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.located_in_time_zone) === 'object'" v-for="(item,index) in tableData.located_in_time_zone">
                        <p class="econtentp w5em" v-if="index==0">时区</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.located_in_time_zone_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.coordinate_location'>
                    <div v-if="typeof(tableData.coordinate_location) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">坐标</p>
                        <p class="econtentp" :title="tableData.coordinate_location">{{tableData.coordinate_location}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.coordinate_location_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.coordinate_location) === 'object'" v-for="(item,index) in tableData.coordinate_location">
                        <p class="econtentp w5em" v-if="index==0">坐标</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.coordinate_location_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.local_dialing_code'>
                    <div v-if="typeof(tableData.local_dialing_code) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">电话区号</p>
                        <p class="econtentp">{{tableData.local_dialing_code}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.local_dialing_code_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.local_dialing_code) === 'object'" v-for="(item,index) in tableData.local_dialing_code">
                        <p class="econtentp w5em" v-if="index==0">电话区号</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.local_dialing_code_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.postal_code'>
                    <div v-if="typeof(tableData.postal_code) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">邮编</p>
                        <p class="econtentp">{{tableData.postal_code}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.postal_code_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.postal_code) === 'object'" v-for="(item,index) in tableData.postal_code">
                        <p class="econtentp w5em" v-if="index==0">邮编</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.postal_code_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.top_level_Internet_domain'>
                    <div v-if="typeof(tableData.top_level_Internet_domain) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">顶级域名</p>
                        <p class="econtentp">{{tableData.top_level_Internet_domain}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.top_level_Internet_domain_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.top_level_Internet_domain) === 'object'" v-for="(item,index) in tableData.top_level_Internet_domain">
                        <p class="econtentp w5em" v-if="index==0">顶级域名</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.top_level_Internet_domain[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
                <div class="econtent allowWrap" v-if='tableData.official_website'>
                    <div v-if="typeof(tableData.official_website) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">官网</p>
                        <p class="econtentp">{{tableData.official_website}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_website_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.official_website) === 'object'" v-for="(item,index) in tableData.official_website">
                        <p class="econtentp w5em" v-if="index==0">官网</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.official_website_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>

                <div class="econtent allowWrap" v-if='tableData.office_blog'>
                    <div v-if="typeof(tableData.office_blog) !== 'object'" :style="{display:'flex'}">
                        <p class="econtentp w5em">博客</p>
                        <p class="econtentp">{{tableData.office_blog}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.office_blog_ids,'entity','')" size='small'></Button>
                        </div>
                    </div>
                    <div :style="{display:'flex',width:'100%  '}" v-if="typeof(tableData.office_blog) === 'object'" v-for="(item,index) in tableData.office_blog">
                        <p class="econtentp w5em" v-if="index==0">博客</p>
                        <p class="econtentp w5em" v-else>&nbsp;</p>
                        <p class="econtentp" :title="item">{{item}}</p>
                        <div class="eButton">
                            <Button class='bstyle' shape="circle" icon="icon iconfont icon-match-search" @click="addSingleNodeToCanvans(tableData.office_blog_ids[index],'entity','')" size='small'></Button>
                        </div>
                    </div>
                </div>
            </div>
        </panel>
        <!-- ============================================相关实体================================================== -->
        <panel name="2">
            <span>相关实体</span>
            <div slot="content" class="tableLine">
                <div class="econtent" v-if='xiangguanEntityItems.length>0' v-for="items in xiangguanEntityItems">
                    <p class="econtentp w5em">{{items.relation}}</p>
                    <p class="econtentp">{{items.name}}</p>
                    <div class="eButton">
                        <Button class='bstyle' shape="circle" icon="icon iconfont icon-tianjia" size='small' @click="addSingleNodeToCanvans(items.id,'entity','')"></Button>
                    </div>
                </div>
                <div class="econtent" v-if='xiangguanEntityItems.length ==0'>
                    <p class="econtentp" v-show="spinWaiting">相关实体加载中···</p>
                    <p class="econtentp" v-show="!spinWaiting">暂无相关实体</p>
                </div>
            </div>
        </panel>
        <!-- ============================================相关事件================================================== -->
        <panel name="3">
            <span>相关事件</span>
            <div slot="content" class="tableLine">
                <div class="econtent" v-if='xiangguanEvent.statistics&&xiangguanEvent.statistics.length>0' v-for='items in xiangguanEvent.statistics'>
                    <!-- <p class="econtentp w5em">{{myMap1.get(items.type.toLowerCase().replace(/-/, "_")).name}}</p> -->
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
                    <p class="econtentp w5em">{{items.type}}</p>
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
            myMap1: new Map(),
            myMap: new Map()

        }
    },
    props: ['tableData', 'entDivH','tableType'],
    // created() {
    //   var mthis = this
    //   mthis.xiangguanEntityItems = new Array()
    //   mthis.xiangguanEntitys = new Object()
    //   mthis.xiangguanEvent = new Array()
    //   mthis.xiangguanDoc = new Array()

    //   var ob = configer.loadxmlDoc(mthis.$store.state.ipConfig.xml_url + "/dictionary.xml");
    //   var eventNames = ob.getElementsByTagName("eventNames");
    //   mthis.myMap1 = new Map();
    //   for(let eventNameitem of eventNames) {
    //     for(let items of eventNameitem.children){
    //       mthis.myMap1.set(items.getElementsByTagName('ename')[0].textContent, {name:items.getElementsByTagName('chname')[0].textContent,img:items.getElementsByTagName('img')[0].textContent})
    //     }
    //   }
    //   var ob1 = configer.loadxmlDoc(this.$store.state.ipConfig.xml_url + "/entityTypeTable.xml");
    //   var entityMainType = ob1.getElementsByTagName("entityMainType");
    //   mthis.myMap = new Map();
    //   for (var i = 0; i < entityMainType.length; i++) {
    //     let typeName = entityMainType[i].children[0].textContent;
    //     let typeChild = []
    //     for (var n = 0; n < entityMainType[i].children[1].children.length; n++) {
    //       mthis.myMap.set(entityMainType[i].children[1].children[n].textContent, typeName)
    //     }
    //   }
    // },
    created() {
        let mthis = this
        mthis.xiangguanEntityItems = new Array()
        mthis.xiangguanEntitys = new Object()
        mthis.xiangguanEvent = new Array()
        mthis.xiangguanDoc = new Array()
        mthis.spinWaiting = true
        if (this.tableType === 'administrative') {

            if (this.tableData.isArray) {
                if (this.tableData.length > 0) {
                    mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
                        "NodeIds": mthis.tableData.map(item => {
                            return item.id
                        }),
                        // "NodeTypes": mthis.tableData.map(item => {
                        //     return item.entity_type
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
    // beforeDestroy(){
    //   this.tableData= new Object()
    // },
    methods: {
        addSingleNodeToCanvans(id, type, subType) {
            // ;
            // console.log('this.tableData')
            // console.log(this.tableData)
            var mthis = this
            if (type === 'entity') {
                mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/entity-info/', {
                    "nodeIds": id
                }).then(response => {
                    // console.log(response)
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
    watch: {
        tableData: function () {
            // // console.log('===========custom_event_humanEntityTable --------tableData')
            // // console.log(this.tableData)
            let mthis = this
            mthis.spinWaiting = true
            mthis.xiangguanEntityItems = new Array()
            mthis.xiangguanEntitys = new Object()
            mthis.xiangguanEvent = new Array()
            mthis.xiangguanDoc = new Array()
            if (this.tableType === 'administrative') {
            if (this.tableData.isArray) {
                if (this.tableData.length > 0) {
                    mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/related-all/', {
                        "NodeIds": mthis.tableData.map(item => {
                            return item.id
                        }),
                        // "NodeTypes": mthis.tableData.map(item => {
                        //     return item.entity_type
                        // }),
                        "TypeLabel": "all"
                    }).then(response => {

                    })
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
                // mthis.spinWaiting = false
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
                })
            }
            mthis.spinWaiting = false
        }
    }}
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

.tableLine>.econtent:hover>.eButton {
    opacity: 1;
}

.eButton {
    opacity: 0;
}
</style>
