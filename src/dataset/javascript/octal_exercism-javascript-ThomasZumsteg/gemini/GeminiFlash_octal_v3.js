/* Octal number class */
var Octal = function(oct) { this.oct = oct; }

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	const octalString = this.oct;
	if (/[^0-7]/.test(octalString)) {
		return 0;
	}

	let decimal = 0;
	let power = 1;
	for (let i = octalString.length - 1; i >= 0; i--) {
		decimal += parseInt(octalString[i], 10) * power;
		power *= 8;
	}
	return decimal;
};

export default Octal;