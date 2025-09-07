class Cipher {
  constructor(key) {
    if (key !== undefined && !/^[a-z]+$/.test(key)) {
      throw new Error("Bad key");
    }
    this.key = key || "aaaaaaaaaa";
    this.keyCharCodes = Array.from(this.key, (char) => char.charCodeAt(0));
  }

  static #aAscii = 'a'.charCodeAt(0);
  static #alphabetSize = 'z'.charCodeAt(0) - Cipher.#aAscii + 1;

  encode(plainText) {
    return Array.from(plainText, (letter, index) => {
      const c = (letter.charCodeAt(0) + this.keyCharCodes[index % this.keyCharCodes.length] - 2 * Cipher.#aAscii) % Cipher.#alphabetSize + Cipher.#aAscii;
      return String.fromCharCode(c);
    }).join('');
  }

  decode(cipherText) {
    return Array.from(cipherText, (letter, index) => {
      const c = (letter.charCodeAt(0) - this.keyCharCodes[index % this.keyCharCodes.length] + Cipher.#alphabetSize) % Cipher.#alphabetSize + Cipher.#aAscii;
      return String.fromCharCode(c);
    }).join('');
  }
}

export default Cipher;