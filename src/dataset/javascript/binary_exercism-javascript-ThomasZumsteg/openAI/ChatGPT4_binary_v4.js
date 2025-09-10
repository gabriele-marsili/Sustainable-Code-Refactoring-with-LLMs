var Binary = function(binString) { this.binString = binString };

Binary.prototype.toDecimal = function() {
	if (/[^10]/.test(this.binString)) return 0;

	let decimal = 0;
	for (let i = 0; i < this.binString.length; i++) {
		decimal = (decimal << 1) + (this.binString[i] === '1' ? 1 : 0);
	}
	return decimal;
};

export default Binary;