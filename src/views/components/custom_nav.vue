<template>
  <div class='rightNav'  :style="{height:contentHeight,display:'flex'}">
    <div class="navStyleTitle right" :style="{position: 'initial',zIndex: '98',width:'40px',bottom:'1px',display:'flex'}">
      <div class="floater">
        <div :style="{height:'5vh',margin:'0 0 3vh 0'}" class="right1" @click="showGongzuoji">
          <Icon class="icon iconfont icon-file DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh',margin:'0 0 3vh 0'}" class="right1" @click="showTuji">
          <Icon class="icon iconfont icon-image  DVSL-bar-btn DVSL-bar-btn-back"  size="26" />
        </div>
        <div :style="{height:'5vh',margin:'0 0 3vh 0'}" class="right1" @click="showShuoming">
          <Icon class="icon iconfont icon-question  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh',margin:'0 0 3vh 0'}">
          <Icon class="icon iconfont icon-user DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
      </div>
    </div>
    <div  v-if="spinRight" :style="{height:contentHeight,width:'22vw',backgroundColor:'rgba(0,0,0,1)'}">
    <Spin size="large" fix></Spin>
    </div>
    <div v-else>
    <div class="scrollBarAble" aria-autocomplete="true" v-if="modalFlag == 'gongzuoji'" :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,1)'}">
       <div class="setTitleDiv">
        <p class="setTitle">我的集合</p>
      </div>
      <div :style="{margin:'30px 5px 0px 0px'}">
      <Row type="flex" justify="center">
        <Col :sm="24" align="middle" v-for="item in items_gongzuoji">
          <!-- <workspace-item :item="item" @ref='showGongzuoji'></workspace-item> -->
           <workspace-item :item="item"></workspace-item>
        </Col>
      </Row>
      </div>
    </div>
    <div class="scrollBarAble" aria-autocomplete="true" v-if="modalFlag == 'tuji'" :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,1)'}">
      <div class="setTitleDiv">
        <p class="setTitle">收藏图片</p>
      </div>
      <div :style="{marginTop:'30px'}">
      <Row type="flex" justify="center">
        <Col :sm="24" align="middle" v-for="item in items_tuji">
          <workspaceItemPic :item="item" ></workspaceItemPic>
        </Col>
      </Row>
      </div>
    </div>
    <div class="scrollBarAble" aria-autocomplete="true" v-if="modalFlag == 'shuoming'" :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,1)'}">
       <div class="setTitleDiv">
        <p class="setTitle">说明</p>
      </div>
      <div :style="{marginTop:'30px'}">
      <Row type="flex" justify="center">
        <Col :sm="24" align="middle" v-for="item in items_shuoming">
          <workspace-item :item="item" @delId='delMethod'></workspace-item>
        </Col>
      </Row>
      </div>
    </div>
      </div>
      <modal-del-set></modal-del-set>
  </div>
