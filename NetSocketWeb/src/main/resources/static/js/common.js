var dateInfo = {
	toDay : function(){
		return new Date();
	},
	leadingZeros : function(n, digits){
		var zero = '';
		n = n.toString();
		if (n.length < digits) {
		   for (i = 0; i < digits - n.length; i++)
		     zero += '0';
		}
		return zero + n;
	},
	getDate : function(){
		var d = this.toDay();
		var s = this.leadingZeros(d.getFullYear(), 4) + 
				this.leadingZeros(d.getMonth() + 1, 2) +
				this.leadingZeros(d.getDate(), 2) + 
				this.leadingZeros(d.getHours(), 2) +
				this.leadingZeros(d.getMinutes(), 2) +
				this.leadingZeros(d.getSeconds(), 2);
		return s;
	}
};

Date.prototype.strFormat = function(str,f) {
	var year,month,day,hh,mm,ss;
	
	if(f.indexOf("yyyy") > -1){
		str = str.substring(0,4);
		console.log(str);
	}
};


Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";
 
    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;
     
    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};
