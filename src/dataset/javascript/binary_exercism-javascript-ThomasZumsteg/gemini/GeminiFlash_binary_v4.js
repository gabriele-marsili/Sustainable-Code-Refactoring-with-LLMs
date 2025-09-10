var Binary = function(binString) { this.binString = binString; };

Binary.prototype.toDecimal = function() {
	if (/[^01]/.test(this.binString)) {
		return 0;
	}

	let decimal = 0;
	let powerOfTwo = 1;

	for (let i = this.binString.length - 1; i >= 0; i--) {
		decimal += (this.binString[i] - '0') * powerOfTwo;
		powerOfTwo *= 2;
	}

	return decimal;
};

export default Binary;