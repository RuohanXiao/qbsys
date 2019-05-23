import Vue from 'vue';
import iView from 'iview';
import VueRouter from 'vue-router';
import Routers from './router';
import Util from './libs/util';
// import Antd from 'vue-antd';
// ./dist/assets/styles/demo.css
import $ from 'jquery';
import App from './app.vue';
import 'iview/dist/styles/iview.css';
import './dist/assets/styles/demo.css';
import './dist/assets/styles/iconfont.css';
import Vuex from 'vuex';

import './dist/assets/styles/common.css';
import './dist/assets/styles/zc.css';
import './dist/assets/images/sprite.png';
import './config/ipConfig.js';
import { FactChart,NetChart,PieChart,GeoChart } from "./dist/assets/js/zoomcharts"; 
import element from 'element-ui';
// import { FactChart,NetChart,PieChart,GeoChart } from "@dvsl/zoomcharts/zoomcharts"; 
// import 'element-ui/lib/theme-chalk/index.css';
// 怕于与iview有冲突,暂时按需加载
// import Element from 'element-ui';
// import {
//     Pagination,
//     Dialog,
//     Autocomplete,
//     Dropdown,
//     DropdownMenu,
//     DropdownItem,
//     Menu,
//     Submenu,
//     MenuItem,
//     MenuItemGroup,
//     Input,
//     InputNumber,
//     Radio,
//     RadioGroup,
//     RadioButton,
//     Checkbox,
//     CheckboxButton,
//     CheckboxGroup,
//     Switch,
//     Select,
//     Option,
//     OptionGroup,
//     Button,
//     ButtonGroup,
//     Table,
//     TableColumn,
//     DatePicker,
//     TimeSelect,
//     TimePicker,
//     Popover,
//     Tooltip,
//     Breadcrumb,
//     BreadcrumbItem,
//     Form,
//     FormItem,
//     Tabs,
//     TabPane,
//     Tag,
//     Tree,
//     Alert,
//     Slider,
//     Icon,
//     Row,
//     Col,
//     Upload,
//     Progress,
//     Badge,
//     Card,
//     Rate,
//     Steps,
//     Step,
//     Carousel,
//     CarouselItem,
//     Collapse,
//     CollapseItem,
//     Cascader,
//     ColorPicker,
//     Transfer,
//     Container,
//     Header,
//     Aside,
//     Main,
//     Footer,
//     Loading,
//     MessageBox,
//     Message,
//     Notification
//   } from 'element-ui';
//   Vue.use(Pagination);
//   Vue.use(Dialog);
//   Vue.use(Autocomplete);
//   Vue.use(Dropdown);
//   Vue.use(DropdownMenu);
//   Vue.use(DropdownItem);
//   Vue.use(Menu);
//   Vue.use(Submenu);
//   Vue.use(MenuItem);
//   Vue.use(MenuItemGroup);
//   Vue.use(Input);
//   Vue.use(InputNumber);
//   Vue.use(Radio);
//   Vue.use(RadioGroup);
//   Vue.use(RadioButton);
//   Vue.use(Checkbox);
//   Vue.use(CheckboxButton);
//   Vue.use(CheckboxGroup);
//   Vue.use(Switch);
//   Vue.use(Select);
//   Vue.use(Option);
//   Vue.use(OptionGroup);
//   Vue.use(Button);
//   Vue.use(ButtonGroup);
//   Vue.use(Table);
//   Vue.use(TableColumn);
//   Vue.use(DatePicker);
//   Vue.use(TimeSelect);
//   Vue.use(TimePicker);
//   Vue.use(Popover);
//   Vue.use(Tooltip);
//   Vue.use(Breadcrumb);
//   Vue.use(BreadcrumbItem);
//   Vue.use(Form);
//   Vue.use(FormItem);
//   Vue.use(Tabs);
//   Vue.use(TabPane);
//   Vue.use(Tag);
//   Vue.use(Tree);
//   Vue.use(Alert);
//   Vue.use(Slider);
//   Vue.use(Icon);
//   Vue.use(Row);
//   Vue.use(Col);
//   Vue.use(Upload);
//   Vue.use(Progress);
//   Vue.use(Badge);
//   Vue.use(Card);
//   Vue.use(Rate);
//   Vue.use(Steps);
//   Vue.use(Step);
//   Vue.use(Carousel);
//   Vue.use(CarouselItem);
//   Vue.use(Collapse);
//   Vue.use(CollapseItem);
//   Vue.use(Cascader);
//   Vue.use(ColorPicker);
//   Vue.use(Transfer);
//   Vue.use(Container);
//   Vue.use(Header);
//   Vue.use(Aside);
//   Vue.use(Main);
//   Vue.use(Footer);
  
