class GISOperator{
    constructor() {
        this.config = [
                {
                    name:'热力分析',
                    id:'heatMap',
                    iconName:'icon-star',
                    openFunction:'openHeat',
                    closeFunction:'closeHeat',
                    operatorSurface:[
                        {
                            name:'选择热力属性',
                            id:'heatAttr',
                            type:'Select',
                            attrName:'AttrName', 
                            excuteFunction:'setHeatMapAttr',
                            value:{
                                options:[
                                    // {
                                    //     label:'a',
                                    //     value:'a'
                                    // },
                                    // {
                                    //     label:'b',
                                    //     value:'b'
                                    // },
                                ],
                                defaultValue:''
                            }
                        },
                        {
                            name:'半径大小',
                            id:'heatRadius',
                            type:'Slider',
                            attrName:'radius', 
                            excuteFunction:'setHeatMapRadius',
                            value:{
                                extent:[1,50],
                                defaultValue:20
                            }
                        },{
                            name:'热力模糊度',
                            id:'heatBlur',
                            type:'Slider',
                            attrName:'blur',
                            excuteFunction:'setHeatMapBlur',
                            value:{
                                extent:[1,50],
                                defaultValue:20
                            }
                        }
                    ]
                },
                {
                    name:'图层处理',
                    id:'layerHandle',
                    iconName:'icon-file',
                    disabled:true,
                },
                {
                    name:'轨迹分析',
                    id:'locusAnalyse',
                    iconName:'icon-route',
                    disabled:true
                },
                {
                    name:'空间分析',
                    id:'spatialAnalyse',
                    iconName:'icon-kongjianfenxi',
                    disabled:true
                },
                {
                    name:'获取更多',
                    id:'getMore',
                    iconName:'icon-more',
                    disabled:true
                }
        ]
    }
    getConfig(){
        return this.config;
    }
    setSurfaceValue(operatorId,surfaceId,value){
        for(let i = 0; i < this.config.length; i++){
            let operId = this.config[i].id;
            if(operId === operatorId){
                let operatorSurface = this.config[i].operatorSurface;
                for(let j = 0; j < operatorSurface.length; j++){
                    let surId = operatorSurface[j].id;
                    if(surId === surfaceId){
                        operatorSurface[j].value = value;
                    }
                }
            }
        }
    }
    change(){
        this.config[0].operatorSurface[0].name = "aaaa"
    }
}

export  {GISOperator}