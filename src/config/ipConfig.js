exports.install = function (Vue, options) {
  Vue.prototype.getServerIp = function () {
    var serverIp = 'http://10.60.1.141:5000'
    return serverIp
  }
}
