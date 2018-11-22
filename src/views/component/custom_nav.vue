<template>
<div>
    <!-- <div :style="{height:'80vh',backgroundColor:'red'}">
      <button class="right">右抽屉菜单</button>
    </div> -->
    <div class="bgDiv"></div>
    <div class="rightNav">
      <Row>
        <Col span="4" class="navStyleTitle right" :style="{position: 'initial',zIndex: '999999'}">
        <div class="floater">
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
          <div>111</div>
        </div>
        </Col>
        <Col span="20" class="navStyle"><span>菜单1</span>
        <span>菜单2</span>
        <span>菜单3</span>
        <span>菜单4</span></Col>
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
      return {}
    }
  }
</script>
<style>

</style>

