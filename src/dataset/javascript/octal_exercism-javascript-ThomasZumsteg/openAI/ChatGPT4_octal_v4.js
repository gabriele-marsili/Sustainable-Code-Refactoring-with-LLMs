/* Octal number class */
var Octal = function(oct) { this.oct = oct; };

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	if (/[^0-7]/.test(this.oct)) return 0;
	let total = 0, base = 1;
	for (let i = this.oct.length - 1; i >= 0; i--) {
		total += this.oct[i] * base;
		base *= 8;
	}
	return total;
};

export default Octal;