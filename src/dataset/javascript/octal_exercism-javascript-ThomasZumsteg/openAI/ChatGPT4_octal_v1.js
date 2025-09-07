/* Octal number class */
var Octal = function(oct) { this.oct = oct }

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	if (/[^0-7]/.test(this.oct)) 
		return 0;
	let total = 0;
	for (let i = 0; i < this.oct.length; i++) {
		total = total * 8 + Number(this.oct[i]);
	}
	return total;
};

export default Octal;