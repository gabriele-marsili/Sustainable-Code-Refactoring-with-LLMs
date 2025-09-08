var Crypto = function(plainText) {
	/* Encrypts  message using the crypto-square algorithm */
	this.plainText = plainText;
};

Crypto.prototype.normalizePlaintext = function() {
	/* Removes all characters except letters and numbers */
	let normalized = "";
	const lowerCaseText = this.plainText.toLowerCase();
	for (let i = 0; i < lowerCaseText.length; i++) {
		const char = lowerCaseText[i];
		if (/[a-z0-9]/.test(char)) {
			normalized += char;
		}
	}
	return normalized;
};

Crypto.prototype.size = function() {
	/* Size of the square */
	const normalizedPlaintext = this.normalizePlaintext();
	return Math.ceil(Math.sqrt(normalizedPlaintext.length));
};

Crypto.prototype.plaintextSegments = function() {
	/* Splits clear text into groups array*/
	const normalizedPlaintext = this.normalizePlaintext();
	const size = this.size();
	const segments = [];
	for (let i = 0; i < normalizedPlaintext.length; i += size) {
		segments.push(normalizedPlaintext.slice(i, i + size));
	}
	return segments;
};

Crypto.prototype.ciphertext = function() {
	/* Encrypts the text by selecting from column then row */
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
	/* Splits cipher text into groups */
	const cipherText = this.ciphertext();
	const size = this.size();
	const segments = [];
	for (let i = 0; i < cipherText.length; i += size) {
		segments.push(cipherText.slice(i, i + size));
	}
	return segments.join(' ');
};

export default Crypto;