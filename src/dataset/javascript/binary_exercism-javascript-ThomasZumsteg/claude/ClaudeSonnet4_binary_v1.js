var Binary = function(binString) { this.binString = binString };

Binary.prototype.toDecimal = function() {
	/* Converts a binary string to decimal */
	
	// Validate string
	if ( this.binString.match(/[^10]/) )
		return 0;

	return parseInt(this.binString, 2);
};

export default Binary;