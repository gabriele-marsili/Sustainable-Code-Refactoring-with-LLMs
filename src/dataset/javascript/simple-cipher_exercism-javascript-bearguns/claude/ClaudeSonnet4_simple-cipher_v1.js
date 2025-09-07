class Cipher {
  constructor(key) {
    if (key && /[A-Z0-9]/g.test(key)) {
      throw Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
    this.keyLength = this.key.length;
  }

  keyGen() {
    const chars = [];
    const used = new Set();
    
    for (let i = 0; i < 26; i++) {
      let randomChar;
      do {
        randomChar = this.alphabet[Math.floor(Math.random() * 26)];
      } while (used.has(randomChar));
      
      used.add(randomChar);
      chars.push(randomChar);
    }
    
    return chars.join('');
  }

  encode(plaintext) {
    let result = '';
    const plaintextLength = plaintext.length;
    
    for (let i = 0; i < plaintextLength; i++) {
      const shift = this.alphabet.indexOf(plaintext[i]);
      if (shift !== -1) {
        const keyIndex = this.alphabet.indexOf(this.key[i % this.keyLength]);
        result += this.alphabet[(keyIndex + shift) % 26];
      } else {
        result += plaintext[i];
      }
    }
    
    return result;
  }

  decode(ciphertext) {
    let result = '';
    const ciphertextLength = ciphertext.length;
    
    for (let i = 0; i < ciphertextLength; i++) {
      const cipherIndex = this.alphabet.indexOf(ciphertext[i]);
      if (cipherIndex !== -1) {
        const keyIndex = this.alphabet.indexOf(this.key[i % this.keyLength]);
        result += this.alphabet[(cipherIndex - keyIndex + 26) % 26];
      } else {
        result += ciphertext[i];
      }
    }
    
    return result;
  }
}

export default Cipher;