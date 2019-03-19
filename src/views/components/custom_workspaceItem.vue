<template>
  <div>
    <Row type="flex" justify="center" v-if="item.available"  class="itemDiv">
      <Col :sm="18" align="start" :style="{paddingLeft:'15px'}">
      <div class="cardDiv">
        <div :style="{display: 'flex'}">
          <span class='titleFront'>{{item.title}}</span>
          <Icon v-if="item.groupType === 'human'" class="icon iconfont icon-ren padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'organization'" class="icon iconfont icon-zuzhi padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'weapon'" class="icon iconfont icon-shouqiang padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'administrative'" class="icon iconfont icon-diqu padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'event'" class="icon iconfont icon-shijian padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'document'" class="icon iconfont icon-wendang padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'mix'" class="icon iconfont icon-star1 padd8 color515" size="14" />
        </div>
         <div class="lineheight25">
          <span class='cardFront'>描述:{{item.disc}}</span>
        </div>
         <div class="lineheight25">
          <span class='cardFront'>{{item.time}}</span>
          &nbsp;&nbsp;&nbsp;
          <span class='cardFront'>数量:{{item.num}}</span>
        </div>
      </div>
      </Col>
      <Col :sm="6" align="right" :style="{flexDirection: 'column'}">
      <div class="cardButD">
        <div class="cd">
        <Icon class="icon iconfont icon-tianjia DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="importData(item.id)"/>
        <Icon class="icon iconfont icon-edit DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="modData(item.id)"/>
        <Icon class="icon iconfont icon-shanchu DVSL-bar-btn DVSL-bar-btn-back lineH20" size="16" @click="del(item.id)"/>
        </div>
      </div>
      </Col>
    </Row>
    <Row type="flex" justify="center" v-else  class="itemDivDisable">
      <Col :sm="18" align="start" :style="{paddingLeft:'15px'}">
      <div class="cardDiv">
        <div :style="{display: 'flex'}">
          <span class='titleFront'>{{item.title}}</span>
          <Icon v-if="item.groupType === 'human'" class="icon iconfont icon-ren padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'organization'" class="icon iconfont icon-zuzhi padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'weapon'" class="icon iconfont icon-shouqiang padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'administrative'" class="icon iconfont icon-diqu padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'event'" class="icon iconfont icon-shijian padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'document'" class="icon iconfont icon-wendang padd8 color515" size="14" />
          <Icon v-if="item.groupType === 'mix'" class="icon iconfont icon-star1 padd8 color515" size="14" />
        </div>
         <div class="lineheight25">
          <span class='cardFront'>描述:{{item.disc}}</span>
        </div>
         <div class="lineheight25">
          <span class='cardFront'>{{item.time}}</span>
          &nbsp;&nbsp;&nbsp;
          <span class='cardFront'>数量:{{item.num}}</span>
        </div>
      </div>
      </Col>
      <Col :sm="6" align="right" :style="{flexDirection: 'column'}">
      <div class="cardButD">
        <div class="cd">
        <Icon class="icon iconfont icon-tianjia DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()"/>
        <Icon class="icon iconfont icon-edit DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()"/>
        <Icon class="icon iconfont icon-shanchu DVSL-bar-btndisHover lineH20" size="16" @click="cantClick()"/>
        </div>
      </div>
      </Col>
    </Row>
  </div>
</template>
<script>
  import mock from '../../mock/index.js'
  mock.test = 1
  export default {
    data() {
      return {}
    },
    methods: {
      del(id) {
        this.$emit('delId',id)
      },
      modData(id){
        alert('modify');
      },
      importData(id){
         this.$emit('workSpaceModal', true)
         this.addToChart(id)
       },
       addToChart(id) {
        var mthis = this
        mock.get("/getWorkSpaceAddData").then(function(res) {
          mthis.$store.commit('setWorkSpaceAddData', res.data.data[0])
        })
      },
      cantClick(){
        alert(
          '不可用工作集，不可导入'
        )
      }
    },
    props: {
      item: Object
    }
  }
</script>
<style scoped>
.DVSL-bar-btndisHover {
    white-space: nowrap;
    color: #cff;
    float: left;
    padding: 0 7px;
    text-decoration: none;
    cursor: pointer;
    opacity: .6;
}
  .cardButD{
    width: 30px;
    color: #ccffff;
    display: flex;
    height: 100%;
    align-items: center;
  }
  .lineH20{
    line-height: 20px;
  }
  .itemDivDisable{
    background-color: rgba(51, 255, 255, 0.2);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .itemDiv {
    background-color: rgba(51, 255, 255, 0.3);
    padding: 5px;
    margin: 5px 5px 5px 0;
    font-family: MicrosoftYaHei;
    /* font-size: 16px; */
    font-weight: normal;
    font-stretch: normal;
    /* line-height: 42px; */
    letter-spacing: 0px;
    color: #ccffff;
  }
  .cardFront{
    font-size: 12px;
    line-height: 25px;
  }
  .titleFront{
    font-size: 14px;
    line-height: 30px;
    display: inline;
  }
  .padd8{
    padding:8px;
  }
  .color515{
    color: rgba(51, 255, 255, 0.5);
  }
</style>

