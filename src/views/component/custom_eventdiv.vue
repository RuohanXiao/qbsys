<template>
  <div>
    <Col>
    <div>
      <div id="tab1" :style="{margin:'0'}">
        <Tabs type="card">
          <Tab-pane label="数据透视" :style="{fontSize: '18px',height:eventheight}">
            <Collapse accordion v-model="show" :style="{border:'none',backgroundColor: 'rgba(0, 0, 0, 0.01)',height:eventheight}">
              <div v-for="(object,index) in dataExpand">
                <div>
                  <div :style="{borderBottom:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',}" style="cursor:default">
                    <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                      <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> {{object.title}}({{object.count}})
                      <i class="icon iconfont icon-more" style="float:right"></i>
                    </p>
                  </div>
                  <Panel key="2" :style="{margin:'5px 10px 5px 15px'}" hide-arrow v-for="item in object.items" style="cursor:pointer">
                    <Row type="flex" justify="space-between" class="code-row-bg">
                      <Col span="11">
                      <p>{{item.itemTitle}}
                      </p>
                      </Col>
                      <Col span="3">
                      <p :style="{fontSize:'12px',opacity:'0.5'}">{{item.itemNum}}</p>
                      </Col>
                      <Col span="10">
                      <div :style="{width: item.per,height:'12px',borderRadius: '3px',backgroundColor:colorMap[index]}"></div>
                      </Col>
                    </Row>
                    <div slot="content">
                      <Row type="flex" justify="space-between" class="code-row-bg" v-for="childrenItem in item.childrenItems">
                        <Col span="11">
                        <p class="suojin">{{childrenItem.childrenItemTitle}}</p>
                        </Col>
                        <Col span="3">
                        <p :style="{fontSize:'12px',opacity:'0.5'}">{{childrenItem.childrenItemNum}}</p>
                        </Col>
                        <Col span="10">
                        <div :style="{height:'12px',marginTop:'13px',borderRadius: '3px',width: childrenItem.childrenItemPer,backgroundColor:colorMap[index]}"></div>
                        </Col>
                      </Row>
                    </div>
                  </Panel>
                </div>
              </div>
            </Collapse>
          </Tab-pane>
          <Tab-pane label="目标详情">
            <div :style="{backgroundColor: 'rgba(0, 0, 0, 0.01)'}">
              <Row type="flex" justify="start" align="start" class="code-row-bg" :style="{margin:'0',padding:'0 10px'}" v-if="singlePerson">
                <Col span="16">
                <h1 class="infoName" style="padding-left: 10px;">{{dataExpand.name}}</h1>
                </Col>
                <Col span="8" :style="{margin:'0'}">
                <img :src="dataExpand.img" :style="{borderRadius:'20px',top:'0',right:'30px',maxHeight:'120px',position:'absolute'}">
                </Col>
                <!-- <Col span="3" class="infoKey">国家</Col>
                <Col span="10" class="infoValue">{{dataExpand.country}}</Col>
                <Col span="11"></Col>
                <Col span="3" class="infoKey">机构</Col>
                <Col span="10" class="infoValue">{{dataExpandnd.org}}</Col>
                <Col span="11"></Col>
                <Col span="3" class="infoKey">配偶</Col>
                <Col span="10" class="infoValue">{{dataExpand.spouse}}</Col>
                <Col span="11"></Col>
                <Col span="3" class="infoKey">学校</Col>
                <Col span="10" class="infoValue">{{dataExpand.school}}</Col>
                <Col span="11"></Col> -->
                <Col span="5" class="infoKey">标签</Col>
                <Col span="19" class="infoValue">{{dataExpand.type}}</Col>
                <!-- <Col span="3" class="infoKey">简介</Col>
                <Col span="21" class="infoValue">{{dataExpand.introduction}}</Col> -->
                <Col span="24">
                <!-- <h2 class="infoTitle">倾向性分析</h2> -->
                 <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                  <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> 倾向性分析
                  
                  <i class="icon iconfont icon-more" style="float:right"></i>
                </p>
                <Row type="flex" justify="space-around" align='middle' class="code-row-bg" :style="{ borderBottom:'solid 1px rgba(51, 255, 255, 0.2) !important;',margin:'0'}">
                  <Col span="5">
                  <Circle :percent="80" :size='50'>
                    <span class="demo-Circle-inner" style="font-size:14px">80%<br>负面</span>
                  </Circle>
                  </Col>
                  <Col span="5">
                  <Circle :percent="80" :size='50' stroke-color="#ff5500">
                    <span class="demo-Circle-inner" style="font-size:14px">80%<br>中立</span>
                  </Circle>
                  </Col>
                  <Col span="5">
                  <Circle :percent="80" :size='50'>
                    <span class="demo-Circle-inner" style="font-size:14px">80%<br>正面</span>
                  </Circle>
                  </Col>
                </Row>
                </Col>
                <Col span="24" :style="{height:'10vh'}">
                </Col>
              </Row>
              <Row type="flex" justify="start" align="start" class="code-row-bg" :style="{margin:'0',padding:'0'}" v-if="!singlePerson">
                <div :style="{borderBottom:'1px solid rgba(54, 102, 116, 0.5)',margin:'0 10px 0 10px',width:'100%'}" style="cursor:default">
                  <p style="color:#ccffff;font-family: MicrosoftYaHei;font-size: 16px;">
                    <span style="margin:0 4px;background-color:rgba(51, 255, 255, .4);width:3px;">&nbsp;</span> 数据实体(<span v-if="dataExpand != null">{{dataExpand.length}}</span>)
                    <i class="icon iconfont icon-more" style="float:right"></i>
                  </p>
                </div>
                <div class="p-collapse-modal" :style="{width:'100%'}" onclick="detail(data.id)" v-for="data in dataExpand" @click="detail(data.id)">{{data.name}}
                  <p class="p-collapse-modal-small">{{data.type}}</p>
                </div>
              </Row>
            </div>
          </Tab-pane>
        </Tabs>
      </div>
      <modal-chart-detail :flag="modal_detail" :detail="detail_data"></modal-chart-detail>
    </div>
    </Col>
  </div>
