import echarts from 'echarts'
//import { ENGINE_METHOD_DIGESTS } from 'constants';


var rightMenu = function(t,target,config){
    var mthis = t;
    var myChart = echarts.init(target);
    var firstMenu = [];
    var timeout = null;
    for(let i = 0; i < config.length; i++){
        var menuItem = config[i];
        if(menuItem.parentId === 0){
            firstMenu.push(menuItem)
        }
    }
    var firstMenusNum = firstMenu.length
    var rotate = 360 / firstMenusNum;
    var data = [];
    var firstColors = []
    var placeHolderStyle = {
        normal: {
            color: 'rgba(0, 0, 0, 0)',
            borderColor: 'rgba(0, 0, 0, 0)',
            borderWidth: 0
        }
        // normal: {
        //     color: 'yellow',
        //     borderColor: 'green',
        //     borderWidth: 1
        // }
    };
    for(let i = 0; i < firstMenusNum; i++){
        let dataItem = firstMenu[i]
        data.push({
            'value':(360 - firstMenusNum) / firstMenusNum,
            'name':dataItem.name,
            'id':dataItem.Id,
            'callback':dataItem.backcall,
            'hasLeaf':dataItem.hasLeaf,
            'selected':false
        },{
            value: 1,
            name: '',
            itemStyle: placeHolderStyle
        })
        firstColors.push(dataItem.color);
        
    }
    
    var firstSeries = {
        name:'右键菜单',
        type:'pie',
        radius: ['20%', '50%'],
        startAngle: 0,
        avoidLabelOverlap: false,
        color:firstColors,
        selectedMode: 'single',
        label: {
            normal: {
                //position: 'inner'
                //show: false,
                position: 'inner',
                textStyle : {
                    fontSize : 10    //文字的字体大小
                },
                color:'#CCFFFF',
                fontStyle:'normal'
            },
            emphasis: {
                show: true,
                textStyle: {
                    fontSize: '12',
                    fontWeight: 'bold'
                }
            }
        },
        labelLine: {
            normal: {
                show: false
            }
        },
        data:data,
        //itemStyle: itemStyle
    };
    var option = {
        series: [firstSeries]
    };
    //this.deleteRightMenu = function(){},
    myChart.setOption(option);
    myChart.on('click', function (params) {
        var hasLeaf = params.data.hasLeaf; 
        if(!hasLeaf){
            var id = params.data.id;
            if(id === 'transparent'){
                timeout = setTimeout(function(){
                    mthis.deleteRightMenu();
                },1000)
            } else {
                var func=eval(params.data.callback);
                func.call(mthis);
            }
        } else {
            var seriesArr = myChart.getOption().series;
            var clickedParamId = params.data.id;
            if(seriesArr.length > 1 && seriesArr[1].name === clickedParamId){
                var secondData = {   
                    name:parentId,
                    type:'pie',
                    radius: ['60%', '90%'],
                    startAngle: shiftRotate,
                    color:secondColor,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            position: 'inner',
                            textStyle : {
                                fontSize : 10    //文字的字体大小
                            }
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[{'value':1,
                    'name':'',
                    'id':'transparent',
                    'callback':'',
                    'hasLeaf':false}]
                    
                };
                var option = {
                    series: [firstSeries,secondData]
                };
                myChart.setOption(option);  //取消掉第二级菜单
            } else {
                var parentId = params.data.id;
                var nextMenu = [];
                for(let i = 0; i < config.length; i++){
                    var smenuItem = config[i];
                    if(smenuItem.parentId === parentId){
                        nextMenu.push(smenuItem)
                    }
                }
                var secondData = [];
                var secondRotate = rotate/2;  //二级菜单块的角度
                var eValue = 360 - secondRotate * nextMenu.length;
                var secondColor = [];
                for(let i = 0; i < nextMenu.length; i++){
                    let dataItem = nextMenu[i]
                    secondData.push({
                        'value':secondRotate,
                        'name':dataItem.name,
                        'id':dataItem.id,
                        'callback':dataItem.backcall,
                        'hasLeaf':dataItem.hasLeaf
                    })
                    secondColor.push(dataItem.color)
                };
                secondData.push({
                    'value':eValue,
                    'name':'',
                    'id':'transparent',
                    'callback':'',
                    'hasLeaf':false
                })
                secondColor.push('transparent')
                var centerRotate = rotate * (parentId - 0.5); //偏移后二级菜单的中心的角度
                var secondNum = nextMenu.length;
                var centerRotateBfShift = secondNum * secondRotate / 2;  //偏移前二级菜单的中心的角度
                var shiftRotate = centerRotateBfShift - centerRotate ;  //二级菜单中心的偏移角度
                
                var secondMenuSeries = {
                    name:parentId,
                    type:'pie',
                    radius: ['60%', '90%'],
                    startAngle: shiftRotate,
                    color:secondColor,
                    avoidLabelOverlap: false,
                    label: {
                        normal: {
                            position: 'inner',
                            textStyle : {
                                fontSize : 10    //文字的字体大小
                            },
                            color:'#CCFFFF',
                            fontStyle:'normal'
                        },
                        emphasis: {
                            show: true,
                            textStyle: {
                                fontSize: '12',
                                fontWeight: 'bold'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:secondData,
                }
                var option = {
                    series: [firstSeries,secondMenuSeries]
                };
                myChart.setOption(option);
            }
        }
    });
    myChart.on('mouseover',function(params){
        var id = params.data.id;
        if(id === 'transparent'){
            timeout = setTimeout(function(){
                mthis.deleteRightMenu();
            },1000)
        } else {
            clearTimeout(timeout);
        }
        //var event = params.event;
        //event.stopPropagation();
    })
    myChart.on('mouseout',function(params){
        timeout = setTimeout(function(){
            mthis.deleteRightMenu();
        },1000)
    })
};
export  {rightMenu}