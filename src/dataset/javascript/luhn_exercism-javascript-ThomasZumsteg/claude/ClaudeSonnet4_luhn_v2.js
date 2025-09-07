var Luhn = function(code) {
	/* Validates and does Luhn code operations */
	this.code = code;
	this.checkDigit = code % 10;
	this.checksum = this._checksum();
	this.valid = (this.checksum % 10 == 0);
}

Luhn.create = function(code) {
	/* Creates a valid Luhn code */
	code *= 10;
	var checksum = 0;
	var codeStr = code.toString();
	var len = codeStr.length;
	
	for (var i = len - 1; i >= 0; i--) {
		var digit = parseInt(codeStr[i]);
		if ((len - 1 - i) % 2 == 1) {
			digit = digit < 5 ? digit * 2 : digit * 2 - 9;
		}
		checksum += digit;
	}
	
	return code + (10 - checksum % 10) % 10;
};

Luhn.prototype._checksum = function() {
	/* Digit sum of a Luhn encoded number */
	var checksum = 0;
	var codeStr = this.code.toString();
	var len = codeStr.length;
	
	for (var i = len - 1; i >= 0; i--) {
		var digit = parseInt(codeStr[i]);
		if ((len - 1 - i) % 2 == 1) {
			digit = digit < 5 ? digit * 2 : digit * 2 - 9;
		}
		checksum += digit;
	}
	
	return checksum;
}

export default Luhn;