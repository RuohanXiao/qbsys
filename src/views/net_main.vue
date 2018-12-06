<template>
  <div>
    <div class="bgDiv"></div>
    <div class="demo-split" :style="{height:contentHeight}">
      <Split v-model="split1" :max="max" :min="min">
        <div slot="left" class="demo-split-pane" display='flex' :style="{height:contentHeight}">
          <net-chart-div id="net" :style="{height:netpxdiv}"></net-chart-div>
          <time-chart-div @changenetpx="changenetpx"></time-chart-div>
        </div>
        <div slot="right" class="scroll-bar demo-split-pane paneRight" :style="{height:eventheightdiv,maxHeight:eventheightdiv,marginRight:'2.3vw'}">
          <event-chart-div id="right" :style="{height:eventheightdiv,maxHeight:eventheightdiv}"></event-chart-div>
        </div>
      </Split>
    </div>
  </div>
</template>
<script>
  import "../dist/assets/styles/net_main.css";
  import netChartDiv from "./components/custom_netdiv";
  import timeChartDiv from "./component/custom_timediv";
  import eventChartDiv from "./component/custom_eventdiv";
  import { mapState,mapMutations } from 'vuex'
  export default {
    name: "App",
    data() {
      return {
        contentHeight: 0,
        eventheightdiv: 0,
        netpxdiv: 0,
        netpx: 0,
        useHeight: 0,
        split1: 0.85,
        max: 0.15,
        min: 0.7,
        flag: true
      }
    },
    components: {
      netChartDiv,
      timeChartDiv,
      eventChartDiv
    },
    methods: {
      netData () {
      },
      changenetpx () {
        var mthis = this
        if (mthis.flag) {
          mthis.netpxdiv = mthis.useHeight * 1 + "px";
          mthis.netpx = mthis.useHeight * 1 - 55 + "px";
        } else {
          mthis.netpxdiv = mthis.useHeight * 0.8 + "px";
          mthis.netpx = mthis.useHeight * 0.8 - 55 + "px";
        }
        mthis.flag = !mthis.flag
      }
    },
    computed:mapState ([
      'customDivHeight','customCanvasHeight','netDataObj'
    ]),
    mounted(){
      var mthis = this
      mthis.useHeight = document.documentElement.clientHeight - 65 - 20;
      mthis.contentHeight = document.documentElement.clientHeight - 64 + "px";
      mthis.netpxdiv = mthis.useHeight * 0.8 + "px";
      mthis.netpx = mthis.useHeight * 0.8 - 55 + "px";
      mthis.eventheightdiv = document.documentElement.clientHeight * 1 - 65 - 10 + "px";
      mthis.divheight = mthis.eventheightdiv - mthis.netpx + 'px'

      mthis.netHeight = (document.body.clientHeight * 1 - 64 - 70 - 45 - 20) * 0.8 - 55 + "px";
    }
  }
</script>

<style>

</style>
<style scoped>

</style>
