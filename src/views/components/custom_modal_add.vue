<template>
  <div>
    <Modal v-model="flag" width="80%" footer-hide :closable="false">
      <Row type="flex" justify="space-between" class="code-row-bg" align="middle" :style="{margin:'0'}">
        <Col span="7" class="leftModal" type="flex" justify="space-between" align="middle" :style="{height:'80vh'}">
        <Row type="flex" justify="center" class="code-row-bg" align="middle" :style="{marginTop:'20px'}">
          <Col span="20">
          <div style="width:100%;height:40px">
            <modal-search-div />
          </div>
          </Col>
        </Row>
        <Collapse class="collapseHover" :style="{textAlign:'left',marginTop:'10px',height:listHeight,maxHeight:listHeight,backgroundColor: 'rgba(0,0,0,0)'}" accordion>
          <Panel v-for="item in edata" :style="{overflowY:'hidden',overflowX:'hidden'}">
            {{item.text}}
            <div slot="content" :style="{overflowY:'hidden',overflowX:'hidden'}">
              <div class="p-collapse-modal" v-for="it in item.chlidren" :style="{overflowY:'hidden',overflowX:'hidden'}">{{it.text}}
                <p class="p-collapse-modal-small" :style="{overflowY:'hidden',overflowX:'hidden'}">{{it.info}}</p>
              </div>
            </div>
          </Panel>
        </Collapse>
        </Col>
        <Col span="17" align="middle" class="rightModal" :style="{height:'80vh'}">
        <!-- <div class="closeBackground">
          <Icon type="ios-more" size='20' :style="{borderRadius:'50%'}" />
        </div> -->
        <div class="modalHeader">
          <!-- <div class="modalHeaderBread">
            <Breadcrumb separator=">">
              <BreadcrumbItem to="/">Home</BreadcrumbItem>
              <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
              <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
            </Breadcrumb>
          </div> -->
          <div class="modalHeaderClose" @click="flag = !flag ">
            <Icon class="closeImg icon iconfont icon-quxiaocancel process-img DVSL-bar-btn DVSL-bar-btn-back" size="45"></Icon>
          </div>
        </div>
        <Card :bordered="false" style="padding:'0';border-top-right-radius: 18px;">
          <div>
            <Row type="flex" justify="start" class="code-row-bg" align="middle" :style="{margin:'0',height:InfoHeight,overflowY: 'scroll'}">
              <Col span="20" :style="{textAlign:'left'}">
                <span class="modalTitle" colspan="2">弗拉基米尔·弗拉基米罗维奇·普京</span>
              </Col>
              <Col span="4">
              <img class="modalImg" src="https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg">
              </Col>
              <Col span="24">
              <div>
                <p class="modalContent1">相关实体</p>
              </div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(1)">
                    <img src="https://gss0.bdstatic.com/94o3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=7fad0ada8435e5dd902ca2d94efdc0d2/377adab44aed2e73bbbb6ca48601a18b86d6faec.jpg" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}">
                    <h3 class="authName">柳德米拉·亚历山大罗夫娜·普京娜</h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col align="middle">
              <div style="float:center;width: 1px;height: 8vh; background: rgba(51, 255, 255, 0.2)"></div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(2)">
                    <img src="https://gss2.bdstatic.com/-fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=621b22fbdf88d43ff0a996f44525b526/359b033b5bb5c9ea8bd6866ddc39b6003af3b313.jpg" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}">
                    <h3 class="authName">德米特里·阿纳托利耶维奇·梅德韦杰夫</h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col align="middle">
              <div style="float:center;width: 1px;height: 8vh; background: rgba(51, 255, 255, 0.2)"></div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(3)">
                    <img src="https://gss2.bdstatic.com/9fo3dSag_xI4khGkpoWK1HF6hhy/baike/w%3D268%3Bg%3D0/sign=ab20690432d3d539c13d08c502bc8e6d/aa18972bd40735fa840707439a510fb30e240850.jpg" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}">
                    <h3 class="authName">鲍里斯·尼古拉耶维奇·叶利钦</h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col align="middle">
              <div style="float:center;width: 1px;height: 8vh; background: rgba(51, 255, 255, 0.2)"></div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(4)">
                    <img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike80%2C5%2C5%2C80%2C26/sign=468864cdf0039245b5b8e95de6fdcfa7/54fbb2fb43166d22ca0c87944a2309f79052d2b3.jpg" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}">
                    <h3 class="authName">习近平</h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col align="middle">
              <div style="float:center;width: 1px;height: 8vh; background: rgba(51, 255, 255, 0.2)"></div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(5)">
                    <img src="https://gss1.bdstatic.com/-vo3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike220%2C5%2C5%2C220%2C73/sign=5f9e4ba500f431ada8df4b6b2a5fc7ca/f2deb48f8c5494ee1d36a12e21f5e0fe99257ef5.jpg" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}">
                    <h3 class="authName">安倍晋三</h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col align="middle">
              <div style="float:center;width: 1px;height: 8vh; background: rgba(51, 255, 255, 0.2)"></div>
              </Col>
              <Col span="5">
              <div>
                <Card>
                  <div class='personCard' @click="showPersonInfo(5)">
                    <Icon type="ios-more" size='70' :style="{borderRadius:'50%'}" />
                    <!-- <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539145214636&di=768c9da5d1ddd71f83ebb4f67a53bf22&imgtype=0&src=http%3A%2F%2Fimage.tupian114.com%2F20140416%2F14482512.png" :style="{borderRadius:'50%',width:'8vh',height:'8vh'}"> -->
                    <h3 class="authName"></h3>
                  </div>
                </Card>
              </div>
              </Col>
              <Col span='24' class="modalContent2"> 弗拉基米尔·弗拉基米罗维奇·普京，俄罗斯第2任、第4任总统。曾担任俄罗斯总理、统一俄罗斯党主席、俄白联盟部长会议主席。 2000年执政以来，普京致力于复兴俄罗斯超级大国地位，对内加强联邦政府的权力，整顿经济秩序，打击金融寡头，加强军队建设；对外努力改善国际环境，拓展外交空间，维护本国利益，在国际舞台上恢复了世界性强国地位。 普京先后四次当选俄罗斯总统，担任总统期间，整体提升了苏联解体后的俄罗斯的国际地位，在对内外政策方面偏强硬，在民主方面遭到很多争议，被认为是一位“铁腕总统”，被美国《时代》、《福布斯》杂志评选为世界最有影响力人物。
              [1] 2015年2月13日，俄罗斯人对普京信任度高达85% ，创历史新高。 [2] 3月11日，普京在各国领导人工资中，排名第八位。 [3] 4月，普京获得6.9%投票，领衔美国《时代》周刊“最具影响力人物”榜单。 [4] 11月4日，普京连续三年名列《福布斯》全球最有权力人物排行榜首位。 2016年3月24日俄罗斯卫星网，克里姆林宫办公厅主任表示，俄总统普京将于6月访华。 [5] 4月7日，俄罗斯萨拉托夫州立仲裁法院于当天正式驳回了俄西南巴拉科沃市市民尼古拉·苏沃洛夫对俄总统普京的诉讼。9月22日，彭博全球50大最具影响力人物排行榜，普京排第30名
              [6] 。 2018年3月18日晚8时，俄罗斯总统选举落幕，普京得票率达到了76.1%，所得选票已过半数，普京第四次当选俄罗斯总统，其总统任期长达20年。 [7]
              </Col>
            </Row>
          </div>
          <div>
            <Row type="flex" justify="start" class="code-row-bg" align="middle"  :style="{height:buttonDivHeight,marginTop:'15px',lineHeight:'30px'}">
              <Col span="4" offset="16">
              <div class='buttonModal' @click="showNodeInNet">
                <p class="buttonModalText">追加网络分析</p>
              </div>
              </Col>
              <Col span="4">
              <div class='buttonModal' @click="showNodeInNewNet">
                <p class="buttonModalText">新建网络分析</p>
              </div>
              </Col>
            </Row>
          </div>
        </Card>
        </Col>
      </Row>
    </Modal>
  </div>
