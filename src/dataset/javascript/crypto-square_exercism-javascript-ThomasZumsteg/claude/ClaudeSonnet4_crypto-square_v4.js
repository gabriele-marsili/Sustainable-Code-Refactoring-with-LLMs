var Crypto = function(plainText) {
	this.palinText = plainText;
	this._normalizedText = null;
	this._size = null;
	this._segments = null;
	this._cipher = null;
}

Crypto.prototype.normalizePlaintext = function() {
	if (this._normalizedText === null) {
		this._normalizedText = this.palinText.toLowerCase().replace(/[^a-z0-9]/g, '');
	}
	return this._normalizedText;
};

Crypto.prototype.size = function() {
	if (this._size === null) {
		this._size = Math.ceil(Math.sqrt(this.normalizePlaintext().length));
	}
	return this._size;
};

Crypto.prototype.plaintextSegments = function() {
	if (this._segments === null) {
		var text = this.normalizePlaintext();
		var size = this.size();
		this._segments = [];
		for (var i = 0; i < text.length; i += size) {
			this._segments.push(text.slice(i, i + size));
		}
	}
	return this._segments;
};

Crypto.prototype.ciphertext = function() {
	if (this._cipher === null) {
		var segments = this.plaintextSegments();
		var size = this.size();
		var result = [];
		
		for (var col = 0; col < size; col++) {
			for (var row = 0; row < segments.length; row++) {
				if (col < segments[row].length) {
					result.push(segments[row][col]);
				}
			}
		}
		this._cipher = result.join('');
	}
	return this._cipher;
};

Crypto.prototype.normalizeCiphertext = function() {
	var cipher = this.ciphertext();
	var size = this.size();
	var result = [];
	
	for (var i = 0; i < cipher.length; i += size) {
		result.push(cipher.slice(i, i + size));
	}
	return result.join(' ');
};

export default Crypto;