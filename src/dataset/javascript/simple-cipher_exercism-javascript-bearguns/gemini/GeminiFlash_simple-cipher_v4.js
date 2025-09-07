class Cipher {
  constructor(key) {
    if (key && !/^[a-z]+$/.test(key)) {
      throw new Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
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
    const keyLength = this.key.length;
    for (let i = 0; i < plaintext.length; i++) {
      const plaintextChar = plaintext[i];
      const shift = this.alphabet.indexOf(plaintextChar);
      const keyChar = this.key[i % keyLength];
      const keyIndex = this.alphabet.indexOf(keyChar);
      const encodedIndex = (shift + keyIndex) % 26;
      encoded += this.alphabet[encodedIndex];
    }
    return encoded;
  }

  decode(ciphertext) {
    let decoded = '';
    const keyLength = this.key.length;
    for (let i = 0; i < ciphertext.length; i++) {
      const ciphertextChar = ciphertext[i];
      const keyChar = this.key[i % keyLength];
      const shift = this.alphabet.indexOf(ciphertextChar);
      const keyIndex = this.alphabet.indexOf(keyChar);
      const decodedIndex = (shift - keyIndex + 26) % 26;
      decoded += this.alphabet[decodedIndex];
    }
    return decoded;
  }
}

export default Cipher;