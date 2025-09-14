var Binary = function(binString) { this.binString = binString };

Binary.prototype.toDecimal = function() {
	if (!/^[01]*$/.test(this.binString)) {
		return 0;
	}
	
	return parseInt(this.binString, 2);
};

export default Binary;