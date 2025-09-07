var Luhn = function(code) {
	/* Validates and does Luhn code operations */
	this.code = code;
	this.checkDigit = code % 10;
	this.checksum = this._checksum();
	this.valid = (this.checksum % 10 === 0);
}

Luhn.create = function(code) {
	/* Creates a valid Luhn code */
	code *= 10;
	var luhn = new Luhn(code);
	return code + (10 - luhn.checksum % 10) % 10;
};

Luhn.prototype._addends = function() {
	/* Doubles odd digits from the right
	Subtracts 9 if they are 10 or bigger */
	var codeStr = this.code.toString();
	var length = codeStr.length;
	var addends = new Array(length);
	
	for (var i = 0; i < length; i++) {
		var digit = parseInt(codeStr[i], 10);
		var rightIndex = length - 1 - i;
		
		if (rightIndex % 2 === 0) {
			addends[i] = digit;
		} else if (digit < 5) {
			addends[i] = digit * 2;
		} else {
			addends[i] = digit * 2 - 9;
		}
	}
	
	return addends;
};

Luhn.prototype._checksum = function() {
	/* Digit sum of a Luhn encoded number */
	var codeStr = this.code.toString();
	var length = codeStr.length;
	var sum = 0;
	
	for (var i = 0; i < length; i++) {
		var digit = parseInt(codeStr[i], 10);
		var rightIndex = length - 1 - i;
		
		if (rightIndex % 2 === 0) {
			sum += digit;
		} else if (digit < 5) {
			sum += digit * 2;
		} else {
			sum += digit * 2 - 9;
		}
	}
	
	return sum;
}

export default Luhn;