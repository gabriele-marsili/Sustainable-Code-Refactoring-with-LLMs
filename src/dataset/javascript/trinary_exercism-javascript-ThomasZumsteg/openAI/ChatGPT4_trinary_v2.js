class Trinary {
	constructor(digits) {
		this.digits = digits;
	}

	toDecimal() {
		// Converts trinary number to decimal
		let decimal = 0;
		for (let i = 0; i < this.digits.length; i++) {
			const digit = this.digits[this.digits.length - 1 - i];
			if (digit >= '0' && digit <= '2') {
				decimal += digit * 3 ** i;
			} else {
				return 0;
			}
		}
		return decimal;
	}
}

export default Trinary;