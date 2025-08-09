export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase;
  }

  isPangram() {
    let mask = 0;
    const aCode = 'a'.charCodeAt(0);
    for (let i = 0, len = this.phrase.length; i < len; i++) {
      const code = this.phrase.charCodeAt(i) | 32;
      if (code >= 97 && code <= 122) {
        mask |= 1 << (code - aCode);
        if (mask === 0x3ffffff) return true;
      }
    }
    return mask === 0x3ffffff;
  }
}