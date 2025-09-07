var Cipher = function(key) {
	if( key !== undefined && !key.match(/^[a-z]+$/) )
		throw Error("Bad key");
	this.key = key || "aaaaaaaaaa";
	this.keyLength = this.key.length;
	this.keyCodes = new Array(this.keyLength);
	for (var i = 0; i < this.keyLength; i++) {
		this.keyCodes[i] = this.key.charCodeAt(i);
	}
}

var a_ascii = 97;
var alphabet_size = 26;

Cipher.prototype.encode = function(plainText) {
	var result = '';
	var textLength = plainText.length;
	
	for (var i = 0; i < textLength; i++) {
		var c = plainText.charCodeAt(i) + this.keyCodes[i % this.keyLength] - 194;
		c = ((c % alphabet_size) + alphabet_size) % alphabet_size + a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

Cipher.prototype.decode = function(cipherText) {
	var result = '';
	var textLength = cipherText.length;
	
	for (var i = 0; i < textLength; i++) {
		var c = cipherText.charCodeAt(i) - this.keyCodes[i % this.keyLength];
		c = ((c % alphabet_size) + alphabet_size) % alphabet_size + a_ascii;
		result += String.fromCharCode(c);
	}
	
	return result;
};

export default Cipher;