export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase;
  }

  isPangram() {
    const seen = new Set<string>();
    for (let i = 0; i < this.phrase.length; i++) {
      const code = this.phrase.charCodeAt(i) | 32;
      if (code >= 97 && code <= 122) {
        seen.add(String.fromCharCode(code));
        if (seen.size === 26) return true;
      }
    }
    return false;
  }
}