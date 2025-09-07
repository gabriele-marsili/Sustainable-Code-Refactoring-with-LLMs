export default class RotationalCipher {
  static readonly alphabet: string = 'abcdefghijklmnopqrstuvwxyz';

  static rotate(message: string, key: number): string {
    const normalizedKey = ((key % 26) + 26) % 26;
    if (normalizedKey === 0) return message;

    let result = '';
    const aCode = 97;
    const ACode = 65;

    for (let i = 0; i < message.length; i++) {
      const charCode = message.charCodeAt(i);
      
      if (charCode >= aCode && charCode <= aCode + 25) {
        result += String.fromCharCode(((charCode - aCode + normalizedKey) % 26) + aCode);
      } else if (charCode >= ACode && charCode <= ACode + 25) {
        result += String.fromCharCode(((charCode - ACode + normalizedKey) % 26) + ACode);
      } else {
        result += message[i];
      }
    }

    return result;
  }
}