class Cipher {
  constructor(key) {
    if (key && /[A-Z][0-9]/g.test(key)) {
      throw Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
  }

  keyGen() {
    const shuffled = this.alphabet.split('');
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.join('');
  }

  encode(plaintext) {
    let result = '';
    const keyLength = this.key.length;
    const plaintextLength = plaintext.length;
    
    for (let i = 0; i < plaintextLength; i++) {
      const shift = this.alphabet.indexOf(plaintext[i]);
      if (shift === -1) {
        result += plaintext[i];
      } else {
        const keyIndex = i % keyLength;
        const keyShift = this.alphabet.indexOf(this.key[keyIndex]);
        result += this.alphabet[(shift + keyShift) % 26];
      }
    }
    return result;
  }

  decode(ciphertext) {
    let result = '';
    const keyLength = this.key.length;
    const ciphertextLength = ciphertext.length;
    
    for (let i = 0; i < ciphertextLength; i++) {
      const shift = this.alphabet.indexOf(ciphertext[i]);
      if (shift === -1) {
        result += ciphertext[i];
      } else {
        const keyIndex = i % keyLength;
        const keyShift = this.alphabet.indexOf(this.key[keyIndex]);
        result += this.alphabet[(shift - keyShift + 26) % 26];
      }
    }
    return result;
  }
}

export default Cipher;