<template>
  <div class="itemDiv">
    <div class="itemContentDiv">
      <!-- <div class="buttonFront">
          <Icon class="con iconfont icon-tianjia DVSL-bar-btn DVSL-bar-btn-back lineH20" size="20" @click="importData(item.id)"></Icon>
          <Icon class="icon iconfont icon-shanchu DVSL-bar-btn DVSL-bar-btn-back lineH20" size="20" @click="del(item.id)"></Icon>
        </div> -->
      <div class="imgDiv">
        <img :src=item.img :style="{width:'18vw',height:'18vh'}" />
        <p class='titleFront'>{{item.title}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  mock.test = 1
  export default {
    data() {
      return {
      }
    },
    methods: {
      del(id) {
        this.$emit('delId', id)
      },
      importData(id) {
        this.$emit('workSpaceModal', true)
        this.addToChart(id)
      },
      addToChart(id) {
        var mthis = this
        mock.get("/getWorkSpaceAddData").then(function(res) {
          mthis.$store.commit('setWorkSpaceAddData', res.data.data[0])
        })
      },
    },
    props: {
      item: Object
    }
  }
</script>
<style scoped>
  /* 标题栏样式 */
  .titleDiv {
    /* background-color: brown; */
    height: 30px;
    position: absolute;
  }
  /* 标题栏文字 */
  .titleFront {
    font-family: MicrosoftYaHei;
    font-size: 14px;
    letter-spacing: 0px;
    color: #ccffff;
    position: absolute;
    z-index: 98;
    right: auto;
    width: 21vw;
    background-color: rgba(0, 0, 0, 0.5);
    line-height: 20px;
    opacity: 0.5;
  }
  /* 工作集样式 */
  .itemDiv {
    /* background-color: antiquewhite; */
    height: 200px;
    width: 21vw;
    margin: 10px 0 20px 0;
    /* border: 1px solid rgba(51,255,255,0.4); */
  }
  /* 内容样式 */
  .itemContentDiv {
    /* background-color: blueviolet; */
    display: flex;
    justify-content: center;
  }
  /* 工作集图片样式 */
  .imgDiv {
    /* background-color: antiquewhite; */
    width: 21vw;
    height: auto;
    max-height: 200px;
    position: inherit;
  }
  /* 按钮样式 */
  .buttonDiv {
    /* background-color: pink; */
    position: absolute;
    bottom: 20px;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 99;
    width: 100%;
    height: 20px;
    display: flex;
    justify-content: space-around;
  }
  .buttonFront-detail {
    font-family: MicrosoftYaHei;
    font-size: 12px;
    letter-spacing: 0px;
    color: #ccffff;
  }
  .itemDiv:hover .buttonFront-del {
    /* color: #ccffff; */
    color: rgba(51, 255, 255, 0.8);
  }
  .itemDiv:hover .buttonFront-add {
    /* color: #ccffff; */
    color: rgba(51, 255, 255, 0.8);
  }
  .iconHover {
    opacity: 0;
  }
  .iconHover1 {
    opacity: 0;
  }
  .deg45 {
    transform: rotate(45deg);
  }
  .itemDiv:hover {
    /* transform: translateX(10px);
      transform: translateY(-10px); */
    /* box-shadow: 4px 4px 10px #ccffff; */
    /* border: 1px solid #ccffff; */
    transition: all 1s;
    -moz-transition: all 1s;
    /* 　　-webkit-transition: all 1s;
    　　-o-transition: all 1s; */
  }
  .itemDiv:hover .iconHover1 {
    transition: opacity 1s;
    opacity: 1;
  }
  .buttonFront-add:hover .iconHover1 {
    /* color: rgba(51, 255, 255, 0.4); */
    color: #ccffff;
    transform: rotate(135deg);
    transition: all 1s;
    /* transition: font-size 0.2s ease, transform 0.2s ease; */
  }
  .itemDiv:hover .iconHover {
    transition: opacity 1s;
    opacity: 1;
  }
  .buttonFront-del:hover .iconHover {
    /* color: rgba(51, 255, 255, 0.4); */
    color: #ccffff;
    transform: rotate(90deg);
    transition: all 1s;
    /* transition: font-size 0.2s ease, transform 0.2s ease; */
  }
  .buttonFront {
    position: absolute;
    z-index: 99;
    right: 45px;
    top: 15px;
    flex-flow: column nowrap;
    display: flex;
  }
</style>

