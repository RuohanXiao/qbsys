class BezierSinglePoint{
	constructor(line,t){
		this.line = line;
		this.t = t;
	};
	
	getBezierPoint(){
		var points = [].concat.apply([],this.line);
		var AB = points.slice(0,4);
		var D = this.calculatePoint(AB,this.t);
		var BC = points.slice(2);
		var E = this.calculatePoint(BC,this.t);
		var DE = D.concat(E);
		var F = this.calculatePoint(DE,this.t);
		return F;
	}
	
	calculatePoint(points,fraction){
		var Lengths = [0];
		var x1 = points[0];
		var y1 = points[1];
		var length = 0;
		for(var i = 2, z = points.length; i < z; i += 2){
			var x2 = points[i];
			var y2 = points[i + 1];
			length += Math.sqrt((x2 - x1)*(x2 - x1)+(y2 - y1)*(y2 - y1));
			Lengths.push(length);
			x1 = x2;
			y1 = y2;
		}
		var targetLength = fraction * length;
		var targetIndex = 0;
		for(var m = 1, n = Lengths.length; m < n; m++){
			if(targetLength < Lengths[m]){
				targetIndex = m;
				break;
			}
		}
		
		var occupyLength = (targetLength - Lengths[targetIndex - 1])/(Lengths[targetIndex] - Lengths[targetIndex - 1]);
		var c = targetIndex *2;
		function getTarget(a,b,occupyLength){
			return a + (b - a) * occupyLength;
		}
		var pointX = getTarget(points[c - 2],points[c], occupyLength);
		var pointY = getTarget(points[c - 1],points[c + 1],occupyLength);
		return [pointX,pointY];
	};
	
};

class BezierLinePoints{
	constructor(line){
		this.line = line;
	};
	getBezierPoints(t){   //t�ǵ�ĸ���
		var BezierPoints = [];
		for(var i=0; i<=1; i+=1/t){
			var BL = new BezierSinglePoint(this.line,i);
			BezierPoints.push(BL.getBezierPoint());
		}
		return BezierPoints;	
	}
}

export {BezierSinglePoint, BezierLinePoints}