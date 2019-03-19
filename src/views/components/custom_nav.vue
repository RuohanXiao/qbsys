<template>
  <div class='rightNav'  :style="{height:contentHeight,display:'flex'}">
    <div class="navStyleTitle right" :style="{position: 'initial',zIndex: '999999',width:'2vw',bottom:'1px',display:'flex'}">
      <div class="floater">
        <div :style="{height:'5vh'}" class="right1">
          <Icon class="icon iconfont icon-file DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-image  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-question  DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-user DVSL-bar-btn DVSL-bar-btn-back" size="26" />
        </div>
      </div>
    </div>
    <div class="scrollBarAble" aria-autocomplete="true"  :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">
      <Row type="flex" justify="center">
        <Col :sm="24" align="middle" v-for="item in items">
          <workspace-item :item="item" @delId='delMethod'></workspace-item>
          <!-- <p class="workspaceTitle">{{item.title}}</p> -->
          <!-- <Card style="width:80%">
              <div style="text-align:center">
                  <p slot="title" class="workspaceTitle">{{item.title}}</p>
                  <a href="#" slot="extra" @click.prevent="changeLimit"><Icon type="ios-loop-strong"></Icon>导入</a>
                  <a href="#" slot="extra" @click.prevent="changeLimit"><Icon type="ios-loop-strong"></Icon>修改</a>
                  <a href="#" slot="extra" @click.prevent="changeLimit"><Icon type="ios-loop-strong"></Icon>删除</a>
                  <img :src=item.img width="100%" height="200px"  @click="addToChart(item)"/>
              </div>
          </Card> -->

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
  import workspaceItem from "./custom_workspaceItem";
  import $ from "jquery";
  // import $ from "jquery";
  mock.test = 1;
  export default {
    data() {
      return {
        contentHeight:0,
        items:[{
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
    mounted() {
      this.contentHeight = this.$store.getters.getViewHeight
    },
     components: {
       workspaceItem
    },
     methods: {
       delMethod(id){
        //  触发删除工作集方法
        alert('触发删除工作集方法')
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

