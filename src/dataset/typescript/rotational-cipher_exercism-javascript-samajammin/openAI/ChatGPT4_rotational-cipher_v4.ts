export default class RotationalCipher {
  static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  static readonly alphabetLength = 26;

  static rotate(message: string, key: number): string {
    const keyMod = key % this.alphabetLength;
    if (keyMod === 0) return message;

    const lowerAlphabet = this.alphabet;
    const upperAlphabet = lowerAlphabet.toUpperCase();

    return Array.from(message, char => {
      const lowerIndex = lowerAlphabet.indexOf(char);
      if (lowerIndex !== -1) {
        return lowerAlphabet[(lowerIndex + keyMod) % this.alphabetLength];
      }

      const upperIndex = upperAlphabet.indexOf(char);
      if (upperIndex !== -1) {
        return upperAlphabet[(upperIndex + keyMod) % this.alphabetLength];
      }

      return char;
    }).join('');
  }
}