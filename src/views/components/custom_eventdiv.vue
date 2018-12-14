<template>
  <div :style="{fontSize: '18px',height:viewHeight}">
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0'}">
        <Tabs>
          <Tab-pane label="数据透视" :style="{fontSize: '18px',height:viewHeight}" id='toushi'>
              <Collapse simple class="toushiItems" accordion>
                <panel v-for="(StatisticsType,index) in dataStatistics"><span style="font-size: 10px;">{{statisticsNameList[StatisticsType.name] + "(" + StatisticsType.num + ")"}}</span>
                  <div slot="content">
                  <collapse accordion simple>
                    <panel v-for="StatisticsItem in StatisticsType.child" :hide-arrow="(StatisticsItem.child === undefined)">
                      <span style="font-size: 10px;">{{statisticsNameList[StatisticsItem.name]}}</span>
                      <percentBar :num="StatisticsItem.per" :count="StatisticsItem.count" :index='index'></percentBar>
                      <div slot="content">
                        <collapse accordion simple>
                          <panel v-for="lastStatisticsItem in StatisticsItem.child" :hide-arrow='true'>
                            <span style="width:2em" />
                            <span style="font-size: 10px;padding-left:30px">{{statisticsNameList[lastStatisticsItem.name]}}</span>
                            <percentBar :num="lastStatisticsItem.per" :count="lastStatisticsItem.count" :index='index'></percentBar>
                          </panel>
                        </collapse>
                      </div>
                    </panel>
                  </collapse>
                  </div>
                </panel>
              </Collapse>
            <!-- <div v-for="object in dataStatisticsEvent">
              <Collapse simple class="toushiItems" accordion >
                <Panel name="1" :style='{borderBottom:"1px solid rgba(51,255,255,.5)"}'>
                  {{object.name}}({{object.num}})
                      <div v-for="(obj,index) in object.child" :style="{marginLeft:'10px'}" slot="content">
                      <Collapse simple>
                        <Panel :name="index">
                          {{obj.name}}({{obj.count}})
                        </Panel>
                      </Collapse>
                    </div>
                </Panel>
              </Collapse>
            </div> -->
          </Tab-pane>
          <Tab-pane label="目标详情" v-if="$store.state.tmss === 'net'" :style="{fontSize: '18px',height:viewHeight}" id='mubiaoxiangqing'>
            <div>
              <Row type="flex" justify="start" class="code-row-bg" :style="{margin:'0',padding:'0'}" v-show="!singlePerson">
                <div :style="{borderBottom:'0px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',width:'100%'}" style="cursor:default">
                  <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                    <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> 数据实体(<span v-if="selectNetNodes != null&&selectNetNodes[0]!==undefined">{{selectNetNodes[0].ids.length}}</span>)
                    <i class="icon iconfont icon-more" style="float:right"></i>
                  </p>
                </div>
                <div class="p-collapse-modal" :style="{width:'100%'}" v-for="data in evetdata" @click="detail(data.id)">{{data.name}}
                  <p class="p-collapse-modal-small">{{data.type}}</p>
                </div>
              </Row>
              <Card dis-hover style="width:100%,background-color:rgba(0,0,0,0);" :style="{overflowY:'scroll',height:eventheight}" v-show="singlePerson" v-if="evetdata!== undefined && evetdata!==null">
                <Row type="flex" justify="end">
                  <Icon class="cardIcon icon iconfont icon-fangda process-img DVSL-bar-btn DVSL-bar-btn-back" size="20" @click="detail(evetdata.id)" />
                </Row>
                <div :style="{padding:'0 5px'}">
                  <Row type="flex" justify="center">
                    <span class="infoTitle">{{evetdata.name}}</span>
                  </Row>
                  <Row type="flex" justify="center" :style="{margin:'5px 0 '}">
                    <Avatar class="circle-img" icon="ios-person" :style="{width:'50px',height:'50px'}" v-if="evetdata.img==''" />
                    <Avatar class="circle-img" v-else :src="evetdata.img" :style="{width:'50px',height:'50px'}" />
                  </Row>
                  <Row type="flex" justify="center" v-if="evetdata.type === 'human'">
                    <Col span="8">
                    <span class="content_header">中文名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.name_in_chinese}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">类型</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.type}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">全名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.birth_name}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">外⽂名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.name_in_native_language}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">昵称</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.nickname}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">出⽣</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.date_of_birth}} - {{evetdata.date_of_death}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">失踪</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.date_of_disappearance}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">出⽣地</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.place_of_birth}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">国籍</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.country_of_citizenship}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⺠族</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.ethic_group}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">信仰</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.religion}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">职业</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.occupation}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">军衔</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.military_rank}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">军种</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.military_branch}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">政党</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.member_of_political_party}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">组织</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.member_of}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">雇主</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.employer}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">荣誉</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.award_received}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">学习经历</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.educated_at}}</span>
                    </Col>
                    <Col span="16" offset="8">
                    <span class="content_value">{{evetdata.academic_degree}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⼯作经历</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.position_held}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⽗亲</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.father}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⺟亲</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.mother}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">配偶</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.spouse}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⼦⼥</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.child}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">兄弟姐妹</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.sibling}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">邮箱</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">
                                    <a :href="evetdata.e_mail" slot="extra">{{evetdata.e_mail}}</a>
                                  </span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">博客</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">
                                    <a :href="evetdata.official_blog" slot="extra">{{evetdata.official_blog}}</a>
                                  </span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">官⽹</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">
                                    <a :href="evetdata.official_website" slot="extra">{{evetdata.official_website}}</a>
                                  </span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">简介</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.summary}}</span>
                    </Col>
                  </Row>
                  <!-- 组织实体 -->
                  <Row type="flex" justify="center" v-if="evetdata.type === 'organization'">
                    <Col span="8">
                    <span class="content_header">描述</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.description}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">外⽂名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.native_label}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">简称</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.short_name}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">总部</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.headquarters_location}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">成⽴</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.inception}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">创办者</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.founded_by}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">领袖</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.chairperson}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⾸席执⾏官</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.chief_executive_officer}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">成员</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.member_count}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">员⼯数</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.employees}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">意识形态</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.political_ideology}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">业务部⻔</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.business_division}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">上级部⻔</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.parent_organization}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">下级部⻔</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.subsidiary}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">官⽹</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value"><a :href="evetdata.official_website" slot="extra">{{evetdata.official_website}}</a></span>
                    </Col>
                  </Row>
                  <!-- 国家实体 -->
                  <Row type="flex" justify="center" v-if="evetdata.type === 'administrative'">
                    <Col span="8">
                    <span class="content_header">描述</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.description}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">全名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.official_name}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">外⽂名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.name_in_native_language}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">简称</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.short_name}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">国家元⾸</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.head_of_state}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">政府⾸脑</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.head_of_government}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">位于</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.continent}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⾯积</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.area}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⼈⼝</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.population}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">GDP</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.GDP}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">基尼系数</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.gini_coefficient}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">⼈类发展指数</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.Human_Development_Index}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">接壤国家</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">{{evetdata.shares_border_with}}</span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">顶级域名</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value"><a :href="evetdata.top_level_Internet_domain" slot="extra">{{evetdata.top_level_Internet_domain}}</a></span>
                    </Col>
                    <Col span="8">
                    <span class="content_header">官⽹</span>
                    </Col>
                    <Col span="16">
                    <span class="content_value">
                                    <a :href="evetdata.official_website" slot="extra">{{evetdata.official_website}}</a>
                                  </span>
                    </Col>
                  </Row>
                </div>
              </Card>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
      <modal-chart-detail :nodeId='modalNodeId' :flag='detailModalFlag' @detailModalFlag='setFlagToFalse'></modal-chart-detail>
    </div>
    </Col>
  </div>
