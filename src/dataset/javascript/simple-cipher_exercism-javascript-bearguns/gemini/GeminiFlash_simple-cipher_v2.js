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
    let key = '';
    for (let i = 0; i < 100; i++) { // Generate a key of length 100, as per common practice
      key += this.alphabet.charAt(Math.floor(Math.random() * 26));
    }
    return key;
  }

  encode(plaintext) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
      const plaintextChar = plaintext[i];
      const keyChar = this.key[i % this.keyLength];
      const shift = this.alphabet.indexOf(plaintextChar);
      const encodedCharIndex = (this.alphabet.indexOf(keyChar) + shift) % 26;
      encoded += this.alphabet[encodedCharIndex];
    }
    return encoded;
  }

  decode(ciphertext) {
    let decoded = '';
    for (let i = 0; i < ciphertext.length; i++) {
      const ciphertextChar = ciphertext[i];
      const keyChar = this.key[i % this.keyLength];
      const shift = this.alphabet.indexOf(ciphertextChar);
      let decodedCharIndex = (shift - this.alphabet.indexOf(keyChar));
      if (decodedCharIndex < 0) {
        decodedCharIndex += 26;
      }
      decodedCharIndex %= 26;
      decoded += this.alphabet[decodedCharIndex];
    }
    return decoded;
  }
}

export default Cipher;