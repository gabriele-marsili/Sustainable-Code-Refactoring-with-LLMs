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
		
		if (charCode >= 48 && charCode <= 57) { // 0-9
			digitValue = charCode - 48;
		} else if (charCode >= 97 && charCode <= 102) { // a-f
			digitValue = charCode - 87;
		} else {
			return 0;
		}
		
		result += digitValue * (16 ** power);
		power++;
	}
	
	return result;
};

export default Hexadecimal;