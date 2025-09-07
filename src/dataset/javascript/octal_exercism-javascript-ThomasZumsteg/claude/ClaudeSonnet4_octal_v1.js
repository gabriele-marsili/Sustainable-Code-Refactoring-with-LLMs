/* Octal number class */
var Octal = function(oct) { this.oct = oct }

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	var result = 0;
	var power = 1;
	
	for(var i = this.oct.length - 1; i >= 0; i--) {
		var digit = this.oct.charCodeAt(i) - 48; // Convert char to number using ASCII
		if(digit < 0 || digit > 7) 
			return 0;
		result += digit * power;
		power *= 8;
	}
	
	return result;
};

export default Octal;