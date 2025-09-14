var Trinary = function(digits) {
	this.digits = digits;
}

Trinary.prototype.toDecimal = function() {
	var decimal = 0;
	var power = 1;
	
	for (var i = this.digits.length - 1; i >= 0; i--) {
		var digit = this.digits[i];
		if (digit >= '0' && digit <= '2') {
			decimal += (digit - '0') * power;
			power *= 3;
		}
	}
	
	return decimal;
};

export default Trinary;