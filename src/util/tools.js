export default {
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
  }
}