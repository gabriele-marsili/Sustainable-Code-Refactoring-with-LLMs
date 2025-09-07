class Cipher {
  constructor(key) {
    if (key !== undefined && !/^[a-z]+$/.test(key)) {
      throw new Error("Bad key");
    }
    this.key = key || "aaaaaaaaaa";
    this.keyCharCodes = Array.from(this.key, char => char.charCodeAt(0));
  }

  static #aAscii = 'a'.charCodeAt(0);
  static #alphabetLength = 'z'.charCodeAt(0) - Cipher.#aAscii + 1;

  encode(plainText) {
    return this.#transform(plainText, (charCode, keyCode) => 
      (charCode + keyCode - 2 * Cipher.#aAscii) % Cipher.#alphabetLength + Cipher.#aAscii
    );
  }

  decode(cipherText) {
    return this.#transform(cipherText, (charCode, keyCode) => 
      (charCode - keyCode + Cipher.#alphabetLength) % Cipher.#alphabetLength + Cipher.#aAscii
    );
  }

  #transform(text, transformFn) {
    const keyLength = this.keyCharCodes.length;
    return Array.from(text, (char, index) => 
      String.fromCharCode(transformFn(char.charCodeAt(0), this.keyCharCodes[index % keyLength]))
    ).join('');
  }
}

export default Cipher;