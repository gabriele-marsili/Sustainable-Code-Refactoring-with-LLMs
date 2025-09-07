class Cipher {
  constructor(key) {
    if (key && /[A-Z0-9]/g.test(key)) {
      throw Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
  }

  keyGen() {
    const chars = this.alphabet.split('');
    for (let i = chars.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [chars[i], chars[j]] = [chars[j], chars[i]];
    }
    return chars.join('');
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
        const keyIndex = this.alphabet.indexOf(this.key[i % keyLength]);
        result += this.alphabet[(shift + keyIndex) % 26];
      }
    }
    return result;
  }

  decode(ciphertext) {
    let result = '';
    const keyLength = this.key.length;
    const ciphertextLength = ciphertext.length;
    
    for (let i = 0; i < ciphertextLength; i++) {
      const charIndex = this.alphabet.indexOf(ciphertext[i]);
      if (charIndex === -1) {
        result += ciphertext[i];
      } else {
        const keyIndex = this.alphabet.indexOf(this.key[i % keyLength]);
        result += this.alphabet[(charIndex - keyIndex + 26) % 26];
      }
    }
    return result;
  }
}

export default Cipher;