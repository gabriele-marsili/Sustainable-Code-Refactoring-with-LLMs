export default class RotationalCipher {
  static readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  static readonly alphabetLength: number = RotationalCipher.alphabet.length;

  static rotate(message: string, key: number): string {
    if (key === 0) {
      return message;
    }

    const rotatedChars: string[] = [];

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
        // Uppercase letters
        const rotatedCharCode = ((charCode - 65 + key) % RotationalCipher.alphabetLength) + 65;
        rotatedChars.push(String.fromCharCode(rotatedCharCode));
      } else if (charCode >= 97 && charCode <= 122) {
        // Lowercase letters
        const rotatedCharCode = ((charCode - 97 + key) % RotationalCipher.alphabetLength) + 97;
        rotatedChars.push(String.fromCharCode(rotatedCharCode));
      } else {
        // Non-alphabetic characters
        rotatedChars.push(char);
      }
    }

    return rotatedChars.join('');
  }
}