const A_ASCII = 97;
const ALPHABET_SIZE = 26;

class Cipher {
    constructor(key) {
        if (key !== undefined && !/^[a-z]+$/.test(key)) {
            throw new Error("Bad key");
        }
        this.key = key || "aaaaaaaaaa";
        this.keyOffsets = this.key.split('').map(char => char.charCodeAt(0) - A_ASCII);
    }

    encode(plainText) {
        let result = '';
        const keyLength = this.keyOffsets.length;
        
        for (let i = 0; i < plainText.length; i++) {
            const charCode = plainText.charCodeAt(i);
            const keyOffset = this.keyOffsets[i % keyLength];
            const shifted = (charCode - A_ASCII + keyOffset) % ALPHABET_SIZE;
            result += String.fromCharCode(shifted + A_ASCII);
        }
        
        return result;
    }

    decode(cipherText) {
        let result = '';
        const keyLength = this.keyOffsets.length;
        
        for (let i = 0; i < cipherText.length; i++) {
            const charCode = cipherText.charCodeAt(i);
            const keyOffset = this.keyOffsets[i % keyLength];
            const shifted = (charCode - A_ASCII - keyOffset + ALPHABET_SIZE) % ALPHABET_SIZE;
            result += String.fromCharCode(shifted + A_ASCII);
        }
        
        return result;
    }
}

export default Cipher;