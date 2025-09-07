/* Octal number class */
var Octal = function(oct) { this.oct = oct }

Octal.prototype.toDecimal = function() {
	/* Converts octal to decimal */
	if (/[^0-7]/.test(this.oct)) {
        return 0;
    }

    let decimal = 0;
    let octalString = this.oct;

    for (let i = octalString.length - 1, power = 0; i >= 0; i--, power++) {
        decimal += parseInt(octalString[i]) * (8 ** power);
    }

    return decimal;
};

export default Octal;