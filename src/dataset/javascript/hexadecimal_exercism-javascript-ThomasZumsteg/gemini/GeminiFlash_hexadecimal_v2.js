var Hexadecimal = function(hex_digits) {
	/* Hexadeciaml number class */
	this.hex_digits = hex_digits;
}

Hexadecimal.prototype.toDecimal = function() {
	/* Converts hexadecimal to decimal */
	let decimal = 0;
	const hexDigits = this.hex_digits.toLowerCase();

	for (let i = 0; i < hexDigits.length; i++) {
		const char = hexDigits[hexDigits.length - 1 - i];
		let digitValue;

		if (char >= '0' && char <= '9') {
			digitValue = char.charCodeAt(0) - '0'.charCodeAt(0);
		} else if (char >= 'a' && char <= 'f') {
			digitValue = char.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
		} else {
			return 0; // Invalid hex character, return 0 immediately
		}

		decimal += digitValue * Math.pow(16, i);
	}

	return decimal;
};


export default Hexadecimal;