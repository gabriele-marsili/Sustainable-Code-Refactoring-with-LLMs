var Cipher = function(key) {
    if (key !== undefined && !/^[a-z]+$/.test(key)) {
        throw new Error("Bad key");
    }
    this.key = key || "aaaaaaaaaa";
};

const a_ascii = 'a'.charCodeAt(0);
const z_ascii = 'z'.charCodeAt(0);
const alphabet_length = z_ascii - a_ascii + 1;


Cipher.prototype.encode = function(plainText) {
    const key = this.key;
    const keyLength = key.length;
    let result = "";

    for (let i = 0; i < plainText.length; i++) {
        const letterCode = plainText.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % keyLength);
        let c = letterCode + keyCharCode;
        c -= 2 * a_ascii;
        c %= alphabet_length;
        c += a_ascii;
        result += String.fromCharCode(c);
    }

    return result;
};

Cipher.prototype.decode = function(cipherText) {
    const key = this.key;
    const keyLength = key.length;
    let result = "";

    for (let i = 0; i < cipherText.length; i++) {
        const letterCode = cipherText.charCodeAt(i);
        const keyCharCode = key.charCodeAt(i % keyLength);
        let c = letterCode - keyCharCode;
        c %= alphabet_length;
        c += a_ascii;
        result += String.fromCharCode(c);
    }

    return result;
};

export default Cipher;