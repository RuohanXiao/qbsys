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
    <div :style="{height:rightNav,overflowY:'scroll',width:'22vw',backgroundColor:'rgba(0,0,0,0.8)'}">
      <Row type="flex" justify="start" align="middle">
        <Col :sm="8" :lg="4" align="middle" v-for="item in items" @change="addToChart(item.id)"><img :src=item.img>{{item.title}}</Col>
      </Row>
    </div>
  </div>
</template>
<script>
  export default {
     name: "App",
    data() {
      return {
        contentHeight: 0,
        rightNav: 0,
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

