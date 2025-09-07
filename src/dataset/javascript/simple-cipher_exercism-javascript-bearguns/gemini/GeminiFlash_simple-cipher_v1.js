class Cipher {
  constructor(key) {
    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    if (key) {
      if (/[A-Z0-9]/g.test(key)) {
        throw Error('Bad key');
      }
      this.key = key;
    } else {
      this.key = this.keyGen();
    }
  }

  keyGen() {
    let key = '';
    for (let i = 0; i < 100; i++) {
      key += this.alphabet[Math.floor(Math.random() * 26)];
    }
    return key;
  }

  encode(plaintext) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      const shift = this.alphabet.indexOf(char);
      const keyChar = this.key[i % this.key.length];
      const keyShift = this.alphabet.indexOf(keyChar);
      const encodedIndex = (shift + keyShift) % 26;
      encoded += this.alphabet[encodedIndex];
    }
    return encoded;
  }

  decode(ciphertext) {
    let decoded = '';
    for (let i = 0; i < ciphertext.length; i++) {
      const char = ciphertext[i];
      const shift = this.alphabet.indexOf(char);
      const keyChar = this.key[i % this.key.length];
      const keyShift = this.alphabet.indexOf(keyChar);
      const decodedIndex = (shift - keyShift + 26) % 26;
      decoded += this.alphabet[decodedIndex];
    }
    return decoded;
  }
}

export default Cipher;