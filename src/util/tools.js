export default {
  // 判断数组中是否包含某元素
  ifInArr(param,arryParams){
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
  // 两数组合并
  hebing(resarr,hebingarr){
    resarr = resarr.concat(hebingarr);
    return resarr;
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

  // date yy-mm-dd 转 时间戳 (秒)
  getTimestamp(time) {
    return Date.parse(new Date(time))/1000;
  },
   // date yy-mm-dd 转 时间戳 (毫秒)
   getTimestampMS(time) {
    return Date.parse(new Date(time));
  },

  //时间戳转(毫秒) yy-mm-dd
  transformPHPTimeMS(time) {
    var date = new Date(time * 1000);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    space = ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();

    // return Y + M + D + space + h + m + s;
    return Y + M + D;
  },
  //时间戳转(秒) yy-mm-dd
  transformPHPTime(time) {
    var date = new Date(time);
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate();
    space = ' ';
    h = date.getHours() + ':';
    m = date.getMinutes() + ':';
    s = date.getSeconds();

    // return Y + M + D + space + h + m + s;
    return Y + M + D;
  }
}