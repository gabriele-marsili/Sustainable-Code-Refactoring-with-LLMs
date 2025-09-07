class Luhn {
	constructor(code) {
		this.code = code;
		this.checkDigit = code % 10;
		this.addends = this._addends();
		this.checksum = this._checksum();
		this.valid = this.checksum % 10 === 0;
	}

	static create(code) {
		const baseCode = code * 10;
		const checksum = new Luhn(baseCode)._checksum();
		return baseCode + (10 - (checksum % 10)) % 10;
	}

	_addends() {
		const digits = String(this.code).split('').map(Number);
		const length = digits.length;
		for (let i = length - 2; i >= 0; i -= 2) {
			const doubled = digits[i] * 2;
			digits[i] = doubled > 9 ? doubled - 9 : doubled;
		}
		return digits;
	}

	_checksum() {
		return this.addends.reduce((total, digit) => total + digit, 0);
	}
}

export default Luhn;