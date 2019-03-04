<template>
  <Row type="flex" justify="space-between" :style="{flexFlow:'row nowarp',marginTop:'7px'}"  class="code-row-bg">
    <Col span="12" align="left" :style="{display:'flex',flexFlow:'row nowarp'}">
    <div class="logo">
      <img class="logo_img" src="../../dist/assets/images/logo.png" style="display: flex;align-items: center;" />
    </div>
    <div :class="isActive=='net'?'active':'menu'"  @click="changeActive('net')">
        <img class="menu_img" src="../../dist/assets/images/net.png" style="display: flex;align-items: center;" />
    </div>
    <div :class="isActive=='geo'?'active':'menu'" @click="changeActive('geo')">
      <img class="menu_img" src="../../dist/assets/images/earth.png" style="display: flex;align-items: center;" />
    </div>
    <div :class="isActive=='content'?'active':'menu'"  @click="changeActive('content')">
      <img class="menu_img" src="../../dist/assets/images/content.png" style="display: flex;align-items: center;" />
    </div>
    </Col>
    <Col span="5" align="right">
    <search-div :type="isActive"/>
    </Col>
  </Row>
</template>
<script>
import { mapState,mapMutations } from 'vuex'
import searchDiv from "./custom_searchdiv";
export default {
    name: "App",
    data() {
      return {
       netData: [],
       isActive:'net'
      }
    },
  components: {
    searchDiv
  },
  computed:mapState ([
    'tmss'
  ]),
  watch: {
    tmss: function(va) {
      this.isActive = va
    }
  },
  methods:{
    changeActive(val) {
      this.isActive = val
      this.$store.commit('changeTMSS',val)
    },
    initNode(opt) {
      this.$emit('initNode',opt);
    }
  }
}
</script>
<style scope>
/* .active {
  border:1px solid rgb(51, 204, 204);
  box-shadow:0 0 18px rgb(51, 204, 204);
  background-color:rgba(24,255,255,0.2);
} */
.active {
  /* border:1px solid rgb(51, 204, 204); */
  /* box-shadow:0 0 18px rgb(51, 204, 204); */
  /* background-color:rgba(24,255,255,0.2); */
  /* box-shadow: 10px 10px 5px #888888 inset; */
  width:50px;
  height:50px;
  margin-right: 1em;
  background: -webkit-radial-gradient(rgba(24,255,255, 1) 50%, rgba(51, 204, 204, 0) 80%);
  background: -o-radial-gradient(rgba(24,255,255, 1) 50%, rgba(51, 204, 204, 0) 80%);
  background: -moz-radial-gradient(rgba(24,255,255, 1) 50%, rgba(51, 204, 204, 0) 80%); 
  background: radial-gradient(rgba(24,255,255, 1) 50%, rgba(51, 204, 204, 0) 80%);
}
.menu {
  width:50px;
  height:50px;
  margin-right: 1.2em;
}
.menu:hover {
  cursor: pointer;
  background: -webkit-radial-gradient(rgba(24,255,255, 1) 20%, rgba(51, 204, 204, 0) 80%); /* Safari 5.1 - 6.0 */
  background: -o-radial-gradient(rgba(24,255,255, 1) 20%, rgba(51, 204, 204, 0) 80%); /* Opera 11.6 - 12.0 */
  background: -moz-radial-gradient(rgba(24,255,255, 1) 20%, rgba(51, 204, 204, 0) 80%); /* Firefox 3.6 - 15 */
  background: radial-gradient(rgba(24,255,255, 1) 20%, rgba(51, 204, 204, 0) 80%); /* 标准的语法 */
}
.menu_img {
  padding: 6px;
  width: 48px;
  height: 48px;
  /* box-shadow:0 0 18px rgb(51, 204, 204); */
}
.logo {
  height: 48px;
  margin-right: 40px;
  width: auto;
}
.logo_img {
  padding: 6px;
  width: auto;
  height: 48px;
  
}
.ivu-select-item img{
  margin-right: 10px;
}

</style>


