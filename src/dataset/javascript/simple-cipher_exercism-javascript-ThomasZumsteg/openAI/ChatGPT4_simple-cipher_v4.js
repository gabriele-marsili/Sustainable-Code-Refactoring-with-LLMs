var Cipher = function (key) {
	if (key !== undefined && !/^[a-z]+$/.test(key)) throw Error("Bad key");
	this.key = key || "aaaaaaaaaa";
};

const a_ascii = 97;
const alphabetLength = 26;

Cipher.prototype.encode = function (plainText) {
	const keyLength = this.key.length;
	return Array.from(plainText, (letter, index) => {
		const c = (letter.charCodeAt(0) + this.key.charCodeAt(index % keyLength) - 2 * a_ascii) % alphabetLength + a_ascii;
		return String.fromCharCode(c);
	}).join('');
};

Cipher.prototype.decode = function (cipherText) {
	const keyLength = this.key.length;
	return Array.from(cipherText, (letter, index) => {
		const c = (letter.charCodeAt(0) - this.key.charCodeAt(index % keyLength) + alphabetLength) % alphabetLength + a_ascii;
		return String.fromCharCode(c);
	}).join('');
};

export default Cipher;