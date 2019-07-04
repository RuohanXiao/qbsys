<template>
  <div>
    <!-- <Collapse simple 
    :style="{height:divHeight}"
     class='scrollBarAble'> -->
     <Collapse simple 
     class='scrollBarAble'>
      <panel>
        <span>社区发现</span>
        <div slot="content" class="tableLine" v-for="(ite,ind) in communityData">
          <!-- <div class="econtent allowWrap" >
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(ite) === 'object'&&index<5" v-for="(it,index) in ite">
              <p class="econtentp w8em" v-if="index==0">全名</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{it}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="typeof(communityData.Chinese_name) === 'object'&&communityData.Chinese_name.length>5&&displayMore['Chinese_name']" @click="clickMore('Chinese_name')">
              <p class="econtentp w8em moreP">更多</p>
            </div>
            <div :style="{display:'flex',width:'100%  '}" v-if="typeof(communityData.Chinese_name) === 'object'&&index>=5&&!displayMore['Chinese_name']" v-for="(occ,index) in communityData.Chinese_name">
              <p class="econtentp w8em" v-if="index==0">全名</p>
              <p class="econtentp w8em" v-else>&nbsp;</p>
              <p class="econtentp">{{occ}}</p>
              <div class="eButton">
              </div>
            </div>
            <div class="moreDiv" :style="{display:'flex',width:'100%  '}" v-if="typeof(communityData.Chinese_name) === 'object'&&communityData.Chinese_name.length>5&&!displayMore['Chinese_name']" @click="clickCutOut('Chinese_name')">
              <p class="econtentp w8em moreP">收起</p>
            </div>
          </div> -->
          {{ite}}
        </div>
      </panel>
    </Collapse>
  </div>
</template>
<script>
  import {
    mapState,
    mapMutations
  } from 'vuex'
  export default {
    data() {
      return {
        }
    },
    props: ['communityData'],
    // props: ['communityData', 'divHeight'],
    mounted() {
      
    },
    methods: {
      
    },
    computed: mapState([]),
    watch: {
    }
  }
</script>
<style scoped>
  .moreDiv {
    text-align: center !important;
  }
  .titleName {
    min-width: 5em;
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .contentName {
    color: #ccffff;
    font-family: "微软雅黑";
    display: table-cell;
    vertical-align: middle;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .econtentp {
    font-family: MicrosoftYaHei;
    font-size: 13px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 28px;
    letter-spacing: 0px;
    color: #ccffff;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 70%;
    max-width: 70%;
    white-space: nowrap;
    /* margin-right: 40px; */
  }
  .econtent {
    display: flex;
    height: auto;
    min-height: 30px;
  }
  .eButton {
    width: 20px;
    height: 20px;
    min-width: 20px;
    margin: 0px 10px;
  }
  .w8em {
    width: 8em;
    min-width: 8em;
    max-width: 8em;
    margin: 0;
  }
  .tableLine>.econtent:nth-child(odd) {
    background-color: rgba(51, 255, 255, 0.05);
  }
  .tableLine>.econtent:nth-child(odd):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:nth-child(even):hover {
    background-color: rgba(51, 255, 255, 0.2);
  }
  .tableLine>.econtent:hover>.eButton,
  .tableLine>.econtent>div:hover>.eButton {
    opacity: 1;
  }
 .blockStyle:hover .eButton{
    opacity: 1;
  }
  .eButton {
    opacity: 0;
  }
  .allowWrap {
    display: flex;
    flex-wrap: wrap;
  }
</style>


