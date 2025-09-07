/* Octal number class */
var Octal = function(oct) { this.oct = oct }

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	if(/[^0-7]/.test(this.oct)) 
		return 0;
	
	let result = 0;
	let power = 1;
	
	for(let i = this.oct.length - 1; i >= 0; i--) {
		result += parseInt(this.oct[i]) * power;
		power *= 8;
	}
	
	return result;
};

export default Octal;