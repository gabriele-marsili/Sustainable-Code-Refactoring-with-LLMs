var Hexadecimal = function (hex_digits) {
	this.hex_digits = hex_digits;
};

Hexadecimal.prototype.toDecimal = function () {
	let total = 0;
	for (let i = 0, len = this.hex_digits.length; i < len; i++) {
		const digit = hex_digit_value(this.hex_digits[len - 1 - i]);
		if (isNaN(digit)) return 0;
		total += digit * (1 << (4 * i));
	}
	return total;
};

function hex_digit_value(digit) {
	const code = digit.charCodeAt(0);
	if (code >= 48 && code <= 57) return code - 48; // '0'-'9'
	if (code >= 97 && code <= 102) return code - 87; // 'a'-'f'
	return NaN;
}

export default Hexadecimal;