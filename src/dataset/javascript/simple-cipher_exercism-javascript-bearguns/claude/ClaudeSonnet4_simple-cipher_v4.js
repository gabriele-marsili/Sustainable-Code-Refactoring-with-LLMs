class Cipher {
  constructor(key) {
    if (/[A-Z\d]/.test(key)) {
      throw new Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
  }

  keyGen() {
    const chars = new Set();
    const key = new Array(26);
    
    for (let i = 0; i < 26; i++) {
      let randomChar;
      do {
        randomChar = this.alphabet[Math.floor(Math.random() * 26)];
      } while (chars.has(randomChar));
      
      chars.add(randomChar);
      key[i] = randomChar;
    }
    
    return key.join('');
  }

  encode(plaintext) {
    let result = '';
    const keyLength = this.key.length;
    const plaintextLength = plaintext.length;
    
    for (let i = 0; i < plaintextLength; i++) {
      const shift = this.alphabet.indexOf(plaintext[i]);
      if (shift !== -1) {
        const keyIndex = i % keyLength;
        const keyCharIndex = this.alphabet.indexOf(this.key[keyIndex]);
        result += this.alphabet[(keyCharIndex + shift) % 26];
      }
    }
    
    return result;
  }

  decode(ciphertext) {
    let result = '';
    const keyLength = this.key.length;
    const ciphertextLength = ciphertext.length;
    
    for (let i = 0; i < ciphertextLength; i++) {
      const cipherCharIndex = this.alphabet.indexOf(ciphertext[i]);
      if (cipherCharIndex !== -1) {
        const keyIndex = i % keyLength;
        const keyCharIndex = this.alphabet.indexOf(this.key[keyIndex]);
        result += this.alphabet[(cipherCharIndex - keyCharIndex + 26) % 26];
      }
    }
    
    return result;
  }
}

export default Cipher;