</template>
<script>
  import modalChartDetail from './custom_modal_detail'
  /* eslint-disable */
  export default {
    // props: {
    //   eventData: {
    //     type: Array,
    //     default: [0, 0, 0] //这样可以指定默认的值
    //   },
    //   detailData:{
    //     type: Array,
    //     default: [0, 0, 0] //这样可以指定默认的值
    //   }
    // },
    data() {
      return {
        colorMap: [
          '#33cc99',
          '#33cccc',
          '#3399ff'
        ],
        detail_data: null,
        show: [],
        eventheighttdiv: 0,
        eventheight: 0,
        modal_detail: false,
        closable: true,
        singlePerson: false,
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
    components: {modalChartDetail},
    computed: {
      menuitemClasses: function() {
        return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
      }
    },
    methods: {
      look() {
        // let mthis = this
        // mthis.singlePerson = false
      },
      detail(id) {
        let nodeIdsArry = []
        nodeIdsArry.push(id)
        this.$http.post('http://10.60.1.140:5001/node-datas/', {
          'nodeIds': nodeIdsArry
        }).then(response => {
          this.dataExpand = response.body.data[0].nodes[0]
          this.singlePerson = true
        })
        //查询详细信息
      }
    },
    props: ['dataExpand','singlePerson'],
    mounted() {
      var mthis = this; 
      window.onresize = function() {
        this.eventheighttdiv = document.documentElement.clientHeight - 64 - 10 + "px";
        this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16 ) + "px";
      };
      this.eventheight = (document.documentElement.clientHeight - 64 - 10 - 32 - 16) + "px";
      this.eventheighttdiv = document.documentElement.clientHeight - 64 - 10 + "px";
    }
  };
</script>
<style>
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
</style>
