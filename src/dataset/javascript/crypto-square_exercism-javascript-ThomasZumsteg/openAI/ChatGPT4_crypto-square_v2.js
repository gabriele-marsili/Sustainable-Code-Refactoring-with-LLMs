class Crypto {
	constructor(plainText) {
		this.plainText = plainText;
		this.normalizedText = this._normalizePlaintext();
		this.squareSize = Math.ceil(Math.sqrt(this.normalizedText.length));
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

	plaintextSegments() {
		const segments = [];
		for (let i = 0; i < this.normalizedText.length; i += this.squareSize) {
			segments.push(this.normalizedText.slice(i, i + this.squareSize));
		}
		return segments;
	}

	ciphertext() {
		const segments = this.plaintextSegments();
		const cipherArray = Array(this.squareSize).fill('');
		for (const segment of segments) {
			for (let i = 0; i < segment.length; i++) {
				cipherArray[i] += segment[i];
			}
		}
		return cipherArray.join('');
	}

	normalizeCiphertext() {
		const cipherText = this.ciphertext();
		const normalizedSegments = [];
		for (let i = 0; i < cipherText.length; i += this.squareSize) {
			normalizedSegments.push(cipherText.slice(i, i + this.squareSize));
		}
		return normalizedSegments.join(' ');
	}
}

export default Crypto;