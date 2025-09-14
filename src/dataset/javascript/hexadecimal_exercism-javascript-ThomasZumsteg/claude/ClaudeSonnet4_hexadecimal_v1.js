var Hexadecimal = function(hex_digits) {
	this.hex_digits = hex_digits;
}

Hexadecimal.prototype.toDecimal = function() {
	if (!this.hex_digits) return 0;
	
	let result = 0;
	let power = 0;
	
	for (let i = this.hex_digits.length - 1; i >= 0; i--) {
		const digit = hex_digit_value(this.hex_digits[i]);
		if (isNaN(digit)) return 0;
		result += digit * (16 ** power);
		power++;
	}
	
	return result;
};

function hex_digit_value(digit) {
	const code = digit.charCodeAt(0);
	if (code >= 48 && code <= 57) // '0'-'9'
		return code - 48;
	else if (code >= 97 && code <= 102) // 'a'-'f'
		return code - 87;
	else
		return NaN;
}

export default Hexadecimal;