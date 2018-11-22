function getThirdPoint(startPoint,endPoint){
	var x1 = startPoint[0];
	var y1 = startPoint[1];
	var x2 = endPoint[0];
	var y2 = endPoint[1];
	var n = 0.5;
	var m = 0.2;
	var xm, ym;
	
	if(x2 != x1 && y2 != y1){
		var a = (y2 - y1)/(x2 - x1);
		var b = (x2 * y1 - x1 * y2)/(x2 - x1);
		var xn = x1 + n * (x2 - x1);
		var yn = a * xn + b;
		var an = -1/a;
		var bn = yn - an * xn;
		var p = ((y2 - y1)*(y2 - y1) + (x2 - x1)*(x2 - x1))*(m*m);
		var am = 1 + an*an;
		var bm = 2*an*bn - 2*xn - 2*an*yn;
		var cm = xn*xn + yn*yn-2*bn*yn-p + bn*bn;
		var v = bm*bm - 4*am*cm;
		
		if(v > 0){
			var xk = (-bm - Math.sqrt(v))/(2 * am);
			var xp = (-bm + Math.sqrt(v))/(2 * am);
			if(x1 > x2){
				if(xk > xp){
					xm = xk;
				}else{
					xm = xp;
				}
			} else {
				if(xk > xp){
					xm = xp;
				}else{
					xm = xk;
				}
			}
		} 
		ym = an * xm + bn;
	} else if(x2 == x1){
		xm = x1 + m*(y2 - y1);
		ym = y1 + n*(y2 - y1);
	} else if(y2 == y1){
		xm = x1 + n*(x2 - x1);
		ym = y1 + m*(x2 - x1);
	}
	return [xm,ym];
}
