var Cipher = function(key) {
	/* Simple Caesarian shift Cipher */
	if( key !== undefined && !key.match(/^[a-z]+$/) )
		throw Error("Bad key");
	this.key = key || "aaaaaaaaaa";
	// Pre-compute key character codes for better performance
	this.keyCharCodes = [];
	for (var i = 0; i < this.key.length; i++) {
		this.keyCharCodes[i] = this.key.charCodeAt(i);
	}
}

var a_ascii = 97; // 'a'.charCodeAt(0)
var z_ascii = 122; // 'z'.charCodeAt(0)
var alphabet_size = 26; // z_ascii - a_ascii + 1

Cipher.prototype.encode = function(plainText) {
	/* Encode a message */
	var result = '';
	var keyLength = this.keyCharCodes.length;
	
	for (var i = 0; i < plainText.length; i++) {
		var c = plainText.charCodeAt(i) + this.keyCharCodes[i % keyLength];
		c -= 2 * a_ascii;
		c %= alphabet_size;
		c += a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

Cipher.prototype.decode = function(cipherText) {
	/* Decode a message */
	var result = '';
	var keyLength = this.keyCharCodes.length;
	
	for (var i = 0; i < cipherText.length; i++) {
		var c = cipherText.charCodeAt(i) - this.keyCharCodes[i % keyLength];
		c %= alphabet_size;
		c += a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

export default Cipher;