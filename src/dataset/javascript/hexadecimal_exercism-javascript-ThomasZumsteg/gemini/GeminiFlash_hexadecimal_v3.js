var Hexadecimal = function(hex_digits) {
	this.hex_digits = hex_digits;
};

Hexadecimal.prototype.toDecimal = function() {
	let decimal = 0;
	const hexDigits = this.hex_digits.toLowerCase();
	const len = hexDigits.length;

	for (let i = 0; i < len; i++) {
		const char = hexDigits[len - 1 - i];
		let digitValue;

		if (char >= '0' && char <= '9') {
			digitValue = char.charCodeAt(0) - '0'.charCodeAt(0);
		} else if (char >= 'a' && char <= 'f') {
			digitValue = char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
		} else {
			return 0;
		}

		decimal += digitValue * Math.pow(16, i);
	}

	return decimal;
};

export default Hexadecimal;