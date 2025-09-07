class Cipher {
  constructor(key) {
    if (key && /[^a-z]/.test(key)) {
      throw new Error('Bad key');
    }

    this.alphabet = 'abcdefghijklmnopqrstuvwxyz';
    this.key = key || this.keyGen();
  }

  keyGen() {
    return Array.from({ length: 100 }, () =>
      this.alphabet.charAt(Math.floor(Math.random() * 26))
    ).join('');
  }

  encode(plaintext) {
    return plaintext
      .split('')
      .map((char, i) => {
        const shift = this.alphabet.indexOf(this.key[i % this.key.length]);
        const newIndex = (this.alphabet.indexOf(char) + shift) % 26;
        return this.alphabet[newIndex];
      })
      .join('');
  }

  decode(ciphertext) {
    return ciphertext
      .split('')
      .map((char, i) => {
        const shift = this.alphabet.indexOf(this.key[i % this.key.length]);
        const newIndex = (this.alphabet.indexOf(char) - shift + 26) % 26;
        return this.alphabet[newIndex];
      })
      .join('');
  }
}

export default Cipher;