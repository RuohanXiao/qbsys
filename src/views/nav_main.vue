<template>
  <div :style="{height:contentHeight,display:'flex',position: 'absolute',top: '0',right: '-22vw'}">
    <div class="right" :style="{zIndex: '999999',width:'2vw',bottom:'1px',display:'flex'}">
      <div class="floater">
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-file DVSL-bar-btn DVSL-bar-btn-back color-green04" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-image DVSL-bar-btn DVSL-bar-btn-back color-green04" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-question DVSL-bar-btn DVSL-bar-btn-back color-green04" size="26" />
        </div>
        <div :style="{height:'5vh'}">
          <Icon class="icon iconfont icon-yidiandiantubiao08 DVSL-bar-btn DVSL-bar-btn-back color-green04" size="26" />
        </div>
      </div>
    </div>
    <div :style="{height:rightNav,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">2222222</div>
  </div>
</template>
<script>
  export default {
     name: "App",
    data() {
      return {
        contentHeight: 0,
        rightNav: 0
      }
    },
    mounted(){
      var mthis = this
      mthis.contentHeight = document.documentElement.clientHeight - 65 + "px";
      mthis.rightNav = document.documentElement.clientHeight * 1 - 64 + "px";
    }
  }
</script>
<style scoped>

</style>
<style>

</style>