</template>
<script>
  import mock from "../../mock/index.js";
  import modalSearchDiv from "./custom_modal_searchdiv";
  import { mapState,mapMutations } from 'vuex'
  const axios = require('axios')
  const MockAdapter = require('axios-mock-adapter')
  mock.test = 1;
  export default {
    data() {
      return {
        loading1: false,
        options1: [],
        buttonDivHeight: 0,
        listHeight: 0,
        InfoHeight: 0,
      }
    },
    props: ['flag', 'edata'],
    mounted() {
      this.listHeight = document.documentElement.clientHeight * 0.8 - 60 + "px";
      this.InfoHeight = document.documentElement.clientHeight * 0.8 - 120 + "px";
      this.buttonDivHeight = 30 + "px";
    },
    components: {
      modalSearchDiv
    },
    methods: {
      showPersonInfo(id) {},
      showNodeInNet() {
       this.flag = false
        this.$store.commit('setAddNetNodes', {
                  node: {
                    nodes: [{
                      'id': 'node12',
                      'type': 'person',
                      'name': '肖若晗',
                      'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg',
                      'loaded': true
                    }],
                    links:[]
                  },
                  id: 'node12',
                  label: '肖若晗'
                })
      },
      showNodeInNewNet() {
        this.flag = false
        this.$store.commit('setSearchNetResult', {
                  node: {
                    nodes: [{
                      'id': 'node12',
                      'type': 'person',
                      'name': '肖若晗',
                      'img': 'https://gss0.bdstatic.com/-4o3dSag_xI4khGkpoWK1HF6hhy/baike/c0%3Dbaike150%2C5%2C5%2C150%2C50/sign=53e28aef2f2dd42a4b0409f9625230d0/4a36acaf2edda3ccf81167a60be93901203f92bb.jpg',
                      'loaded': true
                    }],
                    links:[]
                  },
                  id: 'node12',
                  label: '肖若晗'
                })
      },
      queryPerson() {},
      searchInfo(query) {
        var mthis = this
        if (query !== '') {
          this.loading1 = true;
          axios.get('/getPersonInfo', {
              name: query
            })
            .then(function(response) {
              setTimeout(() => {
                mthis.options1 = response.data.data
                mthis.loading1 = false;
              }, 10);
            });
        } else {
          this.options1 = [];
        }
      }
    }
  }
