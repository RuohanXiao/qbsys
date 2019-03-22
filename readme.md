# iView-project

This project is build for Vue.js 2 + vue-router + webpack2 + iView 3, just install and run.

## Install
```bush
// install dependencies
npm install
```
## Run
### Development
```bush
// For the first time, run init to create index.html
npm run init
npm run dev
```
### Production(Build)
```bush
npm run build
```

```
sudo cp -r /home/xrh/ivewProject/dist  .
sudo cp  /home/xrh/ivewProject/index.html  .
```


-------------------------


## 更新日志：v(正式/非正式).(大版本号).(部署代号).(日期)(提交人)
```
v0.1.1.0121x
  创建项目，完成了整体框架的构建

v0.1.1.0125d
1、修复目标详情弹出框的头像
2、修复目标详情无信息显示的情况
3、修复目标详情弹出框中如果仅有一个实体详情的话，不显示tabs
4、添加数据透视点击后node高亮的功能
5、更改地图点上悬浮的overlay样式

v0.1.1.0129d
1、geo增加全选按钮
2、geo增加复位按钮

v0.1.1.0129d
1、增加geoTonet、geoTocontent、netToget

v0.1.1.0130d
1、修复net模块中添加目标弹出框

v0.1.1.0214d
1、修复geo模块中的删除、反选、全选、复位按钮中的bug
2、增加翻译功能

v0.1.1.0214x
  --问题修复--
1.优化下拉按钮效果（hover触发和长按触发），待调研
2.修复网络关系、地理空间、文本三个模块的时间轴伸缩及位置变形等相关BUG
3.修复分割线调整左右板块大小时对其他模块产生的影响
4.修复文本模块中查询文本，如只有一个文本匹配时，div变形的问题
5.修正右侧目标详情板块过长的问题
6.修改下拉按钮样式

  --新增功能--
1.增加网络关系节点中，loading功能，避免用户重复操作，样式待调整
2.增加气泡提示，可以用作消息提示，样式待调整


v0.1.1.0215x
修复搜索时部分选项不出现的BUG

v0.1.1.0219x
1.修改文本选中左角标样式
2.修改文本选中样式
3.修改文本标题超链接，点击链接时进入文本详情，点击其他位置，选中文本块
4.调整文本模块时间轴位置伸缩多次显示异常的BUG
5.添加文本loading图层
6.时间轴框选调用后端API增加防抖
7.翻译板块增加滚动条
8.调整文本详情文本位置
9.预留自定义鼠标样式位置

v0.1.1.0219d
增加geo模块中的搜索功能


v0.1.1.0221x
1.文本翻译按钮从点击按钮改成状态按钮
2.增加下拉按钮角标
3.增加页面标签页ico
4.增加工作集功能和界面（详情弹框，修改弹框，删除按钮）

v0.1.1.0221d
1、更改搜索和推送到geo模块为数据的追加
2、修复全选按钮的bug

v0.1.1.0222d
1、将geo模块中的点改成同样大小
2、为geo模块中的点增加了半选中状态 'halflife'



v0.1.1.0304x
1.更改文档模块进入详情的触发方式（双击）
2.搜索框，聚焦时放大镜图标高亮，去掉边框
3.添加选中详情（重做）
4.增加选中逻辑，样式，接口调用

v0.1.1.0304d
1、更改按钮，变为有时可用有时不可用

v0.1.1.0306d
1、添加热力图功能

v0.1.1.0307d
1、修改数据透视

v0.1.1.0313d
1、添加地名搜索（目前不支持中文，地名只支持英文，且目前只有省级行政区）
2、搜索行政区后，在地图上标绘出来

xrh
1.改正点击节点，节点位移的BUG
2.更改link颜色


v0.1.1.0319d
1、地名搜索添加国家级行政区划，并增加中英文搜索（由于翻译的原因，省级行政区划的中文搜索有些问题）

v0.1.1.0320d
1、增加探索（初版，且中国没办法探索，猜想可能是中国的geometry有问题）

v0.1.1.0321d
1、修改geo模块的按钮
2、增加geo模块地名探索出来的机构的悬浮事件



v0.1.1.0322x
1.修改搜索BUG
2.修改网络分析zoomchart样式
3.修改高亮状态
4.更新updateStyle

v0.1.1.0322d
1、地名搜索增加多次搜索（高亮地区由多选改为添加）
2、增加高亮行政区的删除（点击在高亮处，即可删除）



部署时修改本地资源为服务器资源！！！！
custom_event_net    home
```