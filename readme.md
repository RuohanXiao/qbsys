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


```