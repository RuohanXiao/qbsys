export default {
  // 根据事件类型选择不同图标
  chooseEventImg(type) {
    var imgMap = {

    }
  },
  loadxmlDoc(file) {
    var xmlDoc; 
    try {
      //IE
      xmlDoc = new ActiveXObject("Microsoft.XMLDOM");
    } catch (e) {
      ////Firefox, Mozilla, Opera, etc
      xmlDoc = document.implementation.createDocument("", "", null);
    }
    try {
      xmlDoc.async = false;
      xmlDoc.load(file); //chrome没有load方法
    } catch (e) {
      //针对Chrome,不过只能通过http访问,通过file协议访问会报错
      var xmlhttp = new window.XMLHttpRequest();
      xmlhttp.open("GET", file, false);
      xmlhttp.send(null);
      xmlDoc = xmlhttp.responseXML.documentElement;
    }
    return xmlDoc;
  }
}