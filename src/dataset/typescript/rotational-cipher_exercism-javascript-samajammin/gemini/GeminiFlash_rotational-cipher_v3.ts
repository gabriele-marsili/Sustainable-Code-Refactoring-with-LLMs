export default class RotationalCipher {
  static readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  static readonly alphabetLength: number = RotationalCipher.alphabet.length;

  static rotate(message: string, key: number): string {
    if (key === 0) {
      return message;
    }

    const rotatedAlphabetLower = RotationalCipher.alphabet.slice(key) + RotationalCipher.alphabet.slice(0, key);
    const rotatedAlphabetUpper = rotatedAlphabetLower.toUpperCase();

    let result = '';
    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const charCode = char.charCodeAt(0);

      if (charCode >= 97 && charCode <= 122) {
        result += rotatedAlphabetLower[charCode - 97];
      } else if (charCode >= 65 && charCode <= 90) {
        result += rotatedAlphabetUpper[charCode - 65];
      } else {
        result += char;
      }
    }

    return result;
  }
}