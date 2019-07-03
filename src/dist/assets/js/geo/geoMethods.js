import util from "../../../../util/tools.js"
export default {
    
   /*方法说明
    *@method getParamIdsFromFeature
    *@param{Object}feature openlayers中的feature
    *@param{Array}ids 存储每个feature中QBParam的id的集合,引用类型
    */
    getParamIdsFromFeature(feature,ids){  //根据feature获得其中的所有param的id
        var params = feature.get('Params');
        for(let i = 0; i < params.length; i++){
            let param = params[i];
            let id = param.ParamId;
            ids.push(id);
        }
    },

    /*方法说明
    *@method getAllFeaturesNumByIds
    *@param{Array}ids 存储每个feature中QBParam的id的集合
    *@param{Object}QBIdsToFeatureIdList QBParam的id与其所在feature的字典
    *@param{Object}featureNumList 存储feature的id和其对应的selectedNum
    */
    getAllFeaturesNumByIds(ids,QBIdsToFeatureIdList,featureNumList){
        for(let i = 0; i < ids.length; i++){
            let id = ids[i];
            let featureId = QBIdsToFeatureIdList[id];
            if(featureNumList[featureId] === undefined){
                featureNumList[featureId] = 1;
            } else {
                featureNumList[featureId]++;
            }
        }
    },

    /*根据ids获取其对应的featureIds
    *@method getFeatureIdsByIds
    *@param{Array}ids 存储每个feature中QBParam的id的集合
    *@param{Object}QBIdsToFeatureIdList QBParam的id与其所在feature的字典
    *@param{Object}featureIds 存储feature的id,引用类型
    */
    getFeatureIdsByIds(ids,QBIdsToFeatureIdList,featureIds){
        for(let i = 0; i < ids.length; i++){
            let id = ids[i];
            let featureId = QBIdsToFeatureIdList[id];
            let index = util.itemIndexInArr(featureId,featureIds);
            if(index === -1){
                featureIds.push(featureId)
            }
        }
    },

    /*方法说明
    *@method getAllFeaturesNumByIds
    *@param{Array}selectedIds 选中的QBParam的id的集合
    *@param{Array}HLIds 高亮的QBParam的id的集合
    *@param{Array}features QBParam所在的所有feature的集合
    *@param{Object}QBIdsToFeatureIdList QBParam的id与其所在feature的字典
    */
    setAllFeaturesStatus(selectedIds,HLIds,features,QBIdsToFeatureIdList){
        var selectedfeatureNumList = {};
        var HLFeatureNumList = {};
        this.getAllFeaturesNumByIds(selectedIds,QBIdsToFeatureIdList,selectedfeatureNumList);
        this.getAllFeaturesNumByIds(HLIds,QBIdsToFeatureIdList,HLFeatureNumList);
        for(let i = 0; i < features.length; i++){
            let feature = features[i];
            let id = feature.getId();
            if(selectedfeatureNumList[id] === undefined){
                feature.set('selectedNum',-1,false);
            } else {
                let num = 0;
                if(HLFeatureNumList[id] !== undefined){
                    num = HLFeatureNumList[id];
                }
                feature.set('selectedNum',num,false);
            }
        }
    },
    /*设置给定features的高亮和半高亮状态
    *@method setFeaturesHalfOrHL
    *@param{Array}HLIds 高亮的QBParam的id的集合
    *@param{Array}features QBParam所在的所有feature的集合
    *@param{Object}QBIdsToFeatureIdList QBParam的id与其所在feature的字典
    */
    setFeaturesHalfOrHL(HLIds,features,QBIdsToFeatureIdList){
        var HLFeatureNumList = {};
        this.getAllFeaturesNumByIds(HLIds,QBIdsToFeatureIdList,HLFeatureNumList);
        for(let i = 0; i < features.length; i++){
            let feature = features[i];
            let id = feature.getId();
            if(HLFeatureNumList[id] === undefined){
                feature.set('selectedNum',0,false);
            } else {
                let num = HLFeatureNumList[id];
                feature.set('selectedNum',num,false);
            }
        }
    },
    /*将geo模块画布之外流通QBId转换为画布之内流通的ParamId
    *@method QBIdsToParamIds
    *@param{Array} QBIds 事件和组织机构Ids
    *@param{Object} QBIdToParamIdsList  事件和组织机构Ids对应ParamIds的字典
    */
    QBIdsToParamIds(QBIds,QBIdToParamIdsList){
        var allParamIds = [];
        for(let i = 0; i < QBIds.length; i++){
            let qbId = QBIds[i];
            let paramIds = QBIdToParamIdsList[qbId];
            allParamIds = allParamIds.concat(paramIds)
        }
        return allParamIds;
    }
}


