class Crypto {
	constructor(plainText) {
		this.plainText = plainText;
		this.normalizedText = this._normalizePlaintext();
		this.squareSize = Math.ceil(Math.sqrt(this.normalizedText.length));
		this.segments = this._plaintextSegments();
	}

	_normalizePlaintext() {
		return this.plainText.toLowerCase().replace(/[^a-z0-9]/g, '');
	}

	normalizePlaintext() {
		return this.normalizedText;
	}

	size() {
		return this.squareSize;
	}

	_plaintextSegments() {
		const segments = [];
		for (let i = 0; i < this.normalizedText.length; i += this.squareSize) {
			segments.push(this.normalizedText.slice(i, i + this.squareSize));
		}
		return segments;
	}

	plaintextSegments() {
		return this.segments;
	}

	ciphertext() {
		const cipherArray = Array(this.squareSize).fill('');
		for (const segment of this.segments) {
			for (let i = 0; i < segment.length; i++) {
				cipherArray[i] += segment[i];
			}
		}
		return cipherArray.join('');
	}

	normalizeCiphertext() {
		const cipherText = this.ciphertext();
		const normalized = [];
		for (let i = 0; i < cipherText.length; i += this.squareSize) {
			normalized.push(cipherText.slice(i, i + this.squareSize));
		}
		return normalized.join(' ');
	}
}

export default Crypto;