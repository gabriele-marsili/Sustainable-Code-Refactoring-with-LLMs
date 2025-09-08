var Crypto = function(plainText) {
	this.plainText = plainText;
};

Crypto.prototype.normalizePlaintext = function() {
	const text = this.plainText.toLowerCase();
	let result = '';
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (/[a-z0-9]/.test(char)) {
			result += char;
		}
	}
	return result;
};

Crypto.prototype.size = function() {
	const normalized = this.normalizePlaintext();
	return Math.ceil(Math.sqrt(normalized.length));
};

Crypto.prototype.plaintextSegments = function() {
	const normalizedText = this.normalizePlaintext();
	const size = this.size();
	const segments = [];
	for (let i = 0; i < normalizedText.length; i += size) {
		segments.push(normalizedText.substring(i, i + size));
	}
	return segments;
};

Crypto.prototype.ciphertext = function() {
	const textBlocks = this.plaintextSegments();
	const size = this.size();
	let cipherText = '';
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < textBlocks.length; j++) {
			cipherText += textBlocks[j][i] || '';
		}
	}
	return cipherText;
};

Crypto.prototype.normalizeCiphertext = function() {
	const cipherText = this.ciphertext();
	const size = this.size();
	const result = [];
	for (let i = 0; i < cipherText.length; i += size) {
		result.push(cipherText.substring(i, i + size));
	}
	return result.join(' ');
};

export default Crypto;