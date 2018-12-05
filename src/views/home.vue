<template>
  <!-- 此组件为入口主文件，内部包含
    net_main.vue（网络关系）
    content_main.vue（文本检索） 
    geo_main.vue（地理信息）
  三个功能子组件和
    custom_topmenu.vue（头部导航） 
    custom_nav.vue（右侧工作集）
  公共组件 -->
  <Layout>
    <Header :style="{position: 'fixed', width: '100vw', background:'black',zIndex:'99'}">
      <top-menu @initNode='initNode' />
    </Header>
    <Layout>
      <Content id="content">
        <net-main v-if="(tag === 'net')"></net-main>
        <geo-main v-if="(tag === 'geo')"></geo-main>
        <content-main v-if="(tag === 'content')"></content-main>
        <nav-div></nav-div>
      </Content>
    </Layout>
    <Footer :style="{backgroundColor:'black',height:'0px',padding:'0'}">
    </Footer>
  </Layout>
</template>
<script>
  import $ from "jquery";
  import topMenu from "./component/custom_topmenu";
  import navDiv from "./nav_main";
  import netMain from "./net_main"
  import geoMain from "./geo_main"
  import contentMain from "./content_main"
  import "../dist/assets/styles/navsytle.css";
  import "../dist/assets/styles/common.css"
  import nav from "../dist/assets/js/nav.js";
  import mock from "../mock/index.js";
  import store from '../store/index.js'
  import { mapState, mapActions, mapMutations } from 'vuex'
  const axios = require("axios");
  const MockAdapter = require("axios-mock-adapter");
  export default {
    name: "App",
    data() {
      return {
      }
    },
    components: {
      navDiv,
      topMenu,
      netMain,
      geoMain,
      contentMain
    },
    methods: {
      initNode(opt) {
        this.netData = opt.nodes[0]
      }
    },
    computed: {
      tag: {
        get() {
          return store.state.tag
        },
        set(value) {
          store.commit('set_tag', {
            tag: value
          })
        }
      }
    },
    mounted(){
      var mthis = this
      mthis.contentHeight = document.documentElement.clientHeight - 65 + "px";
    }
  }
</script>
<style scoped>
  /* 本地样式 */
</style>
<style>
  /* 全局样式 */
</style>

