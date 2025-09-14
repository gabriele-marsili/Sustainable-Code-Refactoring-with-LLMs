var Hexadecimal = function(hex_digits) {
	this.hex_digits = hex_digits;
}

Hexadecimal.prototype.toDecimal = function() {
	if (!this.hex_digits) return 0;
	
	let result = 0;
	let power = 0;
	
	for (let i = this.hex_digits.length - 1; i >= 0; i--) {
		const char = this.hex_digits[i];
		const charCode = char.charCodeAt(0);
		let digitValue;
		
		if (charCode >= 48 && charCode <= 57) {
			digitValue = charCode - 48;
		} else if (charCode >= 97 && charCode <= 102) {
			digitValue = charCode - 87;
		} else {
			return NaN;
		}
		
		result += digitValue * (16 ** power);
		power++;
	}
	
	return result;
};

function hex_digit_value(digit) {
	const charCode = digit.charCodeAt(0);
	if (charCode >= 48 && charCode <= 57) {
		return charCode - 48;
	} else if (charCode >= 97 && charCode <= 102) {
		return charCode - 87;
	} else {
		return NaN;
	}
}

export default Hexadecimal;