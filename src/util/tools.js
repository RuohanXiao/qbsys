export default {
  //将普通function转为promise方法
  // .eg1:
  //   mgr.readFile(filePath,successCallback,errorCallback, isText)
  // 转换后
  //   promisify(readFile,[filePath,Promise,isText],mgr)
  //     .then(....)
  //     .catch(...)
  // .eg2:
  // readFile(successCallback,errorCallback,filePath,isText)
  // 转换后
  //     promisify(readFile,[filePath,isText])
  //     .then(....)
  //     .catch(...)
  promisify(method,params,scope){
    let index = params.indexOf(Promise);
    if(index<0) {
        index = 0;
    }
    return new Promise((resolve,reject)=>{
        params.splice(index,1,resolve,reject)
        method.apply(scope,params)
    })
  },
  //判断空对象
  isEmptyObject(obj){
    for(var key in obj){
      return false
    };
    return true
  },
  checkImg(imgurl){
    var p = new Promise(function(resolve, reject){
      var ImgObj = new Image(); //判断图片是否存在  
      ImgObj.src = imgurl;
      //没有图片，则返回-1  
      if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
        resolve(true);
      } else{
        reject(false);
      }
    });
    return p;   
  },
  //验证图片资源是否存在（404）
  checkImgExists(imgurl) {

    var ImgObj = new Image(); //判断图片是否存在  
    ImgObj.src = imgurl;
    //没有图片，则返回-1  
    if (ImgObj.fileSize > 0 || (ImgObj.width > 0 && ImgObj.height > 0)) {
      return true;
    } else {
      return false;
    }
  },

  // 两数组交集
  intersect(arr1, arr2) {
    if (Object.prototype.toString.call(arr1) === "[object Array]" && Object.prototype.toString.call(arr2) === "[object Array]") {
      return arr1.filter(function (v) {
        return arr2.indexOf(v) !== -1
      })
    }
  },
  // 两数组并集
  union(arr1, arr2) {
    if (Object.prototype.toString.call(arr1) === "[object Array]" && Object.prototype.toString.call(arr2) === "[object Array]") {
      return arr1.concat(arr2).unique()
    }
  },
  // 两数组合并
  hebing(resarr, hebingarr) {
    resarr = resarr.concat(hebingarr);
    return resarr;
  },
  // 判断数组中是否包含某元素
  ifInArr(param, arryParams) {
    return !(arryParams.indexOf(param) < 0)
  },
  // 数组去重
  unique(arr) {
    var res = [];
    var json = {};
    for (var i = 0; i < arr.length; i++) {
      if (!json[arr[i]]) {
        res.push(arr[i]);
        json[arr[i]] = 1;
      }
    }
    return res;
  },
  // 两数组不同元素
  diff(arr1, arr2) {
    var newArr = [];
    var arr3 = [];
    for (var i = 0; i < arr1.length; i++) {
      if (arr2.indexOf(arr1[i]) === -1)
        arr3.push(arr1[i]);
    }
    var arr4 = [];
    for (var j = 0; j < arr2.length; j++) {
      if (arr1.indexOf(arr2[j]) === -1)
        arr4.push(arr2[j]);
    }
    newArr = arr3.concat(arr4);
    return newArr;
  },

  //判断某对象属性是否存在且为非空字符串，若是则返回true，否为返回false
  ishasValue(pro) {
    if (pro == '') {
      return false;
    } else {
      return true;
    }
  },

  //判断item是否存在于arr数组中，若存在，则返回第一个位置，若不存在，则返回-1
  itemIndexInArr(item,arr){
    if(arr.length > 0){
        for(var i = 0; i < arr.length; i++){
            if(item == arr[i]){
                return i;
            }
            if(i == arr.length-1){
                return -1;
            }
        }
    } else {
        return -1;
    }
},
// 获取当前日期
getNowFormatDate() {
  var date = new Date();
  var seperator1 = "-";
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var strDate = date.getDate();
  if (month >= 1 && month <= 9) {
      month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
  }
  var currentdate = year + seperator1 + month + seperator1 + strDate;
  return currentdate;
},
  // date yy-mm-dd 转 时间戳 (秒)
  getTimestamp(time) {
    return Date.parse(new Date(time)) / 1000;
  },
  // date yy-mm-dd 转 时间戳 (毫秒)
  getTimestampMS(time) {
    return Date.parse(new Date(time));
  },

  //时间戳转(毫秒) yy-mm-dd
  transformPHPTimeMS(time) {
    var date = new Date(time * 1000);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    let space = ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();

    // return Y + M + D + space + h + m + s;
    return Y + M + D;
  },
  //时间戳转(秒) yy-mm-dd
  transformPHPTime(time) {
    var date = new Date(time);
    let Y = date.getFullYear() + '-';
    let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    let D = date.getDate();
    let space = ' ';
    let h = date.getHours() + ':';
    let m = date.getMinutes() + ':';
    let s = date.getSeconds();

    // return Y + M + D + space + h + m + s;
    return Y + M + D;
  },
  //树形递归遍历
  traverseNode(node) {
    // console.log('----node-----')
    // console.log(node)
  },
  traverseTree(node) {
    if (!node) {
      return;
    }
    traverseNode(node);
    if (node.children && node.children.length > 0) {
      var i = 0;
      for (i = 0; i < node.children.length; i++) {
        this.traverseTree(node.children[i]);
      }
    }
  },
  //非递归遍历
  traverseNode2(node) {
    // console.log('------')
    // console.log(node)
    // console.log('------')
  },
  traverseTree2(node) {
    if (!node) {
      return;
    }

    var stack = [];
    stack.push(node);
    var tmpNode;
    while (stack.length > 0) {
      tmpNode = stack.pop();
      this.traverseNode2(tmpNode);
      if (tmpNode.children && tmpNode.children.length > 0) {
        var i = tmpNode.children.length - 1;
        for (i = tmpNode.children.length - 1; i >= 0; i--) {
          stack.push(tmpNode.children[i]);
        }
      }
    }
  },
  // 写入本地存储
  writeStorage(name,ids){
    sessionStorage.setItem(name,JSON.stringify(ids))
  },
  getStorage(name,index){
    var idArr = JSON.parse(sessionStorage.getItem(name))
    if(Array.isArray(index)){
      if(index[0] == index[1]){
        let useIds = idArr[index[0]]
        useIds = useIds.filter(item => item.length>0)
        return useIds
      }else{
        let useIds  = idArr.slice(index[0],index[1]+1)
        useIds = useIds.filter(item => item.length>0)
        return useIds
      }
      
      
     
    }else{
      return idArr[index]
    }
    
  },
  removeStorage(name){
    sessionStorage.removeItem(name)
  },
  // //xml转json
  // Xml2Json(xml) {
  //   let jsonobj;
  //   for(var i = 0;i<xml.children.length;i++){
  //     var nodes = xml.children;
  //     // console.log(nodes)
  //     for
  //     // jsonobj.name = xml.getAttribute("name");
  //     // //属性还是要根据实际情况设置
  //     // jsonobj.children = [];
  //     // for(var x = 0;x<nodes.length;x++){
  //     //   jsonobj.children.push(nodes[x]);
  //     // }
  //     // if(nodes[i].hasChildNodes()){
  //     //   Xml2Json(nodes[i],jsonobj.children[i]);
  //     // }
  //   }
  //   return jsonobj
  // }
}