var Luhn = function(code) {
	this.code = code;
	this.checkDigit = code % 10;
	this.addends = this._addends();
	this.checksum = this._checksum();
	this.valid = (this.checksum % 10 === 0);
}

Luhn.create = function(code) {
	code *= 10;
	var luhn = new Luhn(code);
	return code + (10 - luhn.checksum % 10) % 10;
};

Luhn.prototype._addends = function() {
	var codeStr = this.code.toString();
	var length = codeStr.length;
	var addends = new Array(length);
	
	for (var i = 0; i < length; i++) {
		var digit = parseInt(codeStr[i], 10);
		var position = length - 1 - i;
		
		if (position % 2 === 0) {
			addends[i] = digit;
		} else {
			var doubled = digit * 2;
			addends[i] = doubled > 9 ? doubled - 9 : doubled;
		}
	}
	
	return addends;
};

Luhn.prototype._checksum = function() {
	if (this.addends) {
		var sum = 0;
		for (var i = 0; i < this.addends.length; i++) {
			sum += this.addends[i];
		}
		return sum;
	}
	return this._addends().reduce(function(total, item) {
		return total + item;
	}, 0);
}

export default Luhn;