class Crypto {
	constructor(plainText) {
		this.plainText = plainText;
	}

	normalizePlaintext() {
		return this.plainText.toLowerCase().replace(/[^a-z0-9]/g, '');
	}

	size() {
		return Math.ceil(Math.sqrt(this.normalizePlaintext().length));
	}

	plaintextSegments() {
		const text = this.normalizePlaintext();
		const size = this.size();
		const segments = [];
		for (let i = 0; i < text.length; i += size) {
			segments.push(text.slice(i, i + size));
		}
		return segments;
	}

	ciphertext() {
		const segments = this.plaintextSegments();
		const size = this.size();
		let cipherText = '';
		for (let i = 0; i < size; i++) {
			for (const segment of segments) {
				if (segment[i]) cipherText += segment[i];
			}
		}
		return cipherText;
	}

	normalizeCiphertext() {
		const cipherText = this.ciphertext();
		const size = this.size();
		const normalized = [];
		for (let i = 0; i < cipherText.length; i += size) {
			normalized.push(cipherText.slice(i, i + size));
		}
		return normalized.join(' ');
	}
}

export default Crypto;