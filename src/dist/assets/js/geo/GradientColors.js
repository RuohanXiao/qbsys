function getGradientColors(colorMAX,colorMIN,num){
    var colorMAX=colorMAX.toLowerCase();
    var colorMIN=colorMIN.toLowerCase();
    var RegHex = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if(RegHex.test(colorMAX)&&/^rgb/.test(colorMAX)){
        colorMAX="rgb(221,221,221)";
    }else if(RegHex.test(colorMIN)&&/^rgb/.test(colorMIN)){
        colorMIN="rgb(116,116,116)";
    }
    if(RegHex.test(colorMAX)){
        colorMAX=colorMAX.colorRgb();
    }
    if(RegHex.test(colorMIN)){
        colorMIN=colorMIN.colorRgb();
    }

    colorMAX=colorMAX.slice(4,-1).split(",");
    colorMIN=colorMIN.slice(4,-1).split(",");
            console.log(colorMIN);
    var colors= [];
    //默认的最深颜色
    var red = colorMAX[0]-0,green = colorMAX[1]-0, blue = colorMAX[2]-0;
    //最浅颜色是239,239,239 比如：最浅颜色的red是 239 则差值为239-134=105
    var maxRed = colorMIN[0]-0,maxGreen = colorMIN[1]-0,maxBlue = colorMIN[2]-0;
    var level = num;
    while(level--) {
        colors.push( 'rgb('+red +','+green+','+blue+')');
        red += parseInt(maxRed/num);
        green += parseInt(maxGreen/num);
        blue += parseInt(maxBlue/num);
    }
    return colors;
}

String.prototype.colorRgb = function(){
    var sColor = this.toLowerCase();
    //十六进制颜色值的正则表达式
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    // 如果是16进制颜色
    if (sColor && reg.test(sColor)) {
        if (sColor.length === 4) {
            var sColorNew = "#";
            for (var i=1; i<4; i+=1) {
                sColorNew += sColor.slice(i, i+1).concat(sColor.slice(i, i+1));
            }
            sColor = sColorNew;
        }
        //处理六位的颜色值
        var sColorChange = [];
        for (var i=1; i<7; i+=2) {
            sColorChange.push(parseInt("0x"+sColor.slice(i, i+2)));
        }
        return "RGB(" + sColorChange.join(",") + ")";
    }
    return sColor;
};
export  {getGradientColors}
