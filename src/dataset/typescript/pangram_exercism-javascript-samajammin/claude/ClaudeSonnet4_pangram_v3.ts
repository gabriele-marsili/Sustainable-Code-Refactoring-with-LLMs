export default class Pangram {
  readonly phrase: string;

  constructor(phrase: string) {
    this.phrase = phrase.toLowerCase();
  }

  isPangram() {
    let letterMask = 0;
    
    for (let i = 0; i < this.phrase.length; i++) {
      const charCode = this.phrase.charCodeAt(i);
      if (charCode >= 97 && charCode <= 122) {
        letterMask |= 1 << (charCode - 97);
        if (letterMask === 0x3ffffff) {
          return true;
        }
      }
    }
    
    return false;
  }
}