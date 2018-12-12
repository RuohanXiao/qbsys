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
    <div :style="{height:contentHeight,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">2222222</div>
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
        contentHeight:0
      }
    },
    mounted() {
      this.contentHeight = this.$store.getters.getViewHeight
    }
  }
</script>
<style>

</style>

