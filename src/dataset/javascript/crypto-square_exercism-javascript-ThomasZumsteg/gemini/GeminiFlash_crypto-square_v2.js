var Crypto = function(plainText) {
	/* Encrypts  message using the crypto-square algorithm */
	this.plainText = plainText;
	this.normalizedText = this.normalizePlaintext();
	this.squareSize = this.size();
};

Crypto.prototype.normalizePlaintext = function() {
	/* Removes all characters except letters and numbers */
	return this.plainText
		.toLowerCase()
		.replace(/[^a-z0-9]/g, '');
};

Crypto.prototype.size = function() {
	/* Size of the square */
	return Math.ceil(Math.sqrt(this.normalizedText.length));
};

Crypto.prototype.plaintextSegments = function() {
	/* Splits clear text into groups array*/
	const size = this.squareSize;
	const text = this.normalizedText;
	const segments = [];
	for (let i = 0; i < text.length; i += size) {
		segments.push(text.slice(i, i + size));
	}
	return segments;
};

Crypto.prototype.ciphertext = function() {
	/* Encrypts the text by selecting from column then row */
	const text_blocks = this.plaintextSegments();
	let cipher_text = '';
	const size = this.squareSize;
	for (let i = 0; i < size; i++) {
		for (let j = 0; j < text_blocks.length; j++) {
			cipher_text += text_blocks[j][i] || '';
		}
	}
	return cipher_text;
};

Crypto.prototype.normalizeCiphertext = function() {
	/* Splits cipher text into groups */
	const cipherText = this.ciphertext();
	const size = this.squareSize;
	const result = [];
	for (let i = 0; i < cipherText.length; i += size) {
		result.push(cipherText.slice(i, i + size));
	}
	return result.join(' ');
};

export default Crypto;