</template>
<script>
  import modalChartDetail from './custom_modal_detail'
  import percentBar from './custom_percentBar'
  import { mapState,mapMutations } from 'vuex'
  /* eslint-disable */
  export default {
    data() {
      return {
        modalNodeId: '',
        statisticsNameList:{
          'entity':'实体',
          'human':'人物',
          'politician':'政治人物',
          'administrative':'管理',
          'organization':'机构',
          'political party':'政党',
          'else':'其他'
        },
        evetdata: null,
        detailModalFlag: false,
        dataStatistics:[],
        value4: '1-1',
        myList: [{
          name: 'aaaaa',
          img: 'https://img3.doubanio.com/view/celebrity/s_ratio_celebrity/public/p230.webp',
          url: 'www.baidu.com'
        }],
        colorMap: [
          '#33cc99',
          '#33cccc',
          '#3399ff'
        ],
        detail_data: null,
        show: [],
        value3: '1',
                value4: '1-1',
        eheight: 0,
        eventheightdiv: 0,
        eventheight: 0,
        closable: true,
        infos: [{
            name: "普京",
            img: "https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg",
            country: '俄罗斯',
            org: '俄罗斯联邦',
            spouse: '柳德米拉·什克列布涅娃',
            school: '列宁格勒国立大学',
            tag: '俄罗斯联邦政府总统／ 俄罗斯第2任总统／第7届俄罗斯总理／第11届俄罗斯总理',
            introduction: `弗拉基米尔·弗拉基米罗维奇·普京，俄罗斯第2任、第4任总统。曾担任俄罗斯总理、统一俄罗斯党主席、俄白联盟部长会议主席。
                2000年执政以来，普京致力于复兴俄罗斯超级大国地位，对内加强联邦政府的权力，整顿经济秩序，打击金融寡头，加强军队建设；对外努力改善国际环境…
                恢复了世界性强国地位。`
          },
          {
            name: "习近平",
            img: "https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=468864cdf0039245b5b8e95de6fdcfa7/54fbb2fb43166d22ca0c87944a2309f79052d2b3.jpg",
            country: '中华人名共和国',
            org: '中华人名共和国',
            spouse: '彭丽媛',
            school: '清华大学人文社会学院马克思主义理论与思想政治教育专业',
            tag: '现任中国共产党中央委员会总书记、中共中央军事委员会主席、中华人民共和国主席、中华人民共和国中央军事委员会主席',
            introduction: `953年6月生，陕西富平人，1969年1月参加工作，1974年1月加入中国共产党，清华大学人文社会学院马克思主义理论与思想政治教育专业毕业，在职研究生学历，法学博士学位。
                现任中国共产党中央委员会总书记，中共中央军事委员会主席，中华人民共和国主席，中华人民共和国中央军事委员会主席。
                中共第十五届中央候补委员，十六届、十七届、十八届、十九届中央委员，十七届中央政治局委员、常委、中央书记处书记，十八届、十九届中央政治局委员、常委、中央委员会总书记。第十一届全国人大第一次会议当选为中华人民共和国副主席。十七届五中全会增补为中共中央军事委员会副主席。第十一届全国人大常委会第十七次会议任命为中华人民共和国中央军事委员会副主席。十八届一中全会任中共中央军事委员会主席。第十二届全国人大第一次会议当选为中华人民共和国主席、中华人民共和国中央军事委员会主席`
          }
        ]
      };
    },
    components: {
      modalChartDetail,
      percentBar
    },
    // computed: {
      //   menuitemClasses: function() {
        //     return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    //   }
    // },
    computed:mapState (['selectNetNodes', 'singlePerson', 'viewHeight', 'dataStatisticsEvent']),
    watch: {
      dataStatisticsEvent: function() {
        var mthis = this;
        mthis.dataStatistics = mthis.dataStatisticsEvent.data;
      },
      eventheightdiv: function() {
        this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      },
      selectNetNodes: function(va) {
        var mthis = this;
        if (mthis.timer) {
          clearTimeout(mthis.timer)
        }
        mthis.timer = setTimeout(function() {
          let nodeIdsArry = va[0].ids.map(item => {
            return item.id;
          });
          // 新增防抖功能
          mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
            'nodeIds': nodeIdsArry
          }).then(response => {
            mthis.evetdata = mthis.singlePerson?response.body.data[0].nodes[0]:response.body.data[0].nodes
            console.log(mthis.evetdata)
            // mthis.evetdata = response.data.data[0].nodes
          })
        }, 100);
        // let qu = (mthis.singlePerson) ? mthis.selectNetNodes[0].ids[0] : mthis.selectNetNodes[0].ids
        // mthis.evetdata = 
      }
    },
    methods: {
      setFlagToFalse(detailModalFlag){
        var mthis = this;
        mthis.detailModalFlag = detailModalFlag;
      },
      changeLimit() {
        // function getArrayItems(arr, num) {
        //     const temp_array = [];
        //     for (let index in arr) {
        //         temp_array.push(arr[index]);
        //     }
        //     const return_array = [];
        //     for (let i = 0; i<num; i++) {
        //         if (temp_array.length>0) {
        //             const arrIndex = Math.floor(Math.random()*temp_array.length);
        //             return_array[i] = temp_array[arrIndex];
        //             temp_array.splice(arrIndex, 1);
        //         } else {
        //             break;
        //         }
        //     }
        //     return return_array;
        return this.myList
        // }
        // this.randomMovieList = getArrayItems(this.myList, 5);
      },
      look() {
        // let mthis = this
        // mthis.singlePerson = false
      },
      detail(id) {
        var mthis = this
        mthis.modalNodeId = id
        let nodeIdsArry = []
        nodeIdsArry.push(id)
        mthis.$http.post('http://10.60.1.140:5001/node-datas/', {
          'nodeIds': nodeIdsArry
        }).then(response => {
          mthis.selectNetNodes = response.body.data[0].nodes[0]
          mthis.detailModalFlag = true
        })
        //查询详细信息
      }
    },
    // props: ['dataExpand', 'singlePerson', 'eventheightdiv', 'dataStatisticsEvent'],
    mounted() {
      var mthis = this;
      window.onresize = function() {
        this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
        this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      };
      this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      this.eventheightdiv = document.documentElement.clientHeight - 64 - 10 + "px";
      this.eheight = this.eventheightdiv - 32 - 16 + 'px'
      this.changeLimit()
    }
  };
