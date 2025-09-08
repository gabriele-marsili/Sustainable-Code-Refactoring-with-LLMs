var Crypto = function(plainText) {
	this.plainText = plainText;
};

Crypto.prototype.normalizePlaintext = function() {
	let normalized = "";
	const text = this.plainText.toLowerCase();
	for (let i = 0; i < text.length; i++) {
		const char = text[i];
		if (/[a-z0-9]/.test(char)) {
			normalized += char;
		}
	}
	return normalized;
};

Crypto.prototype.size = function() {
	const normalizedPlaintextLength = this.normalizePlaintext().length;
	return Math.ceil(Math.sqrt(normalizedPlaintextLength));
};

Crypto.prototype.plaintextSegments = function() {
	const text = this.normalizePlaintext();
	const size = this.size();
	const segments = [];
	for (let i = 0; i < text.length; i += size) {
		segments.push(text.substring(i, i + size));
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
	const normalizedCiphertextArray = [];
	for (let i = 0; i < cipherText.length; i += size) {
		normalizedCiphertextArray.push(cipherText.substring(i, i + size));
	}
	return normalizedCiphertextArray.join(' ');
};

export default Crypto;