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
  Vue.use(VueResource);
//   Vue.component(Select.name, Select)
  
  Vue.use(VueRouter);
  Vue.use(iView);
  Vue.use(echarts);
  Vue.use(Vuex);
//   Vue.use(Antd);
// 路由配置
const RouterConfig = {
    // mode: 'history',
    mode: 'hash',
    routes: Routers
};
var store = new Vuex.Store({
  state: {
    // 组件获取数据方式 this.$store.state.XXX
    tmss:'net', // top menu selected stutas
    searchResult: '', // search result
    viewHeight: 0,
    eventHeight: 0,
    netHeight: 0,
    netDivHeight: 0,
    netData: null,
    contentHeight: 0,
    contentDivHeight: 0,
    contentData: null,
    geoHeight: 0,
    geoDivHeight: 0,
    geoData: null,
    split:0.85,
    singlePerson:true,
    dataStatisticsEvent: null,
    dataexpand: [{
      name:'',
      img:'',
      type:''
    }]
  },
  mutations:{
    // 修改state里的数据时，只能通过mutations的形式来操作
    // 虽然this.$store.state.XXX也可以修改，但是不符合XUEX的理念，万一导致存储数据的混乱，则不能快速溯源，因为每个组件都有可能操作数据
    changeTMSS(state,newStatus){
      // 组件想调用方法，可以使用   this.$store.commit('XXX')
      // 第一个参数始终为state,第二个可以传参（只能支持一个参数，可以通过对象或者数组传多值）
      state.tmss = newStatus
    },
    setSplit(state,val){
      state.split = val
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
    setSearchResult(state,val){
      state.searchResult = val
    },
    setViewHeight(state,height){
      state.viewHeight = height
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
      return state.viewHeight + 'px'
    },
    getViewHeight: function(state){
      return state.viewHeight + 'px'
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
