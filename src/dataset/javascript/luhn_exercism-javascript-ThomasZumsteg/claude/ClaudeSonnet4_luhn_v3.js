var Luhn = function(code) {
	this.code = code;
	this.checkDigit = this.code % 10;
	this.addends = this._addends();
	this.checksum = this._checksum();
	this.valid = (this.checksum % 10 === 0);
}

Luhn.create = function(code) {
	code *= 10;
	let checksum = 0;
	let codeStr = code.toString();
	let isOdd = true;
	
	for (let i = codeStr.length - 1; i >= 0; i--) {
		let digit = parseInt(codeStr[i], 10);
		if (!isOdd) {
			digit = digit < 5 ? digit * 2 : digit * 2 - 9;
		}
		checksum += digit;
		isOdd = !isOdd;
	}
	
	return code + (10 - checksum % 10) % 10;
};

Luhn.prototype._addends = function() {
	if (this._cachedAddends) {
		return this._cachedAddends;
	}
	
	const codeStr = this.code.toString();
	const addends = new Array(codeStr.length);
	let isOdd = true;
	
	for (let i = codeStr.length - 1; i >= 0; i--) {
		let digit = parseInt(codeStr[i], 10);
		if (!isOdd) {
			digit = digit < 5 ? digit * 2 : digit * 2 - 9;
		}
		addends[i] = digit;
		isOdd = !isOdd;
	}
	
	this._cachedAddends = addends;
	return addends;
};

Luhn.prototype._checksum = function() {
	if (this._cachedChecksum !== undefined) {
		return this._cachedChecksum;
	}
	
	let sum = 0;
	const addends = this._addends();
	for (let i = 0; i < addends.length; i++) {
		sum += addends[i];
	}
	
	this._cachedChecksum = sum;
	return sum;
}

export default Luhn;