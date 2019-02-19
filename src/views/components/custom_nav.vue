<template>
  <div class="rightNav" :style="{height:contentHeight,display:'flex'}">
    <div class="navStyleTitle right" :style="{position: 'initial',zIndex: '999999',width:'2vw',bottom:'1px',display:'flex'}">
      <div class="floater">
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-file DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-image  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-question  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-yidiandiantubiao08  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
      </div>
    </div>
    <div :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">
      <Row type="flex" justify="start" align="middle">
        <Col :sm="24" align="middle" v-for="item in items">
          <img :src=item.img width="80%" height="200px"  @click="addToChart(item)"/>
          <p class="workspaceTitle">{{item.title}}</p>
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
  import '../../dist/assets/styles/navsytle.css';
  import nav from "../../dist/assets/js/nav.js";
  import mock from "../../mock/index.js";
  import Bg2 from "../../dist/assets/images/bg.jpg";
  import $ from "jquery";
  // import $ from "jquery";
  mock.test = 1;
  export default {
    data() {
      return {
        contentHeight:0,
        items:[{
          id: 'r1',
          title: '关系1',
          img: 'http://www.edrawsoft.cn/images/template/project/engineerrelations.png'
        },{
          id: 'r2',
          title: '关系2',
          img: 'http://www.edrawsoft.cn/images/template/project/relationshipdiagram.png'
        },{
          id: 'r3',
          title: '关系3',
          img: 'http://5b0988e595225.cdn.sohucs.com/images/20180402/eba2c0e26e714cf08a160b682f1b1b5e.png'
        },{
          id: 'r4',
          title: '关系4',
          img: 'http://5b0988e595225.cdn.sohucs.com/images/20180402/bea5f9c3ec88434ba8ff29505e565563.jpeg'
        }]
      }
    },
    mounted() {
      this.contentHeight = this.$store.getters.getViewHeight
    },
     methods: {
       addToChart(id) {
        var mthis = this
        mock.get("/getWorkSpaceAddData").then(function(res) {
          console.log('********************')
          console.log(res)
          mthis.$store.commit('setWorkSpaceAddData', res.data.data[0])
        })
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
</style>