//   Vue.use(Loading.directive);
  
//   Vue.prototype.$loading = Loading.service;
//   Vue.prototype.$msgbox = MessageBox;
//   Vue.prototype.$alert = MessageBox.alert;
//   Vue.prototype.$confirm = MessageBox.confirm;
//   Vue.prototype.$prompt = MessageBox.prompt;
//   Vue.prototype.$notify = Notification;
//   Vue.prototype.$message = Message;
  
  import VueResource from 'vue-resource'
  // import infiniteScroll from 'v-infinite-scroll'
  import InfiniteLoading from 'vue-infinite-loading';
  Vue.use(InfiniteLoading);
  Vue.use(VueResource);
//   Vue.component(Select.name, Select)
  
  Vue.use(VueRouter);
  Vue.use(iView);
  Vue.use(echarts);
  Vue.use(Vuex);
  Vue.use(element);
  
//   Vue.use(Antd);
// 路由配置
const RouterConfig = {
    // mode: 'history',
    mode: 'hash',
    routes: Routers
};
var hostName = window.location.hostname;
var xml_url = ''
if(hostName === 'localhost' || hostName === '127.0.0.1'){
  xml_url = './src/dist/assets';
} else {
  xml_url = 'http://10.60.1.140/assets';
}
var store = new Vuex.Store({
  state: {
    eventImg:null,
    // 组件获取数据方式 this.$store.state.XXX
    tmss:'net', // top menu selected stutas
    workSpaceAddData: {},
    // 配置ip
    ipConfig: {
      // api_url:'http://10.60.1.140:5001', //部署服务器api地址
      api_url:'http://10.60.1.141:5100', //真实数据部署服务器api地址
      // api_url:'http://10.60.1.140:5100', //真实数据部署服务器api地址
      api_search:'http://10.60.1.140:5001', //查询接口采用原地址
      api_test_url: 'http://10.60.1.141:5001', // 测试服务器api地址
      map_url:'http://10.60.1.142:8082', //地图脚本服务地址
      api_event_test_url:'http://10.60.1.141:5100',//事件时间轴测试接口
      // xml_url:'http://10.60.1.140/assets' // 部署路径
      xml_url:'./src/dist/assets' // 本地路径
    },
    // ipConfig: {
    //   // api_url:'http://10.60.1.140:5001', //部署服务器api地址
    //   api_url:'http://10.60.1.141:5100', //真实数据部署服务器api地址
    //   // api_url:'http://10.60.1.140:5100', //真实数据部署服务器api地址
    //   api_search:'http://10.60.1.140:5001', //查询接口采用原地址
    //   api_test_url: 'http://10.60.1.141:5001', // 测试服务器api地址
    //   map_url:'http://10.60.1.142:8082', //地图脚本服务地址
    //   // xml_url:'http://10.60.1.140/assets' // 部署路径
    //   xml_url:'./src/dist/assets' // 本地路径
    // },
    
    // 联动监听
    netWatcher:{ // 网络关系模块监听
      type: '',
      params: {}
    },
    geoWatcher:{ // 地理信息模块监听
      type: '',
      params: {}
    },
    contentWatcher:{ // 文本模块监听
      type: '',
      params: {}
    },
    addNetNodes: {
      id:'',
      label:'',
      node:{}
    },
    atlastData:{
      nodes:[],
      links:[]
    },
    searchNetResult: {
      id:'',
      name:'',
      node:{}
    }, // search result
    searchGeoEventResult: {
      ids:[]
    }, 
    searchGeoEntityResult: {
      ids:[]
    },
    searchContentResult: {
      id:'',
      label:'',
      node:{}
    }, 
    searchModalResult: {
      id:'',
      label:'',
      node:{}
    },
    conditionContent: '',
    // 监听时间轴是否被选中
    contentTimeCondition: [],
    netTimeCondition: [],
    // netTimeCondition:{
    //   'eventIds':[],
    //   'type':''
    // },
    geoTimeCondition: {
      'eventIds':[],
      'type':''
    },
    refSet:false,
    refAtlast:false,
    viewHeight: 0,
    viewHeight_20:0,
    viewHeight_20_geo:0,
    viewHeight_20_content:0,
    viewHeight_30:0,
    viewHeight_30_geo:0,
    viewHeight_30_content:0,
    eventHeight: 0,
    netHeight: 0,
    netDivHeight: 0,
    netData: null,
    returnStatisticsId:[],  //目标详情点击统计量返回的节点id
    selectNetNodes:[{
      ids:[]
    }],   //点击net节点，将节点id返回到event
    selectGeoNodes:[],
    selectContentNodes:[{
      ids:[]
    }],
    clickSelectedGeoIds:[],
    geoStaticsSelectedIds:{},
    geoStaticsOnlyLookSelectedIds:[],
    netModalDetailData: {},
    netModalDetailNodeId: '',
    contentHeight: 0,
    contentDivHeight: 0,
    contentData: null,
    geoHeight: 0,
    geoDivHeight: 0,
    geoData: null,
    HLlocationIds:[],
    split:0.85,
    split_net:0.85,
    split_geo:0.85,
    split_content:0.85,
    singlePerson:true,
    dataStatisticsEvent: {},
    changenetpx: true,
    
    selectionIdByType:{
      nodeIds: [],
      eventIds: [],
      contentIds: []
    },
    contentStaticsSelectedIds:{
      nodeIds: [],
      eventIds: [],
      contentIds: []
    },
    dataexpand: [{
      name:'',
      img:'',
      type:''
    }],
    tabSelectNet: 'mubiaoxiangqingNet',
    tabSelectGeo: 'mubiaoxiangqingGeo',
    tabSelectContent: 'mubiaoxiangqingContent',
    workSpaceModal:{id:'',flag:false},
    contentStatisticsResult:{},
    StaticsIds:[],
    GeoStaticsHLItemIds:[],
    geoWorkSetData_noArea:[],
    geoWorkSetData_area:[],
    netStaticsSelectedIds:[],  //net模块中点击右侧统计保存ids
    netOnlyStaticsSelectedIds:{
      'type':'',
      'ids':[]
    },
    // 三模块联动监听参数
    net_selected_param:{
      type:'', // 触发联动的模块
      params:{
        nodeIds: [],
        linkIds: []
      }
    },
    geo_selected_param:{
      type: '',
      eventId: []
    },
    geo_onlyselected_param:[],
    content_selected_param:{
      type: '',
      params: {}
    },
    contentToNetData:{},
    netToContentData:{
      nodeIds:[],
      eventIds:[],
      contentIds:[]
    },
    netToGeoData:{},
    geoToNetData:{
      nodeIds:[],
      eventIds:[],
      contentIds:[]
    },
    contentToGeoData:{
      nodeIds:[],
      eventIds:[],
      contentIds:[]
    },
    geoToContentData:{
      nodeIds:[],
      eventIds:[],
      contentIds:[]
    },
    openWorkSetFlag:{
      id:'',
      type:'',
      time:''
    },
    contentSelShowFlag:false,
    // 双击单个文档监听参数
    contentSelData:{
      id:[],
      title:''
    },
    // 文档时间轴只看它时显示标志
    contentTimeOnlySel:false,
    // 快捷键监听参数
    netKeyboards:[],
    geoKeyboards:[],
    contentKeyboards:[],
    contentPromte: '',
    netPromte: '',
    geoPromte: ''
  },
  mutations:{
    setContentTimeOnlySel(state,val){
      state.contentTimeOnlySel = val
    },
    setContentPromte(state,val){
      state.contentPromte = val
    },
    setNetPromte(state,val){
      state.netPromte = val
    },
    setGeoPromte(state,val){
      state.geoPromte = val
    },
    setContentSelData(state,val){
      state.contentSelData = val
    },
    // 修改state里的数据时，只能通过mutations的形式来操作
    // 虽然this.$store.state.XXX也可以修改，但是不符合XUEX的理念，万一导致存储数据的混乱，则不能快速溯源，因为每个组件都有可能操作数据
    changeTMSS(state,newStatus){
      // 组件想调用方法，可以使用   this.$store.commit('XXX')
      // 第一个参数始终为state,第二个可以传参（只能支持一个参数，可以通过对象或者数组传多值）
      state.tmss = newStatus
    },
    setAtlastData(state,val){
      state.atlastData = val
    },
    setRefSet(state,val){
      state.refSet = val
    },
    setRefAtlast(state,val){
      state.refAtlast = val
    },
    setHLlocationIds(state,val){
      state.HLlocationIds = val
    },
    //修改工作集调用modal
    setWorkSpaceModal(state,val){
      let data = Object.assign({},state.setWorkSpaceModal,val);
      state.workSpaceAddData = data
    },
    setGeoWorkSetData_noArea(state,val){
      state.geoWorkSetData_noArea = val;
    },
    setGeoWorkSetData_area(state,val){
      state.geoWorkSetData_area = val;
    },
    // 从工作及导入到网络关系画布
    setWorkSpaceAddData(state,val){
      let data = Object.assign({},state.setWorkSpaceAddData,val);
      state.workSpaceAddData = data
    },
    setClickSelectedGeoIds(state,val){
      state.clickSelectedGeoIds = val
    },
    
    setSelectionIdByType(state,val){
      state.selectionIdByType = val
    },
    setNetStaticsSelectedIds(state,val){
      state.netStaticsSelectedIds = val
    },
    setNetOnlyStaticsSelectedIds(state,val){
      state.netOnlyStaticsSelectedIds = val
    },
    setContentStaticsSelectedIds(state,val){
      state.contentStaticsSelectedIds = val
    },
    
    setOpenWorkSetFlag(state,val){
      state.openWorkSetFlag = val
    },
    setEventImg(state,val){
      state.eventImg = val
    },
    setStaticsIds(state,val){
      state.StaticsIds = val
    },
    setGeoStaticsHLItemIds(state,val){
      state.GeoStaticsHLItemIds = val
    },
    // 网络关系与文本传输
    setContentToNetData(state,val){
      state.contentToNetData = val
    },
    setNetToContentData(state,val){
      state.netToContentData = val
    },
    // 网络关系与地图传输
    setNetToGeoData(state,val){
      state.netToGeoData = val
    },
    setGeoToNetData(state,val){
      state.geoToNetData = val
    },
    setGeoStaticsOnlyLookSelectedIds(state,val){
      state.geoStaticsOnlyLookSelectedIds = val
    },
    setGeoStaticsSelectedIds(state,val){
      let data = Object.assign({},state.setGeoStaticsSelectedIds,val);
      state.geoStaticsSelectedIds = data
    },
    // 地图与文本传输
    setContentToGeoData(state,val){
      state.contentToGeoData = val
    },
    setGeoToContentData(state,val){
      state.geoToContentData = val
    },

    setNetTimeCondition(state,val){
      state.netTimeCondition = val
    },
    setContentTimeCondition(state,val){
      state.contentTimeCondition = val
    },
    setGeoTimeCondition(state,val){
      let data = Object.assign({},state.setGeoTimeCondition,val);
      state.geoTimeCondition = data
    },
    setConditionContent(state,val){
      state.conditionContent = val
    },
    setContentStatisticsResult(state,val){
      state.contentStatisticsResult = val
    },
    setReturnStatisticsId(state,val){
      state.returnStatisticsId = val
    },
    setNetModalDetailData(state,val){
      state.netModalDetailData = val
    },
    setNetModalDetailNodeId(state,val){
      state.netModalDetailNodeId = val
    },
    setChangenetpx(state,val){
      state.changenetpx = val
    },
    setSelectNetNodes(state,val){
      state.selectNetNodes = val
    },
    setSelectGeoNodes(state,val){
      state.selectGeoNodes = val
    },
    setSelectContentNodes(state,val){
      state.selectContentNodes = val
    },
    setSplit(state,val){
      state.split = val
    },
    setSplit_net(state,val){
      state.split_net = val
    },
    setSplit_geo(state,val){
      state.split_geo = val
    },
    setSplit_content(state,val){
      state.split_content = val
    },
    setDataStatisticsEvent(state,val){
      state.dataStatisticsEvent = val
    },
    setDataexpand(state,val){
      state.dataexpand = val
    },
    setSinglePerson(state,val){
      state.singlePerson = val
    },
    setAddNetNodes(state,val){
      state.addNetNodes = val

    },
    setSearchNetResult(state,val){
      state.searchNetResult = val
    },
    setSearchGeoEventResult(state,val){
      state.searchGeoEventResult = val
    },
    setSearchGeoEntityResult(state,val){
      state.searchGeoEntityResult = val
    },
    setSearchContentResult(state,val){
      state.searchContentResult = val
    },
    setViewHeight(state,height){
      state.viewHeight = height
    },
    setViewHeight_20(state,height){
      state.viewHeight_20 = height
    },
    setViewHeight_20_geo(state,height){
      state.viewHeight_20_geo = height
    },
    setViewHeight_20_content(state,height){
      state.viewHeight_20_content = height
    },
    setViewHeight_30(state,height){
      state.viewHeight_30 = height
    },
    setViewHeight_30_geo(state,height){
      state.viewHeight_30_geo = height
    },
    setViewHeight_30_content(state,height){
      state.viewHeight_30_content = height
    },
    setEventHeight(state,height){
      state.eventHeight = height
    },
    setNetDivHeight(state,height){
      state.netDivHeight = height
    },
    setNetHeight(state,height){
      state.netHeight = height
    },
    setContentDivHeight(state,height){
      state.contentDivHeight = height
    },
    setContentHeight(state,height){
      state.contentHeight = height
    },
    setGeoDivHeight(state,height){
      state.geoDivHeight = height
    },
    setGeoHeight(state,height){
      
      state.geoHeight = height
    },
    setTabSelectNet(state,val){
      
      state.tabSelectNet = val
    },
    setTabSelectGeo(state,val){
      
      state.tabSelectGeo = val
    },
    setTabSelectContent(state,val){
      
      state.tabSelectContent = val
    },
    setSearchModalResult(state,val){
      
      state.searchModalResult = val
    },
    setNetSelectedParam(state,val){
      state.net_selected_param = val
    },
    setGeoSelectedParam(state,val){
      state.geo_selected_param = val
    },
    setGeoOnlyselectedParam(state,val){
      state.geo_onlyselected_param = val
    },
    setContentSelectedParam(state,val){
      state.content_selected_param = val
    }
  },
  getters:{
    // 这里，getters只负责取数据，不负责修改数据，修改数据，请调用mutations
    // 类似于computed，只要state变化，如果getters也引用了这个数据，则立即触发
    // getters里取数据就相当于this.$store.state.XXX进行了二次包装包装后的数据并未修改原数据
    getTMSS: function(state){
      return '现在是：'+state.tmss
    },
    getEventHeight: function(state){
      return state.eventHeight + 'px'
    },
    getViewHeight: function(state){
      return state.viewHeight + 'px'
    },
    getViewHeight_20: function(state){
      return state.viewHeight_20 + 'px'
    },
    getViewHeight_20_geo: function(state){
      return state.viewHeight_20_geo + 'px'
    },
    getViewHeight_20_content: function(state){
      return state.viewHeight_20_content + 'px'
    },
    getNetDivHeight: function(state){
      return state.netDivHeight + 'px'
    },
    getNetHeight: function(state){
      return state.netHeight + 'px'
    },
    getContentDivHeight: function(state){
      return state.contentDivHeight + 'px'
    },
    getContentHeight: function(state){
      return state.contentHeight + 'px'
    },
    getGeoDivHeight: function(state){
      return state.geoDivHeight + 'px'
    },
    getGeoHeight: function(state){
      
      return state.geoHeight + 'px'
    },

    getNetData: function(state){
      return state.netData
    },
    getSplit: function(state){
      return state.split
    }, 
    getSplitWidth: function(state){
      return document.documentElement.clientWidth * state.split - 20 + 'px'
    }
  }
});
const router = new VueRouter(RouterConfig);

router.beforeEach((to, from, next) => {
    iView.LoadingBar.start();
    Util.title(to.meta.title);
    next();
});

router.afterEach((to, from, next) => {
    iView.LoadingBar.finish();
    window.scrollTo(0, 0);
});

new Vue({
    el: '#app',
    store: store, // 可以缩写 store 只要挂载再vm上，就可以全局访问了
    router: router, // 可以缩写 router
    render: h => h(App)
});
