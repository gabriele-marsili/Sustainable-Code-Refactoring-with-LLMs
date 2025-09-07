export default class RotationalCipher {
  static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  static readonly alphabetLength = 26;

  static rotate(message: string, key: number) {
    const lowerAlphabet = this.alphabet;
    const upperAlphabet = this.alphabet.toUpperCase();
    const shift = key % this.alphabetLength;

    return Array.from(message, char => {
      if (char >= 'a' && char <= 'z') {
        return lowerAlphabet[(char.charCodeAt(0) - 97 + shift) % this.alphabetLength];
      } else if (char >= 'A' && char <= 'Z') {
        return upperAlphabet[(char.charCodeAt(0) - 65 + shift) % this.alphabetLength];
      }
      return char;
    }).join('');
  }
}