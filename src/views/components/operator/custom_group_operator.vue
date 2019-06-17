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
</style>

<template>
  <Col span="24">
  <div class='buttonGroup'>
    <p>{{Params.name}}
      <Switch style="float: right;" v-model="switch1">
        <span slot="open">开</span>
        <span slot="close">关</span>
      </Switch>
    </p>
  </div>
  </Col>
</template>
<script>
  export default {
    data() {
      return {
        switch1:false
      }
    },
    props: ['Params'],
    methods: {},
    watch: {
      switch1(){
        this.$store.commit('setGroupFlag', this.switch1)
        this.$store.commit("setTabSelectNet", "analysisResults");
      },
      Params() {
        console.log('====================params')
        console.log(this.Params)
      }
    },
    // computed: mapState(['groupFlag'])
  }
</script>