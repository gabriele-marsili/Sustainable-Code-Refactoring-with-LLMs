var Luhn = function (code) {
	this.code = code;
	this.checkDigit = code % 10;
	this.addends = this._addends();
	this.checksum = this._checksum();
	this.valid = this.checksum % 10 === 0;
};

Luhn.create = function (code) {
	const baseCode = code * 10;
	const checksum = new Luhn(baseCode)._checksum();
	return baseCode + (10 - (checksum % 10)) % 10;
};

Luhn.prototype._addends = function () {
	const codeStr = this.code.toString();
	const len = codeStr.length;
	const addends = new Array(len);

	for (let i = len - 1; i >= 0; i--) {
		let digit = parseInt(codeStr[i], 10);
		if ((len - i - 1) % 2 === 1) {
			digit = digit * 2;
			if (digit > 9) digit -= 9;
		}
		addends[i] = digit;
	}
	return addends;
};

Luhn.prototype._checksum = function () {
	return this.addends.reduce((total, digit) => total + digit, 0);
};

export default Luhn;