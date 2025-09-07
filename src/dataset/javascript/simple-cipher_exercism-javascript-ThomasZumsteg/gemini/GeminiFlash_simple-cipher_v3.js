var Cipher = function(key) {
	if (key !== undefined && !/^[a-z]+$/.test(key)) {
		throw new Error("Bad key");
	}
	this.key = key || "aaaaaaaaaa";
	this.keyLength = this.key.length;
};

const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);
const alphabetLength = z_ascii - a_ascii + 1;

Cipher.prototype.encode = function(plainText) {
	let encoded = "";
	const key = this.key;
	const keyLength = this.keyLength;
	for (let i = 0; i < plainText.length; i++) {
		const letter = plainText[i];
		let c = letter.charCodeAt(0) + key[i % keyLength].charCodeAt(0);
		c -= 2 * a_ascii;
		c %= alphabetLength;
		c += a_ascii;
		encoded += String.fromCharCode(c);
	}
	return encoded;
};

Cipher.prototype.decode = function(cipherText) {
	let decoded = "";
	const key = this.key;
	const keyLength = this.keyLength;

	for (let i = 0; i < cipherText.length; i++) {
		const letter = cipherText[i];
		let c = letter.charCodeAt(0) - key[i % keyLength].charCodeAt(0);
		c %= alphabetLength;
		c += a_ascii;
		decoded += String.fromCharCode(c);
	}
	return decoded;
};

export default Cipher;