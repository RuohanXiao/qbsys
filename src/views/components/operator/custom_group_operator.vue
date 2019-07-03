<style>
  .buttonGroup>p {
    background-color: transparent;
    color: rgba(51, 255, 255, 0.4);
    font-size: 14px;
    vertical-align: middle;
    /* text-align: center; */
    /* line-height: 38px; */
    height: 38px;
    padding: 7px 16px;
    cursor: pointer;
  }
  .buttonGroup:hover>p {
    background-color: rgba(51, 255, 255, 0.2);
    color: rgba(51, 255, 255, 1);
  }
  .bDiv{
    background-color: rgba(69, 250, 250, 0) !important;
    color: rgba(51, 255, 255, 0.4) !important;
  }
  .bDiv:hover{
    background-color: rgba(51, 255, 255, 0.2) !important;
    color: rgba(51, 255, 255, 1) !important;
  }
  .buttonGroup label{
    width: 100%;
    margin: 10px auto;
  }
  .buttonGroup .ivu-radio-wrapper{ 
    color:rgba(51, 255, 255, 0.4) !important;
  }
  .buttonGroup .ivu-radio-group{
    margin: auto 10px;
  }
</style>

<template>
  <Col span="24">
  <div class='buttonGroup'>
    <!-- <p>{{Params.name}}
      <Switch style="float: right;" v-model="switch1" @on-change="change">
        <span slot="open">开</span>
                <span slot="close">关</span> 
      </Switch>
    </p> -->
    <RadioGroup v-model="methodsValue" @on-change="methodChange($event)">
        <Radio label="community">社区发现</Radio>
        <Radio label="labelprop">标签传播</Radio>
        <Radio label="cc">弱连通分量</Radio>
        <Radio label="louvain">鲁汶</Radio>
    </RadioGroup>
  </div>
  <!-- <div><p>运行算子</p></div> -->
  <div style="display: flex;justify-content: center;height: 30px;margin-top:10px;">
    <Button id="button" type="success" class="bDiv" ghost style='width: 60%;border: 1px solid rgba(51, 255, 255, 0.2) !important;border-radius: 25px;-moz-border-radius: 25px;'  v-model="switch1" @click="change1($event)">运行算子</Button>
  </div>
  <!-- <button  @on-click="change">ss</button> -->
  </Col>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        switch1: false,
        methodsValue:'community'
      }
    },
    props: ['Params'],
    methods: {
      change(status) {
        this.switch1 = !this.switch1
        this.$store.commit('setGroupFlag', this.switch1)
        this.$store.commit("setTabSelectNet", "analysisResults");
      },
      change1(e) {
        this.switch1 = !this.switch1
        e.target.innerText = (this.switch1)?'运行算子':'运行算子'
        this.$store.commit('setGroupFlag', this.switch1)
        this.$store.commit("setTabSelectNet", "analysisResults");
      },
      methodChange(e){
        this.switch1 = false
        this.$store.commit('setMethodType', e)
        this.$store.commit('setGroupFlag', this.switch1)
        this.$store.commit("setTabSelectNet",(this.$store.state.tabSelectNet === 'analysisResults')?'mubiaoxiangqing':this.$store.state.tabSelectNet);
      }
    },
    watch: {
      switch1(){
        $('#button').innerText = (this.switch1)?'运行算子':'运行算子'
      },
      netSwitch() {
        this.switch1 = false
        $('#button').innerText = (this.switch1)?'运行算子':'运行算子'
        this.$store.commit('setGroupFlag', this.switch1)
        this.$store.commit("setTabSelectNet", "analysisResults");
      },
      // switch1(){
      //   this.$store.commit('setGroupFlag', this.switch1)
      //   this.$store.commit("setTabSelectNet", "analysisResults");
      // },
      Params() {
      }
    },
    computed: mapState(['netSwitch'])
  }
</script>