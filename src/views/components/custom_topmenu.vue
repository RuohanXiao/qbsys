<template>
  <!-- <Row type="flex" justify="space-between" class="code-row-bg" align="middle" >
    <Col span="1" align="middle">
    <div :style="{width:'50px',height:'50px',border:'1px solid rgb(51, 204, 204)',boxShadow:'0 0 18px rgb(51, 204, 204)',backgroundColor:'rgba(24,255,255,0.2)'}">
      <router-link to="/">
        <img src="../../dist/assets/images/net.png" style="display: flex;align-items: center;width:36px;padding-top:7px" />
      </router-link>
    </div>
    </Col>
    <Col span="1" align="middle">
    <router-link to="/geoView" target='_blank'>
      <img src="../../dist/assets/images/earth.png" style="display: inline-block; vertical-align: middle;width:36px" /></router-link>
    </Col>
    <Col span="1" align="middle">
    <router-link to="/contentView" target='_blank'>
      <img src="../../dist/assets/images/content.png" style="display: inline-block; vertical-align: middle;width:33px" /></router-link>
    </Col>
    <Col span="4" offset="17">
    <search-div @initNode="initNode" />
    </Col>
  </Row> -->
  <Row type="flex" justify="space-between" :style="{flexFlow:'row nowarp',marginTop:'7px'}"  class="code-row-bg">
    <Col span="12" align="left" :style="{display:'flex',flexFlow:'row nowarp'}">
    <div class="menu" :class="isActive=='net'?'active':''" @click="changeActive('net')">
      <!-- <router-link to="/"> -->
      <!-- <router-link :to="{path:'/netView'}" @click="changeActive('net')"> -->
        <img class="menu_img" src="../../dist/assets/images/net.png" style="display: flex;align-items: center;" />
      <!-- </router-link> -->
    </div>
    <div class="menu" :class="isActive=='geo'?'active':''" @click="changeActive('geo')">
    <!-- <router-link to="/geoView" target='_blank'> -->
    <!-- <router-link :to="{path:'/geoView'}" @click="changeActive('geo')"> -->
      <img class="menu_img" src="../../dist/assets/images/earth.png" style="display: flex;align-items: center;" />
      <!-- </router-link> -->
    </div>
    <div class="menu" :class="isActive=='content'?'active':''"  @click="changeActive('content')">
      <!-- <router-link to="/contentView" target='_blank'> -->
      <!-- <router-link :to="{path:'/contentView'}"> -->
      <!-- <router-link :to="{path:'/contentView', query:{useRouter:'content'}}" @click="changeActive('content')"> -->
      <img class="menu_img" src="../../dist/assets/images/content.png" style="display: flex;align-items: center;" />
      <!-- </router-link> -->
    </div>
    </Col>
    <Col span="4" align="right">
    <search-div/>
    </Col>
  </Row>
</template>
<script>
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
  methods:{
    changeActive(val) {
      this.isActive = val
      this.$store.commit('changeTMSS',val)
    },
    initNode(opt) {
      // this.netData = opt.nodes[0]
      this.$emit('initNode',opt);
    }
  }
}
</script>
<style scope>
.active {
  border:1px solid rgb(51, 204, 204);
  box-shadow:0 0 18px rgb(51, 204, 204);
  background-color:rgba(24,255,255,0.2);
}
.menu {
  width:50px;
  height:50px;
  margin-right: 1em;
}
.menu_img {
  padding: 6px;
  width: 48px;
  height: 48px;
}

</style>


