var Binary = function(binString) { this.binString = binString; };

Binary.prototype.toDecimal = function() {
	const binString = this.binString;
	const len = binString.length;

	for (let i = 0; i < len; i++) {
		const charCode = binString.charCodeAt(i);
		if (charCode !== 48 && charCode !== 49) {
			return 0;
		}
	}

	let decimal = 0;
	let powerOfTwo = 1;

	for (let i = len - 1; i >= 0; i--) {
		if (binString[i] === '1') {
			decimal += powerOfTwo;
		}
		powerOfTwo *= 2;
	}

	return decimal;
};

export default Binary;