</template>
<script>
  import '../../dist/assets/styles/navsytle.css';
  import nav from "../../dist/assets/js/nav.js";
  import mock from "../../mock/index.js";
  import Bg2 from "../../dist/assets/images/bg.jpg";
  import modalDelSet from './custom_delWorkSet_Modal';
  import workspaceItem from "./custom_workspaceItem";
  // import workspaceItem from "./custom_workspaceItem_pic";
  import workspaceItemPic from "./custom_workspaceItem_pic";
  import $ from "jquery";
  import {
    mapState,
    mapMutations
  } from 'vuex'
  // import $ from "jquery";
  mock.test = 1;
  export default {
    data() {
      return {
        modalFlag:'',
        spinRight:false,
        contentHeight:0,
         items_shuoming:[{
          
        }],
        items_tuji:[{
          title:'图集1',
          id: 't1',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553681970751&di=368868ccaa704cd24c9e6aa5e22bd320&imgtype=0&src=http%3A%2F%2Fstatic.jstv.com%2Fgather%2Fhl%2F20171227%2F3%2F3131169628773555443.jpg'
        },
        {
          title:'图集2',
          id: 't2',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553681970751&di=0602171a7e8b02ac1e3dc1faafd607b1&imgtype=0&src=http%3A%2F%2Fimg.265g.com%2Fuserup%2F1201%2F201201181426349736.jpg'
        },
        {
          title:'图集3',
          id: 't3',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553681970750&di=16828cd9ebbb7e17a4270f34f62e44ba&imgtype=0&src=http%3A%2F%2Fn.sinaimg.cn%2Ftech%2Ftransform%2F20151201%2FPGEW-fxmaznc5821601.jpg'
        },
        {
          title:'图集4',
          id: 't4',
          img: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1553681970750&di=0873fd39472826c22969bb785220093c&imgtype=0&src=http%3A%2F%2Fimg.mp.sohu.com%2Fupload%2F20170706%2Ff463616de0fe498d848bb134d2f947bf_th.png'
        }],
        items_gongzuoji:[{
          id: 'r1',
          title: '台D人员',
          disc:'包含台湾地区领导人',
          time:'2019-03-12',
          num: '3',
          img: '',
          available: true,
          groupType: 'human'
        },{
          id: 'r2',
          title: '拉美领导人',
          disc:'包含特朗普',
          time:'2019-03-12',
          num: '1',
          img: '',
          available: false,
          groupType: 'administrative'
        },{
          id: 'r3',
           title: '20机构',
          disc:'s',
          time:'2019-03-12',
          num: '1',
          img: '',
          available: false,
          groupType: 'organization'
        },{
          id: 'r4',
           title: '水门事件',
          disc:'包含特朗普',
          time:'2019-03-12',
          num: '1',
          img: '',
          available: false,
          groupType: 'event'
        },{
          id: 'r5',
           title: 'X文档集合',
          disc:'包含特朗普',
          time:'2019-03-12',
          num: '1',
          img: '',
          available: false,
          groupType: 'document'
        }]
      }
    },
    computed: mapState([
      'refSet','delSetFlag'
    ]),
    watch: {
      refSet:function(){
        var mthis = this
        setTimeout(() => {
          mthis.showGongzuoji()
        }, 200);
      }
    },
    mounted() {
      this.contentHeight = this.$store.getters.getViewHeight
    },
     components: {
       workspaceItem,workspaceItemPic,modalDelSet
    },
     methods: {
       delMethod(id){
         alert(111)
         let mthis = this

        //  触发删除工作集方法
        alert('触发删除工作集方法')
        if(mthis.$store.state.tmss === 'net') {
              mthis.$store.commit('setNetPromte', '触发删除工作集方法')
            } else if(mthis.$store.state.tmss === 'geo') {
              mthis.$store.commit('setGeoPromte', '触发删除工作集方法')
            } else if(mthis.$store.state.tmss === 'content') {
              mthis.$store.commit('setContentPromte', '触发删除工作集方法')
            } else {

            }
       },
       showGongzuoji(){
         this.spinRight = true
         var mthis = this
        //  alert('gongzuoji');
         mthis.modalFlag = 'gongzuoji'
         let timestamp = new Date().getTime()
         mthis.$http.post(mthis.$store.state.ipConfig.api_url + '/load-set-data/', {
            "timestamp": timestamp,
            "idlist": "",
            "label": "set",
            "page": 1,
            "pagesize": 30
          }).then(response => {
            mthis.items_gongzuoji = response.body.data
            mthis.spinRight = false
            mthis.$forceUpdate()
          })
       },
       showTuji(){
        //  alert('tuji');
         this.modalFlag = 'tuji'
       },
       showShuoming(){
        //  alert('shuoming');
         this.modalFlag = 'shuoming'
       }
     }
  }
</script>
<style>
  .workspaceTitle{
    font-family: MicrosoftYaHei;
    font-size: 14px;
    font-weight: normal;
    font-stretch: normal;
    letter-spacing: 0px;
    color: #ccffff;
    opacity: 0.5;
  }
  .setTitle{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 30px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .setTitleDiv{
    height: 30px;
    position: absolute;
    top: 0;
    width: 22vw;
    text-align: center;
    z-index: 99;
    background-color: rgba(0,0,0,1);
  }
</style>

