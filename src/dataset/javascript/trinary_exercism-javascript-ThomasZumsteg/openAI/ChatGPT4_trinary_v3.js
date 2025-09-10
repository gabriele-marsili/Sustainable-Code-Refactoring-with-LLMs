class Trinary {
	constructor(digits) {
		this.digits = digits;
	}

	toDecimal() {
		let decimal = 0;
		for (let i = 0, len = this.digits.length; i < len; i++) {
			const digit = this.digits[len - 1 - i];
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