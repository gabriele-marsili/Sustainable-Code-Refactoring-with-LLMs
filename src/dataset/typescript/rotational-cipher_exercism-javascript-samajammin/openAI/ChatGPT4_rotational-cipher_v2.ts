export default class RotationalCipher {
  private static readonly alphabet = 'abcdefghijklmnopqrstuvwxyz';
  private static readonly alphabetLength = RotationalCipher.alphabet.length;

  static rotate(message: string, key: number): string {
    const adjustedKey = key % this.alphabetLength;

    return Array.from(message, char => {
      const charCode = char.charCodeAt(0);

      if (char >= 'A' && char <= 'Z') {
        return String.fromCharCode(
          ((charCode - 65 + adjustedKey) % this.alphabetLength) + 65
        );
      } else if (char >= 'a' && char <= 'z') {
        return String.fromCharCode(
          ((charCode - 97 + adjustedKey) % this.alphabetLength) + 97
        );
      }

      return char;
    }).join('');
  }
}