</script>
<style scoped>
  .ivu-card {
    background-color: rgba(0, 0, 0, 0) !important;
    background: rgba(0, 0, 0, 0) !important;
  }
  .infoTitle {
    font-family: MicrosoftYaHei;
    font-size: 20px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    margin-bottom: 10px;
  }
  .ivu-tabs-nav {
    background-color: rgba(0, 0, 0, 0) !important;
  }
</style>

<style>
#toushi>.toushiItems>.ivu-collapse-item>.ivu-collapse-content>.ivu-collapse-content-box>div>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-header>i{
  margin-left:10px
}
  .content_header {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .content_value {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    text-overflow: ellipsis;
  }
  .ivu-card-body>.ivu-row-flex-end {
    float: right;
  }
  .ivu-avatar>* {
    line-height: 50px !important;
    width: 50px !important;
  }
  .ivu-card-head {
    border-bottom-width: 0 !important;
  }
  .ivu-card-body {
    margin: 10px !important;
  }
  .pfront {
    width: 36px;
    height: 17px;
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .infoKey {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
    /* min-width: 30px; */
    padding-left: 10px;
  }
  .infoValue {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
    /* min-width: 200px; */
    padding-right: 20px;
  }
  .infoName {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 26px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .infoTitle {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .cardIcon {
    float: right !important;
  }
  /* 环内文字 */
  .demo-Circle-inner {
    font-family: PARaDOS !important;
    font-size: 14px !important;
    font-weight: normal !important;
    font-stretch: normal !important;
    line-height: 20px !important;
    letter-spacing: 0px !important;
    color: #ccffff !important;
    opacity: 0.5;
  }
  .circle-img {
    border-radius: 50% !important;
  }
  .ivu-collapse{
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
    color: #cff !important;
  }
  .ivu-collapse-header span{
    font-size: 14px !important;
  }
  .ivu-collapse-content-box>.ivu-collapse{
    margin: 5px 0 !important;
  }
  #toushi>.ivu-collapse>.ivu-collapse-item>.ivu-collapse-content,
  .toushiItems,
  .toushiItems>.ivu-collapse-item-active>.ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0) !important;
    /* border-bottom: 1px solid rgba(51,255,255,0.5) !important; */
  }
  #toushi>.ivu-collapse,
  .toushiItems>.ivu-collapse {
    background-color: rgba(0, 0, 0, 0) !important;
    border: none !important;
  }
  .collapse_bg {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  #toushi .ivu-collapse-content-box p {
    font-size: 12px !important;
  }
  .ivu-collapse-item-active>.ivu-collapse-content {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  .ivu-collapse>.ivu-collapse-item {
    border: none !important;
  }
  .ivu-collapse-item {
    background-color: rgba(0, 0, 0, 0) !important;
  }
  #toushi {
    overflow-y: scroll;
  }
</style>
