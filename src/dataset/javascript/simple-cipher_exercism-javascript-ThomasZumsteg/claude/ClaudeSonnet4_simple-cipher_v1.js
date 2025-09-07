var Cipher = function(key) {
	/* Simple Caesarian shift Cipher */
	if( key !== undefined && !key.match(/^[a-z]+$/) )
		throw Error("Bad key");
	this.key = key || "aaaaaaaaaa";
	// Pre-compute key character codes for better performance
	this.keyCharCodes = [];
	for (let i = 0; i < this.key.length; i++) {
		this.keyCharCodes[i] = this.key.charCodeAt(i);
	}
}

const a_ascii = 97; // 'a'.charCodeAt(0)
const alphabet_size = 26; // z_ascii - a_ascii + 1

Cipher.prototype.encode = function(plainText) {
	/* Encode a message */
	let result = '';
	const keyLength = this.keyCharCodes.length;
	
	for (let i = 0; i < plainText.length; i++) {
		let c = plainText.charCodeAt(i) + this.keyCharCodes[i % keyLength];
		c -= 2 * a_ascii;
		c %= alphabet_size;
		c += a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

Cipher.prototype.decode = function(cipherText) {
	/* Decode a message */
	let result = '';
	const keyLength = this.keyCharCodes.length;
	
	for (let i = 0; i < cipherText.length; i++) {
		let c = cipherText.charCodeAt(i) - this.keyCharCodes[i % keyLength];
		c = ((c % alphabet_size) + alphabet_size) % alphabet_size;
		c += a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

export default Cipher;