import echarts from 'echarts'
//import { ENGINE_METHOD_DIGESTS } from 'constants';


var rightMenu = function(t,target,config){
    var mthis = t;
    var firstMenuRadius = ['20%','55%'];
    var secoundMenuRadius = ['60%','95%'];
    var disableColor = "rgba(204,255,255,0.4)";
    var ableColor = "rgba(204,255,255,1)";
    var nowOpr = {
        'inOrOut':'',
        'parentId':'',
        'id':''
        
    };
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
        },
    };
    for(let i = 0; i < firstMenusNum; i++){
        let dataItem = firstMenu[i]
        let color = dataItem.disable?disableColor:ableColor;
        let icon = dataItem.disable?dataItem.disicon:dataItem.icon;
        data.push({
            'value':(360 - firstMenusNum) / firstMenusNum,
            'name':dataItem.Id.toString(),
            'id':dataItem.Id,
            'callback':dataItem.backcall,
            'hasLeaf':dataItem.hasLeaf,
            'isLeaf':false,
            'selected':false,
            'parentId':dataItem.parentId,
            'disable':dataItem.disable,
            'label': {
                normal: {
                    position: 'inner',
                    formatter: [
                        '{icon|}',
                        '{title|' + dataItem.name +'}{abg|}'    // {a}指series.name  {b}指series.data的name// {c}指series.data的value  {d}%指这一部分占总数的百分比
                    ].join('\n'),
                    backgroundColor:'transparent',
                    borderColor: '#777',
                    
                    rich: {
                        icon:{
                            height: 30,
                            align: 'center',
                            backgroundColor: {
                                image: require("../images/rightMenuImage/" + icon)
                            },
                        },
                        title: {
                            color: color,
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: 'transparent',
                            width: '100%',
                            align: 'right',
                            height: 25,
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                }
            }
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
        /* animationType:"scale ", */
        radius: firstMenuRadius,
        startAngle: 0,
        avoidLabelOverlap: false,
        color:firstColors,
        selectedMode: false,//'single',
        hoverAnimation:false,
        animation:false,
        labelLine: {
            normal: {
                show: false
            }
        },
        data:data,
        emphasis: {
            show: false,
            /* textStyle: {
                fontSize: '12',
                fontWeight: 'bold'
            } */
        }
        //itemStyle: itemStyle
    };
    var option = {
        series: [firstSeries]
    };
    myChart.setOption(option);
    //this.deleteRightMenu = function(){},
    let overOption = function(params){
        var disable = params.data.disable;
        var name = params.data.name;
        var seriesName = params.seriesName;
        var hasLeaf = params.data.hasLeaf;
        if(!disable){
            
            if(hasLeaf){
                develpSecoundMenu(params);
            } else{
                var parentId = params.data.parentId;
                if(parentId === 0){
                    cancalSecoundMenu();
                }
                
            }
            myChart.dispatchAction({
                type: 'pieSelect',
                seriesName:seriesName ,
                name: name
            })
        } else {
            myChart.dispatchAction({
                type: 'pieSelect',
                seriesName:seriesName ,
                name: -1
            });
            cancalSecoundMenu();
        }
    }
    let develpSecoundMenu = function(params){
        var parentId = params.data.id;
        var nextMenu = [];
        for(let i = 0; i < config.length; i++){
            var smenuItem = config[i];
            if(smenuItem.parentId === parentId){
                nextMenu.push(smenuItem)
            }
        }
        var secondData = [];
        var secondRotate = 40;  //二级菜单块的角度
        var eValue = 360 - secondRotate * nextMenu.length;
        for(let i = 0; i < nextMenu.length; i++){
            let dataItem = nextMenu[i];
            let color = dataItem.disable?disableColor:ableColor;
            let icon = dataItem.disable?dataItem.disicon:dataItem.icon;
            secondData.push({
                'value':secondRotate - 1,
                'name':dataItem.Id.toString(),
                'id':dataItem.Id,
                'parentId':dataItem.parentId,
                'callback':dataItem.backcall,
                'hasLeaf':dataItem.hasLeaf,
                'isLeaf':true,
                'disable':dataItem.disable,
                'label': {
                    normal: {
                        position: 'inner',
                        formatter: [
                            '{icon|}',
                            '{title|' + dataItem.name +'}{abg|}'    // {a}指series.name  {b}指series.data的name// {c}指series.data的value  {d}%指这一部分占总数的百分比
                        ].join('\n'),
                        backgroundColor: 'transparent',
                        borderColor: '#777',
                        rich: {
                            icon:{
                                height: 30,
                                align: 'center',
                                backgroundColor: {
                                    image: require("../images/rightMenuImage/" + icon)
                                }
                            },
                            title: {
                                color: color,
                                align: 'center'
                            },
                            abg: {
                                backgroundColor: 'transparent',
                                width: '100%',
                                align: 'right',
                                height: 25,
                                borderRadius: [4, 4, 0, 0]
                            }
                        }
                    }
                },
                'itemStyle': {
                    normal: {
                        color: dataItem.color
                    }
                }
            },{
                value: 1,
                name: '',
                itemStyle: placeHolderStyle
            })
        };
        secondData.push({
            'value':eValue,
            'name':'',
            'id':'transparent',//'transparent',
            'parentId':0,
            'callback':'',
            'hasLeaf':false,
            'isLeaf':true,
            'disable':true,
            'label': {
                normal: {
                    position: 'inner',
                    formatter: [
                        '{title|{b}}{abg|}'// {a}指series.name  {b}指series.data的name// {c}指series.data的value  {d}%指这一部分占总数的百分比
                    ].join('\n'),
                    backgroundColor: 'transparent',
                    borderColor: '#777',
                    rich: {
                        title: {
                            color: '#eee',
                            align: 'center'
                        },
                        abg: {
                            backgroundColor: 'transparent',
                            width: '100%',
                            align: 'right',
                            height: 25,
                            borderRadius: [4, 4, 0, 0]
                        }
                    }
                }
            },
            'itemStyle': {
                normal: {
                    color: "transparent"
                }
            }
        })
        var centerRotate = rotate * (parentId - 0.5); //偏移后二级菜单的中心的角度
        var secondNum = nextMenu.length;
        var centerRotateBfShift = secondNum * secondRotate / 2;  //偏移前二级菜单的中心的角度
        var shiftRotate = centerRotateBfShift - centerRotate ;  //二级菜单中心的偏移角度
        
        var secondMenuSeries = {
            name:parentId,
            type:'pie',
            /* animationType:"scale ", */
            radius: secoundMenuRadius,
            startAngle: shiftRotate,
            hoverAnimation:false,
            animation:false,
            /* color:['white','white','white','white'],//secondColor, */
            avoidLabelOverlap: false,
            selectedMode: 'single',
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
    let cancalSecoundMenu = function(){
        /* var seriesArr = myChart.getOption().series;
        var clickedParamId = params.data.id; */
            
        var secondData = {   
            name:-1,
            type:'pie',
            radius: ['60%', '90%'],
            /* startAngle: shiftRotate,
            color:secondColor, */
            avoidLabelOverlap: false,
            animationType:"scale ",
            label: {
                normal: {
                    position: 'inner',
                    textStyle : {
                        fontSize : 10    //文字的字体大小
                    }
                },
                emphasis: {
                    show: false,
                    /* textStyle: {
                        fontSize: '12',
                        fontWeight: 'bold'
                    } */
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
            'hasLeaf':false,
            'itemStyle': {
                normal: {
                    color: "transparent"
                }
            }}]
            
        };
        var option = {
            series: [firstSeries,secondData]
        };
        myChart.setOption(option);  //取消掉第二级菜单
    }
    let _deleteRightMenu = function(){
        myChart.dispose();
        var PN = target.parentNode;
        PN.removeChild(target);
    }
    this.deleteRightMenu = _deleteRightMenu;
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
        }
            
    });
    myChart.on('mouseover',function eConsole(params){
        var id = params.data.id;
        if(id === 'transparent'){
            timeout = setTimeout(function(){
                /* mthis.deleteRightMenu(); */
                myChart.dispose();
            },500)
        } else {
            clearTimeout(timeout);
        }
        var parentId = params.data.parentId;
        var lastparentId = nowOpr.parentId
        var lastId = nowOpr.id;
        if(id === lastId || id === lastparentId){
            overOption(params)
            //return;
        } else {
            overOption(params);
            nowOpr.inOrOut = 'in';
            nowOpr.id = id;
            nowOpr.parentId = parentId;
        }
        
    })
    myChart.on('mouseout',function eConsole(params){
        /* var disable = params.data.disable;
        var name = params.data.name;
        var seriesName = params.seriesName;
        var hasLeaf = params.data.hasLeaf; */
       /*  if(!disable){
            myChart.dispatchAction({
                type: 'pieUnSelect',
                // 可选，系列 index，可以是一个数组指定多个系列
                //seriesIndex: 1,
                // 可选，系列名称，可以是一个数组指定多个系列
                seriesName:seriesName ,
                // 数据的 index，如果不指定也可以通过 name 属性根据名称指定数据
                //dataIndex: 1,
                // 可选，数据名称，在有 dataIndex 的时候忽略
                name: name
            })
        } */
        timeout = setTimeout(function(){
            /* mthis.deleteRightMenu(); */
            _deleteRightMenu();
        },500)
    })
};
export  {rightMenu}