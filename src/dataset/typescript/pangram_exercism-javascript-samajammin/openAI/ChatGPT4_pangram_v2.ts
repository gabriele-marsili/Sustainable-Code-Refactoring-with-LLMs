export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase;
  }

  isPangram() {
    let mask = 0;
    for (let i = 0, len = this.phrase.length; i < len; i++) {
      const code = this.phrase.charCodeAt(i) | 32;
      if (code >= 97 && code <= 122) {
        mask |= 1 << (code - 97);
        if (mask === 0x3ffffff) return true;
      }
    }
    return false;
  }
}