</script>
<style>
  /* 滚动条样式 */
   ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }
   ::-webkit-scrollbar-track,
   ::-webkit-scrollbar-thumb {
    border-radius: 999px;
    border: 5px solid transparent;
  }
   ::-webkit-scrollbar-track {
    box-shadow: 1px 1px 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-thumb {
    min-height: 20px;
    background-clip: content-box;
    box-shadow: 0 0 0 5px rgba(0, 0, 0, 0.2) inset;
  }
   ::-webkit-scrollbar-corner {
    background: transparent;
  }
  .modalImg{
    width: 72px;
    height: 72px;
    border: solid 4px rgba(204, 255, 255, 0.5);
    border-radius: 50%;
  }
  .modalHeader {
    height:20px;
    margin: 0 0 10px 10px;
  }
  .modalHeaderBread{
    float: left;
    margin-top: 10px;
  }
  .modalHeaderClose{
    float: right;
  }
  .closeImg{
    position: absolute;
    right: -3px;
    top: -1px;
    padding: 0 !important;
    z-index: 3;
  }
  .ivu-collapse {
    border-radius: 0 !important;
    border: none !important;
  }
  .ivu-collapse-content {
    background-color: rgba(51, 255, 255, 0.1) !important;
  }
  .ivu-collapse>.ivu-collapse-item>.ivu-collapse-header {
    padding-left: 5px !important;
  }
  .collapseHover {
    overflow: hidden;
  }
  .collapseHover:hover {
    overflow-y: scroll;
    overflow-x: hidden;
  }
  .vertical-center-modal {
    display: flex;
    /* align-items: center; */
    justify-content: center;
  }
  /* 弹出框样式 */
  .ivu-modal-mask {
    /* background-color:rgba(0,0,0,0.6) !important; */
    background-color: rgba(0, 0, 0, 0.5) !important;
  }
  .ivu-modal-content {
    background-color: rgba(0, 0, 0, 0.7) !important;
    border-radius: 20px !important;
    box-shadow: 1px 1px 18px rgba(51, 255, 255, 0.5) !important;
    border: solid 1px rgba(51, 255, 255, 0.5) !important;
  }
  .ivu-modal-footer {
    border: none !important;
  }
  .ivu-modal-body {
    padding: 0 !important;
    border-radius: 20px !important;
  }
  .leftModal {
    background-image: linear-gradient( 8deg, rgba(102, 255, 153, 0.14) 0%, rgba(102, 128, 204, 0.14) 60%, rgba(102, 0, 255, 0.14) 100%), linear-gradient(#000000, #000000);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    border-right: solid 1px #336666;
    overflow: hidden;
  }
  .rightModal {
    border-top-right-radius: 20px;
    border-bottom-right-radius: 20px;
  }
  .p-collapse-title {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 50px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .modalTitle {
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 80px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .modalContentLabel {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
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
    line-height: 20px;
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
  td {
    min-width: 40px;
  }
  .authName {
    height: 8vh;
  }
  .personCard {
    text-align: center;
    overflow-Y: hidden;
    cursor: pointer;
  }
  .ivu-modal-close {
    top: 3px !important;
    right: 3px !important;
    background-color: rgba(0, 0, 0, 0);
    color: #ccffff;
    z-index: 2;
  }
  .ivu-modal-close .ivu-icon-ios-close {
    color: rgba(0, 0, 0, 0);
  }
  .ivu-card-body {
    padding: 3px !important;
  }
  .buttonModal {
    background-color: rgba(51, 255, 255, 0.5);
    border-radius: 5px;
    height: 30px !important;
    width: 80% !important;
  }
  .buttonModal:hover {
    transition: All 0.4s ease-in-out;
    -webkit-transition: All 0.4s ease-in-out;
    -moz-transition: All 0.4s ease-in-out;
    -o-transition: All 0.4s ease-in-out;
    cursor: pointer;
    width: 80% !important;
    background-color: rgba(51, 255, 255, 0.8);
  }
  .buttonModalText {
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px !important;
    letter-spacing: 0px;
    color: #ccffff !important;
  }
  .p-collapse-modal {
    font-size: 16px;
    line-height: 38px;
    height: 75px;
    color: #ccffff;
    font-family: "微软雅黑";
    background-color: rgba(51, 255, 255, 0.1);
    border: solid 1px #336666;
    margin-top: 5px;
    margin-right: -5px;
    padding: 0 10px;
  }
  .p-collapse-modal-small {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 20px;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  #ele>.ivu-select-dropdown {
    left: 30px !important;
    width: 80%;
    min-width: 200px;
  }
  #ele .ivu-select-item-focus {
    background: rgba(51, 255, 255, 0.2) !important;
  }
  .ivu-breadcrumb > span > a {
    color: #ccffff !important;
  }
  .ivu-breadcrumb > span > .ivu-breadcrumb-item-link {
    color: #ccffff !important;
  }
</style>

