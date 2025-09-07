class Cipher {
  constructor(key) {
    if (key && /[A-Z][0-9]/g.test(key)) {
      throw Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
    this.keyLength = this.key.length;
  }

  keyGen() {
    let key = '';
    for (let i = 0; i < 100; i++) { // Generate a key of length 100, as the original code was incomplete
      key += this.alphabet.charAt(Math.floor(Math.random() * 26));
    }
    return key;
  }

  encode(plaintext) {
    let encoded = '';
    for (let i = 0; i < plaintext.length; i++) {
      const char = plaintext[i];
      const shift = this.alphabet.indexOf(char);
      if (shift === -1) {
        encoded += char; // Handle characters not in the alphabet
        continue;
      }
      const keyChar = this.key[i % this.keyLength];
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
      if (shift === -1) {
        decoded += char; // Handle characters not in the alphabet
        continue;
      }
      const keyChar = this.key[i % this.keyLength];
      const keyShift = this.alphabet.indexOf(keyChar);
      let decodedIndex = (shift - keyShift + 26) % 26;
      decoded += this.alphabet[decodedIndex];
    }
    return decoded;
  }
}

export default Cipher;