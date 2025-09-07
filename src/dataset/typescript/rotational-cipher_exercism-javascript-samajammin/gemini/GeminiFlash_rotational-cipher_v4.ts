export default class RotationalCipher {
  static readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';
  static readonly alphabetLength: number = 26;

  static rotate(message: string, key: number): string {
    if (key === 0) {
      return message;
    }

    const rotatedChars: string[] = [];
    const keyModAlphabetLength = key % this.alphabetLength;

    for (let i = 0; i < message.length; i++) {
      const char = message[i];
      const charCode = char.charCodeAt(0);

      if (charCode >= 65 && charCode <= 90) {
        const rotatedCharCode = ((charCode - 65 + keyModAlphabetLength) % this.alphabetLength) + 65;
        rotatedChars.push(String.fromCharCode(rotatedCharCode));
      } else if (charCode >= 97 && charCode <= 122) {
        const rotatedCharCode = ((charCode - 97 + keyModAlphabetLength) % this.alphabetLength) + 97;
        rotatedChars.push(String.fromCharCode(rotatedCharCode));
      } else {
        rotatedChars.push(char);
      }
    }

    return rotatedChars.join('');
  }
}