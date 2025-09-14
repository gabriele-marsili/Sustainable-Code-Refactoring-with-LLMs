var Trinary = function(digits) {
	this.digits = digits;
}

Trinary.prototype.toDecimal = function() {
	var decimal = 0;
	var power = 0;
	
	for (var i = this.digits.length - 1; i >= 0; i--) {
		var digit = this.digits[i];
		if (digit >= '0' && digit <= '2') {
			decimal += (+digit) * (power === 0 ? 1 : Math.pow(3, power));
		}
		power++;
	}
	
	return decimal;
};

export default Trinary;