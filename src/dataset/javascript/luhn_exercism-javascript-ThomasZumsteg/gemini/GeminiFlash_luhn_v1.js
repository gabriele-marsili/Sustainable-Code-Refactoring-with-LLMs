var Luhn = function(code) {
	this.code = code;
	this.checkDigit = code % 10;
	this.addends = this._addends();
	this.checksum = this._checksum();
	this.valid = (this.checksum % 10 === 0);
}

Luhn.create = function(code) {
	code *= 10;
	let checksum = new Luhn(code)._checksum();
	let lastDigit = (10 - checksum % 10) % 10;
	return code + lastDigit;
};

Luhn.prototype._addends = function() {
	const codeString = String(this.code);
	const len = codeString.length;
	const addends = new Array(len);

	for (let i = len - 1, j = 0; i >= 0; i--, j++) {
		let digit = parseInt(codeString[i], 10);
		if (j % 2 !== 0) {
			digit *= 2;
			if (digit > 9) {
				digit -= 9;
			}
		}
		addends[len - 1 - i] = digit;
	}

	return addends;
};


Luhn.prototype._checksum = function() {
	let sum = 0;
	const addends = this.addends;
	const len = addends.length;
	for (let i = 0; i < len; i++) {
		sum += addends[i];
	}
	return sum;
};

export default Luhn;